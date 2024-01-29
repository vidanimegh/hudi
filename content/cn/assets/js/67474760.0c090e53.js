"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[85513],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>m});var n=a(67294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),d=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},p=function(e){var t=d(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=d(a),h=i,m=u["".concat(s,".").concat(h)]||u[h]||c[h]||r;return a?n.createElement(m,o(o({ref:t},p),{},{components:a})):n.createElement(m,o({ref:t},p))}));function m(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,o=new Array(r);o[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:i,o[1]=l;for(var d=2;d<r;d++)o[d]=a[d];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},61011:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>s});var n=a(87462),i=(a(67294),a(3905));const r={title:"Write Operations",summary:"In this page, we describe the different write operations in Hudi.",toc:!0,last_modified_at:null},o=void 0,l={unversionedId:"write_operations",id:"write_operations",title:"Write Operations",description:"It may be helpful to understand the different write operations of Hudi and how best to leverage them. These operations",source:"@site/docs/write_operations.md",sourceDirName:".",slug:"/write_operations",permalink:"/cn/docs/next/write_operations",editUrl:"https://github.com/apache/hudi/tree/asf-site/website/docs/write_operations.md",tags:[],version:"current",frontMatter:{title:"Write Operations",summary:"In this page, we describe the different write operations in Hudi.",toc:!0,last_modified_at:null},sidebar:"docs",previous:{title:"Indexing",permalink:"/cn/docs/next/indexing"},next:{title:"Key Generation",permalink:"/cn/docs/next/key_generation"}},s=[{value:"Operation Types",id:"operation-types",children:[{value:"UPSERT",id:"upsert",children:[],level:3},{value:"INSERT",id:"insert",children:[],level:3},{value:"BULK_INSERT",id:"bulk_insert",children:[],level:3},{value:"DELETE",id:"delete",children:[],level:3},{value:"BOOTSTRAP",id:"bootstrap",children:[],level:3},{value:"INSERT_OVERWRITE",id:"insert_overwrite",children:[],level:3},{value:"INSERT_OVERWRITE_TABLE",id:"insert_overwrite_table",children:[],level:3},{value:"DELETE_PARTITION",id:"delete_partition",children:[],level:3}],level:2},{value:"Configs",id:"configs",children:[],level:2},{value:"Writing path",id:"writing-path",children:[],level:2},{value:"Related Resources",id:"related-resources",children:[],level:2}],d={toc:s},p="wrapper";function u(e){let{components:t,...r}=e;return(0,i.kt)(p,(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"It may be helpful to understand the different write operations of Hudi and how best to leverage them. These operations\ncan be chosen/changed across each commit/deltacommit issued against the table. See the ",(0,i.kt)("a",{parentName:"p",href:"/docs/writing_data"},"How To docs on Writing Data"),"\nto see more examples."),(0,i.kt)("h2",{id:"operation-types"},"Operation Types"),(0,i.kt)("h3",{id:"upsert"},"UPSERT"),(0,i.kt)("p",null,"This is the default operation where the input records are first tagged as inserts or updates by looking up the index.\nThe records are ultimately written after heuristics are run to determine how best to pack them on storage to optimize for things like file sizing.\nThis operation is recommended for use-cases like database change capture where the input almost certainly contains updates. The target table will never show duplicates. "),(0,i.kt)("h3",{id:"insert"},"INSERT"),(0,i.kt)("p",null,"This operation is very similar to upsert in terms of heuristics/file sizing but completely skips the index lookup step. Thus, it can be a lot faster than upserts\nfor use-cases like log de-duplication (in conjunction with options to filter duplicates mentioned below). This is also suitable for use-cases where the table can tolerate duplicates, but just\nneed the transactional writes/incremental pull/storage management capabilities of Hudi."),(0,i.kt)("h3",{id:"bulk_insert"},"BULK_INSERT"),(0,i.kt)("p",null,"Both upsert and insert operations keep input records in memory to speed up storage heuristics computations faster (among other things) and thus can be cumbersome for\ninitial loading/bootstrapping a Hudi table at first. Bulk insert provides the same semantics as insert, while implementing a sort-based data writing algorithm, which can scale very well for several hundred TBs\nof initial load. However, this just does a best-effort job at sizing files vs guaranteeing file sizes like inserts/upserts do."),(0,i.kt)("h3",{id:"delete"},"DELETE"),(0,i.kt)("p",null,"Hudi supports implementing two types of deletes on data stored in Hudi tables, by enabling the user to specify a different record payload implementation."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Soft Deletes")," : Retain the record key and just null out the values for all the other fields.\nThis can be achieved by ensuring the appropriate fields are nullable in the table schema and simply upserting the table after setting these fields to null."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Hard Deletes")," : A stronger form of deletion is to physically remove any trace of the record from the table. This can be achieved in 3 different ways. ",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Using DataSource, set ",(0,i.kt)("inlineCode",{parentName:"li"},"OPERATION_OPT_KEY")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"DELETE_OPERATION_OPT_VAL"),". This will remove all the records in the DataSet being submitted. "),(0,i.kt)("li",{parentName:"ul"},"Using DataSource, set ",(0,i.kt)("inlineCode",{parentName:"li"},"PAYLOAD_CLASS_OPT_KEY")," to ",(0,i.kt)("inlineCode",{parentName:"li"},'"org.apache.hudi.EmptyHoodieRecordPayload"'),". This will remove all the records in the DataSet being submitted. "),(0,i.kt)("li",{parentName:"ul"},"Using DataSource or Hudi Streamer, add a column named ",(0,i.kt)("inlineCode",{parentName:"li"},"_hoodie_is_deleted")," to DataSet. The value of this column must be set to ",(0,i.kt)("inlineCode",{parentName:"li"},"true")," for all the records to be deleted and either ",(0,i.kt)("inlineCode",{parentName:"li"},"false")," or left null for any records which are to be upserted.")))),(0,i.kt)("h3",{id:"bootstrap"},"BOOTSTRAP"),(0,i.kt)("p",null,"Hudi supports migrating your existing large tables into a Hudi table using the ",(0,i.kt)("inlineCode",{parentName:"p"},"bootstrap")," operation. There are a couple of ways to approach this. Please refer to\n",(0,i.kt)("a",{parentName:"p",href:"https://hudi.apache.org/docs/migration_guide"},"bootstrapping page")," for more details. "),(0,i.kt)("h3",{id:"insert_overwrite"},"INSERT_OVERWRITE"),(0,i.kt)("p",null,"This operation is used to rerwrite the all the partitions that are present in the input. This operation can be faster\nthan ",(0,i.kt)("inlineCode",{parentName:"p"},"upsert")," for batch ETL jobs, that are recomputing entire target partitions at once (as opposed to incrementally\nupdating the target tables). This is because, we are able to bypass indexing, precombining and other repartitioning\nsteps in the upsert write path completely. This comes in handy if you are doing any backfill or any such type of use-cases."),(0,i.kt)("h3",{id:"insert_overwrite_table"},"INSERT_OVERWRITE_TABLE"),(0,i.kt)("p",null,"This operation can be used to overwrite the entire table for whatever reason. The Hudi cleaner will eventually clean up\nthe previous table snapshot's file groups asynchronously based on the configured cleaning policy. This operation is much\nfaster than issuing explicit deletes. "),(0,i.kt)("h3",{id:"delete_partition"},"DELETE_PARTITION"),(0,i.kt)("p",null,"In addition to deleting individual records, Hudi supports deleting entire partitions in bulk using this operation.\nDeletion of specific partitions can be done using the config\n",(0,i.kt)("a",{parentName:"p",href:"https://hudi.apache.org/docs/configurations#hoodiedatasourcewritepartitionstodelete"},(0,i.kt)("inlineCode",{parentName:"a"},"hoodie.datasource.write.partitions.to.delete")),". "),(0,i.kt)("h2",{id:"configs"},"Configs"),(0,i.kt)("p",null,"Here are the basic configs relevant to the write operations types mentioned above. Please refer to ",(0,i.kt)("a",{parentName:"p",href:"https://hudi.apache.org/docs/configurations#Write-Options"},"Write Options")," for more Spark based configs and ",(0,i.kt)("a",{parentName:"p",href:"https://hudi.apache.org/docs/next/configurations#Flink-Options"},"Flink options")," for Flink based configs."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Spark based configs:")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Config Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Default"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"hoodie.datasource.write.operation"),(0,i.kt)("td",{parentName:"tr",align:null},"upsert (Optional)"),(0,i.kt)("td",{parentName:"tr",align:null},"Whether to do upsert, insert or bulk_insert for the write operation. Use bulk_insert to load new data into a table, and there on use upsert/insert. bulk insert uses a disk based write path to scale to load large inputs without need to cache it.",(0,i.kt)("br",null),(0,i.kt)("br",null),(0,i.kt)("inlineCode",{parentName:"td"},"Config Param: OPERATION"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"hoodie.datasource.write.precombine.field"),(0,i.kt)("td",{parentName:"tr",align:null},"ts (Optional)"),(0,i.kt)("td",{parentName:"tr",align:null},"Field used in preCombining before actual write. When two records have the same key value, we will pick the one with the largest value for the precombine field, determined by Object.compareTo(..)",(0,i.kt)("br",null),(0,i.kt)("br",null),(0,i.kt)("inlineCode",{parentName:"td"},"Config Param: PRECOMBINE_FIELD"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"hoodie.combine.before.insert"),(0,i.kt)("td",{parentName:"tr",align:null},"false (Optional)"),(0,i.kt)("td",{parentName:"tr",align:null},"When inserted records share same key, controls whether they should be first combined (i.e de-duplicated) before writing to storage.",(0,i.kt)("br",null),(0,i.kt)("br",null),(0,i.kt)("inlineCode",{parentName:"td"},"Config Param: COMBINE_BEFORE_INSERT"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"hoodie.datasource.write.insert.drop.duplicates"),(0,i.kt)("td",{parentName:"tr",align:null},"false (Optional)"),(0,i.kt)("td",{parentName:"tr",align:null},"If set to true, records from the incoming dataframe will not overwrite existing records with the same key during the write operation. This config is deprecated as of 0.14.0. Please use hoodie.datasource.insert.dup.policy instead.",(0,i.kt)("br",null),(0,i.kt)("br",null),(0,i.kt)("inlineCode",{parentName:"td"},"Config Param: INSERT_DROP_DUPS"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"hoodie.bulkinsert.sort.mode"),(0,i.kt)("td",{parentName:"tr",align:null},"NONE (Optional)"),(0,i.kt)("td",{parentName:"tr",align:null},"org.apache.hudi.execution.bulkinsert.BulkInsertSortMode: Modes for sorting records during bulk insert. ",(0,i.kt)("ul",null,(0,i.kt)("li",null,(0,i.kt)("inlineCode",{parentName:"td"},"NONE(default)"),": No sorting. Fastest and matches ",(0,i.kt)("inlineCode",{parentName:"td"},"spark.write.parquet()")," in number of files and overhead."),(0,i.kt)("li",null,(0,i.kt)("inlineCode",{parentName:"td"},"GLOBAL_SORT"),": This ensures best file sizes, with lowest memory overhead at cost of sorting."),(0,i.kt)("li",null,(0,i.kt)("inlineCode",{parentName:"td"},"PARTITION_SORT"),": Strikes a balance by only sorting within a Spark RDD partition, still keeping the memory overhead of writing low. File sizing is not as good as ",(0,i.kt)("inlineCode",{parentName:"td"},"GLOBAL_SORT"),"."),(0,i.kt)("li",null,(0,i.kt)("inlineCode",{parentName:"td"},"PARTITION_PATH_REPARTITION"),": This ensures that the data for a single physical partition in the table is written by the same Spark executor. This should only be used when input data is evenly distributed across different partition paths. If data is skewed (most records are intended for a handful of partition paths among all) then this can cause an imbalance among Spark executors."),(0,i.kt)("li",null,(0,i.kt)("inlineCode",{parentName:"td"},"PARTITION_PATH_REPARTITION_AND_SORT"),": This ensures that the data for a single physical partition in the table is written by the same Spark executor. This should only be used when input data is evenly distributed across different partition paths. Compared to ",(0,i.kt)("inlineCode",{parentName:"td"},"PARTITION_PATH_REPARTITION"),", this sort mode does an additional step of sorting the records based on the partition path within a single Spark partition, given that data for multiple physical partitions can be sent to the same Spark partition and executor. If data is skewed (most records are intended for a handful of partition paths among all) then this can cause an imbalance among Spark executors.")),(0,i.kt)("br",null),(0,i.kt)("inlineCode",{parentName:"td"},"Config Param: BULK_INSERT_SORT_MODE"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"hoodie.bootstrap.base.path"),(0,i.kt)("td",{parentName:"tr",align:null},"N/A ",(0,i.kt)("strong",{parentName:"td"},"(Required)")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("strong",{parentName:"td"},"Applicable only when")," operation type is ",(0,i.kt)("inlineCode",{parentName:"td"},"bootstrap"),". Base path of the dataset that needs to be bootstrapped as a Hudi table",(0,i.kt)("br",null),(0,i.kt)("br",null),(0,i.kt)("inlineCode",{parentName:"td"},"Config Param: BASE_PATH"),(0,i.kt)("br",null),(0,i.kt)("inlineCode",{parentName:"td"},"Since Version: 0.6.0"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"hoodie.bootstrap.mode.selector"),(0,i.kt)("td",{parentName:"tr",align:null},"org.apache.hudi.client.bootstrap.selector.MetadataOnlyBootstrapModeSelector (Optional)"),(0,i.kt)("td",{parentName:"tr",align:null},"Selects the mode in which each file/partition in the bootstrapped dataset gets bootstrapped",(0,i.kt)("br",null),"Possible values:",(0,i.kt)("ul",null,(0,i.kt)("li",null,(0,i.kt)("inlineCode",{parentName:"td"},"org.apache.hudi.client.bootstrap.selector.MetadataOnlyBootstrapModeSelector"),": In this mode, the full record data is not copied into Hudi therefore it avoids full cost of rewriting the dataset. Instead, 'skeleton' files containing just the corresponding metadata columns are added to the Hudi table. Hudi relies on the data in the original table and will face data-loss or corruption if files in the original table location are deleted or modified."),(0,i.kt)("li",null,(0,i.kt)("inlineCode",{parentName:"td"},"org.apache.hudi.client.bootstrap.selector.FullRecordBootstrapModeSelector"),": In this mode, the full record data is copied into hudi and metadata columns are added. A full record bootstrap is functionally equivalent to a bulk-insert. After a full record bootstrap, Hudi will function properly even if the original table is modified or deleted."),(0,i.kt)("li",null,(0,i.kt)("inlineCode",{parentName:"td"},"org.apache.hudi.client.bootstrap.selector.BootstrapRegexModeSelector"),": A bootstrap selector which employs bootstrap mode by specified partitions.")),(0,i.kt)("br",null),(0,i.kt)("inlineCode",{parentName:"td"},"Config Param: MODE_SELECTOR_CLASS_NAME"),(0,i.kt)("br",null),(0,i.kt)("inlineCode",{parentName:"td"},"Since Version: 0.6.0"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"hoodie.datasource.write.partitions.to.delete"),(0,i.kt)("td",{parentName:"tr",align:null},"N/A ",(0,i.kt)("strong",{parentName:"td"},"(Required)")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("strong",{parentName:"td"},"Applicable only when")," operation type is ",(0,i.kt)("inlineCode",{parentName:"td"},"delete_partition"),". Comma separated list of partitions to delete. Allows use of wildcard *",(0,i.kt)("br",null),(0,i.kt)("br",null),(0,i.kt)("inlineCode",{parentName:"td"},"Config Param: PARTITIONS_TO_DELETE"))))),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Flink based configs:")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Config Name"),(0,i.kt)("th",{parentName:"tr",align:null},"Default"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"write.operation"),(0,i.kt)("td",{parentName:"tr",align:null},"upsert (Optional)"),(0,i.kt)("td",{parentName:"tr",align:null},"The write operation, that this write should do",(0,i.kt)("br",null),(0,i.kt)("br",null)," ",(0,i.kt)("inlineCode",{parentName:"td"},"Config Param: OPERATION"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"precombine.field"),(0,i.kt)("td",{parentName:"tr",align:null},"ts (Optional)"),(0,i.kt)("td",{parentName:"tr",align:null},"Field used in preCombining before actual write. When two records have the same key value, we will pick the one with the largest value for the precombine field, determined by Object.compareTo(..)",(0,i.kt)("br",null),(0,i.kt)("br",null)," ",(0,i.kt)("inlineCode",{parentName:"td"},"Config Param: PRECOMBINE_FIELD"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"write.precombine"),(0,i.kt)("td",{parentName:"tr",align:null},"false (Optional)"),(0,i.kt)("td",{parentName:"tr",align:null},"Flag to indicate whether to drop duplicates before insert/upsert. By default these cases will accept duplicates, to gain extra performance: 1) insert operation; 2) upsert for MOR table, the MOR table deduplicate on reading",(0,i.kt)("br",null),(0,i.kt)("br",null)," ",(0,i.kt)("inlineCode",{parentName:"td"},"Config Param: PRE_COMBINE"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"write.bulk_insert.sort_input"),(0,i.kt)("td",{parentName:"tr",align:null},"true (Optional)"),(0,i.kt)("td",{parentName:"tr",align:null},"Whether to sort the inputs by specific fields for bulk insert tasks, default true",(0,i.kt)("br",null),(0,i.kt)("br",null)," ",(0,i.kt)("inlineCode",{parentName:"td"},"Config Param: WRITE_BULK_INSERT_SORT_INPUT"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"write.bulk_insert.sort_input.by_record_key"),(0,i.kt)("td",{parentName:"tr",align:null},"false (Optional)"),(0,i.kt)("td",{parentName:"tr",align:null},"Whether to sort the inputs by record keys for bulk insert tasks, default false",(0,i.kt)("br",null),(0,i.kt)("br",null)," ",(0,i.kt)("inlineCode",{parentName:"td"},"Config Param: WRITE_BULK_INSERT_SORT_INPUT_BY_RECORD_KEY"))))),(0,i.kt)("h2",{id:"writing-path"},"Writing path"),(0,i.kt)("p",null,"The following is an inside look on the Hudi write path and the sequence of events that occur during a write."),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"/docs/configurations#hoodiecombinebeforeinsert"},"Deduping"),(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},"First your input records may have duplicate keys within the same batch and duplicates need to be combined or reduced by key."))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"/docs/next/indexing"},"Index Lookup"),(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},"Next, an index lookup is performed to try and match the input records to identify which file groups they belong to."))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"/docs/next/file_sizing"},"File Sizing"),(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},"Then, based on the average size of previous commits, Hudi will make a plan to add enough records to a small file to get it close to the configured maximum limit."))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"/docs/next/file_layouts"},"Partitioning"),(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},"We now arrive at partitioning where we decide what file groups certain updates and inserts will be placed in or if new file groups will be created"))),(0,i.kt)("li",{parentName:"ol"},"Write I/O",(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},"Now we actually do the write operations which is either creating a new base file, appending to the log file,\nor versioning an existing base file."))),(0,i.kt)("li",{parentName:"ol"},"Update ",(0,i.kt)("a",{parentName:"li",href:"/docs/next/indexing"},"Index"),(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},"Now that the write is performed, we will go back and update the index."))),(0,i.kt)("li",{parentName:"ol"},"Commit",(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},"Finally we commit all of these changes atomically. (A ",(0,i.kt)("a",{parentName:"li",href:"/docs/next/writing_data#commit-notifications"},"callback notification")," is exposed)"))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"/docs/next/hoodie_cleaner"},"Clean")," (if needed)",(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},"Following the commit, cleaning is invoked if needed."))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"/docs/next/compaction"},"Compaction"),(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},"If you are using MOR tables, compaction will either run inline, or be scheduled asynchronously"))),(0,i.kt)("li",{parentName:"ol"},"Archive",(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},"Lastly, we perform an archival step which moves old ",(0,i.kt)("a",{parentName:"li",href:"/docs/next/timeline"},"timeline")," items to an archive folder.")))),(0,i.kt)("p",null,"Here is a diagramatic representation of the flow."),(0,i.kt)("figure",null,(0,i.kt)("img",{className:"docimage",src:a(40381).Z,alt:"hudi_write_path.png"})),(0,i.kt)("h2",{id:"related-resources"},"Related Resources"),(0,i.kt)("h3",null,"Videos"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://youtu.be/94DPKkzDm-8"},"Insert | Update | Delete On Datalake (S3) with Apache Hudi and glue Pyspark")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://youtu.be/hK1G7CPBL2M"},"Insert|Update|Read|Write|SnapShot| Time Travel |incremental Query on Apache Hudi datalake (S3)")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://www.youtube.com/watch?v=AuZoREO8_zs"},"Apache Hudi Bulk Insert Sort Modes a summary of two incredible blogs"))))}u.isMDXComponent=!0},40381:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/hudi_write_path-c78452c9402d493b4aad08d4beae79d5.png"}}]);