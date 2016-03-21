/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);

	var myApp = angular.module('myApp', ['ng-admin']);

	// custom API flavor

	// custom controllers
	myApp.controller('username', ['$scope', '$window', function ($scope, $window) {
	    // used in header.html
	    $scope.username = $window.localStorage.getItem('posters_galore_login');
	}]);

	// custom states (pages)
	//myApp.config(['$stateProvider', require('./segments/segmentsState')]);

	myApp.config(['NgAdminConfigurationProvider', function (nga) {
	    // create the admin application
	    var admin = nga.application('My First Admin').baseApiUrl('/');

	    // add entities

	    nga.configure(admin);
	}]);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var FakeRest = __webpack_require__(3);
	var sinon = __webpack_require__(4);

	var restServer = new FakeRest.Server();
	restServer.toggleLogging();
	restServer.init(data);

	sinon.FakeXMLHttpRequest.useFilters = true;
	sinon.FakeXMLHttpRequest.addFilter(function (method, url) {
	    // Do not catch webpack sync, config.js transformation but catch /upload in test env
	    return url.indexOf('/socket.io/') !== -1 || url.indexOf('config.js') !== -1;
	});

	var server = sinon.fakeServer.create();
	server.autoRespond = true;
	server.autoRespondAfter = 0; // answer immediately
	server.respondWith(restServer.getHandler());

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define(e):"object"==typeof exports?exports.FakeRest=e():t.FakeRest=e()}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";var n=r(3)["default"];Object.defineProperty(e,"__esModule",{value:!0});var o=r(1),i=n(o),u=r(2),c=n(u);e["default"]={Server:i["default"],Collection:c["default"]},t.exports=e["default"]},function(t,e,r){"use strict";function n(t){if(!t)return{};var e={},r=t.split("&");return r.map(function(t){if(-1===t.indexOf("="))e[t]=!0;else{var r=t.split("="),n=u(r,2),o=n[0],i=n[1];(0===i.indexOf("[")||0===i.indexOf("{"))&&(i=JSON.parse(i)),e[o.trim()]=i}}),e}var o=r(4)["default"],i=r(5)["default"],u=r(6)["default"],c=r(7)["default"],a=r(8)["default"],s=r(3)["default"];Object.defineProperty(e,"__esModule",{value:!0});var f=r(9),l=s(f),p=r(2),d=s(p),h=l["default"].getPolyfill(),y=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];i(this,t),this.baseUrl=e,this.loggingEnabled=!1,this.defaultQuery=function(){},this.batchUrl=null,this.collections={},this.requestInterceptors=[],this.responseInterceptors=[]}return o(t,[{key:"init",value:function(t){for(var e in t)this.addCollection(e,new d["default"](t[e],"id"))}},{key:"toggleLogging",value:function(){this.loggingEnabled=!this.loggingEnabled}},{key:"setDefaultQuery",value:function(t){this.defaultQuery=t}},{key:"setBatchUrl",value:function(t){this.batchUrl=t}},{key:"setBatch",value:function(t){console.warn("Server.setBatch() is deprecated, use Server.setBatchUrl() instead"),this.batchUrl=t}},{key:"addCollection",value:function(t,e){this.collections[t]=e,e.setServer(this),e.setName(t)}},{key:"getCollection",value:function(t){return this.collections[t]}},{key:"getCollectionNames",value:function(){return c(this.collections)}},{key:"addRequestInterceptor",value:function(t){this.requestInterceptors.push(t)}},{key:"addResponseInterceptor",value:function(t){this.responseInterceptors.push(t)}},{key:"getCount",value:function(t,e){return this.collections[t].getCount(e)}},{key:"getAll",value:function(t,e){return this.collections[t].getAll(e)}},{key:"getOne",value:function(t,e,r){return this.collections[t].getOne(e,r)}},{key:"addOne",value:function(t,e){return this.collections[t].addOne(e)}},{key:"updateOne",value:function(t,e,r){return this.collections[t].updateOne(e,r)}},{key:"removeOne",value:function(t,e){return this.collections[t].removeOne(e)}},{key:"decode",value:function(t){if(t.queryString=decodeURIComponent(t.url.slice(t.url.indexOf("?")+1)),t.params=n(t.queryString),t.requestBody)try{t.json=JSON.parse(t.requestBody)}catch(e){}return this.requestInterceptors.reduce(function(t,e){return e(t)},t)}},{key:"respond",value:function(t,e,r){var n=arguments.length<=3||void 0===arguments[3]?200:arguments[3];e||(e={}),e["Content-Type"]||(e["Content-Type"]="application/json");var o={status:n,headers:e,body:t};return o=this.responseInterceptors.reduce(function(t,e){return e(t,r)},o),this.log(r,o),r.respond(o.status,o.headers,JSON.stringify(o.body))}},{key:"log",value:function(t,e){this.loggingEnabled&&(console.group?(console.groupCollapsed(t.method,t.url,"(FakeRest)"),console.group("request"),console.log(t.method,t.url),console.log("headers",t.requestHeaders),console.log("body   ",t.requestBody),console.groupEnd(),console.group("response",e.status),console.log("headers",e.headers),console.log("body   ",e.body),console.groupEnd(),console.groupEnd()):(console.log("FakeRest request ",t.method,t.url,"headers",t.requestHeaders,"body",t.requestBody),console.log("FakeRest response",e.status,"headers",e.headers,"body",e.body)))}},{key:"batch",value:function(t){var e=t.json,r=this.handle.bind(this),n=c(e).reduce(function(t,n){var o,i={url:e[n],method:"GET",params:{},respond:function(t,e,r){o={code:t,headers:c(e||{}).map(function(t){return{name:t,value:e[t]}}),body:r||{}}}};return r(i),t[n]=o||{code:404,headers:[],body:{}},t},{});return this.respond(n,{},t,200)}},{key:"handle",value:function(t){if(t=this.decode(t),this.batchUrl&&this.batchUrl===t.url&&"POST"===t.method)return this.batch(t);var e=!0,r=!1,n=void 0;try{for(var o,i=a(this.getCollectionNames());!(e=(o=i.next()).done);e=!0){var u=o.value,c=t.url.match(new RegExp("^"+this.baseUrl+"\\/("+u+")(\\/(\\d+))?(\\?.*)?$"));if(c){var s=h({},this.defaultQuery(u),t.params);if(c[2]){var f=c[3];if("GET"==t.method)try{var l=this.getOne(u,f,s);return this.respond(l,null,t)}catch(p){return t.respond(404)}if("PUT"==t.method)try{var l=this.updateOne(u,f,t.json);return this.respond(l,null,t)}catch(p){return t.respond(404)}if("PATCH"==t.method)try{var l=this.updateOne(u,f,t.json);return this.respond(l,null,t)}catch(p){return t.respond(404)}if("DELETE"==t.method)try{var l=this.removeOne(u,f);return this.respond(l,null,t)}catch(p){return t.respond(404)}}else{if("GET"==t.method){var d=this.getCount(u,s.filter?{filter:s.filter}:{}),y=void 0,v=void 0,g=void 0;if(d>0){y=this.getAll(u,s);var b=s.range?s.range[0]:0,m=s.range?Math.min(y.length-1+b,s.range[1]):y.length-1;v="items "+b+"-"+m+"/"+d,g=y.length==d?200:206}else y=[],v="items */0",g=200;return this.respond(y,{"Content-Range":v},t,g)}if("POST"==t.method){var O=this.addOne(u,t.json),j=this.baseUrl+"/"+u+"/"+O[this.getCollection(u).identifierName];return this.respond(O,{Location:j},t,201)}}}}}catch(w){r=!0,n=w}finally{try{!e&&i["return"]&&i["return"]()}finally{if(r)throw n}}}},{key:"getHandler",value:function(){return this.handle.bind(this)}}]),t}();e["default"]=y,t.exports=e["default"]},function(t,e,r){"use strict";function n(t,e){if("function"==typeof e)return t.filter(e);if(e instanceof Object){var r=a(e).map(function(t){if("q"===t){var r=function(){var t=new RegExp(e.q,"i");return{v:function(e){for(var r in e)if(e[r]&&e[r].match&&null!==e[r].match(t))return!0;return!1}}}();if("object"==typeof r)return r.v}var n=e[t];if(-1!==t.indexOf("_lte")){var o=function(){var e=t.replace(/(_lte)$/,"");return{v:function(t){return t[e]<=n}}}();if("object"==typeof o)return o.v}if(-1!==t.indexOf("_gte")){var i=function(){var e=t.replace(/(_gte)$/,"");return{v:function(t){return t[e]>=n}}}();if("object"==typeof i)return i.v}if(-1!==t.indexOf("_lt")){var u=function(){var e=t.replace(/(_lt)$/,"");return{v:function(t){return t[e]<n}}}();if("object"==typeof u)return u.v}if(-1!==t.indexOf("_gt")){var c=function(){var e=t.replace(/(_gt)$/,"");return{v:function(t){return t[e]>n}}}();if("object"==typeof c)return c.v}return Array.isArray(n)?function(e){return n.filter(function(r){return r==e[t]}).length>0}:function(e){return Array.isArray(e[t])&&"string"==typeof n?-1!==e[t].indexOf(n):"boolean"==typeof e[t]&&"string"==typeof n?e[t]==("true"===n?!0:!1):e[t]==n}});return t.filter(function(t){return r.reduce(function(e,r){return e&&r(t)},!0)})}throw new Error("Unsupported filter type")}function o(t,e){if("function"==typeof e)return t.sort(e);if("string"==typeof e)return t.sort(function(t,r){return t[e]>r[e]?1:t[e]<r[e]?-1:0});if(Array.isArray(e)){var r=function(){var r=e[0],n="asc"==e[1].toLowerCase()?1:-1;return{v:t.sort(function(t,e){return t[r]>e[r]?n:t[r]<e[r]?-1*n:0})}}();if("object"==typeof r)return r.v}throw new Error("Unsupported sort type")}function i(t,e){if(Array.isArray(e))return t.slice(e[0],void 0!==e[1]?e[1]+1:void 0);throw new Error("Unsupported range type")}var u=r(4)["default"],c=r(5)["default"],a=r(7)["default"],s=r(3)["default"];Object.defineProperty(e,"__esModule",{value:!0});var f=r(9),l=s(f);r(10),r(11);var p=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],r=arguments.length<=1||void 0===arguments[1]?"id":arguments[1];if(c(this,t),!Array.isArray(e))throw new Error("Can't initialize a Collection with anything else than an array of items");this.sequence=0,this.identifierName=r,this.items=[],this.server=null,this.name=null,e.map(this.addOne.bind(this))}return u(t,[{key:"setServer",value:function(t){this.server=t}},{key:"setName",value:function(t){this.name=t}},{key:"_oneToManyEmbedder",value:function(t){var e=this,r=this.name.slice(0,-1),n=r+"_id";return function(r){var o=e.server.collections[t];if(!o)throw new Error("Can't embed a non-existing collection "+t);return r[t]=o.getAll(Array.isArray(r[t])?{filter:function(e){return-1!==r[t].indexOf(e[o.identifierName])}}:{filter:function(t){return t[n]==r[e.identifierName]}}),r}}},{key:"_manyToOneEmbedder",value:function(t){var e=this,r=t+"s",n=t+"_id";return function(o){var i=e.server.collections[r];if(!i)throw new Error("Can't embed a non-existing collection "+t);try{o[t]=i.getOne(o[n])}catch(u){}return o}}},{key:"_itemEmbedder",value:function(t){var e=this,r=Array.isArray(t)?t:[t],n=r.map(function(t){return t.endsWith("s")?e._oneToManyEmbedder(t):e._manyToOneEmbedder(t)});return function(t){return n.reduce(function(t,e){return e(t)},t)}}},{key:"getCount",value:function(t){return this.getAll(t).length}},{key:"getAll",value:function(t){var e=this.items.slice(0);return t&&(t.filter&&(e=n(e,t.filter)),t.sort&&(e=o(e,t.sort)),t.range&&(e=i(e,t.range)),t.embed&&this.server&&(e=e.map(function(t){return l["default"]({},t)}).map(this._itemEmbedder(t.embed)))),e}},{key:"getIndex",value:function(t){var e=this;return this.items.findIndex(function(r){return r[e.identifierName]==t})}},{key:"getOne",value:function(t,e){var r=this.getIndex(t);if(-1===r)throw new Error("No item with identifier "+t);var n=this.items[r];return e&&e.embed&&this.server&&(n=l["default"]({},n),n=this._itemEmbedder(e.embed)(n)),n}},{key:"addOne",value:function(t){var e=t[this.identifierName];if(void 0!==e){if(-1!==this.getIndex(e))throw new Error("An item with the identifier "+e+" already exists");this.sequence=Math.max(this.sequence,e)+1}else t[this.identifierName]=this.sequence++;return this.items.push(t),t}},{key:"updateOne",value:function(t,e){var r=this.getIndex(t);if(-1===r)throw new Error("No item with identifier "+t);for(var n in e)this.items[r][n]=e[n];return this.items[r]}},{key:"removeOne",value:function(t){var e=this.getIndex(t);if(-1===e)throw new Error("No item with identifier "+t);var r=this.items[e];return this.items.splice(e,1),t==this.sequence-1&&this.sequence--,r}}]),t}();e["default"]=p,t.exports=e["default"]},function(t,e){"use strict";e["default"]=function(t){return t&&t.__esModule?t:{"default":t}},e.__esModule=!0},function(t,e,r){"use strict";var n=r(12)["default"];e["default"]=function(){function t(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),n(t,o.key,o)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),e.__esModule=!0},function(t,e){"use strict";e["default"]=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},e.__esModule=!0},function(t,e,r){"use strict";var n=r(8)["default"],o=r(13)["default"];e["default"]=function(){function t(t,e){var r=[],o=!0,i=!1,u=void 0;try{for(var c,a=n(t);!(o=(c=a.next()).done)&&(r.push(c.value),!e||r.length!==e);o=!0);}catch(s){i=!0,u=s}finally{try{!o&&a["return"]&&a["return"]()}finally{if(i)throw u}}return r}return function(e,r){if(Array.isArray(e))return e;if(o(Object(e)))return t(e,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),e.__esModule=!0},function(t,e,r){t.exports={"default":r(18),__esModule:!0}},function(t,e,r){t.exports={"default":r(17),__esModule:!0}},function(t,e,r){"use strict";var n=r(21),o=r(14),i=r(15),u=r(16);n(o,{implementation:o,getPolyfill:i,shim:u}),t.exports=o},function(){!function(){if(!Array.prototype.findIndex){var t=function(t){var e=Object(this),r=Math.max(0,e.length)>>>0;if(0===r)return-1;if("function"!=typeof t||"[object Function]"!==Object.prototype.toString.call(t))throw new TypeError("Array#findIndex: predicate must be a function");for(var n=arguments.length>1?arguments[1]:void 0,o=0;r>o;o++)if(t.call(n,e[o],o,e))return o;return-1};if(Object.defineProperty)try{Object.defineProperty(Array.prototype,"findIndex",{value:t,configurable:!0,writable:!0})}catch(e){}Array.prototype.findIndex||(Array.prototype.findIndex=t)}}(this)},function(){/*! http://mths.be/endswith v0.2.0 by @mathias */
	String.prototype.endsWith||!function(){"use strict";var t=function(){try{var t={},e=Object.defineProperty,r=e(t,t,t)&&e}catch(n){}return r}(),e={}.toString,r=function(t){if(null==this)throw TypeError();var r=String(this);if(t&&"[object RegExp]"==e.call(t))throw TypeError();var n=r.length,o=String(t),i=o.length,u=n;if(arguments.length>1){var c=arguments[1];void 0!==c&&(u=c?Number(c):0,u!=u&&(u=0))}var a=Math.min(Math.max(u,0),n),s=a-i;if(0>s)return!1;for(var f=-1;++f<i;)if(r.charCodeAt(s+f)!=o.charCodeAt(f))return!1;return!0};t?t(String.prototype,"endsWith",{value:r,configurable:!0,writable:!0}):String.prototype.endsWith=r}()},function(t,e,r){t.exports={"default":r(20),__esModule:!0}},function(t,e,r){t.exports={"default":r(19),__esModule:!0}},function(t,e,r){"use strict";var n=r(23),o=r(24),i=function(t){return"undefined"!=typeof t&&null!==t},u=r(22)(),c=Object,a=o.call(Function.call,Array.prototype.push),s=o.call(Function.call,Object.prototype.propertyIsEnumerable);t.exports=function(t){if(!i(t))throw new TypeError("target must be an object");var e,r,o,f,l,p=c(t);for(e=1;e<arguments.length;++e){if(r=c(arguments[e]),f=n(r),u&&Object.getOwnPropertySymbols)for(l=Object.getOwnPropertySymbols(r),o=0;o<l.length;++o)s(r,l[o])&&a(f,l[o]);for(o=0;o<f.length;++o)p[f[o]]=r[f[o]]}return p}},function(t,e,r){"use strict";var n=r(14),o=function(){if(!Object.assign||!Object.preventExtensions)return!1;var t=Object.preventExtensions({1:2});try{Object.assign(t,"xy")}catch(e){return"y"===t[1]}};t.exports=function(){return!Object.assign||o()?n:Object.assign}},function(t,e,r){"use strict";var n=r(21),o=r(15);t.exports=function(){var t=o();return Object.assign!==t&&n(Object,{assign:t}),t}},function(t,e,r){r(25),r(26),r(27),t.exports=r(28).core.getIterator},function(t,e,r){r(29),t.exports=r(28).core.Object.keys},function(t,e,r){r(25),r(26),r(27),t.exports=r(28).core.isIterable},function(t,e,r){var n=r(28);t.exports=function(t,e,r){return n.setDesc(t,e,r)}},function(t,e,r){"use strict";var n=r(23),o=r(30),i="function"==typeof Symbol&&"symbol"==typeof Symbol(),u=Object.prototype.toString,c=function(t){return"function"==typeof t&&"[object Function]"===u.call(t)},a=function(){var t={};try{Object.defineProperty(t,"x",{value:t,enumerable:!1});for(var e in t)return!1;return t.x===t}catch(r){return!1}},s=Object.defineProperty&&a(),f=function(t,e,r,n){(!(e in t)||c(n)&&n())&&(s?Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:!0,value:r}):t[e]=r)},l=function(t,e){var r=arguments.length>2?arguments[2]:{},u=n(e);i&&(u=u.concat(Object.getOwnPropertySymbols(e))),o(u,function(n){f(t,n,e[n],r[n])})};l.supportsDescriptors=!!s,t.exports=l},function(t,e,r){"use strict";var n=r(23);t.exports=function(){if("function"!=typeof Symbol||"function"!=typeof Object.getOwnPropertySymbols)return!1;if("symbol"==typeof Symbol.iterator)return!0;var t={},e=Symbol("test");if("string"==typeof e)return!1;if(e instanceof Symbol)return!1;t[e]=42;for(e in t)return!1;if(0!==n(t).length)return!1;if("function"==typeof Object.keys&&0!==Object.keys(t).length)return!1;if("function"==typeof Object.getOwnPropertyNames&&0!==Object.getOwnPropertyNames(t).length)return!1;var r=Object.getOwnPropertySymbols(t);if(1!==r.length||r[0]!==e)return!1;if(!Object.prototype.propertyIsEnumerable.call(t,e))return!1;if("function"==typeof Object.getOwnPropertyDescriptor){var o=Object.getOwnPropertyDescriptor(t,e);if(42!==o.value||o.enumerable!==!0)return!1}return!0}},function(t,e,r){"use strict";var n=Object.prototype.hasOwnProperty,o=Object.prototype.toString,i=Array.prototype.slice,u=r(31),c=!{toString:null}.propertyIsEnumerable("toString"),a=function(){}.propertyIsEnumerable("prototype"),s=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],f=function(t){var e=t.constructor;return e&&e.prototype===t},l={$window:!0,$console:!0,$parent:!0,$self:!0,$frames:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0},p=function(){if("undefined"==typeof window)return!1;for(var t in window)if(!l["$"+t]&&n.call(window,t)&&null!==window[t]&&"object"==typeof window[t])try{f(window[t])}catch(e){return!0}return!1}(),d=function(t){if("undefined"==typeof window&&!p)return f(t);try{return f(t)}catch(e){return!1}},h=function(t){var e=null!==t&&"object"==typeof t,r="[object Function]"===o.call(t),i=u(t),f=e&&"[object String]"===o.call(t),l=[];if(!e&&!r&&!i)throw new TypeError("Object.keys called on a non-object");var p=a&&r;if(f&&t.length>0&&!n.call(t,0))for(var h=0;h<t.length;++h)l.push(String(h));if(i&&t.length>0)for(var y=0;y<t.length;++y)l.push(String(y));else for(var v in t)p&&"prototype"===v||!n.call(t,v)||l.push(String(v));if(c)for(var g=d(t),b=0;b<s.length;++b)g&&"constructor"===s[b]||!n.call(t,s[b])||l.push(s[b]);return l};h.shim=function(){if(Object.keys){var t=function(){return 2===(Object.keys(arguments)||"").length}(1,2);if(!t){var e=Object.keys;Object.keys=function(t){return e(u(t)?i.call(t):t)}}}else Object.keys=h;return Object.keys||h},t.exports=h},function(t){var e="Function.prototype.bind called on incompatible ",r=Array.prototype.slice,n=Object.prototype.toString,o="[object Function]";t.exports=function(t){var i=this;if("function"!=typeof i||n.call(i)!==o)throw new TypeError(e+i);for(var u=r.call(arguments,1),c=function(){if(this instanceof l){var e=i.apply(this,u.concat(r.call(arguments)));return Object(e)===e?e:this}return i.apply(t,u.concat(r.call(arguments)))},a=Math.max(0,i.length-u.length),s=[],f=0;a>f;f++)s.push("$"+f);var l=Function("binder","return function ("+s.join(",")+"){ return binder.apply(this,arguments); }")(c);if(i.prototype){var p=function(){};p.prototype=i.prototype,l.prototype=new p,p.prototype=null}return l}},function(t,e,r){r(32);var n=r(28),o=r(33).Iterators,i=r(34)("iterator"),u=o.Array,c=n.g.NodeList,a=n.g.HTMLCollection,s=c&&c.prototype,f=a&&a.prototype;n.FW&&(!c||i in s||n.hide(s,i,u),!a||i in f||n.hide(f,i,u)),o.NodeList=o.HTMLCollection=u},function(t,e,r){var n=r(28).set,o=r(35)(!0),i=r(36).safe("iter"),u=r(33),c=u.step;r(37)(String,"String",function(t){n(this,i,{o:String(t),i:0})},function(){var t,e=this[i],r=e.o,n=e.i;return n>=r.length?c(1):(t=o(r,n),e.i+=t.length,c(0,t))})},function(t,e,r){var n=r(28).core,o=r(33);n.isIterable=o.is,n.getIterator=o.get},function(t,e,r){"use strict";function n(t){return isNaN(t=+t)?0:(t>0?y:h)(t)}function o(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}function i(t,e,r){return t[e]=r,t}function u(t){return b?function(e,r,n){return O.setDesc(e,r,o(t,n))}:i}function c(t){return null!==t&&("object"==typeof t||"function"==typeof t)}function a(t){return"function"==typeof t}function s(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}var f="undefined"!=typeof self?self:Function("return this")(),l={},p=Object.defineProperty,d={}.hasOwnProperty,h=Math.ceil,y=Math.floor,v=Math.max,g=Math.min,b=!!function(){try{return 2==p({},"a",{get:function(){return 2}}).a}catch(t){}}(),m=u(1),O=t.exports=r(38)({g:f,core:l,html:f.document&&document.documentElement,isObject:c,isFunction:a,that:function(){return this},toInteger:n,toLength:function(t){return t>0?g(n(t),9007199254740991):0},toIndex:function(t,e){return t=n(t),0>t?v(t+e,0):g(t,e)},has:function(t,e){return d.call(t,e)},create:Object.create,getProto:Object.getPrototypeOf,DESC:b,desc:o,getDesc:Object.getOwnPropertyDescriptor,setDesc:p,setDescs:Object.defineProperties,getKeys:Object.keys,getNames:Object.getOwnPropertyNames,getSymbols:Object.getOwnPropertySymbols,assertDefined:s,ES5Object:Object,toObject:function(t){return O.ES5Object(s(t))},hide:m,def:u(0),set:f.Symbol?i:m,each:[].forEach});"undefined"!=typeof __e&&(__e=l),"undefined"!=typeof __g&&(__g=f)},function(t,e,r){var n=r(28),o=r(39),i=n.isObject,u=n.toObject;n.each.call("freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames".split(","),function(t,e){var c=(n.core.Object||{})[t]||Object[t],a=0,s={};s[t]=0==e?function(t){return i(t)?c(t):t}:1==e?function(t){return i(t)?c(t):t}:2==e?function(t){return i(t)?c(t):t}:3==e?function(t){return i(t)?c(t):!0}:4==e?function(t){return i(t)?c(t):!0}:5==e?function(t){return i(t)?c(t):!1}:6==e?function(t,e){return c(u(t),e)}:7==e?function(t){return c(Object(n.assertDefined(t)))}:8==e?function(t){return c(u(t))}:r(40).get;try{c("z")}catch(f){a=1}o(o.S+o.F*a,"Object",s)})},function(t){var e=Object.prototype.hasOwnProperty,r=Object.prototype.toString;t.exports=function(t,n,o){if("[object Function]"!==r.call(n))throw new TypeError("iterator must be a function");var i=t.length;if(i===+i)for(var u=0;i>u;u++)n.call(o,t[u],u,t);else for(var c in t)e.call(t,c)&&n.call(o,t[c],c,t)}},function(t){"use strict";var e=Object.prototype.toString;t.exports=function(t){var r=e.call(t),n="[object Arguments]"===r;return n||(n="[object Array]"!==r&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===e.call(t.callee)),n}},function(t,e,r){var n=r(28),o=r(41),i=r(36).safe("iter"),u=r(33),c=u.step,a=u.Iterators;r(37)(Array,"Array",function(t,e){n.set(this,i,{o:n.toObject(t),i:0,k:e})},function(){var t=this[i],e=t.o,r=t.k,n=t.i++;return!e||n>=e.length?(t.o=void 0,c(1)):"keys"==r?c(0,n):"values"==r?c(0,e[n]):c(0,[n,e[n]])},"values"),a.Arguments=a.Array,o("keys"),o("values"),o("entries")},function(t,e,r){"use strict";function n(t,e){o.hide(t,s,e),f in[]&&o.hide(t,f,e)}var o=r(28),i=r(42),u=i.classof,c=r(43),a=c.obj,s=r(34)("iterator"),f="@@iterator",l=r(44)("iterators"),p={};n(p,o.that),t.exports={BUGGY:"keys"in[]&&!("next"in[].keys()),Iterators:l,step:function(t,e){return{value:e,done:!!t}},is:function(t){var e=Object(t),r=o.g.Symbol;return(r&&r.iterator||f)in e||s in e||o.has(l,u(e))},get:function(t){var e,r=o.g.Symbol;return void 0!=t&&(e=t[r&&r.iterator||f]||t[s]||l[u(t)]),c(o.isFunction(e),t," is not iterable!"),a(e.call(t))},set:n,create:function(t,e,r,n){t.prototype=o.create(n||p,{next:o.desc(1,r)}),i.set(t,e+" Iterator")}}},function(t,e,r){var n=r(28).g,o=r(44)("wks");t.exports=function(t){return o[t]||(o[t]=n.Symbol&&n.Symbol[t]||r(36).safe("Symbol."+t))}},function(t,e,r){var n=r(28);t.exports=function(t){return function(e,r){var o,i,u=String(n.assertDefined(e)),c=n.toInteger(r),a=u.length;return 0>c||c>=a?t?"":void 0:(o=u.charCodeAt(c),55296>o||o>56319||c+1===a||(i=u.charCodeAt(c+1))<56320||i>57343?t?u.charAt(c):o:t?u.slice(c,c+2):(o-55296<<10)+(i-56320)+65536)}}},function(t,e,r){function n(t){return"Symbol(".concat(void 0===t?"":t,")_",(++o+Math.random()).toString(36))}var o=0;n.safe=r(28).g.Symbol||n,t.exports=n},function(t,e,r){var n=r(39),o=r(45),i=r(28),u=r(42),c=r(33),a=r(34)("iterator"),s="@@iterator",f="keys",l="values",p=c.Iterators;t.exports=function(t,e,r,d,h,y,v){function g(t){function e(e){return new r(e,t)}switch(t){case f:return function(){return e(this)};case l:return function(){return e(this)}}return function(){return e(this)}}c.create(r,e,d);var b,m,O=e+" Iterator",j=t.prototype,w=j[a]||j[s]||h&&j[h],x=w||g(h);if(w){var S=i.getProto(x.call(new t));u.set(S,O,!0),i.FW&&i.has(j,s)&&c.set(S,i.that)}if((i.FW||v)&&c.set(j,x),p[e]=x,p[O]=i.that,h)if(b={keys:y?x:g(f),values:h==l?x:g(l),entries:h!=l?x:g("entries")},v)for(m in b)m in j||o(j,m,b[m]);else n(n.P+n.F*c.BUGGY,e,b)}},function(t){t.exports=function(t){return t.FW=!1,t.path=t.core,t}},function(t,e,r){function n(t,e){return function(){return t.apply(e,arguments)}}function o(t,e,r){var i,s,f,l,p=t&o.G,d=t&o.P,h=p?u:t&o.S?u[e]:(u[e]||{}).prototype,y=p?c:c[e]||(c[e]={});p&&(r=e);for(i in r)s=!(t&o.F)&&h&&i in h,s&&i in y||(f=s?h[i]:r[i],p&&!a(h[i])?l=r[i]:t&o.B&&s?l=n(f,u):t&o.W&&h[i]==f?!function(t){l=function(e){return this instanceof t?new t(e):t(e)},l.prototype=t.prototype}(f):l=d&&a(f)?n(Function.call,f):f,y[i]=l,d&&((y.prototype||(y.prototype={}))[i]=f))}var i=r(28),u=i.g,c=i.core,a=i.isFunction;o.F=1,o.G=2,o.S=4,o.P=8,o.B=16,o.W=32,t.exports=o},function(t,e,r){function n(t){try{return u(t)}catch(e){return c.slice()}}var o=r(28),i={}.toString,u=o.getNames,c="object"==typeof window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.get=function(t){return c&&"[object Window]"==i.call(t)?n(t):u(o.toObject(t))}},function(t){t.exports=function(){}},function(t,e,r){function n(t){return u.call(t).slice(8,-1)}var o=r(28),i=r(34)("toStringTag"),u={}.toString;n.classof=function(t){var e,r;return void 0==t?void 0===t?"Undefined":"Null":"string"==typeof(r=(e=Object(t))[i])?r:n(e)},n.set=function(t,e,r){t&&!o.has(t=r?t:t.prototype,i)&&o.hide(t,i,e)},t.exports=n},function(t,e,r){function n(t,e,r){if(!t)throw TypeError(r?e+r:e)}var o=r(28);n.def=o.assertDefined,n.fn=function(t){if(!o.isFunction(t))throw TypeError(t+" is not a function!");return t},n.obj=function(t){if(!o.isObject(t))throw TypeError(t+" is not an object!");return t},n.inst=function(t,e,r){if(!(t instanceof e))throw TypeError(r+": use the 'new' operator!");return t},t.exports=n},function(t,e,r){var n=r(28),o="__core-js_shared__",i=n.g[o]||(n.g[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e,r){t.exports=r(28).hide}])});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @depend fake_xdomain_request.js
	 * @depend fake_xml_http_request.js
	 * @depend ../format.js
	 * @depend ../log_error.js
	 */
	/**
	 * The Sinon "server" mimics a web server that receives requests from
	 * sinon.FakeXMLHttpRequest and provides an API to respond to those requests,
	 * both synchronously and asynchronously. To respond synchronuously, canned
	 * answers have to be provided upfront.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	"use strict";

	if (typeof sinon == "undefined") {
	    var sinon = {};
	}

	(function () {
	    var push = [].push;

	    function responseArray(handler) {
	        var response = handler;

	        if (Object.prototype.toString.call(handler) != "[object Array]") {
	            response = [200, {}, handler];
	        }

	        if (typeof response[2] != "string") {
	            throw new TypeError("Fake server response body should be string, but was " +
	                                typeof response[2]);
	        }

	        return response;
	    }

	    var wloc = typeof window !== "undefined" ? window.location : {};
	    var rCurrLoc = new RegExp("^" + wloc.protocol + "//" + wloc.host);

	    function matchOne(response, reqMethod, reqUrl) {
	        var rmeth = response.method;
	        var matchMethod = !rmeth || rmeth.toLowerCase() == reqMethod.toLowerCase();
	        var url = response.url;
	        var matchUrl = !url || url == reqUrl || (typeof url.test == "function" && url.test(reqUrl));

	        return matchMethod && matchUrl;
	    }

	    function match(response, request) {
	        var requestUrl = request.url;

	        if (!/^https?:\/\//.test(requestUrl) || rCurrLoc.test(requestUrl)) {
	            requestUrl = requestUrl.replace(rCurrLoc, "");
	        }

	        if (matchOne(response, this.getHTTPMethod(request), requestUrl)) {
	            if (typeof response.response == "function") {
	                var ru = response.url;
	                var args = [request].concat(ru && typeof ru.exec == "function" ? ru.exec(requestUrl).slice(1) : []);
	                return response.response.apply(response, args);
	            }

	            return true;
	        }

	        return false;
	    }

	    function makeApi(sinon) {
	        sinon.fakeServer = {
	            create: function (config) {
	                var server = sinon.create(this);
	                server.configure(config);
	                if (!sinon.xhr.supportsCORS) {
	                    this.xhr = sinon.useFakeXDomainRequest();
	                } else {
	                    this.xhr = sinon.useFakeXMLHttpRequest();
	                }
	                server.requests = [];

	                this.xhr.onCreate = function (xhrObj) {
	                    server.addRequest(xhrObj);
	                };

	                return server;
	            },
	            configure: function (config) {
	                var whitelist = {
	                    "autoRespond": true,
	                    "autoRespondAfter": true,
	                    "respondImmediately": true,
	                    "fakeHTTPMethods": true
	                },
	                setting;
	                config = config || {};
	                for (setting in config) {
	                    if (whitelist.hasOwnProperty(setting) && config.hasOwnProperty(setting)) {
	                        this[setting] = config[setting];
	                    }
	                }
	            },
	            addRequest: function addRequest(xhrObj) {
	                var server = this;
	                push.call(this.requests, xhrObj);

	                xhrObj.onSend = function () {
	                    server.handleRequest(this);

	                    if (server.respondImmediately) {
	                        server.respond();
	                    } else if (server.autoRespond && !server.responding) {
	                        setTimeout(function () {
	                            server.responding = false;
	                            server.respond();
	                        }, server.autoRespondAfter || 10);

	                        server.responding = true;
	                    }
	                };
	            },

	            getHTTPMethod: function getHTTPMethod(request) {
	                if (this.fakeHTTPMethods && /post/i.test(request.method)) {
	                    var matches = (request.requestBody || "").match(/_method=([^\b;]+)/);
	                    return !!matches ? matches[1] : request.method;
	                }

	                return request.method;
	            },

	            handleRequest: function handleRequest(xhr) {
	                if (xhr.async) {
	                    if (!this.queue) {
	                        this.queue = [];
	                    }

	                    push.call(this.queue, xhr);
	                } else {
	                    this.processRequest(xhr);
	                }
	            },

	            log: function log(response, request) {
	                var str;

	                str =  "Request:\n"  + sinon.format(request)  + "\n\n";
	                str += "Response:\n" + sinon.format(response) + "\n\n";

	                sinon.log(str);
	            },

	            respondWith: function respondWith(method, url, body) {
	                if (arguments.length == 1 && typeof method != "function") {
	                    this.response = responseArray(method);
	                    return;
	                }

	                if (!this.responses) {
	                    this.responses = [];
	                }

	                if (arguments.length == 1) {
	                    body = method;
	                    url = method = null;
	                }

	                if (arguments.length == 2) {
	                    body = url;
	                    url = method;
	                    method = null;
	                }

	                push.call(this.responses, {
	                    method: method,
	                    url: url,
	                    response: typeof body == "function" ? body : responseArray(body)
	                });
	            },

	            respond: function respond() {
	                if (arguments.length > 0) {
	                    this.respondWith.apply(this, arguments);
	                }

	                var queue = this.queue || [];
	                var requests = queue.splice(0, queue.length);
	                var request;

	                while (request = requests.shift()) {
	                    this.processRequest(request);
	                }
	            },

	            processRequest: function processRequest(request) {
	                try {
	                    if (request.aborted) {
	                        return;
	                    }

	                    var response = this.response || [404, {}, ""];

	                    if (this.responses) {
	                        for (var l = this.responses.length, i = l - 1; i >= 0; i--) {
	                            if (match.call(this, this.responses[i], request)) {
	                                response = this.responses[i].response;
	                                break;
	                            }
	                        }
	                    }

	                    if (request.readyState != 4) {
	                        this.log(response, request);

	                        request.respond(response[0], response[1], response[2]);
	                    }
	                } catch (e) {
	                    sinon.logError("Fake server request processing", e);
	                }
	            },

	            restore: function restore() {
	                return this.xhr.restore && this.xhr.restore.apply(this.xhr, arguments);
	            }
	        };
	    }

	    var sinon = __webpack_require__(5);
	    __webpack_require__(6);
	    __webpack_require__(10);
	    __webpack_require__(11);
	    makeApi(sinon);
	    module.exports = sinon;
	}());


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * @depend ../../sinon.js
	 */
	/**
	 * Sinon core utilities. For internal use only.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	"use strict";

	(function (sinon) {
	    var div = typeof document != "undefined" && document.createElement("div");
	    var hasOwn = Object.prototype.hasOwnProperty;

	    function isDOMNode(obj) {
	        var success = false;

	        try {
	            obj.appendChild(div);
	            success = div.parentNode == obj;
	        } catch (e) {
	            return false;
	        } finally {
	            try {
	                obj.removeChild(div);
	            } catch (e) {
	                // Remove failed, not much we can do about that
	            }
	        }

	        return success;
	    }

	    function isElement(obj) {
	        return div && obj && obj.nodeType === 1 && isDOMNode(obj);
	    }

	    function isFunction(obj) {
	        return typeof obj === "function" || !!(obj && obj.constructor && obj.call && obj.apply);
	    }

	    function isReallyNaN(val) {
	        return typeof val === "number" && isNaN(val);
	    }

	    function mirrorProperties(target, source) {
	        for (var prop in source) {
	            if (!hasOwn.call(target, prop)) {
	                target[prop] = source[prop];
	            }
	        }
	    }

	    function isRestorable(obj) {
	        return typeof obj === "function" && typeof obj.restore === "function" && obj.restore.sinon;
	    }

	    // Cheap way to detect if we have ES5 support.
	    var hasES5Support = "keys" in Object;

	    function makeApi(sinon) {
	        sinon.wrapMethod = function wrapMethod(object, property, method) {
	            if (!object) {
	                throw new TypeError("Should wrap property of object");
	            }

	            if (typeof method != "function" && typeof method != "object") {
	                throw new TypeError("Method wrapper should be a function or a property descriptor");
	            }

	            function checkWrappedMethod(wrappedMethod) {
	                if (!isFunction(wrappedMethod)) {
	                    error = new TypeError("Attempted to wrap " + (typeof wrappedMethod) + " property " +
	                                        property + " as function");
	                } else if (wrappedMethod.restore && wrappedMethod.restore.sinon) {
	                    error = new TypeError("Attempted to wrap " + property + " which is already wrapped");
	                } else if (wrappedMethod.calledBefore) {
	                    var verb = !!wrappedMethod.returns ? "stubbed" : "spied on";
	                    error = new TypeError("Attempted to wrap " + property + " which is already " + verb);
	                }

	                if (error) {
	                    if (wrappedMethod && wrappedMethod.stackTrace) {
	                        error.stack += "\n--------------\n" + wrappedMethod.stackTrace;
	                    }
	                    throw error;
	                }
	            }

	            var error, wrappedMethod;

	            // IE 8 does not support hasOwnProperty on the window object and Firefox has a problem
	            // when using hasOwn.call on objects from other frames.
	            var owned = object.hasOwnProperty ? object.hasOwnProperty(property) : hasOwn.call(object, property);

	            if (hasES5Support) {
	                var methodDesc = (typeof method == "function") ? {value: method} : method,
	                    wrappedMethodDesc = sinon.getPropertyDescriptor(object, property),
	                    i;

	                if (!wrappedMethodDesc) {
	                    error = new TypeError("Attempted to wrap " + (typeof wrappedMethod) + " property " +
	                                        property + " as function");
	                } else if (wrappedMethodDesc.restore && wrappedMethodDesc.restore.sinon) {
	                    error = new TypeError("Attempted to wrap " + property + " which is already wrapped");
	                }
	                if (error) {
	                    if (wrappedMethodDesc && wrappedMethodDesc.stackTrace) {
	                        error.stack += "\n--------------\n" + wrappedMethodDesc.stackTrace;
	                    }
	                    throw error;
	                }

	                var types = sinon.objectKeys(methodDesc);
	                for (i = 0; i < types.length; i++) {
	                    wrappedMethod = wrappedMethodDesc[types[i]];
	                    checkWrappedMethod(wrappedMethod);
	                }

	                mirrorProperties(methodDesc, wrappedMethodDesc);
	                for (i = 0; i < types.length; i++) {
	                    mirrorProperties(methodDesc[types[i]], wrappedMethodDesc[types[i]]);
	                }
	                Object.defineProperty(object, property, methodDesc);
	            } else {
	                wrappedMethod = object[property];
	                checkWrappedMethod(wrappedMethod);
	                object[property] = method;
	                method.displayName = property;
	            }

	            method.displayName = property;

	            // Set up a stack trace which can be used later to find what line of
	            // code the original method was created on.
	            method.stackTrace = (new Error("Stack Trace for original")).stack;

	            method.restore = function () {
	                // For prototype properties try to reset by delete first.
	                // If this fails (ex: localStorage on mobile safari) then force a reset
	                // via direct assignment.
	                if (!owned) {
	                    // In some cases `delete` may throw an error
	                    try {
	                        delete object[property];
	                    } catch (e) {}
	                    // For native code functions `delete` fails without throwing an error
	                    // on Chrome < 43, PhantomJS, etc.
	                } else if (hasES5Support) {
	                    Object.defineProperty(object, property, wrappedMethodDesc);
	                }

	                // Use strict equality comparison to check failures then force a reset
	                // via direct assignment.
	                if (object[property] === method) {
	                    object[property] = wrappedMethod;
	                }
	            };

	            method.restore.sinon = true;

	            if (!hasES5Support) {
	                mirrorProperties(method, wrappedMethod);
	            }

	            return method;
	        };

	        sinon.create = function create(proto) {
	            var F = function () {};
	            F.prototype = proto;
	            return new F();
	        };

	        sinon.deepEqual = function deepEqual(a, b) {
	            if (sinon.match && sinon.match.isMatcher(a)) {
	                return a.test(b);
	            }

	            if (typeof a != "object" || typeof b != "object") {
	                if (isReallyNaN(a) && isReallyNaN(b)) {
	                    return true;
	                } else {
	                    return a === b;
	                }
	            }

	            if (isElement(a) || isElement(b)) {
	                return a === b;
	            }

	            if (a === b) {
	                return true;
	            }

	            if ((a === null && b !== null) || (a !== null && b === null)) {
	                return false;
	            }

	            if (a instanceof RegExp && b instanceof RegExp) {
	                return (a.source === b.source) && (a.global === b.global) &&
	                    (a.ignoreCase === b.ignoreCase) && (a.multiline === b.multiline);
	            }

	            var aString = Object.prototype.toString.call(a);
	            if (aString != Object.prototype.toString.call(b)) {
	                return false;
	            }

	            if (aString == "[object Date]") {
	                return a.valueOf() === b.valueOf();
	            }

	            var prop, aLength = 0, bLength = 0;

	            if (aString == "[object Array]" && a.length !== b.length) {
	                return false;
	            }

	            for (prop in a) {
	                aLength += 1;

	                if (!(prop in b)) {
	                    return false;
	                }

	                if (!deepEqual(a[prop], b[prop])) {
	                    return false;
	                }
	            }

	            for (prop in b) {
	                bLength += 1;
	            }

	            return aLength == bLength;
	        };

	        sinon.functionName = function functionName(func) {
	            var name = func.displayName || func.name;

	            // Use function decomposition as a last resort to get function
	            // name. Does not rely on function decomposition to work - if it
	            // doesn't debugging will be slightly less informative
	            // (i.e. toString will say 'spy' rather than 'myFunc').
	            if (!name) {
	                var matches = func.toString().match(/function ([^\s\(]+)/);
	                name = matches && matches[1];
	            }

	            return name;
	        };

	        sinon.functionToString = function toString() {
	            if (this.getCall && this.callCount) {
	                var thisValue, prop, i = this.callCount;

	                while (i--) {
	                    thisValue = this.getCall(i).thisValue;

	                    for (prop in thisValue) {
	                        if (thisValue[prop] === this) {
	                            return prop;
	                        }
	                    }
	                }
	            }

	            return this.displayName || "sinon fake";
	        };

	        sinon.objectKeys = function objectKeys(obj) {
	            if (obj !== Object(obj)) {
	                throw new TypeError("sinon.objectKeys called on a non-object");
	            }

	            var keys = [];
	            var key;
	            for (key in obj) {
	                if (hasOwn.call(obj, key)) {
	                    keys.push(key);
	                }
	            }

	            return keys;
	        };

	        sinon.getPropertyDescriptor = function getPropertyDescriptor(object, property) {
	            var proto = object, descriptor;
	            while (proto && !(descriptor = Object.getOwnPropertyDescriptor(proto, property))) {
	                proto = Object.getPrototypeOf(proto);
	            }
	            return descriptor;
	        }

	        sinon.getConfig = function (custom) {
	            var config = {};
	            custom = custom || {};
	            var defaults = sinon.defaultConfig;

	            for (var prop in defaults) {
	                if (defaults.hasOwnProperty(prop)) {
	                    config[prop] = custom.hasOwnProperty(prop) ? custom[prop] : defaults[prop];
	                }
	            }

	            return config;
	        };

	        sinon.defaultConfig = {
	            injectIntoThis: true,
	            injectInto: null,
	            properties: ["spy", "stub", "mock", "clock", "server", "requests"],
	            useFakeTimers: true,
	            useFakeServer: true
	        };

	        sinon.timesInWords = function timesInWords(count) {
	            return count == 1 && "once" ||
	                count == 2 && "twice" ||
	                count == 3 && "thrice" ||
	                (count || 0) + " times";
	        };

	        sinon.calledInOrder = function (spies) {
	            for (var i = 1, l = spies.length; i < l; i++) {
	                if (!spies[i - 1].calledBefore(spies[i]) || !spies[i].called) {
	                    return false;
	                }
	            }

	            return true;
	        };

	        sinon.orderByFirstCall = function (spies) {
	            return spies.sort(function (a, b) {
	                // uuid, won't ever be equal
	                var aCall = a.getCall(0);
	                var bCall = b.getCall(0);
	                var aId = aCall && aCall.callId || -1;
	                var bId = bCall && bCall.callId || -1;

	                return aId < bId ? -1 : 1;
	            });
	        };

	        sinon.createStubInstance = function (constructor) {
	            if (typeof constructor !== "function") {
	                throw new TypeError("The constructor should be a function.");
	            }
	            return sinon.stub(sinon.create(constructor.prototype));
	        };

	        sinon.restore = function (object) {
	            if (object !== null && typeof object === "object") {
	                for (var prop in object) {
	                    if (isRestorable(object[prop])) {
	                        object[prop].restore();
	                    }
	                }
	            } else if (isRestorable(object)) {
	                object.restore();
	            }
	        };

	        return sinon;
	    }

	    makeApi(exports);
	}(typeof sinon == "object" && sinon || null));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * @depend core.js
	 * @depend ../extend.js
	 * @depend event.js
	 * @depend ../log_error.js
	 */
	/**
	 * Fake XDomainRequest object
	 */
	"use strict";

	if (typeof sinon == "undefined") {
	    this.sinon = {};
	}

	// wrapper for global
	(function (global) {
	    var xdr = { XDomainRequest: global.XDomainRequest };
	    xdr.GlobalXDomainRequest = global.XDomainRequest;
	    xdr.supportsXDR = typeof xdr.GlobalXDomainRequest != "undefined";
	    xdr.workingXDR = xdr.supportsXDR ? xdr.GlobalXDomainRequest :  false;

	    function makeApi(sinon) {
	        sinon.xdr = xdr;

	        function FakeXDomainRequest() {
	            this.readyState = FakeXDomainRequest.UNSENT;
	            this.requestBody = null;
	            this.requestHeaders = {};
	            this.status = 0;
	            this.timeout = null;

	            if (typeof FakeXDomainRequest.onCreate == "function") {
	                FakeXDomainRequest.onCreate(this);
	            }
	        }

	        function verifyState(xdr) {
	            if (xdr.readyState !== FakeXDomainRequest.OPENED) {
	                throw new Error("INVALID_STATE_ERR");
	            }

	            if (xdr.sendFlag) {
	                throw new Error("INVALID_STATE_ERR");
	            }
	        }

	        function verifyRequestSent(xdr) {
	            if (xdr.readyState == FakeXDomainRequest.UNSENT) {
	                throw new Error("Request not sent");
	            }
	            if (xdr.readyState == FakeXDomainRequest.DONE) {
	                throw new Error("Request done");
	            }
	        }

	        function verifyResponseBodyType(body) {
	            if (typeof body != "string") {
	                var error = new Error("Attempted to respond to fake XDomainRequest with " +
	                                    body + ", which is not a string.");
	                error.name = "InvalidBodyException";
	                throw error;
	            }
	        }

	        sinon.extend(FakeXDomainRequest.prototype, sinon.EventTarget, {
	            open: function open(method, url) {
	                this.method = method;
	                this.url = url;

	                this.responseText = null;
	                this.sendFlag = false;

	                this.readyStateChange(FakeXDomainRequest.OPENED);
	            },

	            readyStateChange: function readyStateChange(state) {
	                this.readyState = state;
	                var eventName = "";
	                switch (this.readyState) {
	                case FakeXDomainRequest.UNSENT:
	                    break;
	                case FakeXDomainRequest.OPENED:
	                    break;
	                case FakeXDomainRequest.LOADING:
	                    if (this.sendFlag) {
	                        //raise the progress event
	                        eventName = "onprogress";
	                    }
	                    break;
	                case FakeXDomainRequest.DONE:
	                    if (this.isTimeout) {
	                        eventName = "ontimeout"
	                    } else if (this.errorFlag || (this.status < 200 || this.status > 299)) {
	                        eventName = "onerror";
	                    } else {
	                        eventName = "onload"
	                    }
	                    break;
	                }

	                // raising event (if defined)
	                if (eventName) {
	                    if (typeof this[eventName] == "function") {
	                        try {
	                            this[eventName]();
	                        } catch (e) {
	                            sinon.logError("Fake XHR " + eventName + " handler", e);
	                        }
	                    }
	                }
	            },

	            send: function send(data) {
	                verifyState(this);

	                if (!/^(get|head)$/i.test(this.method)) {
	                    this.requestBody = data;
	                }
	                this.requestHeaders["Content-Type"] = "text/plain;charset=utf-8";

	                this.errorFlag = false;
	                this.sendFlag = true;
	                this.readyStateChange(FakeXDomainRequest.OPENED);

	                if (typeof this.onSend == "function") {
	                    this.onSend(this);
	                }
	            },

	            abort: function abort() {
	                this.aborted = true;
	                this.responseText = null;
	                this.errorFlag = true;

	                if (this.readyState > sinon.FakeXDomainRequest.UNSENT && this.sendFlag) {
	                    this.readyStateChange(sinon.FakeXDomainRequest.DONE);
	                    this.sendFlag = false;
	                }
	            },

	            setResponseBody: function setResponseBody(body) {
	                verifyRequestSent(this);
	                verifyResponseBodyType(body);

	                var chunkSize = this.chunkSize || 10;
	                var index = 0;
	                this.responseText = "";

	                do {
	                    this.readyStateChange(FakeXDomainRequest.LOADING);
	                    this.responseText += body.substring(index, index + chunkSize);
	                    index += chunkSize;
	                } while (index < body.length);

	                this.readyStateChange(FakeXDomainRequest.DONE);
	            },

	            respond: function respond(status, contentType, body) {
	                // content-type ignored, since XDomainRequest does not carry this
	                // we keep the same syntax for respond(...) as for FakeXMLHttpRequest to ease
	                // test integration across browsers
	                this.status = typeof status == "number" ? status : 200;
	                this.setResponseBody(body || "");
	            },

	            simulatetimeout: function simulatetimeout() {
	                this.status = 0;
	                this.isTimeout = true;
	                // Access to this should actually throw an error
	                this.responseText = undefined;
	                this.readyStateChange(FakeXDomainRequest.DONE);
	            }
	        });

	        sinon.extend(FakeXDomainRequest, {
	            UNSENT: 0,
	            OPENED: 1,
	            LOADING: 3,
	            DONE: 4
	        });

	        sinon.useFakeXDomainRequest = function useFakeXDomainRequest() {
	            sinon.FakeXDomainRequest.restore = function restore(keepOnCreate) {
	                if (xdr.supportsXDR) {
	                    global.XDomainRequest = xdr.GlobalXDomainRequest;
	                }

	                delete sinon.FakeXDomainRequest.restore;

	                if (keepOnCreate !== true) {
	                    delete sinon.FakeXDomainRequest.onCreate;
	                }
	            };
	            if (xdr.supportsXDR) {
	                global.XDomainRequest = sinon.FakeXDomainRequest;
	            }
	            return sinon.FakeXDomainRequest;
	        };

	        sinon.FakeXDomainRequest = FakeXDomainRequest;
	    }

	    var sinon = __webpack_require__(5);
	    __webpack_require__(7);
	    __webpack_require__(8);
	    __webpack_require__(9);
	    makeApi(sinon);
	    module.exports = sinon;
	})(typeof global !== "undefined" ? global : self);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @depend util/core.js
	 */
	"use strict";

	(function (sinon) {
	    function makeApi(sinon) {

	        // Adapted from https://developer.mozilla.org/en/docs/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug
	        var hasDontEnumBug = (function () {
	            var obj = {
	                constructor: function () {
	                    return "0";
	                },
	                toString: function () {
	                    return "1";
	                },
	                valueOf: function () {
	                    return "2";
	                },
	                toLocaleString: function () {
	                    return "3";
	                },
	                prototype: function () {
	                    return "4";
	                },
	                isPrototypeOf: function () {
	                    return "5";
	                },
	                propertyIsEnumerable: function () {
	                    return "6";
	                },
	                hasOwnProperty: function () {
	                    return "7";
	                },
	                length: function () {
	                    return "8";
	                },
	                unique: function () {
	                    return "9"
	                }
	            };

	            var result = [];
	            for (var prop in obj) {
	                result.push(obj[prop]());
	            }
	            return result.join("") !== "0123456789";
	        })();

	        /* Public: Extend target in place with all (own) properties from sources in-order. Thus, last source will
	         *         override properties in previous sources.
	         *
	         * target - The Object to extend
	         * sources - Objects to copy properties from.
	         *
	         * Returns the extended target
	         */
	        function extend(target /*, sources */) {
	            var sources = Array.prototype.slice.call(arguments, 1),
	                source, i, prop;

	            for (i = 0; i < sources.length; i++) {
	                source = sources[i];

	                for (prop in source) {
	                    if (source.hasOwnProperty(prop)) {
	                        target[prop] = source[prop];
	                    }
	                }

	                // Make sure we copy (own) toString method even when in JScript with DontEnum bug
	                // See https://developer.mozilla.org/en/docs/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug
	                if (hasDontEnumBug && source.hasOwnProperty("toString") && source.toString !== target.toString) {
	                    target.toString = source.toString;
	                }
	            }

	            return target;
	        };

	        sinon.extend = extend;
	        return sinon.extend;
	    }

	    var sinon = __webpack_require__(5);
	    module.exports = makeApi(sinon);

	}(typeof sinon == "object" && sinon || null));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Minimal Event interface implementation
	 *
	 * Original implementation by Sven Fuchs: https://gist.github.com/995028
	 * Modifications and tests by Christian Johansen.
	 *
	 * @author Sven Fuchs (svenfuchs@artweb-design.de)
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2011 Sven Fuchs, Christian Johansen
	 */
	"use strict";

	if (typeof sinon == "undefined") {
	    this.sinon = {};
	}

	(function () {
	    var push = [].push;

	    function makeApi(sinon) {
	        sinon.Event = function Event(type, bubbles, cancelable, target) {
	            this.initEvent(type, bubbles, cancelable, target);
	        };

	        sinon.Event.prototype = {
	            initEvent: function (type, bubbles, cancelable, target) {
	                this.type = type;
	                this.bubbles = bubbles;
	                this.cancelable = cancelable;
	                this.target = target;
	            },

	            stopPropagation: function () {},

	            preventDefault: function () {
	                this.defaultPrevented = true;
	            }
	        };

	        sinon.ProgressEvent = function ProgressEvent(type, progressEventRaw, target) {
	            this.initEvent(type, false, false, target);
	            this.loaded = progressEventRaw.loaded || null;
	            this.total = progressEventRaw.total || null;
	            this.lengthComputable = !!progressEventRaw.total;
	        };

	        sinon.ProgressEvent.prototype = new sinon.Event();

	        sinon.ProgressEvent.prototype.constructor =  sinon.ProgressEvent;

	        sinon.CustomEvent = function CustomEvent(type, customData, target) {
	            this.initEvent(type, false, false, target);
	            this.detail = customData.detail || null;
	        };

	        sinon.CustomEvent.prototype = new sinon.Event();

	        sinon.CustomEvent.prototype.constructor =  sinon.CustomEvent;

	        sinon.EventTarget = {
	            addEventListener: function addEventListener(event, listener) {
	                this.eventListeners = this.eventListeners || {};
	                this.eventListeners[event] = this.eventListeners[event] || [];
	                push.call(this.eventListeners[event], listener);
	            },

	            removeEventListener: function removeEventListener(event, listener) {
	                var listeners = this.eventListeners && this.eventListeners[event] || [];

	                for (var i = 0, l = listeners.length; i < l; ++i) {
	                    if (listeners[i] == listener) {
	                        return listeners.splice(i, 1);
	                    }
	                }
	            },

	            dispatchEvent: function dispatchEvent(event) {
	                var type = event.type;
	                var listeners = this.eventListeners && this.eventListeners[type] || [];

	                for (var i = 0; i < listeners.length; i++) {
	                    if (typeof listeners[i] == "function") {
	                        listeners[i].call(this, event);
	                    } else {
	                        listeners[i].handleEvent(event);
	                    }
	                }

	                return !!event.defaultPrevented;
	            }
	        };
	    }

	    var sinon = __webpack_require__(5);
	    makeApi(sinon);
	}());


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @depend util/core.js
	 */
	/**
	 * Logs errors
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2014 Christian Johansen
	 */
	"use strict";

	(function (sinon) {
	    // cache a reference to setTimeout, so that our reference won't be stubbed out
	    // when using fake timers and errors will still get logged
	    // https://github.com/cjohansen/Sinon.JS/issues/381
	    var realSetTimeout = setTimeout;

	    function makeApi(sinon) {

	        function log() {}

	        function logError(label, err) {
	            var msg = label + " threw exception: ";

	            sinon.log(msg + "[" + err.name + "] " + err.message);

	            if (err.stack) {
	                sinon.log(err.stack);
	            }

	            logError.setTimeout(function () {
	                err.message = msg + err.message;
	                throw err;
	            }, 0);
	        };

	        // wrap realSetTimeout with something we can stub in tests
	        logError.setTimeout = function (func, timeout) {
	            realSetTimeout(func, timeout);
	        }

	        var exports = {};
	        exports.log = sinon.log = log;
	        exports.logError = sinon.logError = logError;

	        return exports;
	    }

	    var sinon = __webpack_require__(5);
	    module.exports = makeApi(sinon);
	}(typeof sinon == "object" && sinon || null));


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * @depend core.js
	 * @depend ../extend.js
	 * @depend event.js
	 * @depend ../log_error.js
	 */
	/**
	 * Fake XMLHttpRequest object
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	"use strict";

	(function (global) {

	    var supportsProgress = typeof ProgressEvent !== "undefined";
	    var supportsCustomEvent = typeof CustomEvent !== "undefined";
	    var supportsFormData = typeof FormData !== "undefined";
	    var sinonXhr = { XMLHttpRequest: global.XMLHttpRequest };
	    sinonXhr.GlobalXMLHttpRequest = global.XMLHttpRequest;
	    sinonXhr.GlobalActiveXObject = global.ActiveXObject;
	    sinonXhr.supportsActiveX = typeof sinonXhr.GlobalActiveXObject != "undefined";
	    sinonXhr.supportsXHR = typeof sinonXhr.GlobalXMLHttpRequest != "undefined";
	    sinonXhr.workingXHR = sinonXhr.supportsXHR ? sinonXhr.GlobalXMLHttpRequest : sinonXhr.supportsActiveX
	                                     ? function () {
	                                        return new sinonXhr.GlobalActiveXObject("MSXML2.XMLHTTP.3.0")
	                                    } : false;
	    sinonXhr.supportsCORS = sinonXhr.supportsXHR && "withCredentials" in (new sinonXhr.GlobalXMLHttpRequest());

	    /*jsl:ignore*/
	    var unsafeHeaders = {
	        "Accept-Charset": true,
	        "Accept-Encoding": true,
	        Connection: true,
	        "Content-Length": true,
	        Cookie: true,
	        Cookie2: true,
	        "Content-Transfer-Encoding": true,
	        Date: true,
	        Expect: true,
	        Host: true,
	        "Keep-Alive": true,
	        Referer: true,
	        TE: true,
	        Trailer: true,
	        "Transfer-Encoding": true,
	        Upgrade: true,
	        "User-Agent": true,
	        Via: true
	    };
	    /*jsl:end*/

	    // Note that for FakeXMLHttpRequest to work pre ES5
	    // we lose some of the alignment with the spec.
	    // To ensure as close a match as possible,
	    // set responseType before calling open, send or respond;
	    function FakeXMLHttpRequest() {
	        this.readyState = FakeXMLHttpRequest.UNSENT;
	        this.requestHeaders = {};
	        this.requestBody = null;
	        this.status = 0;
	        this.statusText = "";
	        this.upload = new UploadProgress();
	        this.responseType = "";
	        this.response = "";
	        if (sinonXhr.supportsCORS) {
	            this.withCredentials = false;
	        }

	        var xhr = this;
	        var events = ["loadstart", "load", "abort", "loadend"];

	        function addEventListener(eventName) {
	            xhr.addEventListener(eventName, function (event) {
	                var listener = xhr["on" + eventName];

	                if (listener && typeof listener == "function") {
	                    listener.call(this, event);
	                }
	            });
	        }

	        for (var i = events.length - 1; i >= 0; i--) {
	            addEventListener(events[i]);
	        }

	        if (typeof FakeXMLHttpRequest.onCreate == "function") {
	            FakeXMLHttpRequest.onCreate(this);
	        }
	    }

	    // An upload object is created for each
	    // FakeXMLHttpRequest and allows upload
	    // events to be simulated using uploadProgress
	    // and uploadError.
	    function UploadProgress() {
	        this.eventListeners = {
	            progress: [],
	            load: [],
	            abort: [],
	            error: []
	        }
	    }

	    UploadProgress.prototype.addEventListener = function addEventListener(event, listener) {
	        this.eventListeners[event].push(listener);
	    };

	    UploadProgress.prototype.removeEventListener = function removeEventListener(event, listener) {
	        var listeners = this.eventListeners[event] || [];

	        for (var i = 0, l = listeners.length; i < l; ++i) {
	            if (listeners[i] == listener) {
	                return listeners.splice(i, 1);
	            }
	        }
	    };

	    UploadProgress.prototype.dispatchEvent = function dispatchEvent(event) {
	        var listeners = this.eventListeners[event.type] || [];

	        for (var i = 0, listener; (listener = listeners[i]) != null; i++) {
	            listener(event);
	        }
	    };

	    function verifyState(xhr) {
	        if (xhr.readyState !== FakeXMLHttpRequest.OPENED) {
	            throw new Error("INVALID_STATE_ERR");
	        }

	        if (xhr.sendFlag) {
	            throw new Error("INVALID_STATE_ERR");
	        }
	    }

	    function getHeader(headers, header) {
	        header = header.toLowerCase();

	        for (var h in headers) {
	            if (h.toLowerCase() == header) {
	                return h;
	            }
	        }

	        return null;
	    }

	    // filtering to enable a white-list version of Sinon FakeXhr,
	    // where whitelisted requests are passed through to real XHR
	    function each(collection, callback) {
	        if (!collection) {
	            return;
	        }

	        for (var i = 0, l = collection.length; i < l; i += 1) {
	            callback(collection[i]);
	        }
	    }
	    function some(collection, callback) {
	        for (var index = 0; index < collection.length; index++) {
	            if (callback(collection[index]) === true) {
	                return true;
	            }
	        }
	        return false;
	    }
	    // largest arity in XHR is 5 - XHR#open
	    var apply = function (obj, method, args) {
	        switch (args.length) {
	        case 0: return obj[method]();
	        case 1: return obj[method](args[0]);
	        case 2: return obj[method](args[0], args[1]);
	        case 3: return obj[method](args[0], args[1], args[2]);
	        case 4: return obj[method](args[0], args[1], args[2], args[3]);
	        case 5: return obj[method](args[0], args[1], args[2], args[3], args[4]);
	        }
	    };

	    FakeXMLHttpRequest.filters = [];
	    FakeXMLHttpRequest.addFilter = function addFilter(fn) {
	        this.filters.push(fn)
	    };
	    var IE6Re = /MSIE 6/;
	    FakeXMLHttpRequest.defake = function defake(fakeXhr, xhrArgs) {
	        var xhr = new sinonXhr.workingXHR();
	        each([
	            "open",
	            "setRequestHeader",
	            "send",
	            "abort",
	            "getResponseHeader",
	            "getAllResponseHeaders",
	            "addEventListener",
	            "overrideMimeType",
	            "removeEventListener"
	        ], function (method) {
	            fakeXhr[method] = function () {
	                return apply(xhr, method, arguments);
	            };
	        });

	        var copyAttrs = function (args) {
	            each(args, function (attr) {
	                try {
	                    fakeXhr[attr] = xhr[attr]
	                } catch (e) {
	                    if (!IE6Re.test(navigator.userAgent)) {
	                        throw e;
	                    }
	                }
	            });
	        };

	        var stateChange = function stateChange() {
	            fakeXhr.readyState = xhr.readyState;
	            if (xhr.readyState >= FakeXMLHttpRequest.HEADERS_RECEIVED) {
	                copyAttrs(["status", "statusText"]);
	            }
	            if (xhr.readyState >= FakeXMLHttpRequest.LOADING) {
	                copyAttrs(["responseText", "response"]);
	            }
	            if (xhr.readyState === FakeXMLHttpRequest.DONE) {
	                copyAttrs(["responseXML"]);
	            }
	            if (fakeXhr.onreadystatechange) {
	                fakeXhr.onreadystatechange.call(fakeXhr, { target: fakeXhr });
	            }
	        };

	        if (xhr.addEventListener) {
	            for (var event in fakeXhr.eventListeners) {
	                if (fakeXhr.eventListeners.hasOwnProperty(event)) {
	                    each(fakeXhr.eventListeners[event], function (handler) {
	                        xhr.addEventListener(event, handler);
	                    });
	                }
	            }
	            xhr.addEventListener("readystatechange", stateChange);
	        } else {
	            xhr.onreadystatechange = stateChange;
	        }
	        apply(xhr, "open", xhrArgs);
	    };
	    FakeXMLHttpRequest.useFilters = false;

	    function verifyRequestOpened(xhr) {
	        if (xhr.readyState != FakeXMLHttpRequest.OPENED) {
	            throw new Error("INVALID_STATE_ERR - " + xhr.readyState);
	        }
	    }

	    function verifyRequestSent(xhr) {
	        if (xhr.readyState == FakeXMLHttpRequest.DONE) {
	            throw new Error("Request done");
	        }
	    }

	    function verifyHeadersReceived(xhr) {
	        if (xhr.async && xhr.readyState != FakeXMLHttpRequest.HEADERS_RECEIVED) {
	            throw new Error("No headers received");
	        }
	    }

	    function verifyResponseBodyType(body) {
	        if (typeof body != "string") {
	            var error = new Error("Attempted to respond to fake XMLHttpRequest with " +
	                                 body + ", which is not a string.");
	            error.name = "InvalidBodyException";
	            throw error;
	        }
	    }

	    FakeXMLHttpRequest.parseXML = function parseXML(text) {
	        var xmlDoc;

	        if (typeof DOMParser != "undefined") {
	            var parser = new DOMParser();
	            xmlDoc = parser.parseFromString(text, "text/xml");
	        } else {
	            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	            xmlDoc.async = "false";
	            xmlDoc.loadXML(text);
	        }

	        return xmlDoc;
	    };

	    FakeXMLHttpRequest.statusCodes = {
	        100: "Continue",
	        101: "Switching Protocols",
	        200: "OK",
	        201: "Created",
	        202: "Accepted",
	        203: "Non-Authoritative Information",
	        204: "No Content",
	        205: "Reset Content",
	        206: "Partial Content",
	        207: "Multi-Status",
	        300: "Multiple Choice",
	        301: "Moved Permanently",
	        302: "Found",
	        303: "See Other",
	        304: "Not Modified",
	        305: "Use Proxy",
	        307: "Temporary Redirect",
	        400: "Bad Request",
	        401: "Unauthorized",
	        402: "Payment Required",
	        403: "Forbidden",
	        404: "Not Found",
	        405: "Method Not Allowed",
	        406: "Not Acceptable",
	        407: "Proxy Authentication Required",
	        408: "Request Timeout",
	        409: "Conflict",
	        410: "Gone",
	        411: "Length Required",
	        412: "Precondition Failed",
	        413: "Request Entity Too Large",
	        414: "Request-URI Too Long",
	        415: "Unsupported Media Type",
	        416: "Requested Range Not Satisfiable",
	        417: "Expectation Failed",
	        422: "Unprocessable Entity",
	        500: "Internal Server Error",
	        501: "Not Implemented",
	        502: "Bad Gateway",
	        503: "Service Unavailable",
	        504: "Gateway Timeout",
	        505: "HTTP Version Not Supported"
	    };

	    function makeApi(sinon) {
	        sinon.xhr = sinonXhr;

	        sinon.extend(FakeXMLHttpRequest.prototype, sinon.EventTarget, {
	            async: true,

	            open: function open(method, url, async, username, password) {
	                this.method = method;
	                this.url = url;
	                this.async = typeof async == "boolean" ? async : true;
	                this.username = username;
	                this.password = password;
	                this.responseText = null;
	                this.response = this.responseType === "json" ? null : "";
	                this.responseXML = null;
	                this.requestHeaders = {};
	                this.sendFlag = false;

	                if (FakeXMLHttpRequest.useFilters === true) {
	                    var xhrArgs = arguments;
	                    var defake = some(FakeXMLHttpRequest.filters, function (filter) {
	                        return filter.apply(this, xhrArgs)
	                    });
	                    if (defake) {
	                        return FakeXMLHttpRequest.defake(this, arguments);
	                    }
	                }
	                this.readyStateChange(FakeXMLHttpRequest.OPENED);
	            },

	            readyStateChange: function readyStateChange(state) {
	                this.readyState = state;

	                if (typeof this.onreadystatechange == "function") {
	                    try {
	                        this.onreadystatechange();
	                    } catch (e) {
	                        sinon.logError("Fake XHR onreadystatechange handler", e);
	                    }
	                }

	                switch (this.readyState) {
	                    case FakeXMLHttpRequest.DONE:
	                        if (supportsProgress) {
	                            this.upload.dispatchEvent(new sinon.ProgressEvent("progress", {loaded: 100, total: 100}));
	                            this.dispatchEvent(new sinon.ProgressEvent("progress", {loaded: 100, total: 100}));
	                        }
	                        this.upload.dispatchEvent(new sinon.Event("load", false, false, this));
	                        this.dispatchEvent(new sinon.Event("load", false, false, this));
	                        this.dispatchEvent(new sinon.Event("loadend", false, false, this));
	                        break;
	                }

	                this.dispatchEvent(new sinon.Event("readystatechange"));
	            },

	            setRequestHeader: function setRequestHeader(header, value) {
	                verifyState(this);

	                if (unsafeHeaders[header] || /^(Sec-|Proxy-)/.test(header)) {
	                    throw new Error("Refused to set unsafe header \"" + header + "\"");
	                }

	                if (this.requestHeaders[header]) {
	                    this.requestHeaders[header] += "," + value;
	                } else {
	                    this.requestHeaders[header] = value;
	                }
	            },

	            // Helps testing
	            setResponseHeaders: function setResponseHeaders(headers) {
	                verifyRequestOpened(this);
	                this.responseHeaders = {};

	                for (var header in headers) {
	                    if (headers.hasOwnProperty(header)) {
	                        this.responseHeaders[header] = headers[header];
	                    }
	                }

	                if (this.async) {
	                    this.readyStateChange(FakeXMLHttpRequest.HEADERS_RECEIVED);
	                } else {
	                    this.readyState = FakeXMLHttpRequest.HEADERS_RECEIVED;
	                }
	            },

	            // Currently treats ALL data as a DOMString (i.e. no Document)
	            send: function send(data) {
	                verifyState(this);

	                if (!/^(get|head)$/i.test(this.method)) {
	                    var contentType = getHeader(this.requestHeaders, "Content-Type");
	                    if (this.requestHeaders[contentType]) {
	                        var value = this.requestHeaders[contentType].split(";");
	                        this.requestHeaders[contentType] = value[0] + ";charset=utf-8";
	                    } else if (supportsFormData && !(data instanceof FormData)) {
	                        this.requestHeaders["Content-Type"] = "text/plain;charset=utf-8";
	                    }

	                    this.requestBody = data;
	                }

	                this.errorFlag = false;
	                this.sendFlag = this.async;
	                this.response = this.responseType === "json" ? null : "";
	                this.readyStateChange(FakeXMLHttpRequest.OPENED);

	                if (typeof this.onSend == "function") {
	                    this.onSend(this);
	                }

	                this.dispatchEvent(new sinon.Event("loadstart", false, false, this));
	            },

	            abort: function abort() {
	                this.aborted = true;
	                this.responseText = null;
	                this.response = this.responseType === "json" ? null : "";
	                this.errorFlag = true;
	                this.requestHeaders = {};
	                this.responseHeaders = {};

	                if (this.readyState > FakeXMLHttpRequest.UNSENT && this.sendFlag) {
	                    this.readyStateChange(FakeXMLHttpRequest.DONE);
	                    this.sendFlag = false;
	                }

	                this.readyState = FakeXMLHttpRequest.UNSENT;

	                this.dispatchEvent(new sinon.Event("abort", false, false, this));

	                this.upload.dispatchEvent(new sinon.Event("abort", false, false, this));

	                if (typeof this.onerror === "function") {
	                    this.onerror();
	                }
	            },

	            getResponseHeader: function getResponseHeader(header) {
	                if (this.readyState < FakeXMLHttpRequest.HEADERS_RECEIVED) {
	                    return null;
	                }

	                if (/^Set-Cookie2?$/i.test(header)) {
	                    return null;
	                }

	                header = getHeader(this.responseHeaders, header);

	                return this.responseHeaders[header] || null;
	            },

	            getAllResponseHeaders: function getAllResponseHeaders() {
	                if (this.readyState < FakeXMLHttpRequest.HEADERS_RECEIVED) {
	                    return "";
	                }

	                var headers = "";

	                for (var header in this.responseHeaders) {
	                    if (this.responseHeaders.hasOwnProperty(header) &&
	                        !/^Set-Cookie2?$/i.test(header)) {
	                        headers += header + ": " + this.responseHeaders[header] + "\r\n";
	                    }
	                }

	                return headers;
	            },

	            setResponseBody: function setResponseBody(body) {
	                verifyRequestSent(this);
	                verifyHeadersReceived(this);
	                verifyResponseBodyType(body);

	                var chunkSize = this.chunkSize || 10;
	                var index = 0;
	                this.responseText = "";

	                do {
	                    if (this.async) {
	                        this.readyStateChange(FakeXMLHttpRequest.LOADING);
	                    }

	                    this.responseText += body.substring(index, index + chunkSize);
	                    index += chunkSize;
	                } while (index < body.length);

	                var type = this.getResponseHeader("Content-Type");

	                if (this.responseText &&
	                    (!type || /(text\/xml)|(application\/xml)|(\+xml)/.test(type))) {
	                    try {
	                        this.responseXML = FakeXMLHttpRequest.parseXML(this.responseText);
	                    } catch (e) {
	                        // Unable to parse XML - no biggie
	                    }
	                }

	                this.response = this.responseType === "json" ? JSON.parse(this.responseText) : this.responseText;
	                this.readyStateChange(FakeXMLHttpRequest.DONE);
	            },

	            respond: function respond(status, headers, body) {
	                this.status = typeof status == "number" ? status : 200;
	                this.statusText = FakeXMLHttpRequest.statusCodes[this.status];
	                this.setResponseHeaders(headers || {});
	                this.setResponseBody(body || "");
	            },

	            uploadProgress: function uploadProgress(progressEventRaw) {
	                if (supportsProgress) {
	                    this.upload.dispatchEvent(new sinon.ProgressEvent("progress", progressEventRaw));
	                }
	            },

	            downloadProgress: function downloadProgress(progressEventRaw) {
	                if (supportsProgress) {
	                    this.dispatchEvent(new sinon.ProgressEvent("progress", progressEventRaw));
	                }
	            },

	            uploadError: function uploadError(error) {
	                if (supportsCustomEvent) {
	                    this.upload.dispatchEvent(new sinon.CustomEvent("error", {detail: error}));
	                }
	            }
	        });

	        sinon.extend(FakeXMLHttpRequest, {
	            UNSENT: 0,
	            OPENED: 1,
	            HEADERS_RECEIVED: 2,
	            LOADING: 3,
	            DONE: 4
	        });

	        sinon.useFakeXMLHttpRequest = function () {
	            FakeXMLHttpRequest.restore = function restore(keepOnCreate) {
	                if (sinonXhr.supportsXHR) {
	                    global.XMLHttpRequest = sinonXhr.GlobalXMLHttpRequest;
	                }

	                if (sinonXhr.supportsActiveX) {
	                    global.ActiveXObject = sinonXhr.GlobalActiveXObject;
	                }

	                delete FakeXMLHttpRequest.restore;

	                if (keepOnCreate !== true) {
	                    delete FakeXMLHttpRequest.onCreate;
	                }
	            };
	            if (sinonXhr.supportsXHR) {
	                global.XMLHttpRequest = FakeXMLHttpRequest;
	            }

	            if (sinonXhr.supportsActiveX) {
	                global.ActiveXObject = function ActiveXObject(objId) {
	                    if (objId == "Microsoft.XMLHTTP" || /^Msxml2\.XMLHTTP/i.test(objId)) {

	                        return new FakeXMLHttpRequest();
	                    }

	                    return new sinonXhr.GlobalActiveXObject(objId);
	                };
	            }

	            return FakeXMLHttpRequest;
	        };

	        sinon.FakeXMLHttpRequest = FakeXMLHttpRequest;
	    }

	    var sinon = __webpack_require__(5);
	    __webpack_require__(7);
	    __webpack_require__(8);
	    __webpack_require__(9);
	    makeApi(sinon);
	    module.exports = sinon;

	})(typeof global !== "undefined" ? global : self);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @depend util/core.js
	 */
	/**
	 * Format functions
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2014 Christian Johansen
	 */
	"use strict";

	(function (sinon, formatio) {
	    function makeApi(sinon) {
	        function valueFormatter(value) {
	            return "" + value;
	        }

	        function getFormatioFormatter() {
	            var formatter = formatio.configure({
	                    quoteStrings: false,
	                    limitChildrenCount: 250
	                });

	            function format() {
	                return formatter.ascii.apply(formatter, arguments);
	            };

	            return format;
	        }

	        function getNodeFormatter(value) {
	            function format(value) {
	                return typeof value == "object" && value.toString === Object.prototype.toString ? util.inspect(value) : value;
	            };

	            try {
	                var util = __webpack_require__(12);
	            } catch (e) {
	                /* Node, but no util module - would be very old, but better safe than sorry */
	            }

	            return util ? format : valueFormatter;
	        }

	        var isNode = typeof module !== "undefined" && module.exports && "function" == "function",
	            formatter;

	        if (isNode) {
	            try {
	                formatio = __webpack_require__(16);
	            } catch (e) {}
	        }

	        if (formatio) {
	            formatter = getFormatioFormatter()
	        } else if (isNode) {
	            formatter = getNodeFormatter();
	        } else {
	            formatter = valueFormatter;
	        }

	        sinon.format = formatter;
	        return sinon.format;
	    }

	    var sinon = __webpack_require__(5);
	    module.exports = makeApi(sinon);
	}(
	    (typeof sinon == "object" && sinon || null),
	    (typeof formatio == "object" && formatio)
	));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(14);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(15);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(13)))

/***/ },
/* 13 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {(("function" === "function" && __webpack_require__(17) && function (m) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(18)], __WEBPACK_AMD_DEFINE_FACTORY__ = (m), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}) || (typeof module === "object" && function (m) {
	    module.exports = m(__webpack_require__(18));
	}) || function (m) { this.formatio = m(this.samsam); }
	)(function (samsam) {
	    "use strict";

	    var formatio = {
	        excludeConstructors: ["Object", /^.$/],
	        quoteStrings: true,
	        limitChildrenCount: 0
	    };

	    var hasOwn = Object.prototype.hasOwnProperty;

	    var specialObjects = [];
	    if (typeof global !== "undefined") {
	        specialObjects.push({ object: global, value: "[object global]" });
	    }
	    if (typeof document !== "undefined") {
	        specialObjects.push({
	            object: document,
	            value: "[object HTMLDocument]"
	        });
	    }
	    if (typeof window !== "undefined") {
	        specialObjects.push({ object: window, value: "[object Window]" });
	    }

	    function functionName(func) {
	        if (!func) { return ""; }
	        if (func.displayName) { return func.displayName; }
	        if (func.name) { return func.name; }
	        var matches = func.toString().match(/function\s+([^\(]+)/m);
	        return (matches && matches[1]) || "";
	    }

	    function constructorName(f, object) {
	        var name = functionName(object && object.constructor);
	        var excludes = f.excludeConstructors ||
	                formatio.excludeConstructors || [];

	        var i, l;
	        for (i = 0, l = excludes.length; i < l; ++i) {
	            if (typeof excludes[i] === "string" && excludes[i] === name) {
	                return "";
	            } else if (excludes[i].test && excludes[i].test(name)) {
	                return "";
	            }
	        }

	        return name;
	    }

	    function isCircular(object, objects) {
	        if (typeof object !== "object") { return false; }
	        var i, l;
	        for (i = 0, l = objects.length; i < l; ++i) {
	            if (objects[i] === object) { return true; }
	        }
	        return false;
	    }

	    function ascii(f, object, processed, indent) {
	        if (typeof object === "string") {
	            var qs = f.quoteStrings;
	            var quote = typeof qs !== "boolean" || qs;
	            return processed || quote ? '"' + object + '"' : object;
	        }

	        if (typeof object === "function" && !(object instanceof RegExp)) {
	            return ascii.func(object);
	        }

	        processed = processed || [];

	        if (isCircular(object, processed)) { return "[Circular]"; }

	        if (Object.prototype.toString.call(object) === "[object Array]") {
	            return ascii.array.call(f, object, processed);
	        }

	        if (!object) { return String((1/object) === -Infinity ? "-0" : object); }
	        if (samsam.isElement(object)) { return ascii.element(object); }

	        if (typeof object.toString === "function" &&
	                object.toString !== Object.prototype.toString) {
	            return object.toString();
	        }

	        var i, l;
	        for (i = 0, l = specialObjects.length; i < l; i++) {
	            if (object === specialObjects[i].object) {
	                return specialObjects[i].value;
	            }
	        }

	        return ascii.object.call(f, object, processed, indent);
	    }

	    ascii.func = function (func) {
	        return "function " + functionName(func) + "() {}";
	    };

	    ascii.array = function (array, processed) {
	        processed = processed || [];
	        processed.push(array);
	        var pieces = [];
	        var i, l;
	        l = (this.limitChildrenCount > 0) ? 
	            Math.min(this.limitChildrenCount, array.length) : array.length;

	        for (i = 0; i < l; ++i) {
	            pieces.push(ascii(this, array[i], processed));
	        }

	        if(l < array.length)
	            pieces.push("[... " + (array.length - l) + " more elements]");

	        return "[" + pieces.join(", ") + "]";
	    };

	    ascii.object = function (object, processed, indent) {
	        processed = processed || [];
	        processed.push(object);
	        indent = indent || 0;
	        var pieces = [], properties = samsam.keys(object).sort();
	        var length = 3;
	        var prop, str, obj, i, k, l;
	        l = (this.limitChildrenCount > 0) ? 
	            Math.min(this.limitChildrenCount, properties.length) : properties.length;

	        for (i = 0; i < l; ++i) {
	            prop = properties[i];
	            obj = object[prop];

	            if (isCircular(obj, processed)) {
	                str = "[Circular]";
	            } else {
	                str = ascii(this, obj, processed, indent + 2);
	            }

	            str = (/\s/.test(prop) ? '"' + prop + '"' : prop) + ": " + str;
	            length += str.length;
	            pieces.push(str);
	        }

	        var cons = constructorName(this, object);
	        var prefix = cons ? "[" + cons + "] " : "";
	        var is = "";
	        for (i = 0, k = indent; i < k; ++i) { is += " "; }

	        if(l < properties.length)
	            pieces.push("[... " + (properties.length - l) + " more elements]");

	        if (length + indent > 80) {
	            return prefix + "{\n  " + is + pieces.join(",\n  " + is) + "\n" +
	                is + "}";
	        }
	        return prefix + "{ " + pieces.join(", ") + " }";
	    };

	    ascii.element = function (element) {
	        var tagName = element.tagName.toLowerCase();
	        var attrs = element.attributes, attr, pairs = [], attrName, i, l, val;

	        for (i = 0, l = attrs.length; i < l; ++i) {
	            attr = attrs.item(i);
	            attrName = attr.nodeName.toLowerCase().replace("html:", "");
	            val = attr.nodeValue;
	            if (attrName !== "contenteditable" || val !== "inherit") {
	                if (!!val) { pairs.push(attrName + "=\"" + val + "\""); }
	            }
	        }

	        var formatted = "<" + tagName + (pairs.length > 0 ? " " : "");
	        var content = element.innerHTML;

	        if (content.length > 20) {
	            content = content.substr(0, 20) + "[...]";
	        }

	        var res = formatted + pairs.join(" ") + ">" + content +
	                "</" + tagName + ">";

	        return res.replace(/ contentEditable="inherit"/, "");
	    };

	    function Formatio(options) {
	        for (var opt in options) {
	            this[opt] = options[opt];
	        }
	    }

	    Formatio.prototype = {
	        functionName: functionName,

	        configure: function (options) {
	            return new Formatio(options);
	        },

	        constructorName: function (object) {
	            return constructorName(this, object);
	        },

	        ascii: function (object, processed, indent) {
	            return ascii(this, object, processed, indent);
	        }
	    };

	    return Formatio.prototype;
	});

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 17 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(("function" === "function" && __webpack_require__(17) && function (m) { !(__WEBPACK_AMD_DEFINE_FACTORY__ = (m), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); }) ||
	 (typeof module === "object" &&
	      function (m) { module.exports = m(); }) || // Node
	 function (m) { this.samsam = m(); } // Browser globals
	)(function () {
	    var o = Object.prototype;
	    var div = typeof document !== "undefined" && document.createElement("div");

	    function isNaN(value) {
	        // Unlike global isNaN, this avoids type coercion
	        // typeof check avoids IE host object issues, hat tip to
	        // lodash
	        var val = value; // JsLint thinks value !== value is "weird"
	        return typeof value === "number" && value !== val;
	    }

	    function getClass(value) {
	        // Returns the internal [[Class]] by calling Object.prototype.toString
	        // with the provided value as this. Return value is a string, naming the
	        // internal class, e.g. "Array"
	        return o.toString.call(value).split(/[ \]]/)[1];
	    }

	    /**
	     * @name samsam.isArguments
	     * @param Object object
	     *
	     * Returns ``true`` if ``object`` is an ``arguments`` object,
	     * ``false`` otherwise.
	     */
	    function isArguments(object) {
	        if (getClass(object) === 'Arguments') { return true; }
	        if (typeof object !== "object" || typeof object.length !== "number" ||
	                getClass(object) === "Array") {
	            return false;
	        }
	        if (typeof object.callee == "function") { return true; }
	        try {
	            object[object.length] = 6;
	            delete object[object.length];
	        } catch (e) {
	            return true;
	        }
	        return false;
	    }

	    /**
	     * @name samsam.isElement
	     * @param Object object
	     *
	     * Returns ``true`` if ``object`` is a DOM element node. Unlike
	     * Underscore.js/lodash, this function will return ``false`` if ``object``
	     * is an *element-like* object, i.e. a regular object with a ``nodeType``
	     * property that holds the value ``1``.
	     */
	    function isElement(object) {
	        if (!object || object.nodeType !== 1 || !div) { return false; }
	        try {
	            object.appendChild(div);
	            object.removeChild(div);
	        } catch (e) {
	            return false;
	        }
	        return true;
	    }

	    /**
	     * @name samsam.keys
	     * @param Object object
	     *
	     * Return an array of own property names.
	     */
	    function keys(object) {
	        var ks = [], prop;
	        for (prop in object) {
	            if (o.hasOwnProperty.call(object, prop)) { ks.push(prop); }
	        }
	        return ks;
	    }

	    /**
	     * @name samsam.isDate
	     * @param Object value
	     *
	     * Returns true if the object is a ``Date``, or *date-like*. Duck typing
	     * of date objects work by checking that the object has a ``getTime``
	     * function whose return value equals the return value from the object's
	     * ``valueOf``.
	     */
	    function isDate(value) {
	        return typeof value.getTime == "function" &&
	            value.getTime() == value.valueOf();
	    }

	    /**
	     * @name samsam.isNegZero
	     * @param Object value
	     *
	     * Returns ``true`` if ``value`` is ``-0``.
	     */
	    function isNegZero(value) {
	        return value === 0 && 1 / value === -Infinity;
	    }

	    /**
	     * @name samsam.equal
	     * @param Object obj1
	     * @param Object obj2
	     *
	     * Returns ``true`` if two objects are strictly equal. Compared to
	     * ``===`` there are two exceptions:
	     *
	     *   - NaN is considered equal to NaN
	     *   - -0 and +0 are not considered equal
	     */
	    function identical(obj1, obj2) {
	        if (obj1 === obj2 || (isNaN(obj1) && isNaN(obj2))) {
	            return obj1 !== 0 || isNegZero(obj1) === isNegZero(obj2);
	        }
	    }


	    /**
	     * @name samsam.deepEqual
	     * @param Object obj1
	     * @param Object obj2
	     *
	     * Deep equal comparison. Two values are "deep equal" if:
	     *
	     *   - They are equal, according to samsam.identical
	     *   - They are both date objects representing the same time
	     *   - They are both arrays containing elements that are all deepEqual
	     *   - They are objects with the same set of properties, and each property
	     *     in ``obj1`` is deepEqual to the corresponding property in ``obj2``
	     *
	     * Supports cyclic objects.
	     */
	    function deepEqualCyclic(obj1, obj2) {

	        // used for cyclic comparison
	        // contain already visited objects
	        var objects1 = [],
	            objects2 = [],
	        // contain pathes (position in the object structure)
	        // of the already visited objects
	        // indexes same as in objects arrays
	            paths1 = [],
	            paths2 = [],
	        // contains combinations of already compared objects
	        // in the manner: { "$1['ref']$2['ref']": true }
	            compared = {};

	        /**
	         * used to check, if the value of a property is an object
	         * (cyclic logic is only needed for objects)
	         * only needed for cyclic logic
	         */
	        function isObject(value) {

	            if (typeof value === 'object' && value !== null &&
	                    !(value instanceof Boolean) &&
	                    !(value instanceof Date)    &&
	                    !(value instanceof Number)  &&
	                    !(value instanceof RegExp)  &&
	                    !(value instanceof String)) {

	                return true;
	            }

	            return false;
	        }

	        /**
	         * returns the index of the given object in the
	         * given objects array, -1 if not contained
	         * only needed for cyclic logic
	         */
	        function getIndex(objects, obj) {

	            var i;
	            for (i = 0; i < objects.length; i++) {
	                if (objects[i] === obj) {
	                    return i;
	                }
	            }

	            return -1;
	        }

	        // does the recursion for the deep equal check
	        return (function deepEqual(obj1, obj2, path1, path2) {
	            var type1 = typeof obj1;
	            var type2 = typeof obj2;

	            // == null also matches undefined
	            if (obj1 === obj2 ||
	                    isNaN(obj1) || isNaN(obj2) ||
	                    obj1 == null || obj2 == null ||
	                    type1 !== "object" || type2 !== "object") {

	                return identical(obj1, obj2);
	            }

	            // Elements are only equal if identical(expected, actual)
	            if (isElement(obj1) || isElement(obj2)) { return false; }

	            var isDate1 = isDate(obj1), isDate2 = isDate(obj2);
	            if (isDate1 || isDate2) {
	                if (!isDate1 || !isDate2 || obj1.getTime() !== obj2.getTime()) {
	                    return false;
	                }
	            }

	            if (obj1 instanceof RegExp && obj2 instanceof RegExp) {
	                if (obj1.toString() !== obj2.toString()) { return false; }
	            }

	            var class1 = getClass(obj1);
	            var class2 = getClass(obj2);
	            var keys1 = keys(obj1);
	            var keys2 = keys(obj2);

	            if (isArguments(obj1) || isArguments(obj2)) {
	                if (obj1.length !== obj2.length) { return false; }
	            } else {
	                if (type1 !== type2 || class1 !== class2 ||
	                        keys1.length !== keys2.length) {
	                    return false;
	                }
	            }

	            var key, i, l,
	                // following vars are used for the cyclic logic
	                value1, value2,
	                isObject1, isObject2,
	                index1, index2,
	                newPath1, newPath2;

	            for (i = 0, l = keys1.length; i < l; i++) {
	                key = keys1[i];
	                if (!o.hasOwnProperty.call(obj2, key)) {
	                    return false;
	                }

	                // Start of the cyclic logic

	                value1 = obj1[key];
	                value2 = obj2[key];

	                isObject1 = isObject(value1);
	                isObject2 = isObject(value2);

	                // determine, if the objects were already visited
	                // (it's faster to check for isObject first, than to
	                // get -1 from getIndex for non objects)
	                index1 = isObject1 ? getIndex(objects1, value1) : -1;
	                index2 = isObject2 ? getIndex(objects2, value2) : -1;

	                // determine the new pathes of the objects
	                // - for non cyclic objects the current path will be extended
	                //   by current property name
	                // - for cyclic objects the stored path is taken
	                newPath1 = index1 !== -1
	                    ? paths1[index1]
	                    : path1 + '[' + JSON.stringify(key) + ']';
	                newPath2 = index2 !== -1
	                    ? paths2[index2]
	                    : path2 + '[' + JSON.stringify(key) + ']';

	                // stop recursion if current objects are already compared
	                if (compared[newPath1 + newPath2]) {
	                    return true;
	                }

	                // remember the current objects and their pathes
	                if (index1 === -1 && isObject1) {
	                    objects1.push(value1);
	                    paths1.push(newPath1);
	                }
	                if (index2 === -1 && isObject2) {
	                    objects2.push(value2);
	                    paths2.push(newPath2);
	                }

	                // remember that the current objects are already compared
	                if (isObject1 && isObject2) {
	                    compared[newPath1 + newPath2] = true;
	                }

	                // End of cyclic logic

	                // neither value1 nor value2 is a cycle
	                // continue with next level
	                if (!deepEqual(value1, value2, newPath1, newPath2)) {
	                    return false;
	                }
	            }

	            return true;

	        }(obj1, obj2, '$1', '$2'));
	    }

	    var match;

	    function arrayContains(array, subset) {
	        if (subset.length === 0) { return true; }
	        var i, l, j, k;
	        for (i = 0, l = array.length; i < l; ++i) {
	            if (match(array[i], subset[0])) {
	                for (j = 0, k = subset.length; j < k; ++j) {
	                    if (!match(array[i + j], subset[j])) { return false; }
	                }
	                return true;
	            }
	        }
	        return false;
	    }

	    /**
	     * @name samsam.match
	     * @param Object object
	     * @param Object matcher
	     *
	     * Compare arbitrary value ``object`` with matcher.
	     */
	    match = function match(object, matcher) {
	        if (matcher && typeof matcher.test === "function") {
	            return matcher.test(object);
	        }

	        if (typeof matcher === "function") {
	            return matcher(object) === true;
	        }

	        if (typeof matcher === "string") {
	            matcher = matcher.toLowerCase();
	            var notNull = typeof object === "string" || !!object;
	            return notNull &&
	                (String(object)).toLowerCase().indexOf(matcher) >= 0;
	        }

	        if (typeof matcher === "number") {
	            return matcher === object;
	        }

	        if (typeof matcher === "boolean") {
	            return matcher === object;
	        }

	        if (typeof(matcher) === "undefined") {
	            return typeof(object) === "undefined";
	        }

	        if (matcher === null) {
	            return object === null;
	        }

	        if (getClass(object) === "Array" && getClass(matcher) === "Array") {
	            return arrayContains(object, matcher);
	        }

	        if (matcher && typeof matcher === "object") {
	            if (matcher === object) {
	                return true;
	            }
	            var prop;
	            for (prop in matcher) {
	                var value = object[prop];
	                if (typeof value === "undefined" &&
	                        typeof object.getAttribute === "function") {
	                    value = object.getAttribute(prop);
	                }
	                if (matcher[prop] === null || typeof matcher[prop] === 'undefined') {
	                    if (value !== matcher[prop]) {
	                        return false;
	                    }
	                } else if (typeof  value === "undefined" || !match(value, matcher[prop])) {
	                    return false;
	                }
	            }
	            return true;
	        }

	        throw new Error("Matcher was not a string, a number, a " +
	                        "function, a boolean or an object");
	    };

	    return {
	        isArguments: isArguments,
	        isElement: isElement,
	        isDate: isDate,
	        isNegZero: isNegZero,
	        identical: identical,
	        deepEqual: deepEqualCyclic,
	        match: match,
	        keys: keys
	    };
	});


/***/ }
/******/ ]);