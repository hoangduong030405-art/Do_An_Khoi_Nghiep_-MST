(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xc="160",um=0,Iu=1,hm=2,Zf=1,fm=2,bi=3,sr=0,Tn=1,di=2,Li=0,Qi=1,Mo=2,Ou=3,Fu=4,dm=5,Tr=100,pm=101,mm=102,zu=103,Bu=104,gm=200,_m=201,vm=202,xm=203,uc=204,hc=205,Sm=206,Mm=207,ym=208,Em=209,Tm=210,bm=211,wm=212,Am=213,Cm=214,Rm=0,Pm=1,Lm=2,Ia=3,Dm=4,Um=5,Nm=6,Im=7,Jf=0,Om=1,Fm=2,tr=0,zm=1,Bm=2,km=3,jf=4,Hm=5,Gm=6,Qf=300,ws=301,As=302,fc=303,dc=304,el=306,pc=1e3,ai=1001,mc=1002,xn=1003,ku=1004,gl=1005,Kn=1006,Vm=1007,yo=1008,er=1009,Wm=1010,Xm=1011,Yc=1012,td=1013,Yi=1014,qi=1015,Di=1016,ed=1017,nd=1018,Cr=1020,Ym=1021,li=1023,qm=1024,$m=1025,Rr=1026,Cs=1027,Km=1028,id=1029,Zm=1030,rd=1031,sd=1033,_l=33776,vl=33777,xl=33778,Sl=33779,Hu=35840,Gu=35841,Vu=35842,Wu=35843,od=36196,Xu=37492,Yu=37496,qu=37808,$u=37809,Ku=37810,Zu=37811,Ju=37812,ju=37813,Qu=37814,th=37815,eh=37816,nh=37817,ih=37818,rh=37819,sh=37820,oh=37821,Ml=36492,ah=36494,lh=36495,Jm=36283,ch=36284,uh=36285,hh=36286,ad=3e3,Pr=3001,jm=3200,Qm=3201,ld=0,tg=1,jn="",Ke="srgb",Ni="srgb-linear",qc="display-p3",nl="display-p3-linear",Oa="linear",Se="srgb",Fa="rec709",za="p3",Vr=7680,fh=519,eg=512,ng=513,ig=514,cd=515,rg=516,sg=517,og=518,ag=519,dh=35044,ph="300 es",gc=1035,Ri=2e3,Ba=2001;class Fs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let mh=1234567;const io=Math.PI/180,Eo=180/Math.PI;function zs(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[r&255]+en[r>>8&255]+en[r>>16&255]+en[r>>24&255]+"-"+en[t&255]+en[t>>8&255]+"-"+en[t>>16&15|64]+en[t>>24&255]+"-"+en[e&63|128]+en[e>>8&255]+"-"+en[e>>16&255]+en[e>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function Ze(r,t,e){return Math.max(t,Math.min(e,r))}function $c(r,t){return(r%t+t)%t}function lg(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function cg(r,t,e){return r!==t?(e-r)/(t-r):0}function ro(r,t,e){return(1-e)*r+e*t}function ug(r,t,e,n){return ro(r,t,1-Math.exp(-e*n))}function hg(r,t=1){return t-Math.abs($c(r,t*2)-t)}function fg(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function dg(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function pg(r,t){return r+Math.floor(Math.random()*(t-r+1))}function mg(r,t){return r+Math.random()*(t-r)}function gg(r){return r*(.5-Math.random())}function _g(r){r!==void 0&&(mh=r);let t=mh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function vg(r){return r*io}function xg(r){return r*Eo}function _c(r){return(r&r-1)===0&&r!==0}function Sg(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function ka(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Mg(r,t,e,n,i){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+n)/2),u=o((t+n)/2),h=s((t-n)/2),f=o((t-n)/2),d=s((n-t)/2),_=o((n-t)/2);switch(i){case"XYX":r.set(a*u,l*h,l*f,a*c);break;case"YZY":r.set(l*f,a*u,l*h,a*c);break;case"ZXZ":r.set(l*h,l*f,a*u,a*c);break;case"XZX":r.set(a*u,l*_,l*d,a*c);break;case"YXY":r.set(l*d,a*u,l*_,a*c);break;case"ZYZ":r.set(l*_,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function us(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function dn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const vc={DEG2RAD:io,RAD2DEG:Eo,generateUUID:zs,clamp:Ze,euclideanModulo:$c,mapLinear:lg,inverseLerp:cg,lerp:ro,damp:ug,pingpong:hg,smoothstep:fg,smootherstep:dg,randInt:pg,randFloat:mg,randFloatSpread:gg,seededRandom:_g,degToRad:vg,radToDeg:xg,isPowerOfTwo:_c,ceilPowerOfTwo:Sg,floorPowerOfTwo:ka,setQuaternionFromProperEuler:Mg,normalize:dn,denormalize:us};class xt{constructor(t=0,e=0){xt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ze(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ne{constructor(t,e,n,i,s,o,a,l,c){ne.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c)}set(t,e,n,i,s,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=i,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],_=n[8],g=i[0],p=i[3],m=i[6],M=i[1],v=i[4],x=i[7],A=i[2],w=i[5],E=i[8];return s[0]=o*g+a*M+l*A,s[3]=o*p+a*v+l*w,s[6]=o*m+a*x+l*E,s[1]=c*g+u*M+h*A,s[4]=c*p+u*v+h*w,s[7]=c*m+u*x+h*E,s[2]=f*g+d*M+_*A,s[5]=f*p+d*v+_*w,s[8]=f*m+d*x+_*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,f=a*l-u*s,d=c*s-o*l,_=e*h+n*f+i*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=h*g,t[1]=(i*c-u*n)*g,t[2]=(a*n-i*o)*g,t[3]=f*g,t[4]=(u*e-i*l)*g,t[5]=(i*s-a*e)*g,t[6]=d*g,t[7]=(n*l-c*e)*g,t[8]=(o*e-n*s)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(yl.makeScale(t,e)),this}rotate(t){return this.premultiply(yl.makeRotation(-t)),this}translate(t,e){return this.premultiply(yl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const yl=new ne;function ud(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Ha(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function yg(){const r=Ha("canvas");return r.style.display="block",r}const gh={};function so(r){r in gh||(gh[r]=!0,console.warn(r))}const _h=new ne().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),vh=new ne().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ho={[Ni]:{transfer:Oa,primaries:Fa,toReference:r=>r,fromReference:r=>r},[Ke]:{transfer:Se,primaries:Fa,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[nl]:{transfer:Oa,primaries:za,toReference:r=>r.applyMatrix3(vh),fromReference:r=>r.applyMatrix3(_h)},[qc]:{transfer:Se,primaries:za,toReference:r=>r.convertSRGBToLinear().applyMatrix3(vh),fromReference:r=>r.applyMatrix3(_h).convertLinearToSRGB()}},Eg=new Set([Ni,nl]),pe={enabled:!0,_workingColorSpace:Ni,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Eg.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,t,e){if(this.enabled===!1||t===e||!t||!e)return r;const n=Ho[t].toReference,i=Ho[e].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,t){return this.convert(r,this._workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this._workingColorSpace)},getPrimaries:function(r){return Ho[r].primaries},getTransfer:function(r){return r===jn?Oa:Ho[r].transfer}};function vs(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function El(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Wr;class hd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Wr===void 0&&(Wr=Ha("canvas")),Wr.width=t.width,Wr.height=t.height;const n=Wr.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Wr}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ha("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=vs(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(vs(e[n]/255)*255):e[n]=vs(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Tg=0;class fd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Tg++}),this.uuid=zs(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Tl(i[o].image)):s.push(Tl(i[o]))}else s=Tl(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function Tl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?hd.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let bg=0;class bn extends Fs{constructor(t=bn.DEFAULT_IMAGE,e=bn.DEFAULT_MAPPING,n=ai,i=ai,s=Kn,o=yo,a=li,l=er,c=bn.DEFAULT_ANISOTROPY,u=jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bg++}),this.uuid=zs(),this.name="",this.source=new fd(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(so("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Pr?Ke:jn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Qf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case pc:t.x=t.x-Math.floor(t.x);break;case ai:t.x=t.x<0?0:1;break;case mc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case pc:t.y=t.y-Math.floor(t.y);break;case ai:t.y=t.y<0?0:1;break;case mc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return so("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ke?Pr:ad}set encoding(t){so("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Pr?Ke:jn}}bn.DEFAULT_IMAGE=null;bn.DEFAULT_MAPPING=Qf;bn.DEFAULT_ANISOTROPY=1;class ye{constructor(t=0,e=0,n=0,i=1){ye.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],_=l[9],g=l[2],p=l[6],m=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+g)<.1&&Math.abs(_+p)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(c+1)/2,x=(d+1)/2,A=(m+1)/2,w=(u+f)/4,E=(h+g)/4,D=(_+p)/4;return v>x&&v>A?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=w/n,s=E/n):x>A?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=w/i,s=D/i):A<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(A),n=E/s,i=D/s),this.set(n,i,s,e),this}let M=Math.sqrt((p-_)*(p-_)+(h-g)*(h-g)+(f-u)*(f-u));return Math.abs(M)<.001&&(M=1),this.x=(p-_)/M,this.y=(h-g)/M,this.z=(f-u)/M,this.w=Math.acos((c+d+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class wg extends Fs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ye(0,0,t,e),this.scissorTest=!1,this.viewport=new ye(0,0,t,e);const i={width:t,height:e,depth:1};n.encoding!==void 0&&(so("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Pr?Ke:jn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new bn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new fd(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ci extends wg{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class dd extends bn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=xn,this.minFilter=xn,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ag extends bn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=xn,this.minFilter=xn,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class No{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const f=s[o+0],d=s[o+1],_=s[o+2],g=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=_,t[e+3]=g;return}if(h!==g||l!==f||c!==d||u!==_){let p=1-a;const m=l*f+c*d+u*_+h*g,M=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const A=Math.sqrt(v),w=Math.atan2(A,m*M);p=Math.sin(p*w)/A,a=Math.sin(a*w)/A}const x=a*M;if(l=l*p+f*x,c=c*p+d*x,u=u*p+_*x,h=h*p+g*x,p===1-a){const A=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=A,c*=A,u*=A,h*=A}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[o],f=s[o+1],d=s[o+2],_=s[o+3];return t[e]=a*_+u*h+l*d-c*f,t[e+1]=l*_+u*f+c*h-a*d,t[e+2]=c*_+u*d+a*f-l*h,t[e+3]=u*_-a*h-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(s/2),f=l(n/2),d=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h-f*d*_;break;case"YXZ":this._x=f*u*h+c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h+f*d*_;break;case"ZXY":this._x=f*u*h-c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h-f*d*_;break;case"ZYX":this._x=f*u*h-c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h+f*d*_;break;case"YZX":this._x=f*u*h+c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h-f*d*_;break;case"XZY":this._x=f*u*h-c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h+f*d*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-i)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(s-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ze(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(s),n*Math.cos(s),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(xh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(xh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),u=2*(a*e-s*i),h=2*(s*n-o*e);return this.x=e+l*c+o*h-a*u,this.y=n+l*u+a*c-s*h,this.z=i+l*h+s*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return bl.copy(this).projectOnVector(t),this.sub(bl)}reflect(t){return this.sub(bl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ze(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const bl=new P,xh=new No;class Io{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ni.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ni.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ni.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ni):ni.fromBufferAttribute(s,o),ni.applyMatrix4(t.matrixWorld),this.expandByPoint(ni);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Go.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Go.copy(n.boundingBox)),Go.applyMatrix4(t.matrixWorld),this.union(Go)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,ni),ni.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Gs),Vo.subVectors(this.max,Gs),Xr.subVectors(t.a,Gs),Yr.subVectors(t.b,Gs),qr.subVectors(t.c,Gs),Bi.subVectors(Yr,Xr),ki.subVectors(qr,Yr),dr.subVectors(Xr,qr);let e=[0,-Bi.z,Bi.y,0,-ki.z,ki.y,0,-dr.z,dr.y,Bi.z,0,-Bi.x,ki.z,0,-ki.x,dr.z,0,-dr.x,-Bi.y,Bi.x,0,-ki.y,ki.x,0,-dr.y,dr.x,0];return!wl(e,Xr,Yr,qr,Vo)||(e=[1,0,0,0,1,0,0,0,1],!wl(e,Xr,Yr,qr,Vo))?!1:(Wo.crossVectors(Bi,ki),e=[Wo.x,Wo.y,Wo.z],wl(e,Xr,Yr,qr,Vo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ni).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ni).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Si),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Si=[new P,new P,new P,new P,new P,new P,new P,new P],ni=new P,Go=new Io,Xr=new P,Yr=new P,qr=new P,Bi=new P,ki=new P,dr=new P,Gs=new P,Vo=new P,Wo=new P,pr=new P;function wl(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){pr.fromArray(r,s);const a=i.x*Math.abs(pr.x)+i.y*Math.abs(pr.y)+i.z*Math.abs(pr.z),l=t.dot(pr),c=e.dot(pr),u=n.dot(pr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Cg=new Io,Vs=new P,Al=new P;class il{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Cg.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Vs.subVectors(t,this.center);const e=Vs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Vs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Al.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Vs.copy(t.center).add(Al)),this.expandByPoint(Vs.copy(t.center).sub(Al))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Mi=new P,Cl=new P,Xo=new P,Hi=new P,Rl=new P,Yo=new P,Pl=new P;class pd{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Mi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Mi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Mi.copy(this.origin).addScaledVector(this.direction,e),Mi.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Cl.copy(t).add(e).multiplyScalar(.5),Xo.copy(e).sub(t).normalize(),Hi.copy(this.origin).sub(Cl);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Xo),a=Hi.dot(this.direction),l=-Hi.dot(Xo),c=Hi.lengthSq(),u=Math.abs(1-o*o);let h,f,d,_;if(u>0)if(h=o*l-a,f=o*a-l,_=s*u,h>=0)if(f>=-_)if(f<=_){const g=1/u;h*=g,f*=g,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-_?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c):f<=_?(h=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Cl).addScaledVector(Xo,f),d}intersectSphere(t,e){Mi.subVectors(t.center,this.origin);const n=Mi.dot(this.direction),i=Mi.dot(Mi)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),u>=0?(s=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Mi)!==null}intersectTriangle(t,e,n,i,s){Rl.subVectors(e,t),Yo.subVectors(n,t),Pl.crossVectors(Rl,Yo);let o=this.direction.dot(Pl),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Hi.subVectors(this.origin,t);const l=a*this.direction.dot(Yo.crossVectors(Hi,Yo));if(l<0)return null;const c=a*this.direction.dot(Rl.cross(Hi));if(c<0||l+c>o)return null;const u=-a*Hi.dot(Pl);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pe{constructor(t,e,n,i,s,o,a,l,c,u,h,f,d,_,g,p){Pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c,u,h,f,d,_,g,p)}set(t,e,n,i,s,o,a,l,c,u,h,f,d,_,g,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=f,m[3]=d,m[7]=_,m[11]=g,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/$r.setFromMatrixColumn(t,0).length(),s=1/$r.setFromMatrixColumn(t,1).length(),o=1/$r.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const f=o*u,d=o*h,_=a*u,g=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=d+_*c,e[5]=f-g*c,e[9]=-a*l,e[2]=g-f*c,e[6]=_+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*u,d=l*h,_=c*u,g=c*h;e[0]=f+g*a,e[4]=_*a-d,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=d*a-_,e[6]=g+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*u,d=l*h,_=c*u,g=c*h;e[0]=f-g*a,e[4]=-o*h,e[8]=_+d*a,e[1]=d+_*a,e[5]=o*u,e[9]=g-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*u,d=o*h,_=a*u,g=a*h;e[0]=l*u,e[4]=_*c-d,e[8]=f*c+g,e[1]=l*h,e[5]=g*c+f,e[9]=d*c-_,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,_=a*l,g=a*c;e[0]=l*u,e[4]=g-f*h,e[8]=_*h+d,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=d*h+_,e[10]=f-g*h}else if(t.order==="XZY"){const f=o*l,d=o*c,_=a*l,g=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+g,e[5]=o*u,e[9]=d*h-_,e[2]=_*h-d,e[6]=a*u,e[10]=g*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Rg,t,Pg)}lookAt(t,e,n){const i=this.elements;return Dn.subVectors(t,e),Dn.lengthSq()===0&&(Dn.z=1),Dn.normalize(),Gi.crossVectors(n,Dn),Gi.lengthSq()===0&&(Math.abs(n.z)===1?Dn.x+=1e-4:Dn.z+=1e-4,Dn.normalize(),Gi.crossVectors(n,Dn)),Gi.normalize(),qo.crossVectors(Dn,Gi),i[0]=Gi.x,i[4]=qo.x,i[8]=Dn.x,i[1]=Gi.y,i[5]=qo.y,i[9]=Dn.y,i[2]=Gi.z,i[6]=qo.z,i[10]=Dn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],_=n[2],g=n[6],p=n[10],m=n[14],M=n[3],v=n[7],x=n[11],A=n[15],w=i[0],E=i[4],D=i[8],S=i[12],y=i[1],F=i[5],N=i[9],K=i[13],L=i[2],O=i[6],k=i[10],X=i[14],Y=i[3],$=i[7],R=i[11],J=i[15];return s[0]=o*w+a*y+l*L+c*Y,s[4]=o*E+a*F+l*O+c*$,s[8]=o*D+a*N+l*k+c*R,s[12]=o*S+a*K+l*X+c*J,s[1]=u*w+h*y+f*L+d*Y,s[5]=u*E+h*F+f*O+d*$,s[9]=u*D+h*N+f*k+d*R,s[13]=u*S+h*K+f*X+d*J,s[2]=_*w+g*y+p*L+m*Y,s[6]=_*E+g*F+p*O+m*$,s[10]=_*D+g*N+p*k+m*R,s[14]=_*S+g*K+p*X+m*J,s[3]=M*w+v*y+x*L+A*Y,s[7]=M*E+v*F+x*O+A*$,s[11]=M*D+v*N+x*k+A*R,s[15]=M*S+v*K+x*X+A*J,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],d=t[14],_=t[3],g=t[7],p=t[11],m=t[15];return _*(+s*l*h-i*c*h-s*a*f+n*c*f+i*a*d-n*l*d)+g*(+e*l*d-e*c*f+s*o*f-i*o*d+i*c*u-s*l*u)+p*(+e*c*h-e*a*d-s*o*h+n*o*d+s*a*u-n*c*u)+m*(-i*a*u-e*l*h+e*a*f+i*o*h-n*o*f+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],d=t[11],_=t[12],g=t[13],p=t[14],m=t[15],M=h*p*c-g*f*c+g*l*d-a*p*d-h*l*m+a*f*m,v=_*f*c-u*p*c-_*l*d+o*p*d+u*l*m-o*f*m,x=u*g*c-_*h*c+_*a*d-o*g*d-u*a*m+o*h*m,A=_*h*l-u*g*l-_*a*f+o*g*f+u*a*p-o*h*p,w=e*M+n*v+i*x+s*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/w;return t[0]=M*E,t[1]=(g*f*s-h*p*s-g*i*d+n*p*d+h*i*m-n*f*m)*E,t[2]=(a*p*s-g*l*s+g*i*c-n*p*c-a*i*m+n*l*m)*E,t[3]=(h*l*s-a*f*s-h*i*c+n*f*c+a*i*d-n*l*d)*E,t[4]=v*E,t[5]=(u*p*s-_*f*s+_*i*d-e*p*d-u*i*m+e*f*m)*E,t[6]=(_*l*s-o*p*s-_*i*c+e*p*c+o*i*m-e*l*m)*E,t[7]=(o*f*s-u*l*s+u*i*c-e*f*c-o*i*d+e*l*d)*E,t[8]=x*E,t[9]=(_*h*s-u*g*s-_*n*d+e*g*d+u*n*m-e*h*m)*E,t[10]=(o*g*s-_*a*s+_*n*c-e*g*c-o*n*m+e*a*m)*E,t[11]=(u*a*s-o*h*s-u*n*c+e*h*c+o*n*d-e*a*d)*E,t[12]=A*E,t[13]=(u*g*i-_*h*i+_*n*f-e*g*f-u*n*p+e*h*p)*E,t[14]=(_*a*i-o*g*i-_*n*l+e*g*l+o*n*p-e*a*p)*E,t[15]=(o*h*i-u*a*i+u*n*l-e*h*l-o*n*f+e*a*f)*E,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,u=o+o,h=a+a,f=s*c,d=s*u,_=s*h,g=o*u,p=o*h,m=a*h,M=l*c,v=l*u,x=l*h,A=n.x,w=n.y,E=n.z;return i[0]=(1-(g+m))*A,i[1]=(d+x)*A,i[2]=(_-v)*A,i[3]=0,i[4]=(d-x)*w,i[5]=(1-(f+m))*w,i[6]=(p+M)*w,i[7]=0,i[8]=(_+v)*E,i[9]=(p-M)*E,i[10]=(1-(f+g))*E,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=$r.set(i[0],i[1],i[2]).length();const o=$r.set(i[4],i[5],i[6]).length(),a=$r.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],ii.copy(this);const c=1/s,u=1/o,h=1/a;return ii.elements[0]*=c,ii.elements[1]*=c,ii.elements[2]*=c,ii.elements[4]*=u,ii.elements[5]*=u,ii.elements[6]*=u,ii.elements[8]*=h,ii.elements[9]*=h,ii.elements[10]*=h,e.setFromRotationMatrix(ii),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=Ri){const l=this.elements,c=2*s/(e-t),u=2*s/(n-i),h=(e+t)/(e-t),f=(n+i)/(n-i);let d,_;if(a===Ri)d=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Ba)d=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=Ri){const l=this.elements,c=1/(e-t),u=1/(n-i),h=1/(o-s),f=(e+t)*c,d=(n+i)*u;let _,g;if(a===Ri)_=(o+s)*h,g=-2*h;else if(a===Ba)_=s*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const $r=new P,ii=new Pe,Rg=new P(0,0,0),Pg=new P(1,1,1),Gi=new P,qo=new P,Dn=new P,Sh=new Pe,Mh=new No;class rl{constructor(t=0,e=0,n=0,i=rl.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Sh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Sh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Mh.setFromEuler(this),this.setFromQuaternion(Mh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}rl.DEFAULT_ORDER="XYZ";class md{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Lg=0;const yh=new P,Kr=new No,yi=new Pe,$o=new P,Ws=new P,Dg=new P,Ug=new No,Eh=new P(1,0,0),Th=new P(0,1,0),bh=new P(0,0,1),Ng={type:"added"},Ig={type:"removed"};class qe extends Fs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Lg++}),this.uuid=zs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qe.DEFAULT_UP.clone();const t=new P,e=new rl,n=new No,i=new P(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Pe},normalMatrix:{value:new ne}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=qe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new md,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Kr.setFromAxisAngle(t,e),this.quaternion.multiply(Kr),this}rotateOnWorldAxis(t,e){return Kr.setFromAxisAngle(t,e),this.quaternion.premultiply(Kr),this}rotateX(t){return this.rotateOnAxis(Eh,t)}rotateY(t){return this.rotateOnAxis(Th,t)}rotateZ(t){return this.rotateOnAxis(bh,t)}translateOnAxis(t,e){return yh.copy(t).applyQuaternion(this.quaternion),this.position.add(yh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Eh,t)}translateY(t){return this.translateOnAxis(Th,t)}translateZ(t){return this.translateOnAxis(bh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(yi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?$o.copy(t):$o.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yi.lookAt(Ws,$o,this.up):yi.lookAt($o,Ws,this.up),this.quaternion.setFromRotationMatrix(yi),i&&(yi.extractRotation(i.matrixWorld),Kr.setFromRotationMatrix(yi),this.quaternion.premultiply(Kr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Ng)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ig)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),yi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),yi.multiply(t.parent.matrixWorld)),t.applyMatrix4(yi),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,t,Dg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,Ug,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),d=o(t.animations),_=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}qe.DEFAULT_UP=new P(0,1,0);qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ri=new P,Ei=new P,Ll=new P,Ti=new P,Zr=new P,Jr=new P,wh=new P,Dl=new P,Ul=new P,Nl=new P;let Ko=!1;class oi{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),ri.subVectors(t,e),i.cross(ri);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){ri.subVectors(i,e),Ei.subVectors(n,e),Ll.subVectors(t,e);const o=ri.dot(ri),a=ri.dot(Ei),l=ri.dot(Ll),c=Ei.dot(Ei),u=Ei.dot(Ll),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,_=(o*u-a*l)*f;return s.set(1-d-_,_,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Ti)===null?!1:Ti.x>=0&&Ti.y>=0&&Ti.x+Ti.y<=1}static getUV(t,e,n,i,s,o,a,l){return Ko===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ko=!0),this.getInterpolation(t,e,n,i,s,o,a,l)}static getInterpolation(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,Ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ti.x),l.addScaledVector(o,Ti.y),l.addScaledVector(a,Ti.z),l)}static isFrontFacing(t,e,n,i){return ri.subVectors(n,e),Ei.subVectors(t,e),ri.cross(Ei).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ri.subVectors(this.c,this.b),Ei.subVectors(this.a,this.b),ri.cross(Ei).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return oi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return oi.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,s){return Ko===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ko=!0),oi.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}getInterpolation(t,e,n,i,s){return oi.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return oi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return oi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;Zr.subVectors(i,n),Jr.subVectors(s,n),Dl.subVectors(t,n);const l=Zr.dot(Dl),c=Jr.dot(Dl);if(l<=0&&c<=0)return e.copy(n);Ul.subVectors(t,i);const u=Zr.dot(Ul),h=Jr.dot(Ul);if(u>=0&&h<=u)return e.copy(i);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(Zr,o);Nl.subVectors(t,s);const d=Zr.dot(Nl),_=Jr.dot(Nl);if(_>=0&&d<=_)return e.copy(s);const g=d*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),e.copy(n).addScaledVector(Jr,a);const p=u*_-d*h;if(p<=0&&h-u>=0&&d-_>=0)return wh.subVectors(s,i),a=(h-u)/(h-u+(d-_)),e.copy(i).addScaledVector(wh,a);const m=1/(p+g+f);return o=g*m,a=f*m,e.copy(n).addScaledVector(Zr,o).addScaledVector(Jr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const gd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vi={h:0,s:0,l:0},Zo={h:0,s:0,l:0};function Il(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class Ot{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,pe.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=pe.workingColorSpace){return this.r=t,this.g=e,this.b=n,pe.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=pe.workingColorSpace){if(t=$c(t,1),e=Ze(e,0,1),n=Ze(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Il(o,s,t+1/3),this.g=Il(o,s,t),this.b=Il(o,s,t-1/3)}return pe.toWorkingColorSpace(this,i),this}setStyle(t,e=Ke){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ke){const n=gd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=vs(t.r),this.g=vs(t.g),this.b=vs(t.b),this}copyLinearToSRGB(t){return this.r=El(t.r),this.g=El(t.g),this.b=El(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ke){return pe.fromWorkingColorSpace(nn.copy(this),t),Math.round(Ze(nn.r*255,0,255))*65536+Math.round(Ze(nn.g*255,0,255))*256+Math.round(Ze(nn.b*255,0,255))}getHexString(t=Ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=pe.workingColorSpace){pe.fromWorkingColorSpace(nn.copy(this),e);const n=nn.r,i=nn.g,s=nn.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=pe.workingColorSpace){return pe.fromWorkingColorSpace(nn.copy(this),e),t.r=nn.r,t.g=nn.g,t.b=nn.b,t}getStyle(t=Ke){pe.fromWorkingColorSpace(nn.copy(this),t);const e=nn.r,n=nn.g,i=nn.b;return t!==Ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Vi),this.setHSL(Vi.h+t,Vi.s+e,Vi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Vi),t.getHSL(Zo);const n=ro(Vi.h,Zo.h,e),i=ro(Vi.s,Zo.s,e),s=ro(Vi.l,Zo.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const nn=new Ot;Ot.NAMES=gd;let Og=0;class Bs extends Fs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Og++}),this.uuid=zs(),this.name="",this.type="Material",this.blending=Qi,this.side=sr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=uc,this.blendDst=hc,this.blendEquation=Tr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ot(0,0,0),this.blendAlpha=0,this.depthFunc=Ia,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vr,this.stencilZFail=Vr,this.stencilZPass=Vr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Qi&&(n.blending=this.blending),this.side!==sr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==uc&&(n.blendSrc=this.blendSrc),this.blendDst!==hc&&(n.blendDst=this.blendDst),this.blendEquation!==Tr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ia&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Oo extends Bs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Jf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ie=new P,Jo=new xt;class ln{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=dh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=qi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Jo.fromBufferAttribute(this,e),Jo.applyMatrix3(t),this.setXY(e,Jo.x,Jo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix3(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=us(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=dn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=us(e,this.array)),e}setX(t,e){return this.normalized&&(e=dn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=us(e,this.array)),e}setY(t,e){return this.normalized&&(e=dn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=us(e,this.array)),e}setZ(t,e){return this.normalized&&(e=dn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=us(e,this.array)),e}setW(t,e){return this.normalized&&(e=dn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=dn(e,this.array),n=dn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=dn(e,this.array),n=dn(n,this.array),i=dn(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=dn(e,this.array),n=dn(n,this.array),i=dn(i,this.array),s=dn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==dh&&(t.usage=this.usage),t}}class _d extends ln{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class vd extends ln{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ne extends ln{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Fg=0;const qn=new Pe,Ol=new qe,jr=new P,Un=new Io,Xs=new Io,We=new P;class Mn extends Fs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fg++}),this.uuid=zs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ud(t)?vd:_d)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ne().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return qn.makeRotationFromQuaternion(t),this.applyMatrix4(qn),this}rotateX(t){return qn.makeRotationX(t),this.applyMatrix4(qn),this}rotateY(t){return qn.makeRotationY(t),this.applyMatrix4(qn),this}rotateZ(t){return qn.makeRotationZ(t),this.applyMatrix4(qn),this}translate(t,e,n){return qn.makeTranslation(t,e,n),this.applyMatrix4(qn),this}scale(t,e,n){return qn.makeScale(t,e,n),this.applyMatrix4(qn),this}lookAt(t){return Ol.lookAt(t),Ol.updateMatrix(),this.applyMatrix4(Ol.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(jr).negate(),this.translate(jr.x,jr.y,jr.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ne(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Io);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Un.setFromBufferAttribute(s),this.morphTargetsRelative?(We.addVectors(this.boundingBox.min,Un.min),this.boundingBox.expandByPoint(We),We.addVectors(this.boundingBox.max,Un.max),this.boundingBox.expandByPoint(We)):(this.boundingBox.expandByPoint(Un.min),this.boundingBox.expandByPoint(Un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new il);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(Un.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Xs.setFromBufferAttribute(a),this.morphTargetsRelative?(We.addVectors(Un.min,Xs.min),Un.expandByPoint(We),We.addVectors(Un.max,Xs.max),Un.expandByPoint(We)):(Un.expandByPoint(Xs.min),Un.expandByPoint(Xs.max))}Un.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)We.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(We));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)We.fromBufferAttribute(a,c),l&&(jr.fromBufferAttribute(t,c),We.add(jr)),i=Math.max(i,n.distanceToSquared(We))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,s=e.normal.array,o=e.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ln(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let y=0;y<a;y++)c[y]=new P,u[y]=new P;const h=new P,f=new P,d=new P,_=new xt,g=new xt,p=new xt,m=new P,M=new P;function v(y,F,N){h.fromArray(i,y*3),f.fromArray(i,F*3),d.fromArray(i,N*3),_.fromArray(o,y*2),g.fromArray(o,F*2),p.fromArray(o,N*2),f.sub(h),d.sub(h),g.sub(_),p.sub(_);const K=1/(g.x*p.y-p.x*g.y);isFinite(K)&&(m.copy(f).multiplyScalar(p.y).addScaledVector(d,-g.y).multiplyScalar(K),M.copy(d).multiplyScalar(g.x).addScaledVector(f,-p.x).multiplyScalar(K),c[y].add(m),c[F].add(m),c[N].add(m),u[y].add(M),u[F].add(M),u[N].add(M))}let x=this.groups;x.length===0&&(x=[{start:0,count:n.length}]);for(let y=0,F=x.length;y<F;++y){const N=x[y],K=N.start,L=N.count;for(let O=K,k=K+L;O<k;O+=3)v(n[O+0],n[O+1],n[O+2])}const A=new P,w=new P,E=new P,D=new P;function S(y){E.fromArray(s,y*3),D.copy(E);const F=c[y];A.copy(F),A.sub(E.multiplyScalar(E.dot(F))).normalize(),w.crossVectors(D,F);const K=w.dot(u[y])<0?-1:1;l[y*4]=A.x,l[y*4+1]=A.y,l[y*4+2]=A.z,l[y*4+3]=K}for(let y=0,F=x.length;y<F;++y){const N=x[y],K=N.start,L=N.count;for(let O=K,k=K+L;O<k;O+=3)S(n[O+0]),S(n[O+1]),S(n[O+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ln(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new P,s=new P,o=new P,a=new P,l=new P,c=new P,u=new P,h=new P;if(t)for(let f=0,d=t.count;f<d;f+=3){const _=t.getX(f+0),g=t.getX(f+1),p=t.getX(f+2);i.fromBufferAttribute(e,_),s.fromBufferAttribute(e,g),o.fromBufferAttribute(e,p),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,p),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)We.fromBufferAttribute(t,e),We.normalize(),t.setXYZ(e,We.x,We.y,We.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,_=0;for(let g=0,p=l.length;g<p;g++){a.isInterleavedBufferAttribute?d=l[g]*a.data.stride+a.offset:d=l[g]*u;for(let m=0;m<u;m++)f[_++]=c[d++]}return new ln(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Mn,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=t(f,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(t.data))}u.length>0&&(i[l]=u,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ah=new Pe,mr=new pd,jo=new il,Ch=new P,Qr=new P,ts=new P,es=new P,Fl=new P,Qo=new P,ta=new xt,ea=new xt,na=new xt,Rh=new P,Ph=new P,Lh=new P,ia=new P,ra=new P;class De extends qe{constructor(t=new Mn,e=new Oo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){Qo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(Fl.fromBufferAttribute(h,t),o?Qo.addScaledVector(Fl,u):Qo.addScaledVector(Fl.sub(e),u))}e.add(Qo)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),jo.copy(n.boundingSphere),jo.applyMatrix4(s),mr.copy(t.ray).recast(t.near),!(jo.containsPoint(mr.origin)===!1&&(mr.intersectSphere(jo,Ch)===null||mr.origin.distanceToSquared(Ch)>(t.far-t.near)**2))&&(Ah.copy(s).invert(),mr.copy(t.ray).applyMatrix4(Ah),!(n.boundingBox!==null&&mr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,mr)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const p=f[_],m=o[p.materialIndex],M=Math.max(p.start,d.start),v=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let x=M,A=v;x<A;x+=3){const w=a.getX(x),E=a.getX(x+1),D=a.getX(x+2);i=sa(this,m,t,n,c,u,h,w,E,D),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const _=Math.max(0,d.start),g=Math.min(a.count,d.start+d.count);for(let p=_,m=g;p<m;p+=3){const M=a.getX(p),v=a.getX(p+1),x=a.getX(p+2);i=sa(this,o,t,n,c,u,h,M,v,x),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const p=f[_],m=o[p.materialIndex],M=Math.max(p.start,d.start),v=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let x=M,A=v;x<A;x+=3){const w=x,E=x+1,D=x+2;i=sa(this,m,t,n,c,u,h,w,E,D),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const _=Math.max(0,d.start),g=Math.min(l.count,d.start+d.count);for(let p=_,m=g;p<m;p+=3){const M=p,v=p+1,x=p+2;i=sa(this,o,t,n,c,u,h,M,v,x),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function zg(r,t,e,n,i,s,o,a){let l;if(t.side===Tn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side===sr,a),l===null)return null;ra.copy(a),ra.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(ra);return c<e.near||c>e.far?null:{distance:c,point:ra.clone(),object:r}}function sa(r,t,e,n,i,s,o,a,l,c){r.getVertexPosition(a,Qr),r.getVertexPosition(l,ts),r.getVertexPosition(c,es);const u=zg(r,t,e,n,Qr,ts,es,ia);if(u){i&&(ta.fromBufferAttribute(i,a),ea.fromBufferAttribute(i,l),na.fromBufferAttribute(i,c),u.uv=oi.getInterpolation(ia,Qr,ts,es,ta,ea,na,new xt)),s&&(ta.fromBufferAttribute(s,a),ea.fromBufferAttribute(s,l),na.fromBufferAttribute(s,c),u.uv1=oi.getInterpolation(ia,Qr,ts,es,ta,ea,na,new xt),u.uv2=u.uv1),o&&(Rh.fromBufferAttribute(o,a),Ph.fromBufferAttribute(o,l),Lh.fromBufferAttribute(o,c),u.normal=oi.getInterpolation(ia,Qr,ts,es,Rh,Ph,Lh,new P),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new P,materialIndex:0};oi.getNormal(Qr,ts,es,h.normal),u.face=h}return u}class Fo extends Mn{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;_("z","y","x",-1,-1,n,e,t,o,s,0),_("z","y","x",1,-1,n,e,-t,o,s,1),_("x","z","y",1,1,t,n,e,i,o,2),_("x","z","y",1,-1,t,n,-e,i,o,3),_("x","y","z",1,-1,t,e,n,i,s,4),_("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ne(c,3)),this.setAttribute("normal",new Ne(u,3)),this.setAttribute("uv",new Ne(h,2));function _(g,p,m,M,v,x,A,w,E,D,S){const y=x/E,F=A/D,N=x/2,K=A/2,L=w/2,O=E+1,k=D+1;let X=0,Y=0;const $=new P;for(let R=0;R<k;R++){const J=R*F-K;for(let nt=0;nt<O;nt++){const q=nt*y-N;$[g]=q*M,$[p]=J*v,$[m]=L,c.push($.x,$.y,$.z),$[g]=0,$[p]=0,$[m]=w>0?1:-1,u.push($.x,$.y,$.z),h.push(nt/E),h.push(1-R/D),X+=1}}for(let R=0;R<D;R++)for(let J=0;J<E;J++){const nt=f+J+O*R,q=f+J+O*(R+1),Z=f+(J+1)+O*(R+1),st=f+(J+1)+O*R;l.push(nt,q,st),l.push(q,Z,st),Y+=6}a.addGroup(d,Y,S),d+=Y,f+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fo(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Rs(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function mn(r){const t={};for(let e=0;e<r.length;e++){const n=Rs(r[e]);for(const i in n)t[i]=n[i]}return t}function Bg(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function xd(r){return r.getRenderTarget()===null?r.outputColorSpace:pe.workingColorSpace}const Ga={clone:Rs,merge:mn};var kg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Je extends Bs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=kg,this.fragmentShader=Hg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Rs(t.uniforms),this.uniformsGroups=Bg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Sd extends qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe,this.coordinateSystem=Ri}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Fn extends Sd{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Eo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(io*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Eo*2*Math.atan(Math.tan(io*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(io*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ns=-90,is=1;class Gg extends qe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Fn(ns,is,t,e);i.layers=this.layers,this.add(i);const s=new Fn(ns,is,t,e);s.layers=this.layers,this.add(s);const o=new Fn(ns,is,t,e);o.layers=this.layers,this.add(o);const a=new Fn(ns,is,t,e);a.layers=this.layers,this.add(a);const l=new Fn(ns,is,t,e);l.layers=this.layers,this.add(l);const c=new Fn(ns,is,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===Ri)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ba)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Md extends bn{constructor(t,e,n,i,s,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:ws,super(t,e,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Vg extends ci{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];e.encoding!==void 0&&(so("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Pr?Ke:jn),this.texture=new Md(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Kn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Fo(5,5,5),s=new Je({name:"CubemapFromEquirect",uniforms:Rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Tn,blending:Li});s.uniforms.tEquirect.value=e;const o=new De(i,s),a=e.minFilter;return e.minFilter===yo&&(e.minFilter=Kn),new Gg(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const zl=new P,Wg=new P,Xg=new ne;class xr{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=zl.subVectors(n,e).cross(Wg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(zl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Xg.getNormalMatrix(t),i=this.coplanarPoint(zl).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const gr=new il,oa=new P;class Kc{constructor(t=new xr,e=new xr,n=new xr,i=new xr,s=new xr,o=new xr){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ri){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],h=i[6],f=i[7],d=i[8],_=i[9],g=i[10],p=i[11],m=i[12],M=i[13],v=i[14],x=i[15];if(n[0].setComponents(l-s,f-c,p-d,x-m).normalize(),n[1].setComponents(l+s,f+c,p+d,x+m).normalize(),n[2].setComponents(l+o,f+u,p+_,x+M).normalize(),n[3].setComponents(l-o,f-u,p-_,x-M).normalize(),n[4].setComponents(l-a,f-h,p-g,x-v).normalize(),e===Ri)n[5].setComponents(l+a,f+h,p+g,x+v).normalize();else if(e===Ba)n[5].setComponents(a,h,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),gr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),gr.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(gr)}intersectsSprite(t){return gr.center.set(0,0,0),gr.radius=.7071067811865476,gr.applyMatrix4(t.matrixWorld),this.intersectsSphere(gr)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(oa.x=i.normal.x>0?t.max.x:t.min.x,oa.y=i.normal.y>0?t.max.y:t.min.y,oa.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(oa)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function yd(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Yg(r,t){const e=t.isWebGL2,n=new WeakMap;function i(c,u){const h=c.array,f=c.usage,d=h.byteLength,_=r.createBuffer();r.bindBuffer(u,_),r.bufferData(u,h,f),c.onUploadCallback();let g;if(h instanceof Float32Array)g=r.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)g=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=r.UNSIGNED_SHORT;else if(h instanceof Int16Array)g=r.SHORT;else if(h instanceof Uint32Array)g=r.UNSIGNED_INT;else if(h instanceof Int32Array)g=r.INT;else if(h instanceof Int8Array)g=r.BYTE;else if(h instanceof Uint8Array)g=r.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)g=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:_,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:d}}function s(c,u,h){const f=u.array,d=u._updateRange,_=u.updateRanges;if(r.bindBuffer(h,c),d.count===-1&&_.length===0&&r.bufferSubData(h,0,f),_.length!==0){for(let g=0,p=_.length;g<p;g++){const m=_[g];e?r.bufferSubData(h,m.start*f.BYTES_PER_ELEMENT,f,m.start,m.count):r.bufferSubData(h,m.start*f.BYTES_PER_ELEMENT,f.subarray(m.start,m.start+m.count))}u.clearUpdateRanges()}d.count!==-1&&(e?r.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):r.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(r.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);if(h===void 0)n.set(c,i(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,c,u),h.version=c.version}}return{get:o,remove:a,update:l}}class Ii extends Mn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=t/a,f=e/l,d=[],_=[],g=[],p=[];for(let m=0;m<u;m++){const M=m*f-o;for(let v=0;v<c;v++){const x=v*h-s;_.push(x,-M,0),g.push(0,0,1),p.push(v/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<a;M++){const v=M+c*m,x=M+c*(m+1),A=M+1+c*(m+1),w=M+1+c*m;d.push(v,x,w),d.push(x,A,w)}this.setIndex(d),this.setAttribute("position",new Ne(_,3)),this.setAttribute("normal",new Ne(g,3)),this.setAttribute("uv",new Ne(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ii(t.width,t.height,t.widthSegments,t.heightSegments)}}var qg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$g=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Kg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jg=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,jg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,t_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,e_=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,n_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,i_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,r_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,s_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,o_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,a_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,l_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,c_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,u_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,h_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,f_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,d_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,p_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,m_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,g_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,__=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,v_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,x_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,S_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,M_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,y_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,E_="gl_FragColor = linearToOutputTexel( gl_FragColor );",T_=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,b_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,w_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,A_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,C_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,R_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,P_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,L_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,D_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,U_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,N_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,I_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,O_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,F_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,z_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,B_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,k_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,H_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,G_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,V_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,W_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,X_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Y_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,q_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,K_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Z_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,J_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,j_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Q_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,t0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,e0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,n0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,i0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,r0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,s0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,o0=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,a0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,l0=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,c0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,u0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,h0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,f0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,d0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,p0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,m0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,g0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,v0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,x0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,S0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,M0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,y0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,E0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,T0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,b0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,w0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,A0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,C0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,R0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,P0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,L0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,D0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,U0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,N0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,I0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,O0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,F0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,z0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,B0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,k0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,H0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,G0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,V0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,W0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,X0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Y0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,q0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,K0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,J0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,j0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Q0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,tv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ev=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,nv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,iv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ov=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,av=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,hv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,dv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,pv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,_v=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Mv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ev=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Tv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Jt={alphahash_fragment:qg,alphahash_pars_fragment:$g,alphamap_fragment:Kg,alphamap_pars_fragment:Zg,alphatest_fragment:Jg,alphatest_pars_fragment:jg,aomap_fragment:Qg,aomap_pars_fragment:t_,batching_pars_vertex:e_,batching_vertex:n_,begin_vertex:i_,beginnormal_vertex:r_,bsdfs:s_,iridescence_fragment:o_,bumpmap_pars_fragment:a_,clipping_planes_fragment:l_,clipping_planes_pars_fragment:c_,clipping_planes_pars_vertex:u_,clipping_planes_vertex:h_,color_fragment:f_,color_pars_fragment:d_,color_pars_vertex:p_,color_vertex:m_,common:g_,cube_uv_reflection_fragment:__,defaultnormal_vertex:v_,displacementmap_pars_vertex:x_,displacementmap_vertex:S_,emissivemap_fragment:M_,emissivemap_pars_fragment:y_,colorspace_fragment:E_,colorspace_pars_fragment:T_,envmap_fragment:b_,envmap_common_pars_fragment:w_,envmap_pars_fragment:A_,envmap_pars_vertex:C_,envmap_physical_pars_fragment:k_,envmap_vertex:R_,fog_vertex:P_,fog_pars_vertex:L_,fog_fragment:D_,fog_pars_fragment:U_,gradientmap_pars_fragment:N_,lightmap_fragment:I_,lightmap_pars_fragment:O_,lights_lambert_fragment:F_,lights_lambert_pars_fragment:z_,lights_pars_begin:B_,lights_toon_fragment:H_,lights_toon_pars_fragment:G_,lights_phong_fragment:V_,lights_phong_pars_fragment:W_,lights_physical_fragment:X_,lights_physical_pars_fragment:Y_,lights_fragment_begin:q_,lights_fragment_maps:$_,lights_fragment_end:K_,logdepthbuf_fragment:Z_,logdepthbuf_pars_fragment:J_,logdepthbuf_pars_vertex:j_,logdepthbuf_vertex:Q_,map_fragment:t0,map_pars_fragment:e0,map_particle_fragment:n0,map_particle_pars_fragment:i0,metalnessmap_fragment:r0,metalnessmap_pars_fragment:s0,morphcolor_vertex:o0,morphnormal_vertex:a0,morphtarget_pars_vertex:l0,morphtarget_vertex:c0,normal_fragment_begin:u0,normal_fragment_maps:h0,normal_pars_fragment:f0,normal_pars_vertex:d0,normal_vertex:p0,normalmap_pars_fragment:m0,clearcoat_normal_fragment_begin:g0,clearcoat_normal_fragment_maps:_0,clearcoat_pars_fragment:v0,iridescence_pars_fragment:x0,opaque_fragment:S0,packing:M0,premultiplied_alpha_fragment:y0,project_vertex:E0,dithering_fragment:T0,dithering_pars_fragment:b0,roughnessmap_fragment:w0,roughnessmap_pars_fragment:A0,shadowmap_pars_fragment:C0,shadowmap_pars_vertex:R0,shadowmap_vertex:P0,shadowmask_pars_fragment:L0,skinbase_vertex:D0,skinning_pars_vertex:U0,skinning_vertex:N0,skinnormal_vertex:I0,specularmap_fragment:O0,specularmap_pars_fragment:F0,tonemapping_fragment:z0,tonemapping_pars_fragment:B0,transmission_fragment:k0,transmission_pars_fragment:H0,uv_pars_fragment:G0,uv_pars_vertex:V0,uv_vertex:W0,worldpos_vertex:X0,background_vert:Y0,background_frag:q0,backgroundCube_vert:$0,backgroundCube_frag:K0,cube_vert:Z0,cube_frag:J0,depth_vert:j0,depth_frag:Q0,distanceRGBA_vert:tv,distanceRGBA_frag:ev,equirect_vert:nv,equirect_frag:iv,linedashed_vert:rv,linedashed_frag:sv,meshbasic_vert:ov,meshbasic_frag:av,meshlambert_vert:lv,meshlambert_frag:cv,meshmatcap_vert:uv,meshmatcap_frag:hv,meshnormal_vert:fv,meshnormal_frag:dv,meshphong_vert:pv,meshphong_frag:mv,meshphysical_vert:gv,meshphysical_frag:_v,meshtoon_vert:vv,meshtoon_frag:xv,points_vert:Sv,points_frag:Mv,shadow_vert:yv,shadow_frag:Ev,sprite_vert:Tv,sprite_frag:bv},ht={common:{diffuse:{value:new Ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ne}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ne},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0},uvTransform:{value:new ne}},sprite:{diffuse:{value:new Ot(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}}},fi={basic:{uniforms:mn([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:mn([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:mn([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Ot(0)},specular:{value:new Ot(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:mn([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new Ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:mn([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:mn([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:mn([ht.points,ht.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:mn([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:mn([ht.common,ht.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:mn([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:mn([ht.sprite,ht.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:mn([ht.common,ht.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:mn([ht.lights,ht.fog,{color:{value:new Ot(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};fi.physical={uniforms:mn([fi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ne},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ne},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ne},sheen:{value:0},sheenColor:{value:new Ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ne},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ne},attenuationDistance:{value:0},attenuationColor:{value:new Ot(0)},specularColor:{value:new Ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ne},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ne}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};const aa={r:0,b:0,g:0};function wv(r,t,e,n,i,s,o){const a=new Ot(0);let l=s===!0?0:1,c,u,h=null,f=0,d=null;function _(p,m){let M=!1,v=m.isScene===!0?m.background:null;v&&v.isTexture&&(v=(m.backgroundBlurriness>0?e:t).get(v)),v===null?g(a,l):v&&v.isColor&&(g(v,1),M=!0);const x=r.xr.getEnvironmentBlendMode();x==="additive"?n.buffers.color.setClear(0,0,0,1,o):x==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||M)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),v&&(v.isCubeTexture||v.mapping===el)?(u===void 0&&(u=new De(new Fo(1,1,1),new Je({name:"BackgroundCubeMaterial",uniforms:Rs(fi.backgroundCube.uniforms),vertexShader:fi.backgroundCube.vertexShader,fragmentShader:fi.backgroundCube.fragmentShader,side:Tn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,w,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,u.material.toneMapped=pe.getTransfer(v.colorSpace)!==Se,(h!==v||f!==v.version||d!==r.toneMapping)&&(u.material.needsUpdate=!0,h=v,f=v.version,d=r.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new De(new Ii(2,2),new Je({name:"BackgroundMaterial",uniforms:Rs(fi.background.uniforms),vertexShader:fi.background.vertexShader,fragmentShader:fi.background.fragmentShader,side:sr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=pe.getTransfer(v.colorSpace)!==Se,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,h=v,f=v.version,d=r.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function g(p,m){p.getRGB(aa,xd(r)),n.buffers.color.setClear(aa.r,aa.g,aa.b,m,o)}return{getClearColor:function(){return a},setClearColor:function(p,m=1){a.set(p),l=m,g(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,g(a,l)},render:_}}function Av(r,t,e,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=p(null);let c=l,u=!1;function h(L,O,k,X,Y){let $=!1;if(o){const R=g(X,k,O);c!==R&&(c=R,d(c.object)),$=m(L,X,k,Y),$&&M(L,X,k,Y)}else{const R=O.wireframe===!0;(c.geometry!==X.id||c.program!==k.id||c.wireframe!==R)&&(c.geometry=X.id,c.program=k.id,c.wireframe=R,$=!0)}Y!==null&&e.update(Y,r.ELEMENT_ARRAY_BUFFER),($||u)&&(u=!1,D(L,O,k,X),Y!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function f(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function d(L){return n.isWebGL2?r.bindVertexArray(L):s.bindVertexArrayOES(L)}function _(L){return n.isWebGL2?r.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function g(L,O,k){const X=k.wireframe===!0;let Y=a[L.id];Y===void 0&&(Y={},a[L.id]=Y);let $=Y[O.id];$===void 0&&($={},Y[O.id]=$);let R=$[X];return R===void 0&&(R=p(f()),$[X]=R),R}function p(L){const O=[],k=[],X=[];for(let Y=0;Y<i;Y++)O[Y]=0,k[Y]=0,X[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:k,attributeDivisors:X,object:L,attributes:{},index:null}}function m(L,O,k,X){const Y=c.attributes,$=O.attributes;let R=0;const J=k.getAttributes();for(const nt in J)if(J[nt].location>=0){const Z=Y[nt];let st=$[nt];if(st===void 0&&(nt==="instanceMatrix"&&L.instanceMatrix&&(st=L.instanceMatrix),nt==="instanceColor"&&L.instanceColor&&(st=L.instanceColor)),Z===void 0||Z.attribute!==st||st&&Z.data!==st.data)return!0;R++}return c.attributesNum!==R||c.index!==X}function M(L,O,k,X){const Y={},$=O.attributes;let R=0;const J=k.getAttributes();for(const nt in J)if(J[nt].location>=0){let Z=$[nt];Z===void 0&&(nt==="instanceMatrix"&&L.instanceMatrix&&(Z=L.instanceMatrix),nt==="instanceColor"&&L.instanceColor&&(Z=L.instanceColor));const st={};st.attribute=Z,Z&&Z.data&&(st.data=Z.data),Y[nt]=st,R++}c.attributes=Y,c.attributesNum=R,c.index=X}function v(){const L=c.newAttributes;for(let O=0,k=L.length;O<k;O++)L[O]=0}function x(L){A(L,0)}function A(L,O){const k=c.newAttributes,X=c.enabledAttributes,Y=c.attributeDivisors;k[L]=1,X[L]===0&&(r.enableVertexAttribArray(L),X[L]=1),Y[L]!==O&&((n.isWebGL2?r:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,O),Y[L]=O)}function w(){const L=c.newAttributes,O=c.enabledAttributes;for(let k=0,X=O.length;k<X;k++)O[k]!==L[k]&&(r.disableVertexAttribArray(k),O[k]=0)}function E(L,O,k,X,Y,$,R){R===!0?r.vertexAttribIPointer(L,O,k,Y,$):r.vertexAttribPointer(L,O,k,X,Y,$)}function D(L,O,k,X){if(n.isWebGL2===!1&&(L.isInstancedMesh||X.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;v();const Y=X.attributes,$=k.getAttributes(),R=O.defaultAttributeValues;for(const J in $){const nt=$[J];if(nt.location>=0){let q=Y[J];if(q===void 0&&(J==="instanceMatrix"&&L.instanceMatrix&&(q=L.instanceMatrix),J==="instanceColor"&&L.instanceColor&&(q=L.instanceColor)),q!==void 0){const Z=q.normalized,st=q.itemSize,gt=e.get(q);if(gt===void 0)continue;const dt=gt.buffer,Pt=gt.type,Lt=gt.bytesPerElement,Nt=n.isWebGL2===!0&&(Pt===r.INT||Pt===r.UNSIGNED_INT||q.gpuType===td);if(q.isInterleavedBufferAttribute){const Vt=q.data,H=Vt.stride,Wt=q.offset;if(Vt.isInstancedInterleavedBuffer){for(let mt=0;mt<nt.locationSize;mt++)A(nt.location+mt,Vt.meshPerAttribute);L.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Vt.meshPerAttribute*Vt.count)}else for(let mt=0;mt<nt.locationSize;mt++)x(nt.location+mt);r.bindBuffer(r.ARRAY_BUFFER,dt);for(let mt=0;mt<nt.locationSize;mt++)E(nt.location+mt,st/nt.locationSize,Pt,Z,H*Lt,(Wt+st/nt.locationSize*mt)*Lt,Nt)}else{if(q.isInstancedBufferAttribute){for(let Vt=0;Vt<nt.locationSize;Vt++)A(nt.location+Vt,q.meshPerAttribute);L.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let Vt=0;Vt<nt.locationSize;Vt++)x(nt.location+Vt);r.bindBuffer(r.ARRAY_BUFFER,dt);for(let Vt=0;Vt<nt.locationSize;Vt++)E(nt.location+Vt,st/nt.locationSize,Pt,Z,st*Lt,st/nt.locationSize*Vt*Lt,Nt)}}else if(R!==void 0){const Z=R[J];if(Z!==void 0)switch(Z.length){case 2:r.vertexAttrib2fv(nt.location,Z);break;case 3:r.vertexAttrib3fv(nt.location,Z);break;case 4:r.vertexAttrib4fv(nt.location,Z);break;default:r.vertexAttrib1fv(nt.location,Z)}}}}w()}function S(){N();for(const L in a){const O=a[L];for(const k in O){const X=O[k];for(const Y in X)_(X[Y].object),delete X[Y];delete O[k]}delete a[L]}}function y(L){if(a[L.id]===void 0)return;const O=a[L.id];for(const k in O){const X=O[k];for(const Y in X)_(X[Y].object),delete X[Y];delete O[k]}delete a[L.id]}function F(L){for(const O in a){const k=a[O];if(k[L.id]===void 0)continue;const X=k[L.id];for(const Y in X)_(X[Y].object),delete X[Y];delete k[L.id]}}function N(){K(),u=!0,c!==l&&(c=l,d(c.object))}function K(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:N,resetDefaultState:K,dispose:S,releaseStatesOfGeometry:y,releaseStatesOfProgram:F,initAttributes:v,enableAttribute:x,disableUnusedAttributes:w}}function Cv(r,t,e,n){const i=n.isWebGL2;let s;function o(u){s=u}function a(u,h){r.drawArrays(s,u,h),e.update(h,s,1)}function l(u,h,f){if(f===0)return;let d,_;if(i)d=r,_="drawArraysInstanced";else if(d=t.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[_](s,u,h,f),e.update(h,s,f)}function c(u,h,f){if(f===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let _=0;_<f;_++)this.render(u[_],h[_]);else{d.multiDrawArraysWEBGL(s,u,0,h,0,f);let _=0;for(let g=0;g<f;g++)_+=h[g];e.update(_,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function Rv(r,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let a=e.precision!==void 0?e.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||t.has("WEBGL_draw_buffers"),u=e.logarithmicDepthBuffer===!0,h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_TEXTURE_SIZE),_=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),g=r.getParameter(r.MAX_VERTEX_ATTRIBS),p=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),m=r.getParameter(r.MAX_VARYING_VECTORS),M=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,x=o||t.has("OES_texture_float"),A=v&&x,w=o?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:M,vertexTextures:v,floatFragmentTextures:x,floatVertexTextures:A,maxSamples:w}}function Pv(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new xr,a=new ne,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){const _=h.clippingPlanes,g=h.clipIntersection,p=h.clipShadows,m=r.get(h);if(!i||_===null||_.length===0||s&&!p)s?u(null):c();else{const M=s?0:n,v=M*4;let x=m.clippingState||null;l.value=x,x=u(_,f,v,d);for(let A=0;A!==v;++A)x[A]=e[A];m.clippingState=x,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,d,_){const g=h!==null?h.length:0;let p=null;if(g!==0){if(p=l.value,_!==!0||p===null){const m=d+g*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,x=d;v!==g;++v,x+=4)o.copy(h[v]).applyMatrix4(M,a),o.normal.toArray(p,x),p[x+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,p}}function Lv(r){let t=new WeakMap;function e(o,a){return a===fc?o.mapping=ws:a===dc&&(o.mapping=As),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===fc||a===dc)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Vg(l.height/2);return c.fromEquirectangularTexture(r,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Zc extends Sd{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ds=4,Dh=[.125,.215,.35,.446,.526,.582],br=20,Bl=new Zc,Uh=new Ot;let kl=null,Hl=0,Gl=0;const Sr=(1+Math.sqrt(5))/2,rs=1/Sr,Nh=[new P(1,1,1),new P(-1,1,1),new P(1,1,-1),new P(-1,1,-1),new P(0,Sr,rs),new P(0,Sr,-rs),new P(rs,0,Sr),new P(-rs,0,Sr),new P(Sr,rs,0),new P(-Sr,rs,0)];class Ih{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){kl=this._renderer.getRenderTarget(),Hl=this._renderer.getActiveCubeFace(),Gl=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(kl,Hl,Gl),t.scissorTest=!1,la(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ws||t.mapping===As?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),kl=this._renderer.getRenderTarget(),Hl=this._renderer.getActiveCubeFace(),Gl=this._renderer.getActiveMipmapLevel();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Kn,minFilter:Kn,generateMipmaps:!1,type:Di,format:li,colorSpace:Ni,depthBuffer:!1},i=Oh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Oh(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Dv(s)),this._blurMaterial=Uv(s,t,e)}return i}_compileMaterial(t){const e=new De(this._lodPlanes[0],t);this._renderer.compile(e,Bl)}_sceneToCubeUV(t,e,n,i){const a=new Fn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Uh),u.toneMapping=tr,u.autoClear=!1;const d=new Oo({name:"PMREM.Background",side:Tn,depthWrite:!1,depthTest:!1}),_=new De(new Fo,d);let g=!1;const p=t.background;p?p.isColor&&(d.color.copy(p),t.background=null,g=!0):(d.color.copy(Uh),g=!0);for(let m=0;m<6;m++){const M=m%3;M===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):M===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const v=this._cubeSize;la(i,M*v,m>2?v:0,v,v),u.setRenderTarget(i),g&&u.render(_,a),u.render(t,a)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ws||t.mapping===As;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=zh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fh());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new De(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;la(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Bl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Nh[(i-1)%Nh.length];this._blur(t,i-1,i,s,o)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new De(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*br-1),g=s/_,p=isFinite(s)?1+Math.floor(u*g):br;p>br&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${br}`);const m=[];let M=0;for(let E=0;E<br;++E){const D=E/g,S=Math.exp(-D*D/2);m.push(S),E===0?M+=S:E<p&&(M+=2*S)}for(let E=0;E<m.length;E++)m[E]=m[E]/M;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=_,f.mipInt.value=v-n;const x=this._sizeLods[i],A=3*x*(i>v-ds?i-v+ds:0),w=4*(this._cubeSize-x);la(e,A,w,3*x,2*x),l.setRenderTarget(e),l.render(h,Bl)}}function Dv(r){const t=[],e=[],n=[];let i=r;const s=r-ds+1+Dh.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>r-ds?l=Dh[o-r+ds-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,_=6,g=3,p=2,m=1,M=new Float32Array(g*_*d),v=new Float32Array(p*_*d),x=new Float32Array(m*_*d);for(let w=0;w<d;w++){const E=w%3*2/3-1,D=w>2?0:-1,S=[E,D,0,E+2/3,D,0,E+2/3,D+1,0,E,D,0,E+2/3,D+1,0,E,D+1,0];M.set(S,g*_*w),v.set(f,p*_*w);const y=[w,w,w,w,w,w];x.set(y,m*_*w)}const A=new Mn;A.setAttribute("position",new ln(M,g)),A.setAttribute("uv",new ln(v,p)),A.setAttribute("faceIndex",new ln(x,m)),t.push(A),i>ds&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Oh(r,t,e){const n=new ci(r,t,e);return n.texture.mapping=el,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function la(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Uv(r,t,e){const n=new Float32Array(br),i=new P(0,1,0);return new Je({name:"SphericalGaussianBlur",defines:{n:br,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Jc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Fh(){return new Je({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function zh(){return new Je({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Jc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Nv(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===fc||l===dc,u=l===ws||l===As;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=t.get(a);return e===null&&(e=new Ih(r)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),t.set(a,h),h.texture}else{if(t.has(a))return t.get(a).texture;{const h=a.image;if(c&&h&&h.height>0||u&&h&&i(h)){e===null&&(e=new Ih(r));const f=c?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,f),a.addEventListener("dispose",s),f.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Iv(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Ov(r,t,e,n){const i={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const _ in f.attributes)t.remove(f.attributes[_]);for(const _ in f.morphAttributes){const g=f.morphAttributes[_];for(let p=0,m=g.length;p<m;p++)t.remove(g[p])}f.removeEventListener("dispose",o),delete i[f.id];const d=s.get(f);d&&(t.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const _ in f)t.update(f[_],r.ARRAY_BUFFER);const d=h.morphAttributes;for(const _ in d){const g=d[_];for(let p=0,m=g.length;p<m;p++)t.update(g[p],r.ARRAY_BUFFER)}}function c(h){const f=[],d=h.index,_=h.attributes.position;let g=0;if(d!==null){const M=d.array;g=d.version;for(let v=0,x=M.length;v<x;v+=3){const A=M[v+0],w=M[v+1],E=M[v+2];f.push(A,w,w,E,E,A)}}else if(_!==void 0){const M=_.array;g=_.version;for(let v=0,x=M.length/3-1;v<x;v+=3){const A=v+0,w=v+1,E=v+2;f.push(A,w,w,E,E,A)}}else return;const p=new(ud(f)?vd:_d)(f,1);p.version=g;const m=s.get(h);m&&t.remove(m),s.set(h,p)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function Fv(r,t,e,n){const i=n.isWebGL2;let s;function o(d){s=d}let a,l;function c(d){a=d.type,l=d.bytesPerElement}function u(d,_){r.drawElements(s,_,a,d*l),e.update(_,s,1)}function h(d,_,g){if(g===0)return;let p,m;if(i)p=r,m="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](s,_,a,d*l,g),e.update(_,s,g)}function f(d,_,g){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<g;m++)this.render(d[m]/l,_[m]);else{p.multiDrawElementsWEBGL(s,_,0,a,d,0,g);let m=0;for(let M=0;M<g;M++)m+=_[M];e.update(m,s,1)}}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function zv(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Bv(r,t){return r[0]-t[0]}function kv(r,t){return Math.abs(t[1])-Math.abs(r[1])}function Hv(r,t,e){const n={},i=new Float32Array(8),s=new WeakMap,o=new ye,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,h){const f=c.morphTargetInfluences;if(t.isWebGL2===!0){const _=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=_!==void 0?_.length:0;let p=s.get(u);if(p===void 0||p.count!==g){let O=function(){K.dispose(),s.delete(u),u.removeEventListener("dispose",O)};var d=O;p!==void 0&&p.texture.dispose();const v=u.morphAttributes.position!==void 0,x=u.morphAttributes.normal!==void 0,A=u.morphAttributes.color!==void 0,w=u.morphAttributes.position||[],E=u.morphAttributes.normal||[],D=u.morphAttributes.color||[];let S=0;v===!0&&(S=1),x===!0&&(S=2),A===!0&&(S=3);let y=u.attributes.position.count*S,F=1;y>t.maxTextureSize&&(F=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);const N=new Float32Array(y*F*4*g),K=new dd(N,y,F,g);K.type=qi,K.needsUpdate=!0;const L=S*4;for(let k=0;k<g;k++){const X=w[k],Y=E[k],$=D[k],R=y*F*4*k;for(let J=0;J<X.count;J++){const nt=J*L;v===!0&&(o.fromBufferAttribute(X,J),N[R+nt+0]=o.x,N[R+nt+1]=o.y,N[R+nt+2]=o.z,N[R+nt+3]=0),x===!0&&(o.fromBufferAttribute(Y,J),N[R+nt+4]=o.x,N[R+nt+5]=o.y,N[R+nt+6]=o.z,N[R+nt+7]=0),A===!0&&(o.fromBufferAttribute($,J),N[R+nt+8]=o.x,N[R+nt+9]=o.y,N[R+nt+10]=o.z,N[R+nt+11]=$.itemSize===4?o.w:1)}}p={count:g,texture:K,size:new xt(y,F)},s.set(u,p),u.addEventListener("dispose",O)}let m=0;for(let v=0;v<f.length;v++)m+=f[v];const M=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(r,"morphTargetBaseInfluence",M),h.getUniforms().setValue(r,"morphTargetInfluences",f),h.getUniforms().setValue(r,"morphTargetsTexture",p.texture,e),h.getUniforms().setValue(r,"morphTargetsTextureSize",p.size)}else{const _=f===void 0?0:f.length;let g=n[u.id];if(g===void 0||g.length!==_){g=[];for(let x=0;x<_;x++)g[x]=[x,0];n[u.id]=g}for(let x=0;x<_;x++){const A=g[x];A[0]=x,A[1]=f[x]}g.sort(kv);for(let x=0;x<8;x++)x<_&&g[x][1]?(a[x][0]=g[x][0],a[x][1]=g[x][1]):(a[x][0]=Number.MAX_SAFE_INTEGER,a[x][1]=0);a.sort(Bv);const p=u.morphAttributes.position,m=u.morphAttributes.normal;let M=0;for(let x=0;x<8;x++){const A=a[x],w=A[0],E=A[1];w!==Number.MAX_SAFE_INTEGER&&E?(p&&u.getAttribute("morphTarget"+x)!==p[w]&&u.setAttribute("morphTarget"+x,p[w]),m&&u.getAttribute("morphNormal"+x)!==m[w]&&u.setAttribute("morphNormal"+x,m[w]),i[x]=E,M+=E):(p&&u.hasAttribute("morphTarget"+x)===!0&&u.deleteAttribute("morphTarget"+x),m&&u.hasAttribute("morphNormal"+x)===!0&&u.deleteAttribute("morphNormal"+x),i[x]=0)}const v=u.morphTargetsRelative?1:1-M;h.getUniforms().setValue(r,"morphTargetBaseInfluence",v),h.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function Gv(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=t.get(l,u);if(i.get(h)!==c&&(t.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return h}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class Ed extends bn{constructor(t,e,n,i,s,o,a,l,c,u){if(u=u!==void 0?u:Rr,u!==Rr&&u!==Cs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Rr&&(n=Yi),n===void 0&&u===Cs&&(n=Cr),super(null,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:xn,this.minFilter=l!==void 0?l:xn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Td=new bn,bd=new Ed(1,1);bd.compareFunction=cd;const wd=new dd,Ad=new Ag,Cd=new Md,Bh=[],kh=[],Hh=new Float32Array(16),Gh=new Float32Array(9),Vh=new Float32Array(4);function ks(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=Bh[i];if(s===void 0&&(s=new Float32Array(i),Bh[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function Ge(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Ve(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function sl(r,t){let e=kh[t];e===void 0&&(e=new Int32Array(t),kh[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function Vv(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Wv(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;r.uniform2fv(this.addr,t),Ve(e,t)}}function Xv(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ge(e,t))return;r.uniform3fv(this.addr,t),Ve(e,t)}}function Yv(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;r.uniform4fv(this.addr,t),Ve(e,t)}}function qv(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Ve(e,t)}else{if(Ge(e,n))return;Vh.set(n),r.uniformMatrix2fv(this.addr,!1,Vh),Ve(e,n)}}function $v(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Ve(e,t)}else{if(Ge(e,n))return;Gh.set(n),r.uniformMatrix3fv(this.addr,!1,Gh),Ve(e,n)}}function Kv(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Ve(e,t)}else{if(Ge(e,n))return;Hh.set(n),r.uniformMatrix4fv(this.addr,!1,Hh),Ve(e,n)}}function Zv(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Jv(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;r.uniform2iv(this.addr,t),Ve(e,t)}}function jv(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;r.uniform3iv(this.addr,t),Ve(e,t)}}function Qv(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;r.uniform4iv(this.addr,t),Ve(e,t)}}function tx(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function ex(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;r.uniform2uiv(this.addr,t),Ve(e,t)}}function nx(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;r.uniform3uiv(this.addr,t),Ve(e,t)}}function ix(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;r.uniform4uiv(this.addr,t),Ve(e,t)}}function rx(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?bd:Td;e.setTexture2D(t||s,i)}function sx(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Ad,i)}function ox(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Cd,i)}function ax(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||wd,i)}function lx(r){switch(r){case 5126:return Vv;case 35664:return Wv;case 35665:return Xv;case 35666:return Yv;case 35674:return qv;case 35675:return $v;case 35676:return Kv;case 5124:case 35670:return Zv;case 35667:case 35671:return Jv;case 35668:case 35672:return jv;case 35669:case 35673:return Qv;case 5125:return tx;case 36294:return ex;case 36295:return nx;case 36296:return ix;case 35678:case 36198:case 36298:case 36306:case 35682:return rx;case 35679:case 36299:case 36307:return sx;case 35680:case 36300:case 36308:case 36293:return ox;case 36289:case 36303:case 36311:case 36292:return ax}}function cx(r,t){r.uniform1fv(this.addr,t)}function ux(r,t){const e=ks(t,this.size,2);r.uniform2fv(this.addr,e)}function hx(r,t){const e=ks(t,this.size,3);r.uniform3fv(this.addr,e)}function fx(r,t){const e=ks(t,this.size,4);r.uniform4fv(this.addr,e)}function dx(r,t){const e=ks(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function px(r,t){const e=ks(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function mx(r,t){const e=ks(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function gx(r,t){r.uniform1iv(this.addr,t)}function _x(r,t){r.uniform2iv(this.addr,t)}function vx(r,t){r.uniform3iv(this.addr,t)}function xx(r,t){r.uniform4iv(this.addr,t)}function Sx(r,t){r.uniform1uiv(this.addr,t)}function Mx(r,t){r.uniform2uiv(this.addr,t)}function yx(r,t){r.uniform3uiv(this.addr,t)}function Ex(r,t){r.uniform4uiv(this.addr,t)}function Tx(r,t,e){const n=this.cache,i=t.length,s=sl(e,i);Ge(n,s)||(r.uniform1iv(this.addr,s),Ve(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Td,s[o])}function bx(r,t,e){const n=this.cache,i=t.length,s=sl(e,i);Ge(n,s)||(r.uniform1iv(this.addr,s),Ve(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Ad,s[o])}function wx(r,t,e){const n=this.cache,i=t.length,s=sl(e,i);Ge(n,s)||(r.uniform1iv(this.addr,s),Ve(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Cd,s[o])}function Ax(r,t,e){const n=this.cache,i=t.length,s=sl(e,i);Ge(n,s)||(r.uniform1iv(this.addr,s),Ve(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||wd,s[o])}function Cx(r){switch(r){case 5126:return cx;case 35664:return ux;case 35665:return hx;case 35666:return fx;case 35674:return dx;case 35675:return px;case 35676:return mx;case 5124:case 35670:return gx;case 35667:case 35671:return _x;case 35668:case 35672:return vx;case 35669:case 35673:return xx;case 5125:return Sx;case 36294:return Mx;case 36295:return yx;case 36296:return Ex;case 35678:case 36198:case 36298:case 36306:case 35682:return Tx;case 35679:case 36299:case 36307:return bx;case 35680:case 36300:case 36308:case 36293:return wx;case 36289:case 36303:case 36311:case 36292:return Ax}}class Rx{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=lx(e.type)}}class Px{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Cx(e.type)}}class Lx{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const Vl=/(\w+)(\])?(\[|\.)?/g;function Wh(r,t){r.seq.push(t),r.map[t.id]=t}function Dx(r,t,e){const n=r.name,i=n.length;for(Vl.lastIndex=0;;){const s=Vl.exec(n),o=Vl.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Wh(e,c===void 0?new Rx(a,r,t):new Px(a,r,t));break}else{let h=e.map[a];h===void 0&&(h=new Lx(a),Wh(e,h)),e=h}}}class ba{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);Dx(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Xh(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const Ux=37297;let Nx=0;function Ix(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function Ox(r){const t=pe.getPrimaries(pe.workingColorSpace),e=pe.getPrimaries(r);let n;switch(t===e?n="":t===za&&e===Fa?n="LinearDisplayP3ToLinearSRGB":t===Fa&&e===za&&(n="LinearSRGBToLinearDisplayP3"),r){case Ni:case nl:return[n,"LinearTransferOETF"];case Ke:case qc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Yh(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+Ix(r.getShaderSource(t),o)}else return i}function Fx(r,t){const e=Ox(t);return`vec4 ${r}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function zx(r,t){let e;switch(t){case zm:e="Linear";break;case Bm:e="Reinhard";break;case km:e="OptimizedCineon";break;case jf:e="ACESFilmic";break;case Gm:e="AgX";break;case Hm:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Bx(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ps).join(`
`)}function kx(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(ps).join(`
`)}function Hx(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Gx(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function ps(r){return r!==""}function qh(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $h(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Vx=/^[ \t]*#include +<([\w\d./]+)>/gm;function xc(r){return r.replace(Vx,Xx)}const Wx=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Xx(r,t){let e=Jt[t];if(e===void 0){const n=Wx.get(t);if(n!==void 0)e=Jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return xc(e)}const Yx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kh(r){return r.replace(Yx,qx)}function qx(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Zh(r){let t="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function $x(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Zf?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===fm?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===bi&&(t="SHADOWMAP_TYPE_VSM"),t}function Kx(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ws:case As:t="ENVMAP_TYPE_CUBE";break;case el:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Zx(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case As:t="ENVMAP_MODE_REFRACTION";break}return t}function Jx(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Jf:t="ENVMAP_BLENDING_MULTIPLY";break;case Om:t="ENVMAP_BLENDING_MIX";break;case Fm:t="ENVMAP_BLENDING_ADD";break}return t}function jx(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Qx(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=$x(e),c=Kx(e),u=Zx(e),h=Jx(e),f=jx(e),d=e.isWebGL2?"":Bx(e),_=kx(e),g=Hx(s),p=i.createProgram();let m,M,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ps).join(`
`),m.length>0&&(m+=`
`),M=[d,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ps).join(`
`),M.length>0&&(M+=`
`)):(m=[Zh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ps).join(`
`),M=[d,Zh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==tr?"#define TONE_MAPPING":"",e.toneMapping!==tr?Jt.tonemapping_pars_fragment:"",e.toneMapping!==tr?zx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,Fx("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ps).join(`
`)),o=xc(o),o=qh(o,e),o=$h(o,e),a=xc(a),a=qh(a,e),a=$h(a,e),o=Kh(o),a=Kh(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,M=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===ph?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ph?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const x=v+m+o,A=v+M+a,w=Xh(i,i.VERTEX_SHADER,x),E=Xh(i,i.FRAGMENT_SHADER,A);i.attachShader(p,w),i.attachShader(p,E),e.index0AttributeName!==void 0?i.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p);function D(N){if(r.debug.checkShaderErrors){const K=i.getProgramInfoLog(p).trim(),L=i.getShaderInfoLog(w).trim(),O=i.getShaderInfoLog(E).trim();let k=!0,X=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if(k=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,p,w,E);else{const Y=Yh(i,w,"vertex"),$=Yh(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Program Info Log: `+K+`
`+Y+`
`+$)}else K!==""?console.warn("THREE.WebGLProgram: Program Info Log:",K):(L===""||O==="")&&(X=!1);X&&(N.diagnostics={runnable:k,programLog:K,vertexShader:{log:L,prefix:m},fragmentShader:{log:O,prefix:M}})}i.deleteShader(w),i.deleteShader(E),S=new ba(i,p),y=Gx(i,p)}let S;this.getUniforms=function(){return S===void 0&&D(this),S};let y;this.getAttributes=function(){return y===void 0&&D(this),y};let F=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=i.getProgramParameter(p,Ux)),F},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Nx++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=w,this.fragmentShader=E,this}let tS=0;class eS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new nS(t),e.set(t,n)),n}}class nS{constructor(t){this.id=tS++,this.code=t,this.usedTimes=0}}function iS(r,t,e,n,i,s,o){const a=new md,l=new eS,c=[],u=i.isWebGL2,h=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return S===0?"uv":`uv${S}`}function p(S,y,F,N,K){const L=N.fog,O=K.geometry,k=S.isMeshStandardMaterial?N.environment:null,X=(S.isMeshStandardMaterial?e:t).get(S.envMap||k),Y=X&&X.mapping===el?X.image.height:null,$=_[S.type];S.precision!==null&&(d=i.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const R=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,J=R!==void 0?R.length:0;let nt=0;O.morphAttributes.position!==void 0&&(nt=1),O.morphAttributes.normal!==void 0&&(nt=2),O.morphAttributes.color!==void 0&&(nt=3);let q,Z,st,gt;if($){const St=fi[$];q=St.vertexShader,Z=St.fragmentShader}else q=S.vertexShader,Z=S.fragmentShader,l.update(S),st=l.getVertexShaderID(S),gt=l.getFragmentShaderID(S);const dt=r.getRenderTarget(),Pt=K.isInstancedMesh===!0,Lt=K.isBatchedMesh===!0,Nt=!!S.map,Vt=!!S.matcap,H=!!X,Wt=!!S.aoMap,mt=!!S.lightMap,Dt=!!S.bumpMap,_t=!!S.normalMap,G=!!S.displacementMap,Bt=!!S.emissiveMap,C=!!S.metalnessMap,T=!!S.roughnessMap,z=S.anisotropy>0,tt=S.clearcoat>0,Q=S.iridescence>0,et=S.sheen>0,pt=S.transmission>0,ut=z&&!!S.anisotropyMap,ct=tt&&!!S.clearcoatMap,wt=tt&&!!S.clearcoatNormalMap,Gt=tt&&!!S.clearcoatRoughnessMap,j=Q&&!!S.iridescenceMap,oe=Q&&!!S.iridescenceThicknessMap,Ct=et&&!!S.sheenColorMap,Xt=et&&!!S.sheenRoughnessMap,Tt=!!S.specularMap,vt=!!S.specularColorMap,Yt=!!S.specularIntensityMap,Qt=pt&&!!S.transmissionMap,le=pt&&!!S.thicknessMap,ft=!!S.gradientMap,rt=!!S.alphaMap,U=S.alphaTest>0,ot=!!S.alphaHash,at=!!S.extensions,Ft=!!O.attributes.uv1,Ut=!!O.attributes.uv2,re=!!O.attributes.uv3;let ae=tr;return S.toneMapped&&(dt===null||dt.isXRRenderTarget===!0)&&(ae=r.toneMapping),{isWebGL2:u,shaderID:$,shaderType:S.type,shaderName:S.name,vertexShader:q,fragmentShader:Z,defines:S.defines,customVertexShaderID:st,customFragmentShaderID:gt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:Lt,instancing:Pt,instancingColor:Pt&&K.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:dt===null?r.outputColorSpace:dt.isXRRenderTarget===!0?dt.texture.colorSpace:Ni,map:Nt,matcap:Vt,envMap:H,envMapMode:H&&X.mapping,envMapCubeUVHeight:Y,aoMap:Wt,lightMap:mt,bumpMap:Dt,normalMap:_t,displacementMap:f&&G,emissiveMap:Bt,normalMapObjectSpace:_t&&S.normalMapType===tg,normalMapTangentSpace:_t&&S.normalMapType===ld,metalnessMap:C,roughnessMap:T,anisotropy:z,anisotropyMap:ut,clearcoat:tt,clearcoatMap:ct,clearcoatNormalMap:wt,clearcoatRoughnessMap:Gt,iridescence:Q,iridescenceMap:j,iridescenceThicknessMap:oe,sheen:et,sheenColorMap:Ct,sheenRoughnessMap:Xt,specularMap:Tt,specularColorMap:vt,specularIntensityMap:Yt,transmission:pt,transmissionMap:Qt,thicknessMap:le,gradientMap:ft,opaque:S.transparent===!1&&S.blending===Qi,alphaMap:rt,alphaTest:U,alphaHash:ot,combine:S.combine,mapUv:Nt&&g(S.map.channel),aoMapUv:Wt&&g(S.aoMap.channel),lightMapUv:mt&&g(S.lightMap.channel),bumpMapUv:Dt&&g(S.bumpMap.channel),normalMapUv:_t&&g(S.normalMap.channel),displacementMapUv:G&&g(S.displacementMap.channel),emissiveMapUv:Bt&&g(S.emissiveMap.channel),metalnessMapUv:C&&g(S.metalnessMap.channel),roughnessMapUv:T&&g(S.roughnessMap.channel),anisotropyMapUv:ut&&g(S.anisotropyMap.channel),clearcoatMapUv:ct&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:wt&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Gt&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:Xt&&g(S.sheenRoughnessMap.channel),specularMapUv:Tt&&g(S.specularMap.channel),specularColorMapUv:vt&&g(S.specularColorMap.channel),specularIntensityMapUv:Yt&&g(S.specularIntensityMap.channel),transmissionMapUv:Qt&&g(S.transmissionMap.channel),thicknessMapUv:le&&g(S.thicknessMap.channel),alphaMapUv:rt&&g(S.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(_t||z),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,vertexUv1s:Ft,vertexUv2s:Ut,vertexUv3s:re,pointsUvs:K.isPoints===!0&&!!O.attributes.uv&&(Nt||rt),fog:!!L,useFog:S.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:K.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:nt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&F.length>0,shadowMapType:r.shadowMap.type,toneMapping:ae,useLegacyLights:r._useLegacyLights,decodeVideoTexture:Nt&&S.map.isVideoTexture===!0&&pe.getTransfer(S.map.colorSpace)===Se,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===di,flipSided:S.side===Tn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:at&&S.extensions.derivatives===!0,extensionFragDepth:at&&S.extensions.fragDepth===!0,extensionDrawBuffers:at&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:at&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:at&&S.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function m(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const F in S.defines)y.push(F),y.push(S.defines[F]);return S.isRawShaderMaterial===!1&&(M(y,S),v(y,S),y.push(r.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function M(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function v(S,y){a.disableAll(),y.isWebGL2&&a.enable(0),y.supportsVertexTextures&&a.enable(1),y.instancing&&a.enable(2),y.instancingColor&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),S.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.skinning&&a.enable(4),y.morphTargets&&a.enable(5),y.morphNormals&&a.enable(6),y.morphColors&&a.enable(7),y.premultipliedAlpha&&a.enable(8),y.shadowMapEnabled&&a.enable(9),y.useLegacyLights&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),S.push(a.mask)}function x(S){const y=_[S.type];let F;if(y){const N=fi[y];F=Ga.clone(N.uniforms)}else F=S.uniforms;return F}function A(S,y){let F;for(let N=0,K=c.length;N<K;N++){const L=c[N];if(L.cacheKey===y){F=L,++F.usedTimes;break}}return F===void 0&&(F=new Qx(r,y,S,s),c.push(F)),F}function w(S){if(--S.usedTimes===0){const y=c.indexOf(S);c[y]=c[c.length-1],c.pop(),S.destroy()}}function E(S){l.remove(S)}function D(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:x,acquireProgram:A,releaseProgram:w,releaseShaderCache:E,programs:c,dispose:D}}function rS(){let r=new WeakMap;function t(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function e(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function sS(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Jh(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function jh(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(h,f,d,_,g,p){let m=r[t];return m===void 0?(m={id:h.id,object:h,geometry:f,material:d,groupOrder:_,renderOrder:h.renderOrder,z:g,group:p},r[t]=m):(m.id=h.id,m.object=h,m.geometry=f,m.material=d,m.groupOrder=_,m.renderOrder=h.renderOrder,m.z=g,m.group=p),t++,m}function a(h,f,d,_,g,p){const m=o(h,f,d,_,g,p);d.transmission>0?n.push(m):d.transparent===!0?i.push(m):e.push(m)}function l(h,f,d,_,g,p){const m=o(h,f,d,_,g,p);d.transmission>0?n.unshift(m):d.transparent===!0?i.unshift(m):e.unshift(m)}function c(h,f){e.length>1&&e.sort(h||sS),n.length>1&&n.sort(f||Jh),i.length>1&&i.sort(f||Jh)}function u(){for(let h=t,f=r.length;h<f;h++){const d=r[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function oS(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new jh,r.set(n,[o])):i>=s.length?(o=new jh,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function aS(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Ot};break;case"SpotLight":e={position:new P,direction:new P,color:new Ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Ot,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Ot,groundColor:new Ot};break;case"RectAreaLight":e={color:new Ot,position:new P,halfWidth:new P,halfHeight:new P};break}return r[t.id]=e,e}}}function lS(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let cS=0;function uS(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function hS(r,t){const e=new aS,n=lS(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new P);const s=new P,o=new Pe,a=new Pe;function l(u,h){let f=0,d=0,_=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let g=0,p=0,m=0,M=0,v=0,x=0,A=0,w=0,E=0,D=0,S=0;u.sort(uS);const y=h===!0?Math.PI:1;for(let N=0,K=u.length;N<K;N++){const L=u[N],O=L.color,k=L.intensity,X=L.distance,Y=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=O.r*k*y,d+=O.g*k*y,_+=O.b*k*y;else if(L.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(L.sh.coefficients[$],k);S++}else if(L.isDirectionalLight){const $=e.get(L);if($.color.copy(L.color).multiplyScalar(L.intensity*y),L.castShadow){const R=L.shadow,J=n.get(L);J.shadowBias=R.bias,J.shadowNormalBias=R.normalBias,J.shadowRadius=R.radius,J.shadowMapSize=R.mapSize,i.directionalShadow[g]=J,i.directionalShadowMap[g]=Y,i.directionalShadowMatrix[g]=L.shadow.matrix,x++}i.directional[g]=$,g++}else if(L.isSpotLight){const $=e.get(L);$.position.setFromMatrixPosition(L.matrixWorld),$.color.copy(O).multiplyScalar(k*y),$.distance=X,$.coneCos=Math.cos(L.angle),$.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),$.decay=L.decay,i.spot[m]=$;const R=L.shadow;if(L.map&&(i.spotLightMap[E]=L.map,E++,R.updateMatrices(L),L.castShadow&&D++),i.spotLightMatrix[m]=R.matrix,L.castShadow){const J=n.get(L);J.shadowBias=R.bias,J.shadowNormalBias=R.normalBias,J.shadowRadius=R.radius,J.shadowMapSize=R.mapSize,i.spotShadow[m]=J,i.spotShadowMap[m]=Y,w++}m++}else if(L.isRectAreaLight){const $=e.get(L);$.color.copy(O).multiplyScalar(k),$.halfWidth.set(L.width*.5,0,0),$.halfHeight.set(0,L.height*.5,0),i.rectArea[M]=$,M++}else if(L.isPointLight){const $=e.get(L);if($.color.copy(L.color).multiplyScalar(L.intensity*y),$.distance=L.distance,$.decay=L.decay,L.castShadow){const R=L.shadow,J=n.get(L);J.shadowBias=R.bias,J.shadowNormalBias=R.normalBias,J.shadowRadius=R.radius,J.shadowMapSize=R.mapSize,J.shadowCameraNear=R.camera.near,J.shadowCameraFar=R.camera.far,i.pointShadow[p]=J,i.pointShadowMap[p]=Y,i.pointShadowMatrix[p]=L.shadow.matrix,A++}i.point[p]=$,p++}else if(L.isHemisphereLight){const $=e.get(L);$.skyColor.copy(L.color).multiplyScalar(k*y),$.groundColor.copy(L.groundColor).multiplyScalar(k*y),i.hemi[v]=$,v++}}M>0&&(t.isWebGL2?r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ht.LTC_FLOAT_1,i.rectAreaLTC2=ht.LTC_FLOAT_2):(i.rectAreaLTC1=ht.LTC_HALF_1,i.rectAreaLTC2=ht.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ht.LTC_FLOAT_1,i.rectAreaLTC2=ht.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ht.LTC_HALF_1,i.rectAreaLTC2=ht.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=_;const F=i.hash;(F.directionalLength!==g||F.pointLength!==p||F.spotLength!==m||F.rectAreaLength!==M||F.hemiLength!==v||F.numDirectionalShadows!==x||F.numPointShadows!==A||F.numSpotShadows!==w||F.numSpotMaps!==E||F.numLightProbes!==S)&&(i.directional.length=g,i.spot.length=m,i.rectArea.length=M,i.point.length=p,i.hemi.length=v,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=w+E-D,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=D,i.numLightProbes=S,F.directionalLength=g,F.pointLength=p,F.spotLength=m,F.rectAreaLength=M,F.hemiLength=v,F.numDirectionalShadows=x,F.numPointShadows=A,F.numSpotShadows=w,F.numSpotMaps=E,F.numLightProbes=S,i.version=cS++)}function c(u,h){let f=0,d=0,_=0,g=0,p=0;const m=h.matrixWorldInverse;for(let M=0,v=u.length;M<v;M++){const x=u[M];if(x.isDirectionalLight){const A=i.directional[f];A.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),f++}else if(x.isSpotLight){const A=i.spot[_];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),_++}else if(x.isRectAreaLight){const A=i.rectArea[g];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(m),a.identity(),o.copy(x.matrixWorld),o.premultiply(m),a.extractRotation(o),A.halfWidth.set(x.width*.5,0,0),A.halfHeight.set(0,x.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),g++}else if(x.isPointLight){const A=i.point[d];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const A=i.hemi[p];A.direction.setFromMatrixPosition(x.matrixWorld),A.direction.transformDirection(m),p++}}}return{setup:l,setupView:c,state:i}}function Qh(r,t){const e=new hS(r,t),n=[],i=[];function s(){n.length=0,i.length=0}function o(h){n.push(h)}function a(h){i.push(h)}function l(h){e.setup(n,h)}function c(h){e.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function fS(r,t){let e=new WeakMap;function n(s,o=0){const a=e.get(s);let l;return a===void 0?(l=new Qh(r,t),e.set(s,[l])):o>=a.length?(l=new Qh(r,t),a.push(l)):l=a[o],l}function i(){e=new WeakMap}return{get:n,dispose:i}}class dS extends Bs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class pS extends Bs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const mS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function _S(r,t,e){let n=new Kc;const i=new xt,s=new xt,o=new ye,a=new dS({depthPacking:Qm}),l=new pS,c={},u=e.maxTextureSize,h={[sr]:Tn,[Tn]:sr,[di]:di},f=new Je({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:mS,fragmentShader:gS}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const _=new Mn;_.setAttribute("position",new ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new De(_,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zf;let m=this.type;this.render=function(w,E,D){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const S=r.getRenderTarget(),y=r.getActiveCubeFace(),F=r.getActiveMipmapLevel(),N=r.state;N.setBlending(Li),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const K=m!==bi&&this.type===bi,L=m===bi&&this.type!==bi;for(let O=0,k=w.length;O<k;O++){const X=w[O],Y=X.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;i.copy(Y.mapSize);const $=Y.getFrameExtents();if(i.multiply($),s.copy(Y.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/$.x),i.x=s.x*$.x,Y.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/$.y),i.y=s.y*$.y,Y.mapSize.y=s.y)),Y.map===null||K===!0||L===!0){const J=this.type!==bi?{minFilter:xn,magFilter:xn}:{};Y.map!==null&&Y.map.dispose(),Y.map=new ci(i.x,i.y,J),Y.map.texture.name=X.name+".shadowMap",Y.camera.updateProjectionMatrix()}r.setRenderTarget(Y.map),r.clear();const R=Y.getViewportCount();for(let J=0;J<R;J++){const nt=Y.getViewport(J);o.set(s.x*nt.x,s.y*nt.y,s.x*nt.z,s.y*nt.w),N.viewport(o),Y.updateMatrices(X,J),n=Y.getFrustum(),x(E,D,Y.camera,X,this.type)}Y.isPointLightShadow!==!0&&this.type===bi&&M(Y,D),Y.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(S,y,F)};function M(w,E){const D=t.update(g);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ci(i.x,i.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(E,null,D,f,g,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(E,null,D,d,g,null)}function v(w,E,D,S){let y=null;const F=D.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(F!==void 0)y=F;else if(y=D.isPointLight===!0?l:a,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const N=y.uuid,K=E.uuid;let L=c[N];L===void 0&&(L={},c[N]=L);let O=L[K];O===void 0&&(O=y.clone(),L[K]=O,E.addEventListener("dispose",A)),y=O}if(y.visible=E.visible,y.wireframe=E.wireframe,S===bi?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:h[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,D.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const N=r.properties.get(y);N.light=D}return y}function x(w,E,D,S,y){if(w.visible===!1)return;if(w.layers.test(E.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===bi)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,w.matrixWorld);const K=t.update(w),L=w.material;if(Array.isArray(L)){const O=K.groups;for(let k=0,X=O.length;k<X;k++){const Y=O[k],$=L[Y.materialIndex];if($&&$.visible){const R=v(w,$,S,y);w.onBeforeShadow(r,w,E,D,K,R,Y),r.renderBufferDirect(D,null,K,R,w,Y),w.onAfterShadow(r,w,E,D,K,R,Y)}}}else if(L.visible){const O=v(w,L,S,y);w.onBeforeShadow(r,w,E,D,K,O,null),r.renderBufferDirect(D,null,K,O,w,null),w.onAfterShadow(r,w,E,D,K,O,null)}}const N=w.children;for(let K=0,L=N.length;K<L;K++)x(N[K],E,D,S,y)}function A(w){w.target.removeEventListener("dispose",A);for(const D in c){const S=c[D],y=w.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}function vS(r,t,e){const n=e.isWebGL2;function i(){let U=!1;const ot=new ye;let at=null;const Ft=new ye(0,0,0,0);return{setMask:function(Ut){at!==Ut&&!U&&(r.colorMask(Ut,Ut,Ut,Ut),at=Ut)},setLocked:function(Ut){U=Ut},setClear:function(Ut,re,ae,bt,St){St===!0&&(Ut*=bt,re*=bt,ae*=bt),ot.set(Ut,re,ae,bt),Ft.equals(ot)===!1&&(r.clearColor(Ut,re,ae,bt),Ft.copy(ot))},reset:function(){U=!1,at=null,Ft.set(-1,0,0,0)}}}function s(){let U=!1,ot=null,at=null,Ft=null;return{setTest:function(Ut){Ut?Lt(r.DEPTH_TEST):Nt(r.DEPTH_TEST)},setMask:function(Ut){ot!==Ut&&!U&&(r.depthMask(Ut),ot=Ut)},setFunc:function(Ut){if(at!==Ut){switch(Ut){case Rm:r.depthFunc(r.NEVER);break;case Pm:r.depthFunc(r.ALWAYS);break;case Lm:r.depthFunc(r.LESS);break;case Ia:r.depthFunc(r.LEQUAL);break;case Dm:r.depthFunc(r.EQUAL);break;case Um:r.depthFunc(r.GEQUAL);break;case Nm:r.depthFunc(r.GREATER);break;case Im:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}at=Ut}},setLocked:function(Ut){U=Ut},setClear:function(Ut){Ft!==Ut&&(r.clearDepth(Ut),Ft=Ut)},reset:function(){U=!1,ot=null,at=null,Ft=null}}}function o(){let U=!1,ot=null,at=null,Ft=null,Ut=null,re=null,ae=null,bt=null,St=null;return{setTest:function(Rt){U||(Rt?Lt(r.STENCIL_TEST):Nt(r.STENCIL_TEST))},setMask:function(Rt){ot!==Rt&&!U&&(r.stencilMask(Rt),ot=Rt)},setFunc:function(Rt,it,zt){(at!==Rt||Ft!==it||Ut!==zt)&&(r.stencilFunc(Rt,it,zt),at=Rt,Ft=it,Ut=zt)},setOp:function(Rt,it,zt){(re!==Rt||ae!==it||bt!==zt)&&(r.stencilOp(Rt,it,zt),re=Rt,ae=it,bt=zt)},setLocked:function(Rt){U=Rt},setClear:function(Rt){St!==Rt&&(r.clearStencil(Rt),St=Rt)},reset:function(){U=!1,ot=null,at=null,Ft=null,Ut=null,re=null,ae=null,bt=null,St=null}}}const a=new i,l=new s,c=new o,u=new WeakMap,h=new WeakMap;let f={},d={},_=new WeakMap,g=[],p=null,m=!1,M=null,v=null,x=null,A=null,w=null,E=null,D=null,S=new Ot(0,0,0),y=0,F=!1,N=null,K=null,L=null,O=null,k=null;const X=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,$=0;const R=r.getParameter(r.VERSION);R.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(R)[1]),Y=$>=1):R.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(R)[1]),Y=$>=2);let J=null,nt={};const q=r.getParameter(r.SCISSOR_BOX),Z=r.getParameter(r.VIEWPORT),st=new ye().fromArray(q),gt=new ye().fromArray(Z);function dt(U,ot,at,Ft){const Ut=new Uint8Array(4),re=r.createTexture();r.bindTexture(U,re),r.texParameteri(U,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(U,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ae=0;ae<at;ae++)n&&(U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY)?r.texImage3D(ot,0,r.RGBA,1,1,Ft,0,r.RGBA,r.UNSIGNED_BYTE,Ut):r.texImage2D(ot+ae,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ut);return re}const Pt={};Pt[r.TEXTURE_2D]=dt(r.TEXTURE_2D,r.TEXTURE_2D,1),Pt[r.TEXTURE_CUBE_MAP]=dt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Pt[r.TEXTURE_2D_ARRAY]=dt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Pt[r.TEXTURE_3D]=dt(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Lt(r.DEPTH_TEST),l.setFunc(Ia),Bt(!1),C(Iu),Lt(r.CULL_FACE),_t(Li);function Lt(U){f[U]!==!0&&(r.enable(U),f[U]=!0)}function Nt(U){f[U]!==!1&&(r.disable(U),f[U]=!1)}function Vt(U,ot){return d[U]!==ot?(r.bindFramebuffer(U,ot),d[U]=ot,n&&(U===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=ot),U===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=ot)),!0):!1}function H(U,ot){let at=g,Ft=!1;if(U)if(at=_.get(ot),at===void 0&&(at=[],_.set(ot,at)),U.isWebGLMultipleRenderTargets){const Ut=U.texture;if(at.length!==Ut.length||at[0]!==r.COLOR_ATTACHMENT0){for(let re=0,ae=Ut.length;re<ae;re++)at[re]=r.COLOR_ATTACHMENT0+re;at.length=Ut.length,Ft=!0}}else at[0]!==r.COLOR_ATTACHMENT0&&(at[0]=r.COLOR_ATTACHMENT0,Ft=!0);else at[0]!==r.BACK&&(at[0]=r.BACK,Ft=!0);Ft&&(e.isWebGL2?r.drawBuffers(at):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(at))}function Wt(U){return p!==U?(r.useProgram(U),p=U,!0):!1}const mt={[Tr]:r.FUNC_ADD,[pm]:r.FUNC_SUBTRACT,[mm]:r.FUNC_REVERSE_SUBTRACT};if(n)mt[zu]=r.MIN,mt[Bu]=r.MAX;else{const U=t.get("EXT_blend_minmax");U!==null&&(mt[zu]=U.MIN_EXT,mt[Bu]=U.MAX_EXT)}const Dt={[gm]:r.ZERO,[_m]:r.ONE,[vm]:r.SRC_COLOR,[uc]:r.SRC_ALPHA,[Tm]:r.SRC_ALPHA_SATURATE,[ym]:r.DST_COLOR,[Sm]:r.DST_ALPHA,[xm]:r.ONE_MINUS_SRC_COLOR,[hc]:r.ONE_MINUS_SRC_ALPHA,[Em]:r.ONE_MINUS_DST_COLOR,[Mm]:r.ONE_MINUS_DST_ALPHA,[bm]:r.CONSTANT_COLOR,[wm]:r.ONE_MINUS_CONSTANT_COLOR,[Am]:r.CONSTANT_ALPHA,[Cm]:r.ONE_MINUS_CONSTANT_ALPHA};function _t(U,ot,at,Ft,Ut,re,ae,bt,St,Rt){if(U===Li){m===!0&&(Nt(r.BLEND),m=!1);return}if(m===!1&&(Lt(r.BLEND),m=!0),U!==dm){if(U!==M||Rt!==F){if((v!==Tr||w!==Tr)&&(r.blendEquation(r.FUNC_ADD),v=Tr,w=Tr),Rt)switch(U){case Qi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Mo:r.blendFunc(r.ONE,r.ONE);break;case Ou:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Fu:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Qi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Mo:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Ou:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Fu:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}x=null,A=null,E=null,D=null,S.set(0,0,0),y=0,M=U,F=Rt}return}Ut=Ut||ot,re=re||at,ae=ae||Ft,(ot!==v||Ut!==w)&&(r.blendEquationSeparate(mt[ot],mt[Ut]),v=ot,w=Ut),(at!==x||Ft!==A||re!==E||ae!==D)&&(r.blendFuncSeparate(Dt[at],Dt[Ft],Dt[re],Dt[ae]),x=at,A=Ft,E=re,D=ae),(bt.equals(S)===!1||St!==y)&&(r.blendColor(bt.r,bt.g,bt.b,St),S.copy(bt),y=St),M=U,F=!1}function G(U,ot){U.side===di?Nt(r.CULL_FACE):Lt(r.CULL_FACE);let at=U.side===Tn;ot&&(at=!at),Bt(at),U.blending===Qi&&U.transparent===!1?_t(Li):_t(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),l.setFunc(U.depthFunc),l.setTest(U.depthTest),l.setMask(U.depthWrite),a.setMask(U.colorWrite);const Ft=U.stencilWrite;c.setTest(Ft),Ft&&(c.setMask(U.stencilWriteMask),c.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),c.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),z(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?Lt(r.SAMPLE_ALPHA_TO_COVERAGE):Nt(r.SAMPLE_ALPHA_TO_COVERAGE)}function Bt(U){N!==U&&(U?r.frontFace(r.CW):r.frontFace(r.CCW),N=U)}function C(U){U!==um?(Lt(r.CULL_FACE),U!==K&&(U===Iu?r.cullFace(r.BACK):U===hm?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Nt(r.CULL_FACE),K=U}function T(U){U!==L&&(Y&&r.lineWidth(U),L=U)}function z(U,ot,at){U?(Lt(r.POLYGON_OFFSET_FILL),(O!==ot||k!==at)&&(r.polygonOffset(ot,at),O=ot,k=at)):Nt(r.POLYGON_OFFSET_FILL)}function tt(U){U?Lt(r.SCISSOR_TEST):Nt(r.SCISSOR_TEST)}function Q(U){U===void 0&&(U=r.TEXTURE0+X-1),J!==U&&(r.activeTexture(U),J=U)}function et(U,ot,at){at===void 0&&(J===null?at=r.TEXTURE0+X-1:at=J);let Ft=nt[at];Ft===void 0&&(Ft={type:void 0,texture:void 0},nt[at]=Ft),(Ft.type!==U||Ft.texture!==ot)&&(J!==at&&(r.activeTexture(at),J=at),r.bindTexture(U,ot||Pt[U]),Ft.type=U,Ft.texture=ot)}function pt(){const U=nt[J];U!==void 0&&U.type!==void 0&&(r.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function ut(){try{r.compressedTexImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ct(){try{r.compressedTexImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function wt(){try{r.texSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Gt(){try{r.texSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function j(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function oe(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ct(){try{r.texStorage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Xt(){try{r.texStorage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Tt(){try{r.texImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function vt(){try{r.texImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Yt(U){st.equals(U)===!1&&(r.scissor(U.x,U.y,U.z,U.w),st.copy(U))}function Qt(U){gt.equals(U)===!1&&(r.viewport(U.x,U.y,U.z,U.w),gt.copy(U))}function le(U,ot){let at=h.get(ot);at===void 0&&(at=new WeakMap,h.set(ot,at));let Ft=at.get(U);Ft===void 0&&(Ft=r.getUniformBlockIndex(ot,U.name),at.set(U,Ft))}function ft(U,ot){const Ft=h.get(ot).get(U);u.get(ot)!==Ft&&(r.uniformBlockBinding(ot,Ft,U.__bindingPointIndex),u.set(ot,Ft))}function rt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),f={},J=null,nt={},d={},_=new WeakMap,g=[],p=null,m=!1,M=null,v=null,x=null,A=null,w=null,E=null,D=null,S=new Ot(0,0,0),y=0,F=!1,N=null,K=null,L=null,O=null,k=null,st.set(0,0,r.canvas.width,r.canvas.height),gt.set(0,0,r.canvas.width,r.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Lt,disable:Nt,bindFramebuffer:Vt,drawBuffers:H,useProgram:Wt,setBlending:_t,setMaterial:G,setFlipSided:Bt,setCullFace:C,setLineWidth:T,setPolygonOffset:z,setScissorTest:tt,activeTexture:Q,bindTexture:et,unbindTexture:pt,compressedTexImage2D:ut,compressedTexImage3D:ct,texImage2D:Tt,texImage3D:vt,updateUBOMapping:le,uniformBlockBinding:ft,texStorage2D:Ct,texStorage3D:Xt,texSubImage2D:wt,texSubImage3D:Gt,compressedTexSubImage2D:j,compressedTexSubImage3D:oe,scissor:Yt,viewport:Qt,reset:rt}}function xS(r,t,e,n,i,s,o){const a=i.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,T){return d?new OffscreenCanvas(C,T):Ha("canvas")}function g(C,T,z,tt){let Q=1;if((C.width>tt||C.height>tt)&&(Q=tt/Math.max(C.width,C.height)),Q<1||T===!0)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap){const et=T?ka:Math.floor,pt=et(Q*C.width),ut=et(Q*C.height);h===void 0&&(h=_(pt,ut));const ct=z?_(pt,ut):h;return ct.width=pt,ct.height=ut,ct.getContext("2d").drawImage(C,0,0,pt,ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+C.width+"x"+C.height+") to ("+pt+"x"+ut+")."),ct}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+C.width+"x"+C.height+")."),C;return C}function p(C){return _c(C.width)&&_c(C.height)}function m(C){return a?!1:C.wrapS!==ai||C.wrapT!==ai||C.minFilter!==xn&&C.minFilter!==Kn}function M(C,T){return C.generateMipmaps&&T&&C.minFilter!==xn&&C.minFilter!==Kn}function v(C){r.generateMipmap(C)}function x(C,T,z,tt,Q=!1){if(a===!1)return T;if(C!==null){if(r[C]!==void 0)return r[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let et=T;if(T===r.RED&&(z===r.FLOAT&&(et=r.R32F),z===r.HALF_FLOAT&&(et=r.R16F),z===r.UNSIGNED_BYTE&&(et=r.R8)),T===r.RED_INTEGER&&(z===r.UNSIGNED_BYTE&&(et=r.R8UI),z===r.UNSIGNED_SHORT&&(et=r.R16UI),z===r.UNSIGNED_INT&&(et=r.R32UI),z===r.BYTE&&(et=r.R8I),z===r.SHORT&&(et=r.R16I),z===r.INT&&(et=r.R32I)),T===r.RG&&(z===r.FLOAT&&(et=r.RG32F),z===r.HALF_FLOAT&&(et=r.RG16F),z===r.UNSIGNED_BYTE&&(et=r.RG8)),T===r.RGBA){const pt=Q?Oa:pe.getTransfer(tt);z===r.FLOAT&&(et=r.RGBA32F),z===r.HALF_FLOAT&&(et=r.RGBA16F),z===r.UNSIGNED_BYTE&&(et=pt===Se?r.SRGB8_ALPHA8:r.RGBA8),z===r.UNSIGNED_SHORT_4_4_4_4&&(et=r.RGBA4),z===r.UNSIGNED_SHORT_5_5_5_1&&(et=r.RGB5_A1)}return(et===r.R16F||et===r.R32F||et===r.RG16F||et===r.RG32F||et===r.RGBA16F||et===r.RGBA32F)&&t.get("EXT_color_buffer_float"),et}function A(C,T,z){return M(C,z)===!0||C.isFramebufferTexture&&C.minFilter!==xn&&C.minFilter!==Kn?Math.log2(Math.max(T.width,T.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?T.mipmaps.length:1}function w(C){return C===xn||C===ku||C===gl?r.NEAREST:r.LINEAR}function E(C){const T=C.target;T.removeEventListener("dispose",E),S(T),T.isVideoTexture&&u.delete(T)}function D(C){const T=C.target;T.removeEventListener("dispose",D),F(T)}function S(C){const T=n.get(C);if(T.__webglInit===void 0)return;const z=C.source,tt=f.get(z);if(tt){const Q=tt[T.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&y(C),Object.keys(tt).length===0&&f.delete(z)}n.remove(C)}function y(C){const T=n.get(C);r.deleteTexture(T.__webglTexture);const z=C.source,tt=f.get(z);delete tt[T.__cacheKey],o.memory.textures--}function F(C){const T=C.texture,z=n.get(C),tt=n.get(T);if(tt.__webglTexture!==void 0&&(r.deleteTexture(tt.__webglTexture),o.memory.textures--),C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(z.__webglFramebuffer[Q]))for(let et=0;et<z.__webglFramebuffer[Q].length;et++)r.deleteFramebuffer(z.__webglFramebuffer[Q][et]);else r.deleteFramebuffer(z.__webglFramebuffer[Q]);z.__webglDepthbuffer&&r.deleteRenderbuffer(z.__webglDepthbuffer[Q])}else{if(Array.isArray(z.__webglFramebuffer))for(let Q=0;Q<z.__webglFramebuffer.length;Q++)r.deleteFramebuffer(z.__webglFramebuffer[Q]);else r.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&r.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&r.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let Q=0;Q<z.__webglColorRenderbuffer.length;Q++)z.__webglColorRenderbuffer[Q]&&r.deleteRenderbuffer(z.__webglColorRenderbuffer[Q]);z.__webglDepthRenderbuffer&&r.deleteRenderbuffer(z.__webglDepthRenderbuffer)}if(C.isWebGLMultipleRenderTargets)for(let Q=0,et=T.length;Q<et;Q++){const pt=n.get(T[Q]);pt.__webglTexture&&(r.deleteTexture(pt.__webglTexture),o.memory.textures--),n.remove(T[Q])}n.remove(T),n.remove(C)}let N=0;function K(){N=0}function L(){const C=N;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),N+=1,C}function O(C){const T=[];return T.push(C.wrapS),T.push(C.wrapT),T.push(C.wrapR||0),T.push(C.magFilter),T.push(C.minFilter),T.push(C.anisotropy),T.push(C.internalFormat),T.push(C.format),T.push(C.type),T.push(C.generateMipmaps),T.push(C.premultiplyAlpha),T.push(C.flipY),T.push(C.unpackAlignment),T.push(C.colorSpace),T.join()}function k(C,T){const z=n.get(C);if(C.isVideoTexture&&G(C),C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){const tt=C.image;if(tt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{st(z,C,T);return}}e.bindTexture(r.TEXTURE_2D,z.__webglTexture,r.TEXTURE0+T)}function X(C,T){const z=n.get(C);if(C.version>0&&z.__version!==C.version){st(z,C,T);return}e.bindTexture(r.TEXTURE_2D_ARRAY,z.__webglTexture,r.TEXTURE0+T)}function Y(C,T){const z=n.get(C);if(C.version>0&&z.__version!==C.version){st(z,C,T);return}e.bindTexture(r.TEXTURE_3D,z.__webglTexture,r.TEXTURE0+T)}function $(C,T){const z=n.get(C);if(C.version>0&&z.__version!==C.version){gt(z,C,T);return}e.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture,r.TEXTURE0+T)}const R={[pc]:r.REPEAT,[ai]:r.CLAMP_TO_EDGE,[mc]:r.MIRRORED_REPEAT},J={[xn]:r.NEAREST,[ku]:r.NEAREST_MIPMAP_NEAREST,[gl]:r.NEAREST_MIPMAP_LINEAR,[Kn]:r.LINEAR,[Vm]:r.LINEAR_MIPMAP_NEAREST,[yo]:r.LINEAR_MIPMAP_LINEAR},nt={[eg]:r.NEVER,[ag]:r.ALWAYS,[ng]:r.LESS,[cd]:r.LEQUAL,[ig]:r.EQUAL,[og]:r.GEQUAL,[rg]:r.GREATER,[sg]:r.NOTEQUAL};function q(C,T,z){if(z?(r.texParameteri(C,r.TEXTURE_WRAP_S,R[T.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,R[T.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,R[T.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,J[T.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,J[T.minFilter])):(r.texParameteri(C,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(C,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(T.wrapS!==ai||T.wrapT!==ai)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(C,r.TEXTURE_MAG_FILTER,w(T.magFilter)),r.texParameteri(C,r.TEXTURE_MIN_FILTER,w(T.minFilter)),T.minFilter!==xn&&T.minFilter!==Kn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),T.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,nt[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const tt=t.get("EXT_texture_filter_anisotropic");if(T.magFilter===xn||T.minFilter!==gl&&T.minFilter!==yo||T.type===qi&&t.has("OES_texture_float_linear")===!1||a===!1&&T.type===Di&&t.has("OES_texture_half_float_linear")===!1)return;(T.anisotropy>1||n.get(T).__currentAnisotropy)&&(r.texParameterf(C,tt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy)}}function Z(C,T){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,T.addEventListener("dispose",E));const tt=T.source;let Q=f.get(tt);Q===void 0&&(Q={},f.set(tt,Q));const et=O(T);if(et!==C.__cacheKey){Q[et]===void 0&&(Q[et]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,z=!0),Q[et].usedTimes++;const pt=Q[C.__cacheKey];pt!==void 0&&(Q[C.__cacheKey].usedTimes--,pt.usedTimes===0&&y(T)),C.__cacheKey=et,C.__webglTexture=Q[et].texture}return z}function st(C,T,z){let tt=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(tt=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(tt=r.TEXTURE_3D);const Q=Z(C,T),et=T.source;e.bindTexture(tt,C.__webglTexture,r.TEXTURE0+z);const pt=n.get(et);if(et.version!==pt.__version||Q===!0){e.activeTexture(r.TEXTURE0+z);const ut=pe.getPrimaries(pe.workingColorSpace),ct=T.colorSpace===jn?null:pe.getPrimaries(T.colorSpace),wt=T.colorSpace===jn||ut===ct?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);const Gt=m(T)&&p(T.image)===!1;let j=g(T.image,Gt,!1,i.maxTextureSize);j=Bt(T,j);const oe=p(j)||a,Ct=s.convert(T.format,T.colorSpace);let Xt=s.convert(T.type),Tt=x(T.internalFormat,Ct,Xt,T.colorSpace,T.isVideoTexture);q(tt,T,oe);let vt;const Yt=T.mipmaps,Qt=a&&T.isVideoTexture!==!0&&Tt!==od,le=pt.__version===void 0||Q===!0,ft=A(T,j,oe);if(T.isDepthTexture)Tt=r.DEPTH_COMPONENT,a?T.type===qi?Tt=r.DEPTH_COMPONENT32F:T.type===Yi?Tt=r.DEPTH_COMPONENT24:T.type===Cr?Tt=r.DEPTH24_STENCIL8:Tt=r.DEPTH_COMPONENT16:T.type===qi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),T.format===Rr&&Tt===r.DEPTH_COMPONENT&&T.type!==Yc&&T.type!==Yi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),T.type=Yi,Xt=s.convert(T.type)),T.format===Cs&&Tt===r.DEPTH_COMPONENT&&(Tt=r.DEPTH_STENCIL,T.type!==Cr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),T.type=Cr,Xt=s.convert(T.type))),le&&(Qt?e.texStorage2D(r.TEXTURE_2D,1,Tt,j.width,j.height):e.texImage2D(r.TEXTURE_2D,0,Tt,j.width,j.height,0,Ct,Xt,null));else if(T.isDataTexture)if(Yt.length>0&&oe){Qt&&le&&e.texStorage2D(r.TEXTURE_2D,ft,Tt,Yt[0].width,Yt[0].height);for(let rt=0,U=Yt.length;rt<U;rt++)vt=Yt[rt],Qt?e.texSubImage2D(r.TEXTURE_2D,rt,0,0,vt.width,vt.height,Ct,Xt,vt.data):e.texImage2D(r.TEXTURE_2D,rt,Tt,vt.width,vt.height,0,Ct,Xt,vt.data);T.generateMipmaps=!1}else Qt?(le&&e.texStorage2D(r.TEXTURE_2D,ft,Tt,j.width,j.height),e.texSubImage2D(r.TEXTURE_2D,0,0,0,j.width,j.height,Ct,Xt,j.data)):e.texImage2D(r.TEXTURE_2D,0,Tt,j.width,j.height,0,Ct,Xt,j.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Qt&&le&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ft,Tt,Yt[0].width,Yt[0].height,j.depth);for(let rt=0,U=Yt.length;rt<U;rt++)vt=Yt[rt],T.format!==li?Ct!==null?Qt?e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,rt,0,0,0,vt.width,vt.height,j.depth,Ct,vt.data,0,0):e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,rt,Tt,vt.width,vt.height,j.depth,0,vt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qt?e.texSubImage3D(r.TEXTURE_2D_ARRAY,rt,0,0,0,vt.width,vt.height,j.depth,Ct,Xt,vt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,rt,Tt,vt.width,vt.height,j.depth,0,Ct,Xt,vt.data)}else{Qt&&le&&e.texStorage2D(r.TEXTURE_2D,ft,Tt,Yt[0].width,Yt[0].height);for(let rt=0,U=Yt.length;rt<U;rt++)vt=Yt[rt],T.format!==li?Ct!==null?Qt?e.compressedTexSubImage2D(r.TEXTURE_2D,rt,0,0,vt.width,vt.height,Ct,vt.data):e.compressedTexImage2D(r.TEXTURE_2D,rt,Tt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qt?e.texSubImage2D(r.TEXTURE_2D,rt,0,0,vt.width,vt.height,Ct,Xt,vt.data):e.texImage2D(r.TEXTURE_2D,rt,Tt,vt.width,vt.height,0,Ct,Xt,vt.data)}else if(T.isDataArrayTexture)Qt?(le&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ft,Tt,j.width,j.height,j.depth),e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,Ct,Xt,j.data)):e.texImage3D(r.TEXTURE_2D_ARRAY,0,Tt,j.width,j.height,j.depth,0,Ct,Xt,j.data);else if(T.isData3DTexture)Qt?(le&&e.texStorage3D(r.TEXTURE_3D,ft,Tt,j.width,j.height,j.depth),e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,Ct,Xt,j.data)):e.texImage3D(r.TEXTURE_3D,0,Tt,j.width,j.height,j.depth,0,Ct,Xt,j.data);else if(T.isFramebufferTexture){if(le)if(Qt)e.texStorage2D(r.TEXTURE_2D,ft,Tt,j.width,j.height);else{let rt=j.width,U=j.height;for(let ot=0;ot<ft;ot++)e.texImage2D(r.TEXTURE_2D,ot,Tt,rt,U,0,Ct,Xt,null),rt>>=1,U>>=1}}else if(Yt.length>0&&oe){Qt&&le&&e.texStorage2D(r.TEXTURE_2D,ft,Tt,Yt[0].width,Yt[0].height);for(let rt=0,U=Yt.length;rt<U;rt++)vt=Yt[rt],Qt?e.texSubImage2D(r.TEXTURE_2D,rt,0,0,Ct,Xt,vt):e.texImage2D(r.TEXTURE_2D,rt,Tt,Ct,Xt,vt);T.generateMipmaps=!1}else Qt?(le&&e.texStorage2D(r.TEXTURE_2D,ft,Tt,j.width,j.height),e.texSubImage2D(r.TEXTURE_2D,0,0,0,Ct,Xt,j)):e.texImage2D(r.TEXTURE_2D,0,Tt,Ct,Xt,j);M(T,oe)&&v(tt),pt.__version=et.version,T.onUpdate&&T.onUpdate(T)}C.__version=T.version}function gt(C,T,z){if(T.image.length!==6)return;const tt=Z(C,T),Q=T.source;e.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+z);const et=n.get(Q);if(Q.version!==et.__version||tt===!0){e.activeTexture(r.TEXTURE0+z);const pt=pe.getPrimaries(pe.workingColorSpace),ut=T.colorSpace===jn?null:pe.getPrimaries(T.colorSpace),ct=T.colorSpace===jn||pt===ut?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct);const wt=T.isCompressedTexture||T.image[0].isCompressedTexture,Gt=T.image[0]&&T.image[0].isDataTexture,j=[];for(let rt=0;rt<6;rt++)!wt&&!Gt?j[rt]=g(T.image[rt],!1,!0,i.maxCubemapSize):j[rt]=Gt?T.image[rt].image:T.image[rt],j[rt]=Bt(T,j[rt]);const oe=j[0],Ct=p(oe)||a,Xt=s.convert(T.format,T.colorSpace),Tt=s.convert(T.type),vt=x(T.internalFormat,Xt,Tt,T.colorSpace),Yt=a&&T.isVideoTexture!==!0,Qt=et.__version===void 0||tt===!0;let le=A(T,oe,Ct);q(r.TEXTURE_CUBE_MAP,T,Ct);let ft;if(wt){Yt&&Qt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,le,vt,oe.width,oe.height);for(let rt=0;rt<6;rt++){ft=j[rt].mipmaps;for(let U=0;U<ft.length;U++){const ot=ft[U];T.format!==li?Xt!==null?Yt?e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,U,0,0,ot.width,ot.height,Xt,ot.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,U,vt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Yt?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,U,0,0,ot.width,ot.height,Xt,Tt,ot.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,U,vt,ot.width,ot.height,0,Xt,Tt,ot.data)}}}else{ft=T.mipmaps,Yt&&Qt&&(ft.length>0&&le++,e.texStorage2D(r.TEXTURE_CUBE_MAP,le,vt,j[0].width,j[0].height));for(let rt=0;rt<6;rt++)if(Gt){Yt?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,j[rt].width,j[rt].height,Xt,Tt,j[rt].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,vt,j[rt].width,j[rt].height,0,Xt,Tt,j[rt].data);for(let U=0;U<ft.length;U++){const at=ft[U].image[rt].image;Yt?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,U+1,0,0,at.width,at.height,Xt,Tt,at.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,U+1,vt,at.width,at.height,0,Xt,Tt,at.data)}}else{Yt?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,Xt,Tt,j[rt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,vt,Xt,Tt,j[rt]);for(let U=0;U<ft.length;U++){const ot=ft[U];Yt?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,U+1,0,0,Xt,Tt,ot.image[rt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+rt,U+1,vt,Xt,Tt,ot.image[rt])}}}M(T,Ct)&&v(r.TEXTURE_CUBE_MAP),et.__version=Q.version,T.onUpdate&&T.onUpdate(T)}C.__version=T.version}function dt(C,T,z,tt,Q,et){const pt=s.convert(z.format,z.colorSpace),ut=s.convert(z.type),ct=x(z.internalFormat,pt,ut,z.colorSpace);if(!n.get(T).__hasExternalTextures){const Gt=Math.max(1,T.width>>et),j=Math.max(1,T.height>>et);Q===r.TEXTURE_3D||Q===r.TEXTURE_2D_ARRAY?e.texImage3D(Q,et,ct,Gt,j,T.depth,0,pt,ut,null):e.texImage2D(Q,et,ct,Gt,j,0,pt,ut,null)}e.bindFramebuffer(r.FRAMEBUFFER,C),_t(T)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,tt,Q,n.get(z).__webglTexture,0,Dt(T)):(Q===r.TEXTURE_2D||Q>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,tt,Q,n.get(z).__webglTexture,et),e.bindFramebuffer(r.FRAMEBUFFER,null)}function Pt(C,T,z){if(r.bindRenderbuffer(r.RENDERBUFFER,C),T.depthBuffer&&!T.stencilBuffer){let tt=a===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(z||_t(T)){const Q=T.depthTexture;Q&&Q.isDepthTexture&&(Q.type===qi?tt=r.DEPTH_COMPONENT32F:Q.type===Yi&&(tt=r.DEPTH_COMPONENT24));const et=Dt(T);_t(T)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,et,tt,T.width,T.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,et,tt,T.width,T.height)}else r.renderbufferStorage(r.RENDERBUFFER,tt,T.width,T.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,C)}else if(T.depthBuffer&&T.stencilBuffer){const tt=Dt(T);z&&_t(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,tt,r.DEPTH24_STENCIL8,T.width,T.height):_t(T)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,tt,r.DEPTH24_STENCIL8,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,C)}else{const tt=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let Q=0;Q<tt.length;Q++){const et=tt[Q],pt=s.convert(et.format,et.colorSpace),ut=s.convert(et.type),ct=x(et.internalFormat,pt,ut,et.colorSpace),wt=Dt(T);z&&_t(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,wt,ct,T.width,T.height):_t(T)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,wt,ct,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,ct,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Lt(C,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,C),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),k(T.depthTexture,0);const tt=n.get(T.depthTexture).__webglTexture,Q=Dt(T);if(T.depthTexture.format===Rr)_t(T)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,tt,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,tt,0);else if(T.depthTexture.format===Cs)_t(T)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,tt,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Nt(C){const T=n.get(C),z=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!T.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Lt(T.__webglFramebuffer,C)}else if(z){T.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)e.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[tt]),T.__webglDepthbuffer[tt]=r.createRenderbuffer(),Pt(T.__webglDepthbuffer[tt],C,!1)}else e.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=r.createRenderbuffer(),Pt(T.__webglDepthbuffer,C,!1);e.bindFramebuffer(r.FRAMEBUFFER,null)}function Vt(C,T,z){const tt=n.get(C);T!==void 0&&dt(tt.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),z!==void 0&&Nt(C)}function H(C){const T=C.texture,z=n.get(C),tt=n.get(T);C.addEventListener("dispose",D),C.isWebGLMultipleRenderTargets!==!0&&(tt.__webglTexture===void 0&&(tt.__webglTexture=r.createTexture()),tt.__version=T.version,o.memory.textures++);const Q=C.isWebGLCubeRenderTarget===!0,et=C.isWebGLMultipleRenderTargets===!0,pt=p(C)||a;if(Q){z.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(a&&T.mipmaps&&T.mipmaps.length>0){z.__webglFramebuffer[ut]=[];for(let ct=0;ct<T.mipmaps.length;ct++)z.__webglFramebuffer[ut][ct]=r.createFramebuffer()}else z.__webglFramebuffer[ut]=r.createFramebuffer()}else{if(a&&T.mipmaps&&T.mipmaps.length>0){z.__webglFramebuffer=[];for(let ut=0;ut<T.mipmaps.length;ut++)z.__webglFramebuffer[ut]=r.createFramebuffer()}else z.__webglFramebuffer=r.createFramebuffer();if(et)if(i.drawBuffers){const ut=C.texture;for(let ct=0,wt=ut.length;ct<wt;ct++){const Gt=n.get(ut[ct]);Gt.__webglTexture===void 0&&(Gt.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&C.samples>0&&_t(C)===!1){const ut=et?T:[T];z.__webglMultisampledFramebuffer=r.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ct=0;ct<ut.length;ct++){const wt=ut[ct];z.__webglColorRenderbuffer[ct]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,z.__webglColorRenderbuffer[ct]);const Gt=s.convert(wt.format,wt.colorSpace),j=s.convert(wt.type),oe=x(wt.internalFormat,Gt,j,wt.colorSpace,C.isXRRenderTarget===!0),Ct=Dt(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ct,oe,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ct,r.RENDERBUFFER,z.__webglColorRenderbuffer[ct])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=r.createRenderbuffer(),Pt(z.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Q){e.bindTexture(r.TEXTURE_CUBE_MAP,tt.__webglTexture),q(r.TEXTURE_CUBE_MAP,T,pt);for(let ut=0;ut<6;ut++)if(a&&T.mipmaps&&T.mipmaps.length>0)for(let ct=0;ct<T.mipmaps.length;ct++)dt(z.__webglFramebuffer[ut][ct],C,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ut,ct);else dt(z.__webglFramebuffer[ut],C,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);M(T,pt)&&v(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(et){const ut=C.texture;for(let ct=0,wt=ut.length;ct<wt;ct++){const Gt=ut[ct],j=n.get(Gt);e.bindTexture(r.TEXTURE_2D,j.__webglTexture),q(r.TEXTURE_2D,Gt,pt),dt(z.__webglFramebuffer,C,Gt,r.COLOR_ATTACHMENT0+ct,r.TEXTURE_2D,0),M(Gt,pt)&&v(r.TEXTURE_2D)}e.unbindTexture()}else{let ut=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(a?ut=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(ut,tt.__webglTexture),q(ut,T,pt),a&&T.mipmaps&&T.mipmaps.length>0)for(let ct=0;ct<T.mipmaps.length;ct++)dt(z.__webglFramebuffer[ct],C,T,r.COLOR_ATTACHMENT0,ut,ct);else dt(z.__webglFramebuffer,C,T,r.COLOR_ATTACHMENT0,ut,0);M(T,pt)&&v(ut),e.unbindTexture()}C.depthBuffer&&Nt(C)}function Wt(C){const T=p(C)||a,z=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let tt=0,Q=z.length;tt<Q;tt++){const et=z[tt];if(M(et,T)){const pt=C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,ut=n.get(et).__webglTexture;e.bindTexture(pt,ut),v(pt),e.unbindTexture()}}}function mt(C){if(a&&C.samples>0&&_t(C)===!1){const T=C.isWebGLMultipleRenderTargets?C.texture:[C.texture],z=C.width,tt=C.height;let Q=r.COLOR_BUFFER_BIT;const et=[],pt=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ut=n.get(C),ct=C.isWebGLMultipleRenderTargets===!0;if(ct)for(let wt=0;wt<T.length;wt++)e.bindFramebuffer(r.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,ut.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,ut.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,ut.__webglFramebuffer);for(let wt=0;wt<T.length;wt++){et.push(r.COLOR_ATTACHMENT0+wt),C.depthBuffer&&et.push(pt);const Gt=ut.__ignoreDepthValues!==void 0?ut.__ignoreDepthValues:!1;if(Gt===!1&&(C.depthBuffer&&(Q|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&(Q|=r.STENCIL_BUFFER_BIT)),ct&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ut.__webglColorRenderbuffer[wt]),Gt===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[pt]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[pt])),ct){const j=n.get(T[wt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,j,0)}r.blitFramebuffer(0,0,z,tt,0,0,z,tt,Q,r.NEAREST),c&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,et)}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ct)for(let wt=0;wt<T.length;wt++){e.bindFramebuffer(r.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.RENDERBUFFER,ut.__webglColorRenderbuffer[wt]);const Gt=n.get(T[wt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,ut.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.TEXTURE_2D,Gt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,ut.__webglMultisampledFramebuffer)}}function Dt(C){return Math.min(i.maxSamples,C.samples)}function _t(C){const T=n.get(C);return a&&C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function G(C){const T=o.render.frame;u.get(C)!==T&&(u.set(C,T),C.update())}function Bt(C,T){const z=C.colorSpace,tt=C.format,Q=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||C.format===gc||z!==Ni&&z!==jn&&(pe.getTransfer(z)===Se?a===!1?t.has("EXT_sRGB")===!0&&tt===li?(C.format=gc,C.minFilter=Kn,C.generateMipmaps=!1):T=hd.sRGBToLinear(T):(tt!==li||Q!==er)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),T}this.allocateTextureUnit=L,this.resetTextureUnits=K,this.setTexture2D=k,this.setTexture2DArray=X,this.setTexture3D=Y,this.setTextureCube=$,this.rebindTextures=Vt,this.setupRenderTarget=H,this.updateRenderTargetMipmap=Wt,this.updateMultisampleRenderTarget=mt,this.setupDepthRenderbuffer=Nt,this.setupFrameBufferTexture=dt,this.useMultisampledRTT=_t}function SS(r,t,e){const n=e.isWebGL2;function i(s,o=jn){let a;const l=pe.getTransfer(o);if(s===er)return r.UNSIGNED_BYTE;if(s===ed)return r.UNSIGNED_SHORT_4_4_4_4;if(s===nd)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Wm)return r.BYTE;if(s===Xm)return r.SHORT;if(s===Yc)return r.UNSIGNED_SHORT;if(s===td)return r.INT;if(s===Yi)return r.UNSIGNED_INT;if(s===qi)return r.FLOAT;if(s===Di)return n?r.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Ym)return r.ALPHA;if(s===li)return r.RGBA;if(s===qm)return r.LUMINANCE;if(s===$m)return r.LUMINANCE_ALPHA;if(s===Rr)return r.DEPTH_COMPONENT;if(s===Cs)return r.DEPTH_STENCIL;if(s===gc)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Km)return r.RED;if(s===id)return r.RED_INTEGER;if(s===Zm)return r.RG;if(s===rd)return r.RG_INTEGER;if(s===sd)return r.RGBA_INTEGER;if(s===_l||s===vl||s===xl||s===Sl)if(l===Se)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===_l)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===vl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===xl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Sl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===_l)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===vl)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===xl)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Sl)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Hu||s===Gu||s===Vu||s===Wu)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Hu)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Gu)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Vu)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Wu)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===od)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Xu||s===Yu)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Xu)return l===Se?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Yu)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===qu||s===$u||s===Ku||s===Zu||s===Ju||s===ju||s===Qu||s===th||s===eh||s===nh||s===ih||s===rh||s===sh||s===oh)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(s===qu)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===$u)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Ku)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Zu)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Ju)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===ju)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Qu)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===th)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===eh)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===nh)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===ih)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===rh)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===sh)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===oh)return l===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Ml||s===ah||s===lh)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(s===Ml)return l===Se?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===ah)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===lh)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Jm||s===ch||s===uh||s===hh)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(s===Ml)return a.COMPRESSED_RED_RGTC1_EXT;if(s===ch)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===uh)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===hh)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Cr?n?r.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class MS extends Fn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class mi extends qe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const yS={type:"move"};class Wl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const g of t.hand.values()){const p=e.getJointPose(g,n),m=this._getHandJoint(c,g);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,_=.005;c.inputState.pinching&&f>d+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(yS)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new mi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class ES extends Fs{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,_=null;const g=e.getContextAttributes();let p=null,m=null;const M=[],v=[],x=new xt;let A=null;const w=new Fn;w.layers.enable(1),w.viewport=new ye;const E=new Fn;E.layers.enable(2),E.viewport=new ye;const D=[w,E],S=new MS;S.layers.enable(1),S.layers.enable(2);let y=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Z=M[q];return Z===void 0&&(Z=new Wl,M[q]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(q){let Z=M[q];return Z===void 0&&(Z=new Wl,M[q]=Z),Z.getGripSpace()},this.getHand=function(q){let Z=M[q];return Z===void 0&&(Z=new Wl,M[q]=Z),Z.getHandSpace()};function N(q){const Z=v.indexOf(q.inputSource);if(Z===-1)return;const st=M[Z];st!==void 0&&(st.update(q.inputSource,q.frame,c||o),st.dispatchEvent({type:q.type,data:q.inputSource}))}function K(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",K),i.removeEventListener("inputsourceschange",L);for(let q=0;q<M.length;q++){const Z=v[q];Z!==null&&(v[q]=null,M[q].disconnect(Z))}y=null,F=null,t.setRenderTarget(p),d=null,f=null,h=null,i=null,m=null,nt.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(x.width,x.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",K),i.addEventListener("inputsourceschange",L),g.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(x),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const Z={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,e,Z),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),m=new ci(d.framebufferWidth,d.framebufferHeight,{format:li,type:er,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let Z=null,st=null,gt=null;g.depth&&(gt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Z=g.stencil?Cs:Rr,st=g.stencil?Cr:Yi);const dt={colorFormat:e.RGBA8,depthFormat:gt,scaleFactor:s};h=new XRWebGLBinding(i,e),f=h.createProjectionLayer(dt),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),m=new ci(f.textureWidth,f.textureHeight,{format:li,type:er,depthTexture:new Ed(f.textureWidth,f.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0});const Pt=t.properties.get(m);Pt.__ignoreDepthValues=f.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),nt.setContext(i),nt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function L(q){for(let Z=0;Z<q.removed.length;Z++){const st=q.removed[Z],gt=v.indexOf(st);gt>=0&&(v[gt]=null,M[gt].disconnect(st))}for(let Z=0;Z<q.added.length;Z++){const st=q.added[Z];let gt=v.indexOf(st);if(gt===-1){for(let Pt=0;Pt<M.length;Pt++)if(Pt>=v.length){v.push(st),gt=Pt;break}else if(v[Pt]===null){v[Pt]=st,gt=Pt;break}if(gt===-1)break}const dt=M[gt];dt&&dt.connect(st)}}const O=new P,k=new P;function X(q,Z,st){O.setFromMatrixPosition(Z.matrixWorld),k.setFromMatrixPosition(st.matrixWorld);const gt=O.distanceTo(k),dt=Z.projectionMatrix.elements,Pt=st.projectionMatrix.elements,Lt=dt[14]/(dt[10]-1),Nt=dt[14]/(dt[10]+1),Vt=(dt[9]+1)/dt[5],H=(dt[9]-1)/dt[5],Wt=(dt[8]-1)/dt[0],mt=(Pt[8]+1)/Pt[0],Dt=Lt*Wt,_t=Lt*mt,G=gt/(-Wt+mt),Bt=G*-Wt;Z.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Bt),q.translateZ(G),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert();const C=Lt+G,T=Nt+G,z=Dt-Bt,tt=_t+(gt-Bt),Q=Vt*Nt/T*C,et=H*Nt/T*C;q.projectionMatrix.makePerspective(z,tt,Q,et,C,T),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}function Y(q,Z){Z===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Z.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;S.near=E.near=w.near=q.near,S.far=E.far=w.far=q.far,(y!==S.near||F!==S.far)&&(i.updateRenderState({depthNear:S.near,depthFar:S.far}),y=S.near,F=S.far);const Z=q.parent,st=S.cameras;Y(S,Z);for(let gt=0;gt<st.length;gt++)Y(st[gt],Z);st.length===2?X(S,w,E):S.projectionMatrix.copy(w.projectionMatrix),$(q,S,Z)};function $(q,Z,st){st===null?q.matrix.copy(Z.matrixWorld):(q.matrix.copy(st.matrixWorld),q.matrix.invert(),q.matrix.multiply(Z.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Eo*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(q){l=q,f!==null&&(f.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)};let R=null;function J(q,Z){if(u=Z.getViewerPose(c||o),_=Z,u!==null){const st=u.views;d!==null&&(t.setRenderTargetFramebuffer(m,d.framebuffer),t.setRenderTarget(m));let gt=!1;st.length!==S.cameras.length&&(S.cameras.length=0,gt=!0);for(let dt=0;dt<st.length;dt++){const Pt=st[dt];let Lt=null;if(d!==null)Lt=d.getViewport(Pt);else{const Vt=h.getViewSubImage(f,Pt);Lt=Vt.viewport,dt===0&&(t.setRenderTargetTextures(m,Vt.colorTexture,f.ignoreDepthValues?void 0:Vt.depthStencilTexture),t.setRenderTarget(m))}let Nt=D[dt];Nt===void 0&&(Nt=new Fn,Nt.layers.enable(dt),Nt.viewport=new ye,D[dt]=Nt),Nt.matrix.fromArray(Pt.transform.matrix),Nt.matrix.decompose(Nt.position,Nt.quaternion,Nt.scale),Nt.projectionMatrix.fromArray(Pt.projectionMatrix),Nt.projectionMatrixInverse.copy(Nt.projectionMatrix).invert(),Nt.viewport.set(Lt.x,Lt.y,Lt.width,Lt.height),dt===0&&(S.matrix.copy(Nt.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),gt===!0&&S.cameras.push(Nt)}}for(let st=0;st<M.length;st++){const gt=v[st],dt=M[st];gt!==null&&dt!==void 0&&dt.update(gt,Z,c||o)}R&&R(q,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),_=null}const nt=new yd;nt.setAnimationLoop(J),this.setAnimationLoop=function(q){R=q},this.dispose=function(){}}}function TS(r,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,xd(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,M,v,x){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),h(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m)):m.isMeshStandardMaterial?(s(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,x)):m.isMeshMatcapMaterial?(s(p,m),_(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),g(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,M,v):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Tn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Tn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const M=t.get(m).envMap;if(M&&(p.envMap.value=M,p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const v=r._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*v,e(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,M,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*M,p.scale.value=v*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),t.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,M){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Tn&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,m){m.matcap&&(p.matcap.value=m.matcap)}function g(p,m){const M=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function bS(r,t,e,n){let i={},s={},o=[];const a=e.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,v){const x=v.program;n.uniformBlockBinding(M,x)}function c(M,v){let x=i[M.id];x===void 0&&(_(M),x=u(M),i[M.id]=x,M.addEventListener("dispose",p));const A=v.program;n.updateUBOMapping(M,A);const w=t.render.frame;s[M.id]!==w&&(f(M),s[M.id]=w)}function u(M){const v=h();M.__bindingPointIndex=v;const x=r.createBuffer(),A=M.__size,w=M.usage;return r.bindBuffer(r.UNIFORM_BUFFER,x),r.bufferData(r.UNIFORM_BUFFER,A,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,x),x}function h(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const v=i[M.id],x=M.uniforms,A=M.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let w=0,E=x.length;w<E;w++){const D=Array.isArray(x[w])?x[w]:[x[w]];for(let S=0,y=D.length;S<y;S++){const F=D[S];if(d(F,w,S,A)===!0){const N=F.__offset,K=Array.isArray(F.value)?F.value:[F.value];let L=0;for(let O=0;O<K.length;O++){const k=K[O],X=g(k);typeof k=="number"||typeof k=="boolean"?(F.__data[0]=k,r.bufferSubData(r.UNIFORM_BUFFER,N+L,F.__data)):k.isMatrix3?(F.__data[0]=k.elements[0],F.__data[1]=k.elements[1],F.__data[2]=k.elements[2],F.__data[3]=0,F.__data[4]=k.elements[3],F.__data[5]=k.elements[4],F.__data[6]=k.elements[5],F.__data[7]=0,F.__data[8]=k.elements[6],F.__data[9]=k.elements[7],F.__data[10]=k.elements[8],F.__data[11]=0):(k.toArray(F.__data,L),L+=X.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,N,F.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(M,v,x,A){const w=M.value,E=v+"_"+x;if(A[E]===void 0)return typeof w=="number"||typeof w=="boolean"?A[E]=w:A[E]=w.clone(),!0;{const D=A[E];if(typeof w=="number"||typeof w=="boolean"){if(D!==w)return A[E]=w,!0}else if(D.equals(w)===!1)return D.copy(w),!0}return!1}function _(M){const v=M.uniforms;let x=0;const A=16;for(let E=0,D=v.length;E<D;E++){const S=Array.isArray(v[E])?v[E]:[v[E]];for(let y=0,F=S.length;y<F;y++){const N=S[y],K=Array.isArray(N.value)?N.value:[N.value];for(let L=0,O=K.length;L<O;L++){const k=K[L],X=g(k),Y=x%A;Y!==0&&A-Y<X.boundary&&(x+=A-Y),N.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=x,x+=X.storage}}}const w=x%A;return w>0&&(x+=A-w),M.__size=x,M.__cache={},this}function g(M){const v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function p(M){const v=M.target;v.removeEventListener("dispose",p);const x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function m(){for(const M in i)r.deleteBuffer(i[M]);o=[],i={},s={}}return{bind:l,update:c,dispose:m}}class Rd{constructor(t={}){const{canvas:e=yg(),context:n=null,depth:i=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;const d=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const m=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ke,this._useLegacyLights=!1,this.toneMapping=tr,this.toneMappingExposure=1;const v=this;let x=!1,A=0,w=0,E=null,D=-1,S=null;const y=new ye,F=new ye;let N=null;const K=new Ot(0);let L=0,O=e.width,k=e.height,X=1,Y=null,$=null;const R=new ye(0,0,O,k),J=new ye(0,0,O,k);let nt=!1;const q=new Kc;let Z=!1,st=!1,gt=null;const dt=new Pe,Pt=new xt,Lt=new P,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Vt(){return E===null?X:1}let H=n;function Wt(b,I){for(let W=0;W<b.length;W++){const V=b[W],B=e.getContext(V,I);if(B!==null)return B}return null}try{const b={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Xc}`),e.addEventListener("webglcontextlost",rt,!1),e.addEventListener("webglcontextrestored",U,!1),e.addEventListener("webglcontextcreationerror",ot,!1),H===null){const I=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&I.shift(),H=Wt(I,b),H===null)throw Wt(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&H instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),H.getShaderPrecisionFormat===void 0&&(H.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let mt,Dt,_t,G,Bt,C,T,z,tt,Q,et,pt,ut,ct,wt,Gt,j,oe,Ct,Xt,Tt,vt,Yt,Qt;function le(){mt=new Iv(H),Dt=new Rv(H,mt,t),mt.init(Dt),vt=new SS(H,mt,Dt),_t=new vS(H,mt,Dt),G=new zv(H),Bt=new rS,C=new xS(H,mt,_t,Bt,Dt,vt,G),T=new Lv(v),z=new Nv(v),tt=new Yg(H,Dt),Yt=new Av(H,mt,tt,Dt),Q=new Ov(H,tt,G,Yt),et=new Gv(H,Q,tt,G),Ct=new Hv(H,Dt,C),Gt=new Pv(Bt),pt=new iS(v,T,z,mt,Dt,Yt,Gt),ut=new TS(v,Bt),ct=new oS,wt=new fS(mt,Dt),oe=new wv(v,T,z,_t,et,f,l),j=new _S(v,et,Dt),Qt=new bS(H,G,Dt,_t),Xt=new Cv(H,mt,G,Dt),Tt=new Fv(H,mt,G,Dt),G.programs=pt.programs,v.capabilities=Dt,v.extensions=mt,v.properties=Bt,v.renderLists=ct,v.shadowMap=j,v.state=_t,v.info=G}le();const ft=new ES(v,H);this.xr=ft,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const b=mt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=mt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(b){b!==void 0&&(X=b,this.setSize(O,k,!1))},this.getSize=function(b){return b.set(O,k)},this.setSize=function(b,I,W=!0){if(ft.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=b,k=I,e.width=Math.floor(b*X),e.height=Math.floor(I*X),W===!0&&(e.style.width=b+"px",e.style.height=I+"px"),this.setViewport(0,0,b,I)},this.getDrawingBufferSize=function(b){return b.set(O*X,k*X).floor()},this.setDrawingBufferSize=function(b,I,W){O=b,k=I,X=W,e.width=Math.floor(b*W),e.height=Math.floor(I*W),this.setViewport(0,0,b,I)},this.getCurrentViewport=function(b){return b.copy(y)},this.getViewport=function(b){return b.copy(R)},this.setViewport=function(b,I,W,V){b.isVector4?R.set(b.x,b.y,b.z,b.w):R.set(b,I,W,V),_t.viewport(y.copy(R).multiplyScalar(X).floor())},this.getScissor=function(b){return b.copy(J)},this.setScissor=function(b,I,W,V){b.isVector4?J.set(b.x,b.y,b.z,b.w):J.set(b,I,W,V),_t.scissor(F.copy(J).multiplyScalar(X).floor())},this.getScissorTest=function(){return nt},this.setScissorTest=function(b){_t.setScissorTest(nt=b)},this.setOpaqueSort=function(b){Y=b},this.setTransparentSort=function(b){$=b},this.getClearColor=function(b){return b.copy(oe.getClearColor())},this.setClearColor=function(){oe.setClearColor.apply(oe,arguments)},this.getClearAlpha=function(){return oe.getClearAlpha()},this.setClearAlpha=function(){oe.setClearAlpha.apply(oe,arguments)},this.clear=function(b=!0,I=!0,W=!0){let V=0;if(b){let B=!1;if(E!==null){const lt=E.texture.format;B=lt===sd||lt===rd||lt===id}if(B){const lt=E.texture.type,yt=lt===er||lt===Yi||lt===Yc||lt===Cr||lt===ed||lt===nd,kt=oe.getClearColor(),Et=oe.getClearAlpha(),At=kt.r,Ht=kt.g,Kt=kt.b;yt?(d[0]=At,d[1]=Ht,d[2]=Kt,d[3]=Et,H.clearBufferuiv(H.COLOR,0,d)):(_[0]=At,_[1]=Ht,_[2]=Kt,_[3]=Et,H.clearBufferiv(H.COLOR,0,_))}else V|=H.COLOR_BUFFER_BIT}I&&(V|=H.DEPTH_BUFFER_BIT),W&&(V|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",rt,!1),e.removeEventListener("webglcontextrestored",U,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),ct.dispose(),wt.dispose(),Bt.dispose(),T.dispose(),z.dispose(),et.dispose(),Yt.dispose(),Qt.dispose(),pt.dispose(),ft.dispose(),ft.removeEventListener("sessionstart",St),ft.removeEventListener("sessionend",Rt),gt&&(gt.dispose(),gt=null),it.stop()};function rt(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function U(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const b=G.autoReset,I=j.enabled,W=j.autoUpdate,V=j.needsUpdate,B=j.type;le(),G.autoReset=b,j.enabled=I,j.autoUpdate=W,j.needsUpdate=V,j.type=B}function ot(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function at(b){const I=b.target;I.removeEventListener("dispose",at),Ft(I)}function Ft(b){Ut(b),Bt.remove(b)}function Ut(b){const I=Bt.get(b).programs;I!==void 0&&(I.forEach(function(W){pt.releaseProgram(W)}),b.isShaderMaterial&&pt.releaseShaderCache(b))}this.renderBufferDirect=function(b,I,W,V,B,lt){I===null&&(I=Nt);const yt=B.isMesh&&B.matrixWorld.determinant()<0,kt=ve(b,I,W,V,B);_t.setMaterial(V,yt);let Et=W.index,At=1;if(V.wireframe===!0){if(Et=Q.getWireframeAttribute(W),Et===void 0)return;At=2}const Ht=W.drawRange,Kt=W.attributes.position;let Me=Ht.start*At,Be=(Ht.start+Ht.count)*At;lt!==null&&(Me=Math.max(Me,lt.start*At),Be=Math.min(Be,(lt.start+lt.count)*At)),Et!==null?(Me=Math.max(Me,0),Be=Math.min(Be,Et.count)):Kt!=null&&(Me=Math.max(Me,0),Be=Math.min(Be,Kt.count));const he=Be-Me;if(he<0||he===1/0)return;Yt.setup(B,V,kt,W,Et);let hn,de=Xt;if(Et!==null&&(hn=tt.get(Et),de=Tt,de.setIndex(hn)),B.isMesh)V.wireframe===!0?(_t.setLineWidth(V.wireframeLinewidth*Vt()),de.setMode(H.LINES)):de.setMode(H.TRIANGLES);else if(B.isLine){let qt=V.linewidth;qt===void 0&&(qt=1),_t.setLineWidth(qt*Vt()),B.isLineSegments?de.setMode(H.LINES):B.isLineLoop?de.setMode(H.LINE_LOOP):de.setMode(H.LINE_STRIP)}else B.isPoints?de.setMode(H.POINTS):B.isSprite&&de.setMode(H.TRIANGLES);if(B.isBatchedMesh)de.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else if(B.isInstancedMesh)de.renderInstances(Me,he,B.count);else if(W.isInstancedBufferGeometry){const qt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,fl=Math.min(W.instanceCount,qt);de.renderInstances(Me,he,fl)}else de.render(Me,he)};function re(b,I,W){b.transparent===!0&&b.side===di&&b.forceSinglePass===!1?(b.side=Tn,b.needsUpdate=!0,_e(b,I,W),b.side=sr,b.needsUpdate=!0,_e(b,I,W),b.side=di):_e(b,I,W)}this.compile=function(b,I,W=null){W===null&&(W=b),p=wt.get(W),p.init(),M.push(p),W.traverseVisible(function(B){B.isLight&&B.layers.test(I.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),b!==W&&b.traverseVisible(function(B){B.isLight&&B.layers.test(I.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights(v._useLegacyLights);const V=new Set;return b.traverse(function(B){const lt=B.material;if(lt)if(Array.isArray(lt))for(let yt=0;yt<lt.length;yt++){const kt=lt[yt];re(kt,W,B),V.add(kt)}else re(lt,W,B),V.add(lt)}),M.pop(),p=null,V},this.compileAsync=function(b,I,W=null){const V=this.compile(b,I,W);return new Promise(B=>{function lt(){if(V.forEach(function(yt){Bt.get(yt).currentProgram.isReady()&&V.delete(yt)}),V.size===0){B(b);return}setTimeout(lt,10)}mt.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let ae=null;function bt(b){ae&&ae(b)}function St(){it.stop()}function Rt(){it.start()}const it=new yd;it.setAnimationLoop(bt),typeof self<"u"&&it.setContext(self),this.setAnimationLoop=function(b){ae=b,ft.setAnimationLoop(b),b===null?it.stop():it.start()},ft.addEventListener("sessionstart",St),ft.addEventListener("sessionend",Rt),this.render=function(b,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),ft.enabled===!0&&ft.isPresenting===!0&&(ft.cameraAutoUpdate===!0&&ft.updateCamera(I),I=ft.getCamera()),b.isScene===!0&&b.onBeforeRender(v,b,I,E),p=wt.get(b,M.length),p.init(),M.push(p),dt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),q.setFromProjectionMatrix(dt),st=this.localClippingEnabled,Z=Gt.init(this.clippingPlanes,st),g=ct.get(b,m.length),g.init(),m.push(g),zt(b,I,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(Y,$),this.info.render.frame++,Z===!0&&Gt.beginShadows();const W=p.state.shadowsArray;if(j.render(W,b,I),Z===!0&&Gt.endShadows(),this.info.autoReset===!0&&this.info.reset(),oe.render(g,b),p.setupLights(v._useLegacyLights),I.isArrayCamera){const V=I.cameras;for(let B=0,lt=V.length;B<lt;B++){const yt=V[B];It(g,b,yt,yt.viewport)}}else It(g,b,I);E!==null&&(C.updateMultisampleRenderTarget(E),C.updateRenderTargetMipmap(E)),b.isScene===!0&&b.onAfterRender(v,b,I),Yt.resetDefaultState(),D=-1,S=null,M.pop(),M.length>0?p=M[M.length-1]:p=null,m.pop(),m.length>0?g=m[m.length-1]:g=null};function zt(b,I,W,V){if(b.visible===!1)return;if(b.layers.test(I.layers)){if(b.isGroup)W=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(I);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||q.intersectsSprite(b)){V&&Lt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(dt);const yt=et.update(b),kt=b.material;kt.visible&&g.push(b,yt,kt,W,Lt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||q.intersectsObject(b))){const yt=et.update(b),kt=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Lt.copy(b.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),Lt.copy(yt.boundingSphere.center)),Lt.applyMatrix4(b.matrixWorld).applyMatrix4(dt)),Array.isArray(kt)){const Et=yt.groups;for(let At=0,Ht=Et.length;At<Ht;At++){const Kt=Et[At],Me=kt[Kt.materialIndex];Me&&Me.visible&&g.push(b,yt,Me,W,Lt.z,Kt)}}else kt.visible&&g.push(b,yt,kt,W,Lt.z,null)}}const lt=b.children;for(let yt=0,kt=lt.length;yt<kt;yt++)zt(lt[yt],I,W,V)}function It(b,I,W,V){const B=b.opaque,lt=b.transmissive,yt=b.transparent;p.setupLightsView(W),Z===!0&&Gt.setGlobalState(v.clippingPlanes,W),lt.length>0&&$t(B,lt,I,W),V&&_t.viewport(y.copy(V)),B.length>0&&Te(B,I,W),lt.length>0&&Te(lt,I,W),yt.length>0&&Te(yt,I,W),_t.buffers.depth.setTest(!0),_t.buffers.depth.setMask(!0),_t.buffers.color.setMask(!0),_t.setPolygonOffset(!1)}function $t(b,I,W,V){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;const lt=Dt.isWebGL2;gt===null&&(gt=new ci(1,1,{generateMipmaps:!0,type:mt.has("EXT_color_buffer_half_float")?Di:er,minFilter:yo,samples:lt?4:0})),v.getDrawingBufferSize(Pt),lt?gt.setSize(Pt.x,Pt.y):gt.setSize(ka(Pt.x),ka(Pt.y));const yt=v.getRenderTarget();v.setRenderTarget(gt),v.getClearColor(K),L=v.getClearAlpha(),L<1&&v.setClearColor(16777215,.5),v.clear();const kt=v.toneMapping;v.toneMapping=tr,Te(b,W,V),C.updateMultisampleRenderTarget(gt),C.updateRenderTargetMipmap(gt);let Et=!1;for(let At=0,Ht=I.length;At<Ht;At++){const Kt=I[At],Me=Kt.object,Be=Kt.geometry,he=Kt.material,hn=Kt.group;if(he.side===di&&Me.layers.test(V.layers)){const de=he.side;he.side=Tn,he.needsUpdate=!0,te(Me,W,V,Be,he,hn),he.side=de,he.needsUpdate=!0,Et=!0}}Et===!0&&(C.updateMultisampleRenderTarget(gt),C.updateRenderTargetMipmap(gt)),v.setRenderTarget(yt),v.setClearColor(K,L),v.toneMapping=kt}function Te(b,I,W){const V=I.isScene===!0?I.overrideMaterial:null;for(let B=0,lt=b.length;B<lt;B++){const yt=b[B],kt=yt.object,Et=yt.geometry,At=V===null?yt.material:V,Ht=yt.group;kt.layers.test(W.layers)&&te(kt,I,W,Et,At,Ht)}}function te(b,I,W,V,B,lt){b.onBeforeRender(v,I,W,V,B,lt),b.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),B.onBeforeRender(v,I,W,V,b,lt),B.transparent===!0&&B.side===di&&B.forceSinglePass===!1?(B.side=Tn,B.needsUpdate=!0,v.renderBufferDirect(W,I,V,B,b,lt),B.side=sr,B.needsUpdate=!0,v.renderBufferDirect(W,I,V,B,b,lt),B.side=di):v.renderBufferDirect(W,I,V,B,b,lt),b.onAfterRender(v,I,W,V,B,lt)}function _e(b,I,W){I.isScene!==!0&&(I=Nt);const V=Bt.get(b),B=p.state.lights,lt=p.state.shadowsArray,yt=B.state.version,kt=pt.getParameters(b,B.state,lt,I,W),Et=pt.getProgramCacheKey(kt);let At=V.programs;V.environment=b.isMeshStandardMaterial?I.environment:null,V.fog=I.fog,V.envMap=(b.isMeshStandardMaterial?z:T).get(b.envMap||V.environment),At===void 0&&(b.addEventListener("dispose",at),At=new Map,V.programs=At);let Ht=At.get(Et);if(Ht!==void 0){if(V.currentProgram===Ht&&V.lightsStateVersion===yt)return xe(b,kt),Ht}else kt.uniforms=pt.getUniforms(b),b.onBuild(W,kt,v),b.onBeforeCompile(kt,v),Ht=pt.acquireProgram(kt,Et),At.set(Et,Ht),V.uniforms=kt.uniforms;const Kt=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Kt.clippingPlanes=Gt.uniform),xe(b,kt),V.needsLights=Ln(b),V.lightsStateVersion=yt,V.needsLights&&(Kt.ambientLightColor.value=B.state.ambient,Kt.lightProbe.value=B.state.probe,Kt.directionalLights.value=B.state.directional,Kt.directionalLightShadows.value=B.state.directionalShadow,Kt.spotLights.value=B.state.spot,Kt.spotLightShadows.value=B.state.spotShadow,Kt.rectAreaLights.value=B.state.rectArea,Kt.ltc_1.value=B.state.rectAreaLTC1,Kt.ltc_2.value=B.state.rectAreaLTC2,Kt.pointLights.value=B.state.point,Kt.pointLightShadows.value=B.state.pointShadow,Kt.hemisphereLights.value=B.state.hemi,Kt.directionalShadowMap.value=B.state.directionalShadowMap,Kt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Kt.spotShadowMap.value=B.state.spotShadowMap,Kt.spotLightMatrix.value=B.state.spotLightMatrix,Kt.spotLightMap.value=B.state.spotLightMap,Kt.pointShadowMap.value=B.state.pointShadowMap,Kt.pointShadowMatrix.value=B.state.pointShadowMatrix),V.currentProgram=Ht,V.uniformsList=null,Ht}function ze(b){if(b.uniformsList===null){const I=b.currentProgram.getUniforms();b.uniformsList=ba.seqWithValue(I.seq,b.uniforms)}return b.uniformsList}function xe(b,I){const W=Bt.get(b);W.outputColorSpace=I.outputColorSpace,W.batching=I.batching,W.instancing=I.instancing,W.instancingColor=I.instancingColor,W.skinning=I.skinning,W.morphTargets=I.morphTargets,W.morphNormals=I.morphNormals,W.morphColors=I.morphColors,W.morphTargetsCount=I.morphTargetsCount,W.numClippingPlanes=I.numClippingPlanes,W.numIntersection=I.numClipIntersection,W.vertexAlphas=I.vertexAlphas,W.vertexTangents=I.vertexTangents,W.toneMapping=I.toneMapping}function ve(b,I,W,V,B){I.isScene!==!0&&(I=Nt),C.resetTextureUnits();const lt=I.fog,yt=V.isMeshStandardMaterial?I.environment:null,kt=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Ni,Et=(V.isMeshStandardMaterial?z:T).get(V.envMap||yt),At=V.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ht=!!W.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Kt=!!W.morphAttributes.position,Me=!!W.morphAttributes.normal,Be=!!W.morphAttributes.color;let he=tr;V.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(he=v.toneMapping);const hn=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,de=hn!==void 0?hn.length:0,qt=Bt.get(V),fl=p.state.lights;if(Z===!0&&(st===!0||b!==S)){const Yn=b===S&&V.id===D;Gt.setState(V,b,Yn)}let Ce=!1;V.version===qt.__version?(qt.needsLights&&qt.lightsStateVersion!==fl.state.version||qt.outputColorSpace!==kt||B.isBatchedMesh&&qt.batching===!1||!B.isBatchedMesh&&qt.batching===!0||B.isInstancedMesh&&qt.instancing===!1||!B.isInstancedMesh&&qt.instancing===!0||B.isSkinnedMesh&&qt.skinning===!1||!B.isSkinnedMesh&&qt.skinning===!0||B.isInstancedMesh&&qt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&qt.instancingColor===!1&&B.instanceColor!==null||qt.envMap!==Et||V.fog===!0&&qt.fog!==lt||qt.numClippingPlanes!==void 0&&(qt.numClippingPlanes!==Gt.numPlanes||qt.numIntersection!==Gt.numIntersection)||qt.vertexAlphas!==At||qt.vertexTangents!==Ht||qt.morphTargets!==Kt||qt.morphNormals!==Me||qt.morphColors!==Be||qt.toneMapping!==he||Dt.isWebGL2===!0&&qt.morphTargetsCount!==de)&&(Ce=!0):(Ce=!0,qt.__version=V.version);let hr=qt.currentProgram;Ce===!0&&(hr=_e(V,I,B));let Uu=!1,Hs=!1,dl=!1;const tn=hr.getUniforms(),fr=qt.uniforms;if(_t.useProgram(hr.program)&&(Uu=!0,Hs=!0,dl=!0),V.id!==D&&(D=V.id,Hs=!0),Uu||S!==b){tn.setValue(H,"projectionMatrix",b.projectionMatrix),tn.setValue(H,"viewMatrix",b.matrixWorldInverse);const Yn=tn.map.cameraPosition;Yn!==void 0&&Yn.setValue(H,Lt.setFromMatrixPosition(b.matrixWorld)),Dt.logarithmicDepthBuffer&&tn.setValue(H,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&tn.setValue(H,"isOrthographic",b.isOrthographicCamera===!0),S!==b&&(S=b,Hs=!0,dl=!0)}if(B.isSkinnedMesh){tn.setOptional(H,B,"bindMatrix"),tn.setOptional(H,B,"bindMatrixInverse");const Yn=B.skeleton;Yn&&(Dt.floatVertexTextures?(Yn.boneTexture===null&&Yn.computeBoneTexture(),tn.setValue(H,"boneTexture",Yn.boneTexture,C)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}B.isBatchedMesh&&(tn.setOptional(H,B,"batchingTexture"),tn.setValue(H,"batchingTexture",B._matricesTexture,C));const pl=W.morphAttributes;if((pl.position!==void 0||pl.normal!==void 0||pl.color!==void 0&&Dt.isWebGL2===!0)&&Ct.update(B,W,hr),(Hs||qt.receiveShadow!==B.receiveShadow)&&(qt.receiveShadow=B.receiveShadow,tn.setValue(H,"receiveShadow",B.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(fr.envMap.value=Et,fr.flipEnvMap.value=Et.isCubeTexture&&Et.isRenderTargetTexture===!1?-1:1),Hs&&(tn.setValue(H,"toneMappingExposure",v.toneMappingExposure),qt.needsLights&&ue(fr,dl),lt&&V.fog===!0&&ut.refreshFogUniforms(fr,lt),ut.refreshMaterialUniforms(fr,V,X,k,gt),ba.upload(H,ze(qt),fr,C)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(ba.upload(H,ze(qt),fr,C),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&tn.setValue(H,"center",B.center),tn.setValue(H,"modelViewMatrix",B.modelViewMatrix),tn.setValue(H,"normalMatrix",B.normalMatrix),tn.setValue(H,"modelMatrix",B.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Yn=V.uniformsGroups;for(let ml=0,cm=Yn.length;ml<cm;ml++)if(Dt.isWebGL2){const Nu=Yn[ml];Qt.update(Nu,hr),Qt.bind(Nu,hr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return hr}function ue(b,I){b.ambientLightColor.needsUpdate=I,b.lightProbe.needsUpdate=I,b.directionalLights.needsUpdate=I,b.directionalLightShadows.needsUpdate=I,b.pointLights.needsUpdate=I,b.pointLightShadows.needsUpdate=I,b.spotLights.needsUpdate=I,b.spotLightShadows.needsUpdate=I,b.rectAreaLights.needsUpdate=I,b.hemisphereLights.needsUpdate=I}function Ln(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(b,I,W){Bt.get(b.texture).__webglTexture=I,Bt.get(b.depthTexture).__webglTexture=W;const V=Bt.get(b);V.__hasExternalTextures=!0,V.__hasExternalTextures&&(V.__autoAllocateDepthBuffer=W===void 0,V.__autoAllocateDepthBuffer||mt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,I){const W=Bt.get(b);W.__webglFramebuffer=I,W.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(b,I=0,W=0){E=b,A=I,w=W;let V=!0,B=null,lt=!1,yt=!1;if(b){const Et=Bt.get(b);Et.__useDefaultFramebuffer!==void 0?(_t.bindFramebuffer(H.FRAMEBUFFER,null),V=!1):Et.__webglFramebuffer===void 0?C.setupRenderTarget(b):Et.__hasExternalTextures&&C.rebindTextures(b,Bt.get(b.texture).__webglTexture,Bt.get(b.depthTexture).__webglTexture);const At=b.texture;(At.isData3DTexture||At.isDataArrayTexture||At.isCompressedArrayTexture)&&(yt=!0);const Ht=Bt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ht[I])?B=Ht[I][W]:B=Ht[I],lt=!0):Dt.isWebGL2&&b.samples>0&&C.useMultisampledRTT(b)===!1?B=Bt.get(b).__webglMultisampledFramebuffer:Array.isArray(Ht)?B=Ht[W]:B=Ht,y.copy(b.viewport),F.copy(b.scissor),N=b.scissorTest}else y.copy(R).multiplyScalar(X).floor(),F.copy(J).multiplyScalar(X).floor(),N=nt;if(_t.bindFramebuffer(H.FRAMEBUFFER,B)&&Dt.drawBuffers&&V&&_t.drawBuffers(b,B),_t.viewport(y),_t.scissor(F),_t.setScissorTest(N),lt){const Et=Bt.get(b.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+I,Et.__webglTexture,W)}else if(yt){const Et=Bt.get(b.texture),At=I||0;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,Et.__webglTexture,W||0,At)}D=-1},this.readRenderTargetPixels=function(b,I,W,V,B,lt,yt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=Bt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&yt!==void 0&&(kt=kt[yt]),kt){_t.bindFramebuffer(H.FRAMEBUFFER,kt);try{const Et=b.texture,At=Et.format,Ht=Et.type;if(At!==li&&vt.convert(At)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Kt=Ht===Di&&(mt.has("EXT_color_buffer_half_float")||Dt.isWebGL2&&mt.has("EXT_color_buffer_float"));if(Ht!==er&&vt.convert(Ht)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ht===qi&&(Dt.isWebGL2||mt.has("OES_texture_float")||mt.has("WEBGL_color_buffer_float")))&&!Kt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=b.width-V&&W>=0&&W<=b.height-B&&H.readPixels(I,W,V,B,vt.convert(At),vt.convert(Ht),lt)}finally{const Et=E!==null?Bt.get(E).__webglFramebuffer:null;_t.bindFramebuffer(H.FRAMEBUFFER,Et)}}},this.copyFramebufferToTexture=function(b,I,W=0){const V=Math.pow(2,-W),B=Math.floor(I.image.width*V),lt=Math.floor(I.image.height*V);C.setTexture2D(I,0),H.copyTexSubImage2D(H.TEXTURE_2D,W,0,0,b.x,b.y,B,lt),_t.unbindTexture()},this.copyTextureToTexture=function(b,I,W,V=0){const B=I.image.width,lt=I.image.height,yt=vt.convert(W.format),kt=vt.convert(W.type);C.setTexture2D(W,0),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,W.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,W.unpackAlignment),I.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,V,b.x,b.y,B,lt,yt,kt,I.image.data):I.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,V,b.x,b.y,I.mipmaps[0].width,I.mipmaps[0].height,yt,I.mipmaps[0].data):H.texSubImage2D(H.TEXTURE_2D,V,b.x,b.y,yt,kt,I.image),V===0&&W.generateMipmaps&&H.generateMipmap(H.TEXTURE_2D),_t.unbindTexture()},this.copyTextureToTexture3D=function(b,I,W,V,B=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const lt=b.max.x-b.min.x+1,yt=b.max.y-b.min.y+1,kt=b.max.z-b.min.z+1,Et=vt.convert(V.format),At=vt.convert(V.type);let Ht;if(V.isData3DTexture)C.setTexture3D(V,0),Ht=H.TEXTURE_3D;else if(V.isDataArrayTexture||V.isCompressedArrayTexture)C.setTexture2DArray(V,0),Ht=H.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,V.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,V.unpackAlignment);const Kt=H.getParameter(H.UNPACK_ROW_LENGTH),Me=H.getParameter(H.UNPACK_IMAGE_HEIGHT),Be=H.getParameter(H.UNPACK_SKIP_PIXELS),he=H.getParameter(H.UNPACK_SKIP_ROWS),hn=H.getParameter(H.UNPACK_SKIP_IMAGES),de=W.isCompressedTexture?W.mipmaps[B]:W.image;H.pixelStorei(H.UNPACK_ROW_LENGTH,de.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,de.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,b.min.x),H.pixelStorei(H.UNPACK_SKIP_ROWS,b.min.y),H.pixelStorei(H.UNPACK_SKIP_IMAGES,b.min.z),W.isDataTexture||W.isData3DTexture?H.texSubImage3D(Ht,B,I.x,I.y,I.z,lt,yt,kt,Et,At,de.data):W.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),H.compressedTexSubImage3D(Ht,B,I.x,I.y,I.z,lt,yt,kt,Et,de.data)):H.texSubImage3D(Ht,B,I.x,I.y,I.z,lt,yt,kt,Et,At,de),H.pixelStorei(H.UNPACK_ROW_LENGTH,Kt),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Me),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Be),H.pixelStorei(H.UNPACK_SKIP_ROWS,he),H.pixelStorei(H.UNPACK_SKIP_IMAGES,hn),B===0&&V.generateMipmaps&&H.generateMipmap(Ht),_t.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?C.setTextureCube(b,0):b.isData3DTexture?C.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?C.setTexture2DArray(b,0):C.setTexture2D(b,0),_t.unbindTexture()},this.resetState=function(){A=0,w=0,E=null,_t.reset(),Yt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===qc?"display-p3":"srgb",e.unpackColorSpace=pe.workingColorSpace===nl?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ke?Pr:ad}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Pr?Ke:Ni}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class wS extends Rd{}wS.prototype.isWebGL1Renderer=!0;class jc{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ot(t),this.density=e}clone(){return new jc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class AS extends qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class Pd extends Bs{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ot(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const tf=new Pe,Sc=new pd,ca=new il,ua=new P;class Ld extends qe{constructor(t=new Mn,e=new Pd){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ca.copy(n.boundingSphere),ca.applyMatrix4(i),ca.radius+=s,t.ray.intersectsSphere(ca)===!1)return;tf.copy(i).invert(),Sc.copy(t.ray).applyMatrix4(tf);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let _=f,g=d;_<g;_++){const p=c.getX(_);ua.fromBufferAttribute(h,p),ef(ua,p,l,i,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let _=f,g=d;_<g;_++)ua.fromBufferAttribute(h,_),ef(ua,_,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ef(r,t,e,n,i,s,o){const a=Sc.distanceSqToPoint(r);if(a<e){const l=new P;Sc.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,object:o})}}class Qc extends bn{constructor(t,e,n,i,s,o,a,l,c){super(t,e,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class zi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const u=n[i],f=n[i+1]-u,d=(o-u)/f;return(i+d)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),l=e||(o.isVector2?new xt:new P);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new P,i=[],s=[],o=[],a=new P,l=new Pe;for(let d=0;d<=t;d++){const _=d/t;i[d]=this.getTangentAt(_,new P)}s[0]=new P,o[0]=new P;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const _=Math.acos(Ze(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,_))}o[d].crossVectors(i[d],s[d])}if(e===!0){let d=Math.acos(Ze(s[0].dot(s[t]),-1,1));d/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(d=-d);for(let _=1;_<=t;_++)s[_].applyMatrix4(l.makeRotationAxis(i[_],d*_)),o[_].crossVectors(i[_],s[_])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Dd extends zi{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e){const n=e||new xt,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class CS extends Dd{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function tu(){let r=0,t=0,e=0,n=0;function i(s,o,a,l){r=s,t=a,e=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){i(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,h){let f=(o-s)/c-(a-s)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,d*=u,i(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return r+t*s+e*o+n*a}}}const ha=new P,Xl=new tu,Yl=new tu,ql=new tu;class Va extends zi{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new P){const n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=i[(a-1)%s]:(ha.subVectors(i[0],i[1]).add(i[0]),c=ha);const h=i[a%s],f=i[(a+1)%s];if(this.closed||a+2<s?u=i[(a+2)%s]:(ha.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=ha),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(h),d),g=Math.pow(h.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(u),d);g<1e-4&&(g=1),_<1e-4&&(_=g),p<1e-4&&(p=g),Xl.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,_,g,p),Yl.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,_,g,p),ql.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,_,g,p)}else this.curveType==="catmullrom"&&(Xl.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),Yl.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),ql.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return n.set(Xl.calc(l),Yl.calc(l),ql.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new P().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function nf(r,t,e,n,i){const s=(n-t)*.5,o=(i-e)*.5,a=r*r,l=r*a;return(2*e-2*n+s+o)*l+(-3*e+3*n-2*s-o)*a+s*r+e}function RS(r,t){const e=1-r;return e*e*t}function PS(r,t){return 2*(1-r)*r*t}function LS(r,t){return r*r*t}function oo(r,t,e,n){return RS(r,t)+PS(r,e)+LS(r,n)}function DS(r,t){const e=1-r;return e*e*e*t}function US(r,t){const e=1-r;return 3*e*e*r*t}function NS(r,t){return 3*(1-r)*r*r*t}function IS(r,t){return r*r*r*t}function ao(r,t,e,n,i){return DS(r,t)+US(r,e)+NS(r,n)+IS(r,i)}class OS extends zi{constructor(t=new xt,e=new xt,n=new xt,i=new xt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new xt){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(ao(t,i.x,s.x,o.x,a.x),ao(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class FS extends zi{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(ao(t,i.x,s.x,o.x,a.x),ao(t,i.y,s.y,o.y,a.y),ao(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class zS extends zi{constructor(t=new xt,e=new xt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new xt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new xt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class BS extends zi{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class kS extends zi{constructor(t=new xt,e=new xt,n=new xt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new xt){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(oo(t,i.x,s.x,o.x),oo(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ud extends zi{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(oo(t,i.x,s.x,o.x),oo(t,i.y,s.y,o.y),oo(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class HS extends zi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new xt){const n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,l=i[o===0?o:o-1],c=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(nf(a,l.x,c.x,u.x,h.x),nf(a,l.y,c.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new xt().fromArray(i))}return this}}var GS=Object.freeze({__proto__:null,ArcCurve:CS,CatmullRomCurve3:Va,CubicBezierCurve:OS,CubicBezierCurve3:FS,EllipseCurve:Dd,LineCurve:zS,LineCurve3:BS,QuadraticBezierCurve:kS,QuadraticBezierCurve3:Ud,SplineCurve:HS});class ol extends Mn{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const u=[],h=[],f=[],d=[];let _=0;const g=[],p=n/2;let m=0;M(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new Ne(h,3)),this.setAttribute("normal",new Ne(f,3)),this.setAttribute("uv",new Ne(d,2));function M(){const x=new P,A=new P;let w=0;const E=(e-t)/n;for(let D=0;D<=s;D++){const S=[],y=D/s,F=y*(e-t)+t;for(let N=0;N<=i;N++){const K=N/i,L=K*l+a,O=Math.sin(L),k=Math.cos(L);A.x=F*O,A.y=-y*n+p,A.z=F*k,h.push(A.x,A.y,A.z),x.set(O,E,k).normalize(),f.push(x.x,x.y,x.z),d.push(K,1-y),S.push(_++)}g.push(S)}for(let D=0;D<i;D++)for(let S=0;S<s;S++){const y=g[S][D],F=g[S+1][D],N=g[S+1][D+1],K=g[S][D+1];u.push(y,F,K),u.push(F,N,K),w+=6}c.addGroup(m,w,0),m+=w}function v(x){const A=_,w=new xt,E=new P;let D=0;const S=x===!0?t:e,y=x===!0?1:-1;for(let N=1;N<=i;N++)h.push(0,p*y,0),f.push(0,y,0),d.push(.5,.5),_++;const F=_;for(let N=0;N<=i;N++){const L=N/i*l+a,O=Math.cos(L),k=Math.sin(L);E.x=S*k,E.y=p*y,E.z=S*O,h.push(E.x,E.y,E.z),f.push(0,y,0),w.x=O*.5+.5,w.y=k*.5*y+.5,d.push(w.x,w.y),_++}for(let N=0;N<i;N++){const K=A+N,L=F+N;x===!0?u.push(L,L+1,K):u.push(L+1,L,K),D+=3}c.addGroup(m,D,x===!0?1:2),m+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ol(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class eu extends ol{constructor(t=1,e=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new eu(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class al extends Mn{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],o=[];a(i),c(n),u(),this.setAttribute("position",new Ne(s,3)),this.setAttribute("normal",new Ne(s.slice(),3)),this.setAttribute("uv",new Ne(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const v=new P,x=new P,A=new P;for(let w=0;w<e.length;w+=3)d(e[w+0],v),d(e[w+1],x),d(e[w+2],A),l(v,x,A,M)}function l(M,v,x,A){const w=A+1,E=[];for(let D=0;D<=w;D++){E[D]=[];const S=M.clone().lerp(x,D/w),y=v.clone().lerp(x,D/w),F=w-D;for(let N=0;N<=F;N++)N===0&&D===w?E[D][N]=S:E[D][N]=S.clone().lerp(y,N/F)}for(let D=0;D<w;D++)for(let S=0;S<2*(w-D)-1;S++){const y=Math.floor(S/2);S%2===0?(f(E[D][y+1]),f(E[D+1][y]),f(E[D][y])):(f(E[D][y+1]),f(E[D+1][y+1]),f(E[D+1][y]))}}function c(M){const v=new P;for(let x=0;x<s.length;x+=3)v.x=s[x+0],v.y=s[x+1],v.z=s[x+2],v.normalize().multiplyScalar(M),s[x+0]=v.x,s[x+1]=v.y,s[x+2]=v.z}function u(){const M=new P;for(let v=0;v<s.length;v+=3){M.x=s[v+0],M.y=s[v+1],M.z=s[v+2];const x=p(M)/2/Math.PI+.5,A=m(M)/Math.PI+.5;o.push(x,1-A)}_(),h()}function h(){for(let M=0;M<o.length;M+=6){const v=o[M+0],x=o[M+2],A=o[M+4],w=Math.max(v,x,A),E=Math.min(v,x,A);w>.9&&E<.1&&(v<.2&&(o[M+0]+=1),x<.2&&(o[M+2]+=1),A<.2&&(o[M+4]+=1))}}function f(M){s.push(M.x,M.y,M.z)}function d(M,v){const x=M*3;v.x=t[x+0],v.y=t[x+1],v.z=t[x+2]}function _(){const M=new P,v=new P,x=new P,A=new P,w=new xt,E=new xt,D=new xt;for(let S=0,y=0;S<s.length;S+=9,y+=6){M.set(s[S+0],s[S+1],s[S+2]),v.set(s[S+3],s[S+4],s[S+5]),x.set(s[S+6],s[S+7],s[S+8]),w.set(o[y+0],o[y+1]),E.set(o[y+2],o[y+3]),D.set(o[y+4],o[y+5]),A.copy(M).add(v).add(x).divideScalar(3);const F=p(A);g(w,y+0,M,F),g(E,y+2,v,F),g(D,y+4,x,F)}}function g(M,v,x,A){A<0&&M.x===1&&(o[v]=M.x-1),x.x===0&&x.z===0&&(o[v]=A/2/Math.PI+.5)}function p(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new al(t.vertices,t.indices,t.radius,t.details)}}class nu extends al{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new nu(t.radius,t.detail)}}class iu extends al{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new iu(t.radius,t.detail)}}class ru extends Mn{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],u=new P,h=new P,f=new P;for(let d=0;d<=n;d++)for(let _=0;_<=i;_++){const g=_/i*s,p=d/n*Math.PI*2;h.x=(t+e*Math.cos(p))*Math.cos(g),h.y=(t+e*Math.cos(p))*Math.sin(g),h.z=e*Math.sin(p),a.push(h.x,h.y,h.z),u.x=t*Math.cos(g),u.y=t*Math.sin(g),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(_/i),c.push(d/n)}for(let d=1;d<=n;d++)for(let _=1;_<=i;_++){const g=(i+1)*d+_-1,p=(i+1)*(d-1)+_-1,m=(i+1)*(d-1)+_,M=(i+1)*d+_;o.push(g,p,M),o.push(p,m,M)}this.setIndex(o),this.setAttribute("position",new Ne(a,3)),this.setAttribute("normal",new Ne(l,3)),this.setAttribute("uv",new Ne(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ru(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class su extends Mn{constructor(t=new Ud(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:s};const o=t.computeFrenetFrames(e,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new P,l=new P,c=new xt;let u=new P;const h=[],f=[],d=[],_=[];g(),this.setIndex(_),this.setAttribute("position",new Ne(h,3)),this.setAttribute("normal",new Ne(f,3)),this.setAttribute("uv",new Ne(d,2));function g(){for(let v=0;v<e;v++)p(v);p(s===!1?e:0),M(),m()}function p(v){u=t.getPointAt(v/e,u);const x=o.normals[v],A=o.binormals[v];for(let w=0;w<=i;w++){const E=w/i*Math.PI*2,D=Math.sin(E),S=-Math.cos(E);l.x=S*x.x+D*A.x,l.y=S*x.y+D*A.y,l.z=S*x.z+D*A.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=u.x+n*l.x,a.y=u.y+n*l.y,a.z=u.z+n*l.z,h.push(a.x,a.y,a.z)}}function m(){for(let v=1;v<=e;v++)for(let x=1;x<=i;x++){const A=(i+1)*(v-1)+(x-1),w=(i+1)*v+(x-1),E=(i+1)*v+x,D=(i+1)*(v-1)+x;_.push(A,w,D),_.push(w,E,D)}}function M(){for(let v=0;v<=e;v++)for(let x=0;x<=i;x++)c.x=v/e,c.y=x/i,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new su(new GS[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class zr extends Bs{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ld,this.normalScale=new xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ou extends qe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ot(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class VS extends ou{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(qe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ot(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const $l=new Pe,rf=new P,sf=new P;class Nd{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xt(512,512),this.map=null,this.mapPass=null,this.matrix=new Pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Kc,this._frameExtents=new xt(1,1),this._viewportCount=1,this._viewports=[new ye(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;rf.setFromMatrixPosition(t.matrixWorld),e.position.copy(rf),sf.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(sf),e.updateMatrixWorld(),$l.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix($l),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply($l)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const of=new Pe,Ys=new P,Kl=new P;class WS extends Nd{constructor(){super(new Fn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new xt(4,2),this._viewportCount=6,this._viewports=[new ye(2,1,1,1),new ye(0,1,1,1),new ye(3,1,1,1),new ye(1,1,1,1),new ye(3,0,1,1),new ye(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ys.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ys),Kl.copy(n.position),Kl.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Kl),n.updateMatrixWorld(),i.makeTranslation(-Ys.x,-Ys.y,-Ys.z),of.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(of)}}class XS extends ou{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new WS}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class YS extends Nd{constructor(){super(new Zc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class af extends ou{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(qe.DEFAULT_UP),this.updateMatrix(),this.target=new qe,this.shadow=new YS}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Id{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=lf(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=lf();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function lf(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xc);class qS{constructor(){const t=[new P(0,42,130),new P(12,28,90),new P(22,6,35),new P(0,9,-15),new P(-18,11,-75),new P(10,35,-135),new P(25,62,-195),new P(0,24,-280),new P(0,12,-370),new P(0,4,-455)],e=[new P(0,20,20),new P(5,12,10),new P(2,3,-40),new P(-5,8,-60),new P(0,10,-120),new P(5,30,-180),new P(0,50,-250),new P(0,24,-330),new P(0,12,-420),new P(0,4,-500)];this.positionCurve=new Va(t,!1,"catmullrom",.5),this.targetCurve=new Va(e,!1,"catmullrom",.5),this.currentPosition=new P,this.currentTarget=new P,this.interpolatedTarget=new P,this.positionCurve.getPointAt(0,this.currentPosition),this.targetCurve.getPointAt(0,this.currentTarget),this.interpolatedTarget.copy(this.currentTarget)}update(t,e,n={x:0,y:0}){const i=vc.clamp(e,0,1);this.positionCurve.getPointAt(i,this.currentPosition),this.targetCurve.getPointAt(i,this.currentTarget);const s=this.currentPosition.clone();s.x+=n.x*2.5,s.y+=n.y*1.8,t.position.copy(s),this.interpolatedTarget.lerp(this.currentTarget,.08);const o=this.interpolatedTarget.clone();o.x+=n.x*1.5,o.y+=n.y*1.2,t.lookAt(o);const l=-this.positionCurve.getTangentAt(i).x*.35;t.rotation.z=vc.lerp(t.rotation.z,l,.05)}}class $S{constructor(t){this.scene=t,this.scene.background=new Ot("#0d081e"),this.scene.fog=new jc("#0d081e",.0035),this.initLights()}initLights(){this.hemiLight=new VS(14471414,854046,.75),this.scene.add(this.hemiLight),this.sunLight=new af(16103521,2.2),this.sunLight.position.set(60,80,50),this.scene.add(this.sunLight),this.fillLight=new af(8147605,.7),this.fillLight.position.set(-50,40,-40),this.scene.add(this.fillLight)}update(t){const e=[{p:0,color:new Ot("#0d081e"),fog:.0035},{p:.3,color:new Ot("#08212e"),fog:.003},{p:.55,color:new Ot("#1a0c2c"),fog:.0045},{p:.78,color:new Ot("#0e1828"),fog:.0035},{p:1,color:new Ot("#090514"),fog:.0028}];let n=e[0],i=e[1];for(let o=0;o<e.length-1;o++)if(t>=e[o].p&&t<=e[o+1].p){n=e[o],i=e[o+1];break}const s=(t-n.p)/(i.p-n.p||1);this.scene.background.copy(n.color).lerp(i.color,s),this.scene.fog&&(this.scene.fog.color.copy(this.scene.background),this.scene.fog.density=vc.lerp(n.fog,i.fog,s))}}const Od={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class zo{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const KS=new Zc(-1,1,1,-1,0,1);class ZS extends Mn{constructor(){super(),this.setAttribute("position",new Ne([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ne([0,2,0,0,2,0],2))}}const JS=new ZS;class Fd{constructor(t){this._mesh=new De(JS,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,KS)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class zd extends zo{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Je?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Ga.clone(t.uniforms),this.material=new Je({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Fd(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class cf extends zo{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const i=t.getContext(),s=t.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class jS extends zo{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class QS{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new xt);this._width=n.width,this._height=n.height,e=new ci(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Di}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new zd(Od),this.copyPass.material.blending=Li,this.clock=new Id}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}cf!==void 0&&(o instanceof cf?n=!0:o instanceof jS&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new xt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class tM extends zo{constructor(t,e,n=null,i=null,s=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ot}render(t,e,n){const i=t.autoClear;t.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor)),this.clearAlpha!==null&&(s=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=i}}const eM={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ot(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ps extends zo{constructor(t,e,n,i){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new xt(t.x,t.y):new xt(256,256),this.clearColor=new Ot(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new ci(s,o,{type:Di}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const f=new ci(s,o,{type:Di});f.texture.name="UnrealBloomPass.h"+h,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const d=new ci(s,o,{type:Di});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),s=Math.round(s/2),o=Math.round(o/2)}const a=eM;this.highPassUniforms=Ga.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Je({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new xt(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Od;this.copyUniforms=Ga.clone(u.uniforms),this.blendMaterial=new Je({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Mo,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Ot,this.oldClearAlpha=1,this.basic=new Oo,this.fsQuad=new Fd(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new xt(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,s){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),s&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ps.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ps.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Je({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new xt(.5,.5)},direction:{value:new xt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new Je({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Ps.BlurDirectionX=new xt(1,0);Ps.BlurDirectionY=new xt(0,1);const nM={uniforms:{tDiffuse:{value:null},uTime:{value:0},uGrainIntensity:{value:.045},uVignetteDarkness:{value:.95},uVignetteOffset:{value:.85}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uGrainIntensity;
    uniform float uVignetteDarkness;
    uniform float uVignetteOffset;

    varying vec2 vUv;

    // High quality pseudo-random generator
    float random(vec2 p) {
      vec2 k1 = vec2(
        23.14069263277926, // e^pi (Gelfond's constant)
        2.665144142690225 // 2^sqrt(2) (Gelfond-Schneider constant)
      );
      return fract(cos(dot(p, k1)) * 12345.6789);
    }

    void main() {
      vec4 baseColor = texture2D(tDiffuse, vUv);

      // Subtle 35mm film grain
      vec2 uvRandom = vUv + sin(uTime * 12.0) * 0.05;
      float grain = (random(uvRandom) - 0.5) * uGrainIntensity;

      // Vignette
      vec2 uv = (vUv - 0.5) * 2.0;
      float dist = length(uv);
      float vignette = smoothstep(uVignetteOffset, uVignetteOffset - 0.5, dist * 0.7);
      vignette = mix(1.0 - uVignetteDarkness * 0.45, 1.0, vignette);

      vec3 finalRgb = (baseColor.rgb + grain) * vignette;

      gl_FragColor = vec4(finalRgb, baseColor.a);
    }
  `};function Bd(){try{const r=document.createElement("canvas");return!!(window.WebGLRenderingContext&&(r.getContext("webgl")||r.getContext("experimental-webgl")))}catch{return!1}}function Bo(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768}function iM(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function uf(){return Bo()?1:Math.min(window.devicePixelRatio||1,1.75)}class rM{constructor(t,e,n,i,s){this.renderer=t,this.scene=e,this.camera=n,this.isMobile=Bo(),this.composer=new QS(t);const o=new tM(e,n);if(this.composer.addPass(o),!this.isMobile){const a=new Ps(new xt(i,s),.35,.65,.82);this.composer.addPass(a)}this.customPass=new zd(nM),this.composer.addPass(this.customPass)}setSize(t,e){this.composer.setSize(t,e)}render(t){this.customPass&&(this.customPass.uniforms.uTime.value=t),this.composer.render()}}function sM(r=[{stop:0,color:"#07111E"},{stop:.5,color:"#0F264A"},{stop:1,color:"#E8A856"}],t=512){const e=document.createElement("canvas");e.width=4,e.height=t;const n=e.getContext("2d"),i=n.createLinearGradient(0,t,0,0);r.forEach(o=>i.addColorStop(o.stop,o.color)),n.fillStyle=i,n.fillRect(0,0,4,t);const s=new Qc(e);return s.needsUpdate=!0,s}function oM(r=128){const t=document.createElement("canvas");t.width=r,t.height=r;const e=t.getContext("2d"),n=r/2,i=e.createRadialGradient(n,n,0,n,n,n);return i.addColorStop(0,"rgba(255, 255, 255, 1)"),i.addColorStop(.2,"rgba(255, 220, 130, 0.9)"),i.addColorStop(.5,"rgba(255, 140, 50, 0.4)"),i.addColorStop(.8,"rgba(255, 80, 20, 0.1)"),i.addColorStop(1,"rgba(0, 0, 0, 0)"),e.fillStyle=i,e.fillRect(0,0,r,r),new Qc(t)}class aM{constructor(t){this.scene=t,this.group=new mi,this.scene.add(this.group),this.initIslands(),this.initCloudLayers()}initIslands(){const t=new eu(18,55,7,6),e=t.attributes.position;for(let s=0;s<e.count;s++){const o=e.getY(s),a=Math.atan2(e.getZ(s),e.getX(s)),l=(Math.sin(a*4)+Math.cos(o*.4))*1.8;e.setX(s,e.getX(s)+l),e.setZ(s,e.getZ(s)+l)}t.computeVertexNormals();const n=new zr({color:1912360,roughness:.85,metalness:.1,flatShading:!0});[{x:0,y:-5,z:20,scale:1.2},{x:-35,y:-12,z:45,scale:.9},{x:38,y:-8,z:15,scale:1.1},{x:-25,y:-18,z:-10,scale:.7},{x:45,y:-15,z:65,scale:.85}].forEach(s=>{const o=new De(t,n);o.position.set(s.x,s.y,s.z),o.scale.setScalar(s.scale),o.rotation.y=Math.random()*Math.PI*2,this.group.add(o)})}initCloudLayers(){this.clouds=[];const t=new Ii(160,160);t.rotateX(-Math.PI/2);const e=sM([{stop:0,color:"rgba(255, 255, 255, 0.45)"},{stop:.6,color:"rgba(215, 230, 245, 0.18)"},{stop:1,color:"rgba(7, 17, 30, 0)"}]),n=new Oo({map:e,transparent:!0,opacity:.55,depthWrite:!1,blending:Qi});for(let i=0;i<4;i++){const s=new De(t,n);s.position.set(0,10+i*8,40-i*25),s.rotation.y=i*.8,this.group.add(s),this.clouds.push(s)}}update(t){this.clouds.forEach((e,n)=>{e.rotation.y+=3e-4*(n%2===0?1:-1),e.position.y+=Math.sin(t*.5+n)*.015})}}const lM=`uniform float uTime;
uniform vec2 uWaveFrequency;
uniform vec2 uWaveSpeed;
uniform float uWaveHeight;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying float vElevation;

// Gerstner Wave calculation
vec3 gerstnerWave(vec4 wave, vec3 p, inout vec3 tangent, inout vec3 binormal) {
  float steepness = wave.z;
  float wavelength = wave.w;
  float k = 2.0 * 3.14159265 / wavelength;
  float c = sqrt(9.8 / k);
  vec2 d = normalize(wave.xy);
  float f = k * (dot(d, p.xz) - c * uTime * 0.4);
  float a = steepness / k;

  tangent += vec3(
    -d.x * d.x * (steepness * sin(f)),
    d.x * (steepness * cos(f)),
    -d.x * d.y * (steepness * sin(f))
  );

  binormal += vec3(
    -d.x * d.y * (steepness * sin(f)),
    d.y * (steepness * cos(f)),
    -d.y * d.y * (steepness * sin(f))
  );

  return vec3(
    d.x * (a * cos(f)),
    a * sin(f),
    d.y * (a * cos(f))
  );
}

void main() {
  vUv = uv;
  vec3 gridPoint = position;
  vec3 tangent = vec3(1.0, 0.0, 0.0);
  vec3 binormal = vec3(0.0, 0.0, 1.0);
  vec3 p = gridPoint;

  // 3-octave Gerstner waves
  p += gerstnerWave(vec4(1.0, 0.4, 0.18, 24.0), gridPoint, tangent, binormal);
  p += gerstnerWave(vec4(0.3, 0.8, 0.12, 12.0), gridPoint, tangent, binormal);
  p += gerstnerWave(vec4(-0.5, 0.6, 0.08, 6.0), gridPoint, tangent, binormal);

  // Additional fine ripples
  float ripple = sin(gridPoint.x * 0.8 + uTime * 1.5) * cos(gridPoint.z * 0.8 + uTime * 1.2) * 0.12;
  p.y += ripple;

  vNormal = normalize(cross(binormal, tangent));
  vElevation = p.y;

  vec4 worldPosition = modelMatrix * vec4(p, 1.0);
  vWorldPosition = worldPosition.xyz;

  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`,cM=`uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform vec3 uSunColor;
uniform vec3 uSunPosition;
uniform vec3 uCameraPosition;
uniform float uFresnelBias;
uniform float uFresnelScale;
uniform float uFresnelPower;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying float vElevation;

void main() {
  vec3 viewDirection = normalize(uCameraPosition - vWorldPosition);
  vec3 normal = normalize(vNormal);

  // Fresnel effect (view angle reflectivity)
  float fresnel = uFresnelBias + uFresnelScale * pow(1.0 - max(0.0, dot(viewDirection, normal)), uFresnelPower);
  fresnel = clamp(fresnel, 0.0, 1.0);

  // Sun Specular Highlight
  vec3 sunDir = normalize(uSunPosition - vWorldPosition);
  vec3 halfVector = normalize(sunDir + viewDirection);
  float NdotH = max(0.0, dot(normal, halfVector));
  float specular = pow(NdotH, 64.0) * 1.5;

  // Base water color mix based on wave height
  float colorMix = smoothstep(-0.8, 1.2, vElevation);
  vec3 waterColor = mix(uDepthColor, uSurfaceColor, colorMix);

  // Add subtle foam at peaks
  float foam = smoothstep(0.7, 1.3, vElevation);
  waterColor = mix(waterColor, vec3(0.9, 0.95, 0.98), foam * 0.4);

  // Sky reflection / Sun glint
  vec3 finalColor = mix(waterColor, uSunColor, fresnel * 0.65) + uSunColor * specular;

  // Depth atmospheric attenuation
  float distanceToCamera = length(uCameraPosition - vWorldPosition);
  float fogFactor = smoothstep(100.0, 450.0, distanceToCamera);
  finalColor = mix(finalColor, vec3(0.03, 0.08, 0.16), fogFactor);

  gl_FragColor = vec4(finalColor, 0.92);
}
`;class uM{constructor(t){this.scene=t,this.group=new mi,this.scene.add(this.group),this.initWater(),this.initRiverBanks()}initWater(){const t=new Ii(350,350,128,128);t.rotateX(-Math.PI/2),this.waterMaterial=new Je({vertexShader:lM,fragmentShader:cM,transparent:!0,uniforms:{uTime:{value:0},uWaveFrequency:{value:new xt(.6,.4)},uWaveSpeed:{value:new xt(.35,.25)},uWaveHeight:{value:.8},uDepthColor:{value:new Ot("#02141a")},uSurfaceColor:{value:new Ot("#0c4342")},uSunColor:{value:new Ot("#f5b861")},uSunPosition:{value:new P(50,40,-100)},uCameraPosition:{value:new P},uFresnelBias:{value:.12},uFresnelScale:{value:.82},uFresnelPower:{value:3.2}}}),this.waterMesh=new De(t,this.waterMaterial),this.waterMesh.position.set(0,0,0),this.group.add(this.waterMesh)}initRiverBanks(){const t=new ol(8,14,40,9,6),e=t.attributes.position;for(let s=0;s<e.count;s++){const o=e.getY(s),a=Math.atan2(e.getZ(s),e.getX(s)),l=Math.sin(a*4)*1.8+Math.cos(o*.3)*1;e.setX(s,e.getX(s)+l),e.setZ(s,e.getZ(s)+l)}t.computeVertexNormals();const n=new zr({color:1453090,roughness:.9,metalness:.05,flatShading:!0});[{x:22,y:10,z:-10,s:1.1},{x:-32,y:8,z:10,s:.95},{x:38,y:11,z:-35,s:1.2},{x:-25,y:7,z:-45,s:.85},{x:10,y:9,z:-70,s:1.05}].forEach(s=>{const o=new De(t,n);o.position.set(s.x,s.y,s.z),o.scale.setScalar(s.s),o.rotation.y=Math.random()*Math.PI,this.group.add(o)})}update(t,e){this.waterMaterial&&(this.waterMaterial.uniforms.uTime.value=t,this.waterMaterial.uniforms.uCameraPosition.value.copy(e.position))}}const hM=`uniform float uTime;
uniform float uPixelRatio;

attribute float aScale;
attribute float aPhase;
attribute vec3 aColor;

varying vec3 vColor;
varying float vAlpha;

void main() {
  vColor = aColor;

  // Organic floating bobbing motion
  vec3 pos = position;
  float t = uTime * 0.8 + aPhase;
  pos.y += sin(t * 1.5) * 1.8;
  pos.x += cos(t * 0.7) * 0.9;
  pos.z += sin(t * 0.9) * 0.9;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Size attenuation with perspective
  float size = aScale * (180.0 / -mvPosition.z) * uPixelRatio;
  gl_PointSize = clamp(size, 4.0, 75.0);

  // Soft pulsation
  vAlpha = 0.65 + 0.35 * sin(t * 2.0);
}
`,fM=`uniform sampler2D uTexture;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord;
  // Circular falloff
  float dist = length(uv - vec2(0.5));
  if (dist > 0.5) discard;

  float glow = smoothstep(0.5, 0.05, dist);
  float core = smoothstep(0.18, 0.0, dist);

  vec3 col = vColor * glow + vec3(1.0, 0.95, 0.8) * core * 1.5;

  gl_FragColor = vec4(col, glow * vAlpha);
}
`;class dM{constructor(t){this.scene=t,this.group=new mi,this.group.position.set(0,0,-85),this.scene.add(this.group),this.initRiver(),this.initLanternParticles(),this.initFloatingLanterns(),this.initLighting()}initRiver(){const t=new Ii(180,200);t.rotateX(-Math.PI/2);const e=new zr({color:461590,roughness:.12,metalness:.85}),n=new De(t,e);n.position.set(0,-.2,0),this.group.add(n)}initLanternParticles(){const t=Bo()?650:2200,e=new Mn,n=new Float32Array(t*3),i=new Float32Array(t),s=new Float32Array(t),o=new Float32Array(t*3),a=[new Ot("#f5b861"),new Ot("#ff7e47"),new Ot("#ff6584"),new Ot("#ffd685")];for(let l=0;l<t;l++){const c=(Math.random()-.5)*80,u=Math.random()*30+.5,h=(Math.random()-.5)*120;n[l*3]=c,n[l*3+1]=u,n[l*3+2]=h,i[l]=Math.random()*.9+.3,s[l]=Math.random()*Math.PI*2;const f=a[Math.floor(Math.random()*a.length)];o[l*3]=f.r,o[l*3+1]=f.g,o[l*3+2]=f.b}e.setAttribute("position",new ln(n,3)),e.setAttribute("aScale",new ln(i,1)),e.setAttribute("aPhase",new ln(s,1)),e.setAttribute("aColor",new ln(o,3)),this.particleMaterial=new Je({vertexShader:hM,fragmentShader:fM,transparent:!0,depthWrite:!1,blending:Mo,uniforms:{uTime:{value:0},uPixelRatio:{value:Math.min(window.devicePixelRatio||1,1.75)}}}),this.particleSystem=new Ld(e,this.particleMaterial),this.group.add(this.particleSystem)}initFloatingLanterns(){this.lanternMeshes=[];const t=new iu(.9,0),e=[16744007,16103521,16732754,16742313];for(let n=0;n<28;n++){const i=e[n%e.length],s=new zr({color:i,emissive:i,emissiveIntensity:1.8,roughness:.3}),o=new De(t,s),a=(Math.random()-.5)*60,l=(Math.random()-.5)*100;o.position.set(a,.4,l),o.scale.set(1.2,.8,1.2),this.group.add(o),this.lanternMeshes.push({mesh:o,baseY:.4,speed:.08+Math.random()*.05,phase:Math.random()*Math.PI*2})}}initLighting(){this.ambientWarm=new XS(16751943,4.5,90),this.ambientWarm.position.set(0,12,0),this.group.add(this.ambientWarm)}update(t){this.particleMaterial&&(this.particleMaterial.uniforms.uTime.value=t),this.lanternMeshes.forEach(e=>{e.mesh.position.y=e.baseY+Math.sin(t*1.8+e.phase)*.12,e.mesh.rotation.y+=.008,e.mesh.position.z+=e.speed*.1,e.mesh.position.z>60&&(e.mesh.position.z=-60)})}}const pM=`varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`,mM=`uniform float uTime;
uniform vec3 uFogColor;
uniform float uDensity;
uniform vec3 uCameraPos;

varying vec2 vUv;
varying vec3 vWorldPosition;

// Simple 2D hash & noise for drifting cloud layers
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
             mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 4; ++i) {
    v += a * noise(p);
    p = rot * p * 2.0 + vec2(100.0);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 st = vUv * 6.0;
  float drift = uTime * 0.04;
  float n = fbm(st + vec2(drift, drift * 0.3));

  // Edge fading to prevent harsh intersection borders
  float edgeX = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x);
  float edgeY = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.75, vUv.y);
  float edgeFade = edgeX * edgeY;

  // Distance fade
  float dist = length(uCameraPos - vWorldPosition);
  float distFade = smoothstep(5.0, 25.0, dist) * smoothstep(400.0, 200.0, dist);

  float alpha = smoothstep(0.3, 0.8, n) * uDensity * edgeFade * distFade;

  gl_FragColor = vec4(uFogColor, alpha);
}
`;class gM{constructor(t){this.scene=t,this.group=new mi,this.group.position.set(0,0,-210),this.scene.add(this.group),this.initTerraces(),this.initVolumetricFog()}initTerraces(){const n=new Ii(160,160,100,100);n.rotateX(-Math.PI/2);const i=n.attributes.position,s=new Float32Array(i.count*3),o=new Ot("#173426"),a=new Ot("#d4a034"),l=new Ot("#4a3f35");for(let h=0;h<i.count;h++){const f=i.getX(h),d=i.getZ(h),_=Math.sqrt(f*f+d*d),g=40*Math.exp(-_*.016)+Math.sin(f*.07)*3.5+Math.cos(d*.07)*3.5,p=2.2,m=Math.floor(g/p)*p+Math.pow(c(g/p),3)*.35;i.setY(h,m);const M=(Math.sin(m*.75)+1)*.5,v=M>.45?a.clone().lerp(o,M*.7):l;s[h*3]=v.r,s[h*3+1]=v.g,s[h*3+2]=v.b}function c(h){return h-Math.floor(h)}n.setAttribute("color",new ln(s,3)),n.computeVertexNormals();const u=new zr({vertexColors:!0,roughness:.85,metalness:.1,flatShading:!0});this.terraceMesh=new De(n,u),this.terraceMesh.position.set(0,5,0),this.group.add(this.terraceMesh)}initVolumetricFog(){this.fogPlanes=[];const t=new Ii(150,150);t.rotateX(-Math.PI/2),this.fogMaterial=new Je({vertexShader:pM,fragmentShader:mM,transparent:!0,depthWrite:!1,blending:Qi,uniforms:{uTime:{value:0},uFogColor:{value:new Ot("#dcd4ec")},uDensity:{value:.52},uCameraPos:{value:new P}}});for(let e=0;e<3;e++){const n=new De(t,this.fogMaterial);n.position.set(0,16+e*10,0),n.rotation.y=e*.9,this.group.add(n),this.fogPlanes.push(n)}}update(t,e){this.fogMaterial&&(this.fogMaterial.uniforms.uTime.value=t,this.fogMaterial.uniforms.uCameraPos.value.copy(e.position)),this.fogPlanes.forEach((n,i)=>{n.rotation.y+=4e-4*(i%2===0?1:-1),n.position.y+=Math.sin(t*.4+i)*.02})}}const _M=`uniform float uVelocity;
uniform vec2 uHoverOffset;

varying vec2 vUv;
varying vec3 vNormal;
varying float vCurve;

void main() {
  vUv = uv;
  vec3 p = position;

  // Curvature based on distance from center and scroll velocity
  vec2 centered = uv - 0.5;
  float dist = length(centered);
  float curveFactor = -uVelocity * 0.0035;
  p.z += sin(dist * 3.14159) * curveFactor * 15.0;

  // Slight tilt based on hover
  p.z += (centered.x * uHoverOffset.x + centered.y * uHoverOffset.y) * 2.5;

  vCurve = curveFactor;
  vNormal = normal;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`,vM=`uniform sampler2D uTexture;
uniform float uVelocity;
uniform float uHover;

varying vec2 vUv;
varying float vCurve;

void main() {
  // Chromatic aberration (RGB Split) proportional to scroll velocity
  float shift = clamp(abs(uVelocity) * 0.0008, 0.0, 0.035);

  vec2 uvR = vUv + vec2(shift, 0.0);
  vec2 uvG = vUv;
  vec2 uvB = vUv - vec2(shift, 0.0);

  float r = texture2D(uTexture, uvR).r;
  float g = texture2D(uTexture, uvG).g;
  float b = texture2D(uTexture, uvB).b;

  vec3 color = vec3(r, g, b);

  // Subtle contrast and hover warmth
  color += vec3(0.04, 0.02, 0.0) * uHover;

  // Dark border vignette on the 3D card
  vec2 uvEdge = abs(vUv - 0.5) * 2.0;
  float edge = max(uvEdge.x, uvEdge.y);
  float borderFade = 1.0 - smoothstep(0.92, 1.0, edge) * 0.4;

  gl_FragColor = vec4(color * borderFade, 1.0);
}
`;class xM{constructor(t){this.scene=t,this.group=new mi,this.group.position.set(0,20,-320),this.scene.add(this.group),this.cards=[],this.initCards()}createCardTexture(t,e,n,i){const s=document.createElement("canvas");s.width=1024,s.height=1360;const o=s.getContext("2d"),a=o.createLinearGradient(0,0,0,s.height);a.addColorStop(0,"#150a2b"),a.addColorStop(.5,"#0d071c"),a.addColorStop(1,"#05020a"),o.fillStyle=a,o.fillRect(0,0,s.width,s.height);const l=o.createRadialGradient(s.width*.5,s.height*.4,40,s.width*.5,s.height*.4,450);l.addColorStop(0,i),l.addColorStop(.6,"rgba(21, 10, 43, 0.2)"),l.addColorStop(1,"rgba(0, 0, 0, 0)"),o.fillStyle=l,o.fillRect(0,0,s.width,s.height),o.strokeStyle="rgba(245, 184, 97, 0.4)",o.lineWidth=3,o.strokeRect(50,50,s.width-100,s.height-100),o.fillStyle="#f5b861",o.font='600 28px "Cinzel", "Playfair Display", serif',o.letterSpacing="6px",o.fillText("HUEGO — DI SẢN SỐ CỐ ĐÔ",90,130),o.fillStyle="rgba(247, 243, 236, 0.7)",o.font="400 32px sans-serif",o.fillText(n,90,s.height-240),o.fillStyle="#f7f3ec",o.font='bold 64px "Playfair Display", Georgia, serif',o.fillText(t,90,s.height-150),o.fillStyle="#e5a952",o.font="italic 34px serif",o.fillText(e,90,s.height-95);const c=new Qc(s);return c.needsUpdate=!0,c}initCards(){const t=[{title:"VR Hoàng Thành 3D",subtitle:"Tái hiện Tử Cấm Thành vàng son",location:"ĐẠI NỘI HUẾ // 16.47° N",color:"rgba(168, 43, 53, 0.55)",x:-28},{title:"Ca Huế Sông Hương",subtitle:"Dạ tiệc Nhã nhạc trên thuyền rồng",location:"SÔNG HƯƠNG // ĐÊM HOA ĐĂNG",color:"rgba(245, 184, 97, 0.5)",x:-9},{title:"Cổ Vật Triều Nguyễn",subtitle:"Xoay ngắm bảo vật hoàng gia 360°",location:"BẢO TÀNG SỐ // DI SẢN",color:"rgba(12, 59, 62, 0.6)",x:10},{title:"Ẩm Thực Cung Đình",subtitle:"Bản đồ mỹ vị ẩm thực tiến vua",location:"ẨM THỰC // 500+ MÓN",color:"rgba(255, 126, 71, 0.55)",x:29}],e=new Ii(16,21.5,32,32);t.forEach((n,i)=>{const s=this.createCardTexture(n.title,n.subtitle,n.location,n.color),o=new Je({vertexShader:_M,fragmentShader:vM,side:di,uniforms:{uTexture:{value:s},uVelocity:{value:0},uHover:{value:0},uHoverOffset:{value:new xt(0,0)}}}),a=new De(e,o);a.position.set(n.x,0,i%2===0?2:-2),a.rotation.y=(i-1.5)*-.06,this.group.add(a),this.cards.push({mesh:a,mat:o})})}update(t,e=0){this.cards.forEach(n=>{n.mat.uniforms.uVelocity.value=e})}}class SM{constructor(t){this.scene=t,this.group=new mi,this.group.position.set(0,4,-495),this.scene.add(this.group),this.rings=[],this.initArmillarySphere(),this.initFlightArcs(),this.initStardustField()}initArmillarySphere(){const t=new nu(3.6,2),e=new zr({color:16103521,emissive:15051090,emissiveIntensity:1.2,roughness:.2,metalness:.9,wireframe:!0});this.core=new De(t,e),this.group.add(this.core);const n=[{radius:6.5,tube:.12,rotSpeed:{x:.005,y:.01,z:.003}},{radius:8.8,tube:.14,rotSpeed:{x:-.008,y:.006,z:-.005}},{radius:11.2,tube:.1,rotSpeed:{x:.003,y:-.007,z:.009}}],i=new zr({color:16103521,roughness:.25,metalness:.85});n.forEach(s=>{const o=new ru(s.radius,s.tube,16,100),a=new De(o,i);this.group.add(a),this.rings.push({mesh:a,speed:s.rotSpeed})})}initFlightArcs(){const t=[new P(-4,-1,3),new P(-1,4,4),new P(3,2,2),new P(4,-2,-2),new P(-2,-4,-1)],e=new Va(t,!0),n=new su(e,80,.09,8,!0),i=new Oo({color:16766597,transparent:!0,opacity:.85});this.flightArc=new De(n,i),this.group.add(this.flightArc)}initStardustField(){const e=new Mn,n=new Float32Array(800*3);for(let s=0;s<800;s++){const o=Math.random()*Math.PI*2,a=Math.acos(Math.random()*2-1),l=12+Math.random()*20;n[s*3]=l*Math.sin(a)*Math.cos(o),n[s*3+1]=l*Math.sin(a)*Math.sin(o),n[s*3+2]=l*Math.cos(a)}e.setAttribute("position",new ln(n,3));const i=new Pd({color:16103521,size:.8,map:oM(64),transparent:!0,blending:Mo,depthWrite:!1});this.stardust=new Ld(e,i),this.group.add(this.stardust)}update(t){this.core&&(this.core.rotation.y=t*.3,this.core.rotation.x=t*.15),this.rings.forEach(e=>{e.mesh.rotation.x+=e.speed.x,e.mesh.rotation.y+=e.speed.y,e.mesh.rotation.z+=e.speed.z}),this.flightArc&&(this.flightArc.rotation.y=-t*.2),this.stardust&&(this.stardust.rotation.y=t*.05)}}class MM{constructor(t){if(this.canvas=t,!Bd()){console.warn("[World] WebGL không khả dụng trên thiết bị.");return}this.width=window.innerWidth,this.height=window.innerHeight,this.renderer=new Rd({canvas:this.canvas,antialias:!0,powerPreference:"high-performance",alpha:!1}),this.renderer.setSize(this.width,this.height),this.renderer.setPixelRatio(uf()),this.renderer.toneMapping=jf,this.renderer.toneMappingExposure=1.1,this.scene=new AS,this.camera=new Fn(46,this.width/this.height,.1,1e3),this.environment=new $S(this.scene),this.cameraPath=new qS,this.heroStage=new aM(this.scene),this.haLongStage=new uM(this.scene),this.hoiAnStage=new dM(this.scene),this.sapaStage=new gM(this.scene),this.galleryStage=new xM(this.scene),this.finalCTAStage=new SM(this.scene),this.postProcessing=new rM(this.renderer,this.scene,this.camera,this.width,this.height),this.scrollProgress=0,this.scrollVelocity=0,this.mouse={x:0,y:0,targetX:0,targetY:0},this.clock=new Id,this.isPaused=!1,this.initEvents(),this.startLoop()}initEvents(){window.addEventListener("resize",this.onResize.bind(this)),window.addEventListener("mousemove",t=>{this.mouse.targetX=t.clientX/window.innerWidth*2-1,this.mouse.targetY=-(t.clientY/window.innerHeight)*2+1}),document.addEventListener("visibilitychange",()=>{this.isPaused=document.hidden})}onResize(){this.width=window.innerWidth,this.height=window.innerHeight,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height),this.renderer.setPixelRatio(uf()),this.postProcessing.setSize(this.width,this.height)}setScrollProgress(t,e=0){this.scrollProgress=t,this.scrollVelocity=e}startLoop(){const t=()=>{if(requestAnimationFrame(t),this.isPaused)return;const e=this.clock.getElapsedTime();this.mouse.x+=(this.mouse.targetX-this.mouse.x)*.05,this.mouse.y+=(this.mouse.targetY-this.mouse.y)*.05,this.cameraPath.update(this.camera,this.scrollProgress,this.mouse),this.environment.update(this.scrollProgress),this.heroStage.update(e),this.haLongStage.update(e,this.camera),this.hoiAnStage.update(e),this.sapaStage.update(e,this.camera),this.galleryStage.update(e,this.scrollVelocity),this.finalCTAStage.update(e),this.postProcessing.render(e)};t()}}function wi(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function kd(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Vn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},To={duration:.5,overwrite:!1,delay:0},au,Qe,Ee,Qn=1e8,ge=1/Qn,Mc=Math.PI*2,yM=Mc/4,EM=0,Hd=Math.sqrt,TM=Math.cos,bM=Math.sin,$e=function(t){return typeof t=="string"},Re=function(t){return typeof t=="function"},Oi=function(t){return typeof t=="number"},lu=function(t){return typeof t>"u"},xi=function(t){return typeof t=="object"},wn=function(t){return t!==!1},cu=function(){return typeof window<"u"},fa=function(t){return Re(t)||$e(t)},Gd=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},un=Array.isArray,wM=/random\([^)]+\)/g,AM=/,\s*/g,hf=/(?:-?\.?\d|\.)+/gi,Vd=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ms=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Zl=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Wd=/[+-]=-?[.\d]+/,CM=/[^,'"\[\]\s]+/gi,RM=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,we,ui,yc,uu,Wn={},Wa={},Xd,Yd=function(t){return(Wa=Ls(t,Wn))&&Pn},hu=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},bo=function(t,e){return!e&&console.warn(t)},qd=function(t,e){return t&&(Wn[t]=e)&&Wa&&(Wa[t]=e)||Wn},wo=function(){return 0},PM={suppressEvents:!0,isStart:!0,kill:!1},wa={suppressEvents:!0,kill:!1},LM={suppressEvents:!0},fu={},nr=[],Ec={},$d,On={},Jl={},ff=30,Aa=[],du="",pu=function(t){var e=t[0],n,i;if(xi(e)||Re(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=Aa.length;i--&&!Aa[i].targetTest(e););n=Aa[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new gp(t[i],n)))||t.splice(i,1);return t},Lr=function(t){return t._gsap||pu(ti(t))[0]._gsap},Kd=function(t,e,n){return(n=t[e])&&Re(n)?t[e]():lu(n)&&t.getAttribute&&t.getAttribute(e)||n},An=function(t,e){return(t=t.split(",")).forEach(e)||t},Le=function(t){return Math.round(t*1e5)/1e5||0},be=function(t){return Math.round(t*1e7)/1e7||0},xs=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},DM=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},Xa=function(){var t=nr.length,e=nr.slice(0),n,i;for(Ec={},nr.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},mu=function(t){return!!(t._initted||t._startAt||t.add)},Zd=function(t,e,n,i){nr.length&&!Qe&&Xa(),t.render(e,n,!!(Qe&&e<0&&mu(t))),nr.length&&!Qe&&Xa()},Jd=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(CM).length<2?e:$e(t)?t.trim():t},jd=function(t){return t},Xn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},UM=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},Ls=function(t,e){for(var n in e)t[n]=e[n];return t},df=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=xi(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},Ya=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},lo=function(t){var e=t.parent||we,n=t.keyframes?UM(un(t.keyframes)):Xn;if(wn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},NM=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Qd=function(t,e,n,i,s){var o=t[i],a;if(s)for(a=e[s];o&&o[s]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=o,e.parent=e._dp=t,e},ll=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,o=e._next;s?s._next=o:t[n]===e&&(t[n]=o),o?o._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},or=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Dr=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},IM=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Tc=function(t,e,n,i){return t._startAt&&(Qe?t._startAt.revert(wa):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},OM=function r(t){return!t||t._ts&&r(t.parent)},pf=function(t){return t._repeat?Ds(t._tTime,t=t.duration()+t._rDelay)*t:0},Ds=function(t,e){var n=Math.floor(t=be(t/e));return t&&n===t?n-1:n},qa=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},cl=function(t){return t._end=be(t._start+(t._tDur/Math.abs(t._ts||t._rts||ge)||0))},ul=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=be(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),cl(t),n._dirty||Dr(n,t)),t},tp=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=qa(t.rawTime(),e),(!e._dur||ko(0,e.totalDuration(),n)-e._tTime>ge)&&e.render(n,!0)),Dr(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-ge}},pi=function(t,e,n,i){return e.parent&&or(e),e._start=be((Oi(n)?n:n||t!==we?$n(t,n,e):t._time)+e._delay),e._end=be(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Qd(t,e,"_first","_last",t._sort?"_start":0),bc(e)||(t._recent=e),i||tp(t,e),t._ts<0&&ul(t,t._tTime),t},ep=function(t,e){return(Wn.ScrollTrigger||hu("scrollTrigger",e))&&Wn.ScrollTrigger.create(e,t)},np=function(t,e,n,i,s){if(_u(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!Qe&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&$d!==Bn.frame)return nr.push(t),t._lazy=[s,i],1},FM=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},bc=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},zM=function(t,e,n,i){var s=t.ratio,o=e<0||!e&&(!t._start&&FM(t)&&!(!t._initted&&bc(t))||(t._ts<0||t._dp._ts<0)&&!bc(t))?0:1,a=t._rDelay,l=0,c,u,h;if(a&&t._repeat&&(l=ko(0,t._tDur,e),u=Ds(l,a),t._yoyo&&u&1&&(o=1-o),u!==Ds(t._tTime,a)&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==s||Qe||i||t._zTime===ge||!e&&t._zTime){if(!t._initted&&np(t,e,i,n,l))return;for(h=t._zTime,t._zTime=e||(n?ge:0),n||(n=e&&!h),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&Tc(t,e,n,!0),t._onUpdate&&!n&&Hn(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&Hn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&or(t,1),!n&&!Qe&&(Hn(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},BM=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},Us=function(t,e,n,i){var s=t._repeat,o=be(e)||0,a=t._tTime/t._tDur;return a&&!i&&(t._time*=o/t._dur),t._dur=o,t._tDur=s?s<0?1e10:be(o*(s+1)+t._rDelay*s):o,a>0&&!i&&ul(t,t._tTime=t._tDur*a),t.parent&&cl(t),n||Dr(t.parent,t),t},mf=function(t){return t instanceof En?Dr(t):Us(t,t._dur)},kM={_start:0,endTime:wo,totalDuration:wo},$n=function r(t,e,n){var i=t.labels,s=t._recent||kM,o=t.duration()>=Qn?s.endTime(!1):t._dur,a,l,c;return $e(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(e in i||(i[e]=o),i[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&n&&(l=l/100*(un(n)?n[0]:n).totalDuration()),a>1?r(t,e.substr(0,a-1),n)+l:o+l)):e==null?o:+e},co=function(t,e,n){var i=Oi(e[1]),s=(i?2:1)+(t<2?0:1),o=e[s],a,l;if(i&&(o.duration=e[1]),o.parent=n,t){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=wn(l.vars.inherit)&&l.parent;o.immediateRender=wn(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[s-1]}return new Fe(e[0],o,e[s+1])},ur=function(t,e){return t||t===0?e(t):e},ko=function(t,e,n){return n<t?t:n>e?e:n},on=function(t,e){return!$e(t)||!(e=RM.exec(t))?"":e[1]},HM=function(t,e,n){return ur(n,function(i){return ko(t,e,i)})},wc=[].slice,ip=function(t,e){return t&&xi(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&xi(t[0]))&&!t.nodeType&&t!==ui},GM=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return $e(i)&&!e||ip(i,1)?(s=n).push.apply(s,ti(i)):n.push(i)})||n},ti=function(t,e,n){return Ee&&!e&&Ee.selector?Ee.selector(t):$e(t)&&!n&&(yc||!Ns())?wc.call((e||uu).querySelectorAll(t),0):un(t)?GM(t,n):ip(t)?wc.call(t,0):t?[t]:[]},Ac=function(t){return t=ti(t)[0]||bo("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return ti(e,n.querySelectorAll?n:n===t?bo("Invalid scope")||uu.createElement("div"):t)}},rp=function(t){return t.sort(function(){return .5-Math.random()})},sp=function(t){if(Re(t))return t;var e=xi(t)?t:{each:t},n=Ur(e.ease),i=e.from||0,s=parseFloat(e.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=e.axis,u=i,h=i;return $e(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],h=i[1]),function(f,d,_){var g=(_||e).length,p=o[g],m,M,v,x,A,w,E,D,S;if(!p){if(S=e.grid==="auto"?0:(e.grid||[1,Qn])[1],!S){for(E=-Qn;E<(E=_[S++].getBoundingClientRect().left)&&S<g;);S<g&&S--}for(p=o[g]=[],m=l?Math.min(S,g)*u-.5:i%S,M=S===Qn?0:l?g*h/S-.5:i/S|0,E=0,D=Qn,w=0;w<g;w++)v=w%S-m,x=M-(w/S|0),p[w]=A=c?Math.abs(c==="y"?x:v):Hd(v*v+x*x),A>E&&(E=A),A<D&&(D=A);i==="random"&&rp(p),p.max=E-D,p.min=D,p.v=g=(parseFloat(e.amount)||parseFloat(e.each)*(S>g?g-1:c?c==="y"?g/S:S:Math.max(S,g/S))||0)*(i==="edges"?-1:1),p.b=g<0?s-g:s,p.u=on(e.amount||e.each)||0,n=n&&g<0?ey(n):n}return g=(p[f]-p.min)/p.max||0,be(p.b+(n?n(g):g)*p.v)+p.u}},Cc=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=be(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(Oi(n)?0:on(n))}},op=function(t,e){var n=un(t),i,s;return!n&&xi(t)&&(i=n=t.radius||Qn,t.values?(t=ti(t.values),(s=!Oi(t[0]))&&(i*=i)):t=Cc(t.increment)),ur(e,n?Re(t)?function(o){return s=t(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Qn,u=0,h=t.length,f,d;h--;)s?(f=t[h].x-a,d=t[h].y-l,f=f*f+d*d):f=Math.abs(t[h]-a),f<c&&(c=f,u=h);return u=!i||c<=i?t[u]:o,s||u===o||Oi(o)?u:u+on(o)}:Cc(t))},ap=function(t,e,n,i){return ur(un(t)?!e:n===!0?!!(n=0):!i,function(){return un(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},VM=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,o){return o(s)},i)}},WM=function(t,e){return function(n){return t(parseFloat(n))+(e||on(n))}},XM=function(t,e,n){return cp(t,e,0,1,n)},lp=function(t,e,n){return ur(n,function(i){return t[~~e(i)]})},YM=function r(t,e,n){var i=e-t;return un(t)?lp(t,r(0,t.length),e):ur(n,function(s){return(i+(s-t)%i)%i+t})},qM=function r(t,e,n){var i=e-t,s=i*2;return un(t)?lp(t,r(0,t.length-1),e):ur(n,function(o){return o=(s+(o-t)%s)%s||0,t+(o>i?s-o:o)})},Ao=function(t){return t.replace(wM,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(AM);return ap(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},cp=function(t,e,n,i,s){var o=e-t,a=i-n;return ur(s,function(l){return n+((l-t)/o*a||0)})},$M=function r(t,e,n,i){var s=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!s){var o=$e(t),a={},l,c,u,h,f;if(n===!0&&(i=1)&&(n=null),o)t={p:t},e={p:e};else if(un(t)&&!un(e)){for(u=[],h=t.length,f=h-2,c=1;c<h;c++)u.push(r(t[c-1],t[c]));h--,s=function(_){_*=h;var g=Math.min(f,~~_);return u[g](_-g)},n=e}else i||(t=Ls(un(t)?[]:{},t));if(!u){for(l in e)gu.call(a,t,l,"get",e[l]);s=function(_){return Su(_,a)||(o?t.p:t)}}}return ur(n,s)},gf=function(t,e,n){var i=t.labels,s=Qn,o,a,l;for(o in i)a=i[o]-e,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},Hn=function(t,e,n){var i=t.vars,s=i[e],o=Ee,a=t._ctx,l,c,u;if(s)return l=i[e+"Params"],c=i.callbackScope||t,n&&nr.length&&Xa(),a&&(Ee=a),u=l?s.apply(c,l):s.call(c),Ee=o,u},Zs=function(t){return or(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Qe),t.progress()<1&&Hn(t,"onInterrupt"),t},gs,up=[],hp=function(t){if(t)if(t=!t.name&&t.default||t,cu()||t.headless){var e=t.name,n=Re(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:wo,render:Su,add:gu,kill:hy,modifier:uy,rawVars:0},o={targetTest:0,get:0,getSetter:xu,aliases:{},register:0};if(Ns(),t!==i){if(On[e])return;Xn(i,Xn(Ya(t,s),o)),Ls(i.prototype,Ls(s,Ya(t,o))),On[i.prop=e]=i,t.targetTest&&(Aa.push(i),fu[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}qd(e,i),t.register&&t.register(Pn,i,Cn)}else up.push(t)},me=255,Js={aqua:[0,me,me],lime:[0,me,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,me],navy:[0,0,128],white:[me,me,me],olive:[128,128,0],yellow:[me,me,0],orange:[me,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[me,0,0],pink:[me,192,203],cyan:[0,me,me],transparent:[me,me,me,0]},jl=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*me+.5|0},fp=function(t,e,n){var i=t?Oi(t)?[t>>16,t>>8&me,t&me]:0:Js.black,s,o,a,l,c,u,h,f,d,_;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Js[t])i=Js[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+s+s+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&me,i&me,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&me,t&me]}else if(t.substr(0,3)==="hsl"){if(i=_=t.match(hf),!e)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=jl(l+1/3,s,o),i[1]=jl(l,s,o),i[2]=jl(l-1/3,s,o);else if(~t.indexOf("="))return i=t.match(Vd),n&&i.length<4&&(i[3]=1),i}else i=t.match(hf)||Js.transparent;i=i.map(Number)}return e&&!_&&(s=i[0]/me,o=i[1]/me,a=i[2]/me,h=Math.max(s,o,a),f=Math.min(s,o,a),u=(h+f)/2,h===f?l=c=0:(d=h-f,c=u>.5?d/(2-h-f):d/(h+f),l=h===s?(o-a)/d+(o<a?6:0):h===o?(a-s)/d+2:(s-o)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},dp=function(t){var e=[],n=[],i=-1;return t.split(ir).forEach(function(s){var o=s.match(ms)||[];e.push.apply(e,o),n.push(i+=o.length+1)}),e.c=n,e},_f=function(t,e,n){var i="",s=(t+i).match(ir),o=e?"hsla(":"rgba(",a=0,l,c,u,h;if(!s)return t;if(s=s.map(function(f){return(f=fp(f,e,1))&&o+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=dp(t),l=n.c,l.join(i)!==u.c.join(i)))for(c=t.replace(ir,"1").split(ms),h=c.length-1;a<h;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=t.split(ir),h=c.length-1;a<h;a++)i+=c[a]+s[a];return i+c[h]},ir=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Js)r+="|"+t+"\\b";return new RegExp(r+")","gi")}(),KM=/hsl[a]?\(/,pp=function(t){var e=t.join(" "),n;if(ir.lastIndex=0,ir.test(e))return n=KM.test(e),t[1]=_f(t[1],n),t[0]=_f(t[0],n,dp(t[1])),!0},Co,Bn=function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,h,f,d,_=function g(p){var m=r()-i,M=p===!0,v,x,A,w;if((m>t||m<0)&&(n+=m-e),i+=m,A=i-n,v=A-o,(v>0||M)&&(w=++h.frame,f=A-h.time*1e3,h.time=A=A/1e3,o+=v+(v>=s?4:s-v),x=1),M||(l=c(g)),x)for(d=0;d<a.length;d++)a[d](A,f,w,p)};return h={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(p){return f/(1e3/(p||60))},wake:function(){Xd&&(!yc&&cu()&&(ui=yc=window,uu=ui.document||{},Wn.gsap=Pn,(ui.gsapVersions||(ui.gsapVersions=[])).push(Pn.version),Yd(Wa||ui.GreenSockGlobals||!ui.gsap&&ui||{}),up.forEach(hp)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(p){return setTimeout(p,o-h.time*1e3+1|0)},Co=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Co=0,c=wo},lagSmoothing:function(p,m){t=p||1/0,e=Math.min(m||33,t)},fps:function(p){s=1e3/(p||240),o=h.time*1e3+s},add:function(p,m,M){var v=m?function(x,A,w,E){p(x,A,w,E),h.remove(v)}:p;return h.remove(p),a[M?"unshift":"push"](v),Ns(),v},remove:function(p,m){~(m=a.indexOf(p))&&a.splice(m,1)&&d>=m&&d--},_listeners:a},h}(),Ns=function(){return!Co&&Bn.wake()},se={},ZM=/^[\d.\-M][\d.\-,\s]/,JM=/["']/g,jM=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[i]=isNaN(c)?c.replace(JM,"").trim():+c,i=l.substr(a+1).trim();return e},QM=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},ty=function(t){var e=(t+"").split("("),n=se[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[jM(e[1])]:QM(t).split(",").map(Jd)):se._CE&&ZM.test(t)?se._CE("",t):n},ey=function(t){return function(e){return 1-t(1-e)}},Ur=function(t,e){return t&&(Re(t)?t:se[t]||ty(t))||e},Gr=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},o;return An(t,function(a){se[a]=Wn[a]=s,se[o=a.toLowerCase()]=n;for(var l in s)se[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=se[a+"."+l]=s[l]}),s},mp=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Ql=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),o=s/Mc*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*bM((u-o)*s)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:mp(a);return s=Mc/s,l.config=function(c,u){return r(t,c,u)},l},tc=function r(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:mp(n);return i.config=function(s){return r(t,s)},i};An("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;Gr(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});se.Linear.easeNone=se.none=se.Linear.easeIn;Gr("Elastic",Ql("in"),Ql("out"),Ql());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(a){return a<e?r*a*a:a<n?r*Math.pow(a-1.5/t,2)+.75:a<i?r*(a-=2.25/t)*a+.9375:r*Math.pow(a-2.625/t,2)+.984375};Gr("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Gr("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});Gr("Circ",function(r){return-(Hd(1-r*r)-1)});Gr("Sine",function(r){return r===1?1:-TM(r*yM)+1});Gr("Back",tc("in"),tc("out"),tc());se.SteppedEase=se.steps=Wn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,o=1-ge;return function(a){return((i*ko(0,o,a)|0)+s)*n}}};To.ease=se["quad.out"];An("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return du+=r+","+r+"Params,"});var gp=function(t,e){this.id=EM++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Kd,this.set=e?e.getSetter:xu},Ro=function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Us(this,+e.duration,1,1),this.data=e.data,Ee&&(this._ctx=Ee,Ee.data.push(this)),Co||Bn.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Us(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Ns(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(ul(this,n),!s._dp||s.parent||tp(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&pi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===ge||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Zd(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+pf(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+pf(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Ds(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-ge?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?qa(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-ge?0:this._rts,this.totalTime(ko(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),cl(this),IM(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ns(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==ge&&(this._tTime-=ge)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=be(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&pi(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(wn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?qa(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=LM);var i=Qe;return Qe=n,mu(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Qe=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,mf(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,mf(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime($n(this,n),wn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,wn(i)),this._dur||(this._zTime=-ge),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-ge:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-ge,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-ge)},t.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},t.then=function(n){var i=this,s=i._prom;return new Promise(function(o){var a=Re(n)?n:jd,l=function(){var u=i.then;i.then=null,s&&s(),Re(a)&&(a=a(i))&&(a.then||a===i)&&(i.then=u),o(a),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){Zs(this)},r}();Xn(Ro.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-ge,_prom:0,_ps:!1,_rts:1});var En=function(r){kd(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=wn(n.sortChildren),we&&pi(n.parent||we,wi(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&ep(wi(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,o){return co(0,arguments,this),this},e.from=function(i,s,o){return co(1,arguments,this),this},e.fromTo=function(i,s,o,a){return co(2,arguments,this),this},e.set=function(i,s,o){return s.duration=0,s.parent=this,lo(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Fe(i,s,$n(this,o),1),this},e.call=function(i,s,o){return pi(this,Fe.delayedCall(0,i,s),o)},e.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Fe(i,o,$n(this,l)),this},e.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,lo(o).immediateRender=wn(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},e.staggerFromTo=function(i,s,o,a,l,c,u,h){return a.startAt=o,lo(a).immediateRender=wn(a.immediateRender),this.staggerTo(i,s,a,l,c,u,h)},e.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:be(i),h=this._zTime<0!=i<0&&(this._initted||!c),f,d,_,g,p,m,M,v,x,A,w,E;if(this!==we&&u>l&&i>=0&&(u=l),u!==this._tTime||o||h){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,x=this._start,v=this._ts,m=!v,h&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(w=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,o);if(f=be(u%p),u===l?(g=this._repeat,f=c):(A=be(u/p),g=~~A,g&&g===A&&(f=c,g--),f>c&&(f=c)),A=Ds(this._tTime,p),!a&&this._tTime&&A!==g&&this._tTime-A*p-this._dur<=0&&(A=g),w&&g&1&&(f=c-f,E=1),g!==A&&!this._lock){var D=w&&A&1,S=D===(w&&g&1);if(g<A&&(D=!D),a=D?0:u%c?c:u,this._lock=1,this.render(a||(E?0:be(g*p)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Hn(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1,A=g),a&&a!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,S&&(this._lock=2,a=D?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(M=BM(this,be(a),be(f)),M&&(u-=f-(f=M._start))),this._tTime=u,this._time=f,this._act=!!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&u&&c&&!s&&!A&&(Hn(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(d=this._first;d;){if(_=d._next,(d._act||f>=d._start)&&d._ts&&M!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,o),f!==this._time||!this._ts&&!m){M=0,_&&(u+=this._zTime=-ge);break}}d=_}else{d=this._last;for(var y=i<0?i:f;d;){if(_=d._prev,(d._act||y<=d._end)&&d._ts&&M!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(y-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(y-d._start)*d._ts,s,o||Qe&&mu(d)),f!==this._time||!this._ts&&!m){M=0,_&&(u+=this._zTime=y?-ge:ge);break}}d=_}}if(M&&!s&&(this.pause(),M.render(f>=a?0:-ge)._zTime=f>=a?1:-1,this._ts))return this._start=x,cl(this),this.render(i,s,o);this._onUpdate&&!s&&Hn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(x===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&or(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(Hn(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var o=this;if(Oi(s)||(s=$n(this,s,i)),!(i instanceof Ro)){if(un(i))return i.forEach(function(a){return o.add(a,s)}),this;if($e(i))return this.addLabel(i,s);if(Re(i))i=Fe.delayedCall(0,i);else return this}return this!==i?pi(this,i,s):this},e.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Qn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Fe?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},e.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},e.remove=function(i){return $e(i)?this.removeLabel(i):Re(i)?this.killTweensOf(i):(i.parent===this&&ll(this,i),i===this._recent&&(this._recent=this._last),Dr(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=be(Bn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=$n(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,o){var a=Fe.delayedCall(0,s||wo,o);return a.data="isPause",this._hasPause=1,pi(this,a,$n(this,i))},e.removePause=function(i){var s=this._first;for(i=$n(this,i);s;)s._start===i&&s.data==="isPause"&&or(s),s=s._next},e.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)$i!==a[l]&&a[l].kill(i,s);return this},e.getTweensOf=function(i,s){for(var o=[],a=ti(i),l=this._first,c=Oi(s),u;l;)l instanceof Fe?DM(l._targets,a)&&(c?(!$i||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},e.tweenTo=function(i,s){s=s||{};var o=this,a=$n(o,i),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,f=l.immediateRender,d,_=Fe.to(o,Xn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||ge,onStart:function(){if(o.pause(),!d){var p=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==p&&Us(_,p,0,1).render(_._time,!0,!0),d=1}u&&u.apply(_,h||[])}},s));return f?_.render(0):_},e.tweenFromTo=function(i,s,o){return this.tweenTo(s,Xn({startAt:{time:$n(this,i)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),gf(this,$n(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),gf(this,$n(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+ge)},e.shiftChildren=function(i,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(i=be(i);a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return Dr(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Dr(this)},e.totalDuration=function(i){var s=0,o=this,a=o._last,l=Qn,c,u,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(h=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,pi(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=be(u/o._ts),o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Us(o,o===we&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(i){if(we._ts&&(Zd(we,qa(i,we)),$d=Bn.frame),Bn.frame>=ff){ff+=Vn.autoSleep||120;var s=we._first;if((!s||!s._ts)&&Vn.autoSleep&&Bn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Bn.sleep()}}},t}(Ro);Xn(En.prototype,{_lock:0,_hasPause:0,_forcing:0});var ny=function(t,e,n,i,s,o,a){var l=new Cn(this._pt,t,e,0,1,yp,null,s),c=0,u=0,h,f,d,_,g,p,m,M;for(l.b=n,l.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=Ao(i)),o&&(M=[n,i],o(M,t,e),n=M[0],i=M[1]),f=n.match(Zl)||[];h=Zl.exec(i);)_=h[0],g=i.substring(c,h.index),d?d=(d+1)%5:g.substr(-5)==="rgba("&&(d=1),_!==f[u++]&&(p=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:p,c:_.charAt(1)==="="?xs(p,_)-p:parseFloat(_)-p,m:d&&d<4?Math.round:0},c=Zl.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(Wd.test(i)||m)&&(l.e=0),this._pt=l,l},gu=function(t,e,n,i,s,o,a,l,c,u){Re(i)&&(i=i(s||0,t,o));var h=t[e],f=n!=="get"?n:Re(h)?c?t[e.indexOf("set")||!Re(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():h,d=Re(h)?c?ay:Sp:vu,_;if($e(i)&&(~i.indexOf("random(")&&(i=Ao(i)),i.charAt(1)==="="&&(_=xs(f,i)+(on(f)||0),(_||_===0)&&(i=_))),!u||f!==i||Rc)return!isNaN(f*i)&&i!==""?(_=new Cn(this._pt,t,e,+f||0,i-(f||0),typeof h=="boolean"?cy:Mp,0,d),c&&(_.fp=c),a&&_.modifier(a,this,t),this._pt=_):(!h&&!(e in t)&&hu(e,i),ny.call(this,t,e,f,i,d,l||Vn.stringFilter,c))},iy=function(t,e,n,i,s){if(Re(t)&&(t=uo(t,s,e,n,i)),!xi(t)||t.style&&t.nodeType||un(t)||Gd(t))return $e(t)?uo(t,s,e,n,i):t;var o={},a;for(a in t)o[a]=uo(t[a],s,e,n,i);return o},_p=function(t,e,n,i,s,o){var a,l,c,u;if(On[t]&&(a=new On[t]).init(s,a.rawVars?e[t]:iy(e[t],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new Cn(n._pt,s,t,0,1,a.render,a,0,a.priority),n!==gs))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},$i,Rc,_u=function r(t,e,n){var i=t.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,f=i.keyframes,d=i.autoRevert,_=t._dur,g=t._startAt,p=t._targets,m=t.parent,M=m&&m.data==="nested"?m.vars.targets:p,v=t._overwrite==="auto"&&!au,x=t.timeline,A=i.easeReverse||h,w,E,D,S,y,F,N,K,L,O,k,X,Y;if(x&&(!f||!s)&&(s="none"),t._ease=Ur(s,To.ease),t._rEase=A&&(Ur(A)||t._ease),t._from=!x&&!!i.runBackwards,t._from&&(t.ratio=1),!x||f&&!i.stagger){if(K=p[0]?Lr(p[0]).harness:0,X=K&&i[K.prop],w=Ya(i,fu),g&&(g._zTime<0&&g.progress(1),e<0&&u&&a&&!d?g.render(-1,!0):g.revert(u&&_?wa:PM),g._lazy=0),o){if(or(t._startAt=Fe.set(p,Xn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!g&&wn(l),startAt:null,delay:0,onUpdate:c&&function(){return Hn(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Qe||!a&&!d)&&t._startAt.revert(wa),a&&_&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(u&&_&&!g){if(e&&(a=!1),D=Xn({overwrite:!1,data:"isFromStart",lazy:a&&!g&&wn(l),immediateRender:a,stagger:0,parent:m},w),X&&(D[K.prop]=X),or(t._startAt=Fe.set(p,D)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Qe?t._startAt.revert(wa):t._startAt.render(-1,!0)),t._zTime=e,!a)r(t._startAt,ge,ge);else if(!e)return}for(t._pt=t._ptCache=0,l=_&&wn(l)||l&&!_,E=0;E<p.length;E++){if(y=p[E],N=y._gsap||pu(p)[E]._gsap,t._ptLookup[E]=O={},Ec[N.id]&&nr.length&&Xa(),k=M===p?E:M.indexOf(y),K&&(L=new K).init(y,X||w,t,k,M)!==!1&&(t._pt=S=new Cn(t._pt,y,L.name,0,1,L.render,L,0,L.priority),L._props.forEach(function($){O[$]=S}),L.priority&&(F=1)),!K||X)for(D in w)On[D]&&(L=_p(D,w,t,k,y,M))?L.priority&&(F=1):O[D]=S=gu.call(t,y,D,"get",w[D],k,M,0,i.stringFilter);t._op&&t._op[E]&&t.kill(y,t._op[E]),v&&t._pt&&($i=t,we.killTweensOf(y,O,t.globalTime(e)),Y=!t.parent,$i=0),t._pt&&l&&(Ec[N.id]=1)}F&&Ep(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!Y,f&&e<=0&&x.render(Qn,!0,!0)},ry=function(t,e,n,i,s,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,h,f,d;if(!c)for(c=t._ptCache[e]=[],f=t._ptLookup,d=t._targets.length;d--;){if(u=f[d][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return Rc=1,t.vars[e]="+=0",_u(t,a),Rc=0,l?bo(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(d=c.length;d--;)h=c[d],u=h._pt||h,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,h.e&&(h.e=Le(n)+on(h.e)),h.b&&(h.b=u.s+on(h.b))},sy=function(t,e){var n=t[0]?Lr(t[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return e;s=Ls({},e);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},oy=function(t,e,n,i){var s=e.ease||i||"power1.inOut",o,a;if(un(e))a=n[t]||(n[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:s})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:s})},uo=function(t,e,n,i,s){return Re(t)?t.call(e,n,i,s):$e(t)&&~t.indexOf("random(")?Ao(t):t},vp=du+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",xp={};An(vp+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return xp[r]=1});var Fe=function(r){kd(t,r);function t(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:lo(i))||this;var l=a.vars,c=l.duration,u=l.delay,h=l.immediateRender,f=l.stagger,d=l.overwrite,_=l.keyframes,g=l.defaults,p=l.scrollTrigger,m=i.parent||we,M=(un(n)||Gd(n)?Oi(n[0]):"length"in i)?[n]:ti(n),v,x,A,w,E,D,S,y;if(a._targets=M.length?pu(M):bo("GSAP target "+n+" not found. https://gsap.com",!Vn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,_||f||fa(c)||fa(u)){i=a.vars;var F=i.easeReverse||i.yoyoEase;if(v=a.timeline=new En({data:"nested",defaults:g||{},targets:m&&m.data==="nested"?m.vars.targets:M}),v.kill(),v.parent=v._dp=wi(a),v._start=0,f||fa(c)||fa(u)){if(w=M.length,S=f&&sp(f),xi(f))for(E in f)~vp.indexOf(E)&&(y||(y={}),y[E]=f[E]);for(x=0;x<w;x++)A=Ya(i,xp),A.stagger=0,F&&(A.easeReverse=F),y&&Ls(A,y),D=M[x],A.duration=+uo(c,wi(a),x,D,M),A.delay=(+uo(u,wi(a),x,D,M)||0)-a._delay,!f&&w===1&&A.delay&&(a._delay=u=A.delay,a._start+=u,A.delay=0),v.to(D,A,S?S(x,D,M):0),v._ease=se.none;v.duration()?c=u=0:a.timeline=0}else if(_){lo(Xn(v.vars.defaults,{ease:"none"})),v._ease=Ur(_.ease||i.ease||"none");var N=0,K,L,O;if(un(_))_.forEach(function(k){return v.to(M,k,">")}),v.duration();else{A={};for(E in _)E==="ease"||E==="easeEach"||oy(E,_[E],A,_.easeEach);for(E in A)for(K=A[E].sort(function(k,X){return k.t-X.t}),N=0,x=0;x<K.length;x++)L=K[x],O={ease:L.e,duration:(L.t-(x?K[x-1].t:0))/100*c},O[E]=L.v,v.to(M,O,N),N+=O.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return d===!0&&!au&&($i=wi(a),we.killTweensOf(M),$i=0),pi(m,wi(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(h||!c&&!_&&a._start===be(m._time)&&wn(h)&&OM(wi(a))&&m.data!=="nested")&&(a._tTime=-ge,a.render(Math.max(0,-u)||0)),p&&ep(wi(a),p),a}var e=t.prototype;return e.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,h=i>l-ge&&!u?l:i<ge?0:i,f,d,_,g,p,m,M,v;if(!c)zM(this,i,s,o);else if(h!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=h,v=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,s,o);if(f=be(h%g),h===l?(_=this._repeat,f=c):(p=be(h/g),_=~~p,_&&_===p?(f=c,_--):f>c&&(f=c)),m=this._yoyo&&_&1,m&&(f=c-f),p=Ds(this._tTime,g),f===a&&!o&&this._initted&&_===p)return this._tTime=h,this;_!==p&&this.vars.repeatRefresh&&!m&&!this._lock&&f!==g&&this._initted&&(this._lock=o=1,this.render(be(g*_),!0).invalidate()._lock=0)}if(!this._initted){if(np(this,u?i:f,o,s,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==p))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._rEase){var x=f<a;if(x!==this._inv){var A=x?a:c-a;this._inv=x,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=A?(x?-1:1)/A:0,this._invScale=x?-this.ratio:1-this.ratio,this._invEase=x?this._rEase:this._ease}this.ratio=M=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=M=this._ease(f/c);if(this._from&&(this.ratio=M=1-M),this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&h&&!s&&!p&&(Hn(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(M,d.d),d=d._next;v&&v.render(i<0?i:v._dur*v._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&Tc(this,i,s,o),Hn(this,"onUpdate")),this._repeat&&_!==p&&this.vars.onRepeat&&!s&&this.parent&&Hn(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&Tc(this,i,!0,!0),(i||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&or(this,1),!s&&!(u&&!a)&&(h||a||m)&&(Hn(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,o,a,l){Co||Bn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||_u(this,c),u=this._ease(c/this._dur),ry(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(ul(this,0),this.parent||Qd(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Zs(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Qe),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,$i&&$i.vars.overwrite!==!0)._first||Zs(this),this.parent&&o!==this.timeline.totalDuration()&&Us(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?ti(i):a,c=this._ptLookup,u=this._pt,h,f,d,_,g,p,m;if((!s||s==="all")&&NM(a,l))return s==="all"&&(this._pt=0),Zs(this);for(h=this._op=this._op||[],s!=="all"&&($e(s)&&(g={},An(s,function(M){return g[M]=1}),s=g),s=sy(a,s)),m=a.length;m--;)if(~l.indexOf(a[m])){f=c[m],s==="all"?(h[m]=s,_=f,d={}):(d=h[m]=h[m]||{},_=s);for(g in _)p=f&&f[g],p&&((!("kill"in p.d)||p.d.kill(g)===!0)&&ll(this,p,"_pt"),delete f[g]),d!=="all"&&(d[g]=1)}return this._initted&&!this._pt&&u&&Zs(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return co(1,arguments)},t.delayedCall=function(i,s,o,a){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(i,s,o){return co(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,o){return we.killTweensOf(i,s,o)},t}(Ro);Xn(Fe.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});An("staggerTo,staggerFrom,staggerFromTo",function(r){Fe[r]=function(){var t=new En,e=wc.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var vu=function(t,e,n){return t[e]=n},Sp=function(t,e,n){return t[e](n)},ay=function(t,e,n,i){return t[e](i.fp,n)},ly=function(t,e,n){return t.setAttribute(e,n)},xu=function(t,e){return Re(t[e])?Sp:lu(t[e])&&t.setAttribute?ly:vu},Mp=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},cy=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},yp=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},Su=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},uy=function(t,e,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(t,e,n),s=o},hy=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?ll(this,e,"_pt"):e.dep||(n=1),e=i;return!n},fy=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},Ep=function(t){for(var e=t._pt,n,i,s,o;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:o)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:o=e,e=n}t._pt=s},Cn=function(){function r(e,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||Mp,this.d=l||this,this.set=c||vu,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=fy,this.m=n,this.mt=s,this.tween=i},r}();An(du+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return fu[r]=1});Wn.TweenMax=Wn.TweenLite=Fe;Wn.TimelineLite=Wn.TimelineMax=En;we=new En({sortChildren:!1,defaults:To,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Vn.stringFilter=pp;var Nr=[],Ca={},dy=[],vf=0,py=0,ec=function(t){return(Ca[t]||dy).map(function(e){return e()})},Pc=function(){var t=Date.now(),e=[];t-vf>2&&(ec("matchMediaInit"),Nr.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=ui.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&e.push(n))}),ec("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),vf=t,ec("matchMedia"))},Tp=function(){function r(e,n){this.selector=n&&Ac(n),this.data=[],this._r=[],this.isReverted=!1,this.id=py++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){Re(n)&&(s=i,i=n,n=Re);var o=this,a=function(){var c=Ee,u=o.selector,h;return c&&c!==o&&c.data.push(o),s&&(o.selector=Ac(s)),Ee=o,h=i.apply(o,arguments),Re(h)&&o._r.push(h),Ee=c,o.selector=u,o.isReverted=!1,h};return o.last=a,n===Re?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},t.ignore=function(n){var i=Ee;Ee=null,n(this),Ee=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Fe&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof En?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Fe)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=Nr.length;o--;)Nr[o].id===this.id&&Nr.splice(o,1)},t.revert=function(n){this.kill(n||{})},r}(),my=function(){function r(e){this.contexts=[],this.scope=e,Ee&&Ee.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){xi(n)||(n={matches:n});var o=new Tp(0,s||this.scope),a=o.conditions={},l,c,u;Ee&&!o.selector&&(o.selector=Ee.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=ui.matchMedia(n[c]),l&&(Nr.indexOf(o)<0&&Nr.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(Pc):l.addEventListener("change",Pc)));return u&&i(o,function(h){return o.add(null,h)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),$a={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return hp(i)})},timeline:function(t){return new En(t)},getTweensOf:function(t,e){return we.getTweensOf(t,e)},getProperty:function(t,e,n,i){$e(t)&&(t=ti(t)[0]);var s=Lr(t||{}).get,o=n?jd:Jd;return n==="native"&&(n=""),t&&(e?o((On[e]&&On[e].get||s)(t,e,n,i)):function(a,l,c){return o((On[a]&&On[a].get||s)(t,a,l,c))})},quickSetter:function(t,e,n){if(t=ti(t),t.length>1){var i=t.map(function(u){return Pn.quickSetter(u,e,n)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}t=t[0]||{};var o=On[e],a=Lr(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(u){var h=new o;gs._pt=0,h.init(t,n?u+n:u,gs,0,[t]),h.render(1,h),gs._pt&&Su(1,gs)}:a.set(t,l);return o?c:function(u){return c(t,l,n?u+n:u,a,1)}},quickTo:function(t,e,n){var i,s=Pn.to(t,Xn((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(e,l,c,u)};return o.tween=s,o},isTweening:function(t){return we.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Ur(t.ease,To.ease)),df(To,t||{})},config:function(t){return df(Vn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,o=t.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!On[a]&&!Wn[a]&&bo(e+" effect requires "+a+" plugin.")}),Jl[e]=function(a,l,c){return n(ti(a),Xn(l||{},s),c)},o&&(En.prototype[e]=function(a,l,c){return this.add(Jl[e](a,xi(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){se[t]=Ur(e)},parseEase:function(t,e){return arguments.length?Ur(t,e):se},getById:function(t){return we.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new En(t),i,s;for(n.smoothChildTiming=wn(t.smoothChildTiming),we.remove(n),n._dp=0,n._time=n._tTime=we._time,i=we._first;i;)s=i._next,(e||!(!i._dur&&i instanceof Fe&&i.vars.onComplete===i._targets[0]))&&pi(n,i,i._start-i._delay),i=s;return pi(we,n,0),n},context:function(t,e){return t?new Tp(t,e):Ee},matchMedia:function(t){return new my(t)},matchMediaRefresh:function(){return Nr.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||Pc()},addEventListener:function(t,e){var n=Ca[t]||(Ca[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=Ca[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:YM,wrapYoyo:qM,distribute:sp,random:ap,snap:op,normalize:XM,getUnit:on,clamp:HM,splitColor:fp,toArray:ti,selector:Ac,mapRange:cp,pipe:VM,unitize:WM,interpolate:$M,shuffle:rp},install:Yd,effects:Jl,ticker:Bn,updateRoot:En.updateRoot,plugins:On,globalTimeline:we,core:{PropTween:Cn,globals:qd,Tween:Fe,Timeline:En,Animation:Ro,getCache:Lr,_removeLinkedListItem:ll,reverting:function(){return Qe},context:function(t){return t&&Ee&&(Ee.data.push(t),t._ctx=Ee),Ee},suppressOverwrites:function(t){return au=t}}};An("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return $a[r]=Fe[r]});Bn.add(En.updateRoot);gs=$a.to({},{duration:0});var gy=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},_y=function(t,e){var n=t._targets,i,s,o;for(i in e)for(s=n.length;s--;)o=t._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=gy(o,i)),o&&o.modifier&&o.modifier(e[i],t,n[s],i))},nc=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if($e(s)&&(l={},An(s,function(u){return l[u]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}_y(a,s)}}}},Pn=$a.registerPlugin({name:"attr",init:function(t,e,n,i,s){var o,a,l;this.tween=n;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)Qe?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},nc("roundProps",Cc),nc("modifiers"),nc("snap",op))||$a;Fe.version=En.version=Pn.version="3.15.0";Xd=1;cu()&&Ns();se.Power0;se.Power1;se.Power2;se.Power3;se.Power4;se.Linear;se.Quad;se.Cubic;se.Quart;se.Quint;se.Strong;se.Elastic;se.Back;se.SteppedEase;se.Bounce;se.Sine;se.Expo;se.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var xf,Ki,Ss,Mu,wr,Sf,yu,vy=function(){return typeof window<"u"},Fi={},Mr=180/Math.PI,Ms=Math.PI/180,ss=Math.atan2,Mf=1e8,Eu=/([A-Z])/g,xy=/(left|right|width|margin|padding|x)/i,Sy=/[\s,\(]\S/,gi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Lc=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},My=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},yy=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},Ey=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},Ty=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},bp=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},wp=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},by=function(t,e,n){return t.style[e]=n},wy=function(t,e,n){return t.style.setProperty(e,n)},Ay=function(t,e,n){return t._gsap[e]=n},Cy=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},Ry=function(t,e,n,i,s){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},Py=function(t,e,n,i,s){var o=t._gsap;o[e]=n,o.renderTransform(s,o)},Ae="transform",Rn=Ae+"Origin",Ly=function r(t,e){var n=this,i=this.target,s=i.style,o=i._gsap;if(t in Fi&&s){if(this.tfm=this.tfm||{},t!=="transform")t=gi[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=Ai(i,a)}):this.tfm[t]=o.x?o[t]:Ai(i,t),t===Rn&&(this.tfm.zOrigin=o.zOrigin);else return gi.transform.split(",").forEach(function(a){return r.call(n,a,e)});if(this.props.indexOf(Ae)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Rn,e,"")),t=Ae}(s||e)&&this.props.push(t,e,s[t])},Ap=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},Dy=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,o;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(Eu,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=yu(),(!s||!s.isStart)&&!n[Ae]&&(Ap(n),i.zOrigin&&n[Rn]&&(n[Rn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Cp=function(t,e){var n={target:t,props:[],revert:Dy,save:Ly};return t._gsap||Pn.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},Rp,Dc=function(t,e){var n=Ki.createElementNS?Ki.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Ki.createElement(t);return n&&n.style?n:Ki.createElement(t)},Gn=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(Eu,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,Is(e)||e,1)||""},yf="O,Moz,ms,Ms,Webkit".split(","),Is=function(t,e,n){var i=e||wr,s=i.style,o=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(yf[o]+t in s););return o<0?null:(o===3?"ms":o>=0?yf[o]:"")+t},Uc=function(){vy()&&window.document&&(xf=window,Ki=xf.document,Ss=Ki.documentElement,wr=Dc("div")||{style:{}},Dc("div"),Ae=Is(Ae),Rn=Ae+"Origin",wr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Rp=!!Is("perspective"),yu=Pn.core.reverting,Mu=1)},Ef=function(t){var e=t.ownerSVGElement,n=Dc("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Ss.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Ss.removeChild(n),s},Tf=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},Pp=function(t){var e,n;try{e=t.getBBox()}catch{e=Ef(t),n=1}return e&&(e.width||e.height)||n||(e=Ef(t)),e&&!e.width&&!e.x&&!e.y?{x:+Tf(t,["x","cx","x1"])||0,y:+Tf(t,["y","cy","y1"])||0,width:0,height:0}:e},Lp=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Pp(t))},ar=function(t,e){if(e){var n=t.style,i;e in Fi&&e!==Rn&&(e=Ae),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(Eu,"-$1").toLowerCase())):n.removeAttribute(e)}},Zi=function(t,e,n,i,s,o){var a=new Cn(t._pt,e,n,0,1,o?wp:bp);return t._pt=a,a.b=i,a.e=s,t._props.push(n),a},bf={deg:1,rad:1,turn:1},Uy={grid:1,flex:1},lr=function r(t,e,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=wr.style,l=xy.test(e),c=t.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,f=i==="px",d=i==="%",_,g,p,m;if(i===o||!s||bf[i]||bf[o])return s;if(o!=="px"&&!f&&(s=r(t,e,n,"px")),m=t.getCTM&&Lp(t),(d||o==="%")&&(Fi[e]||~e.indexOf("adius")))return _=m?t.getBBox()[l?"width":"height"]:t[u],Le(d?s/_*h:s/100*_);if(a[l?"width":"height"]=h+(f?o:i),g=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,m&&(g=(t.ownerSVGElement||{}).parentNode),(!g||g===Ki||!g.appendChild)&&(g=Ki.body),p=g._gsap,p&&d&&p.width&&l&&p.time===Bn.time&&!p.uncache)return Le(s/p.width*h);if(d&&(e==="height"||e==="width")){var M=t.style[e];t.style[e]=h+i,_=t[u],M?t.style[e]=M:ar(t,e)}else(d||o==="%")&&!Uy[Gn(g,"display")]&&(a.position=Gn(t,"position")),g===t&&(a.position="static"),g.appendChild(wr),_=wr[u],g.removeChild(wr),a.position="absolute";return l&&d&&(p=Lr(g),p.time=Bn.time,p.width=g[u]),Le(f?_*s/h:_&&s?h/_*s:0)},Ai=function(t,e,n,i){var s;return Mu||Uc(),e in gi&&e!=="transform"&&(e=gi[e],~e.indexOf(",")&&(e=e.split(",")[0])),Fi[e]&&e!=="transform"?(s=Lo(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:Za(Gn(t,Rn))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Ka[e]&&Ka[e](t,e,n)||Gn(t,e)||Kd(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?lr(t,e,s,n)+n:s},Ny=function(t,e,n,i){if(!n||n==="none"){var s=Is(e,t,1),o=s&&Gn(t,s,1);o&&o!==n?(e=s,n=o):e==="borderColor"&&(n=Gn(t,"borderTopColor"))}var a=new Cn(this._pt,t.style,e,0,1,yp),l=0,c=0,u,h,f,d,_,g,p,m,M,v,x,A;if(a.b=n,a.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=Gn(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(g=t.style[e],t.style[e]=i,i=Gn(t,e)||i,g?t.style[e]=g:ar(t,e)),u=[n,i],pp(u),n=u[0],i=u[1],f=n.match(ms)||[],A=i.match(ms)||[],A.length){for(;h=ms.exec(i);)p=h[0],M=i.substring(l,h.index),_?_=(_+1)%5:(M.substr(-5)==="rgba("||M.substr(-5)==="hsla(")&&(_=1),p!==(g=f[c++]||"")&&(d=parseFloat(g)||0,x=g.substr((d+"").length),p.charAt(1)==="="&&(p=xs(d,p)+x),m=parseFloat(p),v=p.substr((m+"").length),l=ms.lastIndex-v.length,v||(v=v||Vn.units[e]||x,l===i.length&&(i+=v,a.e+=v)),x!==v&&(d=lr(t,e,g,v)||0),a._pt={_next:a._pt,p:M||c===1?M:",",s:d,c:m-d,m:_&&_<4||e==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=e==="display"&&i==="none"?wp:bp;return Wd.test(i)&&(a.e=0),this._pt=a,a},wf={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Iy=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=wf[n]||n,e[1]=wf[i]||i,e.join(" ")},Oy=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Fi[a]&&(l=1,a=a==="transformOrigin"?Rn:Ae),ar(n,a);l&&(ar(n,Ae),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Lo(n,1),o.uncache=1,Ap(i)))}},Ka={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var o=t._pt=new Cn(t._pt,e,n,0,0,Oy);return o.u=i,o.pr=-10,o.tween=s,t._props.push(n),1}}},Po=[1,0,0,1,0,0],Dp={},Up=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},Af=function(t){var e=Gn(t,Ae);return Up(e)?Po:e.substr(7).match(Vd).map(Le)},Tu=function(t,e){var n=t._gsap||Lr(t),i=t.style,s=Af(t),o,a,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Po:s):(s===Po&&!t.offsetParent&&t!==Ss&&!n.svg&&(l=i.display,i.display="block",o=t.parentNode,(!o||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,a=t.nextElementSibling,Ss.appendChild(t)),s=Af(t),l?i.display=l:ar(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):Ss.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Nc=function(t,e,n,i,s,o){var a=t._gsap,l=s||Tu(t,!0),c=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,f=a.yOffset||0,d=l[0],_=l[1],g=l[2],p=l[3],m=l[4],M=l[5],v=e.split(" "),x=parseFloat(v[0])||0,A=parseFloat(v[1])||0,w,E,D,S;n?l!==Po&&(E=d*p-_*g)&&(D=x*(p/E)+A*(-g/E)+(g*M-p*m)/E,S=x*(-_/E)+A*(d/E)-(d*M-_*m)/E,x=D,A=S):(w=Pp(t),x=w.x+(~v[0].indexOf("%")?x/100*w.width:x),A=w.y+(~(v[1]||v[0]).indexOf("%")?A/100*w.height:A)),i||i!==!1&&a.smooth?(m=x-c,M=A-u,a.xOffset=h+(m*d+M*g)-m,a.yOffset=f+(m*_+M*p)-M):a.xOffset=a.yOffset=0,a.xOrigin=x,a.yOrigin=A,a.smooth=!!i,a.origin=e,a.originIsAbsolute=!!n,t.style[Rn]="0px 0px",o&&(Zi(o,a,"xOrigin",c,x),Zi(o,a,"yOrigin",u,A),Zi(o,a,"xOffset",h,a.xOffset),Zi(o,a,"yOffset",f,a.yOffset)),t.setAttribute("data-svg-origin",x+" "+A)},Lo=function(t,e){var n=t._gsap||new gp(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=Gn(t,Rn)||"0",u,h,f,d,_,g,p,m,M,v,x,A,w,E,D,S,y,F,N,K,L,O,k,X,Y,$,R,J,nt,q,Z,st;return u=h=f=g=p=m=M=v=x=0,d=_=1,n.svg=!!(t.getCTM&&Lp(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Ae]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ae]!=="none"?l[Ae]:"")),i.scale=i.rotate=i.translate="none"),E=Tu(t,n.svg),n.svg&&(n.uncache?(Y=t.getBBox(),c=n.xOrigin-Y.x+"px "+(n.yOrigin-Y.y)+"px",X=""):X=!e&&t.getAttribute("data-svg-origin"),Nc(t,X||c,!!X||n.originIsAbsolute,n.smooth!==!1,E)),A=n.xOrigin||0,w=n.yOrigin||0,E!==Po&&(F=E[0],N=E[1],K=E[2],L=E[3],u=O=E[4],h=k=E[5],E.length===6?(d=Math.sqrt(F*F+N*N),_=Math.sqrt(L*L+K*K),g=F||N?ss(N,F)*Mr:0,M=K||L?ss(K,L)*Mr+g:0,M&&(_*=Math.abs(Math.cos(M*Ms))),n.svg&&(u-=A-(A*F+w*K),h-=w-(A*N+w*L))):(st=E[6],q=E[7],R=E[8],J=E[9],nt=E[10],Z=E[11],u=E[12],h=E[13],f=E[14],D=ss(st,nt),p=D*Mr,D&&(S=Math.cos(-D),y=Math.sin(-D),X=O*S+R*y,Y=k*S+J*y,$=st*S+nt*y,R=O*-y+R*S,J=k*-y+J*S,nt=st*-y+nt*S,Z=q*-y+Z*S,O=X,k=Y,st=$),D=ss(-K,nt),m=D*Mr,D&&(S=Math.cos(-D),y=Math.sin(-D),X=F*S-R*y,Y=N*S-J*y,$=K*S-nt*y,Z=L*y+Z*S,F=X,N=Y,K=$),D=ss(N,F),g=D*Mr,D&&(S=Math.cos(D),y=Math.sin(D),X=F*S+N*y,Y=O*S+k*y,N=N*S-F*y,k=k*S-O*y,F=X,O=Y),p&&Math.abs(p)+Math.abs(g)>359.9&&(p=g=0,m=180-m),d=Le(Math.sqrt(F*F+N*N+K*K)),_=Le(Math.sqrt(k*k+st*st)),D=ss(O,k),M=Math.abs(D)>2e-4?D*Mr:0,x=Z?1/(Z<0?-Z:Z):0),n.svg&&(X=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!Up(Gn(t,Ae)),X&&t.setAttribute("transform",X))),Math.abs(M)>90&&Math.abs(M)<270&&(s?(d*=-1,M+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,M+=M<=0?180:-180)),e=e||n.uncache,n.x=u-((n.xPercent=u&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=h-((n.yPercent=h&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-h)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=Le(d),n.scaleY=Le(_),n.rotation=Le(g)+a,n.rotationX=Le(p)+a,n.rotationY=Le(m)+a,n.skewX=M+a,n.skewY=v+a,n.transformPerspective=x+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[Rn]=Za(c)),n.xOffset=n.yOffset=0,n.force3D=Vn.force3D,n.renderTransform=n.svg?zy:Rp?Np:Fy,n.uncache=0,n},Za=function(t){return(t=t.split(" "))[0]+" "+t[1]},ic=function(t,e,n){var i=on(e);return Le(parseFloat(e)+parseFloat(lr(t,"x",n+"px",i)))+i},Fy=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Np(t,e)},_r="0deg",qs="0px",vr=") ",Np=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,h=n.rotationX,f=n.skewX,d=n.skewY,_=n.scaleX,g=n.scaleY,p=n.transformPerspective,m=n.force3D,M=n.target,v=n.zOrigin,x="",A=m==="auto"&&t&&t!==1||m===!0;if(v&&(h!==_r||u!==_r)){var w=parseFloat(u)*Ms,E=Math.sin(w),D=Math.cos(w),S;w=parseFloat(h)*Ms,S=Math.cos(w),o=ic(M,o,E*S*-v),a=ic(M,a,-Math.sin(w)*-v),l=ic(M,l,D*S*-v+v)}p!==qs&&(x+="perspective("+p+vr),(i||s)&&(x+="translate("+i+"%, "+s+"%) "),(A||o!==qs||a!==qs||l!==qs)&&(x+=l!==qs||A?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+vr),c!==_r&&(x+="rotate("+c+vr),u!==_r&&(x+="rotateY("+u+vr),h!==_r&&(x+="rotateX("+h+vr),(f!==_r||d!==_r)&&(x+="skew("+f+", "+d+vr),(_!==1||g!==1)&&(x+="scale("+_+", "+g+vr),M.style[Ae]=x||"translate(0, 0)"},zy=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,h=n.scaleX,f=n.scaleY,d=n.target,_=n.xOrigin,g=n.yOrigin,p=n.xOffset,m=n.yOffset,M=n.forceCSS,v=parseFloat(o),x=parseFloat(a),A,w,E,D,S;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Ms,c*=Ms,A=Math.cos(l)*h,w=Math.sin(l)*h,E=Math.sin(l-c)*-f,D=Math.cos(l-c)*f,c&&(u*=Ms,S=Math.tan(c-u),S=Math.sqrt(1+S*S),E*=S,D*=S,u&&(S=Math.tan(u),S=Math.sqrt(1+S*S),A*=S,w*=S)),A=Le(A),w=Le(w),E=Le(E),D=Le(D)):(A=h,D=f,w=E=0),(v&&!~(o+"").indexOf("px")||x&&!~(a+"").indexOf("px"))&&(v=lr(d,"x",o,"px"),x=lr(d,"y",a,"px")),(_||g||p||m)&&(v=Le(v+_-(_*A+g*E)+p),x=Le(x+g-(_*w+g*D)+m)),(i||s)&&(S=d.getBBox(),v=Le(v+i/100*S.width),x=Le(x+s/100*S.height)),S="matrix("+A+","+w+","+E+","+D+","+v+","+x+")",d.setAttribute("transform",S),M&&(d.style[Ae]=S)},By=function(t,e,n,i,s){var o=360,a=$e(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Mr:1),c=l-i,u=i+c+"deg",h,f;return a&&(h=s.split("_")[1],h==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),h==="cw"&&c<0?c=(c+o*Mf)%o-~~(c/o)*o:h==="ccw"&&c>0&&(c=(c-o*Mf)%o-~~(c/o)*o)),t._pt=f=new Cn(t._pt,e,n,i,c,My),f.e=u,f.u="deg",t._props.push(n),f},Cf=function(t,e){for(var n in e)t[n]=e[n];return t},ky=function(t,e,n){var i=Cf({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,h,f,d,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Ae]=e,a=Lo(n,1),ar(n,Ae),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ae],o[Ae]=e,a=Lo(n,1),o[Ae]=c);for(l in Fi)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=on(c),_=on(u),h=d!==_?lr(n,l,c,_):parseFloat(c),f=parseFloat(u),t._pt=new Cn(t._pt,a,l,h,f-h,Lc),t._pt.u=_||0,t._props.push(l));Cf(a,i)};An("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",o=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(a){return t<2?r+a:"border"+a+r});Ka[t>1?"border"+r:r]=function(a,l,c,u,h){var f,d;if(arguments.length<4)return f=o.map(function(_){return Ai(a,_,c)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(u+"").split(" "),d={},o.forEach(function(_,g){return d[_]=f[g]=f[g]||f[(g-1)/2|0]}),a.init(l,d,h)}});var Ip={name:"css",register:Uc,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var o=this._props,a=t.style,l=n.vars.startAt,c,u,h,f,d,_,g,p,m,M,v,x,A,w,E,D,S;Mu||Uc(),this.styles=this.styles||Cp(t),D=this.styles.props,this.tween=n;for(g in e)if(g!=="autoRound"&&(u=e[g],!(On[g]&&_p(g,e,n,i,t,s)))){if(d=typeof u,_=Ka[g],d==="function"&&(u=u.call(n,i,t,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=Ao(u)),_)_(this,t,g,u,n)&&(E=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(g)+"").trim(),u+="",ir.lastIndex=0,ir.test(c)||(p=on(c),m=on(u),m?p!==m&&(c=lr(t,g,c,m)+m):p&&(u+=p)),this.add(a,"setProperty",c,u,i,s,0,0,g),o.push(g),D.push(g,0,a[g]);else if(d!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,t,s):l[g],$e(c)&&~c.indexOf("random(")&&(c=Ao(c)),on(c+"")||c==="auto"||(c+=Vn.units[g]||on(Ai(t,g))||""),(c+"").charAt(1)==="="&&(c=Ai(t,g))):c=Ai(t,g),f=parseFloat(c),M=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),M&&(u=u.substr(2)),h=parseFloat(u),g in gi&&(g==="autoAlpha"&&(f===1&&Ai(t,"visibility")==="hidden"&&h&&(f=0),D.push("visibility",0,a.visibility),Zi(this,a,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),g!=="scale"&&g!=="transform"&&(g=gi[g],~g.indexOf(",")&&(g=g.split(",")[0]))),v=g in Fi,v){if(this.styles.save(g),S=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=Gn(t,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var y=t.style.perspective;t.style.perspective=u,u=Gn(t,"perspective"),y?t.style.perspective=y:ar(t,"perspective")}h=parseFloat(u)}if(x||(A=t._gsap,A.renderTransform&&!e.parseTransform||Lo(t,e.parseTransform),w=e.smoothOrigin!==!1&&A.smooth,x=this._pt=new Cn(this._pt,a,Ae,0,1,A.renderTransform,A,0,-1),x.dep=1),g==="scale")this._pt=new Cn(this._pt,A,"scaleY",A.scaleY,(M?xs(A.scaleY,M+h):h)-A.scaleY||0,Lc),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){D.push(Rn,0,a[Rn]),u=Iy(u),A.svg?Nc(t,u,0,w,0,this):(m=parseFloat(u.split(" ")[2])||0,m!==A.zOrigin&&Zi(this,A,"zOrigin",A.zOrigin,m),Zi(this,a,g,Za(c),Za(u)));continue}else if(g==="svgOrigin"){Nc(t,u,1,w,0,this);continue}else if(g in Dp){By(this,A,g,f,M?xs(f,M+u):u);continue}else if(g==="smoothOrigin"){Zi(this,A,"smooth",A.smooth,u);continue}else if(g==="force3D"){A[g]=u;continue}else if(g==="transform"){ky(this,u,t);continue}}else g in a||(g=Is(g)||g);if(v||(h||h===0)&&(f||f===0)&&!Sy.test(u)&&g in a)p=(c+"").substr((f+"").length),h||(h=0),m=on(u)||(g in Vn.units?Vn.units[g]:p),p!==m&&(f=lr(t,g,c,m)),this._pt=new Cn(this._pt,v?A:a,g,f,(M?xs(f,M+h):h)-f,!v&&(m==="px"||g==="zIndex")&&e.autoRound!==!1?Ty:Lc),this._pt.u=m||0,v&&S!==u?(this._pt.b=c,this._pt.e=S,this._pt.r=Ey):p!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=yy);else if(g in a)Ny.call(this,t,g,c,M?M+u:u);else if(g in t)this.add(t,g,c||t[g],M?M+u:u,i,s);else if(g!=="parseTransform"){hu(g,u);continue}v||(g in a?D.push(g,0,a[g]):typeof t[g]=="function"?D.push(g,2,t[g]()):D.push(g,1,c||t[g])),o.push(g)}}E&&Ep(this)},render:function(t,e){if(e.tween._time||!yu())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Ai,aliases:gi,getSetter:function(t,e,n){var i=gi[e];return i&&i.indexOf(",")<0&&(e=i),e in Fi&&e!==Rn&&(t._gsap.x||Ai(t,"x"))?n&&Sf===n?e==="scale"?Cy:Ay:(Sf=n||{})&&(e==="scale"?Ry:Py):t.style&&!lu(t.style[e])?by:~e.indexOf("-")?wy:xu(t,e)},core:{_removeProperty:ar,_getMatrix:Tu}};Pn.utils.checkPrefix=Is;Pn.core.getStyleSaver=Cp;(function(r,t,e,n){var i=An(r+","+t+","+e,function(s){Fi[s]=1});An(t,function(s){Vn.units[s]="deg",Dp[s]=1}),gi[i[13]]=r+","+t,An(n,function(s){var o=s.split(":");gi[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");An("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Vn.units[r]="px"});Pn.registerPlugin(Ip);var cn=Pn.registerPlugin(Ip)||Pn;cn.core.Tween;class Hy{constructor(t){this.onComplete=t,this.container=document.querySelector("#preloader"),this.percentEl=document.querySelector("#preloader-percent"),this.barEl=document.querySelector("#preloader-bar"),this.statusEl=document.querySelector("#preloader-status"),this.startLoading()}startLoading(){const t=["KHỞI TẠO KHÔNG GIAN DI SẢN HUẾ...","TÍNH TOÁN ĐƯỜNG BAY HOÀNG THÀNH...","TỔNG HỢP MẶT SÓNG SÔNG HƯƠNG...","HỘI TỤ ĐÊM HOA ĐĂNG THIÊN MỤ...","MÔ PHỎNG SƯƠNG MÙ LĂNG TẨM CỐ ĐÔ...","SẴN SÀNG CẤT CÁNH KHÁM PHÁ CỐ ĐÔ"];let e={value:0};cn.to(e,{value:100,duration:2.2,ease:"power2.inOut",onUpdate:()=>{const n=Math.round(e.value);if(this.percentEl&&(this.percentEl.textContent=`${n.toString().padStart(2,"0")}%`),this.barEl&&(this.barEl.style.width=`${n}%`),this.statusEl){const i=Math.min(Math.floor(n/100*t.length),t.length-1);this.statusEl.textContent=t[i]}},onComplete:()=>{this.revealHero()}})}revealHero(){const t=cn.timeline({onComplete:()=>{this.container&&(this.container.style.display="none"),typeof this.onComplete=="function"&&this.onComplete()}});t.to(this.container,{opacity:0,clipPath:"circle(0% at 50% 50%)",duration:1.2,ease:"expo.inOut"}),t.fromTo(".hero-title .char",{y:80,opacity:0,rotateX:-45},{y:0,opacity:1,rotateX:0,duration:1.4,stagger:.03,ease:"power4.out"},"-=0.6"),t.fromTo([".hero-subtitle",".flight-hud",".scroll-prompt"],{opacity:0,y:30},{opacity:1,y:0,duration:1,stagger:.15,ease:"power3.out"},"-=0.8")}}class Gy{constructor(){Bo()||(this.cursor=document.querySelector("#custom-cursor"),this.follower=document.querySelector("#cursor-follower"),this.badge=document.querySelector("#cursor-badge"),!(!this.cursor||!this.follower)&&(this.pos={x:window.innerWidth/2,y:window.innerHeight/2},this.target={x:this.pos.x,y:this.pos.y},this.initEvents(),this.render()))}initEvents(){window.addEventListener("mousemove",e=>{this.target.x=e.clientX,this.target.y=e.clientY,cn.set(this.cursor,{x:e.clientX,y:e.clientY})}),document.querySelectorAll("a, button, [data-cursor]").forEach(e=>{e.addEventListener("mouseenter",()=>{this.follower.classList.add("is-hovering");const n=e.getAttribute("data-cursor");n&&this.badge&&(this.badge.textContent=n,this.follower.classList.add("has-badge"))}),e.addEventListener("mouseleave",()=>{this.follower.classList.remove("is-hovering","has-badge"),this.badge&&(this.badge.textContent="")})})}render(){const t=()=>{this.pos.x+=(this.target.x-this.pos.x)*.15,this.pos.y+=(this.target.y-this.pos.y)*.15,cn.set(this.follower,{x:this.pos.x,y:this.pos.y}),requestAnimationFrame(t)};t()}}var Rf="1.3.27";function Op(r,t,e){return Math.max(r,Math.min(t,e))}function Vy(r,t,e){return(1-e)*r+e*t}function Wy(r,t,e,n){return Vy(r,t,1-Math.exp(-e*n))}function Xy(r,t){return(r%t+t)%t}var Yy=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(r){if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=r;const e=Op(0,this.currentTime/this.duration,1);t=e>=1;const n=t?1:this.easing(e);this.value=this.from+(this.to-this.from)*n}else this.lerp?(this.value=Wy(this.value,this.to,this.lerp*60,r),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),this.onUpdate?.(this.value,t)}stop(){this.isRunning=!1}fromTo(r,t,{lerp:e,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=t,this.lerp=e,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s?.(),this.onUpdate=o}};function qy(r,t){let e;return function(...n){clearTimeout(e),e=setTimeout(()=>{e=void 0,r.apply(this,n)},t)}}var $y=class{width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;constructor(r,t,{autoResize:e=!0,debounce:n=250}={}){this.wrapper=r,this.content=t,e&&(this.debouncedResize=qy(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Fp=class{events={};emit(r,...t){const e=this.events[r]||[];for(let n=0,i=e.length;n<i;n++)e[n]?.(...t)}on(r,t){return this.events[r]?this.events[r].push(t):this.events[r]=[t],()=>{this.events[r]=this.events[r]?.filter(e=>t!==e)}}off(r,t){this.events[r]=this.events[r]?.filter(e=>t!==e)}destroy(){this.events={}}};const Ky=100/6,Wi={passive:!1};function Pf(r,t){return r===1?Ky:r===2?t:1}var Zy=class{touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new Fp;constructor(r,t={wheelMultiplier:1,touchMultiplier:1}){this.element=r,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Wi),this.element.addEventListener("touchstart",this.onTouchStart,Wi),this.element.addEventListener("touchmove",this.onTouchMove,Wi),this.element.addEventListener("touchend",this.onTouchEnd,Wi)}on(r,t){return this.emitter.on(r,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Wi),this.element.removeEventListener("touchstart",this.onTouchStart,Wi),this.element.removeEventListener("touchmove",this.onTouchMove,Wi),this.element.removeEventListener("touchend",this.onTouchEnd,Wi)}onTouchStart=r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})};onTouchMove=r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r,n=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})};onTouchEnd=r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})};onWheel=r=>{let{deltaX:t,deltaY:e,deltaMode:n}=r;const i=Pf(n,this.window.width),s=Pf(n,this.window.height);t*=i,e*=s,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:r})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}};const Lf=r=>Math.min(1,1.001-2**(-10*r));var Jy=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;_rafId=null;_isDraggingSelection=!1;reducedMotionMediaQuery=window.matchMedia("(prefers-reduced-motion: reduce)");isTouching;isIos;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new Yy;emitter=new Fp;dimensions;virtualScroll;constructor({wrapper:r=window,content:t=document.documentElement,eventsTarget:e=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:h="vertical",gestureOrientation:f=h==="horizontal"?"both":"vertical",touchMultiplier:d=1,wheelMultiplier:_=1,autoResize:g=!0,prevent:p,virtualScroll:m,overscroll:M=!0,autoRaf:v=!1,anchors:x=!1,autoToggle:A=!1,allowNestedScroll:w=!1,__experimental__naiveDimensions:E=!1,naiveDimensions:D=E,stopInertiaOnNavigate:S=!1,respectReducedMotion:y=!0}={}){window.lenisVersion=Rf,window.lenis||(window.lenis={}),window.lenis.version=Rf,h==="horizontal"&&(window.lenis.horizontal=!0),i===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!r||r===document.documentElement)&&(r=window),typeof a=="number"&&typeof l!="function"?l=Lf:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:r,content:t,eventsTarget:e,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:h,touchMultiplier:d,wheelMultiplier:_,autoResize:g,prevent:p,virtualScroll:m,overscroll:M,autoRaf:v,anchors:x,autoToggle:A,allowNestedScroll:w,naiveDimensions:D,stopInertiaOnNavigate:S,respectReducedMotion:y},this.dimensions=new $y(r,t,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new Zy(e,{touchMultiplier:d,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(r,t){return this.emitter.on(r,t)}off(r,t){return this.emitter.off(r,t)}onScrollEnd=r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};get overflow(){const r=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[r]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}onTransitionEnd=r=>{r.propertyName?.includes("overflow")&&r.target===this.rootElement&&this.checkOverflow()};setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}onClick=r=>{const t=r.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),e=new URL(window.location.href);if(this.options.anchors){const n=t.find(i=>e.host===i.host&&e.pathname===i.pathname&&i.hash);if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=decodeURIComponent(n.hash);this.scrollTo(s,i);return}}if(this.options.stopInertiaOnNavigate&&t.some(n=>e.host===n.host&&e.pathname!==n.pathname)){this.reset();return}};onPointerDown=r=>{r.button===1&&this.reset()};isTouchOnSelectionHandle(r){const t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;const e=r.targetTouches[0]??r.changedTouches[0];if(!e)return!1;const n=t.getRangeAt(0).getClientRects();if(n.length===0)return!1;const i=n[0],s=n[n.length-1],o=40,a=Math.hypot(e.clientX-i.left,e.clientY-i.top)<=o,l=Math.hypot(e.clientX-s.right,e.clientY-s.bottom)<=o;return a||l}onVirtualScroll=r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:t,deltaY:e,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");if(i&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=t===0&&e===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const a=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(o||a)return;let l=n.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,u=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(l.find(_=>_ instanceof HTMLElement&&(typeof c=="function"&&c?.(_)||_.hasAttribute?.("data-lenis-prevent")||u==="vertical"&&_.hasAttribute?.("data-lenis-prevent-vertical")||u==="horizontal"&&_.hasAttribute?.("data-lenis-prevent-horizontal")||i&&_.hasAttribute?.("data-lenis-prevent-touch")||s&&_.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.hasNestedScroll(_,{deltaX:t,deltaY:e}))))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let h=e;this.options.gestureOrientation==="both"?h=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(h=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const f=i&&this.options.syncTouch,d=i&&n.type==="touchend";d&&(h=Math.sign(h)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+h,{programmatic:!1,...f?{lerp:d?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=r=>{const t=r-(this.time||r);this.time=r,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))};scrollTo(r,{offset:t=0,immediate:e=!1,lock:n=!1,programmatic:i=!0,lerp:s=i?this.options.lerp:void 0,duration:o=i?this.options.duration:void 0,easing:a=i?this.options.easing:void 0,onStart:l,onComplete:c,force:u=!1,userData:h}={}){if(this.prefersReducedMotion&&(i?e=!0:(s=1,o=void 0,a=void 0)),(this.isStopped||this.isLocked)&&!u)return;let f=r,d=t;if(typeof f=="string"&&["top","left","start","#"].includes(f))f=0;else if(typeof f=="string"&&["bottom","right","end"].includes(f))f=this.limit;else{let _=null;if(typeof f=="string"?(_=f.startsWith("#")?document.getElementById(f.slice(1)):document.querySelector(f),_||(f==="#top"?f=0:console.warn("Lenis: Target not found",f))):f instanceof Element&&(_=f),_){if(this.options.wrapper!==window){const x=this.rootElement.getBoundingClientRect();d-=this.isHorizontal?x.left:x.top}const g=_.getBoundingClientRect(),p=getComputedStyle(_),m=this.isHorizontal?Number.parseFloat(p.scrollMarginLeft):Number.parseFloat(p.scrollMarginTop),M=getComputedStyle(this.rootElement),v=this.isHorizontal?Number.parseFloat(M.scrollPaddingLeft):Number.parseFloat(M.scrollPaddingTop);f=(this.isHorizontal?g.left:g.top)+this.animatedScroll-(Number.isNaN(m)?0:m)-(Number.isNaN(v)?0:v)}}if(typeof f=="number"){if(f+=d,this.options.infinite){if(i){this.targetScroll=this.animatedScroll=this.scroll;const _=f-this.animatedScroll;_>this.limit/2?f-=this.limit:_<-this.limit/2&&(f+=this.limit)}}else f=Op(0,f,this.limit);if(f===this.targetScroll){l?.(this),c?.(this);return}if(this.userData=h??{},e){this.animatedScroll=this.targetScroll=f,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}i||(this.targetScroll=f),typeof o=="number"&&typeof a!="function"?a=Lf:typeof a=="function"&&typeof o!="number"&&(o=1),this.animate.fromTo(this.animatedScroll,f,{duration:o,easing:a,lerp:s,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",l?.(this)},onUpdate:(_,g)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=_-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=_,this.setScroll(this.scroll),i&&(this.targetScroll=_),g||this.emit(),g&&(this.reset(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(r,{deltaX:t,deltaY:e}){const n=Date.now();r._lenis||(r._lenis={});const i=r._lenis;let s,o,a,l,c,u,h,f,d,_;if(n-(i.time??0)>2e3){i.time=Date.now();const w=window.getComputedStyle(r);if(i.computedStyle=w,s=["auto","overlay","scroll"].includes(w.overflowX),o=["auto","overlay","scroll"].includes(w.overflowY),c=["auto"].includes(w.overscrollBehaviorX),u=["auto"].includes(w.overscrollBehaviorY),i.hasOverflowX=s,i.hasOverflowY=o,!(s||o))return!1;h=r.scrollWidth,f=r.scrollHeight,d=r.clientWidth,_=r.clientHeight,a=h>d,l=f>_,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=h,i.scrollHeight=f,i.clientWidth=d,i.clientHeight=_,i.hasOverscrollBehaviorX=c,i.hasOverscrollBehaviorY=u}else a=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,o=i.hasOverflowY,h=i.scrollWidth,f=i.scrollHeight,d=i.clientWidth,_=i.clientHeight,c=i.hasOverscrollBehaviorX,u=i.hasOverscrollBehaviorY;if(!(s&&a||o&&l))return!1;const g=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";let p,m,M,v,x,A;if(g==="horizontal")p=Math.round(r.scrollLeft),m=h-d,M=t,v=s,x=a,A=c;else if(g==="vertical")p=Math.round(r.scrollTop),m=f-_,M=e,v=o,x=l,A=u;else return!1;return!A&&(p>=m||p<=0)?!0:(M>0?p<m:p>0)&&v&&x}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?Xy(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(r=>{this.rootElement.classList.add(r)})}cleanUpClassName(){for(const r of Array.from(this.rootElement.classList))(r==="lenis"||r.startsWith("lenis-"))&&this.rootElement.classList.remove(r)}};function jy(r,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Qy(r,t,e){return t&&jy(r.prototype,t),r}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var je,Ra,kn,Ji,ji,ys,zp,yr,Es,Bp,Pi,si,kp,Hp=function(){return je||typeof window<"u"&&(je=window.gsap)&&je.registerPlugin&&je},Gp=1,_s=[],ie=[],vi=[],ho=Date.now,Ic=function(t,e){return e},tE=function(){var t=Es.core,e=t.bridge||{},n=t._scrollers,i=t._proxies;n.push.apply(n,ie),i.push.apply(i,vi),ie=n,vi=i,Ic=function(o,a){return e[o](a)}},rr=function(t,e){return~vi.indexOf(t)&&vi[vi.indexOf(t)+1][e]},fo=function(t){return!!~Bp.indexOf(t)},pn=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:i!==!1,capture:!!s})},fn=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},da="scrollLeft",pa="scrollTop",Oc=function(){return Pi&&Pi.isPressed||ie.cache++},Ja=function(t,e){var n=function i(s){if(s||s===0){Gp&&(kn.history.scrollRestoration="manual");var o=Pi&&Pi.isPressed;s=i.v=Math.round(s)||(Pi&&Pi.iOS?1:0),t(s),i.cacheID=ie.cache,o&&Ic("ss",s)}else(e||ie.cache!==i.cacheID||Ic("ref"))&&(i.cacheID=ie.cache,i.v=t());return i.v+i.offset};return n.offset=0,t&&n},Sn={s:da,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Ja(function(r){return arguments.length?kn.scrollTo(r,He.sc()):kn.pageXOffset||Ji[da]||ji[da]||ys[da]||0})},He={s:pa,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Sn,sc:Ja(function(r){return arguments.length?kn.scrollTo(Sn.sc(),r):kn.pageYOffset||Ji[pa]||ji[pa]||ys[pa]||0})},yn=function(t,e){return(e&&e._ctx&&e._ctx.selector||je.utils.toArray)(t)[0]||(typeof t=="string"&&je.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},eE=function(t,e){for(var n=e.length;n--;)if(e[n]===t||e[n].contains(t))return!0;return!1},cr=function(t,e){var n=e.s,i=e.sc;fo(t)&&(t=Ji.scrollingElement||ji);var s=ie.indexOf(t),o=i===He.sc?1:2;!~s&&(s=ie.push(t)-1),ie[s+o]||pn(t,"scroll",Oc);var a=ie[s+o],l=a||(ie[s+o]=Ja(rr(t,n),!0)||(fo(t)?i:Ja(function(c){return arguments.length?t[n]=c:t[n]})));return l.target=t,a||(l.smooth=je.getProperty(t,"scrollBehavior")==="smooth"),l},Fc=function(t,e,n){var i=t,s=t,o=ho(),a=o,l=e||50,c=Math.max(500,l*3),u=function(_,g){var p=ho();g||p-o>l?(s=i,i=_,a=o,o=p):n?i+=_:i=s+(_-s)/(p-a)*(o-a)},h=function(){s=i=n?0:i,a=o=0},f=function(_){var g=a,p=s,m=ho();return(_||_===0)&&_!==i&&u(_),o===a||m-a>c?0:(i+(n?p:-p))/((n?m:o)-g)*1e3};return{update:u,reset:h,getVelocity:f}},$s=function(t,e){return e&&!t._gsapAllow&&t.cancelable!==!1&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},Df=function(t){var e=Math.max.apply(Math,t),n=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(n)?e:n},Vp=function(){Es=je.core.globals().ScrollTrigger,Es&&Es.core&&tE()},Wp=function(t){return je=t||Hp(),!Ra&&je&&typeof document<"u"&&document.body&&(kn=window,Ji=document,ji=Ji.documentElement,ys=Ji.body,Bp=[kn,Ji,ji,ys],je.utils.clamp,kp=je.core.context||function(){},yr="onpointerenter"in ys?"pointer":"mouse",zp=Ue.isTouch=kn.matchMedia&&kn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in kn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,si=Ue.eventTypes=("ontouchstart"in ji?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in ji?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Gp=0},500),Ra=1),Es||Vp(),Ra};Sn.op=He;ie.cache=0;var Ue=function(){function r(e){this.init(e)}var t=r.prototype;return t.init=function(n){Ra||Wp(je)||console.warn("Please gsap.registerPlugin(Observer)"),Es||Vp();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,h=n.onStop,f=n.onStopDelay,d=n.ignore,_=n.wheelSpeed,g=n.event,p=n.onDragStart,m=n.onDragEnd,M=n.onDrag,v=n.onPress,x=n.onRelease,A=n.onRight,w=n.onLeft,E=n.onUp,D=n.onDown,S=n.onChangeX,y=n.onChangeY,F=n.onChange,N=n.onToggleX,K=n.onToggleY,L=n.onHover,O=n.onHoverEnd,k=n.onMove,X=n.ignoreCheck,Y=n.isNormalizer,$=n.onGestureStart,R=n.onGestureEnd,J=n.onWheel,nt=n.onEnable,q=n.onDisable,Z=n.onClick,st=n.scrollSpeed,gt=n.capture,dt=n.allowClicks,Pt=n.lockAxis,Lt=n.onLockAxis;this.target=a=yn(a)||ji,this.vars=n,d&&(d=je.utils.toArray(d)),i=i||1e-9,s=s||0,_=_||1,st=st||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(kn.getComputedStyle(ys).lineHeight)||22);var Nt,Vt,H,Wt,mt,Dt,_t,G=this,Bt=0,C=0,T=n.passive||!u&&n.passive!==!1,z=cr(a,Sn),tt=cr(a,He),Q=z(),et=tt(),pt=~o.indexOf("touch")&&!~o.indexOf("pointer")&&si[0]==="pointerdown",ut=fo(a),ct=a.ownerDocument||Ji,wt=[0,0,0],Gt=[0,0,0],j=0,oe=function(){return j=ho()},Ct=function(St,Rt){return(G.event=St)&&d&&eE(St.target,d)||Rt&&pt&&St.pointerType!=="touch"||X&&X(St,Rt)},Xt=function(){G._vx.reset(),G._vy.reset(),Vt.pause(),h&&h(G)},Tt=function(){var St=G.deltaX=Df(wt),Rt=G.deltaY=Df(Gt),it=Math.abs(St)>=i,zt=Math.abs(Rt)>=i;F&&(it||zt)&&F(G,St,Rt,wt,Gt),it&&(A&&G.deltaX>0&&A(G),w&&G.deltaX<0&&w(G),S&&S(G),N&&G.deltaX<0!=Bt<0&&N(G),Bt=G.deltaX,wt[0]=wt[1]=wt[2]=0),zt&&(D&&G.deltaY>0&&D(G),E&&G.deltaY<0&&E(G),y&&y(G),K&&G.deltaY<0!=C<0&&K(G),C=G.deltaY,Gt[0]=Gt[1]=Gt[2]=0),(Wt||H)&&(k&&k(G),H&&(p&&H===1&&p(G),M&&M(G),H=0),Wt=!1),Dt&&!(Dt=!1)&&Lt&&Lt(G),mt&&(J(G),mt=!1),Nt=0},vt=function(St,Rt,it){wt[it]+=St,Gt[it]+=Rt,G._vx.update(St),G._vy.update(Rt),c?Nt||(Nt=requestAnimationFrame(Tt)):Tt()},Yt=function(St,Rt){Pt&&!_t&&(G.axis=_t=Math.abs(St)>Math.abs(Rt)?"x":"y",Dt=!0),_t!=="y"&&(wt[2]+=St,G._vx.update(St,!0)),_t!=="x"&&(Gt[2]+=Rt,G._vy.update(Rt,!0)),c?Nt||(Nt=requestAnimationFrame(Tt)):Tt()},Qt=function(St){if(!Ct(St,1)){St=$s(St,u);var Rt=St.clientX,it=St.clientY,zt=Rt-G.x,It=it-G.y,$t=G.isDragging;G.x=Rt,G.y=it,($t||(zt||It)&&(Math.abs(G.startX-Rt)>=s||Math.abs(G.startY-it)>=s))&&(H||(H=$t?2:1),$t||(G.isDragging=!0),Yt(zt,It))}},le=G.onPress=function(bt){Ct(bt,1)||bt&&bt.button||(G.axis=_t=null,Vt.pause(),G.isPressed=!0,bt=$s(bt),Bt=C=0,G.startX=G.x=bt.clientX,G.startY=G.y=bt.clientY,G._vx.reset(),G._vy.reset(),pn(Y?a:ct,si[1],Qt,T,!0),G.deltaX=G.deltaY=0,v&&v(G))},ft=G.onRelease=function(bt){if(!Ct(bt,1)){fn(Y?a:ct,si[1],Qt,!0);var St=!isNaN(G.y-G.startY),Rt=G.isDragging,it=Rt&&(Math.abs(G.x-G.startX)>3||Math.abs(G.y-G.startY)>3),zt=$s(bt);!it&&St&&(G._vx.reset(),G._vy.reset(),u&&dt&&je.delayedCall(.08,function(){if(ho()-j>300&&!bt.defaultPrevented){if(bt.target.click)bt.target.click();else if(ct.createEvent){var It=ct.createEvent("MouseEvents");It.initMouseEvent("click",!0,!0,kn,1,zt.screenX,zt.screenY,zt.clientX,zt.clientY,!1,!1,!1,!1,0,null),bt.target.dispatchEvent(It)}}})),G.isDragging=G.isGesturing=G.isPressed=!1,h&&Rt&&!Y&&Vt.restart(!0),H&&Tt(),m&&Rt&&m(G),x&&x(G,it)}},rt=function(St){return St.touches&&St.touches.length>1&&(G.isGesturing=!0)&&$(St,G.isDragging)},U=function(){return(G.isGesturing=!1)||R(G)},ot=function(St){if(!Ct(St)){var Rt=z(),it=tt();vt((Rt-Q)*st,(it-et)*st,1),Q=Rt,et=it,h&&Vt.restart(!0)}},at=function(St){if(!Ct(St)){St=$s(St,u),J&&(mt=!0);var Rt=(St.deltaMode===1?l:St.deltaMode===2?kn.innerHeight:1)*_;vt(St.deltaX*Rt,St.deltaY*Rt,0),h&&!Y&&Vt.restart(!0)}},Ft=function(St){if(!Ct(St)){var Rt=St.clientX,it=St.clientY,zt=Rt-G.x,It=it-G.y;G.x=Rt,G.y=it,Wt=!0,h&&Vt.restart(!0),(zt||It)&&Yt(zt,It)}},Ut=function(St){G.event=St,L(G)},re=function(St){G.event=St,O(G)},ae=function(St){return Ct(St)||$s(St,u)&&Z(G)};Vt=G._dc=je.delayedCall(f||.25,Xt).pause(),G.deltaX=G.deltaY=0,G._vx=Fc(0,50,!0),G._vy=Fc(0,50,!0),G.scrollX=z,G.scrollY=tt,G.isDragging=G.isGesturing=G.isPressed=!1,kp(this),G.enable=function(bt){return G.isEnabled||(pn(ut?ct:a,"scroll",Oc),o.indexOf("scroll")>=0&&pn(ut?ct:a,"scroll",ot,T,gt),o.indexOf("wheel")>=0&&pn(a,"wheel",at,T,gt),(o.indexOf("touch")>=0&&zp||o.indexOf("pointer")>=0)&&(pn(a,si[0],le,T,gt),pn(ct,si[2],ft),pn(ct,si[3],ft),dt&&pn(a,"click",oe,!0,!0),Z&&pn(a,"click",ae),$&&pn(ct,"gesturestart",rt),R&&pn(ct,"gestureend",U),L&&pn(a,yr+"enter",Ut),O&&pn(a,yr+"leave",re),k&&pn(a,yr+"move",Ft)),G.isEnabled=!0,G.isDragging=G.isGesturing=G.isPressed=Wt=H=!1,G._vx.reset(),G._vy.reset(),Q=z(),et=tt(),bt&&bt.type&&le(bt),nt&&nt(G)),G},G.disable=function(){G.isEnabled&&(_s.filter(function(bt){return bt!==G&&fo(bt.target)}).length||fn(ut?ct:a,"scroll",Oc),G.isPressed&&(G._vx.reset(),G._vy.reset(),fn(Y?a:ct,si[1],Qt,!0)),fn(ut?ct:a,"scroll",ot,gt),fn(a,"wheel",at,gt),fn(a,si[0],le,gt),fn(ct,si[2],ft),fn(ct,si[3],ft),fn(a,"click",oe,!0),fn(a,"click",ae),fn(ct,"gesturestart",rt),fn(ct,"gestureend",U),fn(a,yr+"enter",Ut),fn(a,yr+"leave",re),fn(a,yr+"move",Ft),G.isEnabled=G.isPressed=G.isDragging=!1,q&&q(G))},G.kill=G.revert=function(){G.disable();var bt=_s.indexOf(G);bt>=0&&_s.splice(bt,1),Pi===G&&(Pi=0)},_s.push(G),Y&&fo(a)&&(Pi=G),G.enable(g)},Qy(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Ue.version="3.15.0";Ue.create=function(r){return new Ue(r)};Ue.register=Wp;Ue.getAll=function(){return _s.slice()};Ue.getById=function(r){return _s.filter(function(t){return t.vars.id===r})[0]};Hp()&&je.registerPlugin(Ue);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Mt,hs,ee,fe,zn,ce,bu,ja,Do,po,js,ma,rn,hl,zc,_n,Uf,Nf,fs,Xp,rc,Yp,gn,Bc,qp,$p,Xi,kc,wu,Ts,Au,mo,Hc,sc,ga=1,sn=Date.now,oc=sn(),ei=0,Qs=0,If=function(t,e,n){var i=In(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return n["_"+e+"Clamp"]=i,i?t.substr(6,t.length-7):t},Of=function(t,e){return e&&(!In(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},nE=function r(){return Qs&&requestAnimationFrame(r)},Ff=function(){return hl=1},zf=function(){return hl=0},hi=function(t){return t},to=function(t){return Math.round(t*1e5)/1e5||0},Kp=function(){return typeof window<"u"},Zp=function(){return Mt||Kp()&&(Mt=window.gsap)&&Mt.registerPlugin&&Mt},Br=function(t){return!!~bu.indexOf(t)},Jp=function(t){return(t==="Height"?Au:ee["inner"+t])||zn["client"+t]||ce["client"+t]},jp=function(t){return rr(t,"getBoundingClientRect")||(Br(t)?function(){return Na.width=ee.innerWidth,Na.height=Au,Na}:function(){return Ci(t)})},iE=function(t,e,n){var i=n.d,s=n.d2,o=n.a;return(o=rr(t,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(e?Jp(s):t["client"+s])||0}},rE=function(t,e){return!e||~vi.indexOf(t)?jp(t):function(){return Na}},_i=function(t,e){var n=e.s,i=e.d2,s=e.d,o=e.a;return Math.max(0,(n="scroll"+i)&&(o=rr(t,n))?o()-jp(t)()[s]:Br(t)?(zn[n]||ce[n])-Jp(i):t[n]-t["offset"+i])},_a=function(t,e){for(var n=0;n<fs.length;n+=3)(!e||~e.indexOf(fs[n+1]))&&t(fs[n],fs[n+1],fs[n+2])},In=function(t){return typeof t=="string"},an=function(t){return typeof t=="function"},eo=function(t){return typeof t=="number"},Er=function(t){return typeof t=="object"},Ks=function(t,e,n){return t&&t.progress(e?0:1)&&n&&t.pause()},os=function(t,e,n){if(t.enabled){var i=t._ctx?t._ctx.add(function(){return e(t,n)}):e(t,n);i&&i.totalTime&&(t.callbackAnimation=i)}},as=Math.abs,Qp="left",tm="top",Cu="right",Ru="bottom",Ir="width",Or="height",go="Right",_o="Left",vo="Top",xo="Bottom",Oe="padding",Zn="margin",Os="Width",Pu="Height",ke="px",Jn=function(t){return ee.getComputedStyle(t.nodeType===Node.DOCUMENT_NODE?t.scrollingElement:t)},sE=function(t){var e=Jn(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},Bf=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Ci=function(t,e){var n=e&&Jn(t)[zc]!=="matrix(1, 0, 0, 1, 0, 0)"&&Mt.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=t.getBoundingClientRect?t.getBoundingClientRect():t.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},Qa=function(t,e){var n=e.d2;return t["offset"+n]||t["client"+n]||0},em=function(t){var e=[],n=t.labels,i=t.duration(),s;for(s in n)e.push(n[s]/i);return e},oE=function(t){return function(e){return Mt.utils.snap(em(t),e)}},Lu=function(t){var e=Mt.utils.snap(t),n=Array.isArray(t)&&t.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return e(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=e(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:e(s<0?i-t:i+t)}},aE=function(t){return function(e,n){return Lu(em(t))(e,n.direction)}},va=function(t,e,n,i){return n.split(",").forEach(function(s){return t(e,s,i)})},Ye=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:!i,capture:!!s})},Xe=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},xa=function(t,e,n){n=n&&n.wheelHandler,n&&(t(e,"wheel",n),t(e,"touchmove",n))},kf={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Sa={toggleActions:"play",anticipatePin:0},tl={top:0,left:0,center:.5,bottom:1,right:1},Pa=function(t,e){if(In(t)){var n=t.indexOf("="),i=~n?+(t.charAt(n-1)+1)*parseFloat(t.substr(n+1)):0;~n&&(t.indexOf("%")>n&&(i*=e/100),t=t.substr(0,n-1)),t=i+(t in tl?tl[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},Ma=function(t,e,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,h=s.fontSize,f=s.indent,d=s.fontWeight,_=fe.createElement("div"),g=Br(n)||rr(n,"pinType")==="fixed",p=t.indexOf("scroller")!==-1,m=g?ce:n.tagName==="IFRAME"?n.contentDocument.body:n,M=t.indexOf("start")!==-1,v=M?c:u,x="border-color:"+v+";font-size:"+h+";color:"+v+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return x+="position:"+((p||l)&&g?"fixed;":"absolute;"),(p||l||!g)&&(x+=(i===He?Cu:Ru)+":"+(o+parseFloat(f))+"px;"),a&&(x+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=M,_.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),_.style.cssText=x,_.innerText=e||e===0?t+"-"+e:t,m.children[0]?m.insertBefore(_,m.children[0]):m.appendChild(_),_._offset=_["offset"+i.op.d2],La(_,0,i,M),_},La=function(t,e,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];t._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Os]=1,s["border"+a+Os]=0,s[n.p]=e+"px",Mt.set(t,s)},jt=[],Gc={},Uo,Hf=function(){return sn()-ei>34&&(Uo||(Uo=requestAnimationFrame(Ui)))},ls=function(){(!gn||!gn.isPressed||gn.startX>ce.clientWidth)&&(ie.cache++,gn?Uo||(Uo=requestAnimationFrame(Ui)):Ui(),ei||Hr("scrollStart"),ei=sn())},ac=function(){$p=ee.innerWidth,qp=ee.innerHeight},no=function(t){ie.cache++,(t===!0||!rn&&!Yp&&!fe.fullscreenElement&&!fe.webkitFullscreenElement&&(!Bc||$p!==ee.innerWidth||Math.abs(ee.innerHeight-qp)>ee.innerHeight*.25))&&ja.restart(!0)},kr={},lE=[],nm=function r(){return Xe(Zt,"scrollEnd",r)||Ar(!0)},Hr=function(t){return kr[t]&&kr[t].map(function(e){return e()})||lE},Nn=[],im=function(t){for(var e=0;e<Nn.length;e+=5)(!t||Nn[e+4]&&Nn[e+4].query===t)&&(Nn[e].style.cssText=Nn[e+1],Nn[e].getBBox&&Nn[e].setAttribute("transform",Nn[e+2]||""),Nn[e+3].uncache=1)},rm=function(){return ie.forEach(function(t){return an(t)&&++t.cacheID&&(t.rec=t())})},Du=function(t,e){var n;for(_n=0;_n<jt.length;_n++)n=jt[_n],n&&(!e||n._ctx===e)&&(t?n.kill(1):n.revert(!0,!0));mo=!0,e&&im(e),e||Hr("revert")},sm=function(t,e){ie.cache++,(e||!vn)&&ie.forEach(function(n){return an(n)&&n.cacheID++&&(n.rec=0)}),In(t)&&(ee.history.scrollRestoration=wu=t)},vn,Fr=0,Gf,cE=function(){if(Gf!==Fr){var t=Gf=Fr;requestAnimationFrame(function(){return t===Fr&&Ar(!0)})}},om=function(){ce.appendChild(Ts),Au=!gn&&Ts.offsetHeight||ee.innerHeight,ce.removeChild(Ts)},Vf=function(t){return Do(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},Ar=function(t,e){if(zn=fe.documentElement,ce=fe.body,bu=[ee,fe,zn,ce],ei&&!t&&!mo){Ye(Zt,"scrollEnd",nm);return}om(),vn=Zt.isRefreshing=!0,mo||rm();var n=Hr("refreshInit");Xp&&Zt.sort(),e||Du(),ie.forEach(function(i){an(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),jt.slice(0).forEach(function(i){return i.refresh()}),mo=!1,jt.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),Hc=1,Vf(!0),jt.forEach(function(i){var s=_i(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),Vf(!1),Hc=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),ie.forEach(function(i){an(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),sm(wu,1),ja.pause(),Fr++,vn=2,Ui(2),jt.forEach(function(i){return an(i.vars.onRefresh)&&i.vars.onRefresh(i)}),vn=Zt.isRefreshing=!1,Hr("refresh")},Vc=0,Da=1,So,Ui=function(t){if(t===2||!vn&&!mo){Zt.isUpdating=!0,So&&So.update(0);var e=jt.length,n=sn(),i=n-oc>=50,s=e&&jt[0].scroll();if(Da=Vc>s?-1:1,vn||(Vc=s),i&&(ei&&!hl&&n-ei>200&&(ei=0,Hr("scrollEnd")),js=oc,oc=n),Da<0){for(_n=e;_n-- >0;)jt[_n]&&jt[_n].update(0,i);Da=1}else for(_n=0;_n<e;_n++)jt[_n]&&jt[_n].update(0,i);Zt.isUpdating=!1}Uo=0},Wc=[Qp,tm,Ru,Cu,Zn+xo,Zn+go,Zn+vo,Zn+_o,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Ua=Wc.concat([Ir,Or,"boxSizing","max"+Os,"max"+Pu,"position",Zn,Oe,Oe+vo,Oe+go,Oe+xo,Oe+_o]),uE=function(t,e,n){bs(n);var i=t._gsap;if(i.spacerIsNative)bs(i.spacerState);else if(t._gsap.swappedIn){var s=e.parentNode;s&&(s.insertBefore(t,e),s.removeChild(e))}t._gsap.swappedIn=!1},lc=function(t,e,n,i){if(!t._gsap.swappedIn){for(var s=Wc.length,o=e.style,a=t.style,l;s--;)l=Wc[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Ru]=a[Cu]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Ir]=Qa(t,Sn)+ke,o[Or]=Qa(t,He)+ke,o[Oe]=a[Zn]=a[tm]=a[Qp]="0",bs(i),a[Ir]=a["max"+Os]=n[Ir],a[Or]=a["max"+Pu]=n[Or],a[Oe]=n[Oe],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},hE=/([A-Z])/g,bs=function(t){if(t){var e=t.t.style,n=t.length,i=0,s,o;for((t.t._gsap||Mt.core.getCache(t.t)).uncache=1;i<n;i+=2)o=t[i+1],s=t[i],o?e[s]=o:e[s]&&e.removeProperty(s.replace(hE,"-$1").toLowerCase())}},ya=function(t){for(var e=Ua.length,n=t.style,i=[],s=0;s<e;s++)i.push(Ua[s],n[Ua[s]]);return i.t=t,i},fE=function(t,e,n){for(var i=[],s=t.length,o=n?8:0,a;o<s;o+=2)a=t[o],i.push(a,a in e?e[a]:t[o+1]);return i.t=t.t,i},Na={left:0,top:0},Wf=function(t,e,n,i,s,o,a,l,c,u,h,f,d,_){an(t)&&(t=t(l)),In(t)&&t.substr(0,3)==="max"&&(t=f+(t.charAt(4)==="="?Pa("0"+t.substr(3),n):0));var g=d?d.time():0,p,m,M;if(d&&d.seek(0),isNaN(t)||(t=+t),eo(t))d&&(t=Mt.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,f,t)),a&&La(a,n,i,!0);else{an(e)&&(e=e(l));var v=(t||"0").split(" "),x,A,w,E;M=yn(e,l)||ce,x=Ci(M)||{},(!x||!x.left&&!x.top)&&Jn(M).display==="none"&&(E=M.style.display,M.style.display="block",x=Ci(M),E?M.style.display=E:M.style.removeProperty("display")),A=Pa(v[0],x[i.d]),w=Pa(v[1]||"0",n),t=x[i.p]-c[i.p]-u+A+s-w,a&&La(a,w,i,n-w<20||a._isStart&&w>20),n-=n-w}if(_&&(l[_]=t||-.001,t<0&&(t=0)),o){var D=t+n,S=o._isStart;p="scroll"+i.d2,La(o,D,i,S&&D>20||!S&&(h?Math.max(ce[p],zn[p]):o.parentNode[p])<=D+1),h&&(c=Ci(a),h&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+ke))}return d&&M&&(p=Ci(M),d.seek(f),m=Ci(M),d._caScrollDist=p[i.p]-m[i.p],t=t/d._caScrollDist*f),d&&d.seek(g),d?t:Math.round(t)},dE=/(webkit|moz|length|cssText|inset)/i,Xf=function(t,e,n,i){if(t.parentNode!==e){var s=t.style,o,a;if(e===ce){t._stOrig=s.cssText,a=Jn(t);for(o in a)!+o&&!dE.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=t._stOrig;Mt.core.getCache(t).uncache=1,e.appendChild(t)}},am=function(t,e,n){var i=e,s=i;return function(o){var a=Math.round(t());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},Ea=function(t,e,n){var i={};i[e.p]="+="+n,Mt.set(t,i)},Yf=function(t,e){var n=cr(t,e),i="_scroll"+e.p2,s=function o(a,l,c,u,h){var f=o.tween,d=l.onComplete,_={};c=c||n();var g=am(n,c,function(){f.kill(),o.tween=0});return h=u&&h||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+u*f.ratio+h*f.ratio*f.ratio)},l.onUpdate=function(){ie.cache++,o.tween&&Ui()},l.onComplete=function(){o.tween=0,d&&d.call(f)},f=o.tween=Mt.to(t,l),f};return t[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Ye(t,"wheel",n.wheelHandler),Zt.isTouch&&Ye(t,"touchmove",n.wheelHandler),s},Zt=function(){function r(e,n){hs||r.register(Mt)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),kc(this),this.init(e,n)}var t=r.prototype;return t.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Qs){this.update=this.refresh=this.kill=hi;return}n=Bf(In(n)||eo(n)||n.nodeType?{trigger:n}:n,Sa);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,h=s.scrub,f=s.trigger,d=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,p=s.anticipatePin,m=s.onScrubComplete,M=s.onSnapComplete,v=s.once,x=s.snap,A=s.pinReparent,w=s.pinSpacer,E=s.containerAnimation,D=s.fastScrollEnd,S=s.preventOverlaps,y=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Sn:He,F=!h&&h!==0,N=yn(n.scroller||ee),K=Mt.core.getCache(N),L=Br(N),O=("pinType"in n?n.pinType:rr(N,"pinType")||L&&"fixed")==="fixed",k=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],X=F&&n.toggleActions.split(" "),Y="markers"in n?n.markers:Sa.markers,$=L?0:parseFloat(Jn(N)["border"+y.p2+Os])||0,R=this,J=n.onRefreshInit&&function(){return n.onRefreshInit(R)},nt=iE(N,L,y),q=rE(N,L),Z=0,st=0,gt=0,dt=cr(N,y),Pt,Lt,Nt,Vt,H,Wt,mt,Dt,_t,G,Bt,C,T,z,tt,Q,et,pt,ut,ct,wt,Gt,j,oe,Ct,Xt,Tt,vt,Yt,Qt,le,ft,rt,U,ot,at,Ft,Ut,re;if(R._startClamp=R._endClamp=!1,R._dir=y,p*=45,R.scroller=N,R.scroll=E?E.time.bind(E):dt,Vt=dt(),R.vars=n,i=i||n.animation,"refreshPriority"in n&&(Xp=1,n.refreshPriority===-9999&&(So=R)),K.tweenScroll=K.tweenScroll||{top:Yf(N,He),left:Yf(N,Sn)},R.tweenTo=Pt=K.tweenScroll[y.p],R.scrubDuration=function(it){rt=eo(it)&&it,rt?ft?ft.duration(it):ft=Mt.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:rt,paused:!0,onComplete:function(){return m&&m(R)}}):(ft&&ft.progress(1).kill(),ft=0)},i&&(i.vars.lazy=!1,i._initted&&!R.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),R.animation=i.pause(),i.scrollTrigger=R,R.scrubDuration(h),Qt=0,l||(l=i.vars.id)),x&&((!Er(x)||x.push)&&(x={snapTo:x}),"scrollBehavior"in ce.style&&Mt.set(L?[ce,zn]:N,{scrollBehavior:"auto"}),ie.forEach(function(it){return an(it)&&it.target===(L?fe.scrollingElement||zn:N)&&(it.smooth=!1)}),Nt=an(x.snapTo)?x.snapTo:x.snapTo==="labels"?oE(i):x.snapTo==="labelsDirectional"?aE(i):x.directional!==!1?function(it,zt){return Lu(x.snapTo)(it,sn()-st<500?0:zt.direction)}:Mt.utils.snap(x.snapTo),U=x.duration||{min:.1,max:2},U=Er(U)?po(U.min,U.max):po(U,U),ot=Mt.delayedCall(x.delay||rt/2||.1,function(){var it=dt(),zt=sn()-st<500,It=Pt.tween;if((zt||Math.abs(R.getVelocity())<10)&&!It&&!hl&&Z!==it){var $t=(it-Wt)/z,Te=i&&!F?i.totalProgress():$t,te=zt?0:(Te-le)/(sn()-js)*1e3||0,_e=Mt.utils.clamp(-$t,1-$t,as(te/2)*te/.185),ze=$t+(x.inertia===!1?0:_e),xe,ve,ue=x,Ln=ue.onStart,b=ue.onInterrupt,I=ue.onComplete;if(xe=Nt(ze,R),eo(xe)||(xe=ze),ve=Math.max(0,Math.round(Wt+xe*z)),it<=mt&&it>=Wt&&ve!==it){if(It&&!It._initted&&It.data<=as(ve-it))return;x.inertia===!1&&(_e=xe-$t),Pt(ve,{duration:U(as(Math.max(as(ze-Te),as(xe-Te))*.185/te/.05||0)),ease:x.ease||"power3",data:as(ve-it),onInterrupt:function(){return ot.restart(!0)&&b&&os(R,b)},onComplete:function(){R.update(),Z=dt(),i&&!F&&(ft?ft.resetTo("totalProgress",xe,i._tTime/i._tDur):i.progress(xe)),Qt=le=i&&!F?i.totalProgress():R.progress,M&&M(R),I&&os(R,I)}},it,_e*z,ve-it-_e*z),Ln&&os(R,Ln,Pt.tween)}}else R.isActive&&Z!==it&&ot.restart(!0)}).pause()),l&&(Gc[l]=R),f=R.trigger=yn(f||d!==!0&&d),re=f&&f._gsap&&f._gsap.stRevert,re&&(re=re(R)),d=d===!0?f:yn(d),In(a)&&(a={targets:f,className:a}),d&&(_===!1||_===Zn||(_=!_&&d.parentNode&&d.parentNode.style&&Jn(d.parentNode).display==="flex"?!1:Oe),R.pin=d,Lt=Mt.core.getCache(d),Lt.spacer?tt=Lt.pinState:(w&&(w=yn(w),w&&!w.nodeType&&(w=w.current||w.nativeElement),Lt.spacerIsNative=!!w,w&&(Lt.spacerState=ya(w))),Lt.spacer=pt=w||fe.createElement("div"),pt.classList.add("pin-spacer"),l&&pt.classList.add("pin-spacer-"+l),Lt.pinState=tt=ya(d)),n.force3D!==!1&&Mt.set(d,{force3D:!0}),R.spacer=pt=Lt.spacer,Yt=Jn(d),oe=Yt[_+y.os2],ct=Mt.getProperty(d),wt=Mt.quickSetter(d,y.a,ke),lc(d,pt,Yt),et=ya(d)),Y){C=Er(Y)?Bf(Y,kf):kf,G=Ma("scroller-start",l,N,y,C,0),Bt=Ma("scroller-end",l,N,y,C,0,G),ut=G["offset"+y.op.d2];var ae=yn(rr(N,"content")||N);Dt=this.markerStart=Ma("start",l,ae,y,C,ut,0,E),_t=this.markerEnd=Ma("end",l,ae,y,C,ut,0,E),E&&(Ut=Mt.quickSetter([Dt,_t],y.a,ke)),!O&&!(vi.length&&rr(N,"fixedMarkers")===!0)&&(sE(L?ce:N),Mt.set([G,Bt],{force3D:!0}),Xt=Mt.quickSetter(G,y.a,ke),vt=Mt.quickSetter(Bt,y.a,ke))}if(E){var bt=E.vars.onUpdate,St=E.vars.onUpdateParams;E.eventCallback("onUpdate",function(){R.update(0,0,1),bt&&bt.apply(E,St||[])})}if(R.previous=function(){return jt[jt.indexOf(R)-1]},R.next=function(){return jt[jt.indexOf(R)+1]},R.revert=function(it,zt){if(!zt)return R.kill(!0);var It=it!==!1||!R.enabled,$t=rn;It!==R.isReverted&&(It&&(at=Math.max(dt(),R.scroll.rec||0),gt=R.progress,Ft=i&&i.progress()),Dt&&[Dt,_t,G,Bt].forEach(function(Te){return Te.style.display=It?"none":"block"}),It&&(rn=R,R.update(It)),d&&(!A||!R.isActive)&&(It?uE(d,pt,tt):lc(d,pt,Jn(d),Ct)),It||R.update(It),rn=$t,R.isReverted=It)},R.refresh=function(it,zt,It,$t){if(!((rn||!R.enabled)&&!zt)){if(d&&it&&ei){Ye(r,"scrollEnd",nm);return}!vn&&J&&J(R),rn=R,Pt.tween&&!It&&(Pt.tween.kill(),Pt.tween=0),ft&&ft.pause(),g&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(qt){return qt.vars.immediateRender&&qt.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),R.isReverted||R.revert(!0,!0),R._subPinOffset=!1;var Te=nt(),te=q(),_e=E?E.duration():_i(N,y),ze=z<=.01||!z,xe=0,ve=$t||0,ue=Er(It)?It.end:n.end,Ln=n.endTrigger||f,b=Er(It)?It.start:n.start||(n.start===0||!f?0:d?"0 0":"0 100%"),I=R.pinnedContainer=n.pinnedContainer&&yn(n.pinnedContainer,R),W=f&&Math.max(0,jt.indexOf(R))||0,V=W,B,lt,yt,kt,Et,At,Ht,Kt,Me,Be,he,hn,de;for(Y&&Er(It)&&(hn=Mt.getProperty(G,y.p),de=Mt.getProperty(Bt,y.p));V-- >0;)At=jt[V],At.end||At.refresh(0,1)||(rn=R),Ht=At.pin,Ht&&(Ht===f||Ht===d||Ht===I)&&!At.isReverted&&(Be||(Be=[]),Be.unshift(At),At.revert(!0,!0)),At!==jt[V]&&(W--,V--);for(an(b)&&(b=b(R)),b=If(b,"start",R),Wt=Wf(b,f,Te,y,dt(),Dt,G,R,te,$,O,_e,E,R._startClamp&&"_startClamp")||(d?-.001:0),an(ue)&&(ue=ue(R)),In(ue)&&!ue.indexOf("+=")&&(~ue.indexOf(" ")?ue=(In(b)?b.split(" ")[0]:"")+ue:(xe=Pa(ue.substr(2),Te),ue=In(b)?b:(E?Mt.utils.mapRange(0,E.duration(),E.scrollTrigger.start,E.scrollTrigger.end,Wt):Wt)+xe,Ln=f)),ue=If(ue,"end",R),mt=Math.max(Wt,Wf(ue||(Ln?"100% 0":_e),Ln,Te,y,dt()+xe,_t,Bt,R,te,$,O,_e,E,R._endClamp&&"_endClamp"))||-.001,xe=0,V=W;V--;)At=jt[V]||{},Ht=At.pin,Ht&&At.start-At._pinPush<=Wt&&!E&&At.end>0&&(B=At.end-(R._startClamp?Math.max(0,At.start):At.start),(Ht===f&&At.start-At._pinPush<Wt||Ht===I)&&isNaN(b)&&(xe+=B*(1-At.progress)),Ht===d&&(ve+=B));if(Wt+=xe,mt+=xe,R._startClamp&&(R._startClamp+=xe),R._endClamp&&!vn&&(R._endClamp=mt||-.001,mt=Math.min(mt,_i(N,y))),z=mt-Wt||(Wt-=.01)&&.001,ze&&(gt=Mt.utils.clamp(0,1,Mt.utils.normalize(Wt,mt,at))),R._pinPush=ve,Dt&&xe&&(B={},B[y.a]="+="+xe,I&&(B[y.p]="-="+dt()),Mt.set([Dt,_t],B)),d&&!(Hc&&R.end>=_i(N,y)))B=Jn(d),kt=y===He,yt=dt(),Gt=parseFloat(ct(y.a))+ve,!_e&&mt>1&&(he=(L?fe.scrollingElement||zn:N).style,he={style:he,value:he["overflow"+y.a.toUpperCase()]},L&&Jn(ce)["overflow"+y.a.toUpperCase()]!=="scroll"&&(he.style["overflow"+y.a.toUpperCase()]="scroll")),lc(d,pt,B),et=ya(d),lt=Ci(d,!0),Kt=O&&cr(N,kt?Sn:He)(),_?(Ct=[_+y.os2,z+ve+ke],Ct.t=pt,V=_===Oe?Qa(d,y)+z+ve:0,V&&(Ct.push(y.d,V+ke),pt.style.flexBasis!=="auto"&&(pt.style.flexBasis=V+ke)),bs(Ct),I&&jt.forEach(function(qt){qt.pin===I&&qt.vars.pinSpacing!==!1&&(qt._subPinOffset=!0)}),O&&dt(at)):(V=Qa(d,y),V&&pt.style.flexBasis!=="auto"&&(pt.style.flexBasis=V+ke)),O&&(Et={top:lt.top+(kt?yt-Wt:Kt)+ke,left:lt.left+(kt?Kt:yt-Wt)+ke,boxSizing:"border-box",position:"fixed"},Et[Ir]=Et["max"+Os]=Math.ceil(lt.width)+ke,Et[Or]=Et["max"+Pu]=Math.ceil(lt.height)+ke,Et[Zn]=Et[Zn+vo]=Et[Zn+go]=Et[Zn+xo]=Et[Zn+_o]="0",Et[Oe]=B[Oe],Et[Oe+vo]=B[Oe+vo],Et[Oe+go]=B[Oe+go],Et[Oe+xo]=B[Oe+xo],Et[Oe+_o]=B[Oe+_o],Q=fE(tt,Et,A),vn&&dt(0)),i?(Me=i._initted,rc(1),i.render(i.duration(),!0,!0),j=ct(y.a)-Gt+z+ve,Tt=Math.abs(z-j)>1,O&&Tt&&Q.splice(Q.length-2,2),i.render(0,!0,!0),Me||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),rc(0)):j=z,he&&(he.value?he.style["overflow"+y.a.toUpperCase()]=he.value:he.style.removeProperty("overflow-"+y.a));else if(f&&dt()&&!E)for(lt=f.parentNode;lt&&lt!==ce;)lt._pinOffset&&(Wt-=lt._pinOffset,mt-=lt._pinOffset),lt=lt.parentNode;Be&&Be.forEach(function(qt){return qt.revert(!1,!0)}),R.start=Wt,R.end=mt,Vt=H=vn?at:dt(),!E&&!vn&&(Vt<at&&dt(at),R.scroll.rec=0),R.revert(!1,!0),st=sn(),ot&&(Z=-1,ot.restart(!0)),rn=0,i&&F&&(i._initted||Ft)&&i.progress()!==Ft&&i.progress(Ft||0,!0).render(i.time(),!0,!0),(ze||gt!==R.progress||E||g||i&&!i._initted)&&(i&&!F&&(i._initted||gt||i.vars.immediateRender!==!1)&&i.totalProgress(E&&Wt<-.001&&!gt?Mt.utils.normalize(Wt,mt,0):gt,!0),R.progress=ze||(Vt-Wt)/z===gt?0:gt),d&&_&&(pt._pinOffset=Math.round(R.progress*j)),ft&&ft.invalidate(),isNaN(hn)||(hn-=Mt.getProperty(G,y.p),de-=Mt.getProperty(Bt,y.p),Ea(G,y,hn),Ea(Dt,y,hn-($t||0)),Ea(Bt,y,de),Ea(_t,y,de-($t||0))),ze&&!vn&&R.update(),u&&!vn&&!T&&(T=!0,u(R),T=!1)}},R.getVelocity=function(){return(dt()-H)/(sn()-js)*1e3||0},R.endAnimation=function(){Ks(R.callbackAnimation),i&&(ft?ft.progress(1):i.paused()?F||Ks(i,R.direction<0,1):Ks(i,i.reversed()))},R.labelToScroll=function(it){return i&&i.labels&&(Wt||R.refresh()||Wt)+i.labels[it]/i.duration()*z||0},R.getTrailing=function(it){var zt=jt.indexOf(R),It=R.direction>0?jt.slice(0,zt).reverse():jt.slice(zt+1);return(In(it)?It.filter(function($t){return $t.vars.preventOverlaps===it}):It).filter(function($t){return R.direction>0?$t.end<=Wt:$t.start>=mt})},R.update=function(it,zt,It){if(!(E&&!It&&!it)){var $t=vn===!0?at:R.scroll(),Te=it?0:($t-Wt)/z,te=Te<0?0:Te>1?1:Te||0,_e=R.progress,ze,xe,ve,ue,Ln,b,I,W;if(zt&&(H=Vt,Vt=E?dt():$t,x&&(le=Qt,Qt=i&&!F?i.totalProgress():te)),p&&d&&!rn&&!ga&&ei&&(!te&&Wt<$t+($t-H)/(sn()-js)*p?te=1e-4:te===1&&mt>$t+($t-H)/(sn()-js)*p&&(te=.9999)),te!==_e&&R.enabled){if(ze=R.isActive=!!te&&te<1,xe=!!_e&&_e<1,b=ze!==xe,Ln=b||!!te!=!!_e,R.direction=te>_e?1:-1,R.progress=te,Ln&&!rn&&(ve=te&&!_e?0:te===1?1:_e===1?2:3,F&&(ue=!b&&X[ve+1]!=="none"&&X[ve+1]||X[ve],W=i&&(ue==="complete"||ue==="reset"||ue in i))),S&&(b||W)&&(W||h||!i)&&(an(S)?S(R):R.getTrailing(S).forEach(function(yt){return yt.endAnimation()})),F||(ft&&!rn&&!ga?(ft._dp._time-ft._start!==ft._time&&ft.render(ft._dp._time-ft._start),ft.resetTo?ft.resetTo("totalProgress",te,i._tTime/i._tDur):(ft.vars.totalProgress=te,ft.invalidate().restart())):i&&i.totalProgress(te,!!(rn&&(st||it)))),d){if(it&&_&&(pt.style[_+y.os2]=oe),!O)wt(to(Gt+j*te));else if(Ln){if(I=!it&&te>_e&&mt+1>$t&&$t+1>=_i(N,y),A)if(!it&&(ze||I)){var V=Ci(d,!0),B=$t-Wt;Xf(d,ce,V.top+(y===He?B:0)+ke,V.left+(y===He?0:B)+ke)}else Xf(d,pt);bs(ze||I?Q:et),Tt&&te<1&&ze||wt(Gt+(te===1&&!I?j:0))}}x&&!Pt.tween&&!rn&&!ga&&ot.restart(!0),a&&(b||v&&te&&(te<1||!sc))&&Do(a.targets).forEach(function(yt){return yt.classList[ze||v?"add":"remove"](a.className)}),o&&!F&&!it&&o(R),Ln&&!rn?(F&&(W&&(ue==="complete"?i.pause().totalProgress(1):ue==="reset"?i.restart(!0).pause():ue==="restart"?i.restart(!0):i[ue]()),o&&o(R)),(b||!sc)&&(c&&b&&os(R,c),k[ve]&&os(R,k[ve]),v&&(te===1?R.kill(!1,1):k[ve]=0),b||(ve=te===1?1:3,k[ve]&&os(R,k[ve]))),D&&!ze&&Math.abs(R.getVelocity())>(eo(D)?D:2500)&&(Ks(R.callbackAnimation),ft?ft.progress(1):Ks(i,ue==="reverse"?1:!te,1))):F&&o&&!rn&&o(R)}if(vt){var lt=E?$t/E.duration()*(E._caScrollDist||0):$t;Xt(lt+(G._isFlipped?1:0)),vt(lt)}Ut&&Ut(-$t/E.duration()*(E._caScrollDist||0))}},R.enable=function(it,zt){R.enabled||(R.enabled=!0,Ye(N,"resize",no),L||Ye(N,"scroll",ls),J&&Ye(r,"refreshInit",J),it!==!1&&(R.progress=gt=0,Vt=H=Z=dt()),zt!==!1&&R.refresh())},R.getTween=function(it){return it&&Pt?Pt.tween:ft},R.setPositions=function(it,zt,It,$t){if(E){var Te=E.scrollTrigger,te=E.duration(),_e=Te.end-Te.start;it=Te.start+_e*it/te,zt=Te.start+_e*zt/te}R.refresh(!1,!1,{start:Of(it,It&&!!R._startClamp),end:Of(zt,It&&!!R._endClamp)},$t),R.update()},R.adjustPinSpacing=function(it){if(Ct&&it){var zt=Ct.indexOf(y.d)+1;Ct[zt]=parseFloat(Ct[zt])+it+ke,Ct[1]=parseFloat(Ct[1])+it+ke,bs(Ct)}},R.disable=function(it,zt){if(it!==!1&&R.revert(!0,!0),R.enabled&&(R.enabled=R.isActive=!1,zt||ft&&ft.pause(),at=0,Lt&&(Lt.uncache=1),J&&Xe(r,"refreshInit",J),ot&&(ot.pause(),Pt.tween&&Pt.tween.kill()&&(Pt.tween=0)),!L)){for(var It=jt.length;It--;)if(jt[It].scroller===N&&jt[It]!==R)return;Xe(N,"resize",no),L||Xe(N,"scroll",ls)}},R.kill=function(it,zt){R.disable(it,zt),ft&&!zt&&ft.kill(),l&&delete Gc[l];var It=jt.indexOf(R);It>=0&&jt.splice(It,1),It===_n&&Da>0&&_n--,It=0,jt.forEach(function($t){return $t.scroller===R.scroller&&(It=1)}),It||vn||(R.scroll.rec=0),i&&(i.scrollTrigger=null,it&&i.revert({kill:!1}),zt||i.kill()),Dt&&[Dt,_t,G,Bt].forEach(function($t){return $t.parentNode&&$t.parentNode.removeChild($t)}),So===R&&(So=0),d&&(Lt&&(Lt.uncache=1),It=0,jt.forEach(function($t){return $t.pin===d&&It++}),It||(Lt.spacer=0)),n.onKill&&n.onKill(R)},jt.push(R),R.enable(!1,!1),re&&re(R),i&&i.add&&!z){var Rt=R.update;R.update=function(){R.update=Rt,ie.cache++,Wt||mt||R.refresh()},Mt.delayedCall(.01,R.update),z=.01,Wt=mt=0}else R.refresh();d&&cE()},r.register=function(n){return hs||(Mt=n||Zp(),Kp()&&window.document&&r.enable(),hs=Qs),hs},r.defaults=function(n){if(n)for(var i in n)Sa[i]=n[i];return Sa},r.disable=function(n,i){Qs=0,jt.forEach(function(o){return o[i?"kill":"disable"](n)}),Xe(ee,"wheel",ls),Xe(fe,"scroll",ls),clearInterval(ma),Xe(fe,"touchcancel",hi),Xe(ce,"touchstart",hi),va(Xe,fe,"pointerdown,touchstart,mousedown",Ff),va(Xe,fe,"pointerup,touchend,mouseup",zf),ja.kill(),_a(Xe);for(var s=0;s<ie.length;s+=3)xa(Xe,ie[s],ie[s+1]),xa(Xe,ie[s],ie[s+2])},r.enable=function(){if(ee=window,fe=document,zn=fe.documentElement,ce=fe.body,Mt){if(Do=Mt.utils.toArray,po=Mt.utils.clamp,kc=Mt.core.context||hi,rc=Mt.core.suppressOverwrites||hi,wu=ee.history.scrollRestoration||"auto",Vc=ee.pageYOffset||0,Mt.core.globals("ScrollTrigger",r),ce){Qs=1,Ts=document.createElement("div"),Ts.style.height="100vh",Ts.style.position="absolute",om(),nE(),Ue.register(Mt),r.isTouch=Ue.isTouch,Xi=Ue.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Bc=Ue.isTouch===1,Ye(ee,"wheel",ls),bu=[ee,fe,zn,ce],Mt.matchMedia?(r.matchMedia=function(u){var h=Mt.matchMedia(),f;for(f in u)h.add(f,u[f]);return h},Mt.addEventListener("matchMediaInit",function(){rm(),Du()}),Mt.addEventListener("matchMediaRevert",function(){return im()}),Mt.addEventListener("matchMedia",function(){Ar(0,1),Hr("matchMedia")}),Mt.matchMedia().add("(orientation: portrait)",function(){return ac(),ac})):console.warn("Requires GSAP 3.11.0 or later"),ac(),Ye(fe,"scroll",ls);var n=ce.hasAttribute("style"),i=ce.style,s=i.borderTopStyle,o=Mt.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=Ci(ce),He.m=Math.round(a.top+He.sc())||0,Sn.m=Math.round(a.left+Sn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(ce.setAttribute("style",""),ce.removeAttribute("style")),ma=setInterval(Hf,250),Mt.delayedCall(.5,function(){return ga=0}),Ye(fe,"touchcancel",hi),Ye(ce,"touchstart",hi),va(Ye,fe,"pointerdown,touchstart,mousedown",Ff),va(Ye,fe,"pointerup,touchend,mouseup",zf),zc=Mt.utils.checkPrefix("transform"),Ua.push(zc),hs=sn(),ja=Mt.delayedCall(.2,Ar).pause(),fs=[fe,"visibilitychange",function(){var u=ee.innerWidth,h=ee.innerHeight;fe.hidden?(Uf=u,Nf=h):(Uf!==u||Nf!==h)&&no()},fe,"DOMContentLoaded",Ar,ee,"load",Ar,ee,"resize",no],_a(Ye),jt.forEach(function(u){return u.enable(0,1)}),l=0;l<ie.length;l+=3)xa(Xe,ie[l],ie[l+1]),xa(Xe,ie[l],ie[l+2])}else if(fe){var c=function u(){r.enable(),fe.removeEventListener("DOMContentLoaded",u)};fe.addEventListener("DOMContentLoaded",c)}}},r.config=function(n){"limitCallbacks"in n&&(sc=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(ma)||(ma=i)&&setInterval(Hf,i),"ignoreMobileResize"in n&&(Bc=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(_a(Xe)||_a(Ye,n.autoRefreshEvents||"none"),Yp=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=yn(n),o=ie.indexOf(s),a=Br(s);~o&&ie.splice(o,a?6:2),i&&(a?vi.unshift(ee,i,ce,i,zn,i):vi.unshift(s,i))},r.clearMatchMedia=function(n){jt.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(In(n)?yn(n):n).getBoundingClientRect(),a=o[s?Ir:Or]*i||0;return s?o.right-a>0&&o.left+a<ee.innerWidth:o.bottom-a>0&&o.top+a<ee.innerHeight},r.positionInViewport=function(n,i,s){In(n)&&(n=yn(n));var o=n.getBoundingClientRect(),a=o[s?Ir:Or],l=i==null?a/2:i in tl?tl[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/ee.innerWidth:(o.top+l)/ee.innerHeight},r.killAll=function(n){if(jt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=kr.killAll||[];kr={},i.forEach(function(s){return s()})}},r}();Zt.version="3.15.0";Zt.saveStyles=function(r){return r?Do(r).forEach(function(t){if(t&&t.style){var e=Nn.indexOf(t);e>=0&&Nn.splice(e,5),Nn.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),Mt.core.getCache(t),kc())}}):Nn};Zt.revert=function(r,t){return Du(!r,t)};Zt.create=function(r,t){return new Zt(r,t)};Zt.refresh=function(r){return r?no(!0):(hs||Zt.register())&&Ar(!0)};Zt.update=function(r){return++ie.cache&&Ui(r===!0?2:0)};Zt.clearScrollMemory=sm;Zt.maxScroll=function(r,t){return _i(r,t?Sn:He)};Zt.getScrollFunc=function(r,t){return cr(yn(r),t?Sn:He)};Zt.getById=function(r){return Gc[r]};Zt.getAll=function(){return jt.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Zt.isScrolling=function(){return!!ei};Zt.snapDirectional=Lu;Zt.addEventListener=function(r,t){var e=kr[r]||(kr[r]=[]);~e.indexOf(t)||e.push(t)};Zt.removeEventListener=function(r,t){var e=kr[r],n=e&&e.indexOf(t);n>=0&&e.splice(n,1)};Zt.batch=function(r,t){var e=[],n={},i=t.interval||.016,s=t.batchMax||1e9,o=function(c,u){var h=[],f=[],d=Mt.delayedCall(i,function(){u(h,f),h=[],f=[]}).pause();return function(_){h.length||d.restart(!0),h.push(_.trigger),f.push(_),s<=h.length&&d.progress(1)}},a;for(a in t)n[a]=a.substr(0,2)==="on"&&an(t[a])&&a!=="onRefreshInit"?o(a,t[a]):t[a];return an(s)&&(s=s(),Ye(Zt,"refresh",function(){return s=t.batchMax()})),Do(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,e.push(Zt.create(c))}),e};var qf=function(t,e,n,i){return e>i?t(i):e<0&&t(0),n>i?(i-e)/(n-e):n<0?e/(e-n):1},cc=function r(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(Ue.isTouch?" pinch-zoom":""):"none",t===zn&&r(ce,e)},Ta={auto:1,scroll:1},pE=function(t){var e=t.event,n=t.target,i=t.axis,s=(e.changedTouches?e.changedTouches[0]:e).target,o=s._gsap||Mt.core.getCache(s),a=sn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==ce&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Ta[(l=Jn(s)).overflowY]||Ta[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Br(s)&&(Ta[(l=Jn(s)).overflowY]||Ta[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},lm=function(t,e,n,i){return Ue.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:i=i&&pE,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Ye(fe,Ue.eventTypes[0],Kf,!1,!0)},onDisable:function(){return Xe(fe,Ue.eventTypes[0],Kf,!0)}})},mE=/(input|label|select|textarea)/i,$f,Kf=function(t){var e=mE.test(t.target.tagName);(e||$f)&&(t._gsapAllow=!0,$f=e)},gE=function(t){Er(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,n=e.normalizeScrollX,i=e.momentum,s=e.allowNestedScroll,o=e.onRelease,a,l,c=yn(t.target)||zn,u=Mt.core.globals().ScrollSmoother,h=u&&u.get(),f=Xi&&(t.content&&yn(t.content)||h&&t.content!==!1&&!h.smooth()&&h.content()),d=cr(c,He),_=cr(c,Sn),g=1,p=(Ue.isTouch&&ee.visualViewport?ee.visualViewport.scale*ee.visualViewport.width:ee.outerWidth)/ee.innerWidth,m=0,M=an(i)?function(){return i(a)}:function(){return i||2.8},v,x,A=lm(c,t.type,!0,s),w=function(){return x=!1},E=hi,D=hi,S=function(){l=_i(c,He),D=po(Xi?1:0,l),n&&(E=po(0,_i(c,Sn))),v=Fr},y=function(){f._gsap.y=to(parseFloat(f._gsap.y)+d.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},F=function(){if(x){requestAnimationFrame(w);var Y=to(a.deltaY/2),$=D(d.v-Y);if(f&&$!==d.v+d.offset){d.offset=$-d.v;var R=to((parseFloat(f&&f._gsap.y)||0)-d.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+R+", 0, 1)",f._gsap.y=R+"px",d.cacheID=ie.cache,Ui()}return!0}d.offset&&y(),x=!0},N,K,L,O,k=function(){S(),N.isActive()&&N.vars.scrollY>l&&(d()>l?N.progress(1)&&d(l):N.resetTo("scrollY",l))};return f&&Mt.set(f,{y:"+=0"}),t.ignoreCheck=function(X){return Xi&&X.type==="touchmove"&&F()||g>1.05&&X.type!=="touchstart"||a.isGesturing||X.touches&&X.touches.length>1},t.onPress=function(){x=!1;var X=g;g=to((ee.visualViewport&&ee.visualViewport.scale||1)/p),N.pause(),X!==g&&cc(c,g>1.01?!0:n?!1:"x"),K=_(),L=d(),S(),v=Fr},t.onRelease=t.onGestureStart=function(X,Y){if(d.offset&&y(),!Y)O.restart(!0);else{ie.cache++;var $=M(),R,J;n&&(R=_(),J=R+$*.05*-X.velocityX/.227,$*=qf(_,R,J,_i(c,Sn)),N.vars.scrollX=E(J)),R=d(),J=R+$*.05*-X.velocityY/.227,$*=qf(d,R,J,_i(c,He)),N.vars.scrollY=D(J),N.invalidate().duration($).play(.01),(Xi&&N.vars.scrollY>=l||R>=l-1)&&Mt.to({},{onUpdate:k,duration:$})}o&&o(X)},t.onWheel=function(){N._ts&&N.pause(),sn()-m>1e3&&(v=0,m=sn())},t.onChange=function(X,Y,$,R,J){if(Fr!==v&&S(),Y&&n&&_(E(R[2]===Y?K+(X.startX-X.x):_()+Y-R[1])),$){d.offset&&y();var nt=J[2]===$,q=nt?L+X.startY-X.y:d()+$-J[1],Z=D(q);nt&&q!==Z&&(L+=Z-q),d(Z)}($||Y)&&Ui()},t.onEnable=function(){cc(c,n?!1:"x"),Zt.addEventListener("refresh",k),Ye(ee,"resize",k),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=_.smooth=!1),A.enable()},t.onDisable=function(){cc(c,!0),Xe(ee,"resize",k),Zt.removeEventListener("refresh",k),A.kill()},t.lockAxis=t.lockAxis!==!1,a=new Ue(t),a.iOS=Xi,Xi&&!d()&&d(1),Xi&&Mt.ticker.add(hi),O=a._dc,N=Mt.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:am(d,d(),function(){return N.pause()})},onUpdate:Ui,onComplete:O.vars.onComplete}),a};Zt.sort=function(r){if(an(r))return jt.sort(r);var t=ee.pageYOffset||0;return Zt.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+ee.innerHeight}),jt.sort(r||function(e,n){return(e.vars.refreshPriority||0)*-1e6+(e.vars.containerAnimation?1e6:e._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Zt.observe=function(r){return new Ue(r)};Zt.normalizeScroll=function(r){if(typeof r>"u")return gn;if(r===!0&&gn)return gn.enable();if(r===!1){gn&&gn.kill(),gn=r;return}var t=r instanceof Ue?r:gE(r);return gn&&gn.target===t.target&&gn.kill(),Br(t.target)&&(gn=t),t};Zt.core={_getVelocityProp:Fc,_inputObserver:lm,_scrollers:ie,_proxies:vi,bridge:{ss:function(){ei||Hr("scrollStart"),ei=sn()},ref:function(){return rn}}};Zp()&&Mt.registerPlugin(Zt);cn.registerPlugin(Zt);class _E{constructor(t,e){this.world=t,this.hud=e,this.isReducedMotion=iM(),this.initLenis(),this.initScrollSync(),this.initSectionAnimations(),this.initGalleryHorizontalScroll()}initLenis(){this.lenis=new Jy({duration:this.isReducedMotion?.2:1.4,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),orientation:"vertical",gestureOrientation:"vertical",smoothWheel:!this.isReducedMotion,wheelMultiplier:1.05}),this.lenis.on("scroll",Zt.update),cn.ticker.add(t=>{this.lenis.raf(t*1e3)}),cn.ticker.lagSmoothing(0)}initScrollSync(){Zt.create({trigger:"#page-wrapper",start:"top top",end:"bottom bottom",onUpdate:t=>{const e=t.progress,n=t.getVelocity();this.world&&this.world.setScrollProgress(e,n),this.hud&&this.hud.update(e,n);const i=document.querySelector("#global-scroll-progress");i&&(i.style.transform=`scaleX(${e})`)}})}initSectionAnimations(){document.querySelectorAll(".flight-section:not(#hero)").forEach(e=>{const n=e.querySelector(".content-card");n&&cn.fromTo(n,{y:60,opacity:0,scale:.96},{y:0,opacity:1,scale:1,duration:1.2,ease:"power3.out",scrollTrigger:{trigger:e,start:"top 70%",end:"top 20%",scrub:1}})})}initGalleryHorizontalScroll(){const t=document.querySelector("#gallery"),e=document.querySelector("#gallery-track");if(!t||!e)return;const n=e.scrollWidth-window.innerWidth;n>0&&cn.to(e,{x:-n-100,ease:"none",scrollTrigger:{trigger:t,pin:!0,scrub:1.2,start:"top top",end:()=>`+=${n+400}`,invalidateOnRefresh:!0}})}scrollTo(t){this.lenis&&this.lenis.scrollTo(t,{duration:2,ease:e=>Math.min(1,1.001-Math.pow(2,-10*e))})}}const cs=(r,t,e)=>r+(t-r)*e;class vE{constructor(){this.altitudeEl=document.querySelector("#hud-altitude"),this.speedEl=document.querySelector("#hud-speed"),this.headingEl=document.querySelector("#hud-heading"),this.waypointEl=document.querySelector("#hud-waypoint"),this.coordsEl=document.querySelector("#hud-coords"),this.currentAlt=3200}update(t,e=0){if(!this.altitudeEl)return;let n=3200,i="VÒM TRỜI CỐ ĐÔ // NÚI NGỰ BÌNH",s="16°28'N 107°35'E",o="168° S";if(t<.2)n=cs(3200,1600,t/.2),i="HẠ ĐỘ CAO VÀO THUNG LŨNG SÔNG HƯƠNG",s="16°28'N 107°35'E",o="175° S";else if(t<.45){const l=(t-.2)/.25;n=cs(1600,35,l),i="SÔNG HƯƠNG — DẢI LỤA LAM NGỌC & TRÀNG TIỀN",s="16°28'N 107°35'E",o="190° SSW"}else if(t<.65){const l=(t-.45)/.2;n=cs(35,95,l),i="THÁP PHƯỚC DUYÊN & ĐÊM HOA ĐĂNG THIÊN MỤ",s="16°27'N 107°32'E",o="260° W"}else if(t<.82){const l=(t-.65)/.17;n=cs(95,1450,l),i="QUẦN THỂ LĂNG TẨM & ĐỒI VỌNG CẢNH",s="16°23'N 107°35'E",o="150° SE"}else{const l=(t-.82)/.18;n=cs(1450,2600,l),i="HỘI TỤ DI SẢN // THIÊN CẦU TRIỀU NGUYỄN",s="16°28'N 107°34'E",o="360° N"}this.currentAlt=cs(this.currentAlt,n,.08),this.altitudeEl.textContent=`${Math.round(this.currentAlt).toLocaleString()} M`;const a=420+Math.abs(Math.round(e*.4));this.speedEl&&(this.speedEl.textContent=`${a} KM/H`),this.headingEl&&(this.headingEl.textContent=o),this.waypointEl&&(this.waypointEl.textContent=i),this.coordsEl&&(this.coordsEl.textContent=s)}}function xE(r=".magnetic-btn"){if(Bo())return;document.querySelectorAll(r).forEach(e=>{const n=e.querySelector(".btn-text")||e;e.addEventListener("mousemove",i=>{const s=e.getBoundingClientRect(),o=i.clientX-s.left-s.width/2,a=i.clientY-s.top-s.height/2;cn.to(e,{x:o*.35,y:a*.35,duration:.4,ease:"power2.out"}),n!==e&&cn.to(n,{x:o*.2,y:a*.2,duration:.4,ease:"power2.out"})}),e.addEventListener("mouseleave",()=>{cn.to(e,{x:0,y:0,duration:.7,ease:"elastic.out(1, 0.3)"}),n!==e&&cn.to(n,{x:0,y:0,duration:.7,ease:"elastic.out(1, 0.3)"})})})}cn.registerPlugin(Zt);function SE(){document.querySelectorAll("[data-counter-target]").forEach(t=>{const e=parseFloat(t.getAttribute("data-counter-target")),n=e%1!==0,i=t.getAttribute("data-counter-prefix")||"",s=t.getAttribute("data-counter-suffix")||"",o={val:0};Zt.create({trigger:t,start:"top 85%",once:!0,onEnter:()=>{cn.to(o,{val:e,duration:2.2,ease:"power3.out",onUpdate:()=>{t.textContent=`${i}${n?o.val.toFixed(1):Math.round(o.val)}${s}`}})}})})}document.addEventListener("DOMContentLoaded",()=>{const r=Bd(),t=document.querySelector("#webgl-canvas");let e=null;if(r&&t)try{e=new MM(t)}catch(o){console.error("[Main] Lỗi khởi tạo Three.js World:",o)}else console.warn("[Main] WebGL không khả dụng, kích hoạt chế độ Fallback."),t&&(t.style.display="none"),document.body.classList.add("no-webgl");const n=new vE,i=new _E(e,n);new Gy,xE(".magnetic-btn"),SE(),new Hy(()=>{console.log("[HUEGO] Chuyến bay di sản Cố Đô Huế đã sẵn sàng.")}),document.querySelectorAll('a[href^="#"]').forEach(o=>{o.addEventListener("click",a=>{const l=o.getAttribute("href");if(l&&l!=="#"){const c=document.querySelector(l);c&&(a.preventDefault(),i.scrollTo(c))}})});const s=document.querySelector("#open-booking-btn");s&&!s.getAttribute("href")&&s.addEventListener("click",()=>{window.open("https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/","_blank","noopener,noreferrer")})});
