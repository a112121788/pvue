function te(t,e){const n=Object.create(null),s=t.split(",");for(let r=0;r<s.length;r++)n[s[r]]=!0;return e?r=>!!n[r.toLowerCase()]:r=>!!n[r]}function pt(t){if(y(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],r=P(s)?se(s):pt(s);if(r)for(const i in r)e[i]=r[i]}return e}else{if(P(t))return t;if($(t))return t}}const ee=/;(?![^(]*\))/g,ne=/:(.+)/;function se(t){const e={};return t.split(ee).forEach(n=>{if(n){const s=n.split(ne);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function dt(t){let e="";if(P(t))e=t;else if(y(t))for(let n=0;n<t.length;n++){const s=dt(t[n]);s&&(e+=s+" ")}else if($(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}function re(t,e){if(t.length!==e.length)return!1;let n=!0;for(let s=0;n&&s<t.length;s++)n=N(t[s],e[s]);return n}function N(t,e){if(t===e)return!0;let n=mt(t),s=mt(e);if(n||s)return n&&s?t.getTime()===e.getTime():!1;if(n=K(t),s=K(e),n||s)return t===e;if(n=y(t),s=y(e),n||s)return n&&s?re(t,e):!1;if(n=$(t),s=$(e),n||s){if(!n||!s)return!1;const r=Object.keys(t).length,i=Object.keys(e).length;if(r!==i)return!1;for(const o in t){const c=t.hasOwnProperty(o),l=e.hasOwnProperty(o);if(c&&!l||!c&&l||!N(t[o],e[o]))return!1}}return String(t)===String(e)}function G(t,e){return t.findIndex(n=>N(n,e))}const ie=Object.assign,oe=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},ce=Object.prototype.hasOwnProperty,Y=(t,e)=>ce.call(t,e),y=Array.isArray,U=t=>Q(t)==="[object Map]",mt=t=>Q(t)==="[object Date]",P=t=>typeof t=="string",K=t=>typeof t=="symbol",$=t=>t!==null&&typeof t=="object",le=Object.prototype.toString,Q=t=>le.call(t),fe=t=>Q(t).slice(8,-1),X=t=>P(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,gt=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},ae=/-(\w)/g,ue=gt(t=>t.replace(ae,(e,n)=>n?n.toUpperCase():"")),he=/\B([A-Z])/g,yt=gt(t=>t.replace(he,"-$1").toLowerCase()),pe=(t,e)=>!Object.is(t,e),bt=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let de;function vt(t,e=de){e&&e.active&&e.effects.push(t)}const xt=t=>{const e=new Set(t);return e.w=0,e.n=0,e},wt=t=>(t.w&O)>0,_t=t=>(t.n&O)>0,me=({deps:t})=>{if(t.length)for(let e=0;e<t.length;e++)t[e].w|=O},ge=t=>{const{deps:e}=t;if(e.length){let n=0;for(let s=0;s<e.length;s++){const r=e[s];wt(r)&&!_t(r)?r.delete(t):e[n++]=r,r.w&=~O,r.n&=~O}e.length=n}},tt=new WeakMap;let B=0,O=1;const et=30;let E;const W=Symbol(""),Et=Symbol("");class ye{constructor(e,n=null,s){this.fn=e,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,vt(this,s)}run(){if(!this.active)return this.fn();let e=E,n=j;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=E,E=this,j=!0,O=1<<++B,B<=et?me(this):St(this),this.fn()}finally{B<=et&&ge(this),O=1<<--B,E=this.parent,j=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){E===this?this.deferStop=!0:this.active&&(St(this),this.onStop&&this.onStop(),this.active=!1)}}function St(t){const{deps:e}=t;if(e.length){for(let n=0;n<e.length;n++)e[n].delete(t);e.length=0}}function be(t,e){t.effect&&(t=t.effect.fn);const n=new ye(t);e&&(ie(n,e),e.scope&&vt(n,e.scope)),(!e||!e.lazy)&&n.run();const s=n.run.bind(n);return s.effect=n,s}function ve(t){t.effect.stop()}let j=!0;const $t=[];function xe(){$t.push(j),j=!1}function we(){const t=$t.pop();j=t===void 0?!0:t}function q(t,e,n){if(j&&E){let s=tt.get(t);s||tt.set(t,s=new Map);let r=s.get(n);r||s.set(n,r=xt()),_e(r)}}function _e(t,e){let n=!1;B<=et?_t(t)||(t.n|=O,n=!wt(t)):n=!t.has(E),n&&(t.add(E),E.deps.push(t))}function nt(t,e,n,s,r,i){const o=tt.get(t);if(!o)return;let c=[];if(e==="clear")c=[...o.values()];else if(n==="length"&&y(t))o.forEach((l,f)=>{(f==="length"||f>=s)&&c.push(l)});else switch(n!==void 0&&c.push(o.get(n)),e){case"add":y(t)?X(n)&&c.push(o.get("length")):(c.push(o.get(W)),U(t)&&c.push(o.get(Et)));break;case"delete":y(t)||(c.push(o.get(W)),U(t)&&c.push(o.get(Et)));break;case"set":U(t)&&c.push(o.get(W));break}if(c.length===1)c[0]&&Ot(c[0]);else{const l=[];for(const f of c)f&&l.push(...f);Ot(xt(l))}}function Ot(t,e){const n=y(t)?t:[...t];for(const s of n)s.computed&&Tt(s);for(const s of n)s.computed||Tt(s)}function Tt(t,e){(t!==E||t.allowRecurse)&&(t.scheduler?t.scheduler():t.run())}const Ee=te("__proto__,__v_isRef,__isVue"),At=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(K)),Se=Rt(),$e=Rt(!0),kt=Oe();function Oe(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const s=C(this);for(let i=0,o=this.length;i<o;i++)q(s,"get",i+"");const r=s[e](...n);return r===-1||r===!1?s[e](...n.map(C)):r}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){xe();const s=C(this)[e].apply(this,n);return we(),s}}),t}function Rt(t=!1,e=!1){return function(s,r,i){if(r==="__v_isReactive")return!t;if(r==="__v_isReadonly")return t;if(r==="__v_isShallow")return e;if(r==="__v_raw"&&i===(t?e?Ne:jt:e?Ie:Mt).get(s))return s;const o=y(s);if(!t&&o&&Y(kt,r))return Reflect.get(kt,r,i);const c=Reflect.get(s,r,i);return(K(r)?At.has(r):Ee(r))||(t||q(s,"get",r),e)?c:z(c)?o&&X(r)?c:c.value:$(c)?t?Be(c):D(c):c}}const Te=Ae();function Ae(t=!1){return function(n,s,r,i){let o=n[s];if(st(o)&&z(o)&&!z(r))return!1;if(!t&&!st(r)&&(De(r)||(r=C(r),o=C(o)),!y(n)&&z(o)&&!z(r)))return o.value=r,!0;const c=y(n)&&X(s)?Number(s)<n.length:Y(n,s),l=Reflect.set(n,s,r,i);return n===C(i)&&(c?pe(r,o)&&nt(n,"set",s,r):nt(n,"add",s,r)),l}}function ke(t,e){const n=Y(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&n&&nt(t,"delete",e,void 0),s}function Re(t,e){const n=Reflect.has(t,e);return(!K(e)||!At.has(e))&&q(t,"has",e),n}function Me(t){return q(t,"iterate",y(t)?"length":W),Reflect.ownKeys(t)}const je={get:Se,set:Te,deleteProperty:ke,has:Re,ownKeys:Me},Ce={get:$e,set(t,e){return!0},deleteProperty(t,e){return!0}},Mt=new WeakMap,Ie=new WeakMap,jt=new WeakMap,Ne=new WeakMap;function Pe(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Ke(t){return t.__v_skip||!Object.isExtensible(t)?0:Pe(fe(t))}function D(t){return st(t)?t:Ct(t,!1,je,null,Mt)}function Be(t){return Ct(t,!0,Ce,null,jt)}function Ct(t,e,n,s,r){if(!$(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=r.get(t);if(i)return i;const o=Ke(t);if(o===0)return t;const c=new Proxy(t,o===2?s:n);return r.set(t,c),c}function st(t){return!!(t&&t.__v_isReadonly)}function De(t){return!!(t&&t.__v_isShallow)}function C(t){const e=t&&t.__v_raw;return e?C(e):t}function z(t){return!!(t&&t.__v_isRef===!0)}let rt=!1;const F=[],ze=Promise.resolve(),L=t=>ze.then(t),It=t=>{F.includes(t)||F.push(t),rt||(rt=!0,L(Le))},Le=()=>{for(const t of F)t();F.length=0,rt=!1},Ve=/^(spellcheck|draggable|form|list|type)$/,it=({el:t,get:e,effect:n,arg:s,modifiers:r})=>{let i;s==="class"&&(t._class=t.className),n(()=>{let o=e();if(s)r!=null&&r.camel&&(s=ue(s)),ot(t,s,o,i);else{for(const c in o)ot(t,c,o[c],i&&i[c]);for(const c in i)(!o||!(c in o))&&ot(t,c,null)}i=o})},ot=(t,e,n,s)=>{if(e==="class")t.setAttribute("class",dt(t._class?[t._class,n]:n)||"");else if(e==="style"){n=pt(n);const{style:r}=t;if(!n)t.removeAttribute("style");else if(P(n))n!==s&&(r.cssText=n);else{for(const i in n)ct(r,i,n[i]);if(s&&!P(s))for(const i in s)n[i]==null&&ct(r,i,"")}}else!(t instanceof SVGElement)&&e in t&&!Ve.test(e)?(t[e]=n,e==="value"&&(t._value=n)):e==="true-value"?t._trueValue=n:e==="false-value"?t._falseValue=n:n!=null?t.setAttribute(e,n):t.removeAttribute(e)},Nt=/\s*!important$/,ct=(t,e,n)=>{y(n)?n.forEach(s=>ct(t,e,s)):e.startsWith("--")?t.setProperty(e,n):Nt.test(n)?t.setProperty(yt(e),n.replace(Nt,""),"important"):t[e]=n},T=(t,e)=>{const n=t.getAttribute(e);return n!=null&&t.removeAttribute(e),n},A=(t,e,n,s)=>{t.addEventListener(e,n,s)},He=/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,We=["ctrl","shift","alt","meta"],qe={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>We.some(n=>t[`${n}Key`]&&!e[n])},Pt=({el:t,get:e,exp:n,arg:s,modifiers:r})=>{if(!s)return;let i=He.test(n)?e(`(e => ${n}(e))`):e(`($event => { ${n} })`);if(s==="vue:mounted"){L(i);return}else if(s==="vue:unmounted")return()=>i();if(r){s==="click"&&(r.right&&(s="contextmenu"),r.middle&&(s="mouseup"));const o=i;i=c=>{if(!("key"in c&&!(yt(c.key)in r))){for(const l in r){const f=qe[l];if(f&&f(c,r))return}return o(c)}}}return A(t,s,i,r),()=>{t.removeEventListener(s,i,r)}},Fe=({el:t,get:e,effect:n})=>{const s=t.style.display;n(()=>{t.style.display=e()?s:"none"})},Kt=({el:t,get:e,effect:n})=>{n(()=>{t.textContent=Bt(e())})},Bt=t=>t==null?"":$(t)?JSON.stringify(t,null,2):String(t),Je=({el:t,get:e,effect:n})=>{n(()=>{t.innerHTML=e()})},Ze=({el:t,exp:e,get:n,effect:s,modifiers:r})=>{const i=t.type,o=n(`(val) => { ${e} = val }`),{trim:c,number:l=i==="number"||i==="range"}=r||{};if(t.tagName==="SELECT"){const f=t;A(t,"change",()=>{const a=Array.prototype.filter.call(f.options,u=>u.selected).map(u=>l?bt(k(u)):k(u));o(f.multiple?a:a[0])}),s(()=>{const a=n(),u=f.multiple;for(let h=0,v=f.options.length;h<v;h++){const b=f.options[h],x=k(b);if(u)y(a)?b.selected=G(a,x)>-1:b.selected=a.has(x);else if(N(k(b),a)){f.selectedIndex!==h&&(f.selectedIndex=h);return}}!u&&f.selectedIndex!==-1&&(f.selectedIndex=-1)})}else if(i==="checkbox"){A(t,"change",()=>{const a=n(),u=t.checked;if(y(a)){const h=k(t),v=G(a,h),b=v!==-1;if(u&&!b)o(a.concat(h));else if(!u&&b){const x=[...a];x.splice(v,1),o(x)}}else o(Dt(t,u))});let f;s(()=>{const a=n();y(a)?t.checked=G(a,k(t))>-1:a!==f&&(t.checked=N(a,Dt(t,!0))),f=a})}else if(i==="radio"){A(t,"change",()=>{o(k(t))});let f;s(()=>{const a=n();a!==f&&(t.checked=N(a,k(t)))})}else{const f=a=>c?a.trim():l?bt(a):a;A(t,"compositionstart",Ge),A(t,"compositionend",Ye),A(t,r!=null&&r.lazy?"change":"input",()=>{t.composing||o(f(t.value))}),c&&A(t,"change",()=>{t.value=t.value.trim()}),s(()=>{if(t.composing)return;const a=t.value,u=n();document.activeElement===t&&f(a)===u||a!==u&&(t.value=u)})}},k=t=>"_value"in t?t._value:t.value,Dt=(t,e)=>{const n=e?"_trueValue":"_falseValue";return n in t?t[n]:e},Ge=t=>{t.target.composing=!0},Ye=t=>{const e=t.target;e.composing&&(e.composing=!1,Ue(e,"input"))},Ue=(t,e)=>{const n=document.createEvent("HTMLEvents");n.initEvent(e,!0,!0),t.dispatchEvent(n)},zt=Object.create(null),V=(t,e,n)=>Lt(t,`return(${e})`,n),Lt=(t,e,n)=>{const s=zt[e]||(zt[e]=Qe(e));try{return s(t,n)}catch(r){console.error(r)}},Qe=t=>{try{return new Function("$data","$el",`with($data){${t}}`)}catch(e){return console.error(`${e.message} in expression: ${t}`),()=>{}}},Xe=({el:t,ctx:e,exp:n,effect:s})=>{L(()=>s(()=>Lt(e.data,n,t)))},tn=({el:t,get:e,exp:n,arg:s})=>{let r=!1,i=o=>{if(e(s)&&!r){r=!0;return}t.contains(o.target)||(e(s)&&e(n),r=!1)};return document.addEventListener("click",i),()=>{document.removeEventListener("click",i)}},en={bind:it,on:Pt,show:Fe,text:Kt,html:Je,model:Ze,effect:Xe,away:tn},nn=(t,e,n)=>{const s=t.parentElement,r=new Comment("v-if");s.insertBefore(r,t);const i=[{exp:e,el:t}];let o,c;for(;(o=t.nextElementSibling)&&(c=null,T(o,"v-else")===""||(c=T(o,"v-else-if")));)s.removeChild(o),i.push({exp:c,el:o});const l=t.nextSibling;s.removeChild(t);let f,a=-1;const u=()=>{f&&(s.insertBefore(r,f.el),f.remove(),f=void 0)};return n.effect(()=>{for(let h=0;h<i.length;h++){const{exp:v,el:b}=i[h];if(!v||V(n.data,v)){h!==a&&(u(),f=new at(b,n),f.insert(s,r),s.removeChild(r),a=h);return}}a=-1,u()}),l},sn=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,Vt=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,rn=/^\(|\)$/g,on=/^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/,cn=(t,e,n)=>{const s=e.match(sn);if(!s)return;const r=t.nextSibling,i=t.parentElement,o=new Text("");i.insertBefore(o,t),i.removeChild(t);const c=s[2].trim();let l=s[1].trim().replace(rn,"").trim(),f,a=!1,u,h,v="key",b=t.getAttribute(v)||t.getAttribute(v=":key")||t.getAttribute(v="v-bind:key");b&&(t.removeAttribute(v),v==="key"&&(b=JSON.stringify(b)));let x;(x=l.match(Vt))&&(l=l.replace(Vt,"").trim(),u=x[1].trim(),x[2]&&(h=x[2].trim())),(x=l.match(on))&&(f=x[1].split(",").map(m=>m.trim()),a=l[0]==="[");let ut=!1,R,H,J;const Xt=m=>{const w=new Map,p=[];if(y(m))for(let d=0;d<m.length;d++)p.push(Z(w,m[d],d));else if(typeof m=="number")for(let d=0;d<m;d++)p.push(Z(w,d+1,d));else if($(m)){let d=0;for(const g in m)p.push(Z(w,m[g],d++,g))}return[p,w]},Z=(m,w,p,d)=>{const g={};f?f.forEach((M,S)=>g[M]=w[a?S:M]):g[l]=w,d?(u&&(g[u]=d),h&&(g[h]=p)):u&&(g[u]=p);const I=Zt(n,g),_=b?V(I.data,b):p;return m.set(_,p),I.key=_,I},ht=(m,w)=>{const p=new at(t,m);return p.key=m.key,p.insert(i,w),p};return n.effect(()=>{const m=V(n.data,c),w=J;if([H,J]=Xt(m),!ut)R=H.map(p=>ht(p,o)),ut=!0;else{for(let _=0;_<R.length;_++)J.has(R[_].key)||R[_].remove();const p=[];let d=H.length,g,I;for(;d--;){const _=H[d],M=w.get(_.key);let S;M==null?S=ht(_,g?g.el:o):(S=R[M],Object.assign(S.ctx.data,_.data),M!==d&&(R[M+1]!==g||I===g)&&(I=S,S.insert(i,g?g.el:o))),p.unshift(g=S)}R=p}}),r},Ht=({el:t,ctx:{data:{$refs:e}},get:n,effect:s})=>{let r;return s(()=>{const i=n();e[i]=t,r&&i!==r&&delete e[r],r=i}),()=>{r&&delete e[r]}},ln=/^(?:v-|:|@)/,fn=/\.([\w-]+)/g;let lt=!1;const Wt=(t,e)=>{const n=t.nodeType;if(n===1){const s=t;if(s.hasAttribute("v-pre"))return;T(s,"v-cloak");let r;if(r=T(s,"v-if"))return nn(s,r,e);if(r=T(s,"v-for"))return cn(s,r,e);if((r=T(s,"v-data"))||r===""){const c=r?V(e.data,r,s):{};e=Zt(e,c),c.$template&&an(s,c.$template)}const i=T(s,"v-once")!=null;i&&(lt=!0),(r=T(s,"ref"))&&ft(s,Ht,`"${r}"`,e),qt(s,e);const o=[];for(const{name:c,value:l}of[...s.attributes])ln.test(c)&&c!=="v-cloak"&&(c==="v-model"?o.unshift([c,l]):c[0]==="@"||/^v-on\b/.test(c)?o.push([c,l]):Ft(s,c,l,e));for(const[c,l]of o)Ft(s,c,l,e);i&&(lt=!1)}else if(n===3){const s=t.data;if(s.includes(e.delimiters[0])){let r=[],i=0,o;for(;o=e.delimitersRE.exec(s);){const c=s.slice(i,o.index);c&&r.push(JSON.stringify(c)),r.push(`$s(${o[1]})`),i=o.index+o[0].length}i<s.length&&r.push(JSON.stringify(s.slice(i))),ft(t,Kt,r.join("+"),e)}}else n===11&&qt(t,e)},qt=(t,e)=>{let n=t.firstChild;for(;n;)n=Wt(n,e)||n.nextSibling},Ft=(t,e,n,s)=>{let r,i,o;if(e=e.replace(fn,(c,l)=>((o||(o={}))[l]=!0,"")),e[0]===":")r=it,i=e.slice(1);else if(e[0]==="@")r=Pt,i=e.slice(1);else{const c=e.indexOf(":"),l=c>0?e.slice(2,c):e.slice(2);r=en[l]||s.dirs[l],i=c>0?e.slice(c+1):void 0}r&&(r===it&&i==="ref"&&(r=Ht),ft(t,r,n,s,i,o),t.removeAttribute(e))},ft=(t,e,n,s,r,i)=>{const o=e({el:t,get:(c=n)=>V(s.data,c,t),effect:s.effect,ctx:s,exp:n,arg:r,modifiers:i});o&&s.cleanups.push(o)},an=(t,e)=>{if(e[0]==="#"){const n=document.querySelector(e);t.appendChild(n.content.cloneNode(!0));return}t.innerHTML=e},Jt=t=>{const e={delimiters:["{{","}}"],delimitersRE:/\{\{([^]+?)\}\}/g,...t,data:t?t.data:D({}),dirs:t?t.dirs:{},effects:[],blocks:[],cleanups:[],effect:n=>{if(lt)return It(n),n;const s=be(n,{scheduler:()=>It(s)});return e.effects.push(s),s}};return e},Zt=(t,e={})=>{const n=t.data,s=Object.create(n);Object.defineProperties(s,Object.getOwnPropertyDescriptors(e)),s.$refs=Object.create(n.$refs);const r=D(new Proxy(s,{set(i,o,c,l){return l===r&&!i.hasOwnProperty(o)?Reflect.set(n,o,c):Reflect.set(i,o,c,l)}}));return Gt(r),{...t,data:r}},Gt=t=>{for(const e of Object.keys(t))typeof t[e]=="function"&&(t[e]=t[e].bind(t))};class at{get el(){return this.start||this.template}constructor(e,n,s=!1){this.isFragment=e instanceof HTMLTemplateElement,s?this.template=e:this.isFragment?this.template=e.content.cloneNode(!0):this.template=e.cloneNode(!0),s?this.ctx=n:(this.parentCtx=n,n.blocks.push(this),this.ctx=Jt(n)),Wt(this.template,this.ctx)}insert(e,n=null){if(this.isFragment)if(this.start){let s=this.start,r;for(;s&&(r=s.nextSibling,e.insertBefore(s,n),s!==this.end);)s=r}else this.start=new Text(""),this.end=new Text(""),e.insertBefore(this.end,n),e.insertBefore(this.start,this.end),e.insertBefore(this.template,this.end);else e.insertBefore(this.template,n)}remove(){if(this.parentCtx&&oe(this.parentCtx.blocks,this),this.start){const e=this.start.parentNode;let n=this.start,s;for(;n&&(s=n.nextSibling,e.removeChild(n),n!==this.end);)n=s}else this.template.parentNode.removeChild(this.template);this.teardown()}teardown(){this.ctx.blocks.forEach(e=>{e.teardown()}),this.ctx.effects.forEach(ve),this.ctx.cleanups.forEach(e=>e())}}const Yt=t=>t.replace(/[-.*+?^${}()|[\]\/\\]/g,"\\$&"),Ut=t=>{const e=Jt();if(t&&(e.data=D(t),Gt(e.data),t.$delimiters)){const[s,r]=e.delimiters=t.$delimiters;e.delimitersRE=new RegExp(Yt(s)+"([^]+?)"+Yt(r),"g")}e.data.$s=Bt,e.data.$nextTick=L,e.data.$refs=Object.create(null);let n;return{directive(s,r){return r?(e.dirs[s]=r,this):e.dirs[s]},use(s,r={}){return s.install(this,r),this},mount(s){if(typeof s=="string"&&(s=document.querySelector(s),!s))return;s=s||document.documentElement;let r;return s.hasAttribute("v-data")?r=[s]:r=[...s.querySelectorAll("[v-data]")].filter(i=>!i.matches("[v-data] [v-data]")),r.length||(r=[s]),n=r.map(i=>new at(i,e,!0)),this},unmount(){n.forEach(s=>s.teardown())}}},un="0.5.3",Qt=document.currentScript;Qt&&Qt.hasAttribute("init")&&Ut().mount();export{Ut as createApp,L as nextTick,D as reactive,un as version};
