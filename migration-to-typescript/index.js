(()=>{"use strict";var n={291:(n,e,t)=>{t.d(e,{Z:()=>i});var r=t(645),o=t.n(r)()((function(n){return n[1]}));o.push([n.id,"/* ========================BURGER======================== */\n\n.burger {\n  display: none;\n  position: relative;\n  width: 30px;\n  height: 20px;\n  flex-direction: column;\n  justify-content: space-between;\n  cursor: pointer;\n  padding: 2px;\n  transition: transform .3s ease;\n}\n\n.burger__line {\n  width: 30px;\n  height: 2px;\n  background-color: var(--btn);\n  transition: transform .3s ease;\n}\n\n.burger_shown > .burger__line:first-child {\n  transform: rotate(45deg) translateY(-50%);\n  position: relative;\n  top: 50%;\n}\n\n.burger_shown > .burger__line:nth-child(2) {\n  transform: scale(0);\n}\n\n.burger_shown > .burger__line:last-child {\n  transform: rotate(-45deg) translateY(50%);\n  position: relative;\n  bottom: 50%;\n}\n\n@media (max-width: 767.7px) {\n  .burger {\n    display: flex;\n  }\n}",""]);const i=o},669:(n,e,t)=>{t.d(e,{Z:()=>i});var r=t(645),o=t.n(r)()((function(n){return n[1]}));o.push([n.id,".news__item {\n    flex: 1 1 100%;\n    display: flex;\n    flex-direction: column;\n    margin: 1rem auto;\n    margin-bottom: 1.6%;\n    background: #fff;\n    color: #333;\n    line-height: 1.4;\n    font-family: Arial, sans-serif;\n    border-radius: 5px;\n    overflow: hidden;\n}\n\n.news__item:hover .news__meta-photo {\n    transform: scale(1.3) rotate(3deg);\n}\n\n.news__item .news__meta {\n    position: relative;\n    height: 200px;\n}\n\n.news__item .news__meta-photo {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    background-size: cover;\n    background-position: center;\n    transition: transform 0.2s;\n}\n\n.news__item .news__meta-details,\n.news__item .news__meta-details ul {\n    margin: auto;\n    padding: 0;\n    list-style: none;\n}\n\n.news__item .news__meta-details {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: -120%;\n    margin: auto;\n    transition: left 0.2s;\n    background: rgba(0, 0, 0, 0.6);\n    color: #fff;\n    padding: 10px;\n    width: 100%;\n    font-size: 0.9rem;\n}\n\n.news__item .news__description {\n    padding: 1rem;\n    background: #fff;\n    position: relative;\n    z-index: 1;\n}\n\n.news__item .news__description h2 {\n    line-height: 1;\n    margin: 0;\n    font-size: 1.7rem;\n}\n\n.news__item .news__description h3 {\n    font-size: 1rem;\n    font-weight: 300;\n    text-transform: uppercase;\n    color: #a2a2a2;\n    margin-top: 5px;\n}\n\n.news__item .news__description .news__read-more {\n    text-align: right;\n}\n\n.news__item .news__description .news__read-more a {\n    color: #5ad67d;\n    display: inline-block;\n    position: relative;\n    text-decoration: none;\n    font-weight: 800;\n}\n\n.news__item .news__description .news__read-more a:after {\n    content: '→';\n    margin-left: -10px;\n    opacity: 0;\n    vertical-align: middle;\n    transition: margin 0.3s, opacity 0.3s;\n}\n\n.news__item .news__description .news__read-more a:hover:after {\n    margin-left: 5px;\n    opacity: 1;\n}\n\n.news__item p {\n    margin: 1rem 0 0;\n}\n\n.news__item p:first-of-type {\n    margin-top: 1.25rem;\n    position: relative;\n}\n\n.news__item p:first-of-type:before {\n    content: '';\n    position: absolute;\n    height: 5px;\n    background: #5ad67d;\n    width: 35px;\n    top: -0.75rem;\n    border-radius: 3px;\n}\n\n.news__item:hover .news__meta-details {\n    left: 0%;\n}\n\n@media (min-width: 640px) {\n    .news__item {\n        flex-direction: row;\n        /* max-width: 700px; */\n    }\n\n    .news__item .news__meta {\n        flex-basis: 40%;\n        height: auto;\n    }\n\n    .news__item .news__description {\n        flex-basis: 60%;\n    }\n\n    .news__item .news__description:before {\n        -webkit-transform: skewX(-3deg);\n        transform: skewX(-3deg);\n        content: '';\n        background: #fff;\n        width: 30px;\n        position: absolute;\n        left: -10px;\n        top: 0;\n        bottom: 0;\n        z-index: -1;\n    }\n\n    .news__item.alt {\n        flex-direction: row-reverse;\n    }\n\n    .news__item.alt .news__description:before {\n        left: inherit;\n        right: -10px;\n        -webkit-transform: skew(3deg);\n        transform: skew(3deg);\n    }\n\n    .news__item.alt .news__meta-details {\n        padding-left: 25px;\n    }\n}\n",""]);const i=o},501:(n,e,t)=>{t.d(e,{Z:()=>i});var r=t(645),o=t.n(r)()((function(n){return n[1]}));o.push([n.id,".sources {\n    flex-shrink: 0;\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n    flex-wrap: wrap;\n    justify-content: flex-start;\n    overflow: auto;\n    align-items: center;\n    font: 300 1em 'Fira Sans', sans-serif;\n    background: var(--header);\n}\n\n.source__item {\n    background: none;\n    border: 2px solid var(--btn);\n    font: inherit;\n    line-height: 1;\n    margin: 0.5em;\n    padding: 1em 2em;\n    color: var(--btn);\n    transition: 0.25s;\n    cursor: pointer;\n}\n\n.source__item:hover,\n.source__item:focus {\n    border-color: var(--btn-hov);\n    color: var(--btn-hov);\n    box-shadow: 0 0.5em 0.5em -0.4em var(--btn-hov);\n    transform: translateY(-0.25em);\n}\n\n.source__item-name {\n    font-weight: 400;\n    white-space: nowrap;\n}\n\n.sources.sources_shown {\n    left: 0;\n}\n\n@media (max-width: 767.7px) {\n    .sources {\n        box-sizing: border-box;\n        padding: 30px 10px 10px 10px;\n        display: block;\n        position: absolute;\n        z-index: 2;\n        top: 60px;\n        left: -100vw;\n        flex-direction: column;\n        height: calc(100vh - 60px);\n        transition: all .3s ease;\n        width: 100%;\n    }\n}\n",""]);const i=o},215:(n,e,t)=>{t.d(e,{Z:()=>h});var r=t(645),o=t.n(r),i=t(667),s=t.n(i),a=t(518),c=t(842),l=o()((function(n){return n[1]})),d=s()(a.Z),u=s()(c.Z);l.push([n.id,'body[data-theme="dark" ] {\n  --background: #17181c;\n  --text: #fff;\n  --header: #17181c;\n  --btn: #70d6ff;\n  --btn-hov: #3fcc59;\n  --theme-icon: url('+d+');\n}\n\nbody[data-theme="light" ] {\n  --background: #FAFAFA;\n  --text: #17181c;\n  --header: DeepSkyBlue;\n  --btn: #17181c;\n  --btn-hov: OrangeRed;\n  --theme-icon: url('+u+");\n}\n\n.theme-switcher {\n  flex: 1 0 auto;\n  width: 40px;\n  height: 40px;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-image: var(--theme-icon);\n  cursor: pointer;\n}",""]);const h=l},767:(n,e,t)=>{t.d(e,{Z:()=>i});var r=t(645),o=t.n(r)()((function(n){return n[1]}));o.push([n.id,"body, html {\n    height: 100%;\n}\nbody {\n    color: var(--text);\n    background: var(--background);\n    font-family: sans-serif;\n    display: flex;\n    flex-direction: column;\n    min-height: 100%;\n    padding: 0;\n    margin: 0;\n}\n\nmain {\n    padding: 20px 10px;\n    flex: 1 1 auto;\n    display: flex;\n    gap: 20px;\n}\n\nheader {\n    padding: 10px 30px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    text-align: center;\n    gap: 15px;\n    background-color: var(--header);\n}\n\nheader h1 {\n    font-size: 40px;\n    font-weight: 800;\n    flex: 1 1 100%;\n}\n\nfooter {\n    height: 100px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\nfooter .copyright {\n    font-size: 14px;\n    color: #333;\n    text-align: center;\n}\nfooter .copyright a {\n    color: #444;\n}\nfooter .copyright a:hover {\n    color: #555;\n}\nfooter .copyright:before {\n    content: '©';\n}\n\n@media (max-width: 767.7px) {\n\n    header h1 {\n        font-size: 16px;\n        font-weight: 600;\n    }\n\n    header {\n        padding: 10px;\n    }\n}",""]);const i=o},645:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t=n(e);return e[2]?"@media ".concat(e[2]," {").concat(t,"}"):t})).join("")},e.i=function(n,t,r){"string"==typeof n&&(n=[[null,n,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var s=this[i][0];null!=s&&(o[s]=!0)}for(var a=0;a<n.length;a++){var c=[].concat(n[a]);r&&o[c[0]]||(t&&(c[2]?c[2]="".concat(t," and ").concat(c[2]):c[2]=t),e.push(c))}},e}},667:n=>{n.exports=function(n,e){return e||(e={}),"string"!=typeof(n=n&&n.__esModule?n.default:n)?n:(/^['"].*['"]$/.test(n)&&(n=n.slice(1,-1)),e.hash&&(n+=e.hash),/["'() \t\n]/.test(n)||e.needQuotes?'"'.concat(n.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):n)}},518:(n,e,t)=>{t.d(e,{Z:()=>r});const r=t.p+"d0c5f18523a6b4bba8f82d9a32b86bc1.png"},842:(n,e,t)=>{t.d(e,{Z:()=>r});const r=t.p+"4eec5929e4111f849506d2148951b537.png"},379:(n,e,t)=>{var r,o=function(){var n={};return function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}n[e]=t}return n[e]}}(),i=[];function s(n){for(var e=-1,t=0;t<i.length;t++)if(i[t].identifier===n){e=t;break}return e}function a(n,e){for(var t={},r=[],o=0;o<n.length;o++){var a=n[o],c=e.base?a[0]+e.base:a[0],l=t[c]||0,d="".concat(c," ").concat(l);t[c]=l+1;var u=s(d),h={css:a[1],media:a[2],sourceMap:a[3]};-1!==u?(i[u].references++,i[u].updater(h)):i.push({identifier:d,updater:g(h,e),references:1}),r.push(d)}return r}function c(n){var e=document.createElement("style"),r=n.attributes||{};if(void 0===r.nonce){var i=t.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(n){e.setAttribute(n,r[n])})),"function"==typeof n.insert)n.insert(e);else{var s=o(n.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(e)}return e}var l,d=(l=[],function(n,e){return l[n]=e,l.filter(Boolean).join("\n")});function u(n,e,t,r){var o=t?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(n.styleSheet)n.styleSheet.cssText=d(e,o);else{var i=document.createTextNode(o),s=n.childNodes;s[e]&&n.removeChild(s[e]),s.length?n.insertBefore(i,s[e]):n.appendChild(i)}}function h(n,e,t){var r=t.css,o=t.media,i=t.sourceMap;if(o?n.setAttribute("media",o):n.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleSheet)n.styleSheet.cssText=r;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(r))}}var p=null,m=0;function g(n,e){var t,r,o;if(e.singleton){var i=m++;t=p||(p=c(e)),r=u.bind(null,t,i,!1),o=u.bind(null,t,i,!0)}else t=c(e),r=h.bind(null,t,e),o=function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)};return r(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;r(n=e)}else o()}}n.exports=function(n,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=(void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r));var t=a(n=n||[],e);return function(n){if(n=n||[],"[object Array]"===Object.prototype.toString.call(n)){for(var r=0;r<t.length;r++){var o=s(t[r]);i[o].references--}for(var c=a(n,e),l=0;l<t.length;l++){var d=s(t[l]);0===i[d].references&&(i[d].updater(),i.splice(d,1))}t=c}}}}},e={};function t(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={id:r,exports:{}};return n[r](i,i.exports,t),i.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n;t.g.importScripts&&(n=t.g.location+"");var e=t.g.document;if(!n&&e&&(e.currentScript&&(n=e.currentScript.src),!n)){var r=e.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&!n;)n=r[o--].src}if(!n)throw new Error("Automatic publicPath is not supported in this browser");n=n.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=n})(),t.nc=void 0,(()=>{var n;!function(n){n[n.ru=0]="ru",n[n.de=1]="de",n[n.en=2]="en"}(n||(n={}));const e=class{constructor(n,e){this.baseLink=n,this.options=e}getResp({endpoint:n,options:e={}},t=(()=>{console.error("No callback for GET response")})){this.load("GET",n,t,e)}errorHandler(n){if(!n.ok)throw 401!==n.status&&404!==n.status||console.log(`Sorry, but there is ${n.status} error: ${n.statusText}`),Error(n.statusText);return n}makeUrl(n,e){const t=Object.assign(Object.assign({},this.options),n);let r=`${this.baseLink}${e}?`;return Object.keys(t).forEach((n=>{r+=`${n}=${t[n]}&`})),r.slice(0,-1)}load(n,e,t,r={}){fetch(this.makeUrl(r,e),{method:n}).then(this.errorHandler).then((n=>n.json())).then((n=>t(n))).catch((n=>console.error(n)))}},r=class extends e{constructor(){super("https://rss-news-api.onrender.com/",{apiKey:"82717d1318ca471497c48dcbbe84a120"})}},o=class extends r{constructor(){super(),this.lang=document.getElementById("langSwitcher")}getLang(){var e;const t=null===(e=this.lang)||void 0===e?void 0:e.value;return t&&t in n?t:"ru"}getSources(n){super.getResp({endpoint:"sources",options:{language:this.getLang()}},n)}getNews(n,e){let t=n.target;const r=n.currentTarget;for(;t!==r;){if(t&&t.classList.contains("source__item")){const n=t.getAttribute("data-source-id");return void(r&&n&&r.getAttribute("data-source")!==n&&(r.setAttribute("data-source",n),super.getResp({endpoint:"everything",options:{sources:n,language:this.getLang()}},e)))}t.parentNode&&(t=t.parentNode)}}};var i=t(379),s=t.n(i),a=t(669);s()(a.Z,{insert:"head",singleton:!1}),a.Z.locals;var c=t(501);s()(c.Z,{insert:"head",singleton:!1}),c.Z.locals;var l=t(291);s()(l.Z,{insert:"head",singleton:!1}),l.Z.locals;var d=t(215);s()(d.Z,{insert:"head",singleton:!1}),d.Z.locals;class u{constructor(){this.news=new class{draw(n){const e=n.length>=10?n.filter(((n,e)=>e<10)):n,t=document.createDocumentFragment(),r=document.querySelector("#newsItemTemp");e.forEach(((n,e)=>{var o,i,s,a;const c=null==r?void 0:r.content.cloneNode(!0);if(null===c)return;e%2&&(null===(o=c.querySelector(".news__item"))||void 0===o||o.classList.add("alt"));const l=c.querySelector(".news__meta-photo");l&&(l.style.backgroundImage=`url(${n.urlToImage||"./assets/placeholder.png"})`);const d=c.querySelector(".news__meta-photo");d&&(d.textContent=n.author||(null===(i=n.source)||void 0===i?void 0:i.name)||null);const u=c.querySelector(".news__meta-date");u&&(u.textContent=(null===(s=n.publishedAt)||void 0===s?void 0:s.slice(0,10).split("-").reverse().join("-"))||null);const h=c.querySelector(".news__description-title");h&&(h.textContent=n.title||null);const p=c.querySelector(".news__description-source");p&&(p.textContent=(null===(a=n.source)||void 0===a?void 0:a.name)||null);const m=c.querySelector(".news__description-content");m&&(m.textContent=n.description||null);const g=c.querySelector(".news__read-more a");g&&g.setAttribute("href",n.url),t.append(c)}));const o=document.querySelector(".news");o&&(o.innerHTML="",o.appendChild(t))}},this.sources=new class{constructor(){this.sources=document.querySelector(".sources")}draw(n){const e=document.createDocumentFragment(),t=document.querySelector("#sourceItemTemp");n.forEach((n=>{const r=null==t?void 0:t.content.cloneNode(!0);if(!r)return;const o=r.querySelector(".source__item-name");o&&(o.textContent=n.name);const i=r.querySelector(".source__item");i&&i.setAttribute("data-source-id",n.id),e.append(r)})),this.sources&&(this.sources.innerText="",this.sources.append(e))}},this.burger=new class{constructor(){this.burger=null,this.menu=null,this.closeMenu=this.close.bind(this),this.openMenu=this.open.bind(this)}init(){this.getHTMLElements(),this.burger&&this.menu&&this.hydrateBurger()}getHTMLElements(){this.burger=document.getElementById("burger"),this.menu=document.getElementById("menu")}close(){var n,e;null===(n=this.burger)||void 0===n||n.classList.remove("burger_shown"),null===(e=this.menu)||void 0===e||e.classList.remove("sources_shown")}open(){var n,e;null===(n=this.burger)||void 0===n||n.classList.add("burger_shown"),null===(e=this.menu)||void 0===e||e.classList.add("sources_shown")}hydrateBurger(){var n;null===(n=this.burger)||void 0===n||n.addEventListener("click",(n=>{const e=n.target.closest(".burger");null!==e&&([...e.classList].includes("burger_shown")?this.closeMenu():this.openMenu())}))}},this.burger.init(),this.theme=new class{constructor(){this.body=document.body,this.themeSwitcher=document.getElementById("themeSwitcher"),this.toggleTheme=this.toggle.bind(this)}toggle(){"dark"===this.body.dataset.theme?this.body.dataset.theme="light":this.body.dataset.theme="dark"}init(){var n;null===(n=this.themeSwitcher)||void 0===n||n.addEventListener("click",this.toggleTheme)}},this.theme.init()}drawNews(n){const e=(null==n?void 0:n.articles)?null==n?void 0:n.articles:[];this.news.draw(e)}drawSources(n){const e=(null==n?void 0:n.sources)?null==n?void 0:n.sources:[];this.sources.draw(e)}closeMenu(){this.burger.closeMenu()}}var h=t(767);s()(h.Z,{insert:"head",singleton:!1}),h.Z.locals,(new class{constructor(){this.controller=new o,this.view=new u,this.changeSources=this.onLanguageChange.bind(this)}onLanguageChange(){this.controller.getSources((n=>{n&&this.view.drawSources(n),this.view.closeMenu()}))}start(){var n;const e=document.querySelector(".sources");e&&e.addEventListener("click",(n=>this.controller.getNews(n,(n=>{n&&this.view.drawNews(n),this.view.closeMenu()})))),this.controller.getSources((n=>{n&&this.view.drawSources(n),this.view.closeMenu()})),null===(n=this.controller.lang)||void 0===n||n.addEventListener("input",this.changeSources)}}).start()})()})();