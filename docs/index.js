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
})({"St5X":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addChild = addChild;
exports.createElement = createElement;
exports.findElementByChildPositions = findElementByChildPositions;
exports.focusActiveElement = focusActiveElement;
exports.getActiveElementInfo = getActiveElementInfo;
exports.mount = mount;
exports.setActiveElement = setActiveElement;

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }

var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
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
    var props = attrs; // Handle case where props is null but children are provided

    if (props === null || props === undefined) {
      props = {
        children: children
      };
    } else {
      props.children = children;
    }

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

  for (var prop in o) arr.push("".concat(decamelize(prop, '-'), ":").concat(o[prop]));

  return arr.join(';');
}

function isInsideForeignObject(element) {
  var current = element;

  while (current) {
    if (current.tagName.toLowerCase() === 'foreignobject') {
      return true;
    }

    current = current.parentElement;
  }

  return false;
}

function recreateWithSvgNamespace(element) {
  var svgElement = document.createElementNS(SVG_NAMESPACE, element.tagName.toLowerCase()); // Copy attributes

  for (var i = 0; i < element.attributes.length; i++) {
    var attr = element.attributes[i];
    svgElement.setAttributeNS(null, attr.name, attr.value);
  } // Copy event handlers and other properties
  // Common event handlers that need to be copied


  var eventProperties = ['onclick', 'onmousedown', 'onmouseup', 'onmouseover', 'onmouseout', 'onmousemove', 'onkeydown', 'onkeyup', 'onkeypress', 'onfocus', 'onblur'];

  for (var _i = 0, _eventProperties = eventProperties; _i < _eventProperties.length; _i++) {
    var prop = _eventProperties[_i];

    if (element[prop]) {
      svgElement[prop] = element[prop];
    }
  } // Copy children recursively


  for (var _i3 = 0; _i3 < element.childNodes.length; _i3++) {
    var child = element.childNodes[_i3];

    if (child.nodeType === Node.ELEMENT_NODE) {
      svgElement.appendChild(recreateWithSvgNamespace(child));
    } else {
      svgElement.appendChild(child.cloneNode(true));
    }
  }

  return svgElement;
}

function addChild(parentElement, child) {
  if (child === null || child === undefined || typeof child === "boolean") {
    return;
  } else if (Array.isArray(child)) {
    appendChildren(parentElement, child);
  } else if (isElement(child)) {
    var childEl = child; // If parent is SVG and child was created with wrong namespace, recreate it
    // Exception: don't recreate elements inside foreignObject as they should remain HTML

    if (parentElement.namespaceURI === SVG_NAMESPACE && childEl.namespaceURI !== SVG_NAMESPACE && childEl.tagName.toLowerCase() !== 'foreignobject' && !isInsideForeignObject(parentElement)) {
      var recreated = recreateWithSvgNamespace(childEl);
      parentElement.appendChild(recreated);
    } else {
      parentElement.appendChild(childEl);
    }
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

  while (element = element.previousElementSibling) childPosition++;

  return childPosition;
}

function tagNamespace(tag) {
  // Only handle the root 'svg' element - all other elements will be handled
  // dynamically by the addChild function when they're added to SVG parents
  if (tag === 'svg') {
    return SVG_NAMESPACE;
  }
}
},{}],"VMCN":[function(require,module,exports) {
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
},{"../dist/es6/index":"St5X"}],"G5/u":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
exports.SvgNamespaceTest = void 0;

var index_1 = require("../dist/es6/index"); // Test for SVG namespace fix with overlapping tags


var SvgNamespaceTest = function SvgNamespaceTest() {
  return index_1.createElement("div", null, index_1.createElement("h2", null, "SVG Namespace Test"), index_1.createElement("p", null, "Testing overlapping HTML/SVG tags inside SVG elements:"), index_1.createElement("svg", {
    width: "300",
    height: "200",
    style: {
      border: '1px solid black'
    }
  }, index_1.createElement("rect", {
    x: "10",
    y: "10",
    width: "80",
    height: "80",
    fill: "red"
  }), index_1.createElement("circle", {
    cx: "150",
    cy: "50",
    r: "30",
    fill: "blue"
  }), index_1.createElement("line", {
    x1: "10",
    y1: "100",
    x2: "100",
    y2: "100",
    stroke: "green",
    strokeWidth: "2"
  }), index_1.createElement("a", {
    href: "#test"
  }, index_1.createElement("title", null, "SVG Title Element"), index_1.createElement("text", {
    x: "10",
    y: "130",
    fill: "purple"
  }, "Clickable SVG Text")), index_1.createElement("style", null, ".svg-style { fill: orange; }"), index_1.createElement("a", {
    href: "#link1"
  }, index_1.createElement("text", {
    x: "10",
    y: "170",
    fill: "red"
  }, "SVG Link 1")), index_1.createElement("a", {
    href: "#link2"
  }, index_1.createElement("text", {
    x: "150",
    y: "170",
    fill: "blue"
  }, "SVG Link 2"))), index_1.createElement("p", null, index_1.createElement("strong", null, "All elements above should use SVG namespace (http://www.w3.org/2000/svg)")), index_1.createElement("h3", null, "HTML Elements (for comparison)"), index_1.createElement("p", null, "Compare with HTML elements which use HTML namespace:"), index_1.createElement("a", {
    href: "#html-link1"
  }, "HTML Link 1"), index_1.createElement("a", {
    href: "#html-link2"
  }, "HTML Link 2"), index_1.createElement("a", {
    href: "#html-link3"
  }, "HTML Link 3"), index_1.createElement("p", null, "Before the fix: overlapping tags like <a>, <title>, <style> would use HTML namespace"), index_1.createElement("p", null, "After the fix: all elements inside <svg> automatically use SVG namespace"));
};

exports.SvgNamespaceTest = SvgNamespaceTest;
},{"../dist/es6/index":"St5X"}],"/RRg":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
exports.StatefulSvgTest = void 0;

var index_1 = require("../dist/es6/index"); // Test for SVG namespace fix with stateful functionality


var StatefulSvgTest = function StatefulSvgTest(props) {
  // Create circles based on count, arranged in a grid
  var circles = [];

  for (var i = 0; i < props.count; i++) {
    var x = 30 + i % 8 * 40; // 8 circles per row

    var y = 30 + Math.floor(i / 8) * 40; // New row every 8 circles

    var hue = i * 30 % 360; // Different color for each circle

    circles.push(index_1.createElement("circle", {
      key: i,
      cx: x,
      cy: y,
      r: "15",
      fill: "hsl(" + hue + ", 70%, 60%)",
      stroke: "black",
      strokeWidth: "1"
    }));
  }

  return index_1.createElement("div", null, index_1.createElement("h2", null, "Stateful SVG Test"), index_1.createElement("p", null, "Click the links below to add more circles (count: ", props.count, "):"), index_1.createElement("svg", {
    width: "350",
    height: "200",
    style: {
      border: '1px solid black'
    }
  }, index_1.createElement("defs", null, index_1.createElement("pattern", {
    id: "grid",
    width: "40",
    height: "40",
    patternUnits: "userSpaceOnUse"
  }, index_1.createElement("path", {
    d: "M 40 0 L 0 0 0 40",
    fill: "none",
    stroke: "#ddd",
    strokeWidth: "1"
  }))), index_1.createElement("rect", {
    width: "100%",
    height: "100%",
    fill: "url(#grid)"
  }), circles, index_1.createElement("a", {
    href: "#",
    onClick: function onClick(e) {
      e.preventDefault();
      props.buttonClick();
    }
  }, index_1.createElement("rect", {
    x: "10",
    y: "160",
    width: "60",
    height: "25",
    fill: "lightblue",
    stroke: "blue",
    strokeWidth: "1",
    rx: "5"
  }), index_1.createElement("text", {
    x: "40",
    y: "175",
    textAnchor: "middle",
    fill: "blue",
    fontSize: "12"
  }, "Add One")), index_1.createElement("a", {
    href: "#",
    onClick: function onClick(e) {
      e.preventDefault();
      props.buttonClick();
    }
  }, index_1.createElement("rect", {
    x: "80",
    y: "160",
    width: "60",
    height: "25",
    fill: "lightgreen",
    stroke: "green",
    strokeWidth: "1",
    rx: "5"
  }), index_1.createElement("text", {
    x: "110",
    y: "175",
    textAnchor: "middle",
    fill: "green",
    fontSize: "12"
  }, "Add More")), index_1.createElement("text", {
    x: "175",
    y: "175",
    fill: "black",
    fontSize: "12"
  }, "Count: ", props.count)), index_1.createElement("p", null, index_1.createElement("strong", null, "Demonstrates:")), index_1.createElement("ul", null, index_1.createElement("li", null, "SVG namespace working with stateful components"), index_1.createElement("li", null, "Interactive SVG links calling React-style event handlers"), index_1.createElement("li", null, "Dynamic rendering based on state (circles increase with count)"), index_1.createElement("li", null, "All SVG elements properly namespaced despite overlapping HTML tag names (<a>, <text>, etc.)")));
};

exports.StatefulSvgTest = StatefulSvgTest;
},{"../dist/es6/index":"St5X"}],"C3c2":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
exports.Layout = void 0;

var es6_1 = require("../dist/es6");

var subcomponent_1 = require("./subcomponent");

var svg_namespace_test_1 = require("./svg-namespace-test");

var stateful_svg_test_1 = require("./stateful-svg-test");

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
  }))), es6_1.createElement(svg_namespace_test_1.SvgNamespaceTest, null), es6_1.createElement(stateful_svg_test_1.StatefulSvgTest, {
    count: props.count,
    buttonClick: props.buttonClick
  }));
};

exports.Layout = Layout;
},{"../dist/es6":"St5X","./subcomponent":"VMCN","./svg-namespace-test":"G5/u","./stateful-svg-test":"/RRg"}],"Focm":[function(require,module,exports) {
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