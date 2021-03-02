/*
make fake mixpanel data easily!
with no dependencies!
by AK 
ak@mixpanel.com
*/

/* beautify ignore:start */
//the mixpanel node.js sdk; bundled in two lines
const mpReq=function(){return function e(t,n,o){function r(i,a){if(!n[i]){if(!t[i]){var c="function"==typeof require&&require;if(!a&&c)return c(i,!0);if(s)return s(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[i]={exports:{}};t[i][0].call(u.exports,function(e){return r(t[i][1][e]||e)},u,u.exports,e,t,n,o)}return n[i].exports}for(var s="function"==typeof require&&require,i=0;i<o.length;i++)r(o[i]);return r}}()({1:[function(e,t,n){const{ProfileHelpers:o}=e("./profile_helpers");n.MixpanelGroups=class extends(o()){constructor(e){super(),this.mixpanel=e,this.endpoint="/groups"}set_once(e,t,n,o,r,s){const i={$group_key:e,$group_id:t};this._set(n,o,r,s,{identifiers:i,set_once:!0})}set(e,t,n,o,r,s){const i={$group_key:e,$group_id:t};this._set(n,o,r,s,{identifiers:i})}delete_group(e,t,n,o){const r={$group_key:e,$group_id:t};this._delete_profile({identifiers:r,modifiers:n,callback:o})}remove(e,t,n,o,r){const s={$group_key:e,$group_id:t};this._remove({identifiers:s,data:n,modifiers:o,callback:r})}union(e,t,n,o,r){const s={$group_key:e,$group_id:t};this._union({identifiers:s,data:n,modifiers:o,callback:r})}unset(e,t,n,o,r){const s={$group_key:e,$group_id:t};this._unset({identifiers:s,prop:n,modifiers:o,callback:r})}}},{"./profile_helpers":3}],2:[function(e,t,n){const{merge_modifiers:o,ProfileHelpers:r}=e("./profile_helpers");n.MixpanelPeople=class extends(r()){constructor(e){super(),this.mixpanel=e,this.endpoint="/engage"}set_once(e,t,n,o,r){const s={$distinct_id:e};this._set(t,n,o,r,{identifiers:s,set_once:!0})}set(e,t,n,o,r){const s={$distinct_id:e};this._set(t,n,o,r,{identifiers:s})}increment(e,t,n,r,s){var i={};if("object"==typeof t){"object"==typeof n?(s=r,r=n):s=n;for(const[e,n]of Object.entries(t))isNaN(parseFloat(n))?this.mixpanel.config.debug&&(console.error("Invalid increment value passed to mixpanel.people.increment - must be a number"),console.error("Passed "+e+":"+n)):i[e]=n}else"number"!=typeof n&&n?"function"==typeof n?(s=n,i[t]=1):(s=r,r="object"==typeof n?n:{},i[t]=1):(n=n||1,i[t]=n,"function"==typeof r&&(s=r));var a={$add:i,$token:this.mixpanel.token,$distinct_id:e};a=o(a,r),this.mixpanel.config.debug&&(console.log("Sending the following data to Mixpanel (Engage):"),console.log(a)),this.mixpanel.send_request({method:"GET",endpoint:"/engage",data:a},s)}append(e,t,n,r,s){var i={};"object"==typeof t?("object"==typeof n?(s=r,r=n):s=n,Object.keys(t).forEach(function(e){i[e]=t[e]})):(i[t]=n,"function"==typeof r&&(s=r));var a={$append:i,$token:this.mixpanel.token,$distinct_id:e};a=o(a,r),this.mixpanel.config.debug&&(console.log("Sending the following data to Mixpanel (Engage):"),console.log(a)),this.mixpanel.send_request({method:"GET",endpoint:"/engage",data:a},s)}track_charge(e,t,n,r,s){if("function"!=typeof n&&n?"function"!=typeof r&&r||(s=r||function(){},(n.$ignore_time||n.hasOwnProperty("$ip"))&&(r={},Object.keys(n).forEach(function(e){r[e]=n[e],delete n[e]}))):(s=n||function(){},n={}),"number"!=typeof t&&(t=parseFloat(t),isNaN(t)))console.error("Invalid value passed to mixpanel.people.track_charge - must be a number");else{if(n.$amount=t,n.hasOwnProperty("$time")){var i=n.$time;"[object Date]"===Object.prototype.toString.call(i)&&(n.$time=i.toISOString())}var a={$append:{$transactions:n},$token:this.mixpanel.token,$distinct_id:e};a=o(a,r),this.mixpanel.config.debug&&(console.log("Sending the following data to Mixpanel (Engage):"),console.log(a)),this.mixpanel.send_request({method:"GET",endpoint:"/engage",data:a},s)}}clear_charges(e,t,n){var r={$set:{$transactions:[]},$token:this.mixpanel.token,$distinct_id:e};"function"==typeof t&&(n=t),r=o(r,t),this.mixpanel.config.debug&&console.log("Clearing this user's charges:",e),this.mixpanel.send_request({method:"GET",endpoint:"/engage",data:r},n)}delete_user(e,t,n){const o={$distinct_id:e};this._delete_profile({identifiers:o,modifiers:t,callback:n})}remove(e,t,n,o){const r={$distinct_id:e};this._remove({identifiers:r,data:t,modifiers:n,callback:o})}union(e,t,n,o){const r={$distinct_id:e};this._union({identifiers:r,data:t,modifiers:n,callback:o})}unset(e,t,n,o){const r={$distinct_id:e};this._unset({identifiers:r,prop:t,modifiers:n,callback:o})}}},{"./profile_helpers":3}],3:[function(e,t,n){const o=e("util"),{ensure_timestamp:r}=e("./utils");function s(e,t){return t&&(t.$ignore_alias&&(e.$ignore_alias=t.$ignore_alias),t.$ignore_time&&(e.$ignore_time=t.$ignore_time),t.hasOwnProperty("$ip")&&(e.$ip=t.$ip),t.hasOwnProperty("$time")&&(e.$time=r(t.$time))),e}n.merge_modifiers=s,n.ProfileHelpers=((e=Object)=>(class extends e{get token(){return this.mixpanel.token}get config(){return this.mixpanel.config}_set(e,t,n,o,{identifiers:r,set_once:i=!1}){let a={};"object"==typeof e?("object"==typeof t?(o=n,n=t):o=t,a=e):(a[e]=t,"function"!=typeof n&&n||(o=n));let c={$token:this.token,...r};c[i?"$set_once":"$set"]=a,"ip"in a&&(c.$ip=a.ip,delete a.ip),a.$ignore_time&&(c.$ignore_time=a.$ignore_time,delete a.$ignore_time),c=s(c,n),this.config.debug&&(console.log(`Sending the following data to Mixpanel (${this.endpoint}):`),console.log(c)),this.mixpanel.send_request({method:"GET",endpoint:this.endpoint,data:c},o)}_delete_profile({identifiers:e,modifiers:t,callback:n}){let o={$delete:"",$token:this.token,...e};"function"==typeof t&&(n=t),o=s(o,t),this.config.debug&&console.log(`Deleting profile ${JSON.stringify(e)}`),this.mixpanel.send_request({method:"GET",endpoint:this.endpoint,data:o},n)}_remove({identifiers:e,data:t,modifiers:n,callback:r}){let i={};if("object"!=typeof t||o.isArray(t))this.config.debug&&console.error("Invalid value passed to #remove - data must be an object with scalar values");else{for(const[e,n]of Object.entries(t)){if("string"!=typeof n&&"number"!=typeof n)return void(this.config.debug&&(console.error("Invalid argument passed to #remove - values must be scalar"),console.error("Passed "+e+":",n)));i[e]=n}0!==Object.keys(i).length&&("function"==typeof n&&(r=n),t=s(t={$remove:i,$token:this.token,...e},n),this.config.debug&&(console.log(`Sending the following data to Mixpanel (${this.endpoint}):`),console.log(t)),this.mixpanel.send_request({method:"GET",endpoint:this.endpoint,data:t},r))}}_union({identifiers:e,data:t,modifiers:n,callback:r}){let i={};if("object"!=typeof t||o.isArray(t))this.config.debug&&console.error("Invalid value passed to #union - data must be an object with scalar or array values");else{for(const[e,n]of Object.entries(t))if(o.isArray(n)){var a=n.filter(function(e){return"string"==typeof e||"number"==typeof e});a.length>0&&(i[e]=a)}else"string"==typeof n||"number"==typeof n?i[e]=[n]:this.config.debug&&(console.error("Invalid argument passed to #union - values must be a scalar value or array"),console.error("Passed "+e+":",n));0!==Object.keys(i).length&&("function"==typeof n&&(r=n),t=s(t={$union:i,$token:this.token,...e},n),this.config.debug&&(console.log(`Sending the following data to Mixpanel (${this.endpoint}):`),console.log(t)),this.mixpanel.send_request({method:"GET",endpoint:this.endpoint,data:t},r))}}_unset({identifiers:e,prop:t,modifiers:n,callback:r}){let i=[];if(o.isArray(t))i=t;else{if("string"!=typeof t)return void(this.config.debug&&(console.error("Invalid argument passed to #unset - must be a string or array"),console.error("Passed: "+t)));i=[t]}let a={$unset:i,$token:this.token,...e};"function"==typeof n&&(r=n),a=s(a,n),this.config.debug&&(console.log(`Sending the following data to Mixpanel (${this.endpoint}):`),console.log(a)),this.mixpanel.send_request({method:"GET",endpoint:this.endpoint,data:a},r)}}))},{"./utils":4,util:void 0}],4:[function(e,t,n){n.async_all=function(e,t,n){var o=e.length,r=null,s=[],i=function(e,t){e&&(r=r||[]).push(e),s.push(t),0==--o&&n(r,s)};if(0===o)n(r,s);else for(var a=0,c=e.length;a<c;a++)t(e[a],i)},n.ensure_timestamp=function(e){if(!(e instanceof Date||"number"==typeof e))throw new Error("`time` property must be a Date or Unix timestamp and is only required for `import` endpoint");return e instanceof Date?Math.floor(e.getTime()/1e3):e}},{}],5:[function(e,t,n){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};const r=e("events"),s=o(e("debug")),i=o(e("./promisify")),a=s.default("agent-base");function c(){const{stack:e}=new Error;return"string"==typeof e&&e.split("\n").some(e=>-1!==e.indexOf("(https.js:")||-1!==e.indexOf("node:https:"))}function l(e,t){return new l.Agent(e,t)}!function(e){e.Agent=class extends r.EventEmitter{constructor(e,t){super();let n=t;"function"==typeof e?this.callback=e:e&&(n=e),this.timeout=null,n&&"number"==typeof n.timeout&&(this.timeout=n.timeout),this.maxFreeSockets=1,this.maxSockets=1,this.maxTotalSockets=1/0,this.sockets={},this.freeSockets={},this.requests={},this.options={}}get defaultPort(){return"number"==typeof this.explicitDefaultPort?this.explicitDefaultPort:c()?443:80}set defaultPort(e){this.explicitDefaultPort=e}get protocol(){return"string"==typeof this.explicitProtocol?this.explicitProtocol:c()?"https:":"http:"}set protocol(e){this.explicitProtocol=e}callback(e,t,n){throw new Error('"agent-base" has no default implementation, you must subclass and override `callback()`')}addRequest(e,t){const n=Object.assign({},t);"boolean"!=typeof n.secureEndpoint&&(n.secureEndpoint=c()),null==n.host&&(n.host="localhost"),null==n.port&&(n.port=n.secureEndpoint?443:80),null==n.protocol&&(n.protocol=n.secureEndpoint?"https:":"http:"),n.host&&n.path&&delete n.path,delete n.agent,delete n.hostname,delete n._defaultAgent,delete n.defaultPort,delete n.createConnection,e._last=!0,e.shouldKeepAlive=!1;let o=!1,r=null;const s=n.timeout||this.timeout,l=t=>{e._hadError||(e.emit("error",t),e._hadError=!0)},u=()=>{r=null,o=!0;const e=new Error(`A "socket" was not created for HTTP request before ${s}ms`);e.code="ETIMEOUT",l(e)},p=e=>{o||(null!==r&&(clearTimeout(r),r=null),l(e))},f=t=>{if(o)return;if(null!=r&&(clearTimeout(r),r=null),function(e){return Boolean(e)&&"function"==typeof e.addRequest}(t))return a("Callback returned another Agent instance %o",t.constructor.name),void t.addRequest(e,n);if(t)return t.once("free",()=>{this.freeSocket(t,n)}),void e.onSocket(t);const s=new Error(`no Duplex stream was returned to agent-base for \`${e.method} ${e.path}\``);l(s)};if("function"==typeof this.callback){this.promisifiedCallback||(this.callback.length>=3?(a("Converting legacy callback function to promise"),this.promisifiedCallback=i.default(this.callback)):this.promisifiedCallback=this.callback),"number"==typeof s&&s>0&&(r=setTimeout(u,s)),"port"in n&&"number"!=typeof n.port&&(n.port=Number(n.port));try{a("Resolving socket for %o request: %o",n.protocol,`${e.method} ${e.path}`),Promise.resolve(this.promisifiedCallback(e,n)).then(f,p)}catch(e){Promise.reject(e).catch(p)}}else l(new Error("`callback` is not defined"))}freeSocket(e,t){a("Freeing socket %o %o",e.constructor.name,t),e.destroy()}destroy(){a("Destroying agent %o",this.constructor.name)}},e.prototype=e.Agent.prototype}(l||(l={})),t.exports=l},{"./promisify":6,debug:9,events:void 0}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e){return function(t,n){return new Promise((o,r)=>{e.call(this,t,n,(e,t)=>{e?r(e):o(t)})})}}},{}],7:[function(e,t,n){n.formatArgs=function(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+t.exports.humanize(this.diff),!this.useColors)return;const n="color: "+this.color;e.splice(1,0,n,"color: inherit");let o=0,r=0;e[0].replace(/%[a-zA-Z%]/g,e=>{"%%"!==e&&(o++,"%c"===e&&(r=o))}),e.splice(r,0,n)},n.save=function(e){try{e?n.storage.setItem("debug",e):n.storage.removeItem("debug")}catch(e){}},n.load=function(){let e;try{e=n.storage.getItem("debug")}catch(e){}!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG);return e},n.useColors=function(){if("undefined"!=typeof window&&window.process&&("renderer"===window.process.type||window.process.__nwjs))return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},n.storage=function(){try{return localStorage}catch(e){}}(),n.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),n.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],n.log=console.debug||console.log||(()=>{}),t.exports=e("./common")(n);const{formatters:o}=t.exports;o.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}},{"./common":8}],8:[function(e,t,n){t.exports=function(t){function n(e){let t,r=null;function s(...e){if(!s.enabled)return;const o=s,r=Number(new Date),i=r-(t||r);o.diff=i,o.prev=t,o.curr=r,t=r,e[0]=n.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");let a=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,(t,r)=>{if("%%"===t)return"%";a++;const s=n.formatters[r];if("function"==typeof s){const n=e[a];t=s.call(o,n),e.splice(a,1),a--}return t}),n.formatArgs.call(o,e),(o.log||n.log).apply(o,e)}return s.namespace=e,s.useColors=n.useColors(),s.color=n.selectColor(e),s.extend=o,s.destroy=n.destroy,Object.defineProperty(s,"enabled",{enumerable:!0,configurable:!1,get:()=>null===r?n.enabled(e):r,set:e=>{r=e}}),"function"==typeof n.init&&n.init(s),s}function o(e,t){const o=n(this.namespace+(void 0===t?":":t)+e);return o.log=this.log,o}function r(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return n.debug=n,n.default=n,n.coerce=function(e){return e instanceof Error?e.stack||e.message:e},n.disable=function(){const e=[...n.names.map(r),...n.skips.map(r).map(e=>"-"+e)].join(",");return n.enable(""),e},n.enable=function(e){let t;n.save(e),n.names=[],n.skips=[];const o=("string"==typeof e?e:"").split(/[\s,]+/),r=o.length;for(t=0;t<r;t++)o[t]&&("-"===(e=o[t].replace(/\*/g,".*?"))[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")))},n.enabled=function(e){if("*"===e[e.length-1])return!0;let t,o;for(t=0,o=n.skips.length;t<o;t++)if(n.skips[t].test(e))return!1;for(t=0,o=n.names.length;t<o;t++)if(n.names[t].test(e))return!0;return!1},n.humanize=e("ms"),n.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(t).forEach(e=>{n[e]=t[e]}),n.names=[],n.skips=[],n.formatters={},n.selectColor=function(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return n.colors[Math.abs(t)%n.colors.length]},n.enable(n.load()),n}},{ms:15}],9:[function(e,t,n){"undefined"==typeof process||"renderer"===process.type||!0===process.browser||process.__nwjs?t.exports=e("./browser.js"):t.exports=e("./node.js")},{"./browser.js":7,"./node.js":10}],10:[function(e,t,n){const o=e("tty"),r=e("util");n.init=function(e){e.inspectOpts={};const t=Object.keys(n.inspectOpts);for(let o=0;o<t.length;o++)e.inspectOpts[t[o]]=n.inspectOpts[t[o]]},n.log=function(...e){return process.stderr.write(r.format(...e)+"\n")},n.formatArgs=function(e){const{namespace:o,useColors:r}=this;if(r){const n=this.color,r="[3"+(n<8?n:"8;5;"+n),s=`  ${r};1m${o} [0m`;e[0]=s+e[0].split("\n").join("\n"+s),e.push(r+"m+"+t.exports.humanize(this.diff)+"[0m")}else e[0]=function(){if(n.inspectOpts.hideDate)return"";return(new Date).toISOString()+" "}()+o+" "+e[0]},n.save=function(e){e?process.env.DEBUG=e:delete process.env.DEBUG},n.load=function(){return process.env.DEBUG},n.useColors=function(){return"colors"in n.inspectOpts?Boolean(n.inspectOpts.colors):o.isatty(process.stderr.fd)},n.destroy=r.deprecate(()=>{},"Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."),n.colors=[6,2,3,4,5,1];try{const t=e("supports-color");t&&(t.stderr||t).level>=2&&(n.colors=[20,21,26,27,32,33,38,39,40,41,42,43,44,45,56,57,62,63,68,69,74,75,76,77,78,79,80,81,92,93,98,99,112,113,128,129,134,135,148,149,160,161,162,163,164,165,166,167,168,169,170,171,172,173,178,179,184,185,196,197,198,199,200,201,202,203,204,205,206,207,208,209,214,215,220,221])}catch(e){}n.inspectOpts=Object.keys(process.env).filter(e=>/^debug_/i.test(e)).reduce((e,t)=>{const n=t.substring(6).toLowerCase().replace(/_([a-z])/g,(e,t)=>t.toUpperCase());let o=process.env[t];return o=!!/^(yes|on|true|enabled)$/i.test(o)||!/^(no|off|false|disabled)$/i.test(o)&&("null"===o?null:Number(o)),e[n]=o,e},{}),t.exports=e("./common")(n);const{formatters:s}=t.exports;s.o=function(e){return this.inspectOpts.colors=this.useColors,r.inspect(e,this.inspectOpts).split("\n").map(e=>e.trim()).join(" ")},s.O=function(e){return this.inspectOpts.colors=this.useColors,r.inspect(e,this.inspectOpts)}},{"./common":8,"supports-color":16,tty:void 0,util:void 0}],11:[function(e,t,n){"use strict";t.exports=((e,t=process.argv)=>{const n=e.startsWith("-")?"":1===e.length?"-":"--",o=t.indexOf(n+e),r=t.indexOf("--");return-1!==o&&(-1===r||o<r)})},{}],12:[function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))(function(r,s){function i(e){try{c(o.next(e))}catch(e){s(e)}}function a(e){try{c(o.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(i,a)}c((o=o.apply(e,t||[])).next())})},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const s=r(e("net")),i=r(e("tls")),a=r(e("url")),c=r(e("assert")),l=r(e("debug")),u=e("agent-base"),p=r(e("./parse-proxy-response")),f=l.default("https-proxy-agent:agent");function d(e){e.resume()}n.default=class extends u.Agent{constructor(e){let t;if(!(t="string"==typeof e?a.default.parse(e):e))throw new Error("an HTTP(S) proxy server `host` and `port` must be specified!");f("creating new HttpsProxyAgent instance: %o",t),super(t);const n=Object.assign({},t);var o;this.secureProxy=t.secureProxy||"string"==typeof(o=n.protocol)&&/^https:?$/i.test(o),n.host=n.hostname||n.host,"string"==typeof n.port&&(n.port=parseInt(n.port,10)),!n.port&&n.host&&(n.port=this.secureProxy?443:80),!this.secureProxy||"ALPNProtocols"in n||(n.ALPNProtocols=["http 1.1"]),n.host&&n.path&&(delete n.path,delete n.pathname),this.proxy=n}callback(e,t){return o(this,void 0,void 0,function*(){const{proxy:n,secureProxy:o}=this;let r;o?(f("Creating `tls.Socket`: %o",n),r=i.default.connect(n)):(f("Creating `net.Socket`: %o",n),r=s.default.connect(n));const a=Object.assign({},n.headers);let l=`CONNECT ${`${t.host}:${t.port}`} HTTP/1.1\r\n`;n.auth&&(a["Proxy-Authorization"]=`Basic ${Buffer.from(n.auth).toString("base64")}`);let{host:u,port:h,secureEndpoint:g}=t;(function(e,t){return Boolean(!t&&80===e||t&&443===e)})(h,g)||(u+=`:${h}`),a.Host=u,a.Connection="close";for(const e of Object.keys(a))l+=`${e}: ${a[e]}\r\n`;const m=p.default(r);r.write(`${l}\r\n`);const{statusCode:b,buffered:y}=yield m;if(200===b){if(e.once("socket",d),t.secureEndpoint){const e=t.servername||t.host;if(!e)throw new Error('Could not determine "servername"');return f("Upgrading socket connection to TLS"),i.default.connect(Object.assign(Object.assign({},function(e,...t){const n={};let o;for(o in e)t.includes(o)||(n[o]=e[o]);return n}(t,"host","hostname","path","port")),{socket:r,servername:e}))}return r}r.destroy();const _=new s.default.Socket;return _.readable=!0,e.once("socket",e=>{f("replaying proxy buffer for failed request"),c.default(e.listenerCount("data")>0),e.push(y),e.push(null)}),_})}}},{"./parse-proxy-response":14,"agent-base":5,assert:void 0,debug:9,net:void 0,tls:void 0,url:void 0}],13:[function(e,t,n){"use strict";const o=(this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}})(e("./agent"));function r(e){return new o.default(e)}!function(e){e.HttpsProxyAgent=o.default,e.prototype=o.default.prototype}(r||(r={})),t.exports=r},{"./agent":12}],14:[function(e,t,n){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const r=o(e("debug")).default("https-proxy-agent:parse-proxy-response");n.default=function(e){return new Promise((t,n)=>{let o=0;const s=[];function i(){const n=e.read();n?function(e){s.push(e),o+=e.length;const n=Buffer.concat(s,o);if(-1===n.indexOf("\r\n\r\n"))return r("have not received end of HTTP headers yet..."),void i();const a=n.toString("ascii",0,n.indexOf("\r\n")),c=+a.split(" ")[1];r("got proxy server response: %o",a),t({statusCode:c,buffered:n})}(n):e.once("readable",i)}function a(e){r("onclose had error %o",e)}function c(){r("onend")}function l(t){e.removeListener("end",c),e.removeListener("error",l),e.removeListener("close",a),e.removeListener("readable",i),r("onerror %o",t),n(t)}e.on("error",l),e.on("close",a),e.on("end",c),i()})}},{debug:9}],15:[function(e,t,n){var o=1e3,r=60*o,s=60*r,i=24*s,a=7*i,c=365.25*i;function l(e,t,n,o){var r=t>=1.5*n;return Math.round(e/n)+" "+o+(r?"s":"")}t.exports=function(e,t){t=t||{};var n=typeof e;if("string"===n&&e.length>0)return function(e){if((e=String(e)).length>100)return;var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(!t)return;var n=parseFloat(t[1]);switch((t[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return n*c;case"weeks":case"week":case"w":return n*a;case"days":case"day":case"d":return n*i;case"hours":case"hour":case"hrs":case"hr":case"h":return n*s;case"minutes":case"minute":case"mins":case"min":case"m":return n*r;case"seconds":case"second":case"secs":case"sec":case"s":return n*o;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}(e);if("number"===n&&isFinite(e))return t.long?function(e){var t=Math.abs(e);if(t>=i)return l(e,t,i,"day");if(t>=s)return l(e,t,s,"hour");if(t>=r)return l(e,t,r,"minute");if(t>=o)return l(e,t,o,"second");return e+" ms"}(e):function(e){var t=Math.abs(e);if(t>=i)return Math.round(e/i)+"d";if(t>=s)return Math.round(e/s)+"h";if(t>=r)return Math.round(e/r)+"m";if(t>=o)return Math.round(e/o)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},{}],16:[function(e,t,n){"use strict";const o=e("os"),r=e("tty"),s=e("has-flag"),{env:i}=process;let a;function c(e,{streamIsTTY:t,sniffFlags:n=!0}={}){const r=function(){if("FORCE_COLOR"in i)return"true"===i.FORCE_COLOR?1:"false"===i.FORCE_COLOR?0:0===i.FORCE_COLOR.length?1:Math.min(Number.parseInt(i.FORCE_COLOR,10),3)}();void 0!==r&&(a=r);const c=n?a:r;if(0===c)return 0;if(n){if(s("color=16m")||s("color=full")||s("color=truecolor"))return 3;if(s("color=256"))return 2}if(e&&!t&&void 0===c)return 0;const l=c||0;if("dumb"===i.TERM)return l;if("win32"===process.platform){const e=o.release().split(".");return Number(e[0])>=10&&Number(e[2])>=10586?Number(e[2])>=14931?3:2:1}if("CI"in i)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE","DRONE"].some(e=>e in i)||"codeship"===i.CI_NAME?1:l;if("TEAMCITY_VERSION"in i)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(i.TEAMCITY_VERSION)?1:0;if("truecolor"===i.COLORTERM)return 3;if("TERM_PROGRAM"in i){const e=Number.parseInt((i.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(i.TERM_PROGRAM){case"iTerm.app":return e>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(i.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(i.TERM)?1:"COLORTERM"in i?1:l}function l(e,t={}){return function(e){return 0!==e&&{level:e,hasBasic:!0,has256:e>=2,has16m:e>=3}}(c(e,{streamIsTTY:e&&e.isTTY,...t}))}s("no-color")||s("no-colors")||s("color=false")||s("color=never")?a=0:(s("color")||s("colors")||s("color=true")||s("color=always"))&&(a=1),t.exports={supportsColor:l,stdout:l({isTTY:r.isatty(1)}),stderr:l({isTTY:r.isatty(2)})}},{"has-flag":11,os:void 0,tty:void 0}],Mixpanel:[function(e,t,n){const o=e("querystring"),r=e("buffer").Buffer,s=e("http"),i=e("https"),a=e("https-proxy-agent"),{async_all:c,ensure_timestamp:l}=e("./utils"),{MixpanelGroups:u}=e("./groups"),{MixpanelPeople:p}=e("./people"),f={test:!1,debug:!1,verbose:!1,host:"api.mixpanel.com",protocol:"https",path:""};var d=function(e,t){if(!e)throw new Error("The Mixpanel Client needs a Mixpanel token: `init(token)`");const n={http:s,https:i},d=process.env.HTTPS_PROXY||process.env.HTTP_PROXY,h=d?new a(d):null,g={token:e,config:{...f},send_request:function(e,t){t=t||function(){};let s=r.from(JSON.stringify(e.data)).toString("base64");const a=e.endpoint,c=(e.method||"GET").toUpperCase();let l={ip:0,verbose:g.config.verbose?1:0};const u=g.config.key,p=g.config.secret,f=n[g.config.protocol];let d,m={host:g.config.host,port:g.config.port,headers:{},method:c};if(!f)throw new Error("Mixpanel Initialization Error: Unsupported protocol "+g.config.protocol+". Supported protocols are: "+Object.keys(n));if("POST"===c?(s="data="+s,m.headers["Content-Type"]="application/x-www-form-urlencoded",m.headers["Content-Length"]=r.byteLength(s)):"GET"===c&&(l.data=s),p){if(f!==i)throw new Error("Must use HTTPS if authenticating with API Secret");const e=r.from(p+":").toString("base64");m.headers.Authorization="Basic "+e}else if(u)l.api_key=u;else if("/import"===a)throw new Error("The Mixpanel Client needs a Mixpanel API Secret when importing old events: `init(token, { secret: ... })`");h&&(m.agent=h),g.config.test&&(l.test=1),m.path=g.config.path+a+"?"+o.stringify(l),(d=f.request(m,function(e){var n="";e.on("data",function(e){n+=e}),e.on("end",function(){var e;if(g.config.verbose)try{var o=JSON.parse(n);1!=o.status&&(e=new Error("Mixpanel Server Error: "+o.error))}catch(t){e=new Error("Could not parse response from Mixpanel")}else e="1"!==n?new Error("Mixpanel Server Error: "+n):void 0;t(e)})})).on("error",function(e){g.config.debug&&console.log("Got Error: "+e.message),t(e)}),"POST"===c&&d.write(s),d.end()},send_event_request:function(e,t,n,o){n.token=g.token,n.mp_lib="node";var r={event:t,properties:n};g.config.debug&&console.log("Sending the following event to Mixpanel:\n",r),g.send_request({method:"GET",endpoint:e,data:r},o)}};var m=function(e,t){for(var n=[],o=0,r=e.length;o<r;)n.push(e.slice(o,o+=t));return n},b=function(e,t){var n=e.event_list,o=e.endpoint,r=e.max_batch_size?Math.min(50,e.max_batch_size):50,s=e.max_concurrent_requests||e.max_batch_size>50&&Math.ceil(e.max_batch_size/50),i=m(n,r),a=s?m(i,s):[i],u=i.length,p=a.length;function f(e,t){e.length>0&&(e=e.map(function(e){e.properties;return("/import"===o||e.properties.time)&&(e.properties.time=l(e.properties.time)),e.properties.token=e.properties.token||g.token,e}),g.send_request({method:"POST",endpoint:o,data:e},t))}!function e(n){var o=a[n];c(o,f,function(o,r){(n+=1)===p?t&&t(o,r):e(n)})}(0),g.config.debug&&console.log("Sending "+n.length+" events to Mixpanel in "+u+" batches of events and "+p+" batches of requests")};return g.track=function(e,t,n){if(t&&"function"!=typeof t||(n=t,t={}),t.time&&(t.time=l(t.time),t.time<Date.now()/1e3-432e3))throw new Error("`track` not allowed for event more than 5 days old; use `mixpanel.import()`");g.send_event_request("/track",e,t,n)},g.track_batch=function(e,t,n){"function"==typeof(t=t||{})&&(n=t,t={});var o={event_list:e,endpoint:"/track",max_concurrent_requests:t.max_concurrent_requests,max_batch_size:t.max_batch_size};b(o,n)},g.import=function(e,t,n,o){n&&"function"!=typeof n||(o=n,n={}),n.time=l(t),g.send_event_request("/import",e,n,o)},g.import_batch=function(e,t,n){var o;"function"!=typeof t&&t||(n=t,t={}),o={event_list:e,endpoint:"/import",max_concurrent_requests:t.max_concurrent_requests,max_batch_size:t.max_batch_size},b(o,n)},g.alias=function(e,t,n){var o={distinct_id:e,alias:t};g.track("$create_alias",o,n)},g.groups=new u(g),g.people=new p(g),g.set_config=function(e){if(Object.assign(g.config,e),e.host){const[t,n]=e.host.split(":");g.config.host=t,n&&(g.config.port=Number(n))}},t&&g.set_config(t),g};t.exports={Client:function(e){return console.warn("The function `Client(token)` is deprecated.  It is now called `init(token)`."),d(e)},init:d}},{"./groups":1,"./people":2,"./utils":4,buffer:void 0,http:void 0,https:void 0,"https-proxy-agent":13,querystring:void 0}]},{},[]);
const MixpanelLib = mpReq('Mixpanel');

//other dependencies 
const util = require('util');
const fs = require('fs');
const path = require('path')
const args = process.argv.slice(2);
const firstNames = ["James","John","Robert","Michael","William","David","Richard","Joseph","Charles","Thomas","Christopher","Daniel","Matthew","George","Donald","Anthony","Paul","Mark","Edward","Steven","Kenneth","Andrew","Brian","Joshua","Kevin","Ronald","Timothy","Jason","Jeffrey","Frank","Gary","Ryan","Nicholas","Eric","Stephen","Jacob","Larry","Jonathan","Scott","Raymond","Justin","Brandon","Gregory","Samuel","Benjamin","Patrick","Jack","Henry","Walter","Dennis","Jerry","Alexander","Peter","Tyler","Douglas","Harold","Aaron","Jose","Adam","Arthur","Zachary","Carl","Nathan","Albert","Kyle","Lawrence","Joe","Willie","Gerald","Roger","Keith","Jeremy","Terry","Harry","Ralph","Sean","Jesse","Roy","Louis","Billy","Austin","Bruce","Eugene","Christian","Bryan","Wayne","Russell","Howard","Fred","Ethan","Jordan","Philip","Alan","Juan","Randy","Vincent","Bobby","Dylan","Johnny","Phillip","Victor","Clarence","Ernest","Martin","Craig","Stanley","Shawn","Travis","Bradley","Leonard","Earl","Gabriel","Jimmy","Francis","Todd","Noah","Danny","Dale","Cody","Carlos","Allen","Frederick","Logan","Curtis","Alex","Joel","Luis","Norman","Marvin","Glenn","Tony","Nathaniel","Rodney","Melvin","Alfred","Steve","Cameron","Chad","Edwin","Caleb","Evan","Antonio","Lee","Herbert","Jeffery","Isaac","Derek","Ricky","Marcus","Theodore","Elijah","Luke","Jesus","Eddie","Troy","Mike","Dustin","Ray","Adrian","Bernard","Leroy","Angel","Randall","Wesley","Ian","Jared","Mason","Hunter","Calvin","Oscar","Clifford","Jay","Shane","Ronnie","Barry","Lucas","Corey","Manuel","Leo","Tommy","Warren","Jackson","Isaiah","Connor","Don","Dean","Jon","Julian","Miguel","Bill","Lloyd","Charlie","Mitchell","Leon","Jerome","Darrell","Jeremiah","Alvin","Brett","Seth","Floyd","Jim","Blake","Micheal","Gordon","Trevor","Lewis","Erik","Edgar","Vernon","Devin","Gavin","Jayden","Chris","Clyde","Tom","Derrick","Mario","Brent","Marc","Herman","Chase","Dominic","Ricardo","Franklin","Maurice","Max","Aiden","Owen","Lester","Gilbert","Elmer","Gene","Francisco","Glen","Cory","Garrett","Clayton","Sam","Jorge","Chester","Alejandro","Jeff","Harvey","Milton","Cole","Ivan","Andre","Duane","Landon", "Adolfo","Alberto","Aldo","Alessandro","Alessio","Alfredo","Alvaro","Andrea","Angelo","Angiolo","Antonino","Antonio","Attilio","Benito","Bernardo","Bruno","Carlo","Cesare","Christian","Claudio","Corrado","Cosimo","Cristian","Cristiano","Daniele","Dario","David","Davide","Diego","Dino","Domenico","Duccio","Edoardo","Elia","Elio","Emanuele","Emiliano","Emilio","Enrico","Enzo","Ettore","Fabio","Fabrizio","Federico","Ferdinando","Fernando","Filippo","Francesco","Franco","Gabriele","Giacomo","Giampaolo","Giampiero","Giancarlo","Gianfranco","Gianluca","Gianmarco","Gianni","Gino","Giorgio","Giovanni","Giuliano","Giulio","Giuseppe","Graziano","Gregorio","Guido","Iacopo","Jacopo","Lapo","Leonardo","Lorenzo","Luca","Luciano","Luigi","Manuel","Marcello","Marco","Marino","Mario","Massimiliano","Massimo","Matteo","Mattia","Maurizio","Mauro","Michele","Mirko","Mohamed","Nello","Neri","Niccolò","Nicola","Osvaldo","Otello","Paolo","Pier Luigi","Piero","Pietro","Raffaele","Remo","Renato","Renzo","Riccardo","Roberto","Rolando","Romano","Salvatore","Samuele","Sandro","Sergio","Silvano","Simone","Stefano","Thomas","Tommaso","Ubaldo","Ugo","Umberto","Valerio","Valter","Vasco","Vincenzo","Vittorio","Mary","Emma","Elizabeth","Minnie","Margaret","Ida","Alice","Bertha","Sarah","Annie","Clara","Ella","Florence","Cora","Martha","Laura","Nellie","Grace","Carrie","Maude","Mabel","Bessie","Jennie","Gertrude","Julia","Hattie","Edith","Mattie","Rose","Catherine","Lillian","Ada","Lillie","Helen","Jessie","Louise","Ethel","Lula","Myrtle","Eva","Frances","Lena","Lucy","Edna","Maggie","Pearl","Daisy","Fannie","Josephine","Dora","Rosa","Katherine","Agnes","Marie","Nora","May","Mamie","Blanche","Stella","Ellen","Nancy","Effie","Sallie","Nettie","Della","Lizzie","Flora","Susie","Maud","Mae","Etta","Harriet","Sadie","Caroline","Katie","Lydia","Elsie","Kate","Susan","Mollie","Alma","Addie","Georgia","Eliza","Lulu","Nannie","Lottie","Amanda","Belle","Charlotte","Rebecca","Ruth","Viola","Olive","Amelia","Hannah","Jane","Virginia","Emily","Matilda","Irene","Kathryn","Esther","Willie","Henrietta","Ollie","Amy","Rachel","Sara","Estella","Theresa","Augusta","Ora","Pauline","Josie","Lola","Sophia","Leona","Anne","Mildred","Ann","Beulah","Callie","Lou","Delia","Eleanor","Barbara","Iva","Louisa","Maria","Mayme","Evelyn","Estelle","Nina","Betty","Marion","Bettie","Dorothy","Luella","Inez","Lela","Rosie","Allie","Millie","Janie","Cornelia","Victoria","Ruby","Winifred","Alta","Celia","Christine","Beatrice","Birdie","Harriett","Mable","Myra","Sophie","Tillie","Isabel","Sylvia","Carolyn","Isabelle","Leila","Sally","Ina","Essie","Bertie","Nell","Alberta","Katharine","Lora","Rena","Mina","Rhoda","Mathilda","Abbie","Eula","Dollie","Hettie","Eunice","Fanny","Ola","Lenora","Adelaide","Christina","Lelia","Nelle","Sue","Johanna","Lilly","Lucinda","Minerva","Lettie","Roxie","Cynthia","Helena","Hilda","Hulda","Bernice","Genevieve","Jean","Cordelia","Marian","Francis","Jeanette","Adeline","Gussie","Leah","Lois","Lura","Mittie","Hallie","Isabella","Olga","Phoebe","Teresa","Hester","Lida","Lina","Winnie","Claudia","Marguerite","Vera","Cecelia","Bess","Emilie","John","Rosetta","Verna","Myrtie","Cecilia","Elva","Olivia","Ophelia","Georgie","Elnora","Violet","Adele","Lily","Linnie","Loretta","Madge","Polly","Virgie","Eugenia","Lucile","Lucille","Mabelle","Rosalie", "Ada","Adriana","Alessandra","Alessia","Alice","Angela","Anna","Anna Maria","Annalisa","Annita","Annunziata","Antonella","Arianna","Asia","Assunta","Aurora","Barbara","Beatrice","Benedetta","Bianca","Bruna","Camilla","Carla","Carlotta","Carmela","Carolina","Caterina","Catia","Cecilia","Chiara","Cinzia","Clara","Claudia","Costanza","Cristina","Daniela","Debora","Diletta","Dina","Donatella","Elena","Eleonora","Elisa","Elisabetta","Emanuela","Emma","Eva","Federica","Fernanda","Fiorella","Fiorenza","Flora","Franca","Francesca","Gabriella","Gaia","Gemma","Giada","Gianna","Gina","Ginevra","Giorgia","Giovanna","Giulia","Giuliana","Giuseppa","Giuseppina","Grazia","Graziella","Greta","Ida","Ilaria","Ines","Iolanda","Irene","Irma","Isabella","Jessica","Laura","Leda","Letizia","Licia","Lidia","Liliana","Lina","Linda","Lisa","Livia","Loretta","Luana","Lucia","Luciana","Lucrezia","Luisa","Manuela","Mara","Marcella","Margherita","Maria","Maria Cristina","Maria Grazia","Maria Luisa","Maria Pia","Maria Teresa","Marina","Marisa","Marta","Martina","Marzia","Matilde","Melissa","Michela","Milena","Mirella","Monica","Natalina","Nella","Nicoletta","Noemi","Olga","Paola","Patrizia","Piera","Pierina","Raffaella","Rebecca","Renata","Rina","Rita","Roberta","Rosa","Rosanna","Rossana","Rossella","Sabrina","Sandra","Sara","Serena","Silvana","Silvia","Simona","Simonetta","Sofia","Sonia","Stefania","Susanna","Teresa","Tina","Tiziana","Tosca","Valentina","Valeria","Vanda","Vanessa","Vanna","Vera","Veronica","Vilma","Viola","Virginia","Vittoria"];
const lastNames = ["Smith","Johnson","Williams","Jones","Brown","Davis","Miller","Wilson","Moore","Taylor","Anderson","Thomas","Jackson","White","Harris","Martin","Thompson","Garcia","Martinez","Robinson","Clark","Rodriguez","Lewis","Lee","Walker","Hall","Allen","Young","Hernandez","King","Wright","Lopez","Hill","Scott","Green","Adams","Baker","Gonzalez","Nelson","Carter","Mitchell","Perez","Roberts","Turner","Phillips","Campbell","Parker","Evans","Edwards","Collins","Stewart","Sanchez","Morris","Rogers","Reed","Cook","Morgan","Bell","Murphy","Bailey","Rivera","Cooper","Richardson","Cox","Howard","Ward","Torres","Peterson","Gray","Ramirez","James","Watson","Brooks","Kelly","Sanders","Price","Bennett","Wood","Barnes","Ross","Henderson","Coleman","Jenkins","Perry","Powell","Long","Patterson","Hughes","Flores","Washington","Butler","Simmons","Foster","Gonzales","Bryant","Alexander","Russell","Griffin","Diaz","Hayes","Myers","Ford","Hamilton","Graham","Sullivan","Wallace","Woods","Cole","West","Jordan","Owens","Reynolds","Fisher","Ellis","Harrison","Gibson","McDonald","Cruz","Marshall","Ortiz","Gomez","Murray","Freeman","Wells","Webb","Simpson","Stevens","Tucker","Porter","Hunter","Hicks","Crawford","Henry","Boyd","Mason","Morales","Kennedy","Warren","Dixon","Ramos","Reyes","Burns","Gordon","Shaw","Holmes","Rice","Robertson","Hunt","Black","Daniels","Palmer","Mills","Nichols","Grant","Knight","Ferguson","Rose","Stone","Hawkins","Dunn","Perkins","Hudson","Spencer","Gardner","Stephens","Payne","Pierce","Berry","Matthews","Arnold","Wagner","Willis","Ray","Watkins","Olson","Carroll","Duncan","Snyder","Hart","Cunningham","Bradley","Lane","Andrews","Ruiz","Harper","Fox","Riley","Armstrong","Carpenter","Weaver","Greene","Lawrence","Elliott","Chavez","Sims","Austin","Peters","Kelley","Franklin","Lawson","Fields","Gutierrez","Ryan","Schmidt","Carr","Vasquez","Castillo","Wheeler","Chapman","Oliver","Montgomery","Richards","Williamson","Johnston","Banks","Meyer","Bishop","McCoy","Howell","Alvarez","Morrison","Hansen","Fernandez","Garza","Harvey","Little","Burton","Stanley","Nguyen","George","Jacobs","Reid","Kim","Fuller","Lynch","Dean","Gilbert","Garrett","Romero","Welch","Larson","Frazier","Burke","Hanson","Day","Mendoza","Moreno","Bowman","Medina","Fowler","Brewer","Hoffman","Carlson","Silva","Pearson","Holland","Douglas","Fleming","Jensen","Vargas","Byrd","Davidson","Hopkins","May","Terry","Herrera","Wade","Soto","Walters","Curtis","Neal","Caldwell","Lowe","Jennings","Barnett","Graves","Jimenez","Horton","Shelton","Barrett","Obrien","Castro","Sutton","Gregory","McKinney","Lucas","Miles","Craig","Rodriquez","Chambers","Holt","Lambert","Fletcher","Watts","Bates","Hale","Rhodes","Pena","Beck","Newman","Haynes","McDaniel","Mendez","Bush","Vaughn","Parks","Dawson","Santiago","Norris","Hardy","Love","Steele","Curry","Powers","Schultz","Barker","Guzman","Page","Munoz","Ball","Keller","Chandler","Weber","Leonard","Walsh","Lyons","Ramsey","Wolfe","Schneider","Mullins","Benson","Sharp","Bowen","Daniel","Barber","Cummings","Hines","Baldwin","Griffith","Valdez","Hubbard","Salazar","Reeves","Warner","Stevenson","Burgess","Santos","Tate","Cross","Garner","Mann","Mack","Moss","Thornton","Dennis","McGee","Farmer","Delgado","Aguilar","Vega","Glover","Manning","Cohen","Harmon","Rodgers","Robbins","Newton","Todd","Blair","Higgins","Ingram","Reese","Cannon","Strickland","Townsend","Potter","Goodwin","Walton","Rowe","Hampton","Ortega","Patton","Swanson","Joseph","Francis","Goodman","Maldonado","Yates","Becker","Erickson","Hodges","Rios","Conner","Adkins","Webster","Norman","Malone","Hammond","Flowers","Cobb","Moody","Quinn","Blake","Maxwell","Pope","Floyd","Osborne","Paul","McCarthy","Guerrero","Lindsey","Estrada","Sandoval","Gibbs","Tyler","Gross","Fitzgerald","Stokes","Doyle","Sherman","Saunders","Wise","Colon","Gill","Alvarado","Greer","Padilla","Simon","Waters","Nunez","Ballard","Schwartz","McBride","Houston","Christensen","Klein","Pratt","Briggs","Parsons","McLaughlin","Zimmerman","French","Buchanan","Moran","Copeland","Roy","Pittman","Brady","McCormick","Holloway","Brock","Poole","Frank","Logan","Owen","Bass","Marsh","Drake","Wong","Jefferson","Park","Morton","Abbott","Sparks","Patrick","Norton","Huff","Clayton","Massey","Lloyd","Figueroa","Carson","Bowers","Roberson","Barton","Tran","Lamb","Harrington","Casey","Boone","Cortez","Clarke","Mathis","Singleton","Wilkins","Cain","Bryan","Underwood","Hogan","McKenzie","Collier","Luna","Phelps","McGuire","Allison","Bridges","Wilkerson","Nash","Summers","Atkins", "Acciai","Aglietti","Agostini","Agresti","Ahmed","Aiazzi","Albanese","Alberti","Alessi","Alfani","Alinari","Alterini","Amato","Ammannati","Ancillotti","Andrei","Andreini","Andreoni","Angeli","Anichini","Antonelli","Antonini","Arena","Ariani","Arnetoli","Arrighi","Baccani","Baccetti","Bacci","Bacherini","Badii","Baggiani","Baglioni","Bagni","Bagnoli","Baldassini","Baldi","Baldini","Ballerini","Balli","Ballini","Balloni","Bambi","Banchi","Bandinelli","Bandini","Bani","Barbetti","Barbieri","Barchielli","Bardazzi","Bardelli","Bardi","Barducci","Bargellini","Bargiacchi","Barni","Baroncelli","Baroncini","Barone","Baroni","Baronti","Bartalesi","Bartoletti","Bartoli","Bartolini","Bartoloni","Bartolozzi","Basagni","Basile","Bassi","Batacchi","Battaglia","Battaglini","Bausi","Becagli","Becattini","Becchi","Becucci","Bellandi","Bellesi","Belli","Bellini","Bellucci","Bencini","Benedetti","Benelli","Beni","Benini","Bensi","Benucci","Benvenuti","Berlincioni","Bernacchioni","Bernardi","Bernardini","Berni","Bernini","Bertelli","Berti","Bertini","Bessi","Betti","Bettini","Biagi","Biagini","Biagioni","Biagiotti","Biancalani","Bianchi","Bianchini","Bianco","Biffoli","Bigazzi","Bigi","Biliotti","Billi","Binazzi","Bindi","Bini","Biondi","Bizzarri","Bocci","Bogani","Bolognesi","Bonaiuti","Bonanni","Bonciani","Boncinelli","Bondi","Bonechi","Bongini","Boni","Bonini","Borchi","Boretti","Borghi","Borghini","Borgioli","Borri","Borselli","Boschi","Bottai","Bracci","Braccini","Brandi","Braschi","Bravi","Brazzini","Breschi","Brilli","Brizzi","Brogelli","Brogi","Brogioni","Brunelli","Brunetti","Bruni","Bruno","Brunori","Bruschi","Bucci","Bucciarelli","Buccioni","Bucelli","Bulli","Burberi","Burchi","Burgassi","Burroni","Bussotti","Buti","Caciolli","Caiani","Calabrese","Calamai","Calamandrei","Caldini","Calo'","Calonaci","Calosi","Calvelli","Cambi","Camiciottoli","Cammelli","Cammilli","Campolmi","Cantini","Capanni","Capecchi","Caponi","Cappelletti","Cappelli","Cappellini","Cappugi","Capretti","Caputo","Carbone","Carboni","Cardini","Carlesi","Carletti","Carli","Caroti","Carotti","Carrai","Carraresi","Carta","Caruso","Casalini","Casati","Caselli","Casini","Castagnoli","Castellani","Castelli","Castellucci","Catalano","Catarzi","Catelani","Cavaciocchi","Cavallaro","Cavallini","Cavicchi","Cavini","Ceccarelli","Ceccatelli","Ceccherelli","Ceccherini","Cecchi","Cecchini","Cecconi","Cei","Cellai","Celli","Cellini","Cencetti","Ceni","Cenni","Cerbai","Cesari","Ceseri","Checcacci","Checchi","Checcucci","Cheli","Chellini","Chen","Cheng","Cherici","Cherubini","Chiaramonti","Chiarantini","Chiarelli","Chiari","Chiarini","Chiarugi","Chiavacci","Chiesi","Chimenti","Chini","Chirici","Chiti","Ciabatti","Ciampi","Cianchi","Cianfanelli","Cianferoni","Ciani","Ciapetti","Ciappi","Ciardi","Ciatti","Cicali","Ciccone","Cinelli","Cini","Ciobanu","Ciolli","Cioni","Cipriani","Cirillo","Cirri","Ciucchi","Ciuffi","Ciulli","Ciullini","Clemente","Cocchi","Cognome","Coli","Collini","Colombo","Colzi","Comparini","Conforti","Consigli","Conte","Conti","Contini","Coppini","Coppola","Corsi","Corsini","Corti","Cortini","Cosi","Costa","Costantini","Costantino","Cozzi","Cresci","Crescioli","Cresti","Crini","Curradi","D'Agostino","D'Alessandro","D'Amico","D'Angelo","Daddi","Dainelli","Dallai","Danti","Davitti","De Angelis","De Luca","De Marco","De Rosa","De Santis","De Simone","De Vita","Degl'Innocenti","Degli Innocenti","Dei","Del Lungo","Del Re","Di Marco","Di Stefano","Dini","Diop","Dobre","Dolfi","Donati","Dondoli","Dong","Donnini","Ducci","Dumitru","Ermini","Esposito","Evangelisti","Fabbri","Fabbrini","Fabbrizzi","Fabbroni","Fabbrucci","Fabiani","Facchini","Faggi","Fagioli","Failli","Faini","Falciani","Falcini","Falcone","Fallani","Falorni","Falsini","Falugiani","Fancelli","Fanelli","Fanetti","Fanfani","Fani","Fantappie'","Fantechi","Fanti","Fantini","Fantoni","Farina","Fattori","Favilli","Fedi","Fei","Ferrante","Ferrara","Ferrari","Ferraro","Ferretti","Ferri","Ferrini","Ferroni","Fiaschi","Fibbi","Fiesoli","Filippi","Filippini","Fini","Fioravanti","Fiore","Fiorentini","Fiorini","Fissi","Focardi","Foggi","Fontana","Fontanelli","Fontani","Forconi","Formigli","Forte","Forti","Fortini","Fossati","Fossi","Francalanci","Franceschi","Franceschini","Franchi","Franchini","Franci","Francini","Francioni","Franco","Frassineti","Frati","Fratini","Frilli","Frizzi","Frosali","Frosini","Frullini","Fusco","Fusi","Gabbrielli","Gabellini","Gagliardi","Galanti","Galardi","Galeotti","Galletti","Galli","Gallo","Gallori","Gambacciani","Gargani","Garofalo","Garuglieri","Gashi","Gasperini","Gatti","Gelli","Gensini","Gentile","Gentili","Geri","Gerini","Gheri","Ghini","Giachetti","Giachi","Giacomelli","Gianassi","Giani","Giannelli","Giannetti","Gianni","Giannini","Giannoni","Giannotti","Giannozzi","Gigli","Giordano","Giorgetti","Giorgi","Giovacchini","Giovannelli","Giovannetti","Giovannini","Giovannoni","Giuliani","Giunti","Giuntini","Giusti","Gonnelli","Goretti","Gori","Gradi","Gramigni","Grassi","Grasso","Graziani","Grazzini","Greco","Grifoni","Grillo","Grimaldi","Grossi","Gualtieri","Guarducci","Guarino","Guarnieri","Guasti","Guerra","Guerri","Guerrini","Guidi","Guidotti","He","Hoxha","Hu","Huang","Iandelli","Ignesti","Innocenti","Jin","La Rosa","Lai","Landi","Landini","Lanini","Lapi","Lapini","Lari","Lascialfari","Lastrucci","Latini","Lazzeri","Lazzerini","Lelli","Lenzi","Leonardi","Leoncini","Leone","Leoni","Lepri","Li","Liao","Lin","Linari","Lippi","Lisi","Livi","Lombardi","Lombardini","Lombardo","Longo","Lopez","Lorenzi","Lorenzini","Lorini","Lotti","Lu","Lucchesi","Lucherini","Lunghi","Lupi","Madiai","Maestrini","Maffei","Maggi","Maggini","Magherini","Magini","Magnani","Magnelli","Magni","Magnolfi","Magrini","Malavolti","Malevolti","Manca","Mancini","Manetti","Manfredi","Mangani","Mannelli","Manni","Mannini","Mannucci","Manuelli","Manzini","Marcelli","Marchese","Marchetti","Marchi","Marchiani","Marchionni","Marconi","Marcucci","Margheri","Mari","Mariani","Marilli","Marinai","Marinari","Marinelli","Marini","Marino","Mariotti","Marsili","Martelli","Martinelli","Martini","Martino","Marzi","Masi","Masini","Masoni","Massai","Materassi","Mattei","Matteini","Matteucci","Matteuzzi","Mattioli","Mattolini","Matucci","Mauro","Mazzanti","Mazzei","Mazzetti","Mazzi","Mazzini","Mazzocchi","Mazzoli","Mazzoni","Mazzuoli","Meacci","Mecocci","Meini","Melani","Mele","Meli","Mengoni","Menichetti","Meoni","Merlini","Messeri","Messina","Meucci","Miccinesi","Miceli","Micheli","Michelini","Michelozzi","Migliori","Migliorini","Milani","Miniati","Misuri","Monaco","Montagnani","Montagni","Montanari","Montelatici","Monti","Montigiani","Montini","Morandi","Morandini","Morelli","Moretti","Morganti","Mori","Morini","Moroni","Morozzi","Mugnai","Mugnaini","Mustafa","Naldi","Naldini","Nannelli","Nanni","Nannini","Nannucci","Nardi","Nardini","Nardoni","Natali","Ndiaye","Nencetti","Nencini","Nencioni","Neri","Nesi","Nesti","Niccolai","Niccoli","Niccolini","Nigi","Nistri","Nocentini","Noferini","Novelli","Nucci","Nuti","Nutini","Oliva","Olivieri","Olmi","Orlandi","Orlandini","Orlando","Orsini","Ortolani","Ottanelli","Pacciani","Pace","Paci","Pacini","Pagani","Pagano","Paggetti","Pagliai","Pagni","Pagnini","Paladini","Palagi","Palchetti","Palloni","Palmieri","Palumbo","Pampaloni","Pancani","Pandolfi","Pandolfini","Panerai","Panichi","Paoletti","Paoli","Paolini","Papi","Papini","Papucci","Parenti","Parigi","Parisi","Parri","Parrini","Pasquini","Passeri","Pecchioli","Pecorini","Pellegrini","Pepi","Perini","Perrone","Peruzzi","Pesci","Pestelli","Petri","Petrini","Petrucci","Pettini","Pezzati","Pezzatini","Piani","Piazza","Piazzesi","Piazzini","Piccardi","Picchi","Piccini","Piccioli","Pieraccini","Pieraccioni","Pieralli","Pierattini","Pieri","Pierini","Pieroni","Pietrini","Pini","Pinna","Pinto","Pinzani","Pinzauti","Piras","Pisani","Pistolesi","Poggesi","Poggi","Poggiali","Poggiolini","Poli","Pollastri","Porciani","Pozzi","Pratellesi","Pratesi","Prosperi","Pruneti","Pucci","Puccini","Puccioni","Pugi","Pugliese","Puliti","Querci","Quercioli","Raddi","Radu","Raffaelli","Ragazzini","Ranfagni","Ranieri","Rastrelli","Raugei","Raveggi","Renai","Renzi","Rettori","Ricci","Ricciardi","Ridi","Ridolfi","Rigacci","Righi","Righini","Rinaldi","Risaliti","Ristori","Rizzo","Rocchi","Rocchini","Rogai","Romagnoli","Romanelli","Romani","Romano","Romei","Romeo","Romiti","Romoli","Romolini","Rontini","Rosati","Roselli","Rosi","Rossetti","Rossi","Rossini","Rovai","Ruggeri","Ruggiero","Russo","Sabatini","Saccardi","Sacchetti","Sacchi","Sacco","Salerno","Salimbeni","Salucci","Salvadori","Salvestrini","Salvi","Salvini","Sanesi","Sani","Sanna","Santi","Santini","Santoni","Santoro","Santucci","Sardi","Sarri","Sarti","Sassi","Sbolci","Scali","Scarpelli","Scarselli","Scopetani","Secci","Selvi","Senatori","Senesi","Serafini","Sereni","Serra","Sestini","Sguanci","Sieni","Signorini","Silvestri","Simoncini","Simonetti","Simoni","Singh","Sodi","Soldi","Somigli","Sorbi","Sorelli","Sorrentino","Sottili","Spina","Spinelli","Staccioli","Staderini","Stefanelli","Stefani","Stefanini","Stella","Susini","Tacchi","Tacconi","Taddei","Tagliaferri","Tamburini","Tanganelli","Tani","Tanini","Tapinassi","Tarchi","Tarchiani","Targioni","Tassi","Tassini","Tempesti","Terzani","Tesi","Testa","Testi","Tilli","Tinti","Tirinnanzi","Toccafondi","Tofanari","Tofani","Tognaccini","Tonelli","Tonini","Torelli","Torrini","Tosi","Toti","Tozzi","Trambusti","Trapani","Tucci","Turchi","Ugolini","Ulivi","Valente","Valenti","Valentini","Vangelisti","Vanni","Vannini","Vannoni","Vannozzi","Vannucchi","Vannucci","Ventura","Venturi","Venturini","Vestri","Vettori","Vichi","Viciani","Vieri","Vigiani","Vignoli","Vignolini","Vignozzi","Villani","Vinci","Visani","Vitale","Vitali","Viti","Viviani","Vivoli","Volpe","Volpi","Wang","Wu","Xu","Yang","Ye","Zagli","Zani","Zanieri","Zanobini","Zecchi","Zetti","Zhang","Zheng","Zhou","Zhu","Zingoni","Zini","Zoppi"];
//give every Array a range() and random() method
Array.prototype.range = rangeArray
Array.prototype.pickOne = randomArray
/* beautify ignore:end */

console.log(`Let's do this!!!\n`)

//if the user specifics an separate config file
const suppliedConfig = args[0];
let externalConfig = null
if (suppliedConfig) {
	console.log(`using ${suppliedConfig} for data\n`)
	externalConfig = require(`./${suppliedConfig}`)
	externalConfig.token = Boolean(args[1]) ? args[1] : externalConfig.token;
	externalConfig.secret = Boolean(args[2]) ? args[2] : externalConfig.secret;
}


/*

config
THIS IS WHAT YOU EDIT
note, you can ALSO write this configuration in another file and run as:
	
	node index.js myConfigFile.js

see configExample.js for... an example :)

*/
const config = {
    // token & secret; you can pass these as command line params too.
    token: "{{PROJECT TOKEN}}",
    secret: "{{PROJECT SECRET}}",
    
    verbose: true, 				//log lots of messages to the console (SLOW)
    lengthInDays: 30, 			//how many days worth of data
    numberOfEvents: 10000, 		//how many events
    numberOfUsers: 100, 		//how many users
    saveCopyOfData: false, 		//save a local copy of eventData?
    
    //events will be chosen at random
    eventNames: ["checkout", "add to cart", "view item", "add to favorites"],
    
    eventProperties: {
        /*         
        each key is a property name; the "value" is an array of possible property values
        when run, the script will choose random values for each property
        you can also use [].range as shown below
        you can also reference functions which return custom values
        */
        affiliate: ["Amazon", "Target", "Wayfair", "Alibaba", "eBay", "Flipkart", "Walmart", "BestBuy", "Costco", "Target"],
        coupon: [false, "couponFoo", false, "couponBar", false, "couponBaz", false, "couponQux", false, "couponMux"],
        currency: ["USD", "CAD", "EUR", "BTC", "ETH", "JPY"],
        isFeaturedItem: [true, false],
        value: [].range(2, 1000),
        revenue: [].range(5, 500),
        cart: makeProducts,
        cart_id: uuid
    },
    userProperties: {
        /*
		user properties work the same as event properties
		each key should be an array or function reference
    	*/
        foo: ["foo A", "foo B", "foo C", "foo D", "foo E"],
        bar: ["bar A", "bar B", "bar C", "bar D", "bar E"],
        baz: ["baz A", "baz B", "baz C", "baz D", "baz E"],
        qux: [].range(1, 1000),
    },

    /*
	for group analytics keys, we need an array of arrays [[],[],[]] 
	each pair represents a group_key and the number of profiles for that key
    */
    groupKeys: [
        ['company_id', 1000],
        ['document_id', 1000],
        ['conversation_id', 1000]
    ],
    groupProperties: {
        /*
    	group profile properties work the same way as userProps and eventProps
		make sure the keys in this object match the groupKeys specified above
    	*/
        company_id: {
            $name: ['company FOO', 'company BAR', 'company BAZ', 'company QUX', 'company DUX'],
            "# of employees": [].range(3, 10000)
        },

        document_id: {
            $name: ['document FOO', 'document BAR', 'document BAZ', 'document QUX', 'document DUX'],
            "# of collaborators": [].range(1, 50)
        },

        conversation_id: {
            $name: ['conversation FOO', 'conversation BAR', 'conversation BAZ', 'conversation QUX', 'conversation DUX'],
            "# of messages": [].range(300, 500000)
        }
    }
}

/* 
example of using function to generate event props
makeProducts() returns an array of nested objects of random size [{},{},{}]
it gets called each time an event is created for the fake dataset
you can delete this method; it's used for 'cart' in the example config
*/
function makeProducts() {
    let categories = ["Device Accessories", "eBooks", "Automotive & Powersports", "Baby Products (excluding apparel)", "Beauty", "Books", "Camera & Photo", "Cell Phones & Accessories", "Collectible Coins", "Consumer Electronics", "Entertainment Collectibles", "Fine Art", "Grocery & Gourmet Food", "Health & Personal Care", "Home & Garden", "Independent Design", "Industrial & Scientific", "Accessories", "Major Appliances", "Music", "Musical Instruments", "Office Products", "Outdoors", "Personal Computers", "Pet Supplies", "Software", "Sports", "Sports Collectibles", "Tools & Home Improvement", "Toys & Games", "Video, DVD & Blu-ray", "Video Games", "Watches"]
    let slugs = ['/sale/', '/featured/', '/home/', '/search/', '/wishlist/', '/']
    let assetExtention = ['.png', '.jpg', '.jpeg', '.heic', '.mp4', '.mov', '.avi']
    let data = []
    let numOfItems = randomNum(1, 12);

    for (var i = 0; i < numOfItems; i++) {

        let category = categories.pickOne()
        let slug = slugs.pickOne()
        let asset = assetExtention.pickOne()
        let product_id = uuid()
        let price = randomNum(1, 300)
        let quantity = randomNum(1, 5)

        let item = {
            product_id: product_id,
            sku: randomNum(11111, 99999),
            price: price,
            quantity: quantity,
            value: price * quantity,
            featured: [true, false].pickOne(),
            released: 1613875656128,
            category: category,
            urlSlug: slug + category,
            asset: `${category}-${randomNum(1,20)}${asset}`
        }

        data.push(item)
    }

    return data
}



//built-in helpers
//don't touch these
const now = Date.now();
const dayInMs = 8.64e+7;

function rangeArray(a, b, step = 1) {
    step = !step ? 1 : step;
    b = b / step;
    for (var i = a; i <= b; i++) {
        this.push(i * step);
    }
    return this;
};

function randomArray() {
    return this[Math.floor((Math.random() * this.length))];
}

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function fakeIp() {
    var ip = (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255));
    return ip
}

function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeSpaces(stringy) {
    let noSpaces = stringy.split(' ').join('');
    return noSpaces;

}

function makeEvent(eventNames, currentUser, earliestTime, customProps, groupKeys) {
    let event = {
        event: eventNames.pickOne(),
        properties: {
            distinct_id: currentUser,
            time: randomNum(earliestTime, now),
            ip: fakeIp()
        }
    }

    //iterate through custom properties
    for (const key in customProps) {
        let choice;
        if (Array.isArray(customProps[key])) {
            choice = customProps[key].pickOne()

        } else if (typeof(customProps[key]) === "function") {
            choice = customProps[key]()

        } else {
            throw new Error(`your config contains a key:\n${key}\nwhich is not an array [] or function`)
        }


        event.properties[key] = choice
    }

    //iterate through groups
    for (const groupPair of groupKeys) {
        let groupKey = groupPair[0];
        let totalProfiles = groupPair[1];
        event.properties[groupKey] = [].range(1, totalProfiles).pickOne()
    }

    //console.log(event)

    return event
}

function makeUserProfileProps(userProps) {
    let month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].pickOne();
    let day = randomNum(1, 31);
    let year = randomNum(2018, 2020)
    let gender = ['men', 'women'].pickOne();
    let first = firstNames.pickOne();
    let last = lastNames.pickOne();
    let domain = ['gmail', 'yahoo', 'hotmail', 'aol'].pickOne();

    //build the spec
    let profileProps = {
        $first_name: first,
        $last_name: last,
        $email: `${first}.${last}@${domain}.com`,
        $avatar: `https://randomuser.me/api/portraits/${gender}/${randomNum(1,99)}.jpg`,
        $created: (new Date(`${month} ${day} ${year}`)).toISOString(),
        gender: gender === "men" ? "man" : "woman"
    };

    for (const key in userProps) {
        let choice;
        if (Array.isArray(userProps[key])) {
            choice = userProps[key].pickOne()

        } else if (typeof(userProps[key]) === "function") {
            choice = userProps[key]()

        } else {
            throw new Error(`your config contains a key:\n${key}\nwhich is not an array [] or function`)
        }


        profileProps[key] = choice
    }

    return profileProps;
}

function makeGroupProfileProps(groupProps) {
    let groupProfile = {}

    for (const key in groupProps) {
        let choice;
        if (Array.isArray(groupProps[key])) {
            choice = groupProps[key].pickOne()

        } else if (typeof(groupProps[key]) === "function") {
            choice = groupProps[key]()

        } else {
            throw new Error(`your config contains a key:\n${key}\nwhich is not an array [] or function`)
        }


        groupProfile[key] = choice
    }

    return groupProfile
}

//our main program
async function main(config) {
    const mixpanel = MixpanelLib.init(config.token, {
        secret: config.secret
    });

    mixpanel.set_config({
        debug: config.verbose
    });


    //promisfying people.set()
    function peoplePropPromise(uuid, props, config = null) {
        return new Promise(function(resolve, reject) {
            mixpanel.people.set(uuid, props, config, resolve)
        })
    }

    //promisfying groups.set()
    function groupPropPromise(groupKey, groupValue, props, config = null) {
        return new Promise(function(resolve, reject) {
            mixpanel.groups.set(groupKey, groupValue, props, config, resolve)
        })
    }

    let {
        lengthInDays,
        numberOfEvents,
        numberOfUsers,
        eventNames,
        eventProperties,
        userProperties,
        groupKeys,
        groupProperties
    } = config

    //make sure we have more events than users
    if (numberOfUsers > numberOfEvents) {
        throw new Error(`you specified ${numberOfEvents} over ${numberOfUsers}...\nthis is impossible; please make sure numberOfEvents is greater than numberOfUsers`)
    }

    let finalEventsData = []

    let eventsPerUser = Math.floor(numberOfEvents / numberOfUsers)
    let earliestTime = now - (lengthInDays * dayInMs)

    console.log(`Building ${numberOfUsers} unique user profiles\n`)

    for (let i = 0; i < numberOfUsers; i++) {
        let currentUser = uuid();
        let userProps = makeUserProfileProps(userProperties);

        try {
            
            // mixpanel.people.set(currentUser, userProps, {
            //     $ignore_time: true,
            //     $ip: fakeIp()
            // })

            await peoplePropPromise(currentUser, userProps, {
                $ignore_time: true,
                $ip: fakeIp()
            })
        } catch (e) {
            console.log('profiles fail!\n')
            console.log(e)
        }

        for (let j = 0; j < eventsPerUser; j++) {
            finalEventsData.push(makeEvent(eventNames, currentUser, earliestTime, eventProperties, groupKeys));
        }
    }

    /* beautify ignore:start */
    let totalNumberGroups = groupKeys.reduce((acc, current) => { return acc += current[1]}, 0)
    /* beautify ignore:end */

    console.log(`Building ${groupKeys.length} groups for ${totalNumberGroups} profiles\n`)

    //for each group key
    for (let group of groupKeys) {
        let groupKey = group[0]
        let numOfProfiles = group[1]
            //for each profile
        for (let i = 1; i < numOfProfiles + 1; i++) {

            try {
                let groupProfile = makeGroupProfileProps(groupProperties[groupKey])

                    // mixpanel.groups.set(groupKey, i, groupProfile, {
                    //     $ignore_time: true
                    // })
                    
                await groupPropPromise(groupKey, i, groupProfile, {
                    $ignore_time: true
                })

            } catch (e) {
                console.log('groups fail!\n')
                console.log(e)
            }
        }
    }

    //prefer promise method
    //mixpanel.import_batch(finalEventsData) 
    const importerEvents = util.promisify(mixpanel.import_batch);
    mixpanel.set_config({
        debug: true
    });
    importerEvents(finalEventsData).then(() => {
        console.log('\nevent data set!\n')
    }).then(() => {
        if (config.saveCopyOfData) {
            console.log('\nwriting a copy of the data to file: eventData.json\n')
            fs.writeFile('eventData.json', JSON.stringify(finalEventsData, null, 2), function(err) {
                if (err) return console.log(err);

            })
        }

    }).then(() => {
        console.log('\nall finished\n')
    })
    
    return finalEventsData

}

//that's all folks :)
main(externalConfig || config)