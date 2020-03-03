/**
 * Sticky Sidebar JavaScript Plugin.
 * @version 1.0.0
 * @author Ahmed Bouhuolia <a.bouhuolia@gmail.com>
 * @license The MIT License (MIT)
 */
var stickySidebarModule=function(){"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}!function(e){for(var t=0,i=["webkit","moz"],n=e.requestAnimationFrame,s=e.cancelAnimationFrame,r=i.length;--r>=0&&!n;)n=e[i[r]+"RequestAnimationFrame"],s=e[i[r]+"CancelAnimationFrame"];n&&s||(n=function(e){var i=+new Date,n=Math.max(t+16,i);return setTimeout(function(){e(t=n)},n-i)},s=clearTimeout),e.requestAnimationFrame=n,e.cancelAnimationFrame=s}(window);var t=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),i=function(){var i=".stickySidebar",n={topSpacing:0,bottomSpacing:0,containerSelector:!1,innerWrapperSelector:".inner-wrapper-sticky",stickyClass:"is-affixed",resizeSensor:!0,minWidth:!1};return function(){function s(t){var i=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(e(this,s),this.options=s.extend(n,r),this.sidebar="string"==typeof t?document.querySelector(t):t,void 0===this.sidebar)throw new Error("There is no specific sidebar element.");if(this.sidebarInner=!1,this.container=this.sidebar.parentElement,this.options.containerSelector){var o=document.querySelectorAll(this.options.containerSelector);if((o=Array.prototype.slice.call(o)).forEach(function(e,t){e.contains(i.sidebar)&&(i.container=e)}),!o.length)throw new Error("The container does not contains on the sidebar.")}this.affixedType="STATIC",this.direction="down",this.support={transform:!1,transform3d:!1},this._initialized=!1,this._breakpoint=!1,this._resizeListeners=[],this.dimensions={translateY:0,topSpacing:0,bottomSpacing:0,sidebarHeight:0,sidebarWidth:0,containerTop:0,containerHeight:0,viewportHeight:0,viewportTop:0,lastViewportTop:0},["_resizeListener"].forEach(function(e){i[e]=i[e].bind(i)}),this.initialize()}return t(s,[{key:"initialize",value:function(){if(this._setSupportFeatures(),this.options.innerWrapperSelector&&(this.sidebarInner=this.sidebar.querySelector(this.options.innerWrapperSelector),null!==this.sidebarInner&&(this.sidebarInner=!1)),!this.sidebarInner){var e=document.createElement("div");for(e.setAttribute("class","inner-wrapper-sticky"),this.sidebar.appendChild(e);this.sidebar.firstChild!=e;)e.appendChild(this.sidebar.firstChild);this.sidebarInner=this.sidebar.querySelector(".inner-wrapper-sticky")}null!==this.container&&(this.container=this.sidebar.parentElement),"function"!=typeof this.options.topSpacing&&(this.options.topSpacing=parseInt(this.options.topSpacing)||0),"function"!=typeof this.options.bottomSpacing&&(this.options.bottomSpacing=parseInt(this.options.bottomSpacing)||0),this._widthBreakpoint(),this.calcDimensions(),this.stickyPosition(),this.bindEvents(),this._initialized=!0}},{key:"bindEvents",value:function(){window.addEventListener("resize",this,{passive:!0}),window.addEventListener("scroll",this,{passive:!0}),this.sidebar.addEventListener("update"+i,this),this.options.resizeSensor&&(this.addResizerListener(this.sidebarInner,this),this.addResizerListener(this.container,this))}},{key:"handleEvent",value:function(e){this.updateSticky(e)}},{key:"calcDimensions",value:function(){if(!this._breakpoint){var e=this.dimensions;e.containerTop=s.offsetRelative(this.container).top,e.containerHeight=this.container.clientHeight,e.containerBottom=e.containerTop+e.containerHeight,e.sidebarHeight=this.sidebarInner.offsetHeight,e.sidebarWidth=this.sidebar.offsetWidth,e.viewportHeight=window.innerHeight,this._calcDimensionsWithScroll()}}},{key:"_calcDimensionsWithScroll",value:function(){var e=this.dimensions;e.sidebarLeft=s.offsetRelative(this.sidebar).left,e.viewportTop=document.documentElement.scrollTop||document.body.scrollTop,e.viewportBottom=e.viewportTop+e.viewportHeight,e.viewportLeft=document.documentElement.scrollLeft||document.body.scrollLeft,e.topSpacing=this.options.topSpacing,e.bottomSpacing=this.options.bottomSpacing,"function"==typeof e.topSpacing&&(e.topSpacing=parseInt(e.topSpacing(this.sidebar))||0),"function"==typeof e.bottomSpacing&&(e.bottomSpacing=parseInt(e.bottomSpacing(this.sidebar))||0)}},{key:"isSidebarFitsViewport",value:function(){return this.dimensions.sidebarHeight<this.dimensions.viewportHeight}},{key:"observeScrollDir",value:function(){var e=this.dimensions;if(e.lastViewportTop!==e.viewportTop){var t="down"===this.direction?Math.min:Math.max;e.viewportTop===t(e.viewportTop,e.lastViewportTop)&&(this.direction="down"===this.direction?"up":"down")}}},{key:"getAffixType",value:function(){var e=this.dimensions,t=!1;this._calcDimensionsWithScroll();var i=e.sidebarHeight+e.containerTop,n=e.viewportTop+e.topSpacing,s=e.viewportBottom-e.bottomSpacing;return"up"===this.direction?n<=e.containerTop?(e.translateY=0,t="STATIC"):n<=e.translateY+e.containerTop?(e.translateY=n-e.containerTop,t="VIEWPORT-TOP"):!this.isSidebarFitsViewport()&&e.containerTop<=n&&(t="VIEWPORT-UNBOTTOM"):this.isSidebarFitsViewport()?e.sidebarHeight+n>=e.containerBottom?(e.translateY=e.containerBottom-i,t="CONTAINER-BOTTOM"):n>=e.containerTop&&(e.translateY=n-e.containerTop,t="VIEWPORT-TOP"):e.containerBottom<=s?(e.translateY=e.containerBottom-i,t="CONTAINER-BOTTOM"):i+e.translateY<=s?(e.translateY=s-i,t="VIEWPORT-BOTTOM"):e.containerTop+e.translateY<=n&&(t="VIEWPORT-UNBOTTOM"),e.translateY=Math.max(0,e.translateY),e.translateY=Math.min(e.containerHeight,e.translateY),e.lastViewportTop=e.viewportTop,t}},{key:"_getStyle",value:function(e){if(void 0!==e){var t={inner:{},outer:{}},i=this.dimensions;switch(e){case"VIEWPORT-TOP":t.inner={position:"fixed",top:this.options.topSpacing,left:i.sidebarLeft-i.viewportLeft,width:i.sidebarWidth};break;case"VIEWPORT-BOTTOM":t.inner={position:"fixed",top:"auto",left:i.sidebarLeft,bottom:this.options.bottomSpacing,width:i.sidebarWidth};break;case"CONTAINER-BOTTOM":case"VIEWPORT-UNBOTTOM":var n=this._getTranslate(0,i.translateY+"px");t.inner=n?{transform:n}:{position:"absolute",top:i.containerTop+i.translateY}}switch(e){case"VIEWPORT-TOP":case"VIEWPORT-BOTTOM":case"VIEWPORT-UNBOTTOM":case"CONTAINER-BOTTOM":t.outer={height:i.sidebarHeight,position:"relative"}}return t.outer=s.extend({height:"",position:""},t.outer),t.inner=s.extend({position:"relative",top:"",left:"",bottom:"",width:"",transform:this._getTranslate()},t.inner),t}}},{key:"stickyPosition",value:function(e){if(!this._breakpoint){e=e||!1;this.options.topSpacing,this.options.bottomSpacing;var t=this.getAffixType(),n=this._getStyle(t);if((this.affixedType!=t||e)&&t){var r="affix."+t.toLowerCase().replace("viewport-","")+i;s.eventTrigger(this.sidebar,r),"STATIC"===t?this.sidebar.classList.remove(this.options.stickyClass):this.sidebar.classList.add(this.options.stickyClass);for(var o in n.outer){n.outer[o];this.sidebar.style[o]=n.outer[o]}for(var a in n.inner){var c="number"==typeof n.inner[a]?"px":"";this.sidebarInner.style[a]=n.inner[a]+c}var p="affixed."+t.toLowerCase().replace("viewport","")+i;s.eventTrigger(this.sidebar,p)}else this._initialized&&(this.sidebarInner.style.left=n.inner.left);this.affixedType=t}}},{key:"_widthBreakpoint",value:function(){window.innerWidth<=this.options.minWidth?(this._breakpoint=!0,this.affixedType="STATIC",this.sidebar.removeAttribute("style"),this.sidebar.classList.remove(this.options.stickyClass),this.sidebarInner.removeAttribute("style")):this._breakpoint=!1}},{key:"updateSticky",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this._running||(this._running=!0,function(t){requestAnimationFrame(function(){switch(t){case"scroll":e._calcDimensionsWithScroll(),e.observeScrollDir(),e.stickyPosition();break;case"resize":default:e._widthBreakpoint(),e.calcDimensions(),e.stickyPosition("resize"===t||!1)}e._running=!1})}(t.type))}},{key:"_setSupportFeatures",value:function(){var e=this.support;e.transform=s.supportTransform(),e.transform3d=s.supportTransform(!0)}},{key:"_getTranslate",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return this.support.transform3d?"translate3d("+e+", "+t+", "+i+")":!!this.support.translate&&"translate("+e+", "+t+")"}},{key:"addResizerListener",value:function(e,t){e.resizeListeners||(e.resizeListeners=[],this._appendResizeSensor(e)),e.resizeListeners.push(t)}},{key:"removeResizeListener",value:function(e,t){var i=e.resizeListeners.indexOf(t);if(this._resizeListeners.splice(i,1),null!==e.resizeListeners){var n=e.resizeTrigger;n.contentDocument.defaultView.removeEventListener("resize",this._resizeListener),n=n.remove()}}},{key:"_appendResizeSensor",value:function(e){var t=this;"static"===e.style.position&&(e.style.position="relative");var i=document.createElement("object");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%;overflow: hidden; pointer-events: none; z-index: -1;"),i.resizeElement=e,i.addEventListener("load",function(e){var i=e.currentTarget;i.contentDocument.defaultView.resizeTrigger=i.resizeElement,i.contentDocument.defaultView.addEventListener("resize",t._resizeListener)}),i.type="text/html",s.isIE()&&(i.data="about:blank"),e.resizeTrigger=i,e.appendChild(i)}},{key:"_resizeListener",value:function(e){var t=this,i=(e.target||e.srcElement).resizeTrigger;i.resizeListeners.forEach(function(n){"object"==typeof n&&(n=n.handleEvent,i=t),n.call(i,e)})}},{key:"destroy",value:function(){window.removeEventListener("resize",this._onResize),window.removeEventListener("scroll",this._onScroll),this.sidebar.classList.remove(this.options.stickyClass),this.sidebar.style.minHeight="",this.removeEventListener("update"+i,this.updateSticky);var e={position:"",top:"",left:"",bottom:"",width:"",transform:""};for(var t in e)this.sidebar.style[t]=e[t];this.options.resizeSensor&&(this.removeResizeListener(this.sidebarInner,this.updateSticky),this.removeResizeListener(this.container,this.updateSticky))}}],[{key:"isIE",value:function(){return Boolean(navigator.userAgent.match(/Trident/))}},{key:"supportTransform",value:function(e){var t=!1,i=e?"perspective":"transform",n=i.charAt(0).toUpperCase()+i.slice(1),s=["Webkit","Moz","O","ms"],r=document.createElement("support").style;return(i+" "+s.join(n+" ")+n).split(" ").forEach(function(e,i){if(void 0!==r[e])return t=e,!1}),t}},{key:"eventTrigger",value:function(e,t,i){if(window.CustomEvent)var n=new CustomEvent(t,{detail:i});else(n=document.createEvent("CustomEvent")).initCustomEvent(t,!0,!0,i);e.dispatchEvent(n)}},{key:"extend",value:function(e,t){var i={};for(var n in e)void 0!==t[n]?i[n]=t[n]:i[n]=e[n];return i}},{key:"offsetRelative",value:function(e){var t={left:0,top:0};do{var i=e.offsetTop,n=e.offsetLeft;isNaN(i)||(t.top+=i),isNaN(n)||(t.left+=n)}while(e=e.offsetParent);return t}}]),s}()}();return window.StickySidebar=i,i}();
  
// jQuery Mask Plugin v1.14.11
// github.com/igorescobar/jQuery-Mask-Plugin
var $jscomp={scope:{},findInternal:function(a,l,d){a instanceof String&&(a=String(a));for(var p=a.length,h=0;h<p;h++){var b=a[h];if(l.call(d,b,h,a))return{i:h,v:b}}return{i:-1,v:void 0}}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,l,d){if(d.get||d.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[l]=d.value)};
$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(a,l,d,p){if(l){d=$jscomp.global;a=a.split(".");for(p=0;p<a.length-1;p++){var h=a[p];h in d||(d[h]={});d=d[h]}a=a[a.length-1];p=d[a];l=l(p);l!=p&&null!=l&&$jscomp.defineProperty(d,a,{configurable:!0,writable:!0,value:l})}};
$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,d){return $jscomp.findInternal(this,a,d).v}},"es6-impl","es3");
(function(a,l,d){"function"===typeof define&&define.amd?define(["jquery"],a):"object"===typeof exports?module.exports=a(require("jquery")):a(l||d)})(function(a){var l=function(b,e,f){var c={invalid:[],getCaret:function(){try{var a,r=0,g=b.get(0),e=document.selection,f=g.selectionStart;if(e&&-1===navigator.appVersion.indexOf("MSIE 10"))a=e.createRange(),a.moveStart("character",-c.val().length),r=a.text.length;else if(f||"0"===f)r=f;return r}catch(C){}},setCaret:function(a){try{if(b.is(":focus")){var c,
g=b.get(0);g.setSelectionRange?g.setSelectionRange(a,a):(c=g.createTextRange(),c.collapse(!0),c.moveEnd("character",a),c.moveStart("character",a),c.select())}}catch(B){}},events:function(){b.on("keydown.mask",function(a){b.data("mask-keycode",a.keyCode||a.which);b.data("mask-previus-value",b.val());b.data("mask-previus-caret-pos",c.getCaret());c.maskDigitPosMapOld=c.maskDigitPosMap}).on(a.jMaskGlobals.useInput?"input.mask":"keyup.mask",c.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){b.keydown().keyup()},
100)}).on("change.mask",function(){b.data("changed",!0)}).on("blur.mask",function(){d===c.val()||b.data("changed")||b.trigger("change");b.data("changed",!1)}).on("blur.mask",function(){d=c.val()}).on("focus.mask",function(b){!0===f.selectOnFocus&&a(b.target).select()}).on("focusout.mask",function(){f.clearIfNotMatch&&!h.test(c.val())&&c.val("")})},getRegexMask:function(){for(var a=[],b,c,f,n,d=0;d<e.length;d++)(b=m.translation[e.charAt(d)])?(c=b.pattern.toString().replace(/.{1}$|^.{1}/g,""),f=b.optional,
(b=b.recursive)?(a.push(e.charAt(d)),n={digit:e.charAt(d),pattern:c}):a.push(f||b?c+"?":c)):a.push(e.charAt(d).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"));a=a.join("");n&&(a=a.replace(new RegExp("("+n.digit+"(.*"+n.digit+")?)"),"($1)?").replace(new RegExp(n.digit,"g"),n.pattern));return new RegExp(a)},destroyEvents:function(){b.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(a){var c=b.is("input")?"val":"text";if(0<arguments.length){if(b[c]()!==a)b[c](a);
c=b}else c=b[c]();return c},calculateCaretPosition:function(){var a=b.data("mask-previus-value")||"",e=c.getMasked(),g=c.getCaret();if(a!==e){var f=b.data("mask-previus-caret-pos")||0,e=e.length,d=a.length,m=a=0,h=0,l=0,k;for(k=g;k<e&&c.maskDigitPosMap[k];k++)m++;for(k=g-1;0<=k&&c.maskDigitPosMap[k];k--)a++;for(k=g-1;0<=k;k--)c.maskDigitPosMap[k]&&h++;for(k=f-1;0<=k;k--)c.maskDigitPosMapOld[k]&&l++;g>d?g=e:f>=g&&f!==d?c.maskDigitPosMapOld[g]||(f=g,g=g-(l-h)-a,c.maskDigitPosMap[g]&&(g=f)):g>f&&(g=
g+(h-l)+m)}return g},behaviour:function(f){f=f||window.event;c.invalid=[];var e=b.data("mask-keycode");if(-1===a.inArray(e,m.byPassKeys)){var e=c.getMasked(),g=c.getCaret();setTimeout(function(){c.setCaret(c.calculateCaretPosition())},10);c.val(e);c.setCaret(g);return c.callbacks(f)}},getMasked:function(a,b){var g=[],d=void 0===b?c.val():b+"",n=0,h=e.length,q=0,l=d.length,k=1,r="push",p=-1,t=0,y=[],v,z;f.reverse?(r="unshift",k=-1,v=0,n=h-1,q=l-1,z=function(){return-1<n&&-1<q}):(v=h-1,z=function(){return n<
h&&q<l});for(var A;z();){var x=e.charAt(n),w=d.charAt(q),u=m.translation[x];if(u)w.match(u.pattern)?(g[r](w),u.recursive&&(-1===p?p=n:n===v&&(n=p-k),v===p&&(n-=k)),n+=k):w===A?(t--,A=void 0):u.optional?(n+=k,q-=k):u.fallback?(g[r](u.fallback),n+=k,q-=k):c.invalid.push({p:q,v:w,e:u.pattern}),q+=k;else{if(!a)g[r](x);w===x?(y.push(q),q+=k):(A=x,y.push(q+t),t++);n+=k}}d=e.charAt(v);h!==l+1||m.translation[d]||g.push(d);g=g.join("");c.mapMaskdigitPositions(g,y,l);return g},mapMaskdigitPositions:function(a,
b,e){a=f.reverse?a.length-e:0;c.maskDigitPosMap={};for(e=0;e<b.length;e++)c.maskDigitPosMap[b[e]+a]=1},callbacks:function(a){var h=c.val(),g=h!==d,m=[h,a,b,f],q=function(a,b,c){"function"===typeof f[a]&&b&&f[a].apply(this,c)};q("onChange",!0===g,m);q("onKeyPress",!0===g,m);q("onComplete",h.length===e.length,m);q("onInvalid",0<c.invalid.length,[h,a,b,c.invalid,f])}};b=a(b);var m=this,d=c.val(),h;e="function"===typeof e?e(c.val(),void 0,b,f):e;m.mask=e;m.options=f;m.remove=function(){var a=c.getCaret();
c.destroyEvents();c.val(m.getCleanVal());c.setCaret(a);return b};m.getCleanVal=function(){return c.getMasked(!0)};m.getMaskedVal=function(a){return c.getMasked(!1,a)};m.init=function(d){d=d||!1;f=f||{};m.clearIfNotMatch=a.jMaskGlobals.clearIfNotMatch;m.byPassKeys=a.jMaskGlobals.byPassKeys;m.translation=a.extend({},a.jMaskGlobals.translation,f.translation);m=a.extend(!0,{},m,f);h=c.getRegexMask();if(d)c.events(),c.val(c.getMasked());else{f.placeholder&&b.attr("placeholder",f.placeholder);b.data("mask")&&
b.attr("autocomplete","off");d=0;for(var l=!0;d<e.length;d++){var g=m.translation[e.charAt(d)];if(g&&g.recursive){l=!1;break}}l&&b.attr("maxlength",e.length);c.destroyEvents();c.events();d=c.getCaret();c.val(c.getMasked());c.setCaret(d)}};m.init(!b.is("input"))};a.maskWatchers={};var d=function(){var b=a(this),e={},f=b.attr("data-mask");b.attr("data-mask-reverse")&&(e.reverse=!0);b.attr("data-mask-clearifnotmatch")&&(e.clearIfNotMatch=!0);"true"===b.attr("data-mask-selectonfocus")&&(e.selectOnFocus=
!0);if(p(b,f,e))return b.data("mask",new l(this,f,e))},p=function(b,e,f){f=f||{};var c=a(b).data("mask"),d=JSON.stringify;b=a(b).val()||a(b).text();try{return"function"===typeof e&&(e=e(b)),"object"!==typeof c||d(c.options)!==d(f)||c.mask!==e}catch(t){}},h=function(a){var b=document.createElement("div"),d;a="on"+a;d=a in b;d||(b.setAttribute(a,"return;"),d="function"===typeof b[a]);return d};a.fn.mask=function(b,d){d=d||{};var e=this.selector,c=a.jMaskGlobals,h=c.watchInterval,c=d.watchInputs||c.watchInputs,
t=function(){if(p(this,b,d))return a(this).data("mask",new l(this,b,d))};a(this).each(t);e&&""!==e&&c&&(clearInterval(a.maskWatchers[e]),a.maskWatchers[e]=setInterval(function(){a(document).find(e).each(t)},h));return this};a.fn.masked=function(a){return this.data("mask").getMaskedVal(a)};a.fn.unmask=function(){clearInterval(a.maskWatchers[this.selector]);delete a.maskWatchers[this.selector];return this.each(function(){var b=a(this).data("mask");b&&b.remove().removeData("mask")})};a.fn.cleanVal=function(){return this.data("mask").getCleanVal()};
a.applyDataMask=function(b){b=b||a.jMaskGlobals.maskElements;(b instanceof a?b:a(b)).filter(a.jMaskGlobals.dataMaskAttr).each(d)};h={maskElements:"input,td,span,div",dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,useInput:!/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent)&&h("input"),watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},
S:{pattern:/[a-zA-Z]/}}};a.jMaskGlobals=a.jMaskGlobals||{};h=a.jMaskGlobals=a.extend(!0,{},h,a.jMaskGlobals);h.dataMask&&a.applyDataMask();setInterval(function(){a.jMaskGlobals.watchDataMask&&a.applyDataMask()},h.watchInterval)},window.jQuery,window.Zepto);
  
$(function() {

});

$(window).on('load',function() {

});

$(document).ready(function() {

	$('.accordion .accordion-title').click(function(){
		if(!$(this).hasClass('active')){
			$('.accordion-title.active').removeClass('active').next('.content').slideToggle(400);				
		}
		$(this).toggleClass('active');
		$(this).next('.content').slideToggle(400);		

	});	
	
	/*subscription select*/
	var activeSubscription = $('.subsription-type-titlebox.active').attr('data-target');
	$('#'+activeSubscription).addClass('active animated fadeInBottom');
	$('.subsription-type-titlebox').click(function(){
		$('.subsription-type-titlebox.active').removeClass('active');
		$(this).addClass('active');
		var target=$(this).attr('data-target');
		console.log(target);
		$('.subscription-details.active').removeClass('active animated fadeInBottom fadeOutBottom');
		$('#'+target).addClass('active animated fadeInBottom');
	});
	
	/*subscription arrow positions*/
	var subscriptionL=$('.subsription-type-titlebox').length;
	$('.subscription-types').addClass('subscription-types_item_'+subscriptionL);
	
	/*active class to order form block*/
	$('.order-form').click(function(){
		if($(this).hasClass('active')){

		} else {
			$('.order-form.active').removeClass('active');
			$(this).addClass('active');
		}
	});
		
	/*shipping-invoice toggle*/
	$('.shipping-invoice-selector input[type="radio"]').change( function (e) {
		if ($('.shipping-invoice-selector input[type="radio"]:first').is(":checked")){
			$('.shipping-block').fadeOut();
		}else{ 
			$('.shipping-block').fadeIn();
		}
	});
	
	/*order details sticky cart summary*/
	//$('.cart-summary').stick_in_parent();
	if($('.sticky-item').length){
		var a = new StickySidebar('.sticky-item', {
			topSpacing: 40,
			containerSelector: '.sticky-container',
			innerWrapperSelector: '.sticky-item-inner'
		});
	}
	
	/*quantity changer*/
	$('.quantity').each( function( index, element ){
		var qtyInput = $(this);
		var qtyWrapper=$(this).parent('.input-group');
		qtyWrapper.addClass('quantity-wrapper');
		qtyInput.before('<span class="value-button dec">–</span>').after('<span class="value-button inc">+</span>');
		qtyWrapper.find('.dec').click(function(){decreaseValue(qtyInput);});
		qtyWrapper.find('.inc').click(function(){increaseValue(qtyInput);});		
	});
	
	/*.scroll-to links*/
	$('.scroll-to').click(function (e){
		e.preventDefault();
		var target=$(this).attr('href');
		$('html, body').animate({
			scrollTop: $(target).offset().top
		}, 800);
	});	
	
	/*equal height subscription detail block*/
	if($('.wrapper .subscription-block .subscription-types.type_2 .subscription-details').length) {
		fixHeight('.wrapper .subscription-block .subscription-types.type_2 .subscription-details');	
	}			
	/*equal height ordersummary*/
	if($('.order-form-wrapper.order-summary .summary-group').length) {
		//fixHeight('.order-form-wrapper.order-summary .summary-group');		
	}
	
	/*subscription A/B*/
	if (location.hash === "#typeA") {
		$('.subscription-types.type_1').show();
		$('.subscription-types.type_2').hide();
		$('.modal-dialog .subscription-types.type_2').show();
	} else {
		$('.subscription-types.type_2').show();
		$('.subscription-types.type_1').hide();		
	}
	
	/*allow tooltip anywhere*/
	$('[data-toggle="tooltip"]').tooltip();
	
	/*payment type helper text*/
	if($('.payment-selector').length){
		$('.payment-credit').addClass('show');
	}
	$('.payment-selector input[type="radio"]').change( function (e) {
		var target=$(this).data('target');
		$('.payment-type').removeClass('show');
		$('.'+target).addClass('show');
	});	
	if($('.payment-selector').length){
		$('.payment-selector')
	}
	
	/*mask inputs*/
	/*TODO: 1 karakteres körzetszám*/
	/*var options =  {
	  onKeyPress: function(cep, e, field, options) {
		var masks = ['+36-0-000-0000', '+36-00-000-0000'];
		var mask = (cep.length>=14) ? masks[1] : masks[0];
		$('input[type="phone"]').mask(mask, options,{placeholder: "+__-__-___-____"});		
	}};*/

	$('input[type="phone"]').mask('+36-00-000-0000',{placeholder: "+__-__-___-____"});	

	$('.taxNumber').mask('00000000-0-00',{placeholder: "________-_-__"});	

	
	/*show banner when utm_source exists*/
	if(window.location.href.indexOf("utm_source") > -1) {	
		$('.utm_banner').show().addClass('show');
	}
	
	/*toggle-password input for usability*/
	$('.toggle-password .toggle-password-button').click(function() {
	  $(this).toggleClass('hide');
	  var input = $(this).parent().find('input');
	  if (input.attr('type') == 'password') {
		input.attr('type', 'text');
	  } else {
		input.attr('type', 'password');
	  }
	});	
	
	/*prevent copy paste*/
	$('input.retype-input').bind('copy paste', function(e) { e.preventDefault(); });	
	
	
	/*show/hide reset password*/
	$('.lost-password-button, .reset-password .close').on('click',function(){
		$('.reset-password').toggleClass('hide');
	});
	/*open tab from hash*/
	if(window.location.hash != "") {
		$('a[href="' + window.location.hash + '"]').click();
		if(window.location.hash == "#register") {
			$('.registerBlock').addClass('d-block').show();
		}		
	}	
	/*lostpassword hack*/
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		$('.reset-password').addClass('hide');
	});
	/*validate forms before submit*/
    (function( $ ){
          $.fn.displayVals = function() {
			$('button, input[type="submit"]',this).attr('disabled', 'disabled');
            this.change(function() {
				if($(this).hasClass('email-confirm')){
					
				}
				var isValid=true;
				$('input:required,textarea:required,select:required',this).each(function() {					
					if ( $(this).val().length===0 ){
						isValid = false;
					} 
				});
				if($('input[name="Email"]',this).length && $('input[name="EmailRetype"]',this).length && $('input[name="Email"]',this).val().length!=0  && $('input[name="EmailRetype"]',this).val().length!=0 ){
					if($('input[name="Email"]',this).val() == $('input[name="EmailRetype"]',this).val() ) {
						isValid=true;
						$('.email-confirm-error',this).addClass('d-none invisible').removeClass('d-block visible');
					} else {
						isValid=false;
						$('.email-confirm-error',this).removeClass('d-none invisible').addClass('d-block visible');
					}
				}
				if($('input[name="Password"]',this).length && $('input[name="PasswordConfirmation"]',this).length && $('input[name="Password"]',this).val().length!=0  && $('input[name="PasswordConfirmation"]',this).val().length!=0 ){
					if($('input[name="Password"]',this).val() == $('input[name="PasswordConfirmation"]',this).val() ) {
						isValid=true;
						$('.psw-confirm-error',this).addClass('d-none invisible').removeClass('d-block visible');
					} else {
						isValid=false;
						$('.psw-confirm-error',this).removeClass('d-none invisible').addClass('d-block visible');
					}
				}				
				if( isValid ) {
					$('button, input[type="submit"]',this).prop('disabled', false);
				} else {
					$('button, input[type="submit"]',this).prop('disabled', true);
				};

            });

          };
        })( jQuery );

    $(".validate-form").displayVals();

	/*if($('.validate-form').length){
		$('.validate-form button, .validate-form input[type="submit"]').attr('disabled', 'disabled');
		var isValid = true;
		$('input,textarea,select').change(function() {
			
			$('input,textarea,select').filter('[required]:visible').each(function() {
			if ( $(this).val() === '' )
				isValid = false;console.log('false');
			});
			if( isValid ) {
				console.log('tre');
				$('.validate-form button, .validate-form input[type="submit"]').prop('disabled', false);
			} else {
				$('.validate-form button, .validate-form input[type="submit"]').prop('disabled', true);
			};
		});		
		$('.validate-form input[name="Email"], .validate-form input[name="RetypeEmail"]').change(function () {
			if ($('.validate-form input[name="Email"]').val() == $('.validate-form input[name="RetypeEmail"]').val()) {
				$('#mc-embedded-subscribe').removeAttr('disabled').removeClass('button3');
			} else {
				$('#mc-embedded-subscribe').attr('disabled', 'disabled').removeAttr('disabled').addClass('button3');
			}
		});		
	}*/
});
$(window).on('scroll',function () {
	if ($(this).scrollTop()>100)	{
		$('.stickyOrderBlock').addClass('showOrderBlock');
	}	else	{
		$('.stickyOrderBlock').removeClass('showOrderBlock');
	}
});
$(window).on('resize',function(){

});

/*quantity inc dec*/
function increaseValue(item) {
	var value = parseInt(item.val(), 10);
	value = isNaN(value) ? 0 : value;
	value++;
	item.val(value);
}

function decreaseValue(item) {
	var value = parseInt(item.val(), 10);
	value = isNaN(value) ? 0 : value;
	value < 1 ? value = 1 : '';
	value--;
	item.val(value);
}

/*fix height divs*/
function fixHeight(elem){
	var checkExist = setInterval(function() {
		if ($(elem).length) {
			var maxHeight = 0;
			$(elem).css('height','auto');
			$(elem).each(function(){
					console.log($(this).height());
			   if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
			});
			$(elem).height(maxHeight+20);
			clearInterval(checkExist);
		} else {
			return false;
		}
	}, 100);	
;
}
