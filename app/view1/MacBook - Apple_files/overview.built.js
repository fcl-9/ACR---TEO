(function e(h,j,l){function m(a,c){if(!j[a]){if(!h[a]){var d=typeof require=="function"&&require;
if(!c&&d){return d(a,!0)}if(i){return i(a,!0)}throw new Error("Cannot find module '"+a+"'")
}var b=j[a]={exports:{}};h[a][0].call(b.exports,function(g){var f=h[a][1][g];return m(f?f:g)
},b,b.exports,e,h,j,l)}return j[a].exports}var i=typeof require=="function"&&require;
for(var k=0;k<l.length;k++){m(l[k])}return m})({1:[function(f,i,g){i.exports=function h(a,c,b,d){if(a.addEventListener){a.addEventListener(c,b,!!d)
}else{a.attachEvent("on"+c,b)}return a}},{}],2:[function(d,g,f){g.exports={EventEmitterMicro:d("./ac-event-emitter-micro/EventEmitterMicro")}
},{"./ac-event-emitter-micro/EventEmitterMicro":3}],3:[function(g,k,h){function i(){this._events={}
}var j=i.prototype;j.on=function(b,a){this._events[b]=this._events[b]||[];this._events[b].unshift(a)
};j.once=function(d,a){var b=this;function c(f){b.off(d,c);if(f!==undefined){a(f)
}else{a()}}this.on(d,c)};j.off=function(c,a){if(!this.has(c)){return}var b=this._events[c].indexOf(a);
if(b===-1){return}this._events[c].splice(b,1)};j.trigger=function(c,a){if(!this.has(c)){return
}for(var b=this._events[c].length-1;b>=0;b--){if(a!==undefined){this._events[c][b](a)
}else{this._events[c][b]()}}};j.has=function(a){if(a in this._events===false||this._events[a].length===0){return false
}return true};j.destroy=function(){for(var a in this._events){this._events[a]=null
}this._events=null};k.exports=i},{}],4:[function(f,i,g){i.exports=function h(a){var b;
return function(){if(typeof b==="undefined"){b=a.apply(this,arguments)}return b
}}},{}],5:[function(d,g,f){g.exports={getWindow:function(){return window},getDocument:function(){return document
},getNavigator:function(){return navigator}}},{}],6:[function(m,l,h){m("@marcom/ac-polyfills/matchMedia");
var j=m("./helpers/globals");var k=m("@marcom/ac-function/once");function i(){var a=j.getWindow();
var b=a.matchMedia("only all");return !!(b&&b.matches)}l.exports=k(i);l.exports.original=i
},{"./helpers/globals":5,"@marcom/ac-function/once":4,"@marcom/ac-polyfills/matchMedia":10}],7:[function(d,g,f){if(!Function.prototype.bind){Function.prototype.bind=function(k){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
}var a=Array.prototype.slice.call(arguments,1);var b=this;var j=function(){};var c=function(){return b.apply((this instanceof j&&k)?this:k,a.concat(Array.prototype.slice.call(arguments)))
};j.prototype=this.prototype;c.prototype=new j();return c}}},{}],8:[function(f,i,g){if(!Object.create){var h=function(){};
Object.create=function(a){if(arguments.length>1){throw new Error("Second argument not supported")
}if(a===null||typeof a!=="object"){throw new TypeError("Object prototype may only be an Object.")
}h.prototype=a;return new h()}}},{}],9:[function(f,i,g){if(!Object.keys){Object.keys=function h(b){var c=[];
var a;if((!b)||(typeof b.hasOwnProperty!=="function")){throw"Object.keys called on non-object."
}for(a in b){if(b.hasOwnProperty(a)){c.push(a)}}return c}}},{}],10:[function(d,g,f){window.matchMedia=window.matchMedia||(function(c,b){var m,o=c.documentElement,n=o.firstElementChild||o.firstChild,l=c.createElement("body"),a=c.createElement("div");
a.id="mq-test-1";a.style.cssText="position:absolute;top:-100em";l.style.background="none";
l.appendChild(a);return function(h){a.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width:42px; }</style>';
o.insertBefore(l,n);m=a.offsetWidth===42;o.removeChild(l);return{matches:m,media:h}
}}(document))},{}],11:[function(v,w,s){v("@marcom/ac-polyfills/Function/prototype.bind");
v("@marcom/ac-polyfills/Object/keys");v("@marcom/ac-polyfills/Object/create");var m=v("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var p=v("@marcom/ac-dom-events/utils/addEventListener");var q=v("@marcom/ac-feature/mediaQueriesAvailable");
var u="viewport-emitter";var o="::before";var t="only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)";
function n(a){m.call(this);this._initializeElement(a);if(q()){this._updateViewport=this._updateViewport.bind(this);
p(window,"resize",this._updateViewport);p(window,"orientationchange",this._updateViewport);
this._retinaQuery=window.matchMedia(t);this._updateRetina();if(this._retinaQuery.addListener){this._updateRetina=this._updateRetina.bind(this);
this._retinaQuery.addListener(this._updateRetina)}}this._updateViewport()}var r=n.prototype=Object.create(m.prototype);
r.viewport=false;r.retina=false;r._initializeElement=function(b){var a;b=b||u;a=document.getElementById(b);
if(!a){a=document.createElement("div");a.id=b;a=document.body.appendChild(a)}this._el=a
};r._getElementContent=function(){var a;if("currentStyle" in this._el){a=this._el.currentStyle["x-content"]
}else{this._invalidateStyles();a=window.getComputedStyle(this._el,o).content}a=a.replace(/["']/g,"");
if(a){return a}return false};r._updateViewport=function(){var a=this.viewport;var c;
var b;this.viewport=this._getElementContent();if(this.viewport){this.viewport=this.viewport.split(":").pop()
}if(a&&this.viewport!==a){b={from:a,to:this.viewport};this.trigger("change",b);
this.trigger("from:"+a,b);this.trigger("to:"+this.viewport,b)}};r._updateRetina=function(a){var b=this.retina;
this.retina=this._retinaQuery.matches;if(b!==this.retina){this.trigger("retinachange",{from:b,to:this.retina})
}};r._invalidateStyles=function(){document.documentElement.clientWidth;this._el.innerHTML=(this._el.innerHTML===" ")?" ":" ";
document.documentElement.clientWidth};w.exports=n},{"@marcom/ac-dom-events/utils/addEventListener":1,"@marcom/ac-event-emitter-micro":2,"@marcom/ac-feature/mediaQueriesAvailable":6,"@marcom/ac-polyfills/Function/prototype.bind":7,"@marcom/ac-polyfills/Object/create":8,"@marcom/ac-polyfills/Object/keys":9}],12:[function(i,h,f){var g=i("./ViewportEmitter");
h.exports=new g()},{"./ViewportEmitter":11}],13:[function(g,i,h){var j=g("./ac-ajax/Ajax");
var k=g("./ac-ajax/Request");i.exports=new j();i.exports.Ajax=j;i.exports.Request=k
},{"./ac-ajax/Ajax":14,"./ac-ajax/Request":15}],14:[function(o,l,i){var m=o("./Request");
var k=o("./XDomain-request");var j=o("./URLParser");var n=function(){};n._Request=m;
n.prototype={_defaults:{method:"get",timeout:5000},_extend:function(){for(var a=1;
a<arguments.length;a++){for(var b in arguments[a]){if(arguments[a].hasOwnProperty(b)){arguments[0][b]=arguments[a][b]
}}}return arguments[0]},_getOptions:function(b,a){return this._extend({},this._defaults,a,b)
},_isCrossDomainRequest:function(a){var b=new j();var c=b.parse(window.location.href).origin;
var d=b.parse(a).origin;b.destroy();return(d!==c)},create:function(a){return new m(a)
},cors:function(a){var b=(window.XDomainRequest&&document.documentMode<10)?k:m;
return new b(a)},get:function(a){var b;a=this._getOptions({method:"get"},a);if(this._isCrossDomainRequest(a.url)){b=this.cors(a)
}else{b=this.create(a)}return b.send()},getJSON:function(a){return this.get(a).then(function(b){return JSON.parse(b.responseText)
})},head:function(a){a=this._getOptions({method:"head"},a);return this.create(a).send()
},isCrossDomainRequest:function(a){return this._isCrossDomainRequest(a)},post:function(a){a=this._getOptions({method:"post"},a);
return this.create(a).send()}};l.exports=n},{"./Request":15,"./URLParser":16,"./XDomain-request":17}],15:[function(f,h,g){var i=function(a){this._initialize(a)
};i.create=function(){var a=function(){};a.prototype=i.prototype;return new a()
};i.prototype={_addReadyStateChangeHandler:function(){this.xhr.onreadystatechange=function(a){if(this.xhr.readyState===4){clearTimeout(this._timeout);
if(this.xhr.status>=200&&this.xhr.status<300){this.resolve(this.xhr)}else{this.reject(this.xhr)
}}}.bind(this)},_getPromise:function(){this.promise=new Promise(function(a,b){this.resolve=a;
this.reject=b}.bind(this))},_getTransport:function(){return new XMLHttpRequest()
},_initialize:function(a){var b=this._validateConfiguration(a);if(b){throw b}this._configuration=a;
var c=this._configuration.method.toUpperCase();this.xhr=this._getTransport();this._getPromise();
this.xhr.open(c,this._configuration.url);this._setRequestHeaders(a.headers);this._addReadyStateChangeHandler()
},_sendXHR:function(){if(this.xhr){if(this._configuration&&this._configuration.data){this.xhr.send(this._configuration.data)
}else{this.xhr.send()}}},_setRequestHeaders:function(a){if(a){a.forEach(function(b){this.xhr.setRequestHeader(b.name,b.value)
},this)}},_setTimeout:function(a){if(!a){if(this._configuration&&this._configuration.timeout){a=this._configuration.timeout
}else{clearTimeout(this._timeout);this._timeout=null}}if(this._timeout!==null){clearTimeout(this._timeout)
}if(a>0){this._timeout=setTimeout(function(){this.xhr.abort();this.reject()}.bind(this),a)
}},_timeout:null,_validateConfiguration:function(a){if(!a){return"Must provide a configuration object"
}var b=[];var c=a.headers;if(!a.url){b.push("Must provide a url")}if(!a.method){b.push("Must provide a method")
}if(c){if(!Array.isArray(c)){return"Must provide an array of headers"}this._validateHeaders(c,b)
}return b.join(", ")},_validateHeaders:function(b,a){for(var c=0,d=b.length;c<d;
c++){if(!b[c].hasOwnProperty("name")||!b[c].hasOwnProperty("value")){a.push("Must provide a name and value key for all headers");
break}}},promise:null,reject:null,resolve:null,send:function(){this._setTimeout();
this._sendXHR();return this.promise},xhr:null};h.exports=i},{}],16:[function(k,j,g){var h=function(){this.parser=null
};var i=h.prototype;i.parse=function(b){var d;var a;var f;var m;var c;if(typeof b!=="string"){throw new TypeError(b+" must be a string")
}if(!this.parser){this.parser=document.createElement("a")}this._qualifyPath(b);
f=this.parser.hostname;a=this.parser.protocol;m=this._normalizePort(this.parser);
d=this.parser.origin||this._constructOriginString(this.parser,m);c=this.parser.search;
return{originalPath:b,qualifiedPath:this.parser.href,protocol:a,hostname:f,origin:d,port:m,search:c}
};i.destroy=function(){this.parser=null};i._constructOriginString=function(a,c){var b=c?":"+c:"";
return a.protocol+"//"+a.hostname+b};i._normalizePort=function(a){return(a.port==="80"||a.port==="443"||a.port==="0")?"":a.port
};i._qualifyPath=function(a){this.parser.href=a;this.parser.href=this.parser.href
};j.exports=h},{}],17:[function(g,j,h){var k=g("./Request");var i=function(a){k.apply(this,arguments)
};i.prototype=k.create();i.prototype._getTransport=function(){return new XDomainRequest()
};i.prototype._addReadyStateChangeHandler=function(){this.xhr.ontimeout=function(){this.reject(this.xhr)
}.bind(this);this.xhr.onerror=function(){this.reject(this.xhr)}.bind(this);this.xhr.onload=function(){this.resolve(this.xhr)
}.bind(this)};i.prototype._setTimeout=function(a){if(!a){if(this._configuration&&this._configuration.timeout){a=this._configuration.timeout
}}if(a>0){this.xhr.timeout=a}};i.prototype._sendXHR=function(){setTimeout(function(){k.prototype._sendXHR.call(this)
}.bind(this),0)};j.exports=i},{"./Request":15}],18:[function(o,l,i){var m=o("./Request");
var k=o("./XDomain-request");var j=o("./URLParser");var n=function(){};n._Request=m;
n.prototype={_defaults:{method:"get",timeout:5000},_extend:function(){for(var a=1;
a<arguments.length;a++){for(var b in arguments[a]){if(arguments[a].hasOwnProperty(b)){arguments[0][b]=arguments[a][b]
}}}return arguments[0]},_getOptions:function(b,a){return this._extend({},this._defaults,a,b)
},create:function(a){return new m(a)},cors:function(a){var b=(window.XDomainRequest&&document.documentMode<10)?k:m;
return new b(a)},_isCrossDomainRequest:function(a){var b=new j();var c=b.parse(window.location.href).origin;
var d=b.parse(a).origin;b.destroy();return(d!==c)},get:function(a){var b;a=this._getOptions({method:"get"},a);
if(this._isCrossDomainRequest(a.url)){b=this.cors(a)}else{b=this.create(a)}return b.send()
},getJSON:function(a){return this.get(a).then(function(b){return JSON.parse(b.responseText)
})},head:function(a){a=this._getOptions({method:"head"},a);return this.create(a).send()
},post:function(a){a=this._getOptions({method:"post"},a);return this.create(a).send()
}};l.exports=n},{"./Request":19,"./URLParser":20,"./XDomain-request":21}],19:[function(d,g,f){g.exports=d(15)
},{}],20:[function(d,g,f){g.exports=d(16)},{}],21:[function(g,j,h){var k=g("./Request");
var i=function(a){k.apply(this,arguments)};i.prototype=k.create();i.prototype._getTransport=function(){return new XDomainRequest()
};i.prototype._addReadyStateChangeHandler=function(){this.xhr.ontimeout=function(){this.reject(this.xhr)
}.bind(this);this.xhr.onerror=function(){this.reject(this.xhr)}.bind(this);this.xhr.onload=function(){this.resolve(this.xhr)
}.bind(this)};i.prototype._setTimeout=function(a){if(!a){if(this._configuration&&this._configuration.timeout){a=this._configuration.timeout
}}if(a>0){this.xhr.timeout=a}};j.exports=i},{"./Request":19}],22:[function(d,g,f){arguments[4][13][0].apply(f,arguments)
},{"./ac-ajax/Ajax":18,"./ac-ajax/Request":19}],23:[function(k,i,g){var j={cssPropertyAvailable:k("./ac-feature/cssPropertyAvailable"),localStorageAvailable:k("./ac-feature/localStorageAvailable")};
var h=Object.prototype.hasOwnProperty;j.threeDTransformsAvailable=function(){if(typeof this._threeDTransformsAvailable!=="undefined"){return this._threeDTransformsAvailable
}var a,c;try{this._threeDTransformsAvailable=false;if(h.call(window,"styleMedia")){this._threeDTransformsAvailable=window.styleMedia.matchMedium("(-webkit-transform-3d)")
}else{if(h.call(window,"media")){this._threeDTransformsAvailable=window.media.matchMedium("(-webkit-transform-3d)")
}}if(!this._threeDTransformsAvailable){if(!(c=document.getElementById("supportsThreeDStyle"))){c=document.createElement("style");
c.id="supportsThreeDStyle";c.textContent="@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }";
document.querySelector("head").appendChild(c)}if(!(a=document.querySelector("#supportsThreeD"))){a=document.createElement("div");
a.id="supportsThreeD";document.body.appendChild(a)}this._threeDTransformsAvailable=(a.offsetHeight===3)||c.style.MozTransform!==undefined||c.style.WebkitTransform!==undefined
}return this._threeDTransformsAvailable}catch(b){return false}};j.canvasAvailable=function(){if(typeof this._canvasAvailable!=="undefined"){return this._canvasAvailable
}var a=document.createElement("canvas");this._canvasAvailable=!!(typeof a.getContext==="function"&&a.getContext("2d"));
return this._canvasAvailable};j.sessionStorageAvailable=function(){if(typeof this._sessionStorageAvailable!=="undefined"){return this._sessionStorageAvailable
}try{if(typeof window.sessionStorage!=="undefined"&&typeof window.sessionStorage.setItem==="function"){window.sessionStorage.setItem("ac_browser_detect","test");
this._sessionStorageAvailable=true;window.sessionStorage.removeItem("ac_browser_detect","test")
}else{this._sessionStorageAvailable=false}}catch(a){this._sessionStorageAvailable=false
}return this._sessionStorageAvailable};j.cookiesAvailable=function(){if(typeof this._cookiesAvailable!=="undefined"){return this._cookiesAvailable
}this._cookiesAvailable=(h.call(document,"cookie")&&!!navigator.cookieEnabled)?true:false;
return this._cookiesAvailable};j.__normalizedScreenWidth=function(){if(typeof window.orientation==="undefined"){return window.screen.width
}return window.screen.width<window.screen.height?window.screen.width:window.screen.height
};j.touchAvailable=function(){return !!(("ontouchstart" in window)||window.DocumentTouch&&document instanceof window.DocumentTouch)
};j.isDesktop=function(){if(!this.touchAvailable()&&!window.orientation){return true
}return false};j.isHandheld=function(){return !this.isDesktop()&&!this.isTablet()
};j.isTablet=function(){return !this.isDesktop()&&this.__normalizedScreenWidth()>480
};j.isRetina=function(){var b=["min-device-pixel-ratio:1.5","-webkit-min-device-pixel-ratio:1.5","min-resolution:1.5dppx","min-resolution:144dpi","min--moz-device-pixel-ratio:1.5"];
var a;if(window.devicePixelRatio!==undefined){if(window.devicePixelRatio>=1.5){return true
}}else{for(a=0;a<b.length;a+=1){if(window.matchMedia("("+b[a]+")").matches===true){return true
}}}return false};j.svgAvailable=function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
};i.exports=j},{"./ac-feature/cssPropertyAvailable":24,"./ac-feature/localStorageAvailable":25}],24:[function(o,m,i){var l=null;
var k=null;var j=null;var n=null;m.exports=function(u){if(l===null){l=document.createElement("browserdetect").style
}if(k===null){k=["-webkit-","-moz-","-o-","-ms-","-khtml-",""]}if(j===null){j=["Webkit","Moz","O","ms","Khtml",""]
}if(n===null){n={}}u=u.replace(/([A-Z]+)([A-Z][a-z])/g,"$1\\-$2").replace(/([a-z\d])([A-Z])/g,"$1\\-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/,"").toLowerCase();
switch(u){case"gradient":if(n.gradient!==undefined){return n.gradient}u="background-image:";
var b="gradient(linear,left top,right bottom,from(#9f9),to(white));";var c="linear-gradient(left top,#9f9, white);";
l.cssText=(u+k.join(b+u)+k.join(c+u)).slice(0,-u.length);n.gradient=(l.backgroundImage.indexOf("gradient")!==-1);
return n.gradient;case"inset-box-shadow":if(n["inset-box-shadow"]!==undefined){return n["inset-box-shadow"]
}u="box-shadow:";var a="#fff 0 1px 1px inset;";l.cssText=k.join(u+a);n["inset-box-shadow"]=(l.cssText.indexOf("inset")!==-1);
return n["inset-box-shadow"];default:var d=u.split("-");var t=d.length;var f;var g;
var h;if(d.length>0){u=d[0];for(g=1;g<t;g+=1){u+=d[g].substr(0,1).toUpperCase()+d[g].substr(1)
}}f=u.substr(0,1).toUpperCase()+u.substr(1);if(n[u]!==undefined){return n[u]}for(h=j.length-1;
h>=0;h-=1){if(l[j[h]+u]!==undefined||l[j[h]+f]!==undefined){n[u]=true;return true
}}return false}}},{}],25:[function(j,i,g){var h=null;i.exports=function k(){if(h===null){h=!!(window.localStorage&&window.localStorage.non_existent!==null)
}return h}},{}],26:[function(P,U,A){var F=Object.prototype.toString;var M=Object.prototype.hasOwnProperty;
var V=typeof Array.prototype.indexOf==="function"?function(b,a){return b.indexOf(a)
}:function(b,c){for(var a=0;a<b.length;a++){if(b[a]===c){return a}}return -1};var N=Array.isArray||function(a){return F.call(a)=="[object Array]"
};var C=Object.keys||function(c){var b=[];for(var a in c){if(c.hasOwnProperty(a)){b.push(a)
}}return b};var D=typeof Array.prototype.forEach==="function"?function(b,a){return b.forEach(a)
}:function(b,c){for(var a=0;a<b.length;a++){c(b[a])}};var L=function(d,b,a){if(typeof d.reduce==="function"){return d.reduce(b,a)
}var c=a;for(var f=0;f<d.length;f++){c=b(c,d[f])}return c};var z=/^[0-9]+$/;function T(c,d){if(c[d].length==0){return c[d]={}
}var a={};for(var b in c[d]){if(M.call(c[d],b)){a[b]=c[d][b]}}c[d]=a;return a}function H(c,g,a,b){var f=c.shift();
if(M.call(Object.prototype,a)){return}if(!f){if(N(g[a])){g[a].push(b)}else{if("object"==typeof g[a]){g[a]=b
}else{if("undefined"==typeof g[a]){g[a]=b}else{g[a]=[g[a],b]}}}}else{var d=g[a]=g[a]||[];
if("]"==f){if(N(d)){if(""!=b){d.push(b)}}else{if("object"==typeof d){d[C(d).length]=b
}else{d=g[a]=[g[a],b]}}}else{if(~V(f,"]")){f=f.substr(0,f.length-1);if(!z.test(f)&&N(d)){d=T(g,a)
}H(c,d,f,b)}else{if(!z.test(f)&&N(d)){d=T(g,a)}H(c,d,f,b)}}}}function S(f,h,b){if(~V(h,"]")){var c=h.split("["),g=c.length,d=g-1;
H(c,f,"base",b)}else{if(!z.test(h)&&N(f.base)){var i={};for(var a in f.base){i[a]=f.base[a]
}f.base=i}K(f.base,h,b)}return f}function J(c){if("object"!=typeof c){return c}if(N(c)){var b=[];
for(var d in c){if(M.call(c,d)){b.push(c[d])}}return b}for(var a in c){c[a]=J(c[a])
}return c}function R(a){var b={base:{}};D(C(a),function(c){S(b,c,a[c])});return J(b.base)
}function Q(a){var b=L(String(a).split("&"),function(i,d){var c=V(d,"="),f=E(d),h=d.substr(0,f||c),g=d.substr(f||c,d.length),g=g.substr(V(g,"=")+1,g.length);
if(""==h){h=d,g=""}if(""==h){return i}return S(i,I(h),I(g))},{base:{}}).base;return J(b)
}A.parse=function(a){if(null==a||""==a){return{}}return"object"==typeof a?R(a):Q(a)
};var G=A.stringify=function(a,b){if(N(a)){return O(a,b)}else{if("[object Object]"==F.call(a)){return B(a,b)
}else{if("string"==typeof a){return W(a,b)}else{return b+"="+encodeURIComponent(String(a))
}}}};function W(a,b){if(!b){throw new TypeError("stringify expects an object")}return b+"="+encodeURIComponent(a)
}function O(c,b){var a=[];if(!b){throw new TypeError("stringify expects an object")
}for(var d=0;d<c.length;d++){a.push(G(c[d],b+"["+d+"]"))}return a.join("&")}function B(b,c){var a=[],d=C(b),g;
for(var h=0,f=d.length;h<f;++h){g=d[h];if(""==g){continue}if(null==b[g]){a.push(encodeURIComponent(g)+"=")
}else{a.push(G(b[g],c?c+"["+encodeURIComponent(g)+"]":encodeURIComponent(g)))}}return a.join("&")
}function K(d,a,c){var b=d[a];if(M.call(Object.prototype,a)){return}if(undefined===b){d[a]=c
}else{if(N(b)){b.push(c)}else{d[a]=[b,c]}}}function E(d){var c=d.length,f,b;for(var a=0;
a<c;++a){b=d[a];if("]"==b){f=false}if("["==b){f=true}if("="==b&&!f){return a}}}function I(a){try{return decodeURIComponent(a.replace(/\+/g," "))
}catch(b){return a}}},{}],27:[function(d,g,f){g.exports={clone:d("./ac-object/clone"),create:d("./ac-object/create"),defaults:d("./ac-object/defaults"),extend:d("./ac-object/extend"),getPrototypeOf:d("./ac-object/getPrototypeOf"),isDate:d("./ac-object/isDate"),isEmpty:d("./ac-object/isEmpty"),isRegExp:d("./ac-object/isRegExp"),toQueryParameters:d("./ac-object/toQueryParameters")}
},{"./ac-object/clone":28,"./ac-object/create":29,"./ac-object/defaults":30,"./ac-object/extend":31,"./ac-object/getPrototypeOf":32,"./ac-object/isDate":33,"./ac-object/isEmpty":34,"./ac-object/isRegExp":35,"./ac-object/toQueryParameters":36}],28:[function(g,k,h){var i=g("./extend");
k.exports=function j(a){return i({},a)}},{"./extend":31}],29:[function(g,j,h){var i=function(){};
j.exports=function k(a){if(arguments.length>1){throw new Error("Second argument not supported")
}if(a===null||typeof a!=="object"){throw new TypeError("Object prototype may only be an Object.")
}if(typeof Object.create==="function"){return Object.create(a)}else{i.prototype=a;
return new i()}}},{}],30:[function(g,k,h){var i=g("./extend");k.exports=function j(a,b){if(typeof a!=="object"){throw new TypeError("defaults: must provide a defaults object")
}b=b||{};if(typeof b!=="object"){throw new TypeError("defaults: options must be a typeof object")
}return i({},a,b)}},{"./extend":31}],31:[function(k,j,g){var h=Object.prototype.hasOwnProperty;
j.exports=function i(){var a;var b;if(arguments.length<2){a=[{},arguments[0]]}else{a=[].slice.call(arguments)
}b=a.shift();a.forEach(function(c){if(c!=null){for(var d in c){if(h.call(c,d)){b[d]=c[d]
}}}});return b}},{}],32:[function(k,j,g){var h=Object.prototype.hasOwnProperty;
j.exports=function i(a){if(Object.getPrototypeOf){return Object.getPrototypeOf(a)
}else{if(typeof a!=="object"){throw new Error("Requested prototype of a value that is not an object.")
}else{if(typeof this.__proto__==="object"){return a.__proto__}else{var c=a.constructor;
var b;if(h.call(a,"constructor")){b=c;if(!(delete a.constructor)){return null}c=a.constructor;
a.constructor=b}return c?c.prototype:null}}}}},{}],33:[function(f,h,g){h.exports=function i(a){return Object.prototype.toString.call(a)==="[object Date]"
}},{}],34:[function(k,j,g){var h=Object.prototype.hasOwnProperty;j.exports=function i(b){var a;
if(typeof b!=="object"){throw new TypeError("ac-base.Object.isEmpty : Invalid parameter - expected object")
}for(a in b){if(h.call(b,a)){return false}}return true}},{}],35:[function(i,h,f){h.exports=function g(a){return window.RegExp?a instanceof RegExp:false
}},{}],36:[function(k,i,g){var h=k("qs");i.exports=function j(a){if(typeof a!=="object"){throw new TypeError("toQueryParameters error: argument is not an object")
}return h.stringify(a)}},{qs:26}],37:[function(d,g,f){d("ac-polyfills");g.exports.Asset=d("./ac-asset-loader/AssetLoader/Asset");
g.exports.Asset.Ajax=d("./ac-asset-loader/AssetLoader/Asset/Ajax");g.exports.Asset.Ajax.JSON=d("./ac-asset-loader/AssetLoader/Asset/Ajax/JSON");
g.exports.Asset.Img=d("./ac-asset-loader/AssetLoader/Asset/Img");g.exports.Asset.Video=d("./ac-asset-loader/AssetLoader/Asset/Video");
g.exports.Asset.Video.Element=d("./ac-asset-loader/AssetLoader/Asset/Video/Element");
g.exports.Asset.Binary=d("./ac-asset-loader/AssetLoader/Asset/Binary");g.exports.Asset.Binary.Chunk=d("./ac-asset-loader/AssetLoader/Asset/Binary/Chunk");
g.exports.AssetLoader=d("./ac-asset-loader/AssetLoader");g.exports.AssetLoader.Queue=d("./ac-asset-loader/AssetLoader/Queue")
},{"./ac-asset-loader/AssetLoader":38,"./ac-asset-loader/AssetLoader/Asset":39,"./ac-asset-loader/AssetLoader/Asset/Ajax":40,"./ac-asset-loader/AssetLoader/Asset/Ajax/JSON":41,"./ac-asset-loader/AssetLoader/Asset/Binary":42,"./ac-asset-loader/AssetLoader/Asset/Binary/Chunk":43,"./ac-asset-loader/AssetLoader/Asset/Img":44,"./ac-asset-loader/AssetLoader/Asset/Video":47,"./ac-asset-loader/AssetLoader/Asset/Video/Element":48,"./ac-asset-loader/AssetLoader/Queue":49,"ac-polyfills":false}],38:[function(B,C,w){var u;
var x=B("ac-object");var p=B("ac-event-emitter").EventEmitter;var q=B("./AssetLoader/Asset/Ajax");
var y=B("./AssetLoader/Asset/Ajax/JSON");var v=B("./AssetLoader/Asset/Img");var r=B("./AssetLoader/Asset/Video");
var s=B("../utils/destroy");var A=B("./AssetLoader/Queue");var z={};function t(a,c){this.options=x.defaults(z,c||{});
var b=this._generateAssets(a);this._queue=new A(b,this.options);this._timeoutDuration=this.options.timeout;
this._timeout=null;this._proxyListeners()}u=t.prototype=new p();u.load=function(){if(this._timeoutDuration){this._timeout=window.setTimeout(this._onTimeout.bind(this),this._timeoutDuration)
}return this._queue.start()};u._clearTimeout=function(){window.clearTimeout(this._timeout);
this._timeout=null};u.pause=function(){this._clearTimeout();return this._queue.pause()
};u.destroy=function(){s(this,true)};u._onTimeout=function(){this._queue.abort();
this._queue.destroy();this.trigger("timeout")};u._generateAssets=function(a){if(this._boundGenerateAsset===undefined){this._boundGenerateAsset=this._generateAsset.bind(this)
}a=[].concat(a);var b=a.map(this._boundGenerateAsset);return b};u._generateAsset=function(a,b){if(t.isValidAsset(a)){a.index=b;
return a}if(typeof a!=="string"||a===""){return null}if(!!a.match(/\.json$/)){return new y(a,b)
}if(!!a.match(/\.(xml|txt)$/)){return new q(a,b)}return new v(a,b)};u._proxyListeners=function(){this._boundOnResolved=this._onResolved.bind(this);
this._boundOnRejected=this._onRejected.bind(this);this._boundOnProgress=this._onProgress.bind(this);
this._queue.on("resolved",this._boundOnResolved);this._queue.on("rejected",this._boundOnRejected);
this._queue.on("progress",this._boundOnProgress)};u._onResolved=function(a){this._clearTimeout();
this.trigger("loaded",a)};u._onRejected=function(a){this.trigger("error",a)};u._onProgress=function(a){this.trigger("progress",a)
};t.isValidAsset=function(a){return !!(a&&(typeof a.load==="function")&&(typeof a.destroy==="function"))
};t.isValidAssetLoader=function(a){return !!(a&&(typeof a.load==="function")&&(typeof a.pause==="function")&&(typeof a.destroy==="function"))
};C.exports=t},{"../utils/destroy":50,"./AssetLoader/Asset/Ajax":40,"./AssetLoader/Asset/Ajax/JSON":41,"./AssetLoader/Asset/Img":44,"./AssetLoader/Asset/Video":47,"./AssetLoader/Queue":49,"ac-event-emitter":false,"ac-object":27}],39:[function(p,n,j){var l;
var q=p("ac-deferred").Deferred;var m=p("ac-event-emitter").EventEmitter;var o=p("../../utils/destroy");
function k(a,b){this.src=a;this.index=b;this.data=null;this._boundOnLoad=this._onLoad.bind(this);
this._boundOnError=this._onError.bind(this)}l=k.prototype=new m();l.load=function(){this._load()
};l.destroy=function(){o(this)};l._load=function(){this.data={src:this.src};window.setTimeout(this._onLoad.bind(this),20)
};l._onLoad=function(){this.trigger("loaded",this)};l._onError=function(){this.trigger("error",this.data)
};n.exports=k},{"../../utils/destroy":50,"ac-event-emitter":false}],40:[function(p,n,j){var l;
var q=p("ac-ajax");var k=p("ac-object");var m=p("../Asset");function o(a,b){m.apply(this,arguments)
}l=o.prototype=k.create(m.prototype);l._load=function(){q.get({url:this.src}).then(this._boundOnLoad,this._boundOnError)
};l._onLoad=function(a){this.data=a.response;m.prototype._onLoad.call(this)};n.exports=o
},{"../Asset":39,"ac-ajax":22,"ac-object":27}],41:[function(o,n,i){var l;var j=o("ac-object");
var m=o("../Ajax");function k(a){m.apply(this,arguments)}l=k.prototype=j.create(m.prototype);
l._onLoad=function(a){try{m.prototype._onLoad.call(this,{response:JSON.parse(a.response)})
}catch(b){this._onError(b)}};n.exports=k},{"../Ajax":40,"ac-object":27}],42:[function(t,u,q){var l=t("ac-ajax");
var r=t("ac-object");var m=t("./Binary/Chunk");var n=t("./../Asset");var s={chunkSize:1024*1024};
function p(a,b){n.apply(this,arguments);this.options=r.defaults(s,b||{});this._totalSize=null;
this._rangeObjects={};this._contentType=null;this._request=null;this._numLoaded=0;
this._numRanges=0}var o=p.prototype=r.create(n.prototype);o.pause=function(){var a;
if(this._request!==null){this._request.xhr.abort()}for(a in this._rangeObjects){if(this._rangeObjects[a].isLoaded()===false){this._rangeObjects[a].pause()
}}};o._load=function(){if(this._boundQueueRangeRequests===undefined){this._boundQueueRangeRequests=this._queueRangeRequests.bind(this)
}if(this._totalSize===null){this._getMetaData().then(this._boundQueueRangeRequests)
}else{this._queueRangeRequests()}};o._getOrCreateRangeObject=function(d){var a=this._rangeObjects[d.toString()];
var b;var c;if(a===undefined){b=(this.options.chunkSize-1);c=d+b;if(c>this._totalSize){b=null
}a=this._rangeObjects[d.toString()]=new m(this.src,{start:d,length:b});this._numRanges+=1
}return a};o._onRangeLoad=function(){this._numLoaded+=1;if(this._numLoaded===this._numRanges){this._afterAllChunksLoaded()
}};o._queueRangeRequests=function(){var d;var f=[];var c;var b;var a;for(var g=0;
g<this._totalSize;g+=this.options.chunkSize){a=this._getOrCreateRangeObject(g);
a.on("loaded",this._onRangeLoad,this);a.load()}};o._afterAllChunksLoaded=function(){var b;
var c=[];for(var a in this._rangeObjects){c.push(this._rangeObjects[a].data)}b=new Blob(c,{type:this._contentType});
this.trigger("loaded",b)};o._afterHeadRequest=function(a){this._totalSize=parseInt(a.getResponseHeader(["Content-Length"]));
this._contentType=a.getResponseHeader(["Content-Type"]);this._request=null};o._getMetaData=function(){if(!this._boundAfterHeadRequest){this._boundAfterHeadRequest=this._afterHeadRequest.bind(this)
}this._request=l.create({method:"HEAD",url:this.src,timeout:2*1000});return this._request.send().then(this._boundAfterHeadRequest,this._boundOnError)
};u.exports=p},{"./../Asset":39,"./Binary/Chunk":43,"ac-ajax":22,"ac-object":27}],43:[function(r,s,o){var n;
var k=r("ac-ajax");var p=r("ac-object");var m=r("../../Asset");var q={start:0,length:null};
function l(a,b){m.apply(this,arguments);this.options=p.defaults(q,b||{});this._request=null;
this.data=null}n=l.prototype=p.create(m.prototype);n.pause=function(){if(this._request!==null){this._request.xhr.abort();
this._request=null}};n.isLoaded=function(){return(this.data!==null)};n._load=function(){this._request=k.create({url:this.src+"?"+this._buildQueryString(),method:"get",timeout:30*1000,headers:[{name:"Range",value:this._buildRangeString()}]});
this._request.xhr.responseType="arraybuffer";this._request.send().then(this._boundOnLoad)
};n._onLoad=function(a){this.data=a.response;this._request=null;m.prototype._onLoad.call(this,this.data)
};n._buildRangeString=function(){var a="bytes="+this.options.start+"-";if(this.options.length!==null){a+=(this.options.start+this.options.length)
}return a};n._buildQueryString=function(){var a=this.options.start.toString();if(this.options.length!==undefined){a+=(this.options.start+this.options.length)
}return a};s.exports=l},{"../../Asset":39,"ac-ajax":22,"ac-object":27}],44:[function(o,n,i){var l;
var j=o("ac-object");var m=o("../Asset");function k(a,b){m.apply(this,arguments)
}l=k.prototype=j.create(m.prototype);l._load=function(){var a=new Image();this.data=a;
this._boundOnLoad=this._onLoad.bind(this);a.onload=this._boundOnLoad;a.onerror=this._boundOnError;
a.src=this.src};n.exports=k},{"../Asset":39,"ac-object":27}],45:[function(r,u,o){var l=r("ac-ajax").Ajax,p=r("ac-object"),m=r("./SplitFile/Chunk"),t=r("../Asset");
var n;var q={splitManifestTimeout:5000,splitChunkTimeout:null};var s=function(a,b){t.apply(this,arguments);
if(a.lastIndexOf("/")!==a.length-1){a=a+"/"}this.options=p.extend(q,b||{});this._manifestPath=a+"manifest.json";
this._ajax=new l();this._request=null;this._chunksLoaded=0;this._chunksLen=null;
this._chunks=[];this._boundOnManifestLoaded=this._onManifestLoaded.bind(this)};
n=s.prototype=p.create(t.prototype);n._load=function(){var a={method:"get",url:this._manifestPath,timeout:this.options.manifestTimeout};
this._request=this._ajax.create(a);this._request.send().then(this._boundOnManifestLoaded)
};n._onManifestLoaded=function(c){this._manifest=JSON.parse(c.responseText);this._chunksLen=this._manifest.files.length;
var f,d=this._manifest.files,a,b=this._chunksLen;for(f=0;f<b;f++){a=this._getOrCreateChunkObject(d[f],f);
a.once("loaded",this._onChunkLoaded,this);a.load()}this._request=null;this._ajax=null
};n._getOrCreateChunkObject=function(g,b){var f=this.options.splitChunkTimeout?{timeout:this.options.splitChunkTimeout}:null;
if(!this._chunks[b]){var c=g.path;if(!c.match(/(^http(s?))/)){c=this.src+"/"+c}else{if(!!this.src.match(/(^http(s?))/)){var d=c.indexOf("/",10);
var a=this.src.indexOf("/",10);c=this.src.substring(0,a)+c.substring(d)}}this._chunks[b]=new m(c,f)
}return this._chunks[b]};n._onChunkLoaded=function(){this._chunksLoaded++;if(this._chunksLoaded===this._chunksLen){var c,b=this._chunks.length,a=[];
for(c=0;c<b;c++){a.push(this._chunks[c].data);this._chunks[c].off()}this.data=new Blob(a,{type:this._manifest.mimeType});
a=this._chunks=null;this.trigger("loaded",this.data)}};n.pause=function(){if(this._request!==null){if(this._request.xhr!==null){this._request.xhr.abort()
}this._request=null}this.data=null;this._chunks=null};u.exports=s},{"../Asset":39,"./SplitFile/Chunk":46,"ac-ajax":22,"ac-object":27}],46:[function(q,s,n){var m;
var k=q("ac-ajax");var o=q("ac-object");var r=q("../../Asset");var p={timeout:30*1000};
function l(a,b){r.apply(this,arguments);this.options=o.extend(p,b||{});this._request=null;
this.data=null}m=l.prototype=o.create(r.prototype);m.pause=function(){if(this._request!==null){this._request.xhr.abort();
this._request=null}};m.isLoaded=function(){return(this.data!==null)};m._load=function(){this._request=k.create({url:this.src,method:"get",timeout:this.options.timeout});
this._request.xhr.responseType="arraybuffer";this._request.send().then(this._boundOnLoad)
};m._onLoad=function(a){this.data=a.response;this._request=null;r.prototype._onLoad.call(this,this.data)
};s.exports=l},{"../../Asset":39,"ac-ajax":22,"ac-object":27}],47:[function(w,y,s){var p;
var t=w("ac-feature");var u=w("ac-object");var r=w("./Binary");var o=w("../Asset");
var q=w("./Video/Element");var x=w("./SplitFile");var v={chunkSize:1024*1024,forceElementLoading:false,split:false};
function n(a,b){o.apply(this,arguments);this.options=u.defaults(v,b||{});this._binary=this.options.binary||this._createAssetType()
}p=n.prototype=u.create(o.prototype);p._canUseBlob=function(){return(window.Blob!==undefined&&window.URL!==undefined&&typeof window.URL.createObjectURL==="function"&&t.isDesktop()===true)
};p._createAssetType=function(){if(this._canUseBlob()&&this.options.forceElementLoading!==true){if(this.options.split){return new x(this.src,this.options)
}return new r(this.src,this.options)}return new q(this.src,this.options)};p._load=function(){this._binary.on("loaded",this._boundOnLoad);
this._binary.on("error",this._boundOnError);this._binary.load()};p._onLoad=function(a){var b=a;
if(a instanceof window.Blob){b=this.options.element;if(!b){b=document.createElement("video")
}if(b.getAttribute("type")!==a.type){b.setAttribute("type",a.type)}b.src=window.URL.createObjectURL(a)
}o.prototype._onLoad.call(this,b)};p.pause=function(){this._binary.pause()};p.destroy=function(){this._binary.destroy();
o.prototype.destroy.call(this)};y.exports=n},{"../Asset":39,"./Binary":42,"./SplitFile":45,"./Video/Element":48,"ac-feature":23,"ac-object":27}],48:[function(t,u,p){var q=t("ac-feature");
var r=t("ac-object");var l=t("./../../../../utils/round");var m=t("./../../Asset");
var s={};function n(a,b){m.apply(this,arguments);this.options=r.defaults(s,b||{});
this._boundOnVideoProgress=null;this._boundOnTimeUpdate=null;this._boundOnCanPlayThrough=null;
this._videoDuration=null}var o=n.prototype=r.create(m.prototype);o._onVideoProgress=function(a){if(this.data&&this.data.buffered.length>0&&this._videoDuration&&l(this.data.buffered.end(0),4)===l(this._videoDuration,4)){this._unbindEvent("canplaythrough",this._boundOnCanPlayThrough);
this._unbindEvent("timeupdate",this._boundOnTimeUpdate);this._unbindEvent("progress",this._boundOnVideoProgress);
this._unbindEvent("loadedmetadata",this._boundMetaDataLoaded);this._boundOnVideoProgress=null;
this.data.muted=false;this._onLoad()}};o._onTimeUpdate=function(a){this.data.pause();
this.data.currentTime=0;this.data.removeEventListener("timeupdate",this._boundOnTimeUpdate);
this._boundOnTimeUpdate=null};o._onCanPlayThrough=function(a){if(this._boundOnTimeUpdate===null){this._boundOnTimeUpdate=this._onTimeUpdate.bind(this)
}if(q.isDesktop()){this.data.addEventListener("timeupdate",this._boundOnTimeUpdate);
this.data.play()}this._unbindEvent("canplaythrough",this._boundOnCanPlayThrough);
this._boundOnCanPlayThrough=null};o._onMetaDataLoaded=function(a){this._videoDuration=this.data.duration;
this._onVideoProgress(a)};o._load=function(){this.data=this.options.element;if(!this.data){this.data=document.createElement("video")
}this.data.muted=true;if(this.options.type){this.data.setAttribute("type",this.options.type)
}if(this._boundOnVideoProgress===null){this._boundOnVideoProgress=this._onVideoProgress.bind(this);
this._boundOnCanPlayThrough=this._onCanPlayThrough.bind(this);this._boundMetaDataLoaded=this._onMetaDataLoaded.bind(this);
this.data.addEventListener("progress",this._boundOnVideoProgress);this.data.addEventListener("canplaythrough",this._boundOnCanPlayThrough);
this.data.addEventListener("loadedmetadata",this._boundMetaDataLoaded)}this.data.setAttribute("preload","auto");
this.data.src=this.src;this.data.load()};o._unbindEvent=function(b,a){if(typeof a==="function"){this.data.removeEventListener(b,a)
}};o.pause=function(){this._unbindEvent("canplaythrough",this._boundOnCanPlayThrough);
this._unbindEvent("timeupdate",this._boundOnTimeUpdate);this._unbindEvent("progress",this._boundOnVideoProgress);
this._unbindEvent("loadedmetadata",this._boundMetaDataLoaded);this._boundOnVideoProgress=null;
this._boundOnCanPlayThrough=null;this._boundOnTimeUpdate=null;this._boundMetaDataLoaded=null;
this.data.removeAttribute("src");this.data=undefined;this.trigger("pause")};u.exports=n
},{"./../../../../utils/round":51,"./../../Asset":39,"ac-feature":23,"ac-object":27}],49:[function(t,u,p){var o;
var q=t("ac-object");var n=t("ac-deferred").Deferred;var l=t("ac-event-emitter").EventEmitter;
var m=t("../../utils/destroy");var r={threads:4};function s(a,b){this.options=q.defaults(r,b||{});
this._queue=a;this._active=[];this._allowedThreads=this.options.threads;this._availableThreads=this._allowedThreads;
this._deferred=new n();this._data=[];this.paused=true;this.loaded=false;this.promise=this._deferred.promise()
}o=s.prototype=new l();o.start=function(){var a=this._availableThreads;var b;this.paused=false;
if(a>this._queue.length){a=this._queue.length}for(b=1;b<=a;b++){this._startNewThread()
}return this.promise};o.pause=function(){this.paused=true;var a=[];this._active.forEach(function(c,b){if(typeof c.pause==="function"){this._queue.unshift(c);
this._releaseThread();c.off("loaded");c.off("error");c.pause();a.push(b)}},this);
a.forEach(function(b){this._active.splice(b,1)},this)};o.destroy=function(){this.pause();
m(this)};o._startNewThread=function(){var a=this._queue.shift();this._occupyThread();
if(a&&typeof a.load==="function"){var b=function(d){this._onProgress(d);this._active.splice(this._active.indexOf(a),1);
a.off("error",c)};var c=function(d){this._onError();a.off("loaded",b)};a.once("loaded",b,this);
a.once("error",c,this);a.load()}else{this._onError()}this._active.push(a)};o._onResolved=function(){if(this._errored){return false
}this._deferred.resolve(this._data);this.trigger("resolved",this._data)};o._onError=function(a){if(this._errored){return false
}this._errored=true;this._deferred.reject(a);this.trigger("rejected",a)};o.abort=function(){this._deferred.reject()
};o._onProgress=function(a){if(this._errored){return false}this._releaseThread();
this._data[a.index]=a.data;this.trigger("progress",a.data);if(this._queue.length<=0){if(this._availableThreads>=this._allowedThreads){this._onResolved()
}}else{if(!this.paused&&!this._errored){this._startNewThread()}}};o._occupyThread=function(){this._availableThreads--;
if(this._availableThreads<0){throw"AssetLoader.Queue: Available thread count cannot be negative."
}};o._releaseThread=function(){this._availableThreads++;if(this._availableThreads>this._allowedThreads){throw"AssetLoader.Queue: Available thread count cannot be more than allowed thread amount."
}};u.exports=s},{"../../utils/destroy":50,"ac-event-emitter":false,"ac-object":27}],50:[function(f,h,g){h.exports=function i(c,b){if(typeof c.off==="function"){c.off()
}function a(l){var m=true;for(var d in l){if(l.hasOwnProperty(d)){if(l[d]!==null){m=false;
break}}}return m}window.setTimeout(function(){var d;for(d in c){if(c.hasOwnProperty(d)){if(b&&c[d]&&typeof c[d].destroy==="function"&&!a(c[d])){c[d].destroy()
}c[d]=null}}})}},{}],51:[function(d,g,f){g.exports=function(b,a){return Math.round(b*Math.pow(10,a))/Math.pow(10,a)
}},{}],52:[function(f,i,g){if(!Array.prototype.filter){Array.prototype.filter=function h(a,b){var c=Object(this);
var n=c.length>>>0;var d;var m=[];if(typeof a!=="function"){throw new TypeError(a+" is not a function")
}for(d=0;d<n;d+=1){if(d in c&&a.call(b,c[d],d,c)){m.push(c[d])}}return m}}},{}],53:[function(f,i,g){if(!Array.prototype.some){Array.prototype.some=function h(a,b){var d=Object(this);
var l=d.length>>>0;var c;if(typeof a!=="function"){throw new TypeError(a+" is not a function")
}for(c=0;c<l;c+=1){if(c in d&&a.call(b,d[c],c,d)===true){return true}}return false
}}},{}],54:[function(n,m,i){var l=n("./ac-browser/BrowserData");var j=/applewebkit/i;
var k=n("./ac-browser/IE");var o=l.create();o.isWebKit=function(b){var a=b||window.navigator.userAgent;
return a?!!j.test(a):false};o.lowerCaseUserAgent=navigator.userAgent.toLowerCase();
if(o.name==="IE"){o.IE={documentMode:k.getDocumentMode()}}m.exports=o},{"./ac-browser/BrowserData":55,"./ac-browser/IE":56}],55:[function(g,k,h){g("ac-polyfills/Array/prototype.filter");
g("ac-polyfills/Array/prototype.some");var j=g("./data");function i(){}i.prototype={__getBrowserVersion:function(c,b){var d;
if(!c||!b){return}var a=j.browser.filter(function(f){return f.identity===b});a.some(function(f){var o=f.versionSearch||b;
var n=c.indexOf(o);if(n>-1){d=parseFloat(c.substring(n+o.length+1));return true
}});return d},__getName:function(a){return this.__getIdentityStringFromArray(a)
},__getIdentity:function(a){if(a.string){return this.__matchSubString(a)}else{if(a.prop){return a.identity
}}},__getIdentityStringFromArray:function(d){for(var a=0,c=d.length,b;a<c;a++){b=this.__getIdentity(d[a]);
if(b){return b}}},__getOS:function(a){return this.__getIdentityStringFromArray(a)
},__getOSVersion:function(d,a){if(!d||!a){return}var b=j.os.filter(function(l){return l.identity===a
})[0];var m=b.versionSearch||a;var c=new RegExp(m+" ([\\d_\\.]+)","i");var f=d.match(c);
if(f!==null){return f[1].replace(/_/g,".")}},__matchSubString:function(b){var c=b.subString;
if(c){var a=c.test?!!c.test(b.string):b.string.indexOf(c)>-1;if(a){return b.identity
}}}};i.create=function(){var b=new i();var a={};a.name=b.__getName(j.browser);a.version=b.__getBrowserVersion(j.versionString,a.name);
a.os=b.__getOS(j.os);a.osVersion=b.__getOSVersion(j.versionString,a.os);return a
};k.exports=i},{"./data":57,"ac-polyfills/Array/prototype.filter":52,"ac-polyfills/Array/prototype.some":53}],56:[function(d,g,f){g.exports={getDocumentMode:function(){var a;
if(document.documentMode){a=parseInt(document.documentMode,10)}else{a=5;if(document.compatMode){if(document.compatMode==="CSS1Compat"){a=7
}}}return a}}},{}],57:[function(d,g,f){g.exports={browser:[{string:window.navigator.userAgent,subString:"Edge",identity:"Edge"},{string:window.navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:window.navigator.userAgent,subString:/silk/i,identity:"Silk"},{string:window.navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:window.navigator.userAgent,subString:/mobile\/[^\s]*\ssafari\//i,identity:"Safari Mobile",versionSearch:"Version"},{string:window.navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:window.navigator.vendor,subString:"iCab",identity:"iCab"},{string:window.navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:window.navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:window.navigator.vendor,subString:"Camino",identity:"Camino"},{string:window.navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:window.navigator.userAgent,subString:"MSIE",identity:"IE",versionSearch:"MSIE"},{string:window.navigator.userAgent,subString:"Trident",identity:"IE",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],os:[{string:window.navigator.platform,subString:"Win",identity:"Windows",versionSearch:"Windows NT"},{string:window.navigator.platform,subString:"Mac",identity:"OS X"},{string:window.navigator.userAgent,subString:"iPhone",identity:"iOS",versionSearch:"iPhone OS"},{string:window.navigator.userAgent,subString:"iPad",identity:"iOS",versionSearch:"CPU OS"},{string:window.navigator.userAgent,subString:/android/i,identity:"Android"},{string:window.navigator.platform,subString:"Linux",identity:"Linux"}],versionString:window.navigator.userAgent||window.navigator.appVersion||undefined}
},{}],58:[function(g,k,h){g("ac-polyfills/Array/prototype.slice");g("ac-polyfills/Element/prototype.classList");
var j=g("./className/add");k.exports=function i(){var a=Array.prototype.slice.call(arguments);
var b=a.shift(a);var c;if(b.classList&&b.classList.add){b.classList.add.apply(b.classList,a);
return}for(c=0;c<a.length;c++){j(b,a[c])}}},{"./className/add":60,"ac-polyfills/Array/prototype.slice":66,"ac-polyfills/Element/prototype.classList":67}],59:[function(d,g,f){g.exports={add:d("./className/add"),contains:d("./className/contains"),remove:d("./className/remove")}
},{"./className/add":60,"./className/contains":61,"./className/remove":63}],60:[function(g,k,h){var j=g("./contains");
k.exports=function i(a,b){if(!j(a,b)){a.className+=" "+b}}},{"./contains":61}],61:[function(g,k,h){var i=g("./getTokenRegExp");
k.exports=function j(a,b){return i(b).test(a.className)}},{"./getTokenRegExp":62}],62:[function(f,i,g){i.exports=function h(a){return new RegExp("(\\s|^)"+a+"(\\s|$)")
}},{}],63:[function(m,l,h){var k=m("./contains");var j=m("./getTokenRegExp");l.exports=function i(a,b){if(k(a,b)){a.className=a.className.replace(j(b),"$1").trim()
}}},{"./contains":61,"./getTokenRegExp":62}],64:[function(g,j,h){g("ac-polyfills/Element/prototype.classList");
var i=g("./className/contains");j.exports=function k(a,b){if(a.classList&&a.classList.contains){return a.classList.contains(b)
}return i(a,b)}},{"./className/contains":61,"ac-polyfills/Element/prototype.classList":67}],65:[function(d,g,f){g.exports={add:d("./add"),contains:d("./contains"),remove:d("./remove"),toggle:d("./toggle")}
},{"./add":58,"./contains":64,"./remove":68,"./toggle":69}],66:[function(d,g,f){(function(){var b=Array.prototype.slice;
try{b.call(document.documentElement)}catch(a){Array.prototype.slice=function(u,q){q=(typeof q!=="undefined")?q:this.length;
if(Object.prototype.toString.call(this)==="[object Array]"){return b.call(this,u,q)
}var i,r=[],p,s=this.length;var t=u||0;t=(t>=0)?t:s+t;var c=(q)?q:s;if(q<0){c=s+q
}p=c-t;if(p>0){r=new Array(p);if(this.charAt){for(i=0;i<p;i++){r[i]=this.charAt(t+i)
}}else{for(i=0;i<p;i++){r[i]=this[t+i]}}}return r}}}())},{}],67:[function(d,g,f){
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
;
if("document" in self){if(!("classList" in document.createElement("_"))){(function(t){if(!("Element" in t)){return
}var C="classList",x="prototype",b=t.Element[x],B=Object,s=String[x].trim||function(){return this.replace(/^\s+|\s+$/g,"")
},A=Array[x].indexOf||function(h){var i=0,j=this.length;for(;i<j;i++){if(i in this&&this[i]===h){return i
}}return -1},a=function(i,h){this.name=i;this.code=DOMException[i];this.message=h
},w=function(h,i){if(i===""){throw new a("SYNTAX_ERR","An invalid or illegal string was specified")
}if(/\s/.test(i)){throw new a("INVALID_CHARACTER_ERR","String contains an invalid character")
}return A.call(h,i)},z=function(h){var i=s.call(h.getAttribute("class")||""),j=i?i.split(/\s+/):[],k=0,l=j.length;
for(;k<l;k++){this.push(j[k])}this._updateClassName=function(){h.setAttribute("class",this.toString())
}},y=z[x]=[],u=function(){return new z(this)};a[x]=Error[x];y.item=function(h){return this[h]||null
};y.contains=function(h){h+="";return w(this,h)!==-1};y.add=function(){var h=arguments,i=0,k=h.length,j,l=false;
do{j=h[i]+"";if(w(this,j)===-1){this.push(j);l=true}}while(++i<k);if(l){this._updateClassName()
}};y.remove=function(){var h=arguments,i=0,l=h.length,j,m=false,k;do{j=h[i]+"";
k=w(this,j);while(k!==-1){this.splice(k,1);m=true;k=w(this,j)}}while(++i<l);if(m){this._updateClassName()
}};y.toggle=function(j,i){j+="";var k=this.contains(j),h=k?i!==true&&"remove":i!==false&&"add";
if(h){this[h](j)}if(i===true||i===false){return i}else{return !k}};y.toString=function(){return this.join(" ")
};if(B.defineProperty){var c={get:u,enumerable:true,configurable:true};try{B.defineProperty(b,C,c)
}catch(v){if(v.number===-2146823252){c.enumerable=false;B.defineProperty(b,C,c)
}}}else{if(B[x].__defineGetter__){b.__defineGetter__(C,u)}}}(self))}else{(function(){var b=document.createElement("_");
b.classList.add("c1","c2");if(!b.classList.contains("c2")){var a=function(j){var k=DOMTokenList.prototype[j];
DOMTokenList.prototype[j]=function(h){var i,m=arguments.length;for(i=0;i<m;i++){h=arguments[i];
k.call(this,h)}}};a("add");a("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var c=DOMTokenList.prototype.toggle;
DOMTokenList.prototype.toggle=function(k,j){if(1 in arguments&&!this.contains(k)===!j){return j
}else{return c.call(this,k)}}}b=null}())}}},{}],68:[function(j,i,k){j("ac-polyfills/Array/prototype.slice");
j("ac-polyfills/Element/prototype.classList");var g=j("./className/remove");i.exports=function h(){var a=Array.prototype.slice.call(arguments);
var b=a.shift(a);var c;if(b.classList&&b.classList.remove){b.classList.remove.apply(b.classList,a);
return}for(c=0;c<a.length;c++){g(b,a[c])}}},{"./className/remove":63,"ac-polyfills/Array/prototype.slice":66,"ac-polyfills/Element/prototype.classList":67}],69:[function(k,j,g){k("ac-polyfills/Element/prototype.classList");
var i=k("./className");j.exports=function h(b,c,a){var d=(typeof a!=="undefined");
var f;if(b.classList&&b.classList.toggle){if(d){return b.classList.toggle(c,a)}return b.classList.toggle(c)
}if(d){f=!!a}else{f=!i.contains(b,c)}if(f){i.add(b,c)}else{i.remove(b,c)}return f
}},{"./className":59,"ac-polyfills/Element/prototype.classList":67}],70:[function(d,g,f){g.exports={Clip:d("./ac-clip/Clip")}
},{"./ac-clip/Clip":71}],71:[function(B,C,A){var t=B("ac-object").clone;var x=B("ac-object").create;
var q=B("ac-easing").createPredefined;var E=B("ac-clock");var s=B("ac-easing").Ease;
var r=B("ac-event-emitter").EventEmitter;var u="ease";var w="complete";var y="pause";
var D="play";function v(c,d,a,f){f=f||{};this._options=f;this._target=c;this._duration=d*1000;
this._delay=(f.delay||0)*1000;this._remainingDelay=this._delay;this._progress=0;
this._clock=f.clock||E;this._playing=false;this._getTime=Date.now||function(){return new Date().getTime()
};this._isYoyo=f.yoyo;this._direction=1;this._loop=f.loop||0;this._loopCount=0;
this._propsTo=a;this._propsFrom=f.propsFrom||{};this._storeTarget=t(this._target,true);
this._storePropsTo=this._propsTo;this._storePropsFrom=this._propsFrom;this._onStart=f.onStart||null;
this._onUpdate=f.onUpdate||null;this._onDraw=f.onDraw||null;this._onComplete=f.onComplete||null;
var b=f.ease||u;this._ease=(typeof b==="function")?new s(b):q(b);this._start=this._start.bind(this);
this._update=this._update.bind(this);this._draw=this._draw.bind(this)}var z=v.prototype=x(r.prototype);
z.play=function(){if(!this._playing){this._playing=true;if(this._delay===0||this._remainingDelay===0){this._start()
}else{this._startTimeout=setTimeout(this._start,this._remainingDelay);this._delayStart=this._getTime()
}}return this};z.pause=function(){if(this._playing){if(this._startTimeout){this._remainingDelay=this._getTime()-this._delayStart;
clearTimeout(this._startTimeout)}this._stop();this.trigger(y,this._getDetails())
}return this};z.reset=function(){this._stop();var a;for(a in this._storeTarget){this._target[a]=this._storeTarget[a]
}this._direction=1;this._loop=this._options.loop||0;this._loopCount=0;this.setProgress(0);
return this};z.isPlaying=function(){return this._playing};z.getTarget=function(){return this._target
};z.setCurrentTime=function(a){this.setProgress(a*1000/this._duration);return this.getCurrentTime()
};z.getCurrentTime=function(){return(this.getProgress()*this._duration)/1000};z.setProgress=function(a){this._progress=Math.min(1,Math.max(0,a));
this._setStartTime();if(!this._playing){this._setDiff()}if(this._playing&&a===1){this._completeProps();
if(this._onUpdate){this._onUpdate.call(this,this._getDetails())}if(this._onDraw){this._onDraw.call(this,this._getDetails())
}this._complete()}else{this._updateProps();if(this._onUpdate){this._onUpdate.call(this,this._getDetails())
}if(this._onDraw){this._onDraw.call(this,this._getDetails())}}return this.getProgress()
};z.getProgress=function(){return this._progress};z._setStartTime=function(){this._startTime=this._getTime()-(this.getProgress()*this._duration)
};z._setDiff=function(){this._propsDiff={};var a=function(b,c,f,g){var d;for(d in b){if(typeof b[d]==="object"){c[d]=c[d]||{};
g[d]=g[d]||{};a(b[d],c[d],f[d],g[d])}else{if(typeof f[d]==="number"){if(c[d]!==undefined){f[d]=c[d]
}else{c[d]=f[d]}g[d]=b[d]-f[d]}else{delete b[d]}}}};a(this._propsTo,this._propsFrom,this._target,this._propsDiff)
};z._getDetails=function(){return{target:this._target,progress:this.getProgress(),clip:this}
};z._start=function(){this._startTimeout=null;this._remainingDelay=0;this._setStartTime();
this._clock.on("update",this._update);this._clock.on("draw",this._draw);if(!this._clock.isRunning()){this._clock.start()
}this._setDiff();this._playing=true;this._running=true;if(this._onStart){this._onStart.call(this,this._getDetails())
}this.trigger(D,this._getDetails())};z._stop=function(){this._playing=false;this._running=false;
this._clock.off("update",this._update);this._clock.off("draw",this._draw)};z._updateProps=function(){var b=this._ease.getValue(this._progress);
var a=function(c,d,g,h){var f;for(f in c){if(typeof c[f]!=="number"){a(c[f],d[f],g[f],h[f])
}else{g[f]=d[f]+(h[f]*b)}}};a(this._propsTo,this._propsFrom,this._target,this._propsDiff)
};z._completeProps=function(){var a=function(b,d){var c;for(c in b){if(typeof b[c]!=="number"){a(b[c],d[c])
}else{d[c]=b[c]}}};a(this._propsTo,this._target)};z._complete=function(){if(this._isYoyo&&((this._loop>0&&this._loopCount<=this._loop)||(this._loop===0&&this._loopCount===0))){this._propsFrom=(this._direction===1)?this._storePropsTo:this._storePropsFrom;
this._propsTo=(this._direction===1)?this._storePropsFrom:this._storePropsTo;this.setProgress(0);
this._direction*=-1;if(this._direction===-1){++this._loopCount}this._start()}else{if(this._loopCount<this._loop){++this._loopCount;
this.target=this._storeTarget;this.setProgress(0);this._start()}else{if(this._onComplete){this._onComplete.call(this,this._getDetails())
}this.trigger(w,this._getDetails())}}};z._update=function(a){if(this._running){this._progress=(a.timeNow-this._startTime)/this._duration;
if(this._progress>=1){this._progress=1;this._running=false;this._completeProps()
}else{this._updateProps()}if(this._onUpdate){this._onUpdate.call(this,this._getDetails())
}}};z._draw=function(a){if(this._onDraw){this._onDraw.call(this,this._getDetails())
}if(!this._running){this._stop();if(this._progress===1){this._complete()}}};C.exports=v
},{"ac-clock":72,"ac-easing":203,"ac-event-emitter":false,"ac-object":941}],72:[function(m,l,h){var j=m("./ac-clock/Clock"),k=m("./ac-clock/ThrottledClock"),i=m("./ac-clock/sharedClockInstance");
i.Clock=j;i.ThrottledClock=k;l.exports=i},{"./ac-clock/Clock":73,"./ac-clock/ThrottledClock":74,"./ac-clock/sharedClockInstance":75}],73:[function(o,n,i){var l;
var m=o("ac-event-emitter").EventEmitter;var j=new Date().getTime();function k(){m.call(this);
this.lastFrameTime=null;this._animationFrame=null;this._active=false;this._startTime=null;
this._boundOnAnimationFrame=this._onAnimationFrame.bind(this);this._getTime=Date.now||function(){return new Date().getTime()
}}l=k.prototype=new m(null);l.start=function(){if(this._active){return}this._tick()
};l.stop=function(){if(this._active){window.cancelAnimationFrame(this._animationFrame)
}this._animationFrame=null;this.lastFrameTime=null;this._active=false};l.destroy=function(){this.stop();
this.off();var a;for(a in this){if(this.hasOwnProperty(a)){this[a]=null}}};l.isRunning=function(){return this._active
};l._tick=function(){if(!this._active){this._active=true}this._animationFrame=window.requestAnimationFrame(this._boundOnAnimationFrame)
};l._onAnimationFrame=function(b){var a=0;var f=this._getTime();if(this.lastFrameTime===null){this.lastFrameTime=f-j
}else{a=b-this.lastFrameTime}var c=0,d;if(a!==0){c=1000/a}d={time:b,delta:a,fps:c,naturalFps:c,timeNow:f};
this.trigger("update",d);this.trigger("draw",d);this._animationFrame=null;this.lastFrameTime=b;
if(this._active!==false){this._tick()}else{this.lastFrameTime=null}};n.exports=k
},{"ac-event-emitter":false}],74:[function(o,n,i){var l;var j=o("./sharedClockInstance"),m=o("ac-event-emitter").EventEmitter;
function k(a,b){if(a===null){return}m.call(this);b=b||{};this._fps=a||null;this._clock=b.clock||j;
this._lastThrottledTime=null;this._clockEvent=null;this._clock.on("update",this._onClockUpdate,this)
}l=k.prototype=new m(null);l.setFps=function(a){this._fps=a;return this};l.getFps=function(){return this._fps
};l.start=function(){this._clock.start();return this};l.stop=function(){this._clock.stop();
return this};l.isRunning=function(){return this._clock.isRunning()};l.destroy=function(){this._clock.off("update",this._onClockUpdate,this);
this._clock.destroy.call(this)};l._onClockUpdate=function(b){if(this._lastThrottledTime===null){this._lastThrottledTime=this._clock.lastFrameTime
}var a=b.time-this._lastThrottledTime;if(!this._fps){throw new TypeError("FPS is not defined.")
}if(a<(1000/this._fps)){return}this._clockEvent=b;this._clockEvent.delta=a;this._clockEvent.fps=1000/a;
this._lastThrottledTime=this._clockEvent.time;this._clock.once("draw",this._onClockDraw,this);
this.trigger("update",this._clockEvent)};l._onClockDraw=function(){this.trigger("draw",this._clockEvent)
};n.exports=k},{"./sharedClockInstance":75,"ac-event-emitter":false}],75:[function(f,i,g){var h=f("./Clock");
i.exports=new h()},{"./Clock":73}],76:[function(f,i,g){var h=f("./ac-prefixer/Prefixer");
i.exports=new h();i.exports.Prefixer=h},{"./ac-prefixer/Prefixer":77}],77:[function(x,z,v){var r=x("./Prefixer/camelCasedEvents");
var o=/(\([^\)]+\))/gi;var u=/([^ ,;\(]+(\([^\)]+\))?)/gi;var s=/(-webkit-|-moz-|-ms-)|^(webkit|moz|ms)/gi;
var A=/^(webkit|moz|ms)/gi;var w=["-webkit-","-moz-","-ms-"];var q=["Webkit","Moz","ms"];
var p=["webkit","moz","ms"];function y(){this._supportsAvailable=("CSS" in window&&"supports" in window.CSS);
this._cssPrefixes=w;this._domPrefixes=q;this._evtPrefixes=p;this._styleProperties={};
this._styleValues={};this._eventTypes={}}var t=y.prototype;t.getEventType=function(b){var a;
var c;b=b.toLowerCase();if(b in this._eventTypes){return this._eventTypes[b]}if(this._checkEventType("on"+b)){return this._eventTypes[b]=b
}if(r[b]){for(a in r[b]){if(this._checkEventType(a)){return this._eventTypes[b]=r[b][a]
}}}for(c=0;c<this._evtPrefixes.length;c++){if(this._checkEventType("on"+this._evtPrefixes[c]+b)){this._eventTypes[b]=this._evtPrefixes[c]+b;
this._reduceAvailablePrefixes(c);return this._eventTypes[b]}}return this._eventTypes[b]=b
};t._checkEventType=function(a){return(a in window||a in document)};t.getStyleProperty=function(a){var b;
var d;var c;a+="";if(a in this._styleProperties){return this._styleProperties[a].dom
}a=this._toDOM(a);this._prepareTestElement();d=a.charAt(0).toUpperCase()+a.substr(1);
if(a==="filter"){b=["WebkitFilter","filter"]}else{b=(a+" "+this._domPrefixes.join(d+" ")+d).split(" ")
}for(c=0;c<b.length;c++){if(this._el.style[b[c]]!==undefined){if(c!==0){this._reduceAvailablePrefixes(c-1)
}this._memoizeStyleProperty(a,b[c]);return b[c]}}this._memoizeStyleProperty(a,false);
return false};t._memoizeStyleProperty=function(a,d){var c=this._toCSS(a);var b=(d===false)?false:this._toCSS(d);
this._styleProperties[a]=this._styleProperties[d]=this._styleProperties[c]=this._styleProperties[b]={dom:d,css:b}
};t.getStyleCSS=function(a,b){var c;a=this.getStyleProperty(a);if(!a){return false
}c=this._styleProperties[a].css;if(typeof b!=="undefined"){b=this.getStyleValue(a,b);
if(b===false){return false}c+=":"+b+";"}return c};t.getStyleValue=function(a,b){var c;
b+="";a=this.getStyleProperty(a);if(!a){return false}if(this._testStyleValue(a,b)){return b
}c=this._styleProperties[a].css;b=b.replace(u,function(h){var i;var d;var f;var g;
if(h[0]==="#"||!isNaN(h[0])){return h}d=h.replace(o,"");f=c+":"+d;if(f in this._styleValues){if(this._styleValues[f]===false){return""
}return h.replace(d,this._styleValues[f])}i=this._cssPrefixes.map(function(j){return j+h
});i=[h].concat(i);for(g=0;g<i.length;g++){if(this._testStyleValue(a,i[g])){if(g!==0){this._reduceAvailablePrefixes(g-1)
}this._styleValues[f]=i[g].replace(o,"");return i[g]}}this._styleValues[f]=false;
return""}.bind(this));b=b.trim();return(b==="")?false:b};t._testStyleValue=function(b,c){var d;
if(this._supportsAvailable){b=this._styleProperties[b].css;return CSS.supports(b,c)
}this._prepareTestElement();d=this._el.style[b];try{this._el.style[b]=c}catch(a){return false
}return(this._el.style[b]&&this._el.style[b]!==d)};t.stripPrefixes=function(a){a=String.prototype.replace.call(a,s,"");
return a.charAt(0).toLowerCase()+a.slice(1)};t._reduceAvailablePrefixes=function(a){if(this._cssPrefixes.length!==1){this._cssPrefixes=[this._cssPrefixes[a]];
this._domPrefixes=[this._domPrefixes[a]];this._evtPrefixes=[this._evtPrefixes[a]]
}};t._toDOM=function(a){var b;if(a.toLowerCase()==="float"){return"cssFloat"}a=a.replace(/-([a-z])/g,function(c,d){return d.toUpperCase()
});if(a.substr(0,2)==="Ms"){a="ms"+a.substr(2)}return a};t._toCSS=function(a){var b;
if(a.toLowerCase()==="cssfloat"){return"float"}if(A.test(a)){a="-"+a}return a.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()
};t._prepareTestElement=function(){if(!this._el){this._el=document.createElement("_")
}else{this._el.style.cssText="";this._el.removeAttribute("style")}};z.exports=y
},{"./Prefixer/camelCasedEvents":78}],78:[function(d,g,f){g.exports={transitionend:{onwebkittransitionend:"webkitTransitionEnd",onmstransitionend:"MSTransitionEnd"},animationstart:{onwebkitanimationstart:"webkitAnimationStart",onmsanimationstart:"MSAnimationStart"},animationend:{onwebkitanimationend:"webkitAnimationEnd",onmsanimationend:"MSAnimationEnd"},animationiteration:{onwebkitanimationiteration:"webkitAnimationIteration",onmsanimationiteration:"MSAnimationIteration"},fullscreenchange:{onmsfullscreenchange:"MSFullscreenChange"},fullscreenerror:{onmsfullscreenerror:"MSFullscreenError"}}
},{}],79:[function(d,g,f){g.exports={addEventListener:d("./ac-dom-events/addEventListener"),dispatchEvent:d("./ac-dom-events/dispatchEvent"),preventDefault:d("./ac-dom-events/preventDefault"),removeEventListener:d("./ac-dom-events/removeEventListener"),stop:d("./ac-dom-events/stop"),stopPropagation:d("./ac-dom-events/stopPropagation"),target:d("./ac-dom-events/target")}
},{"./ac-dom-events/addEventListener":80,"./ac-dom-events/dispatchEvent":81,"./ac-dom-events/preventDefault":82,"./ac-dom-events/removeEventListener":83,"./ac-dom-events/stop":84,"./ac-dom-events/stopPropagation":85,"./ac-dom-events/target":86}],80:[function(g,k,h){var i=g("ac-prefixer");
k.exports=function j(a,c,b,d){c=i.getEventType(c);if(a.addEventListener){a.addEventListener(c,b,d)
}else{c="on"+c.toLowerCase();a.attachEvent(c,b)}return a}},{"ac-prefixer":76}],81:[function(f,i,g){i.exports=function h(a,b,c){var d;
b=b.toLowerCase();if(window.CustomEvent){if(c){d=new CustomEvent(b,c)}else{d=new CustomEvent(b)
}a.dispatchEvent(d)}else{d=document.createEventObject();if(c&&"detail" in c){d.detail=c.detail
}a.fireEvent("on"+b,d)}return a}},{}],82:[function(i,h,g){h.exports=function f(a){a=a||window.event;
if(a.preventDefault){a.preventDefault()}else{a.returnValue=false}}},{}],83:[function(g,k,h){var i=g("ac-prefixer");
k.exports=function j(a,c,b,d){c=i.getEventType(c);if(a.removeEventListener){a.removeEventListener(c,b,d)
}else{c="on"+c.toLowerCase();a.detachEvent(c,b)}return a}},{"ac-prefixer":76}],84:[function(l,j,h){var i=l("./stopPropagation");
var m=l("./preventDefault");j.exports=function k(a){a=a||window.event;i(a);m(a);
a.stopped=true;a.returnValue=false}},{"./preventDefault":82,"./stopPropagation":85}],85:[function(i,h,f){h.exports=function g(a){a=a||window.event;
if(a.stopPropagation){a.stopPropagation()}else{a.cancelBubble=true}}},{}],86:[function(f,i,g){i.exports=function h(a){a=a||window.event;
return(typeof a.target!=="undefined")?a.target:a.srcElement}},{}],87:[function(f,i,g){var h={querySelector:f("./ac-dom-traversal/querySelector"),querySelectorAll:f("./ac-dom-traversal/querySelectorAll"),ancestor:f("./ac-dom-traversal/ancestor"),ancestors:f("./ac-dom-traversal/ancestors"),children:f("./ac-dom-traversal/children"),firstChild:f("./ac-dom-traversal/firstChild"),lastChild:f("./ac-dom-traversal/lastChild"),siblings:f("./ac-dom-traversal/siblings"),nextSibling:f("./ac-dom-traversal/nextSibling"),nextSiblings:f("./ac-dom-traversal/nextSiblings"),previousSibling:f("./ac-dom-traversal/previousSibling"),previousSiblings:f("./ac-dom-traversal/previousSiblings"),filterBySelector:f("./ac-dom-traversal/filterBySelector"),matchesSelector:f("./ac-dom-traversal/matchesSelector")};
f("./ac-dom-traversal/shims/ie")(h);i.exports=h},{"./ac-dom-traversal/ancestor":88,"./ac-dom-traversal/ancestors":89,"./ac-dom-traversal/children":90,"./ac-dom-traversal/filterBySelector":91,"./ac-dom-traversal/firstChild":92,"./ac-dom-traversal/lastChild":95,"./ac-dom-traversal/matchesSelector":96,"./ac-dom-traversal/nextSibling":97,"./ac-dom-traversal/nextSiblings":98,"./ac-dom-traversal/previousSibling":99,"./ac-dom-traversal/previousSiblings":100,"./ac-dom-traversal/querySelector":101,"./ac-dom-traversal/querySelectorAll":102,"./ac-dom-traversal/shims/ie":103,"./ac-dom-traversal/siblings":104}],88:[function(n,l,o){var j=n("ac-dom-nodes");
var i=n("./matchesSelector");var k=n("./helpers/validate");l.exports=function m(a,b){k.childNode(a,true,"ancestors");
k.selector(b,false,"ancestors");if(a!==document.body){while((a=a.parentNode)&&j.isElement(a)){if(!b||i(a,b)){return a
}if(a===document.body){break}}}return null}},{"./helpers/validate":94,"./matchesSelector":96,"ac-dom-nodes":148}],89:[function(n,m,o){var j=n("ac-dom-nodes");
var i=n("./matchesSelector");var k=n("./helpers/validate");m.exports=function l(a,c){var b=[];
k.childNode(a,true,"ancestors");k.selector(c,false,"ancestors");if(a!==document.body){while((a=a.parentNode)&&j.isElement(a)){if(!c||i(a,c)){b.push(a)
}if(a===document.body){break}}}return b}},{"./helpers/validate":94,"./matchesSelector":96,"ac-dom-nodes":148}],90:[function(n,l,o){var j=n("ac-dom-nodes");
var i=n("./filterBySelector");var k=n("./helpers/validate");l.exports=function m(a,c){var b;
k.parentNode(a,true,"children");k.selector(c,false,"children");b=a.children||a.childNodes;
b=j.filterByNodeType(b);if(c){b=i(b,c)}return b}},{"./filterBySelector":91,"./helpers/validate":94,"ac-dom-nodes":148}],91:[function(l,k,m){var h=l("./matchesSelector");
var j=l("./helpers/validate");k.exports=function i(a,b){j.selector(b,true,"filterBySelector");
a=Array.prototype.slice.call(a);return a.filter(function(c){return h(c,b)})}},{"./helpers/validate":94,"./matchesSelector":96}],92:[function(h,l,i){var m=h("./children");
var j=h("./helpers/validate");l.exports=function k(a,c){var b;j.parentNode(a,true,"firstChild");
j.selector(c,false,"firstChild");if(a.firstElementChild&&!c){return a.firstElementChild
}b=m(a,c);if(b.length){return b[0]}return null}},{"./children":90,"./helpers/validate":94}],93:[function(d,g,f){g.exports=window.Element?(function(a){return a.matches||a.matchesSelector||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector
}(Element.prototype)):null},{}],94:[function(r,t,q){var m=r("ac-dom-nodes");var u=function(a,b){if(!m.isNode(a)){return false
}if(typeof b==="number"){return(a.nodeType===b)}return(b.indexOf(a.nodeType)!==-1)
};var o=[m.ELEMENT_NODE,m.DOCUMENT_NODE,m.DOCUMENT_FRAGMENT_NODE];var n=" must be an Element, Document, or Document Fragment";
var l=[m.ELEMENT_NODE,m.TEXT_NODE,m.COMMENT_NODE];var p=" must be an Element, TextNode, or Comment";
var s=" must be a string";t.exports={parentNode:function(b,c,d,a){a=a||"node";if((b||c)&&!u(b,o)){throw new TypeError(d+": "+a+n)
}},childNode:function(b,c,d,a){a=a||"node";if(!b&&!c){return}if(!u(b,l)){throw new TypeError(d+": "+a+p)
}},selector:function(b,c,d,a){a=a||"selector";if((b||c)&&typeof b!=="string"){throw new TypeError(d+": "+a+s)
}}}},{"ac-dom-nodes":148}],95:[function(h,l,i){var m=h("./children");var j=h("./helpers/validate");
l.exports=function k(a,c){var b;j.parentNode(a,true,"lastChild");j.selector(c,false,"lastChild");
if(a.lastElementChild&&!c){return a.lastElementChild}b=m(a,c);if(b.length){return b[b.length-1]
}return null}},{"./children":90,"./helpers/validate":94}],96:[function(m,l,n){var i=m("ac-dom-nodes");
var j=m("./helpers/nativeMatches");var k=m("./helpers/validate");l.exports=function o(a,b){k.selector(b,true,"matchesSelector");
return i.isElement(a)?j.call(a,b):false}},{"./helpers/nativeMatches":93,"./helpers/validate":94,"ac-dom-nodes":148}],97:[function(n,m,o){var j=n("ac-dom-nodes");
var i=n("./matchesSelector");var k=n("./helpers/validate");m.exports=function l(a,b){k.childNode(a,true,"nextSibling");
k.selector(b,false,"nextSibling");if(a.nextElementSibling&&!b){return a.nextElementSibling
}while(a=a.nextSibling){if(j.isElement(a)){if(!b||i(a,b)){return a}}}return null
}},{"./helpers/validate":94,"./matchesSelector":96,"ac-dom-nodes":148}],98:[function(m,l,o){var j=m("ac-dom-nodes");
var i=m("./matchesSelector");var k=m("./helpers/validate");l.exports=function n(a,c){var b=[];
k.childNode(a,true,"nextSiblings");k.selector(c,false,"nextSiblings");while(a=a.nextSibling){if(j.isElement(a)){if(!c||i(a,c)){b.push(a)
}}}return b}},{"./helpers/validate":94,"./matchesSelector":96,"ac-dom-nodes":148}],99:[function(n,m,o){var j=n("ac-dom-nodes");
var i=n("./matchesSelector");var k=n("./helpers/validate");m.exports=function l(a,b){k.childNode(a,true,"previousSibling");
k.selector(b,false,"previousSibling");if(a.previousElementSibling&&!b){return a.previousElementSibling
}while(a=a.previousSibling){if(j.isElement(a)){if(!b||i(a,b)){return a}}}return null
}},{"./helpers/validate":94,"./matchesSelector":96,"ac-dom-nodes":148}],100:[function(n,m,o){var j=n("ac-dom-nodes");
var i=n("./matchesSelector");var k=n("./helpers/validate");m.exports=function l(a,c){var b=[];
k.childNode(a,true,"previousSiblings");k.selector(c,false,"previousSiblings");while(a=a.previousSibling){if(j.isElement(a)){if(!c||i(a,c)){b.push(a)
}}}return b.reverse()}},{"./helpers/validate":94,"./matchesSelector":96,"ac-dom-nodes":148}],101:[function(g,k,h){var i=g("./helpers/validate");
k.exports=function j(b,a){a=a||document;i.parentNode(a,true,"querySelector","context");
i.selector(b,true,"querySelector");return a.querySelector(b)}},{"./helpers/validate":94}],102:[function(g,k,h){var i=g("./helpers/validate");
k.exports=function j(b,a){a=a||document;i.parentNode(a,true,"querySelectorAll","context");
i.selector(b,true,"querySelectorAll");return Array.prototype.slice.call(a.querySelectorAll(b))
}},{"./helpers/validate":94}],103:[function(n,m,o){var l=n("../vendor/sizzle/sizzle");
var i=n("ac-dom-nodes");var j=n("../helpers/nativeMatches");var k=n("../helpers/validate");
m.exports=function(a,b){if(b||!("querySelectorAll" in document)){a.querySelectorAll=function(f,c){var d;
var g;c=c||document;k.parentNode(c,true,"querySelectorAll","context");k.selector(f,true,"querySelectorAll");
if(i.isDocumentFragment(c)){d=a.children(c);g=[];d.forEach(function(h){var q;if(l.matchesSelector(h,f)){g.push(h)
}q=l(f,h);if(q.length){g=g.concat(q)}});return g}return l(f,c)};a.querySelector=function(d,c){var f;
c=c||document;k.parentNode(c,true,"querySelector","context");k.selector(d,true,"querySelector");
f=a.querySelectorAll(d,c);return f.length?f[0]:null}}if(b||!j){a.matchesSelector=function(c,d){return l.matchesSelector(c,d)
}}}},{"../helpers/nativeMatches":93,"../helpers/validate":94,"../vendor/sizzle/sizzle":105,"ac-dom-nodes":148}],104:[function(h,l,i){var m=h("./children");
var j=h("./helpers/validate");l.exports=function k(a,c){var b=[];j.childNode(a,true,"siblings");
j.selector(c,false,"siblings");if(a.parentNode){b=m(a.parentNode,c);b=b.filter(function(d){return(d!==a)
})}return b}},{"./children":90,"./helpers/validate":94}],105:[function(d,g,f){
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(a2,bc){var aS,a0,bd,bq,bk,bm=a2.document,bj=bm.documentElement,aK="undefined",bi=false,bl=true,be=0,a9=[].slice,aU=[].push,aM=("sizcache"+Math.random()).replace(".",""),aE="[\\x20\\t\\r\\n\\f]",ba="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])",bb="(?:[\\w#_-]|[^\\x00-\\xa0]|\\\\.)",aC="([*^$|!~]?=)",a7="\\["+aE+"*("+ba+"+)"+aE+"*(?:"+aC+aE+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+bb+"+)|)|)"+aE+"*\\]",az=":("+ba+"+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|(.*))\\)|)",aA=":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",bf=aE+"*([\\x20\\t\\r\\n\\f>+~])"+aE+"*",bg="(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|"+a7+"|"+az.replace(2,7)+"|[^\\\\(),])+",aP=new RegExp("^"+aE+"+|((?:^|[^\\\\])(?:\\\\.)*)"+aE+"+$","g"),av=new RegExp("^"+bf),aQ=new RegExp(bg+"?(?="+aE+"*,|$)","g"),b=new RegExp("^(?:(?!,)(?:(?:^|,)"+aE+"*"+bg+")*?|"+aE+"*(.*?))(\\)|$)"),aG=new RegExp(bg.slice(19,-6)+"\\x20\\t\\r\\n\\f>+~])+|"+bf,"g"),a=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,aZ=/[\x20\t\r\n\f]*[+~]/,aJ=/:not\($/,aY=/h\d/i,a6=/input|select|textarea|button/i,aR=/\\(?!\\)/g,aw={ID:new RegExp("^#("+ba+"+)"),CLASS:new RegExp("^\\.("+ba+"+)"),NAME:new RegExp("^\\[name=['\"]?("+ba+"+)['\"]?\\]"),TAG:new RegExp("^("+ba.replace("[-","[-\\*")+"+)"),ATTR:new RegExp("^"+a7),PSEUDO:new RegExp("^"+az),CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\("+aE+"*(even|odd|(([+-]|)(\\d*)n|)"+aE+"*(?:([+-]|)"+aE+"*(\\d+)|))"+aE+"*\\)|)","i"),POS:new RegExp(aA,"ig"),needsContext:new RegExp("^"+aE+"*[>+~]|"+aA,"i")},aW={},aV=[],a5={},aO=[],aI=function(h){h.sizzleFilter=true;
return h},bp=function(h){return function(i){return i.nodeName.toLowerCase()==="input"&&i.type===h
}},aT=function(h){return function(i){var j=i.nodeName.toLowerCase();return(j==="input"||j==="button")&&i.type===h
}},at=function(h){var k=false,i=bm.createElement("div");try{k=h(i)}catch(j){}i=null;
return k},a1=at(function(i){i.innerHTML="<select></select>";var h=typeof i.lastChild.getAttribute("multiple");
return h!=="boolean"&&h!=="string"}),bs=at(function(i){i.id=aM+0;i.innerHTML="<a name='"+aM+"'></a><div name='"+aM+"'></div>";
bj.insertBefore(i,bj.firstChild);var h=bm.getElementsByName&&bm.getElementsByName(aM).length===2+bm.getElementsByName(aM+0).length;
bk=!bm.getElementById(aM);bj.removeChild(i);return h}),bn=at(function(h){h.appendChild(bm.createComment(""));
return h.getElementsByTagName("*").length===0}),ax=at(function(h){h.innerHTML="<a href='#'></a>";
return h.firstChild&&typeof h.firstChild.getAttribute!==aK&&h.firstChild.getAttribute("href")==="#"
}),ay=at(function(h){h.innerHTML="<div class='hidden e'></div><div class='hidden'></div>";
if(!h.getElementsByClassName||h.getElementsByClassName("e").length===0){return false
}h.lastChild.className="e";return h.getElementsByClassName("e").length!==1});var a4=function(i,l,p,m){p=p||[];
l=l||bm;var o,k,n,j,h=l.nodeType;if(h!==1&&h!==9){return[]}if(!i||typeof i!=="string"){return p
}n=a8(l);if(!n&&!m){if((o=a.exec(i))){if((j=o[1])){if(h===9){k=l.getElementById(j);
if(k&&k.parentNode){if(k.id===j){p.push(k);return p}}else{return p}}else{if(l.ownerDocument&&(k=l.ownerDocument.getElementById(j))&&aB(l,k)&&k.id===j){p.push(k);
return p}}}else{if(o[2]){aU.apply(p,a9.call(l.getElementsByTagName(i),0));return p
}else{if((j=o[3])&&ay&&l.getElementsByClassName){aU.apply(p,a9.call(l.getElementsByClassName(j),0));
return p}}}}}return aN(i,l,p,m,n)};var au=a4.selectors={cacheLength:50,match:aw,order:["ID","TAG"],attrHandle:{},createPseudo:aI,find:{ID:bk?function(i,j,k){if(typeof j.getElementById!==aK&&!k){var h=j.getElementById(i);
return h&&h.parentNode?[h]:[]}}:function(i,j,k){if(typeof j.getElementById!==aK&&!k){var h=j.getElementById(i);
return h?h.id===i||typeof h.getAttributeNode!==aK&&h.getAttributeNode("id").value===i?[h]:bc:[]
}},TAG:bn?function(h,i){if(typeof i.getElementsByTagName!==aK){return i.getElementsByTagName(h)
}}:function(h,j){var k=j.getElementsByTagName(h);if(h==="*"){var i,l=[],m=0;for(;
(i=k[m]);m++){if(i.nodeType===1){l.push(i)}}return l}return k}},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(h){h[1]=h[1].replace(aR,"");
h[3]=(h[4]||h[5]||"").replace(aR,"");if(h[2]==="~="){h[3]=" "+h[3]+" "}return h.slice(0,4)
},CHILD:function(h){h[1]=h[1].toLowerCase();if(h[1]==="nth"){if(!h[2]){a4.error(h[0])
}h[3]=+(h[3]?h[4]+(h[5]||1):2*(h[2]==="even"||h[2]==="odd"));h[4]=+((h[6]+h[7])||h[2]==="odd")
}else{if(h[2]){a4.error(h[0])}}return h},PSEUDO:function(h){var j,i=h[4];if(aw.CHILD.test(h[0])){return null
}if(i&&(j=b.exec(i))&&j.pop()){h[0]=h[0].slice(0,j[0].length-i.length-1);i=j[0].slice(0,-1)
}h.splice(2,3,i||h[3]);return h}},filter:{ID:bk?function(h){h=h.replace(aR,"");
return function(i){return i.getAttribute("id")===h}}:function(h){h=h.replace(aR,"");
return function(i){var j=typeof i.getAttributeNode!==aK&&i.getAttributeNode("id");
return j&&j.value===h}},TAG:function(h){if(h==="*"){return function(){return true
}}h=h.replace(aR,"").toLowerCase();return function(i){return i.nodeName&&i.nodeName.toLowerCase()===h
}},CLASS:function(h){var i=aW[h];if(!i){i=aW[h]=new RegExp("(^|"+aE+")"+h+"("+aE+"|$)");
aV.push(h);if(aV.length>au.cacheLength){delete aW[aV.shift()]}}return function(j){return i.test(j.className||(typeof j.getAttribute!==aK&&j.getAttribute("class"))||"")
}},ATTR:function(i,j,h){if(!j){return function(k){return a4.attr(k,i)!=null}}return function(l){var m=a4.attr(l,i),k=m+"";
if(m==null){return j==="!="}switch(j){case"=":return k===h;case"!=":return k!==h;
case"^=":return h&&k.indexOf(h)===0;case"*=":return h&&k.indexOf(h)>-1;case"$=":return h&&k.substr(k.length-h.length)===h;
case"~=":return(" "+k+" ").indexOf(h)>-1;case"|=":return k===h||k.substr(0,h.length+1)===h+"-"
}}},CHILD:function(l,j,i,k){if(l==="nth"){var h=be++;return function(p){var o,n,q=0,m=p;
if(i===1&&k===0){return true}o=p.parentNode;if(o&&(o[aM]!==h||!p.sizset)){for(m=o.firstChild;
m;m=m.nextSibling){if(m.nodeType===1){m.sizset=++q;if(m===p){break}}}o[aM]=h}n=p.sizset-k;
if(i===0){return n===0}else{return(n%i===0&&n/i>=0)}}}return function(m){var n=m;
switch(l){case"only":case"first":while((n=n.previousSibling)){if(n.nodeType===1){return false
}}if(l==="first"){return true}n=m;case"last":while((n=n.nextSibling)){if(n.nodeType===1){return false
}}return true}}},PSEUDO:function(i,j,l,h){var k=au.pseudos[i]||au.pseudos[i.toLowerCase()];
if(!k){a4.error("unsupported pseudo: "+i)}if(!k.sizzleFilter){return k}return k(j,l,h)
}},pseudos:{not:aI(function(h,j,k){var i=bh(h.replace(aP,"$1"),j,k);return function(l){return !i(l)
}}),enabled:function(h){return h.disabled===false},disabled:function(h){return h.disabled===true
},checked:function(h){var i=h.nodeName.toLowerCase();return(i==="input"&&!!h.checked)||(i==="option"&&!!h.selected)
},selected:function(h){if(h.parentNode){h.parentNode.selectedIndex}return h.selected===true
},parent:function(h){return !!h.firstChild},empty:function(h){return !h.firstChild
},contains:aI(function(h){return function(i){return(i.textContent||i.innerText||bt(i)).indexOf(h)>-1
}}),has:aI(function(h){return function(i){return a4(h,i).length>0}}),header:function(h){return aY.test(h.nodeName)
},text:function(i){var j,h;return i.nodeName.toLowerCase()==="input"&&(j=i.type)==="text"&&((h=i.getAttribute("type"))==null||h.toLowerCase()===j)
},radio:bp("radio"),checkbox:bp("checkbox"),file:bp("file"),password:bp("password"),image:bp("image"),submit:aT("submit"),reset:aT("reset"),button:function(i){var h=i.nodeName.toLowerCase();
return h==="input"&&i.type==="button"||h==="button"},input:function(h){return a6.test(h.nodeName)
},focus:function(h){var i=h.ownerDocument;return h===i.activeElement&&(!i.hasFocus||i.hasFocus())&&!!(h.type||h.href)
},active:function(h){return h===h.ownerDocument.activeElement}},setFilters:{first:function(i,j,h){return h?i.slice(1):[i[0]]
},last:function(i,j,k){var h=i.pop();return k?i:[h]},even:function(i,j,k){var l=[],m=k?1:0,h=i.length;
for(;m<h;m=m+2){l.push(i[m])}return l},odd:function(i,j,k){var l=[],m=k?0:1,h=i.length;
for(;m<h;m=m+2){l.push(i[m])}return l},lt:function(i,j,h){return h?i.slice(+j):i.slice(0,+j)
},gt:function(i,j,h){return h?i.slice(0,+j+1):i.slice(+j+1)},eq:function(i,j,k){var h=i.splice(+j,1);
return k?i:h}}};au.setFilters.nth=au.setFilters.eq;au.filters=au.pseudos;if(!ax){au.attrHandle={href:function(h){return h.getAttribute("href",2)
},type:function(h){return h.getAttribute("type")}}}if(bs){au.order.push("NAME");
au.find.NAME=function(h,i){if(typeof i.getElementsByName!==aK){return i.getElementsByName(h)
}}}if(ay){au.order.splice(1,0,"CLASS");au.find.CLASS=function(i,j,h){if(typeof j.getElementsByClassName!==aK&&!h){return j.getElementsByClassName(i)
}}}try{a9.call(bj.childNodes,0)[0].nodeType}catch(aD){a9=function(j){var i,h=[];
for(;(i=this[j]);j++){h.push(i)}return h}}var a8=a4.isXML=function(h){var i=h&&(h.ownerDocument||h).documentElement;
return i?i.nodeName!=="HTML":false};var aB=a4.contains=bj.compareDocumentPosition?function(i,h){return !!(i.compareDocumentPosition(h)&16)
}:bj.contains?function(k,h){var i=k.nodeType===9?k.documentElement:k,j=h.parentNode;
return k===j||!!(j&&j.nodeType===1&&i.contains&&i.contains(j))}:function(i,h){while((h=h.parentNode)){if(h===i){return true
}}return false};var bt=a4.getText=function(i){var j,l="",k=0,h=i.nodeType;if(h){if(h===1||h===9||h===11){if(typeof i.textContent==="string"){return i.textContent
}else{for(i=i.firstChild;i;i=i.nextSibling){l+=bt(i)}}}else{if(h===3||h===4){return i.nodeValue
}}}else{for(;(j=i[k]);k++){l+=bt(j)}}return l};a4.attr=function(i,j){var h,k=a8(i);
if(!k){j=j.toLowerCase()}if(au.attrHandle[j]){return au.attrHandle[j](i)}if(a1||k){return i.getAttribute(j)
}h=i.getAttributeNode(j);return h?typeof i[j]==="boolean"?i[j]?j:null:h.specified?h.value:null:null
};a4.error=function(h){throw new Error("Syntax error, unrecognized expression: "+h)
};[0,0].sort(function(){return(bl=0)});if(bj.compareDocumentPosition){bd=function(i,h){if(i===h){bi=true;
return 0}return(!i.compareDocumentPosition||!h.compareDocumentPosition?i.compareDocumentPosition:i.compareDocumentPosition(h)&4)?-1:1
}}else{bd=function(n,o){if(n===o){bi=true;return 0}else{if(n.sourceIndex&&o.sourceIndex){return n.sourceIndex-o.sourceIndex
}}var q,k,j=[],l=[],h=n.parentNode,p=o.parentNode,m=h;if(h===p){return bq(n,o)}else{if(!h){return -1
}else{if(!p){return 1}}}while(m){j.unshift(m);m=m.parentNode}m=p;while(m){l.unshift(m);
m=m.parentNode}q=j.length;k=l.length;for(var i=0;i<q&&i<k;i++){if(j[i]!==l[i]){return bq(j[i],l[i])
}}return i===q?bq(n,l[i],-1):bq(j[i],o,1)};bq=function(k,h,j){if(k===h){return j
}var i=k.nextSibling;while(i){if(i===h){return -1}i=i.nextSibling}return 1}}a4.uniqueSort=function(j){var i,h=1;
if(bd){bi=bl;j.sort(bd);if(bi){for(;(i=j[h]);h++){if(i===j[h-1]){j.splice(h--,1)
}}}}return j};function a3(m,i,j,l){var k=0,h=i.length;for(;k<h;k++){a4(m,i[k],j,l)
}}function c(h,n,i,l,o,j){var m,k=au.setFilters[n.toLowerCase()];if(!k){a4.error(n)
}if(h||!(m=o)){a3(h||"*",l,(m=[]),o)}return m.length>0?k(m,i,j):[]}function aX(v,u,x,q,n){var j,s,m,k,y,l,w,p,t=0,r=n.length,o=aw.POS,i=new RegExp("^"+o.source+"(?!"+aE+")","i"),h=function(){var z=1,A=arguments.length-2;
for(;z<A;z++){if(arguments[z]===bc){j[z]=bc}}};for(;t<r;t++){o.exec("");v=n[t];
k=[];m=0;y=q;while((j=o.exec(v))){p=o.lastIndex=j.index+j[0].length;if(p>m){w=v.slice(m,j.index);
m=p;l=[u];if(av.test(w)){if(y){l=y}y=q}if((s=aJ.test(w))){w=w.slice(0,-5).replace(av,"$&*")
}if(j.length>1){j[0].replace(i,h)}y=c(w,j[1],j[2],l,y,s)}}if(y){k=k.concat(y);if((w=v.slice(m))&&w!==")"){a3(w,k,x,q)
}else{aU.apply(x,k)}}else{a4(v,u,x,q)}}return r===1?x:a4.uniqueSort(x)}function br(t,j,q){var o,p,n,h=[],s=0,r=b.exec(t),l=!r.pop()&&!r.pop(),k=l&&t.match(aQ)||[""],m=au.preFilter,i=au.filter,u=!q&&j!==bm;
for(;(p=k[s])!=null&&l;s++){h.push(o=[]);if(u){p=" "+p}while(p){l=false;if((r=av.exec(p))){p=p.slice(r[0].length);
l=o.push({part:r.pop().replace(aP," "),captures:r})}for(n in i){if((r=aw[n].exec(p))&&(!m[n]||(r=m[n](r,j,q)))){p=p.slice(r.shift().length);
l=o.push({part:n,captures:r})}}if(!l){break}}}if(!l){a4.error(t)}return h}function aH(i,j,k){var h=j.dir,l=be++;
if(!i){i=function(m){return m===k}}return j.first?function(m,n){while((m=m[h])){if(m.nodeType===1){return i(m,n)&&m
}}}:function(q,n){var p,o=l+"."+a0,m=o+"."+aS;while((q=q[h])){if(q.nodeType===1){if((p=q[aM])===m){return false
}else{if(typeof p==="string"&&p.indexOf(o)===0){if(q.sizset){return q}}else{q[aM]=m;
if(i(q,n)){q.sizset=true;return q}q.sizset=false}}}}}}function aL(h,i){return h?function(j,k){var l=i(j,k);
return l&&h(l===true?j:l,k)}:i}function aF(i,k,h){var l,j,m=0;for(;(l=i[m]);m++){if(au.relative[l.part]){j=aH(j,au.relative[l.part],k)
}else{l.captures.push(k,h);j=aL(j,au.filter[l.part].apply(null,l.captures))}}return j
}function bo(h){return function(j,k){var i,l=0;for(;(i=h[l]);l++){if(i(j,k)){return true
}}return false}}var bh=a4.compile=function(h,l,n){var i,j,m,k=a5[h];if(k&&k.context===l){k.dirruns++;
return k}j=br(h,l,n);for(m=0;(i=j[m]);m++){j[m]=aF(i,l,n)}k=a5[h]=bo(j);k.context=l;
k.runs=k.dirruns=0;aO.push(h);if(aO.length>au.cacheLength){delete a5[aO.shift()]
}return k};a4.matches=function(i,h){return a4(i,null,null,h)};a4.matchesSelector=function(h,i){return a4(i,null,null,[h]).length>0
};var aN=function(i,o,w,s,t){i=i.replace(aP,"$1");var q,r,v,p,m,k,l,j,x,u=i.match(aQ),n=i.match(aG),h=o.nodeType;
if(aw.POS.test(i)){return aX(i,o,w,s,u)}if(s){q=a9.call(s,0)}else{if(u&&u.length===1){if(n.length>1&&h===9&&!t&&(u=aw.ID.exec(n[0]))){o=au.find.ID(u[1],o,t)[0];
if(!o){return w}i=i.slice(n.shift().length)}j=((u=aZ.exec(n[0]))&&!u.index&&o.parentNode)||o;
x=n.pop();k=x.split(":not")[0];for(v=0,p=au.order.length;v<p;v++){l=au.order[v];
if((u=aw[l].exec(k))){q=au.find[l]((u[1]||"").replace(aR,""),j,t);if(q==null){continue
}if(k===x){i=i.slice(0,i.length-x.length)+k.replace(aw[l],"");if(!i){aU.apply(w,a9.call(q,0))
}}break}}}}if(i){r=bh(i,o,t);a0=r.dirruns;if(q==null){q=au.find.TAG("*",(aZ.test(i)&&o.parentNode)||o)
}for(v=0;(m=q[v]);v++){aS=r.runs++;if(r(m,o)){w.push(m)}}}return w};if(bm.querySelectorAll){(function(){var j,i=aN,k=/'|\\/g,m=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,n=[],h=[":active"],l=bj.matchesSelector||bj.mozMatchesSelector||bj.webkitMatchesSelector||bj.oMatchesSelector||bj.msMatchesSelector;
at(function(o){o.innerHTML="<select><option selected></option></select>";if(!o.querySelectorAll("[selected]").length){n.push("\\["+aE+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
}if(!o.querySelectorAll(":checked").length){n.push(":checked")}});at(function(o){o.innerHTML="<p test=''></p>";
if(o.querySelectorAll("[test^='']").length){n.push("[*^$]="+aE+"*(?:\"\"|'')")}o.innerHTML="<input type='hidden'>";
if(!o.querySelectorAll(":enabled").length){n.push(":enabled",":disabled")}});n=n.length&&new RegExp(n.join("|"));
aN=function(r,v,q,o,p){if(!o&&!p&&(!n||!n.test(r))){if(v.nodeType===9){try{aU.apply(q,a9.call(v.querySelectorAll(r),0));
return q}catch(s){}}else{if(v.nodeType===1&&v.nodeName.toLowerCase()!=="object"){var t=v.getAttribute("id"),w=t||aM,u=aZ.test(r)&&v.parentNode||v;
if(t){w=w.replace(k,"\\$&")}else{v.setAttribute("id",w)}try{aU.apply(q,a9.call(u.querySelectorAll(r.replace(aQ,"[id='"+w+"'] $&")),0));
return q}catch(s){}finally{if(!t){v.removeAttribute("id")}}}}}return i(r,v,q,o,p)
};if(l){at(function(o){j=l.call(o,"div");try{l.call(o,"[test!='']:sizzle");h.push(au.match.PSEUDO)
}catch(p){}});h=new RegExp(h.join("|"));a4.matchesSelector=function(q,o){o=o.replace(m,"='$1']");
if(!a8(q)&&!h.test(o)&&(!n||!n.test(o))){try{var r=l.call(q,o);if(r||j||q.document&&q.document.nodeType!==11){return r
}}catch(p){}}return a4(o,null,null,[q]).length>0}}})()}if(typeof g==="object"&&g.exports){g.exports=a4
}else{a2.Sizzle=a4}})(window)},{}],106:[function(d,g,f){g.exports={DOMEmitter:d("./ac-dom-emitter/DOMEmitter")}
},{"./ac-dom-emitter/DOMEmitter":107}],107:[function(s,t,r){var q;var l=s("ac-event-emitter").EventEmitter,m=s("./DOMEmitterEvent"),p=s("ac-dom-events"),u=s("ac-dom-traversal");
var n="dom-emitter";function o(a){if(a===null){return}this.el=a;this._bindings={};
this._delegateFuncs={};this._eventEmitter=new l()}q=o.prototype;q.on=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._on);
return this};q.once=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._once);
return this};q.off=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._off);
return this};q.has=function(b,d,f,h){var g,c;if(typeof d==="string"){g=d;c=f}else{c=d;
h=f}if(g){var a=this._getDelegateFuncBindingIdx(b,g,c,h,true);if(a>-1){return true
}return false}if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};q.trigger=function(i,a,h,c){i=this._parseEventNames(i);i=this._cleanStringData(i);
var f,d,g,b=i.length;if(typeof a==="string"){f=this._cleanStringData(a);d=h}else{d=a;
c=h}for(g=0;g<b;g++){this._triggerDOMEvents(i[g],d,f)}return this};q.emitterTrigger=function(a,d,c){if(!this._eventEmitter){return this
}a=this._parseEventNames(a);a=this._cleanStringData(a);d=new m(d,this);var f,b=a.length;
for(f=0;f<b;f++){this._eventEmitter.trigger(a[f],d,c)}return this};q.propagateTo=function(b,a){this._eventEmitter.propagateTo(b,a);
return this};q.stopPropagatingTo=function(a){this._eventEmitter.stopPropagatingTo(a);
return this};q.stopImmediatePropagation=function(){this._eventEmitter.stopImmediatePropagation();
return this};q.destroy=function(){this._triggerInternalEvent("willdestroy");this.off();
var a;for(a in this){if(this.hasOwnProperty(a)){this[a]=null}}};q._parseEventNames=function(a){if(!a){return[a]
}return a.split(" ")};q._onListenerEvent=function(c,a){var b=new m(a,this);this._eventEmitter.trigger(c,b,false)
};q._setListener=function(a){this._bindings[a]=this._onListenerEvent.bind(this,a);
p.addEventListener(this.el,a,this._bindings[a])};q._removeListener=function(a){p.removeEventListener(this.el,a,this._bindings[a]);
this._bindings[a]=null};q._triggerInternalEvent=function(b,a){this.emitterTrigger(n+":"+b,a)
};q._normalizeArgumentsAndCall=function(b,h){var c={};if(b.length===0){h.call(this,c);
return}if(typeof b[0]==="string"||b[0]===null){b=this._cleanStringData(b);c.events=b[0];
if(typeof b[1]==="string"){c.delegateQuery=b[1];c.callback=b[2];c.context=b[3]}else{c.callback=b[1];
c.context=b[2]}h.call(this,c);return}var a,f,d=":",g=b[0];for(a in g){if(g.hasOwnProperty(a)){c={};
f=this._cleanStringData(a.split(d));c.events=f[0];c.delegateQuery=f[1];c.callback=g[a];
c.context=b[1];h.call(this,c)}}};q._registerDelegateFunc=function(g,d,c,b,f){var a=this._delegateFunc.bind(this,g,d,c,f);
this._delegateFuncs[d]=this._delegateFuncs[d]||{};this._delegateFuncs[d][g]=this._delegateFuncs[d][g]||[];
this._delegateFuncs[d][g].push({func:b,context:f,delegateFunc:a});return a};q._cleanStringData=function(h){var i=false;
if(typeof h==="string"){h=[h];i=true}var a=[],f,c,d,g,b=h.length;for(f=0;f<b;f++){c=h[f];
if(typeof c==="string"){if(c===""||c===" "){continue}d=c.length;while(c[0]===" "){c=c.slice(1,d);
d--}while(c[d-1]===" "){c=c.slice(0,d-1);d--}}a.push(c)}if(i){return a[0]}return a
};q._unregisterDelegateFunc=function(g,c,b,d){if(!this._delegateFuncs[c]||!this._delegateFuncs[c][g]){return
}var f=this._getDelegateFuncBindingIdx(g,c,b,d),a;if(f>-1){a=this._delegateFuncs[c][g][f].delegateFunc;
this._delegateFuncs[c][g].splice(f,1);if(this._delegateFuncs[c][g].length===0){this._delegateFuncs[c][g]=null
}}return a};q._unregisterDelegateFuncs=function(b,c){if(!this._delegateFuncs[c]){return
}if(b!==null&&!this._delegateFuncs[c][b]){return}if(b===null){var a;for(a in this._delegateFuncs[c]){if(this._delegateFuncs[c].hasOwnProperty(a)){this._unbindDelegateFunc(a,c)
}}return}this._unbindDelegateFunc(b,c)};q._unbindDelegateFunc=function(b,f){var d,c,a=0;
while(this._delegateFuncs[f][b]&&this._delegateFuncs[f][b][a]){d=this._delegateFuncs[f][b][a];
c=this._delegateFuncs[f][b][a].length;this._off({events:b,delegateQuery:f,callback:d.func,context:d.context});
if(this._delegateFuncs[f][b]&&c===this._delegateFuncs[f][b].length){a++}}d=c=null
};q._unregisterDelegateFuncsByEvent=function(b){var a;for(a in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(a)){this._unregisterDelegateFuncs(b,a)
}}};q._delegateFunc=function(b,f,c,h,d){if(this._targetHasDelegateAncestor(d.target,f)){var a=Array.prototype.slice.call(arguments,0),g=a.slice(4,a.length);
h=h||window;if(typeof d.detail==="object"){g[0]=d.detail}c.apply(h,g)}};q._targetHasDelegateAncestor=function(c,a){var b=c;
while(b&&b!==this.el&&b!==document.documentElement){if(u.matchesSelector(b,a)){return true
}b=b.parentNode}return false};q._on=function(d){var a=d.events,c=d.callback,f=d.delegateQuery,g=d.context,b=d.unboundCallback||c;
a=this._parseEventNames(a);a.forEach(function(h,w,j,i,k){if(!this.has(k)){this._setListener(k)
}if(typeof i==="string"){h=this._registerDelegateFunc(k,i,h,w,j)}this._triggerInternalEvent("willon",{evt:k,callback:h,context:j,delegateQuery:i});
this._eventEmitter.on(k,h,j);this._triggerInternalEvent("didon",{evt:k,callback:h,context:j,delegateQuery:i})
}.bind(this,c,b,g,f));a=c=b=f=g=null};q._off=function(d){var a=d.events,c=d.callback,f=d.delegateQuery,g=d.context,b=d.unboundCallback||c;
if(typeof a==="undefined"){this._eventEmitter.off();var h;for(h in this._bindings){if(this._bindings.hasOwnProperty(h)){this._removeListener(h)
}}for(h in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(h)){this._delegateFuncs[h]=null
}}return}a=this._parseEventNames(a);a.forEach(function(i,y,k,j,x){if(typeof j==="string"&&typeof y==="function"){i=this._unregisterDelegateFunc(x,j,y,k);
if(!i){return}}if(typeof j==="string"&&typeof i==="undefined"){this._unregisterDelegateFuncs(x,j);
return}if(typeof x==="string"&&typeof i==="undefined"){this._unregisterDelegateFuncsByEvent(x);
if(typeof j==="string"){return}}this._triggerInternalEvent("willoff",{evt:x,callback:i,context:k,delegateQuery:j});
this._eventEmitter.off(x,i,k);this._triggerInternalEvent("didoff",{evt:x,callback:i,context:k,delegateQuery:j});
if(!this.has(x)){this._removeListener(x)}}.bind(this,c,b,g,f));a=c=b=f=g=null};
q._once=function(d){var b=d.events,c=d.callback,f=d.delegateQuery,a=d.context;b=this._parseEventNames(b);
b.forEach(function(g,i,h,j){if(typeof h==="string"){return this._handleDelegateOnce(j,g,i,h)
}if(!this.has(j)){this._setListener(j)}this._triggerInternalEvent("willonce",{evt:j,callback:g,context:i,delegateQuery:h});
this._eventEmitter.once.call(this,j,g,i);this._triggerInternalEvent("didonce",{evt:j,callback:g,context:i,delegateQuery:h})
}.bind(this,c,a,f));b=c=f=a=null};q._handleDelegateOnce=function(b,c,a,d){this._triggerInternalEvent("willonce",{evt:b,callback:c,context:a,delegateQuery:d});
this._on({events:b,context:a,delegateQuery:d,callback:this._getDelegateOnceCallback.bind(this,b,c,a,d),unboundCallback:c});
this._triggerInternalEvent("didonce",{evt:b,callback:c,context:a,delegateQuery:d});
return this};q._getDelegateOnceCallback=function(b,c,g,d){var a=Array.prototype.slice.call(arguments,0),f=a.slice(4,a.length);
c.apply(g,f);this._off({events:b,delegateQuery:d,callback:c,context:g})};q._getDelegateFuncBindingIdx=function(j,c,f,h,i){var a=-1;
if(this._delegateFuncs[c]&&this._delegateFuncs[c][j]){var d,g,b=this._delegateFuncs[c][j].length;
for(d=0;d<b;d++){g=this._delegateFuncs[c][j][d];if(i&&typeof f==="undefined"){f=g.func
}if(g.func===f&&g.context===h){a=d;break}}}return a};q._triggerDOMEvents=function(h,d,f){var a=[this.el];
if(f){a=u.querySelectorAll(f,this.el)}var g,c,b=a.length;for(g=0;g<b;g++){p.dispatchEvent(a[g],h,{bubbles:true,cancelable:true,detail:d})
}};t.exports=o},{"./DOMEmitterEvent":108,"ac-dom-events":79,"ac-dom-traversal":87,"ac-event-emitter":false}],108:[function(h,m,i){var k=h("ac-dom-events");
var l;var j=function(a,b){this._domEmitter=b;this.originalEvent=a||{};this._originalTarget=k.target(this.originalEvent);
this.target=this._originalTarget||this._domEmitter.el;this.currentTarget=this._domEmitter.el;
this.timeStamp=this.originalEvent.timeStamp||Date.now();if(this._isDOMEvent(this.originalEvent)){if(typeof this.originalEvent.detail==="object"){this.data=this.originalEvent.detail
}}else{if(a){this.data=this.originalEvent;this.originalEvent={}}}};l=j.prototype;
l.preventDefault=function(){k.preventDefault(this.originalEvent)};l.stopPropagation=function(){k.stopPropagation(this.originalEvent)
};l.stopImmediatePropagation=function(){if(this.originalEvent.stopImmediatePropagation){this.originalEvent.stopImmediatePropagation()
}this._domEmitter.stopImmediatePropagation()};l._isDOMEvent=function(a){if(this._originalTarget||(document.createEvent!=="undefined"&&typeof CustomEvent!=="undefined"&&a instanceof CustomEvent)){return true
}return false};m.exports=j},{"ac-dom-events":79}],109:[function(m,l,h){var j=m("./utils/addEventListener");
var i=m("./shared/getEventType");l.exports=function k(a,c,b,d){c=i(a,c);return j(a,c,b,d)
}},{"./shared/getEventType":120,"./utils/addEventListener":124}],110:[function(l,k,m){var i=l("./utils/dispatchEvent");
var h=l("./shared/getEventType");k.exports=function j(a,b,c){b=h(a,b);return i(a,b,c)
}},{"./shared/getEventType":120,"./utils/dispatchEvent":125}],111:[function(d,g,f){g.exports={addEventListener:d("./addEventListener"),dispatchEvent:d("./dispatchEvent"),preventDefault:d("./preventDefault"),removeEventListener:d("./removeEventListener"),stop:d("./stop"),stopPropagation:d("./stopPropagation"),target:d("./target")}
},{"./addEventListener":109,"./dispatchEvent":110,"./preventDefault":118,"./removeEventListener":119,"./stop":121,"./stopPropagation":122,"./target":123}],112:[function(f,i,g){if(document.createEvent){try{new window.CustomEvent("click")
}catch(h){window.CustomEvent=(function(){function a(c,b){b=b||{bubbles:false,cancelable:false,detail:undefined};
var d=document.createEvent("CustomEvent");d.initCustomEvent(c,b.bubbles,b.cancelable,b.detail);
return d}a.prototype=window.Event.prototype;return a}())}}},{}],113:[function(p,r,o){var n=p("./utils/eventTypeAvailable");
var k=p("./shared/camelCasedEventTypes");var q=p("./shared/windowFallbackEventTypes");
var m=p("./shared/prefixHelper");var s={};r.exports=function l(a,b){var f;var d;
var c;b=b||"div";a=a.toLowerCase();if(!(b in s)){s[b]={}}d=s[b];if(a in d){return d[a]
}if(n(a,b)){return d[a]=a}if(a in k){for(c=0;c<k[a].length;c++){f=k[a][c];if(n(f.toLowerCase(),b)){return d[a]=f
}}}for(c=0;c<m.evt.length;c++){f=m.evt[c]+a;if(n(f,b)){m.reduce(c);return d[a]=f
}}if(b!=="window"&&q.indexOf(a)){return d[a]=l(a,"window")}return d[a]=false}},{"./shared/camelCasedEventTypes":114,"./shared/prefixHelper":115,"./shared/windowFallbackEventTypes":116,"./utils/eventTypeAvailable":117}],114:[function(d,g,f){g.exports={transitionend:["webkitTransitionEnd","MSTransitionEnd"],animationstart:["webkitAnimationStart","MSAnimationStart"],animationend:["webkitAnimationEnd","MSAnimationEnd"],animationiteration:["webkitAnimationIteration","MSAnimationIteration"],fullscreenchange:["MSFullscreenChange"],fullscreenerror:["MSFullscreenError"]}
},{}],115:[function(j,p,k){var l=["-webkit-","-moz-","-ms-"];var o=["Webkit","Moz","ms"];
var m=["webkit","moz","ms"];var q=function(){this.initialize()};var n=q.prototype;
n.initialize=function(){this.reduced=false;this.css=l;this.dom=o;this.evt=m};n.reduce=function(a){if(!this.reduced){this.reduced=true;
this.css=[this.css[a]];this.dom=[this.dom[a]];this.evt=[this.evt[a]]}};p.exports=new q()
},{}],116:[function(d,g,f){g.exports=["transitionend","animationstart","animationend","animationiteration"]
},{}],117:[function(k,i,g){var h={window:window,document:document};i.exports=function j(a,c){var b;
a="on"+a;if(!(c in h)){h[c]=document.createElement(c)}b=h[c];if(a in b){return true
}if("setAttribute" in b){b.setAttribute(a,"return;");return(typeof b[a]==="function")
}return false}},{}],118:[function(d,g,f){g.exports=d(82)},{}],119:[function(l,k,m){var h=l("./utils/removeEventListener");
var i=l("./shared/getEventType");k.exports=function j(a,c,b,d){c=i(a,c);return h(a,c,b,d)
}},{"./shared/getEventType":120,"./utils/removeEventListener":126}],120:[function(k,i,g){var j=k("ac-prefixer/getEventType");
i.exports=function h(a,b){var c;var d;if("tagName" in a){c=a.tagName}else{if(a===window){c="window"
}else{c="document"}}d=j(b,c);if(d){return d}return b}},{"ac-prefixer/getEventType":113}],121:[function(d,g,f){g.exports=d(84)
},{"./preventDefault":118,"./stopPropagation":122}],122:[function(d,g,f){g.exports=d(85)
},{}],123:[function(f,i,g){i.exports=function h(a){a=a||window.event;return(typeof a.target!=="undefined")?a.target:a.srcElement
}},{}],124:[function(f,i,g){i.exports=function h(a,c,b,d){if(a.addEventListener){a.addEventListener(c,b,!!d)
}else{a.attachEvent("on"+c,b)}return a}},{}],125:[function(f,i,g){f("ac-polyfills/CustomEvent");
i.exports=function h(a,b,c){var d;if(a.dispatchEvent){if(c){d=new CustomEvent(b,c)
}else{d=new CustomEvent(b)}a.dispatchEvent(d)}else{d=document.createEventObject();
if(c&&"detail" in c){d.detail=c.detail}a.fireEvent("on"+b,d)}return a}},{"ac-polyfills/CustomEvent":112}],126:[function(f,i,g){i.exports=function h(a,c,b,d){if(a.removeEventListener){a.removeEventListener(c,b,!!d)
}else{a.detachEvent("on"+c,b)}return a}},{}],127:[function(j,i,k){var g=j("./utils/getBoundingClientRect");
i.exports=function h(c,a){var b=1;if(a){b=g(c).width/c.offsetWidth}return{width:c.scrollWidth*b,height:c.scrollHeight*b}
}},{"./utils/getBoundingClientRect":138}],128:[function(j,i,k){var g=j("./utils/getBoundingClientRect");
i.exports=function h(c,a){var b;if(a){b=g(c);return{width:b.width,height:b.height}
}return{width:c.offsetWidth,height:c.offsetHeight}}},{"./utils/getBoundingClientRect":138}],129:[function(n,m,o){var q=n("./getDimensions");
var p=n("./utils/getBoundingClientRect");var j=n("./getScrollX");var k=n("./getScrollY");
m.exports=function l(d,f){var b;var g;var a;var c;var h;if(f){b=p(d);g=j();a=k();
return{top:b.top+a,right:b.right+g,bottom:b.bottom+a,left:b.left+g}}c=q(d,f);b={top:d.offsetTop,left:d.offsetLeft,width:c.width,height:c.height};
while(d=d.offsetParent){b.top+=d.offsetTop;b.left+=d.offsetLeft}return{top:b.top,right:b.left+b.width,bottom:b.top+b.height,left:b.left}
}},{"./getDimensions":128,"./getScrollX":133,"./getScrollY":134,"./utils/getBoundingClientRect":138}],130:[function(m,k,h){var i=m("./getDimensions");
var j=m("./getPixelsInViewport");k.exports=function l(b,a){var c=j(b,a);var d=i(b,a).height;
return(c/d)}},{"./getDimensions":128,"./getPixelsInViewport":131}],131:[function(k,j,g){var h=k("./getViewportPosition");
j.exports=function i(d,a){var b=document.documentElement.clientHeight;var f=h(d,a);
var c;if(f.top>=b||f.bottom<=0){return 0}c=(f.bottom-f.top);if(f.top<0){c+=f.top
}if(f.bottom>b){c-=f.bottom-b}return c}},{"./getViewportPosition":135}],132:[function(l,k,m){var i=l("./getDimensions");
var h=l("./utils/getBoundingClientRect");k.exports=function j(d,a){var b;var f;
var c;if(a){b=h(d);if(d.offsetParent){f=h(d.offsetParent);b.top-=f.top;b.left-=f.left
}}else{c=i(d,a);b={top:d.offsetTop,left:d.offsetLeft,width:c.width,height:c.height}
}return{top:b.top,right:b.left+b.width,bottom:b.top+b.height,left:b.left}}},{"./getDimensions":128,"./utils/getBoundingClientRect":138}],133:[function(i,h,f){h.exports=function g(b){var a;
b=b||window;if(b===window){a=window.pageXOffset;if(!a){b=document.documentElement||document.body.parentNode||document.body
}else{return a}}return b.scrollLeft}},{}],134:[function(i,h,f){h.exports=function g(b){var a;
b=b||window;if(b===window){a=window.pageYOffset;if(!a){b=document.documentElement||document.body.parentNode||document.body
}else{return a}}return b.scrollTop}},{}],135:[function(n,m,o){var l=n("./getPagePosition");
var p=n("./utils/getBoundingClientRect");var q=n("./getScrollX");var j=n("./getScrollY");
m.exports=function k(c,f){var d;var a;var b;if(f){d=p(c);return{top:d.top,right:d.right,bottom:d.bottom,left:d.left}
}d=l(c);a=q();b=j();return{top:d.top-b,right:d.right-a,bottom:d.bottom-b,left:d.left-a}
}},{"./getPagePosition":129,"./getScrollX":133,"./getScrollY":134,"./utils/getBoundingClientRect":138}],136:[function(d,g,f){g.exports={getContentDimensions:d("./getContentDimensions"),getDimensions:d("./getDimensions"),getPagePosition:d("./getPagePosition"),getPercentInViewport:d("./getPercentInViewport"),getPixelsInViewport:d("./getPixelsInViewport"),getPosition:d("./getPosition"),getScrollX:d("./getScrollX"),getScrollY:d("./getScrollY"),getViewportPosition:d("./getViewportPosition"),isInViewport:d("./isInViewport")}
},{"./getContentDimensions":127,"./getDimensions":128,"./getPagePosition":129,"./getPercentInViewport":130,"./getPixelsInViewport":131,"./getPosition":132,"./getScrollX":133,"./getScrollY":134,"./getViewportPosition":135,"./isInViewport":137}],137:[function(h,l,i){var j=h("./getPixelsInViewport");
var m=h("./getPercentInViewport");l.exports=function k(b,a,d){var c;d=d||0;if(typeof d==="string"&&d.slice(-2)==="px"){d=parseInt(d,10);
c=j(b,a)}else{c=m(b,a)}return(c>0&&c>=d)}},{"./getPercentInViewport":130,"./getPixelsInViewport":131}],138:[function(i,h,f){h.exports=function g(b){var a=b.getBoundingClientRect();
return{top:a.top,right:a.right,bottom:a.bottom,left:a.left,width:a.width||a.right-a.left,height:a.height||a.bottom-a.top}
}},{}],139:[function(d,g,f){g.exports=8},{}],140:[function(d,g,f){g.exports=11},{}],141:[function(d,g,f){g.exports=9
},{}],142:[function(d,g,f){g.exports=10},{}],143:[function(d,g,f){g.exports=1},{}],144:[function(d,g,f){g.exports=3
},{}],145:[function(i,h,f){h.exports=function g(b){var c=document.createDocumentFragment();
var a;if(b){a=document.createElement("div");a.innerHTML=b;while(a.firstChild){c.appendChild(a.firstChild)
}}return c}},{}],146:[function(l,k,m){l("ac-polyfills/Array/prototype.slice");l("ac-polyfills/Array/prototype.filter");
var j=l("./internal/isNodeType");var i=l("./ELEMENT_NODE");k.exports=function h(a,b){b=b||i;
a=Array.prototype.slice.call(a);return a.filter(function(c){return j(c,b)})}},{"./ELEMENT_NODE":143,"./internal/isNodeType":154,"ac-polyfills/Array/prototype.filter":164,"ac-polyfills/Array/prototype.slice":166}],147:[function(i,h,g){h.exports=function f(a,b){if("hasAttribute" in a){return a.hasAttribute(b)
}return(a.attributes.getNamedItem(b)!==null)}},{}],148:[function(d,g,f){g.exports={createDocumentFragment:d("./createDocumentFragment"),filterByNodeType:d("./filterByNodeType"),hasAttribute:d("./hasAttribute"),indexOf:d("./indexOf"),insertAfter:d("./insertAfter"),insertBefore:d("./insertBefore"),insertFirstChild:d("./insertFirstChild"),insertLastChild:d("./insertLastChild"),isComment:d("./isComment"),isDocument:d("./isDocument"),isDocumentFragment:d("./isDocumentFragment"),isDocumentType:d("./isDocumentType"),isElement:d("./isElement"),isNode:d("./isNode"),isNodeList:d("./isNodeList"),isTextNode:d("./isTextNode"),remove:d("./remove"),replace:d("./replace"),COMMENT_NODE:d("./COMMENT_NODE"),DOCUMENT_FRAGMENT_NODE:d("./DOCUMENT_FRAGMENT_NODE"),DOCUMENT_NODE:d("./DOCUMENT_NODE"),DOCUMENT_TYPE_NODE:d("./DOCUMENT_TYPE_NODE"),ELEMENT_NODE:d("./ELEMENT_NODE"),TEXT_NODE:d("./TEXT_NODE")}
},{"./COMMENT_NODE":139,"./DOCUMENT_FRAGMENT_NODE":140,"./DOCUMENT_NODE":141,"./DOCUMENT_TYPE_NODE":142,"./ELEMENT_NODE":143,"./TEXT_NODE":144,"./createDocumentFragment":145,"./filterByNodeType":146,"./hasAttribute":147,"./indexOf":149,"./insertAfter":150,"./insertBefore":151,"./insertFirstChild":152,"./insertLastChild":153,"./isComment":156,"./isDocument":157,"./isDocumentFragment":158,"./isDocumentType":159,"./isElement":160,"./isNode":161,"./isNodeList":162,"./isTextNode":163,"./remove":167,"./replace":168}],149:[function(m,l,h){m("ac-polyfills/Array/prototype.indexOf");
m("ac-polyfills/Array/prototype.slice");var j=m("./internal/validate");var i=m("./filterByNodeType");
l.exports=function k(a,c){var d=a.parentNode;var b;if(!d){return 0}b=d.childNodes;
if(c!==false){b=i(b,c)}else{b=Array.prototype.slice.call(b)}return b.indexOf(a)
}},{"./filterByNodeType":146,"./internal/validate":155,"ac-polyfills/Array/prototype.indexOf":165,"ac-polyfills/Array/prototype.slice":166}],150:[function(g,k,h){var i=g("./internal/validate");
k.exports=function j(b,a){i.insertNode(b,true,"insertAfter");i.childNode(a,true,"insertAfter");
i.hasParentNode(a,"insertAfter");if(!a.nextSibling){return a.parentNode.appendChild(b)
}return a.parentNode.insertBefore(b,a.nextSibling)}},{"./internal/validate":155}],151:[function(k,j,h){var i=k("./internal/validate");
j.exports=function g(b,a){i.insertNode(b,true,"insertBefore");i.childNode(a,true,"insertBefore");
i.hasParentNode(a,"insertBefore");return a.parentNode.insertBefore(b,a)}},{"./internal/validate":155}],152:[function(k,j,g){var i=k("./internal/validate");
j.exports=function h(b,a){i.insertNode(b,true,"insertFirstChild");i.parentNode(a,true,"insertFirstChild");
if(!a.firstChild){return a.appendChild(b)}return a.insertBefore(b,a.firstChild)
}},{"./internal/validate":155}],153:[function(g,k,h){var j=g("./internal/validate");
k.exports=function i(b,a){j.insertNode(b,true,"insertLastChild");j.parentNode(a,true,"insertLastChild");
return a.appendChild(b)}},{"./internal/validate":155}],154:[function(g,k,h){var j=g("../isNode");
k.exports=function i(a,b){if(!j(a)){return false}if(typeof b==="number"){return(a.nodeType===b)
}return(b.indexOf(a.nodeType)!==-1)}},{"../isNode":161}],155:[function(z,B,w){var D=z("./isNodeType");
var C=z("../COMMENT_NODE");var v=z("../DOCUMENT_FRAGMENT_NODE");var x=z("../ELEMENT_NODE");
var y=z("../TEXT_NODE");var t=[x,y,C,v];var A=" must be an Element, TextNode, Comment, or Document Fragment";
var q=[x,y,C];var u=" must be an Element, TextNode, or Comment";var s=[x,v];var r=" must be an Element, or Document Fragment";
var E=" must have a parentNode";B.exports={parentNode:function(d,a,b,c){c=c||"target";
if((d||a)&&!D(d,s)){throw new TypeError(b+": "+c+r)}},childNode:function(d,a,b,c){c=c||"target";
if(!d&&!a){return}if(!D(d,q)){throw new TypeError(b+": "+c+u)}},insertNode:function(d,a,b,c){c=c||"node";
if(!d&&!a){return}if(!D(d,t)){throw new TypeError(b+": "+c+A)}},hasParentNode:function(c,a,b){b=b||"target";
if(!c.parentNode){throw new TypeError(a+": "+b+E)}}}},{"../COMMENT_NODE":139,"../DOCUMENT_FRAGMENT_NODE":140,"../ELEMENT_NODE":143,"../TEXT_NODE":144,"./isNodeType":154}],156:[function(m,l,i){var j=m("./internal/isNodeType");
var k=m("./COMMENT_NODE");l.exports=function h(a){return j(a,k)}},{"./COMMENT_NODE":139,"./internal/isNodeType":154}],157:[function(m,l,h){var j=m("./internal/isNodeType");
var i=m("./DOCUMENT_NODE");l.exports=function k(a){return j(a,i)}},{"./DOCUMENT_NODE":141,"./internal/isNodeType":154}],158:[function(m,l,h){var j=m("./internal/isNodeType");
var i=m("./DOCUMENT_FRAGMENT_NODE");l.exports=function k(a){return j(a,i)}},{"./DOCUMENT_FRAGMENT_NODE":140,"./internal/isNodeType":154}],159:[function(h,m,i){var j=h("./internal/isNodeType");
var k=h("./DOCUMENT_TYPE_NODE");m.exports=function l(a){return j(a,k)}},{"./DOCUMENT_TYPE_NODE":142,"./internal/isNodeType":154}],160:[function(m,l,h){var j=m("./internal/isNodeType");
var i=m("./ELEMENT_NODE");l.exports=function k(a){return j(a,i)}},{"./ELEMENT_NODE":143,"./internal/isNodeType":154}],161:[function(f,i,g){i.exports=function h(a){return !!(a&&a.nodeType)
}},{}],162:[function(k,j,g){var i=/^\[object (HTMLCollection|NodeList|Object)\]$/;
j.exports=function h(a){if(!a){return false}if(typeof a.length!=="number"){return false
}if(typeof a[0]==="object"&&(!a[0]||!a[0].nodeType)){return false}return i.test(Object.prototype.toString.call(a))
}},{}],163:[function(m,l,i){var j=m("./internal/isNodeType");var h=m("./TEXT_NODE");
l.exports=function k(a){return j(a,h)}},{"./TEXT_NODE":144,"./internal/isNodeType":154}],164:[function(d,g,f){g.exports=d(52)
},{}],165:[function(f,i,g){if(!Array.prototype.indexOf){Array.prototype.indexOf=function h(c,b){var a=b||0;
var d=0;if(a<0){a=this.length+b-1;if(a<0){throw"Wrapped past beginning of array while looking up a negative start index."
}}for(d=0;d<this.length;d++){if(this[d]===c){return d}}return(-1)}}},{}],166:[function(d,g,f){g.exports=d(66)
},{}],167:[function(k,j,g){var i=k("./internal/validate");j.exports=function h(a){i.childNode(a,true,"remove");
if(!a.parentNode){return a}return a.parentNode.removeChild(a)}},{"./internal/validate":155}],168:[function(g,j,h){var i=g("./internal/validate");
j.exports=function k(b,a){i.insertNode(b,true,"insertFirstChild","newNode");i.childNode(a,true,"insertFirstChild","oldNode");
i.hasParentNode(a,"insertFirstChild","oldNode");return a.parentNode.replaceChild(b,a)
}},{"./internal/validate":155}],169:[function(d,g,f){g.exports=d(76)},{"./ac-prefixer/Prefixer":170}],170:[function(d,g,f){g.exports=d(77)
},{"./Prefixer/camelCasedEvents":171}],171:[function(d,g,f){g.exports=d(78)},{}],172:[function(d,g,f){g.exports={getStyle:d("./ac-dom-styles/getStyle"),setStyle:d("./ac-dom-styles/setStyle")}
},{"./ac-dom-styles/getStyle":173,"./ac-dom-styles/setStyle":176}],173:[function(l,k,m){var j=l("ac-prefixer");
var h=l("./shim/getComputedStyle");k.exports=function i(){var c=Array.prototype.slice.call(arguments);
var g=c.shift(c);var a=h(g);var b={};var q;var f;var r;var d;if(typeof c[0]!=="string"){c=c[0]
}for(d=0;d<c.length;d++){q=c[d];f=j.getStyleProperty(q);if(f){q=j.stripPrefixes(f);
r=a[f];if(!r||r==="auto"){r=null}if(r){r=j.stripPrefixes(r)}}else{r=null}b[q]=r
}return b}},{"./shim/getComputedStyle":177,"ac-prefixer":169}],174:[function(j,i,k){var g={transform:["matrix","translate","translateX","translateY","scale","scaleX","scaleY","rotate","skewX","skewY","matrix3d","translate3d","translateZ","scale3d","scaleZ","rotate3d","rotateX","rotateY","rotateZ","perspective"],filter:["blur","brightness","contrast","drop-shadow","grayscale","hue-rotate","invert","saturate","sepia"]};
i.exports=function h(c){var a;var b;var d;var f;for(a in g){b=c[a]?c[a]:"";for(f=0;
f<g[a].length;f++){d=g[a][f];if(d in c){b+=" "+d+"("+c[d]+")";delete c[d]}}b=b.trim();
if(b){c[a]=b}}return c}},{}],175:[function(i,h,f){h.exports=function g(d){var b;
var a;var c;var n;var m;if(typeof d==="string"){b={};a=d.split(";");n=a.length;
for(m=0;m<n;m+=1){c=a[m].indexOf(":");if(c>0){b[a[m].substr(0,c).trim()]=a[m].substr(c+1).trim()
}}}else{b=d}return b}},{}],176:[function(n,m,o){var k=n("ac-prefixer");var i=n("./helpers/cssToObject");
var j=n("./helpers/combinePartialProperties");m.exports=function l(g,b){var c;var d;
var h;var f;var a;if((typeof b!=="string"&&typeof b!=="object")||Array.isArray(b)){throw new TypeError("setStyle: styles must be an Object or String")
}b=i(b);b=j(b);c="";for(h in b){a=b[h];if(!a&&a!==0){f=k.getStyleProperty(h);if("removeAttribute" in g.style){g.style.removeAttribute(f)
}else{g.style[f]=""}}else{d=k.getStyleCSS(h,a);if(d!==false){c+=" "+d}}}if(c.length){g.style.cssText+=c
}return g}},{"./helpers/combinePartialProperties":174,"./helpers/cssToObject":175,"ac-prefixer":169}],177:[function(d,g,f){g.exports=(function(){if("getComputedStyle" in window){return window.getComputedStyle
}return function(b){var i;var a;var c;i=b.currentStyle;for(a in i){if(a==="styleFloat"){c["float"]=c.cssFloat=i[a]
}else{c[a]=i[a]}}return c}}())},{}],178:[function(o,m,i){var l=o("ac-dom-nodes/isElement");
var j=o("./matchesSelector");var k=o("./internal/validate");m.exports=function n(a,b,c){k.childNode(a,true,"ancestors");
k.selector(b,false,"ancestors");if(c&&l(a)&&(!b||j(a,b))){return a}if(a!==document.body){while((a=a.parentNode)&&l(a)){if(!b||j(a,b)){return a
}if(a===document.body){break}}}return null}},{"./internal/validate":185,"./matchesSelector":187,"ac-dom-nodes/isElement":160}],179:[function(o,n,i){var l=o("ac-dom-nodes/isElement");
var j=o("./matchesSelector");var k=o("./internal/validate");n.exports=function m(a,c,d){var b=[];
k.childNode(a,true,"ancestors");k.selector(c,false,"ancestors");if(d&&l(a)&&(!c||j(a,c))){b.push(a)
}if(a!==document.body){while((a=a.parentNode)&&l(a)){if(!c||j(a,c)){b.push(a)}if(a===document.body){break
}}}return b}},{"./internal/validate":185,"./matchesSelector":187,"ac-dom-nodes/isElement":160}],180:[function(n,l,o){var i=n("ac-dom-nodes/filterByNodeType");
var j=n("./filterBySelector");var k=n("./internal/validate");l.exports=function m(a,c){var b;
k.parentNode(a,true,"children");k.selector(c,false,"children");b=a.children||a.childNodes;
b=i(b);if(c){b=j(b,c)}return b}},{"./filterBySelector":181,"./internal/validate":185,"ac-dom-nodes/filterByNodeType":146}],181:[function(l,k,m){l("ac-polyfills/Array/prototype.slice");
l("ac-polyfills/Array/prototype.filter");var h=l("./matchesSelector");var j=l("./internal/validate");
k.exports=function i(a,b){j.selector(b,true,"filterBySelector");a=Array.prototype.slice.call(a);
return a.filter(function(c){return h(c,b)})}},{"./internal/validate":185,"./matchesSelector":187,"ac-polyfills/Array/prototype.filter":190,"ac-polyfills/Array/prototype.slice":193}],182:[function(h,l,i){var m=h("./children");
var j=h("./internal/validate");l.exports=function k(a,c){var b;j.parentNode(a,true,"firstChild");
j.selector(c,false,"firstChild");if(a.firstElementChild&&!c){return a.firstElementChild
}b=m(a,c);if(b.length){return b[0]}return null}},{"./children":180,"./internal/validate":185}],183:[function(d,g,f){g.exports={ancestor:d("./ancestor"),ancestors:d("./ancestors"),children:d("./children"),filterBySelector:d("./filterBySelector"),firstChild:d("./firstChild"),lastChild:d("./lastChild"),matchesSelector:d("./matchesSelector"),nextSibling:d("./nextSibling"),nextSiblings:d("./nextSiblings"),previousSibling:d("./previousSibling"),previousSiblings:d("./previousSiblings"),querySelector:d("./querySelector"),querySelectorAll:d("./querySelectorAll"),siblings:d("./siblings")}
},{"./ancestor":178,"./ancestors":179,"./children":180,"./filterBySelector":181,"./firstChild":182,"./lastChild":186,"./matchesSelector":187,"./nextSibling":188,"./nextSiblings":189,"./previousSibling":194,"./previousSiblings":195,"./querySelector":196,"./querySelectorAll":197,"./siblings":200}],184:[function(d,g,f){g.exports=window.Element?(function(a){return a.matches||a.matchesSelector||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector
}(Element.prototype)):null},{}],185:[function(z,C,x){z("ac-polyfills/Array/prototype.indexOf");
var r=z("ac-dom-nodes/isNode");var D=z("ac-dom-nodes/COMMENT_NODE");var v=z("ac-dom-nodes/DOCUMENT_FRAGMENT_NODE");
var w=z("ac-dom-nodes/DOCUMENT_NODE");var y=z("ac-dom-nodes/ELEMENT_NODE");var A=z("ac-dom-nodes/TEXT_NODE");
var E=function(a,b){if(!r(a)){return false}if(typeof b==="number"){return(a.nodeType===b)
}return(b.indexOf(a.nodeType)!==-1)};var t=[y,w,v];var s=" must be an Element, Document, or Document Fragment";
var q=[y,A,D];var u=" must be an Element, TextNode, or Comment";var B=" must be a string";
C.exports={parentNode:function(d,a,b,c){c=c||"node";if((d||a)&&!E(d,t)){throw new TypeError(b+": "+c+s)
}},childNode:function(d,a,b,c){c=c||"node";if(!d&&!a){return}if(!E(d,q)){throw new TypeError(b+": "+c+u)
}},selector:function(d,a,b,c){c=c||"selector";if((d||a)&&typeof d!=="string"){throw new TypeError(b+": "+c+B)
}}}},{"ac-dom-nodes/COMMENT_NODE":139,"ac-dom-nodes/DOCUMENT_FRAGMENT_NODE":140,"ac-dom-nodes/DOCUMENT_NODE":141,"ac-dom-nodes/ELEMENT_NODE":143,"ac-dom-nodes/TEXT_NODE":144,"ac-dom-nodes/isNode":161,"ac-polyfills/Array/prototype.indexOf":192}],186:[function(h,l,i){var m=h("./children");
var j=h("./internal/validate");l.exports=function k(a,c){var b;j.parentNode(a,true,"lastChild");
j.selector(c,false,"lastChild");if(a.lastElementChild&&!c){return a.lastElementChild
}b=m(a,c);if(b.length){return b[b.length-1]}return null}},{"./children":180,"./internal/validate":185}],187:[function(p,o,q){var n=p("ac-dom-nodes/isElement");
var k=p("./internal/nativeMatches");var l=p("./internal/validate");var m=p("./vendor/sizzle/sizzle");
o.exports=function j(a,b){l.selector(b,true,"matchesSelector");if(!n(a)){return false
}if(!k){return m.matchesSelector(a,b)}return k.call(a,b)}},{"./internal/nativeMatches":184,"./internal/validate":185,"./vendor/sizzle/sizzle":201,"ac-dom-nodes/isElement":160}],188:[function(o,n,i){var m=o("ac-dom-nodes/isElement");
var j=o("./matchesSelector");var k=o("./internal/validate");n.exports=function l(a,b){k.childNode(a,true,"nextSibling");
k.selector(b,false,"nextSibling");if(a.nextElementSibling&&!b){return a.nextElementSibling
}while(a=a.nextSibling){if(m(a)){if(!b||j(a,b)){return a}}}return null}},{"./internal/validate":185,"./matchesSelector":187,"ac-dom-nodes/isElement":160}],189:[function(n,m,i){var l=n("ac-dom-nodes/isElement");
var j=n("./matchesSelector");var k=n("./internal/validate");m.exports=function o(a,c){var b=[];
k.childNode(a,true,"nextSiblings");k.selector(c,false,"nextSiblings");while(a=a.nextSibling){if(l(a)){if(!c||j(a,c)){b.push(a)
}}}return b}},{"./internal/validate":185,"./matchesSelector":187,"ac-dom-nodes/isElement":160}],190:[function(d,g,f){g.exports=d(52)
},{}],191:[function(f,i,g){if(!Array.prototype.forEach){Array.prototype.forEach=function h(a,b){var c=Object(this);
var l;var d;if(typeof a!=="function"){throw new TypeError("No function object passed to forEach.")
}for(l=0;l<this.length;l+=1){d=c[l];a.call(b,d,l,c)}}}},{}],192:[function(d,g,f){g.exports=d(165)
},{}],193:[function(d,g,f){g.exports=d(66)},{}],194:[function(o,n,i){var l=o("ac-dom-nodes/isElement");
var j=o("./matchesSelector");var k=o("./internal/validate");n.exports=function m(a,b){k.childNode(a,true,"previousSibling");
k.selector(b,false,"previousSibling");if(a.previousElementSibling&&!b){return a.previousElementSibling
}while(a=a.previousSibling){if(l(a)){if(!b||j(a,b)){return a}}}return null}},{"./internal/validate":185,"./matchesSelector":187,"ac-dom-nodes/isElement":160}],195:[function(o,n,i){var m=o("ac-dom-nodes/isElement");
var j=o("./matchesSelector");var k=o("./internal/validate");n.exports=function l(a,c){var b=[];
k.childNode(a,true,"previousSiblings");k.selector(c,false,"previousSiblings");while(a=a.previousSibling){if(m(a)){if(!c||j(a,c)){b.push(a)
}}}return b.reverse()}},{"./internal/validate":185,"./matchesSelector":187,"ac-dom-nodes/isElement":160}],196:[function(m,l,i){var j=m("./internal/validate");
var h=m("./shims/querySelector");l.exports=function k(b,a){a=a||document;j.parentNode(a,true,"querySelector","context");
j.selector(b,true,"querySelector");if(!a.querySelector){return h(b,a)}return a.querySelector(b)
}},{"./internal/validate":185,"./shims/querySelector":198}],197:[function(h,m,i){h("ac-polyfills/Array/prototype.slice");
var j=h("./internal/validate");var k=h("./shims/querySelectorAll");m.exports=function l(b,a){a=a||document;
j.parentNode(a,true,"querySelectorAll","context");j.selector(b,true,"querySelectorAll");
if(!a.querySelectorAll){return k(b,a)}return Array.prototype.slice.call(a.querySelectorAll(b))
}},{"./internal/validate":185,"./shims/querySelectorAll":199,"ac-polyfills/Array/prototype.slice":193}],198:[function(g,k,h){var j=g("./querySelectorAll");
k.exports=function i(b,a){var c=j(b,a);return c.length?c[0]:null}},{"./querySelectorAll":199}],199:[function(i,o,j){i("ac-polyfills/Array/prototype.forEach");
var l=i("../vendor/sizzle/sizzle");var k=i("../children");var m=i("ac-dom-nodes/isDocumentFragment");
o.exports=function n(d,b){var c;var a;if(m(b)){c=k(b);a=[];c.forEach(function(g){var f;
if(l.matchesSelector(g,d)){a.push(g)}f=l(d,g);if(f.length){a=a.concat(f)}});return a
}return l(d,b)}},{"../children":180,"../vendor/sizzle/sizzle":201,"ac-dom-nodes/isDocumentFragment":158,"ac-polyfills/Array/prototype.forEach":191}],200:[function(h,l,i){var m=h("./children");
var j=h("./internal/validate");l.exports=function k(a,c){var b=[];j.childNode(a,true,"siblings");
j.selector(c,false,"siblings");if(a.parentNode){b=m(a.parentNode,c);b=b.filter(function(d){return(d!==a)
})}return b}},{"./children":180,"./internal/validate":185}],201:[function(d,g,f){g.exports=d(105)
},{}],202:[function(f,i,g){if(!Array.prototype.every){Array.prototype.every=function h(a,b){var c=Object(this);
var l=c.length>>>0;var d;if(typeof a!=="function"){throw new TypeError(a+" is not a function")
}for(d=0;d<l;d+=1){if(d in c&&!a.call(b,c[d],d,c)){return false}}return true}}},{}],203:[function(d,g,f){g.exports={createBezier:d("./ac-easing/createBezier"),createPredefined:d("./ac-easing/createPredefined"),createStep:d("./ac-easing/createStep"),Ease:d("./ac-easing/Ease")}
},{"./ac-easing/Ease":204,"./ac-easing/createBezier":205,"./ac-easing/createPredefined":206,"./ac-easing/createStep":207}],204:[function(h,m,i){var j="Ease expects an easing function.";
function k(a,b){if(typeof a!=="function"){throw new TypeError(j)}this.easingFunction=a;
this.cssString=b||null}var l=k.prototype;l.getValue=function(a){return this.easingFunction(a,0,1,1)
};m.exports=k},{}],205:[function(i,o,j){i("ac-polyfills/Array/prototype.every");
var m=i("./Ease");var k=i("./helpers/KeySpline");var n="Bezier curve expects exactly four (4) numbers. Given: ";
o.exports=function l(r,b,s,c){var a=Array.prototype.slice.call(arguments);var f=a.every(function(p){return(typeof p==="number")
});if(a.length!==4||!f){throw new TypeError(n+a)}var d=new k(r,b,s,c);var h=function(q,w,p,v){return d.get(q/v)*p+w
};var g="cubic-bezier("+a.join(", ")+")";return new m(h,g)}},{"./Ease":204,"./helpers/KeySpline":208,"ac-polyfills/Array/prototype.every":202}],206:[function(q,s,p){var l=q("./createStep");
var o=q("./helpers/cssAliases");var r=q("./helpers/easingFunctions");var m=q("./Ease");
var n='Easing function "%TYPE%" not recognized among the following: '+Object.keys(r).join(", ");
s.exports=function k(b){var a;if(b==="step-start"){return l(1,"start")}else{if(b==="step-end"){return l(1,"end")
}else{a=r[b]}}if(!a){throw new Error(n.replace("%TYPE%",b))}return new m(a,o[b])
}},{"./Ease":204,"./createStep":207,"./helpers/cssAliases":209,"./helpers/easingFunctions":210}],207:[function(n,m,o){var l=n("./Ease");
var i="Step function expects a numeric value greater than zero. Given: ";var j='Step function direction must be either "start" or "end" (default). Given: ';
m.exports=function k(d,a){a=a||"end";if(typeof d!=="number"||d<1){throw new TypeError(i+d)
}if(a!=="start"&&a!=="end"){throw new TypeError(j+a)}var b=function(h,f,g,s){var t=g/d;
var u=Math[(a==="start")?"floor":"ceil"](h/s*d);return f+t*u};var c="steps("+d+", "+a+")";
return new l(b,c)}},{"./Ease":204}],208:[function(f,i,g){
/*! MIT License
 *
 * KeySpline - use bezier curve for transition easing function
 * Copyright (c) 2012 Gaetan Renaudeau <renaudeau.gaetan@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
;
function h(a,d,b,q){this.get=function(j){if(a===d&&b===q){return j}return t(p(j),d,q)
};function r(k,j){return 1-3*j+3*k}function s(k,j){return 3*j-6*k}function u(j){return 3*j
}function t(j,l,k){return((r(l,k)*j+s(l,k))*j+u(l))*j}function c(j,l,k){return 3*r(l,k)*j*j+2*s(l,k)*j+u(l)
}function p(k){var m=k;for(var l=0;l<4;++l){var j=c(m,a,b);if(j===0){return m}var n=t(m,a,b)-k;
m-=n/j}return m}}i.exports=h},{}],209:[function(i,h,f){var g={linear:"cubic-bezier(0, 0, 1, 1)",ease:"cubic-bezier(0.25, 0.1, 0.25, 1)","ease-in":"cubic-bezier(0.42, 0, 1, 1)","ease-out":"cubic-bezier(0, 0, 0.58, 1)","ease-in-out":"cubic-bezier(0.42, 0, 0.58, 1)","ease-in-cubic":"cubic-bezier(0.55, 0.055, 0.675, 0.19)","ease-out-cubic":"cubic-bezier(0.215, 0.61, 0.355, 1)","ease-in-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1)","ease-in-quad":"cubic-bezier(0.55, 0.085, 0.68, 0.53)","ease-out-quad":"cubic-bezier(0.25, 0.46, 0.45, 0.94)","ease-in-out-quad":"cubic-bezier(0.455, 0.03, 0.515, 0.955)","ease-in-quart":"cubic-bezier(0.895, 0.03, 0.685, 0.22)","ease-out-quart":"cubic-bezier(0.165, 0.84, 0.44, 1)","ease-in-out-quart":"cubic-bezier(0.77, 0, 0.175, 1)","ease-in-quint":"cubic-bezier(0.755, 0.05, 0.855, 0.06)","ease-out-quint":"cubic-bezier(0.23, 1, 0.32, 1)","ease-in-out-quint":"cubic-bezier(0.86, 0, 0.07, 1)","ease-in-sine":"cubic-bezier(0.47, 0, 0.745, 0.715)","ease-out-sine":"cubic-bezier(0.39, 0.575, 0.565, 1)","ease-in-out-sine":"cubic-bezier(0.445, 0.05, 0.55, 0.95)","ease-in-expo":"cubic-bezier(0.95, 0.05, 0.795, 0.035)","ease-out-expo":"cubic-bezier(0.19, 1, 0.22, 1)","ease-in-out-expo":"cubic-bezier(1, 0, 0, 1)","ease-in-circ":"cubic-bezier(0.6, 0.04, 0.98, 0.335)","ease-out-circ":"cubic-bezier(0.075, 0.82, 0.165, 1)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.15, 0.86)","ease-in-back":"cubic-bezier(0.6, -0.28, 0.735, 0.045)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.32, 1.275)","ease-in-out-back":"cubic-bezier(0.68, -0.55, 0.265, 1.55)"};
g.easeIn=g["ease-in"];g.easeOut=g["ease-out"];g.easeInOut=g["ease-in-out"];g.easeInCubic=g["ease-in-cubic"];
g.easeOutCubic=g["ease-out-cubic"];g.easeInOutCubic=g["ease-in-out-cubic"];g.easeInQuad=g["ease-in-quad"];
g.easeOutQuad=g["ease-out-quad"];g.easeInOutQuad=g["ease-in-out-quad"];g.easeInQuart=g["ease-in-quart"];
g.easeOutQuart=g["ease-out-quart"];g.easeInOutQuart=g["ease-in-out-quart"];g.easeInQuint=g["ease-in-quint"];
g.easeOutQuint=g["ease-out-quint"];g.easeInOutQuint=g["ease-in-out-quint"];g.easeInSine=g["ease-in-sine"];
g.easeOutSine=g["ease-out-sine"];g.easeInOutSine=g["ease-in-out-sine"];g.easeInExpo=g["ease-in-expo"];
g.easeOutExpo=g["ease-out-expo"];g.easeInOutExpo=g["ease-in-out-expo"];g.easeInCirc=g["ease-in-circ"];
g.easeOutCirc=g["ease-out-circ"];g.easeInOutCirc=g["ease-in-out-circ"];g.easeInBack=g["ease-in-back"];
g.easeOutBack=g["ease-out-back"];g.easeInOutBack=g["ease-in-out-back"];h.exports=g
},{}],210:[function(ay,aA,W){var S=ay("../createBezier");var af=S(0.25,0.1,0.25,1).easingFunction;
var aw=S(0.42,0,1,1).easingFunction;var Z=S(0,0,0.58,1).easingFunction;var ae=S(0.42,0,0.58,1).easingFunction;
var ah=function(b,d,a,c){return a*b/c+d};var av=function(b,d,a,c){return a*(b/=c)*b+d
};var O=function(b,d,a,c){return -a*(b/=c)*(b-2)+d};var Y=function(b,d,a,c){if((b/=c/2)<1){return a/2*b*b+d
}return -a/2*((--b)*(b-2)-1)+d};var au=function(b,d,a,c){return a*(b/=c)*b*b+d};
var aB=function(b,d,a,c){return a*((b=b/c-1)*b*b+1)+d};var at=function(b,d,a,c){if((b/=c/2)<1){return a/2*b*b*b+d
}return a/2*((b-=2)*b*b+2)+d};var an=function(b,d,a,c){return a*(b/=c)*b*b*b+d};
var ap=function(b,d,a,c){return -a*((b=b/c-1)*b*b*b-1)+d};var am=function(b,d,a,c){if((b/=c/2)<1){return a/2*b*b*b*b+d
}return -a/2*((b-=2)*b*b*b-2)+d};var ad=function(b,d,a,c){return a*(b/=c)*b*b*b*b+d
};var ag=function(b,d,a,c){return a*((b=b/c-1)*b*b*b*b+1)+d};var ac=function(b,d,a,c){if((b/=c/2)<1){return a/2*b*b*b*b*b+d
}return a/2*((b-=2)*b*b*b*b+2)+d};var az=function(b,d,a,c){return -a*Math.cos(b/c*(Math.PI/2))+a+d
};var Q=function(b,d,a,c){return a*Math.sin(b/c*(Math.PI/2))+d};var aa=function(b,d,a,c){return -a/2*(Math.cos(Math.PI*b/c)-1)+d
};var V=function(b,d,a,c){return(b===0)?d:a*Math.pow(2,10*(b/c-1))+d};var ab=function(b,d,a,c){return(b===c)?d+a:a*(-Math.pow(2,-10*b/c)+1)+d
};var ak=function(b,d,a,c){if(b===0){return d}else{if(b===c){return d+a}else{if((b/=c/2)<1){return a/2*Math.pow(2,10*(b-1))+d
}}}return a/2*(-Math.pow(2,-10*--b)+2)+d};var aq=function(b,d,a,c){return -a*(Math.sqrt(1-(b/=c)*b)-1)+d
};var ax=function(b,d,a,c){return a*Math.sqrt(1-(b=b/c-1)*b)+d};var T=function(b,d,a,c){if((b/=c/2)<1){return -a/2*(Math.sqrt(1-b*b)-1)+d
}return a/2*(Math.sqrt(1-(b-=2)*b)+1)+d};var X=function(c,f,a,d){var h=1.70158;
var b=0;var g=a;if(c===0){return f}else{if((c/=d)===1){return f+a}}if(!b){b=d*0.3
}if(g<Math.abs(a)){g=a;h=b/4}else{h=b/(2*Math.PI)*Math.asin(a/g)}return -(g*Math.pow(2,10*(c-=1))*Math.sin((c*d-h)*(2*Math.PI)/b))+f
};var U=function(c,f,a,d){var h=1.70158;var b=0;var g=a;if(c===0){return f}else{if((c/=d)===1){return f+a
}}if(!b){b=d*0.3}if(g<Math.abs(a)){g=a;h=b/4}else{h=b/(2*Math.PI)*Math.asin(a/g)
}return g*Math.pow(2,-10*c)*Math.sin((c*d-h)*(2*Math.PI)/b)+a+f};var ai=function(c,f,a,d){var h=1.70158;
var b=0;var g=a;if(c===0){return f}else{if((c/=d/2)===2){return f+a}}if(!b){b=d*(0.3*1.5)
}if(g<Math.abs(a)){g=a;h=b/4}else{h=b/(2*Math.PI)*Math.asin(a/g)}if(c<1){return -0.5*(g*Math.pow(2,10*(c-=1))*Math.sin((c*d-h)*(2*Math.PI)/b))+f
}return g*Math.pow(2,-10*(c-=1))*Math.sin((c*d-h)*(2*Math.PI)/b)*0.5+a+f};var aj=function(b,d,a,c,f){if(f===undefined){f=1.70158
}return a*(b/=c)*b*((f+1)*b-f)+d};var al=function(b,d,a,c,f){if(f===undefined){f=1.70158
}return a*((b=b/c-1)*b*((f+1)*b+f)+1)+d};var ar=function(b,d,a,c,f){if(f===undefined){f=1.70158
}if((b/=c/2)<1){return a/2*(b*b*(((f*=(1.525))+1)*b-f))+d}return a/2*((b-=2)*b*(((f*=(1.525))+1)*b+f)+2)+d
};var R=function(b,d,a,c){if((b/=c)<(1/2.75)){return a*(7.5625*b*b)+d}else{if(b<(2/2.75)){return a*(7.5625*(b-=(1.5/2.75))*b+0.75)+d
}else{if(b<(2.5/2.75)){return a*(7.5625*(b-=(2.25/2.75))*b+0.9375)+d}}}return a*(7.5625*(b-=(2.625/2.75))*b+0.984375)+d
};var ao=function(b,d,a,c){return a-R(c-b,0,a,c)+d};var P=function(b,d,a,c){if(b<c/2){return ao(b*2,0,a,c)*0.5+d
}return R(b*2-c,0,a,c)*0.5+a*0.5+d};aA.exports={linear:ah,ease:af,easeIn:aw,"ease-in":aw,easeOut:Z,"ease-out":Z,easeInOut:ae,"ease-in-out":ae,easeInCubic:au,"ease-in-cubic":au,easeOutCubic:aB,"ease-out-cubic":aB,easeInOutCubic:at,"ease-in-out-cubic":at,easeInQuad:av,"ease-in-quad":av,easeOutQuad:O,"ease-out-quad":O,easeInOutQuad:Y,"ease-in-out-quad":Y,easeInQuart:an,"ease-in-quart":an,easeOutQuart:ap,"ease-out-quart":ap,easeInOutQuart:am,"ease-in-out-quart":am,easeInQuint:ad,"ease-in-quint":ad,easeOutQuint:ag,"ease-out-quint":ag,easeInOutQuint:ac,"ease-in-out-quint":ac,easeInSine:az,"ease-in-sine":az,easeOutSine:Q,"ease-out-sine":Q,easeInOutSine:aa,"ease-in-out-sine":aa,easeInExpo:V,"ease-in-expo":V,easeOutExpo:ab,"ease-out-expo":ab,easeInOutExpo:ak,"ease-in-out-expo":ak,easeInCirc:aq,"ease-in-circ":aq,easeOutCirc:ax,"ease-out-circ":ax,easeInOutCirc:T,"ease-in-out-circ":T,easeInBack:aj,"ease-in-back":aj,easeOutBack:al,"ease-out-back":al,easeInOutBack:ar,"ease-in-out-back":ar,easeInElastic:X,"ease-in-elastic":X,easeOutElastic:U,"ease-out-elastic":U,easeInOutElastic:ai,"ease-in-out-elastic":ai,easeInBounce:ao,"ease-in-bounce":ao,easeOutBounce:R,"ease-out-bounce":R,easeInOutBounce:P,"ease-in-out-bounce":P}
},{"../createBezier":205}],211:[function(d,g,f){g.exports=d(26)},{}],212:[function(d,g,f){g.exports=d(27)
},{"./ac-object/clone":213,"./ac-object/create":214,"./ac-object/defaults":215,"./ac-object/extend":216,"./ac-object/getPrototypeOf":217,"./ac-object/isDate":218,"./ac-object/isEmpty":219,"./ac-object/isRegExp":220,"./ac-object/toQueryParameters":221}],213:[function(d,g,f){g.exports=d(28)
},{"./extend":216}],214:[function(d,g,f){g.exports=d(29)},{}],215:[function(d,g,f){g.exports=d(30)
},{"./extend":216}],216:[function(d,g,f){g.exports=d(31)},{}],217:[function(d,g,f){g.exports=d(32)
},{}],218:[function(d,g,f){g.exports=d(33)},{}],219:[function(d,g,f){g.exports=d(34)
},{}],220:[function(d,g,f){g.exports=d(35)},{}],221:[function(d,g,f){g.exports=d(36)
},{qs:211}],222:[function(f,h,g){var i=f("./ac-element-engagement/ElementEngagement");
h.exports=new i();h.exports.ElementEngagement=i},{"./ac-element-engagement/ElementEngagement":223}],223:[function(q,r,o){var n;
var p=q("ac-object");var m=q("ac-element-tracker").ElementTracker;var k={timeToEngage:500,inViewThreshold:0.75,stopOnEngaged:true};
var l={thresholdEnterTime:0,thresholdExitTime:0,inThreshold:false,engaged:false,tracking:true};
var s=function(){m.call(this)};n=s.prototype=p.create(m.prototype);n._decorateTrackedElement=function(b,c){var a;
a=p.defaults(k,c||{});p.extend(b,a);p.extend(b,l)};n._attachElementListeners=function(a){a.on("thresholdenter",this._thresholdEnter,this);
a.on("thresholdexit",this._thresholdExit,this);a.on("enterview",this._enterView,this);
a.on("exitview",this._exitView,this)};n._removeElementListeners=function(a){a.off("thresholdenter",this._thresholdEnter);
a.off("thresholdexit",this._thresholdExit);a.off("enterview",this._enterView);a.off("exitview",this._exitView)
};n._attachAllElementListeners=function(){this.elements.forEach(function(a){if(!a.stopOnEngaged){this._attachElementListeners(a)
}else{if(!a.engaged){this._attachElementListeners(a)}}},this)};n._removeAllElementListeners=function(){this.elements.forEach(function(a){this._removeElementListeners(a)
},this)};n._elementInViewPastThreshold=function(a){var c=this.windowDelegate.innerHeight();
var b=false;if(a.pixelsInView===c){b=true}else{b=(a.percentInView>a.inViewThreshold)
}return b};n._ifInView=function(c,a){var b=c.inThreshold;m.prototype._ifInView.apply(this,arguments);
if(!b&&this._elementInViewPastThreshold(c)){c.inThreshold=true;c.trigger("thresholdenter",c);
if(typeof c.timeToEngage==="number"&&c.timeToEngage>=0){c.engagedTimeout=window.setTimeout(this._engaged.bind(this,c),c.timeToEngage)
}}};n._ifAlreadyInView=function(b){var a=b.inThreshold;m.prototype._ifAlreadyInView.apply(this,arguments);
if(a&&!this._elementInViewPastThreshold(b)){b.inThreshold=false;b.trigger("thresholdexit",b);
if(b.engagedTimeout){window.clearTimeout(b.engagedTimeout);b.engagedTimeout=null
}}};n._engaged=function(a){a.engagedTimeout=null;this._elementEngaged(a);a.trigger("engaged",a);
this.trigger("engaged",a)};n._thresholdEnter=function(a){a.thresholdEnterTime=Date.now();
a.thresholdExitTime=0;this.trigger("thresholdenter",a)};n._thresholdExit=function(a){a.thresholdExitTime=Date.now();
this.trigger("thresholdexit",a)};n._enterView=function(a){this.trigger("enterview",a)
};n._exitView=function(a){this.trigger("exitview",a)};n._elementEngaged=function(a){a.engaged=true;
if(a.stopOnEngaged){this.stop(a)}};n.stop=function(a){if(this.tracking&&!a){this._removeAllElementListeners();
m.prototype.stop.call(this)}if(a&&a.tracking){a.tracking=false;this._removeElementListeners(a)
}};n.start=function(a){if(!a){this._attachAllElementListeners()}if(a&&!a.tracking){if(!a.stopOnEngaged){a.tracking=true;
this._attachElementListeners(a)}else{if(!a.engaged){a.tracking=true;this._attachElementListeners(a)
}}}if(!this.tracking){m.prototype.start.call(this)}else{this.refreshAllElementStates()
}};n.addElement=function(a,c){var b=m.prototype.addElement.call(this,a);this._decorateTrackedElement(b,c);
return b};n.addElements=function(a,b){[].forEach.call(a,function(c){this.addElement(c,b)
},this)};r.exports=s},{"ac-element-tracker":291,"ac-object":212}],224:[function(d,g,f){g.exports={flatten:d("./ac-array/flatten"),intersection:d("./ac-array/intersection"),toArray:d("./ac-array/toArray"),union:d("./ac-array/union"),unique:d("./ac-array/unique"),without:d("./ac-array/without")}
},{"./ac-array/flatten":225,"./ac-array/intersection":226,"./ac-array/toArray":227,"./ac-array/union":228,"./ac-array/unique":229,"./ac-array/without":230}],225:[function(f,i,g){i.exports=function h(a){var c=[];
var b=function(d){if(Array.isArray(d)){d.forEach(b)}else{c.push(d)}};a.forEach(b);
return c}},{}],226:[function(f,i,g){i.exports=function h(p){if(!p){return[]}var a=arguments.length;
var c=0;var j=p.length;var o=[];var b;for(c;c<j;c++){b=p[c];if(o.indexOf(b)>-1){continue
}for(var d=1;d<a;d++){if(arguments[d].indexOf(b)<0){break}}if(d===a){o.push(b)}}return o
}},{}],227:[function(f,h,g){h.exports=function i(a){return Array.prototype.slice.call(a)
}},{}],228:[function(h,m,i){var j=h("./flatten");var k=h("./unique");m.exports=function l(a){return k(j(Array.prototype.slice.call(arguments)))
}},{"./flatten":225,"./unique":229}],229:[function(f,i,g){i.exports=function h(a){var b=function(d,c){if(d.indexOf(c)<0){d.push(c)
}return d};return a.reduce(b,[])}},{}],230:[function(f,h,g){h.exports=function i(q,r,a){var c;
var o=q.indexOf(r);var b=q.length;if(o>=0){if(a){c=q.slice(0,b);var d,p=0;for(d=o;
d<b;d++){if(q[d]===r){c.splice(d-p,1);p++}}}else{if(o===(b-1)){c=q.slice(0,(b-1))
}else{if(o===0){c=q.slice(1)}else{c=q.slice(0,o);c=c.concat(q.slice(o+1))}}}}else{return q
}return c}},{}],231:[function(d,g,f){g.exports.DOMEmitter=d("./ac-dom-emitter/DOMEmitter")
},{"./ac-dom-emitter/DOMEmitter":232}],232:[function(i,o,j){var l;var m=i("ac-event-emitter").EventEmitter;
var n="dom-emitter";function k(a){if(a===null){return}this.el=a;this._bindings={};
this._eventEmitter=new m()}l=k.prototype;l._parseEventNames=function(a){if(!a){return[a]
}return a.split(" ")};l._onListenerEvent=function(a,b){this.trigger(a,b,false)};
l._setListener=function(a){this._bindings[a]=this._onListenerEvent.bind(this,a);
this._addEventListener(a,this._bindings[a])};l._removeListener=function(a){this._removeEventListener(a,this._bindings[a]);
delete this._bindings[a]};l._addEventListener=function(b,a,c){if(this.el.addEventListener){this.el.addEventListener(b,a,c)
}else{if(this.el.attachEvent){this.el.attachEvent("on"+b,a)}else{target["on"+b]=a
}}return this};l._removeEventListener=function(b,a,c){if(this.el.removeEventListener){this.el.removeEventListener(b,a,c)
}else{this.el.detachEvent("on"+b,a)}return this};l._triggerInternalEvent=function(b,a){this.trigger(n+":"+b,a)
};l.on=function(c,a,b){c=this._parseEventNames(c);c.forEach(function(g,d,f){if(!this.has(f)){this._setListener(f)
}this._triggerInternalEvent("willon",{evt:f,callback:g,context:d});this._eventEmitter.on(f,g,d);
this._triggerInternalEvent("didon",{evt:f,callback:g,context:d})}.bind(this,a,b));
return this};l.off=function(d,a,b){var c=Array.prototype.slice.call(arguments,0);
d=this._parseEventNames(d);d.forEach(function(g,h,s,f){if(s.length===0){this._eventEmitter.off();
var r;for(r in this._bindings){if(this._bindings.hasOwnProperty(r)){this._removeListener(r)
}}return}this._triggerInternalEvent("willoff",{evt:f,callback:g,context:h});this._eventEmitter.off(f,g,h);
this._triggerInternalEvent("didoff",{evt:f,callback:g,context:h});if(!this.has(f)){this._removeListener(f)
}}.bind(this,a,b,c));return this};l.once=function(c,a,b){c=this._parseEventNames(c);
c.forEach(function(g,d,f){if(!this.has(f)){this._setListener(f)}this._triggerInternalEvent("willonce",{evt:f,callback:g,context:d});
this._eventEmitter.once.call(this,f,g,d);this._triggerInternalEvent("didonce",{evt:f,callback:g,context:d})
}.bind(this,a,b));return this};l.has=function(c,a,b){if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};l.trigger=function(c,b,a){c=this._parseEventNames(c);c.forEach(function(d,g,f){this._eventEmitter.trigger(f,d,g)
}.bind(this,b,a));return this};l.destroy=function(){this._triggerInternalEvent("willdestroy");
this.off();this.el=this._eventEmitter=this._bindings=null};o.exports=k},{"ac-event-emitter":false}],233:[function(k,j,g){var h=k("./ac-dom-styles/vendorTransformHelper");
var i={};i.setStyle=function(d,c){var f;var b;var a;if((typeof c!=="string"&&typeof c!=="object")||Array.isArray(c)){throw new TypeError("styles argument must be either an object or a string")
}f=i.setStyle.__explodeStyleStringToObject(c);for(a in f){if(f.hasOwnProperty(a)){b=a.replace(/-(\w)/g,i.setStyle.__camelCaseReplace);
i.setStyle.__setStyle(d,b,f,f[a])}}return d};i.setStyle.__explodeStyleStringToObject=function(b){var d=(typeof b==="object")?b:{};
var a;var c;var n;var f;if(typeof b==="string"){a=b.split(";");n=a.length;for(f=0;
f<n;f+=1){c=a[f].indexOf(":");if(c>0){d[a[f].substr(0,c).trim()]=a[f].substr(c+1).trim()
}}}return d};i.setStyle.__setStyle=function(b,a,c,d){if(typeof b.style[a]!=="undefined"){b.style[a]=d
}};i.setStyle.__camelCaseReplace=function(c,b,a,d){return(a===0)&&(d.substr(1,3)!=="moz")?b:b.toUpperCase()
};i.getStyle=function(c,a,d){var b;a=a.replace(/-(\w)/g,i.setStyle.__camelCaseReplace);
a=(a==="float")?"cssFloat":a;d=d||window.getComputedStyle(c,null);b=d?d[a]:null;
if(a==="opacity"){return b?parseFloat(b):1}return b==="auto"?null:b};i.setVendorPrefixStyle=function(m,c,d){if(typeof c!=="string"){throw new TypeError("ac-dom-styles.setVendorPrefixStyle: property must be a string")
}if(typeof d!=="string"&&typeof d!=="number"){throw new TypeError("ac-dom-styles.setVendorPrefixStyle: value must be a string or a number")
}var f=["","webkit","Moz","ms","O"];var a;var b;d+="";c=c.replace(/-(webkit|moz|ms|o)-/i,"");
c=c.replace(/^(webkit|Moz|ms|O)/,"");c=c.charAt(0).toLowerCase()+c.slice(1);c=c.replace(/-(\w)/,function(l,o){return o.toUpperCase()
});d=d.replace(/-(webkit|moz|ms|o)-/,"-vendor-");f.forEach(function(l){a=(l==="")?c:l+c.charAt(0).toUpperCase()+c.slice(1);
b=(l==="")?d.replace("-vendor-",""):d.replace("-vendor-","-"+l.charAt(0).toLowerCase()+l.slice(1)+"-");
if(a in m.style){i.setStyle(m,a+":"+b)}})};i.getVendorPrefixStyle=function(c,a){if(typeof a!=="string"){throw new TypeError("ac-dom-styles.getVendorPrefixStyle: property must be a string")
}var b=["","webkit","Moz","ms","O"];var d;a=a.replace(/-(webkit|moz|ms|o)-/i,"");
a=a.replace(/^(webkit|Moz|ms|O)/,"").charAt(0).toLowerCase()+a.slice(1);a=a.replace(/-(\w)/,function(m,f){return f.toUpperCase()
});b.some(function(n,o){var f=(n==="")?a:n+a.charAt(0).toUpperCase()+a.slice(1);
if(f in c.style){d=i.getStyle(c,f);return true}});return d};i.setVendorPrefixTransform=function(b,a){if((typeof a!=="string"&&typeof a!=="object")||Array.isArray(a)||a===null){throw new TypeError("ac-dom-styles.setVendorPrefixTransform: transformFunctions argument must be either an object or a string")
}i.setVendorPrefixStyle(b,"transform",h.convert2dFunctions(a))};k("./ac-dom-styles/ie")(i);
j.exports=i},{"./ac-dom-styles/ie":234,"./ac-dom-styles/vendorTransformHelper":235}],234:[function(d,g,f){g.exports=function(a){if(typeof window.getComputedStyle!=="function"){a.getStyle=function(c,k,l){var m;
var b;l=l||c.currentStyle;if(l){k=k.replace(/-(\w)/g,a.setStyle.__camelCaseReplace);
k=k==="float"?"styleFloat":k;b=l[k]||null;return b==="auto"?null:b}}}}},{}],235:[function(i,h,f){var g={__objectifiedFunctions:{},__paramMaps:{translate:"p1, p2, 0",translateX:"p1, 0, 0",translateY:"0, p1, 0",scale:"p1, p2, 1",scaleX:"p1, 1, 1",scaleY:"1, p1, 1",rotate:"0, 0, 1, p1",matrix:"p1, p2, 0, 0, p3, p4, 0, 0, 0, 0, 1, 0, p5, p6, 0, 1"},convert2dFunctions:function(c){var d;
this.__init(c);for(var b in this.__objectifiedFunctions){if(this.__objectifiedFunctions.hasOwnProperty(b)){d=this.__objectifiedFunctions[b].replace(" ","").split(",");
if(b in this.__paramMaps){for(var a in this.__paramMaps){if(b===a){this.valuesToSet.push(this.__stripFunctionAxis(b)+"3d("+this.__map2DTransformParams(d,this.__paramMaps[b])+")")
}}}else{this.valuesToSet.push(b+"("+this.__objectifiedFunctions[b]+")")}}}return this.valuesToSet.join(" ")
},__init:function(a){this.valuesToSet=[];this.__objectifiedFunctions=(typeof a==="object")?a:{};
if(typeof a==="string"){this.__objectifiedFunctions=this.__objectifyFunctionString(a)
}},__map2DTransformParams:function(b,a){b.forEach(function(c,d){a=a.replace("p"+(d+1),c)
});return a},__splitFunctionStringToArray:function(a){return a.match(/[\w]+\(.+?\)/g)
},__splitFunctionNameAndParams:function(a){return a.match(/(.*)\((.*)\)/)},__stripFunctionAxis:function(a){return a.match(/([a-z]+)(|X|Y)$/)[1]
},__objectifyFunctionString:function(c){var b=this;var a;this.__splitFunctionStringToArray(c).forEach(function(d){a=b.__splitFunctionNameAndParams(d);
b.__objectifiedFunctions[a[1]]=a[2]});return this.__objectifiedFunctions}};h.exports=g
},{}],236:[function(i,o,j){var l=i("ac-dom-styles");var k={};var m=function(){return{x:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,y:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop}
};var n=function(){return{height:window.innerHeight||document.documentElement.clientHeight,width:window.innerWidth||document.documentElement.clientWidth}
};k.cumulativeOffset=function(c){var b=k.getBoundingBox(c);var d=m();var a=[b.top+d.y,b.left+d.x];
a.top=a[0];a.left=a[1];return a};k.getBoundingBox=function(b){var a=b.getBoundingClientRect();
var c=a.width||a.right-a.left;var d=a.height||a.bottom-a.top;return{top:a.top,right:a.right,bottom:a.bottom,left:a.left,width:c,height:d}
};k.getInnerDimensions=function(h){var g=k.getBoundingBox(h);var a=g.width;var f=g.height;
var b;var d;var c=window.getComputedStyle?window.getComputedStyle(h,null):null;
["padding","border"].forEach(function(q){["Top","Right","Bottom","Left"].forEach(function(p){b=q==="border"?q+p+"Width":q+p;
d=parseFloat(l.getStyle(h,b,c));d=isNaN(d)?0:d;if(p==="Right"||p==="Left"){a-=d
}if(p==="Top"||p==="Bottom"){f-=d}})});return{width:a,height:f}};k.getOuterDimensions=function(b){var g=k.getBoundingBox(b);
var c=g.width;var f=g.height;var a;var d=window.getComputedStyle?window.getComputedStyle(b,null):null;
["margin"].forEach(function(h){["Top","Right","Bottom","Left"].forEach(function(q){a=parseFloat(l.getStyle(b,h+q,d));
a=isNaN(a)?0:a;if(q==="Right"||q==="Left"){c+=a}if(q==="Top"||q==="Bottom"){f+=a
}})});return{width:c,height:f}};k.pixelsInViewport=function(c,d){var b;var a=n();
d=d||k.getBoundingBox(c);var f=d.top;if(f>=0){b=a.height-f;if(b>d.height){b=d.height
}}else{b=d.height+f}if(b<0){b=0}if(b>a.height){b=a.height}return b};k.percentInViewport=function(b){var c=k.getBoundingBox(b);
var a=k.pixelsInViewport(b,c);return a/c.height};k.isInViewport=function(a,b){var c=k.percentInViewport(a);
if(typeof b!=="number"||1<b||b<0){b=0}return(c>b||c===1)};i("./ac-dom-metrics/ie")(k);
o.exports=k},{"./ac-dom-metrics/ie":237,"ac-dom-styles":233}],237:[function(d,g,f){g.exports=function(a){if(!("getBoundingClientRect" in document.createElement("_"))){a.getBoundingBox=function(k){var b=k.offsetLeft;
var c=k.offsetTop;var l=k.offsetWidth;var m=k.offsetHeight;return{top:c,right:b+l,bottom:c+m,left:b,width:l,height:m}
}}}},{}],238:[function(d,g,f){g.exports=d(26)},{}],239:[function(d,g,f){g.exports=d(27)
},{"./ac-object/clone":240,"./ac-object/create":241,"./ac-object/defaults":242,"./ac-object/extend":243,"./ac-object/getPrototypeOf":244,"./ac-object/isDate":245,"./ac-object/isEmpty":246,"./ac-object/isRegExp":247,"./ac-object/toQueryParameters":248}],240:[function(d,g,f){g.exports=d(28)
},{"./extend":243}],241:[function(d,g,f){g.exports=d(29)},{}],242:[function(d,g,f){g.exports=d(30)
},{"./extend":243}],243:[function(d,g,f){g.exports=d(31)},{}],244:[function(d,g,f){g.exports=d(32)
},{}],245:[function(d,g,f){g.exports=d(33)},{}],246:[function(d,g,f){g.exports=d(34)
},{}],247:[function(d,g,f){g.exports=d(35)},{}],248:[function(d,g,f){g.exports=d(36)
},{qs:238}],249:[function(g,j,h){var k={};k.addEventListener=function(a,c,b,d){if(a.addEventListener){a.addEventListener(c,b,d)
}else{if(a.attachEvent){a.attachEvent("on"+c,b)}else{a["on"+c]=b}}return a};k.dispatchEvent=function(a,b){if(document.createEvent){a.dispatchEvent(new CustomEvent(b))
}else{a.fireEvent("on"+b,document.createEventObject())}return a};k.removeEventListener=function(a,c,b,d){if(a.removeEventListener){a.removeEventListener(c,b,d)
}else{a.detachEvent("on"+c,b)}return a};var i=/^(webkit|moz|ms|o)/i;k.addVendorPrefixEventListener=function(a,c,b,d){if(i.test(c)){c=c.replace(i,"")
}else{c=c.charAt(0).toUpperCase()+c.slice(1)}if(/WebKit/i.test(window.navigator.userAgent)){return k.addEventListener(a,"webkit"+c,b,d)
}else{if(/Opera/i.test(window.navigator.userAgent)){return k.addEventListener(a,"O"+c,b,d)
}else{if(/Gecko/i.test(window.navigator.userAgent)){return k.addEventListener(a,c.toLowerCase(),b,d)
}else{c=c.charAt(0).toLowerCase()+c.slice(1);return k.addEventListener(a,c,b,d)
}}}};k.removeVendorPrefixEventListener=function(a,c,b,d){if(i.test(c)){c=c.replace(i,"")
}else{c=c.charAt(0).toUpperCase()+c.slice(1)}k.removeEventListener(a,"webkit"+c,b,d);
k.removeEventListener(a,"O"+c,b,d);k.removeEventListener(a,c.toLowerCase(),b,d);
c=c.charAt(0).toLowerCase()+c.slice(1);return k.removeEventListener(a,c,b,d)};k.stop=function(a){if(!a){a=window.event
}if(a.stopPropagation){a.stopPropagation()}else{a.cancelBubble=true}if(a.preventDefault){a.preventDefault()
}a.stopped=true;a.returnValue=false};k.target=function(a){return(typeof a.target!=="undefined")?a.target:a.srcElement
};j.exports=k},{}],250:[function(d,g,f){g.exports=d(87)},{"./ac-dom-traversal/ancestor":251,"./ac-dom-traversal/ancestors":252,"./ac-dom-traversal/children":253,"./ac-dom-traversal/filterBySelector":254,"./ac-dom-traversal/firstChild":255,"./ac-dom-traversal/lastChild":258,"./ac-dom-traversal/matchesSelector":259,"./ac-dom-traversal/nextSibling":260,"./ac-dom-traversal/nextSiblings":261,"./ac-dom-traversal/previousSibling":262,"./ac-dom-traversal/previousSiblings":263,"./ac-dom-traversal/querySelector":264,"./ac-dom-traversal/querySelectorAll":265,"./ac-dom-traversal/shims/ie":266,"./ac-dom-traversal/siblings":267}],251:[function(d,g,f){g.exports=d(88)
},{"./helpers/validate":257,"./matchesSelector":259,"ac-dom-nodes":148}],252:[function(d,g,f){g.exports=d(89)
},{"./helpers/validate":257,"./matchesSelector":259,"ac-dom-nodes":148}],253:[function(d,g,f){g.exports=d(90)
},{"./filterBySelector":254,"./helpers/validate":257,"ac-dom-nodes":148}],254:[function(d,g,f){g.exports=d(91)
},{"./helpers/validate":257,"./matchesSelector":259}],255:[function(d,g,f){g.exports=d(92)
},{"./children":253,"./helpers/validate":257}],256:[function(d,g,f){g.exports=d(93)
},{}],257:[function(d,g,f){g.exports=d(94)},{"ac-dom-nodes":148}],258:[function(d,g,f){g.exports=d(95)
},{"./children":253,"./helpers/validate":257}],259:[function(d,g,f){g.exports=d(96)
},{"./helpers/nativeMatches":256,"./helpers/validate":257,"ac-dom-nodes":148}],260:[function(d,g,f){g.exports=d(97)
},{"./helpers/validate":257,"./matchesSelector":259,"ac-dom-nodes":148}],261:[function(d,g,f){g.exports=d(98)
},{"./helpers/validate":257,"./matchesSelector":259,"ac-dom-nodes":148}],262:[function(d,g,f){g.exports=d(99)
},{"./helpers/validate":257,"./matchesSelector":259,"ac-dom-nodes":148}],263:[function(d,g,f){g.exports=d(100)
},{"./helpers/validate":257,"./matchesSelector":259,"ac-dom-nodes":148}],264:[function(d,g,f){g.exports=d(101)
},{"./helpers/validate":257}],265:[function(d,g,f){g.exports=d(102)},{"./helpers/validate":257}],266:[function(d,g,f){g.exports=d(103)
},{"../helpers/nativeMatches":256,"../helpers/validate":257,"../vendor/sizzle/sizzle":268,"ac-dom-nodes":148}],267:[function(d,g,f){g.exports=d(104)
},{"./children":253,"./helpers/validate":257}],268:[function(d,g,f){g.exports=d(105)
},{}],269:[function(d,g,f){g.exports={DOMEmitter:d("./ac-dom-emitter/DOMEmitter")}
},{"./ac-dom-emitter/DOMEmitter":270}],270:[function(q,r,p){var o;var k=q("ac-event-emitter").EventEmitter,n=q("ac-dom-events"),s=q("ac-dom-traversal");
var l="dom-emitter";function m(a){if(a===null){return}this.el=a;this._bindings={};
this._delegateFuncs={};this._eventEmitter=new k()}o=m.prototype;o._parseEventNames=function(a){if(!a){return[a]
}return a.split(" ")};o._onListenerEvent=function(a,b){this.trigger(a,b,false)};
o._setListener=function(a){this._bindings[a]=this._onListenerEvent.bind(this,a);
n.addEventListener(this.el,a,this._bindings[a])};o._removeListener=function(a){n.removeEventListener(this.el,a,this._bindings[a]);
this._bindings[a]=null};o._triggerInternalEvent=function(b,a){this.trigger(l+":"+b,a)
};o._normalizeArgumentsAndCall=function(c,a){var d={};if(c.length===0){a.call(this,d);
return}if(typeof c[0]==="string"||c[0]===null){c=this._cleanStringData(c);d.events=c[0];
if(typeof c[1]==="string"){d.delegateQuery=c[1];d.callback=c[2];d.context=c[3]}else{d.callback=c[1];
d.context=c[2]}a.call(this,d);return}var b,g,f=":",h=c[0];for(b in h){if(h.hasOwnProperty(b)){d={};
g=this._cleanStringData(b.split(f));d.events=g[0];d.delegateQuery=g[1];d.callback=h[b];
d.context=c[1];a.call(this,d)}}};o._registerDelegateFunc=function(a,f,d,c,g){var b=this._delegateFunc.bind(this,a,f,d,g);
this._delegateFuncs[f]=this._delegateFuncs[f]||{};this._delegateFuncs[f][a]=this._delegateFuncs[f][a]||[];
this._delegateFuncs[f][a].push({func:c,context:g,delegateFunc:b});return b};o._cleanStringData=function(i){var a=false;
if(typeof i==="string"){i=[i];a=true}var b=[],g,d,f,h,c=i.length;for(g=0;g<c;g++){d=i[g];
if(typeof d==="string"){if(d===""||d===" "){continue}f=d.length;while(d[0]===" "){d=d.slice(1,f);
f--}while(d[f-1]===" "){d=d.slice(0,f-1);f--}}b.push(d)}if(a){return b[0]}return b
};o._unregisterDelegateFunc=function(a,d,c,f){if(!this._delegateFuncs[d]||!this._delegateFuncs[d][a]){return
}var g=this._getDelegateFuncBindingIdx(a,d,c,f),b;if(g>-1){b=this._delegateFuncs[d][a][g].delegateFunc;
this._delegateFuncs[d][a].splice(g,1);if(this._delegateFuncs[d][a].length===0){this._delegateFuncs[d][a]=null
}}return b};o._unregisterDelegateFuncs=function(c,a){if(!this._delegateFuncs[a]){return
}if(c!==null&&!this._delegateFuncs[a][c]){return}if(c===null){var b;for(b in this._delegateFuncs[a]){if(this._delegateFuncs[a].hasOwnProperty(b)){this._unbindDelegateFunc(b,a)
}}return}this._unbindDelegateFunc(c,a)};o._unbindDelegateFunc=function(c,a){var f,d,b=0;
while(this._delegateFuncs[a][c]&&this._delegateFuncs[a][c][b]){f=this._delegateFuncs[a][c][b];
d=this._delegateFuncs[a][c][b].length;this._off({events:c,delegateQuery:a,callback:f.func,context:f.context});
if(this._delegateFuncs[a][c]&&d===this._delegateFuncs[a][c].length){b++}}f=d=null
};o._unregisterDelegateFuncsByEvent=function(b){var a;for(a in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(a)){this._unregisterDelegateFuncs(b,a)
}}};o._delegateFunc=function(c,g,d,a,f){if(s.matchesSelector(n.target(f),g)){var b=Array.prototype.slice.call(arguments,0),h=b.slice(4,b.length);
a=a||window;if(typeof f.detail==="object"){h[0]=f.detail}d.call(a,h)}};o.on=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._on);
return this};o.once=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._once);
return this};o.off=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._off);
return this};o._on=function(f){var b=f.events,d=f.callback,g=f.delegateQuery,a=f.context,c=f.unboundCallback||d;
b=this._parseEventNames(b);b.forEach(function(h,w,j,i,v){if(!this.has(v)){this._setListener(v)
}if(typeof i==="string"){h=this._registerDelegateFunc(v,i,h,w,j)}this._triggerInternalEvent("willon",{evt:v,callback:h,context:j,delegateQuery:i});
this._eventEmitter.on(v,h,j);this._triggerInternalEvent("didon",{evt:v,callback:h,context:j,delegateQuery:i})
}.bind(this,d,c,a,g));b=d=c=g=a=null};o._off=function(f){var b=f.events,d=f.callback,g=f.delegateQuery,h=f.context,c=f.unboundCallback||d;
if(typeof b==="undefined"){this._eventEmitter.off();var a;for(a in this._bindings){if(this._bindings.hasOwnProperty(a)){this._removeListener(a)
}}for(a in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(a)){this._delegateFuncs[a]=null
}}return}b=this._parseEventNames(b);b.forEach(function(i,y,w,j,x){if(typeof j==="string"&&typeof y==="function"){i=this._unregisterDelegateFunc(x,j,y,w);
if(!i){return}}if(typeof j==="string"&&typeof i==="undefined"){this._unregisterDelegateFuncs(x,j);
return}if(typeof x==="string"&&typeof i==="undefined"){this._unregisterDelegateFuncsByEvent(x);
if(typeof j==="string"){return}}this._triggerInternalEvent("willoff",{evt:x,callback:i,context:w,delegateQuery:j});
this._eventEmitter.off(x,i,w);this._triggerInternalEvent("didoff",{evt:x,callback:i,context:w,delegateQuery:j});
if(!this.has(x)){this._removeListener(x)}}.bind(this,d,c,h,g));b=d=c=g=h=null};
o._once=function(f){var c=f.events,d=f.callback,a=f.delegateQuery,b=f.context;c=this._parseEventNames(c);
c.forEach(function(g,i,h,j){if(typeof h==="string"){return this._handleDelegateOnce(j,g,i,h)
}if(!this.has(j)){this._setListener(j)}this._triggerInternalEvent("willonce",{evt:j,callback:g,context:i,delegateQuery:h});
this._eventEmitter.once.call(this,j,g,i);this._triggerInternalEvent("didonce",{evt:j,callback:g,context:i,delegateQuery:h})
}.bind(this,d,b,a));c=d=a=b=null};o._handleDelegateOnce=function(c,d,b,a){this._triggerInternalEvent("willonce",{evt:c,callback:d,context:b,delegateQuery:a});
this._on({events:c,context:b,delegateQuery:a,callback:this._getDelegateOnceCallback.bind(this,c,d,b,a),unboundCallback:d});
this._triggerInternalEvent("didonce",{evt:c,callback:d,context:b,delegateQuery:a});
return this};o._getDelegateOnceCallback=function(c,d,a,f){var b=Array.prototype.slice.call(arguments,0),g=b.slice(4,b.length);
d.apply(a,g);this._off({events:c,delegateQuery:f,callback:d,context:a})};o._getDelegateFuncBindingIdx=function(a,d,g,i,j){var b=-1;
if(this._delegateFuncs[d]&&this._delegateFuncs[d][a]){var f,h,c=this._delegateFuncs[d][a].length;
for(f=0;f<c;f++){h=this._delegateFuncs[d][a][f];if(j&&typeof g==="undefined"){g=h.func
}if(h.func===g&&h.context===i){b=f;break}}}return b};o._triggerDelegateEvents=function(i,g,f){var a=s.querySelectorAll(g,this.el);
var h,d,c=a.length;for(h=0;h<c;h++){d=a[h];if(document.createEvent){d.dispatchEvent(new CustomEvent(i,{bubbles:true,cancelable:false,detail:f}))
}else{var b=document.createEventObject();b.detail=f;d.fireEvent("on"+i,b)}return d
}};o.has=function(c,f,g,a){var h,d;if(typeof f==="string"){h=f;d=g}else{d=f;a=g
}if(h){var b=this._getDelegateFuncBindingIdx(c,h,d,a,true);if(b>-1){return true
}return false}if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};o.trigger=function(b,c,a,d){b=this._parseEventNames(b);var g,f;if(typeof c==="string"){g=this._cleanStringData(c);
f=a}else{f=c;d=a}b=this._cleanStringData(b);b.forEach(function(j,i,h,u){if(j){this._triggerDelegateEvents(u,j,i);
return}this._eventEmitter.trigger(u,i,h)}.bind(this,g,f,d));return this};o.propagateTo=function(b,a){this._eventEmitter.propagateTo(b,a);
return this};o.stopPropagatingTo=function(a){this._eventEmitter.stopPropagatingTo(a);
return this};o.destroy=function(){this._triggerInternalEvent("willdestroy");this.off();
this.el=this._eventEmitter=this._bindings=this._delegateFuncs=null};r.exports=m
},{"ac-dom-events":249,"ac-dom-traversal":250,"ac-event-emitter":false}],271:[function(d,g,f){g.exports={SharedInstance:d("./ac-shared-instance/SharedInstance")}
},{"./ac-shared-instance/SharedInstance":272}],272:[function(p,m,q){var l=window,n="AC",k="SharedInstance",o=l[n];
var j=(function(){var a={};return{get:function(c,d){var b=null;if(a[c]&&a[c][d]){b=a[c][d]
}return b},set:function(b,d,c){if(!a[b]){a[b]={}}if(typeof c==="function"){a[b][d]=new c()
}else{a[b][d]=c}return a[b][d]},share:function(b,d,c){var f=this.get(b,d);if(!f){f=this.set(b,d,c)
}return f},remove:function(c,d){var b=typeof d;if(b==="string"||b==="number"){if(!a[c]||!a[c][d]){return
}a[c][d]=null;return}if(a[c]){a[c]=null}}}}());if(!o){o=l[n]={}}if(!o[k]){o[k]=j
}m.exports=o[k]},{}],273:[function(d,g,f){g.exports={WindowDelegate:d("./ac-window-delegate/WindowDelegate"),WindowDelegateOptimizer:d("./ac-window-delegate/WindowDelegateOptimizer"),WindowDelegateCustomEvent:d("./ac-window-delegate/WindowDelegateCustomEvent")}
},{"./ac-window-delegate/WindowDelegate":276,"./ac-window-delegate/WindowDelegateCustomEvent":277,"./ac-window-delegate/WindowDelegateOptimizer":278}],274:[function(h,m,i){var k=h("ac-event-emitter").EventEmitter;
var j=function(){this._emitter=new k();this._customEvents={}};var l=j.prototype;
l.on=function(c,a,b){this._activateCustomEvents(c);this._emitterOn.apply(this,arguments);
return this};l.once=function(c,a,b){this._emitterOnce.apply(this,arguments);return this
};l.off=function(c,a,b){this._emitterOff.apply(this,arguments);this._deactivateCustomEvents(c);
return this};l.has=function(c,a,b){return this._emitter.has.apply(this._emitter,arguments)
};l.trigger=function(){this._emitter.trigger.apply(this._emitter,arguments);return this
};l.propagateTo=function(){this._emitter.propagateTo.apply(this._emitter,arguments);
return this};l.stopPropagatingTo=function(){this._emitter.stopPropagatingTo.apply(this._emitter,arguments);
return this};l.add=function(a){this._customEvents[a.name]=a};l.canHandleCustomEvent=function(a){return this._customEvents.hasOwnProperty(a)
};l.isHandlingCustomEvent=function(a){if(this._customEvents[a]&&this._customEvents[a].active){return true
}return false};l._activateCustomEvents=function(b){var d=b.split(" "),c,a,f=d.length;
for(a=0;a<f;a++){c=d[a];if(this._customEvents[c]&&!this._customEvents[c].active){this._customEvents[c].initialize();
this._customEvents[c].active=true}}};l._deactivateCustomEvents=function(b){var a;
if(!b||b.length===0){for(a in this._customEvents){if(this._customEvents.hasOwnProperty(a)){this._deactivateCustomEvent(a)
}}return}var c=b.split(" "),d=c.length;for(a=0;a<d;a++){this._deactivateCustomEvent(c[a])
}};l._deactivateCustomEvent=function(a){if(!this.has(a)&&this._customEvents[a]&&this._customEvents[a].active){this._customEvents[a].deinitialize();
this._customEvents[a].active=false}};l._emitterOn=function(){this._emitter.on.apply(this._emitter,arguments)
};l._emitterOnce=function(){this._emitter.once.apply(this._emitter,arguments)};
l._emitterOff=function(){this._emitter.off.apply(this._emitter,arguments)};m.exports=j
},{"ac-event-emitter":false}],275:[function(h,m,i){var j=h("ac-event-emitter").EventEmitter;
var k;var l=function(a){j.call(this);this.optimizers=a;this._events={};this._properties={};
this._initialize()};k=l.prototype=new j(null);k.canOptimizeEvent=function(a){return this._events.hasOwnProperty(a)
};k.canOptimizeProperty=function(a){return this._properties.hasOwnProperty(a)};
k.isOptimizingEvent=function(a){if(this._events[a]&&this._events[a].active){return true
}return false};k.isOptimizingProperty=function(a){if(this._properties[a]&&this._properties[a].active){return true
}return false};k.add=function(a){this._setOptimizerEvents(a);this._setOptimizerProperties(a);
a.on("update",this._onUpdate,this);a.on("activate",this._onActivate,this);a.on("deactivate",this._onDeactivate,this)
};k.get=function(a){if(this.isOptimizingProperty(a)){return this._properties[a].value
}return null};k.set=function(a,b){if(!this._properties[a]){return false}this._properties[a].value=b;
return this};k.getOptimizerByEvent=function(a){if(this._events[a]){return this._events[a]
}return null};k._initialize=function(){var a,b;for(a in this.optimizers){if(this.optimizers.hasOwnProperty(a)){this.add(this.optimizers[a])
}}};k._onUpdate=function(a){this.set(a.prop,a.val)};k._onActivate=function(c){var b=c.propertyNames,a,d=b.length;
for(a=0;a<d;a++){this._properties[b[a]].active=true}};k._onDeactivate=function(c){var b=c.propertyNames,a,d=b.length;
for(a=0;a<d;a++){this._properties[b[a]].active=false}};k._setOptimizerEvents=function(c){var a,b=c.eventNames,d=b.length;
for(a=0;a<d;a++){this._setOptimizerEvent(b[a],c)}};k._setOptimizerEvent=function(a,b){if(this._events[a]){return
}this._events[a]=b};k._setOptimizerProperties=function(b){var a,c=b.propertyNames,d=c.length;
for(a=0;a<d;a++){this._setOptimizerProperty(c[a])}};k._setOptimizerProperty=function(a){if(this._properties.hasOwnProperty(a)){return
}this._properties[a]={};this._properties[a].active=false;this._properties[a].value=null
};m.exports=l},{"ac-event-emitter":false}],276:[function(x,z,v){var t;var y=x("ac-shared-instance").SharedInstance,q=x("ac-dom-emitter").DOMEmitter,s=x("./OptimizerController"),w=x("./CustomEventController"),u=x("./queries/queries"),p=x("./optimizers/optimizers");
var r="ac-window-delegate:WindowDelegate",A="2.0.1";function o(){this._emitter=new q(window);
this._controllers={optimizer:new s(p),customEvent:new w()};var a;for(a in u){if(u.hasOwnProperty(a)){this[a]=this._getProperty.bind(this,a);
u[a]=u[a].bind(this)}}this._bindEvents()}t=o.prototype;t.on=function(d,a,c){var b=this._seperateCustomEvents(d);
this._optimizeEvents(b.standardEvents);this._customEventOn(b.customEvents,a,c);
this._emitterOn.apply(this,arguments);return this};t.once=function(d,a,c){var b=this._seperateCustomEvents(d);
this._optimizeEvents(b.standardEvents);this._customEventOnce(b.customEvents,a,c);
this._emitterOnce.apply(this,arguments);return this};t.off=function(g,a,f){var b=this._seperateCustomEvents(g),d=false;
if(!g){d=true}this._customEventOff(b.customEvents,a,f,d);this._emitterOff.apply(this,arguments);
if(d){try{var h;for(h in this._controllers.optimizer._events){if(this._controllers.optimizer._events.hasOwnProperty(h)&&this._shouldDeoptimizeEvent(h,true)){this._deoptimizeEvent(h)
}}this._bindEvents()}catch(c){}}return this};t.has=function(c,a,b){return this._emitter.has.apply(this._emitter,arguments)
};t.trigger=function(){this._emitter.trigger.apply(this._emitter,arguments);return this
};t.propagateTo=function(){this._emitter.propagateTo.apply(this._emitter,arguments);
return this};t.stopPropagatingTo=function(){this._emitter.stopPropagatingTo.apply(this._emitter,arguments);
return this};t.addOptimizer=function(a){this._controllers.optimizer.add(a);return this
};t.addCustomEvent=function(a){this._controllers.customEvent.add(a);return this
};t._emitterOn=function(){this._emitter.on.apply(this._emitter,arguments)};t._emitterOnce=function(){this._emitter.once.apply(this._emitter,arguments)
};t._emitterOff=function(){this._emitter.off.apply(this._emitter,arguments)};t._onEventUnbound=function(a){var b=a.evt;
if(this._shouldDeoptimizeEvent(b)){this._deoptimizeEvent(b)}};t._customEventOn=function(c,a,b){if(c.length===0){return
}this._controllers.customEvent.on(c.join(" "),a,b)};t._customEventOnce=function(c,a,b){if(c.length===0){return
}this._controllers.customEvent.once(c.join(" "),a,b)};t._customEventOff=function(d,a,c,b){if(!b&&d.length===0){return
}if(b&&d.length===0){this._controllers.customEvent.off();return}this._controllers.customEvent.off(d.join(" "),a,c)
};t._getProperty=function(a,c){var b=null;if(!c){b=this._getOptimizedValue(a)}if(b===null){b=u[a].call(this,c)
}return b};t._optimizeEvents=function(b){var c,a,d=b.length;for(a=0;a<d;a++){c=b[a];
if(this._shouldOptimizeEvent(c)){this._optimizeEvent(c)}}};t._shouldOptimizeEvent=function(a){if(this._controllers.optimizer.canOptimizeEvent(a)&&!this._controllers.optimizer.isOptimizingEvent(a)){return true
}return false};t._shouldDeoptimizeEvent=function(b,a){if(this._controllers.optimizer.isOptimizingEvent(b)&&(a||this._emitter._eventEmitter._events[b].length<=1)){return true
}return false};t._optimizeEvent=function(a){var b=this._controllers.optimizer.getOptimizerByEvent(a);
b.activate();this._emitterOn(a,b.callback,b)};t._deoptimizeEvent=function(a){var b=this._controllers.optimizer.getOptimizerByEvent(a);
b.deactivate();this._emitterOff(a,b.callback,b)};t._getOptimizedValue=function(a){return this._controllers.optimizer.get(a)
};t._seperateCustomEvents=function(b){var f={customEvents:[],standardEvents:[]};
if(typeof b==="string"){var a=b.split(" "),d,c,g=a.length;for(c=0;c<g;c++){d=a[c];
if(this._controllers.customEvent.canHandleCustomEvent(d)){f.customEvents.push(d)
}else{f.standardEvents.push(d)}}}return f};t._bindEvents=function(){this._emitter.on("dom-emitter:didoff",this._onEventUnbound,this)
};z.exports=y.share(r,A,o)},{"./CustomEventController":274,"./OptimizerController":275,"./optimizers/optimizers":281,"./queries/queries":290,"ac-dom-emitter":269,"ac-shared-instance":271}],277:[function(m,l,i){var j=m("ac-event-emitter").EventEmitter;
function h(c,a,b){j.call(this);this.name=c;this.active=false;this._initializeFunc=a;
this._deinitializeFunc=b}var k=h.prototype=new j(null);k.initialize=function(){if(this._initializeFunc){this._initializeFunc()
}return this};k.deinitialize=function(){if(this._deinitializeFunc){this._deinitializeFunc()
}return this};l.exports=h},{"ac-event-emitter":false}],278:[function(m,l,h){var j=m("ac-event-emitter").EventEmitter;
function i(b,a){j.call(this);this.active=false;this.eventNames=b.eventNames;this.propertyNames=b.propertyNames;
this.options=b.options||{};this.callback=a}var k=i.prototype=new j(null);k.update=function(a,b){this.trigger("update",{prop:a,val:b})
};k.activate=function(){this.active=true;this.trigger("activate",this)};k.deactivate=function(){this.active=false;
this.trigger("deactivate",this)};l.exports=i},{"ac-event-emitter":false}],279:[function(m,l,i){var j=m("../../WindowDelegateOptimizer"),n=m("../../queries/queries");
var o={eventNames:["resize"],propertyNames:["clientWidth","clientHeight","innerWidth","innerHeight"]};
var k=new j(o,function(a){var b,c=o.propertyNames,d=c.length;for(b=0;b<d;b++){this.update(c[b],n[c[b]](true))
}});l.exports=k},{"../../WindowDelegateOptimizer":278,"../../queries/queries":290}],280:[function(l,k,i){var j=l("../../WindowDelegateOptimizer"),m=l("../../queries/queries");
var n={eventNames:["scroll"],propertyNames:["scrollX","scrollY","maxScrollX","maxScrollY"]};
var o=new j(n,function(a){var b,c=n.propertyNames,d=c.length;for(b=0;b<d;b++){this.update(c[b],m[c[b]](true))
}});k.exports=o},{"../../WindowDelegateOptimizer":278,"../../queries/queries":290}],281:[function(j,i,g){var k=j("./events/resize"),h=j("./events/scroll");
i.exports=[k,h]},{"./events/resize":279,"./events/scroll":280}],282:[function(f,i,g){var h=function(a){return document.documentElement.clientHeight
};i.exports=h},{}],283:[function(f,i,g){var h=function(a){return document.documentElement.clientWidth
};i.exports=h},{}],284:[function(f,h,g){var i=function(a){return window.innerHeight||this.clientHeight(a)
};h.exports=i},{}],285:[function(f,i,g){var h=function(a){return window.innerWidth||this.clientWidth(a)
};i.exports=h},{}],286:[function(i,h,g){var f=function(a){return document.body.scrollWidth-this.innerWidth()
};h.exports=f},{}],287:[function(i,h,f){var g=function(a){return document.body.scrollHeight-this.innerHeight()
};h.exports=g},{}],288:[function(f,i,g){var h=function(c){var a=window.pageXOffset;
if(!a){var b=document.documentElement||document.body.parentNode||document.body;
a=b.scrollLeft}return a};i.exports=h},{}],289:[function(f,i,g){var h=function(c){var a=window.pageYOffset;
if(!a){var b=document.documentElement||document.body.parentNode||document.body;
a=b.scrollTop}return a};i.exports=h},{}],290:[function(p,r,n){var v=p("./methods/innerWidth"),o=p("./methods/innerHeight"),t=p("./methods/clientWidth"),m=p("./methods/clientHeight"),u=p("./methods/scrollX"),w=p("./methods/scrollY"),q=p("./methods/maxScrollX"),s=p("./methods/maxScrollY");
r.exports={innerWidth:v,innerHeight:o,clientWidth:t,clientHeight:m,scrollX:u,scrollY:w,maxScrollX:q,maxScrollY:s}
},{"./methods/clientHeight":282,"./methods/clientWidth":283,"./methods/innerHeight":284,"./methods/innerWidth":285,"./methods/maxScrollX":286,"./methods/maxScrollY":287,"./methods/scrollX":288,"./methods/scrollY":289}],291:[function(f,i,g){var h=f("./ac-element-tracker/ElementTracker");
i.exports=new h();i.exports.ElementTracker=h},{"./ac-element-tracker/ElementTracker":292}],292:[function(z,A,w){var v;
var x=z("ac-object");var t=z("ac-dom-nodes");var C=z("ac-dom-metrics");var s=z("ac-array");
var q=z("ac-window-delegate").WindowDelegate;var u=z("./TrackedElement");var p=z("ac-event-emitter").EventEmitter;
var y={autoStart:false};function B(a,b){this.options=x.clone(y);this.options=typeof b==="object"?x.extend(this.options,b):this.options;
this.windowDelegate=q;this.tracking=false;this.elements=[];if(a&&(Array.isArray(a)||t.isNodeList(a)||t.isElement(a))){this.addElements(a)
}if(this.options.autoStart){this.start()}}v=B.prototype=x.create(p.prototype);var r=/^\[object (HTMLCollection|NodeList|Object)\]$/;
v._registerElements=function(a){a=[].concat(a);a.forEach(function(b){if(this._elementInDOM(b)){var c=new u(b);
c.offsetTop=c.element.offsetTop;this.elements.push(c)}},this)};v._registerTrackedElements=function(b){var a=[].concat(b);
a.forEach(function(c){if(this._elementInDOM(c.element)){c.offsetTop=c.element.offsetTop;
this.elements.push(c)}},this)};v._elementInDOM=function(a){var b=false;var c=document.getElementsByTagName("body")[0];
if(t.isElement(a)&&c.contains(a)){b=true}return b};v._onVPChange=function(){this.elements.forEach(function(a){this.refreshElementState(a)
},this)};v._elementPercentInView=function(a){return a.pixelsInView/a.height};v._elementPixelsInView=function(d){var a=0;
var b=d.top;var c=d.bottom;var f=this.windowDelegate.innerHeight();if(b<=0&&c>=f){a=f
}else{if(b>=0&&b<f&&c>f){a=f-b}else{if(b<0&&(c<f&&c>=0)){a=d.bottom}else{if(b>=0&&c<=f){a=d.height
}}}}return a};v._ifInView=function(b,a){if(!a){b.trigger("enterview",b)}};v._ifAlreadyInView=function(a){if(!a.inView){a.trigger("exitview",a)
}};v.addElements=function(a){a=t.isNodeList(a)?s.toArray(a):[].concat(a);a.forEach(function(b){this.addElement(b)
},this)};v.addElement=function(a){var b;if(t.isElement(a)){b=new u(a);this._registerTrackedElements(b)
}return b};v.removeElement=function(a){var b=[];var c;this.elements.forEach(function(f,d){if(f===a||f.element===a){b.push(d)
}});c=this.elements.filter(function(d,f){return b.indexOf(f)<0?true:false});this.elements=c
};v.stop=function(){if(this.tracking===true){this.tracking=false;this.windowDelegate.off("scroll resize orientationchange",this._onVPChange,this)
}};v.start=function(){if(this.tracking===false){this.tracking=true;this.windowDelegate.on("scroll resize orientationchange",this._onVPChange,this);
this.refreshAllElementStates()}};v.refreshAllElementStates=function(){this.elements.forEach(function(a){this.refreshElementState(a)
},this)};v.refreshElementState=function(c){var b=C.getBoundingBox(c.element);var a=c.inView;
c=x.extend(c,b);c.pixelsInView=this._elementPixelsInView(c);c.percentInView=this._elementPercentInView(c);
c.inView=c.pixelsInView>0;if(c.inView){this._ifInView(c,a)}if(a){this._ifAlreadyInView(c)
}return c};A.exports=B},{"./TrackedElement":293,"ac-array":224,"ac-dom-metrics":236,"ac-dom-nodes":148,"ac-event-emitter":false,"ac-object":239,"ac-window-delegate":273}],293:[function(p,o,q){var n;
var l=p("ac-dom-emitter").DOMEmitter;var k=p("ac-dom-nodes");var j=p("ac-object");
function m(a){if(k.isElement(a)){this.element=a}else{throw new TypeError("TrackedElement: "+a+" is not a valid DOM element")
}this.inView=false;this.percentInView=0;this.pixelsInView=0;this.offsetTop=0;this.top=0;
this.right=0;this.bottom=0;this.left=0;this.width=0;this.height=0;l.call(this,a)
}n=m.prototype=j.create(l.prototype);o.exports=m},{"ac-dom-emitter":231,"ac-dom-nodes":148,"ac-object":239}],294:[function(d,g,f){arguments[4][54][0].apply(f,arguments)
},{"./ac-browser/BrowserData":295,"./ac-browser/IE":296}],295:[function(g,k,h){var j=g("./data");
function i(){}i.prototype={__getBrowserVersion:function(c,b){var d;if(!c||!b){return
}var a=j.browser.filter(function(f){return f.identity===b});a.some(function(f){var o=f.versionSearch||b;
var n=c.indexOf(o);if(n>-1){d=parseFloat(c.substring(n+o.length+1));return true
}});return d},__getName:function(a){return this.__getIdentityStringFromArray(a)
},__getIdentity:function(a){if(a.string){return this.__matchSubString(a)}else{if(a.prop){return a.identity
}}},__getIdentityStringFromArray:function(d){for(var a=0,c=d.length,b;a<c;a++){b=this.__getIdentity(d[a]);
if(b){return b}}},__getOS:function(a){return this.__getIdentityStringFromArray(a)
},__getOSVersion:function(d,a){if(!d||!a){return}var b=j.os.filter(function(l){return l.identity===a
})[0];var m=b.versionSearch||a;var c=new RegExp(m+" ([\\d_\\.]+)","i");var f=d.match(c);
if(f!==null){return f[1].replace(/_/g,".")}},__matchSubString:function(b){var c=b.subString;
if(c){var a=c.test?!!c.test(b.string):b.string.indexOf(c)>-1;if(a){return b.identity
}}}};i.create=function(){var b=new i();var a={};a.name=b.__getName(j.browser);a.version=b.__getBrowserVersion(j.versionString,a.name);
a.os=b.__getOS(j.os);a.osVersion=b.__getOSVersion(j.versionString,a.os);return a
};k.exports=i},{"./data":297}],296:[function(d,g,f){g.exports=d(56)},{}],297:[function(d,g,f){g.exports={browser:[{string:window.navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:window.navigator.userAgent,subString:/silk/i,identity:"Silk"},{string:window.navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:window.navigator.userAgent,subString:/mobile\/[^\s]*\ssafari\//i,identity:"Safari Mobile",versionSearch:"Version"},{string:window.navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:window.navigator.vendor,subString:"iCab",identity:"iCab"},{string:window.navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:window.navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:window.navigator.vendor,subString:"Camino",identity:"Camino"},{string:window.navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:window.navigator.userAgent,subString:"MSIE",identity:"IE",versionSearch:"MSIE"},{string:window.navigator.userAgent,subString:"Trident",identity:"IE",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],os:[{string:window.navigator.platform,subString:"Win",identity:"Windows",versionSearch:"Windows NT"},{string:window.navigator.platform,subString:"Mac",identity:"OS X"},{string:window.navigator.userAgent,subString:"iPhone",identity:"iOS",versionSearch:"iPhone OS"},{string:window.navigator.userAgent,subString:"iPad",identity:"iOS",versionSearch:"CPU OS"},{string:window.navigator.userAgent,subString:/android/i,identity:"Android"},{string:window.navigator.platform,subString:"Linux",identity:"Linux"}],versionString:window.navigator.userAgent||window.navigator.appVersion||undefined}
},{}],298:[function(d,g,f){g.exports=d(76)},{"./ac-prefixer/Prefixer":299}],299:[function(d,g,f){g.exports=d(77)
},{"./Prefixer/camelCasedEvents":300}],300:[function(d,g,f){g.exports=d(78)},{}],301:[function(o,n,i){var k=o("./ac-feature/helpers/memoize");
var m=["cssPropertyAvailable","isRetina"];var l;var j={canvasAvailable:o("./ac-feature/canvasAvailable"),continuousScrollEventsAvailable:o("./ac-feature/continuousScrollEventsAvailable"),cookiesAvailable:o("./ac-feature/cookiesAvailable"),cssLinearGradientAvailable:o("./ac-feature/cssLinearGradientAvailable"),cssPropertyAvailable:o("./ac-feature/cssPropertyAvailable"),isDesktop:o("./ac-feature/isDesktop"),isHandheld:o("./ac-feature/isHandheld"),isRetina:o("./ac-feature/isRetina"),isTablet:o("./ac-feature/isTablet"),localStorageAvailable:o("./ac-feature/localStorageAvailable"),mediaElementsAvailable:o("./ac-feature/mediaElementsAvailable"),sessionStorageAvailable:o("./ac-feature/sessionStorageAvailable"),svgAvailable:o("./ac-feature/svgAvailable"),threeDTransformsAvailable:o("./ac-feature/threeDTransformsAvailable"),touchAvailable:o("./ac-feature/touchAvailable"),webGLAvailable:o("./ac-feature/webGLAvailable")};
for(l in j){if(m.indexOf(l)===-1){j[l]=k(j[l])}}n.exports=j},{"./ac-feature/canvasAvailable":302,"./ac-feature/continuousScrollEventsAvailable":303,"./ac-feature/cookiesAvailable":304,"./ac-feature/cssLinearGradientAvailable":305,"./ac-feature/cssPropertyAvailable":306,"./ac-feature/helpers/memoize":308,"./ac-feature/isDesktop":309,"./ac-feature/isHandheld":310,"./ac-feature/isRetina":311,"./ac-feature/isTablet":312,"./ac-feature/localStorageAvailable":313,"./ac-feature/mediaElementsAvailable":314,"./ac-feature/sessionStorageAvailable":315,"./ac-feature/svgAvailable":316,"./ac-feature/threeDTransformsAvailable":317,"./ac-feature/touchAvailable":318,"./ac-feature/webGLAvailable":319}],302:[function(g,k,h){var i=g("./helpers/globals");
k.exports=function j(){var b=i.getDocument();var a=b.createElement("canvas");return !!(typeof a.getContext==="function"&&a.getContext("2d"))
}},{"./helpers/globals":307}],303:[function(m,l,h){var j=m("ac-browser");var i=m("./touchAvailable");
l.exports=function k(){return(!i()||(j.os==="iOS"&&j.version>=8)||j.name==="Chrome")
}},{"./touchAvailable":318,"ac-browser":294}],304:[function(k,j,g){var i=k("./helpers/globals");
j.exports=function h(){var a=false;var d=i.getDocument();var b=i.getNavigator();
try{if("cookie" in d&&!!b.cookieEnabled){d.cookie="ac_feature_cookie=1";a=(d.cookie.indexOf("ac_feature_cookie")!==-1);
d.cookie="ac_feature_cookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"}}catch(c){}return a
}},{"./helpers/globals":307}],305:[function(j,i,k){var h=j("./cssPropertyAvailable");
i.exports=function g(){var a=["linear-gradient(to bottom right, #9f9, white)","linear-gradient(top left, #9f9, white)","gradient(linear, left top, right bottom, from(#9f9), to(white))"];
return a.some(function(b){return h("background-image",b)})}},{"./cssPropertyAvailable":306}],306:[function(k,j,g){var i=k("ac-prefixer");
j.exports=function h(a,b){if(typeof b!=="undefined"){return !!i.getStyleValue(a,b)
}else{return !!i.getStyleProperty(a)}}},{"ac-prefixer":298}],307:[function(d,g,f){g.exports={getWindow:function(){return window
},getDocument:function(){return document},getNavigator:function(){return navigator
}}},{}],308:[function(f,i,g){i.exports=function h(a){var b;return function(){if(typeof b!=="undefined"){return b
}else{return b=a()}}}},{}],309:[function(l,k,h){var i=l("./touchAvailable");var j=l("./helpers/globals");
k.exports=function m(){var a=j.getWindow();return(!i()&&!a.orientation)}},{"./helpers/globals":307,"./touchAvailable":318}],310:[function(k,j,m){var l=k("./isDesktop");
var i=k("./isTablet");j.exports=function h(){return(!l()&&!i())}},{"./isDesktop":309,"./isTablet":312}],311:[function(g,k,h){var j=g("./helpers/globals");
k.exports=function i(){var a=j.getWindow();return("devicePixelRatio" in a&&a.devicePixelRatio>=1.5)
}},{"./helpers/globals":307}],312:[function(l,k,h){var m=l("./isDesktop");var j=l("./helpers/globals");
k.exports=function i(){var a=j.getWindow();var b=a.screen.width;if(a.orientation&&a.screen.height<b){b=a.screen.height
}return(!m()&&b>=600)}},{"./helpers/globals":307,"./isDesktop":309}],313:[function(k,j,h){var i=k("./helpers/globals");
j.exports=function g(){var a=i.getWindow();var b=false;try{b=!!(a.localStorage&&a.localStorage.non_existent!==null)
}catch(c){}return b}},{"./helpers/globals":307}],314:[function(g,k,h){var i=g("./helpers/globals");
k.exports=function j(){var a=i.getWindow();return("HTMLMediaElement" in a)}},{"./helpers/globals":307}],315:[function(k,j,g){var i=k("./helpers/globals");
j.exports=function h(){var a=i.getWindow();var c=false;try{if("sessionStorage" in a&&typeof a.sessionStorage.setItem==="function"){a.sessionStorage.setItem("ac_feature","test");
c=true;a.sessionStorage.removeItem("ac_feature","test")}}catch(b){}return c}},{"./helpers/globals":307}],316:[function(k,j,g){var i=k("./helpers/globals");
j.exports=function h(){var a=i.getDocument();return a.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
}},{"./helpers/globals":307}],317:[function(k,j,g){var h=k("./cssPropertyAvailable");
j.exports=function i(){return(h("perspective","1px")&&h("transform","translateZ(0)"))
}},{"./cssPropertyAvailable":306}],318:[function(k,j,g){var i=k("./helpers/globals");
j.exports=function h(){var a=i.getWindow();var b=i.getDocument();return !!(("ontouchstart" in a)||a.DocumentTouch&&b instanceof a.DocumentTouch)
}},{"./helpers/globals":307}],319:[function(k,j,g){var i=k("./helpers/globals");
j.exports=function h(){var b=i.getDocument();var a=b.createElement("canvas");return !!(typeof a.getContext==="function"&&a.getContext("webgl"))
}},{"./helpers/globals":307}],320:[function(d,g,f){g.exports=d("./ac-fullscreen/fullscreen")
},{"./ac-fullscreen/fullscreen":326}],321:[function(d,g,f){g.exports={STANDARD:"standard",IOS:"ios"}
},{}],322:[function(u,w,r){var s=u("ac-dom-events/addEventListener");var n=u("ac-event-emitter").EventEmitter;
var y=u("./../events/types");var x=u("./../consts/modes");var v=new n();function p(a){v.trigger(y.ENTERFULLSCREEN,a)
}function o(a){v.trigger(y.EXITFULLSCREEN,a)}function t(a){if(v.fullscreenElement()){p(a)
}else{o(a)}}function q(){s(document,"fullscreenchange",t)}q();v.fullscreenEnabled=function(b){var a=document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled||("webkitCancelFullScreen" in document);
return !!(a)};v.fullscreenElement=function(){return document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement||document.webkitCurrentFullScreenElement
};v.exitFullscreen=function(b){var a;if(typeof document.exitFullscreen==="function"){a="exitFullscreen"
}else{if(typeof document.webkitExitFullscreen==="function"){a="webkitExitFullscreen"
}else{if(typeof document.webkitCancelFullScreen==="function"){a="webkitCancelFullScreen"
}else{if(typeof document.mozCancelFullScreen==="function"){a="mozCancelFullScreen"
}else{if(typeof document.msExitFullscreen==="function"){a="msExitFullscreen"}}}}}if(typeof document[a]==="function"){document[a].call(document)
}};v.requestFullscreen=function(b){var a;if(typeof b.requestFullscreen==="function"){a="requestFullscreen"
}else{if(typeof b.webkitRequestFullscreen==="function"){a="webkitRequestFullscreen"
}else{if(typeof b.webkitRequestFullScreen==="function"){a="webkitRequestFullScreen"
}else{if(typeof b.mozRequestFullScreen==="function"){a="mozRequestFullScreen"}else{if(typeof b.msRequestFullscreen==="function"){a="msRequestFullscreen"
}}}}}if(typeof b[a]==="function"){b[a].call(b)}};v.mode=x.STANDARD;w.exports=v},{"./../consts/modes":321,"./../events/types":325,"ac-dom-events/addEventListener":109,"ac-event-emitter":false}],323:[function(k,j,h){var g=k("./ios");
var i=k("./desktop");j.exports={create:function(){var a=i;if("webkitEnterFullscreen" in document.createElement("video")&&!("webkitRequestFullScreen" in document.createElement("div"))){a=g
}return a}}},{"./desktop":322,"./ios":324}],324:[function(u,v,s){var t=u("ac-dom-events/addEventListener");
var n=u("ac-event-emitter").EventEmitter;var y=u("./../events/types");var w=u("./../consts/modes");
var o;x();function x(){t(document,"webkitbeginfullscreen",p,true);t(document,"webkitendfullscreen",q,true)
}function p(a){r.trigger(y.ENTERFULLSCREEN,a)}function q(a){o=undefined;r.trigger(y.EXITFULLSCREEN,a)
}var r=new n();r.fullscreenEnabled=function(a){return !!(a.webkitSupportsFullscreen)
};r.fullscreenElement=function(){return o};r.exitFullscreen=function(a){if(a&&typeof a.webkitExitFullscreen==="function"){a.webkitExitFullscreen()
}};r.requestFullscreen=function(a){if(typeof a.webkitEnterFullscreen==="function"){a.webkitEnterFullscreen()
}};r.mode=w.IOS;v.exports=r},{"./../consts/modes":321,"./../events/types":325,"ac-dom-events/addEventListener":109,"ac-event-emitter":false}],325:[function(d,g,f){g.exports={ENTERFULLSCREEN:"enterfullscreen",EXITFULLSCREEN:"exitfullscreen"}
},{}],326:[function(q,r,p){var k=q("ac-event-emitter").EventEmitter;var m=q("./delegate/factory");
var s="Error: Element missing. ac-fullscreen requires an element to be specified";
var n=new k();var o=m.create();o.propagateTo(n);function l(){throw new Error(s)
}n.requestFullscreen=function(a){if(!a){l()}return o.requestFullscreen(a)};n.fullscreenEnabled=function(a){if(!a){l()
}return o.fullscreenEnabled(a)};n.fullscreenElement=function(){return o.fullscreenElement()
};n.exitFullscreen=function(a){if(!a){l()}return o.exitFullscreen(a)};n.getMode=function(){return o.mode
};r.exports=n},{"./delegate/factory":323,"ac-event-emitter":false}],327:[function(d,g,f){g.exports={TouchClick:d("./ac-gesture-touchclick/TouchClick")}
},{"./ac-gesture-touchclick/TouchClick":328}],328:[function(q,r,p){var n=q("ac-dom-events");
var k=q("ac-event-emitter").EventEmitter;var s=q("ac-object");var m=q("ac-feature");
function l(a){a=a||{};this.el=a.el;this._onTouchStart=this._onTouchStart.bind(this);
this._onTouchMove=this._onTouchMove.bind(this);this._onTouchEnd=this._onTouchEnd.bind(this);
this._onClick=this._onClick.bind(this);this._touchStart=false;this.activate()}var o=l.prototype=s.create(k.prototype);
o._broadcastClick=function(a){this.trigger("click",{originalEvent:a})};o._onClick=function(a){n.stop(a);
if(!this._touchAvailable()){this._broadcastClick(a)}};o._onTouchStart=function(){this._touchStart=true
};o._onTouchEnd=function(a){if(this._touchStart===true){n.stop(a);this._broadcastClick(a)
}this._touchStart=false};o._onTouchMove=function(){this._touchStart=false};o._touchAvailable=function(){return m.touchAvailable()
};o.activate=function(){if(this._touchAvailable()){n.addEventListener(this.el,"touchstart",this._onTouchStart);
n.addEventListener(this.el,"touchmove",this._onTouchMove);n.addEventListener(this.el,"touchend",this._onTouchEnd)
}n.addEventListener(this.el,"click",this._onClick)};o.deactivate=function(){n.removeEventListener(this.el,"touchstart",this._onTouchStart);
n.removeEventListener(this.el,"touchmove",this._onTouchMove);n.removeEventListener(this.el,"touchend",this._onTouchEnd);
n.removeEventListener(this.el,"click",this._onClick)};l.create=function(a,b){b=b||{};
return new l({el:a})};r.exports=l},{"ac-dom-events":111,"ac-event-emitter":false,"ac-feature":301,"ac-object":941}],329:[function(d,g,f){g.exports=d(76)
},{"./ac-prefixer/Prefixer":330}],330:[function(d,g,f){g.exports=d(77)},{"./Prefixer/camelCasedEvents":331}],331:[function(d,g,f){g.exports=d(78)
},{}],332:[function(d,g,f){g.exports={addEventListener:d("./ac-dom-events/addEventListener"),dispatchEvent:d("./ac-dom-events/dispatchEvent"),removeEventListener:d("./ac-dom-events/removeEventListener"),stop:d("./ac-dom-events/stop"),target:d("./ac-dom-events/target")}
},{"./ac-dom-events/addEventListener":333,"./ac-dom-events/dispatchEvent":334,"./ac-dom-events/removeEventListener":335,"./ac-dom-events/stop":336,"./ac-dom-events/target":337}],333:[function(d,g,f){g.exports=d(80)
},{"ac-prefixer":329}],334:[function(d,g,f){g.exports=d(81)},{}],335:[function(d,g,f){g.exports=d(83)
},{"ac-prefixer":329}],336:[function(f,h,g){h.exports=function i(a){if(!a){a=window.event
}if(a.stopPropagation){a.stopPropagation()}else{a.cancelBubble=true}if(a.preventDefault){a.preventDefault()
}a.stopped=true;a.returnValue=false}},{}],337:[function(f,i,g){i.exports=function h(a){return(typeof a.target!=="undefined")?a.target:a.srcElement
}},{}],338:[function(i,h,f){var g=i("./ac-keyboard/Keyboard");h.exports=new g();
h.exports.Keyboard=g;h.exports.keys=i("./ac-keyboard/keymap")},{"./ac-keyboard/Keyboard":340,"./ac-keyboard/keymap":341}],339:[function(k,j,g){var h=["keyLocation"];
function i(b){this.originalEvent=b;var a;for(a in b){if(h.indexOf(a)===-1&&typeof b[a]!=="function"){this[a]=b[a]
}}this.location=(this.originalEvent.location!==undefined)?this.originalEvent.location:this.originalEvent.keyLocation
}i.prototype={preventDefault:function(){if(typeof this.originalEvent.preventDefault!=="function"){this.originalEvent.returnValue=false;
return}return this.originalEvent.preventDefault()},stopPropagation:function(){return this.originalEvent.stopPropagation()
}};j.exports=i},{}],340:[function(w,y,u){var r=w("ac-dom-events");var o=w("ac-event-emitter").EventEmitter;
var v=w("./KeyEvent");var s=w("./keymap");var q=0;var x=1;var A=2;var p=3;var t;
function z(){this._keysDown={};this._keyDownEmitter=new o();this._keyUpEmitter=new o();
r.addEventListener(document,"keydown",this._DOMKeyDown.bind(this),true);r.addEventListener(document,"keyup",this._DOMKeyUp.bind(this),true);
this._listening=[]}t=z.prototype;t._castEventNameNumberToString=function(a){if(typeof a==="number"){return a.toString()
}return a};t._DOMKeyDown=function(b){var c=this._normalizeKeyboardEvent(b);var a=c.keyCode.toString();
this._trackKeyDown(a);this._keyDownEmitter.trigger(a,c)};t._DOMKeyUp=function(b){var c=this._normalizeKeyboardEvent(b);
var a=c.keyCode.toString();this._trackKeyUp(a);this._keyUpEmitter.trigger(a,c)};
t.addKeyDown=function(){var b=Array.prototype.slice.call(arguments);var a=b.shift();
if(a===undefined){throw new TypeError('Could not listen for keyup event on "'+a+'"')
}a=this._castEventNameNumberToString(a);return this._keyDownEmitter.on.apply(this._keyDownEmitter,[a].concat(b))
};t.addKeyUp=function(){var b=Array.prototype.slice.call(arguments);var a=b.shift();
if(a===undefined){throw new TypeError('Could not listen for keyup event on "'+a+'"')
}a=this._castEventNameNumberToString(a);return this._keyUpEmitter.on.apply(this._keyUpEmitter,[a].concat(b))
};t.removeKeyDown=function(){var b=Array.prototype.slice.call(arguments);var a=b.shift();
a=this._castEventNameNumberToString(a);return this._keyDownEmitter.off.apply(this._keyDownEmitter,[a].concat(b))
};t.removeKeyUp=function(){var b=Array.prototype.slice.call(arguments);var a=b.shift();
a=this._castEventNameNumberToString(a);return this._keyUpEmitter.off.apply(this._keyUpEmitter,[a].concat(b))
};t.isDown=function(a){return this._keysDown[a]||false};t.isUp=function(a){return !this.isDown(a)
};t._trackKeyUp=function(a){if(this._keysDown[a]){this._keysDown[a]=false}};t._trackKeyDown=function(a){if(!this._keysDown[a]){this._keysDown[a]=true
}};t._normalizeKeyboardEvent=function(a){return new v(a)};y.exports=z},{"./KeyEvent":339,"./keymap":341,"ac-dom-events":332,"ac-event-emitter":false}],341:[function(d,g,f){g.exports={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CONTROL:17,ALT:18,COMMAND:91,CAPSLOCK:20,ESCAPE:27,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,NUMPAD_ZERO:96,NUMPAD_ONE:97,NUMPAD_TWO:98,NUMPAD_THREE:99,NUMPAD_FOUR:100,NUMPAD_FIVE:101,NUMPAD_SIX:102,NUMPAD_SEVEN:103,NUMPAD_EIGHT:104,NUMPAD_NINE:105,NUMPAD_ASTERISK:106,NUMPAD_PLUS:107,NUMPAD_DASH:109,NUMPAD_DOT:110,NUMPAD_SLASH:111,NUMPAD_EQUALS:187,TICK:192,LEFT_BRACKET:219,RIGHT_BRACKET:221,BACKSLASH:220,SEMICOLON:186,APOSTRAPHE:222,SPACEBAR:32,CLEAR:12,COMMA:188,DOT:190,SLASH:191}
},{}],342:[function(d,g,f){arguments[4][54][0].apply(f,arguments)},{"./ac-browser/BrowserData":343,"./ac-browser/IE":344}],343:[function(d,g,f){g.exports=d(295)
},{"./data":345}],344:[function(d,g,f){g.exports=d(56)},{}],345:[function(d,g,f){g.exports=d(297)
},{}],346:[function(d,g,f){g.exports={add:d("./ac-classlist/add"),contains:d("./ac-classlist/contains"),remove:d("./ac-classlist/remove"),toggle:d("./ac-classlist/toggle")}
},{"./ac-classlist/add":347,"./ac-classlist/contains":348,"./ac-classlist/remove":350,"./ac-classlist/toggle":351}],347:[function(g,k,h){var j=g("./helpers/className");
k.exports=function i(){var a=Array.prototype.slice.call(arguments);var b=a.shift(a);
if(b.classList&&b.classList.add){b.classList.add.apply(b.classList,a)}else{a.forEach(j.add.bind(this,b))
}}},{"./helpers/className":349}],348:[function(g,j,h){var i=g("./helpers/className");
j.exports=function k(a,b){if(a.classList&&a.classList.contains){return a.classList.contains(b)
}return i.contains(a,b)}},{"./helpers/className":349}],349:[function(o,n,j){var k=function(a){return new RegExp("(\\s|^)"+a+"(\\s|$)")
};var l=function(a,b){return k(b).test(a.className)};var m=function(a,b){if(!l(a,b)){a.className+=" "+b
}};var i=function(a,b){if(l(a,b)){a.className=a.className.replace(k(b),"$1").trim()
}};n.exports={contains:l,add:m,remove:i}},{}],350:[function(k,j,g){var i=k("./helpers/className");
j.exports=function h(){var a=Array.prototype.slice.call(arguments);var b=a.shift(a);
if(b.classList&&b.classList.remove){b.classList.remove.apply(b.classList,a)}else{a.forEach(i.remove.bind(this,b))
}}},{"./helpers/className":349}],351:[function(k,j,g){var i=k("./helpers/className");
j.exports=function h(b,c,a){var d=(typeof a!=="undefined");var f;if(b.classList&&b.classList.toggle){if(d){return b.classList.toggle(c,a)
}return b.classList.toggle(c)}if(d){f=!!a}else{f=!i.contains(b,c)}if(f){i.add(b,c)
}else{i.remove(b,c)}return f}},{"./helpers/className":349}],352:[function(d,g,f){g.exports=d(76)
},{"./ac-prefixer/Prefixer":353}],353:[function(d,g,f){g.exports=d(77)},{"./Prefixer/camelCasedEvents":354}],354:[function(d,g,f){g.exports=d(78)
},{}],355:[function(d,g,f){g.exports=d(79)},{"./ac-dom-events/addEventListener":356,"./ac-dom-events/dispatchEvent":357,"./ac-dom-events/preventDefault":358,"./ac-dom-events/removeEventListener":359,"./ac-dom-events/stop":360,"./ac-dom-events/stopPropagation":361,"./ac-dom-events/target":362}],356:[function(d,g,f){g.exports=d(80)
},{"ac-prefixer":352}],357:[function(d,g,f){g.exports=d(81)},{}],358:[function(d,g,f){g.exports=d(82)
},{}],359:[function(d,g,f){g.exports=d(83)},{"ac-prefixer":352}],360:[function(d,g,f){g.exports=d(84)
},{"./preventDefault":358,"./stopPropagation":361}],361:[function(d,g,f){g.exports=d(85)
},{}],362:[function(d,g,f){g.exports=d(86)},{}],363:[function(d,g,f){arguments[4][87][0].apply(f,arguments)
},{"./ac-dom-traversal/ancestor":364,"./ac-dom-traversal/ancestors":365,"./ac-dom-traversal/children":366,"./ac-dom-traversal/filterBySelector":367,"./ac-dom-traversal/firstChild":368,"./ac-dom-traversal/lastChild":371,"./ac-dom-traversal/matchesSelector":372,"./ac-dom-traversal/nextSibling":373,"./ac-dom-traversal/nextSiblings":374,"./ac-dom-traversal/previousSibling":375,"./ac-dom-traversal/previousSiblings":376,"./ac-dom-traversal/querySelector":377,"./ac-dom-traversal/querySelectorAll":378,"./ac-dom-traversal/shims/ie":379,"./ac-dom-traversal/siblings":380}],364:[function(d,g,f){arguments[4][88][0].apply(f,arguments)
},{"./helpers/validate":370,"./matchesSelector":372,"ac-dom-nodes":385}],365:[function(d,g,f){arguments[4][89][0].apply(f,arguments)
},{"./helpers/validate":370,"./matchesSelector":372,"ac-dom-nodes":385}],366:[function(d,g,f){arguments[4][90][0].apply(f,arguments)
},{"./filterBySelector":367,"./helpers/validate":370,"ac-dom-nodes":385}],367:[function(d,g,f){arguments[4][91][0].apply(f,arguments)
},{"./helpers/validate":370,"./matchesSelector":372}],368:[function(d,g,f){arguments[4][92][0].apply(f,arguments)
},{"./children":366,"./helpers/validate":370}],369:[function(d,g,f){g.exports=d(93)
},{}],370:[function(d,g,f){arguments[4][94][0].apply(f,arguments)},{"ac-dom-nodes":385}],371:[function(d,g,f){arguments[4][95][0].apply(f,arguments)
},{"./children":366,"./helpers/validate":370}],372:[function(d,g,f){arguments[4][96][0].apply(f,arguments)
},{"./helpers/nativeMatches":369,"./helpers/validate":370,"ac-dom-nodes":385}],373:[function(d,g,f){arguments[4][97][0].apply(f,arguments)
},{"./helpers/validate":370,"./matchesSelector":372,"ac-dom-nodes":385}],374:[function(d,g,f){arguments[4][98][0].apply(f,arguments)
},{"./helpers/validate":370,"./matchesSelector":372,"ac-dom-nodes":385}],375:[function(d,g,f){arguments[4][99][0].apply(f,arguments)
},{"./helpers/validate":370,"./matchesSelector":372,"ac-dom-nodes":385}],376:[function(d,g,f){arguments[4][100][0].apply(f,arguments)
},{"./helpers/validate":370,"./matchesSelector":372,"ac-dom-nodes":385}],377:[function(d,g,f){arguments[4][101][0].apply(f,arguments)
},{"./helpers/validate":370}],378:[function(d,g,f){arguments[4][102][0].apply(f,arguments)
},{"./helpers/validate":370}],379:[function(d,g,f){arguments[4][103][0].apply(f,arguments)
},{"../helpers/nativeMatches":369,"../helpers/validate":370,"../vendor/sizzle/sizzle":381,"ac-dom-nodes":385}],380:[function(d,g,f){arguments[4][104][0].apply(f,arguments)
},{"./children":366,"./helpers/validate":370}],381:[function(d,g,f){g.exports=d(105)
},{}],382:[function(d,g,f){arguments[4][106][0].apply(f,arguments)},{"./ac-dom-emitter/DOMEmitter":383}],383:[function(s,t,r){var q;
var l=s("ac-event-emitter").EventEmitter,m=s("./DOMEmitterEvent"),p=s("ac-dom-events"),u=s("ac-dom-traversal");
var n="dom-emitter";function o(a){if(a===null){return}this.el=a;this._bindings={};
this._delegateFuncs={};this._eventEmitter=new l()}q=o.prototype;q.on=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._on);
return this};q.once=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._once);
return this};q.off=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._off);
return this};q.has=function(b,d,f,h){var g,c;if(typeof d==="string"){g=d;c=f}else{c=d;
h=f}if(g){var a=this._getDelegateFuncBindingIdx(b,g,c,h,true);if(a>-1){return true
}return false}if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};q.trigger=function(i,a,h,c){i=this._parseEventNames(i);i=this._cleanStringData(i);
var f,d,g,b=i.length;if(typeof a==="string"){f=this._cleanStringData(a);d=h}else{d=a;
c=h}for(g=0;g<b;g++){this._triggerDOMEvents(i[g],d,f)}return this};q.emitterTrigger=function(a,d,c){a=this._parseEventNames(a);
a=this._cleanStringData(a);d=new m(d,this);var f,b=a.length;for(f=0;f<b;f++){this._eventEmitter.trigger(a[f],d,c)
}return this};q.propagateTo=function(b,a){this._eventEmitter.propagateTo(b,a);return this
};q.stopPropagatingTo=function(a){this._eventEmitter.stopPropagatingTo(a);return this
};q.stopImmediatePropagation=function(){this._eventEmitter.stopImmediatePropagation();
return this};q.destroy=function(){this._triggerInternalEvent("willdestroy");this.off();
this.el=this._eventEmitter=this._bindings=this._delegateFuncs=null};q._parseEventNames=function(a){if(!a){return[a]
}return a.split(" ")};q._onListenerEvent=function(a,b){this.emitterTrigger(a,b,false)
};q._setListener=function(a){this._bindings[a]=this._onListenerEvent.bind(this,a);
p.addEventListener(this.el,a,this._bindings[a])};q._removeListener=function(a){p.removeEventListener(this.el,a,this._bindings[a]);
this._bindings[a]=null};q._triggerInternalEvent=function(b,a){this.emitterTrigger(n+":"+b,a)
};q._normalizeArgumentsAndCall=function(b,h){var c={};if(b.length===0){h.call(this,c);
return}if(typeof b[0]==="string"||b[0]===null){b=this._cleanStringData(b);c.events=b[0];
if(typeof b[1]==="string"){c.delegateQuery=b[1];c.callback=b[2];c.context=b[3]}else{c.callback=b[1];
c.context=b[2]}h.call(this,c);return}var a,f,d=":",g=b[0];for(a in g){if(g.hasOwnProperty(a)){c={};
f=this._cleanStringData(a.split(d));c.events=f[0];c.delegateQuery=f[1];c.callback=g[a];
c.context=b[1];h.call(this,c)}}};q._registerDelegateFunc=function(g,d,c,b,f){var a=this._delegateFunc.bind(this,g,d,c,f);
this._delegateFuncs[d]=this._delegateFuncs[d]||{};this._delegateFuncs[d][g]=this._delegateFuncs[d][g]||[];
this._delegateFuncs[d][g].push({func:b,context:f,delegateFunc:a});return a};q._cleanStringData=function(h){var i=false;
if(typeof h==="string"){h=[h];i=true}var a=[],f,c,d,g,b=h.length;for(f=0;f<b;f++){c=h[f];
if(typeof c==="string"){if(c===""||c===" "){continue}d=c.length;while(c[0]===" "){c=c.slice(1,d);
d--}while(c[d-1]===" "){c=c.slice(0,d-1);d--}}a.push(c)}if(i){return a[0]}return a
};q._unregisterDelegateFunc=function(g,c,b,d){if(!this._delegateFuncs[c]||!this._delegateFuncs[c][g]){return
}var f=this._getDelegateFuncBindingIdx(g,c,b,d),a;if(f>-1){a=this._delegateFuncs[c][g][f].delegateFunc;
this._delegateFuncs[c][g].splice(f,1);if(this._delegateFuncs[c][g].length===0){this._delegateFuncs[c][g]=null
}}return a};q._unregisterDelegateFuncs=function(b,c){if(!this._delegateFuncs[c]){return
}if(b!==null&&!this._delegateFuncs[c][b]){return}if(b===null){var a;for(a in this._delegateFuncs[c]){if(this._delegateFuncs[c].hasOwnProperty(a)){this._unbindDelegateFunc(a,c)
}}return}this._unbindDelegateFunc(b,c)};q._unbindDelegateFunc=function(b,f){var d,c,a=0;
while(this._delegateFuncs[f][b]&&this._delegateFuncs[f][b][a]){d=this._delegateFuncs[f][b][a];
c=this._delegateFuncs[f][b][a].length;this._off({events:b,delegateQuery:f,callback:d.func,context:d.context});
if(this._delegateFuncs[f][b]&&c===this._delegateFuncs[f][b].length){a++}}d=c=null
};q._unregisterDelegateFuncsByEvent=function(b){var a;for(a in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(a)){this._unregisterDelegateFuncs(b,a)
}}};q._delegateFunc=function(b,f,c,h,d){if(this._targetHasDelegateAncestor(d.target,f)){var a=Array.prototype.slice.call(arguments,0),g=a.slice(4,a.length);
h=h||window;if(typeof d.detail==="object"){g[0]=d.detail}c.apply(h,g)}};q._targetHasDelegateAncestor=function(c,a){var b=c;
while(b&&b!==this.el&&b!==document.documentElement){if(u.matchesSelector(b,a)){return true
}b=b.parentNode}return false};q._on=function(d){var a=d.events,c=d.callback,f=d.delegateQuery,g=d.context,b=d.unboundCallback||c;
a=this._parseEventNames(a);a.forEach(function(h,w,j,i,k){if(!this.has(k)){this._setListener(k)
}if(typeof i==="string"){h=this._registerDelegateFunc(k,i,h,w,j)}this._triggerInternalEvent("willon",{evt:k,callback:h,context:j,delegateQuery:i});
this._eventEmitter.on(k,h,j);this._triggerInternalEvent("didon",{evt:k,callback:h,context:j,delegateQuery:i})
}.bind(this,c,b,g,f));a=c=b=f=g=null};q._off=function(d){var a=d.events,c=d.callback,f=d.delegateQuery,g=d.context,b=d.unboundCallback||c;
if(typeof a==="undefined"){this._eventEmitter.off();var h;for(h in this._bindings){if(this._bindings.hasOwnProperty(h)){this._removeListener(h)
}}for(h in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(h)){this._delegateFuncs[h]=null
}}return}a=this._parseEventNames(a);a.forEach(function(i,y,k,j,x){if(typeof j==="string"&&typeof y==="function"){i=this._unregisterDelegateFunc(x,j,y,k);
if(!i){return}}if(typeof j==="string"&&typeof i==="undefined"){this._unregisterDelegateFuncs(x,j);
return}if(typeof x==="string"&&typeof i==="undefined"){this._unregisterDelegateFuncsByEvent(x);
if(typeof j==="string"){return}}this._triggerInternalEvent("willoff",{evt:x,callback:i,context:k,delegateQuery:j});
this._eventEmitter.off(x,i,k);this._triggerInternalEvent("didoff",{evt:x,callback:i,context:k,delegateQuery:j});
if(!this.has(x)){this._removeListener(x)}}.bind(this,c,b,g,f));a=c=b=f=g=null};
q._once=function(d){var b=d.events,c=d.callback,f=d.delegateQuery,a=d.context;b=this._parseEventNames(b);
b.forEach(function(g,i,h,j){if(typeof h==="string"){return this._handleDelegateOnce(j,g,i,h)
}if(!this.has(j)){this._setListener(j)}this._triggerInternalEvent("willonce",{evt:j,callback:g,context:i,delegateQuery:h});
this._eventEmitter.once.call(this,j,g,i);this._triggerInternalEvent("didonce",{evt:j,callback:g,context:i,delegateQuery:h})
}.bind(this,c,a,f));b=c=f=a=null};q._handleDelegateOnce=function(b,c,a,d){this._triggerInternalEvent("willonce",{evt:b,callback:c,context:a,delegateQuery:d});
this._on({events:b,context:a,delegateQuery:d,callback:this._getDelegateOnceCallback.bind(this,b,c,a,d),unboundCallback:c});
this._triggerInternalEvent("didonce",{evt:b,callback:c,context:a,delegateQuery:d});
return this};q._getDelegateOnceCallback=function(b,c,g,d){var a=Array.prototype.slice.call(arguments,0),f=a.slice(4,a.length);
c.apply(g,f);this._off({events:b,delegateQuery:d,callback:c,context:g})};q._getDelegateFuncBindingIdx=function(j,c,f,h,i){var a=-1;
if(this._delegateFuncs[c]&&this._delegateFuncs[c][j]){var d,g,b=this._delegateFuncs[c][j].length;
for(d=0;d<b;d++){g=this._delegateFuncs[c][j][d];if(i&&typeof f==="undefined"){f=g.func
}if(g.func===f&&g.context===h){a=d;break}}}return a};q._triggerDOMEvents=function(h,d,f){var a=[this.el];
if(f){a=u.querySelectorAll(f,this.el)}var g,c,b=a.length;for(g=0;g<b;g++){p.dispatchEvent(a[g],h,{bubbles:true,cancelable:true,detail:d})
}};t.exports=o},{"./DOMEmitterEvent":384,"ac-dom-events":355,"ac-dom-traversal":363,"ac-event-emitter":false}],384:[function(h,m,i){var k=h("ac-dom-events");
var l;var j=function(a,b){this._domEmitter=b;this._originalTarget=k.target(a);this.originalEvent=a||{};
this.target=this._originalTarget||this._domEmitter.el;this.currentTarget=this._domEmitter.el;
this.timeStamp=this.originalEvent.timeStamp||Date.now();if(this._isDOMEvent(this.originalEvent)){if(typeof this.originalEvent.detail==="object"){this.data=this.originalEvent.detail
}}else{if(a){this.data=this.originalEvent;this.originalEvent={}}}};l=j.prototype;
l.preventDefault=function(){k.preventDefault(this.originalEvent)};l.stopPropagation=function(){k.stopPropagation(this.originalEvent)
};l.stopImmediatePropagation=function(){if(this.originalEvent.stopImmediatePropagation){this.originalEvent.stopImmediatePropagation()
}this._domEmitter.stopImmediatePropagation()};l._isDOMEvent=function(a){if(this._originalTarget||(document.createEvent!=="undefined"&&typeof CustomEvent!=="undefined"&&a instanceof CustomEvent)){return true
}return false};m.exports=j},{"ac-dom-events":355}],385:[function(l,k,m){var h=l("./ac-dom-nodes/helpers/nodeTypes");
var j;var i={createDocumentFragment:l("./ac-dom-nodes/createDocumentFragment"),filterByNodeType:l("./ac-dom-nodes/filterByNodeType"),insertAfter:l("./ac-dom-nodes/insertAfter"),insertBefore:l("./ac-dom-nodes/insertBefore"),insertFirstChild:l("./ac-dom-nodes/insertFirstChild"),insertLastChild:l("./ac-dom-nodes/insertLastChild"),isComment:l("./ac-dom-nodes/isComment"),isDocument:l("./ac-dom-nodes/isDocument"),isDocumentFragment:l("./ac-dom-nodes/isDocumentFragment"),isDocumentType:l("./ac-dom-nodes/isDocumentType"),isElement:l("./ac-dom-nodes/isElement"),isNode:l("./ac-dom-nodes/isNode"),isNodeList:l("./ac-dom-nodes/isNodeList"),isTextNode:l("./ac-dom-nodes/isTextNode"),remove:l("./ac-dom-nodes/remove"),replace:l("./ac-dom-nodes/replace")};
for(j in h){i[j]=h[j]}k.exports=i},{"./ac-dom-nodes/createDocumentFragment":386,"./ac-dom-nodes/filterByNodeType":387,"./ac-dom-nodes/helpers/nodeTypes":389,"./ac-dom-nodes/insertAfter":391,"./ac-dom-nodes/insertBefore":392,"./ac-dom-nodes/insertFirstChild":393,"./ac-dom-nodes/insertLastChild":394,"./ac-dom-nodes/isComment":395,"./ac-dom-nodes/isDocument":396,"./ac-dom-nodes/isDocumentFragment":397,"./ac-dom-nodes/isDocumentType":398,"./ac-dom-nodes/isElement":399,"./ac-dom-nodes/isNode":400,"./ac-dom-nodes/isNodeList":401,"./ac-dom-nodes/isTextNode":402,"./ac-dom-nodes/remove":403,"./ac-dom-nodes/replace":404}],386:[function(i,h,f){h.exports=function g(b){var c=document.createDocumentFragment();
var a;if(b){a=document.createElement("div");a.innerHTML=b;while(a.firstChild){c.appendChild(a.firstChild)
}}return c}},{}],387:[function(l,k,m){var j=l("./helpers/isNodeType");var i=l("./helpers/nodeTypes").ELEMENT_NODE;
k.exports=function h(a,b){b=b||i;a=Array.prototype.slice.call(a);return a.filter(function(c){return j(c,b)
})}},{"./helpers/isNodeType":388,"./helpers/nodeTypes":389}],388:[function(g,k,h){var j=g("../isNode");
k.exports=function i(a,b){if(!j(a)){return false}if(typeof b==="number"){return(a.nodeType===b)
}return(b.indexOf(a.nodeType)!==-1)}},{"../isNode":400}],389:[function(d,g,f){g.exports={ELEMENT_NODE:1,TEXT_NODE:3,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11}
},{}],390:[function(u,w,s){var t=u("./nodeTypes");var x=u("./isNodeType");var q=[t.ELEMENT_NODE,t.TEXT_NODE,t.COMMENT_NODE,t.DOCUMENT_FRAGMENT_NODE];
var v=" must be an Element, TextNode, Comment, or Document Fragment";var n=[t.ELEMENT_NODE,t.TEXT_NODE,t.COMMENT_NODE];
var r=" must be an Element, TextNode, or Comment";var p=[t.ELEMENT_NODE,t.DOCUMENT_FRAGMENT_NODE];
var o=" must be an Element, or Document Fragment";var y=" must have a parentNode";
w.exports={parentNode:function(d,a,b,c){c=c||"target";if((d||a)&&!x(d,p)){throw new TypeError(b+": "+c+o)
}},childNode:function(d,a,b,c){c=c||"target";if(!d&&!a){return}if(!x(d,n)){throw new TypeError(b+": "+c+r)
}},insertNode:function(d,a,b,c){c=c||"node";if(!d&&!a){return}if(!x(d,q)){throw new TypeError(b+": "+c+v)
}},hasParentNode:function(c,a,b){b=b||"target";if(!c.parentNode){throw new TypeError(a+": "+b+y)
}}}},{"./isNodeType":388,"./nodeTypes":389}],391:[function(g,k,h){var i=g("./helpers/validate");
k.exports=function j(b,a){i.insertNode(b,true,"insertAfter");i.childNode(a,true,"insertAfter");
i.hasParentNode(a,"insertAfter");if(!a.nextSibling){return a.parentNode.appendChild(b)
}return a.parentNode.insertBefore(b,a.nextSibling)}},{"./helpers/validate":390}],392:[function(k,j,h){var i=k("./helpers/validate");
j.exports=function g(b,a){i.insertNode(b,true,"insertBefore");i.childNode(a,true,"insertBefore");
i.hasParentNode(a,"insertBefore");return a.parentNode.insertBefore(b,a)}},{"./helpers/validate":390}],393:[function(k,j,g){var i=k("./helpers/validate");
j.exports=function h(b,a){i.insertNode(b,true,"insertFirstChild");i.parentNode(a,true,"insertFirstChild");
if(!a.firstChild){return a.appendChild(b)}return a.insertBefore(b,a.firstChild)
}},{"./helpers/validate":390}],394:[function(g,k,h){var j=g("./helpers/validate");
k.exports=function i(b,a){j.insertNode(b,true,"insertLastChild");j.parentNode(a,true,"insertLastChild");
return a.appendChild(b)}},{"./helpers/validate":390}],395:[function(m,l,i){var j=m("./helpers/isNodeType");
var k=m("./helpers/nodeTypes").COMMENT_NODE;l.exports=function h(a){return j(a,k)
}},{"./helpers/isNodeType":388,"./helpers/nodeTypes":389}],396:[function(m,l,h){var j=m("./helpers/isNodeType");
var i=m("./helpers/nodeTypes").DOCUMENT_NODE;l.exports=function k(a){return j(a,i)
}},{"./helpers/isNodeType":388,"./helpers/nodeTypes":389}],397:[function(m,l,h){var j=m("./helpers/isNodeType");
var i=m("./helpers/nodeTypes").DOCUMENT_FRAGMENT_NODE;l.exports=function k(a){return j(a,i)
}},{"./helpers/isNodeType":388,"./helpers/nodeTypes":389}],398:[function(h,m,i){var j=h("./helpers/isNodeType");
var k=h("./helpers/nodeTypes").DOCUMENT_TYPE_NODE;m.exports=function l(a){return j(a,k)
}},{"./helpers/isNodeType":388,"./helpers/nodeTypes":389}],399:[function(m,l,h){var j=m("./helpers/isNodeType");
var i=m("./helpers/nodeTypes").ELEMENT_NODE;l.exports=function k(a){return j(a,i)
}},{"./helpers/isNodeType":388,"./helpers/nodeTypes":389}],400:[function(d,g,f){g.exports=d(161)
},{}],401:[function(d,g,f){g.exports=d(162)},{}],402:[function(m,l,i){var j=m("./helpers/isNodeType");
var h=m("./helpers/nodeTypes").TEXT_NODE;l.exports=function k(a){return j(a,h)}
},{"./helpers/isNodeType":388,"./helpers/nodeTypes":389}],403:[function(k,j,g){var i=k("./helpers/validate");
j.exports=function h(a){i.childNode(a,true,"remove");if(!a.parentNode){return a
}return a.parentNode.removeChild(a)}},{"./helpers/validate":390}],404:[function(g,j,h){var i=g("./helpers/validate");
j.exports=function k(b,a){i.insertNode(b,true,"insertFirstChild","newNode");i.childNode(a,true,"insertFirstChild","oldNode");
i.hasParentNode(a,"insertFirstChild","oldNode");return a.parentNode.replaceChild(b,a)
}},{"./helpers/validate":390}],405:[function(d,g,f){g.exports=d(76)},{"./ac-prefixer/Prefixer":406}],406:[function(d,g,f){g.exports=d(77)
},{"./Prefixer/camelCasedEvents":407}],407:[function(d,g,f){g.exports=d(78)},{}],408:[function(d,g,f){g.exports={canvasAvailable:d("./ac-feature/canvasAvailable"),continuousScrollEventsAvailable:d("./ac-feature/continuousScrollEventsAvailable"),cookiesAvailable:d("./ac-feature/cookiesAvailable"),cssLinearGradientAvailable:d("./ac-feature/cssLinearGradientAvailable"),cssPropertyAvailable:d("./ac-feature/cssPropertyAvailable"),isDesktop:d("./ac-feature/isDesktop"),isHandheld:d("./ac-feature/isHandheld"),isRetina:d("./ac-feature/isRetina"),isTablet:d("./ac-feature/isTablet"),localStorageAvailable:d("./ac-feature/localStorageAvailable"),sessionStorageAvailable:d("./ac-feature/sessionStorageAvailable"),svgAvailable:d("./ac-feature/svgAvailable"),threeDTransformsAvailable:d("./ac-feature/threeDTransformsAvailable"),touchAvailable:d("./ac-feature/touchAvailable")}
},{"./ac-feature/canvasAvailable":409,"./ac-feature/continuousScrollEventsAvailable":410,"./ac-feature/cookiesAvailable":411,"./ac-feature/cssLinearGradientAvailable":412,"./ac-feature/cssPropertyAvailable":413,"./ac-feature/isDesktop":414,"./ac-feature/isHandheld":415,"./ac-feature/isRetina":416,"./ac-feature/isTablet":417,"./ac-feature/localStorageAvailable":418,"./ac-feature/sessionStorageAvailable":419,"./ac-feature/svgAvailable":420,"./ac-feature/threeDTransformsAvailable":421,"./ac-feature/touchAvailable":422}],409:[function(g,k,h){var i=null;
k.exports=function j(){var a;if(i===null){a=document.createElement("canvas");i=!!(typeof a.getContext==="function"&&a.getContext("2d"))
}return i}},{}],410:[function(o,n,i){var k=o("ac-browser");var j=o("./touchAvailable");
var m=null;n.exports=function l(){if(m===null){m=(!j()||(k.os==="iOS"&&k.version>=8)||k.name==="Chrome")
}return m}},{"./touchAvailable":422,"ac-browser":342}],411:[function(l,k,m){var i=Object.prototype.hasOwnProperty;
var j=null;k.exports=function h(){if(j===null){j=false;try{if("cookie" in document&&!!navigator.cookieEnabled){document.cookie="ac_feature_cookie=1";
j=(document.cookie.indexOf("ac_feature_cookie")!==-1);document.cookie="ac_feature_cookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
}}catch(a){}}return j}},{}],412:[function(l,k,m){var i=l("./cssPropertyAvailable");
var j=null;k.exports=function h(){var a;if(j===null){a=["linear-gradient(to bottom right, #9f9, white)","linear-gradient(top left, #9f9, white)","gradient(linear, left top, right bottom, from(#9f9), to(white))"];
j=a.some(function(b){return i("background-image",b)})}return j}},{"./cssPropertyAvailable":413}],413:[function(k,j,g){var i=k("ac-prefixer");
j.exports=function h(a,b){if(b){return !!i.getStyleValue(a,b)}else{return !!i.getStyleProperty(a)
}}},{"ac-prefixer":405}],414:[function(k,j,m){var h=k("./touchAvailable");var i=null;
j.exports=function l(){if(i===null){i=(!h()&&!window.orientation)}return i}},{"./touchAvailable":422}],415:[function(l,k,n){var m=l("./isDesktop");
var i=l("./isTablet");var j=null;k.exports=function o(){if(j===null){j=(!m()&&!i())
}return j}},{"./isDesktop":414,"./isTablet":417}],416:[function(f,i,g){i.exports=function h(){var b=["min-device-pixel-ratio:1.5","-webkit-min-device-pixel-ratio:1.5","min-resolution:1.5dppx","min-resolution:144dpi","min--moz-device-pixel-ratio:1.5"];
var a;if(window.devicePixelRatio!==undefined){if(window.devicePixelRatio>=1.5){return true
}}else{for(a=0;a<b.length;a+=1){if(window.matchMedia("("+b[a]+")").matches===true){return true
}}}return false}},{}],417:[function(m,l,o){var n=m("./isDesktop");var i=null;var k=function(){if(typeof window.orientation==="undefined"){return window.screen.width
}return window.screen.width<window.screen.height?window.screen.width:window.screen.height
};l.exports=function j(){if(i===null){i=(!n()&&k()>=600)}return i}},{"./isDesktop":414}],418:[function(k,j,h){var i=null;
j.exports=function g(){if(i===null){i=false;try{i=!!(window.localStorage&&window.localStorage.non_existent!==null)
}catch(a){}}return i}},{}],419:[function(k,j,g){var i=null;j.exports=function h(){if(i===null){try{if(typeof window.sessionStorage!=="undefined"&&typeof window.sessionStorage.setItem==="function"){window.sessionStorage.setItem("ac_browser_detect","test");
i=true;window.sessionStorage.removeItem("ac_browser_detect","test")}else{i=false
}}catch(a){i=false}}return i}},{}],420:[function(k,j,g){var i=null;j.exports=function h(){if(i===null){i=document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
}return i}},{}],421:[function(m,l,h){var i=m("./cssPropertyAvailable");var j=null;
l.exports=function k(){if(j===null){j=(i("perspective","1px")&&i("transform","translateZ(0)"))
}return j}},{"./cssPropertyAvailable":413}],422:[function(k,j,g){var i=null;j.exports=function h(){if(i===null){i=!!(("ontouchstart" in window)||window.DocumentTouch&&document instanceof window.DocumentTouch)
}return i}},{}],423:[function(d,g,f){g.exports=d(26)},{}],424:[function(d,g,f){g.exports=d(27)
},{"./ac-object/clone":425,"./ac-object/create":426,"./ac-object/defaults":427,"./ac-object/extend":428,"./ac-object/getPrototypeOf":429,"./ac-object/isDate":430,"./ac-object/isEmpty":431,"./ac-object/isRegExp":432,"./ac-object/toQueryParameters":433}],425:[function(d,g,f){g.exports=d(28)
},{"./extend":428}],426:[function(d,g,f){g.exports=d(29)},{}],427:[function(d,g,f){g.exports=d(30)
},{"./extend":428}],428:[function(d,g,f){g.exports=d(31)},{}],429:[function(d,g,f){g.exports=d(32)
},{}],430:[function(d,g,f){g.exports=d(33)},{}],431:[function(d,g,f){g.exports=d(34)
},{}],432:[function(d,g,f){g.exports=d(35)},{}],433:[function(d,g,f){g.exports=d(36)
},{qs:423}],434:[function(f,i,g){var h=f("./ac-modal-video/ModalVideo");h.create=f("./ac-modal-video/factory/create");
i.exports={ModalVideo:h}},{"./ac-modal-video/ModalVideo":435,"./ac-modal-video/factory/create":438}],435:[function(y,A,v){var z=y("ac-modal");
var C=y("ac-object");var q=y("ac-classlist");var p=y("ac-event-emitter").EventEmitter;
var B=y("./featureDetect/featureDetect");var w=y("./delegate/Default");var r=y("./delegate/Mobile");
var t=w;var s;var x={deepLink:false,playOnOpen:false,closeOnEnded:false,autoAppend:true};
var u=function(a,b){this.options=C.defaults(x,b||{});this.modal=this.options.modal||new z.Modal();
this._delegate=this._createDelegate();this.setPlayer(a);if(this.options.autoAppend){this.appendPlayer(a)
}q.add(this.modal.modalEl,"ac-modal-video");this.modal.propagateTo(this);this.modal.on("willclose",this._willClose,this)
};s=u.prototype=C.create(p.prototype);s._createDelegate=function(){var a;var b=w;
if(B.shouldPlayInModal()===false){b=r}return new b(this.player,this.modal,this.options)
};s.appendPlayer=function(b){var a=document.createElement("div");b.appendTo(a);
this.modal.appendContent(a)};s.getPlayer=function(){return this._delegate.getPlayer()
};s.setPlayer=function(a){return this._delegate.setPlayer(a)};s.open=function(){this._delegate.open()
};s.close=function(){this._delegate.close()};s._willClose=function(){this._delegate.willClose()
};s._pause=function(){this._delegate.pause()};A.exports=u},{"./delegate/Default":436,"./delegate/Mobile":437,"./featureDetect/featureDetect":440,"ac-classlist":346,"ac-event-emitter":false,"ac-modal":456,"ac-object":424}],436:[function(m,l,i){var j=m("ac-browser");
function h(b,a,c){this.player=b;this.modal=a;this.options=c}var k=h.prototype;k.pause=function(){if(this.player&&this.player.getReadyState()>0){this.player.pause()
}};k.play=function(){if(this.player&&this.player.getReadyState()>0){this.player.play()
}else{this.player.once("loadedmetadata",this.player.play,this.player)}};k._bindPlayerEvents=function(){this.player.on("ended",this._onEnded,this)
};k._unbindPlayerEvents=function(){this.player.off("ended",this._onEnded,this);
this.player.off("loadedmetadata",this.player.play,this.player);this.player.off("timeupdate",this.pause,this);
this.player.off("play",this.pause,this)};k.open=function(){if(this.player&&this.player.has("timeupdate",this._onTimeUpdateOnce)){this.player.off("timeupdate",this._onTimeUpdateOnce)
}this.modal.open();if(this.player&&this.player.getPaused()){this.player.off("play",this.pause);
if(this.options.playOnOpen){this.play()}}};k.getPlayer=function(){return this.player
};k.setPlayer=function(a){if(this.player){this._unbindPlayerEvents()}this.player=a;
this._bindPlayerEvents()};k._closeModal=function(){this.modal.close()};k._handleExitFullScreen=function(){setTimeout(this._closeModal.bind(this),400)
};k.close=function(){if(j.name.toLowerCase()!=="firefox"&&this.player&&this.player.isFullscreen()){this._boundHandleExitFullScreen=this._handleExitFullScreen.bind(this);
this.player.once("exitfullscreen",this._boundHandleExitFullScreen);this.player.exitFullscreen();
return}this.modal.close()};k.willClose=function(){if(this.player&&this.player.isFullscreen()){this.player.exitFullscreen()
}if(this.player&&this.player.getReadyState()>0){if(this.player.getEnded()===false){this.pause()
}}else{if(this.player){this.player.on("play",this.pause,this)}}if(this.player&&this.player.getEnded()===false){this.player.on("timeupdate",this._onTimeUpdateOnce,this)
}};k._onEnded=function(){if(this.options.closeOnEnded){this.close()}};k._onTimeUpdateOnce=function(){this.pause();
this.player.off("timeupdate",this._onTimeUpdateOnce)};l.exports=h},{"ac-browser":342}],437:[function(o,m,j){var i=o("ac-object");
var k=o("./Default");function n(){k.apply(this,arguments)}var l=n.prototype=i.create(k.prototype);
l.open=function(){this.player.play()};m.exports=n},{"./Default":436,"ac-object":424}],438:[function(n,m,i){var k=n("./../ModalVideo");
var l=n("ac-dom-emitter").DOMEmitter;var j=n("./router");m.exports=function o(b,c){c=c||{};
var d=new k(b,c);var f;if(c.deepLink){f=j.createOrGet();f.createRoute(c.deepLink,d.open,d);
f.start()}if(c.triggerSelector){var a=new l(document);a.on("click",c.triggerSelector,function(g){g.preventDefault();
d.open()},d)}return d}},{"./../ModalVideo":435,"./router":439,"ac-dom-emitter":382}],439:[function(j,i,k){var g=j("ac-router");
var h=null;i.exports={create:function(){h=new g.Router({hashChange:true,pushState:false})
},get:function(){return h},destroy:function(){h=null},createOrGet:function(){if(h===null){this.create()
}return this.get()}}},{"ac-router":461}],440:[function(k,j,g){var i=k("ac-browser");
var h=k("ac-feature");j.exports={shouldPlayInModal:function(){return !(h.isHandheld()&&i.os.toLowerCase()==="ios")
}}},{"ac-browser":342,"ac-feature":408}],441:[function(d,g,f){g.exports=d(346)},{"./ac-classlist/add":442,"./ac-classlist/contains":443,"./ac-classlist/remove":445,"./ac-classlist/toggle":446}],442:[function(d,g,f){g.exports=d(347)
},{"./helpers/className":444}],443:[function(d,g,f){g.exports=d(348)},{"./helpers/className":444}],444:[function(d,g,f){g.exports=d(349)
},{}],445:[function(d,g,f){g.exports=d(350)},{"./helpers/className":444}],446:[function(d,g,f){g.exports=d(351)
},{"./helpers/className":444}],447:[function(d,g,f){g.exports=d(76)},{"./ac-prefixer/Prefixer":448}],448:[function(d,g,f){g.exports=d(77)
},{"./Prefixer/camelCasedEvents":449}],449:[function(d,g,f){g.exports=d(78)},{}],450:[function(d,g,f){g.exports=d(332)
},{"./ac-dom-events/addEventListener":451,"./ac-dom-events/dispatchEvent":452,"./ac-dom-events/removeEventListener":453,"./ac-dom-events/stop":454,"./ac-dom-events/target":455}],451:[function(d,g,f){g.exports=d(80)
},{"ac-prefixer":447}],452:[function(d,g,f){g.exports=d(81)},{}],453:[function(d,g,f){g.exports=d(83)
},{"ac-prefixer":447}],454:[function(d,g,f){g.exports=d(336)},{}],455:[function(d,g,f){g.exports=d(337)
},{}],456:[function(d,g,f){g.exports={Modal:d("./ac-modal/Modal")}},{"./ac-modal/Modal":457}],457:[function(B,C,z){var D=B("ac-classlist");
var u=B("ac-dom-styles");var s=B("ac-dom-events");var t=B("ac-dom-nodes");var v=B("ac-dom-traversal");
var A=B("ac-object");var x=B("ac-keyboard");var r=x.keys;var q=B("ac-event-emitter").EventEmitter;
var E=document.documentElement;var y;function w(a){this.opened=false;this.closeButton=null;
this.modalEl=null;this.contentEl=null;this._keysToClose=[r.ESCAPE];this._keysToOpen=[];
this._boundClose=this.close.bind(this);this._generateElements();if(a){this.appendContent(a)
}}var y=w.prototype=A.create(q.prototype);y._getScrollX=function(){var a=window.pageXOffset;
if(!a){var b=document.documentElement||document.body.parentNode||document.body;
a=b.scrollLeft}return a};y._getScrollY=function(){var a=window.pageYOffset;if(!a){var b=document.documentElement||document.body.parentNode||document.body;
a=b.scrollTop}return a};y.open=function(){this._scrollX=this._getScrollX();this._scrollY=this._getScrollY();
if(!this.opened){this._attachEvents();this.trigger("willopen");D.add(E,"modal-open");
this.opened=true;this.trigger("open")}};y.close=function(){this.trigger("willclose");
this._removeEvents();D.remove(E,"modal-open");this._returnToScrollPosition();this.opened=false;
this.trigger("close")};y.appendContent=function(a){if(a&&t.isElement(a)){this.contentEl.appendChild(a)
}else{throw new TypeError(a+" is not an Element")}};y.removeContent=function(a){if(this.contentEl.contains(a)){t.remove(a)
}};y.emptyContent=function(){var a=v.children(this.contentEl);a.forEach(t.remove)
};y.destroy=function(){};y.addKeyToClose=function(a){this._keysToClose.push(a);
x.addKeyUp(a,this.close,this)};y.removeKeyToClose=function(a){var b=this._keysToClose.indexOf(a);
if(b!==-1){this._keysToClose.splice(b,1)}x.removeKeyUp(a,this.close,this)};y._removeEvents=function(){s.removeEventListener(this.closeButton,"click",this._boundClose);
this._keysToClose.forEach(this.removeKeyToClose,this)};y._attachEvents=function(){s.addEventListener(this.closeButton,"click",this._boundClose);
this._keysToClose.forEach(this.addKeyToClose,this)};y._generateCloseButton=function(){var a=document.createElement("button");
D.add(a,"modal-close","icon","icon-closealt");return a};y._generateModalEl=function(){var a=document.createElement("div");
D.add(a,"modal");return a};y._createContentElement=function(){var a=document.createElement("div");
D.add(a,"modal-content");return a};y._generateElements=function(){this.closeButton=this._closeButton||this._generateCloseButton();
this.contentEl=this._createContentElement();this.modalEl=this._modalEl||this._generateModalEl();
this.modalEl.appendChild(this.closeButton);this.modalEl.appendChild(this.contentEl);
document.body.appendChild(this.modalEl);D.add(E,"has-modal")};y._returnToScrollPosition=function(){window.scrollTo(this._scrollX||0,this._scrollY||0)
};C.exports=w},{"ac-classlist":441,"ac-dom-events":450,"ac-dom-nodes":148,"ac-dom-styles":172,"ac-dom-traversal":183,"ac-event-emitter":false,"ac-keyboard":338,"ac-object":941}],458:[function(d,g,f){g.exports={Routes:d("./ac-routes/Routes"),Route:d("./ac-routes/Route")}
},{"./ac-routes/Route":459,"./ac-routes/Routes":460}],459:[function(g,k,h){function i(c,a,d,b,f){this.path=c;
this.callback=a;this.context=d;this.greedy=b||false;this.priority=f||0;if(typeof this.priority!=="number"){throw new Error("Priority must be a Number.")
}this.identifierPattern="([a-zA-Z0-9\\-\\_]+)";this.tokensRe=new RegExp(":"+this.identifierPattern,"g");
this.matcher=this._createRouteMatcher(c)}var j=i.prototype;j._createRouteMatcher=function(c){if(c&&c.exec){return{pattern:c}
}else{if(c==="/"){return{pattern:/^\/$/}}else{if(typeof c!=="string"){throw new Error("path must be either a string or regex")
}}}var d=this._extractRouteTokens(c);var a=c.replace(this.tokensRe,this.identifierPattern);
var b=new RegExp(a,"g");return{pattern:b,routeTokens:d}};j._extractRouteTokens=function(a){var d=a.replace(this.tokensRe,":"+this.identifierPattern);
var b=new RegExp(d,"g");var c=b.exec(a);if(c&&c.length>1){c=c.slice(1)}else{c=null
}return c};j.match=function(c){this.matcher.pattern.lastIndex=0;var d=this.matcher.pattern.exec(c);
if(d){var b=(d.length)?d.slice(1):[];var a=this.callback;if(a&&typeof a==="function"){a.apply(this.context||this,b);
return true}}return false};k.exports=i},{}],460:[function(m,l,h){var j=m("./Route");
function i(a){this._routes={};if(a){this.addRoutes(a)}}var k=i.prototype;k._getIndex=function(b,a,c){if(this._routes[b]!==undefined){var d=this._routes[b].length;
while(--d>-1){if(this._routes[b][d].callback===a&&this._routes[b][d].context===c){return d
}}}return -1};k.match=function(a){var b,c;for(b in this._routes){c=this._routes[b].length;
while(--c>-1){if(this._routes[b][c].match(a)&&this._routes[b][c].greedy){break}}}};
k.add=function(b){if(this._routes[b.path]===undefined){this._routes[b.path]=[b]
}else{if(!this.get(b.path,b.callback,b.context)){var a,c=this._routes[b.path].length;
if(c>0){for(a=0;a<c;++a){if(this._routes[b.path][a].priority>b.priority){this._routes[b.path].splice(a,0,b);
return b}}}this._routes[b.path].push(b)}}return b};k.remove=function(b){var a=this._getIndex(b.path,b.callback,b.context);
if(a>-1){this._routes[b.path].splice(a,1);return b}return false};k.get=function(b,a,c){var d=this._getIndex(b,a,c);
if(d>-1){return this._routes[b][d]}return false};k.createRoute=function(c,a,d,b,f){var g=new j(c,a,d,b,f);
this.add(g);return g};k.addRoutes=function(c){if(c instanceof Array){var a,b,d=c.length;
for(a=0;a<d;++a){b=c[a];if(b&&typeof b==="object"){this.add(b)}}}else{throw new Error("routes must be an Array.")
}};k.removeRoutes=function(c){if(c instanceof Array){var a,b,d=c.length;for(a=0;
a<d;++a){b=c[a];if(b&&typeof b==="object"){this.remove(b)}}}else{throw new Error("routes must be an Array.")
}};k.getRoutes=function(a){if(this._routes[a]===undefined){return[]}return this._routes[a]
};l.exports=i},{"./Route":459}],461:[function(d,g,f){g.exports={Router:d("./ac-router/Router"),History:d("./ac-router/History"),Routes:d("ac-routes").Routes,Route:d("ac-routes").Route}
},{"./ac-router/History":462,"./ac-router/Router":463,"ac-routes":458}],462:[function(q,o,j){var p=q("ac-object").create;
var k=q("ac-dom-events");var l=q("ac-event-emitter").EventEmitter;function m(a){a=a||{};
this.history=window.history;this.rootStripper=/^\/+|\/+$/g;this.root=a.root||"/";
this.root=("/"+this.root+"/").replace(this.rootStripper,"/");var b=typeof a.resolveInitialHash!=="boolean"?true:a.resolveInitialHash;
this._pushState=typeof a.pushState!=="boolean"?true:a.pushState;this._hashChange=a.hashChange||false;
this._setUpdateVars(b);if(a.autoStart){this.start()}}var n=m.prototype=p(l.prototype);
n._isRoot=function(a){return("/"+a+"/").replace(this.rootStripper,"/")===this.root
};n._isPushStateSupported=function(){return(this.history&&this.history.pushState)
};n._isHashChangeSupported=function(){return("onhashchange" in window)};n._setUpdateVars=function(a){if(this._pushState&&this._isPushStateSupported()){if(a&&this._hashChange&&window.location.href.indexOf("#")!==-1){this.history.pushState({},document.title,window.location.href.replace("#",""))
}this._hashChange=false}else{if(a&&this._pushState&&this._hashChange&&window.location.href.indexOf("#")<0){if(!window.location.origin){window.location.origin=window.location.protocol+"//"+window.location.hostname;
window.location.origin+=(window.location.port?":"+window.location.port:"")}var b=window.location.href.substr(window.location.origin.length+this.root.length);
if(b.length){window.location=window.location.origin+this.root+"#"+b;return}}if(this._hashChange&&!this._isHashChangeSupported()){this._interval=50;
this._iframe=document.createElement('<iframe src="javascript:0" tabindex="-1" style="display:none;">');
this._iframe=document.body.appendChild(this._iframe).contentWindow;this._iframe.document.open().close()
}this._pushState=false}};n._checkUrl=function(){var a=this._iframe.location.hash.substr(1);
if(a.length===0){a="/"}if(this.fragment()!==a){window.location.hash="#"+a;this._ignoreHashChange=false;
this._handleHashChange()}};n._handlePopState=function(a){this.trigger("popstate",{fragment:this.fragment()})
};n._handleHashChange=function(a){if(this._ignoreHashChange){this._ignoreHashChange=false;
return}this.trigger("popstate",{fragment:this.fragment()})};n.canUpdate=function(){return this._pushState||this._hashChange
};n.start=function(){if(!this.started&&(this._pushState||this._hashChange)){this.started=true;
if(this._pushState){this._handlePopState=this._handlePopState.bind(this);k.addEventListener(window,"popstate",this._handlePopState)
}else{if(this._hashChange){if(this._isHashChangeSupported()){this._handleHashChange=this._handleHashChange.bind(this);
k.addEventListener(window,"hashchange",this._handleHashChange)}else{this._iframe.location.hash=this.fragment();
this._checkUrl=this._checkUrl.bind(this);this._checkUrlInterval=setInterval(this._checkUrl,this._interval)
}}}}return this.started||false};n.stop=function(){if(this.started){this.started=false;
if(this._pushState){k.removeEventListener(window,"popstate",this._handlePopState)
}else{if(this._hashChange){if(this._isHashChangeSupported()){k.removeEventListener(window,"hashchange",this._handleHashChange)
}else{if(this._checkUrlInterval){clearInterval(this._checkUrlInterval);this._checkUrlInterval=null
}}}}}};n.navigate=function(a,b){if(!this.started||!this.canUpdate()){return false
}b=b||{};var c=((this._isRoot(a)?"":this.root)+a).replace(/([^:])(\/\/)/g,"$1/");
if(this._pushState){this.history.pushState(b,document.title,c)}else{if(this._hashChange){this._ignoreHashChange=true;
window.location.hash="#"+a;if(!this._isHashChangeSupported()){this._iframe.document.open().close();
this._iframe.location.hash="#"+a}}}return true};n.fragment=function(){var a="";
if(this._pushState){a=(window.location.pathname).substr(this.root.length)}else{if(this._hashChange){a=window.location.hash.substr(1)
}}return a===""?"/":a};o.exports=m},{"ac-dom-events":111,"ac-event-emitter":false,"ac-object":941}],463:[function(r,s,p){var n=r("ac-object").create;
var l=r("ac-dom-emitter").DOMEmitter;var q=r("./History");var m=r("ac-routes").Route;
var u=r("ac-routes").Routes;function t(a){a=a||{};this._intercept=a.intercept||"[data-route]";
this._interceptAttribute=a.attribute||"href";this._handleTrigger=this._handleTrigger.bind(this);
this.intercept(this._intercept);this.history=a.history||new q({root:a.root,autoStart:a.autoStart,pushState:a.pushState,hashChange:a.hashChange,resolveInitialHash:a.resolveInitialHash});
u.call(this,a.routes);if(a.autoStart){if(!this.history.started){this.history.start()
}this.start()}}var o=t.prototype=n(u.prototype);o._handleTrigger=function(a){if(!this.started){return
}var b=a.target.getAttribute(this._interceptAttribute);if(b){if(/^(http|https):\/\/+/.exec(b)&&this._interceptAttribute==="href"){b=b.substr(b.indexOf(this.history.root)+this.history.root.length)||"/"
}if(this.navigate(b)){a.preventDefault()}}};o._handlePopstate=function(a){this.navigate(a.fragment,true)
};o.start=function(){if(!this.started){this.started=true;this.history.start();this._handlePopstate=this._handlePopstate.bind(this);
this.history.on("popstate",this._handlePopstate);this.navigate(this.history.fragment(),true)
}};o.stop=function(){if(this.started){this.started=false;this.history.stop();this.history.off("popstate",this._handlePopstate)
}};o.navigate=function(a,b){if(this.history.fragment()===a&&!b){return this.history.canUpdate()
}if(a&&!b){if(!this.history.navigate(a)){return false}}this.match(a);return true
};o.intercept=function(a,c){var b=new l(c||document.body);b.on("click",a,this._handleTrigger)
};s.exports=t},{"./History":462,"ac-dom-emitter":106,"ac-object":941,"ac-routes":458}],464:[function(d,g,f){g.exports=d(26)
},{}],465:[function(d,g,f){g.exports={isString:d("./ac-string/isString"),toCamelCase:d("./ac-string/toCamelCase"),queryStringToObject:d("./ac-string/queryStringToObject"),toQueryPair:d("./ac-string/toQueryPair"),queryParameters:d("./ac-string/queryParameters"),supplant:d("./ac-string/supplant")}
},{"./ac-string/isString":466,"./ac-string/queryParameters":467,"./ac-string/queryStringToObject":468,"./ac-string/supplant":469,"./ac-string/toCamelCase":470,"./ac-string/toQueryPair":471}],466:[function(i,h,f){h.exports=function g(a){return(typeof a==="string")
}},{}],467:[function(j,i,k){var h=j("./queryStringToObject");i.exports=function g(){var b={};
var a=window.location.toString().split("?")[1];if(typeof a==="string"){b=h(a)}return b
}},{"./queryStringToObject":468}],468:[function(j,i,k){var h=j("qs");i.exports=function g(a){if(typeof a!=="string"){throw new TypeError("QueryStringToObject error: argument must be a string")
}return h.parse(a)}},{qs:464}],469:[function(f,i,g){i.exports=function h(a,b,c){if(!b){return a
}c=c||/{([^{}]*)}/g;return a.replace(c,function(l,m){var d=b[m];return typeof d==="string"||typeof d==="number"?d:l
})}},{}],470:[function(f,i,g){i.exports=function h(a){if(typeof a!=="string"){throw new TypeError("Argument must be of type String.")
}return a.replace(/-+(.)?/g,function(c,b){return b?b.toUpperCase():""})}},{}],471:[function(f,i,g){i.exports=function h(b,a){if(typeof b!=="string"||typeof a!=="string"){throw new TypeError("toQueryPair error: argument must be a string")
}return encodeURIComponent(b)+"="+encodeURIComponent(a)}},{}],472:[function(m,l,h){var i=m("./ac-vatman/vat-client");
var k=m("./ac-vatman/vat-resource");var j={createPlayer:m("./ac-vatman/factory/createPlayer"),vatClient:i,vatResource:k};
l.exports=j},{"./ac-vatman/factory/createPlayer":473,"./ac-vatman/vat-client":480,"./ac-vatman/vat-resource":481}],473:[function(w,y,t){var n=w("./../featureDetection/canPlayType");
var v=w("./../featureDetection/canPlayTypeNatively");var o=w("./../featureDetection/canPlayTypeQuicktime");
var p=w("./../featureDetection/featureDetect").shouldPlayQuicktime;var r=w("./../featureDetection/featureDetect").textTrackDisablingNotAvailable;
function s(a,b){b.type="quicktime";return a.create(b)}function q(a,b){return a.create(b)
}function u(c){var a=this.findTextTrackModelFromNativeTrack(c);var b=this.getEnabledTextTracks();
b.forEach(function(d){if(a.cid!==d.cid){d.disable()}});if(a.get("mode")==="disabled"){a.hide()
}}function x(b,c){c=c||{};var d="video/quicktime";var f="video/mp4";var a;if(v(d)||v(f)&&(!p())){a=q(b,c)
}else{if(o(d)){c.type="quicktime";a=s(b,c)}}if(a&&!r()){a.on("addtrack",u,a)}return a
}y.exports=x},{"./../featureDetection/canPlayType":474,"./../featureDetection/canPlayTypeNatively":475,"./../featureDetection/canPlayTypeQuicktime":476,"./../featureDetection/featureDetect":477}],474:[function(h,l,i){var k=h("./canPlayTypeNatively");
var m=h("./canPlayTypeQuicktime");function j(a){var b=k(a);if(!b){b=m(a)}return b
}l.exports=j},{"./canPlayTypeNatively":475,"./canPlayTypeQuicktime":476}],475:[function(m,l,h){var k;
function i(){return document.createElement("video")}l.exports=function j(b){var a="";
var c=i();if(typeof c.canPlayType==="function"){a=c.canPlayType(b)}return a}},{}],476:[function(k,i,g){var h=k("./quicktime");
i.exports=function j(b){var a="";if(b==="video/quicktime"&&h.getPluginVersion()!==undefined){a="maybe"
}return a}},{"./quicktime":478}],477:[function(g,k,h){var i=g("ac-browser");var j=i.name.toLowerCase();
k.exports={shouldPlayMOV:function(){return(j==="safari"||j==="safari mobile")},shouldPlayQuicktime:function(){return(j==="ie"&&i.version<9)
},textTrackDisablingNotAvailable:function(){return(j==="safari mobile"&&i.version===7)
}}},{"ac-browser":54}],478:[function(d,g,f){g.exports={getPlugins:function(){return navigator.plugins
},getPluginVersion:function(){var b;var a=/(\d+\.){2}(\d+){1}$/;var m=this.getPlugins();
if(m&&m[0]){for(var c=0;c<m.length;c++){var l=(/QuickTime/i.test(m[c].name)&&typeof b==="undefined");
if(l){if(m[c].version){b=m[c].version}else{if(a.test(m[c].name)){b=m[c].name.match(a);
b=b[0]||undefined}}}}}else{var i=["QuickTime.QuickTime","QuickTimeCheckObject.QuickTimeCheck.1"];
i.forEach(function(j){var h;var k;try{h=new ActiveXObject(j);k=(typeof h==="object"&&typeof h.QuickTimeVersion!=="undefined"&&typeof b==="undefined");
if(k){b=h.QuickTimeVersion}}catch(o){}})}return b}}},{}],479:[function(d,g,f){g.exports={bg:"български език",cs:"Czech",el:"Greek",de:"German",da:"Danish",en:"English",es:"Spanish",et:"Estonian",fi:"Finnish",fr:"Français",hr:"Croatian",hu:"Hungarian",it:"Italian",ja:"Japanese",ko:"Korean",lt:"Lithuanian",lv:"Latvian",nl:"Dutch",no:"Norsk",pl:"Polish",pt:"Portuguese",ro:"Romanian",ru:"Russian",sk:"Slovak",sv:"Swedish",tr:"Turkish",zh:"Chinese"}
},{}],480:[function(A,C,y){var v=A("ac-ajax");var w=A("ac-string");var D=A("./featureDetection/featureDetect");
var u=/(-[a-z]{2}-([a-z]{2}-){0,})[0-9]{8}_r[0-9].+\.mov$/;var E=/_r[0-9].+\.mov$/;
var x=/((-([a-z]{2}))*)-[0-9]+/;var s=/((-([a-z]{2}))*)-/;var B="m";var z="_{width}x{height}{suffix}."+B+"p4";
var t=[{width:416,height:234,type:"baseline-high",suffix:"h"},{width:416,height:234,type:"small",suffix:"h"},{width:416,height:234,type:"baseline-low",suffix:"l"},{width:416,height:234,type:"baseline-medium",suffix:"m"},{width:640,height:360,type:"medium",suffix:"h"},{width:848,height:480,type:"large",suffix:""},{width:960,height:540,type:"large",suffix:""},{width:1280,height:720,type:"large",suffix:"h"},{width:1280,height:720,type:"large",suffix:"l"},{width:1920,height:1080,type:"large",suffix:"l"},{width:1920,height:1080,type:"large",suffix:"h"}];
var m=[t[2]];var r={create:function(){var a=function(){};a.prototype=this;return new a()
},getSource:function(a,d,f){var b=(D.shouldPlayQuicktime())?m:t;if(!a){throw"Must provide a vatRefMovie"
}if(!d){throw"Must provide a width"}if(f){b=b.filter(function(g){return g.type===f
})}var c=b.reduce(function(h,g){return Math.abs(g.width-d)<Math.abs(h.width-d)?g:h
});return a.replace(E,w.supplant(z,c))},getConfigPath:function(a){return a.replace(u,"-current.json")
},getConfig:function(a){return v.getJSON({url:this.getConfigPath(a)})},getVTTSource:function(a){return a.replace(E,"_cc.vtt")
}};C.exports=r},{"./featureDetection/featureDetect":477,"ac-ajax":13,"ac-string":465}],481:[function(o,n,i){var j=o("./vat-client");
var k=o("./localization/language");var l=o("./featureDetection/featureDetect").shouldPlayMOV;
var m={create:function(b){if(!b){throw"Must provide a vatRefMovie."}var a=function(){};
a.prototype=this;var c=new a();c.vatRefMovie=b;c.vatVTTSource=[];return c},getSource:function(a,b){return j.getSource(this.vatRefMovie,a,b)
},getConfig:function(){return j.getConfig(this.vatRefMovie)},getVTTSource:function(){return j.getVTTSource(this.vatRefMovie)
},_getCaptionsSrcLang:function(a){var b="";if(typeof a==="string"&&a.indexOf("-")!==-1){b=a.split("-")[0]
}return b},_isNewVTTSrc:function(a){return(this.vatVTTSource.indexOf(a)===-1)},_handleCaptions:function(b){var a;
var d="";var c={};this.getConfig().then(function(f){if(!f.metadata.captions){return
}a=this.getVTTSource();if(a&&(this._isNewVTTSrc(a)===true)){if(f.metadata.lang){d=this._getCaptionsSrcLang(f.metadata.lang)
}c.kind="caption";c.src=a;c.mode="hidden";if(d){c.srclang=d;c.label=k[d]||null}b.addTextTrackFromRemoteVTT(c);
this.vatVTTSource.push(a)}}.bind(this))},setPlayerSrc:function(d,a,c){var b=this.vatRefMovie;
if(!l()){b=this.getSource(a,c)}d.setSrc(b);this._handleCaptions(d)}};n.exports=m
},{"./featureDetection/featureDetect":477,"./localization/language":479,"./vat-client":480}],482:[function(d,g,f){g.exports=d(271)
},{"./ac-shared-instance/SharedInstance":483}],483:[function(d,g,f){g.exports=d(272)
},{}],484:[function(d,g,f){g.exports={CID:d("./ac-mvc-cid/CID")}},{"./ac-mvc-cid/CID":485}],485:[function(q,o,j){var k=q("ac-shared-instance").SharedInstance;
var n="ac-mvc-cid:CID",p="1.0.0";function l(){this._idCount=0}var m=l.prototype;
m._cidPrefix="cid";m.getNewCID=function(){var a=this._cidPrefix+"-"+this._idCount;
this._idCount++;return a};o.exports=k.share(n,p,l)},{"ac-shared-instance":482}],486:[function(d,g,f){g.exports=d(26)
},{}],487:[function(d,g,f){g.exports=d(27)},{"./ac-object/clone":488,"./ac-object/create":489,"./ac-object/defaults":490,"./ac-object/extend":491,"./ac-object/getPrototypeOf":492,"./ac-object/isDate":493,"./ac-object/isEmpty":494,"./ac-object/isRegExp":495,"./ac-object/toQueryParameters":496}],488:[function(d,g,f){g.exports=d(28)
},{"./extend":491}],489:[function(d,g,f){g.exports=d(29)},{}],490:[function(d,g,f){g.exports=d(30)
},{"./extend":491}],491:[function(d,g,f){g.exports=d(31)},{}],492:[function(d,g,f){g.exports=d(32)
},{}],493:[function(d,g,f){g.exports=d(33)},{}],494:[function(d,g,f){g.exports=d(34)
},{}],495:[function(d,g,f){g.exports=d(35)},{}],496:[function(d,g,f){g.exports=d(36)
},{qs:486}],497:[function(d,g,f){g.exports={Model:d("./ac-mvc-model/Model")}},{"./ac-mvc-model/Model":498}],498:[function(q,p,j){var n=q("ac-event-emitter").EventEmitter;
var k=q("ac-object");var m=q("ac-mvc-cid").CID;var l=function(a){this.attributes=k.defaults(this.defaultAttributes,a||{});
this.cid=m.getNewCID();if(this.attributes[this.idAttribute]){this.id=this.attributes[this.idAttribute]
}};var o=l.prototype=k.create(n.prototype);o.defaultAttributes={};o.idAttribute="id";
o._trigger=function(a,b,c){c=c||{};if(c.silent!==true){this.trigger(a,b)}};o._triggerChange=function(a,b,c){return this._trigger("change:"+a,b,c)
};o.get=function(a){if(!this.attributes){return}return this.attributes[a]};o.set=function(c,d){if(!this.attributes){return
}var g;var h;var a;var b={};var f=false;for(g in c){if(c.hasOwnProperty(g)){a=this.get(g);
if((typeof a==="object"&&typeof c[g]==="object"&&JSON.stringify(a)===JSON.stringify(c[g]))||(a===c[g])){continue
}f=true;this.attributes[g]=c[g];h={value:c[g],previous:a};b[g]=h;this._triggerChange(g,h,d)
}}if(f){this._trigger("change",b,d)}};o.has=function(a){if(!this.attributes){return false
}return(this.attributes[a]!==undefined)};o.eachAttribute=function(b,c){if(!this.attributes){return
}var a;for(a in this.attributes){if(this.attributes.hasOwnProperty(a)){b.call(c,{attribute:a,value:this.attributes[a]})
}}};o.destroy=function(){this.trigger("destroy");this.off();var a;for(a in this){if(this.hasOwnProperty(a)){this[a]=null
}}};p.exports=l},{"ac-event-emitter":false,"ac-mvc-cid":484,"ac-object":487}],499:[function(d,g,f){g.exports={localization:d("./ac-video-localization/localization")}
},{"./ac-video-localization/localization":500}],500:[function(j,q,k){var m=j("./translations");
var n="/global/ac_media_player/scripts/ac_media_languages/";var o=document.getElementsByTagName("html")[0];
var p=j("ac-mvc-model").Model;var l={create:function(a){a=a||this.getLang();var b=this.getRequestPath(a);
return this.sendRequest(b)},getRequestPath:function(a){return n+this.getTranslationFileName(a)
},getLang:function(){var b=o.getAttribute("lang");var a;if(!b){a="en-us"}else{switch(b.toLowerCase()){case"es-418":a="es-LA";
break;case"pt":a="pt-BR";break;default:a=b;break}}return a},getTranslationFileName:function(c){var a=c.toLowerCase().split("-")[0];
var b=m[c]||false;if(!b){b=m[a]||m.en}return b},sendRequest:function(a){return new Promise(function(b,c){var d=new XMLHttpRequest();
d.onreadystatechange=function(){if(d.readyState===4){if(d.status>=200&&d.status<300){try{var h=JSON.parse(d.responseText);
for(var f in h){h[f].replace(/<br\s{0,}\/>/g,"")}b(new p(h))}catch(g){c(g)}}else{c(d)
}}};d.open("GET",a);d.send()})}};q.exports=l},{"./translations":501,"ac-mvc-model":497}],501:[function(d,g,f){g.exports={"bg-BG":"bg-BG.json","cs-CZ":"cs-CZ.json","el-GR":"el-GR.json","de-AT":"de-AT.json","de-CH":"de-CH.json","de-DE":"de-DE.json","de-LI":"de-LI.json","da-DK":"da-DK.json",en:"en.json","en-US":"en-US.json","en-AP":"en-AP.json","en-CA":"en-CA.json","en-GB":"en-GB.json","en-HK":"en-HK.json","en-IE":"en-IE.json","en-IN":"en-IN.json","en-KR":"en-KR.json","en-AU":"en-AU.json","en-NZ":"en-NZ.json","en-SG":"en-SG.json","en-ZA":"en-ZA.json",es:"es.json","es-LA":"es-LA.json","es-MX":"es-MX.json","es-ES":"es-ES.json","et-EE":"et-EE.json","fi-FI":"fi-FI.json",fr:"fr.json","fr-BE":"fr-BE.json","fr-CA":"fr-CA.json","fr-CH":"fr-CH.json","fr-FR":"fr-FR.json","hr-HR":"hr-HR.json","hu-HU":"hu-HU.json","it-IT":"it-IT.json",ja:"ja.json","ja-JP":"ja-JP.json","ko-KR":"ko-KR.json","lt-LT":"lt-LT.json","lv-LV":"lv-LV.json","nl-BE":"nl-BE.json","nl-NL":"nl-NL.json","no-NO":"no-NO.json","pl-PL":"pl-PL.json",pt:"pt.json","pt-BR":"pt-BR.json","pt-PT":"pt-PT.json","ro-RO":"ro-RO.json","ru-RU":"ru-RU.json","sk-SK":"sk-SK.json","sv-SE":"sv-SE.json","tr-TR":"tr-TR.json",zh:"zh.json","zh-CN":"zh-CN.json","zh-HK":"zh-HK.json","zh-TW":"zh-TW.json"}
},{}],502:[function(d,g,f){g.exports=d(346)},{"./ac-classlist/add":503,"./ac-classlist/contains":504,"./ac-classlist/remove":506,"./ac-classlist/toggle":507}],503:[function(d,g,f){g.exports=d(347)
},{"./helpers/className":505}],504:[function(d,g,f){g.exports=d(348)},{"./helpers/className":505}],505:[function(d,g,f){g.exports=d(349)
},{}],506:[function(d,g,f){g.exports=d(350)},{"./helpers/className":505}],507:[function(d,g,f){g.exports=d(351)
},{"./helpers/className":505}],508:[function(l,k,m){var h=l("./ac-dom-nodes/helpers/nodeTypes");
var j;var i={createDocumentFragment:l("./ac-dom-nodes/createDocumentFragment"),filterByNodeType:l("./ac-dom-nodes/filterByNodeType"),insertAfter:l("./ac-dom-nodes/insertAfter"),insertBefore:l("./ac-dom-nodes/insertBefore"),insertFirstChild:l("./ac-dom-nodes/insertFirstChild"),insertLastChild:l("./ac-dom-nodes/insertLastChild"),isComment:l("./ac-dom-nodes/isComment"),isDocument:l("./ac-dom-nodes/isDocument"),isDocumentFragment:l("./ac-dom-nodes/isDocumentFragment"),isDocumentType:l("./ac-dom-nodes/isDocumentType"),isElement:l("./ac-dom-nodes/isElement"),isNode:l("./ac-dom-nodes/isNode"),isTextNode:l("./ac-dom-nodes/isTextNode"),remove:l("./ac-dom-nodes/remove"),replace:l("./ac-dom-nodes/replace")};
for(j in h){i[j]=h[j]}k.exports=i},{"./ac-dom-nodes/createDocumentFragment":509,"./ac-dom-nodes/filterByNodeType":510,"./ac-dom-nodes/helpers/nodeTypes":512,"./ac-dom-nodes/insertAfter":514,"./ac-dom-nodes/insertBefore":515,"./ac-dom-nodes/insertFirstChild":516,"./ac-dom-nodes/insertLastChild":517,"./ac-dom-nodes/isComment":518,"./ac-dom-nodes/isDocument":519,"./ac-dom-nodes/isDocumentFragment":520,"./ac-dom-nodes/isDocumentType":521,"./ac-dom-nodes/isElement":522,"./ac-dom-nodes/isNode":523,"./ac-dom-nodes/isTextNode":524,"./ac-dom-nodes/remove":525,"./ac-dom-nodes/replace":526}],509:[function(d,g,f){g.exports=d(386)
},{}],510:[function(d,g,f){arguments[4][387][0].apply(f,arguments)},{"./helpers/isNodeType":511,"./helpers/nodeTypes":512}],511:[function(d,g,f){arguments[4][388][0].apply(f,arguments)
},{"../isNode":523}],512:[function(d,g,f){g.exports=d(389)},{}],513:[function(d,g,f){arguments[4][390][0].apply(f,arguments)
},{"./isNodeType":511,"./nodeTypes":512}],514:[function(d,g,f){g.exports=d(391)
},{"./helpers/validate":513}],515:[function(d,g,f){g.exports=d(392)},{"./helpers/validate":513}],516:[function(d,g,f){g.exports=d(393)
},{"./helpers/validate":513}],517:[function(d,g,f){g.exports=d(394)},{"./helpers/validate":513}],518:[function(m,l,i){var j=m("./helpers/isNodeType");
var k=m("./helpers/nodeTypes").COMMENT_NODE;l.exports=function h(a){return j(a,k)
}},{"./helpers/isNodeType":511,"./helpers/nodeTypes":512}],519:[function(m,l,h){var j=m("./helpers/isNodeType");
var i=m("./helpers/nodeTypes").DOCUMENT_NODE;l.exports=function k(a){return j(a,i)
}},{"./helpers/isNodeType":511,"./helpers/nodeTypes":512}],520:[function(m,l,h){var j=m("./helpers/isNodeType");
var i=m("./helpers/nodeTypes").DOCUMENT_FRAGMENT_NODE;l.exports=function k(a){return j(a,i)
}},{"./helpers/isNodeType":511,"./helpers/nodeTypes":512}],521:[function(h,m,i){var j=h("./helpers/isNodeType");
var k=h("./helpers/nodeTypes").DOCUMENT_TYPE_NODE;m.exports=function l(a){return j(a,k)
}},{"./helpers/isNodeType":511,"./helpers/nodeTypes":512}],522:[function(m,l,h){var j=m("./helpers/isNodeType");
var i=m("./helpers/nodeTypes").ELEMENT_NODE;l.exports=function k(a){return j(a,i)
}},{"./helpers/isNodeType":511,"./helpers/nodeTypes":512}],523:[function(f,i,g){i.exports=function h(a){return !!(a&&a.nodeType)
}},{}],524:[function(m,l,i){var j=m("./helpers/isNodeType");var h=m("./helpers/nodeTypes").TEXT_NODE;
l.exports=function k(a){return j(a,h)}},{"./helpers/isNodeType":511,"./helpers/nodeTypes":512}],525:[function(d,g,f){g.exports=d(403)
},{"./helpers/validate":513}],526:[function(d,g,f){g.exports=d(404)},{"./helpers/validate":513}],527:[function(d,g,f){g.exports=d(271)
},{"./ac-shared-instance/SharedInstance":528}],528:[function(d,g,f){g.exports=d(272)
},{}],529:[function(d,g,f){g.exports=d(484)},{"./ac-mvc-cid/CID":530}],530:[function(d,g,f){g.exports=d(485)
},{"ac-shared-instance":527}],531:[function(d,g,f){g.exports=d(26)},{}],532:[function(d,g,f){g.exports=d(27)
},{"./ac-object/clone":533,"./ac-object/create":534,"./ac-object/defaults":535,"./ac-object/extend":536,"./ac-object/getPrototypeOf":537,"./ac-object/isDate":538,"./ac-object/isEmpty":539,"./ac-object/isRegExp":540,"./ac-object/toQueryParameters":541}],533:[function(d,g,f){g.exports=d(28)
},{"./extend":536}],534:[function(d,g,f){g.exports=d(29)},{}],535:[function(d,g,f){g.exports=d(30)
},{"./extend":536}],536:[function(d,g,f){g.exports=d(31)},{}],537:[function(d,g,f){g.exports=d(32)
},{}],538:[function(d,g,f){g.exports=d(33)},{}],539:[function(d,g,f){g.exports=d(34)
},{}],540:[function(d,g,f){g.exports=d(35)},{}],541:[function(d,g,f){g.exports=d(36)
},{qs:531}],542:[function(d,g,f){g.exports={View:d("./ac-mvc-view/View")}},{"./ac-mvc-view/View":543}],543:[function(r,t,p){var m=r("ac-dom-emitter").DOMEmitter;
var s=r("ac-mvc-cid").CID;var q=r("ac-object");var n=r("ac-dom-nodes");var l=r("ac-classlist");
function u(b){var d;var a;var c;this.options=q.defaults(this.defaultOptions,b||{});
this.cid=s.getNewCID();this.model=this.options.model;if(this.options.template){this.template=this.options.template
}d=this.options.tagName||this.tagName;a=this.options.element;c=this.options.className||this.className;
if(!a){a=document.createElement(d)}m.call(this,a);if(c){this.addClassName(c)}if(this.options.events){this.delegateEvents(this.options.events)
}}var o=u.prototype=q.create(m.prototype);o.tagName="div";o.defaultOptions={};o.getTagName=function(){return this.el.tagName.toLowerCase()
};o.appendTo=function(a){n.insertLastChild(this.el,a);return this};o.render=function(){};
o.addClassName=function(a){return this._manipulateClassName(a,"add")};o.removeClassName=function(a){return this._manipulateClassName(a,"remove")
};o._manipulateClassName=function(a,c){var b;if(typeof a==="string"){b=a.split(" ")
}else{if(typeof a==="object"&&Array.isArray(a)){b=a.slice()}else{return this}}b.unshift(this.el);
l[c].apply(this.el,b);return this};o.destroy=function(){this.emitterTrigger("destroy");
this.off();n.remove(this.el);var a;for(a in this){if(this.hasOwnProperty(a)){this[a]=null
}}};o.delegateEvents=function(a,d){d=d||this;var b,c;for(b in a){if(a.hasOwnProperty(b)){c=a[b];
if(typeof c==="string"){a[b]=this[a[b]]}}}this.on(a,d);return this};t.exports=u
},{"ac-classlist":502,"ac-dom-emitter":106,"ac-dom-nodes":508,"ac-mvc-cid":529,"ac-object":532}],544:[function(d,g,f){g.exports=d(26)
},{}],545:[function(d,g,f){g.exports=d(465)},{"./ac-string/isString":546,"./ac-string/queryParameters":547,"./ac-string/queryStringToObject":548,"./ac-string/supplant":549,"./ac-string/toCamelCase":550,"./ac-string/toQueryPair":551}],546:[function(d,g,f){g.exports=d(466)
},{}],547:[function(d,g,f){g.exports=d(467)},{"./queryStringToObject":548}],548:[function(d,g,f){g.exports=d(468)
},{qs:544}],549:[function(d,g,f){g.exports=d(469)},{}],550:[function(d,g,f){g.exports=d(470)
},{}],551:[function(d,g,f){g.exports=d(471)},{}],552:[function(d,g,f){g.exports={View:d("./ac-video-nosupportview/NoSupportView")}
},{"./ac-video-nosupportview/NoSupportView":553}],553:[function(p,o,k){var l=p("ac-mvc-view").View;
var q=p("ac-object");var j=p("ac-string");function m(){l.apply(this,arguments)}var n=m.prototype=q.create(l.prototype);
n.className=["ac-video-nosupport"];n.defaultOptions={template:'<a onclick="s_objectID=&quot;http://www.apple.com/quicktime/download/_1&quot;;return this.s_oc?this.s_oc(e):true" href="{downloadquicktimeurl}" class="ac-video-quicktime-download"><span class="ac-video-quicktime-download-title">{downloadquicktimetitle}</span><span class="ac-video-quicktime-download-text">{downloadquicktimetext}</span><span class="ac-video-quicktime-download-button">{downloadquicktimebutton}</span></a>'};
n.render=function(){this.el.innerHTML=j.supplant(this.options.template,this.model.attributes)
};o.exports=m},{"ac-mvc-view":542,"ac-object":941,"ac-string":545}],554:[function(d,g,f){g.exports={log:d("./ac-console/log")}
},{"./ac-console/log":555}],555:[function(l,k,h){var i="f7c9180f-5c45-47b4-8de4-428015f096c0";
var m=!!(function(){try{return window.localStorage.getItem(i)}catch(a){}}());k.exports=function j(){if(window.console&&typeof console.log!=="undefined"&&m){console.log.apply(console,Array.prototype.slice.call(arguments,0))
}}},{}],556:[function(d,g,f){g.exports=d(76)},{"./ac-prefixer/Prefixer":557}],557:[function(d,g,f){g.exports=d(77)
},{"./Prefixer/camelCasedEvents":558}],558:[function(d,g,f){g.exports=d(78)},{}],559:[function(d,g,f){g.exports=d(79)
},{"./ac-dom-events/addEventListener":560,"./ac-dom-events/dispatchEvent":561,"./ac-dom-events/preventDefault":562,"./ac-dom-events/removeEventListener":563,"./ac-dom-events/stop":564,"./ac-dom-events/stopPropagation":565,"./ac-dom-events/target":566}],560:[function(d,g,f){g.exports=d(80)
},{"ac-prefixer":556}],561:[function(d,g,f){g.exports=d(81)},{}],562:[function(d,g,f){g.exports=d(82)
},{}],563:[function(d,g,f){g.exports=d(83)},{"ac-prefixer":556}],564:[function(d,g,f){g.exports=d(84)
},{"./preventDefault":562,"./stopPropagation":565}],565:[function(d,g,f){g.exports=d(85)
},{}],566:[function(d,g,f){g.exports=d(86)},{}],567:[function(d,g,f){g.exports=d(87)
},{"./ac-dom-traversal/ancestor":568,"./ac-dom-traversal/ancestors":569,"./ac-dom-traversal/children":570,"./ac-dom-traversal/filterBySelector":571,"./ac-dom-traversal/firstChild":572,"./ac-dom-traversal/lastChild":575,"./ac-dom-traversal/matchesSelector":576,"./ac-dom-traversal/nextSibling":577,"./ac-dom-traversal/nextSiblings":578,"./ac-dom-traversal/previousSibling":579,"./ac-dom-traversal/previousSiblings":580,"./ac-dom-traversal/querySelector":581,"./ac-dom-traversal/querySelectorAll":582,"./ac-dom-traversal/shims/ie":583,"./ac-dom-traversal/siblings":584}],568:[function(d,g,f){g.exports=d(88)
},{"./helpers/validate":574,"./matchesSelector":576,"ac-dom-nodes":148}],569:[function(d,g,f){g.exports=d(89)
},{"./helpers/validate":574,"./matchesSelector":576,"ac-dom-nodes":148}],570:[function(d,g,f){g.exports=d(90)
},{"./filterBySelector":571,"./helpers/validate":574,"ac-dom-nodes":148}],571:[function(d,g,f){g.exports=d(91)
},{"./helpers/validate":574,"./matchesSelector":576}],572:[function(d,g,f){g.exports=d(92)
},{"./children":570,"./helpers/validate":574}],573:[function(d,g,f){g.exports=d(93)
},{}],574:[function(d,g,f){g.exports=d(94)},{"ac-dom-nodes":148}],575:[function(d,g,f){g.exports=d(95)
},{"./children":570,"./helpers/validate":574}],576:[function(d,g,f){g.exports=d(96)
},{"./helpers/nativeMatches":573,"./helpers/validate":574,"ac-dom-nodes":148}],577:[function(d,g,f){g.exports=d(97)
},{"./helpers/validate":574,"./matchesSelector":576,"ac-dom-nodes":148}],578:[function(d,g,f){g.exports=d(98)
},{"./helpers/validate":574,"./matchesSelector":576,"ac-dom-nodes":148}],579:[function(d,g,f){g.exports=d(99)
},{"./helpers/validate":574,"./matchesSelector":576,"ac-dom-nodes":148}],580:[function(d,g,f){g.exports=d(100)
},{"./helpers/validate":574,"./matchesSelector":576,"ac-dom-nodes":148}],581:[function(d,g,f){g.exports=d(101)
},{"./helpers/validate":574}],582:[function(d,g,f){g.exports=d(102)},{"./helpers/validate":574}],583:[function(d,g,f){g.exports=d(103)
},{"../helpers/nativeMatches":573,"../helpers/validate":574,"../vendor/sizzle/sizzle":585,"ac-dom-nodes":148}],584:[function(d,g,f){g.exports=d(104)
},{"./children":570,"./helpers/validate":574}],585:[function(d,g,f){g.exports=d(105)
},{}],586:[function(d,g,f){arguments[4][106][0].apply(f,arguments)},{"./ac-dom-emitter/DOMEmitter":587}],587:[function(d,g,f){g.exports=d(383)
},{"./DOMEmitterEvent":588,"ac-dom-events":559,"ac-dom-traversal":567,"ac-event-emitter":false}],588:[function(d,g,f){g.exports=d(384)
},{"ac-dom-events":559}],589:[function(d,g,f){g.exports=d(233)},{"./ac-dom-styles/ie":590,"./ac-dom-styles/vendorTransformHelper":591}],590:[function(d,g,f){g.exports=d(234)
},{}],591:[function(d,g,f){g.exports=d(235)},{}],592:[function(d,g,f){g.exports=d(23)
},{"./ac-feature/cssPropertyAvailable":593,"./ac-feature/localStorageAvailable":594}],593:[function(d,g,f){g.exports=d(24)
},{}],594:[function(d,g,f){g.exports=d(25)},{}],595:[function(d,g,f){g.exports=d(224)
},{"./ac-array/flatten":596,"./ac-array/intersection":597,"./ac-array/toArray":598,"./ac-array/union":599,"./ac-array/unique":600,"./ac-array/without":601}],596:[function(d,g,f){g.exports=d(225)
},{}],597:[function(d,g,f){g.exports=d(226)},{}],598:[function(d,g,f){g.exports=d(227)
},{}],599:[function(d,g,f){g.exports=d(228)},{"./flatten":596,"./unique":600}],600:[function(d,g,f){g.exports=d(229)
},{}],601:[function(d,g,f){g.exports=d(230)},{}],602:[function(d,g,f){g.exports=d(271)
},{"./ac-shared-instance/SharedInstance":603}],603:[function(d,g,f){g.exports=d(272)
},{}],604:[function(d,g,f){g.exports=d(484)},{"./ac-mvc-cid/CID":605}],605:[function(d,g,f){g.exports=d(485)
},{"ac-shared-instance":602}],606:[function(d,g,f){g.exports={Collection:d("./ac-mvc-collection/Collection")}
},{"./ac-mvc-collection/Collection":607}],607:[function(x,z,s){var v=x("ac-object"),p=x("ac-array"),y=x("ac-mvc-cid").CID,o=x("ac-event-emitter").EventEmitter;
var t=["every","filter","forEach","map","reduce","reduceRight","some","slice","sort","reverse","indexOf","lastIndexOf"];
var q=["intersection","union","unique","without"];var A={add:"add",remove:"remove",set:"set",reset:"reset",empty:"empty",destroy:"destroy"};
function w(a,d,c,b){if(typeof a[d]!=="undefined"){return}a[d]=(function(g,f){return function(){var h=p.toArray(arguments),i=f.concat(h);
return g.apply(this,i)}}(c,b))}function u(a){o.call(this);this.options=v.defaults(this.defaultOptions,a||{});
this.models=[];this.cid=y.getNewCID();if(this.options.ModelType){this.ModelType=this.options.ModelType
}if(this.ModelType){this._modelsObject={}}this.on(A.add,this._addToModelsObject,this);
this.on(A.remove,this._removeFromModelsObject,this);if(this.options.models){this.add(this.options.models)
}}var r=u.prototype=v.create(o.prototype);r.defaultOptions={};r.count=function(){if(!this.models){return null
}return this.models.length};r.add=function(a,b){b=b||{};if(typeof a==="undefined"){a=[]
}a=this._returnAsArray(a);a=this._createModels(a);if(this.models.length===0){this.models=a
}else{this.models=this.models.concat(a)}this._trigger(A.add,{models:a},b);return this
};r.remove=function(a,c){c=c||{};if(!a){return[]}a=this._returnAsArray(a);var d=[],b,f,g=a.length;
for(b=0;b<g;b++){f=this.indexOf(a[b]);if(f>-1){d.push(a[b]);this.spliceWithOptions([f,1],{silent:true})
}}if(d.length>0){this._trigger(A.remove,{models:d},c)}return d};r.reset=function(a,b){b=b||{};
this.empty(b);this.add(a,b);this._trigger(A.reset,{models:this.models},b);return this
};r.empty=function(a){a=a||{};var b=this.slice(0);this.models=[];if(this._modelsObject){this._modelsObject={}
}if(b.length>0){this._trigger(A.remove,{models:b},a);this._trigger(A.empty,{models:b},a)
}return b};r.destroy=function(c){c=c||{};var a=this.empty(c);this._trigger(A.destroy,{models:a},c);
this.off();var b;for(b in this){if(this.hasOwnProperty(b)){this[b]=null}}};r.get=function(a){var c=this._getModelByID(a);
if(c){return c}var b,d=this.models.length;for(b=0;b<d;b++){if((typeof this.models[b].id!=="undefined"&&this.models[b].id===a)||(typeof this.models[b].cid!=="undefined"&&this.models[b].cid===a)){c=this.models[b];
break}}return c};r.set=function(C,g){g=g||{};if(typeof C==="undefined"){C=[]}C=this._returnAsArray(C);
var n,f="id",j=C.length,i=[],d=[],a={},h;if(this.ModelType&&this.ModelType.prototype.idAttribute){f=this.ModelType.prototype.idAttribute
}if(g.matchParameter){f=g.matchParameter}for(n=0;n<j;n++){h=null;if(typeof C[n]==="object"){h=this.get(C[n][f])
}if(h){if(this.ModelType){h.set(C[n]);a[h.cid]=true}else{h=C[n]}d.push(h);continue
}if(this.ModelType){C[n]=this._createModel(C[n])}if(this.ModelType||this.indexOf(C[n])===-1){i.push(C[n])
}d.push(C[n])}var b,l=d.length,k=[],c,m;j=this.models.length;for(n=0;n<j;n++){m=this.models[n];
if(this.ModelType){c=true;if(a[m.cid]){c=false}}else{c=true;for(b=0;b<l;b++){if(m===d[b]){c=false;
break}}}if(c){k.push(m)}}this.models=d;if(i.length>0){this._trigger(A.add,{models:i},g)
}if(k.length>0){this._trigger(A.remove,{models:k},g)}this._trigger(A.set,{models:d},g);
return k};r.at=function(a){if(!this.models){return}return this.models[a]};r.find=function(i,g){if(typeof i!=="object"){console.warn("Collection.protoype.find query needs to be an object");
return[]}g=g||{};var f=[],j=false,l=0,a,b,d=null,h=0,k=this.models.length,c=k;if(g.reverse){h=k-1;
c=-1;j=true}if(g.limit){d=g.limit}for(b=h;(j?b>c:b<c);(j?b--:b++)){a=this.models[b];
if(this._modelMatchesProperties(a,i)){if(j){f.unshift(a)}else{f.push(a)}l++;if(d&&l>=d){break
}}}return f};r.push=function(){return this.pushWithOptions(p.toArray(arguments))
};r.pop=function(){return this.popWithOptions(p.toArray(arguments))};r.shift=function(){return this.shiftWithOptions(p.toArray(arguments))
};r.unshift=function(){return this.unshiftWithOptions(p.toArray(arguments))};r.splice=function(){return this.spliceWithOptions(p.toArray(arguments))
};r.pushWithOptions=function(b,c){c=c||{};var a=this._createModels(b),d=Array.prototype.push.apply(this.models,a);
if(a.length>0){this._trigger(A.add,{models:a},c)}return d};r.popWithOptions=function(b,c){c=c||{};
var a=Array.prototype.pop.call(this.models);if(a){this._trigger(A.remove,{models:[a]},c)
}return a};r.shiftWithOptions=function(b,c){c=c||{};var a=Array.prototype.shift.call(this.models);
if(a){this._trigger(A.remove,{models:[a]},c)}return a};r.unshiftWithOptions=function(b,c){c=c||{};
var a=this._createModels(b),d=Array.prototype.unshift.apply(this.models,a);if(a.length>0){this._trigger(A.add,{models:a},c)
}return d};r.spliceWithOptions=function(d,f){f=f||{};var c=[d[0],d[1]],g,a,b;if(d.length>2){g=d.slice(2,d.length);
a=this._createModels(g);c=c.concat(a)}b=Array.prototype.splice.apply(this.models,c);
if(b.length>0){this._trigger(A.remove,{models:b},f)}if(a){this._trigger(A.add,{models:a},f)
}return b};r._trigger=function(c,a,b){b=b||{};if(!b.silent){this.trigger(c,a)}};
r._getModelByID=function(a){if(this.ModelType&&this._modelsObject&&this._modelsObject[a]){return this._modelsObject[a]
}return null};r._createModel=function(a){if(a instanceof this.ModelType||a instanceof u){return a
}return new this.ModelType(a)};r._createModels=function(c){if(!this.ModelType){return Array.prototype.slice.call(c,0)
}var d=[],b,a,f=c.length;for(a=0;a<f;a++){b=c[a];if(!(b instanceof this.ModelType)){b=this._createModel(b)
}d.push(b)}return d};r._modelMatchesProperties=function(c,a){var b;for(b in a){if(a.hasOwnProperty(b)){if(this._getPropFromModel(c,b)!==a[b]){return false
}}}return true};r._getPropFromModel=function(b,a){if(this.ModelType){return b.get(a)
}return b[a]};r._addToModelsObject=function(a){if(!this._modelsObject||!a.models){this._modelsObject={}
}a.models.forEach(function(b){this._modelsObject[b.id]=b;this._modelsObject[b.cid]=b
},this)};r._removeFromModelsObject=function(a){if(!this._modelsObject||!a.models){this._modelsObject={}
}a.models.forEach(function(b){this._modelsObject[b.id]=null;this._modelsObject[b.cid]=null
},this)};r._returnAsArray=function(a){if(!Array.isArray(a)){a=[a]}return a};r._acArrayProxy=function(a){var b=p.toArray(arguments);
b[0]=this.models;return p[a].apply(p,b)};r._arrayPrototypeProxy=function(a){var b=p.toArray(arguments);
b.shift();return Array.prototype[a].apply(this.models,b)};t.forEach(function(a){if(typeof Array.prototype[a]==="function"){w(this,a,this._arrayPrototypeProxy,[a])
}},r);q.forEach(function(a){if(typeof p[a]==="function"){w(this,a,this._acArrayProxy,[a])
}},r);z.exports=u},{"ac-array":595,"ac-event-emitter":false,"ac-mvc-cid":604,"ac-object":646}],608:[function(d,g,f){g.exports=d(271)
},{"./ac-shared-instance/SharedInstance":609}],609:[function(d,g,f){g.exports=d(272)
},{}],610:[function(d,g,f){g.exports=d(484)},{"./ac-mvc-cid/CID":611}],611:[function(d,g,f){g.exports=d(485)
},{"ac-shared-instance":608}],612:[function(d,g,f){g.exports=d(497)},{"./ac-mvc-model/Model":613}],613:[function(d,g,f){g.exports=d(498)
},{"ac-event-emitter":false,"ac-mvc-cid":610,"ac-object":646}],614:[function(d,g,f){g.exports=d(346)
},{"./ac-classlist/add":615,"./ac-classlist/contains":616,"./ac-classlist/remove":618,"./ac-classlist/toggle":619}],615:[function(d,g,f){g.exports=d(347)
},{"./helpers/className":617}],616:[function(d,g,f){g.exports=d(348)},{"./helpers/className":617}],617:[function(d,g,f){g.exports=d(349)
},{}],618:[function(d,g,f){g.exports=d(350)},{"./helpers/className":617}],619:[function(d,g,f){g.exports=d(351)
},{"./helpers/className":617}],620:[function(d,g,f){g.exports=d(508)},{"./ac-dom-nodes/createDocumentFragment":621,"./ac-dom-nodes/filterByNodeType":622,"./ac-dom-nodes/helpers/nodeTypes":624,"./ac-dom-nodes/insertAfter":626,"./ac-dom-nodes/insertBefore":627,"./ac-dom-nodes/insertFirstChild":628,"./ac-dom-nodes/insertLastChild":629,"./ac-dom-nodes/isComment":630,"./ac-dom-nodes/isDocument":631,"./ac-dom-nodes/isDocumentFragment":632,"./ac-dom-nodes/isDocumentType":633,"./ac-dom-nodes/isElement":634,"./ac-dom-nodes/isNode":635,"./ac-dom-nodes/isTextNode":636,"./ac-dom-nodes/remove":637,"./ac-dom-nodes/replace":638}],621:[function(d,g,f){g.exports=d(386)
},{}],622:[function(d,g,f){arguments[4][387][0].apply(f,arguments)},{"./helpers/isNodeType":623,"./helpers/nodeTypes":624}],623:[function(d,g,f){arguments[4][388][0].apply(f,arguments)
},{"../isNode":635}],624:[function(d,g,f){g.exports=d(389)},{}],625:[function(d,g,f){arguments[4][390][0].apply(f,arguments)
},{"./isNodeType":623,"./nodeTypes":624}],626:[function(d,g,f){g.exports=d(391)
},{"./helpers/validate":625}],627:[function(d,g,f){g.exports=d(392)},{"./helpers/validate":625}],628:[function(d,g,f){g.exports=d(393)
},{"./helpers/validate":625}],629:[function(d,g,f){g.exports=d(394)},{"./helpers/validate":625}],630:[function(d,g,f){g.exports=d(518)
},{"./helpers/isNodeType":623,"./helpers/nodeTypes":624}],631:[function(d,g,f){g.exports=d(519)
},{"./helpers/isNodeType":623,"./helpers/nodeTypes":624}],632:[function(d,g,f){g.exports=d(520)
},{"./helpers/isNodeType":623,"./helpers/nodeTypes":624}],633:[function(d,g,f){g.exports=d(521)
},{"./helpers/isNodeType":623,"./helpers/nodeTypes":624}],634:[function(d,g,f){g.exports=d(522)
},{"./helpers/isNodeType":623,"./helpers/nodeTypes":624}],635:[function(d,g,f){g.exports=d(523)
},{}],636:[function(d,g,f){g.exports=d(524)},{"./helpers/isNodeType":623,"./helpers/nodeTypes":624}],637:[function(d,g,f){g.exports=d(403)
},{"./helpers/validate":625}],638:[function(d,g,f){g.exports=d(404)},{"./helpers/validate":625}],639:[function(d,g,f){g.exports=d(271)
},{"./ac-shared-instance/SharedInstance":640}],640:[function(d,g,f){g.exports=d(272)
},{}],641:[function(d,g,f){g.exports=d(484)},{"./ac-mvc-cid/CID":642}],642:[function(d,g,f){g.exports=d(485)
},{"ac-shared-instance":639}],643:[function(d,g,f){g.exports=d(542)},{"./ac-mvc-view/View":644}],644:[function(d,g,f){arguments[4][543][0].apply(f,arguments)
},{"ac-classlist":614,"ac-dom-emitter":586,"ac-dom-nodes":620,"ac-mvc-cid":641,"ac-object":646}],645:[function(d,g,f){g.exports=d(26)
},{}],646:[function(d,g,f){g.exports=d(27)},{"./ac-object/clone":647,"./ac-object/create":648,"./ac-object/defaults":649,"./ac-object/extend":650,"./ac-object/getPrototypeOf":651,"./ac-object/isDate":652,"./ac-object/isEmpty":653,"./ac-object/isRegExp":654,"./ac-object/toQueryParameters":655}],647:[function(d,g,f){g.exports=d(28)
},{"./extend":650}],648:[function(d,g,f){g.exports=d(29)},{}],649:[function(d,g,f){g.exports=d(30)
},{"./extend":650}],650:[function(d,g,f){g.exports=d(31)},{}],651:[function(d,g,f){g.exports=d(32)
},{}],652:[function(d,g,f){g.exports=d(33)},{}],653:[function(d,g,f){g.exports=d(34)
},{}],654:[function(d,g,f){g.exports=d(35)},{}],655:[function(d,g,f){g.exports=d(36)
},{qs:645}],656:[function(d,g,f){arguments[4][54][0].apply(f,arguments)},{"./ac-browser/BrowserData":657,"./ac-browser/IE":658}],657:[function(d,g,f){g.exports=d(295)
},{"./data":659}],658:[function(d,g,f){g.exports=d(56)},{}],659:[function(d,g,f){g.exports=d(297)
},{}],660:[function(d,g,f){g.exports=d(76)},{"./ac-prefixer/Prefixer":661}],661:[function(d,g,f){g.exports=d(77)
},{"./Prefixer/camelCasedEvents":662}],662:[function(d,g,f){g.exports=d(78)},{}],663:[function(d,g,f){g.exports=d(301)
},{"./ac-feature/canvasAvailable":664,"./ac-feature/continuousScrollEventsAvailable":665,"./ac-feature/cookiesAvailable":666,"./ac-feature/cssLinearGradientAvailable":667,"./ac-feature/cssPropertyAvailable":668,"./ac-feature/helpers/memoize":670,"./ac-feature/isDesktop":671,"./ac-feature/isHandheld":672,"./ac-feature/isRetina":673,"./ac-feature/isTablet":674,"./ac-feature/localStorageAvailable":675,"./ac-feature/mediaElementsAvailable":676,"./ac-feature/sessionStorageAvailable":677,"./ac-feature/svgAvailable":678,"./ac-feature/threeDTransformsAvailable":679,"./ac-feature/touchAvailable":680,"./ac-feature/webGLAvailable":681}],664:[function(d,g,f){g.exports=d(302)
},{"./helpers/globals":669}],665:[function(d,g,f){g.exports=d(303)},{"./touchAvailable":680,"ac-browser":656}],666:[function(d,g,f){g.exports=d(304)
},{"./helpers/globals":669}],667:[function(d,g,f){g.exports=d(305)},{"./cssPropertyAvailable":668}],668:[function(d,g,f){g.exports=d(306)
},{"ac-prefixer":660}],669:[function(d,g,f){g.exports=d(307)},{}],670:[function(d,g,f){g.exports=d(308)
},{}],671:[function(d,g,f){g.exports=d(309)},{"./helpers/globals":669,"./touchAvailable":680}],672:[function(d,g,f){g.exports=d(310)
},{"./isDesktop":671,"./isTablet":674}],673:[function(d,g,f){g.exports=d(311)},{"./helpers/globals":669}],674:[function(d,g,f){g.exports=d(312)
},{"./helpers/globals":669,"./isDesktop":671}],675:[function(d,g,f){g.exports=d(313)
},{"./helpers/globals":669}],676:[function(d,g,f){g.exports=d(314)},{"./helpers/globals":669}],677:[function(d,g,f){g.exports=d(315)
},{"./helpers/globals":669}],678:[function(d,g,f){g.exports=d(316)},{"./helpers/globals":669}],679:[function(d,g,f){g.exports=d(317)
},{"./cssPropertyAvailable":668}],680:[function(d,g,f){g.exports=d(318)},{"./helpers/globals":669}],681:[function(d,g,f){g.exports=d(319)
},{"./helpers/globals":669}],682:[function(d,g,f){g.exports=d(26)},{}],683:[function(d,g,f){g.exports=d(465)
},{"./ac-string/isString":684,"./ac-string/queryParameters":685,"./ac-string/queryStringToObject":686,"./ac-string/supplant":687,"./ac-string/toCamelCase":688,"./ac-string/toQueryPair":689}],684:[function(d,g,f){g.exports=d(466)
},{}],685:[function(d,g,f){g.exports=d(467)},{"./queryStringToObject":686}],686:[function(d,g,f){g.exports=d(468)
},{qs:682}],687:[function(d,g,f){g.exports=d(469)},{}],688:[function(d,g,f){g.exports=d(470)
},{}],689:[function(d,g,f){g.exports=d(471)},{}],690:[function(o,m,i){var k=o("./view");
var l=o("./model");var n=o("./elements/element");var j={create:function(c,a){c=c||{};
a=a||{};c.elementClassPrefix=c.elementClassPrefix||"controls";a.elementClassPrefix=c.elementClassPrefix;
var b=this.Model(a);var d=this.View(Object.assign({},c,{model:b}));d.initialize();
return d},Model:l,View:k,element:n};m.exports=j},{"./elements/element":693,"./model":711,"./view":713}],691:[function(l,j,h){var m=l("ac-classlist");
var k=l("./element");var i=k.newType({className:"thirty-seconds-back-button",events:[{type:"click",callback:"thirySecondsBack"}],thirySecondsBack:function(){var a=this.player.getCurrentTime();
var b=a-30;this.player.setCurrentTime((b<0)?0:b)}});j.exports=i},{"./element":693,"ac-classlist":65}],692:[function(k,i,g){var j=k("./element");
var h=j.newType({className:"elapsed-time",_initialize:function(){this.options.model.on("change:elapsedTime",this._setElapsedTime,this)
},_setElapsedTime:function(a){this.el.innerHTML=a.value||a}});i.exports=h},{"./element":693}],693:[function(f,h,g){var i={className:"",create:function(a,b){var c=Object.create(this);
c.el=a;c.options=b;c.player=b.player;c._initialize();return c},events:[],newType:function(b){var a=Object.assign({},this,b);
return a},setElementAttributes:function(){this.elementAttributeString.forEach(function(b){var a;
if(typeof b==="string"){a=this._getLocalizationAttribute(b);this._setAttributeText(a)
}else{if(this[b.condition]()){a=this._getLocalizationAttribute(b.string);this._setAttributeText(a)
}}},this)},_getLocalizationAttribute:function(a){return this.options.model.get(a)
},_initialize:function(){this.elementAttributeString=this.elementAttributeString||[];
this.setElementAttributes()},_setAttributeText:function(a){["value","aria-label"].forEach(function(b){this.el.setAttribute(b,a)
},this)}};h.exports=i},{}],694:[function(r,s,p){var q=r("ac-classlist");var n=r("ac-fullscreen");
var l=r("ac-feature");var o=r("./element");var k=!l.isDesktop();var m=o.newType({className:"full-screen-button",events:[{type:"click",callback:"_toggleFullscreen"}],_exitFullscreen:function(a){n.exitFullscreen(a)
},_getFullScreenElement:function(){var a=false;if(this._isNotDesktop()){a=this.options.player.getMediaElement()
}return a||this.options.fullScreenElement||this.options.player.getMediaElement()
},_isFullScreen:function(a){return this._supportsFullscreen(a)},_initialize:function(){this.isFullScreen=false;
if(this._supportsFullscreen(this._getFullScreenElement())){this._removeFullscreenUnsupportedClass();
this._listenForFullscreenChange()}},_isNotDesktop:function(){return k},_listenForFullscreenChange:function(){n.on("enterfullscreen",this._onEnterFullScreen,this);
n.on("exitfullscreen",this._onExitFullScreen,this)},_onEnterFullScreen:function(){this.isFullScreen=true;
q.add(this.el,"is-fullscreen")},_onExitFullScreen:function(){this.isFullScreen=false;
q.remove(this.el,"is-fullscreen")},_requestFullscreen:function(a){n.requestFullscreen(a)
},_removeFullscreenUnsupportedClass:function(){q.remove(this.el,"fullscreen-unsupported")
},_supportsFullscreen:function(a){return n.fullscreenEnabled(a)},_toggleFullscreen:function(){var a=this._getFullScreenElement();
if(this.isFullScreen){this._exitFullscreen(a)}else{this._requestFullscreen(a)}}});
s.exports=m},{"./element":693,"ac-classlist":65,"ac-feature":663,"ac-fullscreen":320}],695:[function(g,j,h){var k=g("./element");
var i=k.newType({className:"max-volume-button",events:[{type:"click",callback:"maxVolume"}],maxVolume:function(){this.options.player.setMuted(false);
this.options.player.setVolume(1)}});j.exports=i},{"./element":693}],696:[function(k,i,g){var j=k("./element");
var h=j.newType({className:"min-volume-button",events:[{type:"click",callback:"minVolume"}],minVolume:function(){this.options.player.setMuted(false);
this.options.player.setVolume(0)}});i.exports=h},{"./element":693}],697:[function(k,i,g){var j=k("./element");
var h=j.newType({className:"mute-volume-button",events:[{type:"click",callback:"mute"}],mute:function(){this.options.player.setMuted(true)
}});i.exports=h},{"./element":693}],698:[function(g,j,h){var k=g("./element");var i=k.newType({className:"toggle-mute-volume-button",events:[{type:"click",callback:"toggleMutedVolume"}],toggleMutedVolume:function(){var a=this.options.player.getMuted()?false:true;
this.options.player.setMuted(a)}});j.exports=i},{"./element":693}],699:[function(g,j,h){var k=g("./element");
var i=k.newType({className:"pause-button",events:[{type:"click",callback:"pause"}],pause:function(){this.options.player.pause()
}});j.exports=i},{"./element":693}],700:[function(g,j,h){var k=g("./element");var i=k.newType({className:"play-button",events:[{type:"click",callback:"play"}],play:function(){this.options.player.play()
}});j.exports=i},{"./element":693}],701:[function(m,k,i){var h=m("ac-classlist");
var l=m("./element");var j=l.newType({className:"play-pause-button",events:[{type:"click",callback:"playPauseToggle"}],elementAttributeString:[{condition:"playerIsPlaying",string:"pause"},{condition:"playerIsPaused",string:"play"}],playerIsPlaying:function(){return !this.player.getPaused()
},playerIsPaused:function(){return this.player.getPaused()},playPauseToggle:function(){if(this.player.getPaused()){this.player.play()
}else{this.player.pause()}},_addEventListeners:function(){this.player.on("play pause",this._handleStateChange,this)
},_handleStateChange:function(){this._toggleIsPlayingClass();this.setElementAttributes()
},_initialize:function(){l._initialize.call(this);this._addEventListeners();this._handleStateChange()
},_toggleIsPlayingClass:function(){var a=this.player.getPaused()?"remove":"add";
h[a](this.el,"is-playing")}});k.exports=j},{"./element":693,"ac-classlist":65}],702:[function(s,t,p){var o=s("./element");
var q=s("ac-classlist");var w=s("ac-dom-traversal");var n=s("ac-dom-events");var m=s("ac-slider");
var v=s("../mixins/get-model-attribute");var u=s("../mixins/cursor-pointer");var r=o.newType(Object.assign({className:"progress-indicator",_bindSetupElement:function(){return this._setupElement.bind(this)
},_getCurrentTime:function(a){return(a&&a.value)?a.value:this.polyfilledEl.getValue()
},_getSliderInstance:function(){return new m.Slider(this.el,{template:'<div class="ac-slider-runnable-track">\n\t<div class="ac-slider-inner-track">\n\t\t<div class="ac-slider-thumb">\n\t\t\t<div class="ac-slider-thumb-background"></div>\n\t\t\t<div class="ac-slider-scrubbed"></div>\n\t\t</div>\n\t</div>\n</div>\n<input class="ac-slider-input-type-range" type="range" value="0" step="1" min="0" max="1"  />',min:0,max:+this.options.model.get("duration"),step:isNaN(+this.el.getAttribute("step"))?this.el.getAttribute("step"):+this.el.getAttribute("step"),value:+this.el.getAttribute("value")})
},_handleProgressIndicatorChange:function(a){this.options.model.set({timeupdate:this._getCurrentTime(a)})
},_initialize:function(){o._initialize.call(this);this._setupElement=this._bindSetupElement();
this.getModelAttribute("duration").then(this._setupElement)},_onGrab:function(){this.options.model.set({ignoreTimeupdate:true});
this.options.player.off("timeupdate",this._setIndicatorValue);this.polyfilledEl.on("change",this._setModelValue,this);
this.forceCursorPointer()},_onRelease:function(){this._setPlayerValue();this.options.model.set({ignoreTimeupdate:false});
this.options.player.on("timeupdate",this._setIndicatorValue,this);this.polyfilledEl.off("change",this._setModelValue);
this.disableForcedCursorPointer()},_onPlayerDurationChange:function(){if(!isNaN(this.options.player.getDuration())){this.polyfilledEl.setMax(this.options.player.getDuration())
}},_polyfillRangeInput:function(){this.polyfilledEl=this._getSliderInstance();this.thumbEl=w.querySelector(".ac-slider-thumb",this.el);
this.scrubbedEl=w.querySelector(".ac-slider-scrubbed",this.el)},_setIndicatorValue:function(){var a=this.options.player.getCurrentTime();
this.polyfilledEl.setValue(a)},_setPlayerValue:function(){var a=this.polyfilledEl.getValue();
this.options.player.setCurrentTime(a)},_setModelValue:function(){var a=this.polyfilledEl.getValue();
this.options.model.set({timeupdate:a})},_setupElement:function(a){this.el.setAttribute("max",a);
this._polyfillRangeInput();this.el.setAttribute("aria-valuemax",this.polyfilledEl.getMax());
this.polyfilledEl.on("change:model:max",function(){this.el.setAttribute("aria-valuemax",this.polyfilledEl.getMax())
},this);this.polyfilledEl.on("change:model:value",function(){this.el.setAttribute("aria-valuenow",this.polyfilledEl.getValue())
},this);this.el.setAttribute("aria-valuemin",this.polyfilledEl.getMin());this.polyfilledEl.on("change:model:min",function(){this.el.setAttribute("aria-valuemin",this.polyfilledEl.getMin())
},this);this.options.player.on("timeupdate",this._setIndicatorValue,this);this.polyfilledEl.on("grab",this._onGrab,this);
this.polyfilledEl.on("release",this._onRelease,this);this.options.player.on("durationchange",this._onPlayerDurationChange,this)
}},v,u));t.exports=r},{"../mixins/cursor-pointer":709,"../mixins/get-model-attribute":710,"./element":693,"ac-classlist":65,"ac-dom-events":111,"ac-dom-traversal":183,"ac-slider":974}],703:[function(m,j,i){var k=m("./element");
var h=m("../mixins/get-model-attribute");var l=k.newType(Object.assign({},{className:"remaining-time",_bindUpdateRemainingTimeIndicator:function(){return this._updateRemainingTimeIndicator.bind(this)
},_initialize:function(){this._updateRemainingTimeIndicator=this._bindUpdateRemainingTimeIndicator();
this.options.model.on("change:remainingTime",this._updateRemainingTimeIndicator,this);
this.getModelAttribute("remainingTime").then(this._updateRemainingTimeIndicator)
},_updateRemainingTimeIndicator:function(a){this.el.innerHTML=a.value||a}},h));
j.exports=l},{"../mixins/get-model-attribute":710,"./element":693}],704:[function(k,j,g){var h=k("./text-tracks");
var i=h.newType({className:"text-tracks-off-button",events:[{type:"click",callback:"textTracksOff"}],elementAttributeString:["captionsturnedoff"]});
j.exports=i},{"./text-tracks":707}],705:[function(j,i,g){var h=j("./text-tracks");
var k=h.newType({className:"text-tracks-on-button",events:[{type:"click",callback:"textTracksOn"}],elementAttributeString:["captionsturnedon"]});
i.exports=k},{"./text-tracks":707}],706:[function(l,k,h){var m=l("ac-classlist");
var i=l("./text-tracks");var j=i.newType({className:"text-tracks-toggle-button",events:[{type:"click",callback:"textTracksToggle"}],textTracksToggle:function(){var b=this._getTextTrackModeAndIndex();
var a=b.get("mode");if(a==="showing"){this.textTracksOff()}else{this.textTracksOn()
}},elementAttributeString:[{condition:"textTracksAreShowing",string:"captionsturnedoff"},{condition:"textTracksAreDisabled",string:"captionsturnedon"}],textTracksAreShowing:function(){return this.player.getVisibleTextTracks().models.length>0
},textTracksAreDisabled:function(){return this.player.getVisibleTextTracks().models.length===0
},_addEventListeners:function(){i._addEventListeners.call(this);this.player.on("texttrackshow texttrackhide",this.setElementAttributes,this)
}});k.exports=j},{"./text-tracks":707,"ac-classlist":65}],707:[function(o,m,q){var p=o("ac-classlist");
var n=o("./element");var k={on:"showing",off:"disabled"};var l={visible:"text-tracks-visible",none:"no-text-tracks"};
var j=n.newType({onTextTracksVisible:function(){p.add(this.el,l.visible)},onTextTracksHidden:function(){p.remove(this.el,l.visible)
},textTracksOn:function(){var a=this._getTextTrackModeAndIndex();a.show()},textTracksOff:function(){var a=this._getTextTrackModeAndIndex();
a.hide()},_addEventListeners:function(){var a=this._getTextTrackModeAndIndex();
this.player.on("texttrackshow",this.onTextTracksVisible,this);this.player.on("texttrackhide",this.onTextTracksHidden,this);
this.player.on("addtrack",this._addTextTrackClass,this);this.options.model.on("change:localization",this.setElementAttributes,this)
},_addTextTrackClass:function(){var a=this.player.getEnabledTextTracks().models;
if(a.length){this._removeNoTextTracksClass();if(this.player.getVisibleTextTracks().models.length){this.onTextTracksVisible()
}else{this.onTextTracksHidden()}}else{this._addNoTextTracksClass()}},_addNoTextTracksClass:function(){p.add(this.el,l.none)
},_getTextTrackModeAndIndex:function(){var a=this.player.getVisibleTextTracks().at(0);
if(!a){a=this.player.getEnabledTextTracks().at(0)}return a},_initialize:function(){n._initialize.call(this);
this._addTextTrackClass();this._addEventListeners()},_removeNoTextTracksClass:function(){p.remove(this.el,l.none)
},_toggleTextTracksVisibleClass:function(b){var a=b?"onTextTracksHidden":"onTextTracksVisible";
this[a]()},_toggleNoTextTracksClass:function(b){var a=b?"_removeNoTextTracksClass":"_addNoTextTracksClass";
this[a]()}});m.exports=j},{"./element":693,"ac-classlist":65}],708:[function(s,t,q){var p=s("./element");
var r=s("ac-classlist");var o=s("ac-dom-events");var n=s("ac-slider");var w=s("ac-dom-traversal");
var v=s("../mixins/get-model-attribute");var u=s("../mixins/cursor-pointer");var m=p.newType(Object.assign({className:"volume-level-indicator",events:[{type:"change",callback:"handleVolumeIndicatorChange"}],handleVolumeIndicatorChange:function(b){this._unmute();
var a=this._getVolume(b);this._setVolume(a)},ignoreVolumechange:function(a){this.options.model.set({ignoreVolumechange:true});
this._stopListeningForVolumechange();this.forceCursorPointer()},setVolumeOnMove:function(){this._setVolume(this._getVolume())
},_bindResumeVolumechange:function(){return this._resumeVolumechange.bind(this)
},_bindSetupElement:function(){return this._setupElement.bind(this)},_bindHandleVolumeIndicatorChange:function(){return this.handleVolumeIndicatorChange.bind(this)
},_getVolume:function(a){return(a&&a.value)?a.value:this.polyfilledEl.getValue()
},_getSliderInstance:function(){var a=this.options.player.getVolume();if(this.options.player.getMuted()===true){a=0
}return new n.Slider(this.el,{template:'<div class="ac-slider-runnable-track">\n\t<div class="ac-slider-thumb">\n\t\t<div class="ac-slider-thumb-background"></div>\n\t</div>\n\t<div class="ac-slider-inner-track">\n\t\t<div class="ac-slider-scrubbed"></div>\n\t</div>\n</div>\n<input class="ac-slider-input-type-range" type="range" value="0" step="1" min="0" max="1"  />',min:0,max:1,step:+this.el.getAttribute("step"),value:a})
},_initialize:function(){p._initialize.call(this);this.handleVolumeIndicatorChange=this._bindHandleVolumeIndicatorChange();
this._resumeVolumechange=this._bindResumeVolumechange();this._setupElement=this._bindSetupElement();
this.getModelAttribute("volume").then(this._setupElement)},_listenForVolumechange:function(a){this.options.model.on("change:volume",this._updateVolumeIndicator,this);
this.polyfilledEl.off("release",this._resumeVolumechange);this.polyfilledEl.off("change",this.handleVolumeIndicatorChange);
this.polyfilledEl.on("grab",this.ignoreVolumechange,this)},_polyfillRangeInput:function(){this.polyfilledEl=this._getSliderInstance();
this.scrubbed=w.querySelector(".ac-slider-scrubbed",this.el);this.thumb=w.querySelector(".ac-slider-thumb",this.el);
this.polyfilledEl.on("change",function(){this.scrubbed.style.marginLeft=parseInt(this.thumb.style.left,10)+(((this.thumb.offsetWidth/2)/this.el.offsetWidth)*100)+"%"
},this);this.polyfilledEl.trigger("change",this.polyfilledEl.getValue())},_resumeVolumechange:function(a){this.options.model.set({ignoreVolumechange:false});
this._listenForVolumechange();this._setVolume(this._getVolume());this.disableForcedCursorPointer()
},_setVolume:function(a){this._unmute();this.options.player.setVolume(a)},_setupElement:function(a){this.el.setAttribute("value",a);
this._polyfillRangeInput();this._listenForVolumechange()},_stopListeningForVolumechange:function(){this.options.model.off("change:volume",this._updateVolumeIndicator,this);
this.polyfilledEl.on("release",this._resumeVolumechange,this);this.polyfilledEl.on("change",this.handleVolumeIndicatorChange,this);
this.polyfilledEl.off("grab",this.ignoreVolumechange)},_toggleVolumeLevelIndicator:function(a){r.toggle(this.el,"is-visible")
},_updateVolumeIndicator:function(b){var a=(b&&b.value!==null)?b.value:this.options.player.getVolume();
this.polyfilledEl.setValue(a)},_unmute:function(){if(this.options.player.getMuted()){this.options.player.setMuted(false)
}}},v,u));t.exports=m},{"../mixins/cursor-pointer":709,"../mixins/get-model-attribute":710,"./element":693,"ac-classlist":65,"ac-dom-events":111,"ac-dom-traversal":183,"ac-slider":974}],709:[function(m,l,i){var h=m("ac-classlist");
var k=m("ac-dom-events");var j="cursor-pointer";l.exports={disableForcedCursorPointer:function(){h.remove(document.body,j);
this.onSelectStartResumeDefault()},forceCursorPointer:function(){h.add(document.body,j);
this.onSelectStartPreventDefault()},onSelectStartResumeDefault:function(){k.removeEventListener(document,"selectstart",this.preventDefault)
},onSelectStartPreventDefault:function(){k.addEventListener(document,"selectstart",this.preventDefault)
},preventDefault:function(a){k.preventDefault(a)}}},{"ac-classlist":65,"ac-dom-events":111}],710:[function(d,g,f){g.exports={getModelAttribute:function(a){return new Promise(function(b,c){if(this.options.model.has(a)){b(this.options.model.get(a))
}else{this.options.model.once("change:"+a,function(i){b(i.value)},this)}}.bind(this))
}}},{}],711:[function(o,n,j){var i=o("ac-mvc-model").Model;var k=o("ac-video-localization").localization;
var l=function(a){if(!(this instanceof l)){return new l(a)}i.apply(this,arguments);
this.initialize()};l.prototype=Object.create(i.prototype);var m=l.prototype;Object.assign(m,{defaultAttributes:{backthirtyseconds:"Back 30 Seconds",playpause:"Play/Pause",play:"Play",pause:"Pause",togglemutevolume:"Toggle Mute Volume",mutevolume:"Mute Volume",minvolume:"Min Volume",adjustvolume:"Adjust Volume",fastreverse:"Fast Reverse",fastforward:"Fast Forward",fullvolume:"Full Volume",fullscreen:"Full Screen",captionscontrol:"Closed Captions",captionsturnedon:"Closed Captions On",captionsturnedoff:"Closed Captions Off",subtitlescontrol:"Subtitles",subtitlesturnedon:"Subtitles On",subtitlesturnedoff:"Subtitles Off",sizescontrol:"Video Size",downloadcontrol:"Download Video",small:"Small",medium:"Medium",large:"Large",hd:"HD",ipod:"iPod/iPhone",mb:"MB",gb:"GB",tb:"TB",downloadquicktimetitle:"Get QuickTime.",downloadquicktimetext:"Download QuickTime to view this video. QuickTime is free for Mac + PC.",downloadquicktimebutton:"Download",downloadquicktimeurl:"http://www.apple.com/quicktime/download/",elapsed:"elapsed",remaining:"remaining"},getLocalizationPromise:function(){return k.create()
},initialize:function(){this.localize=this._bindLocalize();this.getLocalizationPromise().then(this.localize)
},localize:function(a){this.set(a.attributes);this.trigger("change:localization")
},_bindLocalize:function(){return this.localize.bind(this)}});n.exports=l},{"ac-mvc-model":612,"ac-video-localization":499}],712:[function(k,j,h){var g=k("ac-string");
var i={addLeadingZero:function(a,b){b=b||2;if(a<10||b>2){a=String(a);while(a.length<b){a="0"+a
}}return a},formatTime:function(a,d){if(isNaN(a)){return"00:00"}a=this.splitTime(Math.floor(a),function(f){return this.addLeadingZero(f,d)
}.bind(this));var c="{PN}{minutes}:{seconds}";var b=g.supplant(c,{PN:a.negativeModifier,minutes:a.minutes,seconds:a.seconds});
return b},splitTime:function(a,d){d=d||function(f){return f};var b={negativeModifier:"",minutes:0,seconds:0};
if(isNaN(a)){return b}b.negativeModifier=(a<0)?"-":"";a=Math.abs(a);b.minutes=Math.floor(a/60);
b.seconds=(a%60);for(var c in b){if(typeof b[c]!=="number"){continue}b[c]=d(b[c])
}return b}};j.exports=i},{"ac-string":683}],713:[function(r,t,o){var v=r("ac-dom-traversal");
var q=r("ac-string");var p=r("ac-classlist");var m=r("ac-mvc-view").View;var s=r("./time");
var w={"back-30-seconds-button":r("./elements/back-30-seconds-button"),"elapsed-time-indicator":r("./elements/elapsed-time-indicator"),element:r("./elements/element"),"full-screen-button":r("./elements/full-screen-button"),"max-volume-button":r("./elements/max-volume-button"),"min-volume-button":r("./elements/min-volume-button"),"mute-button":r("./elements/mute-button"),"mute-toggle-button":r("./elements/mute-toggle-button"),"pause-button":r("./elements/pause-button"),"play-button":r("./elements/play-button"),"play-pause-button":r("./elements/play-pause-button"),"progress-indicator":r("./elements/progress-indicator"),"remaining-time-indicator":r("./elements/remaining-time-indicator"),"text-tracks-off-button":r("./elements/text-tracks-off-button"),"text-tracks-on-button":r("./elements/text-tracks-on-button"),"text-tracks-toggle-button":r("./elements/text-tracks-toggle-button"),"text-tracks":r("./elements/text-tracks"),"volume-level-indicator":r("./elements/volume-level-indicator")};
var u=function(a){if(!(this instanceof u)){return new u(a)}m.apply(this,arguments);
this.elements=[]};u.prototype=Object.create(m.prototype);var n=u.prototype;Object.assign(n,{className:"ac-video-controls",initialize:function(){this._addInactiveClasses();
if(this.options.player){this._onPlayerReady=this._bindOnPlayerReady();this.playerIsReady(this.options.player).then(this._onPlayerReady)
}this.options.model.once("change:localization",this.render,this);this.options.model.on("change:timeupdate",this._onModelTimeUpdate,this)
},playerIsReady:function(b){var a=b.getReadyState();var c=b.getPreload();return new Promise(function(d,f){if(a===4){d()
}else{if(c==="metadata"){if(a===3){d()}else{b.on("loadedmetadata",d)}}else{b.on("canplay",d)
}}})},render:function(){this.el.innerHTML=this._getParsedTemplate(this.model.attributes);
p.add(this.el,this.className);p.add(this.el,this._getSkin());if(this._getSkin()===this._defaultSkin){this.el.setAttribute("data-hires","false")
}this._onRender().resolve()},_addInactiveClasses:function(){p.add(this.el,"inactive")
},_bindSetupElements:function(){return this._setupElements.bind(this)},_bindOnPlayerReady:function(){return this._onPlayerReady.bind(this)
},_currentTimeIsWholeNumber:function(a){a=Math.floor(a);if(a===0){return true}if(a!==this._previousCurrentTime){this._previousCurrentTime=a;
return true}},_defaultTemplate:'<div class="left row-1">\n\t<input type="button" class="{elementClassPrefix}-min-volume-button {elementClassPrefix}-button" value="{minvolume}" aria-label="{minvolume}" role="button" tabindex="0">\n\t<div class="{elementClassPrefix}-volume-level-indicator" max="1" step="0.09090909090909091"></div>\n\t<input type="button" class="{elementClassPrefix}-max-volume-button {elementClassPrefix}-button" value="{fullvolume}" aria-label="{fullvolume}" role="button" tabindex="0">\n</div>\n\n<div class="center row-1">\n\t<input type="button" class="{elementClassPrefix}-play-pause-button {elementClassPrefix}-button" value="{playpause}" aria-label="{playpause}" role="button" tabindex="0">\n</div>\n\n<div class="right row-1">\n\t<input type="button" class="{elementClassPrefix}-text-tracks-toggle-button {elementClassPrefix}-button no-text-tracks" value="{textTrackscontrol}" aria-label="{textTrackscontrol}" role="button" tabindex="0">\n\t<input type="button" class="{elementClassPrefix}-full-screen-button {elementClassPrefix}-button fullscreen-unsupported" value="{fullscreen}" aria-label="{fullscreen}" role="button" tabindex="0">\n</div>\n\n<div class="left row-2">\n\t<div class="{elementClassPrefix}-elapsed-time-indicator">\n\t\t<span class="label">{elapsed}</span>\n\t\t<span class="{elementClassPrefix}-elapsed-time" aria-label="{elapsed}" tabindex="0" role="timer" aria-value="00:00">00:00</span>\n\t</div>\n</div>\n\n<div class="center row-2">\n\t<div class="{elementClassPrefix}-buffered-indicator"></div>\n\t<div class="{elementClassPrefix}-progress-indicator" aria-label="progress-indicator" role="progressbar" precision="float" min="0" max="{max}" step="auto" value="0" tabindex="0" aria-valuemax="{max}" aria-valuemin="{min}" aria-valuenow="{value}"></div>\n</div>\n\n<div class="right row-2">\n\t<div class="{elementClassPrefix}-remaining-time-indicator">\n\t<span class="label">{remaining}</span>\n\t<span class="{elementClassPrefix}-remaining-time" aria-label="{remaining}" tabindex="0" role="timer" aria-value="-00:00">-00:00</span>\n</div>\n</div>\n\n<div class="{elementClassPrefix}-inactive-container"></div>',_defaultSkin:"control-bar-skin-default",_getPromise:function(){var c;
var a;var b;b=new Promise(function(d,f){c=d;a=f});b.resolve=c;b.reject=a;return b
},_getSkin:function(){return this.options.skin||this._defaultSkin},_getCurrentTime:function(a){return(a&&a.value)?a.value:this.options.player.getCurrentTime()
},_getParsedTemplate:function(b){var a=this.options.template||this._defaultTemplate;
return q.supplant(a,b)},_listenToModelVolumechange:function(){this.options.player.off("volumechange",this._onVolumeChange);
this.options.model.on("change:volume",this._onVolumeChange,this)},_listenToPlayerForVolumechange:function(){this.options.player.on("volumechange",this._onVolumeChange,this);
this.options.model.off("change:volume",this._onVolumeChange);this.options.player.setVolume(this.options.model.get("volume"))
},_onRender:function(){if(!this._onRenderPromise){this._onRenderPromise=this._getPromise()
}return this._onRenderPromise},_onModelTimeUpdate:function(a){if(this._currentTimeIsWholeNumber(a.value)){this._setModelRemainingAndElapsedTime(a.value)
}},_onPlayerTimeUpdate:function(){if(!this.options.model.get("ignoreTimeupdate")){var a=this.options.player.getCurrentTime();
this.options.model.set({timeupdate:a})}},_onPlayerReady:function(){this._setupElements=this._bindSetupElements();
this._onRender().then(this._setupElements);this.options.player.on("durationchange",this._onPlayerDurationChange,this);
this._onVolumeChange();this._onTimeupdate();this._removeInactiveClasses();this._onPlayerDurationChange();
this.options.player.on("timeupdate",this._onPlayerTimeUpdate,this);this._onVolumeChangeEvents()
},_onVolumeChangeEvents:function(){this.options.model.on("change:ignoreVolumechange",this._onModelIgnoreVolumechange,this);
this.options.player.on("volumechange loadedmetadata",this._onVolumeChange,this)
},_onVolumeChange:function(b){b=b||{};var a=b.value||this.options.player.getVolume();
this.options.model.set({volume:a})},_onTimeupdate:function(b){var a=this._getCurrentTime(b);
if(this._currentTimeIsWholeNumber(a)){this._setModelRemainingAndElapsedTime(a)}},_onModelIgnoreVolumechange:function(a){if(a.value){this._listenToModelVolumechange()
}else{this._listenToPlayerForVolumechange()}},_onPlayerDurationChange:function(){this.options.model.set({duration:this.options.player.getDuration()});
this._onTimeupdate()},_removeInactiveClasses:function(){p.remove(this.el,"inactive")
},_setupElements:function(){var a;for(var b in w){try{if(b.match(/^element$|^time$|^text-tracks$/)){continue
}a=v.querySelector("."+this.options.elementClassPrefix+"-"+w[b].className,this.el);
if(a){a=w[b].create(a,this.options);this.elements.push(a);if(a.events){this._setupElementEvents(a)
}}}catch(c){console.log("ERROR: ",b,c)}}},_setModelRemainingAndElapsedTime:function(c){var b=this.options.player.getDuration();
var d=s.formatTime(c-Math.floor(b));var a=s.formatTime(c);this.options.model.set({remainingTime:d,elapsedTime:a})
},_setupElementEvents:function(d){for(var f=0,a=d.events.length,g,b,c;f<a;f++){g=d.events[f];
b=d[g.callback];c=g.delegate||"."+this.options.elementClassPrefix+"-"+d.className;
this.on(g.type,c,b,d)}}});t.exports=u},{"./elements/back-30-seconds-button":691,"./elements/elapsed-time-indicator":692,"./elements/element":693,"./elements/full-screen-button":694,"./elements/max-volume-button":695,"./elements/min-volume-button":696,"./elements/mute-button":697,"./elements/mute-toggle-button":698,"./elements/pause-button":699,"./elements/play-button":700,"./elements/play-pause-button":701,"./elements/progress-indicator":702,"./elements/remaining-time-indicator":703,"./elements/text-tracks":707,"./elements/text-tracks-off-button":704,"./elements/text-tracks-on-button":705,"./elements/text-tracks-toggle-button":706,"./elements/volume-level-indicator":708,"./time":712,"ac-classlist":65,"ac-dom-traversal":183,"ac-mvc-view":643,"ac-string":683}],714:[function(d,g,f){g.exports={path:d("./ac-path/path")}
},{"./ac-path/path":715}],715:[function(f,i,g){function h(a){return h.parse(a)}h.basename=function(c,d){h._assertStr(c);
var a;var b=c.match(/[^/]*$/)[0];if(d){a=b.match(new RegExp("(.*)"+d+"$"));if(a){b=a[1]
}}return b};h.dirname=function(a){h._assertStr(a);var b=a.match(/^(.*)\b\/|.*/);
return b[1]||a};h.extname=function(b){h._assertStr(b);var a=b.match(/\.[^.]*$/);
return a?a[0]:""};h.filename=function(a){h._assertStr(a);return h.basename(a,h.extname(a))
};h.format=function(b,a){h._assertObj(b);var c=(b.dirname)?b.dirname+"/":"";if(b.basename){c+=b.basename
}else{if(b.filename){c+=b.filename;if(b.extname){c+=b.extname}}}if(a){if(typeof a==="string"){c+="?"+a
}else{if(Object.prototype.toString.call(a)===Object.prototype.toString.call([])){c+="?"+a.join("&")
}}}return c};h.isAbsolute=function(a){h._assertStr(a);return(!!a.match(/(^http(s?))/))
};h.isRootRelative=function(a){h._assertStr(a);return !!a.match(/^\/(?!\/)/)};h.parse=function(a){h._assertStr(a);
return{dirname:h.dirname(a),basename:h.basename(a),filename:h.filename(a),extname:h.extname(a)}
};h._assertStr=function(a){h._assertType(a,"string")};h._assertObj=function(a){h._assertType(a,"object")
};h._assertType=function(a,c){var b=typeof a;if(b==="undefined"||b!==c){throw new TypeError("path param must be of type "+c)
}};i.exports=h},{}],716:[function(d,g,f){g.exports={cname:d("./ac-cname/cname")}
},{"./ac-cname/cname":717}],717:[function(k,j,h){var i=k("ac-path").path;function g(a){return g.addPrefix(a)
}g._prefix=(function(){var a="http://images.apple.com/global/elements/blank.gif";return a.replace(/global\/.*/,"")
}());g.addPrefix=function(a){if(i.isAbsolute(a)){return a}g._assertRootRelative(a);
a=g._prefix+a.replace(/^\//,"");a=a.replace(/(^.+)(\/105\/)/,"$1/");return a};g.formatUrl=function(c,m,a,b){var d=i.format({dirname:c,filename:m,extname:a},b);
if(i.isAbsolute(d)){return d}g._assertRootRelative(c);var f=g.addPrefix(d);return f
};g._assertRootRelative=function(a){if(!i.isRootRelative(a)){throw new URIError("Only root-relative paths are currently supported")
}};j.exports=g},{"ac-path":714}],718:[function(h,m,i){var j=h("./helpers/globals");
var k=h("ac-function/once");var l=function(){var b=j.getDocument();var a=b.createElement("canvas");
return !!(typeof a.getContext==="function"&&a.getContext("2d"))};m.exports=k(l);
m.exports.original=l},{"./helpers/globals":726,"ac-function/once":740}],719:[function(o,n,i){var k=o("ac-browser");
var j=o("./touchAvailable").original;var m=o("ac-function/once");function l(){return(!j()||(k.os==="iOS"&&k.version>=8)||k.name==="Chrome")
}n.exports=m(l);n.exports.original=l},{"./touchAvailable":757,"ac-browser":735,"ac-function/once":740}],720:[function(m,l,h){var j=m("./helpers/globals");
var k=m("ac-function/once");function i(){var a=false;var d=j.getDocument();var b=j.getNavigator();
try{if("cookie" in d&&!!b.cookieEnabled){d.cookie="ac_feature_cookie=1";a=(d.cookie.indexOf("ac_feature_cookie")!==-1);
d.cookie="ac_feature_cookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"}}catch(c){}return a
}l.exports=k(i);l.exports.original=i},{"./helpers/globals":726,"ac-function/once":740}],721:[function(m,l,h){var j=m("ac-prefixer/getStyleValue");
var k=m("ac-function/once");function i(){var a=["linear-gradient(to bottom right, #9f9, white)","linear-gradient(top left, #9f9, white)","gradient(linear, left top, right bottom, from(#9f9), to(white))"];
return a.some(function(b){return !!j("background-image",b)})}l.exports=k(i);l.exports.original=i
},{"ac-function/once":740,"ac-prefixer/getStyleValue":744}],722:[function(o,n,i){var l=o("ac-prefixer/getStyleValue");
var m=o("ac-prefixer/getStyleProperty");var k=o("ac-function/memoize");function j(a,b){if(typeof b!=="undefined"){return !!l(a,b)
}else{return !!m(a)}}n.exports=k(j);n.exports.original=j},{"ac-function/memoize":739,"ac-prefixer/getStyleProperty":743,"ac-prefixer/getStyleValue":744}],723:[function(h,m,i){var k=h("ac-prefixer/getStyleValue");
var l=h("ac-function/once");function j(){return !!k("margin","1vw 1vh")}m.exports=l(j);
m.exports.original=j},{"ac-function/once":740,"ac-prefixer/getStyleValue":744}],724:[function(h,l,i){var k=h("./helpers/globals");
var j=h("ac-function/memoize");function m(d,b){var c=k.getDocument();var a;b=b||"div";
a=c.createElement(b);return(d in a)}l.exports=j(m);l.exports.original=m},{"./helpers/globals":726,"ac-function/memoize":739}],725:[function(m,k,h){var i=m("ac-prefixer/getEventType");
var j=m("ac-function/memoize");function l(a,b){return !!i(a,b)}k.exports=j(l);k.exports.original=l
},{"ac-function/memoize":739,"ac-prefixer/getEventType":742}],726:[function(d,g,f){g.exports=d(307)
},{}],727:[function(d,g,f){g.exports={canvasAvailable:d("./canvasAvailable"),continuousScrollEventsAvailable:d("./continuousScrollEventsAvailable"),cookiesAvailable:d("./cookiesAvailable"),cssLinearGradientAvailable:d("./cssLinearGradientAvailable"),cssPropertyAvailable:d("./cssPropertyAvailable"),cssViewportUnitsAvailable:d("./cssViewportUnitsAvailable"),elementAttributeAvailable:d("./elementAttributeAvailable"),eventTypeAvailable:d("./eventTypeAvailable"),isDesktop:d("./isDesktop"),isHandheld:d("./isHandheld"),isRetina:d("./isRetina"),isTablet:d("./isTablet"),localStorageAvailable:d("./localStorageAvailable"),mediaElementsAvailable:d("./mediaElementsAvailable"),mediaQueriesAvailable:d("./mediaQueriesAvailable"),sessionStorageAvailable:d("./sessionStorageAvailable"),svgAvailable:d("./svgAvailable"),threeDTransformsAvailable:d("./threeDTransformsAvailable"),touchAvailable:d("./touchAvailable"),webGLAvailable:d("./webGLAvailable")}
},{"./canvasAvailable":718,"./continuousScrollEventsAvailable":719,"./cookiesAvailable":720,"./cssLinearGradientAvailable":721,"./cssPropertyAvailable":722,"./cssViewportUnitsAvailable":723,"./elementAttributeAvailable":724,"./eventTypeAvailable":725,"./isDesktop":728,"./isHandheld":729,"./isRetina":730,"./isTablet":731,"./localStorageAvailable":732,"./mediaElementsAvailable":733,"./mediaQueriesAvailable":734,"./sessionStorageAvailable":754,"./svgAvailable":755,"./threeDTransformsAvailable":756,"./touchAvailable":757,"./webGLAvailable":758}],728:[function(n,m,i){var j=n("./touchAvailable").original;
var k=n("./helpers/globals");var l=n("ac-function/once");function o(){var a=k.getWindow();
return(!j()&&!a.orientation)}m.exports=l(o);m.exports.original=o},{"./helpers/globals":726,"./touchAvailable":757,"ac-function/once":740}],729:[function(m,l,o){var n=m("./isDesktop").original;
var j=m("./isTablet").original;var k=m("ac-function/once");function i(){return(!n()&&!j())
}l.exports=k(i);l.exports.original=i},{"./isDesktop":728,"./isTablet":731,"ac-function/once":740}],730:[function(g,k,h){var j=g("./helpers/globals");
k.exports=function i(){var a=j.getWindow();return("devicePixelRatio" in a&&a.devicePixelRatio>=1.5)
}},{"./helpers/globals":726}],731:[function(o,n,q){var p=o("./isDesktop").original;
var l=o("./helpers/globals");var m=o("ac-function/once");var j=600;function k(){var a=l.getWindow();
var b=a.screen.width;if(a.orientation&&a.screen.height<b){b=a.screen.height}return(!p()&&b>=j)
}n.exports=m(k);n.exports.original=k},{"./helpers/globals":726,"./isDesktop":728,"ac-function/once":740}],732:[function(m,l,i){var j=m("./helpers/globals");
var k=m("ac-function/once");function h(){var a=j.getWindow();var b=false;try{b=!!(a.localStorage&&a.localStorage.non_existent!==null)
}catch(c){}return b}l.exports=k(h);l.exports.original=h},{"./helpers/globals":726,"ac-function/once":740}],733:[function(h,m,i){var j=h("./helpers/globals");
var l=h("ac-function/once");function k(){var a=j.getWindow();return("HTMLMediaElement" in a)
}m.exports=l(k);m.exports.original=k},{"./helpers/globals":726,"ac-function/once":740}],734:[function(m,l,h){m("ac-polyfills/matchMedia");
var j=m("./helpers/globals");var k=m("ac-function/once");function i(){var a=j.getWindow();
var b=a.matchMedia("only all");return !!(b&&b.matches)}l.exports=k(i);l.exports.original=i
},{"./helpers/globals":726,"ac-function/once":740,"ac-polyfills/matchMedia":741}],735:[function(d,g,f){arguments[4][54][0].apply(f,arguments)
},{"./ac-browser/BrowserData":736,"./ac-browser/IE":737}],736:[function(d,g,f){g.exports=d(295)
},{"./data":738}],737:[function(d,g,f){g.exports=d(56)},{}],738:[function(d,g,f){g.exports=d(297)
},{}],739:[function(k,j,g){var h=function(){var a="";var b;for(b=0;b<arguments.length;
b++){if(b>0){a+=","}a+=arguments[b]}return a};j.exports=function i(a,b){b=b||h;
var c=function(){var f=arguments;var d=b.apply(this,f);if(!(d in c.cache)){c.cache[d]=a.apply(this,f)
}return c.cache[d]};c.cache={};return c}},{}],740:[function(f,i,g){i.exports=function h(a){var b;
return function(){if(typeof b==="undefined"){b=a.apply(this,arguments)}return b
}}},{}],741:[function(d,g,f){window.matchMedia=window.matchMedia||(function(c,b){var m,o=c.documentElement,n=o.firstElementChild||o.firstChild,l=c.createElement("body"),a=c.createElement("div");
a.id="mq-test-1";a.style.cssText="position:absolute;top:-100em";l.style.background="none";
l.appendChild(a);return function(h){a.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width:42px; }</style>';
o.insertBefore(l,n);m=a.offsetWidth===42;o.removeChild(l);return{matches:m,media:h}
}}(document))},{}],742:[function(d,g,f){g.exports=d(113)},{"./shared/camelCasedEventTypes":745,"./shared/prefixHelper":747,"./shared/windowFallbackEventTypes":750,"./utils/eventTypeAvailable":751}],743:[function(q,r,o){var u=q("./shared/stylePropertyCache");
var n=q("./shared/getStyleTestElement");var t=q("./utils/toCSS");var l=q("./utils/toDOM");
var m=q("./shared/prefixHelper");var s=function(c,b){var a=t(c);var d=(b===false)?false:t(b);
u[c]=u[b]=u[a]=u[d]={dom:b,css:d};return b};r.exports=function p(c){var f;var b;
var d;var a;c+="";if(c in u){return u[c].dom}d=n();c=l(c);b=c.charAt(0).toUpperCase()+c.substring(1);
if(c==="filter"){f=["WebkitFilter","filter"]}else{f=(c+" "+m.dom.join(b+" ")+b).split(" ")
}for(a=0;a<f.length;a++){if(typeof d.style[f[a]]!=="undefined"){if(a!==0){m.reduce(a-1)
}return s(c,f[a])}}return s(c,false)}},{"./shared/getStyleTestElement":746,"./shared/prefixHelper":747,"./shared/stylePropertyCache":748,"./utils/toCSS":752,"./utils/toDOM":753}],744:[function(t,v,q){var s=t("./getStyleProperty");
var n=t("./shared/styleValueAvailable");var o=t("./shared/prefixHelper");var w=t("./shared/stylePropertyCache");
var p={};var m=/(\([^\)]+\))/gi;var r=/([^ ,;\(]+(\([^\)]+\))?)/gi;v.exports=function u(b,c){var a;
c+="";b=s(b);if(!b){return false}if(n(b,c)){return c}a=w[b].css;c=c.replace(r,function(h){var i;
var d;var f;var g;if(h[0]==="#"||!isNaN(h[0])){return h}d=h.replace(m,"");f=a+":"+d;
if(f in p){if(p[f]===false){return""}return h.replace(d,p[f])}i=o.css.map(function(j){return j+h
});i=[h].concat(i);for(g=0;g<i.length;g++){if(n(b,i[g])){if(g!==0){o.reduce(g-1)
}p[f]=i[g].replace(m,"");return i[g]}}p[f]=false;return""});c=c.trim();return(c==="")?false:c
}},{"./getStyleProperty":743,"./shared/prefixHelper":747,"./shared/stylePropertyCache":748,"./shared/styleValueAvailable":749}],745:[function(d,g,f){g.exports=d(114)
},{}],746:[function(k,j,g){var i;j.exports=function h(){if(!i){i=document.createElement("_")
}else{i.style.cssText="";i.removeAttribute("style")}return i};j.exports.resetElement=function(){i=null
}},{}],747:[function(d,g,f){g.exports=d(115)},{}],748:[function(d,g,f){g.exports={}
},{}],749:[function(s,t,r){var u=s("./stylePropertyCache");var q=s("./getStyleTestElement");
var n=false;var l;var m;var p=function(){var b;if(!n){n=true;l=("CSS" in window&&"supports" in window.CSS);
m=false;b=q();try{b.style.width="invalid"}catch(a){m=true}}};t.exports=function o(d,f){var a;
var b;p();if(l){d=u[d].css;return CSS.supports(d,f)}b=q();a=b.style[d];if(m){try{b.style[d]=f
}catch(c){return false}}else{b.style[d]=f}return(b.style[d]&&b.style[d]!==a)};t.exports.resetFlags=function(){n=false
}},{"./getStyleTestElement":746,"./stylePropertyCache":748}],750:[function(d,g,f){g.exports=d(116)
},{}],751:[function(d,g,f){g.exports=d(117)},{}],752:[function(k,j,g){var i=/^(webkit|moz|ms)/gi;
j.exports=function h(a){var b;if(a.toLowerCase()==="cssfloat"){return"float"}if(i.test(a)){a="-"+a
}return a.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()
}},{}],753:[function(g,k,h){var i=/-([a-z])/g;k.exports=function j(a){var b;if(a.toLowerCase()==="float"){return"cssFloat"
}a=a.replace(i,function(c,d){return d.toUpperCase()});if(a.substr(0,2)==="Ms"){a="ms"+a.substring(2)
}return a}},{}],754:[function(m,l,h){var j=m("./helpers/globals");var k=m("ac-function/once");
function i(){var a=j.getWindow();var c=false;try{if("sessionStorage" in a&&typeof a.sessionStorage.setItem==="function"){a.sessionStorage.setItem("ac_feature","test");
c=true;a.sessionStorage.removeItem("ac_feature","test")}}catch(b){}return c}l.exports=k(i);
l.exports.original=i},{"./helpers/globals":726,"ac-function/once":740}],755:[function(m,l,h){var j=m("./helpers/globals");
var k=m("ac-function/once");function i(){var a=j.getDocument();return !!a.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
}l.exports=k(i);l.exports.original=i},{"./helpers/globals":726,"ac-function/once":740}],756:[function(h,m,i){var j=h("ac-prefixer/getStyleValue");
var l=h("ac-function/once");function k(){return !!(j("perspective","1px")&&j("transform","translateZ(0)"))
}m.exports=l(k);m.exports.original=k},{"ac-function/once":740,"ac-prefixer/getStyleValue":744}],757:[function(m,l,h){var j=m("./helpers/globals");
var k=m("ac-function/once");function i(){var a=j.getWindow();var c=j.getDocument();
var b=j.getNavigator();return !!(("ontouchstart" in a)||(a.DocumentTouch&&c instanceof a.DocumentTouch)||(b.maxTouchPoints>0)||(b.msMaxTouchPoints>0))
}l.exports=k(i);l.exports.original=i},{"./helpers/globals":726,"ac-function/once":740}],758:[function(m,l,h){var j=m("./helpers/globals");
var k=m("ac-function/once");function i(){var b=j.getDocument();var a=b.createElement("canvas");
if(typeof a.getContext==="function"){return !!(a.getContext("webgl")||a.getContext("experimental-webgl"))
}return false}l.exports=k(i);l.exports.original=i},{"./helpers/globals":726,"ac-function/once":740}],759:[function(o,n,i){o("ac-polyfills/Array/isArray");
var k=o("./extend");var j=Object.prototype.hasOwnProperty;var m=function(c,b){var a;
for(a in b){if(j.call(b,a)){if(b[a]===null){c[a]=null}else{if(typeof b[a]==="object"){c[a]=Array.isArray(b[a])?[]:{};
m(c[a],b[a])}else{c[a]=b[a]}}}}return c};n.exports=function l(a,b){if(b){return m({},a)
}return k({},a)}},{"./extend":762,"ac-polyfills/Array/isArray":768}],760:[function(d,g,f){g.exports=d(29)
},{}],761:[function(d,g,f){arguments[4][30][0].apply(f,arguments)},{"./extend":762}],762:[function(k,j,g){k("ac-polyfills/Array/prototype.forEach");
var h=Object.prototype.hasOwnProperty;j.exports=function i(){var a;var b;if(arguments.length<2){a=[{},arguments[0]]
}else{a=[].slice.call(arguments)}b=a.shift();a.forEach(function(c){if(c!=null){for(var d in c){if(h.call(c,d)){b[d]=c[d]
}}}});return b}},{"ac-polyfills/Array/prototype.forEach":769}],763:[function(d,g,f){g.exports=d(32)
},{}],764:[function(d,g,f){g.exports={clone:d("./clone"),create:d("./create"),defaults:d("./defaults"),extend:d("./extend"),getPrototypeOf:d("./getPrototypeOf"),isDate:d("./isDate"),isEmpty:d("./isEmpty"),isRegExp:d("./isRegExp"),toQueryParameters:d("./toQueryParameters")}
},{"./clone":759,"./create":760,"./defaults":761,"./extend":762,"./getPrototypeOf":763,"./isDate":765,"./isEmpty":766,"./isRegExp":767,"./toQueryParameters":771}],765:[function(d,g,f){g.exports=d(33)
},{}],766:[function(d,g,f){g.exports=d(34)},{}],767:[function(d,g,f){g.exports=d(35)
},{}],768:[function(d,g,f){if(!Array.isArray){Array.isArray=function(a){return Object.prototype.toString.call(a)==="[object Array]"
}}},{}],769:[function(d,g,f){g.exports=d(191)},{}],770:[function(d,g,f){g.exports=d(26)
},{}],771:[function(d,g,f){g.exports=d(36)},{qs:770}],772:[function(i,h,f){var g=i("./ac-video-posterframe/factory");
h.exports={create:g.create,AttributePoster:i("./ac-video-posterframe/PosterAttribute"),ImageTagPoster:i("./ac-video-posterframe/PosterImageTag"),defaultPosterPath:i("./ac-video-posterframe/defaultPosterPath")}
},{"./ac-video-posterframe/PosterAttribute":773,"./ac-video-posterframe/PosterImageTag":774,"./ac-video-posterframe/defaultPosterPath":775,"./ac-video-posterframe/factory":776}],773:[function(p,o,j){var m=p("ac-mvc-view").View;
var q=p("ac-object");var l="ac-video-poster-hide";function k(){m.apply(this,arguments)
}var n=k.prototype=q.create(m.prototype);n._renderPoster=function(){if(this.model.hasPoster()){this.el.setAttribute("poster",this.model.getPoster())
}else{this.el.removeAttribute("poster")}};n.render=function(){this._renderPoster();
this.model.on("posterchange",this._renderPoster,this)};o.exports=k},{"ac-mvc-view":643,"ac-object":764}],774:[function(q,o,k){var m=q("ac-mvc-view").View;
var j=q("ac-object");var l="ac-video-poster-hide";function p(){m.apply(this,arguments);
this._img=null}var n=p.prototype=j.create(m.prototype);n.tagName="div";n.className=["ac-video-poster"];
n._renderSrc=function(){if(this.model.hasPoster()){if(!this._img){this._img=document.createElement("img");
this.el.appendChild(this._img)}this._img.setAttribute("src",this.model.getPoster())
}else{if(this._img&&this._img.parentNode===this.el){this.el.removeChild(this._img);
this._img=null}}};n._hide=function(){this.addClassName(l)};n._show=function(){this.removeClassName(l)
};n._onPlay=function(){var a=this.model.getCurrentTime();if(a===0){this._show();
this.model.once("timeupdate",this._hide,this)}else{this._hide()}};n._onReadyStateChange=function(a){if(a.readyState===0){this._show()
}};n.render=function(){this._renderSrc();this.model.on("readystatechange",this._onReadyStateChange,this);
this.model.on("posterchange",this._renderSrc,this);this.model.on("play",this._onPlay,this);
this.model.on("ended",this._show,this)};o.exports=p},{"ac-mvc-view":643,"ac-object":764}],775:[function(m,l,o){var i=m("ac-feature");
var n=m("ac-cname").cname;function j(){return i.isRetina()}l.exports=function k(){if(j()){return n.formatUrl("/ac/ac-video-posterframe/1.0/images","ac-video-poster_848x480_2x",".jpg")
}return n.formatUrl("/ac/ac-video-posterframe/1.0/images","ac-video-poster_848x480",".jpg")
}},{"ac-cname":716,"ac-feature":727}],776:[function(n,l,p){var m=n("./PosterAttribute");
var q=n("./PosterImageTag");var j=n("ac-feature");function k(){return j.isHandheld()
}l.exports={create:function o(b){var a=null;if(k()){a=new m({model:b,element:b.getMediaElement()})
}else{a=new q({model:b})}return a}}},{"./PosterAttribute":773,"./PosterImageTag":774,"ac-feature":727}],777:[function(j,i,g){var k=j("./ac-video/player/Player");
k.create=j("./ac-video/player/factory/create");k.createFromElement=j("./ac-video/player/factory/createFromElement");
k.createFromAnchorTag=j("./ac-video/player/factory/createFromAnchorTag");var h=j("./ac-video/models/Video");
h.createFromVideoTag=j("./ac-video/models/video/factory/createFromVideoTag");i.exports={Player:k,Video:h}
},{"./ac-video/models/Video":801,"./ac-video/models/video/factory/createFromVideoTag":803,"./ac-video/player/Player":804,"./ac-video/player/factory/create":805,"./ac-video/player/factory/createFromAnchorTag":806,"./ac-video/player/factory/createFromElement":807}],778:[function(g,k,h){function i(a){this.el=a
}var j=i.prototype;j.setEl=function(a){this.el=a};j.play=function(){this.el.play()
};j.pause=function(){this.el.pause()};j.setCurrentTime=function(a){this.el.currentTime=a
};j.getCurrentTime=function(){return this.el.currentTime};j.setPreload=function(a){this.el.preload=a
};j.getWidth=function(){return this.el.videoWidth};j.getHeight=function(){return this.el.videoHeight
};j.setControls=function(a){this.el.controls=a};j.setSrc=function(a){this.el.src=a
};j.getSrc=function(){return this.el.src};j.getControls=function(){return this.el.controls
};j.setMuted=function(a){this.el.muted=a};j.setVolume=function(a){this.el.volume=a
};j.getVolume=function(){return this.el.volume};j.getDuration=function(){return this.el.duration
};j.setPlaybackRate=function(a){this.el.playbackRate=a};j.getPlaybackRate=function(){return this.el.playbackRate
};j.getDefaultPlaybackRate=function(){return this.el.defaultPlaybackRate};j.setLoop=function(a){this.el.loop=a
};j.getLoop=function(){return this.el.loop};j.getCurrentSrc=function(){return this.el.currentSrc
};j.getPlayed=function(){return this.el.played};j.addTextTrack=function(b,c,a){return this.el.addTextTrack(b,c,a)
};j.getTextTracks=function(){var a=this.el.textTracks||[];return Array.prototype.map.call(a,function(b,c){b.index=c;
return b})};j.getBuffered=function(){return this.el.buffered};k.exports=i},{}],779:[function(g,k,h){function i(a){this.el=a;
this._boundChangeSrc=this._changeSrc.bind(this);this._incomingSrc=null}var j=i.prototype;
j.setEl=function(a){this.el=a};j.play=function(){this.el.Play()};j.pause=function(){this.el.Stop()
};j.setCurrentTime=function(a){this.el.SetTime(a*this.el.GetTimeScale())};j.setPreload=function(a){};
j.getCurrentTime=function(){var a=0;if(this._incomingSrc){return a}try{a=this.el.GetTime()/this.el.GetTimeScale()
}catch(b){}return a};j.getWidth=function(){var c;try{var b=this.el.GetRectangle();
var d=this.el.GetMatrix();var f=parseFloat(d.split(",")[0]);c=+b.split(",")[2];
c=Math.round(c/f)}catch(a){}return c};j.getHeight=function(){var f;try{var b=this.el.GetRectangle();
var c=this.el.GetMatrix();var d=parseFloat(c.split(",")[3]);f=+b.split(",")[3];
f=Math.round(f/d)}catch(a){}return f};j.setMuted=function(a){this.el.SetMute(a)
};j.setVolume=function(a){this.el.SetVolume(a*256)};j.getVolume=function(){return this.el.GetVolume()/256
};j.getDuration=function(){var a=NaN;if(this._incomingSrc){return NaN}try{a=this.el.GetDuration()/this.el.GetTimeScale()
}catch(b){}return a};j.setLoop=function(a){this.el.SetIsLooping(a)};j.getLoop=function(){return this.el.GetIsLooping()
};j.setPlaybackRate=function(a){this.el.SetRate(a)};j.getPlaybackRate=function(){var b=1;
try{b=this.el.GetRate()}catch(a){}return b};j._changeSrc=function(){try{this.el.SetResetPropertiesOnReload(false);
this.el.SetURL(this._incomingSrc)}catch(a){}this._incomingSrc=null};j.setSrc=function(a){this._incomingSrc=a;
window.requestAnimationFrame(this._boundChangeSrc)};j.getSrc=function(){return this.el.GetURL()
};j.getCurrentSrc=function(){return this.el.GetURL()};j.getDefaultPlaybackRate=function(){return 1
};j.getPlayed=function(){};j.getBuffered=function(){return[[0,this.element.GetMaxTimeLoaded()/this.element.GetTimeScale()]]
};j.showTextTrack=function(a){this.el.SetTrackEnabled(a,true)};j.hideTextTrack=function(a){this.el.SetTrackEnabled(a,false)
};j.setControls=function(a){this.el.SetControllerVisible(a)};j.getControls=function(){return this.el.GetControllerVisible()
};j.getTextTracks=function(){var c=[];var d=this.el.GetTrackCount();for(var b=1;
b<=d;b++){var a=this.el.GetTrackType(b);if(a==="Subtitle"||a==="Closed Caption"){c.push({kind:a,label:this.el.GetTrackName(b),mode:(this.el.GetTrackEnabled(b))?"showing":"hidden",index:b})
}}return c};k.exports=i},{}],780:[function(k,j,l){var m=k("./HTML5VideoAPI");var h=k("./QuickTimeAPI");
var i={create:function(b,a){if(a==="video"){return new m(b)}else{return new h(b)
}}};j.exports=i},{"./HTML5VideoAPI":778,"./QuickTimeAPI":779}],781:[function(q,n,j){var m=q("ac-mvc-collection").Collection;
var o=q("./../models/MediaSource");var k=q("ac-object");var p=function(){m.apply(this,arguments)
};var l=p.prototype=k.create(m.prototype);l.ModelType=o;n.exports=p},{"./../models/MediaSource":798,"ac-mvc-collection":606,"ac-object":646}],782:[function(p,o,q){var l=p("./TextTrackCollection");
var m=p("./../models/PolyfillTextTrackModel");var j=p("ac-object");var k=function(){l.apply(this,arguments)
};var n=k.prototype=j.create(l.prototype);n.ModelType=m;n.createTextTrackFromNativeTrack=function(c,d,a){var b=new m();
b.setNativeTextTrack(a);b.setTextTrackEl(c);b.setTextTrackInnerEl(d);this.add(b);
return b};n.removeTextTrackFromNativeTrack=function(a){var b=this.findTextTrackModelFromNativeTrack(a);
this.remove(b)};n.findTextTrackModelFromNativeTrack=function(a){if(!a||!a.id){return null
}var b=this.filter(function(c){if(c.getNativeTextTrack().id===a.id){return c}return false
})[0];return b||null};n.getEnabledTextTracks=function(){var a=this.filter(function(b){if(b.get("mode")!=="disabled"){return b
}return false});return new k({models:a})};n.getVisibleTextTracks=function(){var a=this.find({mode:"showing"});
return new k({models:a})};o.exports=k},{"./../models/PolyfillTextTrackModel":799,"./TextTrackCollection":783,"ac-object":646}],783:[function(q,p,j){var o=q("ac-mvc-collection").Collection;
var l=q("./../models/TextTrackModel");var k=q("ac-object");var m=function(){o.apply(this,arguments)
};var n=m.prototype=k.create(o.prototype);n.ModelType=l;n.createTextTrackFromNativeTrack=function(a){var b=new l(a);
b.setNativeTextTrack(a);this.add(b);return b};n.removeTextTrackFromNativeTrack=function(a){var b=this.findTextTrackModelFromNativeTrack(a);
this.remove(b)};n.count=function(){return this.models.length};n.findTextTrackModelFromNativeTrack=function(a){var b=this.filter(function(c){if(c.getNativeTextTrack()===a){return c
}return false})[0];return b||null};n.getEnabledTextTracks=function(){var a=this.filter(function(b){if(b.get("mode")!=="disabled"){return b
}return false});return new m({models:a})};n._findTextTrack=function(a){var b;if(this.indexOf(a)>-1){b=a
}else{if(typeof a==="number"){b=this.at(a)}else{if(typeof a==="string"){b=this.get(a)
}else{b=this.find(a,{limit:1})[0]}}}return b};n.getVisibleTextTracks=function(){var a=this.find({mode:"showing"});
return new m({models:a})};n.findTextTrack=function(a){return this._findTextTrack(a)
};p.exports=m},{"./../models/TextTrackModel":800,"ac-mvc-collection":606,"ac-object":646}],784:[function(g,k,h){function i(){this._boundEventListeners=[];
this._collection=[]}var j=i.prototype;j.add=function(b){b=Array.prototype.slice.call(arguments,0);
var d=b.length;var a;var c;for(c=0;c<d;c++){if(this._collection.indexOf(b[c])<0){a=b[c];
this._setup(a);this._collection.push(a)}}};j.remove=function(b){b=Array.prototype.slice.call(arguments,0);
var d=b.length;var c;var a;for(c=0;c<d;c++){a=this._collection.indexOf(b[c]);if(a>-1){this._teardown(b[c]);
this._collection.splice(a,1)}}};j._setup=function(b){var d=this._pauseOtherVideos.bind(this,b);
var a=this.remove.bind(this,b);var c={video:b,eventListeners:{playListener:d,destroyListener:a}};
this._boundEventListeners.push(c);b.on("play",d);b.on("acv-destroy",a)};j._teardown=function(a){var b=this._boundEventListeners.filter(function(d){return d.video===a
},this);if(b.length){b=b.pop();a.off("play",b.eventListeners.playListener);a.off("acv-destroy",b.eventListeners.destroyListener);
var c=this._boundEventListeners.indexOf(b);this._boundEventListeners.splice(c,1)
}};j._getOtherVideos=function(a){return this._collection.filter(function(b){return b!==a
},this)};j._pauseOtherVideos=function(b){var a=this._getOtherVideos(b);a.forEach(function(c){c.pause()
})};k.exports=new i()},{}],785:[function(x,y,u){var w=x("ac-object");var s=x("ac-dom-traversal/querySelector");
var q=x("ac-browser");var p=x("ac-deferred").Deferred;var o="v";var z=function(c,b){var a=c.getAttribute(b);
if(a===null){return false}else{if(a===""){return false}}return true};var A=(function(){function a(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)
}return function(){return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()}}());
function v(){return/^(iOS|Android)$/.test(q.os)}function t(){this._possibleTemplateKeys=["autoplay","buffered","endframe","controls","height","loop","muted","poster","preload","suffix","width","controlbar","controlbarwidth","controlbarskinning","disablecaptionscontrol"];
this._defaultTemplateValues={autoplay:false,muted:false,loop:false,controls:false,preload:"metadata",controlbarwidth:"450",controlbarskinning:"ac-video-controlbar",disablecaptionscontrol:false}
}var r=t.prototype;r.getSource=function(c){var b=/[^/]*.[^\.]*$/;var d=null;var a={};
if(z(c,"data-src")){d=c.getAttribute("data-src")}else{if(z(c,"href")){d=c.getAttribute("href")
}else{if(z(c,"src")){d=c.getAttribute("src")}else{var f=s("source",c);if(f&&z(f,"src")){d=f.getAttribute("src")
}}}}if(d){a.defaultSource=d;a.videoSource=d.match(b)[0];a.directory=d.replace(a.videoSource,"");
a.videoFileName=a.videoSource.split(".")[0]}return a};r.getConfig=function(c,d,a){var b=new p();
var f={};var g=this.getSource(c);this.isAppleMobileDevice=(q.os==="iOS");f=this._getValues(c,a);
this._videoRecommendation=d;f.videoTemplate=d.videoTemplate;b.resolve();return b.promise().then(function(){f.usesFullScreen=(f.usesFullScreen&&f.videoTemplate==="elementVideo");
f.source=g.defaultSource;return f})};r._buildFileSuffix=function(c){var a="";if(c.suffix){a="_"+c.suffix
}else{if(c.height&&c.width){var d=c.height.replace("px","").replace("em","").replace("rem","");
var b=c.width.replace("px","").replace("em","").replace("rem","");a="_"+b+"x"+d
}}return a};r._getRecommendedCaptionsPaths=function(b,c){var a=[];a.push(b+c+"-captions."+o+"tt");
return a};r._generateRecommendedVideoPaths=function(c,d){var a=this._buildFileSuffix(d);
var b=[];this._videoRecommendation.supportedProfiles.forEach(function(f){if(f.sizeRelevant){c=c+a
}b.push(c+"."+f.fileExtension)});return b};r._getValues=function(c,a){var b="ac-video-"+A();
var d=this._defaultTemplateValues;w.extend(d,this._getMarkupValues(c));if(a){w.extend(d,a)
}if(v()){d["native"]=true;d.controls="true"}d.targetId=c.id;d.domId=b;d.eventId=b+"-quicktime-event";
d.wrapperId=b+"-wrapper";return d};r._getMarkupValues=function(b){var a={};this._possibleTemplateKeys.forEach(function(c){if(z(b,c)){a[c]=b.getAttribute(c)
}else{if(z(b,"data-acv-"+c)){a[c]=b.getAttribute("data-acv-"+c)}}if((c==="autoplay"||c==="controls"||c==="muted"||c==="loop")&&a[c]&&a[c].length>0){a[c]=true
}if(typeof(a[c])==="string"&&/^(true|false)$/.test(a[c])){a[c]=(a[c]==="true")?true:false
}});return a};r.addPossibleTemplateKeys=function(a){a.forEach(function(b){if(!this._possibleTemplateKeys.indexOf(b)){this._possibleTemplateKeys.push(b)
}},this)};y.exports=t},{"ac-browser":54,"ac-dom-traversal/querySelector":196,"ac-object":646}],786:[function(d,g,f){g.exports={LOADEDMETADATA:1,LOADEDDATA:2,CANPLAY:3,CANPLAYTHROUGH:4}
},{}],787:[function(q,r,p){var m=q("./TextTracksController");var l=q("./../../views/textTracks/TextTracksCollectionView");
var n=q("./../../models/TextTrackModel");var s=q("ac-object");function k(){m.apply(this,arguments);
this.view=this.options.view||new l({element:this.mediaElement.el});this._addViewEvents()
}var o=k.prototype=s.create(m.prototype);o._holdingTextTrackModels={};o._addViewEvents=function(){this.view.on("addtrack",this._respondToAddTrackEvent,this);
this.view.on("change",this._respondToChangeTrackEvent,this);this.view.on("removetrack",this._respondToRemoveTrackEvent,this)
};o._removeViewEvents=function(){this.view.off("addtrack",this._respondToAddTrackEvent,this);
this.view.off("change",this._respondToChangeTrackEvent,this);this.view.off("removetrack",this._respondToRemoveTrackEvent,this)
};o._respondToAddTrackEvent=function(c){var b=c.data.track;var d=this.model.findTextTrackModelFromNativeTrack(b);
if(!d&&b&&b.id&&this._holdingTextTrackModels[b.id]){d=this._holdingTextTrackModels[b.id];
d.setNativeTextTrack(b);this.model.add(d);this._holdingTextTrackModels[b.id]=undefined;
var a=this.createTextTrackRenderView(b,d);a.renderMode()}if(d===null){this._createTextTrackFromNativeTrack(b)
}else{d.set({mode:b.mode})}if(d){d.on("change:mode",function(){if("webkitClosedCaptionsVisible" in this.mediaElement.el&&d.get("mode")==="showing"){if(this.mediaElement.el.webkitClosedCaptionsVisible===false){this.mediaElement.el.webkitClosedCaptionsVisible=true
}}},this)}this._resetModel();this.trigger("addtrack",c)};o._createTextTrackFromNativeTrack=function(a){var b=this.model.createTextTrackFromNativeTrack(a);
this.createTextTrackRenderView(a,b);return b};o._removeTextTrackFromNativeTrack=function(a){var b=this.model.findTextTrackModelFromNativeTrack(a);
this.removeTextTrackRenderView(b);this.model.removeTextTrackFromNativeTrack(a);
this._resetModel()};o._resetModel=function(){var c=this.mediaElement.el.textTracks;
var d=[];var b;if(c){for(var a=0;a<c.length;a+=1){b=this.model.findTextTrackModelFromNativeTrack(c[a]);
if(b){b.set({mode:c[a].mode});d.push(b)}}this.model.reset(d)}};o._respondToChangeTrackEvent=function(a){this.trigger("changetrack",a)
};o._respondToRemoveTrackEvent=function(b){var a=b.data.track;this._removeTextTrackFromNativeTrack(a);
this.trigger("removetrack",b)};o.addTextTrackFromRemoteVTT=function(b){var a={src:b.src};
var c=this.model.findTextTrack(a);if(c&&typeof c==="object"){return c.cid}c=new n(b);
this._holdingTextTrackModels[c.cid]=c;this.view.addTextTrackTag(c);return c.cid
};o.addTextTrack=function(a,c,d){var b=this.mediaElement.addTextTrack(a,c,d);return this._createTextTrackFromNativeTrack(b)
};o.removeTextTrack=function(a){if(!a){return}if(this._holdingTextTrackModels[a.cid]){this._holdingTextTrackModels[a.cid]=undefined
}this.view.removeTextTrackTag(a)};o.populateTextTracks=function(){var a=this.mediaElement.getTextTracks();
if(a){a.forEach(function(b){if(this.model.findTextTrackModelFromNativeTrack(b)===null){this._createTextTrackFromNativeTrack(b)
}},this)}};r.exports=k},{"./../../models/TextTrackModel":800,"./../../views/textTracks/TextTracksCollectionView":821,"./TextTracksController":790,"ac-object":646}],788:[function(n,m,i){var j=n("./PolyfillTextTracksController");
var o=n("ac-object");function k(a){j.apply(this,[a])}var l=k.prototype=o.create(j.prototype);
l.setVideoEventEmitter=function(a){if(this._videoEventEmitter){return}this._videoEventEmitter=a;
this._videoEventEmitter.on("timeupdate",this._onTimeUpdate,this);this._videoEventEmitter.on("loadstart",this._onHide,this)
};m.exports=k},{"./PolyfillTextTracksController":789,"ac-object":646}],789:[function(p,q,o){var m=p("./TextTracksController");
var u=p("./../../views/textTracks/PolyfillTextTrackCollectionView");var l=p("./../../models/PolyfillTextTrackModel");
var r=p("./../../collection/PolyfillTextTrackCollection");var t=p("ac-object");
function s(b){var a={model:new r()};m.apply(this,[b,a]);this.view=this.options.view||new u({element:this.mediaElement.el});
this._addViewEvents()}var n=s.prototype=t.create(m.prototype);n._holdingTextTrackModels={};
n._addViewEvents=function(){this.view.on("addtrack",this._respondToAddTrackEvent,this);
this.view.on("change",this._respondToChangeTrackEvent,this);this.view.on("removetrack",this._respondToRemoveTrackEvent,this);
this.view.on("timeupdate",this._onTimeUpdate,this);this.view.on("loadstart",this._onHide,this);
this.on("texttrackhide",this._onHide,this);this.on("texttrackshow",this._onShow,this)
};n._removeViewEvents=function(){this.view.off("addtrack",this._respondToAddTrackEvent,this);
this.view.off("change",this._respondToChangeTrackEvent,this);this.view.off("removetrack",this._respondToRemoveTrackEvent,this);
this.view.off("timeupdate",this._onTimeUpdate,this);this.view.off("loadstart",this._onHide,this);
this.off("texttrackhide",this._onHide,this);this.off("texttrackshow",this._onShow,this)
};n._onShow=function(){if(this.view){this._refreshCurrentCaption()}};n._onHide=function(){if(this.view){this.view.hide()
}};n._respondToAddTrackEvent=function(a){if(!(a&&a.data)){return}var b=(a.data&&a.data.track)?a.data.track:{id:null,cues:[]};
var c=this.model.findTextTrackModelFromNativeTrack(b);if(!c&&b&&a.data.textTrackEl&&a.data.textTrackEl.id&&this._holdingTextTrackModels[a.data.textTrackEl.id]){c=this._holdingTextTrackModels[a.data.textTrackEl.id];
c.setNativeTextTrack(b);c.setTextTrackEl(a.data.textTrackEl);c.setTextTrackInnerEl(a.data.textTrackInnerEl);
this.model.add(c);this._holdingTextTrackModels[a.data.textTrackEl.id]=undefined;
var d=this.createTextTrackRenderView(a.data.textTrackEl,c);d.renderMode()}if(c===null){this._createTextTrackFromTextTrackData(a.data.textTrackEl,a.data.textTrackInnerEl,b)
}this.trigger("addtrack",a)};n._createTextTrackFromTextTrackData=function(d,a,b){var c=this.model.createTextTrackFromNativeTrack(d,a,b);
this.createTextTrackRenderView(d,c);return c};n._removeTextTrackFromTextTrackData=function(b){var a=this.model.findTextTrackModelFromNativeTrack(b);
this.removeTextTrackRenderView(a);this.model.removeTextTrackFromNativeTrack(b)};
n._respondToChangeTrackEvent=function(a){this.trigger("changetrack",a)};n._respondToRemoveTrackEvent=function(b){var a=b.data.track;
this._removeTextTrackFromTextTrackData(a);this.trigger("removetrack",b)};n._onTimeUpdate=function(a){this._refreshCurrentCaption()
};n._refreshCurrentCaption=function(){if(!this.view.textTracks||this.view.textTracks.cues.length===0){return
}var a=this.view.textTracks.cues.filter(this._filterCaptions.bind(this));var b=a.length;
var c=this.model.findTextTrackModelFromNativeTrack(this.view.textTracks);var d=c.get("mode");
if(d==="showing"&&b>0){c.addVTTCue(a[0].text);this.view.show()}else{c.clearVTTCue();
this.view.hide()}};n.addTextTrackFromRemoteVTT=function(a){if(this.view){this.view.hide()
}var c={src:a.src};var b=this.model.findTextTrack(c);if(b&&typeof b==="object"){this.view.textTracks=b.getNativeTextTrack();
this.view.textTrackEl=b.getTextTrackEl();this.view.textTrackInnerEl=b.getTextTrackInnerEl();
return b.cid}b=new l(a);this._holdingTextTrackModels[b.cid]=b;if(a.src){this.view.loadVTTFile(a.src,b)
}return b.cid};n.removeTextTrack=function(a){if(!a){return}if(this._holdingTextTrackModels[a.cid]){this._holdingTextTrackModels[a.cid]=undefined
}this.view.removeTextTrackDiv(a)};n.populateTextTracks=function(){};n._filterCaptions=function(d,b,c){var f=this.mediaElement.getCurrentTime();
var a=this._toMMSSS(f);return this._compareTime(a,d.startTime,"gt")&&this._compareTime(a,d.endTime,"lt")
};n._toMMSSS=function(d){var b=Math.floor(d/3600);var a=Math.floor((d-(b*3600))/60);
var c=Math.round((d-(b*3600)-(a*60)));if(b<10){b="0"+b}if(a<10){a="0"+a}if(c<10){c="0"+c
}return b+":"+a+":"+c};n._compareTime=function(c,a,b){c=new Date("January 1, 1975 "+c);
a=new Date("January 1, 1975 "+a);return b==="gt"?c>=a:c<=a};q.exports=s},{"./../../collection/PolyfillTextTrackCollection":782,"./../../models/PolyfillTextTrackModel":799,"./../../views/textTracks/PolyfillTextTrackCollectionView":817,"./TextTracksController":790,"ac-object":646}],790:[function(q,r,p){var k=q("ac-event-emitter").EventEmitter;
var m=q("./../../collection/TextTrackCollection");var l=q("./../../views/textTracks/TextTrackRender");
var s=q("ac-object");function n(b,a){this.options=a||{};this.mediaElement=b;this.model=this.options.model||new m();
this._textTrackRenderViews=[]}var o=n.prototype=s.create(k.prototype);o.findTextTrackModelFromNativeTrack=function(a){return this.model.findTextTrackModelFromNativeTrack(a)
};o.addTextTrackFromRemoteVTT=function(a){};o.addTextTrack=function(){};o.removeTextTrack=function(a){};
o.getEnabledTextTracks=function(){return this.model.getEnabledTextTracks.apply(this.model,arguments)
};o.getTextTracks=function(){return this.model};o.getTextTracksCount=function(){return this.model.count()
};o.getVisibleTextTracks=function(){return this.model.getVisibleTextTracks()};o.findTextTrack=function(a){return this.model.findTextTrack(a)
};o.addTextTrack=function(b,c,a){return this.mediaElement.addTextTrack(b,c,a)};
o.populateTextTracks=function(){};o.createTextTrackRenderView=function(a,c){var b=new l({element:a,model:c});
c.on("change:mode",this._onTextTrackModeChange,this);b.render();this._textTrackRenderViews.push(b);
return b};o.removeTextTrackRenderView=function(a){var b=this._textTrackRenderViews.length;
var d={};for(var c=0;c<b;c++){if(this._textTrackRenderViews[c].model.cid===a.cid){d.view=this._textTrackRenderViews[c];
d.idx=c;break}}if(d.view){this._destroyRenderView(d.view);this._textTrackRenderViews.splice(d.idx,1)
}};o._destroyRenderView=function(b){b.emitterTrigger("destroy");b.off();var a;for(a in b){if(b.hasOwnProperty(a)){b[a]=null
}}};o._onTextTrackModeChange=function(b){var a=b.value;if(a==="showing"){this.trigger("texttrackshow")
}else{this.trigger("texttrackhide")}};r.exports=n},{"./../../collection/TextTrackCollection":783,"./../../views/textTracks/TextTrackRender":819,"ac-event-emitter":false,"ac-object":646}],791:[function(s,t,r){var o=s("./TextTracksController");
var p=s("./../../models/TextTrackModel");var n=s("./../../views/textTracks/WebkitClosedCaptionsView");
var u=s("ac-object");var l=s("ac-browser");function m(){o.apply(this,arguments)
}var q=m.prototype=u.create(o.prototype);q._onTextTrackModeChange=function(a){if(a.value==="showing"){this.trigger("texttrackshow")
}else{this.trigger("texttrackhide")}};q.populateTextTracks=function(){var a=this.mediaElement.el;
var b;var c=a.webkitHasClosedCaptions;if(c===true){if(!this.view){this.view=new n({element:a})
}b=new p({mode:"hidden"});this.view.setModel(b);b.on("change:mode",this._onTextTrackModeChange,this);
this.model.reset([b]);this.trigger("addtrack",{textTrack:b});if(l.name==="Safari Mobile"&&l.version<7){b.once("change:mode",this.view.render,this.view)
}else{this.view.render()}}};t.exports=m},{"./../../models/TextTrackModel":800,"./../../views/textTracks/WebkitClosedCaptionsView":822,"./TextTracksController":790,"ac-browser":54,"ac-object":646}],792:[function(i,h,f){function g(a){this.options=a||{};
this.player=this.options.player;this.player.setControls(true)}g.create=function(a){return new g(a)
};h.exports=g},{}],793:[function(x,y,u){var p=x("./../models/Video");var o=x("ac-event-emitter").EventEmitter;
var z=x("./../views/mediaView/MediaView");var v=x("ac-object");var q=x("./../controller/textTracks/NativeTextTracksController");
var s=x("ac-fullscreen");var r=x("ac-feature");var A=x("./../const/readyState");
function w(a,b){this.playableObject=a;this.options=b||{};this.model=this._getOrCreateVideo();
this.view=this._getOrCreateView();this.textTracks=this._getOrCreateTextTracksController();
this._sourceReadyBinding=false;o.call(this);this._bindTextTrackEvents();this._bindModelEvents();
this._checkToRenderView()}var t=w.prototype=v.create(o.prototype);t._bindTextTrackEvents=function(){this.textTracks.on("addtrack",this._onAddTrack,this);
this.textTracks.on("change",this._onTrackChange,this);this.textTracks.on("removetrack",this._onRemoveTrack,this);
this.textTracks.on("texttrackshow",this._onTextTrackShow,this);this.textTracks.on("texttrackhide",this._onTextTrackHide,this)
};t._onTextTrackHide=function(){this.trigger("texttrackhide")};t._onTextTrackShow=function(){this.trigger("texttrackshow")
};t._onAddTrack=function(a){this.trigger("addtrack",a.data.track)};t._onTrackChange=function(a){this.trigger("change",a)
};t._onRemoveTrack=function(a){this.trigger("removetrack",a.data.track)};t._checkToRenderView=function(){if(this.model.getCurrentSrc()){this._onSourceReady()
}else{if(!this._sourceReadyBinding){this.model.once("change:currentSrc",this._onSourceReady,this);
this._sourceReadyBinding=true}}};t._onSourceReady=function(){if(this.model.getPreload()!=="none"){this.view.render();
this.playableObject.setEl(this.view.getMediaElement());this._bindViewEvents()}this._sourceReadyBinding=false
};t._getOrCreateView=function(){var a=this.options.view;if(!a){a=new z({model:this.model})
}a.on("mediaelementchange",this._onMediaElementChange,this);return a};t._onMediaElementChange=function(){this.playableObject.setEl(this.view.getMediaElement())
};t._getOrCreateTextTracksController=function(){var a=this.options.textTracks;if(a===undefined){a=new q(this.playableObject)
}return a};t._getOrCreateVideo=function(){var a=this.options.model;if(a===undefined){a=new p()
}else{if(!(a instanceof p)){a=new p(a)}}return a};t._bindModelEvents=function(){this.model.on("change:muted",this._onMutedChange,this);
this.model.on("change:seeking",this._onModelSeekingChange,this);this.model.on("change:paused",this._onPausedChange,this);
this.model.on("change:playbackRate",this._onPlaybackRateChange,this);this.model.on("change:duration",this._onDurationChange,this);
this.model.on("change:volume",this._onVolumeChange,this);this.model.on("change:readyState",this._onReadyStateChange,this);
this.model.on("change:poster",this._onPosterChange,this)};t._bindViewEvents=function(){this.view.on("play",this._respondToPlay,this);
this.view.on("pause",this._respondToPause,this);this.view.on("timeupdate",this._respondToTimeUpdate,this);
this.view.on("ended",this._respondToEnded,this);this.view.on("ratechange",this._respondToRateChange,this);
this.view.on("durationchange",this._respondToDurationChange,this);this.view.on("loadedmetadata",this._respondToLoadedMetaData,this);
this.view.on("loadeddata",this._respondToLoadedData,this);this.view.on("canplay",this._respondToCanPlay,this);
this.view.on("canplaythrough",this._respondToCanPlayThrough,this)};t._populateTextTracks=function(){this.textTracks.populateTextTracks()
};t._respondToLoadedMetaData=function(){this._populateTextTracks();this._setReadyState(1)
};t._onPosterChange=function(){this.trigger("posterchange")};t._respondToLoadedData=function(){this._setReadyState(2)
};t._respondToCanPlay=function(){this._setReadyState(3)};t._respondToCanPlayThrough=function(){this._setReadyState(4)
};t._respondToDurationChange=function(){this.model.set({duration:this.playableObject.getDuration()})
};t._respondToRateChange=function(){if(this.playableObject.getPlaybackRate){this.model.set({playbackRate:this.playableObject.getPlaybackRate()})
}};t._respondToEnded=function(){this.model.set({ended:true});this.trigger("ended")
};t._respondToPlay=function(){var b=this.getMediaElement();if(s.fullscreenElement()!==b&&s.getMode()==="ios"&&r.isHandheld()){try{s.requestFullscreen(this.getMediaElement())
}catch(a){}}this.model.set({paused:false,ended:false})};t._respondToPause=function(){this.model.set({paused:true})
};t._triggerTimeUpdate=function(){this.trigger("timeupdate",{currentTime:this.getCurrentTime()})
};t._respondToTimeUpdate=function(){if(this.model.getCurrentTime()!==this.playableObject.getCurrentTime()){this.model.setCurrentTime(this.playableObject.getCurrentTime());
this._triggerTimeUpdate()}if(this.model.getSeeking()===true){this.model.set({seeking:false})
}};t._onReadyStateChange=function(a){if(a.value===A.LOADEDMETADATA){this.trigger("loadedmetadata")
}else{if(a.value===A.LOADEDDATA){this.trigger("loadeddata")}else{if(a.value===A.CANPLAY){this.trigger("canplay")
}else{if(a.value===A.CANPLAYTHROUGH){this.trigger("canplaythrough")}}}}this.trigger("readystatechange",{readyState:a.value})
};t._setReadyState=function(a){this.model.set({readyState:a})};t._onMutedChange=function(){this.trigger("volumechange");
if(this.model.getMuted()===false){this._setElementVolume(this.model.getVolume())
}};t._onVolumeChange=function(){this.trigger("volumechange")};t._onDurationChange=function(a){if(isNaN(a.previous)&&isNaN(a.value)){return
}this.trigger("durationchange",a)};t._onPlaybackRateChange=function(){this.trigger("ratechange")
};t._onPausedChange=function(a){if(a.value===true){this.trigger("pause")}else{this.trigger("play")
}};t._onModelSeekingChange=function(a){if(a.value===true){this.trigger("seeking")
}else{this.trigger("seeked")}};t.findTextTrackModelFromNativeTrack=function(a){return this.textTracks.findTextTrackModelFromNativeTrack(a)
};t.findTextTrack=function(a){return this.textTracks.findTextTrack(a)};t.getTextTracks=function(){return this.textTracks.getTextTracks()
};t.getTextTracksCount=function(){return this.textTracks.getTextTracksCount()};
t.addTextTrackFromRemoteVTT=function(){return this.textTracks.addTextTrackFromRemoteVTT.apply(this.textTracks,arguments)
};t.addTextTrack=function(b,c,a){return this.textTracks.addTextTrack(b,c,a)};t.removeTextTrack=function(){return this.textTracks.removeTextTrack.apply(this.textTracks,arguments)
};t.getEnabledTextTracks=function(){return this.textTracks.getEnabledTextTracks.apply(this.textTracks,arguments)
};t.getVisibleTextTracks=function(){return this.textTracks.getVisibleTextTracks()
};t.play=function(){if(this.getPaused()===false){return}this.playableObject.play()
};t.pause=function(){if(this.getPaused()===true){return}this.playableObject.pause()
};t.getVideo=function(){return this.model};t.getPaused=function(){return this.model.getPaused()
};t.setMuted=function(a){this.model.setMuted(a);this.playableObject.setMuted(a)
};t.getMuted=function(){return this.model.getMuted()};t.getEnded=function(){return this.model.getEnded()
};t._setElementVolume=function(a){this.playableObject.setVolume(a)};t.setVolume=function(a){this.model.setVolume(a,{silent:true});
if(this.getMuted()===false){this._setElementVolume(a)}};t.getVolume=function(){return this.model.getVolume()
};t.setCurrentTime=function(a){var b=this.getCurrentTime();this.model.set({seeking:true});
this.playableObject.setCurrentTime(a);if(b===a){this.model.set({seeking:false})
}};t.getWidth=function(){return this.playableObject.getWidth()};t.getHeight=function(){return this.playableObject.getHeight()
};t.getCurrentTime=function(){return this.model.getCurrentTime()};t.setPlaybackRate=function(a){var b=this.model.getPlaybackRate();
if(b!==a){this.playableObject.setPlaybackRate(a)}};t.getPlaybackRate=function(){return this.model.getPlaybackRate()
};t.getDuration=function(){return this.model.getDuration()};t.setAutoplay=function(a){this.playableObject.SetAutoPlay(a)
};t.getAutoplay=function(){return this.playableObject.GetAutoPlay()};t.getCaptionsTracks=function(){return this.playableObject.getCaptionsTracks()
};t.setLoop=function(a){this.model.setLoop(a);this.playableObject.setLoop(a)};t.getLoop=function(){return this.model.getLoop()
};t.getError=function(){};t.getVideoWidth=function(){};t.getVideoHeight=function(){};
t.getPoster=function(){return this.model.getPoster()};t.setPoster=function(a){this.model.setPoster(a)
};t.hasPoster=function(){return !!(this.model.getPoster())};t._resetModelPlaybackAttributes=function(){this.model.set({duration:this.playableObject.getDuration(),currentTime:this.playableObject.getCurrentTime(),playbackRate:this.playableObject.getPlaybackRate(),readyState:0,paused:true,ended:false,seeking:false});
this._triggerTimeUpdate()};t.setSrc=function(b){var a=this.model.findSources(b)[0];
var c=this.model.getCurrentSrc();if(c){c=c.get("src")}if(a===undefined){a=this.model.addSource(b)
}if(c!==a.get("src")){this.model.setCurrentSrc(a);this.playableObject.setSrc(a.get("src"));
this._resetModelPlaybackAttributes()}return a};t.getPreload=function(){return this.model.getPreload()
};t.setPreload=function(a){this.model.setPreload(a);this.playableObject.setPreload(a);
this._checkToRenderView()};t.getCurrentSrc=function(){return this.model.getCurrentSrc()
};t.getSources=function(){return this.model.getSources()};t.getNetworkState=function(){return this.model.get("networkState")
};t.getReadyState=function(){return this.model.get("readyState")};t.getControls=function(){return this.model.get("controls")
};t.setControls=function(a){this.model.set({controls:a});this.playableObject.setControls(a)
};t.getDefaultPlaybackRate=function(){return this.model.getDefaultPlaybackRate()
};t.getSeekable=function(){return this.getBuffered()};t.getDefaultMuted=function(){return this.model.get("defaultMuted")
};t.getSeeking=function(){return this.model.get("seeking")};t.getPlayed=function(){return this.playableObject.getPlayed()
};t.getBuffered=function(){return this.playableObject.getBuffered()};t.getMediaElement=function(){return this.view.getMediaElement()
};t.appendTo=function(){return this.view.appendTo.apply(this.view,arguments)};t.getViewElement=function(){return this.view.el
};y.exports=w},{"./../const/readyState":786,"./../controller/textTracks/NativeTextTracksController":787,"./../models/Video":801,"./../views/mediaView/MediaView":811,"ac-event-emitter":false,"ac-feature":592,"ac-fullscreen":320,"ac-object":646}],794:[function(i,m,j){var l=i("./../../recommendation/vat");
var n=i("./createQuickTime");var k=i("./createHTML5Video");function o(a,d){d=d||{};
var c=d.type||l.get();var b;if(c==="quicktime"){b=n(a,d)}else{b=k(a,d)}return b
}m.exports=o},{"./../../recommendation/vat":808,"./createHTML5Video":796,"./createQuickTime":797}],795:[function(o,n,i){var k=o("./create");
var j=o("./../../models/video/factory/createFromVideoTag");var m=o("./../../recommendation/vat");
function l(a,c){c=c||{};c.element=a;var b=c.type=m.get();var g=j(a,c);var d=g.getSources();
var h;var f=d.find({src:a.currentSrc})[0];if(b==="quicktime"){f=d.find({type:"video/quicktime"})[0];
if(!f&&d.models.length===1){f=d.at(0)}}if(f){g.setSrc(f)}h=k(g,c);if(h.getViewElement()!==a){a.parentNode.replaceChild(h.getViewElement(),a)
}return h}n.exports=l},{"./../../models/video/factory/createFromVideoTag":803,"./../../recommendation/vat":808,"./create":794}],796:[function(s,w,q){var p=s("ac-browser");
var u=s("./../../views/mediaView/HTML5Video");var r=s("./../MediaController");var y=s("./../../adapter/element-adapter");
var v=s("./../../controller/textTracks/NativeTextTracksController");var x=s("./../../controller/textTracks/PolyfillTextTracksController");
var t=s("./../../controller/textTracks/WebkitClosedCaptions");var o=s("./../../models/Video");
var n=function(d,g){g=g||{};if(!(d instanceof o)){d=new o(d)}var f=g.view||new u({model:d,element:g.element,template:"elementVideo"});
var b=f.getMediaElement();var j=y.create(b,"video");var i=p.name.toLowerCase();
var c=(i==="ie"||i==="edge");var a;if(!("textTracks" in b)&&"webkitClosedCaptionsVisible" in b){a=new t(j)
}else{if(c){a=new x(j)}else{a=new v(j)}}if(g.textTracks){g.textTracks.forEach(function(l){var k=l;
if(typeof l==="string"){k={src:l}}a.addTextTrackFromRemoteVTT(k)})}var h=new r(j,{model:d,view:f,textTracks:a});
return h};w.exports=n},{"./../../adapter/element-adapter":780,"./../../controller/textTracks/NativeTextTracksController":787,"./../../controller/textTracks/PolyfillTextTracksController":789,"./../../controller/textTracks/WebkitClosedCaptions":791,"./../../models/Video":801,"./../../views/mediaView/HTML5Video":810,"./../MediaController":793,"ac-browser":54}],797:[function(p,q,n){var m=p("./../../views/mediaView/QuickTime");
var s=p("./../../adapter/element-adapter");var o=p("./../MediaController");var r=p("./../../controller/textTracks/PolyfillQuickTimeTextTracksController");
var k=p("./../../models/Video");var l=function(f,h){var d;var g;var b;var a;var c;
h=h||{};if(!(f instanceof k)){f=new k(f)}a=new m({model:f});b=a.getMediaElement();
b=b?b:a.el;d=s.create(b,"quicktime");c=new r(d);if(h.textTracks){h.textTracks.forEach(function(j){var i=j;
if(typeof j==="string"){i={src:j}}c.addTextTrackFromRemoteVTT(i)})}g=new o(d,{model:f,view:a,textTracks:c});
c.setVideoEventEmitter(g);return g};q.exports=l},{"./../../adapter/element-adapter":780,"./../../controller/textTracks/PolyfillQuickTimeTextTracksController":788,"./../../models/Video":801,"./../../views/mediaView/QuickTime":812,"./../MediaController":793}],798:[function(o,m,i){var k=o("ac-mvc-model").Model;
var j=o("ac-object");function n(){k.apply(this,arguments)}var l=n.prototype=j.create(k.prototype);
l.defaultAttributes={};l.getFullyQualifiedURL=function(){var a=this.get("src");
var b;var c=window.location.origin||window.location.protocol+"//"+window.location.hostname;
if(/http(s)?/.test(a)){return a}else{if(a.slice(0,2)==="//"){return window.location.protocol+a
}else{if(a[0]!=="/"){b=window.location.pathname;b=b.substring(0,b.lastIndexOf("/")+1);
return c+b+a}}}return c+a};m.exports=n},{"ac-mvc-model":612,"ac-object":646}],799:[function(o,n,i){var k=o("ac-mvc-model").Model;
var j=o("ac-object");function l(a){k.apply(this,arguments)}var m=l.prototype=j.create(k.prototype);
m.defaultAttributes={mode:"disabled"};m.setNativeTextTrack=function(a){this._textTrackData=a||{id:null,cues:[]}
};m.getNativeTextTrack=function(){return this._textTrackData};m.setTextTrackEl=function(a){this._textTrackEl=a
};m.getTextTrackEl=function(){return this._textTrackEl};m.getTextTrackInnerEl=function(){return this._textTrackInnerEl
};m.setTextTrackInnerEl=function(a){this._textTrackInnerEl=a};m.getCues=function(){return this._textTrackData.cues
};m.removeCue=function(a){if(typeof a!=="number"){return}if(!this._textTrackData.cues[a]){return
}this._textTrackData.cues.splice(a,1)};m.addCue=function(a,c,b){var d={startTime:a,endTime:c,text:b};
this._textTrackData.cues.push(d)};m.addVTTCue=function(a){if(this._currentVTTCue!==a){this._currentVTTCue=a;
if(this._textTrackInnerEl){this._textTrackInnerEl.innerHTML=a}}};m.removeVTTCue=function(a){if(this._currentVTTCue===a){if(this._textTrackInnerEl){this._textTrackInnerEl.innerHTML=""
}}};m.clearVTTCue=function(){this._currentVTTCue=undefined;if(this._textTrackInnerEl){this._textTrackInnerEl.innerHTML=""
}};m.show=function(){this.set({mode:"showing"})};m.hide=function(){this.set({mode:"hidden"})
};m.disable=function(){this.set({mode:"disabled"})};n.exports=l},{"ac-mvc-model":612,"ac-object":646}],800:[function(o,n,i){var k=o("ac-mvc-model").Model;
var j=o("ac-object");function l(a){k.apply(this,arguments)}var m=l.prototype=j.create(k.prototype);
m.defaultAttributes={mode:"disabled"};m.setNativeTextTrack=function(a){this._nativeTextTrack=a
};m.getNativeTextTrack=function(){return this._nativeTextTrack};m.getCues=function(){return this._nativeTextTrack.cues
};m.removeCue=function(a){this._nativeTextTrack.removeCue(a)};m.addCue=function(a,c,b){var d=new VTTCue(a,c,b);
this.addVTTCue(d)};m.addVTTCue=function(a){this._nativeTextTrack.addCue(a)};m.show=function(){this.set({mode:"showing"})
};m.hide=function(){this.set({mode:"hidden"})};m.disable=function(){this.set({mode:"disabled"})
};n.exports=l},{"ac-mvc-model":612,"ac-object":646}],801:[function(s,u,q){var t=s("ac-mvc-model").Model;
var r=s("ac-object");var m=s("./../collection/MediaSourceCollection");var o=s("./MediaSource");
var v=s("ac-video-posterframe");var w=v.defaultPosterPath();function n(){t.apply(this,arguments);
this._sources=new m();if(this.has("src")){this._addInitSources()}}var p=n.prototype=r.create(t.prototype);
p.defaultAttributes={duration:"NaN",readyState:0,currentTime:0,paused:true,playbackRate:1,ended:false,seeking:false,controls:false,muted:false,volume:1,looping:false,poster:w,defaultPlaybackRate:1,defaultMuted:false,currentSrc:null,preload:"auto"};
p._addInitSources=function(){var a=this.get("src");if(!Array.isArray(a)){a=[a]}a.forEach(this.addSource,this)
};p.findSourcesByFullyQualifiedURL=function(a){return this._sources.filter(function(b){return(b.getFullyQualifiedURL()===a)
})};p.getPoster=function(){return this.get("poster")};p.setAutoplay=function(a){this.set({autoplay:a})
};p.setPoster=function(a){this.set({poster:a})};p.setPreload=function(a){this.set({preload:a})
};p.addSource=function(b){var a=this.createSource(b);this._sources.add(a);this.trigger("source:add",{source:a});
if(this._sources.models.length===1){this.setCurrentSrc(a)}return a};p._coerceMediaSourceData=function(a){if(typeof a==="string"){return{src:a}
}return a};p.createSource=function(a){if((a instanceof o)){return a}return new o(this._coerceMediaSourceData(a))
};p.findSources=function(b,a){if(typeof b==="string"){b={src:b}}return this._sources.find(b,a)
};p.getSources=function(){return this._sources};p.getAutoplay=function(){return this.get("autoplay")
};p.setCurrentTime=function(a){this.set({currentTime:a})};p.getPreload=function(){return this.get("preload")
};p.setSrc=function(a){this.set({currentSrc:a.cid})};p.setCurrentSrc=function(a){this.set({currentSrc:a.cid})
};p.getCurrentSrc=function(){return this._sources.get(this.get("currentSrc"))};
p.setReadyState=function(a){this.set({readyState:a})};p.getDefaultMuted=function(){return this.get("defaultMuted")
};p.getDefaultPlaybackRate=function(){return this.get("defaultPlaybackRate")};p.setLoop=function(a){this.set({loop:a})
};p.getLoop=function(){return this.get("loop")};p.getSeeking=function(){return this.get("seeking")
};p.getReadyState=function(){return this.get("readyState")};p.getDuration=function(){return this.get("duration")
};p.getCurrentTime=function(){return this.get("currentTime")};p.setVolume=function(a){this.set({volume:a})
};p.getVolume=function(){return this.get("volume")};p.getPaused=function(){return this.get("paused")
};p.getPlaybackRate=function(){return this.get("playbackRate")};p.setEnded=function(a){this.set({ended:a})
};p.getEnded=function(){return this.get("ended")};p.getMuted=function(){return this.get("muted")
};p.setPlaybackRate=function(a){this.set({playbackRate:a})};p.setMuted=function(b,a){this.set({muted:b},a)
};u.exports=n},{"./../collection/MediaSourceCollection":781,"./MediaSource":798,"ac-mvc-model":612,"ac-object":646,"ac-video-posterframe":772}],802:[function(g,j,h){var k=g("./../../MediaSource");
function i(c){var a=c.getAttribute("src");var b={src:a};if(c.getAttribute("type")){b.type=c.getAttribute("type")
}return new k(b)}j.exports=i},{"./../../MediaSource":798}],803:[function(q,r,n){var k=q("./../../Video");
var s=q("ac-dom-traversal/querySelectorAll");var p=q("ac-object");var l=q("./../../mediaSource/factory/createFromSourceTag");
function m(b,a){if(a.getAttribute("preload")){b.preload=a.getAttribute("preload")
}}function o(b,a){var c;b.src=[];if(a.getAttribute("src")){b.src.push(l(a))}c=s("source",a);
if(c.length){c=c.map(function(d){return l(d)});b.src=b.src.concat(c)}}r.exports=function(a,d){d=d||{};
var f;var b;var c={paused:a.paused,currentTime:a.currentTime,duration:a.duration,muted:a.muted,volume:a.volume,playbackRate:a.playbackRate,ended:a.ended,readyState:a.readyState,seeking:a.seeking,poster:a.poster,defaultPlaybackRate:a.defaultPlaybackRate,defaultMuted:a.defaultMuted,currentSrc:a.currentSrc,autoplay:a.autoplay};
m(c,a);o(c,a);c=p.extend(c,d);f=new k(c);if(a.currentSrc){b=f.findSourcesByFullyQualifiedURL(a.currentSrc);
if(b&&b[0]){f.setCurrentSrc(b[0])}}return f}},{"./../../Video":801,"./../../mediaSource/factory/createFromSourceTag":802,"ac-dom-traversal/querySelectorAll":197,"ac-object":646}],804:[function(D,K,v){var x=D("ac-mvc-view").View;
var I=D("ac-video-controls");var w=D("./../controls/Native");var u=D("ac-object");
var H=D("ac-fullscreen");var B=D("ac-feature");var G=D("./../const/readyState");
var C=D("ac-video-posterframe");var E=D("ac-dom-events/addEventListener");var J=D("ac-classlist/add");
var F=D("ac-classlist/remove");var y=D("ac-classlist/contains");var t="user-hover";
function z(){x.apply(this,arguments);if(this.options.mediaController){this.setMediaController(this.options.mediaController)
}this.poster=null;this._initPoster();this._initControls();this._listenForFullscreenEvents();
if(B.isDesktop()){this._appendBlockade()}}z.LOADEDMETADATA=G.LOADEDMETADATA;z.LOADEDDATA=G.LOADEDDATA;
z.CANPLAY=G.CANPLAY;z.CANPLAYTHROUGH=G.CANPLAYTHROUGH;var A=z.prototype=u.create(x.prototype);
A.defaultOptions={controlsTimeoutDuration:5000};A.className="ac-video-player";A._appendBlockade=function(){var a=new x({className:"ac-video-blockade"});
a.appendTo(this.el);this._blockade=a};A._onEnterFullscreen=function(a){if(a.target===this.getFullscreenTargetElement()){this.trigger("enterfullscreen",a)
}};A._onExitFullscreen=function(a){if(a.target===this.getFullscreenTargetElement()){this.trigger("exitfullscreen",a)
}};A._listenForFullscreenEvents=function(){H.on("enterfullscreen",this._onEnterFullscreen,this);
H.on("exitfullscreen",this._onExitFullscreen,this)};A._unbindFullscreenEvents=function(){H.off("enterfullscreen",this._onEnterFullscreen,this);
H.off("exitfullscreen",this._onExitFullscreen,this)};A.destroy=function(){x.prototype.destroy.call(this);
this._unbindFullscreenEvents()};A._initPoster=function(){var a=null;if(this.mediaController.hasPoster()&&this.poster===null){a=C.create(this.mediaController);
a.render();if(a.el.parentNode!==this.el){a.appendTo(this.el)}this.poster=a}};A._destroyPoster=function(){if(this.poster&&this.poster.el.parentNode===this.el){this.el.removeChild(this.poster.el)
}this.poster=null};A.getFullscreenTargetElement=function(){return(H.getMode()==="ios"?this.getMediaElement():this.el)
};A.toggleFullscreen=function(){if(this.isFullscreen()){this.exitFullscreen()}else{this.requestFullscreen()
}};A.isFullscreen=function(){return(H.fullscreenElement()===this.getFullscreenTargetElement())
};A.requestFullscreen=function(){var a=this.getFullscreenTargetElement();if(H.fullscreenEnabled(a)){H.requestFullscreen(a)
}};A.exitFullscreen=function(){H.exitFullscreen(this.getFullscreenTargetElement())
};A._instantiateDefaultCustomUIControls=function(){var c=this._instantiateControls(I);
if(c.el.parentNode!==this.el&&typeof c.appendTo==="function"){c.appendTo(this.el)
}var a;var b={};var f=function(g){if(g.pageX!==undefined&&(b.x===g.pageX&&b.y===g.pageY)){return
}if(!y(this.el,t)){J(this.el,t)}window.clearTimeout(a);a=window.setTimeout(function(){F(this.el,t)
}.bind(this),this.options.controlsTimeoutDuration);b={x:g.pageX,y:g.pageY}}.bind(this);
E(this.el,"mouseenter",f);E(this.el,"mousemove",f);var d=function(){window.clearTimeout(a);
F(this.el,t);b={}};if("onmouseleave" in this.el){E(this.el,"mouseleave",d.bind(this))
}else{E(this.el,"mouseout",function(g){if(!c.el.contains(g.target)&&g.target!==c.el){d.call(this)
}}.bind(this),true)}return c};A._instantiateControls=function(a){if(typeof a.create!=="function"){return a
}return a.create({player:this.mediaController,fullScreenElement:this.getFullscreenTargetElement()})
};A._instantiateNonHandheldControls=function(){var a=this.options.controls;var b;
if(a===false||a===null){b=null}else{if(a!==undefined){b=this._instantiateControls(a)
}else{if(B.isDesktop()){b=this._instantiateDefaultCustomUIControls()}else{b=this._instantiateControls(w)
}}}return b};A._instantiateHandheldControls=function(){return this._instantiateControls(w)
};A._initControls=function(){var a;if(!B.isHandheld()){a=this._instantiateNonHandheldControls()
}else{a=this._instantiateHandheldControls()}this.controls=a};A.setMediaController=function(a){if(this.mediaController){this.mediaController.stopPropagatingTo(this)
}this.mediaController=a;this.mediaController.propagateTo(this._eventEmitter)};A.getVideo=function(){return this.mediaController.getVideo()
};A.play=function(){return this.mediaController.play()};A.pause=function(){return this.mediaController.pause()
};A.getPaused=function(){return this.mediaController.getPaused()};A.setMuted=function(a){return this.mediaController.setMuted(a)
};A.getMuted=function(){return this.mediaController.getMuted()};A.getEnded=function(){return this.mediaController.getEnded()
};A.setVolume=function(a){return this.mediaController.setVolume(a)};A.getVolume=function(){return this.mediaController.getVolume()
};A.setCurrentTime=function(a){return this.mediaController.setCurrentTime(a)};A.getCurrentTime=function(){return this.mediaController.getCurrentTime()
};A.getPreload=function(){return this.mediaController.getPreload()};A.setPreload=function(a){return this.mediaController.setPreload(a)
};A.setPlaybackRate=function(a){return this.mediaController.setPlaybackRate(a)};
A.getPlaybackRate=function(){return this.mediaController.getPlaybackRate()};A.getDuration=function(){return this.mediaController.getDuration()
};A.setLoop=function(a){return this.mediaController.setLoop(a)};A.getLoop=function(){return this.mediaController.getLoop()
};A.getError=function(){return this.mediaController.getError()};A.getPoster=function(){return this.mediaController.getPoster()
};A.getMediaWidth=function(){return this.mediaController.getWidth()};A.getMediaHeight=function(){return this.mediaController.getHeight()
};A.setPoster=function(){this.mediaController.setPoster.apply(this.mediaController,arguments);
if(this.mediaController.hasPoster()){this._initPoster()}else{this._destroyPoster()
}};A.setSrc=function(){return this.mediaController.setSrc.apply(this.mediaController,arguments)
};A.getCurrentSrc=function(){return this.mediaController.getCurrentSrc()};A.getSources=function(){return this.mediaController.getSources()
};A.getNetworkState=function(){return this.mediaController.getNetworkState()};A.getReadyState=function(){return this.mediaController.getReadyState()
};A.getDefaultPlaybackRate=function(){return this.mediaController.getDefaultPlaybackRate()
};A.getSeekable=function(){return this.mediaController.getSeekable()};A.getDefaultMuted=function(){return this.mediaController.getDefaultMuted()
};A.getSeeking=function(){return this.mediaController.getSeeking()};A.getStartDate=function(){return this.mediaController.getStartDate()
};A.getPlayed=function(){return this.mediaController.getPlayed()};A.getBuffered=function(){return this.mediaController.getBuffered()
};A.getTextTracks=function(){return this.mediaController.getTextTracks()};A.getTextTracksCount=function(){return this.mediaController.getTextTracksCount()
};A.addTextTrackFromRemoteVTT=function(){return this.mediaController.addTextTrackFromRemoteVTT.apply(this.mediaController,arguments)
};A.addTextTrack=function(){return this.mediaController.addTextTrack.apply(this.mediaController,arguments)
};A.removeTextTrack=function(){return this.mediaController.removeTextTrack.apply(this.mediaController,arguments)
};A.getEnabledTextTracks=function(){return this.mediaController.getEnabledTextTracks.apply(this.mediaController,arguments)
};A.getVisibleTextTracks=function(){return this.mediaController.getVisibleTextTracks.apply(this.mediaController,arguments)
};A.findTextTrack=function(a){return this.mediaController.findTextTrack(a)};A.findTextTrackModelFromNativeTrack=function(a){return this.mediaController.findTextTrackModelFromNativeTrack(a)
};A.getMediaElement=function(){return this.mediaController.getMediaElement()};K.exports=z
},{"./../const/readyState":786,"./../controls/Native":792,"ac-classlist/add":58,"ac-classlist/contains":64,"ac-classlist/remove":68,"ac-dom-events/addEventListener":109,"ac-feature":592,"ac-fullscreen":320,"ac-mvc-view":643,"ac-object":646,"ac-video-controls":690,"ac-video-posterframe":772}],805:[function(m,l,o){var n=m("./../Player");
var k=m("./../../mediaController/factory/create");var j=m("ac-dom-nodes");var i=m("./../../collection/playerCollection");
l.exports=function(a,c){c=c||{};var b;if(!c.mediaController){c.mediaController=k(a,c)
}b=new n(c);if(c.mediaController.getViewElement().parentNode!==b.el){j.insertFirstChild(c.mediaController.getViewElement(),b.el)
}if(!c.preventCollection){i.add(b)}return b}},{"./../../collection/playerCollection":784,"./../../mediaController/factory/create":794,"./../Player":804,"ac-dom-nodes":148}],806:[function(n,l,o){var k=n("./../../config/VideoConfig");
var j=n("./../../models/Video");var i=n("./create");var m=function(f){var d=new k();
var b;var a;d.getConfig(f,{},{}).then(function(g){g.id=f.id;b=g;a=g.source});var c=new j({src:a});
return i(c)};l.exports=m},{"./../../config/VideoConfig":785,"./../../models/Video":801,"./create":805}],807:[function(q,r,n){var p=q("./create");
var l=q("./../../mediaController/factory/createFromVideoTag");var s=q("ac-dom-traversal/querySelectorAll");
var m=q("ac-dom-traversal/querySelector");function o(a){var c=s("source",a);var b=0;
for(b;b<c.length;b+=1){c[b].parentNode.removeChild(c[b])}}var k=function(b,c){c=c||{};
var a=m("video",b);if(a===null){a=document.createElement("video");b.appendChild(a)
}if(typeof c.src!=="undefined"&&c.src!==null){o(a)}c.mediaController=l(a,c);c.element=b;
return p(null,c)};r.exports=k},{"./../../mediaController/factory/createFromVideoTag":795,"./create":805,"ac-dom-traversal/querySelector":196,"ac-dom-traversal/querySelectorAll":197}],808:[function(f,h,g){var i=f("ac-browser");
h.exports={get:function(){var a="html5";if(i.name==="IE"&&i.version<9){a="quicktime"
}return a}}},{"ac-browser":54}],809:[function(h,m,i){var k=h("ac-mvc-view").View;
function j(){k.apply(this,arguments)}var l=j.prototype=new k();l.tagName="source";
l.render=function(){this.el.setAttribute("src",this.model.get("src"));if(this.model.has("type")){this.el.setAttribute("type",this.model.get("type"))
}};m.exports=j},{"ac-mvc-view":643}],810:[function(q,r,o){var s=q("./MediaView");
var k=q("./../MediaSourceTag");var p=q("ac-object");var n=q("ac-dom-traversal/querySelector");
function l(){s.apply(this,arguments)}var m=l.prototype=p.create(s.prototype);m.tagName="video";
m._renderBooleanAttribute=function(c,a){var b=this.getMediaElement();if(a===true){b.setAttribute(c,"")
}else{b.removeAttribute(c)}};m._findExistingSourceOrTrackElement=function(a){var c;
var b;if(a.has("src")){b='[src="'+a.get("src")+'"]';c=n(b,this.el)}return c};m._appendSource=function(d){var b=this.getMediaElement();
var a=this._findExistingSourceOrTrackElement(d);var c=new k({model:d,element:a});
c.render();if(!a){c.appendTo(b)}};m._onSourceAdd=function(a){this._appendSource(a.source)
};m._renderPreload=function(){var a=this.getMediaElement();a.setAttribute("preload",this.model.getPreload())
};m._renderAutoplay=function(){this._renderBooleanAttribute("autoplay",this.model.getAutoplay())
};m._renderMuted=function(){this._renderBooleanAttribute("muted",this.model.getMuted())
};m._renderAirplay=function(){this._renderBooleanAttribute("x-webkit-airplay",true)
};m._renderCrossOrigin=function(){var a=this.getMediaElement();if(this.model.has("crossorigin")){a.setAttribute("crossorigin",this.model.get("crossorigin"))
}};m._renderCurrentSrc=function(){var a=this.model.getCurrentSrc();if(a){this.el.setAttribute("src",a.get("src"))
}};m._renderLoop=function(){var a=this.model.getLoop();this._renderBooleanAttribute("loop",a)
};m._respondToAddTrackEvent=function(a){this.emitterTrigger("addtrack",a.data)};
m.getSourceAttribute=function(){return this.getMediaElement().getAttribute("src")
};m.render=function(){var a=this.getMediaElement();this.model.on("source:add",this._onSourceAdd,this);
this.model.on("change:autoplay",this._renderAutoplay,this);this.model.on("change:muted",this._renderMuted,this);
this.model.on("change:preload",this._renderPreload,this);this.model.on("change:currentSrc",this._renderCurrentSrc,this);
this.model.on("change:crossorigin",this._renderCrossOrigin,this);this.model.getSources().forEach(this._appendSource,this);
this._renderAutoplay();this._renderPreload();this._renderMuted();this._renderAirplay();
this._renderCrossOrigin();this._renderCurrentSrc();this._renderLoop();if(this.model.id){a.setAttribute("id",this.model.id)
}};r.exports=l},{"./../MediaSourceTag":809,"./MediaView":811,"ac-dom-traversal/querySelector":196,"ac-object":646}],811:[function(q,r,o){var n=q("ac-dom-traversal/querySelector");
var l=q("ac-browser");var k=q("ac-mvc-view").View;var p=q("ac-object");function s(){this._mediaElement=null;
k.apply(this,arguments)}var m=s.prototype=p.create(k.prototype);m.className="ac-video-media-controller";
m._findMediaElementByTagName=function(a){if(this.getTagName()===a){return this.el
}return n(a,this.el)};m.renderTextTrack=function(){};m._findMediaElement=function(){if(this._findMediaElementByTagName("video")){return this._findMediaElementByTagName("video")
}else{if(l.name!=="IE"){return this._findMediaElementByTagName("embed")}}return this._findMediaElementByTagName("object")
};m.getMediaElement=function(){return this._findMediaElement()};r.exports=s},{"ac-browser":54,"ac-dom-traversal/querySelector":196,"ac-mvc-view":643,"ac-object":646}],812:[function(u,w,r){var x=u("./MediaView");
var v=u("./eventAdapters/QuickTime");var n=u("./eventAdapters/quicktimeEventsElement");
var s=u("ac-object");var o=u("ac-browser");var t=(o.os.toLowerCase()==="windows");
var y=u("ac-dom-traversal");function p(){x.apply(this,arguments);this._hasRendered=false;
this.model.on("change:currentSrc",this._renderString,this)}var q=p.prototype=s.create(x.prototype);
q._renderID=function(){this._objectStr+=' id="quicktime-movie-'+Date.now()+'"'};
q._renderClsidAttr=function(){this._objectStr+=' classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B"'
};q._renderCodebaseAttr=function(){this._objectStr+=' codebase="http://www.apple.com/qtactivex/qtplugin.cab#version=7,2,1,0"'
};q._renderWModeAttr=function(){this._renderParamAttr("wmode","transparent");this._renderEmbedAttr("wmode","transparent")
};q._renderPostDomEventsAttr=function(){this._objectStr+=' postdomevents="true"'
};q._renderBehaviorAttr=function(){var a=n.getID();if(a){this._objectStyles.push("behavior:url('#"+a+"')")
}};q._renderAutoplay=function(){var a=(this.model.getAutoplay()===true)?"True":"False";
this._renderAttr("autoplay",a)};q._renderVolume=function(){var b=this.model.getMuted();
var a=this.model.getVolume()*256;if(b){a=0}this._renderAttr("volume",a)};q._renderLoop=function(){var a=(this.model.getLoop()===true)?"True":"False";
this._renderAttr("loop",a)};q._renderAttr=function(a,b){this._renderParamAttr(a,b);
this._renderEmbedAttr(a,b)};q._closeOpeningObjectTag=function(){this._objectStr+=">"
};q._renderParamAttr=function(a,b){this._objectStr+='<param name="'+a+'" value="'+b+'" />'
};q._renderEmbedAttr=function(a,b){this._embedStr+=" "+a+'="'+b+'"'};q._closeEmbedTag=function(){this._embedStr+=" />"
};q._closeObjectTag=function(){this._objectStr+="</object>"};q._renderSrc=function(){var a=this.model.getCurrentSrc();
if(a){this._renderAttr("src",a.get("src"))}};q._renderStyleAttr=function(){this._objectStr+=' style="'+this._objectStyles.join(";")+';"';
this._embedStr+=' style="'+this._embedStyles.join(";")+';"'};q.getSourceAttribute=function(){return this.getMediaElement().getAttribute("src")
};q._renderOffscreen=function(){var b=window.screen.width+10;var h=window.screen.height+10;
var d=Math.max(b,h);var f="width:"+d+"px";var c="height:"+d+"px";var a="position:fixed";
var g="left:"+b+"px";this._embedStyles.push(f);this._embedStyles.push(c);this._embedStyles.push(a);
this._embedStyles.push(g);this._objectStyles.push(f);this._objectStyles.push(c);
this._objectStyles.push(a);this._objectStyles.push(g);this._renderStyleAttr()};
q._doneRenderOffscreen=function(){var a=y.querySelector("embed",this.el);var c=y.querySelector("object",this.el);
var b=c.style.cssText.toLowerCase().match(/behavior\((.)+\)/);if(b){c.setAttribute("style",b)
}else{c.removeAttribute("style")}if(a){a.removeAttribute("style")}};q._renderString=function(){var a=(o.name.toLowerCase()==="ie"&&o.version<9);
this._objectStr="<object";this._embedStr="<embed";this._objectStyles=[];this._embedStyles=[];
this._renderClsidAttr();this._renderCodebaseAttr();this._renderID();this._renderPostDomEventsAttr();
this._renderBehaviorAttr();if(t){if(!a){this._renderOffscreen()}else{this._renderStyleAttr()
}}this._closeOpeningObjectTag();this._renderWModeAttr();this._renderAutoplay();
this._renderSrc();this._renderVolume();this._renderLoop();this._renderAttr("enablejavascript","true");
this._renderAttr("postdomevents","true");this._renderAttr("scale","tofit");this._renderAttr("controller","false");
this._renderEmbedAttr("pluginspage","www.apple.com/quicktime/download");this._renderParamAttr("kioskmode","true");
this._renderParamAttr("pluginspace","http://www.apple.com/qtactivex/qtplugin.cab");
this._closeEmbedTag();this._objectStr+=this._embedStr;this._closeObjectTag();this.el.innerHTML=this._objectStr;
this._quickTimeEvents=new v(this.getMediaElement(),this);this.emitterTrigger("mediaelementchange",{});
if(t&&!a){window.requestAnimationFrame(function(){this._doneRenderOffscreen()}.bind(this))
}};q.render=function(){if(this._hasRendered===true){return}this._hasRendered=true;
this._renderString()};w.exports=p},{"./MediaView":811,"./eventAdapters/QuickTime":813,"./eventAdapters/quicktimeEventsElement":816,"ac-browser":54,"ac-dom-traversal":183,"ac-object":646}],813:[function(r,s,o){var k=r("ac-dom-emitter").DOMEmitter;
var m=r("./QuickTimeTimeUpdate");var l=r("./QuickTimePluginReady");var q=r("ac-object");
function p(b,a){k.call(this,b);if(this._isObjectTag()===false){this._aliasEvents()
}else{this._plugin=new l(b);this._plugin.once("ready",function(){this._plugin=undefined;
this._aliasEvents()},this);this._plugin.poll()}this._propagationTarget=a}var n=p.prototype=q.create(k.prototype);
n._bubble=function(a){this._propagationTarget.emitterTrigger(a,{target:this.el})
};n._onTimeupdateObserverTimeUpdate=function(){this._bubble("timeupdate")};n._onQTPlay=function(){this._timeupdateObserver.listenForTimeUpdate();
this._bubble("play")};n._onQTPause=function(){this._timeupdateObserver.stopListenForTimeUpdate();
this._bubble("pause")};n._onQTEnded=function(){this._timeupdateObserver.stopListenForTimeUpdate();
this._bubble("ended")};n._onQTBegin=function(){this._bubble("loadstart")};n._onQTVolumeChange=function(){this._bubble("volumechange")
};n._onQTProgressChange=function(){this._bubble("progress")};n._onQTError=function(){this._bubble("error")
};n._onQTStalled=function(){this._bubble("stalled")};n._onQTCanPlay=function(){this._bubble("canplay")
};n._onQTCanPlayThrough=function(){this._bubble("canplaythrough")};n._onQTDurationChange=function(){this._bubble("durationchange")
};n._onQTLoadedMetaData=function(){this._bubble("loadedmetadata")};n._onQTloadedFirstFrame=function(){this._bubble("loadeddata")
};n._onQTWaiting=function(){this._bubble("waiting")};n._onQTTimeChanged=function(){this._bubbleTimeUpdate()
};n._bubbleTimeUpdate=function(){this._bubble("timeupdate")};n._isObjectTag=function(){return(this.el.tagName.toLowerCase()==="object")
};n._getEventName=function(a){if(this._isObjectTag()){return"on"+a}return a};n._bindEvents=function(d,a,b){var c=this._getEventName(d);
if(typeof this.el.attachEvent==="function"){this.el.attachEvent(c,function(f){a.call(b,f)
})}else{this.on(d,a,b)}};n._aliasEvents=function(){this._bindEvents("qt_play",this._onQTPlay,this);
this._bindEvents("qt_pause",this._onQTPause,this);this._bindEvents("qt_begin",this._onQTBegin,this);
this._bindEvents("qt_volumechange",this._onQTVolumeChange,this);this._bindEvents("qt_progress",this._onQTProgressChange,this);
this._bindEvents("qt_error",this._onQTError,this);this._bindEvents("qt_stalled",this._onQTStalled,this);
this._bindEvents("qt_canplay",this._onQTCanPlay,this);this._bindEvents("qt_canplaythrough",this._onQTCanPlayThrough,this);
this._bindEvents("qt_durationchange",this._onQTDurationChange,this);this._bindEvents("qt_ended",this._onQTEnded,this);
this._bindEvents("qt_loadedmetadata",this._onQTLoadedMetaData,this);this._bindEvents("qt_loadedfirstframe",this._onQTloadedFirstFrame,this);
this._bindEvents("qt_waiting",this._onQTWaiting,this);this._bindEvents("qt_timechanged",this._onQTTimeChanged,this);
this._timeupdateObserver=new m(this.el);this._timeupdateObserver.on("timeupdate",this._onTimeupdateObserverTimeUpdate,this);
this._timeupdateObserver.on("pause",this._onQTPause,this)};s.exports=p},{"./QuickTimePluginReady":814,"./QuickTimeTimeUpdate":815,"ac-dom-emitter":586,"ac-object":646}],814:[function(o,n,i){var l=o("ac-event-emitter").EventEmitter;
var j=o("ac-object");function k(a){l.call(this);this._movie=a;this._pollInterval=5;
this._boundPoll=this.poll.bind(this)}var m=k.prototype=j.create(l.prototype);m._resetMovieUrl=function(){var b=this._movie;
var a;b.SetResetPropertiesOnReload(false);a=b.GetURL();b.autoplay=true;a+=(a.indexOf("?")!==-1)?"&rnd="+Math.random():"?rnd="+Math.random();
b.SetURL(a)};m.getPluginStatus=function(){var b="";try{b=this._movie.GetPluginStatus()
}catch(a){}return b};m.isAPIAvailable=function(){var b;try{this._movie.GetVolume();
b=true}catch(a){b=false}return b};m.isReady=function(){return/(Complete)/i.test(this.getPluginStatus())
};m._triggerReady=function(){this.trigger("ready")};m.poll=function(){if(this.isReady()){this._resetMovieUrl();
this._triggerReady()}else{setTimeout(this._boundPoll,this._pollInterval)}};n.exports=k
},{"ac-event-emitter":false,"ac-object":646}],815:[function(q,o,j){var m=q("ac-event-emitter").EventEmitter;
var k=q("ac-object");var p=300;function l(a){this.mediaElement=a;this._isListeningForTimeUpdate=false;
this._boundTick=null;this._lastTimeCheck=0;this._timeout=null}var n=l.prototype=k.create(m.prototype);
n.listenForTimeUpdate=function(){this._isListeningForTimeUpdate=true;this._boundTick=this._tick.bind(this);
window.setTimeout(this._boundTick,p)};n.stopListenForTimeUpdate=function(){window.clearTimeout(this._timeout);
this._isListeningForTimeUpdate=false;this._boundTick=null;this._timeout=null};n.getCurrentTime=function(){return this.mediaElement.GetTime()/this.mediaElement.GetTimeScale()
};n._tick=function(){var a=this.getCurrentTime();if(a!==this._lastTimeCheck){this.trigger("timeupdate")
}else{if(this.mediaElement.GetRate()===0){this.trigger("pause")}}this._lastTimeCheck=a;
if(this._isListeningForTimeUpdate&&this._boundTick){this._timeout=window.setTimeout(this._boundTick,p)
}};o.exports=l},{"ac-event-emitter":false,"ac-object":646}],816:[function(i,n,j){var o=i("ac-browser");
var l=function(a,c){var b=(a.toUpperCase()==="IE"&&c<9);if(!b){return}this.id="quicktime-events-element-"+Date.now();
this.el=document.createElement("object");this._setAttributes({id:this.getID(),wmode:"transparent",classid:"clsid:CB927D12-4FF7-4a9e-A169-56E4B8A75598",codebase:"http://www.apple.com/qtactivex/qtplugin.cab#version=7,2,1,0"});
this.appendToBody()};var m=l.prototype;m.appendToBody=function(){document.write(this.el.outerHTML)
};m.getID=function(){return this.id};m._setAttributes=function(a){for(var b in a){this.el.setAttribute(b,a[b])
}};var k=new l(o.name,o.version);n.exports=k;n.exports.C=l},{"ac-browser":54}],817:[function(z,A,y){var q=z("ac-mvc-view").View;
var v=z("./TextTrackDiv");var B=z("ac-object");var t=z("ac-dom-styles");var s=z("ac-dom-traversal/firstChild");
var w=z("ac-ajax");var C=z("ac-console");var p=z("ac-classlist");var u="is-visible";
function r(){q.apply(this,arguments);this.textTracks={id:null,cues:[]};this.textTrackEl=null;
this.textTrackInnerEl=null;this.isVisible=false;this._textTrackDivs=[];this.loadExistingTextTracksSrc()
}var x=r.prototype=B.create(q.prototype);x.loadExistingTextTracksSrc=function(){var b=(this.el&&this.el.children)?this.el.children:[];
var c=b.length;var a;while(c--){if(b[c]&&b[c].nodeName==="TRACK"){a=b[c].getAttribute("src");
break}}if(a){this.loadVTTFile(a)}};x.loadVTTFile=function(a,b){w.get({url:a}).then(function(c){this._vttFileLoadSuccess(c.responseText,b)
}.bind(this),function(c){C.log(JSON.stringify(c))})};x._vttFileLoadSuccess=function(a,c){var b=this.addTextTrackTag(c);
this.textTrackEl=b.el;this.textTrackInnerEl=s(this.textTrackEl);this.textTracks={id:c.cid,cues:this._formatVTTToModel(a)};
this._publishAddTrack(this.textTracks)};x._publishAddTrack=function(a){this.emitterTrigger("addtrack",{track:a,textTrackEl:this.textTrackEl,textTrackInnerEl:this.textTrackInnerEl})
};x._publishRemoveTrack=function(a){this.emitterTrigger("removetrack",{track:a})
};x.show=function(){if(!this.textTrackEl||this.isVisible){return}t.setStyle(this.textTrackEl,{display:"inline-block"});
p.add(this.textTrackInnerEl,u);this.isVisible=true};x.hide=function(){if(!this.textTrackEl||!this.isVisible){return
}t.setStyle(this.textTrackEl,{display:"none"});if(this.textTrackInnerEl){p.remove(this.textTrackInnerEl,u)
}this.isVisible=false};x._createTextTrackDiv=function(b){if(this.isVisible){this.hide()
}var a=new v({model:b});a.render();if(this.el.parentNode){a.appendTo(this.el.parentNode);
this._textTrackDivs.push(a)}else{this.on("canplay",function(){a.appendTo(this.el.parentNode);
this._textTrackDivs.push(a)}.bind(this))}return a};x.addTextTrackTag=function(a){return this._createTextTrackDiv(a)
};x._findTextTrackTagFromModel=function(b){var c=this._textTrackDivs.length;var a={};
for(var d=0;d<c;d++){if(this._textTrackDivs[d].model.cid===b.cid){a.div=this._textTrackDivs[d];
a.idx=d;break}}return a};x.removeTextTrackDiv=function(b){var a=this._findTextTrackTagFromModel(b);
if(a.div){a.div.destroy();this._textTrackDivs.splice(a.idx,1)}this._publishRemoveTrack(b.getCues())
};x._formatVTTToModel=function(b){var d=b.split(/\n/);var c=/([\d]{2}:)?[\d]{2}:[\d]{2}.[\d]{3}( \-\-> ){1}([\d]{2}:)?[\d]{2}:[\d]{2}.[\d]{3}/;
var f=[];var h;var a;var g=0;var i=d.length;for(g;g<i;g++){a="";if(c.test(d[g])){h=d[g].split(" --> ");
h[0]=h[0].split(":").length<3?"00:"+h[0]:h[0];h[1]=h[1].split(":").length<3?"00:"+h[1]:h[1];
while(++g&&g<i&&!c.test(d[g])){if(d[g]!==""){a+=d[g]+"<br />"}}a=a.substr(0,a.length-6);
if(g<i){g--}f.push({startTime:h[0].split(".")[0],endTime:h[1].split(".")[0],text:a})
}}return f};A.exports=r},{"./TextTrackDiv":818,"ac-ajax":13,"ac-classlist":65,"ac-console":554,"ac-dom-styles":589,"ac-dom-traversal/firstChild":182,"ac-mvc-view":643,"ac-object":646}],818:[function(q,r,p){var k=q("ac-mvc-view").View;
var s=q("ac-object");var l=q("ac-dom-styles");var m=q("ac-classlist/add");function n(){k.apply(this,arguments)
}var o=n.prototype=s.create(k.prototype);o.tagName="div";o.render=function(){var a=document.createElement("div");
m(a,"ac-text-track-inner-element");l.setStyle(this.el,{display:"none",position:"absolute","z-index":"9",bottom:"20%",left:"0",right:"0","text-align":"center"});
this.el.setAttribute("id",this.model.cid);this.el.appendChild(a)};r.exports=n},{"ac-classlist/add":58,"ac-dom-styles":589,"ac-mvc-view":643,"ac-object":646}],819:[function(o,m,j){var k=o("ac-mvc-view").View;
var i=o("ac-object");function n(){k.apply(this,arguments)}var l=n.prototype=i.create(k.prototype);
l._onModeChange=function(a){this.renderMode()};l.renderMode=function(){var a=this.model.get("mode");
this.el.mode=a};l.render=function(){this.model.on("change:mode",this._onModeChange,this)
};m.exports=n},{"ac-mvc-view":643,"ac-object":646}],820:[function(n,m,i){var k=n("ac-mvc-view").View;
var o=n("ac-object");function j(){k.apply(this,arguments)}var l=j.prototype=o.create(k.prototype);
l.tagName="track";l.render=function(){["src","type","label","kind","srclang"].forEach(function(a){if(this.model.has(a)){this.el.setAttribute(a,this.model.get(a))
}},this);this.el.setAttribute("id",this.model.cid)};m.exports=j},{"ac-mvc-view":643,"ac-object":646}],821:[function(p,o,j){var m=p("ac-mvc-view").View;
var l=p("./TextTrackTag");var q=p("ac-object");function k(){m.apply(this,arguments);
this._textTracks=this.el.textTracks;this._textTrackTags=[];this.addTextTrackEvents()
}var n=k.prototype=q.create(m.prototype);n.addTextTrackEvents=function(){if(this._textTracks){this._boundRespondToAddTrackEvent=this._respondToAddTrackEvent.bind(this);
this._boundRespondToChangeEvent=this._respondToChangeEvent.bind(this);this._boundRespondToRemoveTrackEvent=this._respondToRemoveTrackEvent.bind(this);
this._textTracks.addEventListener("addtrack",this._boundRespondToAddTrackEvent);
this._textTracks.addEventListener("change",this._boundRespondToChangeEvent);this._textTracks.addEventListener("removetrack",this._boundRespondToRemoveTrackEvent)
}};n.removeTextTrackEvents=function(){this._boundRespondToAddTrackEvent=null;this._boundRespondToChangeEvent=null;
this._boundRespondToRemoveTrackEvent=null;this._textTracks.removeEventListener("addtrack",this._boundRespondToAddTrackEvent);
this._textTracks.removeEventListener("change",this._boundRespondToChangeEvent);
this._textTracks.removeEventListener("removetrack",this._boundRespondToRemoveTrackEvent)
};n._respondToAddTrackEvent=function(a){this._addIdToTextTrackEventData(a);this.emitterTrigger("addtrack",{track:a.track})
};n._respondToChangeEvent=function(a){this.emitterTrigger("change",a)};n._respondToRemoveTrackEvent=function(a){this._addIdToTextTrackEventData(a);
this.emitterTrigger("removetrack",{track:a.track})};n._addIdToTextTrackEventData=function(b){if(b&&b.track&&this._textTrackId&&!b.track.id){try{b.track.id=this._textTrackId
}catch(a){}this._textTrackId=null}return b};n._createTextTrackTag=function(b){var a=new l({model:b});
a.render();this._textTrackId=a.el.id;a.appendTo(this.el);this._textTrackTags.push(a)
};n.addTextTrackTag=function(a){this._createTextTrackTag(a)};n._findTextTrackTagFromModel=function(c){var a=this._textTrackTags.length;
var b={};for(var d=0;d<a;d++){if(this._textTrackTags[d].model.cid===c.cid){b.tag=this._textTrackTags[d];
b.idx=d;break}}return b};n.removeTextTrackTag=function(b){var a=this._findTextTrackTagFromModel(b);
if(a.tag){a.tag.destroy();this._textTrackTags.splice(a.idx,1)}};o.exports=k},{"./TextTrackTag":820,"ac-mvc-view":643,"ac-object":646}],822:[function(o,n,j){var k=o("ac-mvc-view").View;
var i=o("ac-object");function m(){k.apply(this,arguments)}var l=m.prototype=i.create(k.prototype);
l._onModeChange=function(a){this._renderMode()};l._renderMode=function(){var a=this.model.get("mode");
if(a==="showing"){this.el.webkitClosedCaptionsVisible=true}else{this.el.webkitClosedCaptionsVisible=false
}};l.setModel=function(a){if(this.model){this.model.off("change:mode",this._onModeChange,this)
}this.model=a;this.listen()};l.listen=function(){this.model.on("change:mode",this._onModeChange,this)
};l.render=function(){this._renderMode();this.listen()};n.exports=m},{"ac-mvc-view":643,"ac-object":646}],823:[function(d,g,f){g.exports=d("ac-video-player")
},{"ac-video-player":777}],824:[function(d,g,f){g.exports={create:d("./ac-films/factory/films")}
},{"./ac-films/factory/films":830}],825:[function(v,w,t){var r;try{r=v("ac-analytics")
}catch(q){}var n=v("ac-event-emitter").EventEmitter;var y=v("ac-dom-traversal");
var o=v("ac-browser");var x=v("ac-object");var u={dataAttribute:"analytics-video-id"};
function p(a,b){this.player=a;this.sources={};this.currentStubPlayer=null;this.playerType="";
this.videoType="";this.options=x.defaults(u,b||{})}var s=p.prototype;s.activate=function(){this.player.on("play",this._onPlay,this);
this.player.on("ended",this._onEnded,this);this.player.on("timeupdate",this._onTimeupdate,this);
this.player.on("texttrackshow",this._onTexttrackshow,this);this.player.on("durationchange",this.setCurrentStubPlayer,this)
};s.deactivate=function(){this.player.off("play",this._onPlay,this);this.player.off("ended",this._onEnded,this);
this.player.off("timeupdate",this._onTimeupdate,this);this.player.off("texttrackshow",this._onTexttrackshow,this);
this.player.off("durationchange",this.setCurrentStubPlayer,this)};s.addSourceObject=function(c){var a;
var b;if(c&&c.id&&c.element){if(this.sources[c.id]){return}a=this._createStubPlayer(c.element);
b=c.element.getAttribute("data-"+this.options.dataAttribute);if(!b){a.videoId=c.id
}this.sources[c.id]={stubPlayer:a,observer:this._createObserver(a)}}};s.setCurrentStubPlayer=function(){var c;
var a=this.player.el;var b=a.getAttribute("data-"+this.options.dataAttribute);var d=this._getCurrentSourceObject(b);
if(d&&d.stubPlayer){this.currentStubPlayer=d.stubPlayer;this.playerType=(o.name.toLowerCase()==="ie"&&o.version<9)?"quicktime":"html5";
c=this.player.getCurrentSrc();if(c&&c.attributes&&c.attributes.src){this.videoType=c.attributes.src.split(".").pop()
}}};s.destroy=function(){this.deactivate();this.player=null;this.sources=null;this.currentStubPlayer=null;
this.options=null};s._onPlay=function(){this.setCurrentStubPlayer();this._proxyEvent("play")
};s._onEnded=function(){this._proxyEvent("ended")};s._onTimeupdate=function(){this._proxyEvent("timeupdate")
};s._onTexttrackshow=function(){this._proxyEvent("captions-enabled")};s._getSourceObjectBySrcObjId=function(a){return this.sources[a]||null
};s._getCurrentSourceObject=function(b){var a;if(b){a=this._getSourceObjectBySrcObjId(b)
}return a};s._createStubPlayer=function(b){var a=new n();a.el=b;return a};s._getEventData=function(){return{currentTime:this.player.getCurrentTime(),playerType:(this.playerType||null),videoType:(this.videoType||null)}
};s._createObserver=function(a){var b;if(r&&r.observer&&r.observer.Video){b=new r.observer.Video(a,{dataAttribute:this.options.dataAttribute})
}return b};s._proxyEvent=function(a){if(this.currentStubPlayer){this.currentStubPlayer.trigger(a,this._getEventData())
}};w.exports=p},{"ac-browser":54,"ac-dom-traversal":183,"ac-event-emitter":false,"ac-object":941}],826:[function(B,H,z){var t=B("ac-video-localization").localization;
var F=B("ac-video-nosupportview").View;var A=B("ac-feature");var C=B("ac-classlist");
var s=B("ac-event-emitter").EventEmitter;var D=B("ac-object");var x=B("./VideoSourceCollection");
var G=B("./factory/player");var u=B("ac-fullscreen");var I=B("./featureDetect/featureDetect");
var w=B("ac-browser");var v=B("./AnalyticsTranslator");function E(a){s.call(this);
this._currentVideo=null;this.videoSrcCollection=new x();this.analyticsTranslator=null;
this.player=null;this.localization=null;this.noSupportView=null;this.options=D.defaults(E.defaults,a)
}var y=E.prototype=D.create(s.prototype);E.defaults={analytics:true,playerOptions:{crossorigin:"anonymous",preload:"none"},analyticsOptions:{dataAttribute:"analytics-id"}};
y.play=function(b){var c=null;var a=null;if(!this.player){this.createPlayer()}if(b){c=this.videoSrcCollection.getSource(b);
a=this.getCurrentVideo();if(c&&a&&c.src===a.src){this._setCurrSrcObjIdForAnalytics(c.id);
this.player.addClassName("player-fullscreen");this.player.play();return}else{this._storedTextTrack=null
}}else{if(!this.player.getCurrentSrc()){c=this.videoSrcCollection.getSourceByIndex(0)
}else{c=this.getCurrentVideo()}}if(c){this._setCurrSrcObjIdForAnalytics(c.id);if(c.poster){this.setPoster(c.poster)
}if(this.localization===null){this.ensureLocalization().then(this.play.bind(this,b))
}else{this._playVideoBySrcObj(c)}}};y.bindPlayerEvents=function(){this.player.on("enterfullscreen",this._onEnterFullscreen,this);
this.player.on("exitfullscreen",this._onExitFullscreen,this);this.player.on("durationchange",this._onPlayerSrcChange,this)
};y.handleTextTracks=function(a){var c;var d;var b;if(!this.player||!a.value||isNaN(a.value)||!this._currentVideo.vatResource.vatVTTSource||this._currentVideo.vatResource.vatVTTSource.length===0){return
}b={src:this._currentVideo.vatResource.vatVTTSource.pop()};c=this.player.getTextTracks();
d=this.player.findTextTrack(b);if(c&&c.models&&c.models.length>0&&d){c.models.forEach(function(f){if(d.cid===f.cid){f.hide()
}else{if(I.shouldAllowSingleTextTrack()){this.player.removeTextTrack(f)}else{f.disable()
}}}.bind(this))}};y.pause=function(){this.player.pause()};y.setSrc=function(a){return this._setNewPlayerSrc(a)
};y.getCurrentSrc=function(){return this.player.getCurrentSrc().attributes.src};
y.getCurrentVideo=function(){return this._currentVideo};y.createVideoResource=function(a,b){var c=this.videoSrcCollection.addSource(a,b);
this._addSourceToAnalytics(c);return c};y.createPlayer=function(){this.on("novideosupport",this._onNoVideoSupport,this);
if(this.options.poster){this.options.playerOptions.poster=this.options.poster}this.player=G(this.options.playerOptions);
if(this.player){this.bindPlayerEvents();this.defaultPosterFrame=this.player.getPoster();
this._intializeAnalytics();this._applyDocumentClassnames()}return this.player};
y.loadLocalization=function(){return t.create().then(function(a){this.localization=a
}.bind(this))};y.ensureLocalization=function(){var a;if(this.localization===null){a=this.loadLocalization()
}else{a=Promise.resolve()}return a};y.createNoSupportView=function(){this.ensureLocalization().then(function(){var a=new F({model:this.localization});
a.render();this.noSupportView=a;this.trigger("novideosupport");this._onNoVideoSupport()
}.bind(this))};y.setPoster=function(a){if(a!==this.player.getPoster()){this.player.setPoster(a)
}};y._onPlayerSrcChange=function(a){this.handleTextTracks(a)};y._onEnterFullscreen=function(){C.add(this.player.el,"player-fullscreen")
};y._onExitFullscreen=function(){C.remove(this.player.el,"player-fullscreen")};
y._intializeAnalytics=function(){if(!this.analyticsTranslator&&this.options.analytics===true){this.analyticsTranslator=new v(this.player,(this.options.analyticsOptions));
this.analyticsTranslator.activate()}};y._addSourceToAnalytics=function(a){if(a&&this.analyticsTranslator&&this.options.analytics===true){this.analyticsTranslator.addSourceObject(a)
}};y._setCurrSrcObjIdForAnalytics=function(a){if(this.options.analytics===true&&a&&this.player.el){this.player.el.setAttribute("data-"+this.options.analyticsOptions.dataAttribute,a)
}};y._playVideoBySrcObj=function(a){var b=this.player.getCurrentSrc();if(!b||(b.attributes.src&&b.attributes.src!==a.src)){if(A.isDesktop()){this.player.once("canplaythrough",this.player.play,this.player);
this._setNewPlayerSrc(a)}else{this.player.addClassName("player-fullscreen");this._setNewPlayerSrc(a);
this.player.play()}}else{this.player.play()}};y._setNewPlayerSrc=function(a){var b=this._setPlayerSrcFromSourceObject(a);
if(b){this._currentVideo=a;if(a.poster){this.setPoster(a.poster)}}return b};y._setPlayerSrcFromSourceObject=function(c){var a=null;
var b;if(this.player&&c.vatResource&&typeof c.vatResource.setPlayerSrc==="function"){b=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
c.vatResource.setPlayerSrc(this.player,b);if(w.name.toLowerCase()==="safari mobile"){this.player.once("readystatechange",function(){var d=this.player.el;
var f=this.player.getMediaWidth();var g=this.player.getMediaHeight();if(f&&f!==848&&g&&g!==480){d.style.paddingBottom=(g/f*100)+"%"
}},this)}c.cid=this.player.getCurrentSrc().cid;a=this.player.getCurrentSrc().attributes.src
}return a};y._applyDocumentClassnames=function(){var a;if(I.shouldPlayNativePlayer()){a="ac-player-handheld"
}if(A.isTablet()){a="ac-player-tablet"}if(A.isDesktop()){a="ac-player-desktop"}C.add(document.documentElement,a)
};y._onNoVideoSupport=function(){};H.exports=E},{"./AnalyticsTranslator":825,"./VideoSourceCollection":828,"./factory/player":831,"./featureDetect/featureDetect":833,"ac-browser":54,"ac-classlist":65,"ac-event-emitter":false,"ac-feature":301,"ac-fullscreen":320,"ac-object":941,"ac-video-localization":499,"ac-video-nosupportview":552}],827:[function(B,D,y){var t=B("ac-modal").Modal;
var x=B("ac-modal-video").ModalVideo;var A=B("ac-object");var v=B("./FilmsController");
var z=B("ac-feature");var s=B("ac-fullscreen");var u=B("ac-browser");var C=B("ac-classlist");
var r=B("ac-keyboard");var q=r.keys;function E(a){v.apply(this,arguments);this.options=A.extend(E.defaults,this.options);
this.modalVideo=null}var w=E.prototype=A.create(v.prototype);E.defaults=A.extend(v.defaults,{modalOptions:{playOnOpen:true,closeOnEnded:true}});
w.play=function(a){v.prototype.play.call(this,a);if(!this.modalVideo.modal.opened){this.openModal()
}};w.openModal=function(){this.modalVideo.open()};w.createPlayer=function(){v.prototype.createPlayer.call(this);
this._createModalVideo()};w._handleFullscreen=function(){var c=false;var b=this.modalVideo.modal;
b.removeKeyToClose(q.ESCAPE);var d=function(f){c=true};var a=function(f){if(c===true&&b.opened===true){b.close()
}c=false};r.addKeyDown(q.ESCAPE,d);r.addKeyUp(q.ESCAPE,a)};w._createModalVideo=function(){var a={playOnOpen:false,closeOnEnded:false};
if(this.player){this.modalVideo=x.create(this.player,a);this._handleFullscreen();
this._bindModalEvents()}else{this.modalVideo=new t()}this.trigger("modalready",{modal:this.modalVideo})
};w._onEnded=function(){if(this.options.modalOptions.closeOnEnded===true){this.modalVideo.close()
}};w._guaranteeVolume=function(){if(this.player&&this.player.getReadyState()>0){this.player.setVolume(1)
}else{if(this.player){this.player.once("readystatechange",function(){this.player.setVolume(1)
},this)}}};w._bindModalEvents=function(){this.modalVideo.on("close",this._onModalClose,this);
this.modalVideo.on("open",this._onModalOpen,this)};w.bindPlayerEvents=function(){v.prototype.bindPlayerEvents.call(this);
if(this.player){this.player.on("ended",this._onEnded,this)}};w._onModalClose=function(){var a;
if(!this.player){return}a=this.player.getVisibleTextTracks();if(a&&a.models&&a.models.length>0){this._storedTextTrack=a.at(0);
this._storedTextTrack.hide()}this.player.setCurrentTime(0);this.pause();if(z.isTablet()){s.exitFullscreen(this.player.getMediaElement())
}};w._onModalOpen=function(){this._guaranteeVolume();if(this.options.modalOptions.playOnOpen===true){if(z.isTablet()){this.player.play()
}}if(this._storedTextTrack){this._storedTextTrack.show()}};w._onEnded=function(){if(this.options.modalOptions.closeOnEnded===true){this.modalVideo.close()
}};w._onNoVideoSupport=function(){if(this.noSupportView&&this.modalVideo){this.modalVideo.modal.modalEl.appendChild(this.noSupportView.el)
}};D.exports=E},{"./FilmsController":826,"ac-browser":54,"ac-classlist":65,"ac-feature":301,"ac-fullscreen":320,"ac-keyboard":338,"ac-modal":456,"ac-modal-video":434,"ac-object":941}],828:[function(m,l,h){var i=m("./VideoSourceObject").create;
function j(){this.sources=[]}var k=j.prototype;k.addSource=function(a,b){var c=i(a,b);
if(c){this.sources.push(c);c.index=this.sources.length-1}return c};k.getSource=function(b){var a=null;
if(typeof b==="number"){a=this.getSourceByIndex(b)}else{if(typeof b==="string"){if(/^cid/.test(b)){a=this.getSourceByCid(b)
}else{a=this.getSourceById(b)}}}return a};k.getSourceByIndex=function(a){return this.sources[a]
};k.getSourceById=function(a){return this.getSourceByPropertyValue("id",a)};k.getSourceByCid=function(a){return this.getSourceByPropertyValue("cid",a)
};k.getSourceByPropertyValue=function(a,c){var b=null;this.sources.some(function(d){var f=false;
if(d[a]===c){b=d;f=true}return f});return b};l.exports=j},{"./VideoSourceObject":829}],829:[function(i,n,j){var l=i("ac-vatman");
var k=l.vatResource;var m="data-acv-poster";function o(b,f){if(typeof b!=="string"){throw new TypeError(b+" must be a string")
}var d=f.element||null;var g=null;var a=null;var c=f.posterAttribute||m;if(d){a=d.getAttribute(c);
g=d.id}return{vatResource:k.create(b),element:d,src:b,poster:a,id:g,cid:null}}n.exports={create:o}
},{"ac-vatman":472}],830:[function(v,w,r){var t=v("../FilmsController");var y=v("../ModalFilmsController");
var u=v("ac-object");var n=v("./sources");var o=v("../posters");var p=v("ac-dom-events");
var x=v("../featureDetect/featureDetect");var s={poster:null,modal:false,deepLink:true,playOnClick:true};
function q(a,c){c=u.defaults(s,c||{});var b;if(c.modal===true&&!x.shouldPlayNativePlayer()){b=new y(c)
}else{b=new t(c)}b.loadLocalization();b.createPlayer();if(b.player){n(a,b,c)}else{b.createNoSupportView();
a.forEach(function(d){p.addEventListener(d,"click",function(f){p.preventDefault(f);
b.modalVideo.open()})})}return b}w.exports=q},{"../FilmsController":826,"../ModalFilmsController":827,"../featureDetect/featureDetect":833,"../posters":834,"./sources":832,"ac-dom-events":111,"ac-object":941}],831:[function(r,s,p){var n=r("ac-vatman");
var u=r("ac-video").Player;var m=r("ac-fullscreen");var q=r("ac-dom-events");var t=r("../featureDetect/featureDetect");
function v(a){a.on("ended",function(){m.exitFullscreen(a.getMediaElement())});a.on("exitfullscreen",function(){a.setCurrentTime(0)
})}function w(a){a.on("enterfullscreen",function(){var c=a.getMediaElement();var b;
if(c.tagName.toLowerCase()!=="video"){b=a.getMediaHeight()/a.getMediaWidth();c.style.height=c.offsetWidth*b+"px"
}});a.on("exitfullscreen",function(){var b=a.getMediaElement();if(b.tagName.toLowerCase()!=="video"){b.style.height=null
}})}function o(a){a=a||{};var b=n.createPlayer(u,a);if(b){if(t.shouldPlayNativePlayer()){v(b);
b.appendTo(document.body)}else{w(b)}}return b}s.exports=o},{"../featureDetect/featureDetect":833,"ac-dom-events":111,"ac-fullscreen":320,"ac-vatman":472,"ac-video":823}],832:[function(B,C,z){var s=B("ac-router");
var q=B("ac-gesture-touchclick").TouchClick;var v=B("../windowLoad");var t=B("../posters");
var A=B("ac-vatman");var y=B("ac-dom-traversal").querySelector;var r=B("ac-browser");
var w=B("ac-feature");var u=r.name.toLowerCase();var E=(u==="safari"||u==="safari mobile");
var D=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
function x(b,c,d){var a;var f;if(d.deepLink===true){f=new s.Router({hashChange:true,pushState:false})
}b.forEach(function(m){var j;var l=m.getAttribute("href");var h=m.getAttribute("data-film-id")||m.getAttribute("id");
var k={element:m};var g;var i=l;if(!E){i=A.vatClient.getSource(l,D)}if(i!==l){m.setAttribute("href",i)
}if(!c.player){c.createPlayer()}if(l){g=c.createVideoResource(l,k);if(!g.poster){g.poster=c.defaultPosterFrame
}if(g.poster){t.loadPoster(g.poster)}if(d.deepLink===true&&g.id){f.createRoute(g.id,function(){v(function(){if(w.isTablet()){var p=c.player;
var n=p.poster;var o=p.getPoster();var G=p.getMediaElement();if(n){G.setAttribute("poster",o);
n._hide()}}c.player.setPreload("auto");c.play(g.id)})})}if(d.playOnClick===true){j=q.create(m);
j.on("click",function(){if(c.player&&c.player.getPreload()==="none"){c.player.setPreload("auto")
}c.play(h)})}}});if(d.deepLink===true){if(w.isTablet()){v(function(){window.requestAnimationFrame(function(){f.start()
})})}else{f.start()}}}C.exports=x},{"../posters":834,"../windowLoad":835,"ac-browser":54,"ac-dom-traversal":183,"ac-feature":301,"ac-gesture-touchclick":327,"ac-router":461,"ac-vatman":472}],833:[function(o,m,i){var k=o("ac-browser");
var j=o("ac-feature");var l=k.name.toLowerCase();var n=k.os.toLowerCase();m.exports={shouldPlayNativePlayer:function(){return(j.isHandheld()&&n==="ios")
},shouldAllowSingleTextTrack:function(){return(l==="safari mobile")}}},{"ac-browser":54,"ac-feature":301}],834:[function(i,h,f){function g(a){new Image().src=a
}h.exports={loadPoster:g}},{}],835:[function(m,l,h){var i=false;var j=m("ac-dom-events");
j.addEventListener(window,"load",function(){i=true});function k(a){if(i){a()}else{j.addEventListener(window,"load",a)
}}l.exports=k},{"ac-dom-events":111}],836:[function(d,g,f){arguments[4][54][0].apply(f,arguments)
},{"./ac-browser/BrowserData":837,"./ac-browser/IE":838}],837:[function(d,g,f){g.exports=d(295)
},{"./data":839}],838:[function(d,g,f){g.exports=d(56)},{}],839:[function(d,g,f){g.exports=d(297)
},{}],840:[function(d,g,f){g.exports=d(346)},{"./ac-classlist/add":841,"./ac-classlist/contains":842,"./ac-classlist/remove":844,"./ac-classlist/toggle":845}],841:[function(d,g,f){g.exports=d(347)
},{"./helpers/className":843}],842:[function(d,g,f){g.exports=d(348)},{"./helpers/className":843}],843:[function(d,g,f){g.exports=d(349)
},{}],844:[function(d,g,f){g.exports=d(350)},{"./helpers/className":843}],845:[function(d,g,f){g.exports=d(351)
},{"./helpers/className":843}],846:[function(d,g,f){g.exports=d(76)},{"./ac-prefixer/Prefixer":847}],847:[function(d,g,f){g.exports=d(77)
},{"./Prefixer/camelCasedEvents":848}],848:[function(d,g,f){g.exports=d(78)},{}],849:[function(d,g,f){g.exports=d(408)
},{"./ac-feature/canvasAvailable":850,"./ac-feature/continuousScrollEventsAvailable":851,"./ac-feature/cookiesAvailable":852,"./ac-feature/cssLinearGradientAvailable":853,"./ac-feature/cssPropertyAvailable":854,"./ac-feature/isDesktop":855,"./ac-feature/isHandheld":856,"./ac-feature/isRetina":857,"./ac-feature/isTablet":858,"./ac-feature/localStorageAvailable":859,"./ac-feature/sessionStorageAvailable":860,"./ac-feature/svgAvailable":861,"./ac-feature/threeDTransformsAvailable":862,"./ac-feature/touchAvailable":863}],850:[function(d,g,f){g.exports=d(409)
},{}],851:[function(d,g,f){g.exports=d(410)},{"./touchAvailable":863,"ac-browser":836}],852:[function(d,g,f){g.exports=d(411)
},{}],853:[function(d,g,f){g.exports=d(412)},{"./cssPropertyAvailable":854}],854:[function(d,g,f){g.exports=d(413)
},{"ac-prefixer":846}],855:[function(d,g,f){g.exports=d(414)},{"./touchAvailable":863}],856:[function(d,g,f){g.exports=d(415)
},{"./isDesktop":855,"./isTablet":858}],857:[function(d,g,f){g.exports=d(416)},{}],858:[function(d,g,f){g.exports=d(417)
},{"./isDesktop":855}],859:[function(d,g,f){g.exports=d(418)},{}],860:[function(d,g,f){g.exports=d(419)
},{}],861:[function(d,g,f){g.exports=d(420)},{}],862:[function(d,g,f){g.exports=d(421)
},{"./cssPropertyAvailable":854}],863:[function(d,g,f){g.exports=d(422)},{}],864:[function(d,g,f){g.exports=d(26)
},{}],865:[function(d,g,f){arguments[4][27][0].apply(f,arguments)},{"./ac-object/clone":866,"./ac-object/create":867,"./ac-object/defaults":868,"./ac-object/extend":869,"./ac-object/getPrototypeOf":870,"./ac-object/isDate":871,"./ac-object/isEmpty":872,"./ac-object/isRegExp":873,"./ac-object/toQueryParameters":874}],866:[function(o,n,i){var k=o("./extend");
var j=Object.prototype.hasOwnProperty;var m=function(c,b){var a;for(a in b){if(j.call(b,a)){if(b[a]===null){c[a]=null
}else{if(typeof b[a]==="object"){c[a]=Array.isArray(b[a])?[]:{};m(c[a],b[a])}else{c[a]=b[a]
}}}}return c};n.exports=function l(a,b){if(b){return m({},a)}return k({},a)}},{"./extend":869}],867:[function(d,g,f){g.exports=d(29)
},{}],868:[function(d,g,f){g.exports=d(30)},{"./extend":869}],869:[function(d,g,f){g.exports=d(31)
},{}],870:[function(d,g,f){g.exports=d(32)},{}],871:[function(d,g,f){g.exports=d(33)
},{}],872:[function(d,g,f){g.exports=d(34)},{}],873:[function(d,g,f){g.exports=d(35)
},{}],874:[function(d,g,f){g.exports=d(36)},{qs:864}],875:[function(d,g,f){g.exports.Localnav=d("./ac-localnav/Localnav")
},{"./ac-localnav/Localnav":876}],876:[function(D,H,B){var v=D("ac-dom-metrics");
var z=D("ac-dom-traversal");var w=D("ac-dom-nodes");var I=D("ac-dom-styles");var x=D("ac-browser");
var E=D("ac-object");var F=D("ac-classlist");var C=D("ac-feature");var s=D("ac-event-emitter").EventEmitter;
var t=D("ac-window-delegate").WindowDelegate;var u;try{u=D("ac-analytics")}catch(y){}var G=function(a){var b={stickyClass:"localnav-sticky",localnavWrapperClassSelector:".localnav-wrapper",analyticsEnabled:false};
this._options=E.extend(b,a);this._supportsPositionSticky=C.cssPropertyAvailable("position","sticky");
this._isSticky=false;this._localnavWrapperElement=z.querySelector(this._options.localnavWrapperClassSelector);
b=null};var A=G.prototype=new s(null);A.createLocalnav=function(){if(!this._supportsPositionSticky){this._placeholder=document.createElement("div");
F.add(this._placeholder,"localnav-placeholder");w.insertAfter(this._placeholder,this._localnavWrapperElement)
}if(this._localnavWrapperElement&&!this._isOldIE()){this._localnavNonStickyRange=this._setLocalnavNonStickyRange();
t.on("scroll",this._toggleStickiness.bind(this));window.requestAnimationFrame(this._toggleStickiness.bind(this))
}};A._setLocalnavNonStickyRange=function(){var b=z.querySelector(".localnav-wrapper");
var c=b.parentElement;var a=document.createElement("div");a.className="non-sticky-range-placeholder";
c.insertBefore(a,b);var d=v.getPagePosition(a).top;c.removeChild(a);return d};A._isOldIE=function(){return(x.name==="IE"&&x.version<9)
};A._toggleStickiness=function(){var b=(document.documentElement.scrollTop||document.body.parentNode||document.body).scrollTop;
var a=(window.pageYOffset)?window.pageYOffset:b;if(a>=this._localnavNonStickyRange){this._addStickiness()
}else{this._removeStickiness()}a=null;b=null};A._addStickiness=function(){if(!this._isSticky){F.add(this._localnavWrapperElement,this._options.stickyClass);
if(!this._supportsPositionSticky&&!this._isSticky){var a=v.getDimensions(this._localnavWrapperElement).height;
I.setStyle(this._placeholder,{display:"block",height:a+"px"});a=null}this._setAnalyticsAttributesWhenTogglingStickiness("product nav locked");
this._isSticky=true}};A._removeStickiness=function(){if(this._isSticky){F.remove(this._localnavWrapperElement,this._options.stickyClass);
if(!this._supportsPositionSticky){I.setStyle(this._placeholder,{display:"none"})
}this._setAnalyticsAttributesWhenTogglingStickiness("product nav");this._isSticky=false
}};A._setAnalyticsAttributesWhenTogglingStickiness=function(a){if(this._options.analyticsEnabled&&u){this._localnavWrapperElement.setAttribute("data-analytics-region",a);
u.regions.refreshRegion(this._localnavWrapperElement)}};H.exports=G},{"ac-browser":836,"ac-classlist":840,"ac-dom-metrics":136,"ac-dom-nodes":148,"ac-dom-styles":172,"ac-dom-traversal":183,"ac-event-emitter":false,"ac-feature":849,"ac-object":865,"ac-window-delegate":978}],877:[function(d,g,f){arguments[4][231][0].apply(f,arguments)
},{"./ac-dom-emitter/DOMEmitter":878}],878:[function(h,m,i){var k;var l=h("ac-event-emitter").EventEmitter;
function j(a){if(a===null){return}this.el=a;this._bindings={};this._eventEmitter=new l()
}k=j.prototype;k._parseEventNames=function(a){if(!a){return[a]}return a.split(" ")
};k._onListenerEvent=function(a,b){this.trigger(a,b,false)};k._setListener=function(a){this._bindings[a]=this._onListenerEvent.bind(this,a);
this._addEventListener(a,this._bindings[a])};k._removeListener=function(a){this._removeEventListener(a,this._bindings[a]);
delete this._bindings[a]};k._addEventListener=function(b,a,c){if(this.el.addEventListener){this.el.addEventListener(b,a,c)
}else{if(this.el.attachEvent){this.el.attachEvent("on"+b,a)}else{target["on"+b]=a
}}return this};k._removeEventListener=function(b,a,c){if(this.el.removeEventListener){this.el.removeEventListener(b,a,c)
}else{this.el.detachEvent("on"+b,a)}return this};k.on=function(c,a,b){c=this._parseEventNames(c);
c.forEach(function(d,f,g){if(!this.has(g)){this._setListener(g)}this._eventEmitter.on(g,d,f)
}.bind(this,a,b));return this};k.off=function(d,a,b){var c=Array.prototype.slice.call(arguments,0);
d=this._parseEventNames(d);d.forEach(function(q,r,f,g){if(f.length===0){this._eventEmitter.off();
var s;for(s in this._bindings){if(this._bindings.hasOwnProperty(s)){this._removeListener(s)
}}return}this._eventEmitter.off(g,q,r);if(!this.has(g)){this._removeListener(g)
}}.bind(this,a,b,c));return this};k.once=function(c,a,b){c=this._parseEventNames(c);
c.forEach(function(d,f,g){if(!this.has(g)){this._setListener(g)}this._eventEmitter.once.call(this,g,d,f)
}.bind(this,a,b));return this};k.has=function(a){if(this._eventEmitter&&this._eventEmitter.has(a)){return true
}return false};k.trigger=function(c,b,a){c=this._parseEventNames(c);c.forEach(function(f,d,g){this._eventEmitter.trigger(g,f,d)
}.bind(this,b,a));return this};k.destroy=function(){this.off();this.el=this._eventEmitter=this._bindings=null
};m.exports=j},{"ac-event-emitter":false}],879:[function(d,g,f){g.exports.playerFactory=d("./ac-flow-x/flow/playerFactory");
g.exports.Flow=d("./ac-flow-x/flow/FlowController");g.exports.SyncPlayer=d("./ac-flow-x/flow/SyncPlayer");
g.exports.MaskedFlow=d("./ac-flow-x/flow/MaskedFlow")},{"./ac-flow-x/flow/FlowController":881,"./ac-flow-x/flow/MaskedFlow":883,"./ac-flow-x/flow/SyncPlayer":885,"./ac-flow-x/flow/playerFactory":908}],880:[function(B,C,A){var y,u=false,v=B("ac-deferred").Deferred,s=B("ac-deferred").all,p=B("ac-event-emitter").EventEmitter,t=B("./compositor/decorator/Keyframe"),w=B("./compositor/decorator/Superframe"),x=B("./compositor/decorator/SuperKeyframe"),q=B("./compositor/decorator/Cache"),r=B("./compositor/decorator/Benchmark");
function z(b,a){p.call(this);this._compositor=b;this.options=a||{};this.gotoFrame
}y=z.prototype=new p(null);y._gotoImageFrame=function(a){if(this._rendering){return(new v()).resolve()
}else{if(this._currentFrame===a){return(new v()).resolve()}}this._rendering=true;
if(u){console.groupCollapsed("gotoFrame:"+a+" currentFrame:"+this._currentFrame)
}return this._compositor.compositeFrames(this._currentFrame,a).then(function(){this._rendering=false;
this._currentFrame=a;if(u){console.groupEnd()}}.bind(this))};y._gotoBinaryFrame=function(a){if(this._currentFrame===a){return(new v()).resolve()
}return this._compositor.compositeFrames(this._currentFrame,a).then(function(b){if(b){this._compositor.applyBinaryFrame(b)
}this._currentFrame=a;this.trigger("composite")}.bind(this))};y.init=function(a){var b;
if(a.nodeName==="CANVAS"){b=a}else{b=document.createElement("canvas");a.appendChild(b)
}if(this.options.renderType==="binary"){this.gotoFrame=this._gotoBinaryFrame}else{if(this.options.renderType==="default"){this.gotoFrame=this._gotoImageFrame
}}return this._compositor.init(b).then(function(c){return s([this._compositor.createDiffRender(c).then(this._decorateCompositor.bind(this))])
}.bind(this))};y._decorateCompositor=function(){var c=this._compositor,a=this._compositor._diffRender.flowData,b=this._compositor.canvas;
if(this.options.renderType==="binary"){}else{if(a.superframeFrequency){c=new w(c,a.superframeFrequency)
}if(a.version===3){c=new t(c)}if(a.version===3&&a.superframeFrequency){c=new x(c)
}if(this.options.keyframeCache){c=new q(c,this.options.keyframeCache)}if(this.options.benchmark){c=new r(c)
}}if(c===this._compositor){return(new v()).resolve()}else{this._compositor=c;return this._compositor.init(b)
}};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(y,{_currentFrame:{value:0,enumerable:false,writable:true},frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true}});C.exports=z},{"./compositor/decorator/Benchmark":888,"./compositor/decorator/Cache":889,"./compositor/decorator/Keyframe":890,"./compositor/decorator/SuperKeyframe":891,"./compositor/decorator/Superframe":892,"ac-event-emitter":false}],881:[function(u,x,t){var r,s=u("./Flow"),v=u("./Player"),n=u("./LoadController"),p=u("./compositor/BinaryCompositor"),q=u("./compositor/Sequence");
var w={fileFormat:"jpg",baseName:"flow",imageUrlPattern:"###",startframeFileFormat:null,endframeFileFormat:null,basePath:null,manifestPath:null,manifestFileFormat:"json",diffPath:null,framePath:null};
var y={superframes:false,reversable:false,keyframeCache:8,benchmark:false,preload:true,multithread:false,preventDraw:false,renderType:"default"};
var o=function(b,a){b=b||{};a=a||{};this._flow=null;this._compositor=null;this._oader=null;
this.options=this._setDefaults(b,y);this._dataOptions=this._setDefaults(a,w);if(!this.options.element){this.options.element=document.createElement("canvas")
}this._flow=this._createFlow(this._compositor,this.options,this._dataOptions);v.call(this,this.options.element,this._flow);
if(this.options.preload){this.load()}};r=o.prototype=new v(null);r.destroy=function(){this.pause();
this.off();this._flow.off();this._flow=this._nullProperties(this._flow);this._nullProperties(this)
};r._nullProperties=function(a){var b;for(b in a){if(a.hasOwnProperty(b)){a[b]=null
}}return a};r._createFlow=function(d,c,a){var f=this._assembleAssetPaths(a);var b=[f.startframe,f.endframe];
this.loader=new n(this,f.manifest,b,f.imageUrlPattern);if(c.renderType==="binary"){this._compositor=new p(b,f.imageUrlPattern,this.loader,c.multithread,c.preventDraw)
}else{this._compositor=new q(b,f.imageUrlPattern,this.loader)}return new s(this._compositor,c)
};r._assembleAssetPaths=function(a){var b=a.basePath?this._forceTrailingSlash(a.basePath):null;
var f=a.framePath?this._forceTrailingSlash(a.framePath):null;var g=a.diffPath?this._forceTrailingSlash(a.diffPath):null;
var c=a.manifestPath?this._forceTrailingSlash(a.manifestPath):null;var h=a.baseName+"_";
var d={};d.startframe=(f||b)+h+"startframe."+(a.startframeFileFormat||a.fileFormat);
d.endframe=(f||b)+h+"endframe."+(a.endframeFileFormat||a.fileFormat);d.imageUrlPattern=(g||b)+h+a.imageUrlPattern+"."+a.fileFormat;
d.manifest=(c||b)+h+"manifest."+a.manifestFileFormat;return d};r._forceTrailingSlash=function(a){if(a.lastIndexOf("/")!==a.length-1){a=a+"/"
}return a};r._setDefaults=function(b,a){var c;for(c in a){if(a.hasOwnProperty(c)){if(typeof b[c]==="undefined"){b[c]=a[c]
}}}return b};x.exports=o},{"./Flow":880,"./LoadController":882,"./Player":884,"./compositor/BinaryCompositor":886,"./compositor/Sequence":887}],882:[function(v,w,u){var t,q=v("ac-asset-loader").AssetLoader,m=v("ac-event-emitter").EventEmitter,s=v("./data/provider/Async"),r=v("ac-deferred").Deferred,p=v("ac-deferred").all;
var n={start:"start",pause:"pause",error:"error",complete:"loaded",destroy:"destroy"};
var o=function(c,a,d,b){this._flow=c;this._manifestUrl=a;this._keyframeUrls=d;this._imageUrlPattern=b;
this.state={manifestLoaded:false,keyframesLoaded:false,diffsLoaded:false,diffCountLoaded:0,totalDiffs:null};
this.assets={keyframes:null,manifest:null,diffs:null};this._promises={};this._loaders={};
this._activeLoaders=[];this._resumeQueue=[];this._paused=true;this._shouldPause=false;
this._boundOnManifestLoaded=this._onManifestLoaded.bind(this);this._boundOnKeyframesLoaded=this._onKeyframesLoaded.bind(this);
this._boundOnDiffsLoaded=this._onDiffsLoaded.bind(this);this._boundOnManifestAndKeyframesLoaded=this._onManifestAndKeyframesLoaded.bind(this);
this._boundOnComplete=this._onComplete.bind(this)};t=o.prototype=new m(null);t.setManifestUrl=function(a){this._manifestUrl=a;
return this};t.setKeyframeUrls=function(a){this._keyframeUrls=a;return this};t.setImageUrlPattern=function(a){this._imageUrlPattern=a;
return this};t.load=function(){if(this._paused&&(this._activeLoaders.length>0||this._resumeQueue.length>0)){this._resume();
return}this._flow.load().then(this._boundOnComplete);return};t.pause=function(){this._shouldPause=true;
var b,a=this._activeLoaders.length;for(b=0;b<a;b++){this._activeLoaders[b].pause()
}this._paused=true};t.destroy=function(){var c,a,b;this.trigger(n.destroy);this.off();
for(c in this._loaders){if(this._loaders.hasOwnProperty(c)){}}for(a in this._promises){if(this._promises.hasOwnProperty(a)){if(this._promises[a].promise().status()==="pending"){this._promises[a].reject()
}}}for(b in this){if(this.hasOwnProperty(b)){this[b]=null}}};t._resume=function(){this._shouldPause=false;
var b,a=this._activeLoaders.length;for(b=0;b<a;b++){this._activeLoaders[b].load()
}var c,d=this._resumeQueue.length;for(c=0;c<d;c++){this._resumeQueue[c].call(this)
}this._resumeQueue=[];this._paused=false};t.loadManifest=function(){this._promises.manifest=this._promises.manifest||new r();
var a=this._promises.manifest.promise();if(this._shouldPause){this._resumeQueue.push(this.loadManifest);
return a}if(this.assets.manifest){return this._promises.manifest.resolve(this.assets.manifest)
}this._paused=false;this._loaders.manifest=new s(this._getManifestAssetsData());
this._activeLoaders.push(this._loaders.manifest);this._loaders.manifest.load().then(this._boundOnManifestLoaded);
return a};t.loadKeyframes=function(){this._promises.keyframes=this._promises.keyframes||new r();
var a=this._promises.keyframes.promise();if(this._shouldPause){this._resumeQueue.push(this.loadKeyframes);
return a}if(this.assets.keyframes){return this._promises.keyframes.resolve(this.assets.keyframes)
}this._paused=false;this._loaders.keyframes=new q(this._getKeyframesAssetsData());
this._activeLoaders.push(this._loaders.keyframes);this._loaders.keyframes.load().then(this._boundOnKeyframesLoaded);
return a};t.loadDiffs=function(){this._promises.diffs=this._promises.diffs||new r();
var a=this._promises.diffs.promise();if(this._shouldPause){this._resumeQueue.push(this.loadDiffs);
return a}if(this.assets.diffs){return this._promises.diffs.resolve(this.assets.diffs)
}this._paused=false;this._loaders.diffs=new q(this._getDiffsAssetsData());this._activeLoaders.push(this._loaders.diffs);
this._loaders.diffs.load().then(this._boundOnDiffsLoaded);return a};t._getManifestAssetsData=function(){return this._manifestUrl
};t._getKeyframesAssetsData=function(){return this._keyframeUrls};t._getDiffsAssetsData=function(){var d=this.assets.manifest.imagesRequired,a=[],c,f,b=this._imageUrlPattern.match(/#/g).length;
for(c=1;c<=d;c++){f="0000"+c;f=f.substring(f.length-b);a.push(this._imageUrlPattern.replace(/#{2,}/g,f))
}return a};t._onManifestLoaded=function(a){if(this.assets){this.assets.manifest=a;
this.state.manifestLoaded=true;this._paused=true;this._removeFromActiveLoaders(this._loaders.manifest);
this._promises.manifest.resolve(this.assets.manifest)}};t._onKeyframesLoaded=function(a){if(this.assets){this.assets.keyframes=a;
this.state.keyframeLoaded=true;this._paused=true;this._removeFromActiveLoaders(this._loaders.keyframes);
this._promises.keyframes.resolve(this.assets.keyframes)}};t._onDiffsLoaded=function(a){if(this.assets){this.assets.diffs=a;
this.state.diffsLoaded=true;this._paused=true;this._removeFromActiveLoaders(this._loaders.diffs);
this._promises.diffs.resolve(this.assets.diffs)}};t._onManifestAndKeyframesLoaded=function(){if(!this.state.diffsLoaded){this.loadDiffs()
}return this._promises.diffs};t._removeFromActiveLoaders=function(b){var c,a=this._activeLoaders.length;
for(c=0;c<a;c++){if(this._activeLoaders[c]===b){this._activeLoaders.splice(c,1);
return}}};t._onComplete=function(){this.trigger(n.complete)};w.exports=o},{"./data/provider/Async":900,"ac-asset-loader":37,"ac-event-emitter":false}],883:[function(t,u,q){var o,p=t("./FlowController"),r=t("./SyncPlayer"),n=t("ac-deferred").Deferred,l=t("ac-deferred").all;
var s={preventDraw:true,renderType:"binary"};function m(d,c,a,f,b,g){a=this._setDefaultOptions(a);
f=this._setDefaultOptions(f);this.flow=new p(d,a,b);this.mask=new p(c,f,g);r.apply(this,[this.flow,this.mask]);
this._flowDefer=null;this._maskDefer=null;this._boundOnSyncRender=this._onSyncRender.bind(this);
this._boundOnFlowTimeUpdate=this._onFlowTimeUpdate.bind(this);this._boundOnMaskTimeUpdate=this._onMaskTimeUpdate.bind(this);
this.flow._flow.on("composite",this._boundOnFlowTimeUpdate);this.mask._flow.on("composite",this._boundOnMaskTimeUpdate);
this._bindSyncRender()}o=m.prototype=new r(null);o._setDefaultOptions=function(b){b=b||{};
var a;for(a in s){if(s.hasOwnProperty(a)){if(typeof b[a]==="undefined"){b[a]=s[a]
}}}return b};o._bindSyncRender=function(){this._flowDefer=new n();this._maskDefer=new n();
l([this._flowDefer,this._maskDefer]).then(this._boundOnSyncRender)};o._onFlowTimeUpdate=function(){if(this._flowDefer){this._flowDefer.resolve()
}};o._onMaskTimeUpdate=function(){if(this._maskDefer){this._maskDefer.resolve()
}};o._onSyncRender=function(){this._flowDefer=this._maskDefer=null;this._applyMask();
this._bindSyncRender()};o._applyMask=function(){if(!this.flow._compositor.imageData){return
}var d=this.flow._compositor.imageData.data,c=this.mask._compositor.imageData.data,a,b=d.length;
for(a=0;a<b;a+=4){d[a+3]=c[a]}this.flow._compositor.applyBinaryFrame({buf8:d},true)
};u.exports=m},{"./FlowController":881,"./SyncPlayer":885}],884:[function(p,o,j){var m,k=false,q=p("ac-deferred").Deferred,l=p("ac-dom-emitter").DOMEmitter;
function n(a,b){this._flow=b;this._domEmitter=new l(a);this._frameRate=30;this.element=a;
this.paused=true;this.loop=false;this._boundAdvanceTimeToGlobal=this._advanceToTimeGlobal.bind(this);
this._onBoundGlobalTimeUpdate=this._onGlobalTimeUpdate.bind(this);this._onBoundLocalTimeUpdate=this._onLocalTimeUpdate.bind(this)
}m=n.prototype;m._timeToFrame=function(b){var a;a=Math.round(b/this.duration*this._flow.frameCount);
a=a%(this._flow.frameCount+1);return(a<0)?this._flow.frameCount+a:a};m._advanceToTimeGlobal=function(b){this._prevTime=this._prevTime||b;
this._currentTime+=((b-this._prevTime)/1000)*this.playbackRate;this._prevTime=b;
this._pauseAfterRender=false;var a=this._timeToFrame(this._currentTime);if(!this.loop){if(this.playbackRate>0&&this._currentTime>this.duration){a=this._flow.frameCount;
this._currentTime=this.duration;this._pauseAfterRender=true}else{if(this.playbackRate<0&&this._currentTime<0){a=0;
this._currentTime=0;this._pauseAfterRender=true}}}else{this._currentTime=(this.duration+this._currentTime)%this.duration
}if(!this.paused&&!this.seeking){return this._flow.gotoFrame(a).then(this._onBoundGlobalTimeUpdate)
}else{return(new q()).reject()}};m._onGlobalTimeUpdate=function(){this.trigger("timeupdate");
if(this._pauseAfterRender){this.paused=true;this.trigger("ended")}else{this._requestAnimationFrame=window.requestAnimationFrame(this._boundAdvanceTimeToGlobal)
}};m._onLocalTimeUpdate=function(){this.seeking=false;this.trigger("timeupdate");
this.trigger("seeked");this._requestAnimationFrame=window.requestAnimationFrame(this._boundAdvanceTimeToGlobal)
};m._advanceToTimeLocal=function(a){if(!this.seeking){this.seeking=true;this.trigger("seeking");
this._currentTime=1*a;this._prevTime=null;window.cancelAnimationFrame(this._requestAnimationFrame);
this._flow.gotoFrame(this._timeToFrame(a)).then(this._onBoundLocalTimeUpdate)}if(k){console.log("advance to time "+a+" from "+this._currentTime)
}};m.load=function(){this.trigger("loadstart");return this._flow.init(this.element).then(this.trigger.bind(this,"canplaythrough"))
};m.play=function(){if(this.paused){this.paused=false;this.trigger("play");this._prevTime=null;
this._requestAnimationFrame=window.requestAnimationFrame(this._boundAdvanceTimeToGlobal)
}return this};m.pause=function(){if(!this.paused){this.paused=true;window.cancelAnimationFrame(this._requestAnimationFrame);
this.trigger("pause")}return this};m.on=function(){this._domEmitter.on.apply(this._domEmitter,arguments)
};m.once=function(){this._domEmitter.once.apply(this._domEmitter,arguments)};m.trigger=function(){this._domEmitter.trigger.apply(this._domEmitter,arguments)
};m.off=function(){this._domEmitter.off.apply(this._domEmitter,arguments)};m.setRenderOperation=function(a){if(this._flow&&this._flow._compositor&&this._flow._compositor._diffRender){this._flow._compositor._diffRender.renderOperation=a
}return this};m.setBeforeRenderOperation=function(a){if(this._flow&&this._flow._compositor&&this._flow._compositor._diffRender){this._flow._compositor._diffRender.beforeRenderOperation=a
}};m.setBeforeDrawOperation=function(a){if(this._flow&&this._flow._compositor){this._flow._compositor.beforeDrawOperation=a
}};m.setAfterDrawOperation=function(a){if(this._flow&&this._flow._compositor){this._flow._compositor.afterDrawOperation=a
}};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(m,{_currentTime:{value:0,enumerable:false,writable:true},_playbackRate:{value:1,enumerable:false,writable:true},currentTime:{get:function(){return this._currentTime*1
},set:m._advanceToTimeLocal,enumerable:true},frameRate:{get:function(){return this._frameRate
},set:function(a){if(isFinite(a)){this._frameRate=a;this.trigger("durationchange")
}},enumerable:true},playbackRate:{get:function(){return this._playbackRate*1},set:function(a){if(isFinite(a)){this._playbackRate=1*a;
this.trigger("ratechange")}},enumerable:true},duration:{get:function(){return this._flow.frameCount/this.frameRate
},enumerable:true}});o.exports=n},{"ac-dom-emitter":877}],885:[function(n,m,i){var k,o=n("ac-deferred").Deferred,j=n("ac-deferred").all;
function l(){this.flows=Array.prototype.slice.call(arguments,0)}k=l.prototype;k.on=function(){return this._each("on",arguments)
};k.off=function(){return this._each("off",arguments)};k.load=function(){var f=new o(),a=[],b,d=this.flows.length,c;
for(b=0;b<d;b++){c=this.flows[b];a.push(c.load())}j(a).then(f.resolve.bind(f));
return f.promise()};k.play=function(){return this._each("play",arguments)};k.pause=function(){return this._each("pause",arguments)
};k.destroy=function(){this._each("destroy",arguments);var a;for(a in this){if(this.hasOwnProperty(a)){if(this[a] instanceof o){this[a].reject()
}this[a]=null}}};k.setRenderOperation=function(){return this._each("setRenderOperation",arguments)
};k.setBeforeRenderOperation=function(){return this._each("setBeforeRenderOperation",arguments)
};k.setBeforeDrawOperation=function(){return this._each("setBeforeDrawOperation",arguments)
};k.setAfterDrawOperation=function(){return this._each("setAfterDrawOperation",arguments)
};k._dispatchEvent=function(a){return this._each("_dispatchEvent",arguments)};k._advanceToTimeGlobal=function(){return this._each("_advanceToTimeGlobal",arguments)
};k._advanceToTimeLocal=function(){return this._each("_advanceToTimeLocal",arguments)
};k._each=function(f,b){b=Array.prototype.slice.call(b,0);var a,d=this.flows.length,c;
for(a=0;a<d;a++){c=this.flows[a];c[f].apply(c,b)}return this};Object.defineProperties(k,{_currentTime:{value:0,enumerable:false,writable:true},_playbackRate:{value:1,enumerable:false,writable:true},_loop:{value:false,enumerable:false,writable:true},currentTime:{get:function(){return this._currentTime*1
},set:k._advanceToTimeLocal,enumerable:true},frameRate:{get:function(){return this._frameRate
},set:function(a){if(isFinite(a)){this._frameRate=a;this._dispatchEvent("durationchange")
}},enumerable:true},playbackRate:{get:function(){return this._playbackRate*1},set:function(a){if(isFinite(a)){this._playbackRate=1*a;
this.flows.forEach(function(b,c){c.playbackRate=b}.bind(this,this._playbackRate))
}},enumerable:true},duration:{get:function(){return this._flow[0].frameCount/this.frameRate
},enumerable:true},loop:{get:function(){return this._loop},set:function(a){if(typeof a==="boolean"){this._loop=a;
this.flows.forEach(function(c,b){b.loop=c}.bind(this,this._loop))}},enumerable:true}});
m.exports=l},{}],886:[function(q,r,p){var o,k=false,s=q("../diff/BinaryRender"),n=q("../diff/BinaryMultithreadRender"),l=q("ac-deferred").Deferred;
var m=function(d,a,f,b,c){this._keyframes=d;this._imageUrlPattern=a;this._loadController=f;
this._useMultithreading=b;this._preventDraw=c};o=m.prototype;o._getURLObject=function(){return window.URL||window.webkitURL||null
};o._supportsMultithread=function(){if(this._getURLObject()&&window.Worker&&window.Blob){return true
}return false};o._initDiffRender=function(a){this._images=a;this.canvas.height=a[0].height;
this.canvas.width=a[0].width;this.applyFrame(a[0])};o.init=function(a){this.canvas=a||document.createElement("canvas");
this.context=a.getContext("2d");return this._loadController.loadKeyframes().then(this._initDiffRender.bind(this)).then(this._loadController.loadManifest.bind(this._loadController))
};o.createDiffRender=function(a){if(this._useMultithreading&&this._supportsMultithread()){this._diffRender=new n(a,this._imageUrlPattern)
}else{this._diffRender=new s(a,this._imageUrlPattern,this._loadController)}return this._diffRender.init()
};o.applyFrame=function(a){var b=this.context,c;b.drawImage(a,0,0);if(this._diffRender){this._diffRender.forceBinaryComposite();
c=this._diffRender.forceKeyframeRender(this.canvas,this.context);if(!this.imageData){this.imageData=this.context.createImageData(c.width,c.height)
}this.imageData.data.set(c.buf8)}};o.applyBinaryFrame=function(b,a){if(!this.imageData){this.imageData=this.context.createImageData(b.width,b.height)
}if(this._beforeDrawOperation){b=this._beforeDrawOperation(b)}this.imageData.data.set(b.buf8);
if(!this._preventDraw||a){this.context.putImageData(this.imageData,0,0)}if(this._afterDrawOperation){b=this._afterDrawOperation(b)
}};o.calculateRenderCount=function(c,b){var a=0;if(Math.abs(b-c)>=b){c=1;a=1}else{if(Math.abs(b-c)>=(this.frameCount-b)&&this._images[1]){c=this.frameCount-2;
a=1}}if(b>0&&b<this.frameCount-1){return Math.abs(c-b)+a}else{return a}};o.compositeFrames=function(b,f){var g=new l(),a;
f=(this.frameCount<f)?this.frameCount-1:(f<0)?0:f;b=(this.frameCount-2<b)?this.frameCount-2:(b<0)?0:b;
var d,c,a;if(Math.abs(f-b)>=f){b=1;if(k){console.log("applying start keyframe")
}this.applyFrame(this._images[0]);return g.resolve()}else{if(Math.abs(f-b)>=(this.frameCount-f)&&this._images[1]){b=this.frameCount-2;
if(k){console.log("applying end keyframe")}this.applyFrame(this._images[1]);return g.resolve()
}}d=(b>f)?-1:(b<f)?1:0;if(f>0&&f<this.frameCount-1){while(b!==f){c=this._diffRender.renderDiff(this.canvas,b,this.context);
b+=d}}if(c){c.then(g.resolve.bind(g))}else{g.resolve()}return g.promise()};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(o,{frameCount:{get:function(){return this._diffRender.frames.length+2
},enumerable:true},canvas:{get:function(){return this._canvas},set:function(a){return this._canvas=a
},enumerable:true},mainCompositor:{get:function(){var a=this;while(a._compositor){a=a._compositor
}return a},enumerable:true},_beforeDrawOperation:{value:undefined,enumerable:false,writable:true},_afterDrawOperation:{value:undefined,enumerable:false,writable:true},beforeDrawOperation:{get:function(){return this._beforeDrawOperation
},set:function(a){if(typeof a==="function"){this._beforeDrawOperation=a;return}this._beforeDrawOperation=undefined
},enumerable:true},afterDrawOperation:{get:function(){return this._afterDrawOperation
},set:function(a){if(typeof a==="function"){this._afterDrawOperation=a;return}this._afterDrawOperation=undefined
},enumerable:true}});r.exports=m},{"../diff/BinaryMultithreadRender":902,"../diff/BinaryRender":903}],887:[function(t,u,s){var p=0,v;
function n(){if(!v){v=document.getElementById("counter")}p++;v.textContent=p}var r,m=false,q=t("../diff/Render"),o=t("ac-deferred").Deferred;
function w(b,a,c,d){this._keyframes=b;this._imageUrlPattern=a;this._loadController=c;
this._renderType=d||"default"}r=w.prototype;r._initDiffRender=function(a){this._images=a;
this.canvas.height=a[0].height;this.canvas.width=a[0].width;this.applyFrame(a[0]);
return new o().resolve()};r.init=function(a){this.canvas=a||document.createElement("canvas");
this.context=a.getContext("2d");return this._loadController.loadKeyframes().then(this._initDiffRender.bind(this)).then(this._loadController.loadManifest.bind(this._loadController))
};r.createDiffRender=function(a){this._diffRender=new q(a,this._imageUrlPattern,this._loadController);
return this._diffRender.init()};r.applyFrame=function(b){var a=this.context;a.drawImage(b,0,0)
};r.calculateRenderCount=function(a,c){var b=0;if(Math.abs(c-a)>=c){a=1;b=1}else{if(Math.abs(c-a)>=(this.frameCount-c)&&this._images[1]){a=this.frameCount-2;
b=1}}if(c>0&&c<this.frameCount-1){return Math.abs(a-c)+b}else{return b}};r.compositeFrames=function(a,c){var d=new o();
c=(this.frameCount<c)?this.frameCount-1:(c<0)?0:c;a=(this.frameCount-2<a)?this.frameCount-2:(a<0)?0:a;
var b;if(m){console.groupCollapsed("Rendering diff frames: "+a+"..."+c)}if(Math.abs(c-a)>=c){a=1;
if(m){console.log("applying start keyframe")}this.applyFrame(this._images[0])}else{if(Math.abs(c-a)>=(this.frameCount-c)&&this._images[1]){a=this.frameCount-2;
if(m){console.log("applying end keyframe")}this.applyFrame(this._images[1])}}b=(a>c)?-1:(a<c)?1:0;
if(c>0&&c<this.frameCount-1){while(a!==c){this._diffRender.renderDiff(this.canvas,a);
a+=b}}if(m){console.groupEnd()}d.resolve(a);return d.promise()};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(r,{frameCount:{get:function(){return this._diffRender.frames.length+2
},enumerable:true},canvas:{get:function(){return this._canvas},set:function(a){return this._canvas=a
},enumerable:true},mainCompositor:{get:function(){var a=this;while(a._compositor){a=a._compositor
}return a},enumerable:true}});u.exports=w},{"../diff/Render":905}],888:[function(h,m,i){var l,j=h("../../../stats/Benchmark");
function k(a){this._compositor=a}l=k.prototype;l.init=function(b){var a=new j("init");
a.start();return this._compositor.init.apply(this._compositor,arguments).then(a.end.bind(a))
};l.applyFrame=function(){var a=new j("applyFrame");a.start();this._compositor.applyFrame.apply(this._compositor,arguments);
a.end.bind(a)};l.calculateRenderCount=function(){return this._compositor.calculateRenderCount.apply(this._compositor,arguments)
};l.compositeFrames=function(){var a=new j("renderFrames");a.start();return this._compositor.compositeFrames.apply(this._compositor,arguments).then(a.end.bind(a))
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(l,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(a){return this._compositor.canvas=a
},enumerable:true}});k.prototype=l;m.exports=k},{"../../../stats/Benchmark":909}],889:[function(l,k,m){var j,h=false;
function i(a,b){this._compositor=a;this._keyframeInterval=b||8;this._keyframes=[]
}j=i.prototype;j._getClosestKeyframe=function(c){var b=c%this._keyframeInterval,a=Math.floor(c/this._keyframeInterval)+((b>(this._keyframeInterval/2))?1:0);
return a};j._getFrameFromKeyframe=function(a){return a*this._keyframeInterval};
j._saveKeyframe=function(a){var c,b=Math.floor(a/this._keyframeInterval);if(a%this._keyframeInterval===0&&!this._keyframes[b]){if(h){console.log("saving keyframe "+a)
}c=document.createElement("canvas");c.width=this._compositor.canvas.width;c.height=this._compositor.canvas.height;
c.getContext("2d").drawImage(this._compositor.canvas,0,0);this._keyframes[b]=c}};
j.init=function(a){return this._compositor.init.apply(this._compositor,arguments)
};j.applyFrame=function(){this._compositor.applyFrame.apply(this._compositor,arguments)
};j.calculateRenderCount=function(b,a){b=this._getFrameFromKeyframe(this._getClosestKeyframe(a));
return this._compositor.calculateRenderCount(b,a)+1};j.compositeFrames=function(d,b){var a=this._getClosestKeyframe(b);
if(h){console.groupCollapsed("Rendering frames: "+d+"..."+b)}if(this._keyframes[a]&&(this._compositor.calculateRenderCount(d,b)>this.calculateRenderCount(d,b))){d=this._getFrameFromKeyframe(a);
if(h){console.log("applying prerendered keyframe: "+d)}this.applyFrame(this._keyframes[a]);
return this._compositor.compositeFrames(d,b).then(function c(){if(h){console.groupEnd()
}})}else{return this._compositor.compositeFrames(d,b).then(function c(){if(h){console.groupEnd()
}},null,this._saveKeyframe.bind(this))}};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(j,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(a){return this._compositor.canvas=a
},enumerable:true}});k.exports=i},{}],890:[function(o,n,j){var m,k=false,p=o("../../keyframe/Render"),q=o("ac-deferred").Deferred;
function l(a){this._compositor=a;this._flowDataProvider=this.mainCompositor._loadController._loaders.manifest
}m=l.prototype;m.init=function(a){this._keyframeDiffRender=new p(this._flowDataProvider._data,this.mainCompositor._imageUrlPattern);
return this._keyframeDiffRender.init()};m.applyFrame=function(a){return this._compositor.applyFrame.apply(this._compositor,arguments)
};m.applyKeyframe=function(b,a){this._keyframeDiffRender.renderKeyframe(this.canvas,b,a)
};m.compositeFrames=function(c,a){if(!this._isKeyframeDiff(a-1)){return this._compositor.compositeFrames.apply(this._compositor,arguments)
}var b=new q();if(k){console.groupCollapsed("Rendering keyframe diff image: "+(c-1))
}this.applyKeyframe(a-1);if(k){console.groupEnd()}b.resolve(c-1);return b.promise()
};m._isKeyframeDiff=function(a){return a in this._keyframeDiffRender._loader._keyframes
};m.calculateRenderCount=function(b,a){return this._compositor.calculateRenderCount.apply(this._compositor,arguments)
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(m,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(a){return this._compositor.canvas=a
},enumerable:true},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:true}});n.exports=l},{"../../keyframe/Render":907}],891:[function(n,m,i){var l,j=false,o=n("ac-deferred").Deferred;
function k(a){this._compositor=a;this._frames=this.mainCompositor._loadController._loaders.manifest._data.frames;
this._superframeInterval=this.mainCompositor._diffRender.flowData.superframeFrequency
}l=k.prototype;l.init=function(a){return this._compositor.init.apply(this._compositor,arguments)
};l.applyFrame=function(a){return this._compositor.applyFrame.apply(this._compositor,arguments)
};l.applyKeyframe=function(b,a){this._compositor.applyKeyframe.apply(this._compositor,arguments)
};l.compositeFrames=function(f,b){var a,c,d=new o();if(b<1||b>this.frameCount-2){return this._compositor.compositeFrames.apply(this._compositor,arguments)
}if(this._isKeyframeDiff(b-1)){a=Math.abs(f-b)===1?true:false;if(j){console.groupCollapsed("Drawing superKeyframe image: "+(b-1))
}this.applyKeyframe(b-1,a);if(j){console.groupEnd()}d.resolve(f-1);return d.promise()
}if(Math.abs(b-f)>this._superframeInterval){c=this._getShortestRender(f,b);if(this._isKeyframeDiff(c-1)||c<=0||c>=this.frameCount-2){return this._compositeFromSuperKeyframe(c,b)
}}if(j){console.log("SuperKeyframe compositor handing off to slave compositor: fromFrame:"+f+" toFrame:"+b)
}return this._compositor.compositeFrames.apply(this._compositor,[f,b])};l._getShortestRender=function(f,c){var a=this._compositor.calculateRenderCount,b=this._getClosestSuperKeyframe(c-1),d=a.apply(this._compositor,[b,c])+1,g=a.apply(this._compositor,[f,c]);
if(d<=g){return b}else{return f}};l._compositeFromSuperKeyframe=function(a,c){var f=this.canvas.getContext("2d"),d=(a<=0)?this.mainCompositor._images[0]:(a>=this.frameCount-2?this.mainCompositor._images[1]:this._frames[a-1].image),b;
if(j){console.log("Drawing superKeyframe for composite base: superKeyframe "+(a-1))
}f.drawImage(d,0,0);return this._compositor.compositeFrames.call(this._compositor,a,c)
};l._getClosestSuperFrame=function(a){return Math.round(a/this._superframeInterval)*this._superframeInterval
};l._getClosestSuperKeyframe=function(c){var g,f,a,b,d=this._frames.length;if(c<d+1&&c>0){b=c-1;
while(b>=0){if(this._frames[b].type==="keyframe"){g=b+1;break}b-=1}b=c+1;while(b<=d-1){if(this._frames[b].type==="keyframe"){f=b+1;
break}b+=1}}g=g?g:0;f=f?f:this.frameCount;a=(c-g)<(f-c)?g:f;return a};l._isKeyframeDiff=function(a){return this._compositor._isKeyframeDiff.apply(this._compositor,arguments)
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(l,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(a){return this._compositor.canvas=a
},enumerable:true},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:true}});m.exports=k},{}],892:[function(m,l,h){var k,i=false;function j(a,b){this._compositor=a;
this._superframeInterval=b||4}k=j.prototype;k._getClosestSuperframe=function(a){return Math.round(a/this._superframeInterval)*this._superframeInterval
};k.init=function(a){this._screenCanvas=a};k.applyFrame=function(){this._compositor.applyFrame.apply(this._compositor,arguments)
};k.calculateRenderCount=function(c,a){var b=this._getClosestSuperframe(c);if(Math.abs(b-a)>this._superframeInterval/2){c=b+((c>a)?-1:1)*this._superframeInterval;
return this.calculateRenderCount(c,a)+1}else{return Math.abs(b-a)+1}};k.compositeFrames=function(f,b){var a,d;
if(b<=0||b>=this.frameCount-2){this._compositor.compositeFrames(f,b)}if(f>this.frameCount-2){f=this.frameCount-2
}else{if(f<=0){f=1}}d=this._getClosestSuperframe(f);if(i){console.groupCollapsed("Rendering : "+f+"..."+b)
}if(this._compositor.calculateRenderCount(f,b)>this.calculateRenderCount(f,b)){if(i){console.groupCollapsed("Rendering (superframe) : "+d)
}a=this._compositor.compositeFrames(d,d).then(function c(){if(i){console.groupEnd()
}var g=d+((f>b)?-1:1)*this._superframeInterval;this._compositor.compositeFrames(d,g).then(function(){return this.compositeFrames(g,b)
}.bind(this))}.bind(this))}else{if(i){console.groupCollapsed("Rendering (final frames) : "+f+"..."+b)
}a=this._compositor.compositeFrames(f,b).then(function c(){if(i){console.groupEnd()
}}.bind(this))}a.then(function c(){if(i){console.groupEnd()}}.bind(this));return a
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(k,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(a){return this._compositor.canvas=a
},enumerable:true},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:true}});l.exports=j},{}],893:[function(p,o,q){var m,n=p("ac-event-emitter").EventEmitter,k=p("./MultithreadProcess"),l=p("./MultithreadProcessInterface");
var j=function(a){n.call(this);this._function=a};m=j.prototype=new n(null);m.exec=function(a,b){b=b||{};
if(!this._processURL){this._processURL=this._createThreadProcessURL(this._function)
}if(this._process){this.terminateProcess()}if(!this._process){this._process=new window.Worker(this._processURL);
this._process.onmessage=this._onMessage.bind(this)}var c;if(b.transfer){c=[a]}this._process.postMessage(a,c);
return this};m.run=function(f,a,c){c=c||{};var b={name:f,data:a||{}};var d;if(c.transfer){d=[b]
}this._process.postMessage(b,d);this.trigger(f,a)};m.destroy=function(){this.terminateProcess();
this._function=null;this._processURL=null;return this};m.terminateProcess=function(){if(this._process){this._process.terminate();
this._process=null}return this};m._createThreadProcessURL=function(a){var b=this._compileProcess(a),c=new window.Blob([b],{type:"text/javascript"});
return this._getURLObject().createObjectURL(c)};m._getURLObject=function(){return window.URL||window.webkitURL||null
};m._compileProcess=function(b){var f=k.toString();var d=/(['|"]){{INTERFACE}}\1/,c=/(['|"]){{PROCESS}}\1/;
f=f.replace(d,"("+l.toString()+")();");f=f.replace(c,b.toString());var a="(",g=")();";
return a+f+g};m._handleTrigger=function(b,a){this.trigger(b,a)};m._onMessage=function(a){if(!a.data){return
}var c=a.data.evt,b=a.data.data;if(c==="__trigger__"){this._handleTrigger(b.trigger,b.data)
}return this};o.exports=j},{"./MultithreadProcess":894,"./MultithreadProcessInterface":895,"ac-event-emitter":false}],894:[function(i,h,f){var g=function(){var a="{{PROCESS}}",b="{{INTERFACE}}";
this.processInstance;this.onmessage=function(c,k,d){d=d||{};if(!k.processInstance){k.processInstance=new c(this)
}else{k.processInstance._onMessage(d.data.name,d.data.data)}}.bind(b,a,this)};h.exports=g
},{}],895:[function(f,i,g){var h=function(){return{trigger:function(a,b,d){var c={trigger:a,data:b};
this._post("__trigger__",c,d)},_post:function(k,a,c){c=c||{};var d,b={evt:k,data:a};
if(c.transfer){d=[a]}postMessage(b,d)}}};i.exports=h},{}],896:[function(g,k,h){var j;
var i=function(a){this._interface=a;this.trigger=function(b,c,d){this._interface.trigger(b,c,d);
return this};this.renderFrameDiffs=function(b){var f=b.binaryFrame,q=b.compositingData,r=b.frameData,c=b.sourceImagesData,p=r.length,d;
for(d=0;d<p;d++){f=this._applyBlocksToBinaryFrame(f,r[d],c,q)}this.trigger("frameReady",f)
};this._applyBlocksToBinaryFrame=function(X,I,b,P){var U=I.block,d=Math.floor(U/P.blocksPerFullDiff),Q=P.imageWidth,y=I.length,K=P.columnsInCanvas,L=P.canvasWidth,H=U%P.blocksPerFullDiff,Y=Q/P.blockSize;
var c=(H%Y)*P.blockSize,f=Math.floor(H/(Y||1))*P.blockSize,R=(I.location%K)*P.blockSize,S=Math.floor(I.location/K)*P.blockSize;
var M,O,x,V,W,N,J,T;while(y>0){J=Math.min((y*P.blockSize),L-R,Q-c);T=J/P.blockSize;
V=b[d];for(O=0;O<P.blockSize;O++){for(M=0;M<J;M++){W=(f+O)*Q+(c+M);N=(S+O)*L+(R+M);
X.buf32[N]=V[W]}}y-=T;if(y>0){if((c+=J)>=Q){c=0;f+=P.blockSize}if((H+=T)>=P.blocksPerFullDiff){H=0;
c=0;f=0;d+=1;if(d===P.imagesRequired-1){Q=P.imageWidth}}if((R+=J)>=L){R=0;S+=P.blockSize
}U+=T}}return X};this._onMessage=function(b,c){if(typeof this[b]==="function"){this[b](c)
}}};k.exports=i},{}],897:[function(f,i,g){function h(b,a){this.location=b;this.length=a
}i.exports=h},{}],898:[function(i,h,f){function g(){}h.exports=g},{}],899:[function(o,n,i){var k=o("./Manifest"),j=o("./Block"),l;
var m={parseData:function(b){l=0;var a=b.frames.map(this._parseFrame,this);return Object.create(k.prototype,{version:{value:b.version},framecount:{value:b.frameCount},blockSize:{value:b.blockSize},imagesRequired:{value:b.imagesRequired},reversible:{value:b.reversible},superframeFrequency:{value:b.superframeFrequency},frames:{value:a}})
},_valueForCharAt:function(a,c){var b=a.charCodeAt(c);if(b>64&&b<91){return b-65
}if(b>96&&b<123){return b-71}if(b>47&&b<58){return b+4}if(b===43){return 62}if(b===47){return 63
}throw"Invalid Bas64 character: "+a.charAt(c)},_createNumberFromBase64Range:function(a,f,b){var c=0,d;
while(b--){d=this._valueForCharAt(a,f++);c+=(d<<b*6)}return c},_parseFrame:function(c){var b,f=[],c=c.value||c,a,d;
for(b=0;b<c.length;b+=5){d=this._createNumberFromBase64Range(c,b,3);a=this._createNumberFromBase64Range(c,b+3,2);
f.push(Object.create(j.prototype,{location:{value:d,enumerable:true},length:{value:a,enumerable:true},block:{value:(l+=a)-a,enumerable:true}}))
}return f}};n.exports=m},{"./Block":897,"./Manifest":898}],900:[function(o,n,j){var l,i=o("ac-asset-loader").AssetLoader,k=o("../processor");
function m(a){this._assetLoader=new i([a])}l=m.prototype;l.load=function(){return this._assetLoader.load().then(function(a){var b;
if(a&&a.length){b=k.parseData(a[0]);this._data=b}return b}.bind(this))};n.exports=m
},{"../processor":899,"ac-asset-loader":37}],901:[function(m,l,i){var j,h=m("ac-deferred").Deferred;
var k=function(a){if(typeof a==="string"){a=[a]}this.srcArr=a};j=k.prototype;j._request=function(a){var c=new h();
var b=new XMLHttpRequest();b.addEventListener("load",function(){var d=b.response;
c.resolve(d)});b.responseType="arrayBuffer";b.open("get",a,true);b.send();return c.promise()
};j.load=function(){this._deferred=new h();var a=[];var b,c=this.srcArr,d=c.length;
for(b=0;b<d;b++){a.push(this._request(c[b]))}h.all(a).then(function(f){this._deferred.resolve(f)
}.bind(this));return this._deferred.promise()};l.exports=k},{}],902:[function(s,t,r){var n=false;
var p,l=s("./Loader"),o=s("ac-deferred").Deferred,u=s("../compositor/multithread/MultithreadController"),q=s("../compositor/multithread/MultithreadRenderer");
function m(a,b){this.flowData=a;this.flowData.imageUrlPattern=b;this.ArrayBufferCompositor=document.createElement("canvas");
this.ArrayBufferCompositorContext=this.ArrayBufferCompositor.getContext("2d");this.sourceImagesData={};
this._processor=new u(q);this._processor.exec();window.processor=this._processor
}p=m.prototype;p._storeImages=function(a){if(n){console.log("loaded images")}this.images=a;
this._blocksPerFullDiff=(a[0].width/this.flowData.blockSize)*(a[0].height/this.flowData.blockSize);
return(new o()).resolve()};p._getImageDataAsArrayBuffer=function(d,c,a){a=a||c;
this.ArrayBufferCompositor.width=c;this.ArrayBufferCompositor.height=a;this.ArrayBufferCompositorContext.drawImage(d,0,0);
var b=new Uint32Array(this.ArrayBufferCompositorContext.getImageData(0,0,c,a).data.buffer);
return b};p._processDataConstants=function(){this._compositingConstants={images:[]};
var a,b=this.images.length;for(a=0;a<b;a++){this._compositingConstants.images[a]={};
this._compositingConstants.images[a].width=this.images[a].width}return(new o()).resolve()
};p._setFrameRequirements=function(d){var f=d[0],h=d[d.length-1];var g=this._getImageIndexOfBlock(f.block),b=this._getImageIndexOfBlock(h.block+h.length);
var a,c={};for(a=g;a<b+1;a++){if(this.sourceImagesData[a]){c[a]=this.sourceImagesData[a]
}else{c[a]=this._getImageDataAsArrayBuffer(this.images[a],this.images[a].width)
}}this.sourceImagesData=c;return c};p._getImageIndexOfBlock=function(a){return Math.floor(a/this._blocksPerFullDiff)
};p._setCompositingData=function(b,a){this._compositingData={imageWidth:this._compositingConstants.images[0].width,canvasWidth:a.canvas.width,canvasHeight:a.canvas.height,blocksPerFullDiff:this._blocksPerFullDiff,blockSize:this.flowData.blockSize,imagesRequired:this.flowData.imagesRequired};
var c=a.getImageData(0,0,this._compositingData.canvasWidth,this._compositingData.canvasHeight).data;
this._compositingData.columnsInCanvas=this._compositingData.canvasWidth/this.flowData.blockSize,this._compositingData.imageData=new Uint8ClampedArray(c)
};p._createBinaryFrame=function(c,a,b){return{buf8:c,buf32:new Uint32Array(c.buffer),width:a,height:b}
};p._getBinaryImageArrayLength=function(a){return a.canvasWidth};p._compositeBinaryFrame=function(c,d){var g,b=c.length,h=new o();
var f=this._setFrameRequirements(c);var a;if(this._lastBinaryFrame){a=this._lastBinaryFrame
}else{a=this._createBinaryFrame(d.imageData,d.canvasWidth,d.canvasHeight)}this._processor.run("renderFrameDiffs",{binaryFrame:a,frameData:c,compositingData:d,sourceImagesData:f});
this._processor.once("frameReady",h.resolve.bind(h));return h.promise()};p._getSourceImageAs32Bit=function(a){return new Uint32Array(this.sourceImagesData[a].data.buffer)
};p._applyBlocksToBinaryFrame=function(T,a,K){var Q=a.block,b=Math.floor(Q/this._blocksPerFullDiff),x=this._compositingConstants.images[b].width,c=a.length,g=K.columnsInCanvas,i=K.canvasWidth,f=Q%this._blocksPerFullDiff,U=x/this.flowData.blockSize;
var L=(f%U)*this.flowData.blockSize,O=Math.floor(f/(U||1))*this.flowData.blockSize,y=(a.location%g)*this.flowData.blockSize,M=Math.floor(a.location/g)*this.flowData.blockSize;
var h,j,P,R,S,k,d,N;while(c>0){d=Math.min((c*this.flowData.blockSize),i-y,x-L);
N=d/this.flowData.blockSize;R=this.sourceImagesData[b];for(j=0;j<this.flowData.blockSize;
j++){for(h=0;h<d;h++){S=(O+j)*x+(L+h);k=(M+j)*i+(y+h);T.buf32[k]=R[S]}}c-=N;if(c>0){if((L+=d)>=x){L=0;
O+=this.flowData.blockSize}if((f+=N)>=this._blocksPerFullDiff){f=0;L=0;O=0;b+=1;
if(b===this.flowData.imagesRequired-1){x=this._compositingConstants.images[b].width
}}if((y+=d)>=i){y=0;M+=this.flowData.blockSize}Q+=N}}return T};p.init=function(){console.log("LOADED BINARY");
if(n){console.log("load images")}return new l(this.flowData.imageUrlPattern,this.flowData.imagesRequired).load({binary:true}).then(this._storeImages.bind(this)).then(this._processDataConstants.bind(this))
};p.renderDiff=function(f,c){var d=f.getContext("2d"),a=new o();if(!this._compositingData){this._setCompositingData(f,d)
}c-=1;if(n){this._frameToRender=c}var b=this._compositeBinaryFrame(this.frames[c],this._compositingData);
b.then(function(g,h){this._lastBinaryFrame=h;g.resolve(h)}.bind(this,a));return a.promise()
};p.getBinaryDataFromFlowDataBlock=function(a){};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(p,{frames:{get:function(){return this.flowData.frames},set:function(a){this.flowData.frames=a
},enumerable:true}});t.exports=m},{"../compositor/multithread/MultithreadController":893,"../compositor/multithread/MultithreadRenderer":896,"./Loader":904}],903:[function(m,l,o){var k,i=false,n=m("ac-deferred").Deferred;
function j(a,c,b){this.flowData=a;this.flowData.imageUrlPattern=c;this._loadController=b;
this.ArrayBufferCompositor=document.createElement("canvas");this.ArrayBufferCompositorContext=this.ArrayBufferCompositor.getContext("2d");
this.sourceImagesData={};this._forceBinaryComposite=true}k=j.prototype;k._storeImages=function(a){if(i){console.log("loaded images")
}this.images=a;this._blocksPerFullDiff=(a[0].width/this.flowData.blockSize)*(a[0].height/this.flowData.blockSize);
return(new n()).resolve()};k._getImageDataAsArrayBuffer=function(b,a,c){c=c||a;
if(this.ArrayBufferCompositor.width!==a){this.ArrayBufferCompositor.width=a}if(this.ArrayBufferCompositor.height!==c){this.ArrayBufferCompositor.height=c
}this.ArrayBufferCompositorContext.drawImage(b,0,0);var d={buf8:this.ArrayBufferCompositorContext.getImageData(0,0,a,c).data};
d.buf32=new Uint32Array(d.buf8.buffer);return d};k._processDataConstants=function(){this._compositingConstants={images:[]};
var a,b=this.images.length;for(a=0;a<b;a++){this._compositingConstants.images[a]={};
this._compositingConstants.images[a].width=this.images[a].width}return(new n()).resolve()
};k._setFrameRequirements=function(g){var h=g[0],b=g[g.length-1];var r=this._getImageIndexOfBlock(h.block),d=this._getImageIndexOfBlock(b.block+b.length),a=d+1;
var c,f={};for(c=r;c<a;c++){if(this.sourceImagesData[c]){f[c]=this.sourceImagesData[c]
}else{f[c]=this._getImageDataAsArrayBuffer(this.images[c],this.images[c].width)
}}this.sourceImagesData=f};k._getImageIndexOfBlock=function(a){return Math.floor(a/this._blocksPerFullDiff)
};k._setCompositingData=function(c,b){this._compositingData={imageWidth:this._compositingConstants.images[0].width,canvasWidth:b.canvas.width,canvasHeight:b.canvas.height};
var a=b.getImageData(0,0,this._compositingData.canvasWidth,this._compositingData.canvasHeight).data;
this._compositingData.columnsInCanvas=this._compositingData.canvasWidth/this.flowData.blockSize,this._compositingData.imageData=new Uint8ClampedArray(a)
};k._createBinaryFrame=function(a,b,c){return{buf8:a,buf32:new Uint32Array(a.buffer),width:b,height:c}
};k._getBinaryImageArrayLength=function(a){return a.canvasWidth};k._compositeBinaryFrame=function(f,a){var b,d=f.length;
this._setFrameRequirements(f);var c;if(this._lastBinaryFrame&&!this._forceBinaryComposite){c=this._lastBinaryFrame
}else{c=this._createBinaryFrame(a.imageData,a.canvasWidth,a.canvasHeight);if(this._renderOperation){this._cleanBinaryFrame=this._cloneBinaryFrame(c);
c=this.forceApplyFilter(c,a)}else{if(this._cleanBinaryFrame){this._cleanBinaryFrame=null
}}this._forceBinaryComposite=false}if(this._beforeRenderOperation){c=this._beforeRenderOperation(c)
}for(b=0;b<d;b++){c=this._applyBlocksToBinaryFrame(c,f[b],a)}return c};k._applyBlocksToBinaryFrame=function(af,Z,P){var S=this.flowData.blockSize,U=this._blocksPerFullDiff,x=this.flowData.imagesRequired,ab=Z.block,a=Math.floor(ab/U),V=this._compositingConstants.images[a].width,b=Z.length,f=P.columnsInCanvas,g=P.canvasWidth,ac=P.canvasHeight,d=ab%U,ag=V/S;
var R=(d%ag)*S,T=Math.floor(d/(ag||1))*S,X=(Z.location%f)*S,Y=Math.floor(Z.location/f)*S;
var h,N,O,Q,W,ad,ae,y,c,aa;while(b>0){c=Math.min((b*S),g-X,V-R);aa=c/S;ad=this.sourceImagesData[a];
for(N=0;N<S;N++){for(h=0;h<c;h++){O=X+h;Q=Y+N;ae=(T+N)*V+(R+h);y=Q*g+O;if(this._renderOperation){this._cleanBinaryFrame.buf32[y]=ad.buf32[ae];
ad=this._renderOperation(ad,(ae*4),O,Q,g,ac)}af.buf32[y]=ad.buf32[ae]}}b-=aa;if(b>0){if((R+=c)>=V){R=0;
T+=S}if((d+=aa)>=U){d=0;R=0;T=0;a+=1;if(a===x-1){V=this._compositingConstants.images[a].width
}}if((X+=c)>=g){X=0;Y+=S}ab+=aa}}return af};k._cloneBinaryFrame=function(b){var a=b.buf8.buffer.slice(0);
return{buf8:new Uint8ClampedArray(a),buf32:new Uint32Array(a),width:b.width,height:b.height}
};k.init=function(){if(i){console.log("load images")}return this._loadController.loadDiffs().then(this._storeImages.bind(this)).then(this._processDataConstants.bind(this))
};k.renderDiff=function(c,a,b){var b=b||c.getContext("2d");if(!this._compositingData||this._forceBinaryComposite){this._setCompositingData(c,b)
}a-=1;if(i){this._frameToRender=a}var d=this._compositeBinaryFrame(this.frames[a],this._compositingData);
this._lastBinaryFrame=d;return new n().resolve(d)};k.forceBinaryComposite=function(){this._forceBinaryComposite=true;
return this};k.forceApplyFilter=function(b,u){if(this._renderOperation){var f,v,a,h,t,g=u.canvasWidth,d=u.canvasHeight,c=b.buf32.length;
for(f=0;f<c;f++){v=f%g;if(f>0){a=Math.floor(f/g)}else{a=0}b=this._renderOperation(b,(f*4),v,a,g,d)
}}return b};k.forceKeyframeRender=function(c,b){this._setCompositingData(c,b);var a=this._compositingData,d=this._createBinaryFrame(a.imageData,a.canvasWidth,a.canvasHeight);
if(this._renderOperation){this._cleanBinaryFrame=this._cloneBinaryFrame(d);d=this.forceApplyFilter(d,a)
}return d};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(k,{frames:{get:function(){return this.flowData.frames
},set:function(a){this.flowData.frames=a},enumerable:true},_beforeRenderOperation:{value:undefined,enumerable:false,writable:true},_renderOperation:{value:undefined,enumerable:false,writable:true},beforeRenderOperation:{get:function(){return this._beforeRenderOperation
},set:function(a){if(typeof a==="function"){this._beforeRenderOperation=a;return
}this._beforeRenderOperation=undefined},enumerable:true},renderOperation:{get:function(){return this._renderOperation
},set:function(a){if(typeof a==="function"){this.forceBinaryComposite();this._renderOperation=a;
return}this._renderOperation=undefined;this.forceBinaryComposite()},enumerable:true}});
l.exports=j},{}],904:[function(o,n,i){var l,j=o("ac-asset-loader").AssetLoader,m=o("./BinaryLoader");
function k(b,d){var c,f,a=b.match(/#/g).length;this.imagesUrls=[];if(!d){throw new Error("0 images provided")
}for(c=1;c<=d;c++){f="0000"+c;f=f.substring(f.length-a);this.imagesUrls.push(b.replace(/#{2,}/g,f))
}}l=k.prototype;l.load=function(a){a=a||{};return new j(this.imagesUrls).load()
};n.exports=k},{"./BinaryLoader":901,"ac-asset-loader":37}],905:[function(m,l,o){var k,i=false,n=m("ac-deferred").Deferred;
function j(a,c,b){this.flowData=a;this.flowData.imageUrlPattern=c;this._loadController=b
}k=j.prototype;k._storeImages=function(a){if(i){console.log("loaded images")}this.images=a;
this._blocksPerFullDiff=(a[0].width/this.flowData.blockSize)*(a[0].height/this.flowData.blockSize);
return(new n()).resolve()};k._applyDiffRange=function(x,a){var c=a.block,h=a.length,y=x.canvas.width/this.flowData.blockSize,f=Math.floor(c/this._blocksPerFullDiff),A=this.images[f].width,z=c%this._blocksPerFullDiff,B=A/this.flowData.blockSize,C=(z%B)*this.flowData.blockSize,D=Math.floor(z/(B||1))*this.flowData.blockSize,b=(a.location%y)*this.flowData.blockSize,d=Math.floor(a.location/y)*this.flowData.blockSize,g,E;
while(h){g=Math.min((h*this.flowData.blockSize),x.canvas.width-b,A-C);E=g/this.flowData.blockSize;
if(i){if(typeof this.renderDebugger!=="undefined"&&this._frameToRender>0){this.renderDebugger.registerComparison(this._frameToRender,{image:f,block:c,x:C,y:D})
}}x.drawImage(this.images[f],C,D,g,this.flowData.blockSize,b,d,g,this.flowData.blockSize);
h-=E;if(h){if((C+=g)>=A){C=0;D+=this.flowData.blockSize}if((z+=E)>=this._blocksPerFullDiff){z=0;
C=0;D=0;f+=1;if(f===this.flowData.imagesRequired-1){A=this.images[f].width}}if((b+=g)>=x.canvas.width){b=0;
d+=this.flowData.blockSize}c+=E}}};k.init=function(){if(i){console.log("load images")
}return this._loadController.loadDiffs().then(this._storeImages.bind(this))};k.renderDiff=function(d,a){var c=d.getContext("2d");
a-=1;if(i){this._frameToRender=a;console.log("applying diff frame : "+(a+1))}this.frames[a].forEach(function b(f){this._applyDiffRange(c,f)
}.bind(this))};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(k,{frames:{get:function(){return this.flowData.frames},set:function(a){this.flowData.frames=a
},enumerable:true}});l.exports=j},{}],906:[function(m,l,o){var k,j=m("ac-asset-loader").AssetLoader,n=m("ac-deferred").Deferred;
function i(d,a){var b,c=d.match(/#/g).length;this._keyframes={};d=d.replace(/([^#]+)(#+)(\..*)/,"$1key_$2$3");
this._imageUrls=[];if(a.frames){a.frames.forEach(function(g,f){if(g.type==="keyframe"){b="0000"+f;
b=b.substring(b.length-c);this._imageUrls.push(d.replace(/#+/g,b));this._keyframes[f]=g
}}.bind(this))}}k=i.prototype;k.load=function(){if(this._imageUrls.length>0){return new j(this._imageUrls).load()
}return(new n()).resolve()};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(k,{keyframes:{get:function(){return this._keyframes},enumerable:true}});
l.exports=i},{"ac-asset-loader":37}],907:[function(o,n,i){var m,j=false,k=o("./Loader");
function l(a,b){this.flowData=a;this.flowData.imageUrlPattern=b}m=l.prototype;m._storeImages=function(d){var b=0,a;
if(d&&d.length>0){if(j){console.log("loaded keyframe diff images")}for(var c in this._loader._keyframes){if(this._loader._keyframes.hasOwnProperty(c)){a=d[b];
this._loader._keyframes[c].image=a;b+=1}}}if(j){if(!d||d.length===0){console.log("no keyframe diff images to load")
}}};m.init=function(){if(j){console.log("loading keyframe diff images")}this._loader=new k(this.flowData.imageUrlPattern,this.flowData);
return this._loader.load().then(this._storeImages.bind(this))};m.renderKeyframe=function(s,t,a){var u=s.getContext("2d"),h=this._loader.keyframes[t],g=h.image,c=h.x,d=h.y,b=h.width,f=h.height;
if(j){console.log("applying keyframe diff image: "+t);console.log("x:"+c+" y:"+d+" w:"+b+" h:"+f)
}if(a===true){if(j){console.log("drawing superKeyframe sub-rectangle")}u.drawImage(g,c,d,b,f,c,d,b,f)
}else{if(this.flowData.reversible){if(j){console.log("drawing superKeyframe full image")
}u.drawImage(g,0,0)}else{if(j){console.log("drawing keyframe full image")}u.drawImage(g,c,d,b,f)
}}};n.exports=l},{"./Loader":906}],908:[function(f,i,g){function h(p,o,b,d,a){var r,q,c,s;
a=a||{};a={keyframeCache:(typeof a.keyframeCache==="undefined")?8:a.keyframeCache,benchmark:(typeof a.benchmark==="undefined")?false:a.benchmark,preload:(typeof a.preload==="undefined")?true:a.preload,renderType:a.renderType||"default",multithread:a.multithread||false};
o=o||[p.getAttribute("data-start-frame")];if(p.getAttribute("data-end-frame")){o.push(p.getAttribute("data-end-frame"))
}b=b||p.getAttribute("data-image-url-pattern");c=(typeof d==="string")?new FlowDataProviderAsync(d):new FlowDataProviderSync(d);
if(a.renderType==="binary"){r=new AC_BinaryCompositor(o,b,c,a.multithread)}else{if(a.renderType==="default"){r=new AC_FlowCompositorSequence(o,b,c)
}}q=new AC_FlowPlayer(p,new AC_Flow(r,a));if(a.preload){q.load()}return q}i.exports=h
},{}],909:[function(g,k,h){var i;function j(a){this.name=a}i=j.prototype;i.start=function(){if(DEBUG){console.log("▼▼▼ start "+this.name+" benchmark");
this.startTime=new Date().getTime();console.time(this.name)}};i.end=function(){if(DEBUG){this.endTime=new Date().getTime();
console.log("▲▲▲ end "+this.name+" benchmark "+(this.endTime-this.startTime)/1000+" sec");
console.time(this.timeEnd)}};k.exports=j},{}],910:[function(d,g,f){g.exports=d(26)
},{}],911:[function(d,g,f){g.exports=d(27)},{"./ac-object/clone":912,"./ac-object/create":913,"./ac-object/defaults":914,"./ac-object/extend":915,"./ac-object/getPrototypeOf":916,"./ac-object/isDate":917,"./ac-object/isEmpty":918,"./ac-object/isRegExp":919,"./ac-object/toQueryParameters":920}],912:[function(d,g,f){g.exports=d(28)
},{"./extend":915}],913:[function(d,g,f){g.exports=d(29)},{}],914:[function(d,g,f){g.exports=d(30)
},{"./extend":915}],915:[function(d,g,f){g.exports=d(31)},{}],916:[function(d,g,f){g.exports=d(32)
},{}],917:[function(d,g,f){g.exports=d(33)},{}],918:[function(d,g,f){g.exports=d(34)
},{}],919:[function(d,g,f){g.exports=d(35)},{}],920:[function(d,g,f){g.exports=d(36)
},{qs:910}],921:[function(k,i,h){var j=k("./ac-media-object/create");var g=k("./ac-media-object/cname");
i.exports={create:j,cname:g}},{"./ac-media-object/cname":931,"./ac-media-object/create":932}],922:[function(s,t,q){var m=s("ac-event-emitter").EventEmitter;
var u=s("../eventNames");var n=s("../utils/propertiesAreNull");var o=2;function l(){this._items=[];
this._loadingItem=null;this._active=false}var p=l.prototype=new m();p.load=function(){this._active=true;
return this._loadNext()};p._loadNext=function(){if(this._items.length===0){return
}this._loadingItem=this._items.shift();this._loadItem(this._loadingItem)};p._loadItem=function(b){var a;
this._loadingItem=b;if(b&&b.asset&&!n(b.asset)){b.asset.on(u.loaded,this._itemLoaded.bind(this,b));
b.asset.load()}else{if(this._active){this._loadNext()}}return a};p._itemLoaded=function(a,b){this.trigger(u.progress,{asset:a.asset,binaries:b});
if(this._active===true){this._loadNext()}};p.pause=function(){if(this._loadingItem){this._loadingItem.asset.pause();
this._items.unshift(this._loadingItem);this._loadingItem=null}this._active=false
};p.getItems=function(){return this._items};p.remove=function(d){var f=this._active;
var a;var c;var b=null;if(this._loadingItem&&this._loadingItem.asset===d){c=this._loadingItem;
this.pause()}for(a=0;a<this._items.length;a+=1){if(this._items[a].asset===d){c=this._items[a];
b=a;break}}c.asset.destroy();if(b!==null){this._items.splice(b,1)}if(f&&this._active===false){this.load()
}};p.add=function(d,b){var a=this._active;var c=true;b=(typeof b==="number")?b:o;
if(this._loadingItem&&this._loadingItem.priority<=b){c=false}if(c===true){this.pause()
}this._items.push({asset:d,priority:b});this._sort();if(a&&this._active===false){this.load()
}};p._sort=function(){this._items.sort(function(a,b){if(a.priority<b.priority){return -1
}return 1})};var r=new l();r.load();r.LoadingQueue=l;t.exports=r},{"../eventNames":933,"../utils/propertiesAreNull":935,"ac-event-emitter":false}],923:[function(A,D,x){var v=A("ac-base").Element;
var y=A("ac-object");var s=A("ac-ajax");var u=A("../utils/destroy");var r=A("ac-event-emitter").EventEmitter;
var E=A("../eventNames");var F=A("./MediaObject/Loader");var B=A("./MediaObject/Loader/QueuedLoader");
var G=A("./MediaObject/View");var w;var z={preload:false,autoplay:false,fadeToEndframe:false,transitionDuration:0.4,frameRate:24,queueLoading:false,loadPriority:null};
var C={posterframeSrc:".posterframe",endstateSrc:".endstate"};var t=function(c,a,b){this.container=v.getElementById(c);
if(!this.container){throw"MediaObject: requires valid DOM Node for ‘container’"
}this.options=y.defaults(z,b||{});this.mediaSrc=y.defaults(C,a||{});if(this.mediaSrc.basePath){this.mediaSrc.basePath=this._forceTrailingSlash(this.mediaSrc.basePath)
}this._media=null;this._mediaElement=null;this._mediaEmitter=null;this._loadObject=null;
this._totalFrames=null;this.duration=null;this.ended=false;this.loader=null;this.dataOptionsAttribute="mediaObject";
this.dataAssetOptionsAttribute="mediaObject-asset";this.ready=false;this._updateOptionsFromDataAttribute();
this._mediaExistsSrc=this._constructMediaExistsSrc();this.view=new G(this);if(this.options.preload===true||this.options.autoplay===true){this.load()
}};w=t.prototype=new r();w.enhance=function(){if(!this.view.enhanced){this._generate();
this.view.enhance().then(function(){this.trigger(E.enhance,this)}.bind(this))}};
w.degrade=function(){if(this._media){this.pause()}if(this.view){this.view.degrade();
this.trigger(E.degrade,this)}};w._generate=function(){if(this.loader===null){if(this.options.queueLoading){this.loader=new B(this._loadObject,this.options.loadPriority);
this.prioritize=this.loader.prioritize.bind(this.loader)}else{this.loader=new F(this._loadObject)
}this._addEventListeners()}};w._forceTrailingSlash=function(a){if(a&&a.lastIndexOf("/")!==a.length-1){a=a+"/"
}return a};w._updateOptionsFromDataAttribute=function(){var b=this._parseDataAttributeOptions(this.container,this.dataOptionsAttribute);
var a=this._parseDataAttributeOptions(this.container,this.dataAssetOptionsAttribute);
y.defaults(this.options,b||{});y.defaults(this.mediaSrc,a||{})};w._parseDataAttributeOptions=function(c,f){c=v.getElementById(c);
var b=c.getAttribute("data-"+f);var g;var d={};var a;if(b&&b.length>0){g=b.split(",");
if(g&&g.length>0){g.forEach(function(h){a=h.split(":");d[a[0]]=a[1]})}}return d
};w._constructMediaExistsSrc=function(){var b="";var a=this.mediaSrc.basePath?this._forceTrailingSlash(this.mediaSrc.basePath):"";
if(this.mediaSrc.splitFileLoading===true){b=a}else{b=a+this.mediaSrc.filename+"."+this.mediaSrc.fileFormat
}return b};w.load=function(){if(this.loader===null||this.loader.loaded!==true){this._generate();
this.trigger(E.loadstart,this);this._load();return this.loader.load()}};w._load=function(){this.once(E.loaded,this._onReady,this)
};w.play=function(a){if(!this.ready){this.load();this.options.autoplay=true;return
}if(!this._media.paused){return false}this._play(a);this.trigger(E.play,this)};
w._play=function(a){if(this.ready&&this._media!==null){if(typeof a==="number"){this.setPlaybackRate(a)
}this._media.play()}};w.pause=function(){if(this._media.paused){return false}this._pause();
this.trigger(E.pause,this)};w._pause=function(){this._media.pause()};w.reset=function(){this._reset()
};w._reset=function(){if(this.ready){this.setTime(0)}};w.stop=function(){this.options.autoplay=false;
this._stop();this.trigger(E.stop,this)};w._stop=function(){this._pause();this.reset()
};w.setTime=function(a){if(a<0){a=0}if(a>this.duration){a=this.duration}return this._media.currentTime=a
};w.goToFrame=function(a){var b=a/this.options.frameRate;return this.setTime(b)
};w.goToDurationPercent=function(b){var a=b*this.duration;return this.setTime(a)
};w.currentFrame=function(){return Math.floor(this.currentTime()*this.options.frameRate)
};w.currentTime=function(){return this._media.currentTime};w.getCurrentTime=function(){return this._media.currentTime
};w.getPlaybackRate=function(){return this._media.playbackRate};w.setPlaybackRate=function(a){return this._media.playbackRate=a
};w._addEventListeners=function(){this._mediaEmitter.on(E.ended,this._onEnded,this);
this.loader.once(E.loaded,this._onLoad,this);this.loader.once(E.errored,this._onError,this)
};w.destroy=function(){this.trigger(E.destroy,this);this._mediaEmitter.off();u(this,true)
};w._getTotalFrames=function(){return this.duration*this.options.frameRate};w.mediaExists=function(){this._request=s.create({method:"HEAD",url:this._mediaExistsSrc,timeout:2000});
return this._request.send()};w._onReady=function(){this.ready=true;this.duration=this._media.duration;
this._totalFrames=this._getTotalFrames();this._mediaEmitter.on("durationchange",function(){this.duration=this._media.duration;
this._totalFrames=this._getTotalFrames()},this);this.trigger(E.ready,this);if(this.options.autoplay===true){this.options.autoplay=false;
if(this.view.enhanced===false){this.enhance()}this.play()}};w._onEnded=function(){this.ended=true;
this.trigger(E.ended,this)};w._onLoad=function(){this.loaded=true;this.trigger(E.loaded,this)
};w._onError=function(){this.degrade()};D.exports=t},{"../eventNames":933,"../utils/destroy":934,"./MediaObject/Loader":925,"./MediaObject/Loader/QueuedLoader":926,"./MediaObject/View":928,"ac-ajax":13,"ac-base":false,"ac-event-emitter":false,"ac-object":911}],924:[function(u,w,q){try{var x=u("ac-flow-x").Flow
}catch(s){}var r=u("ac-object");var y=u("../../eventNames");var n=u("../MediaObject");
var o;var t={};var v={};var p=function(c,a,b){a=r.defaults(v,a||{});b=r.defaults(t,b||{});
this.canvas=null;n.apply(this,arguments)};o=p.prototype=r.create(n.prototype);o._generate=function(){if(this._media!==null||x===undefined){return
}var c;var b=document.createElement("canvas");var d={element:b,preload:false,superFrames:this.options.superFrames||false,reversable:this.options.reversable||false,keyframeCache:this.options.keyframeCache||false,benchmark:this.options.benchmark||false,multithread:this.options.multithread||false,preventDraw:this.options.preventDraw||false,renderType:this.options.renderType||"default"};
var a={basePath:this.mediaSrc.basePath||null,baseName:this.mediaSrc.filename||"flow",imageUrlPattern:this.mediaSrc.imageUrlPattern||"###",fileFormat:this.mediaSrc.fileFormat||"jpg",startframeFileFormat:this.mediaSrc.startframeFileFormat||null,endframeFileFormat:this.mediaSrc.endframeFileFormat||null,manifestPath:this.mediaSrc.manifestPath||null,manifestFileFormat:this.mediaSrc.manifestFileFormat||"json",diffPath:this.mediaSrc.diffPath||null,framePath:this.mediaSrc.framePath||null};
c=new x(d,a);c.frameRate=this.options.frameRate;this._media=c;this._mediaElement=c.element;
this._mediaEmitter=c;this._loadObject=c.loader;n.prototype._generate.call(this);
return this.mediaObject};o._constructMediaExistsSrc=function(){var c="";var a=this.mediaSrc.basePath?this._forceTrailingSlash(this.mediaSrc.basePath):null;
var d=this.mediaSrc.filename?this.mediaSrc.filename+"_":"_";var b=this.mediaSrc.manifestPath?this._forceTrailingSlash(this.mediaSrc.manifestPath):null;
c=(b||a)+d+"manifest."+(this.mediaSrc.manifestFileFormat||"json");return c};o._load=function(){this._mediaEmitter.once("canplaythrough",this._onReady,this)
};w.exports=p},{"../../eventNames":933,"../MediaObject":923,"ac-flow-x":879,"ac-object":911}],925:[function(p,q,o){var l=p("../../utils/destroy");
var m=p("../../utils/propertiesAreNull");var k=p("ac-event-emitter").EventEmitter;
var r=p("../../eventNames");var n;var s=function(a){this.loadObject=a;this.loaded=false;
this.loadObject.once(r.loaded,this._onLoad,this);this.loadObject.once(r.errored,this._onError,this)
};n=s.prototype=new k();n.load=function(){if(!this.loaded){return this._load()}};
n.pause=function(){if(!this.loaded){this.loadObject.pause()}};n._load=function(){return this.loadObject.load()
};n._onLoad=function(){this.loaded=true;this.trigger(r.loaded)};n._onError=function(){this.trigger(r.errored)
};n.destroy=function(){if(!m(this.loadObject)){this.pause();if(typeof this.loadObject.destroy==="function"){this.loadObject.destroy()
}}l(this,false)};q.exports=s},{"../../eventNames":933,"../../utils/destroy":934,"../../utils/propertiesAreNull":935,"ac-event-emitter":false}],926:[function(p,r,m){var o=p("ac-object");
var s=p("../../../eventNames");var n=p("../../LoadingQueue");var k=p("../Loader");
var l;var q=function(a,b){this.priority=b;k.apply(this,[a])};l=q.prototype=o.create(k.prototype);
l.prioritize=function(a){this.priority=a;this.loadObject.pause();n.remove(this.loadObject);
this.load()};l._load=function(){if(this.promise){n.add(this.loadObject,this.priority)
}else{this.promise=new Promise(function(a,b){this.loadObject.once(s.loaded,a);this.loadObject.once(s.errored,b);
n.add(this.loadObject,this.priority)}.bind(this))}return this.promise};r.exports=q
},{"../../../eventNames":933,"../../LoadingQueue":922,"../Loader":925,"ac-object":911}],927:[function(D,F,A){var t=D("ac-base").Environment;
var B=D("ac-object");var u=D("ac-asset-loader").AssetLoader;var w=D("ac-deferred").Deferred;
var y=D("ac-deferred").all;var v=D("ac-dom-emitter").DOMEmitter;var G=D("../../eventNames");
var x=D("../MediaObject");var r=D("ac-asset-loader").Asset.Video;var z;var C={loop:false};
var E={filename:"h264",fileFormat:"mp4",splitFileLoading:false};var s=function(c,a,b){a=B.defaults(E,a||{});
b=B.defaults(C,b||{});x.call(this,c,a,b)};z=s.prototype=B.create(x.prototype);z._generate=function(){if(this._media!==null){return
}var d=document.createElement("video");var f={element:d,forceElementLoading:this.options.forceElementLoading,split:this.mediaSrc.splitFileLoading};
var c=this._mediaExistsSrc;var a=new r(c,f);var b=new u(a);if(this.options.loop===true){d.setAttribute("loop","true")
}this._media=d;this._mediaElement=d;this._mediaEmitter=new v(d);this._loadObject=b;
x.prototype._generate.call(this)};z._triggerEndedWhilePlayingInReverse=function(){if(this._media.currentTime===0){this._media.pause();
this.trigger(G.ended,this);this._mediaEmitter.off("timeupdate",this._triggerEndedWhilePlayingInReverse)
}};z._hidePosterOnTimeupdate=function(){if(this._media.currentTime>0){this.view.hideCoverElement(this.view.posterframe);
this._mediaEmitter.off("timeupdate",this._hidePosterOnTimeupdate)}};z._load=function(){var b;
var a=new w();var c=new w();if(typeof this._boundOnReady!=="function"){this._boundOnReady=this._onReady.bind(this)
}this._mediaEmitter.once("loadedmetadata",function(){if(b){window.clearInterval(b)
}a.resolve()},this);this.once(G.loaded,function(){c.resolve();if(t.Browser.name==="Safari"&&!!this._media.src.match(/^blob/)&&a.promise().status()==="pending"){b=window.setInterval(function(){if(!this._media||!this._media.duration){return true
}return isNaN(this._media.duration)}.bind(this),20);window.setTimeout(function(){window.clearInterval(b)
},7000)}},this);return y([a.promise(),c.promise()]).then(this._boundOnReady)};z._play=function(a){this._mediaEmitter.on("timeupdate",this._hidePosterOnTimeupdate,this);
x.prototype._play.apply(this,arguments);if(this.getPlaybackRate()<0){this._mediaEmitter.on("timeupdate",this._triggerEndedWhilePlayingInReverse,this)
}};z._stop=function(){this._mediaEmitter.off("timeupdate",this._hidePosterOnTimeupdate);
this._mediaEmitter.off("timeupdate",this._triggerEndedWhilePlayingInReverse);x.prototype._stop.call(this)
};z._onReady=function(){x.prototype._onReady.call(this);this._boundOnReady=null
};F.exports=s},{"../../eventNames":933,"../MediaObject":923,"ac-asset-loader":37,"ac-base":false,"ac-dom-emitter":877,"ac-object":911}],928:[function(u,v,t){var r=u("ac-base").Element;
var w=u("../../eventNames");var n=u("ac-asset-loader").AssetLoader;var q=u("ac-deferred").Deferred;
var o=u("ac-deferred").all;var p=/\w+\.(?:jpg|png)$/;var y={posterframe:"mediaObject-posterframe",endstate:"mediaObject-endstate"};
function x(a){this.container=a.container;this.mediaObject=a;this.enhanced=false;
this.posterframe=null;this.endstate=null;this.mediaObject.on(w.play,this._onPlay,this);
this.mediaObject.on(w.pause,this._onPause,this);this.mediaObject.on(w.ended,this._onEnded,this)
}var s=x.prototype;s.enhance=function(){var b=new q();var c;var a;var d=function(h){this.posterframe=h||null
}.bind(this);var f=function(h){this.endstate=h||null}.bind(this);var g=function(){if(this.mediaObject&&this.mediaObject._mediaElement){r.addClassName(this.container,"mediaObject-enhanced");
r.addClassName(this.mediaObject._mediaElement,"mediaObject-element");this.enhanced=true;
window.requestAnimationFrame(function(){if(this.mediaObject&&this.mediaObject._mediaElement){this.hideCoverElement(this.endstate);
this._inject();r.setStyle(this.mediaObject._mediaElement,{visibility:"hidden"});
window.requestAnimationFrame(function(){if(this.mediaObject&&this.mediaObject._mediaElement){r.getBoundingBox(this.mediaObject._mediaElement);
r.setStyle(this.mediaObject._mediaElement,{visibility:"visible"});b.resolve()}}.bind(this))
}}.bind(this))}}.bind(this);if(!this.enhanced){a=this._createCoverElement(this.mediaObject.mediaSrc.posterframeSrc,y.posterframe);
c=this._createCoverElement(this.mediaObject.mediaSrc.endstateSrc,y.endstate);a.then(d);
c.then(f);o([a,c]).then(g)}else{b.reject()}return b};s.degrade=function(){this.showCoverElement(this.endstate,false);
window.requestAnimationFrame(function(){this._remove();this.posterframe=null;this.endstate=null;
this.enhanced=false;r.addClassName(this.container,"mediaObject-degraded");this.mediaObject.destroy()
}.bind(this))};s._createCoverElement=function(a,d){var c;var b;if(p.test(a)){b=this._loadImage(a,d)
}else{c=r.select(a,this.container);b=new q().resolve(c)}return b};s._loadImage=function(a,c){var d=new n([a]);
function b(f){var g=f[0];g.width=g.width;g.height=g.height;g.alt="";g.className=c;
return g}return d.load().then(b)};s._inject=function(){r.insert(this.mediaObject._mediaElement,this.container);
[this.posterframe,this.endstate].forEach(function(a){if(a&&!this.container.contains(a)){r.insert(a,this.container)
}},this)};s._remove=function(){var a=[this.mediaObject._mediaElement];if(!p.test(this.mediaObject.posterframeSrc)){a.push(this.posterframe)
}a.forEach(function(b){if(r.isElement(b)&&this.container.contains(b)){this.container.removeChild(b)
}},this)};s.hideCoverElements=function(){this.hideCoverElement(this.posterframe);
this.hideCoverElement(this.endstate)};s.hideCoverElement=function(a,b){if(a){if(b){this._addOpacityTransition(a)
}else{this._removeTransition(a)}window.requestAnimationFrame(function(){r.setStyle(a,{opacity:0,zIndex:1})
}.bind(this))}};s.showCoverElement=function(a,b){var c=function(){this._removeTransition.bind(this,a);
r.removeVendorPrefixEventListener(a,"transitionEnd",c)}.bind(this);if(a){if(b){this._addOpacityTransition(a);
r.addVendorPrefixEventListener(a,"transitionEnd",c)}else{this._removeTransition(a)
}window.requestAnimationFrame(function(){r.setStyle(a,{opacity:1,zIndex:1001})}.bind(this))
}};s._removeTransition=function(a){r.setVendorPrefixStyle(a,"transition","none")
};s._addOpacityTransition=function(a){r.setVendorPrefixStyle(a,"transition","opacity "+this.mediaObject.options.transitionDuration+"s ease-out")
};s._onPlay=function(){r.removeClassName(this.container,"mediaObject-ended");r.addClassName(this.container,"mediaObject-playing");
this.hideCoverElements()};s._onPause=function(){r.removeClassName(this.container,"mediaObject-playing")
};s._onEnded=function(){r.removeClassName(this.container,"mediaObject-playing");
r.addClassName(this.container,"mediaObject-ended");if(this.endstateElement){this.showCoverElement(this.endstate,false)
}};v.exports=x},{"../../eventNames":933,"ac-asset-loader":37,"ac-base":false}],929:[function(q,r,n){var l=q("./KeyframeOnPause/ImageOverlayController");
var m,p=q("ac-object"),s=q("ac-clock");var o={overlayLoadDelay:250,overlayClassName:"image-overlay",overlayDirPath:"./overlay",overlayPrefix:"image_",overlayPattern:"####",overlayFileType:"png",clock:s};
var k=function(){};m=k.prototype;m.decorate=function(a,c){var b=p.defaults(o,c);
a.keyframeOnPauseController=new l(a,b);a.container.appendChild(a.keyframeOnPauseController.el);
return a};r.exports=new k()},{"./KeyframeOnPause/ImageOverlayController":930,"ac-clock":72,"ac-object":911}],930:[function(i,o,j){var l,m=i("ac-event-emitter").EventEmitter,k=i("ac-dom-emitter").DOMEmitter;
var n=function(a,b){this.mediaObject=a;this.options=b;this.active=false;this.el=this._createOverlay();
this._overlaySetTime=null;this._setEventTarget();this._bindEvents()};l=n.prototype;
l.applyOverlay=function(a){a=a||this.mediaObject.currentFrame();var c=this._getImagePath(a),b=this._getContainerDimensions(this.mediaObject.container);
this.el.style.backgroundImage="url("+c+")";this.el.style.backgroundSize=b.width+"px "+b.height+"px";
this.active=true;this.mediaObject.trigger("overlay-applied")};l.removeOverlay=function(){this.el.style.backgroundImage="inherit";
this.active=false;this.mediaObject.trigger("overlay-removed")};l._createOverlay=function(){var a=document.createElement("div");
a.className=this.options.overlayClassName;return a};l._onMetadataLoaded=function(){var a=this.mediaObject.width,b=this.mediaObject.height;
this.el.style.width=a;this.el.style.height=b};l._getContainerDimensions=function(b){b=b||this.mediaObject.container;
var c={width:b.offsetWidth,height:b.offsetHeight},a;if(!c.width||!c.height){a=b.getBoundingClientRect();
c.width=a.width;c.height=a.height}return c};l._getImagePath=function(a){var g=this.options.overlayDirPath,d=this.options.overlayFileType,b=this.options.overlayPrefix,c=this.options.overlayPattern,h=c.length,q=a+"",f=q.length;
while(f<h){q="0"+q;f++}return g+"/"+b+q+"."+d};l._bindEvents=function(){this._eventsTarget.on("timeupdate pause",this._onMediaObjectScrub,this);
this._eventsTarget.on("play",this._onMediaObjectPlay,this);this.options.clock.on("draw",this._clockApplyImageOverlay,this)
};l._setEventTarget=function(){this._eventsTarget=this.mediaObject._mediaEmitter
};l._onMediaObjectPlay=function(){this.removeOverlay()};l._onMediaObjectScrub=function(){this._debounceImageOverlay()
};l._debounceImageOverlay=function(){this._overlaySetTime=Date.now()+this.options.overlayLoadDelay
};l._clockApplyImageOverlay=function(){if(!this.mediaObject._media.paused||!this._overlaySetTime||this._overlaySetTime>Date.now()){return
}this._overlaySetTime=null;this.applyOverlay()};o.exports=n},{"ac-dom-emitter":877,"ac-event-emitter":false}],931:[function(k,j,h){var i=(function(){var a="http://images.apple.com/global/elements/blank.gif";
return a.replace(/global\/.*/,"")}());j.exports=function g(a){if(!!a.match(/(^http(s?))/)){return a
}if(a.match(/^\/(?!\/)/)){a=i+a.replace(/^\//,"");a=a.replace(/(^.+)(\/105\/)/,"$1/")
}return a}},{}],932:[function(o,m,i){var k=o("./MediaObject/Flow");var j=o("./MediaObject/Video");
var l=o("./MediaObject/decorators/KeyframeOnPause");m.exports=function n(d,a,b){b=b||{};
var c=null;if(b.type==="h264"){c=new j(d,a,b)}if(b.type==="flow"){c=new k(d,a,b)
}if(b.keyframeOverlay){c=l.decorate(c,b.keyframeOverlay)}return c}},{"./MediaObject/Flow":924,"./MediaObject/Video":927,"./MediaObject/decorators/KeyframeOnPause":929}],933:[function(d,g,f){g.exports={degrade:"degrade",destroy:"destroy",ended:"ended",enhance:"enhance",errored:"error",loaded:"loaded",loadstart:"loadstart",pause:"pause",play:"play",progress:"progress",ready:"ready",stop:"stop"}
},{}],934:[function(g,j,h){var i=g("./propertiesAreNull");j.exports=function k(b,a){if(typeof b.off==="function"){b.off()
}window.setTimeout(function(){var c;for(c in b){if(b.hasOwnProperty(c)){if(a&&b[c]&&typeof b[c].destroy==="function"&&!i(b[c])){b[c].destroy()
}b[c]=null}}})}},{"./propertiesAreNull":935}],935:[function(f,i,g){i.exports=function h(b){var c=true;
for(var a in b){if(b.hasOwnProperty(a)){if(b[a]!==null){c=false;break}}}return c
}},{}],936:[function(d,g,f){g.exports=d(759)},{"./extend":939,"ac-polyfills/Array/isArray":945}],937:[function(d,g,f){g.exports=d(29)
},{}],938:[function(d,g,f){arguments[4][30][0].apply(f,arguments)},{"./extend":939}],939:[function(d,g,f){g.exports=d(762)
},{"ac-polyfills/Array/prototype.forEach":946}],940:[function(d,g,f){g.exports=d(32)
},{}],941:[function(d,g,f){g.exports=d(764)},{"./clone":936,"./create":937,"./defaults":938,"./extend":939,"./getPrototypeOf":940,"./isDate":942,"./isEmpty":943,"./isRegExp":944,"./toQueryParameters":948}],942:[function(d,g,f){g.exports=d(33)
},{}],943:[function(d,g,f){g.exports=d(34)},{}],944:[function(d,g,f){g.exports=d(35)
},{}],945:[function(d,g,f){g.exports=d(768)},{}],946:[function(d,g,f){g.exports=d(191)
},{}],947:[function(d,g,f){g.exports=d(26)},{}],948:[function(d,g,f){g.exports=d(36)
},{qs:947}],949:[function(d,g,f){g.exports={ElementScrollTracker:d("./ac-scroll-tracker/ElementScrollTracker"),PooledScrollTracker:d("./ac-scroll-tracker/PooledScrollTracker"),ScrollTracker:d("./ac-scroll-tracker/ScrollTracker"),SmoothScrollTracker:d("./ac-scroll-tracker/SmoothScrollTracker")}
},{"./ac-scroll-tracker/ElementScrollTracker":950,"./ac-scroll-tracker/PooledScrollTracker":951,"./ac-scroll-tracker/ScrollTracker":952,"./ac-scroll-tracker/SmoothScrollTracker":953}],950:[function(s,t,r){var w=s("./ScrollTracker");
var p=s("./SmoothScrollTracker");var m=s("ac-event-emitter").EventEmitter;var o=s("ac-window-delegate").WindowDelegate;
var v=s("ac-object");var u=s("ac-dom-metrics");function n(b,a){m.call(this);this.el=b;
this._options=v.defaults(this.defaults,a||{});if(this._options.tracker){this.tracker=this._options.tracker
}else{if(this._options.smooth){this.tracker=new p()}else{this.tracker=new w()}}this.updateRange();
this.tracker.on("update",this._onUpdate,this);this.tracker.on("draw",this._onDraw,this);
o.on("resize orientationchange",this.updateRange,this)}var q=n.prototype=Object.create(m.prototype);
q.defaults={startThreshold:0,endThreshold:0,startOffset:0,endOffset:0,smooth:false};
q.updateRange=function(f){var h=u.getPagePosition(this.el);var a;var c;var d;var b;
var g;this._options=v.extend(this._options,f||{});this._startThreshold=this._options.startThreshold;
this._endThreshold=this._options.endThreshold;this._startOffset=this._options.startOffset;
this._endOffset=this._options.endOffset;if(this.tracker.getDirection()==="X"){a=o.clientWidth();
c=h.left;d=h.right}else{a=o.clientHeight();c=h.top;d=h.bottom}b=c-this._startThreshold*a+this._startOffset;
g=d-this._endThreshold*a+this._endOffset;if(g>b){this.tracker.setRange(b,g)}else{this.tracker.setRange(g,b)
}};q.getRangeStart=function(){return this.tracker.getRangeStart()};q.getRangeEnd=function(){return this.tracker.getRangeEnd()
};q.getDirection=function(){this.tracker.getDirection()};q.setDirection=function(a){this.tracker.setDirection(a)
};q.getProgress=function(){return this.tracker.getProgress()};q.getPosition=function(){return this.tracker.getPosition()
};q._onUpdate=function(a){this.trigger("update",a)};q._onDraw=function(a){this.trigger("draw",a)
};t.exports=n},{"./ScrollTracker":952,"./SmoothScrollTracker":953,"ac-dom-metrics":136,"ac-event-emitter":false,"ac-object":941,"ac-window-delegate":978}],951:[function(o,n,j){var k=o("./ScrollTracker");
var i=o("ac-object");function m(a){k.call(this,a);this._poolSize=this._options.poolSize;
this._pool=[];this._targetPosition=null}var l=m.prototype=Object.create(k.prototype);
l.defaults.poolSize=20;l._updateScrollData=function(a){a=k.prototype._updateScrollData.call(this,a);
a.target={position:this._position,lastPosition:(this._targetPosition===null)?this._position:this._targetPosition,positionDelta:this._position-this._targetPosition};
this._targetPosition=this._position;this._pushPoolData(a);this._eventData=i.clone(a);
this._position=this._eventData.position=Math.round(this._eventData.position);return this._eventData
};l._pushPoolData=function(a){this._pool.push(a);if(this._poolSize&&this._pool.length>this._poolSize){this._pool.shift()
}};n.exports=m},{"./ScrollTracker":952,"ac-object":941}],952:[function(q,s,p){var l=q("ac-event-emitter").EventEmitter;
var n=q("ac-dom-emitter").DOMEmitter;var m=q("ac-window-delegate").WindowDelegate;
var r=q("ac-clock");var t=q("ac-object");window.windowDelegate=m;function u(a){l.call(this);
this._options=t.defaults(this.defaults,a||{});this._clock=this._options.clock;this._target=this._options.target;
this.setRange(this._options.start,this._options.end);this.setDirection(this._options.direction);
if(this._target.nodeType){this._emitter=new n(this._target)}else{this._emitter=this._target
}this._scrollChanged=true;this._position=null;this._progress=0;this._emitter.on("scroll update",this._onScroll,this);
this._clock.on("update",this._onUpdate,this);this._clock.on("draw",this._onDraw,this);
this._clock.start()}var o=u.prototype=Object.create(l.prototype);o.defaults={start:0,end:0,direction:"Y",clock:r,target:m};
o.getRangeStart=function(){return this._rangeStart};o.setRangeStart=function(a){this._rangeStart=a;
this._updateProgress()};o.getRangeEnd=function(){return this._rangeEnd};o.setRangeEnd=function(a){this._rangeEnd=a;
this._updateProgress()};o.setRange=function(a,b){this._rangeStart=a;this._rangeEnd=b;
this._updateProgress()};o.getDirection=function(){return this._direction};o.setDirection=function(a){this._direction=a.toUpperCase();
this._direction=(this._direction==="X"?"X":"Y");this._scrollChanged=true};o.getPosition=function(){return this._position
};o.getProgress=function(){return this._progress};o._updateProgress=function(){if(this._rangeStart===this._rangeEnd){this._progress=0
}else{this._progress=(this._position-this._rangeStart)/(this._rangeEnd-this._rangeStart)
}};o._boundByRange=function(a){if(!this._rangeStart&&!this._rangeEnd){return a}return Math.min(Math.max(a,this._rangeStart),this._rangeEnd)
};o._targetScrollPosition=function(){var a;if(this._target.getPosition){a=this._target.getPosition()
}else{if(this._direction==="X"){a=this._target.scrollX||this._target.scrollTop}else{a=this._target.scrollY||this._target.scrollTop
}if(typeof a==="function"){a=a()}}return a};o._updateScrollData=function(a){var c=this._lastTime||0;
var b;a=t.clone(a);a.delta=a.time-c;a.position=this._boundByRange(this._targetScrollPosition());
b=(this._position===null?a.position:this._position);a.positionDelta=a.position-b;
a.lastPosition=b;this._position=a.position;this._lastTime=a.time;return this._eventData=a
};o._onScroll=function(a){this._scrollChanged=true};o._onUpdate=function(a){var b=(this._position===null);
if(!this._scrollChanged){return}this._updateScrollData(a);if(!b&&!this._eventData.positionDelta){this._scrollChanged=false;
return}this._updateProgress();this._eventData.progress=this._progress;this.trigger("update",this._eventData)
};o._onDraw=function(a){if(!this._scrollChanged){return}this._scrollChanged=false;
this.trigger("draw",this._eventData);this._eventData=null};s.exports=u},{"ac-clock":72,"ac-dom-emitter":106,"ac-event-emitter":false,"ac-object":941,"ac-window-delegate":978}],953:[function(i,o,j){var n=i("./PooledScrollTracker");
var l=100;function k(a){n.call(this,a);this._sampleTime=this._options.sampleTime
}var m=k.prototype=Object.create(n.prototype);m.defaults.sampleTime=l;m.smoothing=false;
m._updateScrollData=function(a){a=n.prototype._updateScrollData.call(this,a);this.smoothing=(a.position!==a.target.position);
return this._position};m._pushPoolData=function(a){var h=this._sampleTime;var b=0;
var f=0;var g=0;var c;var d;n.prototype._pushPoolData.call(this,a);if(!a.positionDelta){return
}g=a.delta;for(d=this._pool.length-2;d>=0;d--){c=this._pool[d];if(g>h){g=h}b+=c.position*g;
h-=g;g=c.delta;if(h===0){break}}if(h>0){b+=c.position*h;h=0}b+=a.position*(this._sampleTime/3);
b/=(this._sampleTime*4/3);if(Math.abs(Math.round(b)-Math.round(a.lastPosition))<2){if(a.position>a.lastPosition){b=Math.min(a.position,b+1)
}else{b=Math.max(a.position,b-1)}}a.position=b;a.positionDelta=a.position-a.lastPosition;
this._position=a.position};m._onUpdate=function(a){if(this.smoothing){this._scrollChanged=true
}n.prototype._onUpdate.call(this,a)};o.exports=k},{"./PooledScrollTracker":951}],954:[function(d,g,f){g.exports=d(249)
},{}],955:[function(d,g,f){arguments[4][87][0].apply(f,arguments)},{"./ac-dom-traversal/ancestor":956,"./ac-dom-traversal/ancestors":957,"./ac-dom-traversal/children":958,"./ac-dom-traversal/filterBySelector":959,"./ac-dom-traversal/firstChild":960,"./ac-dom-traversal/lastChild":963,"./ac-dom-traversal/matchesSelector":964,"./ac-dom-traversal/nextSibling":965,"./ac-dom-traversal/nextSiblings":966,"./ac-dom-traversal/previousSibling":967,"./ac-dom-traversal/previousSiblings":968,"./ac-dom-traversal/querySelector":969,"./ac-dom-traversal/querySelectorAll":970,"./ac-dom-traversal/shims/ie":971,"./ac-dom-traversal/siblings":972}],956:[function(n,l,o){var j=n("ac-dom-nodes");
var i=n("./matchesSelector");var k=n("./helpers/validate");l.exports=function m(a,b,c){k.childNode(a,true,"ancestors");
k.selector(b,false,"ancestors");if(c&&j.isElement(a)&&(!b||i(a,b))){return a}if(a!==document.body){while((a=a.parentNode)&&j.isElement(a)){if(!b||i(a,b)){return a
}if(a===document.body){break}}}return null}},{"./helpers/validate":962,"./matchesSelector":964,"ac-dom-nodes":148}],957:[function(n,m,o){var j=n("ac-dom-nodes");
var i=n("./matchesSelector");var k=n("./helpers/validate");m.exports=function l(a,c,d){var b=[];
k.childNode(a,true,"ancestors");k.selector(c,false,"ancestors");if(d&&j.isElement(a)&&(!c||i(a,c))){b.push(a)
}if(a!==document.body){while((a=a.parentNode)&&j.isElement(a)){if(!c||i(a,c)){b.push(a)
}if(a===document.body){break}}}return b}},{"./helpers/validate":962,"./matchesSelector":964,"ac-dom-nodes":148}],958:[function(d,g,f){arguments[4][90][0].apply(f,arguments)
},{"./filterBySelector":959,"./helpers/validate":962,"ac-dom-nodes":148}],959:[function(d,g,f){arguments[4][91][0].apply(f,arguments)
},{"./helpers/validate":962,"./matchesSelector":964}],960:[function(d,g,f){g.exports=d(92)
},{"./children":958,"./helpers/validate":962}],961:[function(d,g,f){g.exports=d(93)
},{}],962:[function(d,g,f){g.exports=d(94)},{"ac-dom-nodes":148}],963:[function(d,g,f){g.exports=d(95)
},{"./children":958,"./helpers/validate":962}],964:[function(o,n,p){var j=o("ac-dom-nodes");
var k=o("./helpers/nativeMatches");var l=o("./helpers/validate");var m=o("./vendor/sizzle/sizzle");
n.exports=function q(a,b){l.selector(b,true,"matchesSelector");if(!j.isElement(a)){return false
}if(!k){return m.matchesSelector(a,b)}return k.call(a,b)}},{"./helpers/nativeMatches":961,"./helpers/validate":962,"./vendor/sizzle/sizzle":973,"ac-dom-nodes":148}],965:[function(d,g,f){arguments[4][97][0].apply(f,arguments)
},{"./helpers/validate":962,"./matchesSelector":964,"ac-dom-nodes":148}],966:[function(d,g,f){arguments[4][98][0].apply(f,arguments)
},{"./helpers/validate":962,"./matchesSelector":964,"ac-dom-nodes":148}],967:[function(d,g,f){arguments[4][99][0].apply(f,arguments)
},{"./helpers/validate":962,"./matchesSelector":964,"ac-dom-nodes":148}],968:[function(d,g,f){arguments[4][100][0].apply(f,arguments)
},{"./helpers/validate":962,"./matchesSelector":964,"ac-dom-nodes":148}],969:[function(d,g,f){g.exports=d(101)
},{"./helpers/validate":962}],970:[function(d,g,f){g.exports=d(102)},{"./helpers/validate":962}],971:[function(m,l,h){var k=m("../vendor/sizzle/sizzle");
var i=m("ac-dom-nodes");var j=m("../helpers/validate");l.exports=function(a,b){if(b||!("querySelectorAll" in document)){a.querySelectorAll=function(g,d){var f;
var c;d=d||document;j.parentNode(d,true,"querySelectorAll","context");j.selector(g,true,"querySelectorAll");
if(i.isDocumentFragment(d)){f=a.children(d);c=[];f.forEach(function(p){var q;if(k.matchesSelector(p,g)){c.push(p)
}q=k(g,p);if(q.length){c=c.concat(q)}});return c}return k(g,d)};a.querySelector=function(d,c){var f;
c=c||document;j.parentNode(c,true,"querySelector","context");j.selector(d,true,"querySelector");
f=a.querySelectorAll(d,c);return f.length?f[0]:null}}}},{"../helpers/validate":962,"../vendor/sizzle/sizzle":973,"ac-dom-nodes":148}],972:[function(d,g,f){g.exports=d(104)
},{"./children":958,"./helpers/validate":962}],973:[function(d,g,f){g.exports=d(105)
},{}],974:[function(d,g,f){g.exports.Slider=d("./ac-slider/Slider")},{"./ac-slider/Slider":975}],975:[function(s,t,q){var w=s("ac-dom-traversal");
var n=s("ac-dom-events");var o=s("ac-event-emitter");var v=s("ac-dom-metrics");
var u={min:0,max:1,step:1,value:0,orientation:"horizontal",template:'<div class="ac-slider-runnable-track">\n\t<div class="ac-slider-thumb"></div>\n</div>'};
var m=Object.keys(u);var r=function(b,a){this.options=Object.assign({},u,a);this.model=Object.create(this.options);
this.el=b;b.className+=" ac-slider-container";b.innerHTML=this.model.template;this.initialize()
};r.prototype=Object.create(o.EventEmitter.prototype);var p=r.prototype;p.addEventListeners=function(){this.addEventListener(this.el,"mousedown",this.onMouseDown);
this.addEventListener(this.el,"touchstart",this.onTouchStart);this.addEventListener(this.el,"mouseover",this.onMouseOver);
this.addEventListener(this.el,"mouseleave",this.onMouseLeave);this.addEventListener(this.el,"touchend",this.onTouchEnd);
this.addEventListener(document,"touchend",this.onMouseUp)};p.addEventListener=n.addEventListener;
p.bindMethods=function(){this.onMouseDown=this.bindMethod(this.onMouseDown,this);
this.onTouchStart=this.bindMethod(this.onTouchStart,this);this.onMouseOver=this.bindMethod(this.onMouseOver,this);
this.onMouseLeave=this.bindMethod(this.onMouseLeave,this);this.onTouchEnd=this.bindMethod(this.onTouchEnd,this);
this.onMouseUp=this.bindMethod(this.onMouseUp,this);this.onMouseMove=this.bindMethod(this.onMouseMove,this);
this.onTouchMove=this.bindMethod(this.onTouchMove,this)};p.bindMethod=function(b,a){return b.bind(a)
};p.correctValueMinMax=function(b,c,a){if(b>a){b=a}if(b<c){b=c}return b};p.calculateStepsToValue=function(b,a){return Math.abs(b-a)
};p.calculateMaxSteps=function(b,a){return Math.abs(a-b)};p.calculateStepsEqualToPercentage=function(b,a){return(b/100)*a
};p.calculateNextStepInRange=function(b,h,a,c){var f=this.calculateMaxSteps(h,a);
var d=this.calculateStepsToValue(b,h);var g=h+(Math.floor(f/c)*c);b=Math.min(g,h+Math.round(d/c)*c);
return b};p.dispatchEvent=n.dispatchEvent;p.disableUserControls=function(){this.removeEventListeners()
};p.enableUserControls=function(){this.addEventListeners()};p.getNextValue=function(b,d,a,c){b=this.correctValueMinMax(b,d,a);
if(c!=="auto"){b=this.calculateNextStepInRange(b,d,a,c)}return b};p.getOrientation=function(){return this.model.orientation
};p.getValue=function(){return this.model.value};p.getMin=function(){return this.model.min
};p.getMax=function(){return this.model.max};p.getStep=function(){return this.model.step
};p.getClientXValue=function(j){var f=this.getClientXFromEvent(j);var i=v.getDimensions(this.thumbElement,true);
var d=v.getViewportPosition(this.thumbElement);var h=v.getDimensions(this.runnableTrackElement,true);
var g=v.getViewportPosition(this.runnableTrackElement);var b=f-this.runnableTrackElement.getBoundingClientRect().left-(i.width/2);
var k=h.width-i.width;var c=b/(k)*100;var a=this.calculateMaxSteps(this.getMin(),this.getMax());
var l=this.calculateStepsEqualToPercentage(c,a);return this.getMin()+l};p.getClientYValue=function(k){var g=this.getClientYFromEvent(k);
var i=v.getDimensions(this.thumbElement,true);var d=v.getViewportPosition(this.thumbElement);
var h=v.getDimensions(this.runnableTrackElement,true);var f=v.getViewportPosition(this.runnableTrackElement);
var l=h.height-i.height;var j=l-(g-this.runnableTrackElement.getBoundingClientRect().top-(i.height/2));
var c=j/(h.height-i.height)*100;var b=this.calculateMaxSteps(this.model.min,this.model.max);
var a=this.calculateStepsEqualToPercentage(c,b);return this.model.min+a};p.getClientValue=function(b){b=b.originalEvent||b;
var a;if(this.model.orientation==="horizontal"){a=this.getClientXValue(b)}else{a=this.getClientYValue(b)
}return a};p.getClientXFromEvent=function(a){return a.touches?a.touches[0].clientX:a.clientX
};p.getClientYFromEvent=function(a){return a.touches?a.touches[0].clientY:a.clientY
};p.initialize=function(){this.setNodeReferences();this.setValue(this.model.value);
this.bindMethods();this.addEventListeners()};p.onMouseLeave=function(){this.preventDocumentMouseUpDispatch=false
};p.onMouseDown=function(b){var a=this.getClientValue(b);this.addEventListener(document,"mouseup",this.onMouseUp);
this.addEventListener(document,"mousemove",this.onMouseMove);this.trigger("grab",this.getValue());
this.setValue(a)};p.onMouseUp=function(){this.removeEventListener(document,"mouseup",this.onMouseUp);
this.removeEventListener(document,"mousemove",this.onMouseMove);this.trigger("release",this.getValue());
if(!this.preventDocumentMouseUpDispatch){this.dispatchEvent(this.el,"mouseup")}};
p.onMouseOver=function(){this.preventDocumentMouseUpDispatch=true};p.onTouchEnd=function(){this.removeEventListener(document,"touchend",this.onTouchEnd);
this.removeEventListener(document,"touchmove",this.onTouchMove);this.trigger("release",this.getValue());
if(!this.preventDocumentMouseUpDispatch){this.dispatchEvent(this.el,"touchend")
}};p.onTouchStart=function(b){var a=this.getClientValue(b);this.addEventListener(document,"touchend",this.onMouseUp);
this.addEventListener(document,"touchmove",this.onTouchMove);this.trigger("grab",this.getValue());
this.setValue(a)};p.onMouseMove=function(b){var a=this.getClientValue(b);this.setValue(a)
};p.onTouchMove=function(b){if(b.preventDefault){b.preventDefault()}var a=this.getClientValue(b);
this.setValue(a)};p.getElementOrientationOffsetValue=function(b,a){if(a==="horizontal"){return v.getDimensions(b).width
}return v.getDimensions(b).height};p.getAvailableRunnableTrack=function(b,a){var c=this.getElementOrientationOffsetValue(this.thumbElement,a);
return b-c};p.getPercentageByValue=function(b,a){b=this.calculateStepsToValue(b,this.getMin());
a=this.calculateMaxSteps(this.getMin(),this.getMax());return(b/a)*100};p.getPercentageOfRunnableTrack=function(c){var g=this.getOrientation();
var b=this.getElementOrientationOffsetValue(this.runnableTrackElement,g);var a=this.getAvailableRunnableTrack(b,g);
var d=this.getPercentageByValue(c,this.getMax());var f=(d/100)*a;return(f/b)*100
};p.onChange=function(b){var a=this.getPercentageOfRunnableTrack(b);if(this.getOrientation()==="horizontal"){if(!isNaN(a)){this.thumbElement.style.left=a+"%"
}}else{if(!isNaN(a)){this.thumbElement.style.bottom=a+"%"}}this.trigger("change",this.getValue())
};p.removeEventListeners=function(){this.removeEventListener(this.el,"mousedown",this.onMouseDown);
this.removeEventListener(this.el,"touchstart",this.onTouchStart);this.removeEventListener(this.el,"mouseover",this.onMouseOver);
this.removeEventListener(this.el,"mouseleave",this.onMouseLeave);this.removeEventListener(this.el,"touchend",this.onTouchEnd);
this.removeEventListener(document,"touchend",this.onMouseUp)};p.removeEventListener=n.removeEventListener;
p.setNodeReferences=function(){this.runnableTrackElement=w.querySelector(".ac-slider-runnable-track",this.el);
this.thumbElement=w.querySelector(".ac-slider-thumb",this.el)};p.setOrientation=function(a){this.set("orientation",a)
};p.setValue=function(a){a=this.getNextValue(a,this.getMin(),this.getMax(),this.getStep());
this.set("value",a);this.onChange(a)};p.setMin=function(a){this.set("min",a)};p.setMax=function(a){this.set("max",a)
};p.setStep=function(a){this.set("step",a)};p.set=function(a,b){if(m.indexOf(a)>-1&&this.model[a]!==b){var c=this.model[a];
this.model[a]=b;this.trigger("change:model:"+a,{previous:c,current:b})}};t.exports=r
},{"ac-dom-events":954,"ac-dom-metrics":136,"ac-dom-traversal":955,"ac-event-emitter":false}],976:[function(d,g,f){g.exports=d(271)
},{"./ac-shared-instance/SharedInstance":977}],977:[function(d,g,f){g.exports=d(272)
},{}],978:[function(d,g,f){arguments[4][273][0].apply(f,arguments)},{"./ac-window-delegate/WindowDelegate":981,"./ac-window-delegate/WindowDelegateCustomEvent":982,"./ac-window-delegate/WindowDelegateOptimizer":983}],979:[function(d,g,f){g.exports=d(274)
},{"ac-event-emitter":false}],980:[function(d,g,f){g.exports=d(275)},{"ac-event-emitter":false}],981:[function(x,z,v){var t;
var y=x("ac-shared-instance").SharedInstance,q=x("ac-dom-emitter").DOMEmitter,s=x("./OptimizerController"),w=x("./CustomEventController"),u=x("./queries/queries"),p=x("./optimizers/optimizers");
var r="ac-window-delegate:WindowDelegate",A="3.0.0-4";function o(){this._emitter=new q(window);
this._controllers={optimizer:new s(p),customEvent:new w()};var a;for(a in u){if(u.hasOwnProperty(a)){this[a]=this._getProperty.bind(this,a);
u[a]=u[a].bind(this)}}this._bindEvents()}t=o.prototype;t.on=function(d,a,c){var b=this._seperateCustomEvents(d);
this._optimizeEvents(b.standardEvents);this._customEventOn(b.customEvents,a,c);
this._emitterOn.apply(this,arguments);return this};t.once=function(d,a,c){var b=this._seperateCustomEvents(d);
this._optimizeEvents(b.standardEvents);this._customEventOnce(b.customEvents,a,c);
this._emitterOnce.apply(this,arguments);return this};t.off=function(g,a,f){var b=this._seperateCustomEvents(g),d=false;
if(!g){d=true}this._customEventOff(b.customEvents,a,f,d);this._emitterOff.apply(this,arguments);
if(d){try{var h;for(h in this._controllers.optimizer._events){if(this._controllers.optimizer._events.hasOwnProperty(h)&&this._shouldDeoptimizeEvent(h,true)){this._deoptimizeEvent(h)
}}this._bindEvents()}catch(c){}}return this};t.has=function(c,a,b){return this._emitter.has.apply(this._emitter,arguments)
};t.trigger=function(){this._emitter.trigger.apply(this._emitter,arguments);return this
};t.emitterTrigger=function(){this._emitter.emitterTrigger.apply(this._emitter,arguments);
return this};t.propagateTo=function(){this._emitter.propagateTo.apply(this._emitter,arguments);
return this};t.stopPropagatingTo=function(){this._emitter.stopPropagatingTo.apply(this._emitter,arguments);
return this};t.addOptimizer=function(a){this._controllers.optimizer.add(a);return this
};t.addCustomEvent=function(a){this._controllers.customEvent.add(a);return this
};t._emitterOn=function(){this._emitter.on.apply(this._emitter,arguments)};t._emitterOnce=function(){this._emitter.once.apply(this._emitter,arguments)
};t._emitterOff=function(){this._emitter.off.apply(this._emitter,arguments)};t._onEventUnbound=function(a){var b=a.data.evt;
if(this._shouldDeoptimizeEvent(b)){this._deoptimizeEvent(b)}};t._customEventOn=function(c,a,b){if(c.length===0){return
}this._controllers.customEvent.on(c.join(" "),a,b)};t._customEventOnce=function(c,a,b){if(c.length===0){return
}this._controllers.customEvent.once(c.join(" "),a,b)};t._customEventOff=function(d,a,c,b){if(!b&&d.length===0){return
}if(b&&d.length===0){this._controllers.customEvent.off();return}this._controllers.customEvent.off(d.join(" "),a,c)
};t._getProperty=function(a,c){var b=null;if(!c){b=this._getOptimizedValue(a)}if(b===null){b=u[a].call(this,c)
}return b};t._optimizeEvents=function(b){var c,a,d=b.length;for(a=0;a<d;a++){c=b[a];
if(this._shouldOptimizeEvent(c)){this._optimizeEvent(c)}}};t._shouldOptimizeEvent=function(a){if(this._controllers.optimizer.canOptimizeEvent(a)&&!this._controllers.optimizer.isOptimizingEvent(a)){return true
}return false};t._shouldDeoptimizeEvent=function(b,a){if(this._controllers.optimizer.isOptimizingEvent(b)&&(a||this._emitter._eventEmitter._events[b].length<=1)){return true
}return false};t._optimizeEvent=function(a){var b=this._controllers.optimizer.getOptimizerByEvent(a);
b.activate();this._emitterOn(a,b.callback,b)};t._deoptimizeEvent=function(a){var b=this._controllers.optimizer.getOptimizerByEvent(a);
b.deactivate();this._emitterOff(a,b.callback,b)};t._getOptimizedValue=function(a){return this._controllers.optimizer.get(a)
};t._seperateCustomEvents=function(b){var f={customEvents:[],standardEvents:[]};
if(typeof b==="string"){var a=b.split(" "),d,c,g=a.length;for(c=0;c<g;c++){d=a[c];
if(this._controllers.customEvent.canHandleCustomEvent(d)){f.customEvents.push(d)
}else{f.standardEvents.push(d)}}}return f};t._bindEvents=function(){this._emitter.on("dom-emitter:didoff",this._onEventUnbound,this)
};z.exports=y.share(r,A,o)},{"./CustomEventController":979,"./OptimizerController":980,"./optimizers/optimizers":986,"./queries/queries":995,"ac-dom-emitter":106,"ac-shared-instance":976}],982:[function(d,g,f){g.exports=d(277)
},{"ac-event-emitter":false}],983:[function(d,g,f){g.exports=d(278)},{"ac-event-emitter":false}],984:[function(d,g,f){g.exports=d(279)
},{"../../WindowDelegateOptimizer":983,"../../queries/queries":995}],985:[function(d,g,f){g.exports=d(280)
},{"../../WindowDelegateOptimizer":983,"../../queries/queries":995}],986:[function(d,g,f){g.exports=d(281)
},{"./events/resize":984,"./events/scroll":985}],987:[function(d,g,f){g.exports=d(282)
},{}],988:[function(d,g,f){g.exports=d(283)},{}],989:[function(d,g,f){g.exports=d(284)
},{}],990:[function(d,g,f){g.exports=d(285)},{}],991:[function(d,g,f){g.exports=d(286)
},{}],992:[function(d,g,f){g.exports=d(287)},{}],993:[function(d,g,f){g.exports=d(288)
},{}],994:[function(d,g,f){g.exports=d(289)},{}],995:[function(d,g,f){g.exports=d(290)
},{"./methods/clientHeight":987,"./methods/clientWidth":988,"./methods/innerHeight":989,"./methods/innerWidth":990,"./methods/maxScrollX":991,"./methods/maxScrollY":992,"./methods/scrollX":993,"./methods/scrollY":994}],996:[function(V,ae,O){var aa=V("ac-dom-traversal");
var J=V("ac-dom-styles");var F=V("ac-dom-metrics");var ad=V("ac-classlist");var Q=V("ac-feature");
var L=V("ac-window-delegate").WindowDelegate;var ag=V("ac-scroll-tracker").SmoothScrollTracker;
var W=V("ac-dom-emitter").DOMEmitter;var S=V("../shared/ParallaxController");var X=V("./HeroIntro/getParallaxOptions");
var Y=V("../shared/ClassTransition");var U=V("./HeroIntro/HeroIntroVideo");var N=V("./HeroIntro/HeroIntroTall");
var M=V("./HeroIntro/ScrollCTA");var R=3500;var af=10000;var ah=500;var ac="with-herointro-video";
var ab="with-herointro-novideo";var Z="with-herointro-staticfilmlist";var H=V("./HeroIntro/scrollDistance");
var G=V("ac-browser");var I=G.name.match(/ie/i)&&G.version<9;var ai=G.name.match(/chrome/i);
var P=document.body;var T=function(){this.init()};var K=T.prototype;K.init=function(a){if(!Q.cssPropertyAvailable("transition")){this._unblockImages();
return}this._container=aa.querySelector(".herointro");this._startFrame=aa.querySelector(".herointro-start");
this._offsetEl=aa.querySelector(".herointro-lockup");this._copyEl=aa.querySelector(".herointro-copy");
this._filmListEl=aa.querySelector(".herointro-filmlist");this._filmListEnabled=true;
this._staticFilmListEnabled=false;this._scrollTracker=new ag({end:H});this._video=new U(this._scrollTracker);
this._videoProgressThreshold=R/af;this._videoVisible=false;this._tall=typeof this._tall=="undefined"?false:this._tall;
ad.add(P,"with-herointro");if(this._video.supported()){this._video.on("progress",this._onVideoProgress,this);
this._video.once("loaded",this._onVideoLoaded,this);this._video.load()}else{this._video=false
}if(a){this._didReveal()}else{this._prepareReveal();this._preloadImages()}this.reveal=this.reveal.bind(this);
L.on("resize",this._updateOffset,this);this.start()};K.toggle=function(b){var a=b?"init":"_onMaxDelay";
this[a](true)};K.start=function(){this._updateVideoState();if(this._video){this._revealTimeout=setTimeout(this._onMaxDelay.bind(this),R)
}else{this.reveal()}};K.reveal=function(){clearTimeout(this._revealTimeout);this._revealTimeout=null;
if(!this._video||this._video.progress>=0.5){ad.add(P,"fadein-fast")}if(this._video){if(!this._tall){this._tall=new N(this._copyEl)
}this._cta.reveal()}this._updateOffset();this._reveal.enter()};K._preloadImages=function(){};
K._onVideoProgress=function(){if(this._video.progress>this._videoProgressThreshold){this._video.off("progress",this._onVideoProgress,this);
this.reveal()}};K._updateVideoState=function(a){if(this._video){ad.add(P,ac);ad.remove(P,ab);
this._finalRevealEl=this._startFrame}else{ad.remove(P,ac);ad.add(P,ab);this._unblockImages();
this._finalRevealEl=aa.querySelector(".herointro-static")}this._updateOffset()};
K._onVideoLoaded=function(){this._unblockImages()};K._deleteVideoEl=function(){if(this._video){var a=this._video.el;
var b=aa.querySelector(".mediaObject-element");if(b){a.removeChild(b)}}};K._onMaxDelay=function(){if(this._video){this._video.off("progress",this._onVideoProgress,this);
this._deleteVideoEl();this._video=false;this._updateVideoState();this.reveal()}if(!I){L.trigger("resize")
}};K._unblockImages=function(){ad.remove(P,"blockimages")};K._prepareReveal=function(){this._revealEventCount=0;
this._reveal=new Y(document.body,"fadein",{didTransitionEnd:this._isRevealComplete.bind(this)});
this._reveal.on("did-transition",this._didReveal,this);this._cta=new M(aa.querySelector(".scrollcta"),H)
};K._isRevealComplete=function(a){if(a.target===this._finalRevealEl){this._revealEventCount++
}return(this._revealEventCount===2)};K._didReveal=function(){if(this._video.loaded){this._prepareParallax()
}else{}};K._prepareParallax=function(){var a=X(this._scrollTracker);this._parallaxController=new S(a);
this._scrollTracker.on("draw",this._onScrollDraw,this);this._onScrollDraw()};K._updateOffset=function(){var b=0;
var a;if(this._video){this._startFrameTop=F.getPagePosition(this._startFrame).top||this._startFrameTop||0;
a=L.clientHeight();if(this._tall&&this._tall.enabled){a-=F.getDimensions(this._copyEl).height
}b=Math.min(Math.max(a/2-this._startFrameTop,-100),200)}if(this._offset!==b){this._offset=b;
this._drawOffset()}};K._onScrollDraw=function(c){if(!this._video.el){return}var b=c?c.progress:this._scrollTracker.getProgress();
var a;if(!this._videoVisible&&b){J.setStyle(this._startFrame,{visibility:"hidden"});
J.setStyle(this._video.el,{opacity:1});this._videoVisible=true}if(b===1){this._cta.hide()
}else{this._cta.show()}if(b<100/H){this._enableFilmList()}else{this._disableFilmList()
}a=(b>=0.6);if(a!==this._staticFilmListEnabled){this._staticFilmListEnabled=a;ad.toggle(P,Z,a)
}this._drawOffset()};K._drawOffset=function(){var a;if(this._offset){a=this._offset*(1-this._scrollTracker.getProgress());
var b={translateY:a+"px"};if(!ai){b.translateZ=0}J.setStyle(this._offsetEl,b)}else{J.setStyle(this._offsetEl,{transform:""})
}};K._enableFilmList=function(){if(!this._filmListEnabled){J.setStyle(this._filmListEl,{display:""});
this._filmListEnabled=true}};K._disableFilmList=function(){if(this._filmListEnabled){J.setStyle(this._filmListEl,{display:"none"});
this._filmListEnabled=false}};ae.exports=T},{"../shared/ClassTransition":1004,"../shared/ParallaxController":1006,"./HeroIntro/HeroIntroTall":997,"./HeroIntro/HeroIntroVideo":998,"./HeroIntro/ScrollCTA":999,"./HeroIntro/getParallaxOptions":1000,"./HeroIntro/scrollDistance":1001,"ac-browser":54,"ac-classlist":65,"ac-dom-emitter":106,"ac-dom-metrics":136,"ac-dom-styles":172,"ac-dom-traversal":183,"ac-feature":301,"ac-scroll-tracker":949,"ac-window-delegate":978}],997:[function(w,A,t){var C=w("ac-dom-metrics");
var r=w("ac-dom-nodes");var u=w("ac-classlist");var p=w("ac-window-delegate").WindowDelegate;
var z=1200;var x=1069;var q="with-herointro-tall";var v="with-herointro-tall-complete";
var y=document.body;var B=function(a){this.elSource=a;this._prepareFixedElement();
p.on("resize",this._updateEnabled,this);this._updateOffset=this._updateOffset.bind(this);
this._updateEnabled()};var s=B.prototype;s.enabled=false;s.complete=false;s._disable=function(){p.off("scroll",this._updateComplete,this);
u.remove(y,q,v);this.enabled=false;this.complete=false};s._enable=function(){p.on("scroll",this._updateComplete,this);
u.add(y,q);this.enabled=true;this._updateOffset()};s._prepareFixedElement=function(){this.elFixed=this.elSource.cloneNode(true);
this.elFixed.setAttribute("aria-hidden","true");u.add(this.elFixed,"fixed");r.insertLastChild(this.elFixed,document.body)
};s._rafUpdateOffset=function(){window.requestAnimationFrame(this._updateOffset)
};s._updateOffset=function(){var a;if(!this.enabled){this._elSourceTop=0;this._elFixedTop=0
}else{this._elFixedTop=C.getPosition(this.elFixed).top||this._elFixedTop;this._elSourceTop=C.getPagePosition(this.elSource).top||this._elSourceTop;
this._updateComplete()}};s._updateEnabled=function(){var a=p.clientHeight();var c=p.clientWidth();
var b=(a>=z&&c>=x);if(b===this.enabled){this._updateOffset();return}if(b){this._enable()
}else{this._disable()}};s._updateComplete=function(){var a=p.scrollY();var b=(this._elFixedTop>=this._elSourceTop-a);
if(this.complete!==b){this.complete=b;u.toggle(y,v,this.complete)}};A.exports=B
},{"ac-classlist":65,"ac-dom-metrics":136,"ac-dom-nodes":148,"ac-window-delegate":978}],998:[function(B,C,A){var D=B("ac-dom-traversal");
var v=B("ac-feature");var q=B("ac-event-emitter").EventEmitter;var w=B("../../shared/mediaObjectHelper");
var x=B("../../shared/MediaObjectScrollPlayer");var E=B("ac-scroll-tracker").ScrollTracker;
var z=B("ac-clock").ThrottledClock;var r=B("../../shared/canPlayH264");var u=B("ac-browser");
var t=200;var s=function(a){q.call(this);this.el=D.querySelector(".herointro-video");
if(this._isBrowserThrottled()){this._scrollTracker=this._createThrottledScrollTracker(a)
}else{this._scrollTracker=a}this._boundUpdateProgress=this._updateProgress.bind(this)
};var y=s.prototype=Object.create(q.prototype);y.loaded=false;y.progress=0;y.load=function(){if(!this.supported()){return
}this._prepareVideo();this._updateProgress()};y.supported=function(){return(this._isBrowserSupported()&&r()&&!v.touchAvailable())
};y._isBrowserSupported=function(){return !!(u.name.match(/safari|chrome/i))};y._isBrowserThrottled=function(){return !!(u.name.match(/chrome/i))
};y._createThrottledScrollTracker=function(a){var b=new z(30);var c=new E({target:a,clock:b,start:a.getRangeStart(),end:a.getRangeEnd()});
b.start();return c};y._updateProgress=function(){var d=0;var a;var b;var c;if(this._mediaObject.loaded){d=1
}else{a=this._mediaObject.getChunks();b=a.length;if(b!==0){for(c=0;c<b;c++){if(a[c].isLoaded()){d++
}}d/=b}}if(this.progress!==d){this.progress=d;this.trigger("progress",this.progress);
if(this.progress===1){this.loaded=true;this.trigger("loaded")}}if(this.progress<1){this._progressTimeout=setTimeout(this._boundUpdateProgress,t)
}};y._prepareVideo=function(){this._mediaObject=w.createVideo(this.el,"hero",true);
this._player=new x(this._mediaObject,this._scrollTracker);this.trigger("loading")
};C.exports=s},{"../../shared/MediaObjectScrollPlayer":1005,"../../shared/canPlayH264":1009,"../../shared/mediaObjectHelper":1011,"ac-browser":54,"ac-clock":72,"ac-dom-traversal":183,"ac-event-emitter":false,"ac-feature":301,"ac-scroll-tracker":949}],999:[function(r,s,q){var u=r("ac-dom-traversal");
var n=r("ac-dom-styles");var m=r("ac-dom-emitter").DOMEmitter;var l=r("../../shared/ClassTransition");
var p=r("../../shared/scroller/smoothScrollTo");var t=function(b,a){this.el=b;this.scrollY=a;
this._emitter=new m(this.el);this._emitter.on("click",this._scrollToEnd,this);this._finalRevealEl=u.querySelector(".scrollcta-copy",this.el);
this._reveal=new l(this.el,"reveal",{didTransitionEnd:this._isRevealComplete.bind(this)})
};var o=t.prototype;o.visible=true;o.reveal=function(){this._reveal.enter()};o._isRevealComplete=function(a){return(a.target===this._finalRevealEl)
};o._scrollToEnd=function(a){p(0,this.scrollY+1,{duration:2.5})};o.hide=function(){if(this.visible){n.setStyle(this.el,{display:"none"});
this.visible=false}};o.show=function(){if(!this.visible){n.setStyle(this.el,{display:""});
this.visible=true}};s.exports=t},{"../../shared/ClassTransition":1004,"../../shared/scroller/smoothScrollTo":1014,"ac-dom-emitter":106,"ac-dom-styles":172,"ac-dom-traversal":183}],1000:[function(o,n,i){var k=o("ac-scroll-tracker").SmoothScrollTracker;
var m=o("ac-scroll-tracker").ScrollTracker;var j=o("./scrollDistance");n.exports=function l(d){var b=new m({end:100});
var c=new m({end:j-300});var a=new k({start:j-200,end:j});return[{selector:".herointro-video",from:0,to:240,off:0,z:false,scrollTracker:d},{selector:".herointro-filmlist",clipOptions:{propsFrom:{translateY:0,opacity:1},propsTo:{translateY:(80*j/100),opacity:(1-(j/100))},propsOff:{translateY:0,opacity:1},units:{translateY:"px"}},scrollTracker:d},{selector:".herointro-headline",clipOptions:{propsFrom:{translateY:0,opacity:1},propsTo:{translateY:80,opacity:0},propsOff:{translateY:0,opacity:1},units:{translateY:"px"}},scrollTracker:c},{selector:".herointro-shadow",clipOptions:{ease:"easeInCirc",propsFrom:{opacity:0},propsTo:{opacity:0.8},propsOff:{opacity:0}},scrollTracker:a},{selector:".herointro-shadow",clipOptions:{propsFrom:{scaleY:4,scaleX:1.5,translateX:-20,translateY:20},propsTo:{scaleY:1,scaleX:1,translateX:0,translateY:0},propsOff:{scaleY:4,scaleX:1.5,translateX:-20,translateY:20},units:{translateX:"px",translateY:"px"}},scrollTracker:a},{selector:".scrollcta",clipOptions:{propsFrom:{opacity:1,translateY:0},propsTo:{opacity:0,translateY:12},propsOff:{opacity:1,translateY:0},units:{translateY:"px"}},scrollTracker:b},{selector:".scrollcta-copy",from:0,to:-12,off:0,scrollTracker:b}]
}},{"./scrollDistance":1001,"ac-scroll-tracker":949}],1001:[function(d,g,f){g.exports=580
},{}],1002:[function(k,j,h){var i=k("ac-dom-traversal");var g=k("ac-scroll-tracker").ElementScrollTracker;
j.exports=function(){var b=i.querySelector(".image-wireless");var a=new g(b,{smooth:true,startThreshold:1,startOffset:200,endThreshold:0.2});
return[{selector:".image-colors",from:-150,to:100,off:0},{selector:".image-trackpad",from:-100,to:0,off:0,clipOptions:{ease:"easeOutQuad"}},{selector:".image-wireless",from:-200,to:0,off:0,scrollTracker:a},{selector:".image-wireless-bottom-shadow",clipOptions:{ease:"easeInQuad",propsFrom:{opacity:0,scale:4},propsTo:{opacity:1,scale:1},propsOff:{opacity:0,scale:4}},scrollTracker:a},{selector:".image-osx",from:100,to:-150,off:0},{selector:".image-builtinapps",from:-150,to:0,off:0}]
}},{"ac-dom-traversal":183,"ac-scroll-tracker":949}],1003:[function(L,Q,z){var D=L("ac-ajax");
var N=L("ac-dom-traversal");var G=L("ac-element-engagement").ElementEngagement;
var P=L("ac-classlist");var E=L("../shared/create-localnav");var C=L("./HeroIntro");
var K=L("../shared/ParallaxController");var M=L("./getParallaxOptions");var A=L("../shared/resetScrollOnRefresh");
var J=L("../shared/RevealController");var R=L("ac-feature");var B=L("ac-films");
var x=L("ac-window-delegate").WindowDelegate;var F=L("ac-browser");var O=L("@marcom/ac-viewport-emitter");
var H=F.name.match(/ie/i)&&F.version<9;var S=F.name.match(/chrome/i);var y=x.clientWidth()<=735&&P.contains(N.querySelector("html"),"fluid-support");
var I=(function(){return{initialize:function(){if(!document.getElementById("ac-localnav")){E()
}this.heroIntro=new C();if(y||S){this.heroIntro.toggle(false)}this.reveal();this.parallax();
this.video();A.initialize();O.on("change",this.updateCreativeTech.bind(this));return this
},updateCreativeTech:function(b){var a=!S&&(b.to=="medium"||b.to=="large");this.parallax();
this.parallaxController.start();this.heroIntro.toggle(a)},video:function(){var b=N.querySelectorAll("[data-modal]");
var a=B.create(b,{modal:true})},parallax:function(){if(this.parallaxController){this.parallaxController=null
}this.parallaxController=new K(M())},reveal:function(){var c=N.querySelectorAll(".badge, .section-wireless .service, .section-usb-c");
var b=new J(c);var d=N.querySelector(".internals-layer-bottom");var a=0;b.addElement({selector:".section-internals .internals",didTransitionEnd:function(g,f){return g.target===d
}});b.addElement({selector:".section-battery .battery",didTransitionEnd:function(g,f){a++;
return(a===4)}})}}}());Q.exports=I.initialize()},{"../shared/ParallaxController":1006,"../shared/RevealController":1008,"../shared/create-localnav":1010,"../shared/resetScrollOnRefresh":1012,"./HeroIntro":996,"./getParallaxOptions":1002,"@marcom/ac-viewport-emitter":12,"ac-ajax":13,"ac-browser":54,"ac-classlist":65,"ac-dom-traversal":183,"ac-element-engagement":222,"ac-feature":301,"ac-films":824,"ac-window-delegate":978}],1004:[function(D,L,v){var w=D("ac-object");
var B=D("ac-feature");var K=D("ac-classlist");var F=D("ac-dom-emitter").DOMEmitter;
var u=D("ac-clock");var z=D("ac-element-engagement").ElementEngagement;var G=D("ac-event-emitter").EventEmitter;
var y=B.cssPropertyAvailable("transition");var C={};var J="transition";var E="can-";
var M="will-";var x="did-";var I="replay-";var H=function(a,b,c){G.call(this);this.el=a;
this._className=b;c=w.defaults(C,c);this._didTransitionEnd=c.didTransitionEnd||null;
this._transitionEndEl=c.transitionEndElement||this.el;this._domEmitter=new F(this._transitionEndEl);
this.entered=this._hasTransitionEndListener=false;this._resolve=this._reject=this._promise=this._nextDraw=null;
this._setCallbacks=this._setCallbacks.bind(this);this._canTransition()};var A=H.prototype=Object.create(G.prototype);
A._setCallbacks=function(a,b){this._resolve=a;this._reject=b};A._cleanup=function(){this._resolve=this._reject=this._promise=this._nextDraw=null
};A._canTransition=function(){K.add(this.el,E+this._className);this.trigger(E+J,this)
};A._replayTransition=function(){K.add(this.el,I+this._className);this._nextDraw=this._willTransition;
u.once("draw",this._nextDraw,this);this.trigger(I+J,this)};A._willTransition=function(){K.add(this.el,M+this._className);
this._nextDraw=this._onTransition;u.once("draw",this._nextDraw,this);this.trigger(M+J,this)
};A._onTransition=function(){K.add(this.el,this._className);if(y){this._hasTransitionEndListener=true;
this._domEmitter.on("transitionend",this._onTransitionEnd,this)}else{this._nextDraw=this._didTransition;
u.once("draw",this._nextDraw,this)}this.trigger(J,this)};A._didTransition=function(){K.add(this.el,x+this._className);
K.remove(this.el,I+this._className);this.entered=true;this._resolve();this.trigger(x+J,this);
this._cleanup()};A._onTransitionEnd=function(b){var a;if(this._isTransitionEnd(b)){this._hasTransitionEndListener=false;
this._domEmitter.off("transitionend",this._onTransitionEnd,this);this._nextDraw=this._didTransition;
u.once("draw",this._nextDraw,this)}};A._isTransitionEnd=function(b){var a=(b.target===this._transitionEndEl);
if(this._didTransitionEnd){return this._didTransitionEnd(b,a)}return a};A.enter=function(a){if(this.entered){}if(this._promise){return this._promise
}this._promise=new Promise(this._setCallbacks);if(a===true){this._nextDraw=this._replayTransition
}else{this._nextDraw=this._willTransition}u.once("draw",this._nextDraw,this);return this._promise
};A.exit=function(){if(this._promise){this._reject();this._cleanup()}this.entered=false;
K.remove(this.el,x+this._className);K.remove(this.el,this._className);K.remove(this.el,M+this._className)
};A.replay=function(){this.exit();return this.enter(true)};L.exports=H},{"ac-classlist":65,"ac-clock":72,"ac-dom-emitter":106,"ac-element-engagement":222,"ac-event-emitter":false,"ac-feature":301,"ac-object":941}],1005:[function(n,m,j){var o=n("ac-object");
var i=n("ac-scroll-tracker").ElementScrollTracker;function k(a,b){this.mediaObject=a;
this.scrollTracker=b||null;this.start()}var l=k.prototype;l.start=function(){if(!this.mediaObject.ready){if(!this.mediaObject.loader){this.mediaObject.load()
}this.mediaObject.once("ready",this.start,this);return}if(!this.mediaObject.view.enhanced){this.mediaObject.enhance();
this.mediaObject.once("enhance",this.start,this);return}if(!this.scrollTracker){this.scrollTracker=new i(this.mediaObject.container)
}else{if(this.scrollTracker.updateRange){this.scrollTracker.updateRange()}}this.scrollTracker.on("draw",this._draw,this);
this._draw()};l.stop=function(){this.scrollTracker.off("draw",this._draw)};l._draw=function(b){var a=b?b.progress:this.scrollTracker.getProgress();
this.mediaObject.goToDurationPercent(a)};m.exports=k},{"ac-object":941,"ac-scroll-tracker":949}],1006:[function(w,y,u){var z=w("ac-object");
var q=w("ac-feature");var A=w("ac-dom-traversal");var v=w("ac-classlist");var o=w("ac-window-delegate").WindowDelegate;
var r=w("./ParallaxElement");var x=0.65;var p=v.contains(A.querySelector("html"),"fluid-support");
var s=function(a){if(!q.threeDTransformsAvailable()||q.touchAvailable()){return
}this.els=[];this._multiplierEls=[];a.forEach(this._initializeElement.bind(this));
this._translateMultiplier=1;this._updateTranslateMultiplier();o.on("resize orientationchange",this._updateTranslateMultiplier,this)
};var t=s.prototype;t._updateTranslateMultiplier=function(){var a=(o.clientWidth()<=1068)?x:1;
var b;if(o.clientWidth()<=735&&p){this.reset();return}if(!this._translateMultiplier||this._translateMultiplier!==a){this._translateMultiplier=a;
for(b=this._multiplierEls.length-1;b>=0;b--){this._multiplierEls[b].setTranslateMultiplier(a)
}}};t._initializeElement=function(f){var d;var c;var b;var a;if(!f.selector){return
}d=A.querySelector(f.selector);if(!d){return}c=f.clipOptions||{};b=f.scrollOptions||f.clockOptions||{};
if(!c.propsTo&&"to" in f){c.propsTo={translateY:f.to};c.propsFrom={translateY:f.from||0};
c.propsOff={translateY:f.off||0};c.units={translateY:"px"};if(f.hasOwnProperty("z")){c.z=f.z
}}if(f.scrollTracker){c.scrollTracker=f.scrollTracker}a=new r(d,c.propsTo,c.propsOff,c,b);
this.els.push(a);if(f.useMediumMultiplier!==false){this._multiplierEls.push(a)}};
t.start=function(){var a;for(a=0;a<this.els.length;a++){this.els[a].start()}};t.stop=function(){var a;
for(a=0;a<this.els.length;a++){this.els[a].stop()}};t.reset=function(){var a;for(a=0;
a<this.els.length;a++){this.els[a].reset()}};y.exports=s},{"./ParallaxElement":1007,"ac-classlist":65,"ac-dom-traversal":183,"ac-feature":301,"ac-object":941,"ac-window-delegate":978}],1007:[function(w,x,v){var y=w("ac-object");
var q=w("ac-dom-styles");var r=w("ac-clip").Clip;var n=w("ac-scroll-tracker").ElementScrollTracker;
var p=w("ac-scroll-tracker").SmoothScrollTracker;var o=w("ac-browser");var s=o.name.match(/chrome/i);
var t=function(h,a,b,g,c){var d;var f;g=y.defaults(this.defaultClipOptions,g);c=y.defaults(this.defaultScrollOptions,c);
this.el=h;this._translateMultiplier=1;if(c.el){d=c.el;c.el=null}else{d=this.el}this._scrollTracker=g.scrollTracker||new n(d,c);
f=y.clone(g.propsFrom);g.clock=this._scrollTracker;g.onDraw=this._draw.bind(this);
this._units=g.units;this._target=f;this._propsTo=a;this._propsOff=b;this._clipOptions=g;
this._clip=new r(f,1,a,g);this.start()};var u=t.prototype;u.defaultClipOptions={ease:"linear",units:{}};
u.defaultScrollOptions={smooth:true,startThreshold:1};u.start=function(){this._clip=new r(this._target,1,this._propsTo,this._clipOptions);
this._scrollTracker.on("update",this._update,this);this._update()};u.stop=function(){this._scrollTracker.off("update",this._update,this)
};u.reset=function(){this.stop();this._clip=new r(this._target,1,this._propsOff,this._clipOptions);
this._clip.setProgress(1)};u._update=function(a){var b=a?a.progress:this._scrollTracker.getProgress();
this._clip.setCurrentTime(b)};u._draw=function(b){var c=y.clone(b.target);var a;
this._lastDrawData=b;if(c.translateY){c.translateY=c.translateY*this._translateMultiplier
}if(c.translateX){c.translateX=c.translateX*this._translateMultiplier}for(a in this._units){if(a in c){c[a]+=this._units[a]
}}c.translateZ=c.translateZ||0;if(s&&this._clipOptions.hasOwnProperty("z")&&this._clipOptions.z===false){c.translateZ=null
}q.setStyle(this.el,c)};u.setTranslateMultiplier=function(a){this._translateMultiplier=a||1;
if(this._lastDrawData){this._draw(this._lastDrawData)}};x.exports=t},{"ac-browser":54,"ac-clip":70,"ac-dom-styles":172,"ac-object":941,"ac-scroll-tracker":949}],1008:[function(r,s,p){var m=r("ac-feature");
var u=r("ac-dom-traversal");var n=r("ac-dom-events");var t=r("ac-element-engagement").ElementEngagement;
var l=r("./ClassTransition");var q=function(a){if(!m.continuousScrollEventsAvailable()||!m.cssPropertyAvailable("transition")){this._enabled=false;
return}this._enabled=true;this._elementEngagement=new t();this._elementEngagement.on("engaged",this._onEngaged,this);
this._active=false;if(a){this.addElements(a)}};var o=q.prototype;o.addElements=function(a){if(!this._enabled){return false
}a.forEach(this.addElement.bind(this))};o.addElement=function(g){var d;var b;var a;
var c;var f;if(!this._enabled){return false}d=this._getElement(g);if(!d){return
}if(d===g){g={}}f=g.className||"reveal";c=new l(d,f,{didTransitionEnd:g.didTransitionEnd||null,transitionEndElement:g.transitionEndElement||null});
b=g.engagementElement||d;this._elementEngagement.addElement(b,{inViewThreshold:g.threshold||0.75,classTransition:c});
if(g.replay){n.addEventListener(g.replay,"click",this._replay.bind(this,c))}if(!this._active){this._elementEngagement.start()
}};o.start=function(){this._elementEngagement.start();this._active=true};o.stop=function(){this._elementEngagement.stop();
this._active=false};o._replay=function(a,b){b.preventDefault();a.replay()};o._onEngaged=function(a){this._elementEngagement.removeElement(a);
a.classTransition.enter()};o._getElement=function(a){if(typeof a==="string"){return u.querySelector(a)
}if(a.nodeType){return a}if(a.el){return a.el}if(a.selector){return u.querySelector(a.selector)
}return false};s.exports=q},{"./ClassTransition":1004,"ac-dom-events":111,"ac-dom-traversal":183,"ac-element-engagement":222,"ac-feature":301}],1009:[function(m,l,h){var i=m("ac-feature");
var k=null;l.exports=function j(){var b;if(k===null){k=false;if(i.mediaElementsAvailable()){try{b=document.createElement("video");
if(b.canPlayType&&b.canPlayType("video/mp4").replace(/^no$/,"")){k=true}}catch(a){}}}return k
}},{"ac-feature":301}],1010:[function(i,h,g){var f=i("ac-localnav").Localnav;h.exports=function(){var a=new f();
a.createLocalnav()}},{"ac-localnav":875}],1011:[function(q,r,n){var l=q("ac-feature");
var s=q("ac-object");var k=q("ac-media-object");var m=q("ac-media-object").cname;
var o=window.mediaConfig;var p={base:"/105/media",locale:"us",site:"macbook/2015",hash:"98474cad-63d2-443a-9125-a1a80bc150dc"};
r.exports={createVideo:function(a,c,b){var f;var d={filename:this.getFilename(c),basePath:this.getBasePath()};
if(b){d.splitFileLoading=true;d.basePath+="/"+d.filename;d.filename=""}f=k.create(a,d,{type:"h264"});
if(b){f=this.exposeSplitFileChunks(f)}return f},exposeSplitFileChunks:function(a){a.getChunks=function(){var b=a.loader.loadObject._queue._active[0];
if(b&&b._binary&&b._binary._chunks){return b._binary._chunks}return[]};return a
},getBasePath:function(){var a=p;if(o&&o.path){a=s.defaults(a,o.path)}return m(a.base+"/"+a.locale+"/"+a.site+"/"+a.hash)
},getFilename:function(a){if(l.isRetina()){a+="_2x"}return a}}},{"ac-feature":301,"ac-media-object":921,"ac-object":941}],1012:[function(f,i,g){var h=f("ac-dom-events");
i.exports={initialize:function(){h.addEventListener(window,"unload",this.resetScroll)
},resetScroll:function(){window.scrollTo(0,0)}}},{"ac-dom-events":111}],1013:[function(o,n,j){var p=o("ac-object");
var q=o("ac-clip").Clip;var l=o("ac-window-delegate").WindowDelegate;var k=function(c,f,b){var d;
var a;b=p.defaults(this.defaults,b);b.onDraw=this._draw.bind(this);d={x:l.scrollX(),y:l.scrollY()};
a={x:c,y:f};this._clip=new q(d,b.duration,a,b)};var m=k.prototype;m.defaults={ease:"ease",duration:1};
m._draw=function(b){var c=b.target.x||0;var a=b.target.y||0;window.scrollTo(c,a);
if(b.progress===1){this._resolve();this._resolve=this._reject=null}};m._preparePromise=function(a,b){this._resolve=a;
this._reject=b};m.start=function(){this._clip.play();return new Promise(this._preparePromise.bind(this))
};m.destroy=function(){if(this._reject){this._reject()}this._resolve=this._reject=this._clip=null
};n.exports=k},{"ac-clip":70,"ac-object":941,"ac-window-delegate":978}],1014:[function(k,i,g){var h=k("./SmoothScroll");
i.exports=function j(d,a,c){var f=new h(d,a,c);var b=f.destroy.bind(f);f.start().then(b)
}},{"./SmoothScroll":1013}]},{},[1003]);