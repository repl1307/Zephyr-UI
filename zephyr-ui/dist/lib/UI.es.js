import o from"./ui-helpers/UIEvents.es.js";import a from"./ui-helpers/UIMods.es.js";/*!
 * zephyr-ui v1.1.3
 * (c) 2025 Zacharia Haggy (repl1307)
 * Released under the MIT License
 */const t=class t{remove(){throw new Error("Method not implemented.")}static parse(e){return t.parser.parseFromString(e,"text/html").body}static createElement(e,i=""){const r=document.createElement(e);return r.textContent=i,r}constructor(e="div"){typeof e=="string"?this.html=document.createElement(e):this.html=e??document.createElement("div"),this.children=[],this.preserveOnRerender=!1,this.parent=null,t.elements.push(this)}};t.elements=[],t.parser=new DOMParser,t.initialized=!1;let s=t;class c extends s{}const l=o(a(c));class h extends l{}export{s as BaseUI,h as default};
//# sourceMappingURL=UI.es.js.map
