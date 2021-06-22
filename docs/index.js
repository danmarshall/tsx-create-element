// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"n8nd":[function(require,module,exports) {
module.exports = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"];
},{}],"VNeM":[function(require,module,exports) {
'use strict';

module.exports = require('./html-tags.json');
},{"./html-tags.json":"n8nd"}],"N8DI":[function(require,module,exports) {
module.exports = [
	"a",
	"altGlyph",
	"altGlyphDef",
	"altGlyphItem",
	"animate",
	"animateColor",
	"animateMotion",
	"animateTransform",
	"circle",
	"clipPath",
	"color-profile",
	"cursor",
	"defs",
	"desc",
	"ellipse",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence",
	"filter",
	"font",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignObject",
	"g",
	"glyph",
	"glyphRef",
	"hkern",
	"image",
	"line",
	"linearGradient",
	"marker",
	"mask",
	"metadata",
	"missing-glyph",
	"mpath",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"radialGradient",
	"rect",
	"script",
	"set",
	"stop",
	"style",
	"svg",
	"switch",
	"symbol",
	"text",
	"textPath",
	"title",
	"tref",
	"tspan",
	"use",
	"view",
	"vkern"
];
},{}],"6Huy":[function(require,module,exports) {
module.exports = require( './svg-tags.json' );
},{"./svg-tags.json":"N8DI"}],"St5X":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createElement = createElement;
exports.addChild = addChild;
exports.mount = mount;
exports.findElementByChildPositions = findElementByChildPositions;
exports.focusActiveElement = focusActiveElement;
exports.setActiveElement = setActiveElement;
exports.getActiveElementInfo = getActiveElementInfo;

var htmlTags = _interopRequireWildcard(require("html-tags"));

var svgTags = _interopRequireWildcard(require("svg-tags"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Decamelizes a string with/without a custom separator (hyphen by default).
 * from: https://ourcodeworld.com/articles/read/608/how-to-camelize-and-decamelize-strings-in-javascript
 *
 * @param str String in camelcase
 * @param separator Separator for the new decamelized string.
 */
function decamelize(str) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
  return str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2').toLowerCase();
}

function createElement(tag, attrs) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if (typeof tag === 'function') {
    var fn = tag;
    var props = attrs;
    props.children = children;
    return fn(props);
  } else {
    var ns = tagNamespace(tag);
    var el = ns ? document.createElementNS(ns, tag) : document.createElement(tag);
    var map = attrs;
    var ref;

    for (var name in map) {
      if (name && map.hasOwnProperty(name)) {
        var value = map[name];

        if (name === 'className' && value !== void 0) {
          setAttribute(el, ns, 'class', value.toString());
        } else if (name === 'disabled' && !value) {//do nothhing, omit this attribute
        } else if (value === null || value === undefined) {
          continue;
        } else if (value === true) {
          setAttribute(el, ns, name, name);
        } else if (typeof value === 'function') {
          if (name === 'ref') {
            ref = value;
          } else {
            el[name.toLowerCase()] = value;
          }
        } else if (_typeof(value) === 'object') {
          setAttribute(el, ns, name, flatten(value));
        } else {
          setAttribute(el, ns, name, value.toString());
        }
      }
    }

    if (children && children.length > 0) {
      appendChildren(el, children);
    }

    if (ref) {
      ref(el);
    }

    return el;
  }
}

function setAttribute(el, ns, name, value) {
  if (ns) {
    el.setAttributeNS(null, name, value);
  } else {
    el.setAttribute(name, value);
  }
}

function flatten(o) {
  var arr = [];

  for (var prop in o) {
    arr.push("".concat(decamelize(prop, '-'), ":").concat(o[prop]));
  }

  return arr.join(';');
}

function addChild(parentElement, child) {
  if (child === null || child === undefined || typeof child === "boolean") {
    return;
  } else if (Array.isArray(child)) {
    appendChildren(parentElement, child);
  } else if (isElement(child)) {
    parentElement.appendChild(child);
  } else {
    parentElement.appendChild(document.createTextNode(child.toString()));
  }
}

function appendChildren(parentElement, children) {
  children.forEach(function (child) {
    return addChild(parentElement, child);
  });
}

function isElement(el) {
  //nodeType cannot be zero https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  return !!el.nodeType;
}

function mount(element, container) {
  container.innerHTML = '';

  if (element) {
    addChild(container, element);
  }
}

function findElementByChildPositions(childPositions, container) {
  var element = container || document.body;
  var childPosition;

  while (element && childPositions.length) {
    childPosition = childPositions.shift();
    element = element.children.item(childPosition);
  }

  if (element) {
    return element;
  }

  ;
}

function focusActiveElement(element, activeElementInfo) {
  element.focus();
  element.scrollTop = activeElementInfo.scrollTop;
  var input = element;

  if (input.setSelectionRange && activeElementInfo && activeElementInfo.selectionStart != null && activeElementInfo.selectionEnd != null) {
    input.setSelectionRange(activeElementInfo.selectionStart, activeElementInfo.selectionEnd, activeElementInfo.selectionDirection);
  }
}

function setActiveElement(activeElementInfo, container) {
  if (activeElementInfo) {
    var element = findElementByChildPositions(activeElementInfo.childPositions, container);

    if (element) {
      focusActiveElement(element, activeElementInfo);
    }
  }
}

function getActiveElementInfo(container) {
  var element = document.activeElement;
  var _element = element,
      scrollTop = _element.scrollTop,
      selectionDirection = _element.selectionDirection,
      selectionEnd = _element.selectionEnd,
      selectionStart = _element.selectionStart;
  var activeElementInfo = {
    childPositions: [],
    scrollTop: scrollTop,
    selectionDirection: selectionDirection,
    selectionEnd: selectionEnd,
    selectionStart: selectionStart
  };

  while (element && element !== document.body && element !== container) {
    activeElementInfo.childPositions.unshift(getChildPosition(element));
    element = element.parentElement;
  }

  if ((element === document.body || element === container) && activeElementInfo.childPositions.length) return activeElementInfo;
}

function getChildPosition(element) {
  var childPosition = 0;

  while (element = element.previousElementSibling) {
    childPosition++;
  }

  return childPosition;
}

function tagNamespace(tag) {
  //issue: this won't disambiguate certain tags which exist in both svg and html: <a>, <title> ...
  if (tag === 'svg' || svgTags.default.indexOf(tag) >= 0 && !(htmlTags.default.indexOf(tag) >= 0)) {
    return "http://www.w3.org/2000/svg";
  }
}
},{"html-tags":"VNeM","svg-tags":"6Huy"}],"VMCN":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
exports.SubComponent = void 0;

var index_1 = require("../dist/es6/index");

var SubComponent = function SubComponent(props) {
  var textChangeHandler = function textChangeHandler(e) {
    return props.textAreaChange(e.currentTarget);
  };

  return index_1.createElement("div", {
    style: {
      border: "1px solid black",
      margin: "0.5em 0",
      padding: "0.5em"
    }
  }, index_1.createElement("div", null, "Text is: ", props.someText), index_1.createElement("div", null, "Children:", index_1.createElement("div", null, props.children)), index_1.createElement("textarea", {
    onKeyPress: textChangeHandler,
    onKeyUp: textChangeHandler,
    onKeyDown: textChangeHandler,
    spellCheck: false
  }, props.someText));
};

exports.SubComponent = SubComponent;
},{"../dist/es6/index":"St5X"}],"C3c2":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
exports.Layout = void 0;

var es6_1 = require("../dist/es6");

var subcomponent_1 = require("./subcomponent");

var Layout = function Layout(props) {
  return es6_1.createElement("div", null, es6_1.createElement("h1", {
    className: "foo"
  }, props.title), props.input, es6_1.createElement("div", null, "count is: ", props.count), es6_1.createElement("button", {
    onClick: function onClick() {
      return props.buttonClick();
    }
  }, "add"), es6_1.createElement("button", {
    onClick: function onClick() {
      return props.buttonClick();
    },
    style: {
      marginLeft: "1em"
    }
  }, "I also add"), es6_1.createElement("button", {
    onClick: function onClick() {
      return props.buttonClick();
    },
    disabled: true,
    style: {
      marginLeft: "1em"
    }
  }, "this is disabled.."), es6_1.createElement("button", {
    onClick: function onClick() {
      return props.buttonClick();
    },
    disabled: false,
    style: {
      marginLeft: "1em"
    }
  }, "disabled = false"), props.subComponentText.map(function (t, i) {
    return es6_1.createElement(subcomponent_1.SubComponent, {
      someText: t,
      textAreaChange: function textAreaChange(v) {
        return props.textAreaChange(i, v);
      }
    }, "component ", i, " content");
  }), "namespaced element (svg):", es6_1.createElement("div", null, es6_1.createElement("svg", {
    width: "100",
    height: "100"
  }, es6_1.createElement("rect", {
    width: "100%",
    height: "100%",
    style: {
      fill: 'none',
      strokeWidth: 1,
      stroke: 'red'
    }
  }), es6_1.createElement("line", {
    x1: "0",
    y1: "0",
    x2: "100%",
    y2: "100%",
    style: {
      strokeWidth: 1,
      stroke: 'red'
    }
  }), es6_1.createElement("line", {
    x1: "0",
    y1: "100%",
    x2: "100%",
    y2: "0",
    style: {
      strokeWidth: 1,
      stroke: 'red'
    }
  }))));
};

exports.Layout = Layout;
},{"../dist/es6":"St5X","./subcomponent":"VMCN"}],"Focm":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var index_1 = require("../dist/es6/index");

var layout_1 = require("./layout");

var count = 0;
var title = "tsx-create-element test app";

var buttonClick = function buttonClick() {
  count++;
  updateRetainFocus();
}; //this textbox is created here, and is an example of a textbox that is reused across every render pass
//which means it has its own state, and the user can use ctrl-z etc.


var input = index_1.createElement("input", {
  ref: function ref(input) {
    input.onkeypress = input.onkeydown = input.onkeyup = input.onchange = function () {
      //do not invoke mount() directly within this handler,
      //otherwise the element will not be disposed,
      //so wrap it within requestAnimationFrame 
      requestAnimationFrame(function () {
        //additionally, the .value is not available until the handler exits
        //so get the value inside requestAnimationFrame  
        title = input.value;
        updateRetainFocus();
      });
    };
  },
  type: "text",
  value: title,
  spellCheck: false
});

var textAreaChange = function textAreaChange(index, textArea) {
  //pass the entire textarea so we can get it's value by reference after the next tick
  requestAnimationFrame(function () {
    subComponentText[index] = textArea.value;
    updateRetainFocus();
  });
};

var subComponentText = ['a component', 'another component'];

function updateRetainFocus() {
  //get the focused element's position and selectionrange
  var a = index_1.getActiveElementInfo();
  update(); //re-set the focus and selectionrange after the update

  index_1.setActiveElement(a);
}

function update() {
  index_1.mount( //note: the layout will detach and append our input above, so it loses its focus and selectionrange.
  //make sure to call getActiveElementInfo prior to calling App
  layout_1.Layout({
    title: title,
    count: count,
    buttonClick: buttonClick,
    input: input,
    subComponentText: subComponentText,
    textAreaChange: textAreaChange
  }), document.getElementById('app'));
}

update();
},{"../dist/es6/index":"St5X","./layout":"C3c2"}]},{},["Focm"], null)