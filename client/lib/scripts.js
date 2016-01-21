/*!
 * iconic.js v0.4.0 - The Iconic JavaScript library
 * Copyright (c) 2014 Waybury - http://useiconic.com
 */

!function(a){"object"==typeof exports?module.exports=a():"function"==typeof define&&define.amd?define(a):"undefined"!=typeof window?window.IconicJS=a():"undefined"!=typeof global?global.IconicJS=a():"undefined"!=typeof self&&(self.IconicJS=a())}(function(){var a;return function b(a,c,d){function e(g,h){if(!c[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};a[g][0].call(j.exports,function(b){var c=a[g][1][b];return e(c?c:b)},j,j.exports,b,a,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){var c=(a("./modules/polyfills"),a("./modules/svg-injector")),d=a("./modules/extend"),e=a("./modules/responsive"),f=a("./modules/position"),g=a("./modules/container"),h=a("./modules/log"),i={},j=window.iconicSmartIconApis={},k=("file:"===window.location.protocol,0),l=function(a,b,e){b=d({},i,b||{});var f={evalScripts:b.evalScripts,pngFallback:b.pngFallback};f.each=function(a){if(a)if("string"==typeof a)h.debug(a);else if(a instanceof SVGSVGElement){var c=a.getAttribute("data-icon");if(c&&j[c]){var d=j[c](a);for(var e in d)a[e]=d[e]}/iconic-bg-/.test(a.getAttribute("class"))&&g.addBackground(a),m(a),k++,b&&b.each&&"function"==typeof b.each&&b.each(a)}},"string"==typeof a&&(a=document.querySelectorAll(a)),c(a,f,e)},m=function(a){var b=[];a?"string"==typeof a?b=document.querySelectorAll(a):void 0!==a.length?b=a:"object"==typeof a&&b.push(a):b=document.querySelectorAll("svg.iconic"),Array.prototype.forEach.call(b,function(a){a instanceof SVGSVGElement&&(a.update&&a.update(),e.refresh(a),f.refresh(a))})},n=function(){i.debug&&console.time&&console.time("autoInjectSelector - "+i.autoInjectSelector);var a=k;l(i.autoInjectSelector,{},function(){if(i.debug&&console.timeEnd&&console.timeEnd("autoInjectSelector - "+i.autoInjectSelector),h.debug("AutoInjected: "+(k-a)),e.refreshAll(),i.autoInjectDone&&"function"==typeof i.autoInjectDone){var b=k-a;i.autoInjectDone(b)}})},o=function(a){a&&""!==a&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",n):document.removeEventListener("DOMContentLoaded",n)},p=function(a){return a=a||{},d(i,a),o(i.autoInjectSelector),h.enableDebug(i.debug),window._Iconic?window._Iconic:{inject:l,update:m,smartIconApis:j,svgInjectedCount:k}};b.exports=p,window._Iconic=new p({autoInjectSelector:"img.iconic",evalScripts:"once",pngFallback:!1,each:null,autoInjectDone:null,debug:!1})},{"./modules/container":2,"./modules/extend":3,"./modules/log":4,"./modules/polyfills":5,"./modules/position":6,"./modules/responsive":7,"./modules/svg-injector":8}],2:[function(a,b){var c=function(a){var b=a.getAttribute("class").split(" "),c=-1!==b.indexOf("iconic-fluid"),d=[],e=["iconic-bg"];Array.prototype.forEach.call(b,function(a){switch(a){case"iconic-sm":case"iconic-md":case"iconic-lg":d.push(a),c||e.push(a.replace(/-/,"-bg-"));break;case"iconic-fluid":d.push(a),e.push(a.replace(/-/,"-bg-"));break;case"iconic-bg-circle":case"iconic-bg-rounded-rect":case"iconic-bg-badge":e.push(a);break;default:d.push(a)}}),a.setAttribute("class",d.join(" "));var f=a.parentNode,g=Array.prototype.indexOf.call(f.childNodes,a),h=document.createElement("span");h.setAttribute("class",e.join(" ")),h.appendChild(a),f.insertBefore(h,f.childNodes[g])};b.exports={addBackground:c}},{}],3:[function(a,b){b.exports=function(a){return Array.prototype.forEach.call(Array.prototype.slice.call(arguments,1),function(b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])}),a}},{}],4:[function(a,b){var c=!1,d=function(a){console&&console.log&&console.log(a)},e=function(a){d("Iconic INFO: "+a)},f=function(a){d("Iconic WARNING: "+a)},g=function(a){c&&d("Iconic DEBUG: "+a)},h=function(a){c=a};b.exports={info:e,warn:f,debug:g,enableDebug:h}},{}],5:[function(){Array.prototype.forEach||(Array.prototype.forEach=function(a,b){"use strict";if(void 0===this||null===this||"function"!=typeof a)throw new TypeError;var c,d=this.length>>>0;for(c=0;d>c;++c)c in this&&a.call(b,this[c],c,this)}),function(){if(Event.prototype.preventDefault||(Event.prototype.preventDefault=function(){this.returnValue=!1}),Event.prototype.stopPropagation||(Event.prototype.stopPropagation=function(){this.cancelBubble=!0}),!Element.prototype.addEventListener){var a=[],b=function(b,c){var d=this,e=function(a){a.target=a.srcElement,a.currentTarget=d,c.handleEvent?c.handleEvent(a):c.call(d,a)};if("DOMContentLoaded"==b){var f=function(a){"complete"==document.readyState&&e(a)};if(document.attachEvent("onreadystatechange",f),a.push({object:this,type:b,listener:c,wrapper:f}),"complete"==document.readyState){var g=new Event;g.srcElement=window,f(g)}}else this.attachEvent("on"+b,e),a.push({object:this,type:b,listener:c,wrapper:e})},c=function(b,c){for(var d=0;d<a.length;){var e=a[d];if(e.object==this&&e.type==b&&e.listener==c){"DOMContentLoaded"==b?this.detachEvent("onreadystatechange",e.wrapper):this.detachEvent("on"+b,e.wrapper);break}++d}};Element.prototype.addEventListener=b,Element.prototype.removeEventListener=c,HTMLDocument&&(HTMLDocument.prototype.addEventListener=b,HTMLDocument.prototype.removeEventListener=c),Window&&(Window.prototype.addEventListener=b,Window.prototype.removeEventListener=c)}}()},{}],6:[function(a,b){var c=function(a){var b=a.getAttribute("data-position");if(b&&""!==b){var c,d,e,f,g,h,i,j=a.getAttribute("width"),k=a.getAttribute("height"),l=b.split("-"),m=a.querySelectorAll("g.iconic-container");Array.prototype.forEach.call(m,function(a){if(c=a.getAttribute("data-width"),d=a.getAttribute("data-height"),c!==j||d!==k){if(e=a.getAttribute("transform"),f=1,e){var b=e.match(/scale\((\d)/);f=b&&b[1]?b[1]:1}g=Math.floor((j/f-c)/2),h=Math.floor((k/f-d)/2),Array.prototype.forEach.call(l,function(a){switch(a){case"top":h=0;break;case"bottom":h=k/f-d;break;case"left":g=0;break;case"right":g=j/f-c;break;case"center":break;default:console&&console.log&&console.log("Unknown position: "+a)}}),i=0===h?g:g+" "+h,i="translate("+i+")",e?/translate/.test(e)?e=e.replace(/translate\(.*?\)/,i):e+=" "+i:e=i,a.setAttribute("transform",e)}})}};b.exports={refresh:c}},{}],7:[function(a,b){var c=/(iconic-sm\b|iconic-md\b|iconic-lg\b)/,d=function(a,b){var c="undefined"!=typeof window.getComputedStyle&&window.getComputedStyle(a,null).getPropertyValue(b);return!c&&a.currentStyle&&(c=a.currentStyle[b.replace(/([a-z])\-([a-z])/,function(a,b,c){return b+c.toUpperCase()})]||a.currentStyle[b]),c},e=function(a){var b=a.style.display;a.style.display="block";var c=parseFloat(d(a,"width").slice(0,-2)),e=parseFloat(d(a,"height").slice(0,-2));return a.style.display=b,{width:c,height:e}},f=function(){var a="/* Iconic Responsive Support Styles */\n.iconic-property-fill, .iconic-property-text {stroke: none !important;}\n.iconic-property-stroke {fill: none !important;}\nsvg.iconic.iconic-fluid {height:100% !important;width:100% !important;}\nsvg.iconic.iconic-sm:not(.iconic-size-md):not(.iconic-size-lg), svg.iconic.iconic-size-sm{width:16px;height:16px;}\nsvg.iconic.iconic-md:not(.iconic-size-sm):not(.iconic-size-lg), svg.iconic.iconic-size-md{width:32px;height:32px;}\nsvg.iconic.iconic-lg:not(.iconic-size-sm):not(.iconic-size-md), svg.iconic.iconic-size-lg{width:128px;height:128px;}\nsvg.iconic-sm > g.iconic-md, svg.iconic-sm > g.iconic-lg, svg.iconic-md > g.iconic-sm, svg.iconic-md > g.iconic-lg, svg.iconic-lg > g.iconic-sm, svg.iconic-lg > g.iconic-md {display: none;}\nsvg.iconic.iconic-icon-sm > g.iconic-lg, svg.iconic.iconic-icon-md > g.iconic-lg {display:none;}\nsvg.iconic-sm:not(.iconic-icon-md):not(.iconic-icon-lg) > g.iconic-sm, svg.iconic-md.iconic-icon-sm > g.iconic-sm, svg.iconic-lg.iconic-icon-sm > g.iconic-sm {display:inline;}\nsvg.iconic-md:not(.iconic-icon-sm):not(.iconic-icon-lg) > g.iconic-md, svg.iconic-sm.iconic-icon-md > g.iconic-md, svg.iconic-lg.iconic-icon-md > g.iconic-md {display:inline;}\nsvg.iconic-lg:not(.iconic-icon-sm):not(.iconic-icon-md) > g.iconic-lg, svg.iconic-sm.iconic-icon-lg > g.iconic-lg, svg.iconic-md.iconic-icon-lg > g.iconic-lg {display:inline;}";navigator&&navigator.userAgent&&/MSIE 10\.0/.test(navigator.userAgent)&&(a+="svg.iconic{zoom:1.0001;}");var b=document.createElement("style");b.id="iconic-responsive-css",b.type="text/css",b.styleSheet?b.styleSheet.cssText=a:b.appendChild(document.createTextNode(a)),(document.head||document.getElementsByTagName("head")[0]).appendChild(b)},g=function(a){if(/iconic-fluid/.test(a.getAttribute("class"))){var b,d=e(a),f=a.viewBox.baseVal.width/a.viewBox.baseVal.height;b=1===f?Math.min(d.width,d.height):1>f?d.width:d.height;var g;g=32>b?"iconic-sm":b>=32&&128>b?"iconic-md":"iconic-lg";var h=a.getAttribute("class"),i=c.test(h)?h.replace(c,g):h+" "+g;a.setAttribute("class",i)}},h=function(){var a=document.querySelectorAll(".injected-svg.iconic-fluid");Array.prototype.forEach.call(a,function(a){g(a)})};document.addEventListener("DOMContentLoaded",function(){f()}),window.addEventListener("resize",function(){h()}),b.exports={refresh:g,refreshAll:h}},{}],8:[function(b,c,d){!function(b,e){"use strict";function f(a){a=a.split(" ");for(var b={},c=a.length,d=[];c--;)b.hasOwnProperty(a[c])||(b[a[c]]=1,d.unshift(a[c]));return d.join(" ")}var g="file:"===b.location.protocol,h=e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"),i=Array.prototype.forEach||function(a,b){if(void 0===this||null===this||"function"!=typeof a)throw new TypeError;var c,d=this.length>>>0;for(c=0;d>c;++c)c in this&&a.call(b,this[c],c,this)},j={},k=0,l=[],m=[],n={},o=function(a){return a.cloneNode(!0)},p=function(a,b){m[a]=m[a]||[],m[a].push(b)},q=function(a){for(var b=0,c=m[a].length;c>b;b++)!function(b){setTimeout(function(){m[a][b](o(j[a]))},0)}(b)},r=function(a,c){if(void 0!==j[a])j[a]instanceof SVGSVGElement?c(o(j[a])):p(a,c);else{if(!b.XMLHttpRequest)return c("Browser does not support XMLHttpRequest"),!1;j[a]={},p(a,c);var d=new XMLHttpRequest;d.onreadystatechange=function(){if(4===d.readyState){if(404===d.status||null===d.responseXML)return c("Unable to load SVG file: "+a),g&&c("Note: SVG injection ajax calls do not work locally without adjusting security setting in your browser. Or consider using a local webserver."),c(),!1;if(!(200===d.status||g&&0===d.status))return c("There was a problem injecting the SVG: "+d.status+" "+d.statusText),!1;if(d.responseXML instanceof Document)j[a]=d.responseXML.documentElement;else if(DOMParser&&DOMParser instanceof Function){var b;try{var e=new DOMParser;b=e.parseFromString(d.responseText,"text/xml")}catch(f){b=void 0}if(!b||b.getElementsByTagName("parsererror").length)return c("Unable to parse SVG file: "+a),!1;j[a]=b.documentElement}q(a)}},d.open("GET",a),d.overrideMimeType&&d.overrideMimeType("text/xml"),d.send()}},s=function(a,c,d,e){var g=a.getAttribute("data-src")||a.getAttribute("src");if(!/svg$/i.test(g))return e("Attempted to inject a file with a non-svg extension: "+g),void 0;if(!h){var j=a.getAttribute("data-fallback")||a.getAttribute("data-png");return j?(a.setAttribute("src",j),e(null)):d?(a.setAttribute("src",d+"/"+g.split("/").pop().replace(".svg",".png")),e(null)):e("This browser does not support SVG and no PNG fallback was defined."),void 0}-1===l.indexOf(a)&&(l.push(a),a.setAttribute("src",""),r(g,function(d){if("undefined"==typeof d||"string"==typeof d)return e(d),!1;var h=a.getAttribute("id");h&&d.setAttribute("id",h);var j=a.getAttribute("title");j&&d.setAttribute("title",j);var m=[].concat(d.getAttribute("class")||[],"injected-svg",a.getAttribute("class")||[]).join(" ");d.setAttribute("class",f(m));var o=a.getAttribute("style");o&&d.setAttribute("style",o);var p=[].filter.call(a.attributes,function(a){return/^data-\w[\w\-]*$/.test(a.name)});i.call(p,function(a){a.name&&a.value&&d.setAttribute(a.name,a.value)});for(var q,r=d.querySelectorAll("defs clipPath[id]"),s=0,t=r.length;t>s;s++){q=r[s].id+"-"+k;for(var u=d.querySelectorAll('[clip-path*="'+r[s].id+'"]'),v=0,w=u.length;w>v;v++)u[v].setAttribute("clip-path","url(#"+q+")");r[s].id=q}d.removeAttribute("xmlns:a");for(var x,y,z=d.querySelectorAll("script"),A=[],B=0,C=z.length;C>B;B++)y=z[B].getAttribute("type"),y&&"application/ecmascript"!==y&&"application/javascript"!==y||(x=z[B].innerText||z[B].textContent,A.push(x),d.removeChild(z[B]));if(A.length>0&&("always"===c||"once"===c&&!n[g])){for(var D=0,E=A.length;E>D;D++)new Function(A[D])(b);n[g]=!0}a.parentNode.replaceChild(d,a),delete l[l.indexOf(a)],a=null,k++,e(d)}))},t=function(a,b,c){b=b||{};var d=b.evalScripts||"always",e=b.pngFallback||!1,f=b.each;if(void 0!==a.length){var g=0;i.call(a,function(b){s(b,d,e,function(b){f&&"function"==typeof f&&f(b),c&&a.length===++g&&c(g)})})}else a?s(a,d,e,function(b){f&&"function"==typeof f&&f(b),c&&c(1),a=null}):c&&c(0)};"object"==typeof c&&"object"==typeof c.exports?c.exports=d=t:"function"==typeof a&&a.amd?a(function(){return t}):"object"==typeof b&&(b.SVGInjector=t)}(window,document)},{}]},{},[1])(1)});
(function() {
  'use strict';

  angular.module('foundation.core', [
      'foundation.core.animation'
    ])
    .service('FoundationApi', FoundationApi)
    .service('FoundationAdapter', FoundationAdapter)
    .factory('Utils', Utils)
    .run(Setup);
  ;

  FoundationApi.$inject = ['FoundationAnimation'];

  function FoundationApi(FoundationAnimation) {
    var listeners  = {};
    var settings   = {};
    var uniqueIds  = [];
    var service    = {};

    service.subscribe           = subscribe;
    service.unsubscribe         = unsubscribe;
    service.publish             = publish;
    service.getSettings         = getSettings;
    service.modifySettings      = modifySettings;
    service.generateUuid        = generateUuid;
    service.toggleAnimate       = toggleAnimate;
    service.closeActiveElements = closeActiveElements;
    service.animate             = animate;
    service.animateAndAdvise    = animateAndAdvise;

    return service;

    function subscribe(name, callback) {
      if (!listeners[name]) {
        listeners[name] = [];
      }

      listeners[name].push(callback);
      return true;
    }

    function unsubscribe(name, callback) {
      if (listeners[name] !== undefined) {
        delete listeners[name];
      }
      if (typeof callback == 'function') {
          callback.call(this);
      }
    }

    function publish(name, msg) {
      if (!listeners[name]) {
        listeners[name] = [];
      }

      listeners[name].forEach(function(cb) {
        cb(msg);
      });

      return;
    }

    function getSettings() {
      return settings;
    }

    function modifySettings(tree) {
      settings = angular.extend(settings, tree);
      return settings;
    }

    function generateUuid() {
      var uuid = '';

      //little trick to produce semi-random IDs
      do {
        uuid += 'zf-uuid-';
        for (var i=0; i<15; i++) {
          uuid += Math.floor(Math.random()*16).toString(16);
        }
      } while(!uniqueIds.indexOf(uuid));

      uniqueIds.push(uuid);
      return uuid;
    }

    function toggleAnimate(element, futureState) {
      FoundationAnimation.toggleAnimate(element, futureState);
    }

    function closeActiveElements(options) {
      var self = this;
      options = options || {};
      var activeElements = document.querySelectorAll('.is-active[zf-closable]');
      // action sheets are nested zf-closable elements, so we have to target the parent
      var nestedActiveElements = document.querySelectorAll('[zf-closable] > .is-active');

      if (activeElements.length) {
        angular.forEach(activeElements, function(el) {
          if (options.exclude !== el.id) {
            self.publish(el.id, 'close');
          }
        });
      }
      if (nestedActiveElements.length) {
        angular.forEach(nestedActiveElements, function(el) {
          var parentId = el.parentNode.id;
          if (options.exclude !== parentId) {
            self.publish(parentId, 'close');
          }
        });
      }
    }

    function animate(element, futureState, animationIn, animationOut) {
      return FoundationAnimation.animate(element, futureState, animationIn, animationOut);
    }

    function animateAndAdvise(element, futureState, animationIn, animationOut) {
      var promise = FoundationAnimation.animate(element, futureState, animationIn, animationOut);
      promise.then(function() {
        publish(element[0].id, futureState ? 'active-true' : 'active-false');
      }, function() {
        publish(element[0].id, 'active-aborted');
      });
      return promise;
    }
  }

  FoundationAdapter.$inject = ['FoundationApi'];

  function FoundationAdapter(foundationApi) {

    var service    = {};

    service.activate = activate;
    service.deactivate = deactivate;

    return service;

    function activate(target) {
      foundationApi.publish(target, 'show');
    }

    function deactivate(target) {
      foundationApi.publish(target, 'hide');
    }
  }


  function Utils() {
    var utils = {};

    utils.throttle = throttleUtil;

    return utils;

    function throttleUtil(func, delay) {
      var timer = null;

      return function () {
        var context = this, args = arguments;

        if (timer === null) {
          timer = setTimeout(function () {
            func.apply(context, args);
            timer = null;
          }, delay);
        }
      };
    }
  }

  function Setup() {
    // Attach FastClick
    if (typeof(FastClick) !== 'undefined') {
      FastClick.attach(document.body);
    }

    // Attach viewport units buggyfill
    if (typeof(viewportUnitsBuggyfill) !== 'undefined') {
      viewportUnitsBuggyfill.init();
    }
  }

})();

(function() {
  'use strict';

  angular.module('foundation.core.animation', [])
    .service('FoundationAnimation', FoundationAnimation)
  ;

  FoundationAnimation.$inject = ['$q'];

  function FoundationAnimation($q) {
    var animations = [];
    var service = {};

    var initClasses        = ['ng-enter', 'ng-leave'];
    var activeClasses      = ['ng-enter-active', 'ng-leave-active'];
    var activeGenericClass = 'is-active';
    var events = [
      'webkitAnimationEnd', 'mozAnimationEnd',
      'MSAnimationEnd', 'oanimationend',
      'animationend', 'webkitTransitionEnd',
      'otransitionend', 'transitionend'
    ];

    service.animate = animate;
    service.toggleAnimation = toggleAnimation;

    return service;

    function toggleAnimation(element, futureState) {
      if(futureState) {
        element.addClass(activeGenericClass);
      } else {
        element.removeClass(activeGenericClass);
      }
    }

    function animate(element, futureState, animationIn, animationOut) {
      var animationTimeout;
      var deferred = $q.defer();
      var timedOut = true;
      var self = this;
      self.cancelAnimation = cancelAnimation;

      var animationClass = futureState ? animationIn: animationOut;
      var activation = futureState;
      var initClass = activation ? initClasses[0] : initClasses[1];
      var activeClass = activation ? activeClasses[0] : activeClasses[1];

      run();
      return deferred.promise;

      function run() {
        //stop animation
        registerElement(element);
        reset();
        element.addClass(animationClass);
        element.addClass(initClass);

        element.addClass(activeGenericClass);

        //force a "tick"
        reflow();

        //activate
        element[0].style.transitionDuration = '';
        element.addClass(activeClass);

        element.on(events.join(' '), eventHandler);

        animationTimeout = setTimeout(function() {
          if(timedOut) {
            finishAnimation();
          }
        }, 3000);
      }

      function eventHandler(e) {
        if (element[0] === e.target) {
          clearTimeout(animationTimeout);
          finishAnimation();
        }
      }

      function finishAnimation() {
        deregisterElement(element);
        reset(); //reset all classes
        element[0].style.transitionDuration = '';
        element.removeClass(!activation ? activeGenericClass : ''); //if not active, remove active class
        reflow();
        timedOut = false;
        element.off(events.join(' '), eventHandler);
        deferred.resolve({element: element, active: activation});
      }

      function cancelAnimation(element) {
        deregisterElement(element);
        angular.element(element).off(events.join(' ')); //kill all animation event handlers
        timedOut = false;
        deferred.reject();
      }

      function registerElement(el) {
        var elObj = {
          el: el,
          animation: self
        };

        //kill in progress animations
        var inProgress = animations.filter(function(obj) {
          return obj.el === el;
        });
        if(inProgress.length > 0) {
          var target = inProgress[0].el[0];

          inProgress[0].animation.cancelAnimation(target);
        }

        animations.push(elObj);
      }

      function deregisterElement(el) {
        var index;
        var currentAnimation = animations.filter(function(obj, ind) {
          if(obj.el === el) {
            index = ind;
          }
        });

        if(index >= 0) {
          animations.splice(index, 1);
        }

      }

      function reflow() {
        return element[0].offsetWidth;
      }

      function reset() {
        element[0].style.transitionDuration = 0;
        element.removeClass(initClasses.join(' ') + ' ' + activeClasses.join(' ') + ' ' + animationIn + ' ' + animationOut);
      }
    }
  }

})();

(function() {
  'use strict';

  angular.module('foundation.accordion', [])
    .controller('ZfAccordionController', zfAccordionController)
    .directive('zfAccordion', zfAccordion)
    .directive('zfAccordionItem', zfAccordionItem)
  ;

  zfAccordionController.$inject = ['$scope'];

  function zfAccordionController($scope) {
    var controller = this;
    var sections = controller.sections = $scope.sections = [];
    var multiOpen = controller.multiOpen = $scope.multiOpen = $scope.multiOpen || false;
    var collapsible = controller.collapsible = $scope.collapsible = $scope.multiOpen || $scope.collapsible || true; //multi open infers a collapsible true
    var autoOpen = controller.autoOpen = $scope.autoOpen = $scope.autoOpen || true; //auto open opens first tab on render

    controller.select = function(selectSection) {
      sections.forEach(function(section) {
        //if multi open is allowed, toggle a tab
        if(controller.multiOpen) {
          if(section.scope === selectSection) {
            section.scope.active = !section.scope.active;
          }
        } else {
          //non  multi open will close all tabs and open one
          if(section.scope === selectSection) {
            //if collapsible is allowed, a tab will toggle
            section.scope.active = collapsible ? !section.scope.active : true;
          } else {
            section.scope.active = false;
          }
        }

      });
    };

    controller.addSection = function addsection(sectionScope) {
      sections.push({ scope: sectionScope });

      if(sections.length === 1 && autoOpen === true) {
        sections[0].active = true;
        sections[0].scope.active = true;
      }
    };

    controller.closeAll = function() {
      sections.forEach(function(section) {
        section.scope.active = false;
      });
    };
  }

  function zfAccordion() {
    var directive = {
      restrict: 'EA',
      transclude: 'true',
      replace: true,
      templateUrl: 'components/accordion/accordion.html',
      controller: 'ZfAccordionController',
      scope: {
        multiOpen: '@?',
        collapsible: '@?',
        autoOpen: '@?'
      },
      link: link
    };

    return directive;

    function link(scope, element, attrs, controller) {
      scope.multiOpen = controller.multiOpen = scope.multiOpen === "true" ? true : false;
      scope.collapsible = controller.collapsible = scope.collapsible === "true" ? true : false;
      scope.autoOpen = controller.autoOpen = scope.autoOpen === "true" ? true : false;
    }
  }

  //accordion item
  function zfAccordionItem() {
    var directive = {
        restrict: 'EA',
        templateUrl: 'components/accordion/accordion-item.html',
        transclude: true,
        scope: {
          title: '@'
        },
        require: '^zfAccordion',
        replace: true,
        controller: function() {},
        link: link
    };

    return directive;

    function link(scope, element, attrs, controller, transclude) {
      scope.active = false;
      controller.addSection(scope);

      scope.activate = function() {
        controller.select(scope);
      };

    }
  }

})();

(function() {
  'use strict';

  angular.module('foundation.common', ['foundation.core'])
    .directive('zfClose', zfClose)
    .directive('zfOpen', zfOpen)
    .directive('zfToggle', zfToggle)
    .directive('zfEscClose', zfEscClose)
    .directive('zfSwipeClose', zfSwipeClose)
    .directive('zfHardToggle', zfHardToggle)
    .directive('zfCloseAll', zfCloseAll)
  ;

  zfClose.$inject = ['FoundationApi'];

  function zfClose(foundationApi) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      var targetId = '';
      if (attrs.zfClose) {
        targetId = attrs.zfClose;
      } else {
        var parentElement= false;
        var tempElement = element.parent();
        //find parent modal
        while(parentElement === false) {
          if(tempElement[0].nodeName == 'BODY') {
            parentElement = '';
          }

          if(typeof tempElement.attr('zf-closable') !== 'undefined' && tempElement.attr('zf-closable') !== false) {
            parentElement = tempElement;
          }

          tempElement = tempElement.parent();
        }
        targetId = parentElement.attr('id');
      }
      element.on('click', function(e) {
        foundationApi.publish(targetId, 'close');
        e.preventDefault();
      });
    }
  }

  zfOpen.$inject = ['FoundationApi'];

  function zfOpen(foundationApi) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      element.on('click', function(e) {
        foundationApi.publish(attrs.zfOpen, 'open');
        e.preventDefault();
      });
    }
  }

  zfToggle.$inject = ['FoundationApi'];

  function zfToggle(foundationApi) {
    var directive = {
      restrict: 'A',
      link: link
    }

    return directive;

    function link(scope, element, attrs) {
      element.on('click', function(e) {
        foundationApi.publish(attrs.zfToggle, 'toggle');
        e.preventDefault();
      });
    }
  }

  zfEscClose.$inject = ['FoundationApi'];

  function zfEscClose(foundationApi) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      element.on('keyup', function(e) {
        if (e.keyCode === 27) {
          foundationApi.closeActiveElements();
        }
        e.preventDefault();
      });
    }
  }

  zfSwipeClose.$inject = ['FoundationApi'];

  function zfSwipeClose(foundationApi) {
    var directive = {
      restrict: 'A',
      link: link
    };
    return directive;

    function link($scope, element, attrs) {
      var swipeDirection;
      var hammerElem;
      if (typeof(Hammer)!=='undefined') {
        hammerElem = new Hammer(element[0]);
        // set the options for swipe (to make them a bit more forgiving in detection)
        hammerElem.get('swipe').set({
          direction: Hammer.DIRECTION_ALL,
          threshold: 5, // this is how far the swipe has to travel
          velocity: 0.5 // and this is how fast the swipe must travel
        });
      }
      // detect what direction the directive is pointing
      switch (attrs.zfSwipeClose) {
        case 'right':
          swipeDirection = 'swiperight';
          break;
        case 'left':
          swipeDirection = 'swipeleft';
          break;
        case 'up':
          swipeDirection = 'swipeup';
          break;
        case 'down':
          swipeDirection = 'swipedown';
          break;
        default:
          swipeDirection = 'swipe';
      }
      if(typeof(hammerElem) !== 'undefined'){
        hammerElem.on(swipeDirection, function() {
          foundationApi.publish(attrs.id, 'close');
        });
      }
    }
  }

  zfHardToggle.$inject = ['FoundationApi'];

  function zfHardToggle(foundationApi) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      element.on('click', function(e) {
        foundationApi.closeActiveElements({exclude: attrs.zfHardToggle});
        foundationApi.publish(attrs.zfHardToggle, 'toggle');
        e.preventDefault();
      });
    }
  }

  zfCloseAll.$inject = ['FoundationApi'];

  function zfCloseAll(foundationApi) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      element.on('click', function(e) {
        var tar = e.target;
        var avoid = ['zf-toggle', 'zf-hard-toggle', 'zf-open', 'zf-close'].filter(function(e, i){
          return e in tar.attributes;
        });

        if(avoid.length > 0){ return; }

        var activeElements = document.querySelectorAll('.is-active[zf-closable]');

        if(activeElements.length && !activeElements[0].hasAttribute('zf-ignore-all-close')){
          if(getParentsUntil(tar, 'zf-closable') === false){
            e.preventDefault();
            foundationApi.publish(activeElements[0].id, 'close');
          }
        }
        return;
      });
    }
    /** special thanks to Chris Ferdinandi for this solution.
     * http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
     */
    function getParentsUntil(elem, parent) {
      for ( ; elem && elem !== document.body; elem = elem.parentNode ) {
        if(elem.hasAttribute(parent)){
          if(elem.classList.contains('is-active')){ return elem; }
          break;
        }
      }
      return false;
    }
  }
})();

(function() {
  'use strict';

  angular.module('foundation.popup', ['foundation.core'])
    .directive('zfPopup', zfPopup)
    .directive('zfPopupToggle', zfPopupToggle)
    .service('FoundationPopup', FoundationPopup)
  ;

  FoundationPopup.$inject = ['FoundationApi'];

  function FoundationPopup(foundationApi) {
    var service    = {};

    service.activate = activate;
    service.deactivate = deactivate;

    return service;

    //target should be element ID
    function activate(target) {
      foundationApi.publish(target, ['show']);
    }

    //target should be element ID
    function deactivate(target) {
      foundationApi.publish(target, ['hide']);
    }

    function toggle(target, popupTarget) {
      foundationApi.publish(target, ['toggle', popupTarget]);
    }
  }

  zfPopup.$inject = ['FoundationApi'];

  function zfPopup(foundationApi) {
    var directive = {
      restrict: 'EA',
      transclude: true,
      replace: true,
      templateUrl: 'components/popup/popup.html',
      scope: {
        pinTo: '@?',
        pinAt: '@?',
        target: '@?'
      },
      compile: compile
    };

    return directive;

    function compile() {
      return {
        pre: preLink,
        post: postLink
      };

      function preLink(scope, iElement, iAttrs) {
        iAttrs.$set('zf-closable', 'popup');
      }

      function postLink(scope, element, attrs) {
        scope.active = false;
        scope.target = scope.target || false;

        var attachment = scope.pinTo || 'top center';
        var targetAttachment = scope.pinAt || 'bottom center';
        var tetherInit = false;
        var tether     = {};

        //setup
        foundationApi.subscribe(attrs.id, function(msg) {
          if(msg[0] === 'show' || msg[0] === 'open') {
            scope.show(msg[1]);
          } else if (msg[0] === 'close' || msg[0] === 'hide') {
            scope.hide();
          } else if (msg[0] === 'toggle') {
            scope.toggle(msg[1]);
          }

          scope.$apply();

          return;
        });


        scope.hide = function() {
          scope.active = false;
          tetherElement();
          tether.disable();
          return;
        };

        scope.show = function(newTarget) {
          scope.active = true;
          tetherElement(newTarget);
          tether.enable();

          return;
        };

        scope.toggle = function(newTarget) {
          scope.active = !scope.active;
          tetherElement(newTarget);

          if(scope.active) {
            tether.enable();
          } else  {
            tether.disable();
          }

          return;
        };

        function tetherElement(target) {
          if(tetherInit) {
            return;
          }

          scope.target = scope.target ? document.getElementById(scope.target) : document.getElementById(target);

          tether = new Tether({
            element: element[0],
            target: scope.target,
            attachment: attachment,
            targetAttachment: targetAttachment,
            enable: false
          });

          tetherInit = true;
        }

      }
    }
  }

  zfPopupToggle.$inject = ['FoundationApi'];

  function zfPopupToggle(foundationApi) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      var target = attrs.zfPopupToggle;
      var id = attrs.id || foundationApi.generateUuid();
      attrs.$set('id', id);

      element.on('click', function(e) {
        foundationApi.publish(target, ['toggle', id]);
        e.preventDefault();
      });
    }
  }

})();

(function() {
  'use strict';

  angular.module('foundation.tabs', ['foundation.core'])
    .controller('ZfTabsController', ZfTabsController)
    .directive('zfTabs', zfTabs)
    .directive('zfTabContent', zfTabContent)
    .directive('zfTab', zfTab)
    .directive('zfTabIndividual', zfTabIndividual)
    .directive('zfTabHref', zfTabHref)
    .directive('zfTabCustom', zfTabCustom)
    .directive('zfTabContentCustom', zfTabContentCustom)
    .service('FoundationTabs', FoundationTabs)
  ;

  FoundationTabs.$inject = ['FoundationApi'];

  function FoundationTabs(foundationApi) {
    var service    = {};

    service.activate = activate;

    return service;

    //target should be element ID
    function activate(target) {
      foundationApi.publish(target, 'show');
    }

  }

  ZfTabsController.$inject = ['$scope', 'FoundationApi'];

  function ZfTabsController($scope, foundationApi) {
    var controller = this;
    var tabs       = controller.tabs = $scope.tabs = [];
    var id         = '';

    controller.select = function(selectTab) {
      tabs.forEach(function(tab) {
        tab.active = false;
        tab.scope.active = false;

        if(tab.scope === selectTab) {
          foundationApi.publish(id, ['activate', tab]);

          tab.active = true;
          tab.scope.active = true;
        }
      });

    };

    controller.addTab = function addTab(tabScope) {
      tabs.push({ scope: tabScope, active: false, parentContent: controller.id });

      if(tabs.length === 1) {
        tabs[0].active = true;
        tabScope.active = true;
      }
    };

    controller.getId = function() {
      return id;
    };

    controller.setId = function(newId) {
      id = newId;
    };
  }

  zfTabs.$inject = ['FoundationApi'];

  function zfTabs(foundationApi) {
    var directive = {
      restrict: 'EA',
      transclude: 'true',
      replace: true,
      templateUrl: 'components/tabs/tabs.html',
      controller: 'ZfTabsController',
      scope: {
        displaced: '@?'
      },
      link: link
    };

    return directive;

    function link(scope, element, attrs, controller) {
      scope.id = attrs.id || foundationApi.generateUuid();
      scope.showTabContent = scope.displaced !== 'true';
      attrs.$set('id', scope.id);
      controller.setId(scope.id);

      //update tabs in case tab-content doesn't have them
      var updateTabs = function() {
        foundationApi.publish(scope.id + '-tabs', scope.tabs);
      };

      foundationApi.subscribe(scope.id + '-get-tabs', function() {
        updateTabs();
      });
    }
  }

  zfTabContent.$inject = ['FoundationApi'];

  function zfTabContent(foundationApi) {
    var directive = {
      restrict: 'A',
      transclude: 'true',
      replace: true,
      scope: {
        tabs: '=?',
        target: '@'
      },
      templateUrl: 'components/tabs/tab-content.html',
      link: link
    };

    return directive;

    function link(scope, element, attrs, ctrl) {
      scope.tabs = scope.tabs || [];
      var id = scope.target;

      foundationApi.subscribe(id, function(msg) {
        if(msg[0] === 'activate') {
          var tabId = msg[1];
          scope.tabs.forEach(function (tab) {
            tab.scope.active = false;
            tab.active = false;

            if(tab.scope.id === id) {
              tab.scope.active = true;
              tab.active = true;
            }
          });
        }
      });

      //if tabs empty, request tabs
      if(scope.tabs.length === 0) {
        foundationApi.subscribe(id + '-tabs', function(tabs) {
          scope.tabs = tabs;
        });

        foundationApi.publish(id + '-get-tabs', '');
      }
    }
  }

  zfTab.$inject = ['FoundationApi'];

  function zfTab(foundationApi) {
    var directive = {
      restrict: 'EA',
      templateUrl: 'components/tabs/tab.html',
      transclude: true,
      scope: {
        title: '@'
      },
      require: '^zfTabs',
      replace: true,
      link: link
    };

    return directive;

    function link(scope, element, attrs, controller, transclude) {
      scope.id = attrs.id || foundationApi.generateUuid();
      scope.active = false;
      scope.transcludeFn = transclude;
      controller.addTab(scope);

      foundationApi.subscribe(scope.id, function(msg) {
        if(msg === 'show' || msg === 'open' || msg === 'activate') {
          scope.makeActive();
        }
      });

      scope.makeActive = function() {
        controller.select(scope);
      };
    }
  }

  zfTabIndividual.$inject = ['FoundationApi'];

  function zfTabIndividual(foundationApi) {
    var directive = {
      restrict: 'EA',
      transclude: 'true',
      link: link
    };

    return directive;

    function link(scope, element, attrs, ctrl, transclude) {
      var tab = scope.$eval(attrs.tab);
      var id = tab.scope.id;

      tab.scope.transcludeFn(tab.scope, function(tabContent) {
        element.append(tabContent);
      });

      foundationApi.subscribe(tab.scope.id, function(msg) {
        foundationApi.publish(tab.parentContent, ['activate', tab.scope.id]);
        scope.$apply();
      });

    }
  }

  //custom tabs

  zfTabHref.$inject = ['FoundationApi'];

  function zfTabHref(foundationApi) {
    var directive = {
      restrict: 'A',
      replace: false,
      link: link
    }

    return directive;

    function link(scope, element, attrs, ctrl) {
      var target = attrs.zfTabHref;

      foundationApi.subscribe(target, function(msg) {
        if(msg === 'activate' || msg === 'show' || msg === 'open') {
          makeActive();
        }
      });


      element.on('click', function(e) {
        foundationApi.publish(target, 'activate');
        makeActive();
        e.preventDefault();
      });

      function makeActive() {
        element.parent().children().removeClass('is-active');
        element.addClass('is-active');
      }
    }
  }

  zfTabCustom.$inject = ['FoundationApi'];

  function zfTabCustom(foundationApi) {
    var directive = {
      restrict: 'A',
      replace: false,
      link: link
    };

    return directive;

    function link(scope, element, attrs, ctrl, transclude) {
      var children = element.children();
      angular.element(children[0]).addClass('is-active');
    }
  }

  zfTabContentCustom.$inject = ['FoundationApi'];

  function zfTabContentCustom(foundationApi) {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {
      var tabs = [];
      var children = element.children();

      angular.forEach(children, function(node) {
        if(node.id) {
          var tabId = node.id;
          tabs.push(tabId);
          foundationApi.subscribe(tabId, function(msg) {
            if(msg === 'activate' || msg === 'show' || msg === 'open') {
              activateTabs(tabId);
            }
          });

          if(tabs.length === 1) {
            var el = angular.element(node);
            el.addClass('is-active');
          }
        }
      });

      function activateTabs(tabId) {
        var tabNodes = element.children();
        angular.forEach(tabNodes, function(node) {
          var el = angular.element(node);
          el.removeClass('is-active');
          if(el.attr('id') === tabId) {
            el.addClass('is-active');
          }

        });
      }
    }
  }

})();

(function() {
  'use strict';

  angular.module('foundation.offcanvas', ['foundation.core'])
    .directive('zfOffcanvas', zfOffcanvas)
    .service('FoundationOffcanvas', FoundationOffcanvas)
  ;

  FoundationOffcanvas.$inject = ['FoundationApi'];

  function FoundationOffcanvas(foundationApi) {
    var service    = {};

    service.activate = activate;
    service.deactivate = deactivate;

    return service;

    //target should be element ID
    function activate(target) {
      foundationApi.publish(target, 'show');
    }

    //target should be element ID
    function deactivate(target) {
      foundationApi.publish(target, 'hide');
    }

    function toggle(target) {
      foundationApi.publish(target, 'toggle');
    }
  }

  zfOffcanvas.$inject = ['FoundationApi'];

  function zfOffcanvas(foundationApi) {
    var directive = {
      restrict: 'EA',
      templateUrl: 'components/offcanvas/offcanvas.html',
      transclude: true,
      scope: {
        position: '@'
      },
      replace: true,
      compile: compile
    };

    return directive;

    function compile(tElement, tAttrs, transclude) {
      var type = 'offcanvas';

      return {
        pre: preLink,
        post: postLink
      };

      function preLink(scope, iElement, iAttrs, controller) {
        iAttrs.$set('zf-closable', type);
        document.body.classList.add('has-off-canvas');
      }

      function postLink(scope, element, attrs) {
        scope.position = scope.position || 'left';

        scope.active = false;
        //setup
        foundationApi.subscribe(attrs.id, function(msg) {
          if(msg === 'show' || msg === 'open') {
            scope.show();
          } else if (msg === 'close' || msg === 'hide') {
            scope.hide();
          } else if (msg === 'toggle') {
            scope.toggle();
          }

          if (!scope.$root.$$phase) {
            scope.$apply();
          }

          return;
        });

        scope.hide = function() {
          scope.active = false;
          return;
        };

        scope.show = function() {
          scope.active = true;
          return;
        };

        scope.toggle = function() {
          scope.active = !scope.active;
          return;
        };
      }
    }
  }

})();

(function () {
  'use strict';

  angular.module('foundation.iconic', [])
    .provider('Iconic', Iconic)
    .directive('zfIconic', zfIconic)
  ;

  // iconic wrapper
  function Iconic() {
    // default path
    var assetPath = '/iconic/svg/smart/';

    /**
     * Sets the path used to locate the iconic SVG files
     * @param {string} path - the base path used to locate the iconic SVG files
     */
    this.setAssetPath = function (path) {
      assetPath = angular.isString(path) ? path : assetPath;
    };

    /**
     * Service implementation
     * @returns {{}}
     */
    this.$get = function () {
      var iconicObject = new IconicJS();

      var service = {
        getAccess: getAccess,
        getAssetPath: getAssetPath
      };

      return service;

      /**
       *
       * @returns {Window.IconicJS}
       */
      function getAccess() {
        return iconicObject;
      }

      /**
       *
       * @returns {string}
       */
      function getAssetPath() {
        return assetPath;
      }
    };
  }

  zfIconic.$inject = ['Iconic', 'FoundationApi', '$compile'];

  function zfIconic(iconic, foundationApi, $compile) {
    var directive = {
      restrict: 'A',
      template: '<img ng-transclude>',
      transclude: true,
      replace: true,
      scope: {
        dynSrc: '=?',
        dynIcon: '=?',
        dynIconAttrs: '=?',
        size: '@?',
        icon: '@',
        iconDir: '@?',
        iconAttrs: '=?'
      },
      compile: compile
    };

    return directive;

    function compile() {
      var contents, origAttrs, lastIconAttrs, assetPath;

      return {
        pre: preLink,
        post: postLink
      };

      function preLink(scope, element, attrs) {
        var iconAttrsObj, iconAttr;

        if (scope.iconDir) {
          // path set via attribute
          assetPath = scope.iconDir;
        } else {
          // default path
          assetPath = iconic.getAssetPath();
        }
        // make sure ends with /
        if (assetPath.charAt(assetPath.length - 1) !== '/') {
          assetPath += '/';
        }

        if (scope.dynSrc) {
          attrs.$set('data-src', scope.dynSrc);
        } else if (scope.dynIcon) {
          attrs.$set('data-src', assetPath + scope.dynIcon + '.svg');
        } else {
          if (scope.icon) {
            attrs.$set('data-src', assetPath + scope.icon + '.svg');
          } else {
            // To support expressions on data-src
            attrs.$set('data-src', attrs.src);
          }
        }

        // check if size already added as class
        if (!element.hasClass('iconic-sm') && !element.hasClass('iconic-md') && !element.hasClass('iconic-lg')) {
          var iconicClass;
          switch (scope.size) {
            case 'small':
              iconicClass = 'iconic-sm';
              break;
            case 'medium':
              iconicClass = 'iconic-md';
              break;
            case 'large':
              iconicClass = 'iconic-lg';
              break;
            default:
              iconicClass = 'iconic-fluid';
          }
          element.addClass(iconicClass);
        }

        // add static icon attributes to iconic element
        if (scope.iconAttrs) {
          iconAttrsObj = angular.fromJson(scope.iconAttrs);
          for (iconAttr in iconAttrsObj) {
            // add data- to attribute name if not already present
            attrs.$set(addDataDash(iconAttr), iconAttrsObj[iconAttr]);
          }
        }

        // save contents and attributes of un-inject html, to use for dynamic re-injection
        contents = element[0].outerHTML;
        origAttrs = element[0].attributes;
      }

      function postLink(scope, element, attrs) {
        var svgElement, ico = iconic.getAccess();

        injectSvg(element[0]);

        foundationApi.subscribe('resize', function () {
          // only run update on current element
          ico.update(element[0]);
        });

        // handle dynamic updating of src
        if (scope.dynSrc) {
          scope.$watch('dynSrc', function (newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
              reinjectSvg(scope.dynSrc, scope.dynIconAttrs);
            }
          });
        }
        // handle dynamic updating of icon
        if (scope.dynIcon) {
          scope.$watch('dynIcon', function (newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
              reinjectSvg(assetPath + scope.dynIcon + '.svg', scope.dynIconAttrs);
            }
          });
        }
        // handle dynamic updating of icon attrs
        scope.$watch('dynIconAttrs', function (newVal, oldVal) {
          if (newVal && newVal !== oldVal) {
            if (scope.dynSrc) {
              reinjectSvg(scope.dynSrc, scope.dynIconAttrs);
            } else {
              reinjectSvg(assetPath + scope.dynIcon + '.svg', scope.dynIconAttrs);
            }
          }
        });

        function reinjectSvg(newSrc, newAttrs) {
          var iconAttr;

          if (svgElement) {
            // set html
            svgElement.empty();
            svgElement.append(angular.element(contents));

            // remove 'data-icon' attribute added by injector as it
            // will cause issues with reinjection when changing icons
            svgElement.removeAttr('data-icon');

            // set new source
            svgElement.attr('data-src', newSrc);

            // add additional icon attributes to iconic element
            if (newAttrs) {
              // remove previously added attributes
              if (lastIconAttrs) {
                for (iconAttr in lastIconAttrs) {
                  svgElement.removeAttr(addDataDash(iconAttr));
                }
              }

              // add newly added attributes
              for (iconAttr in newAttrs) {
                // add data- to attribute name if not already present
                svgElement.attr(addDataDash(iconAttr), newAttrs[iconAttr]);
              }
            }

            // store current attrs
            lastIconAttrs = newAttrs;

            // reinject
            injectSvg(svgElement[0]);
          }
        }

        function injectSvg(element) {
          ico.inject(element, {
            each: function (injectedElem) {

              var i, angElem, elemScope;

              // wrap raw element
              angElem = angular.element(injectedElem);

              for(i = 0; i < origAttrs.length; i++) {
                // check if attribute should be ignored
                if (origAttrs[i].name !== 'zf-iconic' &&
                  origAttrs[i].name !== 'ng-transclude' &&
                  origAttrs[i].name !== 'icon' &&
                  origAttrs[i].name !== 'src') {
                  // check if attribute already exists on svg
                  if (angular.isUndefined(angElem.attr(origAttrs[i].name))) {
                    // add attribute to svg
                    angElem.attr(origAttrs[i].name, origAttrs[i].value);
                  }
                }
              }

              // compile
              elemScope = angElem.scope();
              if (elemScope) {
                svgElement = $compile(angElem)(elemScope);
              }
            }
          });
        }
      }

      function addDataDash(attr) {
        return attr.indexOf('data-') !== 0 ? 'data-' + attr : attr;
      }
    }
  }

})();

/*
*	app js (CLIENT SIDE)
*/

var app = angular.module('app', [
	'angular-meteor',
	'angular-meteor.auth',
	'ui.router',
	// 'ngAnimate',
	'foundation.core',
	'foundation.core.animation',	
	'foundation.accordion',
	'foundation.tabs',
    'foundation.iconic',
    'foundation.popup'
]);