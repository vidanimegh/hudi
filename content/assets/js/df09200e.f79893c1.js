"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[48379],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>g});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),c=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(a),g=n,d=p["".concat(s,".").concat(g)]||p[g]||m[g]||i;return a?r.createElement(d,o(o({ref:t},u),{},{components:a})):r.createElement(d,o({ref:t},u))}));function g(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,o=new Array(i);o[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:n,o[1]=l;for(var c=2;c<i;c++)o[c]=a[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}p.displayName="MDXCreateElement"},6746:(e,t,a)=>{a.d(t,{Z:()=>i});var r=a(67294),n=a(72389);function i(e){let{children:t,url:i}=e;return(0,n.Z)()&&(a.g.window.location.href=i),r.createElement("span",null,t,"or click ",r.createElement("a",{href:i},"here"))}},63734:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var r=a(87462),n=(a(67294),a(3905)),i=a(6746);const o={title:"Ingest streaming data to Apache Hudi tables using AWS Glue and Apache Hudi DeltaStreamer",authors:[{name:"Vishal Pathak"},{name:"Anand Prakash"},{name:"Noritaka Sekiyama"}],category:"blog",image:"/assets/images/blog/2022-10-06_Ingest_streaming_data_to_Apache_Hudi_tables_using_AWS_Glue_and_DeltaStreamer.png",tags:["how-to","streaming ingestion","deltastreamer","amazon"]},l=void 0,s={permalink:"/blog/2022/10/06/Ingest-streaming-data-to-Apache-Hudi-using-AWS-Glue-and-DeltaStreamer",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2022-10-06-Ingest-streaming-data-to-Apache-Hudi-using-AWS-Glue-and-DeltaStreamer.mdx",source:"@site/blog/2022-10-06-Ingest-streaming-data-to-Apache-Hudi-using-AWS-Glue-and-DeltaStreamer.mdx",title:"Ingest streaming data to Apache Hudi tables using AWS Glue and Apache Hudi DeltaStreamer",description:"Redirecting... please wait!!",date:"2022-10-06T00:00:00.000Z",formattedDate:"October 6, 2022",tags:[{label:"how-to",permalink:"/blog/tags/how-to"},{label:"streaming ingestion",permalink:"/blog/tags/streaming-ingestion"},{label:"deltastreamer",permalink:"/blog/tags/deltastreamer"},{label:"amazon",permalink:"/blog/tags/amazon"}],readingTime:.045,truncated:!1,authors:[{name:"Vishal Pathak"},{name:"Anand Prakash"},{name:"Noritaka Sekiyama"}],nextItem:{title:"Data processing with Spark: time traveling",permalink:"/blog/2022/09/28/Data-processing-with-Spark-time-traveling"}},c={authorsImageUrls:[void 0,void 0,void 0]},u=[],m={toc:u};function p(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)(i.Z,{url:"https://aws.amazon.com/blogs/big-data/ingest-streaming-data-to-apache-hudi-tables-using-aws-glue-and-apache-hudi-deltastreamer/",mdxType:"Redirect"},"Redirecting... please wait!! "))}p.isMDXComponent=!0}}]);