/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.apache.hudi.metadata;

import org.apache.hudi.common.config.HoodieMetadataConfig;
import org.apache.hudi.common.data.HoodieData;
import org.apache.hudi.common.engine.EngineType;
import org.apache.hudi.common.engine.HoodieLocalEngineContext;
import org.apache.hudi.common.model.FileSlice;
import org.apache.hudi.common.model.HoodieBaseFile;
import org.apache.hudi.common.model.HoodieColumnRangeMetadata;
import org.apache.hudi.common.model.HoodieCommitMetadata;
import org.apache.hudi.common.model.HoodieLogFile;
import org.apache.hudi.common.model.HoodieRecord;
import org.apache.hudi.common.model.WriteOperationType;
import org.apache.hudi.common.table.HoodieTableConfig;
import org.apache.hudi.common.table.HoodieTableMetaClient;
import org.apache.hudi.common.testutils.FileCreateUtils;
import org.apache.hudi.common.testutils.HoodieCommonTestHarness;
import org.apache.hudi.common.testutils.HoodieTestDataGenerator;
import org.apache.hudi.common.testutils.HoodieTestTable;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.collection.Pair;
import org.apache.hudi.io.storage.HoodieFileWriter;
import org.apache.hudi.io.storage.HoodieFileWriterFactory;
import org.apache.hudi.storage.StoragePath;

import org.apache.avro.Schema;
import org.apache.avro.SchemaBuilder;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Properties;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import static org.apache.hudi.metadata.HoodieTableMetadataUtil.getFileIDForFileGroup;
import static org.apache.hudi.metadata.HoodieTableMetadataUtil.validateDataTypeForSecondaryIndex;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestHoodieTableMetadataUtil extends HoodieCommonTestHarness {

  private static HoodieTestTable hoodieTestTable;
  private static final List<String> DATE_PARTITIONS = Arrays.asList("2019/01/01", "2020/01/02", "2021/03/01");

  @BeforeEach
  public void setUp() throws IOException {
    initMetaClient();
    initTestDataGenerator(DATE_PARTITIONS.toArray(new String[0]));
    hoodieTestTable = HoodieTestTable.of(metaClient);
  }

  @AfterEach
  public void tearDown() throws IOException {
    metaClient.getStorage().deleteDirectory(metaClient.getBasePath());
    cleanupTestDataGenerator();
    cleanMetaClient();
  }

  @Test
  public void testReadRecordKeysFromBaseFilesWithEmptyPartitionBaseFilePairs() {
    HoodieLocalEngineContext engineContext = new HoodieLocalEngineContext(metaClient.getStorageConf());
    List<Pair<String, FileSlice>> partitionFileSlicePairs = Collections.emptyList();
    HoodieData<HoodieRecord> result = HoodieTableMetadataUtil.readRecordKeysFromFileSlices(
        engineContext,
        partitionFileSlicePairs,
        false,
        1,
        "activeModule",
        metaClient,
        EngineType.SPARK
    );
    assertTrue(result.isEmpty());
  }

  @Test
  public void testConvertFilesToPartitionStatsRecords() throws Exception {
    HoodieLocalEngineContext engineContext = new HoodieLocalEngineContext(metaClient.getStorageConf());
    String instant1 = "20230918120000000";
    hoodieTestTable = hoodieTestTable.addCommit(instant1);
    String instant2 = "20230918121110000";
    hoodieTestTable = hoodieTestTable.addCommit(instant2);
    List<Pair<String, FileSlice>> partitionFileSlicePairs = new ArrayList<>();
    // Generate 10 inserts for each partition and populate partitionBaseFilePairs and recordKeys.
    DATE_PARTITIONS.forEach(p -> {
      try {
        URI partitionMetaFile = FileCreateUtils.createPartitionMetaFile(basePath, p);
        StoragePath partitionMetadataPath = new StoragePath(partitionMetaFile);
        String fileId1 = UUID.randomUUID().toString();
        FileSlice fileSlice1 = new FileSlice(p, instant1, fileId1);
        StoragePath storagePath1 = new StoragePath(hoodieTestTable.getBaseFilePath(p, fileId1).toUri());
        writeParquetFile(
            instant1,
            storagePath1,
            dataGen.generateInsertsForPartition(instant1, 10, p),
            metaClient,
            engineContext);
        HoodieBaseFile baseFile1 = new HoodieBaseFile(hoodieTestTable.getBaseFilePath(p, fileId1).toString());
        fileSlice1.setBaseFile(baseFile1);
        String fileId2 = UUID.randomUUID().toString();
        FileSlice fileSlice2 = new FileSlice(p, instant2, fileId2);
        StoragePath storagePath2 = new StoragePath(hoodieTestTable.getBaseFilePath(p, fileId2).toUri());
        writeParquetFile(
            instant2,
            storagePath2,
            dataGen.generateInsertsForPartition(instant2, 10, p),
            metaClient,
            engineContext);
        HoodieBaseFile baseFile2 = new HoodieBaseFile(hoodieTestTable.getBaseFilePath(p, fileId2).toString());
        fileSlice2.setBaseFile(baseFile2);
        partitionFileSlicePairs.add(Pair.of(p, fileSlice1));
        partitionFileSlicePairs.add(Pair.of(p, fileSlice2));
      } catch (Exception e) {
        throw new RuntimeException(e);
      }
    });

    List<String> columnsToIndex = Arrays.asList("rider", "driver");
    HoodieData<HoodieRecord> result = HoodieTableMetadataUtil.convertFilesToPartitionStatsRecords(
        engineContext,
        partitionFileSlicePairs,
        HoodieMetadataConfig.newBuilder().enable(true)
            .withMetadataIndexColumnStats(true)
            .withMetadataIndexPartitionStats(true)
            .withColumnStatsIndexForColumns("rider,driver")
            .withPartitionStatsIndexParallelism(1)
            .build(),
        metaClient,
        Option.of(HoodieTestDataGenerator.AVRO_SCHEMA_WITH_METADATA_FIELDS));
    // Validate the result.
    validatePartitionStats(result, instant1, instant2);
  }

  @Test
  public void testReadRecordKeysFromBaseFilesWithValidRecords() throws Exception {
    HoodieLocalEngineContext engineContext = new HoodieLocalEngineContext(metaClient.getStorageConf());
    String instant = "20230918120000000";
    hoodieTestTable = hoodieTestTable.addCommit(instant);
    Set<String> recordKeys = new HashSet<>();
    final List<Pair<String, FileSlice>> partitionFileSlicePairs = new ArrayList<>();
    // Generate 10 inserts for each partition and populate partitionBaseFilePairs and recordKeys.
    DATE_PARTITIONS.forEach(p -> {
      try {
        List<HoodieRecord> hoodieRecords = dataGen.generateInsertsForPartition(instant, 10, p);
        String fileId = UUID.randomUUID().toString();
        FileSlice fileSlice = new FileSlice(p, instant, fileId);
        writeParquetFile(
            instant,
            new StoragePath(hoodieTestTable.getBaseFilePath(p, fileId).toUri()),
            hoodieRecords,
            metaClient,
            engineContext);
        HoodieBaseFile baseFile = new HoodieBaseFile(hoodieTestTable.getBaseFilePath(p, fileId).toString(), fileId, instant, null);
        fileSlice.setBaseFile(baseFile);
        partitionFileSlicePairs.add(Pair.of(p, fileSlice));
        recordKeys.addAll(hoodieRecords.stream().map(HoodieRecord::getRecordKey).collect(Collectors.toSet()));
      } catch (Exception e) {
        throw new RuntimeException(e);
      }
    });

    // Call the method readRecordKeysFromBaseFiles with the created partitionBaseFilePairs.
    HoodieData<HoodieRecord> result = HoodieTableMetadataUtil.readRecordKeysFromFileSlices(
        engineContext,
        partitionFileSlicePairs,
        false,
        1,
        "activeModule",
        metaClient,
        EngineType.SPARK
    );
    // Validate the result.
    List<HoodieRecord> records = result.collectAsList();
    assertEquals(30, records.size());
    assertEquals(MetadataPartitionType.RECORD_INDEX.getPartitionPath(), records.get(0).getPartitionPath());
    for (HoodieRecord record : records) {
      assertTrue(recordKeys.contains(record.getRecordKey()));
    }
  }

  @Test
  public void testGetLogFileColumnRangeMetadata() throws Exception {
    HoodieLocalEngineContext engineContext = new HoodieLocalEngineContext(metaClient.getStorageConf());
    String instant1 = "20230918120000000";

    HoodieCommitMetadata commitMetadata = new HoodieCommitMetadata();
    commitMetadata.addMetadata("test", "test");
    commitMetadata.setOperationType(WriteOperationType.INSERT);
    commitMetadata.addMetadata(HoodieCommitMetadata.SCHEMA_KEY, HoodieTestDataGenerator.AVRO_SCHEMA_WITH_METADATA_FIELDS.toString());
    hoodieTestTable = hoodieTestTable.addCommit(instant1, Option.of(commitMetadata));
    String instant2 = "20230918121110000";
    hoodieTestTable = hoodieTestTable.addCommit(instant2);
    List<Pair<String, FileSlice>> partitionFileSlicePairs = new ArrayList<>();
    List<String> columnsToIndex = Arrays.asList("rider", "driver");
    // Generate 10 inserts for each partition and populate partitionBaseFilePairs and recordKeys.
    DATE_PARTITIONS.forEach(p -> {
      try {
        URI partitionMetaFile = FileCreateUtils.createPartitionMetaFile(basePath, p);
        StoragePath partitionMetadataPath = new StoragePath(partitionMetaFile);
        String fileId1 = UUID.randomUUID().toString();
        // add only one parquet file in first file slice
        FileSlice fileSlice1 = new FileSlice(p, instant1, fileId1);
        StoragePath storagePath1 = new StoragePath(hoodieTestTable.getBaseFilePath(p, fileId1).toUri());
        writeParquetFile(instant1, storagePath1, dataGen.generateInsertsForPartition(instant1, 10, p), metaClient, engineContext);
        HoodieBaseFile baseFile1 = new HoodieBaseFile(hoodieTestTable.getBaseFilePath(p, fileId1).toString());
        fileSlice1.setBaseFile(baseFile1);
        // add log file in second file slice with higher rider and driver values (which are concatenated with instant)
        FileSlice fileSlice2 = new FileSlice(p, instant2, fileId1);
        fileSlice2.setBaseFile(baseFile1);
        StoragePath storagePath2 = new StoragePath(partitionMetadataPath.getParent(), hoodieTestTable.getLogFileNameById(fileId1, 1));
        writeLogFiles(new StoragePath(metaClient.getBasePath(), p), HoodieTestDataGenerator.AVRO_SCHEMA_WITH_METADATA_FIELDS, dataGen.generateInsertsForPartition(instant2, 10, p), 1,
            metaClient.getStorage(), new Properties(), fileId1, instant2);
        fileSlice2.addLogFile(new HoodieLogFile(storagePath2.toUri().toString()));
        partitionFileSlicePairs.add(Pair.of(p, fileSlice1));
        partitionFileSlicePairs.add(Pair.of(p, fileSlice2));
        // NOTE: we need to set table config as we are not using write client explicitly and these configs are needed for log record reader
        metaClient.getTableConfig().setValue(HoodieTableConfig.POPULATE_META_FIELDS.key(), "false");
        metaClient.getTableConfig().setValue(HoodieTableConfig.RECORDKEY_FIELDS.key(), "_row_key");
        metaClient.getTableConfig().setValue(HoodieTableConfig.PARTITION_FIELDS.key(), "partition_path");
        List<HoodieColumnRangeMetadata<Comparable>> columnRangeMetadataLogFile = HoodieTableMetadataUtil.getLogFileColumnRangeMetadata(
            storagePath2.toString(),
            metaClient,
            columnsToIndex,
            Option.of(HoodieTestDataGenerator.AVRO_SCHEMA_WITH_METADATA_FIELDS),
            HoodieMetadataConfig.MAX_READER_BUFFER_SIZE_PROP.defaultValue());
        // there must be two ranges for rider and driver
        assertEquals(2, columnRangeMetadataLogFile.size());
      } catch (Exception e) {
        throw new RuntimeException(e);
      }
    });
    // collect partition stats, this will collect stats for log files as well
    HoodieData<HoodieRecord> result = HoodieTableMetadataUtil.convertFilesToPartitionStatsRecords(
        engineContext,
        partitionFileSlicePairs,
        HoodieMetadataConfig.newBuilder().enable(true)
            .withMetadataIndexColumnStats(true)
            .withMetadataIndexPartitionStats(true)
            .withColumnStatsIndexForColumns("rider,driver")
            .withPartitionStatsIndexParallelism(1)
            .build(),
        metaClient,
        Option.of(HoodieTestDataGenerator.AVRO_SCHEMA_WITH_METADATA_FIELDS));
    // Validate the result.
    validatePartitionStats(result, instant1, instant2);
  }

  private static void validatePartitionStats(HoodieData<HoodieRecord> result, String instant1, String instant2) {
    List<HoodieRecord> records = result.collectAsList();
    // 3 partitions * 2 columns = 6 partition stats records
    assertEquals(6, records.size());
    assertEquals(MetadataPartitionType.PARTITION_STATS.getPartitionPath(), records.get(0).getPartitionPath());
    ((HoodieMetadataPayload) result.collectAsList().get(0).getData()).getColumnStatMetadata().get().getColumnName();
    records.forEach(r -> {
      HoodieMetadataPayload payload = (HoodieMetadataPayload) r.getData();
      assertTrue(payload.getColumnStatMetadata().isPresent());
      // instant1 < instant2 so instant1 should be in the min value and instant2 should be in the max value.
      if (payload.getColumnStatMetadata().get().getColumnName().equals("rider")) {
        assertEquals(String.format("{\"value\": \"rider-%s\"}", instant1), String.valueOf(payload.getColumnStatMetadata().get().getMinValue()));
        assertEquals(String.format("{\"value\": \"rider-%s\"}", instant2), String.valueOf(payload.getColumnStatMetadata().get().getMaxValue()));
      } else if (payload.getColumnStatMetadata().get().getColumnName().equals("driver")) {
        assertEquals(String.format("{\"value\": \"driver-%s\"}", instant1), String.valueOf(payload.getColumnStatMetadata().get().getMinValue()));
        assertEquals(String.format("{\"value\": \"driver-%s\"}", instant2), String.valueOf(payload.getColumnStatMetadata().get().getMaxValue()));
      }
    });
  }

  private static void writeParquetFile(String instant,
                                       StoragePath path,
                                       List<HoodieRecord> records,
                                       HoodieTableMetaClient metaClient,
                                       HoodieLocalEngineContext engineContext) throws IOException {
    HoodieFileWriter writer = HoodieFileWriterFactory.getFileWriter(
        instant,
        path,
        metaClient.getStorage(),
        metaClient.getTableConfig(),
        HoodieTestDataGenerator.AVRO_SCHEMA_WITH_METADATA_FIELDS,
        engineContext.getTaskContextSupplier(),
        HoodieRecord.HoodieRecordType.AVRO);
    for (HoodieRecord record : records) {
      writer.writeWithMetadata(record.getKey(), record, HoodieTestDataGenerator.AVRO_SCHEMA_WITH_METADATA_FIELDS);
    }
    writer.close();
  }

  @Test
  public void testGetFileGroupIndexFromFileId() {
    String result = getFileIDForFileGroup(MetadataPartitionType.FILES, 1, "test_partition");
    assertEquals("files-0001-0", result);

    result = getFileIDForFileGroup(MetadataPartitionType.COLUMN_STATS, 2, "stats_partition");
    assertEquals("col-stats-0002-0", result);

    result = getFileIDForFileGroup(MetadataPartitionType.BLOOM_FILTERS, 3, "bloom_partition");
    assertEquals("bloom-filters-0003-0", result);

    result = getFileIDForFileGroup(MetadataPartitionType.RECORD_INDEX, 4, "record_partition");
    assertEquals("record-index-0004-0", result);

    result = getFileIDForFileGroup(MetadataPartitionType.SECONDARY_INDEX, 6, "secondary_index_idx_ts");
    assertEquals("secondary-index-idx-ts-0006-0", result);

    result = getFileIDForFileGroup(MetadataPartitionType.FUNCTIONAL_INDEX, 5, "func_index_ts");
    assertEquals("func-index-ts-0005-0", result);
  }

  @Test
  public void testValidateDataTypeForSecondaryIndex() {
    // Create a dummy schema with both complex and primitive types
    Schema schema = SchemaBuilder.record("TestRecord")
        .fields()
        .requiredString("stringField")
        .optionalInt("intField")
        .name("arrayField").type().array().items().stringType().noDefault()
        .name("mapField").type().map().values().intType().noDefault()
        .name("structField").type().record("NestedRecord")
        .fields()
        .requiredString("nestedString")
        .endRecord()
        .noDefault()
        .endRecord();

    // Test for primitive fields
    assertTrue(validateDataTypeForSecondaryIndex(Arrays.asList("stringField", "intField"), schema));

    // Test for complex fields
    assertFalse(validateDataTypeForSecondaryIndex(Arrays.asList("arrayField", "mapField", "structField"), schema));
  }
}
