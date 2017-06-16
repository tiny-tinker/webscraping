/*!
* TableSorter 2.17.7 min - Client-side table sorting with ease!
* Copyright (c) 2007 Christian Bach
*/
!function(h){h.extend({tablesorter:new function(){function d(){var a=arguments[0],b=1<arguments.length?Array.prototype.slice.call(arguments):a;if("undefined"!==typeof console&&"undefined"!==typeof console.log)console[/error/i.test(a)?"error":/warn/i.test(a)?"warn":"log"](b);else alert(b)}function q(a,b){d(a+" ("+((new Date).getTime()-b.getTime())+"ms)")}function n(a){for(var b in a)return!1;return!0}function r(a,b,c){if(!b)return"";var g,e=a.config,l=e.textExtraction||"",d="",d="basic"===l?h(b).attr(e.textAttribute)|| b.textContent||b.innerText||h(b).text()||"":"function"===typeof l?l(b,a,c):"function"===typeof(g=f.getColumnData(a,l,c))?g(b,a,c):b.textContent||b.innerText||h(b).text()||"";return h.trim(d)}function v(a){var b,c,g=a.config,e=g.$tbodies=g.$table.children("tbody:not(."+g.cssInfoBlock+")"),l,x,k,h,m,B,u,s,t,n=0,v="",w=e.length;if(0===w)return g.debug?d("Warning: *Empty table!* Not building a parser cache"):"";g.debug&&(t=new Date,d("Detecting parsers for each column"));b=[];for(c=[];n<w;){l=e[n].rows; if(l[n])for(x=g.columns,k=0;k<x;k++){h=g.$headers.filter('[data-column="'+k+'"]:last');m=f.getColumnData(a,g.headers,k);s=f.getParserById(f.getData(h,m,"extractor"));u=f.getParserById(f.getData(h,m,"sorter"));B="false"===f.getData(h,m,"parser");g.empties[k]=f.getData(h,m,"empty")||g.emptyTo||(g.emptyToBottom?"bottom":"top");g.strings[k]=f.getData(h,m,"string")||g.stringTo||"max";B&&(u=f.getParserById("no-parser"));s||(s=!1);if(!u)a:{h=a;m=l;B=-1;u=k;for(var A=void 0,K=f.parsers.length,H=!1,z="",A= !0;""===z&&A;)B++,m[B]?(H=m[B].cells[u],z=r(h,H,u),h.config.debug&&d("Checking if value was empty on row "+B+", column: "+u+': "'+z+'"')):A=!1;for(;0<=--K;)if((A=f.parsers[K])&&"text"!==A.id&&A.is&&A.is(z,h,H)){u=A;break a}u=f.getParserById("text")}g.debug&&(v+="column:"+k+"; extractor:"+s.id+"; parser:"+u.id+"; string:"+g.strings[k]+"; empty: "+g.empties[k]+"\n");c[k]=u;b[k]=s}n+=c.length?w:1}g.debug&&(d(v?v:"No parsers detected"),q("Completed detecting parsers",t));g.parsers=c;g.extractors=b}function w(a){var b, c,g,e,l,x,k,p,m,n,u,s=a.config,t=s.$table.children("tbody"),v=s.extractors,w=s.parsers;s.cache={};s.totalRows=0;if(!w)return s.debug?d("Warning: *Empty table!* Not building a cache"):"";s.debug&&(p=new Date);s.showProcessing&&f.isProcessing(a,!0);for(l=0;l<t.length;l++)if(u=[],b=s.cache[l]={normalized:[]},!t.eq(l).hasClass(s.cssInfoBlock)){m=t[l]&&t[l].rows.length||0;for(g=0;g<m;++g)if(n={child:[]},x=h(t[l].rows[g]),k=[],x.hasClass(s.cssChildRow)&&0!==g)c=b.normalized.length-1,b.normalized[c][s.columns].$row= b.normalized[c][s.columns].$row.add(x),x.prev().hasClass(s.cssChildRow)||x.prev().addClass(f.css.cssHasChild),n.child[c]=h.trim(x[0].textContent||x[0].innerText||x.text()||"");else{n.$row=x;n.order=g;for(e=0;e<s.columns;++e)"undefined"===typeof w[e]?s.debug&&d("No parser found for cell:",x[0].cells[e],"does it have a header?"):(c=r(a,x[0].cells[e],e),c="undefined"===typeof v[e].id?c:v[e].format(c,a,x[0].cells[e],e),c="no-parser"===w[e].id?"":w[e].format(c,a,x[0].cells[e],e),k.push(s.ignoreCase&&"string"=== typeof c?c.toLowerCase():c),"numeric"===(w[e].type||"").toLowerCase()&&(u[e]=Math.max(Math.abs(c)||0,u[e]||0)));k[s.columns]=n;b.normalized.push(k)}b.colMax=u;s.totalRows+=b.normalized.length}s.showProcessing&&f.isProcessing(a);s.debug&&q("Building cache for "+m+" rows",p)}function z(a,b){var c=a.config,g=c.widgetOptions,e=a.tBodies,l=[],d=c.cache,k,p,m,r,u,s;if(n(d))return c.appender?c.appender(a,l):a.isUpdating?c.$table.trigger("updateComplete",a):"";c.debug&&(s=new Date);for(u=0;u<e.length;u++)if(k= h(e[u]),k.length&&!k.hasClass(c.cssInfoBlock)){m=f.processTbody(a,k,!0);k=d[u].normalized;p=k.length;for(r=0;r<p;r++)l.push(k[r][c.columns].$row),c.appender&&(!c.pager||c.pager.removeRows&&g.pager_removeRows||c.pager.ajax)||m.append(k[r][c.columns].$row);f.processTbody(a,m,!1)}c.appender&&c.appender(a,l);c.debug&&q("Rebuilt table",s);b||c.appender||f.applyWidget(a);a.isUpdating&&c.$table.trigger("updateComplete",a)}function D(a){return/^d/i.test(a)||1===a}function E(a){var b,c,g,e,l,x,k,p=a.config; p.headerList=[];p.headerContent=[];p.debug&&(k=new Date);p.columns=f.computeColumnIndex(p.$table.children("thead, tfoot").children("tr"));e=p.cssIcon?'<i class="'+(p.cssIcon===f.css.icon?f.css.icon:p.cssIcon+" "+f.css.icon)+'"></i>':"";p.$headers=h(a).find(p.selectorHeaders).each(function(k){c=h(this);b=f.getColumnData(a,p.headers,k,!0);p.headerContent[k]=h(this).html();l=p.headerTemplate.replace(/\{content\}/g,h(this).html()).replace(/\{icon\}/g,e);p.onRenderTemplate&&(g=p.onRenderTemplate.apply(c, [k,l]))&&"string"===typeof g&&(l=g);h(this).html('<div class="'+f.css.headerIn+'">'+l+"</div>");p.onRenderHeader&&p.onRenderHeader.apply(c,[k]);this.column=parseInt(h(this).attr("data-column"),10);this.order=D(f.getData(c,b,"sortInitialOrder")||p.sortInitialOrder)?[1,0,2]:[0,1,2];this.count=-1;this.lockedOrder=!1;x=f.getData(c,b,"lockedOrder")||!1;"undefined"!==typeof x&&!1!==x&&(this.order=this.lockedOrder=D(x)?[1,1,1]:[0,0,0]);c.addClass(f.css.header+" "+p.cssHeader);p.headerList[k]=this;c.parent().addClass(f.css.headerRow+ " "+p.cssHeaderRow).attr("role","row");p.tabIndex&&c.attr("tabindex",0)}).attr({scope:"col",role:"columnheader"});C(a);p.debug&&(q("Built headers:",k),d(p.$headers))}function F(a,b,c){var g=a.config;g.$table.find(g.selectorRemove).remove();v(a);w(a);I(g.$table,b,c)}function C(a){var b,c,g,e=a.config;e.$headers.each(function(l,d){c=h(d);g=f.getColumnData(a,e.headers,l,!0);b="false"===f.getData(d,g,"sorter")||"false"===f.getData(d,g,"parser");d.sortDisabled=b;c[b?"addClass":"removeClass"]("sorter-false").attr("aria-disabled", ""+b);a.id&&(b?c.removeAttr("aria-controls"):c.attr("aria-controls",a.id))})}function G(a){var b,c,g=a.config,e=g.sortList,l=e.length,d=f.css.sortNone+" "+g.cssNone,k=[f.css.sortAsc+" "+g.cssAsc,f.css.sortDesc+" "+g.cssDesc],p=["ascending","descending"],m=h(a).find("tfoot tr").children().add(g.$extraHeaders).removeClass(k.join(" "));g.$headers.removeClass(k.join(" ")).addClass(d).attr("aria-sort","none");for(b=0;b<l;b++)if(2!==e[b][1]&&(a=g.$headers.not(".sorter-false").filter('[data-column="'+e[b][0]+ '"]'+(1===l?":last":"")),a.length)){for(c=0;c<a.length;c++)a[c].sortDisabled||a.eq(c).removeClass(d).addClass(k[e[b][1]]).attr("aria-sort",p[e[b][1]]);m.length&&m.filter('[data-column="'+e[b][0]+'"]').removeClass(d).addClass(k[e[b][1]])}g.$headers.not(".sorter-false").each(function(){var a=h(this),b=this.order[(this.count+1)%(g.sortReset?3:2)],b=a.text()+": "+f.language[a.hasClass(f.css.sortAsc)?"sortAsc":a.hasClass(f.css.sortDesc)?"sortDesc":"sortNone"]+f.language[0===b?"nextAsc":1===b?"nextDesc": "nextNone"];a.attr("aria-label",b)})}function O(a){if(a.config.widthFixed&&0===h(a).find("colgroup").length){var b=h("<colgroup>"),c=h(a).width();h(a.tBodies[0]).find("tr:first").children(":visible").each(function(){b.append(h("<col>").css("width",parseInt(h(this).width()/c*1E3,10)/10+"%"))});h(a).prepend(b)}}function P(a,b){var c,g,e,l,f,k=a.config,d=b||k.sortList;k.sortList=[];h.each(d,function(a,b){l=parseInt(b[0],10);if(e=k.$headers.filter('[data-column="'+l+'"]:last')[0]){g=(g=(""+b[1]).match(/^(1|d|s|o|n)/))? g[0]:"";switch(g){case "1":case "d":g=1;break;case "s":g=f||0;break;case "o":c=e.order[(f||0)%(k.sortReset?3:2)];g=0===c?1:1===c?0:2;break;case "n":e.count+=1;g=e.order[e.count%(k.sortReset?3:2)];break;default:g=0}f=0===a?g:f;c=[l,parseInt(g,10)||0];k.sortList.push(c);g=h.inArray(c[1],e.order);e.count=0<=g?g:c[1]%(k.sortReset?3:2)}})}function Q(a,b){return a&&a[b]?a[b].type||"":""}function L(a,b,c){if(a.isUpdating)return setTimeout(function(){L(a,b,c)},50);var g,e,l,d,k=a.config,p=!c[k.sortMultiSortKey], m=k.$table;m.trigger("sortStart",a);b.count=c[k.sortResetKey]?2:(b.count+1)%(k.sortReset?3:2);k.sortRestart&&(e=b,k.$headers.each(function(){this===e||!p&&h(this).is("."+f.css.sortDesc+",."+f.css.sortAsc)||(this.count=-1)}));e=b.column;if(p){k.sortList=[];if(null!==k.sortForce)for(g=k.sortForce,l=0;l<g.length;l++)g[l][0]!==e&&k.sortList.push(g[l]);g=b.order[b.count];if(2>g&&(k.sortList.push([e,g]),1<b.colSpan))for(l=1;l<b.colSpan;l++)k.sortList.push([e+l,g])}else{if(k.sortAppend&&1<k.sortList.length)for(l= 0;l<k.sortAppend.length;l++)d=f.isValueInArray(k.sortAppend[l][0],k.sortList),0<=d&&k.sortList.splice(d,1);if(0<=f.isValueInArray(e,k.sortList))for(l=0;l<k.sortList.length;l++)d=k.sortList[l],g=k.$headers.filter('[data-column="'+d[0]+'"]:last')[0],d[0]===e&&(d[1]=g.order[b.count],2===d[1]&&(k.sortList.splice(l,1),g.count=-1));else if(g=b.order[b.count],2>g&&(k.sortList.push([e,g]),1<b.colSpan))for(l=1;l<b.colSpan;l++)k.sortList.push([e+l,g])}if(null!==k.sortAppend)for(g=k.sortAppend,l=0;l<g.length;l++)g[l][0]!== e&&k.sortList.push(g[l]);m.trigger("sortBegin",a);setTimeout(function(){G(a);J(a);z(a);m.trigger("sortEnd",a)},1)}function J(a){var b,c,g,e,l,d,k,h,m,r,u,s=0,t=a.config,v=t.textSorter||"",w=t.sortList,y=w.length,z=a.tBodies.length;if(!t.serverSideSorting&&!n(t.cache)){t.debug&&(l=new Date);for(c=0;c<z;c++)d=t.cache[c].colMax,k=t.cache[c].normalized,k.sort(function(c,l){for(b=0;b<y;b++){e=w[b][0];h=w[b][1];s=0===h;if(t.sortStable&&c[e]===l[e]&&1===y)break;(g=/n/i.test(Q(t.parsers,e)))&&t.strings[e]? (g="boolean"===typeof t.string[t.strings[e]]?(s?1:-1)*(t.string[t.strings[e]]?-1:1):t.strings[e]?t.string[t.strings[e]]||0:0,m=t.numberSorter?t.numberSorter(c[e],l[e],s,d[e],a):f["sortNumeric"+(s?"Asc":"Desc")](c[e],l[e],g,d[e],e,a)):(r=s?c:l,u=s?l:c,m="function"===typeof v?v(r[e],u[e],s,e,a):"object"===typeof v&&v.hasOwnProperty(e)?v[e](r[e],u[e],s,e,a):f["sortNatural"+(s?"Asc":"Desc")](c[e],l[e],e,a,t));if(m)return m}return c[t.columns].order-l[t.columns].order});t.debug&&q("Sorting on "+w.toString()+ " and dir "+h+" time",l)}}function M(a,b){a[0].isUpdating&&a.trigger("updateComplete");h.isFunction(b)&&b(a[0])}function I(a,b,c){var g=a[0].config.sortList;!1!==b&&!a[0].isProcessing&&g.length?a.trigger("sorton",[g,function(){M(a,c)},!0]):(M(a,c),f.applyWidget(a[0],!1))}function N(a){var b=a.config,c=b.$table;c.unbind("sortReset update updateRows updateCell updateAll addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ".split(" ").join(b.namespace+ " ")).bind("sortReset"+b.namespace,function(g,e){g.stopPropagation();b.sortList=[];G(a);J(a);z(a);h.isFunction(e)&&e(a)}).bind("updateAll"+b.namespace,function(g,e,c){g.stopPropagation();a.isUpdating=!0;f.refreshWidgets(a,!0,!0);f.restoreHeaders(a);E(a);f.bindEvents(a,b.$headers,!0);N(a);F(a,e,c)}).bind("update"+b.namespace+" updateRows"+b.namespace,function(b,e,c){b.stopPropagation();a.isUpdating=!0;C(a);F(a,e,c)}).bind("updateCell"+b.namespace,function(g,e,l,f){g.stopPropagation();a.isUpdating= !0;c.find(b.selectorRemove).remove();var d,p,m;p=c.find("tbody");m=h(e);g=p.index(h.fn.closest?m.closest("tbody"):m.parents("tbody").filter(":first"));d=h.fn.closest?m.closest("tr"):m.parents("tr").filter(":first");e=m[0];p.length&&0<=g&&(p=p.eq(g).find("tr").index(d),m=m.index(),b.cache[g].normalized[p][b.columns].$row=d,d="undefined"===typeof b.extractors[m].id?r(a,e,m):b.extractors[m].format(r(a,e,m),a,e,m),e="no-parser"===b.parsers[m].id?"":b.parsers[m].format(d,a,e,m),b.cache[g].normalized[p][m]= b.ignoreCase&&"string"===typeof e?e.toLowerCase():e,"numeric"===(b.parsers[m].type||"").toLowerCase()&&(b.cache[g].colMax[m]=Math.max(Math.abs(e)||0,b.cache[g].colMax[m]||0)),I(c,l,f))}).bind("addRows"+b.namespace,function(g,e,l,f){g.stopPropagation();a.isUpdating=!0;if(n(b.cache))C(a),F(a,l,f);else{e=h(e).attr("role","row");var d,p,m,q,u,s=e.filter("tr").length,t=c.find("tbody").index(e.parents("tbody").filter(":first"));b.parsers&&b.parsers.length||v(a);for(g=0;g<s;g++){p=e[g].cells.length;u=[]; q={child:[],$row:e.eq(g),order:b.cache[t].normalized.length};for(d=0;d<p;d++)m="undefined"===typeof b.extractors[d].id?r(a,e[g].cells[d],d):b.extractors[d].format(r(a,e[g].cells[d],d),a,e[g].cells[d],d),m="no-parser"===b.parsers[d].id?"":b.parsers[d].format(m,a,e[g].cells[d],d),u[d]=b.ignoreCase&&"string"===typeof m?m.toLowerCase():m,"numeric"===(b.parsers[d].type||"").toLowerCase()&&(b.cache[t].colMax[d]=Math.max(Math.abs(u[d])||0,b.cache[t].colMax[d]||0));u.push(q);b.cache[t].normalized.push(u)}I(c, l,f)}}).bind("updateComplete"+b.namespace,function(){a.isUpdating=!1}).bind("sorton"+b.namespace,function(b,e,d,x){var k=a.config;b.stopPropagation();c.trigger("sortStart",this);P(a,e);G(a);k.delayInit&&n(k.cache)&&w(a);c.trigger("sortBegin",this);J(a);z(a,x);c.trigger("sortEnd",this);f.applyWidget(a);h.isFunction(d)&&d(a)}).bind("appendCache"+b.namespace,function(b,e,c){b.stopPropagation();z(a,c);h.isFunction(e)&&e(a)}).bind("updateCache"+b.namespace,function(c,e){b.parsers&&b.parsers.length||v(a); w(a);h.isFunction(e)&&e(a)}).bind("applyWidgetId"+b.namespace,function(c,e){c.stopPropagation();f.getWidgetById(e).format(a,b,b.widgetOptions)}).bind("applyWidgets"+b.namespace,function(b,e){b.stopPropagation();f.applyWidget(a,e)}).bind("refreshWidgets"+b.namespace,function(b,e,c){b.stopPropagation();f.refreshWidgets(a,e,c)}).bind("destroy"+b.namespace,function(b,e,c){b.stopPropagation();f.destroy(a,e,c)}).bind("resetToLoadState"+b.namespace,function(){f.refreshWidgets(a,!0,!0);b=h.extend(!0,f.defaults, b.originalSettings);a.hasInitialized=!1;f.setup(a,b)})}var f=this;f.version="2.17.7";f.parsers=[];f.widgets=[];f.defaults={theme:"default",widthFixed:!1,showProcessing:!1,headerTemplate:"{content}",onRenderTemplate:null,onRenderHeader:null,cancelSelection:!0,tabIndex:!0,dateFormat:"mmddyyyy",sortMultiSortKey:"shiftKey",sortResetKey:"ctrlKey",usNumberFormat:!0,delayInit:!1,serverSideSorting:!1,headers:{},ignoreCase:!0,sortForce:null,sortList:[],sortAppend:null,sortStable:!1,sortInitialOrder:"asc", sortLocaleCompare:!1,sortReset:!1,sortRestart:!1,emptyTo:"bottom",stringTo:"max",textExtraction:"basic",textAttribute:"data-text",textSorter:null,numberSorter:null,widgets:[],widgetOptions:{zebra:["even","odd"]},initWidgets:!0,initialized:null,tableClass:"",cssAsc:"",cssDesc:"",cssNone:"",cssHeader:"",cssHeaderRow:"",cssProcessing:"",cssChildRow:"tablesorter-childRow",cssIcon:"tablesorter-icon",cssInfoBlock:"tablesorter-infoOnly",selectorHeaders:"> thead th, > thead td",selectorSort:"th, td",selectorRemove:".remove-me", debug:!1,headerList:[],empties:{},strings:{},parsers:[]};f.css={table:"tablesorter",cssHasChild:"tablesorter-hasChildRow",childRow:"tablesorter-childRow",header:"tablesorter-header",headerRow:"tablesorter-headerRow",headerIn:"tablesorter-header-inner",icon:"tablesorter-icon",info:"tablesorter-infoOnly",processing:"tablesorter-processing",sortAsc:"tablesorter-headerAsc",sortDesc:"tablesorter-headerDesc",sortNone:"tablesorter-headerUnSorted"};f.language={sortAsc:"Ascending sort applied, ",sortDesc:"Descending sort applied, ", sortNone:"No sort applied, ",nextAsc:"activate to apply an ascending sort",nextDesc:"activate to apply a descending sort",nextNone:"activate to remove the sort"};f.log=d;f.benchmark=q;f.construct=function(a){return this.each(function(){var b=h.extend(!0,{},f.defaults,a);b.originalSettings=a;!this.hasInitialized&&f.buildTable&&"TABLE"!==this.tagName?f.buildTable(this,b):f.setup(this,b)})};f.setup=function(a,b){if(!a||!a.tHead||0===a.tBodies.length||!0===a.hasInitialized)return b.debug?d("ERROR: stopping initialization! No table, thead, tbody or tablesorter has already been initialized"): "";var c="",g=h(a),e=h.metadata;a.hasInitialized=!1;a.isProcessing=!0;a.config=b;h.data(a,"tablesorter",b);b.debug&&h.data(a,"startoveralltimer",new Date);b.supportsDataObject=function(a){a[0]=parseInt(a[0],10);return 1<a[0]||1===a[0]&&4<=parseInt(a[1],10)}(h.fn.jquery.split("."));b.string={max:1,min:-1,emptyMin:1,emptyMax:-1,zero:0,none:0,"null":0,top:!0,bottom:!1};/tablesorter\-/.test(g.attr("class"))||(c=""!==b.theme?" tablesorter-"+b.theme:"");b.table=a;b.$table=g.addClass(f.css.table+" "+b.tableClass+ c).attr("role","grid");b.$headers=g.find(b.selectorHeaders);b.namespace=b.namespace?"."+b.namespace.replace(/\W/g,""):".tablesorter"+Math.random().toString(16).slice(2);b.$table.children().children("tr").attr("role","row");b.$tbodies=g.children("tbody:not(."+b.cssInfoBlock+")").attr({"aria-live":"polite","aria-relevant":"all"});b.$table.find("caption").length&&b.$table.attr("aria-labelledby","theCaption");b.widgetInit={};b.textExtraction=b.$table.attr("data-text-extraction")||b.textExtraction||"basic"; E(a);O(a);v(a);b.totalRows=0;b.delayInit||w(a);f.bindEvents(a,b.$headers,!0);N(a);b.supportsDataObject&&"undefined"!==typeof g.data().sortlist?b.sortList=g.data().sortlist:e&&g.metadata()&&g.metadata().sortlist&&(b.sortList=g.metadata().sortlist);f.applyWidget(a,!0);0<b.sortList.length?g.trigger("sorton",[b.sortList,{},!b.initWidgets,!0]):(G(a),b.initWidgets&&f.applyWidget(a,!1));b.showProcessing&&g.unbind("sortBegin"+b.namespace+" sortEnd"+b.namespace).bind("sortBegin"+b.namespace+" sortEnd"+b.namespace, function(c){clearTimeout(b.processTimer);f.isProcessing(a);"sortBegin"===c.type&&(b.processTimer=setTimeout(function(){f.isProcessing(a,!0)},500))});a.hasInitialized=!0;a.isProcessing=!1;b.debug&&f.benchmark("Overall initialization time",h.data(a,"startoveralltimer"));g.trigger("tablesorter-initialized",a);"function"===typeof b.initialized&&b.initialized(a)};f.getColumnData=function(a,b,c,g){if("undefined"!==typeof b&&null!==b){a=h(a)[0];var e,d=a.config;if(b[c])return g?b[c]:b[d.$headers.index(d.$headers.filter('[data-column="'+ c+'"]:last'))];for(e in b)if("string"===typeof e&&(a=g?d.$headers.eq(c).filter(e):d.$headers.filter('[data-column="'+c+'"]:last').filter(e),a.length))return b[e]}};f.computeColumnIndex=function(a){var b=[],c=0,g,e,d,f,k,p,m,n,q,s;for(g=0;g<a.length;g++)for(k=a[g].cells,e=0;e<k.length;e++){d=k[e];f=h(d);p=d.parentNode.rowIndex;f.index();m=d.rowSpan||1;n=d.colSpan||1;"undefined"===typeof b[p]&&(b[p]=[]);for(d=0;d<b[p].length+1;d++)if("undefined"===typeof b[p][d]){q=d;break}c=Math.max(q,c);f.attr({"data-column":q}); for(d=p;d<p+m;d++)for("undefined"===typeof b[d]&&(b[d]=[]),s=b[d],f=q;f<q+n;f++)s[f]="x"}return c+1};f.isProcessing=function(a,b,c){a=h(a);var g=a[0].config,e=c||a.find("."+f.css.header);b?("undefined"!==typeof c&&0<g.sortList.length&&(e=e.filter(function(){return this.sortDisabled?!1:0<=f.isValueInArray(parseFloat(h(this).attr("data-column")),g.sortList)})),a.add(e).addClass(f.css.processing+" "+g.cssProcessing)):a.add(e).removeClass(f.css.processing+" "+g.cssProcessing)};f.processTbody=function(a, b,c){a=h(a)[0];if(c)return a.isProcessing=!0,b.before('<span class="tablesorter-savemyplace"/>'),c=h.fn.detach?b.detach():b.remove();c=h(a).find("span.tablesorter-savemyplace");b.insertAfter(c);c.remove();a.isProcessing=!1};f.clearTableBody=function(a){h(a)[0].config.$tbodies.children().detach()};f.bindEvents=function(a,b,c){a=h(a)[0];var g,e=a.config;!0!==c&&(e.$extraHeaders=e.$extraHeaders?e.$extraHeaders.add(b):b);b.find(e.selectorSort).add(b.filter(e.selectorSort)).unbind(["mousedown","mouseup", "sort","keyup",""].join(e.namespace+" ")).bind(["mousedown","mouseup","sort","keyup",""].join(e.namespace+" "),function(c,d){var f;f=c.type;if(!(1!==(c.which||c.button)&&!/sort|keyup/.test(f)||"keyup"===f&&13!==c.which||"mouseup"===f&&!0!==d&&250<(new Date).getTime()-g)){if("mousedown"===f)return g=(new Date).getTime(),/(input|select|button|textarea)/i.test(c.target.tagName)?"":!e.cancelSelection;e.delayInit&&n(e.cache)&&w(a);f=h.fn.closest?h(this).closest("th, td")[0]:/TH|TD/.test(this.tagName)? this:h(this).parents("th, td")[0];f=e.$headers[b.index(f)];f.sortDisabled||L(a,f,c)}});e.cancelSelection&&b.attr("unselectable","on").bind("selectstart",!1).css({"user-select":"none",MozUserSelect:"none"})};f.restoreHeaders=function(a){var b=h(a)[0].config;b.$table.find(b.selectorHeaders).each(function(a){h(this).find("."+f.css.headerIn).length&&h(this).html(b.headerContent[a])})};f.destroy=function(a,b,c){a=h(a)[0];if(a.hasInitialized){f.refreshWidgets(a,!0,!0);var g=h(a),e=a.config,d=g.find("thead:first"), q=d.find("tr."+f.css.headerRow).removeClass(f.css.headerRow+" "+e.cssHeaderRow),k=g.find("tfoot:first > tr").children("th, td");!1===b&&0<=h.inArray("uitheme",e.widgets)&&(g.trigger("applyWidgetId",["uitheme"]),g.trigger("applyWidgetId",["zebra"]));d.find("tr").not(q).remove();g.removeData("tablesorter").unbind("sortReset update updateAll updateRows updateCell addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave keypress sortBegin sortEnd resetToLoadState ".split(" ").join(e.namespace+ " "));e.$headers.add(k).removeClass([f.css.header,e.cssHeader,e.cssAsc,e.cssDesc,f.css.sortAsc,f.css.sortDesc,f.css.sortNone].join(" ")).removeAttr("data-column").removeAttr("aria-label").attr("aria-disabled","true");q.find(e.selectorSort).unbind(["mousedown","mouseup","keypress",""].join(e.namespace+" "));f.restoreHeaders(a);g.toggleClass(f.css.table+" "+e.tableClass+" tablesorter-"+e.theme,!1===b);a.hasInitialized=!1;delete a.config.cache;"function"===typeof c&&c(a)}};f.regex={chunk:/(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi, chunks:/(^\\0|\\0$)/,hex:/^0x[0-9a-f]+$/i};f.sortNatural=function(a,b){if(a===b)return 0;var c,g,e,d,h,k;g=f.regex;if(g.hex.test(b)){c=parseInt(a.match(g.hex),16);e=parseInt(b.match(g.hex),16);if(c<e)return-1;if(c>e)return 1}c=a.replace(g.chunk,"\\0$1\\0").replace(g.chunks,"").split("\\0");g=b.replace(g.chunk,"\\0$1\\0").replace(g.chunks,"").split("\\0");k=Math.max(c.length,g.length);for(h=0;h<k;h++){e=isNaN(c[h])?c[h]||0:parseFloat(c[h])||0;d=isNaN(g[h])?g[h]||0:parseFloat(g[h])||0;if(isNaN(e)!== isNaN(d))return isNaN(e)?1:-1;typeof e!==typeof d&&(e+="",d+="");if(e<d)return-1;if(e>d)return 1}return 0};f.sortNaturalAsc=function(a,b,c,g,e){if(a===b)return 0;c=e.string[e.empties[c]||e.emptyTo];return""===a&&0!==c?"boolean"===typeof c?c?-1:1:-c||-1:""===b&&0!==c?"boolean"===typeof c?c?1:-1:c||1:f.sortNatural(a,b)};f.sortNaturalDesc=function(a,b,c,g,e){if(a===b)return 0;c=e.string[e.empties[c]||e.emptyTo];return""===a&&0!==c?"boolean"===typeof c?c?-1:1:c||1:""===b&&0!==c?"boolean"===typeof c?c? 1:-1:-c||-1:f.sortNatural(b,a)};f.sortText=function(a,b){return a>b?1:a<b?-1:0};f.getTextValue=function(a,b,c){if(c){var g=a?a.length:0,e=c+b;for(c=0;c<g;c++)e+=a.charCodeAt(c);return b*e}return 0};f.sortNumericAsc=function(a,b,c,g,e,d){if(a===b)return 0;d=d.config;e=d.string[d.empties[e]||d.emptyTo];if(""===a&&0!==e)return"boolean"===typeof e?e?-1:1:-e||-1;if(""===b&&0!==e)return"boolean"===typeof e?e?1:-1:e||1;isNaN(a)&&(a=f.getTextValue(a,c,g));isNaN(b)&&(b=f.getTextValue(b,c,g));return a-b};f.sortNumericDesc= function(a,b,c,g,e,d){if(a===b)return 0;d=d.config;e=d.string[d.empties[e]||d.emptyTo];if(""===a&&0!==e)return"boolean"===typeof e?e?-1:1:e||1;if(""===b&&0!==e)return"boolean"===typeof e?e?1:-1:-e||-1;isNaN(a)&&(a=f.getTextValue(a,c,g));isNaN(b)&&(b=f.getTextValue(b,c,g));return b-a};f.sortNumeric=function(a,b){return a-b};f.characterEquivalents={a:"\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5",A:"\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5",c:"\u00e7\u0107\u010d",C:"\u00c7\u0106\u010c",e:"\u00e9\u00e8\u00ea\u00eb\u011b\u0119", E:"\u00c9\u00c8\u00ca\u00cb\u011a\u0118",i:"\u00ed\u00ec\u0130\u00ee\u00ef\u0131",I:"\u00cd\u00cc\u0130\u00ce\u00cf",o:"\u00f3\u00f2\u00f4\u00f5\u00f6",O:"\u00d3\u00d2\u00d4\u00d5\u00d6",ss:"\u00df",SS:"\u1e9e",u:"\u00fa\u00f9\u00fb\u00fc\u016f",U:"\u00da\u00d9\u00db\u00dc\u016e"};f.replaceAccents=function(a){var b,c="[",d=f.characterEquivalents;if(!f.characterRegex){f.characterRegexArray={};for(b in d)"string"===typeof b&&(c+=d[b],f.characterRegexArray[b]=new RegExp("["+d[b]+"]","g"));f.characterRegex= new RegExp(c+"]")}if(f.characterRegex.test(a))for(b in d)"string"===typeof b&&(a=a.replace(f.characterRegexArray[b],b));return a};f.isValueInArray=function(a,b){var c,d=b.length;for(c=0;c<d;c++)if(b[c][0]===a)return c;return-1};f.addParser=function(a){var b,c=f.parsers.length,d=!0;for(b=0;b<c;b++)f.parsers[b].id.toLowerCase()===a.id.toLowerCase()&&(d=!1);d&&f.parsers.push(a)};f.getParserById=function(a){if("false"==a)return!1;var b,c=f.parsers.length;for(b=0;b<c;b++)if(f.parsers[b].id.toLowerCase()=== a.toString().toLowerCase())return f.parsers[b];return!1};f.addWidget=function(a){f.widgets.push(a)};f.hasWidget=function(a,b){a=h(a);return a.length&&a[0].config&&a[0].config.widgetInit[b]||!1};f.getWidgetById=function(a){var b,c,d=f.widgets.length;for(b=0;b<d;b++)if((c=f.widgets[b])&&c.hasOwnProperty("id")&&c.id.toLowerCase()===a.toLowerCase())return c};f.applyWidget=function(a,b){a=h(a)[0];var c=a.config,d=c.widgetOptions,e=[],l,n,k;!1!==b&&a.hasInitialized&&(a.isApplyingWidgets||a.isUpdating)|| (c.debug&&(l=new Date),c.widgets.length&&(a.isApplyingWidgets=!0,c.widgets=h.grep(c.widgets,function(a,b){return h.inArray(a,c.widgets)===b}),h.each(c.widgets||[],function(a,b){(k=f.getWidgetById(b))&&k.id&&(k.priority||(k.priority=10),e[a]=k)}),e.sort(function(a,b){return a.priority<b.priority?-1:a.priority===b.priority?0:1}),h.each(e,function(e,f){if(f){if(b||!c.widgetInit[f.id])c.widgetInit[f.id]=!0,f.hasOwnProperty("options")&&(d=a.config.widgetOptions=h.extend(!0,{},f.options,d)),f.hasOwnProperty("init")&& f.init(a,f,c,d);!b&&f.hasOwnProperty("format")&&f.format(a,c,d,!1)}})),setTimeout(function(){a.isApplyingWidgets=!1},0),c.debug&&(n=c.widgets.length,q("Completed "+(!0===b?"initializing ":"applying ")+n+" widget"+(1!==n?"s":""),l)))};f.refreshWidgets=function(a,b,c){a=h(a)[0];var g,e=a.config,l=e.widgets,q=f.widgets,k=q.length;for(g=0;g<k;g++)q[g]&&q[g].id&&(b||0>h.inArray(q[g].id,l))&&(e.debug&&d('Refeshing widgets: Removing "'+q[g].id+'"'),q[g].hasOwnProperty("remove")&&e.widgetInit[q[g].id]&&(q[g].remove(a, e,e.widgetOptions),e.widgetInit[q[g].id]=!1));!0!==c&&f.applyWidget(a,b)};f.getData=function(a,b,c){var d="";a=h(a);var e,f;if(!a.length)return"";e=h.metadata?a.metadata():!1;f=" "+(a.attr("class")||"");"undefined"!==typeof a.data(c)||"undefined"!==typeof a.data(c.toLowerCase())?d+=a.data(c)||a.data(c.toLowerCase()):e&&"undefined"!==typeof e[c]?d+=e[c]:b&&"undefined"!==typeof b[c]?d+=b[c]:" "!==f&&f.match(" "+c+"-")&&(d=f.match(new RegExp("\\s"+c+"-([\\w-]+)"))[1]||"");return h.trim(d)};f.formatFloat= function(a,b){if("string"!==typeof a||""===a)return a;var c;a=(b&&b.config?!1!==b.config.usNumberFormat:"undefined"!==typeof b?b:1)?a.replace(/,/g,""):a.replace(/[\s|\.]/g,"").replace(/,/g,".");/^\s*\([.\d]+\)/.test(a)&&(a=a.replace(/^\s*\(([.\d]+)\)/,"-$1"));c=parseFloat(a);return isNaN(c)?h.trim(a):c};f.isDigit=function(a){return isNaN(a)?/^[\-+(]?\d+[)]?$/.test(a.toString().replace(/[,.'"\s]/g,"")):!0}}});var r=h.tablesorter;h.fn.extend({tablesorter:r.construct});r.addParser({id:"no-parser",is:function(){return!1}, format:function(){return""},type:"text"});r.addParser({id:"text",is:function(){return!0},format:function(d,q){var n=q.config;d&&(d=h.trim(n.ignoreCase?d.toLocaleLowerCase():d),d=n.sortLocaleCompare?r.replaceAccents(d):d);return d},type:"text"});r.addParser({id:"digit",is:function(d){return r.isDigit(d)},format:function(d,q){var n=r.formatFloat((d||"").replace(/[^\w,. \-()]/g,""),q);return d&&"number"===typeof n?n:d?h.trim(d&&q.config.ignoreCase?d.toLocaleLowerCase():d):d},type:"numeric"});r.addParser({id:"currency", is:function(d){return/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/.test((d||"").replace(/[+\-,. ]/g,""))},format:function(d,q){var n=r.formatFloat((d||"").replace(/[^\w,. \-()]/g,""),q);return d&&"number"===typeof n?n:d?h.trim(d&&q.config.ignoreCase?d.toLocaleLowerCase():d):d},type:"numeric"});r.addParser({id:"ipAddress",is:function(d){return/^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/.test(d)},format:function(d,h){var n,y=d?d.split("."):"",v="",w=y.length; for(n=0;n<w;n++)v+=("00"+y[n]).slice(-3);return d?r.formatFloat(v,h):d},type:"numeric"});r.addParser({id:"url",is:function(d){return/^(https?|ftp|file):\/\//.test(d)},format:function(d){return d?h.trim(d.replace(/(https?|ftp|file):\/\//,"")):d},type:"text"});r.addParser({id:"isoDate",is:function(d){return/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/.test(d)},format:function(d,h){return d?r.formatFloat(""!==d?(new Date(d.replace(/-/g,"/"))).getTime()||d:"",h):d},type:"numeric"});r.addParser({id:"percent",is:function(d){return/(\d\s*?%|%\s*?\d)/.test(d)&& 15>d.length},format:function(d,h){return d?r.formatFloat(d.replace(/%/g,""),h):d},type:"numeric"});r.addParser({id:"usLongDate",is:function(d){return/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i.test(d)||/^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i.test(d)},format:function(d,h){return d?r.formatFloat((new Date(d.replace(/(\S)([AP]M)$/i,"$1 $2"))).getTime()||d,h):d},type:"numeric"});r.addParser({id:"shortDate",is:function(d){return/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/.test((d|| "").replace(/\s+/g," ").replace(/[\-.,]/g,"/"))},format:function(d,h,n,y){if(d){n=h.config;var v=n.$headers.filter("[data-column="+y+"]:last");y=v.length&&v[0].dateFormat||r.getData(v,r.getColumnData(h,n.headers,y),"dateFormat")||n.dateFormat;d=d.replace(/\s+/g," ").replace(/[\-.,]/g,"/");"mmddyyyy"===y?d=d.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,"$3/$1/$2"):"ddmmyyyy"===y?d=d.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,"$3/$2/$1"):"yyyymmdd"===y&&(d=d.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/, "$1/$2/$3"))}return d?r.formatFloat((new Date(d)).getTime()||d,h):d},type:"numeric"});r.addParser({id:"time",is:function(d){return/^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i.test(d)},format:function(d,h){return d?r.formatFloat((new Date("2000/01/01 "+d.replace(/(\S)([AP]M)$/i,"$1 $2"))).getTime()||d,h):d},type:"numeric"});r.addParser({id:"metadata",is:function(){return!1},format:function(d,q,n){d=q.config;d=d.parserMetadataName?d.parserMetadataName:"sortValue";return h(n).metadata()[d]}, type:"numeric"});r.addWidget({id:"zebra",priority:90,format:function(d,q,n){var y,v,w,z,D,E,F=new RegExp(q.cssChildRow,"i"),C=q.$tbodies;q.debug&&(D=new Date);for(d=0;d<C.length;d++)y=C.eq(d),E=y.children("tr").length,1<E&&(w=0,y=y.children("tr:visible").not(q.selectorRemove),y.each(function(){v=h(this);F.test(this.className)||w++;z=0===w%2;v.removeClass(n.zebra[z?1:0]).addClass(n.zebra[z?0:1])}));q.debug&&r.benchmark("Applying Zebra widget",D)},remove:function(d,q,n){var r;q=q.$tbodies;var v=(n.zebra|| ["even","odd"]).join(" ");for(n=0;n<q.length;n++)r=h.tablesorter.processTbody(d,q.eq(n),!0),r.children().removeClass(v),h.tablesorter.processTbody(d,r,!1)}})}(jQuery);
