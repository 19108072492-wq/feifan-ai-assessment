/* ============================================================
 * AI 能力与风格测评 — app-bundle.js
 * 自动构建于 2026-07-13T07:53:07.213Z
 * ============================================================ */

/* React 18.3.1 UMD */
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(){'use strict';(function(c,x){"object"===typeof exports&&"undefined"!==typeof module?x(exports):"function"===typeof define&&define.amd?define(["exports"],x):(c=c||self,x(c.React={}))})(this,function(c){function x(a){if(null===a||"object"!==typeof a)return null;a=V&&a[V]||a["@@iterator"];return"function"===typeof a?a:null}function w(a,b,e){this.props=a;this.context=b;this.refs=W;this.updater=e||X}function Y(){}function K(a,b,e){this.props=a;this.context=b;this.refs=W;this.updater=e||X}function Z(a,b,
e){var m,d={},c=null,h=null;if(null!=b)for(m in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(c=""+b.key),b)aa.call(b,m)&&!ba.hasOwnProperty(m)&&(d[m]=b[m]);var l=arguments.length-2;if(1===l)d.children=e;else if(1<l){for(var f=Array(l),k=0;k<l;k++)f[k]=arguments[k+2];d.children=f}if(a&&a.defaultProps)for(m in l=a.defaultProps,l)void 0===d[m]&&(d[m]=l[m]);return{$$typeof:y,type:a,key:c,ref:h,props:d,_owner:L.current}}function oa(a,b){return{$$typeof:y,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}
function M(a){return"object"===typeof a&&null!==a&&a.$$typeof===y}function pa(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}function N(a,b){return"object"===typeof a&&null!==a&&null!=a.key?pa(""+a.key):b.toString(36)}function B(a,b,e,m,d){var c=typeof a;if("undefined"===c||"boolean"===c)a=null;var h=!1;if(null===a)h=!0;else switch(c){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case y:case qa:h=!0}}if(h)return h=a,d=d(h),a=""===m?"."+
N(h,0):m,ca(d)?(e="",null!=a&&(e=a.replace(da,"$&/")+"/"),B(d,b,e,"",function(a){return a})):null!=d&&(M(d)&&(d=oa(d,e+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(da,"$&/")+"/")+a)),b.push(d)),1;h=0;m=""===m?".":m+":";if(ca(a))for(var l=0;l<a.length;l++){c=a[l];var f=m+N(c,l);h+=B(c,b,e,f,d)}else if(f=x(a),"function"===typeof f)for(a=f.call(a),l=0;!(c=a.next()).done;)c=c.value,f=m+N(c,l++),h+=B(c,b,e,f,d);else if("object"===c)throw b=String(a),Error("Objects are not valid as a React child (found: "+
("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}function C(a,b,e){if(null==a)return a;var c=[],d=0;B(a,c,"","",function(a){return b.call(e,a,d++)});return c}function ra(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b});-1===a._status&&(a._status=
0,a._result=b)}if(1===a._status)return a._result.default;throw a._result;}function O(a,b){var e=a.length;a.push(b);a:for(;0<e;){var c=e-1>>>1,d=a[c];if(0<D(d,b))a[c]=b,a[e]=d,e=c;else break a}}function p(a){return 0===a.length?null:a[0]}function E(a){if(0===a.length)return null;var b=a[0],e=a.pop();if(e!==b){a[0]=e;a:for(var c=0,d=a.length,k=d>>>1;c<k;){var h=2*(c+1)-1,l=a[h],f=h+1,g=a[f];if(0>D(l,e))f<d&&0>D(g,l)?(a[c]=g,a[f]=e,c=f):(a[c]=l,a[h]=e,c=h);else if(f<d&&0>D(g,e))a[c]=g,a[f]=e,c=f;else break a}}return b}
function D(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}function P(a){for(var b=p(r);null!==b;){if(null===b.callback)E(r);else if(b.startTime<=a)E(r),b.sortIndex=b.expirationTime,O(q,b);else break;b=p(r)}}function Q(a){z=!1;P(a);if(!u)if(null!==p(q))u=!0,R(S);else{var b=p(r);null!==b&&T(Q,b.startTime-a)}}function S(a,b){u=!1;z&&(z=!1,ea(A),A=-1);F=!0;var c=k;try{P(b);for(n=p(q);null!==n&&(!(n.expirationTime>b)||a&&!fa());){var m=n.callback;if("function"===typeof m){n.callback=null;
k=n.priorityLevel;var d=m(n.expirationTime<=b);b=v();"function"===typeof d?n.callback=d:n===p(q)&&E(q);P(b)}else E(q);n=p(q)}if(null!==n)var g=!0;else{var h=p(r);null!==h&&T(Q,h.startTime-b);g=!1}return g}finally{n=null,k=c,F=!1}}function fa(){return v()-ha<ia?!1:!0}function R(a){G=a;H||(H=!0,I())}function T(a,b){A=ja(function(){a(v())},b)}function ka(a){throw Error("act(...) is not supported in production builds of React.");}var y=Symbol.for("react.element"),qa=Symbol.for("react.portal"),sa=Symbol.for("react.fragment"),
ta=Symbol.for("react.strict_mode"),ua=Symbol.for("react.profiler"),va=Symbol.for("react.provider"),wa=Symbol.for("react.context"),xa=Symbol.for("react.forward_ref"),ya=Symbol.for("react.suspense"),za=Symbol.for("react.memo"),Aa=Symbol.for("react.lazy"),V=Symbol.iterator,X={isMounted:function(a){return!1},enqueueForceUpdate:function(a,b,c){},enqueueReplaceState:function(a,b,c,m){},enqueueSetState:function(a,b,c,m){}},la=Object.assign,W={};w.prototype.isReactComponent={};w.prototype.setState=function(a,
b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState")};w.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};Y.prototype=w.prototype;var t=K.prototype=new Y;t.constructor=K;la(t,w.prototype);t.isPureReactComponent=!0;var ca=Array.isArray,aa=Object.prototype.hasOwnProperty,L={current:null},
ba={key:!0,ref:!0,__self:!0,__source:!0},da=/\/+/g,g={current:null},J={transition:null};if("object"===typeof performance&&"function"===typeof performance.now){var Ba=performance;var v=function(){return Ba.now()}}else{var ma=Date,Ca=ma.now();v=function(){return ma.now()-Ca}}var q=[],r=[],Da=1,n=null,k=3,F=!1,u=!1,z=!1,ja="function"===typeof setTimeout?setTimeout:null,ea="function"===typeof clearTimeout?clearTimeout:null,na="undefined"!==typeof setImmediate?setImmediate:null;"undefined"!==typeof navigator&&
void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var H=!1,G=null,A=-1,ia=5,ha=-1,U=function(){if(null!==G){var a=v();ha=a;var b=!0;try{b=G(!0,a)}finally{b?I():(H=!1,G=null)}}else H=!1};if("function"===typeof na)var I=function(){na(U)};else if("undefined"!==typeof MessageChannel){t=new MessageChannel;var Ea=t.port2;t.port1.onmessage=U;I=function(){Ea.postMessage(null)}}else I=function(){ja(U,0)};t={ReactCurrentDispatcher:g,
ReactCurrentOwner:L,ReactCurrentBatchConfig:J,Scheduler:{__proto__:null,unstable_ImmediatePriority:1,unstable_UserBlockingPriority:2,unstable_NormalPriority:3,unstable_IdlePriority:5,unstable_LowPriority:4,unstable_runWithPriority:function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=k;k=a;try{return b()}finally{k=c}},unstable_next:function(a){switch(k){case 1:case 2:case 3:var b=3;break;default:b=k}var c=k;k=b;try{return a()}finally{k=c}},unstable_scheduleCallback:function(a,
b,c){var e=v();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?e+c:e):c=e;switch(a){case 1:var d=-1;break;case 2:d=250;break;case 5:d=1073741823;break;case 4:d=1E4;break;default:d=5E3}d=c+d;a={id:Da++,callback:b,priorityLevel:a,startTime:c,expirationTime:d,sortIndex:-1};c>e?(a.sortIndex=c,O(r,a),null===p(q)&&a===p(r)&&(z?(ea(A),A=-1):z=!0,T(Q,c-e))):(a.sortIndex=d,O(q,a),u||F||(u=!0,R(S)));return a},unstable_cancelCallback:function(a){a.callback=null},unstable_wrapCallback:function(a){var b=
k;return function(){var c=k;k=b;try{return a.apply(this,arguments)}finally{k=c}}},unstable_getCurrentPriorityLevel:function(){return k},unstable_shouldYield:fa,unstable_requestPaint:function(){},unstable_continueExecution:function(){u||F||(u=!0,R(S))},unstable_pauseExecution:function(){},unstable_getFirstCallbackNode:function(){return p(q)},get unstable_now(){return v},unstable_forceFrameRate:function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):
ia=0<a?Math.floor(1E3/a):5},unstable_Profiling:null}};c.Children={map:C,forEach:function(a,b,c){C(a,function(){b.apply(this,arguments)},c)},count:function(a){var b=0;C(a,function(){b++});return b},toArray:function(a){return C(a,function(a){return a})||[]},only:function(a){if(!M(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};c.Component=w;c.Fragment=sa;c.Profiler=ua;c.PureComponent=K;c.StrictMode=ta;c.Suspense=ya;c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=
t;c.act=ka;c.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var e=la({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=L.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var l=a.type.defaultProps;for(f in b)aa.call(b,f)&&!ba.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==l?l[f]:b[f])}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){l=
Array(f);for(var g=0;g<f;g++)l[g]=arguments[g+2];e.children=l}return{$$typeof:y,type:a.type,key:d,ref:k,props:e,_owner:h}};c.createContext=function(a){a={$$typeof:wa,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:va,_context:a};return a.Consumer=a};c.createElement=Z;c.createFactory=function(a){var b=Z.bind(null,a);b.type=a;return b};c.createRef=function(){return{current:null}};c.forwardRef=function(a){return{$$typeof:xa,
render:a}};c.isValidElement=M;c.lazy=function(a){return{$$typeof:Aa,_payload:{_status:-1,_result:a},_init:ra}};c.memo=function(a,b){return{$$typeof:za,type:a,compare:void 0===b?null:b}};c.startTransition=function(a,b){b=J.transition;J.transition={};try{a()}finally{J.transition=b}};c.unstable_act=ka;c.useCallback=function(a,b){return g.current.useCallback(a,b)};c.useContext=function(a){return g.current.useContext(a)};c.useDebugValue=function(a,b){};c.useDeferredValue=function(a){return g.current.useDeferredValue(a)};
c.useEffect=function(a,b){return g.current.useEffect(a,b)};c.useId=function(){return g.current.useId()};c.useImperativeHandle=function(a,b,c){return g.current.useImperativeHandle(a,b,c)};c.useInsertionEffect=function(a,b){return g.current.useInsertionEffect(a,b)};c.useLayoutEffect=function(a,b){return g.current.useLayoutEffect(a,b)};c.useMemo=function(a,b){return g.current.useMemo(a,b)};c.useReducer=function(a,b,c){return g.current.useReducer(a,b,c)};c.useRef=function(a){return g.current.useRef(a)};
c.useState=function(a){return g.current.useState(a)};c.useSyncExternalStore=function(a,b,c){return g.current.useSyncExternalStore(a,b,c)};c.useTransition=function(){return g.current.useTransition()};c.version="18.3.1"});
})();


/* ReactDOM 18.3.1 UMD */
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(){/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
'use strict';(function(Q,zb){"object"===typeof exports&&"undefined"!==typeof module?zb(exports,require("react")):"function"===typeof define&&define.amd?define(["exports","react"],zb):(Q=Q||self,zb(Q.ReactDOM={},Q.React))})(this,function(Q,zb){function m(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
function mb(a,b){Ab(a,b);Ab(a+"Capture",b)}function Ab(a,b){$b[a]=b;for(a=0;a<b.length;a++)cg.add(b[a])}function bj(a){if(Zd.call(dg,a))return!0;if(Zd.call(eg,a))return!1;if(cj.test(a))return dg[a]=!0;eg[a]=!0;return!1}function dj(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}function ej(a,b,c,d){if(null===
b||"undefined"===typeof b||dj(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function Y(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}function $d(a,b,c,d){var e=R.hasOwnProperty(b)?R[b]:null;if(null!==e?0!==e.type:d||!(2<b.length)||"o"!==
b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1])ej(b,c,e,d)&&(c=null),d||null===e?bj(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c)))}function ac(a){if(null===a||"object"!==typeof a)return null;a=fg&&a[fg]||a["@@iterator"];return"function"===typeof a?a:null}function bc(a,b,
c){if(void 0===ae)try{throw Error();}catch(d){ae=(b=d.stack.trim().match(/\n( *(at )?)/))&&b[1]||""}return"\n"+ae+a}function be(a,b){if(!a||ce)return"";ce=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(n){var d=n}Reflect.construct(a,[],b)}else{try{b.call()}catch(n){d=n}a.call(b.prototype)}else{try{throw Error();
}catch(n){d=n}a()}}catch(n){if(n&&d&&"string"===typeof n.stack){for(var e=n.stack.split("\n"),f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{ce=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?bc(a):
""}function fj(a){switch(a.tag){case 5:return bc(a.type);case 16:return bc("Lazy");case 13:return bc("Suspense");case 19:return bc("SuspenseList");case 0:case 2:case 15:return a=be(a.type,!1),a;case 11:return a=be(a.type.render,!1),a;case 1:return a=be(a.type,!0),a;default:return""}}function de(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case Bb:return"Fragment";case Cb:return"Portal";case ee:return"Profiler";case fe:return"StrictMode";
case ge:return"Suspense";case he:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case gg:return(a.displayName||"Context")+".Consumer";case hg:return(a._context.displayName||"Context")+".Provider";case ie:var b=a.render;a=a.displayName;a||(a=b.displayName||b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case je:return b=a.displayName||null,null!==b?b:de(a.type)||"Memo";case Ta:b=a._payload;a=a._init;try{return de(a(b))}catch(c){}}return null}function gj(a){var b=a.type;
switch(a.tag){case 24:return"Cache";case 9:return(b.displayName||"Context")+".Consumer";case 10:return(b._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return"Fragment";case 5:return b;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return de(b);case 8:return b===fe?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";
case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function Ua(a){switch(typeof a){case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return""}}function ig(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===
b)}function hj(a){var b=ig(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Pc(a){a._valueTracker||(a._valueTracker=hj(a))}function jg(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=ig(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Qc(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}function ke(a,b){var c=b.checked;return E({},b,{defaultChecked:void 0,defaultValue:void 0,
value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function kg(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Ua(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function lg(a,b){b=b.checked;null!=b&&$d(a,"checked",b,!1)}function le(a,b){lg(a,b);var c=Ua(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=
c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?me(a,b.type,c):b.hasOwnProperty("defaultValue")&&me(a,b.type,Ua(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}function mg(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;
c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}function me(a,b,c){if("number"!==b||Qc(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}function Db(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=
!0)}else{c=""+Ua(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}function ne(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(m(91));return E({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function ng(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(m(92));if(cc(c)){if(1<c.length)throw Error(m(93));
c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Ua(c)}}function og(a,b){var c=Ua(b.value),d=Ua(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function pg(a,b){b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}function qg(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
function oe(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?qg(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}function rg(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||dc.hasOwnProperty(a)&&dc[a]?(""+b).trim():b+"px"}function sg(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=rg(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}function pe(a,b){if(b){if(ij[a]&&
(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(m(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(m(60));if("object"!==typeof b.dangerouslySetInnerHTML||!("__html"in b.dangerouslySetInnerHTML))throw Error(m(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(m(62));}}function qe(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;
default:return!0}}function re(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}function tg(a){if(a=ec(a)){if("function"!==typeof se)throw Error(m(280));var b=a.stateNode;b&&(b=Rc(b),se(a.stateNode,a.type,b))}}function ug(a){Eb?Fb?Fb.push(a):Fb=[a]:Eb=a}function vg(){if(Eb){var a=Eb,b=Fb;Fb=Eb=null;tg(a);if(b)for(a=0;a<b.length;a++)tg(b[a])}}function wg(a,b,c){if(te)return a(b,c);te=!0;try{return xg(a,b,c)}finally{if(te=
!1,null!==Eb||null!==Fb)yg(),vg()}}function fc(a,b){var c=a.stateNode;if(null===c)return null;var d=Rc(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;
if(c&&"function"!==typeof c)throw Error(m(231,b,typeof c));return c}function jj(a,b,c,d,e,f,g,h,k){gc=!1;Sc=null;kj.apply(lj,arguments)}function mj(a,b,c,d,e,f,g,h,k){jj.apply(this,arguments);if(gc){if(gc){var n=Sc;gc=!1;Sc=null}else throw Error(m(198));Tc||(Tc=!0,ue=n)}}function nb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function zg(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,
null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function Ag(a){if(nb(a)!==a)throw Error(m(188));}function nj(a){var b=a.alternate;if(!b){b=nb(a);if(null===b)throw Error(m(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return Ag(e),a;if(f===d)return Ag(e),b;f=f.sibling}throw Error(m(188));}if(c.return!==d.return)c=e,d=f;
else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(m(189));}}if(c.alternate!==d)throw Error(m(190));}if(3!==c.tag)throw Error(m(188));return c.stateNode.current===c?a:b}function Bg(a){a=nj(a);return null!==a?Cg(a):null}function Cg(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=Cg(a);if(null!==b)return b;a=a.sibling}return null}
function oj(a,b){if(Ca&&"function"===typeof Ca.onCommitFiberRoot)try{Ca.onCommitFiberRoot(Uc,a,void 0,128===(a.current.flags&128))}catch(c){}}function pj(a){a>>>=0;return 0===a?32:31-(qj(a)/rj|0)|0}function hc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&
4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return a}}function Vc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=hc(h):(f&=g,0!==f&&(d=hc(f)))}else g=c&~e,0!==g?d=hc(g):0!==f&&(d=hc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&
(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-ta(b),e=1<<c,d|=a[c],b&=~e;return d}function sj(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;
case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tj(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-ta(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=sj(h,b)}else k<=b&&(a.expiredLanes|=h);f&=~h}}function ve(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function Dg(){var a=Wc;Wc<<=1;0===(Wc&4194240)&&(Wc=64);return a}function we(a){for(var b=[],c=0;31>c;c++)b.push(a);
return b}function ic(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-ta(b);a[b]=c}function uj(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-ta(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f}}function xe(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-ta(c),e=1<<d;e&b|a[d]&
b&&(a[d]|=b);c&=~e}}function Eg(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}function Fg(a,b){switch(a){case "focusin":case "focusout":Va=null;break;case "dragenter":case "dragleave":Wa=null;break;case "mouseover":case "mouseout":Xa=null;break;case "pointerover":case "pointerout":jc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":kc.delete(b.pointerId)}}function lc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a={blockedOn:b,domEventName:c,eventSystemFlags:d,
nativeEvent:f,targetContainers:[e]},null!==b&&(b=ec(b),null!==b&&Gg(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}function vj(a,b,c,d,e){switch(b){case "focusin":return Va=lc(Va,a,b,c,d,e),!0;case "dragenter":return Wa=lc(Wa,a,b,c,d,e),!0;case "mouseover":return Xa=lc(Xa,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;jc.set(f,lc(jc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,kc.set(f,lc(kc.get(f)||null,a,b,
c,d,e)),!0}return!1}function Hg(a){var b=ob(a.target);if(null!==b){var c=nb(b);if(null!==c)if(b=c.tag,13===b){if(b=zg(c),null!==b){a.blockedOn=b;wj(a.priority,function(){xj(c)});return}}else if(3===b&&c.stateNode.current.memoizedState.isDehydrated){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}function Xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=ye(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null===c){c=a.nativeEvent;
var d=new c.constructor(c.type,c);ze=d;c.target.dispatchEvent(d);ze=null}else return b=ec(c),null!==b&&Gg(b),a.blockedOn=c,!1;b.shift()}return!0}function Ig(a,b,c){Xc(a)&&c.delete(b)}function yj(){Ae=!1;null!==Va&&Xc(Va)&&(Va=null);null!==Wa&&Xc(Wa)&&(Wa=null);null!==Xa&&Xc(Xa)&&(Xa=null);jc.forEach(Ig);kc.forEach(Ig)}function mc(a,b){a.blockedOn===b&&(a.blockedOn=null,Ae||(Ae=!0,Jg(Kg,yj)))}function nc(a){if(0<Yc.length){mc(Yc[0],a);for(var b=1;b<Yc.length;b++){var c=Yc[b];c.blockedOn===a&&(c.blockedOn=
null)}}null!==Va&&mc(Va,a);null!==Wa&&mc(Wa,a);null!==Xa&&mc(Xa,a);b=function(b){return mc(b,a)};jc.forEach(b);kc.forEach(b);for(b=0;b<Ya.length;b++)c=Ya[b],c.blockedOn===a&&(c.blockedOn=null);for(;0<Ya.length&&(b=Ya[0],null===b.blockedOn);)Hg(b),null===b.blockedOn&&Ya.shift()}function zj(a,b,c,d){var e=z,f=Gb.transition;Gb.transition=null;try{z=1,Be(a,b,c,d)}finally{z=e,Gb.transition=f}}function Aj(a,b,c,d){var e=z,f=Gb.transition;Gb.transition=null;try{z=4,Be(a,b,c,d)}finally{z=e,Gb.transition=
f}}function Be(a,b,c,d){if(Zc){var e=ye(a,b,c,d);if(null===e)Ce(a,b,d,$c,c),Fg(a,d);else if(vj(e,a,b,c,d))d.stopPropagation();else if(Fg(a,d),b&4&&-1<Bj.indexOf(a)){for(;null!==e;){var f=ec(e);null!==f&&Cj(f);f=ye(a,b,c,d);null===f&&Ce(a,b,d,$c,c);if(f===e)break;e=f}null!==e&&d.stopPropagation()}else Ce(a,b,d,null,c)}}function ye(a,b,c,d){$c=null;a=re(d);a=ob(a);if(null!==a)if(b=nb(a),null===b)a=null;else if(c=b.tag,13===c){a=zg(b);if(null!==a)return a;a=null}else if(3===c){if(b.stateNode.current.memoizedState.isDehydrated)return 3===
b.tag?b.stateNode.containerInfo:null;a=null}else b!==a&&(a=null);$c=a;return null}function Lg(a){switch(a){case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;
case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;case "message":switch(Dj()){case De:return 1;case Mg:return 4;case ad:case Ej:return 16;case Ng:return 536870912;default:return 16}default:return 16}}function Og(){if(bd)return bd;
var a,b=Ee,c=b.length,d,e="value"in Za?Za.value:Za.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return bd=e.slice(a,1<d?1-d:void 0)}function cd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function dd(){return!0}function Pg(){return!1}function ka(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;
for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?dd:Pg;this.isPropagationStopped=Pg;return this}E(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=dd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():
"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=dd)},persist:function(){},isPersistent:dd});return b}function Fj(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Gj[a])?!!b[a]:!1}function Fe(a){return Fj}function Qg(a,b){switch(a){case "keyup":return-1!==Hj.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function Rg(a){a=a.detail;return"object"===typeof a&&
"data"in a?a.data:null}function Ij(a,b){switch(a){case "compositionend":return Rg(b);case "keypress":if(32!==b.which)return null;Sg=!0;return Tg;case "textInput":return a=b.data,a===Tg&&Sg?null:a;default:return null}}function Jj(a,b){if(Hb)return"compositionend"===a||!Ge&&Qg(a,b)?(a=Og(),bd=Ee=Za=null,Hb=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;
case "compositionend":return Ug&&"ko"!==b.locale?null:b.data;default:return null}}function Vg(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!Kj[a.type]:"textarea"===b?!0:!1}function Lj(a){if(!Ia)return!1;a="on"+a;var b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}function Wg(a,b,c,d){ug(d);b=ed(b,"onChange");0<b.length&&(c=new He("onChange","change",null,c,d),a.push({event:c,listeners:b}))}function Mj(a){Xg(a,
0)}function fd(a){var b=Ib(a);if(jg(b))return a}function Nj(a,b){if("change"===a)return b}function Yg(){oc&&(oc.detachEvent("onpropertychange",Zg),pc=oc=null)}function Zg(a){if("value"===a.propertyName&&fd(pc)){var b=[];Wg(b,pc,a,re(a));wg(Mj,b)}}function Oj(a,b,c){"focusin"===a?(Yg(),oc=b,pc=c,oc.attachEvent("onpropertychange",Zg)):"focusout"===a&&Yg()}function Pj(a,b){if("selectionchange"===a||"keyup"===a||"keydown"===a)return fd(pc)}function Qj(a,b){if("click"===a)return fd(b)}function Rj(a,b){if("input"===
a||"change"===a)return fd(b)}function Sj(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}function qc(a,b){if(ua(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++){var e=c[d];if(!Zd.call(b,e)||!ua(a[e],b[e]))return!1}return!0}function $g(a){for(;a&&a.firstChild;)a=a.firstChild;return a}function ah(a,b){var c=$g(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;
if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=$g(c)}}function bh(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?bh(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}function ch(){for(var a=window,b=Qc();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;
b=Qc(a.document)}return b}function Ie(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}function Tj(a){var b=ch(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&bh(c.ownerDocument.documentElement,c)){if(null!==d&&Ie(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);
else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=ah(c,f);var g=ah(c,d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),
a.addRange(b)))}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}}function dh(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Je||null==Jb||Jb!==Qc(d)||(d=Jb,"selectionStart"in d&&Ie(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d=
{anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),rc&&qc(rc,d)||(rc=d,d=ed(Ke,"onSelect"),0<d.length&&(b=new He("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Jb)))}function gd(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}function hd(a){if(Le[a])return Le[a];if(!Kb[a])return a;var b=Kb[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in eh)return Le[a]=b[c];return a}function $a(a,
b){fh.set(a,b);mb(b,[a])}function gh(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;mj(d,b,void 0,a);a.currentTarget=null}function Xg(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,n=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;gh(e,h,n);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;n=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;
gh(e,h,n);f=k}}}if(Tc)throw a=ue,Tc=!1,ue=null,a;}function B(a,b){var c=b[Me];void 0===c&&(c=b[Me]=new Set);var d=a+"__bubble";c.has(d)||(hh(b,a,2,!1),c.add(d))}function Ne(a,b,c){var d=0;b&&(d|=4);hh(c,a,d,b)}function sc(a){if(!a[id]){a[id]=!0;cg.forEach(function(b){"selectionchange"!==b&&(Uj.has(b)||Ne(b,!1,a),Ne(b,!0,a))});var b=9===a.nodeType?a:a.ownerDocument;null===b||b[id]||(b[id]=!0,Ne("selectionchange",!1,b))}}function hh(a,b,c,d,e){switch(Lg(b)){case 1:e=zj;break;case 4:e=Aj;break;default:e=
Be}c=e.bind(null,b,c,a);e=void 0;!Oe||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}function Ce(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;
if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=ob(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}wg(function(){var d=f,e=re(c),g=[];a:{var h=fh.get(a);if(void 0!==h){var k=He,m=a;switch(a){case "keypress":if(0===cd(c))break a;case "keydown":case "keyup":k=Vj;break;case "focusin":m="focus";k=Pe;break;case "focusout":m="blur";k=Pe;break;case "beforeblur":case "afterblur":k=Pe;break;
case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=ih;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=Wj;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Xj;break;case jh:case kh:case lh:k=Yj;break;case mh:k=Zj;break;case "scroll":k=ak;break;case "wheel":k=bk;break;case "copy":case "cut":case "paste":k=
ck;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=nh}var l=0!==(b&4),p=!l&&"scroll"===a,w=l?null!==h?h+"Capture":null:h;l=[];for(var A=d,t;null!==A;){t=A;var M=t.stateNode;5===t.tag&&null!==M&&(t=M,null!==w&&(M=fc(A,w),null!=M&&l.push(tc(A,M,t))));if(p)break;A=A.return}0<l.length&&(h=new k(h,m,null,c,e),g.push({event:h,listeners:l}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===
a;k="mouseout"===a||"pointerout"===a;if(h&&c!==ze&&(m=c.relatedTarget||c.fromElement)&&(ob(m)||m[Ja]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(m=c.relatedTarget||c.toElement,k=d,m=m?ob(m):null,null!==m&&(p=nb(m),m!==p||5!==m.tag&&6!==m.tag))m=null}else k=null,m=d;if(k!==m){l=ih;M="onMouseLeave";w="onMouseEnter";A="mouse";if("pointerout"===a||"pointerover"===a)l=nh,M="onPointerLeave",w="onPointerEnter",A="pointer";p=null==k?h:Ib(k);t=null==
m?h:Ib(m);h=new l(M,A+"leave",k,c,e);h.target=p;h.relatedTarget=t;M=null;ob(e)===d&&(l=new l(w,A+"enter",m,c,e),l.target=t,l.relatedTarget=p,M=l);p=M;if(k&&m)b:{l=k;w=m;A=0;for(t=l;t;t=Lb(t))A++;t=0;for(M=w;M;M=Lb(M))t++;for(;0<A-t;)l=Lb(l),A--;for(;0<t-A;)w=Lb(w),t--;for(;A--;){if(l===w||null!==w&&l===w.alternate)break b;l=Lb(l);w=Lb(w)}l=null}else l=null;null!==k&&oh(g,h,k,l,!1);null!==m&&null!==p&&oh(g,p,m,l,!0)}}}a:{h=d?Ib(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===
k&&"file"===h.type)var ma=Nj;else if(Vg(h))if(ph)ma=Rj;else{ma=Pj;var va=Oj}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(ma=Qj);if(ma&&(ma=ma(a,d))){Wg(g,ma,c,e);break a}va&&va(a,h,d);"focusout"===a&&(va=h._wrapperState)&&va.controlled&&"number"===h.type&&me(h,"number",h.value)}va=d?Ib(d):window;switch(a){case "focusin":if(Vg(va)||"true"===va.contentEditable)Jb=va,Ke=d,rc=null;break;case "focusout":rc=Ke=Jb=null;break;case "mousedown":Je=!0;break;case "contextmenu":case "mouseup":case "dragend":Je=
!1;dh(g,c,e);break;case "selectionchange":if(dk)break;case "keydown":case "keyup":dh(g,c,e)}var ab;if(Ge)b:{switch(a){case "compositionstart":var da="onCompositionStart";break b;case "compositionend":da="onCompositionEnd";break b;case "compositionupdate":da="onCompositionUpdate";break b}da=void 0}else Hb?Qg(a,c)&&(da="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(da="onCompositionStart");da&&(Ug&&"ko"!==c.locale&&(Hb||"onCompositionStart"!==da?"onCompositionEnd"===da&&Hb&&(ab=Og()):(Za=e,Ee=
"value"in Za?Za.value:Za.textContent,Hb=!0)),va=ed(d,da),0<va.length&&(da=new qh(da,a,null,c,e),g.push({event:da,listeners:va}),ab?da.data=ab:(ab=Rg(c),null!==ab&&(da.data=ab))));if(ab=ek?Ij(a,c):Jj(a,c))d=ed(d,"onBeforeInput"),0<d.length&&(e=new fk("onBeforeInput","beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=ab)}Xg(g,b)})}function tc(a,b,c){return{instance:a,listener:b,currentTarget:c}}function ed(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==
f&&(e=f,f=fc(a,c),null!=f&&d.unshift(tc(a,f,e)),f=fc(a,b),null!=f&&d.push(tc(a,f,e)));a=a.return}return d}function Lb(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}function oh(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,n=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==n&&(h=n,e?(k=fc(c,f),null!=k&&g.unshift(tc(c,k,h))):e||(k=fc(c,f),null!=k&&g.push(tc(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}function rh(a){return("string"===
typeof a?a:""+a).replace(gk,"\n").replace(hk,"")}function jd(a,b,c,d){b=rh(b);if(rh(a)!==b&&c)throw Error(m(425));}function kd(){}function Qe(a,b){return"textarea"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}function ik(a){setTimeout(function(){throw a;})}function Re(a,b){var c=b,d=0;do{var e=c.nextSibling;a.removeChild(c);if(e&&8===e.nodeType)if(c=
e.data,"/$"===c){if(0===d){a.removeChild(e);nc(b);return}d--}else"$"!==c&&"$?"!==c&&"$!"!==c||d++;c=e}while(c);nc(b)}function Ka(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break;if(8===b){b=a.data;if("$"===b||"$!"===b||"$?"===b)break;if("/$"===b)return null}}return a}function sh(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}function ob(a){var b=a[Da];
if(b)return b;for(var c=a.parentNode;c;){if(b=c[Ja]||c[Da]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=sh(a);null!==a;){if(c=a[Da])return c;a=sh(a)}return b}a=c;c=a.parentNode}return null}function ec(a){a=a[Da]||a[Ja];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function Ib(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(m(33));}function Rc(a){return a[uc]||null}function bb(a){return{current:a}}function v(a,b){0>Mb||(a.current=Se[Mb],Se[Mb]=null,Mb--)}
function y(a,b,c){Mb++;Se[Mb]=a.current;a.current=b}function Nb(a,b){var c=a.type.contextTypes;if(!c)return cb;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function ea(a){a=a.childContextTypes;return null!==a&&void 0!==a}function th(a,b,c){if(J.current!==cb)throw Error(m(168));
y(J,b);y(S,c)}function uh(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(m(108,gj(a)||"Unknown",e));return E({},c,d)}function ld(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||cb;pb=J.current;y(J,a);y(S,S.current);return!0}function vh(a,b,c){var d=a.stateNode;if(!d)throw Error(m(169));c?(a=uh(a,b,pb),d.__reactInternalMemoizedMergedChildContext=a,v(S),v(J),y(J,a)):v(S);
y(S,c)}function wh(a){null===La?La=[a]:La.push(a)}function jk(a){md=!0;wh(a)}function db(){if(!Te&&null!==La){Te=!0;var a=0,b=z;try{var c=La;for(z=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}La=null;md=!1}catch(e){throw null!==La&&(La=La.slice(a+1)),xh(De,db),e;}finally{z=b,Te=!1}}return null}function qb(a,b){Ob[Pb++]=nd;Ob[Pb++]=od;od=a;nd=b}function yh(a,b,c){na[oa++]=Ma;na[oa++]=Na;na[oa++]=rb;rb=a;var d=Ma;a=Na;var e=32-ta(d)-1;d&=~(1<<e);c+=1;var f=32-ta(b)+e;if(30<f){var g=e-e%5;
f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;Ma=1<<32-ta(b)+e|c<<e|d;Na=f+a}else Ma=1<<f|c<<e|d,Na=a}function Ue(a){null!==a.return&&(qb(a,1),yh(a,1,0))}function Ve(a){for(;a===od;)od=Ob[--Pb],Ob[Pb]=null,nd=Ob[--Pb],Ob[Pb]=null;for(;a===rb;)rb=na[--oa],na[oa]=null,Na=na[--oa],na[oa]=null,Ma=na[--oa],na[oa]=null}function zh(a,b){var c=pa(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c)}function Ah(a,b){switch(a.tag){case 5:var c=
a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,la=a,fa=Ka(b.firstChild),!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,la=a,fa=null,!0):!1;case 13:return b=8!==b.nodeType?null:b,null!==b?(c=null!==rb?{id:Ma,overflow:Na}:null,a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824},c=pa(18,null,null,0),c.stateNode=b,c.return=a,a.child=c,la=a,fa=null,!0):!1;default:return!1}}function We(a){return 0!==
(a.mode&1)&&0===(a.flags&128)}function Xe(a){if(D){var b=fa;if(b){var c=b;if(!Ah(a,b)){if(We(a))throw Error(m(418));b=Ka(c.nextSibling);var d=la;b&&Ah(a,b)?zh(d,c):(a.flags=a.flags&-4097|2,D=!1,la=a)}}else{if(We(a))throw Error(m(418));a.flags=a.flags&-4097|2;D=!1;la=a}}}function Bh(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;la=a}function pd(a){if(a!==la)return!1;if(!D)return Bh(a),D=!0,!1;var b;(b=3!==a.tag)&&!(b=5!==a.tag)&&(b=a.type,b="head"!==b&&"body"!==b&&!Qe(a.type,
a.memoizedProps));if(b&&(b=fa)){if(We(a)){for(a=fa;a;)a=Ka(a.nextSibling);throw Error(m(418));}for(;b;)zh(a,b),b=Ka(b.nextSibling)}Bh(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(m(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){fa=Ka(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}fa=null}}else fa=la?Ka(a.stateNode.nextSibling):null;return!0}function Qb(){fa=la=null;D=!1}function Ye(a){null===
wa?wa=[a]:wa.push(a)}function vc(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(m(309));var d=c.stateNode}if(!d)throw Error(m(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;null===a?delete b[f]:b[f]=a};b._stringRef=f;return b}if("string"!==typeof a)throw Error(m(284));if(!c._owner)throw Error(m(290,a));}return a}function qd(a,b){a=
Object.prototype.toString.call(b);throw Error(m(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function Ch(a){var b=a._init;return b(a._payload)}function Dh(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c)}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=eb(a,b);a.index=
0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Ze(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===Bb)return l(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===Ta&&
Ch(f)===b.type))return d=e(b,c.props),d.ref=vc(a,b,c),d.return=a,d;d=rd(c.type,c.key,c.props,null,a.mode,d);d.ref=vc(a,b,c);d.return=a;return d}function n(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=$e(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function l(a,b,c,d,f){if(null===b||7!==b.tag)return b=sb(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function u(a,b,c){if("string"===
typeof b&&""!==b||"number"===typeof b)return b=Ze(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case sd:return c=rd(b.type,b.key,b.props,null,a.mode,c),c.ref=vc(a,null,b),c.return=a,c;case Cb:return b=$e(b,a.mode,c),b.return=a,b;case Ta:var d=b._init;return u(a,d(b._payload),c)}if(cc(b)||ac(b))return b=sb(b,a.mode,c,null),b.return=a,b;qd(a,b)}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==
e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case sd:return c.key===e?k(a,b,c,d):null;case Cb:return c.key===e?n(a,b,c,d):null;case Ta:return e=c._init,r(a,b,e(c._payload),d)}if(cc(c)||ac(c))return null!==e?null:l(a,b,c,d,null);qd(a,c)}return null}function p(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case sd:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,
e);case Cb:return a=a.get(null===d.key?c:d.key)||null,n(b,a,d,e);case Ta:var f=d._init;return p(a,b,c,f(d._payload),e)}if(cc(d)||ac(d))return a=a.get(c)||null,l(b,a,d,e,null);qd(b,d)}return null}function x(e,g,h,k){for(var n=null,m=null,l=g,t=g=0,q=null;null!==l&&t<h.length;t++){l.index>t?(q=l,l=null):q=l.sibling;var A=r(e,l,h[t],k);if(null===A){null===l&&(l=q);break}a&&l&&null===A.alternate&&b(e,l);g=f(A,g,t);null===m?n=A:m.sibling=A;m=A;l=q}if(t===h.length)return c(e,l),D&&qb(e,t),n;if(null===l){for(;t<
h.length;t++)l=u(e,h[t],k),null!==l&&(g=f(l,g,t),null===m?n=l:m.sibling=l,m=l);D&&qb(e,t);return n}for(l=d(e,l);t<h.length;t++)q=p(l,e,t,h[t],k),null!==q&&(a&&null!==q.alternate&&l.delete(null===q.key?t:q.key),g=f(q,g,t),null===m?n=q:m.sibling=q,m=q);a&&l.forEach(function(a){return b(e,a)});D&&qb(e,t);return n}function I(e,g,h,k){var n=ac(h);if("function"!==typeof n)throw Error(m(150));h=n.call(h);if(null==h)throw Error(m(151));for(var l=n=null,q=g,t=g=0,A=null,w=h.next();null!==q&&!w.done;t++,w=
h.next()){q.index>t?(A=q,q=null):A=q.sibling;var x=r(e,q,w.value,k);if(null===x){null===q&&(q=A);break}a&&q&&null===x.alternate&&b(e,q);g=f(x,g,t);null===l?n=x:l.sibling=x;l=x;q=A}if(w.done)return c(e,q),D&&qb(e,t),n;if(null===q){for(;!w.done;t++,w=h.next())w=u(e,w.value,k),null!==w&&(g=f(w,g,t),null===l?n=w:l.sibling=w,l=w);D&&qb(e,t);return n}for(q=d(e,q);!w.done;t++,w=h.next())w=p(q,e,t,w.value,k),null!==w&&(a&&null!==w.alternate&&q.delete(null===w.key?t:w.key),g=f(w,g,t),null===l?n=w:l.sibling=
w,l=w);a&&q.forEach(function(a){return b(e,a)});D&&qb(e,t);return n}function v(a,d,f,h){"object"===typeof f&&null!==f&&f.type===Bb&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==f){switch(f.$$typeof){case sd:a:{for(var k=f.key,n=d;null!==n;){if(n.key===k){k=f.type;if(k===Bb){if(7===n.tag){c(a,n.sibling);d=e(n,f.props.children);d.return=a;a=d;break a}}else if(n.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===Ta&&Ch(k)===n.type){c(a,n.sibling);d=e(n,f.props);d.ref=vc(a,
n,f);d.return=a;a=d;break a}c(a,n);break}else b(a,n);n=n.sibling}f.type===Bb?(d=sb(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=rd(f.type,f.key,f.props,null,a.mode,h),h.ref=vc(a,d,f),h.return=a,a=h)}return g(a);case Cb:a:{for(n=f.key;null!==d;){if(d.key===n)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=$e(f,a.mode,h);d.return=a;
a=d}return g(a);case Ta:return n=f._init,v(a,d,n(f._payload),h)}if(cc(f))return x(a,d,f,h);if(ac(f))return I(a,d,f,h);qd(a,f)}return"string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=Ze(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return v}function af(){bf=Rb=td=null}function cf(a,b){b=ud.current;v(ud);a._currentValue=b}function df(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=
b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return}}function Sb(a,b){td=a;bf=Rb=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(ha=!0),a.firstContext=null)}function qa(a){var b=a._currentValue;if(bf!==a)if(a={context:a,memoizedValue:b,next:null},null===Rb){if(null===td)throw Error(m(308));Rb=a;td.dependencies={lanes:0,firstContext:a}}else Rb=Rb.next=a;return b}function ef(a){null===tb?tb=[a]:tb.push(a)}function Eh(a,b,c,d){var e=b.interleaved;
null===e?(c.next=c,ef(b)):(c.next=e.next,e.next=c);b.interleaved=c;return Oa(a,d)}function Oa(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}function ff(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Fh(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue=
{baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function Pa(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}function fb(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(p&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return kk(a,c)}e=d.interleaved;null===e?(b.next=b,ef(d)):(b.next=e.next,e.next=b);d.interleaved=b;return Oa(a,c)}function vd(a,b,c){b=
b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;xe(a,c)}}function Gh(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,
shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=b;c.lastBaseUpdate=b}function wd(a,b,c,d){var e=a.updateQueue;gb=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,n=k.next;k.next=null;null===g?f=n:g.next=n;g=k;var l=a.alternate;null!==l&&(l=l.updateQueue,h=l.lastBaseUpdate,h!==g&&(null===h?l.firstBaseUpdate=n:h.next=n,l.lastBaseUpdate=k))}if(null!==f){var m=e.baseState;g=0;l=
n=k=null;h=f;do{var r=h.lane,p=h.eventTime;if((d&r)===r){null!==l&&(l=l.next={eventTime:p,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,next:null});a:{var x=a,v=h;r=b;p=c;switch(v.tag){case 1:x=v.payload;if("function"===typeof x){m=x.call(p,m,r);break a}m=x;break a;case 3:x.flags=x.flags&-65537|128;case 0:x=v.payload;r="function"===typeof x?x.call(p,m,r):x;if(null===r||void 0===r)break a;m=E({},m,r);break a;case 2:gb=!0}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=
[h]:r.push(h))}else p={eventTime:p,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===l?(n=l=p,k=m):l=l.next=p,g|=r;h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null}while(1);null===l&&(k=m);e.baseState=k;e.firstBaseUpdate=n;e.lastBaseUpdate=l;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);ra|=g;a.lanes=g;a.memoizedState=m}}function Hh(a,
b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(m(191,e));e.call(d)}}}function ub(a){if(a===wc)throw Error(m(174));return a}function gf(a,b){y(xc,b);y(yc,a);y(Ea,wc);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:oe(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=oe(b,a)}v(Ea);y(Ea,b)}function Tb(a){v(Ea);v(yc);v(xc)}function Ih(a){ub(xc.current);
var b=ub(Ea.current);var c=oe(b,a.type);b!==c&&(y(yc,a),y(Ea,c))}function hf(a){yc.current===a&&(v(Ea),v(yc))}function xd(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=
b.return;b=b.sibling}return null}function jf(){for(var a=0;a<kf.length;a++)kf[a]._workInProgressVersionPrimary=null;kf.length=0}function V(){throw Error(m(321));}function lf(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!ua(a[c],b[c]))return!1;return!0}function mf(a,b,c,d,e,f){vb=f;C=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;yd.current=null===a||null===a.memoizedState?lk:mk;a=c(d,e);if(zc){f=0;do{zc=!1;Ac=0;if(25<=f)throw Error(m(301));f+=1;N=K=null;b.updateQueue=null;
yd.current=nk;a=c(d,e)}while(zc)}yd.current=zd;b=null!==K&&null!==K.next;vb=0;N=K=C=null;Ad=!1;if(b)throw Error(m(300));return a}function nf(){var a=0!==Ac;Ac=0;return a}function Fa(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===N?C.memoizedState=N=a:N=N.next=a;return N}function sa(){if(null===K){var a=C.alternate;a=null!==a?a.memoizedState:null}else a=K.next;var b=null===N?C.memoizedState:N.next;if(null!==b)N=b,K=a;else{if(null===a)throw Error(m(310));K=a;
a={memoizedState:K.memoizedState,baseState:K.baseState,baseQueue:K.baseQueue,queue:K.queue,next:null};null===N?C.memoizedState=N=a:N=N.next=a}return N}function Bc(a,b){return"function"===typeof b?b(a):b}function of(a,b,c){b=sa();c=b.queue;if(null===c)throw Error(m(311));c.lastRenderedReducer=a;var d=K,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,n=f;do{var l=n.lane;if((vb&
l)===l)null!==k&&(k=k.next={lane:0,action:n.action,hasEagerState:n.hasEagerState,eagerState:n.eagerState,next:null}),d=n.hasEagerState?n.eagerState:a(d,n.action);else{var u={lane:l,action:n.action,hasEagerState:n.hasEagerState,eagerState:n.eagerState,next:null};null===k?(h=k=u,g=d):k=k.next=u;C.lanes|=l;ra|=l}n=n.next}while(null!==n&&n!==f);null===k?g=d:k.next=h;ua(d,b.memoizedState)||(ha=!0);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d}a=c.interleaved;if(null!==a){e=a;do f=
e.lane,C.lanes|=f,ra|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return[b.memoizedState,c.dispatch]}function pf(a,b,c){b=sa();c=b.queue;if(null===c)throw Error(m(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);ua(f,b.memoizedState)||(ha=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}function Jh(a,b,c){}function Kh(a,b,c){c=C;var d=sa(),
e=b(),f=!ua(d.memoizedState,e);f&&(d.memoizedState=e,ha=!0);d=d.queue;qf(Lh.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==N&&N.memoizedState.tag&1){c.flags|=2048;Cc(9,Mh.bind(null,c,d,e,b),void 0,null);if(null===O)throw Error(m(349));0!==(vb&30)||Nh(c,b,e)}return e}function Nh(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=C.updateQueue;null===b?(b={lastEffect:null,stores:null},C.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a))}function Mh(a,b,c,d){b.value=c;b.getSnapshot=
d;Oh(b)&&Ph(a)}function Lh(a,b,c){return c(function(){Oh(b)&&Ph(a)})}function Oh(a){var b=a.getSnapshot;a=a.value;try{var c=b();return!ua(a,c)}catch(d){return!0}}function Ph(a){var b=Oa(a,1);null!==b&&xa(b,a,1,-1)}function Qh(a){var b=Fa();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Bc,lastRenderedState:a};b.queue=a;a=a.dispatch=ok.bind(null,C,a);return[b.memoizedState,a]}function Cc(a,b,c,d){a={tag:a,create:b,
destroy:c,deps:d,next:null};b=C.updateQueue;null===b?(b={lastEffect:null,stores:null},C.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function Rh(a){return sa().memoizedState}function Bd(a,b,c,d){var e=Fa();C.flags|=a;e.memoizedState=Cc(1|b,c,void 0,void 0===d?null:d)}function Cd(a,b,c,d){var e=sa();d=void 0===d?null:d;var f=void 0;if(null!==K){var g=K.memoizedState;f=g.destroy;if(null!==d&&lf(d,g.deps)){e.memoizedState=
Cc(b,c,f,d);return}}C.flags|=a;e.memoizedState=Cc(1|b,c,f,d)}function Sh(a,b){return Bd(8390656,8,a,b)}function qf(a,b){return Cd(2048,8,a,b)}function Th(a,b){return Cd(4,2,a,b)}function Uh(a,b){return Cd(4,4,a,b)}function Vh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function Wh(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Cd(4,4,Vh.bind(null,b,a),c)}function rf(a,b){}function Xh(a,b){var c=
sa();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&lf(b,d[1]))return d[0];c.memoizedState=[a,b];return a}function Yh(a,b){var c=sa();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&lf(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function Zh(a,b,c){if(0===(vb&21))return a.baseState&&(a.baseState=!1,ha=!0),a.memoizedState=c;ua(c,b)||(c=Dg(),C.lanes|=c,ra|=c,a.baseState=!0);return b}function pk(a,b,c){c=z;z=0!==c&&4>c?c:4;a(!0);var d=sf.transition;sf.transition=
{};try{a(!1),b()}finally{z=c,sf.transition=d}}function $h(){return sa().memoizedState}function qk(a,b,c){var d=hb(a);c={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(ai(a))bi(b,c);else if(c=Eh(a,b,c,d),null!==c){var e=Z();xa(c,a,d,e);ci(c,b,d)}}function ok(a,b,c){var d=hb(a),e={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(ai(a))bi(b,e);else{var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,
h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(ua(h,g)){var k=b.interleaved;null===k?(e.next=e,ef(b)):(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(n){}finally{}c=Eh(a,b,e,d);null!==c&&(e=Z(),xa(c,a,d,e),ci(c,b,d))}}function ai(a){var b=a.alternate;return a===C||null!==b&&b===C}function bi(a,b){zc=Ad=!0;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}function ci(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;xe(a,c)}}function ya(a,b){if(a&&
a.defaultProps){b=E({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}function tf(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:E({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}function di(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!qc(c,d)||!qc(e,f):!0}function ei(a,b,c){var d=!1,e=cb;var f=b.contextType;"object"===typeof f&&
null!==f?f=qa(f):(e=ea(b)?pb:J.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Nb(a,e):cb);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Dd;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}function fi(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&
b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Dd.enqueueReplaceState(b,b.state,null)}function uf(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs={};ff(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=qa(f):(f=ea(b)?pb:J.current,e.context=Nb(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(tf(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==
typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Dd.enqueueReplaceState(e,e.state,null),wd(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308)}function Ub(a,b){try{var c="",d=b;do c+=fj(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+
"\n"+f.stack}return{value:a,source:b,stack:e,digest:null}}function vf(a,b,c){return{value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}function wf(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}function gi(a,b,c){c=Pa(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Ed||(Ed=!0,xf=d);wf(a,b)};return c}function hi(a,b,c){c=Pa(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};
c.callback=function(){wf(a,b)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){wf(a,b);"function"!==typeof d&&(null===ib?ib=new Set([this]):ib.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}function ii(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new rk;var e=new Set;d.set(b,e)}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=sk.bind(null,a,b,c),b.then(a,a))}function ji(a){do{var b;
if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?!0:!1:!0;if(b)return a;a=a.return}while(null!==a);return null}function ki(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=Pa(-1,1),b.tag=2,fb(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}function aa(a,b,c,d){b.child=null===a?li(b,null,c,d):Vb(b,a.child,c,d)}function mi(a,b,c,d,e){c=c.render;var f=b.ref;Sb(b,e);d=mf(a,b,c,d,f,
e);c=nf();if(null!==a&&!ha)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Qa(a,b,e);D&&c&&Ue(b);b.flags|=1;aa(a,b,d,e);return b.child}function ni(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!yf(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,oi(a,b,f,d,e);a=rd(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:qc;if(c(g,d)&&a.ref===
b.ref)return Qa(a,b,e)}b.flags|=1;a=eb(f,d);a.ref=b.ref;a.return=b;return b.child=a}function oi(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(qc(f,d)&&a.ref===b.ref)if(ha=!1,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(ha=!0);else return b.lanes=a.lanes,Qa(a,b,e)}return zf(a,b,c,d,e)}function pi(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},y(Ga,ba),ba|=c;
else{if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,y(Ga,ba),ba|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;y(Ga,ba);ba|=d}else null!==f?(d=f.baseLanes|c,b.memoizedState=null):d=c,y(Ga,ba),ba|=d;aa(a,b,e,c);return b.child}function qi(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152}function zf(a,
b,c,d,e){var f=ea(c)?pb:J.current;f=Nb(b,f);Sb(b,e);c=mf(a,b,c,d,f,e);d=nf();if(null!==a&&!ha)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Qa(a,b,e);D&&d&&Ue(b);b.flags|=1;aa(a,b,c,e);return b.child}function ri(a,b,c,d,e){if(ea(c)){var f=!0;ld(b)}else f=!1;Sb(b,e);if(null===b.stateNode)Fd(a,b),ei(b,c,d),uf(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,n=c.contextType;"object"===typeof n&&null!==n?n=qa(n):(n=ea(c)?pb:J.current,n=Nb(b,
n));var l=c.getDerivedStateFromProps,m="function"===typeof l||"function"===typeof g.getSnapshotBeforeUpdate;m||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==n)&&fi(b,g,d,n);gb=!1;var r=b.memoizedState;g.state=r;wd(b,d,g,e);k=b.memoizedState;h!==d||r!==k||S.current||gb?("function"===typeof l&&(tf(b,c,l,d),k=b.memoizedState),(h=gb||di(b,c,h,d,r,k,n))?(m||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||
("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=n,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=!1)}else{g=b.stateNode;Fh(a,b);h=b.memoizedProps;n=b.type===b.elementType?h:ya(b.type,h);g.props=
n;m=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=qa(k):(k=ea(c)?pb:J.current,k=Nb(b,k));var p=c.getDerivedStateFromProps;(l="function"===typeof p||"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==m||r!==k)&&fi(b,g,d,k);gb=!1;r=b.memoizedState;g.state=r;wd(b,d,g,e);var x=b.memoizedState;h!==m||r!==x||S.current||gb?("function"===typeof p&&(tf(b,c,p,d),x=b.memoizedState),
(n=gb||di(b,c,n,d,r,x,k)||!1)?(l||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=
4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=k,d=n):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=!1)}return Af(a,b,c,d,f,e)}function Af(a,b,c,d,e,f){qi(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&vh(b,c,!1),
Qa(a,b,f);d=b.stateNode;tk.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Vb(b,a.child,null,f),b.child=Vb(b,null,h,f)):aa(a,b,h,f);b.memoizedState=d.state;e&&vh(b,c,!0);return b.child}function si(a){var b=a.stateNode;b.pendingContext?th(a,b.pendingContext,b.pendingContext!==b.context):b.context&&th(a,b.context,!1);gf(a,b.containerInfo)}function ti(a,b,c,d,e){Qb();Ye(e);b.flags|=256;aa(a,b,c,d);return b.child}function Bf(a){return{baseLanes:a,
cachePool:null,transitions:null}}function ui(a,b,c){var d=b.pendingProps,e=F.current,f=!1,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?!1:0!==(e&2));if(h)f=!0,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;y(F,e&1);if(null===a){Xe(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:"$!"===a.data?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==
f?(f.childLanes=0,f.pendingProps=g):f=Gd(g,d,0,null),a=sb(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=Bf(c),b.memoizedState=Cf,a):Df(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return uk(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=eb(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=eb(h,f):(f=
sb(f,g,c,null),f.flags|=2);f.return=b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?Bf(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=Cf;return d}f=a.child;a=f.sibling;d=eb(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
function Df(a,b,c){b=Gd({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function Hd(a,b,c,d){null!==d&&Ye(d);Vb(b,a.child,null,c);a=Df(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}function uk(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=vf(Error(m(422))),Hd(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=Gd({mode:"visible",children:d.children},e,0,null);f=sb(f,e,g,null);f.flags|=2;d.return=
b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&Vb(b,a.child,null,g);b.child.memoizedState=Bf(g);b.memoizedState=Cf;return f}if(0===(b.mode&1))return Hd(a,b,g,null);if("$!"===e.data){d=e.nextSibling&&e.nextSibling.dataset;if(d)var h=d.dgst;d=h;f=Error(m(419));d=vf(f,d,void 0);return Hd(a,b,g,d)}h=0!==(g&a.childLanes);if(ha||h){d=O;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=
32;break;case 536870912:e=268435456;break;default:e=0}e=0!==(e&(d.suspendedLanes|g))?0:e;0!==e&&e!==f.retryLane&&(f.retryLane=e,Oa(a,e),xa(d,a,e,-1))}Ef();d=vf(Error(m(421)));return Hd(a,b,g,d)}if("$?"===e.data)return b.flags|=128,b.child=a.child,b=vk.bind(null,a),e._reactRetry=b,null;a=f.treeContext;fa=Ka(e.nextSibling);la=b;D=!0;wa=null;null!==a&&(na[oa++]=Ma,na[oa++]=Na,na[oa++]=rb,Ma=a.id,Na=a.overflow,rb=b);b=Df(b,d.children);b.flags|=4096;return b}function vi(a,b,c){a.lanes|=b;var d=a.alternate;
null!==d&&(d.lanes|=b);df(a.return,b,c)}function Ff(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e)}function wi(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;aa(a,b,d.children,c);d=F.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else{if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&
vi(a,c,b);else if(19===a.tag)vi(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}y(F,d);if(0===(b.mode&1))b.memoizedState=null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===xd(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);Ff(b,!1,e,c,f);break;case "backwards":c=
null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===xd(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}Ff(b,!0,c,null,f);break;case "together":Ff(b,!1,null,null,void 0);break;default:b.memoizedState=null}return b.child}function Fd(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2)}function Qa(a,b,c){null!==a&&(b.dependencies=a.dependencies);ra|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(m(153));if(null!==
b.child){a=b.child;c=eb(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=eb(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}function wk(a,b,c){switch(b.tag){case 3:si(b);Qb();break;case 5:Ih(b);break;case 1:ea(b.type)&&ld(b);break;case 4:gf(b,b.stateNode.containerInfo);break;case 10:var d=b.type._context,e=b.memoizedProps.value;y(ud,d._currentValue);d._currentValue=e;break;case 13:d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return y(F,F.current&
1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return ui(a,b,c);y(F,F.current&1);a=Qa(a,b,c);return null!==a?a.sibling:null}y(F,F.current&1);break;case 19:d=0!==(c&b.childLanes);if(0!==(a.flags&128)){if(d)return wi(a,b,c);b.flags|=128}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);y(F,F.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,pi(a,b,c)}return Qa(a,b,c)}function Dc(a,b){if(!D)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==
b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}function W(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,
d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}function xk(a,b,c){var d=b.pendingProps;Ve(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return W(b),null;case 1:return ea(b.type)&&(v(S),v(J)),W(b),null;case 3:d=b.stateNode;Tb();v(S);v(J);jf();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)pd(b)?b.flags|=4:null===a||a.memoizedState.isDehydrated&&0===(b.flags&
256)||(b.flags|=1024,null!==wa&&(Gf(wa),wa=null));xi(a,b);W(b);return null;case 5:hf(b);var e=ub(xc.current);c=b.type;if(null!==a&&null!=b.stateNode)yk(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else{if(!d){if(null===b.stateNode)throw Error(m(166));W(b);return null}a=ub(Ea.current);if(pd(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[Da]=b;d[uc]=f;a=0!==(b.mode&1);switch(c){case "dialog":B("cancel",d);B("close",d);break;case "iframe":case "object":case "embed":B("load",d);break;
case "video":case "audio":for(e=0;e<Ec.length;e++)B(Ec[e],d);break;case "source":B("error",d);break;case "img":case "image":case "link":B("error",d);B("load",d);break;case "details":B("toggle",d);break;case "input":kg(d,f);B("invalid",d);break;case "select":d._wrapperState={wasMultiple:!!f.multiple};B("invalid",d);break;case "textarea":ng(d,f),B("invalid",d)}pe(c,f);e=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(!0!==f.suppressHydrationWarning&&
jd(d.textContent,h,a),e=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(!0!==f.suppressHydrationWarning&&jd(d.textContent,h,a),e=["children",""+h]):$b.hasOwnProperty(g)&&null!=h&&"onScroll"===g&&B("scroll",d)}switch(c){case "input":Pc(d);mg(d,f,!0);break;case "textarea":Pc(d);pg(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=kd)}d=e;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;"http://www.w3.org/1999/xhtml"===
a&&(a=qg(c));"http://www.w3.org/1999/xhtml"===a?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[Da]=b;a[uc]=d;zk(a,b,!1,!1);b.stateNode=a;a:{g=qe(c,d);switch(c){case "dialog":B("cancel",a);B("close",a);e=d;break;case "iframe":case "object":case "embed":B("load",a);e=d;break;
case "video":case "audio":for(e=0;e<Ec.length;e++)B(Ec[e],a);e=d;break;case "source":B("error",a);e=d;break;case "img":case "image":case "link":B("error",a);B("load",a);e=d;break;case "details":B("toggle",a);e=d;break;case "input":kg(a,d);e=ke(a,d);B("invalid",a);break;case "option":e=d;break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=E({},d,{value:void 0});B("invalid",a);break;case "textarea":ng(a,d);e=ne(a,d);B("invalid",a);break;default:e=d}pe(c,e);h=e;for(f in h)if(h.hasOwnProperty(f)){var k=
h[f];"style"===f?sg(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&yi(a,k)):"children"===f?"string"===typeof k?("textarea"!==c||""!==k)&&Fc(a,k):"number"===typeof k&&Fc(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&($b.hasOwnProperty(f)?null!=k&&"onScroll"===f&&B("scroll",a):null!=k&&$d(a,f,k,g))}switch(c){case "input":Pc(a);mg(a,d,!1);break;case "textarea":Pc(a);pg(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Ua(d.value));
break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?Db(a,!!d.multiple,f,!1):null!=d.defaultValue&&Db(a,!!d.multiple,d.defaultValue,!0);break;default:"function"===typeof e.onClick&&(a.onclick=kd)}switch(c){case "button":case "input":case "select":case "textarea":d=!!d.autoFocus;break a;case "img":d=!0;break a;default:d=!1}}d&&(b.flags|=4)}null!==b.ref&&(b.flags|=512,b.flags|=2097152)}W(b);return null;case 6:if(a&&null!=b.stateNode)Ak(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===
b.stateNode)throw Error(m(166));c=ub(xc.current);ub(Ea.current);if(pd(b)){d=b.stateNode;c=b.memoizedProps;d[Da]=b;if(f=d.nodeValue!==c)if(a=la,null!==a)switch(a.tag){case 3:jd(d.nodeValue,c,0!==(a.mode&1));break;case 5:!0!==a.memoizedProps.suppressHydrationWarning&&jd(d.nodeValue,c,0!==(a.mode&1))}f&&(b.flags|=4)}else d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[Da]=b,b.stateNode=d}W(b);return null;case 13:v(F);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(D&&
null!==fa&&0!==(b.mode&1)&&0===(b.flags&128)){for(f=fa;f;)f=Ka(f.nextSibling);Qb();b.flags|=98560;f=!1}else if(f=pd(b),null!==d&&null!==d.dehydrated){if(null===a){if(!f)throw Error(m(318));f=b.memoizedState;f=null!==f?f.dehydrated:null;if(!f)throw Error(m(317));f[Da]=b}else Qb(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;W(b);f=!1}else null!==wa&&(Gf(wa),wa=null),f=!0;if(!f)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;d!==(null!==a&&null!==a.memoizedState)&&
d&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(F.current&1)?0===L&&(L=3):Ef()));null!==b.updateQueue&&(b.flags|=4);W(b);return null;case 4:return Tb(),xi(a,b),null===a&&sc(b.stateNode.containerInfo),W(b),null;case 10:return cf(b.type._context),W(b),null;case 17:return ea(b.type)&&(v(S),v(J)),W(b),null;case 19:v(F);f=b.memoizedState;if(null===f)return W(b),null;d=0!==(b.flags&128);g=f.rendering;if(null===g)if(d)Dc(f,!1);else{if(0!==L||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){g=
xd(a);if(null!==g){b.flags|=128;Dc(f,!1);d=g.updateQueue;null!==d&&(b.updateQueue=d,b.flags|=4);b.subtreeFlags=0;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=14680066,g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,
f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;y(F,F.current&1|2);return b.child}a=a.sibling}null!==f.tail&&P()>Hf&&(b.flags|=128,d=!0,Dc(f,!1),b.lanes=4194304)}else{if(!d)if(a=xd(g),null!==a){if(b.flags|=128,d=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Dc(f,!0),null===f.tail&&"hidden"===f.tailMode&&!g.alternate&&!D)return W(b),null}else 2*P()-f.renderingStartTime>Hf&&1073741824!==c&&(b.flags|=
128,d=!0,Dc(f,!1),b.lanes=4194304);f.isBackwards?(g.sibling=b.child,b.child=g):(c=f.last,null!==c?c.sibling=g:b.child=g,f.last=g)}if(null!==f.tail)return b=f.tail,f.rendering=b,f.tail=b.sibling,f.renderingStartTime=P(),b.sibling=null,c=F.current,y(F,d?c&1|2:c&1),b;W(b);return null;case 22:case 23:return ba=Ga.current,v(Ga),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(ba&1073741824)&&(W(b),b.subtreeFlags&6&&(b.flags|=8192)):W(b),null;case 24:return null;
case 25:return null}throw Error(m(156,b.tag));}function Bk(a,b,c){Ve(b);switch(b.tag){case 1:return ea(b.type)&&(v(S),v(J)),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return Tb(),v(S),v(J),jf(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return hf(b),null;case 13:v(F);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(m(340));Qb()}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return v(F),null;case 4:return Tb(),
null;case 10:return cf(b.type._context),null;case 22:case 23:return ba=Ga.current,v(Ga),null;case 24:return null;default:return null}}function Wb(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null)}catch(d){G(a,b,d)}else c.current=null}function If(a,b,c){try{c()}catch(d){G(a,b,d)}}function Ck(a,b){Jf=Zc;a=ch();if(Ie(a)){if("selectionStart"in a)var c={start:a.selectionStart,end:a.selectionEnd};else a:{c=(c=a.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();
if(d&&0!==d.rangeCount){c=d.anchorNode;var e=d.anchorOffset,f=d.focusNode;d=d.focusOffset;try{c.nodeType,f.nodeType}catch(M){c=null;break a}var g=0,h=-1,k=-1,n=0,q=0,u=a,r=null;b:for(;;){for(var p;;){u!==c||0!==e&&3!==u.nodeType||(h=g+e);u!==f||0!==d&&3!==u.nodeType||(k=g+d);3===u.nodeType&&(g+=u.nodeValue.length);if(null===(p=u.firstChild))break;r=u;u=p}for(;;){if(u===a)break b;r===c&&++n===e&&(h=g);r===f&&++q===d&&(k=g);if(null!==(p=u.nextSibling))break;u=r;r=u.parentNode}u=p}c=-1===h||-1===k?null:
{start:h,end:k}}else c=null}c=c||{start:0,end:0}}else c=null;Kf={focusedElem:a,selectionRange:c};Zc=!1;for(l=b;null!==l;)if(b=l,a=b.child,0!==(b.subtreeFlags&1028)&&null!==a)a.return=b,l=a;else for(;null!==l;){b=l;try{var x=b.alternate;if(0!==(b.flags&1024))switch(b.tag){case 0:case 11:case 15:break;case 1:if(null!==x){var v=x.memoizedProps,z=x.memoizedState,w=b.stateNode,A=w.getSnapshotBeforeUpdate(b.elementType===b.type?v:ya(b.type,v),z);w.__reactInternalSnapshotBeforeUpdate=A}break;case 3:var t=
b.stateNode.containerInfo;1===t.nodeType?t.textContent="":9===t.nodeType&&t.documentElement&&t.removeChild(t.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(m(163));}}catch(M){G(b,b.return,M)}a=b.sibling;if(null!==a){a.return=b.return;l=a;break}l=b.return}x=zi;zi=!1;return x}function Gc(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&If(b,c,f)}e=e.next}while(e!==d)}}
function Id(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d()}c=c.next}while(c!==b)}}function Lf(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=c;break;default:a=c}"function"===typeof b?b(a):b.current=a}}function Ai(a){var b=a.alternate;null!==b&&(a.alternate=null,Ai(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&(delete b[Da],delete b[uc],delete b[Me],delete b[Dk],
delete b[Ek]));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null}function Bi(a){return 5===a.tag||3===a.tag||4===a.tag}function Ci(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Bi(a.return))return null;a=a.return}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child}if(!(a.flags&
2))return a.stateNode}}function Mf(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=kd));else if(4!==d&&(a=a.child,null!==a))for(Mf(a,b,c),a=a.sibling;null!==a;)Mf(a,b,c),a=a.sibling}function Nf(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?c.insertBefore(a,b):c.appendChild(a);
else if(4!==d&&(a=a.child,null!==a))for(Nf(a,b,c),a=a.sibling;null!==a;)Nf(a,b,c),a=a.sibling}function jb(a,b,c){for(c=c.child;null!==c;)Di(a,b,c),c=c.sibling}function Di(a,b,c){if(Ca&&"function"===typeof Ca.onCommitFiberUnmount)try{Ca.onCommitFiberUnmount(Uc,c)}catch(h){}switch(c.tag){case 5:X||Wb(c,b);case 6:var d=T,e=za;T=null;jb(a,b,c);T=d;za=e;null!==T&&(za?(a=T,c=c.stateNode,8===a.nodeType?a.parentNode.removeChild(c):a.removeChild(c)):T.removeChild(c.stateNode));break;case 18:null!==T&&(za?
(a=T,c=c.stateNode,8===a.nodeType?Re(a.parentNode,c):1===a.nodeType&&Re(a,c),nc(a)):Re(T,c.stateNode));break;case 4:d=T;e=za;T=c.stateNode.containerInfo;za=!0;jb(a,b,c);T=d;za=e;break;case 0:case 11:case 14:case 15:if(!X&&(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?If(c,b,g):0!==(f&4)&&If(c,b,g));e=e.next}while(e!==d)}jb(a,b,c);break;case 1:if(!X&&(Wb(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=
c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount()}catch(h){G(c,b,h)}jb(a,b,c);break;case 21:jb(a,b,c);break;case 22:c.mode&1?(X=(d=X)||null!==c.memoizedState,jb(a,b,c),X=d):jb(a,b,c);break;default:jb(a,b,c)}}function Ei(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Fk);b.forEach(function(b){var d=Gk.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}function Aa(a,b,c){c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=
c[d];try{var f=a,g=b,h=g;a:for(;null!==h;){switch(h.tag){case 5:T=h.stateNode;za=!1;break a;case 3:T=h.stateNode.containerInfo;za=!0;break a;case 4:T=h.stateNode.containerInfo;za=!0;break a}h=h.return}if(null===T)throw Error(m(160));Di(f,g,e);T=null;za=!1;var k=e.alternate;null!==k&&(k.return=null);e.return=null}catch(n){G(e,b,n)}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)Fi(b,a),b=b.sibling}function Fi(a,b,c){var d=a.alternate;c=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:Aa(b,a);
Ha(a);if(c&4){try{Gc(3,a,a.return),Id(3,a)}catch(I){G(a,a.return,I)}try{Gc(5,a,a.return)}catch(I){G(a,a.return,I)}}break;case 1:Aa(b,a);Ha(a);c&512&&null!==d&&Wb(d,d.return);break;case 5:Aa(b,a);Ha(a);c&512&&null!==d&&Wb(d,d.return);if(a.flags&32){var e=a.stateNode;try{Fc(e,"")}catch(I){G(a,a.return,I)}}if(c&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps,g=null!==d?d.memoizedProps:f,h=a.type,k=a.updateQueue;a.updateQueue=null;if(null!==k)try{"input"===h&&"radio"===f.type&&null!=f.name&&lg(e,f);
qe(h,g);var n=qe(h,f);for(g=0;g<k.length;g+=2){var q=k[g],u=k[g+1];"style"===q?sg(e,u):"dangerouslySetInnerHTML"===q?yi(e,u):"children"===q?Fc(e,u):$d(e,q,u,n)}switch(h){case "input":le(e,f);break;case "textarea":og(e,f);break;case "select":var r=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=!!f.multiple;var p=f.value;null!=p?Db(e,!!f.multiple,p,!1):r!==!!f.multiple&&(null!=f.defaultValue?Db(e,!!f.multiple,f.defaultValue,!0):Db(e,!!f.multiple,f.multiple?[]:"",!1))}e[uc]=f}catch(I){G(a,a.return,
I)}}break;case 6:Aa(b,a);Ha(a);if(c&4){if(null===a.stateNode)throw Error(m(162));e=a.stateNode;f=a.memoizedProps;try{e.nodeValue=f}catch(I){G(a,a.return,I)}}break;case 3:Aa(b,a);Ha(a);if(c&4&&null!==d&&d.memoizedState.isDehydrated)try{nc(b.containerInfo)}catch(I){G(a,a.return,I)}break;case 4:Aa(b,a);Ha(a);break;case 13:Aa(b,a);Ha(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||null!==e.alternate&&null!==e.alternate.memoizedState||(Of=P()));c&4&&Ei(a);break;case 22:q=
null!==d&&null!==d.memoizedState;a.mode&1?(X=(n=X)||q,Aa(b,a),X=n):Aa(b,a);Ha(a);if(c&8192){n=null!==a.memoizedState;if((a.stateNode.isHidden=n)&&!q&&0!==(a.mode&1))for(l=a,q=a.child;null!==q;){for(u=l=q;null!==l;){r=l;p=r.child;switch(r.tag){case 0:case 11:case 14:case 15:Gc(4,r,r.return);break;case 1:Wb(r,r.return);var x=r.stateNode;if("function"===typeof x.componentWillUnmount){c=r;b=r.return;try{d=c,x.props=d.memoizedProps,x.state=d.memoizedState,x.componentWillUnmount()}catch(I){G(c,b,I)}}break;
case 5:Wb(r,r.return);break;case 22:if(null!==r.memoizedState){Gi(u);continue}}null!==p?(p.return=r,l=p):Gi(u)}q=q.sibling}a:for(q=null,u=a;;){if(5===u.tag){if(null===q){q=u;try{e=u.stateNode,n?(f=e.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(h=u.stateNode,k=u.memoizedProps.style,g=void 0!==k&&null!==k&&k.hasOwnProperty("display")?k.display:null,h.style.display=rg("display",g))}catch(I){G(a,a.return,I)}}}else if(6===u.tag){if(null===q)try{u.stateNode.nodeValue=
n?"":u.memoizedProps}catch(I){G(a,a.return,I)}}else if((22!==u.tag&&23!==u.tag||null===u.memoizedState||u===a)&&null!==u.child){u.child.return=u;u=u.child;continue}if(u===a)break a;for(;null===u.sibling;){if(null===u.return||u.return===a)break a;q===u&&(q=null);u=u.return}q===u&&(q=null);u.sibling.return=u.return;u=u.sibling}}break;case 19:Aa(b,a);Ha(a);c&4&&Ei(a);break;case 21:break;default:Aa(b,a),Ha(a)}}function Ha(a){var b=a.flags;if(b&2){try{a:{for(var c=a.return;null!==c;){if(Bi(c)){var d=c;
break a}c=c.return}throw Error(m(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(Fc(e,""),d.flags&=-33);var f=Ci(a);Nf(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Ci(a);Mf(a,h,g);break;default:throw Error(m(161));}}catch(k){G(a,a.return,k)}a.flags&=-3}b&4096&&(a.flags&=-4097)}function Hk(a,b,c){l=a;Hi(a,b,c)}function Hi(a,b,c){for(var d=0!==(a.mode&1);null!==l;){var e=l,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Jd;if(!g){var h=e.alternate,k=null!==h&&null!==
h.memoizedState||X;h=Jd;var n=X;Jd=g;if((X=k)&&!n)for(l=e;null!==l;)g=l,k=g.child,22===g.tag&&null!==g.memoizedState?Ii(e):null!==k?(k.return=g,l=k):Ii(e);for(;null!==f;)l=f,Hi(f,b,c),f=f.sibling;l=e;Jd=h;X=n}Ji(a,b,c)}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,l=f):Ji(a,b,c)}}function Ji(a,b,c){for(;null!==l;){b=l;if(0!==(b.flags&8772)){c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:X||Id(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!X)if(null===c)d.componentDidMount();
else{var e=b.elementType===b.type?c.memoizedProps:ya(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate)}var f=b.updateQueue;null!==f&&Hh(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=b.child.stateNode;break;case 1:c=b.child.stateNode}Hh(b,g,c)}break;case 5:var h=b.stateNode;if(null===c&&b.flags&4){c=h;var k=b.memoizedProps;switch(b.type){case "button":case "input":case "select":case "textarea":k.autoFocus&&
c.focus();break;case "img":k.src&&(c.src=k.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(null===b.memoizedState){var n=b.alternate;if(null!==n){var q=n.memoizedState;if(null!==q){var p=q.dehydrated;null!==p&&nc(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(m(163));}X||b.flags&512&&Lf(b)}catch(r){G(b,b.return,r)}}if(b===a){l=null;break}c=b.sibling;if(null!==c){c.return=b.return;l=c;break}l=b.return}}function Gi(a){for(;null!==l;){var b=l;if(b===
a){l=null;break}var c=b.sibling;if(null!==c){c.return=b.return;l=c;break}l=b.return}}function Ii(a){for(;null!==l;){var b=l;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Id(4,b)}catch(k){G(b,c,k)}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount()}catch(k){G(b,e,k)}}var f=b.return;try{Lf(b)}catch(k){G(b,f,k)}break;case 5:var g=b.return;try{Lf(b)}catch(k){G(b,g,k)}}}catch(k){G(b,b.return,k)}if(b===a){l=null;break}var h=b.sibling;
if(null!==h){h.return=b.return;l=h;break}l=b.return}}function Hc(){Hf=P()+500}function Z(){return 0!==(p&6)?P():-1!==Kd?Kd:Kd=P()}function hb(a){if(0===(a.mode&1))return 1;if(0!==(p&2)&&0!==U)return U&-U;if(null!==Ik.transition)return 0===Ld&&(Ld=Dg()),Ld;a=z;if(0!==a)return a;a=window.event;a=void 0===a?16:Lg(a.type);return a}function xa(a,b,c,d){if(50<Ic)throw Ic=0,Pf=null,Error(m(185));ic(a,c,d);if(0===(p&2)||a!==O)a===O&&(0===(p&2)&&(Md|=c),4===L&&kb(a,U)),ia(a,d),1===c&&0===p&&0===(b.mode&1)&&
(Hc(),md&&db())}function ia(a,b){var c=a.callbackNode;tj(a,b);var d=Vc(a,a===O?U:0);if(0===d)null!==c&&Ki(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&Ki(c);if(1===b)0===a.tag?jk(Li.bind(null,a)):wh(Li.bind(null,a)),Jk(function(){0===(p&6)&&db()}),c=null;else{switch(Eg(d)){case 1:c=De;break;case 4:c=Mg;break;case 16:c=ad;break;case 536870912:c=Ng;break;default:c=ad}c=Mi(c,Ni.bind(null,a))}a.callbackPriority=b;a.callbackNode=c}}function Ni(a,b){Kd=-1;
Ld=0;if(0!==(p&6))throw Error(m(327));var c=a.callbackNode;if(Xb()&&a.callbackNode!==c)return null;var d=Vc(a,a===O?U:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Nd(a,d);else{b=d;var e=p;p|=2;var f=Oi();if(O!==a||U!==b)Ra=null,Hc(),wb(a,b);do try{Kk();break}catch(h){Pi(a,h)}while(1);af();Od.current=f;p=e;null!==H?b=0:(O=null,U=0,b=L)}if(0!==b){2===b&&(e=ve(a),0!==e&&(d=e,b=Qf(a,e)));if(1===b)throw c=Jc,wb(a,0),kb(a,d),ia(a,P()),c;if(6===b)kb(a,d);else{e=a.current.alternate;
if(0===(d&30)&&!Lk(e)&&(b=Nd(a,d),2===b&&(f=ve(a),0!==f&&(d=f,b=Qf(a,f))),1===b))throw c=Jc,wb(a,0),kb(a,d),ia(a,P()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(m(345));case 2:xb(a,ja,Ra);break;case 3:kb(a,d);if((d&130023424)===d&&(b=Of+500-P(),10<b)){if(0!==Vc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){Z();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Rf(xb.bind(null,a,ja,Ra),b);break}xb(a,ja,Ra);break;case 4:kb(a,d);if((d&4194240)===d)break;b=a.eventTimes;
for(e=-1;0<d;){var g=31-ta(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f}d=e;d=P()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*Mk(d/1960))-d;if(10<d){a.timeoutHandle=Rf(xb.bind(null,a,ja,Ra),d);break}xb(a,ja,Ra);break;case 5:xb(a,ja,Ra);break;default:throw Error(m(329));}}}ia(a,P());return a.callbackNode===c?Ni.bind(null,a):null}function Qf(a,b){var c=Kc;a.current.memoizedState.isDehydrated&&(wb(a,b).flags|=256);a=Nd(a,b);2!==a&&(b=ja,ja=c,null!==b&&Gf(b));return a}function Gf(a){null===
ja?ja=a:ja.push.apply(ja,a)}function Lk(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!ua(f(),e))return!1}catch(g){return!1}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else{if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return!0;b=b.return}b.sibling.return=b.return;b=b.sibling}}return!0}function kb(a,b){b&=~Sf;b&=~Md;a.suspendedLanes|=b;a.pingedLanes&=
~b;for(a=a.expirationTimes;0<b;){var c=31-ta(b),d=1<<c;a[c]=-1;b&=~d}}function Li(a){if(0!==(p&6))throw Error(m(327));Xb();var b=Vc(a,0);if(0===(b&1))return ia(a,P()),null;var c=Nd(a,b);if(0!==a.tag&&2===c){var d=ve(a);0!==d&&(b=d,c=Qf(a,d))}if(1===c)throw c=Jc,wb(a,0),kb(a,b),ia(a,P()),c;if(6===c)throw Error(m(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;xb(a,ja,Ra);ia(a,P());return null}function Tf(a,b){var c=p;p|=1;try{return a(b)}finally{p=c,0===p&&(Hc(),md&&db())}}function yb(a){null!==
lb&&0===lb.tag&&0===(p&6)&&Xb();var b=p;p|=1;var c=ca.transition,d=z;try{if(ca.transition=null,z=1,a)return a()}finally{z=d,ca.transition=c,p=b,0===(p&6)&&db()}}function wb(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Nk(c));if(null!==H)for(c=H.return;null!==c;){var d=c;Ve(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&(v(S),v(J));break;case 3:Tb();v(S);v(J);jf();break;case 5:hf(d);break;case 4:Tb();break;case 13:v(F);break;
case 19:v(F);break;case 10:cf(d.type._context);break;case 22:case 23:ba=Ga.current,v(Ga)}c=c.return}O=a;H=a=eb(a.current,null);U=ba=b;L=0;Jc=null;Sf=Md=ra=0;ja=Kc=null;if(null!==tb){for(b=0;b<tb.length;b++)if(c=tb[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g}c.pending=d}tb=null}return a}function Pi(a,b){do{var c=H;try{af();yd.current=zd;if(Ad){for(var d=C.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}Ad=
!1}vb=0;N=K=C=null;zc=!1;Ac=0;Uf.current=null;if(null===c||null===c.return){L=1;Jc=b;H=null;break}a:{var f=a,g=c.return,h=c,k=b;b=U;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var n=k,l=h,p=l.tag;if(0===(l.mode&1)&&(0===p||11===p||15===p)){var r=l.alternate;r?(l.updateQueue=r.updateQueue,l.memoizedState=r.memoizedState,l.lanes=r.lanes):(l.updateQueue=null,l.memoizedState=null)}var v=ji(g);if(null!==v){v.flags&=-257;ki(v,g,h,f,b);v.mode&1&&ii(f,n,b);b=v;k=n;var x=b.updateQueue;
if(null===x){var z=new Set;z.add(k);b.updateQueue=z}else x.add(k);break a}else{if(0===(b&1)){ii(f,n,b);Ef();break a}k=Error(m(426))}}else if(D&&h.mode&1){var y=ji(g);if(null!==y){0===(y.flags&65536)&&(y.flags|=256);ki(y,g,h,f,b);Ye(Ub(k,h));break a}}f=k=Ub(k,h);4!==L&&(L=2);null===Kc?Kc=[f]:Kc.push(f);f=g;do{switch(f.tag){case 3:f.flags|=65536;b&=-b;f.lanes|=b;var w=gi(f,k,b);Gh(f,w);break a;case 1:h=k;var A=f.type,t=f.stateNode;if(0===(f.flags&128)&&("function"===typeof A.getDerivedStateFromError||
null!==t&&"function"===typeof t.componentDidCatch&&(null===ib||!ib.has(t)))){f.flags|=65536;b&=-b;f.lanes|=b;var B=hi(f,h,b);Gh(f,B);break a}}f=f.return}while(null!==f)}Qi(c)}catch(ma){b=ma;H===c&&null!==c&&(H=c=c.return);continue}break}while(1)}function Oi(){var a=Od.current;Od.current=zd;return null===a?zd:a}function Ef(){if(0===L||3===L||2===L)L=4;null===O||0===(ra&268435455)&&0===(Md&268435455)||kb(O,U)}function Nd(a,b){var c=p;p|=2;var d=Oi();if(O!==a||U!==b)Ra=null,wb(a,b);do try{Ok();break}catch(e){Pi(a,
e)}while(1);af();p=c;Od.current=d;if(null!==H)throw Error(m(261));O=null;U=0;return L}function Ok(){for(;null!==H;)Ri(H)}function Kk(){for(;null!==H&&!Pk();)Ri(H)}function Ri(a){var b=Qk(a.alternate,a,ba);a.memoizedProps=a.pendingProps;null===b?Qi(a):H=b;Uf.current=null}function Qi(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=xk(c,b,ba),null!==c){H=c;return}}else{c=Bk(c,b);if(null!==c){c.flags&=32767;H=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;
else{L=6;H=null;return}}b=b.sibling;if(null!==b){H=b;return}H=b=a}while(null!==b);0===L&&(L=5)}function xb(a,b,c){var d=z,e=ca.transition;try{ca.transition=null,z=1,Rk(a,b,c,d)}finally{ca.transition=e,z=d}return null}function Rk(a,b,c,d){do Xb();while(null!==lb);if(0!==(p&6))throw Error(m(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(m(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;
uj(a,f);a===O&&(H=O=null,U=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||Pd||(Pd=!0,Mi(ad,function(){Xb();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=ca.transition;ca.transition=null;var g=z;z=1;var h=p;p|=4;Uf.current=null;Ck(a,c);Fi(c,a);Tj(Kf);Zc=!!Jf;Kf=Jf=null;a.current=c;Hk(c,a,e);Sk();p=h;z=g;ca.transition=f}else a.current=c;Pd&&(Pd=!1,lb=a,Qd=e);f=a.pendingLanes;0===f&&(ib=null);oj(c.stateNode,d);ia(a,P());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=
b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Ed)throw Ed=!1,a=xf,xf=null,a;0!==(Qd&1)&&0!==a.tag&&Xb();f=a.pendingLanes;0!==(f&1)?a===Pf?Ic++:(Ic=0,Pf=a):Ic=0;db();return null}function Xb(){if(null!==lb){var a=Eg(Qd),b=ca.transition,c=z;try{ca.transition=null;z=16>a?16:a;if(null===lb)var d=!1;else{a=lb;lb=null;Qd=0;if(0!==(p&6))throw Error(m(331));var e=p;p|=4;for(l=a.current;null!==l;){var f=l,g=f.child;if(0!==(l.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var n=
h[k];for(l=n;null!==l;){var q=l;switch(q.tag){case 0:case 11:case 15:Gc(8,q,f)}var u=q.child;if(null!==u)u.return=q,l=u;else for(;null!==l;){q=l;var r=q.sibling,v=q.return;Ai(q);if(q===n){l=null;break}if(null!==r){r.return=v;l=r;break}l=v}}}var x=f.alternate;if(null!==x){var y=x.child;if(null!==y){x.child=null;do{var C=y.sibling;y.sibling=null;y=C}while(null!==y)}}l=f}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,l=g;else b:for(;null!==l;){f=l;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Gc(9,
f,f.return)}var w=f.sibling;if(null!==w){w.return=f.return;l=w;break b}l=f.return}}var A=a.current;for(l=A;null!==l;){g=l;var t=g.child;if(0!==(g.subtreeFlags&2064)&&null!==t)t.return=g,l=t;else b:for(g=A;null!==l;){h=l;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Id(9,h)}}catch(ma){G(h,h.return,ma)}if(h===g){l=null;break b}var B=h.sibling;if(null!==B){B.return=h.return;l=B;break b}l=h.return}}p=e;db();if(Ca&&"function"===typeof Ca.onPostCommitFiberRoot)try{Ca.onPostCommitFiberRoot(Uc,
a)}catch(ma){}d=!0}return d}finally{z=c,ca.transition=b}}return!1}function Si(a,b,c){b=Ub(c,b);b=gi(a,b,1);a=fb(a,b,1);b=Z();null!==a&&(ic(a,1,b),ia(a,b))}function G(a,b,c){if(3===a.tag)Si(a,a,c);else for(;null!==b;){if(3===b.tag){Si(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===ib||!ib.has(d))){a=Ub(c,a);a=hi(b,a,1);b=fb(b,a,1);a=Z();null!==b&&(ic(b,1,a),ia(b,a));break}}b=b.return}}function sk(a,
b,c){var d=a.pingCache;null!==d&&d.delete(b);b=Z();a.pingedLanes|=a.suspendedLanes&c;O===a&&(U&c)===c&&(4===L||3===L&&(U&130023424)===U&&500>P()-Of?wb(a,0):Sf|=c);ia(a,b)}function Ti(a,b){0===b&&(0===(a.mode&1)?b=1:(b=Rd,Rd<<=1,0===(Rd&130023424)&&(Rd=4194304)));var c=Z();a=Oa(a,b);null!==a&&(ic(a,b,c),ia(a,c))}function vk(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Ti(a,c)}function Gk(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);
break;case 19:d=a.stateNode;break;default:throw Error(m(314));}null!==d&&d.delete(b);Ti(a,c)}function Mi(a,b){return xh(a,b)}function Tk(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null}function yf(a){a=
a.prototype;return!(!a||!a.isReactComponent)}function Uk(a){if("function"===typeof a)return yf(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===ie)return 11;if(a===je)return 14}return 2}function eb(a,b){var c=a.alternate;null===c?(c=pa(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=
a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}function rd(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)yf(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case Bb:return sb(c.children,e,f,b);case fe:g=8;e|=8;break;case ee:return a=pa(12,c,b,e|2),a.elementType=ee,a.lanes=f,a;case ge:return a=
pa(13,c,b,e),a.elementType=ge,a.lanes=f,a;case he:return a=pa(19,c,b,e),a.elementType=he,a.lanes=f,a;case Ui:return Gd(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case hg:g=10;break a;case gg:g=9;break a;case ie:g=11;break a;case je:g=14;break a;case Ta:g=16;d=null;break a}throw Error(m(130,null==a?a:typeof a,""));}b=pa(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function sb(a,b,c,d){a=pa(7,a,d,b);a.lanes=c;return a}function Gd(a,b,c,d){a=pa(22,a,d,b);a.elementType=
Ui;a.lanes=c;a.stateNode={isHidden:!1};return a}function Ze(a,b,c){a=pa(6,a,null,b);a.lanes=c;return a}function $e(a,b,c){b=pa(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}function Vk(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=
0;this.eventTimes=we(0);this.expirationTimes=we(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=we(0);this.identifierPrefix=d;this.onRecoverableError=e;this.mutableSourceEagerHydrationData=null}function Vf(a,b,c,d,e,f,g,h,k,l){a=new Vk(a,b,c,h,k);1===b?(b=1,!0===f&&(b|=8)):b=0;f=pa(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,
pendingSuspenseBoundaries:null};ff(f);return a}function Wk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:Cb,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}function Vi(a){if(!a)return cb;a=a._reactInternals;a:{if(nb(a)!==a||1!==a.tag)throw Error(m(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(ea(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return}while(null!==b);throw Error(m(171));
}if(1===a.tag){var c=a.type;if(ea(c))return uh(a,c,b)}return b}function Wi(a,b,c,d,e,f,g,h,k,l){a=Vf(c,d,!0,a,e,f,g,h,k);a.context=Vi(null);c=a.current;d=Z();e=hb(c);f=Pa(d,e);f.callback=void 0!==b&&null!==b?b:null;fb(c,f,e);a.current.lanes=e;ic(a,e,d);ia(a,d);return a}function Sd(a,b,c,d){var e=b.current,f=Z(),g=hb(e);c=Vi(c);null===b.context?b.context=c:b.pendingContext=c;b=Pa(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=fb(e,b,g);null!==a&&(xa(a,e,g,f),vd(a,e,g));return g}
function Td(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function Xi(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function Wf(a,b){Xi(a,b);(a=a.alternate)&&Xi(a,b)}function Xk(a){a=Bg(a);return null===a?null:a.stateNode}function Yk(a){return null}function Xf(a){this._internalRoot=a}function Ud(a){this._internalRoot=a}function Yf(a){return!(!a||1!==a.nodeType&&9!==
a.nodeType&&11!==a.nodeType)}function Vd(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function Yi(){}function Zk(a,b,c,d,e){if(e){if("function"===typeof d){var f=d;d=function(){var a=Td(g);f.call(a)}}var g=Wi(b,d,a,0,null,!1,!1,"",Yi);a._reactRootContainer=g;a[Ja]=g.current;sc(8===a.nodeType?a.parentNode:a);yb();return g}for(;e=a.lastChild;)a.removeChild(e);if("function"===typeof d){var h=d;d=function(){var a=Td(k);
h.call(a)}}var k=Vf(a,0,!1,null,null,!1,!1,"",Yi);a._reactRootContainer=k;a[Ja]=k.current;sc(8===a.nodeType?a.parentNode:a);yb(function(){Sd(b,k,c,d)});return k}function Wd(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f;if("function"===typeof e){var h=e;e=function(){var a=Td(g);h.call(a)}}Sd(b,g,a,e)}else g=Zk(c,b,a,e,d);return Td(g)}var cg=new Set,$b={},Ia=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Zd=Object.prototype.hasOwnProperty,
cj=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,eg={},dg={},R={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){R[a]=
new Y(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];R[b]=new Y(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){R[a]=new Y(a,2,!1,a.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){R[a]=new Y(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){R[a]=
new Y(a,3,!1,a.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(a){R[a]=new Y(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){R[a]=new Y(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){R[a]=new Y(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){R[a]=new Y(a,5,!1,a.toLowerCase(),null,!1,!1)});var Zf=/[\-:]([a-z])/g,$f=function(a){return a[1].toUpperCase()};"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=
a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){R[a]=new Y(a,1,!1,a.toLowerCase(),null,!1,!1)});R.xlinkHref=new Y("xlinkHref",
1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){R[a]=new Y(a,1,!1,a.toLowerCase(),null,!0,!0)});var Sa=zb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sd=Symbol.for("react.element"),Cb=Symbol.for("react.portal"),Bb=Symbol.for("react.fragment"),fe=Symbol.for("react.strict_mode"),ee=Symbol.for("react.profiler"),hg=Symbol.for("react.provider"),gg=Symbol.for("react.context"),ie=Symbol.for("react.forward_ref"),ge=Symbol.for("react.suspense"),
he=Symbol.for("react.suspense_list"),je=Symbol.for("react.memo"),Ta=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var Ui=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var fg=Symbol.iterator,E=Object.assign,ae,ce=!1,cc=Array.isArray,Xd,yi=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,
c,d,e)})}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else{Xd=Xd||document.createElement("div");Xd.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=Xd.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}}),Fc=function(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b},dc={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,
borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,
strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},$k=["Webkit","ms","Moz","O"];Object.keys(dc).forEach(function(a){$k.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);dc[b]=dc[a]})});var ij=E({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0}),ze=null,se=null,Eb=null,Fb=null,xg=function(a,b){return a(b)},yg=function(){},te=!1,Oe=!1;if(Ia)try{var Lc={};Object.defineProperty(Lc,
"passive",{get:function(){Oe=!0}});window.addEventListener("test",Lc,Lc);window.removeEventListener("test",Lc,Lc)}catch(a){Oe=!1}var kj=function(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(q){this.onError(q)}},gc=!1,Sc=null,Tc=!1,ue=null,lj={onError:function(a){gc=!0;Sc=a}},Ba=zb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler,Jg=Ba.unstable_scheduleCallback,Kg=Ba.unstable_NormalPriority,xh=Jg,Ki=Ba.unstable_cancelCallback,Pk=Ba.unstable_shouldYield,
Sk=Ba.unstable_requestPaint,P=Ba.unstable_now,Dj=Ba.unstable_getCurrentPriorityLevel,De=Ba.unstable_ImmediatePriority,Mg=Ba.unstable_UserBlockingPriority,ad=Kg,Ej=Ba.unstable_LowPriority,Ng=Ba.unstable_IdlePriority,Uc=null,Ca=null,ta=Math.clz32?Math.clz32:pj,qj=Math.log,rj=Math.LN2,Wc=64,Rd=4194304,z=0,Ae=!1,Yc=[],Va=null,Wa=null,Xa=null,jc=new Map,kc=new Map,Ya=[],Bj="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" "),
Gb=Sa.ReactCurrentBatchConfig,Zc=!0,$c=null,Za=null,Ee=null,bd=null,Yb={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},He=ka(Yb),Mc=E({},Yb,{view:0,detail:0}),ak=ka(Mc),ag,bg,Nc,Yd=E({},Mc,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Fe,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:
a.relatedTarget},movementX:function(a){if("movementX"in a)return a.movementX;a!==Nc&&(Nc&&"mousemove"===a.type?(ag=a.screenX-Nc.screenX,bg=a.screenY-Nc.screenY):bg=ag=0,Nc=a);return ag},movementY:function(a){return"movementY"in a?a.movementY:bg}}),ih=ka(Yd),al=E({},Yd,{dataTransfer:0}),Wj=ka(al),bl=E({},Mc,{relatedTarget:0}),Pe=ka(bl),cl=E({},Yb,{animationName:0,elapsedTime:0,pseudoElement:0}),Yj=ka(cl),dl=E({},Yb,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),
ck=ka(dl),el=E({},Yb,{data:0}),qh=ka(el),fk=qh,fl={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gl={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",
112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Gj={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"},hl=E({},Mc,{key:function(a){if(a.key){var b=fl[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=cd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?gl[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,
metaKey:0,repeat:0,locale:0,getModifierState:Fe,charCode:function(a){return"keypress"===a.type?cd(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===a.type?cd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Vj=ka(hl),il=E({},Yd,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),nh=ka(il),jl=E({},Mc,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,
ctrlKey:0,shiftKey:0,getModifierState:Fe}),Xj=ka(jl),kl=E({},Yb,{propertyName:0,elapsedTime:0,pseudoElement:0}),Zj=ka(kl),ll=E({},Yd,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),bk=ka(ll),Hj=[9,13,27,32],Ge=Ia&&"CompositionEvent"in window,Oc=null;Ia&&"documentMode"in document&&(Oc=document.documentMode);var ek=Ia&&"TextEvent"in
window&&!Oc,Ug=Ia&&(!Ge||Oc&&8<Oc&&11>=Oc),Tg=String.fromCharCode(32),Sg=!1,Hb=!1,Kj={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0},oc=null,pc=null,ph=!1;Ia&&(ph=Lj("input")&&(!document.documentMode||9<document.documentMode));var ua="function"===typeof Object.is?Object.is:Sj,dk=Ia&&"documentMode"in document&&11>=document.documentMode,Jb=null,Ke=null,rc=null,Je=!1,Kb={animationend:gd("Animation","AnimationEnd"),
animationiteration:gd("Animation","AnimationIteration"),animationstart:gd("Animation","AnimationStart"),transitionend:gd("Transition","TransitionEnd")},Le={},eh={};Ia&&(eh=document.createElement("div").style,"AnimationEvent"in window||(delete Kb.animationend.animation,delete Kb.animationiteration.animation,delete Kb.animationstart.animation),"TransitionEvent"in window||delete Kb.transitionend.transition);var jh=hd("animationend"),kh=hd("animationiteration"),lh=hd("animationstart"),mh=hd("transitionend"),
fh=new Map,Zi="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
(function(){for(var a=0;a<Zi.length;a++){var b=Zi[a],c=b.toLowerCase();b=b[0].toUpperCase()+b.slice(1);$a(c,"on"+b)}$a(jh,"onAnimationEnd");$a(kh,"onAnimationIteration");$a(lh,"onAnimationStart");$a("dblclick","onDoubleClick");$a("focusin","onFocus");$a("focusout","onBlur");$a(mh,"onTransitionEnd")})();Ab("onMouseEnter",["mouseout","mouseover"]);Ab("onMouseLeave",["mouseout","mouseover"]);Ab("onPointerEnter",["pointerout","pointerover"]);Ab("onPointerLeave",["pointerout","pointerover"]);mb("onChange",
"change click focusin focusout input keydown keyup selectionchange".split(" "));mb("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));mb("onBeforeInput",["compositionend","keypress","textInput","paste"]);mb("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));mb("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));mb("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ec="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Uj=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ec)),id="_reactListening"+Math.random().toString(36).slice(2),gk=/\r\n?/g,hk=/\u0000|\uFFFD/g,Jf=null,Kf=null,Rf="function"===typeof setTimeout?setTimeout:void 0,Nk="function"===typeof clearTimeout?
clearTimeout:void 0,$i="function"===typeof Promise?Promise:void 0,Jk="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof $i?function(a){return $i.resolve(null).then(a).catch(ik)}:Rf,Zb=Math.random().toString(36).slice(2),Da="__reactFiber$"+Zb,uc="__reactProps$"+Zb,Ja="__reactContainer$"+Zb,Me="__reactEvents$"+Zb,Dk="__reactListeners$"+Zb,Ek="__reactHandles$"+Zb,Se=[],Mb=-1,cb={},J=bb(cb),S=bb(!1),pb=cb,La=null,md=!1,Te=!1,Ob=[],Pb=0,od=null,nd=0,na=[],oa=0,rb=null,Ma=1,Na="",la=
null,fa=null,D=!1,wa=null,Ik=Sa.ReactCurrentBatchConfig,Vb=Dh(!0),li=Dh(!1),ud=bb(null),td=null,Rb=null,bf=null,tb=null,kk=Oa,gb=!1,wc={},Ea=bb(wc),yc=bb(wc),xc=bb(wc),F=bb(0),kf=[],yd=Sa.ReactCurrentDispatcher,sf=Sa.ReactCurrentBatchConfig,vb=0,C=null,K=null,N=null,Ad=!1,zc=!1,Ac=0,ml=0,zd={readContext:qa,useCallback:V,useContext:V,useEffect:V,useImperativeHandle:V,useInsertionEffect:V,useLayoutEffect:V,useMemo:V,useReducer:V,useRef:V,useState:V,useDebugValue:V,useDeferredValue:V,useTransition:V,
useMutableSource:V,useSyncExternalStore:V,useId:V,unstable_isNewReconciler:!1},lk={readContext:qa,useCallback:function(a,b){Fa().memoizedState=[a,void 0===b?null:b];return a},useContext:qa,useEffect:Sh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Bd(4194308,4,Vh.bind(null,b,a),c)},useLayoutEffect:function(a,b){return Bd(4194308,4,a,b)},useInsertionEffect:function(a,b){return Bd(4,2,a,b)},useMemo:function(a,b){var c=Fa();b=void 0===b?null:b;a=a();c.memoizedState=
[a,b];return a},useReducer:function(a,b,c){var d=Fa();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=qk.bind(null,C,a);return[d.memoizedState,a]},useRef:function(a){var b=Fa();a={current:a};return b.memoizedState=a},useState:Qh,useDebugValue:rf,useDeferredValue:function(a){return Fa().memoizedState=a},useTransition:function(){var a=Qh(!1),b=a[0];a=pk.bind(null,a[1]);Fa().memoizedState=
a;return[b,a]},useMutableSource:function(a,b,c){},useSyncExternalStore:function(a,b,c){var d=C,e=Fa();if(D){if(void 0===c)throw Error(m(407));c=c()}else{c=b();if(null===O)throw Error(m(349));0!==(vb&30)||Nh(d,b,c)}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;Sh(Lh.bind(null,d,f,a),[a]);d.flags|=2048;Cc(9,Mh.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=Fa(),b=O.identifierPrefix;if(D){var c=Na;var d=Ma;c=(d&~(1<<32-ta(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Ac++;0<c&&
(b+="H"+c.toString(32));b+=":"}else c=ml++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:!1},mk={readContext:qa,useCallback:Xh,useContext:qa,useEffect:qf,useImperativeHandle:Wh,useInsertionEffect:Th,useLayoutEffect:Uh,useMemo:Yh,useReducer:of,useRef:Rh,useState:function(a){return of(Bc)},useDebugValue:rf,useDeferredValue:function(a){var b=sa();return Zh(b,K.memoizedState,a)},useTransition:function(){var a=of(Bc)[0],b=sa().memoizedState;return[a,b]},useMutableSource:Jh,
useSyncExternalStore:Kh,useId:$h,unstable_isNewReconciler:!1},nk={readContext:qa,useCallback:Xh,useContext:qa,useEffect:qf,useImperativeHandle:Wh,useInsertionEffect:Th,useLayoutEffect:Uh,useMemo:Yh,useReducer:pf,useRef:Rh,useState:function(a){return pf(Bc)},useDebugValue:rf,useDeferredValue:function(a){var b=sa();return null===K?b.memoizedState=a:Zh(b,K.memoizedState,a)},useTransition:function(){var a=pf(Bc)[0],b=sa().memoizedState;return[a,b]},useMutableSource:Jh,useSyncExternalStore:Kh,useId:$h,
unstable_isNewReconciler:!1},Dd={isMounted:function(a){return(a=a._reactInternals)?nb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=Z(),e=hb(a),f=Pa(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=fb(a,f,e);null!==b&&(xa(b,a,e,d),vd(b,a,e))},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=Z(),e=hb(a),f=Pa(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=fb(a,f,e);null!==b&&(xa(b,a,e,d),vd(b,a,e))},enqueueForceUpdate:function(a,b){a=a._reactInternals;
var c=Z(),d=hb(a),e=Pa(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=fb(a,e,d);null!==b&&(xa(b,a,d,c),vd(b,a,d))}},rk="function"===typeof WeakMap?WeakMap:Map,tk=Sa.ReactCurrentOwner,ha=!1,Cf={dehydrated:null,treeContext:null,retryLane:0};var zk=function(a,b,c,d){for(c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=
c.return;c=c.sibling}};var xi=function(a,b){};var yk=function(a,b,c,d,e){var f=a.memoizedProps;if(f!==d){a=b.stateNode;ub(Ea.current);e=null;switch(c){case "input":f=ke(a,f);d=ke(a,d);e=[];break;case "select":f=E({},f,{value:void 0});d=E({},d,{value:void 0});e=[];break;case "textarea":f=ne(a,f);d=ne(a,d);e=[];break;default:"function"!==typeof f.onClick&&"function"===typeof d.onClick&&(a.onclick=kd)}pe(c,d);var g;c=null;for(l in f)if(!d.hasOwnProperty(l)&&f.hasOwnProperty(l)&&null!=f[l])if("style"===
l){var h=f[l];for(g in h)h.hasOwnProperty(g)&&(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&($b.hasOwnProperty(l)?e||(e=[]):(e=e||[]).push(l,null));for(l in d){var k=d[l];h=null!=f?f[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||
(c={}),c[g]=k[g])}else c||(e||(e=[]),e.push(l,c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(e=e||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(e=e||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&($b.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&B("scroll",a),e||h===k||(e=[])):(e=e||[]).push(l,k))}c&&(e=e||[]).push("style",c);var l=e;if(b.updateQueue=l)b.flags|=4}};var Ak=function(a,
b,c,d){c!==d&&(b.flags|=4)};var Jd=!1,X=!1,Fk="function"===typeof WeakSet?WeakSet:Set,l=null,zi=!1,T=null,za=!1,Mk=Math.ceil,Od=Sa.ReactCurrentDispatcher,Uf=Sa.ReactCurrentOwner,ca=Sa.ReactCurrentBatchConfig,p=0,O=null,H=null,U=0,ba=0,Ga=bb(0),L=0,Jc=null,ra=0,Md=0,Sf=0,Kc=null,ja=null,Of=0,Hf=Infinity,Ra=null,Ed=!1,xf=null,ib=null,Pd=!1,lb=null,Qd=0,Ic=0,Pf=null,Kd=-1,Ld=0;var Qk=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||S.current)ha=!0;else{if(0===(a.lanes&c)&&0===(b.flags&
128))return ha=!1,wk(a,b,c);ha=0!==(a.flags&131072)?!0:!1}else ha=!1,D&&0!==(b.flags&1048576)&&yh(b,nd,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;Fd(a,b);a=b.pendingProps;var e=Nb(b,J.current);Sb(b,c);e=mf(null,b,d,a,e,c);var f=nf();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=null,ea(d)?(f=!0,ld(b)):f=!1,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,ff(b),e.updater=Dd,b.stateNode=
e,e._reactInternals=b,uf(b,d,a,c),b=Af(null,b,d,!0,f,c)):(b.tag=0,D&&f&&Ue(b),aa(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{Fd(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=Uk(d);a=ya(d,a);switch(e){case 0:b=zf(null,b,d,a,c);break a;case 1:b=ri(null,b,d,a,c);break a;case 11:b=mi(null,b,d,a,c);break a;case 14:b=ni(null,b,d,ya(d.type,a),c);break a}throw Error(m(306,d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),zf(a,b,d,e,c);
case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),ri(a,b,d,e,c);case 3:a:{si(b);if(null===a)throw Error(m(387));d=b.pendingProps;f=b.memoizedState;e=f.element;Fh(a,b);wd(b,d,null,c);var g=b.memoizedState;d=g.element;if(f.isDehydrated)if(f={element:d,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=f,b.memoizedState=f,b.flags&256){e=Ub(Error(m(423)),b);b=ti(a,b,d,c,e);break a}else if(d!==e){e=
Ub(Error(m(424)),b);b=ti(a,b,d,c,e);break a}else for(fa=Ka(b.stateNode.containerInfo.firstChild),la=b,D=!0,wa=null,c=li(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else{Qb();if(d===e){b=Qa(a,b,c);break a}aa(a,b,d,c)}b=b.child}return b;case 5:return Ih(b),null===a&&Xe(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Qe(d,e)?g=null:null!==f&&Qe(d,f)&&(b.flags|=32),qi(a,b),aa(a,b,g,c),b.child;case 6:return null===a&&Xe(b),null;case 13:return ui(a,b,c);case 4:return gf(b,
b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Vb(b,null,d,c):aa(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),mi(a,b,d,e,c);case 7:return aa(a,b,b.pendingProps,c),b.child;case 8:return aa(a,b,b.pendingProps.children,c),b.child;case 12:return aa(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;g=e.value;y(ud,d._currentValue);d._currentValue=g;if(null!==f)if(ua(f.value,g)){if(f.children===
e.children&&!S.current){b=Qa(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=Pa(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var p=l.pending;null===p?k.next=k:(k.next=p.next,p.next=k);l.pending=k}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);df(f.return,c,b);h.lanes|=c;break}k=k.next}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===
f.tag){g=f.return;if(null===g)throw Error(m(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);df(g,c,b);g=f.sibling}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return}f=g}aa(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,d=b.pendingProps.children,Sb(b,c),e=qa(e),d=d(e),b.flags|=1,aa(a,b,d,c),b.child;case 14:return d=b.type,e=ya(d,b.pendingProps),e=ya(d.type,e),ni(a,b,d,e,c);case 15:return oi(a,
b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),Fd(a,b),b.tag=1,ea(d)?(a=!0,ld(b)):a=!1,Sb(b,c),ei(b,d,e),uf(b,d,e,c),Af(null,b,d,!0,a,c);case 19:return wi(a,b,c);case 22:return pi(a,b,c)}throw Error(m(156,b.tag));};var pa=function(a,b,c,d){return new Tk(a,b,c,d)},aj="function"===typeof reportError?reportError:function(a){console.error(a)};Ud.prototype.render=Xf.prototype.render=function(a){var b=this._internalRoot;if(null===b)throw Error(m(409));
Sd(a,b,null,null)};Ud.prototype.unmount=Xf.prototype.unmount=function(){var a=this._internalRoot;if(null!==a){this._internalRoot=null;var b=a.containerInfo;yb(function(){Sd(null,a,null,null)});b[Ja]=null}};Ud.prototype.unstable_scheduleHydration=function(a){if(a){var b=nl();a={blockedOn:null,target:a,priority:b};for(var c=0;c<Ya.length&&0!==b&&b<Ya[c].priority;c++);Ya.splice(c,0,a);0===c&&Hg(a)}};var Cj=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=
hc(b.pendingLanes);0!==c&&(xe(b,c|1),ia(b,P()),0===(p&6)&&(Hc(),db()))}break;case 13:yb(function(){var b=Oa(a,1);if(null!==b){var c=Z();xa(b,a,1,c)}}),Wf(a,1)}};var Gg=function(a){if(13===a.tag){var b=Oa(a,134217728);if(null!==b){var c=Z();xa(b,a,134217728,c)}Wf(a,134217728)}};var xj=function(a){if(13===a.tag){var b=hb(a),c=Oa(a,b);if(null!==c){var d=Z();xa(c,a,b,d)}Wf(a,b)}};var nl=function(){return z};var wj=function(a,b){var c=z;try{return z=a,b()}finally{z=c}};se=function(a,b,c){switch(b){case "input":le(a,
c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Rc(d);if(!e)throw Error(m(90));jg(d);le(d,e)}}}break;case "textarea":og(a,c);break;case "select":b=c.value,null!=b&&Db(a,!!c.multiple,b,!1)}};(function(a,b,c){xg=a;yg=c})(Tf,function(a,b,c,d,e){var f=z,g=ca.transition;try{return ca.transition=null,z=1,a(b,c,d,e)}finally{z=f,ca.transition=
g,0===p&&Hc()}},yb);var ol={usingClientEntryPoint:!1,Events:[ec,Ib,Rc,ug,vg,Tf]};(function(a){a={bundleType:a.bundleType,version:a.version,rendererPackageName:a.rendererPackageName,rendererConfig:a.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Sa.ReactCurrentDispatcher,findHostInstanceByFiber:Xk,
findFiberByHostInstance:a.findFiberByHostInstance||Yk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1"};if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)a=!1;else{var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)a=!0;else{try{Uc=b.inject(a),Ca=b}catch(c){}a=b.checkDCE?!0:!1}}return a})({findFiberByHostInstance:ob,bundleType:0,version:"18.3.1-next-f1338f8080-20240426",
rendererPackageName:"react-dom"});Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ol;Q.createPortal=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Yf(b))throw Error(m(200));return Wk(a,b,null,c)};Q.createRoot=function(a,b){if(!Yf(a))throw Error(m(299));var c=!1,d="",e=aj;null!==b&&void 0!==b&&(!0===b.unstable_strictMode&&(c=!0),void 0!==b.identifierPrefix&&(d=b.identifierPrefix),void 0!==b.onRecoverableError&&(e=b.onRecoverableError));b=Vf(a,1,!1,null,null,
c,!1,d,e);a[Ja]=b.current;sc(8===a.nodeType?a.parentNode:a);return new Xf(b)};Q.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(m(188));a=Object.keys(a).join(",");throw Error(m(268,a));}a=Bg(b);a=null===a?null:a.stateNode;return a};Q.flushSync=function(a){return yb(a)};Q.hydrate=function(a,b,c){if(!Vd(b))throw Error(m(200));return Wd(null,a,b,!0,c)};Q.hydrateRoot=function(a,b,c){if(!Yf(a))throw Error(m(405));
var d=null!=c&&c.hydratedSources||null,e=!1,f="",g=aj;null!==c&&void 0!==c&&(!0===c.unstable_strictMode&&(e=!0),void 0!==c.identifierPrefix&&(f=c.identifierPrefix),void 0!==c.onRecoverableError&&(g=c.onRecoverableError));b=Wi(b,null,a,1,null!=c?c:null,e,!1,f,g);a[Ja]=b.current;sc(a);if(d)for(a=0;a<d.length;a++)c=d[a],e=c._getVersion,e=e(c._source),null==b.mutableSourceEagerHydrationData?b.mutableSourceEagerHydrationData=[c,e]:b.mutableSourceEagerHydrationData.push(c,e);return new Ud(b)};Q.render=
function(a,b,c){if(!Vd(b))throw Error(m(200));return Wd(null,a,b,!1,c)};Q.unmountComponentAtNode=function(a){if(!Vd(a))throw Error(m(40));return a._reactRootContainer?(yb(function(){Wd(null,null,a,!1,function(){a._reactRootContainer=null;a[Ja]=null})}),!0):!1};Q.unstable_batchedUpdates=Tf;Q.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!Vd(c))throw Error(m(200));if(null==a||void 0===a._reactInternals)throw Error(m(38));return Wd(a,b,c,!1,d)};Q.version="18.3.1-next-f1338f8080-20240426"});
})();


/* ======================== POLYFILLS ======================== */
if (!window.QRCode) { window.QRCode = { toDataURL: function(t) { return Promise.resolve("https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=1&color=171713&bgcolor=ffffff&data=" + encodeURIComponent(t)); } }; }
if (!window.htmlToImage) { window.htmlToImage = { toPng: function(node, options) { return Promise.resolve("data:,"); } }; }
if (!window.recharts) { window.recharts = {}; }

/* ======================== APP CODE ======================== */
(function() {
'use strict';
"use client";

// app/AssessmentApp.tsx
const { useEffect: useEffect2, useMemo: useMemo2, useState: useState3 } = window.React;
// lib/assessment-v3.mjs
var ASSESSMENT_VERSION = "assessment-v3";
var dimensions = [
  { id: "scene", label: "\u573A\u666F\u5E94\u7528\u529B", weight: 15 },
  { id: "task", label: "\u4EFB\u52A1\u5B9A\u4E49\u529B", weight: 20 },
  { id: "data", label: "\u8D44\u6599\u7EC4\u7EC7\u529B", weight: 15 },
  { id: "collaboration", label: "\u4EBA\u673A\u534F\u4F5C\u529B", weight: 15 },
  { id: "verification", label: "\u7ED3\u679C\u9A8C\u8BC1\u529B", weight: 20 },
  { id: "agent", label: "Agent\u8BA4\u77E5\u529B", weight: 15 }
];
var roles = [
  { id: "consultant", label: "\u987E\u95EE", description: "\u8D1F\u8D23\u9500\u552E\u3001\u62DB\u751F\u3001\u54A8\u8BE2" },
  { id: "coach", label: "\u6559\u7EC3", description: "\u8D1F\u8D23\u5B66\u751F\u670D\u52A1\u3001\u8DDF\u76EF\u3001\u5B66\u4E60\u7763\u67E5\u3001\u4F5C\u4E1A\u8DDF\u8FDB\u3001\u5B66\u4E60\u7BA1\u7406\u7B49" },
  { id: "teacher", label: "\u6559\u5E08", description: "\u8D1F\u8D23\u6388\u8BFE\u3001\u6559\u5B66\u3001\u6559\u7814\u3001\u8BFE\u7A0B\u8BBE\u8BA1" },
  { id: "general", label: "\u901A\u7528\u6D4B\u8BC4", description: "\u9002\u7528\u4E8E\u5176\u4ED6\u5C97\u4F4D\u53CA\u65E5\u5E38\u529E\u516C\u573A\u666F" }
];
var abilityQuestion = (id, section, dimension, prompt, options, scenarioTag) => ({
  id,
  kind: "ability",
  section,
  dimension,
  prompt,
  scenarioTag,
  options: options.map(({ text, score }, index) => ({ id: `${id}-${index}`, text, score }))
});
var multiQuestion = (id, section, dimension, prompt, options, strategy, scenarioTag) => ({
  id,
  kind: "multi",
  section,
  dimension,
  prompt,
  strategy,
  scenarioTag,
  options
});
var styleQuestion = (id, prompt, axis, weight, left, right, scenarioTag) => ({
  id,
  kind: "style",
  section: "style",
  axis,
  weight,
  prompt,
  scenarioTag,
  options: [
    { id: `${id}-${left.pole.toLowerCase()}`, text: left.text, pole: left.pole },
    { id: `${id}-${right.pole.toLowerCase()}`, text: right.text, pole: right.pole }
  ]
});
var COMMON_QUESTIONS = [
  abilityQuestion("f-q1", "foundation", "scene", "\u8FC7\u53BB\u4E00\u4E2A\u6708\uFF0C\u4F60\u4F7F\u7528 AI \u7684\u60C5\u51B5\u66F4\u63A5\u8FD1\u54EA\u4E00\u79CD\uFF1F", [
    { text: "\u9047\u5230\u641C\u7D22\u6216\u5199\u4F5C\u4EFB\u52A1\u65F6\u5076\u5C14\u7528\u4E00\u6B21", score: 0 },
    { text: "\u6BCF\u5468\u4F1A\u5728\u51E0\u7C7B\u56FA\u5B9A\u4EFB\u52A1\u4E2D\u4F7F\u7528\u51E0\u6B21", score: 1 },
    { text: "\u591A\u6570\u5DE5\u4F5C\u65E5\u90FD\u4F1A\u7528\u6765\u5904\u7406\u771F\u5B9E\u4EFB\u52A1", score: 2 },
    { text: "\u5DF2\u5F62\u6210\u56FA\u5B9A\u6D41\u7A0B\u5E76\u6301\u7EED\u590D\u7528\u548C\u4F18\u5316", score: 3 }
  ], "usage-frequency"),
  multiQuestion("f-q2", "foundation", "agent", "\u4E0B\u9762\u54EA\u4E9B AI \u5DE5\u5177\u662F\u4F60\u7ECF\u5E38\u5B9E\u9645\u4F7F\u7528\u7684\uFF1F", [
    { id: "f-q2-deepseek", text: "DeepSeek", score: 1, family: "model" },
    { id: "f-q2-doubao", text: "\u8C46\u5305", score: 1, family: "model" },
    { id: "f-q2-kimi", text: "Kimi", score: 1, family: "model" },
    { id: "f-q2-qwen", text: "\u901A\u4E49\u5343\u95EE", score: 1, family: "model" },
    { id: "f-q2-yuanbao", text: "\u817E\u8BAF\u5143\u5B9D", score: 1, family: "model" },
    { id: "f-q2-chatgpt", text: "ChatGPT", score: 1, family: "model" },
    { id: "f-q2-claude", text: "Claude", score: 1, family: "model" },
    { id: "f-q2-gemini", text: "Gemini", score: 1, family: "model" },
    { id: "f-q2-coze", text: "\u6263\u5B50 / Coze", score: 2, family: "agent" },
    { id: "f-q2-feishu", text: "\u98DE\u4E66\u667A\u80FD\u4F19\u4F34", score: 2, family: "agent" },
    { id: "f-q2-dify", text: "Dify", score: 3, family: "workflow" },
    { id: "f-q2-n8n", text: "n8n", score: 3, family: "workflow" },
    { id: "f-q2-cursor", text: "Cursor", score: 3, family: "coding" },
    { id: "f-q2-codex", text: "Codex", score: 3, family: "coding" },
    { id: "f-q2-claude-code", text: "Claude Code", score: 3, family: "coding" }
  ], "tool-depth", "tool-inventory"),
  multiQuestion("f-q3", "foundation", "scene", "\u4F60\u66FE\u7ECF\u7528 AI \u5B9E\u9645\u5B8C\u6210\u8FC7\u54EA\u4E9B\u7C7B\u578B\u7684\u4EFB\u52A1\uFF1F", [
    { id: "f-q3-writing", text: "\u6587\u6848\u3001\u603B\u7ED3\u6216\u90AE\u4EF6", score: 1, family: "content" },
    { id: "f-q3-research", text: "\u8D44\u6599\u641C\u7D22\u4E0E\u4FE1\u606F\u6574\u7406", score: 1, family: "research" },
    { id: "f-q3-slides", text: "PPT\u3001\u8BB2\u7A3F\u6216\u6C47\u62A5\u6750\u6599", score: 1, family: "delivery" },
    { id: "f-q3-data", text: "\u8868\u683C\u3001\u6570\u636E\u6216\u6279\u91CF\u5904\u7406", score: 1, family: "data" },
    { id: "f-q3-media", text: "\u56FE\u7247\u3001\u89C6\u9891\u6216\u97F3\u9891\u5185\u5BB9", score: 1, family: "media" },
    { id: "f-q3-service", text: "\u5BA2\u6237\u6216\u5B66\u751F\u670D\u52A1\u4EFB\u52A1", score: 1, family: "service" },
    { id: "f-q3-knowledge", text: "\u77E5\u8BC6\u5E93\u6216\u8D44\u6599\u95EE\u7B54", score: 1, family: "knowledge" },
    { id: "f-q3-code", text: "\u7F51\u7AD9\u3001\u7A0B\u5E8F\u6216\u81EA\u52A8\u5316", score: 1, family: "build" }
  ], "task-breadth", "task-inventory"),
  abilityQuestion("f-q4", "foundation", "agent", "\u4F60\u73B0\u5728\u66F4\u5E38\u7528\u54EA\u79CD\u65B9\u5F0F\u8BA9 AI \u5B8C\u6210\u4EFB\u52A1\uFF1F", [
    { text: "\u76F4\u63A5\u63CF\u8FF0\u9700\u6C42\uFF0C\u4E3B\u8981\u770B\u5F53\u6B21\u56DE\u7B54\u662F\u5426\u53EF\u7528", score: 0 },
    { text: "\u4F7F\u7528\u56FA\u5B9A\u6A21\u677F\uFF0C\u8865\u5145\u80CC\u666F\u540E\u751F\u6210\u5B8C\u6574\u521D\u7A3F", score: 1 },
    { text: "\u5206\u9636\u6BB5\u63D0\u4F9B\u8D44\u6599\uFF0C\u6309\u53CD\u9988\u591A\u8F6E\u4FEE\u6539\u7ED3\u679C", score: 2 },
    { text: "\u914D\u7F6E\u89C4\u5219\u4E0E\u5DE5\u5177\uFF0C\u8BA9\u6D41\u7A0B\u81EA\u52A8\u6267\u884C\u5E76\u7559\u75D5", score: 3 }
  ], "usage-depth"),
  multiQuestion("f-q5", "foundation", "agent", "\u4E0B\u9762\u54EA\u4E9B\u9879\u76EE\u7ECF\u5386\u7B26\u5408\u4F60\u7684\u771F\u5B9E\u5B8C\u6210\u60C5\u51B5\uFF1F", [
    { id: "f-q5-none", text: "\u6682\u672A\u5B8C\u6210\u8FC7\u72EC\u7ACB AI \u9879\u76EE", score: 0, family: "none" },
    { id: "f-q5-template", text: "\u4F53\u9A8C\u6216\u6539\u8FC7\u73B0\u6210\u9879\u76EE\u6A21\u677F", score: 1, family: "template" },
    { id: "f-q5-website-live", text: "\u4E2A\u4EBA\u7F51\u7AD9\u5DF2\u5B8C\u6210\u5E76\u53EF\u8BBF\u95EE", score: 2, family: "website" },
    { id: "f-q5-knowledge-active", text: "\u4E2A\u4EBA\u77E5\u8BC6\u5E93\u5DF2\u6301\u7EED\u4F7F\u7528", score: 2, family: "knowledge" },
    { id: "f-q5-automation-live", text: "\u81EA\u52A8\u5316\u6D41\u7A0B\u5DF2\u7A33\u5B9A\u8FD0\u884C", score: 3, family: "automation" },
    { id: "f-q5-mini-core", text: "\u53C2\u4E0E\u5C0F\u7A0B\u5E8F\u6838\u5FC3\u529F\u80FD\u5F00\u53D1", score: 3, family: "mini-core" },
    { id: "f-q5-mini-live", text: "\u53C2\u4E0E\u7684\u5C0F\u7A0B\u5E8F\u5DF2\u8FD0\u884C\u4E0A\u7EBF", score: 3, family: "mini-live" }
  ], "project-depth", "project-evidence"),
  abilityQuestion("a-q1", "application", "task", "\u63A5\u5230\u4E00\u4E2A\u6BD4\u8F83\u6A21\u7CCA\u7684\u4EFB\u52A1\u65F6\uFF0C\u4F60\u901A\u5E38\u600E\u6837\u5F00\u59CB\u548C AI \u6C9F\u901A\uFF1F", [
    { text: "\u5148\u8BA9 AI \u7ED9\u51E0\u4E2A\u65B9\u5411\uFF0C\u518D\u4ECE\u4E2D\u6311\u4E00\u4E2A\u7EE7\u7EED", score: 1 },
    { text: "\u5148\u8BB2\u6E05\u80CC\u666F\u60C5\u51B5\uFF0C\u518D\u8BF7 AI \u751F\u6210\u5B8C\u6574\u65B9\u6848", score: 2 },
    { text: "\u5148\u786E\u5B9A\u76EE\u6807\u3001\u5BF9\u8C61\u3001\u4EA4\u4ED8\u7269\u548C\u9A8C\u6536\u65B9\u5F0F", score: 3 },
    { text: "\u5148\u53D1\u4E00\u53E5\u6838\u5FC3\u9700\u6C42\uFF0C\u6839\u636E\u56DE\u7B54\u518D\u9010\u6B65\u8865\u5145", score: 0 }
  ], "task-definition"),
  abilityQuestion("a-q2", "application", "data", "\u9700\u8981 AI \u53C2\u8003\u591A\u4EFD\u8D44\u6599\u5B8C\u6210\u4EFB\u52A1\u65F6\uFF0C\u4F60\u901A\u5E38\u600E\u4E48\u5904\u7406\uFF1F", [
    { text: "\u6574\u7406\u6765\u6E90\u3001\u7248\u672C\u548C\u7528\u9014\uFF0C\u518D\u5206\u6279\u4EA4\u7ED9 AI", score: 3 },
    { text: "\u6311\u51E0\u4EFD\u6700\u76F8\u5173\u8D44\u6599\uFF0C\u8BA9 AI \u5148\u505A\u51FA\u521D\u7A3F", score: 1 },
    { text: "\u628A\u73B0\u6709\u8D44\u6599\u4E00\u8D77\u53D1\u9001\uFF0C\u518D\u8BF4\u660E\u91CD\u70B9\u5185\u5BB9", score: 0 },
    { text: "\u5148\u8BA9 AI \u5EFA\u8D44\u6599\u6846\u67B6\uFF0C\u518D\u9010\u9879\u8865\u5145\u7F3A\u53E3", score: 2 }
  ], "context-prep"),
  abilityQuestion("a-q3", "application", "collaboration", "AI \u7684\u7B2C\u4E00\u7248\u7ED3\u679C\u548C\u9884\u671F\u6709\u5DEE\u8DDD\u65F6\uFF0C\u4F60\u66F4\u5E38\u600E\u4E48\u4FEE\u6539\uFF1F", [
    { text: "\u6362\u4E00\u4E2A\u6A21\u578B\u91CD\u65B0\u63D0\u95EE\uFF0C\u518D\u6BD4\u8F83\u4E24\u7248\u7ED3\u679C", score: 1 },
    { text: "\u544A\u8BC9 AI \u91CD\u65B0\u4F18\u5316\uFF0C\u76F4\u5230\u6574\u4F53\u611F\u89C9\u5408\u9002", score: 0 },
    { text: "\u8865\u5145\u4E00\u4E2A\u53C2\u8003\u6848\u4F8B\uFF0C\u8BF7 AI \u6A21\u4EFF\u5176\u7ED3\u6784", score: 2 },
    { text: "\u6309\u9A8C\u6536\u9879\u9010\u6761\u53CD\u9988\uFF0C\u5206\u8F6E\u4FEE\u6539\u5E76\u7559\u7248\u672C", score: 3 }
  ], "iteration"),
  abilityQuestion("a-q4", "application", "verification", "\u51C6\u5907\u4F7F\u7528 AI \u7ED3\u679C\u5BF9\u5916\u4EA4\u4ED8\u524D\uFF0C\u4F60\u901A\u5E38\u5982\u4F55\u68C0\u67E5\uFF1F", [
    { text: "\u5FEB\u901F\u901A\u8BFB\u4E00\u904D\uFF0C\u91CD\u70B9\u4FEE\u6539\u8868\u8FBE\u548C\u683C\u5F0F", score: 1 },
    { text: "\u6309\u6765\u6E90\u3001\u4E8B\u5B9E\u3001\u8FB9\u754C\u548C\u9A8C\u6536\u6E05\u5355\u590D\u6838", score: 3 },
    { text: "\u8BA9\u53E6\u4E00\u4E2A AI \u590D\u67E5\uFF0C\u518D\u91C7\u7528\u5B83\u7684\u7ED3\u8BBA", score: 2 },
    { text: "\u4E3B\u8981\u770B\u7ED3\u6784\u662F\u5426\u5B8C\u6574\uFF0C\u7EC6\u8282\u540E\u7EED\u518D\u8C03\u6574", score: 0 }
  ], "verification"),
  styleQuestion(
    "s-q1",
    "\u9762\u5BF9\u4E00\u4E2A\u5B8C\u5168\u964C\u751F\u7684\u4EFB\u52A1\uFF0C\u4F60\u66F4\u81EA\u7136\u7684\u7B2C\u4E00\u6B65\u662F\uFF1F",
    "explorationExecution",
    2,
    { pole: "E", text: "\u5148\u8BA9 AI \u5C55\u5F00\u51E0\u79CD\u65B9\u5411\uFF0C\u518D\u8FB9\u8BD5\u8FB9\u6536\u655B" },
    { pole: "D", text: "\u5148\u786E\u8BA4\u76EE\u6807\u4E0E\u8FB9\u754C\uFF0C\u518D\u6309\u6B65\u9AA4\u5411\u524D\u63A8\u8FDB" },
    "style-start"
  ),
  styleQuestion(
    "s-q2",
    "AI \u7ED9\u51FA\u4E09\u5957\u90FD\u80FD\u7528\u7684\u65B9\u6848\u65F6\uFF0C\u4F60\u901A\u5E38\u4F1A\uFF1F",
    "explorationExecution",
    1,
    { pole: "E", text: "\u8BA9\u4E09\u5957\u5404\u53D1\u5C55\u4E00\u70B9\uFF0C\u518D\u6BD4\u8F83\u65B0\u7684\u53EF\u80FD" },
    { pole: "D", text: "\u9009\u6700\u63A5\u8FD1\u76EE\u6807\u7684\u4E00\u5957\uFF0C\u7EE7\u7EED\u6253\u78E8\u4EA4\u4ED8" },
    "style-choice"
  ),
  styleQuestion(
    "s-q3",
    "\u4F60\u5E0C\u671B AI \u53C2\u4E0E\u4E00\u9879\u91CD\u8981\u4EFB\u52A1\u7684\u65B9\u5F0F\u662F\uFF1F",
    "assignCocreate",
    2,
    { pole: "A", text: "\u6211\u7ED9\u6E05\u695A\u4EFB\u52A1\u4E0E\u6807\u51C6\uFF0C\u8BA9 AI \u5B8C\u6210\u521D\u7248" },
    { pole: "C", text: "\u6211\u548C AI \u8FB9\u8BA8\u8BBA\u8FB9\u63A8\u8FDB\uFF0C\u5171\u540C\u5F62\u6210\u7ED3\u679C" },
    "style-collaboration"
  ),
  styleQuestion(
    "s-q4",
    "AI \u7684\u601D\u8DEF\u4E0E\u4F60\u4E0D\u540C\u65F6\uFF0C\u4F60\u66F4\u503E\u5411\u600E\u4E48\u5904\u7406\uFF1F",
    "assignCocreate",
    1,
    { pole: "A", text: "\u6574\u7406\u4FEE\u6539\u8981\u6C42\uFF0C\u8BA9 AI \u6309\u8981\u6C42\u91CD\u65B0\u5B8C\u6210" },
    { pole: "C", text: "\u5148\u8BA8\u8BBA\u5206\u6B67\u539F\u56E0\uFF0C\u518D\u4E00\u8D77\u8C03\u6574\u4EFB\u52A1\u65B9\u5411" },
    "style-disagreement"
  ),
  styleQuestion(
    "s-q5",
    "\u5F97\u5230\u4E00\u4EFD\u57FA\u672C\u53EF\u7528\u7684 AI \u6210\u679C\u540E\uFF0C\u4F60\u901A\u5E38\u4F1A\uFF1F",
    "fastVerify",
    2,
    { pole: "F", text: "\u5148\u5728\u5C0F\u8303\u56F4\u771F\u5B9E\u4F7F\u7528\uFF0C\u518D\u6839\u636E\u53CD\u9988\u4F18\u5316" },
    { pole: "V", text: "\u5148\u7CFB\u7EDF\u68C0\u67E5\u5173\u952E\u98CE\u9669\uFF0C\u518D\u8FDB\u5165\u771F\u5B9E\u4F7F\u7528" },
    "style-delivery"
  ),
  styleQuestion(
    "s-q6",
    "\u51C6\u5907\u91C7\u7528\u4E00\u4E2A\u65B0\u7684 AI \u5DE5\u5177\u65F6\uFF0C\u4F60\u66F4\u63A5\u8FD1\uFF1F",
    "fastVerify",
    1,
    { pole: "F", text: "\u5148\u62FF\u4E00\u4E2A\u771F\u5B9E\u4EFB\u52A1\u8BD5\u7528\uFF0C\u770B\u80FD\u5426\u63D0\u6548" },
    { pole: "V", text: "\u5148\u4E86\u89E3\u6570\u636E\u4E0E\u89C4\u5219\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u4F7F\u7528" },
    "style-tool"
  )
];
var BUSINESS_QUESTIONS = {
  consultant: [
    abilityQuestion("c-q1", "business", "task", "\u51C6\u5907\u7B2C\u4E00\u6B21\u5BB6\u957F\u54A8\u8BE2\u65F6\uFF0C\u4F60\u4F1A\u600E\u6837\u4F7F\u7528 AI\uFF1F", [
      { text: "\u8BA9 AI \u751F\u6210\u6807\u51C6\u54A8\u8BE2\u6D41\u7A0B\uFF0C\u73B0\u573A\u7075\u6D3B\u8C03\u6574", score: 1 },
      { text: "\u5148\u6574\u7406\u5BB6\u5EAD\u4FE1\u606F\uFF0C\u518D\u751F\u6210\u95EE\u9898\u4E0E\u5224\u65AD\u6E05\u5355", score: 3 },
      { text: "\u8BF7 AI \u6A21\u62DF\u5BB6\u957F\u63D0\u95EE\uFF0C\u63D0\u524D\u7EC3\u4E60\u56DE\u7B54\u65B9\u5F0F", score: 2 },
      { text: "\u54A8\u8BE2\u540E\u518D\u628A\u8BB0\u5F55\u53D1\u7ED9 AI\uFF0C\u8BF7\u5B83\u6574\u7406\u91CD\u70B9", score: 0 }
    ], "consultation-prep"),
    abilityQuestion("c-q2", "business", "collaboration", "\u5BB6\u957F\u5BF9\u8D39\u7528\u548C\u7ED3\u679C\u90FD\u6709\u987E\u8651\u65F6\uFF0C\u4F60\u4F1A\u600E\u6837\u501F\u52A9 AI\uFF1F", [
      { text: "\u751F\u6210\u4E00\u6BB5\u5B8C\u6574\u8BF4\u670D\u8BDD\u672F\uFF0C\u76F4\u63A5\u7528\u4E8E\u6C9F\u901A", score: 0 },
      { text: "\u6574\u7406\u5E38\u89C1\u5F02\u8BAE\uFF0C\u8BF7 AI \u5206\u522B\u7ED9\u51FA\u56DE\u5E94\u5EFA\u8BAE", score: 1 },
      { text: "\u7ED3\u5408\u5BB6\u5EAD\u60C5\u51B5\uFF0C\u8BBE\u8BA1\u5206\u5C42\u6C9F\u901A\u4E0E\u8DDF\u8FDB\u8282\u70B9", score: 3 },
      { text: "\u8BA9 AI \u626E\u6F14\u5BB6\u957F\uFF0C\u6A21\u62DF\u51E0\u8F6E\u9AD8\u538B\u54A8\u8BE2\u5BF9\u8BDD", score: 2 }
    ], "objection-handling"),
    abilityQuestion("c-q3", "business", "verification", "AI \u7ED9\u51FA\u7684\u827A\u8003\u653F\u7B56\u4FE1\u606F\u51C6\u5907\u53D1\u7ED9\u5BB6\u957F\u65F6\uFF0C\u4F60\u4F1A\uFF1F", [
      { text: "\u8C03\u6574\u6210\u6613\u61C2\u8868\u8FBE\uFF0C\u518D\u53D1\u9001\u7ED9\u5BB6\u957F\u53C2\u8003", score: 1 },
      { text: "\u8BF7\u53E6\u4E00\u4E2A AI \u590D\u6838\uFF0C\u4E24\u8FB9\u4E00\u81F4\u5C31\u91C7\u7528", score: 2 },
      { text: "\u6807\u6CE8\u4EC5\u4F9B\u53C2\u8003\uFF0C\u63D0\u9192\u5BB6\u957F\u81EA\u884C\u518D\u6B21\u786E\u8BA4", score: 0 },
      { text: "\u56DE\u67E5\u5B98\u65B9\u539F\u6587\u3001\u5E74\u4EFD\u548C\u9002\u7528\u8303\u56F4\u540E\u518D\u53D1", score: 3 }
    ], "policy-check")
  ],
  coach: [
    abilityQuestion("o-q1", "business", "scene", "\u5B66\u751F\u8FDE\u7EED\u51E0\u6B21\u6CA1\u6709\u6309\u65F6\u4EA4\u4F5C\u4E1A\uFF0C\u4F60\u4F1A\u600E\u6837\u4F7F\u7528 AI\uFF1F", [
      { text: "\u751F\u6210\u4E00\u6BB5\u63D0\u9192\u8BDD\u672F\uFF0C\u5206\u522B\u53D1\u7ED9\u5B66\u751F\u5BB6\u957F", score: 0 },
      { text: "\u6574\u7406\u7F3A\u4EA4\u8BB0\u5F55\uFF0C\u8BF7 AI \u5E2E\u5FD9\u5F52\u7EB3\u53EF\u80FD\u539F\u56E0", score: 2 },
      { text: "\u7ED3\u5408\u8BB0\u5F55\u548C\u6C9F\u901A\uFF0C\u5236\u5B9A\u5206\u9636\u6BB5\u8DDF\u8FDB\u65B9\u6848", score: 3 },
      { text: "\u8BA9 AI \u63D0\u4F9B\u51E0\u79CD\u7BA1\u7406\u529E\u6CD5\uFF0C\u9009\u62E9\u4E00\u9879\u8BD5\u7528", score: 1 }
    ], "assignment-followup"),
    abilityQuestion("o-q2", "business", "data", "\u6BCF\u5468\u9700\u8981\u8DDF\u8FDB\u591A\u540D\u5B66\u751F\u5B66\u4E60\u60C5\u51B5\u65F6\uFF0C\u4F60\u4F1A\uFF1F", [
      { text: "\u628A\u804A\u5929\u8BB0\u5F55\u4EA4\u7ED9 AI\uFF0C\u751F\u6210\u6BCF\u4EBA\u60C5\u51B5\u6458\u8981", score: 1 },
      { text: "\u5EFA\u7ACB\u7EDF\u4E00\u8BB0\u5F55\u8868\uFF0C\u8BA9 AI \u6807\u8BB0\u53D8\u5316\u548C\u5F02\u5E38", score: 3 },
      { text: "\u53EA\u8BB0\u5F55\u9700\u8981\u91CD\u70B9\u5173\u6CE8\u7684\u5B66\u751F\u548C\u5177\u4F53\u95EE\u9898", score: 0 },
      { text: "\u8BA9 AI \u6309\u6210\u7EE9\u548C\u4F5C\u4E1A\u8868\u73B0\u751F\u6210\u8DDF\u8FDB\u987A\u5E8F", score: 2 }
    ], "student-tracking"),
    abilityQuestion("o-q3", "business", "verification", "AI \u5224\u65AD\u67D0\u4F4D\u5B66\u751F\u53EF\u80FD\u51FA\u73B0\u5B66\u4E60\u5026\u6020\u65F6\uFF0C\u4F60\u4F1A\uFF1F", [
      { text: "\u5148\u6309 AI \u5EFA\u8BAE\u6C9F\u901A\uFF0C\u518D\u89C2\u5BDF\u5B66\u751F\u7684\u53CD\u5E94", score: 1 },
      { text: "\u7ED3\u5408\u51FA\u52E4\u3001\u4F5C\u4E1A\u548C\u8BBF\u8C08\u8BB0\u5F55\u4EA4\u53C9\u5224\u65AD", score: 3 },
      { text: "\u8BF7 AI \u7ED9\u51FA\u66F4\u591A\u53EF\u80FD\u6027\uFF0C\u518D\u9009\u62E9\u4E00\u79CD\u89E3\u91CA", score: 2 },
      { text: "\u628A\u5224\u65AD\u5199\u8FDB\u5468\u62A5\uFF0C\u63D0\u9192\u6559\u5E08\u548C\u5BB6\u957F\u5173\u6CE8", score: 0 }
    ], "student-risk")
  ],
  teacher: [
    abilityQuestion("t-q1", "business", "task", "\u51C6\u5907\u4E00\u8282\u65B0\u8BFE\u65F6\uFF0C\u4F60\u66F4\u53EF\u80FD\u600E\u6837\u4F7F\u7528 AI\uFF1F", [
      { text: "\u8BA9 AI \u751F\u6210\u5B8C\u6574\u6559\u6848\uFF0C\u518D\u6309\u7ECF\u9A8C\u8FDB\u884C\u4FEE\u6539", score: 1 },
      { text: "\u5148\u786E\u5B9A\u5B66\u60C5\u4E0E\u76EE\u6807\uFF0C\u518D\u8BBE\u8BA1\u6D3B\u52A8\u548C\u8BC4\u4EF7", score: 3 },
      { text: "\u8BF7 AI \u7ED9\u51FA\u51E0\u79CD\u5BFC\u5165\u65B9\u5F0F\uFF0C\u9009\u62E9\u5408\u9002\u65B9\u6848", score: 2 },
      { text: "\u4E3B\u8981\u7528 AI \u641C\u96C6\u6848\u4F8B\uFF0C\u6559\u5B66\u7ED3\u6784\u81EA\u5DF1\u5B8C\u6210", score: 0 }
    ], "lesson-design"),
    abilityQuestion("t-q2", "business", "collaboration", "\u4F7F\u7528 AI \u8F85\u52A9\u4F5C\u4E1A\u8BC4\u4EF7\u65F6\uFF0C\u4F60\u4F1A\u600E\u6837\u5B89\u6392\uFF1F", [
      { text: "\u8BA9 AI \u5148\u5199\u5168\u90E8\u8BC4\u8BED\uFF0C\u6211\u7EDF\u4E00\u8C03\u6574\u8868\u8FBE", score: 0 },
      { text: "\u63D0\u4F9B\u8BC4\u4EF7\u6807\u51C6\uFF0C\u8BA9 AI \u6807\u51FA\u9700\u8981\u5173\u6CE8\u5904", score: 2 },
      { text: "AI \u505A\u5206\u7C7B\u7EDF\u8BA1\uFF0C\u6211\u8D1F\u8D23\u4E2A\u6027\u5224\u65AD\u548C\u53CD\u9988", score: 3 },
      { text: "\u6311\u9009\u5178\u578B\u4F5C\u4E1A\u8BF7 AI \u603B\u7ED3\u5171\u6027\u95EE\u9898", score: 1 }
    ], "assignment-review"),
    abilityQuestion("t-q3", "business", "verification", "AI \u63D0\u4F9B\u4E86\u4E00\u6761\u65B0\u7684\u6559\u5B66\u7814\u7A76\u7ED3\u8BBA\uFF0C\u4F60\u4F1A\uFF1F", [
      { text: "\u7528\u4E8E\u6559\u7814\u8BA8\u8BBA\uFF0C\u8BF7\u540C\u4E8B\u4E00\u8D77\u5224\u65AD\u662F\u5426\u9002\u7528", score: 2 },
      { text: "\u67E5\u627E\u539F\u59CB\u7814\u7A76\u3001\u6837\u672C\u548C\u9002\u7528\u6761\u4EF6\u540E\u518D\u7528", score: 3 },
      { text: "\u4F5C\u4E3A\u65B0\u601D\u8DEF\u52A0\u5165\u65B9\u6848\uFF0C\u5E76\u6CE8\u660E\u7531 AI \u63D0\u4F9B", score: 1 },
      { text: "\u53EA\u8981\u7B26\u5408\u6559\u5B66\u7ECF\u9A8C\uFF0C\u5C31\u5148\u5728\u8BFE\u5802\u4E2D\u8BD5\u7528", score: 0 }
    ], "research-check")
  ],
  general: [
    abilityQuestion("g-q1", "business", "task", "\u9886\u5BFC\u8BA9\u4F60\u5C3D\u5FEB\u51C6\u5907\u4E00\u4EFD\u60C5\u51B5\u6C47\u62A5\uFF0C\u4F60\u4F1A\u600E\u6837\u7528 AI\uFF1F", [
      { text: "\u8BF4\u660E\u6C47\u62A5\u4E3B\u9898\uFF0C\u8BF7 AI \u76F4\u63A5\u751F\u6210\u5B8C\u6574\u6750\u6599", score: 0 },
      { text: "\u5148\u5217\u76EE\u6807\u548C\u53D7\u4F17\uFF0C\u518D\u6574\u7406\u4E8B\u5B9E\u4E0E\u7ED3\u6784\u8981\u6C42", score: 3 },
      { text: "\u627E\u4E00\u4EFD\u4EE5\u5F80\u6750\u6599\uFF0C\u8BF7 AI \u6309\u76F8\u540C\u683C\u5F0F\u6539\u5199", score: 1 },
      { text: "\u8BF7 AI \u5148\u95EE\u5173\u952E\u95EE\u9898\uFF0C\u518D\u9010\u9879\u8865\u9F50\u6750\u6599", score: 2 }
    ], "work-report"),
    abilityQuestion("g-q2", "business", "data", "\u9700\u8981\u6574\u5408\u591A\u4E2A\u90E8\u95E8\u7684\u8D44\u6599\u65F6\uFF0C\u4F60\u901A\u5E38\u4F1A\uFF1F", [
      { text: "\u5168\u90E8\u4EA4\u7ED9 AI\uFF0C\u8BF7\u5B83\u7EDF\u4E00\u683C\u5F0F\u5E76\u63D0\u70BC\u91CD\u70B9", score: 0 },
      { text: "\u5148\u6309\u6765\u6E90\u548C\u7248\u672C\u5F52\u7C7B\uFF0C\u518D\u5EFA\u7ACB\u7EDF\u4E00\u53E3\u5F84", score: 3 },
      { text: "\u6311\u51FA\u5DEE\u5F02\u8F83\u5927\u7684\u90E8\u5206\uFF0C\u8BF7 AI \u534F\u52A9\u6BD4\u8F83", score: 2 },
      { text: "\u5148\u91C7\u7528\u6700\u65B0\u8D44\u6599\uFF0C\u5176\u4F59\u5185\u5BB9\u4F5C\u4E3A\u8865\u5145\u53C2\u8003", score: 1 }
    ], "cross-team-data"),
    abilityQuestion("g-q3", "business", "verification", "AI \u751F\u6210\u7684\u65B9\u6848\u4E2D\u5305\u542B\u51E0\u9879\u964C\u751F\u6570\u636E\uFF0C\u4F60\u4F1A\uFF1F", [
      { text: "\u5220\u9664\u964C\u751F\u6570\u636E\uFF0C\u53EA\u4FDD\u7559\u719F\u6089\u7684\u5185\u5BB9", score: 1 },
      { text: "\u8981\u6C42 AI \u5217\u6765\u6E90\uFF0C\u518D\u9010\u9879\u56DE\u5230\u539F\u6587\u6838\u5BF9", score: 3 },
      { text: "\u6362\u4E00\u4E2A\u6A21\u578B\u590D\u6838\uFF0C\u7ED3\u679C\u63A5\u8FD1\u5C31\u7EE7\u7EED\u4F7F\u7528", score: 2 },
      { text: "\u4FDD\u7559\u6570\u636E\u5E76\u6807\u6CE8\u4E3A\u4F30\u7B97\uFF0C\u4EA4\u4ED8\u540E\u518D\u786E\u8BA4", score: 0 }
    ], "data-verification")
  ]
};
var OPEN_PROMPTS = {
  consultant: "\u8BF7\u5199\u4E00\u6BB5\u4F60\u4F1A\u76F4\u63A5\u4EA4\u7ED9 AI \u7684\u5B8C\u6574\u63D0\u793A\u8BCD\uFF1A\u4E3A\u4E00\u4F4D\u7B2C\u4E00\u6B21\u54A8\u8BE2\u827A\u8003\u7684\u9AD8\u4E8C\u5BB6\u957F\u51C6\u5907\u540E\u7EED\u6C9F\u901A\u65B9\u6848\u3002\u5B66\u751F\u6587\u5316\u6210\u7EE9\u4E2D\u7B49\u3001\u5BF9\u7F8E\u672F\u6709\u5174\u8DA3\uFF0C\u5BB6\u957F\u540C\u65F6\u62C5\u5FC3\u8D39\u7528\u3001\u5347\u5B66\u7ED3\u679C\u548C\u5B66\u4E60\u98CE\u9669\u3002\u4F60\u9700\u8981\u5728\u4E0B\u4E00\u6B2120\u5206\u949F\u6C9F\u901A\u4E2D\u5E2E\u52A9\u5BB6\u957F\u7406\u89E3\u8DEF\u5F84\u5E76\u660E\u786E\u4E0B\u4E00\u6B65\u884C\u52A8\u3002",
  coach: "\u8BF7\u5199\u4E00\u6BB5\u4F60\u4F1A\u76F4\u63A5\u4EA4\u7ED9 AI \u7684\u5B8C\u6574\u63D0\u793A\u8BCD\uFF1A\u4E3A\u4E00\u540D\u8FDE\u7EED\u4E24\u5468\u4F5C\u4E1A\u5B8C\u6210\u7387\u4E0B\u964D\u3001\u8FD1\u671F\u6C9F\u901A\u610F\u613F\u8F83\u5F31\u7684\u9AD8\u4E8C\u5B66\u751F\u8BBE\u8BA1\u4E00\u5468\u8DDF\u8FDB\u65B9\u6848\u3002\u4F60\u624B\u5934\u6709\u51FA\u52E4\u3001\u4F5C\u4E1A\u3001\u6D4B\u8BC4\u548C\u6C9F\u901A\u8BB0\u5F55\uFF0C\u9700\u8981\u517C\u987E\u5B66\u751F\u611F\u53D7\u3001\u5B66\u4E60\u6267\u884C\u548C\u5FC5\u8981\u7684\u5BB6\u6821\u6C9F\u901A\u3002",
  teacher: "\u8BF7\u5199\u4E00\u6BB5\u4F60\u4F1A\u76F4\u63A5\u4EA4\u7ED9 AI \u7684\u5B8C\u6574\u63D0\u793A\u8BCD\uFF1A\u51C6\u5907\u4E00\u828245\u5206\u949F\u7684\u516C\u5F00\u8BFE\uFF0C\u8BFE\u9898\u53EF\u4EE5\u7ED3\u5408\u4F60\u7684\u771F\u5B9E\u6559\u5B66\u5185\u5BB9\u3002\u5BF9\u8C61\u662F\u5F53\u524D\u6240\u6559\u5B66\u751F\uFF0C\u542C\u8BFE\u4EBA\u5458\u5305\u62EC\u540C\u7EC4\u6559\u5E08\u548C\u6559\u5B66\u8D1F\u8D23\u4EBA\uFF0C\u9700\u8981\u4F53\u73B0\u5B66\u60C5\u3001\u76EE\u6807\u3001\u6D3B\u52A8\u8BBE\u8BA1\u3001\u8BC4\u4EF7\u65B9\u5F0F\u548C\u8BFE\u540E\u6539\u8FDB\u3002",
  general: "\u8BF7\u5199\u4E00\u6BB5\u4F60\u4F1A\u76F4\u63A5\u4EA4\u7ED9 AI \u7684\u5B8C\u6574\u63D0\u793A\u8BCD\uFF1A\u628A\u6765\u81EA\u4E09\u4E2A\u90E8\u95E8\u3001\u683C\u5F0F\u4E0D\u540C\u4E14\u90E8\u5206\u4FE1\u606F\u5B58\u5728\u51B2\u7A81\u7684\u6750\u6599\uFF0C\u6574\u7406\u6210\u4E00\u4EFD\u4F9B\u8D1F\u8D23\u4EBA\u51B3\u7B56\u7684\u5DE5\u4F5C\u7B80\u62A5\u3002\u9700\u8981\u8BF4\u660E\u4E8B\u5B9E\u6765\u6E90\u3001\u6838\u5FC3\u95EE\u9898\u3001\u53EF\u9009\u65B9\u6848\u3001\u98CE\u9669\u548C\u5EFA\u8BAE\u884C\u52A8\uFF0C\u5E76\u6807\u51FA\u4ECD\u9700\u4EBA\u5DE5\u786E\u8BA4\u7684\u4FE1\u606F\u3002"
};
function getOpenPromptForRole(role) {
  return OPEN_PROMPTS[role] || OPEN_PROMPTS.general;
}
function getQuestionsForRole(role) {
  const business = BUSINESS_QUESTIONS[role] || BUSINESS_QUESTIONS.general;
  return [...COMMON_QUESTIONS, ...business];
}
var questions = getQuestionsForRole("teacher");
var styleProfiles = {
  EAF: {
    name: "\u7075\u611F\u63A2\u8DEF\u8005",
    tagline: "\u5148\u6253\u5F00\u53EF\u80FD\u6027\uFF0C\u518D\u5FEB\u901F\u8BA9 AI \u63A8\u8FDB\u3002",
    startMode: "\u4F60\u4E60\u60EF\u4ECE\u591A\u4E2A\u65B9\u5411\u8D77\u6B65\uFF0C\u901A\u8FC7\u5FEB\u901F\u8BD5\u505A\u627E\u5230\u503C\u5F97\u7EE7\u7EED\u7684\u8DEF\u7EBF\u3002",
    divisionMode: "\u4F60\u503E\u5411\u7ED9\u51FA\u76EE\u6807\u540E\u8BA9 AI \u4E3B\u52A8\u4EA7\u51FA\uFF0C\u518D\u4ECE\u7ED3\u679C\u4E2D\u9009\u62E9\u548C\u8C03\u6574\u3002",
    speedQuality: "\u4F60\u66F4\u76F8\u4FE1\u771F\u5B9E\u53CD\u9988\uFF0C\u613F\u610F\u5148\u505A\u51FA\u53EF\u7528\u7248\u672C\u518D\u6301\u7EED\u4F18\u5316\u3002",
    strengths: ["\u5FEB\u901F\u6253\u5F00\u601D\u8DEF", "\u6562\u4E8E\u5C1D\u8BD5\u65B0\u5DE5\u5177", "\u80FD\u8FC5\u901F\u5F62\u6210\u521D\u7248"],
    risks: ["\u65B9\u5411\u8FC7\u591A\u65F6\u4E0D\u6613\u6536\u675F", "\u53EF\u80FD\u5F31\u5316\u4E8B\u5B9E\u4E0E\u8FB9\u754C\u68C0\u67E5"],
    bestTasks: ["\u521B\u610F\u7B56\u5212", "\u65B0\u9879\u76EE\u63A2\u7D22", "\u5185\u5BB9\u539F\u578B"],
    collaborationMode: "\u5148\u7ED9 AI \u8BD5\u9519\u7A7A\u95F4\uFF0C\u518D\u7528\u660E\u786E\u8282\u70B9\u6536\u675F\u65B9\u5411\u3002",
    recommendedWorkflow: ["\u751F\u6210\u4E09\u4E2A\u65B9\u5411", "\u9009\u5B9A\u4E00\u6761\u4E3B\u7EBF", "\u6309\u6E05\u5355\u5B8C\u6210\u6838\u9A8C"],
    nextProjects: ["\u4E2A\u4EBA\u7F51\u7AD9", "\u5185\u5BB9\u7B56\u5212 Agent"],
    upgrade: "\u6BCF\u6B21\u63A2\u7D22\u524D\u5148\u5199\u4E0B\u505C\u6B62\u6761\u4EF6\u548C\u6700\u7EC8\u9A8C\u6536\u9879\u3002",
    strength: "\u64C5\u957F\u5FEB\u901F\u6253\u5F00\u601D\u8DEF\u5E76\u8BA9 AI \u63A8\u8FDB",
    blindSpot: "\u5BB9\u6613\u5728\u65B9\u5411\u5F88\u591A\u65F6\u5FFD\u7565\u6536\u675F\u548C\u6838\u9A8C"
  },
  EAV: {
    name: "\u6D1E\u5BDF\u7814\u7A76\u8005",
    tagline: "\u5E7F\u6CDB\u63A2\u7D22\uFF0C\u540C\u65F6\u8FFD\u95EE\u4F9D\u636E\u4E0E\u98CE\u9669\u3002",
    startMode: "\u4F60\u4F1A\u5148\u6269\u5927\u4FE1\u606F\u9762\uFF0C\u6BD4\u8F83\u591A\u79CD\u89E3\u91CA\u540E\u518D\u51B3\u5B9A\u91C7\u7528\u54EA\u6761\u8DEF\u5F84\u3002",
    divisionMode: "\u4F60\u613F\u610F\u628A\u68C0\u7D22\u548C\u6574\u7406\u4EA4\u7ED9 AI\uFF0C\u4F46\u91CD\u8981\u5224\u65AD\u901A\u5E38\u7531\u81EA\u5DF1\u628A\u5173\u3002",
    speedQuality: "\u4F60\u91CD\u89C6\u8BC1\u636E\u548C\u5B8C\u6574\u6027\uFF0C\u5B81\u613F\u591A\u6838\u5BF9\u4E00\u6B65\u518D\u8FDB\u5165\u6B63\u5F0F\u4F7F\u7528\u3002",
    strengths: ["\u4FE1\u606F\u641C\u96C6\u5168\u9762", "\u5584\u4E8E\u6BD4\u8F83\u89C2\u70B9", "\u98CE\u9669\u610F\u8BC6\u8F83\u5F3A"],
    risks: ["\u7814\u7A76\u65F6\u95F4\u53EF\u80FD\u8FC7\u957F", "\u5BB9\u6613\u63A8\u8FDF\u7B2C\u4E00\u6B21\u4EA4\u4ED8"],
    bestTasks: ["\u884C\u4E1A\u7814\u7A76", "\u653F\u7B56\u5206\u6790", "\u590D\u6742\u9009\u578B"],
    collaborationMode: "\u8BA9 AI \u5E76\u884C\u7814\u7A76\u4E0D\u540C\u65B9\u5411\uFF0C\u518D\u7EDF\u4E00\u6765\u6E90\u548C\u5224\u65AD\u6807\u51C6\u3002",
    recommendedWorkflow: ["\u5217\u51FA\u7814\u7A76\u95EE\u9898", "\u5E76\u884C\u68C0\u7D22\u4E0E\u6BD4\u5BF9", "\u5F62\u6210\u5E26\u6765\u6E90\u7ED3\u8BBA"],
    nextProjects: ["\u4E13\u9898\u77E5\u8BC6\u5E93", "\u7814\u7A76\u578B Agent"],
    upgrade: "\u4E3A\u7814\u7A76\u9636\u6BB5\u8BBE\u7F6E\u65F6\u95F4\u76D2\uFF0C\u5E76\u63D0\u524D\u5B9A\u4E49\u6700\u4F4E\u53EF\u4EA4\u4ED8\u7248\u672C\u3002",
    strength: "\u559C\u6B22\u63A2\u7D22\u591A\u79CD\u53EF\u80FD\u5E76\u91CD\u89C6\u4F9D\u636E",
    blindSpot: "\u53EF\u80FD\u6295\u5165\u8FC7\u591A\u7814\u7A76\u65F6\u95F4"
  },
  ECF: {
    name: "\u7075\u611F\u5171\u521B\u8005",
    tagline: "\u5728\u6301\u7EED\u5BF9\u8BDD\u4E2D\u6FC0\u53D1\u60F3\u6CD5\u5E76\u5FEB\u901F\u6210\u5F62\u3002",
    startMode: "\u4F60\u4E60\u60EF\u5148\u804A\u8D77\u6765\uFF0C\u901A\u8FC7\u8FFD\u95EE\u3001\u53CD\u95EE\u548C\u8054\u60F3\u9010\u6E10\u770B\u6E05\u4EFB\u52A1\u65B9\u5411\u3002",
    divisionMode: "\u4F60\u628A AI \u5F53\u6210\u8BA8\u8BBA\u4F19\u4F34\uFF0C\u53CC\u65B9\u5728\u591A\u8F6E\u4E92\u52A8\u4E2D\u5171\u540C\u5F62\u6210\u7ED3\u679C\u3002",
    speedQuality: "\u4F60\u613F\u610F\u5FEB\u901F\u5C1D\u8BD5\uFF0C\u5E76\u6839\u636E\u4EA4\u6D41\u8FC7\u7A0B\u4E0D\u65AD\u6539\u53D8\u548C\u4F18\u5316\u7248\u672C\u3002",
    strengths: ["\u5BF9\u8BDD\u4E2D\u5BB9\u6613\u4EA7\u751F\u65B0\u610F", "\u8C03\u6574\u65B9\u5411\u6BD4\u8F83\u7075\u6D3B", "\u5171\u521B\u8FC7\u7A0B\u53C2\u4E0E\u5EA6\u9AD8"],
    risks: ["\u591A\u8F6E\u4EA4\u6D41\u5BB9\u6613\u53D1\u6563", "\u5173\u952E\u51B3\u5B9A\u53EF\u80FD\u6CA1\u6709\u7559\u75D5"],
    bestTasks: ["\u5185\u5BB9\u521B\u4F5C", "\u8BFE\u7A0B\u5171\u521B", "\u65B9\u6848\u8111\u66B4"],
    collaborationMode: "\u6BCF\u8F6E\u53EA\u89E3\u51B3\u4E00\u4E2A\u5173\u952E\u95EE\u9898\uFF0C\u5E76\u53CA\u65F6\u56FA\u5316\u5DF2\u7ECF\u8FBE\u6210\u7684\u5171\u8BC6\u3002",
    recommendedWorkflow: ["\u5171\u540C\u6F84\u6E05\u95EE\u9898", "\u5206\u8F6E\u53D1\u5C55\u65B9\u6848", "\u9501\u5B9A\u7248\u672C\u4E0E\u51B3\u7B56"],
    nextProjects: ["\u5171\u521B\u63D0\u793A\u8BCD\u5E93", "\u8BFE\u7A0B\u8BBE\u8BA1\u52A9\u624B"],
    upgrade: "\u5728\u6BCF\u8F6E\u5BF9\u8BDD\u7ED3\u675F\u65F6\u8BA9 AI \u8F93\u51FA\u5171\u8BC6\u3001\u5206\u6B67\u548C\u4E0B\u4E00\u6B65\u3002",
    strength: "\u5584\u4E8E\u5728\u5BF9\u8BDD\u4E2D\u6FC0\u53D1\u60F3\u6CD5",
    blindSpot: "\u591A\u8F6E\u4EA4\u6D41\u5BB9\u6613\u53D1\u6563"
  },
  ECV: {
    name: "\u6DF1\u5EA6\u5171\u7814\u8005",
    tagline: "\u901A\u8FC7\u6DF1\u5165\u5BF9\u8BDD\uFF0C\u628A\u590D\u6742\u95EE\u9898\u7814\u7A76\u900F\u3002",
    startMode: "\u4F60\u4F1A\u4ECE\u4E0D\u540C\u89D2\u5EA6\u63D0\u51FA\u95EE\u9898\uFF0C\u4E0E AI \u4E00\u8D77\u6784\u5EFA\u5BF9\u4EFB\u52A1\u7684\u5B8C\u6574\u7406\u89E3\u3002",
    divisionMode: "\u4F60\u503E\u5411\u5171\u540C\u5206\u6790\u548C\u6821\u51C6\uFF0C\u91CD\u8981\u7ED3\u8BBA\u4F1A\u5728\u8BA8\u8BBA\u4E2D\u9010\u5C42\u786E\u8BA4\u3002",
    speedQuality: "\u4F60\u91CD\u89C6\u63A8\u7406\u8FC7\u7A0B\u548C\u7ED3\u679C\u53EF\u9760\u6027\uFF0C\u901A\u5E38\u4E0D\u4F1A\u6025\u4E8E\u91C7\u7528\u7B2C\u4E00\u7248\u3002",
    strengths: ["\u590D\u6742\u95EE\u9898\u7406\u89E3\u6DF1\u5165", "\u5584\u4E8E\u53D1\u73B0\u9690\u542B\u5047\u8BBE", "\u80FD\u591F\u6301\u7EED\u6821\u51C6\u5224\u65AD"],
    risks: ["\u5BB9\u6613\u9677\u5165\u7EC6\u8282\u8BA8\u8BBA", "\u4EA4\u4ED8\u8282\u594F\u53EF\u80FD\u504F\u6162"],
    bestTasks: ["\u590D\u6742\u51B3\u7B56", "\u8BFE\u7A0B\u7814\u7A76", "\u7B56\u7565\u8BBE\u8BA1"],
    collaborationMode: "\u7528\u9636\u6BB5\u7ED3\u8BBA\u548C\u51B3\u7B56\u65E5\u5FD7\u63A7\u5236\u6DF1\u5EA6\u8BA8\u8BBA\u7684\u8303\u56F4\u3002",
    recommendedWorkflow: ["\u5EFA\u7ACB\u95EE\u9898\u5730\u56FE", "\u9010\u5C42\u9A8C\u8BC1\u5047\u8BBE", "\u5F62\u6210\u51B3\u7B56\u4E0E\u8BC1\u636E\u94FE"],
    nextProjects: ["\u51B3\u7B56\u77E5\u8BC6\u5E93", "\u6DF1\u5EA6\u7814\u7A76\u5DE5\u4F5C\u6D41"],
    upgrade: "\u4E3A\u6BCF\u4E2A\u7814\u7A76\u9636\u6BB5\u8BBE\u7F6E\u660E\u786E\u8F93\u51FA\uFF0C\u907F\u514D\u65E0\u9650\u5EF6\u4F38\u3002",
    strength: "\u64C5\u957F\u4E0E AI \u6DF1\u5165\u8BA8\u8BBA\u5E76\u6821\u51C6\u5224\u65AD",
    blindSpot: "\u5BB9\u6613\u5728\u7EC6\u8282\u4E2D\u6295\u5165\u8FC7\u591A"
  },
  DAF: {
    name: "\u654F\u6377\u6267\u884C\u8005",
    tagline: "\u76EE\u6807\u660E\u786E\u3001\u59D4\u6D3E\u76F4\u63A5\u3001\u5FEB\u901F\u4EA4\u4ED8\u3002",
    startMode: "\u4F60\u66F4\u613F\u610F\u5148\u660E\u786E\u8981\u4EC0\u4E48\uFF0C\u7136\u540E\u9A6C\u4E0A\u8BA9 AI \u5F00\u59CB\u5F62\u6210\u7ED3\u679C\u3002",
    divisionMode: "\u4F60\u901A\u5E38\u8D1F\u8D23\u76EE\u6807\u548C\u6807\u51C6\uFF0CAI \u8D1F\u8D23\u9AD8\u6548\u5B8C\u6210\u5927\u90E8\u5206\u521D\u7248\u5DE5\u4F5C\u3002",
    speedQuality: "\u4F60\u504F\u597D\u5148\u4EA4\u4ED8\u53EF\u7528\u6210\u679C\uFF0C\u518D\u4ECE\u771F\u5B9E\u4F7F\u7528\u4E2D\u53D1\u73B0\u9700\u8981\u4FEE\u6539\u7684\u5730\u65B9\u3002",
    strengths: ["\u63A8\u8FDB\u901F\u5EA6\u5FEB", "\u4EFB\u52A1\u59D4\u6D3E\u6E05\u695A", "\u5BB9\u6613\u5F62\u6210\u7A33\u5B9A\u4EA7\u51FA"],
    risks: ["\u53EF\u80FD\u63A2\u7D22\u4E0D\u8DB3", "\u5FEB\u901F\u4EA4\u4ED8\u65F6\u5BB9\u6613\u6F0F\u6389\u5F02\u5E38"],
    bestTasks: ["\u9AD8\u9891\u6587\u6848", "\u6807\u51C6\u6750\u6599", "\u5FEB\u901F\u6267\u884C"],
    collaborationMode: "\u7528\u77ED\u6307\u4EE4\u542F\u52A8\uFF0C\u7528\u5173\u952E\u9A8C\u6536\u70B9\u63A7\u5236\u8D28\u91CF\u3002",
    recommendedWorkflow: ["\u660E\u786E\u4EA4\u4ED8\u6807\u51C6", "AI \u5B8C\u6210\u521D\u7248", "\u5C0F\u8303\u56F4\u4F7F\u7528\u540E\u4FEE\u6B63"],
    nextProjects: ["\u6279\u91CF\u5185\u5BB9\u5DE5\u4F5C\u6D41", "\u81EA\u52A8\u5316\u6267\u884C Agent"],
    upgrade: "\u5728\u5FEB\u901F\u4EA4\u4ED8\u524D\u589E\u52A0\u4E00\u6B21\u6765\u6E90\u3001\u8FB9\u754C\u548C\u5F02\u5E38\u68C0\u67E5\u3002",
    strength: "\u76EE\u6807\u660E\u786E\u5E76\u80FD\u5FEB\u901F\u505A\u51FA\u7ED3\u679C",
    blindSpot: "\u901F\u5EA6\u8F83\u5FEB\u65F6\u53EF\u80FD\u9057\u6F0F\u8FB9\u754C"
  },
  DAV: {
    name: "\u6807\u51C6\u4EA4\u4ED8\u8005",
    tagline: "\u628A\u6807\u51C6\u8BF4\u6E05\u695A\uFF0C\u8BA9 AI \u7A33\u5B9A\u4EA4\u4ED8\u3002",
    startMode: "\u4F60\u901A\u5E38\u5148\u628A\u76EE\u6807\u3001\u683C\u5F0F\u548C\u8981\u6C42\u786E\u8BA4\u6E05\u695A\uFF0C\u518D\u5F00\u59CB\u8C03\u7528 AI\u3002",
    divisionMode: "\u4F60\u8D1F\u8D23\u5B9A\u4E49\u89C4\u8303\u548C\u9A8C\u6536\uFF0CAI \u6309\u89C4\u5219\u5B8C\u6210\u53EF\u590D\u7528\u7684\u6807\u51C6\u6210\u679C\u3002",
    speedQuality: "\u4F60\u91CD\u89C6\u4E00\u81F4\u6027\u548C\u53EF\u9760\u6027\uFF0C\u6B63\u5F0F\u4EA4\u4ED8\u524D\u4F1A\u5B8C\u6210\u5FC5\u8981\u68C0\u67E5\u3002",
    strengths: ["\u4EFB\u52A1\u8FB9\u754C\u6E05\u6670", "\u4EA4\u4ED8\u7A33\u5B9A\u53EF\u63A7", "\u5BB9\u6613\u6C89\u6DC0\u6807\u51C6\u6A21\u677F"],
    risks: ["\u9762\u5BF9\u6A21\u7CCA\u95EE\u9898\u63A2\u7D22\u4E0D\u8DB3", "\u89C4\u5219\u8FC7\u591A\u65F6\u7075\u6D3B\u6027\u4E0B\u964D"],
    bestTasks: ["\u6807\u51C6\u62A5\u544A", "\u6279\u91CF\u6750\u6599", "\u6D41\u7A0B\u89C4\u8303"],
    collaborationMode: "\u7528\u6A21\u677F\u3001\u793A\u4F8B\u548C\u9A8C\u6536\u6E05\u5355\u8BA9 AI \u7A33\u5B9A\u590D\u73B0\u3002",
    recommendedWorkflow: ["\u5B9A\u4E49\u6807\u51C6\u6A21\u677F", "\u6309\u6A21\u677F\u751F\u6210", "\u9010\u9879\u9A8C\u6536\u5F52\u6863"],
    nextProjects: ["\u6807\u51C6\u5316\u77E5\u8BC6\u5E93", "\u6587\u6863\u751F\u6210 Agent"],
    upgrade: "\u5728\u6B63\u5F0F\u6267\u884C\u524D\u4FDD\u7559\u4E00\u4E2A\u5C0F\u8303\u56F4\u63A2\u7D22\u73AF\u8282\u3002",
    strength: "\u64C5\u957F\u7ED9\u51FA\u6E05\u695A\u6807\u51C6\u5E76\u7A33\u5B9A\u4EA4\u4ED8",
    blindSpot: "\u9762\u5BF9\u9AD8\u5EA6\u6A21\u7CCA\u95EE\u9898\u65F6\u63A2\u7D22\u4E0D\u8DB3"
  },
  DCF: {
    name: "\u534F\u540C\u63A8\u8FDB\u8005",
    tagline: "\u56F4\u7ED5\u76EE\u6807\u6301\u7EED\u534F\u4F5C\uFF0C\u8FB9\u505A\u8FB9\u8C03\u6574\u3002",
    startMode: "\u4F60\u4F1A\u5148\u786E\u8BA4\u4E3B\u8981\u76EE\u6807\uFF0C\u7136\u540E\u5728\u63A8\u8FDB\u8FC7\u7A0B\u4E2D\u9010\u6B65\u89E3\u51B3\u5177\u4F53\u95EE\u9898\u3002",
    divisionMode: "\u4F60\u4E0E AI \u4FDD\u6301\u9891\u7E41\u534F\u4F5C\uFF0C\u6839\u636E\u6BCF\u4E00\u6B65\u7ED3\u679C\u52A8\u6001\u8C03\u6574\u5206\u5DE5\u3002",
    speedQuality: "\u4F60\u613F\u610F\u5FEB\u901F\u63A8\u8FDB\uFF0C\u4E5F\u4F1A\u5728\u5173\u952E\u8282\u70B9\u5171\u540C\u68C0\u67E5\u662F\u5426\u504F\u79BB\u76EE\u6807\u3002",
    strengths: ["\u534F\u4F5C\u63A8\u8FDB\u987A\u7545", "\u5E94\u5BF9\u53D8\u5316\u7075\u6D3B", "\u53CD\u9988\u8F6C\u5316\u901F\u5EA6\u5FEB"],
    risks: ["\u9891\u7E41\u8C03\u6574\u4F1A\u6253\u65AD\u7ED3\u6784", "\u7248\u672C\u4E4B\u95F4\u5BB9\u6613\u7F3A\u5C11\u8BB0\u5F55"],
    bestTasks: ["\u9879\u76EE\u63A8\u8FDB", "\u8FED\u4EE3\u8FD0\u8425", "\u8DE8\u90E8\u95E8\u534F\u4F5C"],
    collaborationMode: "\u4EE5\u4EFB\u52A1\u770B\u677F\u548C\u9636\u6BB5\u7248\u672C\u7EF4\u6301\u5171\u540C\u8282\u594F\u3002",
    recommendedWorkflow: ["\u62C6\u5206\u9636\u6BB5\u76EE\u6807", "\u8FB9\u505A\u8FB9\u53CD\u9988", "\u8282\u70B9\u590D\u76D8\u5E76\u56FA\u5316"],
    nextProjects: ["\u9879\u76EE\u534F\u4F5C Agent", "\u81EA\u52A8\u8DDF\u8FDB\u5DE5\u4F5C\u6D41"],
    upgrade: "\u6BCF\u6B21\u8C03\u6574\u90FD\u8BB0\u5F55\u539F\u56E0\u3001\u5F71\u54CD\u548C\u5F53\u524D\u6709\u6548\u7248\u672C\u3002",
    strength: "\u80FD\u56F4\u7ED5\u76EE\u6807\u4E0E AI \u5FEB\u901F\u534F\u4F5C",
    blindSpot: "\u9891\u7E41\u8C03\u6574\u53EF\u80FD\u6253\u65AD\u6574\u4F53\u7ED3\u6784"
  },
  DCV: {
    name: "\u8D28\u91CF\u5B88\u95E8\u4EBA",
    tagline: "\u76EE\u6807\u805A\u7126\u3001\u5171\u540C\u6821\u51C6\u3001\u4E25\u5B88\u8D28\u91CF\u3002",
    startMode: "\u4F60\u901A\u5E38\u5148\u9501\u5B9A\u76EE\u6807\u4E0E\u98CE\u9669\uFF0C\u518D\u548C AI \u4E00\u8D77\u62C6\u89E3\u5B9E\u73B0\u8DEF\u5F84\u3002",
    divisionMode: "\u4F60\u4F1A\u4E0E AI \u5171\u540C\u6821\u51C6\u5173\u952E\u5224\u65AD\uFF0C\u540C\u65F6\u4FDD\u7559\u6700\u7EC8\u8D28\u91CF\u8D23\u4EFB\u3002",
    speedQuality: "\u4F60\u66F4\u91CD\u89C6\u6B63\u5F0F\u7ED3\u679C\u7684\u53EF\u4FE1\u5EA6\uFF0C\u4E60\u60EF\u5728\u5173\u952E\u8282\u70B9\u7CFB\u7EDF\u6838\u9A8C\u3002",
    strengths: ["\u8D28\u91CF\u610F\u8BC6\u7A33\u5B9A", "\u98CE\u9669\u63A7\u5236\u624E\u5B9E", "\u5173\u952E\u5224\u65AD\u8F83\u53EF\u9760"],
    risks: ["\u8D28\u91CF\u8981\u6C42\u53EF\u80FD\u62D6\u6162\u8BD5\u9519", "\u5BB9\u6613\u6295\u5165\u8FC7\u591A\u68C0\u67E5\u6210\u672C"],
    bestTasks: ["\u91CD\u8981\u4EA4\u4ED8", "\u9AD8\u98CE\u9669\u51B3\u7B56", "\u8D28\u91CF\u5BA1\u6838"],
    collaborationMode: "\u8BA9 AI \u53C2\u4E0E\u68C0\u67E5\u4E0E\u53CD\u9A73\uFF0C\u4F46\u5173\u952E\u8BC1\u636E\u5FC5\u987B\u56DE\u5230\u539F\u59CB\u6765\u6E90\u3002",
    recommendedWorkflow: ["\u660E\u786E\u98CE\u9669\u6E05\u5355", "\u5171\u540C\u5B8C\u6210\u4E0E\u6821\u51C6", "\u72EC\u7ACB\u6838\u9A8C\u540E\u4EA4\u4ED8"],
    nextProjects: ["\u8D28\u91CF\u68C0\u67E5 Agent", "\u5408\u89C4\u77E5\u8BC6\u5E93"],
    upgrade: "\u533A\u5206\u5FC5\u987B\u6838\u9A8C\u548C\u53EF\u4EE5\u8BD5\u9519\u7684\u90E8\u5206\uFF0C\u63D0\u5347\u6574\u4F53\u8282\u594F\u3002",
    strength: "\u5BF9\u4EA4\u4ED8\u8D28\u91CF\u4FDD\u6301\u7A33\u5B9A\u654F\u611F",
    blindSpot: "\u8D28\u91CF\u8981\u6C42\u8F83\u9AD8\u65F6\u53EF\u80FD\u964D\u4F4E\u8BD5\u9519\u901F\u5EA6"
  }
};
var levelForScore = (score) => {
  if (score >= 80) return { code: "L4", name: "Agent\u63A8\u52A8\u8005", range: "80\u2013100" };
  if (score >= 60) return { code: "L3", name: "\u534F\u540C\u4EA4\u4ED8\u8005", range: "60\u201379" };
  if (score >= 40) return { code: "L2", name: "\u4EFB\u52A1\u8868\u8FBE\u8005", range: "40\u201359" };
  return { code: "L1", name: "AI\u4F53\u9A8C\u8005", range: "0\u201339" };
};
var LEVELS = [
  { code: "L1", name: "AI\u4F53\u9A8C\u8005", range: "0\u201339" },
  { code: "L2", name: "\u4EFB\u52A1\u8868\u8FBE\u8005", range: "40\u201359" },
  { code: "L3", name: "\u534F\u540C\u4EA4\u4ED8\u8005", range: "60\u201379" },
  { code: "L4", name: "Agent\u63A8\u52A8\u8005", range: "80\u2013100" }
];
function nextLevel(level) {
  const index = LEVELS.findIndex((item) => item.code === level.code);
  return LEVELS[Math.min(LEVELS.length - 1, index + 1)];
}
function normalizeAnswerIds(answers) {
  if (!Array.isArray(answers)) return [];
  return [...new Set(answers.flatMap((value) => Array.isArray(value) ? value : [value]).filter(Boolean))];
}
function selectedOptions(question, selectedIds) {
  return question.options.filter((option) => selectedIds.includes(option.id));
}
function scoreQuestion(question, selectedIds) {
  const selected = selectedOptions(question, selectedIds);
  if (!selected.length) return 0;
  if (question.kind !== "multi") return Number(selected[0].score) || 0;
  if (question.strategy === "task-breadth") {
    return Math.min(3, selected.length * 0.5);
  }
  if (question.strategy === "tool-depth") {
    const highest = Math.max(...selected.map((option) => Number(option.score) || 0));
    const families = new Set(selected.map((option) => option.family));
    return Math.min(3, highest + Math.min(0.4, Math.max(0, families.size - 1) * 0.1));
  }
  return Math.max(...selected.map((option) => Number(option.score) || 0));
}
function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
}
function percent(value) {
  return Math.round(value / 3 * 100);
}
function rubricPercent(rubric, key) {
  const value = Math.min(3, Math.max(0, Number(rubric?.[key]) || 0));
  return percent(value);
}
function projectResult(selectedIds) {
  const bonuses = {
    "f-q5-website-live": 3,
    "f-q5-knowledge-active": 3,
    "f-q5-automation-live": 4
  };
  const projectBonus = Math.min(8, Object.entries(bonuses).filter(([id]) => selectedIds.includes(id)).reduce((sum, [, value]) => sum + value, 0));
  const miniCore = selectedIds.includes("f-q5-mini-core");
  const miniLive = selectedIds.includes("f-q5-mini-live");
  return { projectBonus, miniCore, miniLive, eligible: miniCore && miniLive };
}
function scoreStyle(answers, questionList = questions) {
  const selectedIds = normalizeAnswerIds(answers);
  const totals = { explorationExecution: 0, assignCocreate: 0, fastVerify: 0 };
  const poles = {
    explorationExecution: ["E", "D"],
    assignCocreate: ["A", "C"],
    fastVerify: ["F", "V"]
  };
  for (const question of questionList.filter((item) => item.kind === "style")) {
    const option = question.options.find((item) => selectedIds.includes(item.id));
    if (!option) continue;
    totals[question.axis] += option.pole === poles[question.axis][0] ? question.weight : -question.weight;
  }
  const chars = Object.entries(totals).map(([axis, value]) => poles[axis][value > 0 ? 0 : 1]);
  const confidence = Object.fromEntries(
    Object.entries(totals).map(([axis, value]) => [axis, Math.abs(value) === 3 ? "\u660E\u663E" : "\u8F7B\u5FAE"])
  );
  const code = chars.join("");
  const profile = styleProfiles[code] || styleProfiles.DCV;
  const axisDetails = [
    { axis: "explorationExecution", label: "\u63A2\u7D22 / \u6267\u884C", pole: chars[0], tendency: chars[0] === "E" ? "\u63A2\u7D22" : "\u6267\u884C", strength: confidence.explorationExecution },
    { axis: "assignCocreate", label: "\u59D4\u6D3E / \u5171\u521B", pole: chars[1], tendency: chars[1] === "A" ? "\u59D4\u6D3E" : "\u5171\u521B", strength: confidence.assignCocreate },
    { axis: "fastVerify", label: "\u654F\u6377 / \u5BA1\u614E", pole: chars[2], tendency: chars[2] === "F" ? "\u654F\u6377" : "\u5BA1\u614E", strength: confidence.fastVerify }
  ];
  return { code, ...profile, confidence, axes: totals, axisDetails };
}
function scoreAssessment(answers, rubric, questionList = questions) {
  const selectedIds = normalizeAnswerIds(answers);
  const scoredQuestions = questionList.filter((question) => ["foundation", "application", "business"].includes(question.section));
  const questionScores = new Map(scoredQuestions.map((question) => [question.id, scoreQuestion(question, selectedIds)]));
  const sectionScore = (section) => percent(average(
    scoredQuestions.filter((question) => question.section === section).map((question) => questionScores.get(question.id) || 0)
  ));
  const sectionScores = {
    foundation: sectionScore("foundation"),
    application: sectionScore("application"),
    business: sectionScore("business")
  };
  const choiceScore = Math.round(
    sectionScores.foundation * 0.3 + sectionScores.application * 0.45 + sectionScores.business * 0.25
  );
  const open = Object.fromEntries(
    ["audience", "purpose", "inputs", "process", "output", "constraints", "acceptance"].map((key) => [key, rubricPercent(rubric, key)])
  );
  const openScore = Math.round(average(Object.values(open)));
  const rawTotalScore = Math.round(choiceScore * 0.6 + openScore * 0.4);
  const project = projectResult(selectedIds);
  const totalScore = Math.min(100, rawTotalScore + project.projectBonus);
  const baseLevel = levelForScore(totalScore);
  const level = project.eligible ? nextLevel(baseLevel) : baseLevel;
  const choiceDimensions = Object.fromEntries(dimensions.map((dimension) => {
    const values = scoredQuestions.filter((question) => question.dimension === dimension.id).map((question) => questionScores.get(question.id) || 0);
    return [dimension.id, percent(average(values))];
  }));
  const dimensionsResult = {
    scene: Math.round(choiceDimensions.scene * 0.7 + average([open.audience, open.purpose]) * 0.3),
    task: Math.round(choiceDimensions.task * 0.5 + average([open.audience, open.purpose, open.output]) * 0.5),
    data: Math.round(choiceDimensions.data * 0.6 + open.inputs * 0.4),
    collaboration: Math.round(choiceDimensions.collaboration * 0.6 + open.process * 0.4),
    verification: Math.round(choiceDimensions.verification * 0.7 + average([open.constraints, open.acceptance]) * 0.3),
    agent: choiceDimensions.agent
  };
  return {
    choiceScore,
    openScore,
    rawTotalScore,
    projectBonus: project.projectBonus,
    totalScore,
    projectUpgrade: {
      applied: project.eligible && baseLevel.code !== "L4",
      eligible: project.eligible,
      levels: project.eligible && baseLevel.code !== "L4" ? 1 : 0,
      miniCore: project.miniCore,
      miniLive: project.miniLive,
      baseLevelCode: baseLevel.code
    },
    sectionScores,
    dimensions: dimensionsResult,
    level,
    style: scoreStyle(answers, questionList)
  };
}
function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value += 1831565813;
    let result = value;
    result = Math.imul(result ^ result >>> 15, result | 1);
    result ^= result + Math.imul(result ^ result >>> 7, result | 61);
    return ((result ^ result >>> 14) >>> 0) / 4294967296;
  };
}
function shuffledOptions(question, seed) {
  const output = [...question.options];
  const random = seededRandom(seed);
  for (let index = output.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [output[index], output[swap]] = [output[swap], output[index]];
  }
  return output;
}

// lib/heuristic-analysis.mjs
var RUBRIC_KEYS = [
  "audience",
  "purpose",
  "inputs",
  "process",
  "output",
  "constraints",
  "acceptance"
];
var DIMENSION_CONFIG = {
  audience: {
    label: "\u5BF9\u8C61",
    keywords: ["\u5BB6\u957F", "\u5B66\u751F", "\u6559\u5E08", "\u5458\u5DE5", "\u53D7\u4F17", "\u7528\u6237", "\u8BFB\u8005", "\u542C\u4F17", "\u5BF9\u8C61", "\u9762\u5411", "\u9AD8\u4E00", "\u9AD8\u4E8C", "\u9AD8\u4E09", "\u65B0\u4EBA", "\u7BA1\u57F9\u751F", "\u987E\u95EE", "\u73ED\u4E3B\u4EFB", "\u6821\u957F", "\u9886\u5BFC", "\u5BA2\u6237", "\u56E2\u961F", "\u5B66\u5458", "\u8BB2\u5E08", "\u540C\u4E8B", "\u4E3B\u7BA1"],
    qualityKeywords: ["\u7B2C\u4E00\u6B21", "\u9996\u6B21", "\u65B0\u624B", "\u96F6\u57FA\u7840", "\u521D\u5B66\u8005", "\u6709\u7ECF\u9A8C", "\u65B0\u5165\u804C", "\u65E0\u57FA\u7840", "\u9AD8\u654F\u611F", "\u6311\u5254", "\u79EF\u6781", "\u4FDD\u5B88", "\u4E13\u4E1A", "\u975E\u4E13\u4E1A", "\u96F6\u57FA\u7840", "\u6709\u7F8E\u672F\u57FA\u7840", "\u65E0\u7F8E\u672F\u57FA\u7840"],
    evidenceHints: ["\u5BB6\u957F", "\u5B66\u751F", "\u5BF9\u8C61", "\u9762\u5411", "\u53D7\u4F17", "\u7ED9", "\u542C\u4F17", "\u65B0\u4EBA", "\u6559\u5E08", "\u987E\u95EE", "\u5BA2\u6237", "\u56E2\u961F", "\u7BA1\u57F9\u751F"],
    specificSignals: ["\u5C81", "\u5E74\u7EA7", "\u5E74\u7EA7", "\u7C7B", "\u6279", "\u540D", "\u4F4D", "\u7ECF\u9A8C", "\u57FA\u7840", "\u80CC\u666F", "\u7279\u5F81", "\u753B\u50CF", "\u60C5\u51B5"]
  },
  purpose: {
    label: "\u76EE\u7684",
    keywords: ["\u76EE\u6807", "\u76EE\u7684", "\u7406\u89E3", "\u638C\u63E1", "\u5E2E\u52A9", "\u7528\u4E8E", "\u4E3A\u4E86", "\u5B8C\u6210", "\u8FBE\u5230", "\u5B66\u4F1A", "\u4E86\u89E3", "\u77E5\u9053", "\u8BA4\u8BC6", "\u80FD\u591F", "\u5B9E\u73B0", "\u63D0\u5347", "\u57F9\u517B", "\u8BAD\u7EC3", "\u6559\u4F1A", "\u8BA9", "\u8BF4\u670D", "\u63A8\u52A8", "\u4FC3\u6210"],
    qualityKeywords: ["\u5E73\u8861", "\u914D\u5408", "\u91CD\u70B9", "\u9636\u6BB5", "\u7B56\u7565", "\u65B9\u6848", "\u6D41\u7A0B", "\u65B9\u6CD5", "\u6280\u5DE7", "\u89C4\u5212", "\u5B9A\u4F4D", "\u5356\u70B9", "\u5DEE\u5F02", "\u533A\u5206", "\u6F84\u6E05", "\u6D88\u9664", "\u8986\u76D6", "\u5BF9\u9F50", "\u8FBE\u6210"],
    evidenceHints: ["\u76EE\u6807", "\u76EE\u7684", "\u4E3A\u4E86", "\u5E2E\u52A9", "\u8BA9", "\u7406\u89E3", "\u638C\u63E1", "\u5B66\u4F1A", "\u8BF4\u670D", "\u4FC3\u6210", "\u8FBE\u6210", "\u5B9E\u73B0", "\u8986\u76D6"],
    specificSignals: ["\u6210", "\u7387", "\u5206", "\u9879", "\u6B65", "\u79CD", "\u4E2A", "\u4F4D", "\u6761", "\u8F6E", "\u7EA7", "\u7C7B"]
  },
  inputs: {
    label: "\u8F93\u5165\u8D44\u6599",
    keywords: ["\u8D44\u6599", "\u6587\u4EF6", "\u6570\u636E", "\u6765\u6E90", "\u653F\u7B56", "\u8BFE\u7A0B", "\u5B89\u6392", "\u6848\u4F8B", "\u5F80\u5C4A", "\u53C2\u8003", "\u6750\u6599", "\u6587\u6863", "\u8868\u683C", "\u8BB0\u5F55", "\u4FE1\u606F", "\u6E05\u5355", "\u6A21\u677F", "\u80CC\u666F", "\u5386\u53F2", "\u9644\u4EF6", "\u8BFE\u4EF6", "\u6559\u6848", "\u8BDD\u672F", "\u811A\u672C", "\u95EE\u5377", "\u753B\u50CF"],
    qualityKeywords: ["\u6807\u6CE8", "\u6765\u6E90", "\u65E5\u671F", "\u7248\u672C", "\u9002\u7528", "\u6574\u7406", "\u5206\u7C7B", "\u533F\u540D", "\u8131\u654F", "\u6392\u5E8F", "\u4F18\u5148\u7EA7", "\u66F4\u65B0", "\u65F6\u95F4", "\u8FD1\u4E09\u5E74", "\u672C\u6821", "\u672C\u6821\u8BFE\u7A0B"],
    evidenceHints: ["\u8D44\u6599", "\u6587\u4EF6", "\u653F\u7B56", "\u8BFE\u7A0B", "\u6848\u4F8B", "\u53C2\u8003", "\u6750\u6599", "\u6570\u636E", "\u8BFE\u4EF6", "\u8BDD\u672F", "\u95EE\u5377", "\u753B\u50CF", "\u811A\u672C"],
    specificSignals: ["\u4EFD", "\u5F20", "\u9875", "\u4EFD", "\u6761", "\u5E74", "\u6708", "\u5468", "\u7248", "\u53F7", "\u8282", "\u6B21", "\u6BB5"]
  },
  process: {
    label: "\u6267\u884C\u65B9\u5F0F",
    keywords: ["\u6B65\u9AA4", "\u6D41\u7A0B", "\u5148", "\u518D", "\u7136\u540E", "\u7B2C\u4E00\u6B65", "\u9996\u5148", "\u63A5\u7740", "\u6700\u540E", "\u68C0\u67E5\u70B9", "\u5206\u6B65", "\u8F6E\u6B21", "\u8FED\u4EE3", "\u4FEE\u6539", "\u8C03\u6574", "\u9010\u9879", "\u4F9D\u6B21", "\u9636\u6BB5", "\u73AF\u8282", "\u987A\u5E8F", "\u6309", "\u6D41\u7A0B", "\u6B65\u9AA4"],
    qualityKeywords: ["\u68C0\u67E5\u70B9", "\u9A8C\u6536", "\u5206\u8F6E", "\u8FED\u4EE3", "\u590D\u6838", "\u786E\u8BA4", "\u5BA1\u6838", "\u53CD\u9988", "\u4FEE\u6539", "\u4F18\u5316", "\u6821\u5BF9", "\u4EA4\u53C9", "\u62BD\u6837", "\u56DE\u8BBF", "\u5BF9\u8BDD", "\u6F14\u7EC3", "\u8BD5\u8BB2", "\u8BA8\u8BBA", "\u8BC4\u5BA1"],
    evidenceHints: ["\u6B65\u9AA4", "\u6D41\u7A0B", "\u5148", "\u518D", "\u7136\u540E", "\u5206\u6B65", "\u68C0\u67E5", "\u4FEE\u6539", "\u6F14\u7EC3", "\u8BD5\u8BB2", "\u8BC4\u5BA1", "\u62BD\u6837", "\u590D\u6838", "\u4EA4\u53C9", "\u8BA8\u8BBA"],
    specificSignals: ["\u6B21", "\u8F6E", "\u6B65", "\u6BB5", "\u5206", "5", "3", "10", "\u4E00", "\u4E8C", "\u4E09", "\u4E24"]
  },
  output: {
    label: "\u8F93\u51FA\u683C\u5F0F",
    keywords: ["PPT", "ppt", "\u6F14\u793A", "\u5927\u7EB2", "\u683C\u5F0F", "\u9875\u6570", "\u7ED3\u6784", "\u6A21\u677F", "\u6587\u6863", "\u8868\u683C", "\u56FE\u8868", "\u5E7B\u706F\u7247", "\u9875\u9762", "\u7AE0\u8282", "\u76EE\u5F55", "\u6392\u7248", "\u8BBE\u8BA1", "\u98CE\u683C", "\u8272\u8C03", "\u5B57\u4F53", "PDF", "doc", "word", "\u90AE\u4EF6", "\u4FE1", "\u901A\u77E5", "\u7A3F", "\u603B\u7ED3", "\u65B9\u6848", "\u5468\u62A5", "\u6708\u62A5", "\u7B80\u5386"],
    qualityKeywords: ["\u9875", "\u5206\u949F", "\u5B57\u6570", "\u7AE0\u8282", "\u76EE\u5F55", "\u5C01\u9762", "\u5C01\u5E95", "\u52A8\u753B", "\u8FC7\u6E21", "\u5907\u6CE8", "\u8BB2\u7A3F", "\u5B57\u53F7", "\u6BB5\u8DDD", "\u8272", "logo", "\u56FE\u8868", "\u8868\u683C", "\u63D0\u7EB2", "\u7ED3\u6784", "\u5B57\u53F7", "\u683C\u5F0F", "\u6BB5\u8DDD"],
    evidenceHints: ["PPT", "\u5927\u7EB2", "\u683C\u5F0F", "\u9875", "\u7ED3\u6784", "\u6A21\u677F", "\u6F14\u793A", "\u5E7B\u706F\u7247", "\u6587\u6863", "\u90AE\u4EF6", "\u4FE1", "\u7A3F", "\u5468\u62A5", "\u6708\u62A5", "PDF", "\u603B\u7ED3", "\u65B9\u6848", "\u7B80\u5386"],
    specificSignals: ["\u9875", "\u5206\u949F", "\u5B57", "\u8282", "\u7AE0", "\u6BB5", "\u5E45", "\u79CD", "\u4E2A", "5", "3", "10", "15", "20", "30", "40"]
  },
  constraints: {
    label: "\u9650\u5236\u8FB9\u754C",
    keywords: ["\u4E0D\u8981", "\u7981\u6B62", "\u907F\u514D", "\u65F6\u957F", "\u9650\u5236", "\u8303\u56F4", "\u8FB9\u754C", "\u5B57\u6570", "\u65F6\u95F4", "\u6CE8\u610F", "\u5FC5\u987B", "\u4E0D\u5F97", "\u4E0D\u80FD", "\u907F\u514D", "\u786E\u4FDD", "\u4FDD\u8BC1", "\u4E0D\u8D85\u8FC7", "\u81F3\u5C11", "\u6700\u5C11", "\u6700\u591A", "\u5E94\u8BE5", "\u4E0D\u80FD"],
    qualityKeywords: ["\u4E0D\u8981", "\u7981\u6B62", "\u4E0D\u5F97", "\u4E0D\u80FD", "\u907F\u514D", "\u5FC5\u987B", "\u786E\u4FDD", "\u4FDD\u8BC1", "\u4E8B\u5B9E", "\u51C6\u786E", "\u771F\u5B9E", "\u9690\u79C1", "\u654F\u611F", "\u8131\u654F", "\u7248\u6743", "\u5408\u89C4", "\u552F\u4E00", "\u9996\u5BB6", "\u6700", "\u7EDD\u5BF9", "\u672A\u6210\u5E74", "\u672A\u63D0\u4F9B", "\u672A\u6838\u5B9E"],
    evidenceHints: ["\u4E0D\u8981", "\u7981\u6B62", "\u907F\u514D", "\u65F6\u957F", "\u9650\u5236", "\u5FC5\u987B", "\u4E0D\u5F97", "\u4E0D\u80FD", "\u786E\u4FDD", "\u4FDD\u8BC1", "\u5408\u89C4", "\u654F\u611F", "\u9690\u79C1", "\u8131\u654F", "\u4E8B\u5B9E", "\u51C6\u786E", "\u7248\u6743", "\u672A\u6210\u5E74"],
    specificSignals: ["\u5206\u949F", "\u5B57", "\u9875", "\u5C81", "\u5E74", "\u6708", "\u6761", "\u9879", "\u4EFD", "\u5185", "\u5916", "\u524D", "\u540E"]
  },
  acceptance: {
    label: "\u9A8C\u6536\u6807\u51C6",
    keywords: ["\u9A8C\u6536", "\u6807\u51C6", "\u68C0\u67E5", "\u786E\u8BA4", "\u5408\u683C", "\u5B8C\u6210", "\u6EE1\u8DB3", "\u8981\u6C42", "\u8FBE\u5230", "\u9A8C\u8BC1", "\u6838\u5BF9", "\u6D4B\u8BD5", "\u5BA1\u6838", "\u901A\u8FC7", "\u4EA4\u4ED8", "\u68C0\u67E5\u6E05\u5355", "\u51C6\u5219", "\u8BC4\u5206", "\u6838\u5BF9", "\u590D\u8BC4", "\u590D\u5BA1", "\u901A\u8FC7", "\u8BC4\u4EF7"],
    qualityKeywords: ["\u9A8C\u6536", "\u6807\u51C6", "\u6838\u5BF9", "\u9A8C\u8BC1", "\u6D4B\u8BD5", "\u68C0\u67E5\u6E05\u5355", "\u5408\u683C", "\u901A\u8FC7", "\u4EA4\u4ED8", "\u786E\u8BA4", "\u8BC4\u5206", "\u590D\u8BC4", "\u590D\u5BA1", "\u5B9E\u6D4B", "\u53EF\u8FFD\u6EAF", "\u53EF\u6838\u5BF9", "\u53EF\u9A8C\u8BC1", "\u53EF\u8861\u91CF", "\u53EF\u91CF\u5316"],
    evidenceHints: ["\u9A8C\u6536", "\u6807\u51C6", "\u68C0\u67E5", "\u786E\u8BA4", "\u5408\u683C", "\u6EE1\u8DB3", "\u9A8C\u8BC1", "\u6838\u5BF9", "\u590D\u8BC4", "\u590D\u5BA1", "\u53EF\u8FFD\u6EAF", "\u53EF\u6838\u5BF9", "\u8BC4\u5206"],
    specificSignals: ["\u5206", "\u6761", "\u9879", "\u6B21", "\u8F6E", "\u7EA7", "5", "3", "10", "\u4E00", "\u4E8C", "\u4E09", "\u4E24"]
  }
};
function splitAtomicSentences(text) {
  const raw = text.replace(/[\r\t]+/g, " ").split(/[。\n；;！!？?]/).map((s) => s.trim()).filter((s) => s.length >= 4);
  const atoms = [];
  for (const s of raw) {
    const parts = s.split(/(?<=[，,；;])\s*(?=先|再|然后|接着|最后|其次|第一|第二步|第三步)/).map((p) => p.trim()).filter((p) => p.length >= 4);
    atoms.push(...parts);
  }
  return atoms.length > 0 ? atoms : raw;
}
function countMatches(text, keywords) {
  let count = 0;
  for (const keyword of keywords) {
    const regex = new RegExp(escapeRegExp(keyword), "gi");
    const matches = text.match(regex);
    if (matches) count += matches.length;
  }
  return count;
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function evaluateDimension(text, config) {
  const baseCount = countMatches(text, config.keywords);
  const qualityCount = countMatches(text, config.qualityKeywords);
  const specificCount = countMatches(text, config.specificSignals);
  const atomicSentences = splitAtomicSentences(text);
  let bestSentence = "";
  let bestScore = 0;
  const seen = /* @__PURE__ */ new Set();
  for (const sentence of atomicSentences) {
    let score2 = 0;
    for (const hint of config.evidenceHints) {
      if (sentence.includes(hint)) score2 += 2;
    }
    for (const kw of config.qualityKeywords) {
      if (sentence.includes(kw)) score2 += 1;
    }
    if (score2 > 0 && !seen.has(sentence)) {
      seen.add(sentence);
      if (score2 > bestScore) {
        bestScore = score2;
        bestSentence = sentence;
      }
    }
  }
  let base = 0;
  if (baseCount >= 3) base = 2;
  else if (baseCount >= 1) base = 1;
  let quality = 0;
  if (qualityCount >= 2 && specificCount >= 1) quality = 1;
  else if (qualityCount >= 1 || specificCount >= 2) quality = 1;
  else if (specificCount >= 1) quality = 0;
  const score = Math.min(3, base + quality);
  const suggestions = [];
  if (base === 0) suggestions.push(`\u5B8C\u5168\u6CA1\u6709\u63D0\u5230"${config.label}"\u76F8\u5173\u7684\u5185\u5BB9\uFF0C\u9700\u8981\u8865\u4E00\u6BB5`);
  else if (base === 1) suggestions.push(`"${config.label}"\u53EA\u7B3C\u7EDF\u63D0\u4E86\u4E00\u4E0B\uFF0C\u5EFA\u8BAE\u66F4\u5177\u4F53\u5730\u63CF\u8FF0`);
  if (base >= 1 && quality === 0) suggestions.push(`"${config.label}"\u6CA1\u6709\u6570\u5B57\u3001\u793A\u4F8B\u6216\u53EF\u6D4B\u91CF\u6807\u51C6\uFF0C\u5EFA\u8BAE\u8865\u5145`);
  if (base >= 1 && qualityCount === 0) suggestions.push(`"${config.label}"\u7F3A\u5C11\u8FB9\u754C/\u8303\u56F4/\u65B9\u6CD5\u63CF\u8FF0\uFF0C\u53EF\u4EE5\u66F4\u5177\u4F53`);
  return {
    score,
    evidence: bestSentence.slice(0, 100) || "\u672A\u5728\u539F\u6587\u4E2D\u627E\u5230\u660E\u786E\u8BC1\u636E",
    suggestions: suggestions.slice(0, 2)
  };
}
function buildUpgradedPrompt(original, evaluations, role) {
  const safeRole = role || "teacher";
  const taskMap = {
    teacher: "\u9762\u5411\u540C\u7EC4\u6559\u5E08\u4E0E\u6559\u5B66\u4E3B\u4EFB\u7684\u516C\u5F00\u8BFE",
    consultant: "\u9AD8\u4E00\u5BB6\u957F\u9996\u6B21\u54A8\u8BE2\u540E\u7684\u8DDF\u8FDB\u6C9F\u901A",
    headteacher: "\u9AD8\u4E00\u65B0\u73ED\u7EA7\u7684\u5BB6\u957F\u4F1A\u5F00\u573A\u53D1\u8A00",
    trainee: "\u5165\u804C\u7B2C\u4E00\u4E2A\u6708\u7684\u4E2A\u4EBA\u603B\u7ED3",
    admin: "\u4E0B\u5B66\u671F\u6559\u7814\u7EC4\u8C03\u6574\u5EFA\u8BAE"
  };
  const taskDesc = taskMap[safeRole] || taskMap.teacher;
  const sections = [];
  sections.push(`\u8BF7\u6309\u4EE5\u4E0B\u5B8C\u6574\u7ED3\u6784\u51C6\u5907\u3010${taskDesc}\u3011\uFF0C\u6BCF\u6BB5\u90FD\u57FA\u4E8E\u6211\u63D0\u4F9B\u7684\u4E8B\u5B9E\uFF0C\u7F3A\u4EC0\u4E48\u76F4\u63A5\u544A\u8BC9\u6211\uFF0C\u4E0D\u8981\u81EA\u5DF1\u7F16\u3002
`);
  sections.push(
    `\u3010\u5BF9\u8C61\u3011\u8BF7\u660E\u786E\uFF1A\u662F\u8C01\u3001\u6709\u4EC0\u4E48\u7ECF\u9A8C\u6216\u57FA\u7840\u3001\u53EF\u80FD\u6709\u54EA\u4E9B\u987E\u8651\u3002
` + (evaluations.audience.score >= 2 ? `\u53EF\u53C2\u8003\u6211\u539F\u8BDD\uFF1A${evaluations.audience.evidence}` : `\u793A\u4F8B\uFF1A\u7B2C\u4E00\u6B21\u63A5\u89E6\u827A\u8003\u7684\u9AD8\u4E8C\u5BB6\u957F\uFF0C\u5B69\u5B50\u6210\u7EE9\u4E2D\u7B49\u3001\u5BB6\u5EAD\u5BF9\u827A\u8003\u8D39\u7528\u6709\u987E\u8651\u3002`)
  );
  sections.push(
    `\u3010\u76EE\u7684\u3011\u8BF7\u8BF4\u660E\uFF1A\u8981\u8BA9\u8C01\u7406\u89E3/\u63A5\u53D7/\u505A\u5230\u4EC0\u4E48\uFF0C\u8FBE\u5230\u4EC0\u4E48\u53EF\u89C2\u5BDF\u7684\u6548\u679C\u3002
` + (evaluations.purpose.score >= 2 ? `\u53EF\u53C2\u8003\u6211\u539F\u8BDD\uFF1A${evaluations.purpose.evidence}` : `\u793A\u4F8B\uFF1A\u8BA9\u5BB6\u957F\u7406\u89E3\u4E09\u4E2A\u6838\u5FC3\u8981\u70B9\uFF08\u5907\u8003\u9636\u6BB5\u3001\u6587\u5316\u4E0E\u4E13\u4E1A\u5E73\u8861\u3001\u5BB6\u957F\u914D\u5408\u91CD\u70B9\uFF09\uFF0C\u5E76\u80FD\u5728\u8BB2\u5EA7\u540E\u51C6\u786E\u56DE\u7B54\u5176\u4ED6\u5BB6\u957F\u7684\u63D0\u95EE\u3002`)
  );
  sections.push(
    `\u3010\u8F93\u5165\u8D44\u6599\u3011\u8BF7\u5217\u51FA\u6211\u63D0\u4F9B\u7684\u8D44\u6599\uFF0C\u5E76\u6807\u6CE8\u6765\u6E90/\u65E5\u671F/\u7248\u672C/\u9002\u7528\u8303\u56F4\uFF0C\u672A\u63D0\u4F9B\u7684\u8D44\u6599\u4E0D\u8981\u7528\u3002
` + (evaluations.inputs.score >= 2 ? `\u53EF\u53C2\u8003\u6211\u539F\u8BDD\uFF1A${evaluations.inputs.evidence}` : `\u793A\u4F8B\uFF1A
- \u672C\u6821\u8BFE\u7A0B\u5B89\u6392\uFF08\u6765\u6E90\uFF1A\u6559\u52A1\u5904 2026 \u6625\uFF0C\u7248\u672C V3\uFF09
- \u8FD1\u4E09\u5E74\u7F8E\u672F\u827A\u8003\u653F\u7B56\u6587\u4EF6\uFF08\u6765\u6E90\uFF1A\u7701\u8003\u8BD5\u9662 2024-2026\uFF09
- \u5F80\u5C4A\u5BB6\u957F\u5E38\u89C1\u95EE\u9898\u6C47\u603B\uFF08\u6765\u6E90\uFF1A\u62DB\u751F\u529E 2025\uFF09`)
  );
  sections.push(
    `\u3010\u6267\u884C\u6B65\u9AA4\u3011\u8BF7\u6309\u987A\u5E8F\u8BF4\u660E\u4F60\u8981\u600E\u4E48\u5B8C\u6210\uFF1A\u5148\u505A\u4EC0\u4E48 \u2192 \u4E2D\u95F4\u68C0\u67E5\u70B9 \u2192 \u518D\u505A\u4EC0\u4E48 \u2192 \u600E\u4E48\u8BA9\u6211\u786E\u8BA4\u3002
` + (evaluations.process.score >= 2 ? `\u53EF\u53C2\u8003\u6211\u539F\u8BDD\uFF1A${evaluations.process.evidence}` : `\u793A\u4F8B\uFF1A
1. \u5148\u5217\u5927\u7EB2\u53D1\u6211\u786E\u8BA4
2. \u6309\u7AE0\u8282\u586B\u5145\u5185\u5BB9
3. \u6BCF\u5B8C\u6210 5 \u9875\u7ED9\u6211\u68C0\u67E5\u4E00\u6B21
4. \u5168\u90E8\u5B8C\u6210\u540E\u505A\u6574\u4F53\u6838\u5BF9`)
  );
  sections.push(
    `\u3010\u8F93\u51FA\u683C\u5F0F\u3011\u8BF7\u660E\u786E\uFF1A\u7528\u4EC0\u4E48\u683C\u5F0F\u3001\u591A\u5C11\u9875/\u591A\u5C11\u5B57\u3001\u4EC0\u4E48\u7ED3\u6784\u3001\u662F\u5426\u8981\u5907\u6CE8\u8BB2\u7A3F\u3002
` + (evaluations.output.score >= 2 ? `\u53EF\u53C2\u8003\u6211\u539F\u8BDD\uFF1A${evaluations.output.evidence}` : `\u793A\u4F8B\uFF1A40 \u5206\u949F\u8BB2\u5EA7 PPT\uFF0C30-35 \u9875\uFF0C\u5305\u542B\u5C01\u9762\u3001\u76EE\u5F55\u30014 \u7AE0\u6B63\u6587\uFF08\u6BCF\u7AE0 6-8 \u9875\uFF09\u3001\u5C01\u5E95\uFF0C\u6BCF\u9875\u53F3\u4E0B\u89D2\u9644\u8BB2\u7A3F\u5907\u6CE8\u3002`)
  );
  sections.push(
    `\u3010\u9650\u5236\u8FB9\u754C\u3011\u8BF7\u660E\u786E\uFF1A\u54EA\u4E9B\u4E8B\u4E0D\u80FD\u505A\u3001\u4E0D\u80FD\u7F16\u9020\u4EC0\u4E48\u3001\u5B57\u6570/\u65F6\u957F/\u9875\u6570\u9650\u5236\u3001\u98CE\u683C\u8981\u6C42\u3002
` + (evaluations.constraints.score >= 2 ? `\u53EF\u53C2\u8003\u6211\u539F\u8BDD\uFF1A${evaluations.constraints.evidence}` : `\u793A\u4F8B\uFF1A
- \u4E0D\u5F97\u7F16\u9020\u672A\u63D0\u4F9B\u7684\u653F\u7B56\u4FE1\u606F
- \u4E0D\u5F97\u4F7F\u7528"\u552F\u4E00/\u9996\u5BB6/\u6700"\u7B49\u7EDD\u5BF9\u5316\u8868\u8FF0
- \u65F6\u957F\u4E0D\u8D85\u8FC7 40 \u5206\u949F
- \u8BED\u8A00\u901A\u4FD7\u6613\u61C2\uFF0C\u907F\u514D\u4E13\u4E1A\u672F\u8BED
- \u6D89\u53CA\u5B66\u751F\u59D3\u540D/\u5BB6\u5EAD\u4FE1\u606F\u8981\u8131\u654F`)
  );
  sections.push(
    `\u3010\u9A8C\u6536\u6807\u51C6\u3011\u8BF7\u660E\u786E\uFF1A\u5B8C\u6210\u540E\u6211\u600E\u4E48\u5224\u65AD\u5408\u683C\uFF0C\u81F3\u5C11\u7ED9 3 \u6761\u53EF\u6838\u5BF9\u7684\u6807\u51C6\u3002
` + (evaluations.acceptance.score >= 2 ? `\u53EF\u53C2\u8003\u6211\u539F\u8BDD\uFF1A${evaluations.acceptance.evidence}` : `\u793A\u4F8B\uFF1A
1. \u653F\u7B56\u6570\u5B57\u4E0E\u539F\u59CB\u6587\u4EF6 100% \u4E00\u81F4\uFF0C\u53EF\u9010\u6761\u5BF9\u7167
2. \u65F6\u957F\u63A7\u5236\u5728 40 \u5206\u949F\u4EE5\u5185\uFF0CPPT 30-35 \u9875
3. \u5BB6\u957F\u80FD\u542C\u61C2\u5E76\u51C6\u786E\u56DE\u7B54\u5176\u4ED6\u5BB6\u957F 3 \u4E2A\u5E38\u89C1\u95EE\u9898`)
  );
  sections.push(
    `
\u8BF7\u5148\u8F93\u51FA\u5927\u7EB2\u8BA9\u6211\u786E\u8BA4\uFF0C\u518D\u6309\u7AE0\u8282\u5236\u4F5C\u3002\u6BCF\u5B8C\u6210 5 \u9875\u8BA9\u6211\u68C0\u67E5\u4E00\u6B21\u3002\u5982\u679C\u6709\u4FE1\u606F\u7F3A\u5931\uFF0C\u660E\u786E\u544A\u8BC9\u6211\u7F3A\u4EC0\u4E48\uFF0C\u4E0D\u8981\u81EA\u5DF1\u7F16\u3002`
  );
  return sections.join("\n\n");
}
function generateStrengths(evaluations) {
  const strengths = [];
  for (const key of RUBRIC_KEYS) {
    if (evaluations[key].score >= 2 && evaluations[key].evidence !== "\u672A\u5728\u539F\u6587\u4E2D\u627E\u5230\u660E\u786E\u8BC1\u636E") {
      const qualityWord = evaluations[key].score === 3 ? "\u5177\u4F53\u53EF\u6267\u884C" : "\u6BD4\u8F83\u6E05\u695A";
      strengths.push(
        `${DIMENSION_CONFIG[key].label}\u63CF\u8FF0${qualityWord}\uFF1A"${evaluations[key].evidence}"`
      );
    }
  }
  if (strengths.length === 0) {
    strengths.push("\u5DF2\u7ECF\u5C1D\u8BD5\u8868\u8FBE\u4EFB\u52A1\u610F\u56FE\uFF0C\u53EF\u4EE5\u5728\u6B64\u57FA\u7840\u4E0A\u8865\u5145\u7ED3\u6784\u5316\u8981\u7D20");
  }
  return strengths.slice(0, 3);
}
function generateImprovements(evaluations) {
  const improvements = [];
  for (const key of RUBRIC_KEYS) {
    if (evaluations[key].score <= 1) {
      for (const s of evaluations[key].suggestions) {
        improvements.push(s);
      }
    }
  }
  if (improvements.length === 0) {
    improvements.push("\u6574\u4F53\u7ED3\u6784\u8F83\u5B8C\u6574\uFF0C\u53EF\u8FDB\u4E00\u6B65\u8865\u5145\u53EF\u91CF\u5316\u7684\u9A8C\u6536\u6807\u51C6");
  }
  return improvements.slice(0, 5);
}
function generateRisks(evaluations) {
  const risks = [];
  for (const key of RUBRIC_KEYS) {
    if (evaluations[key].score <= 1) {
      const riskMap = {
        audience: "AI \u53EF\u80FD\u9ED8\u8BA4\u901A\u7528\u8868\u8FBE\uFF0C\u65E0\u6CD5\u9488\u5BF9\u4F60\u9762\u5411\u7684\u7279\u5B9A\u4EBA\u7FA4\u8C03\u6574\u6DF1\u5EA6",
        purpose: "AI \u53EF\u80FD\u8F93\u51FA\u5F62\u5F0F\u4E0A\u5B8C\u6574\u4F46\u504F\u79BB\u4F60\u771F\u6B63\u60F3\u8981\u7684\u7ED3\u679C",
        inputs: "AI \u53EF\u80FD\u4F9D\u8D56\u5E38\u8BC6\u7F16\u9020\u5185\u5BB9\uFF0C\u5F15\u5165\u672A\u6838\u5B9E\u7684\u653F\u7B56\u6216\u6570\u636E",
        process: "AI \u53EF\u80FD\u4E00\u6B21\u6027\u8F93\u51FA\u5927\u91CF\u5185\u5BB9\uFF0C\u4E0D\u7ED9\u4F60\u4E2D\u95F4\u8C03\u6574\u7684\u673A\u4F1A",
        output: "AI \u53EF\u80FD\u4EA7\u51FA\u4E0D\u7B26\u5408\u4F7F\u7528\u573A\u666F\u7684\u683C\u5F0F\uFF08\u6BD4\u5982\u5BB6\u957F\u60F3\u770B\u7684\u662F\u6848\u4F8B\uFF0C\u4F60\u7ED9\u4E86\u4E00\u5806\u7406\u8BBA\uFF09",
        constraints: "AI \u53EF\u80FD\u4F7F\u7528\u7EDD\u5BF9\u5316\u8868\u8FF0\u3001\u7F16\u9020\u4E8B\u5B9E\u6216\u5FFD\u7565\u654F\u611F\u4FE1\u606F",
        acceptance: "\u4F60\u65E0\u6CD5\u5224\u65AD AI \u7684\u4EA7\u51FA\u662F\u5426\u8FBE\u6807\uFF0C\u6700\u540E\u8981\u8FD4\u5DE5"
      };
      risks.push(riskMap[key]);
    }
  }
  if (risks.length === 0) {
    risks.push("\u63D0\u793A\u8BCD\u5DF2\u8F83\u5B8C\u6574\uFF0C\u53EF\u8FDB\u4E00\u6B65\u52A0\u5165\u53EF\u91CF\u5316\u9A8C\u6536\u6807\u51C6");
  }
  return risks.slice(0, 3);
}
function generateNextActions(evaluations) {
  const sorted = RUBRIC_KEYS.map((k) => ({ key: k, score: evaluations[k].score })).sort((a, b) => a.score - b.score);
  const actionMap = {
    audience: "\u7EC3\u4E60\u5728\u6BCF\u6B21\u63D0\u793A\u8BCD\u5F00\u5934\u660E\u786E\u5199\u51FA\u9762\u5411\u5BF9\u8C61\u7684\u7279\u5F81\uFF1A\u8EAB\u4EFD\u3001\u7ECF\u9A8C\u3001\u57FA\u7840\u3001\u53EF\u80FD\u7684\u987E\u8651",
    purpose: "\u8BAD\u7EC3\u7528\u4E00\u53E5\u8BDD\u5199\u51FA\u4EFB\u52A1\u76EE\u6807\uFF1A\u8BA9\u8C01\u3001\u505A\u4EC0\u4E48\u3001\u8FBE\u5230\u4EC0\u4E48\u53EF\u89C2\u5BDF\u6548\u679C",
    inputs: "\u7EC3\u4E60\u6574\u7406\u8D44\u6599\u6E05\u5355\u5E76\u6807\u6CE8\u6765\u6E90\u3001\u65E5\u671F\u548C\u7248\u672C\uFF0C\u517B\u6210\u5148\u7ED9\u8D44\u6599\u518D\u63D0\u8981\u6C42\u7684\u4E60\u60EF",
    process: "\u7EC3\u4E60\u628A\u4EFB\u52A1\u62C6\u6210 3-5 \u4E2A\u6B65\u9AA4\uFF0C\u8BBE\u5B9A\u68C0\u67E5\u70B9\uFF0C\u8BA9 AI \u5206\u6B65\u4EA4\u4ED8",
    output: "\u8BAD\u7EC3\u660E\u786E\u6307\u5B9A\u8F93\u51FA\u683C\u5F0F\u3001\u9875\u6570/\u5B57\u6570\u3001\u7ED3\u6784\u548C\u98CE\u683C",
    constraints: "\u7EC3\u4E60\u8BBE\u5B9A\u4E8B\u5B9E\u8FB9\u754C\u3001\u8BED\u8A00\u98CE\u683C\u3001\u7EDD\u5BF9\u5316\u8868\u8FF0\u7981\u533A",
    acceptance: "\u8BAD\u7EC3\u5728\u6BCF\u6B21\u4EFB\u52A1\u524D\u5199\u51FA 2-3 \u6761\u53EF\u6838\u5BF9\u7684\u9A8C\u6536\u6807\u51C6"
  };
  return sorted.slice(0, 3).map(({ key }) => actionMap[key]);
}
function generateSummary(evaluations) {
  const total = RUBRIC_KEYS.reduce((s, k) => s + evaluations[k].score, 0);
  const maxScore = RUBRIC_KEYS.length * 3;
  if (total >= maxScore * 0.75) {
    return "\u63D0\u793A\u8BCD\u7ED3\u6784\u5B8C\u6574\uFF0C\u4E3B\u8981\u8981\u7D20\u9F50\u5168\u4E14\u8F83\u5177\u4F53\uFF0C\u5C5E\u4E8E\u9AD8\u8D28\u91CF\u4EFB\u52A1\u8BF4\u660E\uFF0C\u53EF\u76F4\u63A5\u4EA4\u7ED9 AI \u63A8\u8FDB\u3002";
  }
  if (total >= maxScore * 0.5) {
    return "\u63D0\u793A\u8BCD\u6709\u57FA\u672C\u6846\u67B6\uFF0C\u4F46\u90E8\u5206\u5173\u952E\u8981\u7D20\uFF08\u8D44\u6599\u8FB9\u754C/\u9A8C\u6536\u6807\u51C6\uFF09\u4E0D\u591F\u5177\u4F53\uFF0C\u5EFA\u8BAE\u6309\u4E03\u9879\u91CF\u8868\u9010\u6761\u8865\u5168\u3002";
  }
  if (total >= maxScore * 0.25) {
    return "\u63D0\u793A\u8BCD\u53EA\u8986\u76D6\u5C11\u91CF\u8981\u7D20\uFF0CAI \u5927\u6982\u7387\u9700\u8981\u5927\u91CF\u731C\u6D4B\uFF0C\u5EFA\u8BAE\u91CD\u65B0\u7EC4\u7EC7\uFF0C\u6309\u4E03\u9879\u91CF\u8868\u91CD\u5199\u3002";
  }
  return "\u63D0\u793A\u8BCD\u8FC7\u4E8E\u7B3C\u7EDF\uFF0C\u7F3A\u5C11\u4EFB\u52A1\u8BF4\u660E\u7684\u6838\u5FC3\u8981\u7D20\uFF0C\u5EFA\u8BAE\u5148\u7528\u4E03\u9879\u91CF\u8868\u642D\u9AA8\u67B6\u518D\u586B\u5145\u3002";
}
function analyzePrompt(promptText, role) {
  const text = String(promptText || "").trim();
  if (text.length < 30) throw new Error("\u63D0\u793A\u8BCD\u957F\u5EA6\u4E0D\u8DB330\u5B57");
  const evaluations = {};
  const scores = {};
  const evidence = {};
  const suggestions = {};
  for (const key of RUBRIC_KEYS) {
    const config = DIMENSION_CONFIG[key];
    const result = evaluateDimension(text, config);
    evaluations[key] = result;
    scores[key] = result.score;
    evidence[key] = { score: result.score, evidence: result.evidence };
    suggestions[key] = result.suggestions;
  }
  return {
    rubric: evaluations,
    scores,
    summary: generateSummary(evaluations),
    strengths: generateStrengths(evaluations),
    risks: generateRisks(evaluations),
    improvements: generateImprovements(evaluations),
    upgradedPrompt: buildUpgradedPrompt(text, evaluations, role),
    nextActions: generateNextActions(evaluations)
  };
}

// lib/deepseek.mjs
var RUBRIC_KEYS2 = [
  "audience",
  "purpose",
  "inputs",
  "process",
  "output",
  "constraints",
  "acceptance"
];
function extractJson(text) {
  if (!text) throw new Error("empty model output");
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("invalid JSON output");
    return JSON.parse(match[0]);
  }
}
function parseDeepSeekAnalysis(text) {
  const parsed = extractJson(text);
  const rubric = parsed?.rubric;
  if (!rubric || typeof rubric !== "object") throw new Error("invalid rubric");
  const scores = {};
  const normalizedRubric = {};
  for (const key of RUBRIC_KEYS2) {
    const item = rubric[key];
    const score = Number(item?.score);
    if (!item || !Number.isInteger(score) || score < 0 || score > 3) {
      throw new Error(`invalid rubric: ${key}`);
    }
    scores[key] = score;
    normalizedRubric[key] = {
      score,
      evidence: String(item.evidence || "\u672A\u5728\u539F\u6587\u4E2D\u627E\u5230\u660E\u786E\u8BC1\u636E").slice(0, 160)
    };
  }
  const strengths = Array.isArray(parsed.strengths) ? parsed.strengths.map(String).slice(0, 3) : [];
  const risks = Array.isArray(parsed.risks) ? parsed.risks.map(String).slice(0, 3) : [];
  const nextActions = Array.isArray(parsed.nextActions) ? parsed.nextActions.map(String).slice(0, 3) : [];
  if (!String(parsed.upgradedPrompt || "").trim()) throw new Error("invalid upgraded prompt");
  return {
    rubric: normalizedRubric,
    scores,
    summary: String(parsed.summary || "\u5DF2\u5B8C\u6210\u63D0\u793A\u8BCD\u7ED3\u6784\u5206\u6790").slice(0, 240),
    strengths,
    risks,
    upgradedPrompt: String(parsed.upgradedPrompt).slice(0, 4e3),
    nextActions
  };
}

// lib/remote-analysis.mjs
var ANALYSIS_ENDPOINT = "https://eyzcleghbczxxptdwlkq.supabase.co/functions/v1/ai-assessment-analyze";
var CLIENT_ID_KEY = "ai-assessment:analysis-client-id";
function randomClientId() {
  return globalThis.crypto.randomUUID().replaceAll("-", "");
}
function getOrCreateAnalysisClientId(storage, createId = randomClientId) {
  const current = String(storage?.getItem?.(CLIENT_ID_KEY) || "");
  if (/^[a-z0-9_-]{16,80}$/i.test(current)) return current;
  const created = String(createId());
  if (!/^[a-z0-9_-]{16,80}$/i.test(created)) {
    throw new Error("invalid analysis client identifier");
  }
  storage?.setItem?.(CLIENT_ID_KEY, created);
  return created;
}
async function analyzePromptRemotely({
  promptText,
  clientId,
  endpoint = ANALYSIS_ENDPOINT,
  fetcher = fetch
}) {
  try {
    const normalizedPrompt = String(promptText || "").trim();
    if (normalizedPrompt.length < 30 || normalizedPrompt.length > 2e3) {
      throw new Error("invalid prompt length");
    }
    if (!/^[a-z0-9_-]{16,80}$/i.test(String(clientId || ""))) {
      throw new Error("invalid client identifier");
    }
    const response = await fetcher(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-assessment-client": clientId
      },
      body: JSON.stringify({ promptText: normalizedPrompt })
    });
    if (!response.ok) throw new Error(`analysis endpoint ${response.status}`);
    const payload = await response.json();
    if (!payload?.ok || !payload?.analysis) throw new Error("invalid analysis response");
    return {
      status: "complete",
      attempts: Number(payload.attempts) || 1,
      analysis: parseDeepSeekAnalysis(JSON.stringify(payload.analysis))
    };
  } catch {
    return {
      status: "failed",
      attempts: 1,
      error: "AI analysis is temporarily unavailable"
    };
  }
}

// lib/local-store.mjs
var STORAGE_KEYS = {
  sessions: "ai-assessment:sessions",
  submissions: "ai-assessment:submissions",
  loginAttempts: "ai-assessment:login-attempts",
  adminToken: "ai-assessment-admin-token",
  adminCode: "ai-assessment:admin-code"
};
var DEFAULT_ADMIN_CODE = "teacher2026";
function read(key) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function write(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}
function getSessions() {
  return read(STORAGE_KEYS.sessions);
}
function getSessionById(id) {
  return getSessions().find((s) => s.id === id) || null;
}
function getSessionByCode(code) {
  return getSessions().find((s) => s.code === code.toUpperCase()) || null;
}
function saveSession(session) {
  const sessions = getSessions();
  const index = sessions.findIndex((s) => s.id === session.id);
  if (index >= 0) {
    sessions[index] = { ...sessions[index], ...session };
  } else {
    sessions.unshift(session);
  }
  write(STORAGE_KEYS.sessions, sessions);
  return session;
}
function deleteSessionById(id) {
  const sessions = getSessions().filter((s) => s.id !== id);
  write(STORAGE_KEYS.sessions, sessions);
  const submissions = getSubmissions().filter((s) => s.sessionId !== id);
  write(STORAGE_KEYS.submissions, submissions);
}
function getSubmissions() {
  return read(STORAGE_KEYS.submissions);
}
function getSubmissionsBySession(sessionId) {
  return getSubmissions().filter((s) => s.sessionId === sessionId).sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
}
function getSubmissionByToken(token) {
  return getSubmissions().find((s) => s.reportToken === token) || null;
}
function getSubmissionById(id) {
  return getSubmissions().find((s) => s.id === id) || null;
}
function saveSubmission(submission) {
  const submissions = getSubmissions();
  const index = submissions.findIndex((s) => s.id === submission.id);
  if (index >= 0) {
    submissions[index] = { ...submissions[index], ...submission };
  } else {
    submissions.unshift(submission);
  }
  write(STORAGE_KEYS.submissions, submissions);
  return submission;
}
function findSubmissionByIdempotency(sessionId, idempotencyKey) {
  return getSubmissions().find(
    (s) => s.sessionId === sessionId && s.idempotencyKey === idempotencyKey
  ) || null;
}
function getLoginAttempt(ipHash) {
  return read(STORAGE_KEYS.loginAttempts).find((a) => a.ipHash === ipHash) || null;
}
function saveLoginAttempt(attempt) {
  const attempts = read(STORAGE_KEYS.loginAttempts);
  const index = attempts.findIndex((a) => a.ipHash === attempt.ipHash);
  if (index >= 0) {
    attempts[index] = attempt;
  } else {
    attempts.push(attempt);
  }
  write(STORAGE_KEYS.loginAttempts, attempts);
}
function clearLoginAttempt(ipHash) {
  const attempts = read(STORAGE_KEYS.loginAttempts).filter((a) => a.ipHash !== ipHash);
  write(STORAGE_KEYS.loginAttempts, attempts);
}
function getAdminCode() {
  if (typeof window === "undefined") return DEFAULT_ADMIN_CODE;
  return window.localStorage.getItem(STORAGE_KEYS.adminCode) || DEFAULT_ADMIN_CODE;
}
function generateId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}
function generateSessionCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = typeof crypto !== "undefined" && "getRandomValues" in crypto ? crypto.getRandomValues(new Uint8Array(6)) : Array.from({ length: 6 }, () => Math.floor(Math.random() * 256));
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
}
function generateReportToken() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, "").slice(0, 43);
  }
  return Array.from(
    { length: 43 },
    () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(
      Math.floor(Math.random() * 64)
    )
  ).join("");
}

// supabase/functions/ai-assessment-api/_shared/core.mjs
var encoder = new TextEncoder();
function countBy(rows, codeKey, nameKey) {
  const counts = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const code = String(row[codeKey] || "");
    if (!code) continue;
    const key = `${code} ${String(row[nameKey] || "")}`.trim();
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return Object.fromEntries(counts);
}
function dominant(distribution) {
  return Object.entries(distribution).reduce((winner, entry) => entry[1] > (winner?.[1] || 0) ? entry : winner, null)?.[0] || "";
}
function summarizeDashboard(rows) {
  const total = rows.length;
  const scoredRows = rows.filter((row) => row.total_score !== null && row.total_score !== void 0);
  const scoredTotal = scoredRows.length;
  const dimensionIds = ["scene", "task", "data", "collaboration", "verification", "agent"];
  const levelDistribution = countBy(scoredRows, "level_code", "level_name");
  const styleDistribution = countBy(rows, "style_code", "style_name");
  const dimensionAverages = Object.fromEntries(dimensionIds.map((id) => [id, scoredTotal ? Math.round(scoredRows.reduce((sum, row) => sum + Number(row.dimension_scores?.[id] || 0), 0) / scoredTotal) : 0]));
  return {
    total,
    scoredTotal,
    averageScore: scoredTotal ? Math.round(scoredRows.reduce((sum, row) => sum + Number(row.total_score), 0) / scoredTotal) : 0,
    dominantLevel: dominant(levelDistribution),
    dominantStyle: dominant(styleDistribution),
    dimensionAverages,
    levelDistribution,
    styleDistribution
  };
}
function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
function buildCsv(rows) {
  const headers = ["\u59D3\u540D", "\u5C97\u4F4D", "\u7EFC\u5408\u5206", "\u6210\u957F\u7B49\u7EA7", "\u98CE\u683C\u4EE3\u7801", "\u98CE\u683C\u540D\u79F0", "AI\u70B9\u8BC4\u72B6\u6001", "\u5F00\u653E\u9898\u539F\u6587", "\u63D0\u4EA4\u65F6\u95F4"];
  const lines = rows.map((row) => [row.participant_name, row.participant_role, row.total_score, row.level_name, row.style_code, row.style_name, row.ai_status, row.open_prompt, row.submitted_at].map(csvCell).join(","));
  return `\uFEFF${[headers.join(","), ...lines].join("\r\n")}`;
}

// lib/local-api.mjs
function sessionJson(session) {
  const submissions = getSubmissionsBySession(session.id);
  return {
    id: session.id,
    code: session.code,
    title: session.title,
    cohort: session.cohort,
    status: session.status,
    assessmentVersion: session.assessmentVersion || ASSESSMENT_VERSION,
    createdAt: session.createdAt,
    submissionCount: submissions.length
  };
}
function publicReport(submission, session) {
  return {
    assessmentVersion: session.assessmentVersion || ASSESSMENT_VERSION,
    participant: { name: submission.participantName, role: submission.participantRole },
    session: { title: session.title, cohort: session.cohort },
    aiStatus: submission.aiStatus,
    aiEngine: submission.aiEngine || "heuristic",
    analysis: submission.analysis,
    scores: {
      choiceScore: submission.choiceScore,
      openScore: submission.openScore,
      rawTotalScore: submission.rawTotalScore,
      projectBonus: submission.projectBonus || 0,
      projectUpgrade: submission.projectUpgrade || { applied: false, eligible: false, levels: 0 },
      sectionScores: submission.sectionScores || {},
      totalScore: submission.totalScore,
      dimensions: submission.dimensionScores,
      level: { code: submission.levelCode, name: submission.levelName },
      style: submission.styleData
    }
  };
}
function validateAnswerValues(answerValues, questionList) {
  const items = questionList || getQuestionsForRole("teacher");
  if (!Array.isArray(answerValues) || answerValues.length !== items.length) {
    throw new Error(`\u8BF7\u5B8C\u6210\u5168\u90E8 ${items.length} \u9053\u9009\u62E9\u9898`);
  }
  for (let i = 0; i < items.length; i++) {
    const question = items[i];
    const value = answerValues[i];
    const ids = Array.isArray(value) ? value : [value];
    const invalid = ids.length === 0 || question.kind !== "multi" && ids.length !== 1 || ids.some((id) => typeof id !== "string" || !question.options.some((option) => option.id === id));
    if (invalid) {
      throw new Error("\u7B54\u5377\u9009\u9879\u65E0\u6548\uFF0C\u8BF7\u5237\u65B0\u540E\u91CD\u65B0\u586B\u5199");
    }
  }
}
function assertSubmission(body) {
  const payload = body && typeof body === "object" ? body : {};
  if (!Array.isArray(payload.answers) || payload.answers.length === 0 || payload.answers.some((answer) => {
    if (Array.isArray(answer)) return answer.length === 0 || answer.some((id) => typeof id !== "string" || !id);
    return typeof answer !== "string" || !answer;
  })) {
    throw new Error("\u8BF7\u5B8C\u6210\u5168\u90E8\u9009\u62E9\u9898");
  }
  const openPrompt = String(payload.openPrompt || "").trim();
  if (openPrompt.length < 30) throw new Error("\u5F00\u653E\u9898\u63D0\u793A\u8BCD\u81F3\u5C1130\u5B57");
  if (openPrompt.length > 2e3) throw new Error("\u5F00\u653E\u9898\u63D0\u793A\u8BCD\u4E0D\u80FD\u8D85\u8FC72000\u5B57");
  const participantName = String(payload.participantName || "").trim().slice(0, 30);
  const participantRole = String(payload.participantRole || "").trim().slice(0, 30);
  if (!participantName) throw new Error("\u8BF7\u586B\u5199\u59D3\u540D");
  if (!participantRole) throw new Error("\u8BF7\u9009\u62E9\u5C97\u4F4D");
  const idempotencyKey = String(payload.idempotencyKey || "").trim();
  if (idempotencyKey.length < 3 || idempotencyKey.length > 100) throw new Error("\u63D0\u4EA4\u6807\u8BC6\u65E0\u6548");
  const sessionCode = String(payload.sessionCode || "").trim().toUpperCase();
  if (!/^[A-Z0-9]{6}$/.test(sessionCode)) throw new Error("\u573A\u6B21\u7801\u65E0\u6548");
  return { sessionCode, participantName, participantRole, answers: payload.answers, openPrompt, idempotencyKey };
}
var TOKEN_KEY = "ai-assessment:admin-tokens";
function getTokens() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(TOKEN_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveTokens(tokens) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
}
function createToken() {
  const token = generateId() + generateId();
  const tokens = getTokens();
  tokens.push({ token, createdAt: Date.now(), expiresAt: Date.now() + 8 * 3600 * 1e3 });
  saveTokens(tokens);
  return token;
}
function verifyToken(token) {
  if (!token) return false;
  const tokens = getTokens();
  const found = tokens.find((t) => t.token === token);
  if (!found) return false;
  if (Date.now() > found.expiresAt) {
    saveTokens(tokens.filter((t) => t.token !== token));
    return false;
  }
  return true;
}
async function runAnalysis(submission) {
  const questionList = getQuestionsForRole(submission.roleKey || "teacher");
  let analysisResult = null;
  let engine = "heuristic";
  if (typeof window !== "undefined") {
    try {
      const ds = await analyzePromptRemotely({
        promptText: submission.openPrompt,
        clientId: getOrCreateAnalysisClientId(window.localStorage)
      });
      if (ds.status === "complete") {
        analysisResult = ds.analysis;
        engine = "deepseek";
        submission.aiAttempts = ds.attempts;
      } else {
        submission.aiError = ds.error;
      }
    } catch (error2) {
      submission.aiError = error2 instanceof Error ? error2.message : String(error2);
    }
  }
  if (!analysisResult) {
    try {
      analysisResult = analyzePrompt(submission.openPrompt, submission.roleKey || "teacher");
      engine = "heuristic";
    } catch (error2) {
      submission.aiStatus = "failed";
      submission.aiError = error2 instanceof Error ? error2.message : String(error2);
      saveSubmission(submission);
      throw new Error("\u7B54\u5377\u5DF2\u4FDD\u5B58\uFF0CAI \u70B9\u8BC4\u6682\u65F6\u5931\u8D25\uFF0C\u6559\u5E08\u53EF\u4EE5\u7A0D\u540E\u91CD\u8BD5");
    }
  }
  const scores = scoreAssessment(submission.answers, analysisResult.scores, questionList);
  submission.aiStatus = "complete";
  submission.aiEngine = engine;
  submission.analysis = analysisResult;
  submission.choiceScore = scores.choiceScore;
  submission.openScore = scores.openScore;
  submission.rawTotalScore = scores.rawTotalScore;
  submission.projectBonus = scores.projectBonus;
  submission.projectUpgrade = scores.projectUpgrade;
  submission.sectionScores = scores.sectionScores;
  submission.totalScore = scores.totalScore;
  submission.levelCode = scores.level.code;
  submission.levelName = scores.level.name;
  submission.dimensionScores = scores.dimensions;
  saveSubmission(submission);
  return submission;
}
function ok(body, status = 200) {
  return { ok: true, status, body };
}
function error(message, status = 400) {
  return { ok: false, status, body: { error: message } };
}
async function handleLocalApi(method, path, body = {}, headers = {}) {
  if (method === "GET" && path === "/health") {
    return ok({
      ok: true,
      version: ASSESSMENT_VERSION,
      aiEngine: "deepseek",
      aiConfigured: true,
      fallbackEngine: "heuristic"
    });
  }
  if (method === "GET" && path.startsWith("/session/")) {
    const code = decodeURIComponent(path.slice("/session/".length)).toUpperCase();
    const session = getSessionByCode(code);
    if (!session) return error("\u6CA1\u6709\u627E\u5230\u8FD9\u4E2A\u6D4B\u8BC4\u573A\u6B21", 404);
    if (session.status !== "open") return error("\u672C\u573A\u6D4B\u8BC4\u5DF2\u7ECF\u5173\u95ED", 409);
    return ok({ session: sessionJson(session) });
  }
  if (method === "POST" && path === "/submit") {
    let payload;
    try {
      payload = assertSubmission(body);
      const role = String(body?.participantRoleKey || "teacher");
      const questionList2 = getQuestionsForRole(role);
      validateAnswerValues(payload.answers, questionList2);
    } catch (err) {
      return error(err instanceof Error ? err.message : "\u7B54\u5377\u65E0\u6548", 400);
    }
    const session = getSessionByCode(payload.sessionCode);
    if (!session) return error("\u6CA1\u6709\u627E\u5230\u8FD9\u4E2A\u6D4B\u8BC4\u573A\u6B21", 404);
    if (session.status !== "open") return error("\u672C\u573A\u6D4B\u8BC4\u5DF2\u7ECF\u5173\u95ED\uFF0C\u4E0D\u80FD\u7EE7\u7EED\u63D0\u4EA4", 409);
    const existing = findSubmissionByIdempotency(session.id, payload.idempotencyKey);
    if (existing) {
      return ok({ reportToken: existing.reportToken, aiStatus: existing.aiStatus }, 200);
    }
    const roleKey = String(body?.participantRoleKey || "teacher");
    const questionList = getQuestionsForRole(roleKey);
    const style = scoreStyle(payload.answers, questionList);
    const submission = {
      id: generateId(),
      sessionId: session.id,
      reportToken: generateReportToken(),
      participantName: payload.participantName,
      participantRole: payload.participantRole,
      roleKey,
      answers: payload.answers,
      openPrompt: payload.openPrompt,
      idempotencyKey: payload.idempotencyKey,
      styleCode: style.code,
      styleName: style.name,
      styleData: style,
      aiStatus: "pending",
      aiEngine: "pending",
      aiAttempts: 0,
      submittedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    saveSubmission(submission);
    return ok({ reportToken: submission.reportToken, aiStatus: "pending" }, 201);
  }
  if (method === "GET" && path.startsWith("/report/") && !path.endsWith("/analyze")) {
    const token = decodeURIComponent(path.slice("/report/".length));
    const submission = getSubmissionByToken(token);
    if (!submission) return error("\u62A5\u544A\u94FE\u63A5\u65E0\u6548\u6216\u5DF2\u88AB\u5220\u9664", 404);
    const session = getSessionById(submission.sessionId);
    if (!session) return error("\u573A\u6B21\u4E0D\u5B58\u5728", 404);
    return ok({ report: publicReport(submission, session) });
  }
  if (method === "POST" && path.startsWith("/report/") && path.endsWith("/analyze")) {
    const token = decodeURIComponent(path.slice("/report/".length, -"/analyze".length));
    const submission = getSubmissionByToken(token);
    if (!submission) return error("\u62A5\u544A\u94FE\u63A5\u65E0\u6548\u6216\u5DF2\u88AB\u5220\u9664", 404);
    if (submission.aiStatus === "complete") {
      return ok({ aiStatus: "complete" });
    }
    try {
      await runAnalysis(submission);
      return ok({ aiStatus: "complete" });
    } catch (err) {
      return ok({ aiStatus: "failed" }, 200);
    }
  }
  if (method === "POST" && path === "/admin/login") {
    const ipHash = "local-" + (typeof window !== "undefined" ? window.location.hostname : "local");
    const attempt = getLoginAttempt(ipHash);
    if (attempt?.blockedUntil && new Date(attempt.blockedUntil) > /* @__PURE__ */ new Date()) {
      return error("\u5C1D\u8BD5\u6B21\u6570\u8FC7\u591A\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5", 429);
    }
    const accessCode = String(body?.accessCode || "");
    const expectedCode = getAdminCode();
    if (accessCode !== expectedCode) {
      const currentAttempts = (attempt?.attempts || 0) + 1;
      const shouldBlock = currentAttempts >= 5;
      saveLoginAttempt({
        ipHash,
        windowStartedAt: attempt?.windowStartedAt || (/* @__PURE__ */ new Date()).toISOString(),
        attempts: currentAttempts,
        blockedUntil: shouldBlock ? new Date(Date.now() + 15 * 60 * 1e3).toISOString() : null
      });
      return error(
        shouldBlock ? "\u5C1D\u8BD5\u6B21\u6570\u8FC7\u591A\uFF0C\u8BF715\u5206\u949F\u540E\u518D\u8BD5" : "\u6559\u5E08\u53E3\u4EE4\u4E0D\u6B63\u786E",
        shouldBlock ? 429 : 401
      );
    }
    clearLoginAttempt(ipHash);
    const token = createToken();
    return ok({ token });
  }
  const authHeader = String(headers?.authorization || "").replace(/^Bearer\s+/i, "");
  const isAdmin = verifyToken(authHeader);
  if (path.startsWith("/admin") && !isAdmin) {
    return error("\u6559\u5E08\u767B\u5F55\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55", 401);
  }
  if (method === "GET" && path === "/admin/sessions") {
    const sessions = getSessions().map(sessionJson);
    return ok({ sessions });
  }
  if (method === "POST" && path === "/admin/sessions") {
    const title = String(body?.title || "").trim().slice(0, 60);
    const cohort = String(body?.cohort || "").trim().slice(0, 60);
    if (!title) return error("\u8BF7\u586B\u5199\u573A\u6B21\u540D\u79F0", 400);
    const session = {
      id: generateId(),
      code: generateSessionCode(),
      title,
      cohort,
      status: "open",
      assessmentVersion: ASSESSMENT_VERSION,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      closedAt: null
    };
    saveSession(session);
    return ok({ session: sessionJson(session) }, 201);
  }
  if (method === "PATCH" && path.startsWith("/admin/sessions/") && !path.includes("/dashboard") && !path.includes("/export")) {
    const id = decodeURIComponent(path.slice("/admin/sessions/".length));
    const status = body?.status;
    if (!["open", "closed"].includes(status)) return error("\u573A\u6B21\u72B6\u6001\u65E0\u6548", 400);
    const session = getSessionById(id);
    if (!session) return error("\u573A\u6B21\u4E0D\u5B58\u5728", 404);
    session.status = status;
    session.closedAt = status === "closed" ? (/* @__PURE__ */ new Date()).toISOString() : null;
    saveSession(session);
    return ok({ session: sessionJson(session) });
  }
  if (method === "DELETE" && path.startsWith("/admin/sessions/") && !path.includes("/dashboard") && !path.includes("/export")) {
    const id = decodeURIComponent(path.slice("/admin/sessions/".length));
    const session = getSessionById(id);
    if (!session) return error("\u573A\u6B21\u4E0D\u5B58\u5728", 404);
    deleteSessionById(id);
    return ok({}, 204);
  }
  if (method === "GET" && path.startsWith("/admin/sessions/") && path.endsWith("/dashboard")) {
    const id = decodeURIComponent(path.slice("/admin/sessions/".length, -"/dashboard".length));
    const session = getSessionById(id);
    if (!session) return error("\u573A\u6B21\u4E0D\u5B58\u5728", 404);
    const rows = getSubmissionsBySession(id);
    const mappedRows = rows.map((r) => ({
      participant_name: r.participantName,
      participant_role: r.participantRole,
      total_score: r.totalScore,
      level_code: r.levelCode,
      level_name: r.levelName,
      style_code: r.styleCode,
      style_name: r.styleName,
      ai_status: r.aiStatus,
      submitted_at: r.submittedAt,
      report_token: r.reportToken,
      id: r.id,
      dimension_scores: r.dimensionScores,
      open_prompt: r.openPrompt
    }));
    const summary = summarizeDashboard(mappedRows);
    const ordered = dimensions.map((item) => ({ label: item.label, score: summary.dimensionAverages[item.id] || 0 })).sort((a, b) => b.score - a.score);
    summary.commonStrengths = ordered.slice(0, 2);
    summary.commonGaps = [...ordered].reverse().slice(0, 2);
    return ok({
      dashboard: {
        session: sessionJson(session),
        summary,
        submissions: rows.map((r) => ({
          id: r.id,
          participantName: r.participantName,
          participantRole: r.participantRole,
          roleKey: r.roleKey,
          levelCode: r.levelCode,
          levelName: r.levelName,
          styleCode: r.styleCode,
          styleName: r.styleName,
          aiStatus: r.aiStatus,
          aiEngine: r.aiEngine,
          submittedAt: r.submittedAt,
          reportToken: r.reportToken
        }))
      }
    });
  }
  if (method === "POST" && path.startsWith("/admin/submissions/") && path.endsWith("/retry")) {
    const id = decodeURIComponent(path.slice("/admin/submissions/".length, -"/retry".length));
    const submission = getSubmissionById(id);
    if (!submission) return error("\u7B54\u5377\u4E0D\u5B58\u5728", 404);
    submission.aiStatus = "pending";
    saveSubmission(submission);
    try {
      await runAnalysis(submission);
      return ok({ aiStatus: "complete" });
    } catch (err) {
      return ok({ aiStatus: "failed" });
    }
  }
  if (method === "GET" && path.startsWith("/admin/sessions/") && path.endsWith("/export")) {
    const id = decodeURIComponent(path.slice("/admin/sessions/".length, -"/export".length));
    const rows = getSubmissionsBySession(id);
    const mappedRows = rows.map((r) => ({
      participant_name: r.participantName,
      participant_role: r.participantRole,
      total_score: r.totalScore,
      level_name: r.levelName,
      style_code: r.styleCode,
      style_name: r.styleName,
      ai_status: r.aiStatus,
      ai_engine: r.aiEngine,
      open_prompt: r.openPrompt,
      submitted_at: r.submittedAt
    }));
    return ok({ csv: buildCsv(mappedRows), isCsv: true });
  }
  return error("\u63A5\u53E3\u4E0D\u5B58\u5728", 404);
}

// lib/api.mjs
async function apiRequest(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  let body = {};
  if (options.body) {
    try {
      body = typeof options.body === "string" ? JSON.parse(options.body) : options.body;
    } catch {
      body = {};
    }
  }
  const headers = { ...options.headers || {} };
  const admin = adminHeaders();
  for (const key of Object.keys(admin)) {
    if (!headers[key]) headers[key] = admin[key];
  }
  const result = await handleLocalApi(method, path, body, headers);
  if (!result.ok) {
    throw new Error(result.body?.error || `\u8BF7\u6C42\u5931\u8D25\uFF08${result.status}\uFF09`);
  }
  if (result.body?.isCsv) {
    return { csv: result.body.csv };
  }
  return result.body || {};
}
function adminHeaders() {
  if (typeof window === "undefined") return {};
  const token = window.sessionStorage.getItem("ai-assessment-admin-token");
  return token ? { authorization: `Bearer ${token}` } : {};
}
async function downloadCsv(path, filename) {
  const result = await apiRequest(path, { headers: adminHeaders() });
  if (!result.csv) throw new Error("\u5BFC\u51FA\u5931\u8D25");
  const csv = result.csv;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

// app/components/ReportView.tsx
const { useRef, useState } = window.React;
const { toPng } = window.htmlToImage || { toPng: function(n) { return Promise.resolve("data:,"); } };
const {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer
} = {};
// app/components/StyleAtlas.tsx
const { jsx, jsxs } = { jsx: function(type, props, key) { if (key !== undefined) { props = Object.assign({}, props, { key: String(key) }); } return React.createElement(type, props); }, jsxs: function(type, props, key) { if (key !== undefined) { props = Object.assign({}, props, { key: String(key) }); } return React.createElement(type, props); }, Fragment: React.Fragment };
function StyleAtlas({ open, onClose, activeCode = "" }) {
  if (!open) return null;
  return /* @__PURE__ */ jsx("div", { className: "atlas-backdrop", role: "dialog", "aria-modal": "true", "aria-label": "AI\u4F7F\u7528\u98CE\u683C\u753B\u50CF\u5927\u5168", onMouseDown: (event) => {
    if (event.currentTarget === event.target) onClose();
  }, children: /* @__PURE__ */ jsxs("section", { className: "atlas-panel", children: [
    /* @__PURE__ */ jsxs("header", { className: "atlas-header", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "3 AXES \xB7 8 STYLES" }),
        /* @__PURE__ */ jsx("h2", { children: "AI\u4F7F\u7528\u98CE\u683C\u753B\u50CF\u5927\u5168" }),
        /* @__PURE__ */ jsx("p", { children: "\u98CE\u683C\u7531\u4E09\u6761\u503E\u5411\u8F74\u7EC4\u5408\u800C\u6210\uFF1A\u63A2\u7D22 E / \u6267\u884C D\u3001\u59D4\u6D3E A / \u5171\u521B C\u3001\u654F\u6377 F / \u5BA1\u614E V\u3002" })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", className: "atlas-close", onClick: onClose, "aria-label": "\u5173\u95ED\u98CE\u683C\u753B\u50CF\u5927\u5168", children: "\xD7" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "atlas-axis-legend", children: [
      /* @__PURE__ */ jsx("span", { children: "\u63A2\u7D22 E / \u6267\u884C D" }),
      /* @__PURE__ */ jsx("span", { children: "\u59D4\u6D3E A / \u5171\u521B C" }),
      /* @__PURE__ */ jsx("span", { children: "\u654F\u6377 F / \u5BA1\u614E V" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "atlas-grid", children: Object.entries(styleProfiles).map(([code, profile]) => /* @__PURE__ */ jsxs("article", { className: `atlas-card ${activeCode === code ? "active" : ""}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "atlas-card-title", children: [
        /* @__PURE__ */ jsx("span", { children: code }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { children: profile.name }),
          /* @__PURE__ */ jsx("p", { children: profile.tagline })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("dl", { children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { children: "\u64C5\u957F" }),
          /* @__PURE__ */ jsx("dd", { children: profile.strengths.join(" \xB7 ") })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { children: "\u7559\u610F" }),
          /* @__PURE__ */ jsx("dd", { children: profile.risks.join(" \xB7 ") })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { children: "\u9002\u5408" }),
          /* @__PURE__ */ jsx("dd", { children: profile.bestTasks.join(" \xB7 ") })
        ] })
      ] }),
      activeCode === code && /* @__PURE__ */ jsx("strong", { className: "atlas-current", children: "\u4F60\u7684\u5F53\u524D\u98CE\u683C" })
    ] }, code)) }),
    /* @__PURE__ */ jsx("footer", { className: "atlas-footer", children: "\u98CE\u683C\u6CA1\u6709\u9AD8\u4F4E\u4E4B\u5206\u3002\u5B83\u662F\u8BFE\u7A0B\u8D77\u70B9\u753B\u50CF\uFF0C\u4E0D\u662F\u6807\u51C6\u5316\u5FC3\u7406\u6D4B\u9A8C\u3002" })
  ] }) });
}

// app/components/ReportView.tsx
const { Fragment, jsx: jsx2, jsxs: jsxs2 } = { jsx: function(type, props, key) { if (key !== undefined) { props = Object.assign({}, props, { key: String(key) }); } return React.createElement(type, props); }, jsxs: function(type, props, key) { if (key !== undefined) { props = Object.assign({}, props, { key: String(key) }); } return React.createElement(type, props); }, Fragment: React.Fragment };
var rubricLabels = {
  audience: "\u5BF9\u8C61",
  purpose: "\u76EE\u7684",
  inputs: "\u8F93\u5165\u8D44\u6599",
  process: "\u6267\u884C\u65B9\u5F0F",
  output: "\u8F93\u51FA\u683C\u5F0F",
  constraints: "\u9650\u5236\u8FB9\u754C",
  acceptance: "\u9A8C\u6536\u6807\u51C6"
};
function ReportView({ report, message = "" }) {
  const reportRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [showAtlas, setShowAtlas] = useState(false);
  const radarData = dimensions.map((dimension) => ({
    subject: dimension.label.replace("\u529B", ""),
    value: report.scores?.dimensions?.[dimension.id] || 0,
    fullMark: 100
  }));
  async function downloadReport() {
    if (!reportRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(reportRef.current, {
        width: 1080,
        pixelRatio: 1,
        cacheBust: true,
        backgroundColor: "#f4f0e6",
        style: { width: "1080px", maxWidth: "1080px" }
      });
      const link = document.createElement("a");
      link.download = `${report.participant?.name || "\u5B66\u5458"}-AI\u80FD\u529B\u4E0E\u98CE\u683C\u753B\u50CF.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
    }
  }
  const analysis = report.analysis;
  const style = report.scores?.style || {};
  const projectBonus = report.scores?.projectBonus || 0;
  const projectUpgrade = report.scores?.projectUpgrade || {};
  return /* @__PURE__ */ jsxs2("main", { className: "report-page", children: [
    /* @__PURE__ */ jsxs2("div", { className: "report-toolbar", children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2("span", { className: "brand-mark", children: "AI" }),
        /* @__PURE__ */ jsx2("strong", { children: "\u4E2A\u4EBA\u6210\u957F\u753B\u50CF" })
      ] }),
      /* @__PURE__ */ jsxs2("div", { className: "report-toolbar-actions", children: [
        /* @__PURE__ */ jsx2("button", { className: "text-button", onClick: () => setShowAtlas(true), children: "\u67E5\u770B8\u578B\u98CE\u683C\u5927\u5168" }),
        /* @__PURE__ */ jsx2("button", { className: "primary-button small", onClick: () => void downloadReport(), disabled: downloading, children: downloading ? "\u6B63\u5728\u751F\u6210\u2026" : "\u4E0B\u8F7D\u62A5\u544A\u957F\u56FE" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "report-sheet", ref: reportRef, children: [
      /* @__PURE__ */ jsxs2("header", { className: "report-hero", children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsxs2("p", { className: "eyebrow", children: [
            "AI\u80FD\u529B\u4E0E\u98CE\u683C\u6D4B\u8BC4 \xB7 ",
            report.assessmentVersion || "ASSESSMENT-V1"
          ] }),
          /* @__PURE__ */ jsxs2("h1", { children: [
            report.participant?.name,
            "\uFF0C\u4F60\u7684 AI \u5DE5\u4F5C\u65B9\u5F0F\u753B\u50CF"
          ] }),
          /* @__PURE__ */ jsxs2("p", { children: [
            report.session?.title,
            " \xB7 ",
            report.participant?.role
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "score-ring", children: [
          /* @__PURE__ */ jsx2("strong", { children: report.scores?.totalScore ?? "\u2014" }),
          /* @__PURE__ */ jsx2("span", { children: "\u7EFC\u5408\u80FD\u529B" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("section", { className: "report-summary-grid", children: [
        /* @__PURE__ */ jsxs2("article", { className: "level-panel", children: [
          /* @__PURE__ */ jsx2("p", { className: "panel-label", children: "\u5F53\u524D\u6210\u957F\u7B49\u7EA7" }),
          /* @__PURE__ */ jsx2("span", { className: "level-code", children: report.scores?.level?.code }),
          /* @__PURE__ */ jsx2("h2", { children: report.scores?.level?.name || "\u7ED3\u679C\u751F\u6210\u4E2D" }),
          /* @__PURE__ */ jsx2("p", { children: analysis?.summary || "\u5F00\u653E\u9898\u70B9\u8BC4\u6682\u672A\u751F\u6210\uFF0C\u4F60\u7684\u7B54\u5377\u5DF2\u7ECF\u4FDD\u5B58\uFF0C\u6559\u5E08\u53EF\u4EE5\u7A0D\u540E\u91CD\u65B0\u751F\u6210\u3002" })
        ] }),
        /* @__PURE__ */ jsxs2("article", { className: "style-panel", children: [
          /* @__PURE__ */ jsx2("p", { className: "panel-label", children: "AI \u4F7F\u7528\u98CE\u683C" }),
          /* @__PURE__ */ jsx2("span", { className: "style-code", children: style.code }),
          /* @__PURE__ */ jsx2("h2", { children: style.name }),
          /* @__PURE__ */ jsx2("p", { children: style.tagline || style.strength }),
          /* @__PURE__ */ jsx2("div", { className: "style-axes", children: (style.axisDetails || []).map((item) => /* @__PURE__ */ jsxs2("span", { children: [
            item.tendency,
            " \xB7 ",
            item.strength
          ] }, item.axis)) })
        ] })
      ] }),
      (projectBonus > 0 || projectUpgrade.eligible) && /* @__PURE__ */ jsxs2("section", { className: "report-section score-notes", children: [
        projectBonus > 0 && /* @__PURE__ */ jsxs2("article", { children: [
          /* @__PURE__ */ jsxs2("span", { children: [
            "\uFF0B",
            projectBonus
          ] }),
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsx2("strong", { children: "\u9879\u76EE\u5B9E\u8DF5\u52A0\u5206" }),
            /* @__PURE__ */ jsx2("p", { children: "\u771F\u5B9E\u5B8C\u6210\u4E2A\u4EBA\u7F51\u7AD9\u3001\u77E5\u8BC6\u5E93\u6216\u81EA\u52A8\u5316\u5DE5\u4F5C\u6D41\uFF0C\u5DF2\u8BA1\u5165\u7EFC\u5408\u5206\u3002" })
          ] })
        ] }),
        projectUpgrade.eligible && /* @__PURE__ */ jsxs2("article", { children: [
          /* @__PURE__ */ jsx2("span", { children: "\u21911" }),
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsx2("strong", { children: "\u5C0F\u7A0B\u5E8F\u5B9E\u6218\u5347\u7EA7" }),
            /* @__PURE__ */ jsx2("p", { children: projectUpgrade.applied ? "\u6838\u5FC3\u53C2\u4E0E\u5F00\u53D1\u4E14\u6210\u529F\u8FD0\u884C\uFF0C\u6700\u7EC8\u7B49\u7EA7\u63D0\u5347\u4E00\u7EA7\u3002" : "\u5DF2\u6EE1\u8DB3\u5B9E\u6218\u6761\u4EF6\uFF1B\u5F53\u524D\u7B49\u7EA7\u5DF2\u8FBE\u6700\u9AD8\u7EA7\u3002" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("section", { className: "report-section personal-style-section", children: [
        /* @__PURE__ */ jsx2("p", { className: "panel-label", children: "\u4E2A\u4EBA\u98CE\u683C\u6DF1\u5EA6\u5206\u6790" }),
        /* @__PURE__ */ jsxs2("h2", { children: [
          style.code,
          " \xB7 ",
          style.name,
          "\uFF0C\u4F60\u66F4\u81EA\u7136\u7684 AI \u534F\u4F5C\u65B9\u5F0F"
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "style-analysis-grid", children: [
          /* @__PURE__ */ jsxs2("article", { children: [
            /* @__PURE__ */ jsx2("span", { children: "01" }),
            /* @__PURE__ */ jsx2("h3", { children: "\u4F60\u5982\u4F55\u542F\u52A8\u4EFB\u52A1" }),
            /* @__PURE__ */ jsx2("p", { children: style.startMode })
          ] }),
          /* @__PURE__ */ jsxs2("article", { children: [
            /* @__PURE__ */ jsx2("span", { children: "02" }),
            /* @__PURE__ */ jsx2("h3", { children: "\u4F60\u5982\u4F55\u4E0EAI\u5206\u5DE5" }),
            /* @__PURE__ */ jsx2("p", { children: style.divisionMode })
          ] }),
          /* @__PURE__ */ jsxs2("article", { children: [
            /* @__PURE__ */ jsx2("span", { children: "03" }),
            /* @__PURE__ */ jsx2("h3", { children: "\u4F60\u5982\u4F55\u5904\u7406\u901F\u5EA6\u4E0E\u8D28\u91CF" }),
            /* @__PURE__ */ jsx2("p", { children: style.speedQuality })
          ] }),
          /* @__PURE__ */ jsxs2("article", { children: [
            /* @__PURE__ */ jsx2("span", { children: "04" }),
            /* @__PURE__ */ jsx2("h3", { children: "\u4F60\u7684\u4E09\u9879\u4F18\u52BF" }),
            /* @__PURE__ */ jsx2("ul", { children: style.strengths?.map((item) => /* @__PURE__ */ jsx2("li", { children: item }, item)) })
          ] }),
          /* @__PURE__ */ jsxs2("article", { children: [
            /* @__PURE__ */ jsx2("span", { children: "05" }),
            /* @__PURE__ */ jsx2("h3", { children: "\u9700\u8981\u7559\u610F\u7684\u4E24\u9879\u98CE\u9669" }),
            /* @__PURE__ */ jsx2("ul", { children: style.risks?.map((item) => /* @__PURE__ */ jsx2("li", { children: item }, item)) })
          ] }),
          /* @__PURE__ */ jsxs2("article", { children: [
            /* @__PURE__ */ jsx2("span", { children: "06" }),
            /* @__PURE__ */ jsx2("h3", { children: "\u63A8\u8350\u7684AI\u5DE5\u4F5C\u6D41\u7A0B" }),
            /* @__PURE__ */ jsx2("ol", { children: style.recommendedWorkflow?.map((item) => /* @__PURE__ */ jsx2("li", { children: item }, item)) })
          ] }),
          /* @__PURE__ */ jsxs2("article", { children: [
            /* @__PURE__ */ jsx2("span", { children: "07" }),
            /* @__PURE__ */ jsx2("h3", { children: "\u4E0B\u4E00\u6B65\u9002\u5408\u5C1D\u8BD5" }),
            /* @__PURE__ */ jsx2("p", { children: style.nextProjects?.join("\u3001") }),
            /* @__PURE__ */ jsx2("small", { children: style.upgrade })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("section", { className: "report-section radar-section", children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("p", { className: "panel-label", children: "\u516D\u7EF4\u80FD\u529B\u96F7\u8FBE" }),
          /* @__PURE__ */ jsx2("h2", { children: "\u4F60\u5DF2\u7ECF\u4F1A\u4EC0\u4E48\uFF0C\u4E0B\u4E00\u6B65\u8BE5\u8865\u4EC0\u4E48" })
        ] }),
        /* @__PURE__ */ jsx2("div", { className: "radar-wrap", children: /* @__PURE__ */ jsx2(ResponsiveContainer, { width: "100%", height: 330, children: /* @__PURE__ */ jsxs2(RadarChart, { data: radarData, outerRadius: "72%", children: [
          /* @__PURE__ */ jsx2(PolarGrid, { stroke: "#c9c2b2" }),
          /* @__PURE__ */ jsx2(PolarAngleAxis, { dataKey: "subject", tick: { fill: "#201f1b", fontSize: 13 } }),
          /* @__PURE__ */ jsx2(Radar, { dataKey: "value", stroke: "#d7a900", fill: "#f2c94c", fillOpacity: 0.54, strokeWidth: 2 })
        ] }) }) }),
        /* @__PURE__ */ jsx2("div", { className: "dimension-grid", children: radarData.map((item) => /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("span", { children: item.subject }),
          /* @__PURE__ */ jsx2("strong", { children: item.value })
        ] }, item.subject)) })
      ] }),
      /* @__PURE__ */ jsxs2("section", { className: "report-section", children: [
        /* @__PURE__ */ jsx2("p", { className: "panel-label", children: "\u63D0\u793A\u8BCD\u4E03\u9879\u62C6\u89E3" }),
        /* @__PURE__ */ jsx2("h2", { children: "\u4ECE\u201C\u60F3\u8BA9 AI \u505A\u201D\u5230\u201C\u8BA9 AI \u505A\u5BF9\u201D" }),
        analysis ? /* @__PURE__ */ jsx2("div", { className: "rubric-grid", children: Object.entries(analysis.rubric || {}).map(([key, value]) => /* @__PURE__ */ jsxs2("article", { children: [
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsx2("strong", { children: rubricLabels[key] }),
            /* @__PURE__ */ jsxs2("span", { children: [
              value.score,
              " / 3"
            ] })
          ] }),
          /* @__PURE__ */ jsx2("p", { children: value.evidence })
        ] }, key)) }) : /* @__PURE__ */ jsx2("div", { className: "pending-panel", children: message || "DeepSeek\u70B9\u8BC4\u751F\u6210\u4E2D\uFF0C\u7A0D\u540E\u5237\u65B0\u5373\u53EF\u67E5\u770B\u3002" })
      ] }),
      analysis && /* @__PURE__ */ jsxs2(Fragment, { children: [
        /* @__PURE__ */ jsxs2("section", { className: "report-section two-column", children: [
          /* @__PURE__ */ jsxs2("article", { children: [
            /* @__PURE__ */ jsx2("p", { className: "panel-label", children: "\u4F60\u7684\u4F18\u52BF" }),
            /* @__PURE__ */ jsx2("ul", { children: analysis.strengths?.map((item) => /* @__PURE__ */ jsx2("li", { children: item }, item)) })
          ] }),
          /* @__PURE__ */ jsxs2("article", { children: [
            /* @__PURE__ */ jsx2("p", { className: "panel-label", children: "\u5BB9\u6613\u5FFD\u7565" }),
            /* @__PURE__ */ jsx2("ul", { children: analysis.risks?.map((item) => /* @__PURE__ */ jsx2("li", { children: item }, item)) })
          ] })
        ] }),
        analysis.improvements && analysis.improvements.length > 0 && /* @__PURE__ */ jsxs2("section", { className: "report-section", children: [
          /* @__PURE__ */ jsx2("p", { className: "panel-label", children: "\u5177\u4F53\u6539\u8FDB\u70B9" }),
          /* @__PURE__ */ jsx2("h2", { children: "\u9010\u9879\u7ED9\u4F60\u63D0\u793A\uFF0C\u54EA\u91CC\u518D\u52A0\u4E00\u70B9" }),
          /* @__PURE__ */ jsx2("ul", { className: "improvement-list", children: analysis.improvements.map((item, index) => /* @__PURE__ */ jsx2("li", { children: item }, index)) })
        ] }),
        /* @__PURE__ */ jsxs2("section", { className: "report-section upgraded-prompt", children: [
          /* @__PURE__ */ jsx2("p", { className: "panel-label", children: report.aiEngine === "deepseek" ? "DeepSeek \u5347\u7EA7\u7248\u63D0\u793A\u8BCD" : "AI \u5347\u7EA7\u7248\u63D0\u793A\u8BCD" }),
          /* @__PURE__ */ jsx2("h2", { children: "\u4FDD\u7559\u4F60\u7684\u539F\u610F\uFF0C\u8865\u9F50\u53EF\u6267\u884C\u4FE1\u606F" }),
          /* @__PURE__ */ jsx2("pre", { children: analysis.upgradedPrompt })
        ] }),
        /* @__PURE__ */ jsxs2("section", { className: "report-section", children: [
          /* @__PURE__ */ jsx2("p", { className: "panel-label", children: "\u4E0B\u4E00\u6B65\u8BAD\u7EC3" }),
          /* @__PURE__ */ jsx2("div", { className: "action-grid", children: analysis.nextActions?.map((item, index) => /* @__PURE__ */ jsxs2("article", { children: [
            /* @__PURE__ */ jsxs2("span", { children: [
              "0",
              index + 1
            ] }),
            /* @__PURE__ */ jsx2("p", { children: item })
          ] }, item)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("footer", { className: "report-footer", children: [
        /* @__PURE__ */ jsx2("span", { children: "AI\u80FD\u529B\u4E0E\u98CE\u683C\u6D4B\u8BC4" }),
        /* @__PURE__ */ jsx2("span", { children: "\u8BFE\u7A0B\u8D77\u70B9\u753B\u50CF\uFF0C\u4E0D\u662F\u6807\u51C6\u5316\u5FC3\u7406\u6D4B\u9A8C" })
      ] })
    ] }),
    /* @__PURE__ */ jsx2(StyleAtlas, { open: showAtlas, onClose: () => setShowAtlas(false), activeCode: style.code })
  ] });
}

// app/components/TeacherDashboard.tsx
const { useEffect, useMemo, useState: useState2 } = window.React;
const QRCode = window.QRCode || { toDataURL: function(t) { return Promise.resolve("https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=1&color=171713&bgcolor=ffffff&data=" + encodeURIComponent(t)); } };
const { Fragment: Fragment2, jsx: jsx3, jsxs: jsxs3 } = { jsx: function(type, props, key) { if (key !== undefined) { props = Object.assign({}, props, { key: String(key) }); } return React.createElement(type, props); }, jsxs: function(type, props, key) { if (key !== undefined) { props = Object.assign({}, props, { key: String(key) }); } return React.createElement(type, props); }, Fragment: React.Fragment };
function QrImage({ url }) {
  const [src, setSrc] = useState2("");
  useEffect(() => {
    void QRCode.toDataURL(url, { width: 320, margin: 1, color: { dark: "#171713", light: "#ffffff" } }).then(setSrc);
  }, [url]);
  return src ? /* @__PURE__ */ jsx3("img", { className: "qr-image", src, alt: "\u5B66\u5458\u626B\u7801\u8FDB\u5165\u672C\u573A\u6D4B\u8BC4" }) : /* @__PURE__ */ jsx3("div", { className: "qr-placeholder", children: "\u6B63\u5728\u751F\u6210\u4E8C\u7EF4\u7801" });
}
function TeacherDashboard({ onExit }) {
  const [token, setToken] = useState2(() => typeof window === "undefined" ? "" : sessionStorage.getItem("ai-assessment-admin-token") || "");
  const [accessCode, setAccessCode] = useState2("");
  const [sessions, setSessions] = useState2([]);
  const [selectedId, setSelectedId] = useState2("");
  const [dashboard, setDashboard] = useState2(null);
  const [title, setTitle] = useState2("AI\u80FD\u529B\u4E0E\u98CE\u683C\u6D4B\u8BC4");
  const [cohort, setCohort] = useState2("");
  const [filter, setFilter] = useState2({ level: "", style: "", role: "" });
  const [message, setMessage] = useState2("");
  const [showAtlas, setShowAtlas] = useState2(false);
  useEffect(() => {
    if (token) void loadSessions();
  }, [token]);
  useEffect(() => {
    if (!selectedId || !token) return;
    void loadDashboard(selectedId);
    const interval = window.setInterval(() => void loadDashboard(selectedId, true), 5e3);
    return () => window.clearInterval(interval);
  }, [selectedId, token]);
  async function adminRequest(path, options = {}) {
    return apiRequest(path, { ...options, headers: { ...adminHeaders(), ...options.headers || {} } });
  }
  async function loadSessions() {
    try {
      const data = await adminRequest("/admin/sessions");
      setSessions(data.sessions || []);
      if (!selectedId && data.sessions?.[0]) setSelectedId(data.sessions[0].id);
    } catch (error2) {
      setMessage(error2 instanceof Error ? error2.message : "\u540E\u53F0\u8BFB\u53D6\u5931\u8D25");
    }
  }
  async function loadDashboard(id, quiet = false) {
    try {
      const data = await adminRequest(`/admin/sessions/${id}/dashboard`);
      setDashboard(data.dashboard);
    } catch (error2) {
      if (!quiet) setMessage(error2 instanceof Error ? error2.message : "\u770B\u677F\u8BFB\u53D6\u5931\u8D25");
    }
  }
  async function login(event) {
    event.preventDefault();
    setMessage("");
    try {
      const data = await apiRequest("/admin/login", { method: "POST", body: JSON.stringify({ accessCode }) });
      sessionStorage.setItem("ai-assessment-admin-token", data.token);
      setToken(data.token);
      setAccessCode("");
    } catch (error2) {
      setMessage(error2 instanceof Error ? error2.message : "\u767B\u5F55\u5931\u8D25");
    }
  }
  async function createSession(event) {
    event.preventDefault();
    try {
      const data = await adminRequest("/admin/sessions", { method: "POST", body: JSON.stringify({ title, cohort }) });
      setCohort("");
      await loadSessions();
      setSelectedId(data.session.id);
    } catch (error2) {
      setMessage(error2 instanceof Error ? error2.message : "\u521B\u5EFA\u5931\u8D25");
    }
  }
  async function updateSession(status) {
    await adminRequest(`/admin/sessions/${selectedId}`, { method: "PATCH", body: JSON.stringify({ status }) });
    await Promise.all([loadSessions(), loadDashboard(selectedId)]);
  }
  async function deleteSession() {
    if (!confirm("\u786E\u8BA4\u5220\u9664\u6574\u573A\u6D4B\u8BC4\u53CA\u6240\u6709\u59D3\u540D\u3001\u7B54\u5377\u548C\u62A5\u544A\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002")) return;
    await adminRequest(`/admin/sessions/${selectedId}`, { method: "DELETE" });
    setDashboard(null);
    setSelectedId("");
    await loadSessions();
  }
  async function retrySubmission(id) {
    setMessage("");
    try {
      await adminRequest(`/admin/submissions/${id}/retry`, { method: "POST" });
      await loadDashboard(selectedId);
    } catch (error2) {
      setMessage(error2 instanceof Error ? error2.message : "AI\u70B9\u8BC4\u91CD\u8BD5\u5931\u8D25");
      await loadDashboard(selectedId, true);
    }
  }
  function logout() {
    sessionStorage.removeItem("ai-assessment-admin-token");
    setToken("");
    setDashboard(null);
  }
  const submissions = useMemo(() => (dashboard?.submissions || []).filter((item) => (!filter.level || item.levelCode === filter.level) && (!filter.style || item.styleCode === filter.style) && (!filter.role || item.participantRole === filter.role)), [dashboard, filter]);
  const publicUrl = dashboard ? `${window.location.origin}${window.location.pathname}?s=${dashboard.session.code}` : "";
  if (!token) return /* @__PURE__ */ jsx3("main", { className: "center-page admin-login", children: /* @__PURE__ */ jsxs3("section", { className: "form-card", children: [
    /* @__PURE__ */ jsx3("button", { className: "text-button back-link", onClick: onExit, children: "\u2190 \u8FD4\u56DE\u6D4B\u8BC4\u9996\u9875" }),
    /* @__PURE__ */ jsx3("p", { className: "eyebrow", children: "\u6559\u5E08\u4E13\u5C5E\u5165\u53E3" }),
    /* @__PURE__ */ jsx3("h1", { children: "\u7BA1\u7406\u8BFE\u5802\u6D4B\u8BC4" }),
    /* @__PURE__ */ jsx3("p", { className: "muted", children: "\u521B\u5EFA\u573A\u6B21\u3001\u5C55\u793A\u533F\u540D\u73ED\u7EA7\u753B\u50CF\uFF0C\u5E76\u67E5\u770B\u9700\u8981\u8BFE\u540E\u6307\u5BFC\u7684\u4E2A\u4EBA\u62A5\u544A\u3002" }),
    /* @__PURE__ */ jsxs3("form", { className: "stack-form", onSubmit: login, children: [
      /* @__PURE__ */ jsxs3("label", { children: [
        "\u6559\u5E08\u53E3\u4EE4",
        /* @__PURE__ */ jsx3("input", { type: "password", value: accessCode, onChange: (e) => setAccessCode(e.target.value), placeholder: "\u8BF7\u8F93\u5165\u6559\u5E08\u53E3\u4EE4" })
      ] }),
      message && /* @__PURE__ */ jsx3("p", { className: "error-text", children: message }),
      /* @__PURE__ */ jsx3("button", { className: "primary-button", children: "\u767B\u5F55\u540E\u53F0" })
    ] })
  ] }) });
  return /* @__PURE__ */ jsxs3("main", { className: "admin-page", children: [
    /* @__PURE__ */ jsxs3("aside", { className: "admin-sidebar", children: [
      /* @__PURE__ */ jsxs3("div", { className: "admin-brand", children: [
        /* @__PURE__ */ jsx3("span", { className: "brand-mark", children: "AI" }),
        /* @__PURE__ */ jsxs3("div", { children: [
          /* @__PURE__ */ jsx3("strong", { children: "\u6559\u5E08\u63A7\u5236\u53F0" }),
          /* @__PURE__ */ jsx3("small", { children: "\u80FD\u529B\u4E0E\u98CE\u683C\u6D4B\u8BC4" })
        ] })
      ] }),
      /* @__PURE__ */ jsx3("button", { className: "new-session-button", onClick: () => setSelectedId("new"), children: "\uFF0B \u521B\u5EFA\u65B0\u573A\u6B21" }),
      /* @__PURE__ */ jsx3("p", { className: "side-label", children: "\u6D4B\u8BC4\u573A\u6B21" }),
      /* @__PURE__ */ jsx3("div", { className: "session-list", children: sessions.map((item) => /* @__PURE__ */ jsxs3("button", { className: selectedId === item.id ? "active" : "", onClick: () => setSelectedId(item.id), children: [
        /* @__PURE__ */ jsx3("span", { children: item.title }),
        /* @__PURE__ */ jsxs3("small", { children: [
          item.cohort || item.code,
          " \xB7 ",
          item.submissionCount || 0,
          "\u4EBA"
        ] })
      ] }, item.id)) }),
      /* @__PURE__ */ jsx3("p", { className: "side-label", children: "AI \u70B9\u8BC4\u5F15\u64CE" }),
      /* @__PURE__ */ jsxs3("div", { className: "ai-engine-card", children: [
        /* @__PURE__ */ jsxs3("div", { className: "ai-engine-status", children: [
          /* @__PURE__ */ jsx3("span", { className: "ai-dot deepseek" }),
          /* @__PURE__ */ jsx3("strong", { children: "DeepSeek \xB7 \u670D\u52A1\u7AEF\u6258\u7BA1" })
        ] }),
        /* @__PURE__ */ jsxs3("p", { className: "ai-engine-meta", children: [
          "\u6D4B\u8BC4\u5B8C\u6210\u540E\u81EA\u52A8\u751F\u6210\u4E03\u9879\u63D0\u793A\u8BCD\u5206\u6790",
          /* @__PURE__ */ jsx3("br", {}),
          "\u670D\u52A1\u5F02\u5E38\u65F6\u81EA\u52A8\u56DE\u9000\u5230\u672C\u5730\u542F\u53D1\u5F0F\u5206\u6790"
        ] })
      ] }),
      /* @__PURE__ */ jsx3("button", { className: "atlas-sidebar-button", onClick: () => setShowAtlas(true), children: "\u67E5\u770B8\u578B\u98CE\u683C\u5927\u5168" }),
      /* @__PURE__ */ jsxs3("div", { className: "sidebar-footer", children: [
        /* @__PURE__ */ jsx3("button", { onClick: onExit, children: "\u6D4B\u8BC4\u9996\u9875" }),
        /* @__PURE__ */ jsx3("button", { onClick: logout, children: "\u9000\u51FA\u767B\u5F55" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("section", { className: "admin-content", children: [
      selectedId === "new" ? /* @__PURE__ */ jsxs3("div", { className: "admin-section narrow", children: [
        /* @__PURE__ */ jsx3("p", { className: "eyebrow", children: "NEW SESSION" }),
        /* @__PURE__ */ jsx3("h1", { children: "\u521B\u5EFA\u4E00\u573A\u6D4B\u8BC4" }),
        /* @__PURE__ */ jsxs3("form", { className: "stack-form", onSubmit: createSession, children: [
          /* @__PURE__ */ jsxs3("label", { children: [
            "\u573A\u6B21\u540D\u79F0",
            /* @__PURE__ */ jsx3("input", { value: title, onChange: (e) => setTitle(e.target.value), maxLength: 60 })
          ] }),
          /* @__PURE__ */ jsxs3("label", { children: [
            "\u73ED\u7EA7 / \u6279\u6B21",
            /* @__PURE__ */ jsx3("input", { value: cohort, onChange: (e) => setCohort(e.target.value), placeholder: "\u4F8B\u5982\uFF1A2026\u65B0\u5175\u8425\u7B2C1\u671F", maxLength: 60 })
          ] }),
          /* @__PURE__ */ jsx3("button", { className: "primary-button", children: "\u521B\u5EFA\u5E76\u751F\u6210\u4E8C\u7EF4\u7801" })
        ] })
      ] }) : dashboard ? /* @__PURE__ */ jsxs3(Fragment2, { children: [
        /* @__PURE__ */ jsxs3("header", { className: "admin-header", children: [
          /* @__PURE__ */ jsxs3("div", { children: [
            /* @__PURE__ */ jsx3("p", { className: "eyebrow", children: dashboard.session.cohort || "\u8BFE\u5802\u6D4B\u8BC4" }),
            /* @__PURE__ */ jsx3("h1", { children: dashboard.session.title }),
            /* @__PURE__ */ jsxs3("p", { children: [
              "\u573A\u6B21\u7801 ",
              dashboard.session.code,
              " \xB7 ",
              dashboard.session.status === "open" ? "\u6B63\u5728\u6536\u96C6" : "\u5DF2\u5173\u95ED"
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "admin-actions", children: [
            /* @__PURE__ */ jsx3("button", { onClick: () => void navigator.clipboard.writeText(publicUrl), children: "\u590D\u5236\u5B66\u5458\u94FE\u63A5" }),
            /* @__PURE__ */ jsx3("button", { onClick: () => void downloadCsv(`/admin/sessions/${selectedId}/export`, `${dashboard.session.title}.csv`), children: "\u5BFC\u51FACSV" }),
            dashboard.session.status === "open" ? /* @__PURE__ */ jsx3("button", { onClick: () => void updateSession("closed"), children: "\u5173\u95ED\u573A\u6B21" }) : /* @__PURE__ */ jsx3("button", { onClick: () => void updateSession("open"), children: "\u91CD\u65B0\u5F00\u542F" }),
            /* @__PURE__ */ jsx3("button", { className: "danger", onClick: () => void deleteSession(), children: "\u5220\u9664" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("div", { className: "stat-grid", children: [
          /* @__PURE__ */ jsxs3("article", { children: [
            /* @__PURE__ */ jsx3("span", { children: "\u5DF2\u63D0\u4EA4" }),
            /* @__PURE__ */ jsx3("strong", { children: dashboard.summary.total }),
            /* @__PURE__ */ jsx3("small", { children: "\u4EFD\u6709\u6548\u7B54\u5377" })
          ] }),
          /* @__PURE__ */ jsxs3("article", { children: [
            /* @__PURE__ */ jsx3("span", { children: "\u7EFC\u5408\u5747\u503C" }),
            /* @__PURE__ */ jsx3("strong", { children: dashboard.summary.averageScore || "\u2014" }),
            /* @__PURE__ */ jsx3("small", { children: "\u4E0D\u7528\u4E8E\u6392\u540D" })
          ] }),
          /* @__PURE__ */ jsxs3("article", { children: [
            /* @__PURE__ */ jsx3("span", { children: "\u4E3B\u6D41\u7B49\u7EA7" }),
            /* @__PURE__ */ jsx3("strong", { children: dashboard.summary.dominantLevel || "\u2014" }),
            /* @__PURE__ */ jsx3("small", { children: "\u73ED\u7EA7\u6210\u957F\u8D77\u70B9" })
          ] }),
          /* @__PURE__ */ jsxs3("article", { children: [
            /* @__PURE__ */ jsx3("span", { children: "\u4E3B\u6D41\u98CE\u683C" }),
            /* @__PURE__ */ jsx3("strong", { children: dashboard.summary.dominantStyle || "\u2014" }),
            /* @__PURE__ */ jsx3("small", { children: "\u73ED\u7EA7\u534F\u4F5C\u504F\u597D" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("div", { className: "dashboard-grid", children: [
          /* @__PURE__ */ jsxs3("article", { className: "chart-card", children: [
            /* @__PURE__ */ jsx3("div", { className: "card-heading", children: /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("p", { className: "eyebrow", children: "\u533F\u540D\u73ED\u7EA7\u753B\u50CF" }),
              /* @__PURE__ */ jsx3("h2", { children: "\u516D\u7EF4\u80FD\u529B\u5747\u503C" })
            ] }) }),
            /* @__PURE__ */ jsx3("div", { className: "bar-chart", children: dimensions.map((dimension) => /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("span", { children: dimension.label }),
              /* @__PURE__ */ jsx3("div", { children: /* @__PURE__ */ jsx3("i", { style: { width: `${dashboard.summary.dimensionAverages?.[dimension.id] || 0}%` } }) }),
              /* @__PURE__ */ jsx3("strong", { children: dashboard.summary.dimensionAverages?.[dimension.id] || 0 })
            ] }, dimension.id)) })
          ] }),
          /* @__PURE__ */ jsxs3("article", { className: "qr-card", children: [
            /* @__PURE__ */ jsx3("p", { className: "eyebrow", children: "\u5B66\u5458\u5165\u53E3" }),
            /* @__PURE__ */ jsx3("h2", { children: "\u626B\u7801\u5F00\u59CB\u6D4B\u8BC4" }),
            /* @__PURE__ */ jsx3(QrImage, { url: publicUrl }),
            /* @__PURE__ */ jsx3("strong", { children: dashboard.session.code }),
            /* @__PURE__ */ jsx3("p", { children: "\u6295\u5C4F\u65F6\u53EA\u5C55\u793A\u672C\u4E8C\u7EF4\u7801\u548C\u533F\u540D\u7EDF\u8BA1" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("div", { className: "distribution-grid", children: [
          /* @__PURE__ */ jsxs3("article", { className: "chart-card", children: [
            /* @__PURE__ */ jsx3("p", { className: "eyebrow", children: "\u6210\u957F\u7B49\u7EA7" }),
            /* @__PURE__ */ jsx3("h2", { children: "\u56DB\u7EA7\u5206\u5E03" }),
            /* @__PURE__ */ jsx3("div", { className: "distribution-list", children: Object.entries(dashboard.summary.levelDistribution || {}).map(([key, value]) => /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("span", { children: key }),
              /* @__PURE__ */ jsxs3("strong", { children: [
                String(value),
                "\u4EBA"
              ] })
            ] }, key)) })
          ] }),
          /* @__PURE__ */ jsxs3("article", { className: "chart-card", children: [
            /* @__PURE__ */ jsx3("p", { className: "eyebrow", children: "AI\u4F7F\u7528\u98CE\u683C" }),
            /* @__PURE__ */ jsx3("h2", { children: "8\u578B\u5206\u5E03" }),
            /* @__PURE__ */ jsx3("div", { className: "distribution-list compact", children: Object.entries(dashboard.summary.styleDistribution || {}).map(([key, value]) => /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("span", { children: key }),
              /* @__PURE__ */ jsxs3("strong", { children: [
                String(value),
                "\u4EBA"
              ] })
            ] }, key)) })
          ] })
        ] }),
        dashboard.summary.scoredTotal > 0 && /* @__PURE__ */ jsxs3("div", { className: "distribution-grid", children: [
          /* @__PURE__ */ jsxs3("article", { className: "chart-card", children: [
            /* @__PURE__ */ jsx3("p", { className: "eyebrow", children: "\u5171\u540C\u4F18\u52BF" }),
            /* @__PURE__ */ jsx3("h2", { children: "\u73ED\u7EA7\u5F53\u524D\u8F83\u5F3A\u7EF4\u5EA6" }),
            /* @__PURE__ */ jsx3("div", { className: "distribution-list", children: dashboard.summary.commonStrengths?.map((item) => /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("span", { children: item.label }),
              /* @__PURE__ */ jsx3("strong", { children: item.score })
            ] }, item.label)) })
          ] }),
          /* @__PURE__ */ jsxs3("article", { className: "chart-card", children: [
            /* @__PURE__ */ jsx3("p", { className: "eyebrow", children: "\u5171\u540C\u77ED\u677F" }),
            /* @__PURE__ */ jsx3("h2", { children: "\u8BFE\u5802\u4F18\u5148\u8BAD\u7EC3\u7EF4\u5EA6" }),
            /* @__PURE__ */ jsx3("div", { className: "distribution-list", children: dashboard.summary.commonGaps?.map((item) => /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("span", { children: item.label }),
              /* @__PURE__ */ jsx3("strong", { children: item.score })
            ] }, item.label)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("article", { className: "submission-card", children: [
          /* @__PURE__ */ jsxs3("div", { className: "card-heading", children: [
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("p", { className: "eyebrow", children: "\u4EC5\u6559\u5E08\u53EF\u89C1" }),
              /* @__PURE__ */ jsx3("h2", { children: "\u4E2A\u4EBA\u62A5\u544A" })
            ] }),
            /* @__PURE__ */ jsxs3("div", { className: "filters", children: [
              /* @__PURE__ */ jsxs3("select", { value: filter.level, onChange: (e) => setFilter({ ...filter, level: e.target.value }), children: [
                /* @__PURE__ */ jsx3("option", { value: "", children: "\u5168\u90E8\u7B49\u7EA7" }),
                /* @__PURE__ */ jsx3("option", { children: "L1" }),
                /* @__PURE__ */ jsx3("option", { children: "L2" }),
                /* @__PURE__ */ jsx3("option", { children: "L3" }),
                /* @__PURE__ */ jsx3("option", { children: "L4" })
              ] }),
              /* @__PURE__ */ jsxs3("select", { value: filter.style, onChange: (e) => setFilter({ ...filter, style: e.target.value }), children: [
                /* @__PURE__ */ jsx3("option", { value: "", children: "\u5168\u90E8\u98CE\u683C" }),
                ["EAF", "EAV", "ECF", "ECV", "DAF", "DAV", "DCF", "DCV"].map((code) => /* @__PURE__ */ jsx3("option", { children: code }, code))
              ] }),
              /* @__PURE__ */ jsxs3("select", { value: filter.role, onChange: (e) => setFilter({ ...filter, role: e.target.value }), children: [
                /* @__PURE__ */ jsx3("option", { value: "", children: "\u5168\u90E8\u5C97\u4F4D" }),
                [...new Set((dashboard.submissions || []).map((item) => item.participantRole))].map((role) => /* @__PURE__ */ jsx3("option", { children: role }, role))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx3("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs3("table", { children: [
            /* @__PURE__ */ jsx3("thead", { children: /* @__PURE__ */ jsxs3("tr", { children: [
              /* @__PURE__ */ jsx3("th", { children: "\u5B66\u5458" }),
              /* @__PURE__ */ jsx3("th", { children: "\u5C97\u4F4D" }),
              /* @__PURE__ */ jsx3("th", { children: "\u7B49\u7EA7" }),
              /* @__PURE__ */ jsx3("th", { children: "\u98CE\u683C" }),
              /* @__PURE__ */ jsx3("th", { children: "AI\u70B9\u8BC4" }),
              /* @__PURE__ */ jsx3("th", { children: "\u63D0\u4EA4\u65F6\u95F4" }),
              /* @__PURE__ */ jsx3("th", {})
            ] }) }),
            /* @__PURE__ */ jsx3("tbody", { children: submissions.map((item) => /* @__PURE__ */ jsxs3("tr", { children: [
              /* @__PURE__ */ jsx3("td", { children: /* @__PURE__ */ jsx3("strong", { children: item.participantName }) }),
              /* @__PURE__ */ jsx3("td", { children: item.participantRole }),
              /* @__PURE__ */ jsx3("td", { children: item.levelCode ? `${item.levelCode} \xB7 ${item.levelName}` : "\u751F\u6210\u4E2D" }),
              /* @__PURE__ */ jsxs3("td", { children: [
                item.styleCode,
                " \xB7 ",
                item.styleName
              ] }),
              /* @__PURE__ */ jsxs3("td", { children: [
                /* @__PURE__ */ jsx3("span", { className: `status ${item.aiStatus}`, children: item.aiStatus === "complete" ? "\u5DF2\u751F\u6210" : item.aiStatus === "processing" ? "\u751F\u6210\u4E2D" : "\u5F85\u91CD\u8BD5" }),
                item.aiStatus === "complete" && item.aiEngine && /* @__PURE__ */ jsx3("small", { className: "engine-tag", children: item.aiEngine === "deepseek" ? "DS" : "\u672C\u5730" })
              ] }),
              /* @__PURE__ */ jsx3("td", { children: new Date(item.submittedAt).toLocaleString("zh-CN") }),
              /* @__PURE__ */ jsx3("td", { children: item.aiStatus === "failed" ? /* @__PURE__ */ jsx3("button", { className: "text-button", onClick: () => void retrySubmission(item.id), children: "\u91CD\u65B0\u751F\u6210" }) : /* @__PURE__ */ jsx3("a", { href: `?report=${item.reportToken}`, target: "_blank", children: "\u67E5\u770B\u62A5\u544A" }) })
            ] }, item.id)) })
          ] }) })
        ] })
      ] }) : /* @__PURE__ */ jsxs3("div", { className: "empty-admin", children: [
        /* @__PURE__ */ jsx3("h2", { children: "\u9009\u62E9\u4E00\u573A\u6D4B\u8BC4" }),
        /* @__PURE__ */ jsx3("p", { children: "\u67E5\u770B\u5B9E\u65F6\u73ED\u7EA7\u753B\u50CF\uFF0C\u6216\u521B\u5EFA\u65B0\u7684\u8BFE\u5802\u573A\u6B21\u3002" })
      ] }),
      message && /* @__PURE__ */ jsx3("p", { className: "admin-message", children: message })
    ] }),
    /* @__PURE__ */ jsx3(StyleAtlas, { open: showAtlas, onClose: () => setShowAtlas(false) })
  ] });
}

// app/AssessmentApp.tsx
const { jsx: jsx4, jsxs: jsxs4 } = { jsx: function(type, props, key) { if (key !== undefined) { props = Object.assign({}, props, { key: String(key) }); } return React.createElement(type, props); }, jsxs: function(type, props, key) { if (key !== undefined) { props = Object.assign({}, props, { key: String(key) }); } return React.createElement(type, props); }, Fragment: React.Fragment };
var sectionLabels = {
  foundation: "\u57FA\u7840AI\u80FD\u529B\u63A2\u7A76",
  application: "AI\u5B9E\u9645\u5E94\u7528",
  style: "AI\u4F7F\u7528\u98CE\u683C",
  business: "\u5C97\u4F4D\u4E1A\u52A1\u573A\u666F"
};
function makeIdempotencyKey() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function findRoleKey(label) {
  const match = roles.find((r) => r.label === label);
  return match ? match.id : "general";
}
function AssessmentApp() {
  const [mode, setMode] = useState3("landing");
  const [sessionCode, setSessionCode] = useState3("");
  const [session, setSession] = useState3(null);
  const [profile, setProfile] = useState3({ name: "", role: "", roleKey: "general" });
  const [answers, setAnswers] = useState3({});
  const [openPrompt, setOpenPrompt] = useState3("");
  const [current, setCurrent] = useState3(0);
  const [report, setReport] = useState3(null);
  const [message, setMessage] = useState3("");
  const [loading, setLoading] = useState3(false);
  const [showAtlas, setShowAtlas] = useState3(false);
  const [seed] = useState3(() => Math.floor(Math.random() * 1e5));
  const [idempotencyKey, setIdempotencyKey] = useState3(() => makeIdempotencyKey());
  useEffect2(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("teacher") === "1") {
      setMode("teacher");
      return;
    }
    const reportToken = params.get("report");
    if (reportToken) {
      setMode("generating");
      void loadReport(reportToken);
      return;
    }
    const code = params.get("s");
    if (code) {
      setSessionCode(code.toUpperCase());
      void loadSession(code.toUpperCase());
    }
  }, []);
  useEffect2(() => {
    if (mode === "assessment" || mode === "profile") {
      setCurrent(0);
    }
  }, [profile.roleKey, mode]);
  useEffect2(() => {
    if (!session?.code || mode !== "assessment") return;
    const draft = { profile, answers, openPrompt, current, idempotencyKey };
    localStorage.setItem(`ai-assessment-draft:${session.code}`, JSON.stringify(draft));
  }, [answers, current, idempotencyKey, mode, openPrompt, profile, session?.code]);
  const questionList = useMemo2(() => getQuestionsForRole(profile.roleKey), [profile.roleKey]);
  const totalQuestions = questionList.length;
  const question = current < totalQuestions ? questionList[current] : null;
  const displayedOptions = useMemo2(
    () => question ? shuffledOptions(question, seed + current * 101) : [],
    [current, question, seed]
  );
  async function loadSession(code) {
    setLoading(true);
    setMessage("");
    try {
      const data = await apiRequest(`/session/${encodeURIComponent(code)}`);
      setSession(data.session);
      const rawDraft = localStorage.getItem(`ai-assessment-draft:${code}`);
      if (rawDraft) {
        const draft = JSON.parse(rawDraft);
        if (draft.profile) {
          setProfile({
            name: draft.profile.name || "",
            role: draft.profile.role || "",
            roleKey: draft.profile.roleKey || findRoleKey(draft.profile.role)
          });
        }
        setAnswers(draft.answers || {});
        setOpenPrompt(draft.openPrompt || "");
        setCurrent(Number(draft.current) || 0);
        setIdempotencyKey(draft.idempotencyKey || makeIdempotencyKey());
      }
      setMode("profile");
    } catch (error2) {
      setMessage(error2 instanceof Error ? error2.message : "\u573A\u6B21\u8BFB\u53D6\u5931\u8D25");
      setMode("landing");
    } finally {
      setLoading(false);
    }
  }
  async function loadReport(token) {
    setMessage("");
    try {
      const data = await apiRequest(`/report/${encodeURIComponent(token)}`);
      setReport(data.report);
      if (data.report.aiStatus === "pending" || data.report.aiStatus === "failed") {
        try {
          await apiRequest(`/report/${encodeURIComponent(token)}/analyze`, { method: "POST" });
          const refreshed = await apiRequest(`/report/${encodeURIComponent(token)}`);
          setReport(refreshed.report);
        } catch (error2) {
          setMessage(error2 instanceof Error ? error2.message : "AI\u70B9\u8BC4\u6682\u672A\u751F\u6210");
        }
      }
      setMode("report");
    } catch (error2) {
      setMessage(error2 instanceof Error ? error2.message : "\u62A5\u544A\u8BFB\u53D6\u5931\u8D25");
      setMode("landing");
    }
  }
  function enterSession(event) {
    event.preventDefault();
    const code = sessionCode.trim().toUpperCase();
    if (!code) return setMessage("\u8BF7\u8F93\u5165\u573A\u6B21\u7801");
    history.replaceState({}, "", `?s=${encodeURIComponent(code)}`);
    void loadSession(code);
  }
  function beginAssessment(event) {
    event.preventDefault();
    if (!profile.name.trim()) return setMessage("\u8BF7\u586B\u5199\u59D3\u540D");
    if (!profile.role) return setMessage("\u8BF7\u9009\u62E9\u5C97\u4F4D");
    setMessage("");
    setMode("assessment");
  }
  function chooseAnswer(optionId) {
    if (!question) return;
    setAnswers((value) => ({ ...value, [question.id]: optionId }));
  }
  function toggleMultiOption(optionId) {
    if (!question || question.kind !== "multi") return;
    setAnswers((value) => {
      const currentValue = value[question.id];
      const selected = Array.isArray(currentValue) ? currentValue : [];
      if (question.id === "f-q5" && optionId === "f-q5-none") {
        return { ...value, [question.id]: selected.includes(optionId) ? [] : [optionId] };
      }
      const withoutNone = question.id === "f-q5" ? selected.filter((id) => id !== "f-q5-none") : selected;
      const next = withoutNone.includes(optionId) ? withoutNone.filter((id) => id !== optionId) : [...withoutNone, optionId];
      return { ...value, [question.id]: next };
    });
  }
  async function submitAssessment() {
    if (openPrompt.trim().length < 30) return setMessage("\u8BF7\u5199\u51FA\u81F3\u5C1130\u5B57\u7684\u5B8C\u6574\u63D0\u793A\u8BCD");
    if (!session) return;
    setMode("generating");
    setMessage("");
    try {
      const response = await apiRequest("/submit", {
        method: "POST",
        body: JSON.stringify({
          sessionCode: session.code,
          participantName: profile.name.trim(),
          participantRole: profile.role,
          participantRoleKey: profile.roleKey,
          answers: questionList.map((item) => answers[item.id] || (item.kind === "multi" ? [] : "")),
          openPrompt: openPrompt.trim(),
          idempotencyKey
        })
      });
      localStorage.removeItem(`ai-assessment-draft:${session.code}`);
      history.replaceState({}, "", `?report=${encodeURIComponent(response.reportToken)}`);
      await loadReport(response.reportToken);
    } catch (error2) {
      setMessage(error2 instanceof Error ? error2.message : "\u63D0\u4EA4\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5");
      setMode("assessment");
    }
  }
  if (mode === "teacher") return /* @__PURE__ */ jsx4(TeacherDashboard, { onExit: () => {
    history.replaceState({}, "", window.location.pathname);
    setMode("landing");
  } });
  if (mode === "report" && report) return /* @__PURE__ */ jsx4(ReportView, { report, message });
  if (mode === "generating") {
    return /* @__PURE__ */ jsx4("main", { className: "center-page", children: /* @__PURE__ */ jsxs4("section", { className: "generating-card", children: [
      /* @__PURE__ */ jsx4("div", { className: "pulse-mark", children: "AI" }),
      /* @__PURE__ */ jsx4("p", { className: "eyebrow", children: "DeepSeek \u6B63\u5728\u751F\u6210" }),
      /* @__PURE__ */ jsx4("h1", { children: "\u7B54\u5377\u5DF2\u7ECF\u5B89\u5168\u4FDD\u5B58" }),
      /* @__PURE__ */ jsx4("p", { children: "DeepSeek \u6B63\u5728\u6309\u4E03\u9879\u56FA\u5B9A\u91CF\u8868\u5206\u6790\u4F60\u7684\u63D0\u793A\u8BCD\uFF1B\u670D\u52A1\u5F02\u5E38\u65F6\u81EA\u52A8\u56DE\u9000\u5230\u672C\u5730\u542F\u53D1\u5F0F\u5206\u6790\u3002" }),
      /* @__PURE__ */ jsx4("div", { className: "loading-line", children: /* @__PURE__ */ jsx4("span", {}) })
    ] }) });
  }
  if (mode === "profile" && session) {
    return /* @__PURE__ */ jsx4("main", { className: "center-page", children: /* @__PURE__ */ jsxs4("section", { className: "form-card", children: [
      /* @__PURE__ */ jsx4("p", { className: "eyebrow", children: session.cohort || "\u73B0\u573A\u6D4B\u8BC4" }),
      /* @__PURE__ */ jsx4("h1", { children: session.title }),
      /* @__PURE__ */ jsx4("p", { className: "muted", children: "\u586B\u5199\u771F\u5B9E\u4FE1\u606F\u3002\u6211\u4EEC\u4F1A\u6839\u636E\u4F60\u7684\u5C97\u4F4D\u51FA\u9488\u5BF9\u6027\u9898\u76EE\uFF0C\u4E2A\u4EBA\u7ED3\u679C\u4EC5\u6559\u5E08\u540E\u53F0\u53EF\u89C1\uFF1B\u8BFE\u5802\u6295\u5C4F\u53EA\u5C55\u793A\u533F\u540D\u5206\u5E03\u3002" }),
      /* @__PURE__ */ jsxs4("form", { onSubmit: beginAssessment, className: "stack-form", children: [
        /* @__PURE__ */ jsxs4("label", { children: [
          "\u59D3\u540D",
          /* @__PURE__ */ jsx4("input", { value: profile.name, maxLength: 30, onChange: (e) => setProfile({ ...profile, name: e.target.value }), placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D" })
        ] }),
        /* @__PURE__ */ jsxs4("label", { children: [
          "\u5C97\u4F4D",
          /* @__PURE__ */ jsxs4("select", { value: profile.role, onChange: (e) => {
            const label = e.target.value;
            setProfile({ ...profile, role: label, roleKey: findRoleKey(label) });
          }, children: [
            /* @__PURE__ */ jsx4("option", { value: "", children: "\u8BF7\u9009\u62E9\u5C97\u4F4D\uFF08\u4E0D\u540C\u5C97\u4F4D\u4F1A\u51FA\u4E0D\u540C\u9898\uFF09" }),
            roles.map((r) => /* @__PURE__ */ jsxs4("option", { value: r.label, children: [
              r.label,
              "\uFF5C",
              r.description
            ] }, r.id))
          ] })
        ] }),
        profile.role && /* @__PURE__ */ jsxs4("div", { className: "role-hint", children: [
          "\u4F60\u5C06\u770B\u5230\u9488\u5BF9\u3010",
          profile.role,
          "\u3011\u7684 ",
          totalQuestions,
          " \u9053\u9009\u62E9\u9898\u548C 1 \u9053\u771F\u5B9E\u63D0\u793A\u8BCD\u4EFB\u52A1 \uFF0CAI \u70B9\u8BC4\u5C06\u7531 DeepSeek \u5206\u6790\uFF0C\u670D\u52A1\u5F02\u5E38\u65F6\u81EA\u52A8\u56DE\u9000"
        ] }),
        message && /* @__PURE__ */ jsx4("p", { className: "error-text", children: message }),
        /* @__PURE__ */ jsx4("button", { className: "primary-button", type: "submit", children: "\u5F00\u59CB\u6D4B\u8BC4" })
      ] })
    ] }) });
  }
  if (mode === "assessment" && question) {
    const selected = answers[question.id];
    const selectedIds = Array.isArray(selected) ? selected : selected ? [selected] : [];
    const hasSelection = selectedIds.length > 0;
    const progress = Math.round((current + 1) / totalQuestions * 100);
    return /* @__PURE__ */ jsxs4("main", { className: "assessment-page", children: [
      /* @__PURE__ */ jsxs4("header", { className: "assessment-header", children: [
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx4("span", { className: "brand-mark", children: "AI" }),
          /* @__PURE__ */ jsxs4("span", { children: [
            session?.title,
            " \xB7 ",
            profile.role
          ] })
        ] }),
        /* @__PURE__ */ jsxs4("span", { children: [
          current + 1,
          " / ",
          totalQuestions
        ] })
      ] }),
      /* @__PURE__ */ jsx4("div", { className: "progress-track", children: /* @__PURE__ */ jsx4("span", { style: { width: `${progress}%` } }) }),
      /* @__PURE__ */ jsxs4("section", { className: "question-card", children: [
        /* @__PURE__ */ jsxs4("p", { className: "eyebrow", children: [
          sectionLabels[question.section],
          question.kind === "style" ? " \xB7 \u6CA1\u6709\u6807\u51C6\u7B54\u6848" : ""
        ] }),
        /* @__PURE__ */ jsx4("h1", { children: question.prompt }),
        question.kind === "multi" && /* @__PURE__ */ jsx4("p", { className: "multi-hint", children: "\u53EF\u591A\u9009\uFF0C\u8BF7\u6309\u771F\u5B9E\u4F7F\u7528\u60C5\u51B5\u9009\u62E9" }),
        /* @__PURE__ */ jsx4("div", { className: "option-list", children: displayedOptions.map((option, index) => /* @__PURE__ */ jsxs4("button", { type: "button", className: `option-button ${selectedIds.includes(option.id) ? "selected" : ""}`, onClick: () => question.kind === "multi" ? toggleMultiOption(option.id) : chooseAnswer(option.id), children: [
          /* @__PURE__ */ jsx4("span", { children: question.kind === "multi" && selectedIds.includes(option.id) ? "\u2713" : String.fromCharCode(65 + index) }),
          option.text
        ] }, option.id)) }),
        /* @__PURE__ */ jsxs4("div", { className: "question-actions", children: [
          /* @__PURE__ */ jsx4("button", { type: "button", className: "text-button", disabled: current === 0, onClick: () => setCurrent((value) => value - 1), children: "\u4E0A\u4E00\u9898" }),
          /* @__PURE__ */ jsx4("button", { type: "button", className: "primary-button", disabled: !hasSelection, onClick: () => setCurrent((value) => value + 1), children: "\u4E0B\u4E00\u9898" })
        ] })
      ] })
    ] });
  }
  if (mode === "assessment" && current === totalQuestions) {
    return /* @__PURE__ */ jsxs4("main", { className: "assessment-page", children: [
      /* @__PURE__ */ jsxs4("header", { className: "assessment-header", children: [
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx4("span", { className: "brand-mark", children: "AI" }),
          /* @__PURE__ */ jsx4("span", { children: "\u771F\u5B9E\u63D0\u793A\u8BCD\u4EFB\u52A1" })
        ] }),
        /* @__PURE__ */ jsxs4("span", { children: [
          totalQuestions,
          " / ",
          totalQuestions
        ] })
      ] }),
      /* @__PURE__ */ jsx4("div", { className: "progress-track", children: /* @__PURE__ */ jsx4("span", { style: { width: "100%" } }) }),
      /* @__PURE__ */ jsxs4("section", { className: "question-card open-card", children: [
        /* @__PURE__ */ jsx4("p", { className: "eyebrow", children: "\u5F00\u653E\u9898 \xB7 \u6309\u4F60\u771F\u5B9E\u4F1A\u4F7F\u7528\u7684\u65B9\u5F0F\u4F5C\u7B54" }),
        /* @__PURE__ */ jsx4("h1", { children: "\u8BF7\u5199\u51FA\u4E00\u6BB5\u4F60\u4F1A\u76F4\u63A5\u4EA4\u7ED9 AI \u7684\u5B8C\u6574\u63D0\u793A\u8BCD" }),
        /* @__PURE__ */ jsx4("div", { className: "scenario-box", children: getOpenPromptForRole(profile.roleKey) }),
        /* @__PURE__ */ jsx4("textarea", { value: openPrompt, onChange: (e) => setOpenPrompt(e.target.value), maxLength: 2e3, placeholder: "\u8BF7\u5728\u8FD9\u91CC\u5199\u4E0B\u5B8C\u6574\u63D0\u793A\u8BCD\u2026\u2026" }),
        /* @__PURE__ */ jsxs4("div", { className: "textarea-meta", children: [
          /* @__PURE__ */ jsx4("span", { children: "\u81F3\u5C1130\u5B57" }),
          /* @__PURE__ */ jsxs4("span", { children: [
            openPrompt.length,
            " / 2000"
          ] })
        ] }),
        message && /* @__PURE__ */ jsx4("p", { className: "error-text", children: message }),
        /* @__PURE__ */ jsxs4("div", { className: "question-actions", children: [
          /* @__PURE__ */ jsx4("button", { className: "text-button", onClick: () => setCurrent(totalQuestions - 1), children: "\u4E0A\u4E00\u9898" }),
          /* @__PURE__ */ jsx4("button", { className: "primary-button", onClick: () => void submitAssessment(), children: "\u63D0\u4EA4\u5E76\u751F\u6210\u753B\u50CF" })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs4("main", { className: "landing-page", children: [
    /* @__PURE__ */ jsxs4("nav", { className: "top-nav", children: [
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx4("span", { className: "brand-mark", children: "AI" }),
        /* @__PURE__ */ jsx4("strong", { children: "\u975E\u51E1 \xB7 AI\u5B66\u4E60\u5B9E\u9A8C\u5BA4" })
      ] }),
      /* @__PURE__ */ jsx4("button", { className: "text-button", onClick: () => {
        history.replaceState({}, "", "?teacher=1");
        setMode("teacher");
      }, children: "\u6559\u5E08\u540E\u53F0" })
    ] }),
    /* @__PURE__ */ jsxs4("section", { className: "hero-grid", children: [
      /* @__PURE__ */ jsxs4("div", { className: "hero-copy", children: [
        /* @__PURE__ */ jsx4("p", { className: "eyebrow", children: "AI\u80FD\u529B\u4E0E\u98CE\u683C\u6D4B\u8BC4 \xB7 ASSESSMENT V3" }),
        /* @__PURE__ */ jsxs4("h1", { children: [
          "\u770B\u89C1\u4F60\u7684",
          /* @__PURE__ */ jsx4("br", {}),
          /* @__PURE__ */ jsx4("em", { children: "AI \u5DE5\u4F5C\u65B9\u5F0F" })
        ] }),
        /* @__PURE__ */ jsx4("p", { className: "hero-description", children: "\u56DB\u7C7B\u5C97\u4F4D \xB7 18\u9053\u9009\u62E9\u9898 \xB7 1\u9053\u771F\u5B9E\u63D0\u793A\u8BCD\u4EFB\u52A1\u3002\u9762\u5411\u987E\u95EE\u3001\u6559\u7EC3\u3001\u6559\u5E08\u4E0E\u901A\u7528\u6D4B\u8BC4\uFF0C\u7EA68\u201310\u5206\u949F\uFF0C\u83B7\u5F97\u516D\u7EF4\u80FD\u529B\u3001\u6210\u957F\u7B49\u7EA7\u4E0EAI\u4F7F\u7528\u98CE\u683C\u753B\u50CF\u3002" }),
        /* @__PURE__ */ jsxs4("div", { className: "feature-row", children: [
          /* @__PURE__ */ jsx4("span", { children: "\u6309\u5C97\u4F4D\u51FA\u9898" }),
          /* @__PURE__ */ jsx4("span", { children: "\u516D\u7EF4\u80FD\u529B\u96F7\u8FBE" }),
          /* @__PURE__ */ jsx4("button", { type: "button", onClick: () => setShowAtlas(true), children: "\u67E5\u770B8\u578B\u98CE\u683C\u5927\u5168" }),
          /* @__PURE__ */ jsx4("span", { children: "\u63D0\u793A\u8BCD\u5347\u7EA7\u5EFA\u8BAE" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs4("form", { className: "join-card", onSubmit: enterSession, children: [
        /* @__PURE__ */ jsx4("div", { className: "join-number", children: "01" }),
        /* @__PURE__ */ jsx4("p", { className: "eyebrow", children: "\u52A0\u5165\u8BFE\u5802\u6D4B\u8BC4" }),
        /* @__PURE__ */ jsx4("h2", { children: "\u8F93\u5165\u573A\u6B21\u7801" }),
        /* @__PURE__ */ jsx4("input", { value: sessionCode, onChange: (e) => setSessionCode(e.target.value.toUpperCase()), placeholder: "\u4F8B\u5982 A7K9Q2", maxLength: 8, autoCapitalize: "characters" }),
        message && /* @__PURE__ */ jsx4("p", { className: "error-text", children: message }),
        /* @__PURE__ */ jsx4("button", { className: "primary-button", type: "submit", disabled: loading, children: loading ? "\u6B63\u5728\u8FDE\u63A5\u2026" : "\u8FDB\u5165\u6D4B\u8BC4" }),
        /* @__PURE__ */ jsx4("p", { className: "privacy-note", children: "\u59D3\u540D\u4EC5\u7528\u4E8E\u6559\u5E08\u8BFE\u540E\u6307\u5BFC\uFF0C\u4E0D\u53C2\u4E0E\u516C\u5F00\u6392\u540D\u3002" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs4("footer", { className: "landing-footer", children: [
      /* @__PURE__ */ jsx4("span", { children: "\u8BFE\u7A0B\u8D77\u70B9\u753B\u50CF\uFF0C\u4E0D\u662F\u6807\u51C6\u5316\u5FC3\u7406\u6D4B\u9A8C" }),
      /* @__PURE__ */ jsx4("span", { children: "\u7EA68\u201310\u5206\u949F" })
    ] }),
    /* @__PURE__ */ jsx4(StyleAtlas, { open: showAtlas, onClose: () => setShowAtlas(false) })
  ] });
}


/* ======================== RENDER ======================== */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(AssessmentApp));
})();
