"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[70105],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>h});var r=a(67294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,i=function(e,t){if(null==e)return{};var a,r,i={},n=Object.keys(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var l=r.createContext({}),p=function(e){var t=r.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,i=e.mdxType,n=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=p(a),m=i,h=d["".concat(l,".").concat(m)]||d[m]||c[m]||n;return a?r.createElement(h,o(o({ref:t},u),{},{components:a})):r.createElement(h,o({ref:t},u))}));function h(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var n=a.length,o=new Array(n);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:i,o[1]=s;for(var p=2;p<n;p++)o[p]=a[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},39187:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>o,default:()=>d,frontMatter:()=>n,metadata:()=>s,toc:()=>l});var r=a(87462),i=(a(67294),a(3905));const n={title:"Spark Tuning Guide",keywords:["hudi","tuning","performance"],last_modified_at:new Date("2021-09-29T19:59:57.000Z")},o="Spark Tuning Guide",s={unversionedId:"tuning-guide",id:"tuning-guide",title:"Spark Tuning Guide",description:"To get a better understanding of where your Hudi jobs is spending its time, use a tool like YourKit Java Profiler, to obtain heap dumps/flame graphs.",source:"@site/docs/tuning-guide.md",sourceDirName:".",slug:"/tuning-guide",permalink:"/cn/docs/next/tuning-guide",editUrl:"https://github.com/apache/hudi/tree/asf-site/website/docs/tuning-guide.md",tags:[],version:"current",frontMatter:{title:"Spark Tuning Guide",keywords:["hudi","tuning","performance"],last_modified_at:"2021-09-29T19:59:57.000Z"},sidebar:"docs",previous:{title:"Troubleshooting",permalink:"/cn/docs/next/troubleshooting"},next:{title:"Flink Tuning Guide",permalink:"/cn/docs/next/flink_tuning"}},l=[{value:"Writing",id:"writing",children:[{value:"General Tips",id:"general-tips",children:[],level:3},{value:"Spark failures",id:"spark-ui",children:[],level:3},{value:"Hudi consumes too much space in a temp folder while upsert",id:"hudi-consumes-too-much-space-in-a-temp-folder-while-upsert",children:[],level:3},{value:"How to tune shuffle parallelism of Hudi jobs ?",id:"how-to-tune-shuffle-parallelism-of-hudi-jobs-",children:[],level:3},{value:"GC Tuning",id:"gc-tuning",children:[],level:3}],level:2}],p={toc:l},u="wrapper";function d(e){let{components:t,...n}=e;return(0,i.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"spark-tuning-guide"},"Spark Tuning Guide"),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Profiling Tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"To get a better understanding of where your Hudi jobs is spending its time, use a tool like ",(0,i.kt)("a",{parentName:"p",href:"https://www.yourkit.com/download/"},"YourKit Java Profiler"),", to obtain heap dumps/flame graphs."))),(0,i.kt)("h2",{id:"writing"},"Writing"),(0,i.kt)("h3",{id:"general-tips"},"General Tips"),(0,i.kt)("p",null,"Writing data via Hudi happens as a Spark job and thus general rules of spark debugging applies here too. Below is a list of things to keep in mind, if you are looking to improving performance or reliability."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Input Parallelism")," : By default, Hudi follows the input parallelism. Bump this up accordingly if you have larger inputs, that can cause more shuffles. We recommend tuning shuffle parallelism hoodie.","[insert|upsert|bulkinsert]",".shuffle.parallelism such that its at least input_data_size/500MB."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Off-heap memory")," : Hudi writes parquet files and that needs good amount of off-heap memory proportional to schema width. Consider setting something like spark.executor.memoryOverhead or spark.driver.memoryOverhead, if you are running into such failures."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Spark Memory")," : Typically, hudi needs to be able to read a single file into memory to perform merges or compactions and thus the executor memory should be sufficient to accomodate this. In addition, Hudi caches the input to be able to intelligently place data and thus leaving some ",(0,i.kt)("inlineCode",{parentName:"p"},"spark.memory.storageFraction")," will generally help boost performance."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Sizing files"),": Set target file sizes judiciously, to balance ingest/write latency vs number of files & consequently metadata overhead associated with it."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Timeseries/Log data")," : Default configs are tuned for database/nosql changelogs where individual record sizes are large. Another very popular class of data is timeseries/event/log data that tends to be more volumnious with lot more records per partition. In such cases consider tuning the bloom filter accuracy to achieve your target index look up time or use a bucketed index configuration. Also, consider making a key that is prefixed with time of the event, which will enable range pruning & significantly speeding up index lookup."),(0,i.kt)("h3",{id:"spark-ui"},"Spark failures"),(0,i.kt)("p",null,"Typical upsert() DAG looks like below. Note that Hudi client also caches intermediate RDDs to intelligently profile workload and size files and spark parallelism.\nAlso Spark UI shows sortByKey twice due to the probe job also being shown, nonetheless its just a single sort."),(0,i.kt)("figure",null,(0,i.kt)("img",{className:"docimage",src:a(77102).Z,alt:"hudi_upsert_dag.png"})),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"At a high level, there are two steps"),":"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Index Lookup to identify files to be changed")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Job 1 : Triggers the input data read, converts to HoodieRecord object and then stops at obtaining a spread of input records to target partition paths"),(0,i.kt)("li",{parentName:"ul"},"Job 2 : Load the set of file names which we need check against"),(0,i.kt)("li",{parentName:"ul"},"Job 3  & 4 : Actual lookup after smart sizing of spark join parallelism, by joining RDDs in 1 & 2 above"),(0,i.kt)("li",{parentName:"ul"},"Job 5 : Have a tagged RDD of recordKeys with locations")),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Performing the actual writing of data")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Job 6 : Lazy join of incoming records against recordKey, location to provide a final set of HoodieRecord which now contain the information about which file/partitionpath they are found at (or null if insert). Then also profile the workload again to determine sizing of files"),(0,i.kt)("li",{parentName:"ul"},"Job 7 : Actual writing of data (update + insert + insert turned to updates to maintain file size)")),(0,i.kt)("p",null,"Depending on the exception source (Hudi/Spark), the above knowledge of the DAG can be used to pinpoint the actual issue. The most often encountered failures result from YARN/DFS temporary failures.\nIn the future, a more sophisticated debug/management UI would be added to the project, that can help automate some of this debugging."),(0,i.kt)("h3",{id:"hudi-consumes-too-much-space-in-a-temp-folder-while-upsert"},"Hudi consumes too much space in a temp folder while upsert"),(0,i.kt)("p",null,"When upsert large input data, hudi spills part of input data to disk when reach the max memory for merge. if there is enough memory, please increase spark executor's memory and  ",(0,i.kt)("inlineCode",{parentName:"p"},"hoodie.memory.merge.fraction")," option, for example\n",(0,i.kt)("inlineCode",{parentName:"p"},'option("hoodie.memory.merge.fraction", "0.8")')),(0,i.kt)("h3",{id:"how-to-tune-shuffle-parallelism-of-hudi-jobs-"},"How to tune shuffle parallelism of Hudi jobs ?"),(0,i.kt)("p",null,"First, let's understand what the term parallelism means in the context of Hudi jobs. For any Hudi job using Spark, parallelism equals to the number of spark partitions that should be generated for a particular stage in the DAG. To understand more about spark partitions, read this ",(0,i.kt)("a",{parentName:"p",href:"https://www.dezyre.com/article/how-data-partitioning-in-spark-helps-achieve-more-parallelism/297"},"article"),". In spark, each spark partition is mapped to a spark task that can be executed on an executor. Typically, for a spark application the following hierarchy holds true"),(0,i.kt)("p",null,"(Spark Application \u2192 N Spark Jobs \u2192 M Spark Stages \u2192 T Spark Tasks) on (E executors with C cores)"),(0,i.kt)("p",null,"A spark application can be given E number of executors to run the spark application on. Each executor might hold 1 or more spark cores. Every spark task will require atleast 1 core to execute, so imagine T number of tasks to be done in Z time depending on C cores. The higher C, Z is smaller."),(0,i.kt)("p",null,"With this understanding, if you want your DAG stage to run faster, bring T as close or higher to C. Additionally, this parallelism finally controls the number of output files you write using a Hudi based job. Let's understand the different kinds of knobs available:"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://hudi.apache.org/docs/configurations#hoodiebulkinsertshuffleparallelism"},"BulkInsertParallelism")," \u2192 This is used to control the parallelism with which output files will be created by a Hudi job. The higher this parallelism, the more number of tasks are created and hence the more number of output files will eventually be created. Even if you define ",(0,i.kt)("a",{parentName:"p",href:"https://hudi.apache.org/docs/configurations#hoodieparquetmaxfilesize"},"parquet-max-file-size")," to be of a high value, if you make parallelism really high, the max file size cannot be honored since the spark tasks are working on smaller amounts of data."),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://hudi.apache.org/docs/configurations#hoodieupsertshuffleparallelism"},"Upsert")," / ",(0,i.kt)("a",{parentName:"p",href:"https://hudi.apache.org/docs/configurations#hoodieinsertshuffleparallelism"},"Insert Parallelism")," \u2192 This is used to control how fast the read process should be when reading data into the job. Find more details ",(0,i.kt)("a",{parentName:"p",href:"https://hudi.apache.org/docs/configurations/"},"here"),"."),(0,i.kt)("h3",{id:"gc-tuning"},"GC Tuning"),(0,i.kt)("p",null,"Please be sure to follow garbage collection tuning tips from Spark tuning guide to avoid OutOfMemory errors. Must Use G1/CMS Collector. Sample CMS Flags to add to spark.executor.extraJavaOptions:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"-XX:NewSize=1g -XX:SurvivorRatio=2 -XX:+UseCompressedOops -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:CMSInitiatingOccupancyFraction=70 -XX:+PrintGCDetails -XX:+PrintGCTimeStamps -XX:+PrintGCDateStamps -XX:+PrintGCApplicationStoppedTime -XX:+PrintGCApplicationConcurrentTime -XX:+PrintTenuringDistribution -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/hoodie-heapdump.hprof\n")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"OutOfMemory Errors"),": If it keeps OOMing still, reduce spark memory conservatively: spark.memory.fraction=0.2, spark.memory.storageFraction=0.2 allowing it to spill rather than OOM. (reliably slow vs crashing intermittently)"),(0,i.kt)("p",null,"Below is a full working production config used at Uber (HDFS/Yarn), for their ingest platform."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"spark.driver.extraClassPath /etc/hive/conf\nspark.driver.extraJavaOptions -XX:+PrintTenuringDistribution -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCApplicationStoppedTime -XX:+PrintGCApplicationConcurrentTime -XX:+PrintGCTimeStamps -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/hoodie-heapdump.hprof\nspark.driver.maxResultSize 2g\nspark.driver.memory 4g\nspark.executor.cores 1\nspark.executor.extraJavaOptions -XX:+PrintFlagsFinal -XX:+PrintReferenceGC -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCTimeStamps -XX:+PrintAdaptiveSizePolicy -XX:+UnlockDiagnosticVMOptions -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/hoodie-heapdump.hprof\nspark.executor.id driver\nspark.executor.instances 300\nspark.executor.memory 6g\nspark.rdd.compress true\n\nspark.kryoserializer.buffer.max 512m\nspark.serializer org.apache.spark.serializer.KryoSerializer\nspark.shuffle.service.enabled true\nspark.submit.deployMode cluster\nspark.task.cpus 1\nspark.task.maxFailures 4\n\nspark.driver.memoryOverhead 1024\nspark.executor.memoryOverhead 3072\nspark.yarn.max.executor.failures 100\n")))}d.isMDXComponent=!0},77102:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/hudi_upsert_dag-3b2d81de8560fad7af112e40a2f8c437.png"}}]);