/*!
 DMXzone App Connect Routing
 Version: 1.1.3
 (c) 2020 DMXzone.com
 @build 2020-11-07 13:32:57
 */
dmx.config.mapping.a="link",dmx.Component("route",{initialData:{params:{},isExact:!1,isMatch:!1,loading:!1,path:"",url:""},tag:"div",attributes:{path:{type:String,default:"*"},exact:{type:Boolean,default:!1},url:{type:String,default:null}},events:{show:Event,hide:Event,error:Event,unauthorized:Event,forbidden:Event,notfound:Event},render:function(t){this.template=document.createElement("div"),this.template.innerHTML=this.$node.innerHTML,this.$node.innerHTML="",this.$parse(this.template),this.keys=[],this.re=dmx.pathToRegexp(this.props.path,this.keys,{end:this.props.exact}),this.xhr=new XMLHttpRequest,this.xhr.addEventListener("load",this.onload.bind(this)),this.xhr.addEventListener("abort",this.onabort.bind(this)),this.xhr.addEventListener("error",this.onerror.bind(this)),this.xhr.addEventListener("timeout",this.ontimeout.bind(this)),this.update()},update:function(){var t=window.location.pathname,e=document.querySelector('meta[name="ac:base"]'),i=document.querySelector('meta[name="ac:route"]');e&&e.content&&(t=t.replace(e.content.replace(/\/$/,""),"")),i&&i.content&&(t=t.replace(dmx.pathToRegexp(i.content,[],{end:!1}),"").replace(/^(\/+)?/,"/"));var n=this.re.exec(t);if(this.set("path",this.props.path),this.set("isExact",!!this.props.exact),this.set("isMatch",!!n),n){if(this.set("url",n[0]),this.set("params",this.keys.reduce(function(t,e,i){return t[e.name]=n[i+1],t},{})),this.props.url&&this.props.url==this.loaded&&this.data.loading)return;this.props.url&&this.props.url!=this.loaded?(this.$node.innerHTML="",this.children.splice(0).forEach(function(t){t.$destroy()}),this.set("loading",!0),this.loaded=this.props.url,this.xhr.abort(),this.xhr.open("GET",this.props.url),this.xhr.send()):this.template.parentNode||(this.$node.appendChild(this.template),this.evalScripts(this.$node),this.dispatchEvent("show"))}else this.xhr.abort(),this.set("url",""),this.set("params",{}),this.template.parentNode&&(this.$node.removeChild(this.template),this.dispatchEvent("hide"))},evalScripts:function(t){var e=t.querySelectorAll('script[type="text/javascript"],script:not([type])');dmx.array(e).forEach(function(t){var e=document.createElement("script");e.type="text/javascript",t.src&&(e.src=t.src),t.innerHTML&&(e.innerHTML=t.innerHTML),t.parentNode.replaceChild(e,t)})},onload:function(t){this.set("loading",!1),200==this.xhr.status||0==this.xhr.status?(this.template.innerHTML=this.xhr.responseText,this.bindings=[],this.$parse(this.template),this.$node.appendChild(this.template),this.evalScripts(this.$node),window.grecaptcha&&dmx.array(this.$node.querySelectorAll(".g-recaptcha")).forEach(function(t){grecaptcha.render(t)}),this.dispatchEvent("show")):401==this.xhr.status?this.dispatchEvent("unauthorized"):403==this.xhr.status?this.dispatchEvent("forbidden"):404==this.xhr.status?this.dispatchEvent("notfound"):this.dispatchEvent("error")},onabort:function(t){this.set("loading",!1)},onerror:function(t){this.set("loading",!1),this.dispatchEvent("error")},ontimeout:function(t){this.set("loading",!1),this.dispatchEvent("error")}}),dmx.Component("view",{initialData:{loading:!1},tag:"div",events:{load:Event,error:Event,unauthorized:Event,forbidden:Event,notfound:Event},render:function(t){this.xhr=new XMLHttpRequest,this.xhr.addEventListener("load",this.onload.bind(this)),this.xhr.addEventListener("abort",this.onabort.bind(this)),this.xhr.addEventListener("error",this.onerror.bind(this)),this.xhr.addEventListener("timeout",this.ontimeout.bind(this)),this.url=location.pathname,this.$parse()},update:function(t){var e=location.pathname;this.url==e&&this.data.loading||this.url!=e&&(this.set("loading",!0),this.url=e,this.xhr.abort(),this.xhr.open("GET",e),this.xhr.setRequestHeader("accept","text/fragment+html"),this.xhr.send())},evalScripts:function(t){var e=t.querySelectorAll('script[type="text/javascript"],script:not([type])');dmx.array(e).forEach(function(t){var e=document.createElement("script");e.type="text/javascript",t.src&&(e.src=t.src),t.innerHTML&&(e.innerHTML=t.innerHTML),t.parentNode.replaceChild(e,t)})},onload:function(t){this.set("loading",!1),200==this.xhr.status||0==this.xhr.status?(this.children.splice(0).forEach(function(t){t.$destroy()}),this.bindings=[],this.$node.innerHTML=this.xhr.responseText,this.$parse(this.$node),this.evalScripts(this.$node),window.grecaptcha&&dmx.array(this.$node.querySelectorAll(".g-recaptcha")).forEach(function(t){grecaptcha.render(t)}),this.dispatchEvent("load")):401==this.xhr.status?this.dispatchEvent("unauthorized"):403==this.xhr.status?this.dispatchEvent("forbidden"):404==this.xhr.status?this.dispatchEvent("notfound"):this.dispatchEvent("error")},onabort:function(t){this.set("loading",!1)},onerror:function(t){this.set("loading",!1),this.dispatchEvent("error")},ontimeout:function(t){this.set("loading",!1),this.dispatchEvent("error")}}),dmx.Component("link",{initialData:{active:!1},tag:"a",attributes:{href:{type:String,default:""},internal:{type:Boolean,default:!1}},render:function(t){dmx.BaseComponent.prototype.render.call(this,t),this.$node.addEventListener("click",this.navigate.bind(this)),this.routeLink=!1,this.update({})},update:function(t){if(t.href!=this.props.href){var e=this.props.href;if("."==e[0]&&"/"==e[1]){var i=document.querySelector('meta[name="ac:base"]'),n=document.querySelector('meta[name="ac:route"]');if(n&&n.content){var s=n.content;i&&i.content&&(s=i.content.replace(/\/$/,"")+s);var r=dmx.pathToRegexp(s,[],{end:!1}).exec(location.pathname);if(r)return this.$node.setAttribute("href",e.replace("./",r[0].replace(/(\/+)?$/,"/"))),void(this.routeLink=!0)}}"#"==e[0]?this.routeLink=!0:this.routeLink=!1,this.$node.setAttribute("href",e)}this.set("active",this.isActive())},isActive:function(){var t=window.location.href;return this.$node.href==t||this.$node.href==t.split("?")[0].split("#")[0]},navigate:function(t){if((this.routeLink||this.props.internal)&&!t.ctrlKey&&0==t.button){t.preventDefault();var e=this.$node.getAttribute("href");if("#"==e[0])return void(window.location.hash=e);window.history.pushState({title:this.$node.title||document.title},"",e),this.$node.title&&(document.title=this.$node.title),dmx.requestUpdate();var i=document.createEvent("Event");i.initEvent("pushstate",!1,!1),window.dispatchEvent(i)}}});
//# sourceMappingURL=../maps/dmxRouting.js.map