/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.hudi.functional


import org.apache.avro.Schema
import org.apache.hudi.ColumnStatsIndexSupport.composeIndexSchema
import org.apache.hudi.HoodieConversionUtils.toProperties
import org.apache.hudi.client.common.HoodieSparkEngineContext
import org.apache.hudi.common.config.{HoodieMetadataConfig, HoodieStorageConfig}
import org.apache.hudi.common.model.{HoodieBaseFile, HoodieFileGroup, HoodieLogFile, HoodieTableType}
import org.apache.hudi.common.table.HoodieTableMetaClient
import org.apache.hudi.common.table.view.FileSystemViewManager
import org.apache.hudi.config.HoodieCompactionConfig
import org.apache.hudi.functional.ColumnStatIndexTestBase.ColumnStatsTestCase
import org.apache.hudi.storage.StoragePath
import org.apache.hudi.storage.hadoop.HadoopStorageConfiguration
import org.apache.hudi.testutils.HoodieSparkClientTestBase
import org.apache.hudi.{ColumnStatsIndexSupport, DataSourceWriteOptions}
import org.apache.spark.sql._
import org.apache.hudi.functional.ColumnStatIndexTestBase.ColumnStatsTestParams
import org.apache.hudi.testutils.{HoodieSparkClientTestBase, LogFileColStatsTestUtil}
import org.apache.hudi.{ColumnStatsIndexSupport, DataSourceWriteOptions}
import org.apache.spark.sql.functions.typedLit
import org.apache.spark.sql.types._
import org.apache.spark.sql.DataFrame
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api._
import org.junit.jupiter.params.provider.Arguments

import java.math.BigInteger
import java.sql.{Date, Timestamp}
import java.util
import java.util.List
import java.util.stream.Collectors
import scala.collection.JavaConverters._
import scala.util.Random

@Tag("functional")
class ColumnStatIndexTestBase extends HoodieSparkClientTestBase {
  var spark: SparkSession = _
  var dfList: Seq[DataFrame] = Seq()

  val sourceTableSchema =
    new StructType()
      .add("c1", IntegerType)
      .add("c2", StringType)
      .add("c3", DecimalType(9, 3))
      .add("c4", TimestampType)
      .add("c5", ShortType)
      .add("c6", DateType)
      .add("c7", BinaryType)
      .add("c8", ByteType)

  @BeforeEach
  override def setUp() {
    initPath()
    initQueryIndexConf()
    initSparkContexts()
    initHoodieStorage()

    setTableName("hoodie_test")
    initMetaClient()

    spark = sqlContext.sparkSession
  }

  @AfterEach
  override def tearDown() = {
    cleanupFileSystem()
    cleanupSparkContexts()
  }

  protected def doWriteAndValidateColumnStats(params: ColumnStatsTestParams): Unit = {

    val sourceJSONTablePath = getClass.getClassLoader.getResource(params.dataSourcePath).toString

    // NOTE: Schema here is provided for validation that the input date is in the appropriate format
    val inputDF = spark.read.schema(sourceTableSchema).json(sourceJSONTablePath)

    val writeOptions: Map[String, String] = params.hudiOpts ++ params.metadataOpts

    inputDF
      .sort("c1")
      .repartition(params.numPartitions, new Column("c1"))
      .write
      .format("hudi")
      .options(writeOptions)
      .option(DataSourceWriteOptions.OPERATION.key, params.operation)
      .option(HoodieStorageConfig.PARQUET_MAX_FILE_SIZE.key(), String.valueOf(params.parquetMaxFileSize))
      .option(HoodieCompactionConfig.PARQUET_SMALL_FILE_LIMIT.key(), String.valueOf(params.smallFileLimit))
      .mode(params.saveMode)
      .save(basePath)
    dfList = dfList :+ inputDF

    metaClient = HoodieTableMetaClient.reload(metaClient)

    if (params.shouldValidate) {
      // Currently, routine manually validating the column stats (by actually reading every column of every file)
      // only supports parquet files. Therefore we skip such validation when delta-log files are present, and only
      // validate in following cases: (1) COW: all operations; (2) MOR: insert only.
      val shouldValidateColumnStatsManually = params.testCase.tableType == HoodieTableType.COPY_ON_WRITE ||
        params.operation.equals(DataSourceWriteOptions.INSERT_OPERATION_OPT_VAL)

      validateColumnStatsIndex(
        params.testCase, params.metadataOpts, params.expectedColStatsSourcePath, shouldValidateColumnStatsManually, params.latestCompletedCommit)
    }
  }

  protected def buildColumnStatsTableManually(tablePath: String,
                                            includedCols: Seq[String],
                                            indexedCols: Seq[String],
                                            indexSchema: StructType): DataFrame = {
    val metaClient = HoodieTableMetaClient.builder().setConf(new HadoopStorageConfiguration(jsc.hadoopConfiguration())).setBasePath(tablePath).build()
    val fsv = FileSystemViewManager.createInMemoryFileSystemView(new HoodieSparkEngineContext(jsc), metaClient, HoodieMetadataConfig.newBuilder().enable(false).build())
    fsv.loadAllPartitions()
    val filegroupList = fsv.getAllFileGroups.collect(Collectors.toList[HoodieFileGroup])
    val baseFilesList = filegroupList.stream().flatMap(fileGroup => fileGroup.getAllBaseFiles).collect(Collectors.toList[HoodieBaseFile])
    val baseFiles = baseFilesList.stream()
      .map[StoragePath](baseFile => baseFile.getStoragePath).collect(Collectors.toList[StoragePath]).asScala

    val baseFilesDf = spark.createDataFrame(
      baseFiles.flatMap(file => {
        val df = spark.read.schema(sourceTableSchema).parquet(file.toString)
        val exprs: Seq[String] =
          s"'${typedLit(file.getName)}' AS file" +:
            s"sum(1) AS valueCount" +:
            df.columns
              .filter(col => includedCols.contains(col))
              .filter(col => indexedCols.contains(col))
              .flatMap(col => {
                val minColName = s"${col}_minValue"
                val maxColName = s"${col}_maxValue"
                if (indexedCols.contains(col)) {
                  Seq(
                    s"min($col) AS $minColName",
                    s"max($col) AS $maxColName",
                    s"sum(cast(isnull($col) AS long)) AS ${col}_nullCount"
                  )
                } else {
                  Seq(
                    s"null AS $minColName",
                    s"null AS $maxColName",
                    s"null AS ${col}_nullCount"
                  )
                }
              })

        df.selectExpr(exprs: _*)
          .collect()
      }).asJava,
      indexSchema
    )

    if (metaClient.getTableConfig.getTableType == HoodieTableType.COPY_ON_WRITE) {
      baseFilesDf // COW table
    } else {
      val allLogFiles = filegroupList.stream().flatMap(fileGroup => fileGroup.getAllFileSlices)
        .flatMap(fileSlice => fileSlice.getLogFiles)
        .collect(Collectors.toList[HoodieLogFile])
      if (allLogFiles.isEmpty) {
        baseFilesDf // MOR table, but no log files.
      } else {
        val colsToGenerateStats = indexedCols // check for included cols
        val writerSchemaOpt = LogFileColStatsTestUtil.getSchemaForTable(metaClient)
        val latestCompletedCommit = metaClient.getActiveTimeline.getCommitsTimeline.filterCompletedInstants().lastInstant().get().requestedTime
        baseFilesDf.union(getColStatsFromLogFiles(allLogFiles, latestCompletedCommit,
          scala.collection.JavaConverters.seqAsJavaList(colsToGenerateStats),
          metaClient,
          writerSchemaOpt: org.apache.hudi.common.util.Option[Schema],
          HoodieMetadataConfig.MAX_READER_BUFFER_SIZE_PROP.defaultValue(),
          indexSchema))
      }
    }
  }

  protected def getColStatsFromLogFiles(logFiles: List[HoodieLogFile], latestCommit: String, columnsToIndex: util.List[String],
                                        datasetMetaClient: HoodieTableMetaClient,
                                        writerSchemaOpt: org.apache.hudi.common.util.Option[Schema],
                                        maxBufferSize: Integer,
                                        indexSchema: StructType): DataFrame = {
    val colStatsEntries = logFiles.stream().map[org.apache.hudi.common.util.Option[Row]](logFile => {
      try {
        getColStatsFromLogFile(logFile.getPath.toString, latestCommit, columnsToIndex, datasetMetaClient, writerSchemaOpt, maxBufferSize)
      } catch {
        case e: Exception =>
          throw e
      }
    }).filter(rowOpt => rowOpt.isPresent).map[Row](rowOpt => rowOpt.get()).collect(Collectors.toList[Row])
    spark.createDataFrame(colStatsEntries, indexSchema)
  }

  protected def getColStatsFromLogFile(logFilePath: String,
                                       latestCommit: String,
                                       columnsToIndex: util.List[String],
                                       datasetMetaClient: HoodieTableMetaClient,
                                       writerSchemaOpt: org.apache.hudi.common.util.Option[Schema],
                                       maxBufferSize: Integer
                                      ): org.apache.hudi.common.util.Option[Row] = {
    LogFileColStatsTestUtil.getLogFileColumnRangeMetadata(logFilePath, datasetMetaClient, latestCommit,
      columnsToIndex, writerSchemaOpt, maxBufferSize)
  }

  protected def validateColumnStatsIndex(testCase: ColumnStatsTestCase,
                                         metadataOpts: Map[String, String],
                                         expectedColStatsSourcePath: String,
                                         validateColumnStatsManually: Boolean,
                                         latestCompletedCommit: String): Unit = {
    val metadataConfig = HoodieMetadataConfig.newBuilder()
      .fromProperties(toProperties(metadataOpts))
      .build()

    val columnStatsIndex = new ColumnStatsIndexSupport(spark, sourceTableSchema, metadataConfig, metaClient)

    val indexedColumns: Set[String] = {
      val customIndexedColumns = metadataConfig.getColumnsEnabledForColumnStatsIndex
      if (customIndexedColumns.isEmpty) {
        sourceTableSchema.fieldNames.toSet
      } else {
        customIndexedColumns.asScala.toSet
      }
    }
    val (expectedColStatsSchema, _) = composeIndexSchema(sourceTableSchema.fieldNames, indexedColumns, sourceTableSchema)
    val validationSortColumns = Seq("c1_maxValue", "c1_minValue", "c2_maxValue", "c2_minValue", "c3_maxValue",
      "c3_minValue", "c5_maxValue", "c5_minValue")

    columnStatsIndex.loadTransposed(sourceTableSchema.fieldNames, testCase.shouldReadInMemory) { transposedColStatsDF =>
      // Match against expected column stats table
      val expectedColStatsIndexTableDf =
        spark.read
          .schema(expectedColStatsSchema)
          .json(getClass.getClassLoader.getResource(expectedColStatsSourcePath).toString)

      assertEquals(expectedColStatsIndexTableDf.schema, transposedColStatsDF.schema)
      // NOTE: We have to drop the `fileName` column as it contains semi-random components
      //       that we can't control in this test. Nevertheless, since we manually verify composition of the
      //       ColStats Index by reading Parquet footers from individual Parquet files, this is not an issue
      assertEquals(asJson(sort(expectedColStatsIndexTableDf, validationSortColumns)),
        asJson(sort(transposedColStatsDF.drop("fileName"), validationSortColumns)))

      if (validateColumnStatsManually) {
        // TODO(HUDI-4557): support validation of column stats of avro log files
        // Collect Column Stats manually (reading individual Parquet files)
        val manualColStatsTableDF =
        buildColumnStatsTableManually(basePath, sourceTableSchema.fieldNames, sourceTableSchema.fieldNames, expectedColStatsSchema)

        assertEquals(asJson(sort(manualColStatsTableDF, validationSortColumns)),
          asJson(sort(transposedColStatsDF, validationSortColumns)))
      }
    }
  }

  protected def generateRandomDataFrame(spark: SparkSession): DataFrame = {
    val sourceTableSchema =
      new StructType()
        .add("c1", IntegerType)
        .add("c2", StringType)
        // NOTE: We're testing different values for precision of the decimal to make sure
        //       we execute paths bearing different underlying representations in Parquet
        // REF: https://github.com/apache/parquet-format/blob/master/LogicalTypes.md#DECIMAL
        .add("c3a", DecimalType(9, 3))
        .add("c3b", DecimalType(10, 3))
        .add("c3c", DecimalType(20, 3))
        .add("c4", TimestampType)
        .add("c5", ShortType)
        .add("c6", DateType)
        .add("c7", BinaryType)
        .add("c8", ByteType)

    val rdd = spark.sparkContext.parallelize(0 to 1000, 1).map { item =>
      val c1 = Integer.valueOf(item)
      val c2 = Random.nextString(10)
      val c3a = java.math.BigDecimal.valueOf(Random.nextInt() % (1 << 24), 3)
      val c3b = java.math.BigDecimal.valueOf(Random.nextLong() % (1L << 32), 3)
      // NOTE: We cap it at 2^64 to make sure we're not exceeding target decimal's range
      val c3c = new java.math.BigDecimal(new BigInteger(64, new java.util.Random()), 3)
      val c4 = new Timestamp(System.currentTimeMillis())
      val c5 = java.lang.Short.valueOf(s"${(item + 16) / 10}")
      val c6 = Date.valueOf(s"${2020}-${item % 11 + 1}-${item % 28 + 1}")
      val c7 = Array(item).map(_.toByte)
      val c8 = java.lang.Byte.valueOf("9")

      RowFactory.create(c1, c2, c3a, c3b, c3c, c4, c5, c6, c7, c8)
    }

    spark.createDataFrame(rdd, sourceTableSchema)
  }

  protected def asJson(df: DataFrame) =
    df.toJSON
      .select("value")
      .collect()
      .toSeq
      .map(_.getString(0))
      .mkString("\n")

  protected def sort(df: DataFrame): DataFrame = {
    sort(df, Seq("c1_maxValue", "c1_minValue"))
  }

  private def sort(df: DataFrame, sortColumns: Seq[String]): DataFrame = {
    val sortedCols = df.columns.sorted
    // Sort dataset by specified columns (to minimize non-determinism in case multiple files have the same
    // value of the first column)
    df.select(sortedCols.head, sortedCols.tail: _*)
      .sort(sortColumns.head, sortColumns.tail: _*)
  }
}

object ColumnStatIndexTestBase {

  case class ColumnStatsTestCase(tableType: HoodieTableType, shouldReadInMemory: Boolean)

  def testMetadataColumnStatsIndexParams: java.util.stream.Stream[Arguments] = {
    java.util.stream.Stream.of(HoodieTableType.values().toStream.flatMap(tableType =>
      Seq(Arguments.arguments(ColumnStatsTestCase(tableType, shouldReadInMemory = true)),
        Arguments.arguments(ColumnStatsTestCase(tableType, shouldReadInMemory = false))
      )
    ): _*)
  }

  def testMetadataColumnStatsIndexParamsForMOR: java.util.stream.Stream[Arguments] = {
    java.util.stream.Stream.of(
      Seq(Arguments.arguments(ColumnStatsTestCase(HoodieTableType.MERGE_ON_READ, shouldReadInMemory = true)),
        Arguments.arguments(ColumnStatsTestCase(HoodieTableType.MERGE_ON_READ, shouldReadInMemory = false))
      )
        : _*)
  }

  def testTableTypePartitionTypeParams: java.util.stream.Stream[Arguments] = {
    java.util.stream.Stream.of(
      Seq(
        Arguments.arguments(HoodieTableType.COPY_ON_WRITE, "c8"),
        // empty partition col represents non-partitioned table.
        Arguments.arguments(HoodieTableType.COPY_ON_WRITE, ""),
        Arguments.arguments(HoodieTableType.MERGE_ON_READ, "c8"),
        Arguments.arguments(HoodieTableType.MERGE_ON_READ, "")
      )
        : _*)
  }

  case class ColumnStatsTestParams(testCase: ColumnStatsTestCase,
                                   metadataOpts: Map[String, String],
                                   hudiOpts: Map[String, String],
                                   dataSourcePath: String,
                                   expectedColStatsSourcePath: String,
                                   operation: String,
                                   saveMode: SaveMode,
                                   shouldValidate: Boolean = true,
                                   latestCompletedCommit: String = null,
                                   numPartitions: Integer = 4,
                                   parquetMaxFileSize: Integer = 10 * 1024,
                                   smallFileLimit: Integer = 100 * 1024 * 1024)
}
