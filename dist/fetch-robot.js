!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("fetchRobot", [], factory) : "object" == typeof exports ? exports.fetchRobot = factory() : root.fetchRobot = factory();
}(this, function() {
    return function(modules) {
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = !0;
            return module.exports;
        }
        var installedModules = {};
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        };
        __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
        };
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = "./src/index.js");
    }({
        "./node_modules/querystringify/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            function decode(input) {
                return decodeURIComponent(input.replace(/\+/g, " "));
            }
            function querystring(query) {
                for (var part, parser = /([^=?&]+)=?([^&]*)/g, result = {}; part = parser.exec(query); result[decode(part[1])] = decode(part[2])) ;
                return result;
            }
            function querystringify(obj, prefix) {
                prefix = prefix || "";
                var pairs = [];
                "string" != typeof prefix && (prefix = "?");
                for (var key in obj) has.call(obj, key) && pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
                return pairs.length ? prefix + pairs.join("&") : "";
            }
            var has = Object.prototype.hasOwnProperty;
            exports.stringify = querystringify;
            exports.parse = querystring;
        },
        "./node_modules/requires-port/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            module.exports = function(port, protocol) {
                protocol = protocol.split(":")[0];
                port = +port;
                if (!port) return !1;
                switch (protocol) {
                  case "http":
                  case "ws":
                    return 80 !== port;

                  case "https":
                  case "wss":
                    return 443 !== port;

                  case "ftp":
                    return 21 !== port;

                  case "gopher":
                    return 70 !== port;

                  case "file":
                    return !1;
                }
                return 0 !== port;
            };
        },
        "./node_modules/url-parse/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            (function(global) {
                function lolcation(loc) {
                    loc = loc || global.location || {};
                    var key, finaldestination = {}, type = void 0 === loc ? "undefined" : _typeof(loc);
                    if ("blob:" === loc.protocol) finaldestination = new URL(unescape(loc.pathname), {}); else if ("string" === type) {
                        finaldestination = new URL(loc, {});
                        for (key in ignore) delete finaldestination[key];
                    } else if ("object" === type) {
                        for (key in loc) key in ignore || (finaldestination[key] = loc[key]);
                        void 0 === finaldestination.slashes && (finaldestination.slashes = slashes.test(loc.href));
                    }
                    return finaldestination;
                }
                function extractProtocol(address) {
                    var match = protocolre.exec(address);
                    return {
                        protocol: match[1] ? match[1].toLowerCase() : "",
                        slashes: !!match[2],
                        rest: match[3]
                    };
                }
                function resolve(relative, base) {
                    for (var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path.length, last = path[i - 1], unshift = !1, up = 0; i--; ) if ("." === path[i]) path.splice(i, 1); else if (".." === path[i]) {
                        path.splice(i, 1);
                        up++;
                    } else if (up) {
                        0 === i && (unshift = !0);
                        path.splice(i, 1);
                        up--;
                    }
                    unshift && path.unshift("");
                    "." !== last && ".." !== last || path.push("");
                    return path.join("/");
                }
                function URL(address, location, parser) {
                    if (!(this instanceof URL)) return new URL(address, location, parser);
                    var relative, extracted, parse, instruction, index, key, instructions = rules.slice(), type = void 0 === location ? "undefined" : _typeof(location), url = this, i = 0;
                    if ("object" !== type && "string" !== type) {
                        parser = location;
                        location = null;
                    }
                    parser && "function" != typeof parser && (parser = qs.parse);
                    location = lolcation(location);
                    extracted = extractProtocol(address || "");
                    relative = !extracted.protocol && !extracted.slashes;
                    url.slashes = extracted.slashes || relative && location.slashes;
                    url.protocol = extracted.protocol || location.protocol || "";
                    address = extracted.rest;
                    extracted.slashes || (instructions[2] = [ /(.*)/, "pathname" ]);
                    for (;i < instructions.length; i++) {
                        instruction = instructions[i];
                        parse = instruction[0];
                        key = instruction[1];
                        if (parse !== parse) url[key] = address; else if ("string" == typeof parse) {
                            if (~(index = address.indexOf(parse))) if ("number" == typeof instruction[2]) {
                                url[key] = address.slice(0, index);
                                address = address.slice(index + instruction[2]);
                            } else {
                                url[key] = address.slice(index);
                                address = address.slice(0, index);
                            }
                        } else if (index = parse.exec(address)) {
                            url[key] = index[1];
                            address = address.slice(0, index.index);
                        }
                        url[key] = url[key] || (relative && instruction[3] ? location[key] || "" : "");
                        instruction[4] && (url[key] = url[key].toLowerCase());
                    }
                    parser && (url.query = parser(url.query));
                    relative && location.slashes && "/" !== url.pathname.charAt(0) && ("" !== url.pathname || "" !== location.pathname) && (url.pathname = resolve(url.pathname, location.pathname));
                    if (!required(url.port, url.protocol)) {
                        url.host = url.hostname;
                        url.port = "";
                    }
                    url.username = url.password = "";
                    if (url.auth) {
                        instruction = url.auth.split(":");
                        url.username = instruction[0] || "";
                        url.password = instruction[1] || "";
                    }
                    url.origin = url.protocol && url.host && "file:" !== url.protocol ? url.protocol + "//" + url.host : "null";
                    url.href = url.toString();
                }
                function set(part, value, fn) {
                    var url = this;
                    switch (part) {
                      case "query":
                        "string" == typeof value && value.length && (value = (fn || qs.parse)(value));
                        url[part] = value;
                        break;

                      case "port":
                        url[part] = value;
                        if (required(value, url.protocol)) value && (url.host = url.hostname + ":" + value); else {
                            url.host = url.hostname;
                            url[part] = "";
                        }
                        break;

                      case "hostname":
                        url[part] = value;
                        url.port && (value += ":" + url.port);
                        url.host = value;
                        break;

                      case "host":
                        url[part] = value;
                        if (/:\d+$/.test(value)) {
                            value = value.split(":");
                            url.port = value.pop();
                            url.hostname = value.join(":");
                        } else {
                            url.hostname = value;
                            url.port = "";
                        }
                        break;

                      case "protocol":
                        url.protocol = value.toLowerCase();
                        url.slashes = !fn;
                        break;

                      case "pathname":
                        url.pathname = value.length && "/" !== value.charAt(0) ? "/" + value : value;
                        break;

                      default:
                        url[part] = value;
                    }
                    for (var i = 0; i < rules.length; i++) {
                        var ins = rules[i];
                        ins[4] && (url[ins[1]] = url[ins[1]].toLowerCase());
                    }
                    url.origin = url.protocol && url.host && "file:" !== url.protocol ? url.protocol + "//" + url.host : "null";
                    url.href = url.toString();
                    return url;
                }
                function toString(stringify) {
                    stringify && "function" == typeof stringify || (stringify = qs.stringify);
                    var query, url = this, protocol = url.protocol;
                    protocol && ":" !== protocol.charAt(protocol.length - 1) && (protocol += ":");
                    var result = protocol + (url.slashes ? "//" : "");
                    if (url.username) {
                        result += url.username;
                        url.password && (result += ":" + url.password);
                        result += "@";
                    }
                    result += url.host + url.pathname;
                    query = "object" === _typeof(url.query) ? stringify(url.query) : url.query;
                    query && (result += "?" !== query.charAt(0) ? "?" + query : query);
                    url.hash && (result += url.hash);
                    return result;
                }
                var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, required = __webpack_require__("./node_modules/requires-port/index.js"), qs = __webpack_require__("./node_modules/querystringify/index.js"), protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i, slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//, rules = [ [ "#", "hash" ], [ "?", "query" ], [ "/", "pathname" ], [ "@", "auth", 1 ], [ NaN, "host", void 0, 1, 1 ], [ /:(\d+)$/, "port", void 0, 1 ], [ NaN, "hostname", void 0, 1, 1 ] ], ignore = {
                    hash: 1,
                    query: 1
                };
                URL.prototype = {
                    set: set,
                    toString: toString
                };
                URL.extractProtocol = extractProtocol;
                URL.location = lolcation;
                URL.qs = qs;
                module.exports = URL;
            }).call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"));
        },
        "./node_modules/webpack/buildin/global.js": function(module, exports) {
            var g, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            g = function() {
                return this;
            }();
            try {
                g = g || Function("return this")() || (0, eval)("this");
            } catch (e) {
                "object" === ("undefined" == typeof window ? "undefined" : _typeof(window)) && (g = window);
            }
            module.exports = g;
        },
        "./src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function utils_isPromise(item) {
                try {
                    if (!item) return !1;
                    if (window.Promise && item instanceof window.Promise) return !0;
                    if (window.Window && item instanceof window.Window) return !1;
                    if (window.constructor && item instanceof window.constructor) return !1;
                    if (utils_toString) {
                        var name = utils_toString.call(item);
                        if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
                    }
                    if ("function" == typeof item.then) return !0;
                } catch (err) {
                    return !1;
                }
                return !1;
            }
            function dispatchPossiblyUnhandledError(err) {
                if (-1 === dispatchedErrors.indexOf(err)) {
                    dispatchedErrors.push(err);
                    setTimeout(function() {
                        throw err;
                    }, 1);
                    for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err);
                }
            }
            function exceptions_onPossiblyUnhandledException(handler) {
                possiblyUnhandledPromiseHandlers.push(handler);
                return {
                    cancel: function() {
                        possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                    }
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function isRegex(item) {
                return "[object RegExp]" === Object.prototype.toString.call(item);
            }
            function getActualDomain(win) {
                var location = win.location;
                if (!location) throw new Error("Can not read window location");
                var protocol = location.protocol;
                if (!protocol) throw new Error("Can not read window protocol");
                if (protocol === src_CONSTANTS.FILE_PROTOCOL) return "file://";
                var host = location.host;
                if (!host) throw new Error("Can not read window host");
                return protocol + "//" + host;
            }
            function src_getDomain(win) {
                win = win || window;
                var domain = getActualDomain(win);
                return domain && win.mockDomain && 0 === win.mockDomain.indexOf(src_CONSTANTS.MOCK_PROTOCOL) ? win.mockDomain : domain;
            }
            function isBlankDomain(win) {
                try {
                    if (!win.location.href) return !0;
                    if ("about:blank" === win.location.href) return !0;
                } catch (err) {}
                return !1;
            }
            function isActuallySameDomain(win) {
                try {
                    var desc = Object.getOwnPropertyDescriptor(win, "location");
                    if (desc && !1 === desc.enumerable) return !1;
                } catch (err) {}
                try {
                    if (isBlankDomain(win)) return !0;
                    if (getActualDomain(win) === getActualDomain(window)) return !0;
                } catch (err) {}
                return !1;
            }
            function src_isSameDomain(win) {
                if (!isActuallySameDomain(win)) return !1;
                try {
                    if (isBlankDomain(win)) return !0;
                    if (src_getDomain(window) === src_getDomain(win)) return !0;
                } catch (err) {}
                return !1;
            }
            function getParent(win) {
                if (win) try {
                    if (win.parent && win.parent !== win) return win.parent;
                } catch (err) {
                    return;
                }
            }
            function getOpener(win) {
                if (win && !getParent(win)) try {
                    return win.opener;
                } catch (err) {
                    return;
                }
            }
            function getParents(win) {
                var result = [];
                try {
                    for (;win.parent !== win; ) {
                        result.push(win.parent);
                        win = win.parent;
                    }
                } catch (err) {}
                return result;
            }
            function isAncestorParent(parent, child) {
                if (!parent || !child) return !1;
                var childParent = getParent(child);
                return childParent ? childParent === parent : -1 !== getParents(child).indexOf(parent);
            }
            function getFrames(win) {
                var result = [], frames = void 0;
                try {
                    frames = win.frames;
                } catch (err) {
                    frames = win;
                }
                var len = void 0;
                try {
                    len = frames.length;
                } catch (err) {}
                if (0 === len) return result;
                if (len) {
                    for (var i = 0; i < len; i++) {
                        var frame = void 0;
                        try {
                            frame = frames[i];
                        } catch (err) {
                            continue;
                        }
                        result.push(frame);
                    }
                    return result;
                }
                for (var _i = 0; _i < 100; _i++) {
                    var _frame = void 0;
                    try {
                        _frame = frames[_i];
                    } catch (err) {
                        return result;
                    }
                    if (!_frame) return result;
                    result.push(_frame);
                }
                return result;
            }
            function getAllChildFrames(win) {
                for (var result = [], _iterator = getFrames(win), _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i2 >= _iterator.length) break;
                        _ref = _iterator[_i2++];
                    } else {
                        _i2 = _iterator.next();
                        if (_i2.done) break;
                        _ref = _i2.value;
                    }
                    var frame = _ref;
                    result.push(frame);
                    for (var _iterator2 = getAllChildFrames(frame), _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray2) {
                            if (_i3 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i3++];
                        } else {
                            _i3 = _iterator2.next();
                            if (_i3.done) break;
                            _ref2 = _i3.value;
                        }
                        var childFrame = _ref2;
                        result.push(childFrame);
                    }
                }
                return result;
            }
            function getTop(win) {
                if (win) {
                    try {
                        if (win.top) return win.top;
                    } catch (err) {}
                    if (getParent(win) === win) return win;
                    try {
                        if (isAncestorParent(window, win) && window.top) return window.top;
                    } catch (err) {}
                    try {
                        if (isAncestorParent(win, window) && window.top) return window.top;
                    } catch (err) {}
                    for (var _iterator3 = getAllChildFrames(win), _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                        var _ref3;
                        if (_isArray3) {
                            if (_i4 >= _iterator3.length) break;
                            _ref3 = _iterator3[_i4++];
                        } else {
                            _i4 = _iterator3.next();
                            if (_i4.done) break;
                            _ref3 = _i4.value;
                        }
                        var frame = _ref3;
                        try {
                            if (frame.top) return frame.top;
                        } catch (err) {}
                        if (getParent(frame) === frame) return frame;
                    }
                }
            }
            function isFrameWindowClosed(frame) {
                if (!frame.contentWindow) return !0;
                if (!frame.parentNode) return !0;
                var doc = frame.ownerDocument;
                return !(!doc || !doc.body || doc.body.contains(frame));
            }
            function isWindowClosed(win) {
                var allowMock = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                try {
                    if (win === window) return !1;
                } catch (err) {
                    return !0;
                }
                try {
                    if (!win) return !0;
                } catch (err) {
                    return !0;
                }
                try {
                    if (win.closed) return !0;
                } catch (err) {
                    return !err || "Call was rejected by callee.\r\n" !== err.message;
                }
                if (allowMock && src_isSameDomain(win)) try {
                    if (win.mockclosed) return !0;
                } catch (err) {}
                try {
                    if (!win.parent || !win.top) return !0;
                } catch (err) {}
                try {
                    var index = iframeWindows.indexOf(win);
                    if (-1 !== index) {
                        var frame = iframeFrames[index];
                        if (frame && isFrameWindowClosed(frame)) return !0;
                    }
                } catch (err) {}
                return !1;
            }
            function getAncestor(win) {
                win = win || window;
                var opener = getOpener(win);
                if (opener) return opener;
                var parent = getParent(win);
                return parent || void 0;
            }
            function isAncestor(parent, child) {
                var actualParent = getAncestor(child);
                if (actualParent) return actualParent === parent;
                if (child === parent) return !1;
                if (getTop(child) === child) return !1;
                for (var _iterator7 = getFrames(parent), _isArray7 = Array.isArray(_iterator7), _i9 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator](); ;) {
                    var _ref7;
                    if (_isArray7) {
                        if (_i9 >= _iterator7.length) break;
                        _ref7 = _iterator7[_i9++];
                    } else {
                        _i9 = _iterator7.next();
                        if (_i9.done) break;
                        _ref7 = _i9.value;
                    }
                    if (_ref7 === child) return !0;
                }
                return !1;
            }
            function isPopup() {
                return Boolean(getOpener(window));
            }
            function isIframe() {
                return Boolean(getParent(window));
            }
            function matchDomain(pattern, origin) {
                if ("string" == typeof pattern) {
                    if ("string" == typeof origin) return pattern === src_CONSTANTS.WILDCARD || origin === pattern;
                    if (isRegex(origin)) return !1;
                    if (Array.isArray(origin)) return !1;
                }
                return isRegex(pattern) ? isRegex(origin) ? pattern.toString() === origin.toString() : !Array.isArray(origin) && Boolean(origin.match(pattern)) : !!Array.isArray(pattern) && (Array.isArray(origin) ? JSON.stringify(pattern) === JSON.stringify(origin) : !isRegex(origin) && pattern.some(function(subpattern) {
                    return matchDomain(subpattern, origin);
                }));
            }
            function getDomainFromUrl(url) {
                var domain = void 0;
                if (!url.match(/^(https?|mock|file):\/\//)) return src_getDomain();
                domain = url;
                domain = domain.split("/").slice(0, 3).join("/");
                return domain;
            }
            function isWindow(obj) {
                try {
                    if (obj && obj.self === obj) return !0;
                } catch (err) {}
                return !1;
            }
            function hasNativeWeakMap() {
                if (!window.WeakMap) return !1;
                if (!window.Object.freeze) return !1;
                try {
                    var testWeakMap = new window.WeakMap(), testKey = {};
                    window.Object.freeze(testKey);
                    testWeakMap.set(testKey, "__testvalue__");
                    return "__testvalue__" === testWeakMap.get(testKey);
                } catch (err) {
                    return !1;
                }
            }
            function weakmap__classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _defineProperty(obj, key, value) {
                key in obj ? Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value;
                return obj;
            }
            function stringifyError(err) {
                if (!err) return "<unknown error: " + Object.prototype.toString.call(err) + ">";
                if ("string" == typeof err) return err;
                if (err instanceof Error) {
                    var stack = err && err.stack, message = err && err.message;
                    if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                    if (stack) return stack;
                    if (message) return message;
                }
                return "function" == typeof err.toString ? err.toString() : Object.prototype.toString.call(err);
            }
            function util_noop() {}
            function addEventListener(obj, event, handler) {
                obj.addEventListener ? obj.addEventListener(event, handler) : obj.attachEvent("on" + event, handler);
                return {
                    cancel: function() {
                        obj.removeEventListener ? obj.removeEventListener(event, handler) : obj.detachEvent("on" + event, handler);
                    }
                };
            }
            function uniqueID() {
                var chars = "0123456789abcdef";
                return "xxxxxxxxxx".replace(/./g, function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                });
            }
            function eachArray(item, callback) {
                for (var i = 0; i < item.length; i++) callback(item[i], i);
            }
            function eachObject(item, callback) {
                for (var _key in item) item.hasOwnProperty(_key) && callback(item[_key], _key);
            }
            function each(item, callback) {
                Array.isArray(item) ? eachArray(item, callback) : "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && eachObject(item, callback);
            }
            function replaceObject(item, callback) {
                var depth = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                if (depth >= 100) throw new Error("Self-referential object passed, or object contained too many layers");
                var newobj = void 0;
                if ("object" !== (void 0 === item ? "undefined" : _typeof(item)) || null === item || Array.isArray(item)) {
                    if (!Array.isArray(item)) throw new Error("Invalid type: " + (void 0 === item ? "undefined" : _typeof(item)));
                    newobj = [];
                } else newobj = {};
                each(item, function(childItem, key) {
                    var result = callback(childItem, key);
                    void 0 !== result ? newobj[key] = result : "object" === (void 0 === childItem ? "undefined" : _typeof(childItem)) && null !== childItem ? newobj[key] = replaceObject(childItem, callback, depth + 1) : newobj[key] = childItem;
                });
                return newobj;
            }
            function safeInterval(method, time) {
                function runInterval() {
                    timeout = setTimeout(runInterval, time);
                    method.call();
                }
                var timeout = void 0;
                timeout = setTimeout(runInterval, time);
                return {
                    cancel: function() {
                        clearTimeout(timeout);
                    }
                };
            }
            function util_isRegex(item) {
                return "[object RegExp]" === Object.prototype.toString.call(item);
            }
            function getWindowType() {
                return isPopup() ? constants_CONSTANTS.WINDOW_TYPES.POPUP : isIframe() ? constants_CONSTANTS.WINDOW_TYPES.IFRAME : constants_CONSTANTS.WINDOW_TYPES.FULLPAGE;
            }
            function jsonStringify(obj, replacer, indent) {
                var objectToJSON = void 0, arrayToJSON = void 0;
                try {
                    if ("{}" !== JSON.stringify({})) {
                        objectToJSON = Object.prototype.toJSON;
                        delete Object.prototype.toJSON;
                    }
                    if ("{}" !== JSON.stringify({})) throw new Error("Can not correctly serialize JSON objects");
                    if ("[]" !== JSON.stringify([])) {
                        arrayToJSON = Array.prototype.toJSON;
                        delete Array.prototype.toJSON;
                    }
                    if ("[]" !== JSON.stringify([])) throw new Error("Can not correctly serialize JSON objects");
                } catch (err) {
                    throw new Error("Can not repair JSON.stringify: " + err.message);
                }
                var result = JSON.stringify.call(this, obj, replacer, indent);
                try {
                    objectToJSON && (Object.prototype.toJSON = objectToJSON);
                    arrayToJSON && (Array.prototype.toJSON = arrayToJSON);
                } catch (err) {
                    throw new Error("Can not repair JSON.stringify: " + err.message);
                }
                return result;
            }
            function jsonParse(item) {
                return JSON.parse(item);
            }
            function isSerialized(item, type) {
                return "object" === (void 0 === item ? "undefined" : serialize__typeof(item)) && null !== item && item.__type__ === type;
            }
            function serializeMethod(destination, domain, method, name) {
                var id = uniqueID(), methods = global.methods.get(destination);
                if (!methods) {
                    methods = {};
                    global.methods.set(destination, methods);
                }
                methods[id] = {
                    domain: domain,
                    method: method
                };
                return {
                    __type__: constants_CONSTANTS.SERIALIZATION_TYPES.METHOD,
                    __id__: id,
                    __name__: name
                };
            }
            function serializeError(err) {
                return {
                    __type__: constants_CONSTANTS.SERIALIZATION_TYPES.ERROR,
                    __message__: stringifyError(err)
                };
            }
            function serializePromise(destination, domain, promise, name) {
                return {
                    __type__: constants_CONSTANTS.SERIALIZATION_TYPES.PROMISE,
                    __then__: serializeMethod(destination, domain, function(resolve, reject) {
                        return promise.then(resolve, reject);
                    }, name + ".then")
                };
            }
            function serializeZalgoPromise(destination, domain, promise, name) {
                return {
                    __type__: constants_CONSTANTS.SERIALIZATION_TYPES.ZALGO_PROMISE,
                    __then__: serializeMethod(destination, domain, function(resolve, reject) {
                        return promise.then(resolve, reject);
                    }, name + ".then")
                };
            }
            function serializeRegex(regex) {
                return {
                    __type__: constants_CONSTANTS.SERIALIZATION_TYPES.REGEX,
                    __source__: regex.source
                };
            }
            function serializeMethods(destination, domain, obj) {
                return replaceObject({
                    obj: obj
                }, function(item, key) {
                    return "function" == typeof item ? serializeMethod(destination, domain, item, key.toString()) : item instanceof Error ? serializeError(item) : window.Promise && item instanceof window.Promise ? serializePromise(destination, domain, item, key.toString()) : promise_ZalgoPromise.isPromise(item) ? serializeZalgoPromise(destination, domain, item, key.toString()) : util_isRegex(item) ? serializeRegex(item) : void 0;
                }).obj;
            }
            function deserializeMethod(source, origin, obj) {
                function wrapper() {
                    var args = Array.prototype.slice.call(arguments);
                    log.debug("Call foreign method", obj.__name__, args);
                    return _send(source, constants_CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                        id: obj.__id__,
                        name: obj.__name__,
                        args: args
                    }, {
                        domain: origin,
                        timeout: 1 / 0
                    }).then(function(_ref2) {
                        var data = _ref2.data;
                        log.debug("Got foreign method result", obj.__name__, data.result);
                        return data.result;
                    }, function(err) {
                        log.debug("Got foreign method error", stringifyError(err));
                        throw err;
                    });
                }
                wrapper.__name__ = obj.__name__;
                wrapper.__xdomain__ = !0;
                wrapper.source = source;
                wrapper.origin = origin;
                return wrapper;
            }
            function deserializeError(source, origin, obj) {
                return new Error(obj.__message__);
            }
            function deserializeZalgoPromise(source, origin, prom) {
                return new promise_ZalgoPromise(function(resolve, reject) {
                    return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
                });
            }
            function deserializePromise(source, origin, prom) {
                return window.Promise ? new window.Promise(function(resolve, reject) {
                    return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
                }) : deserializeZalgoPromise(source, origin, prom);
            }
            function deserializeRegex(source, origin, item) {
                return new RegExp(item.__source__);
            }
            function deserializeMethods(source, origin, obj) {
                return replaceObject({
                    obj: obj
                }, function(item, key) {
                    if ("object" === (void 0 === item ? "undefined" : serialize__typeof(item)) && null !== item) return isSerialized(item, constants_CONSTANTS.SERIALIZATION_TYPES.METHOD) ? deserializeMethod(source, origin, item) : isSerialized(item, constants_CONSTANTS.SERIALIZATION_TYPES.ERROR) ? deserializeError(source, origin, item) : isSerialized(item, constants_CONSTANTS.SERIALIZATION_TYPES.PROMISE) ? deserializePromise(source, origin, item) : isSerialized(item, constants_CONSTANTS.SERIALIZATION_TYPES.ZALGO_PROMISE) ? deserializeZalgoPromise(source, origin, item) : isSerialized(item, constants_CONSTANTS.SERIALIZATION_TYPES.REGEX) ? deserializeRegex(source, origin, item) : void 0;
                }).obj;
            }
            function initOnReady() {
                _on(constants_CONSTANTS.POST_MESSAGE_NAMES.READY, {
                    window: constants_CONSTANTS.WILDCARD,
                    domain: constants_CONSTANTS.WILDCARD
                }, function(event) {
                    var win = event.source, promise = global.readyPromises.get(win);
                    if (promise) promise.resolve(event); else {
                        promise = new promise_ZalgoPromise().resolve(event);
                        global.readyPromises.set(win, promise);
                    }
                });
                var parent = getAncestor();
                parent && _send(parent, constants_CONSTANTS.POST_MESSAGE_NAMES.READY, {}, {
                    domain: constants_CONSTANTS.WILDCARD,
                    timeout: 1 / 0
                }).catch(function(err) {
                    log.debug(stringifyError(err));
                });
            }
            function onWindowReady(win) {
                var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3, name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window", promise = global.readyPromises.get(win);
                if (promise) return promise;
                promise = new promise_ZalgoPromise();
                global.readyPromises.set(win, promise);
                setTimeout(function() {
                    return promise.reject(new Error(name + " did not load after " + timeout + "ms"));
                }, timeout);
                return promise;
            }
            function send__defineProperty(obj, key, value) {
                key in obj ? Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value;
                return obj;
            }
            function buildMessage(win, message) {
                var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, id = uniqueID(), type = getWindowType(), sourceDomain = src_getDomain(window);
                return _extends({}, message, options, {
                    sourceDomain: sourceDomain,
                    id: message.id || id,
                    windowType: type
                });
            }
            function sendMessage(win, message, domain) {
                return promise_ZalgoPromise.try(function() {
                    message = buildMessage(win, message, {
                        data: serializeMethods(win, domain, message.data),
                        domain: domain
                    });
                    var level = void 0;
                    level = -1 !== POST_MESSAGE_NAMES_LIST.indexOf(message.name) || message.type === constants_CONSTANTS.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info";
                    log.logLevel(level, [ "\n\n\t", "#send", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", domain || constants_CONSTANTS.WILDCARD, "\n\n", message ]);
                    if (win === window) throw new Error("Attemping to send message to self");
                    if (isWindowClosed(win)) throw new Error("Window is closed");
                    log.debug("Running send message strategies", message);
                    var messages = [], serializedMessage = jsonStringify(send__defineProperty({}, constants_CONSTANTS.WINDOW_PROPS.POSTROBOT, message), null, 2);
                    return promise_ZalgoPromise.map(Object.keys(SEND_MESSAGE_STRATEGIES), function(strategyName) {
                        return promise_ZalgoPromise.try(function() {
                            if (!CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) throw new Error("Strategy disallowed: " + strategyName);
                            return SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                        }).then(function() {
                            messages.push(strategyName + ": success");
                            return !0;
                        }, function(err) {
                            messages.push(strategyName + ": " + stringifyError(err) + "\n");
                            return !1;
                        });
                    }).then(function(results) {
                        var success = results.some(Boolean), status = message.type + " " + message.name + " " + (success ? "success" : "error") + ":\n  - " + messages.join("\n  - ") + "\n";
                        log.debug(status);
                        if (!success) throw new Error(status);
                    });
                });
            }
            function addResponseListener(hash, listener) {
                global.responseListeners[hash] = listener;
            }
            function getResponseListener(hash) {
                return global.responseListeners[hash];
            }
            function deleteResponseListener(hash) {
                delete global.responseListeners[hash];
            }
            function getRequestListener(_ref) {
                var name = _ref.name, win = _ref.win, domain = _ref.domain;
                win === constants_CONSTANTS.WILDCARD && (win = null);
                domain === constants_CONSTANTS.WILDCARD && (domain = null);
                if (!name) throw new Error("Name required to get request listener");
                var nameListeners = global.requestListeners[name];
                if (nameListeners) for (var _arr = [ win, global.WINDOW_WILDCARD ], _i = 0; _i < _arr.length; _i++) {
                    var winQualifier = _arr[_i], winListeners = winQualifier && nameListeners.get(winQualifier);
                    if (winListeners) {
                        for (var _arr2 = [ domain, constants_CONSTANTS.WILDCARD ], _i2 = 0; _i2 < _arr2.length; _i2++) {
                            var domainQualifier = _arr2[_i2];
                            if (domainQualifier) {
                                domainQualifier = domainQualifier.toString();
                                if (winListeners[domainQualifier]) return winListeners[domainQualifier];
                            }
                        }
                        if (winListeners[__DOMAIN_REGEX__]) for (var _iterator = winListeners[__DOMAIN_REGEX__], _isArray = Array.isArray(_iterator), _i3 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref3;
                            if (_isArray) {
                                if (_i3 >= _iterator.length) break;
                                _ref3 = _iterator[_i3++];
                            } else {
                                _i3 = _iterator.next();
                                if (_i3.done) break;
                                _ref3 = _i3.value;
                            }
                            var _ref4 = _ref3, regex = _ref4.regex, listener = _ref4.listener;
                            if (matchDomain(regex, domain)) return listener;
                        }
                    }
                }
            }
            function addRequestListener(_ref5, listener) {
                var name = _ref5.name, win = _ref5.win, domain = _ref5.domain;
                if (!name || "string" != typeof name) throw new Error("Name required to add request listener");
                if (Array.isArray(win)) {
                    for (var listenersCollection = [], _iterator2 = win, _isArray2 = Array.isArray(_iterator2), _i4 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref6;
                        if (_isArray2) {
                            if (_i4 >= _iterator2.length) break;
                            _ref6 = _iterator2[_i4++];
                        } else {
                            _i4 = _iterator2.next();
                            if (_i4.done) break;
                            _ref6 = _i4.value;
                        }
                        var item = _ref6;
                        listenersCollection.push(addRequestListener({
                            name: name,
                            domain: domain,
                            win: item
                        }, listener));
                    }
                    return {
                        cancel: function() {
                            for (var _iterator3 = listenersCollection, _isArray3 = Array.isArray(_iterator3), _i5 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                                var _ref7;
                                if (_isArray3) {
                                    if (_i5 >= _iterator3.length) break;
                                    _ref7 = _iterator3[_i5++];
                                } else {
                                    _i5 = _iterator3.next();
                                    if (_i5.done) break;
                                    _ref7 = _i5.value;
                                }
                                _ref7.cancel();
                            }
                        }
                    };
                }
                if (Array.isArray(domain)) {
                    for (var _listenersCollection = [], _iterator4 = domain, _isArray4 = Array.isArray(_iterator4), _i6 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                        var _ref8;
                        if (_isArray4) {
                            if (_i6 >= _iterator4.length) break;
                            _ref8 = _iterator4[_i6++];
                        } else {
                            _i6 = _iterator4.next();
                            if (_i6.done) break;
                            _ref8 = _i6.value;
                        }
                        var _item = _ref8;
                        _listenersCollection.push(addRequestListener({
                            name: name,
                            win: win,
                            domain: _item
                        }, listener));
                    }
                    return {
                        cancel: function() {
                            for (var _iterator5 = _listenersCollection, _isArray5 = Array.isArray(_iterator5), _i7 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                                var _ref9;
                                if (_isArray5) {
                                    if (_i7 >= _iterator5.length) break;
                                    _ref9 = _iterator5[_i7++];
                                } else {
                                    _i7 = _iterator5.next();
                                    if (_i7.done) break;
                                    _ref9 = _i7.value;
                                }
                                _ref9.cancel();
                            }
                        }
                    };
                }
                var existingListener = getRequestListener({
                    name: name,
                    win: win,
                    domain: domain
                });
                win && win !== constants_CONSTANTS.WILDCARD || (win = global.WINDOW_WILDCARD);
                domain = domain || constants_CONSTANTS.WILDCARD;
                if (existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString() + " for specified window") : win ? new Error("Request listener already exists for " + name + " for specified window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString()) : new Error("Request listener already exists for " + name);
                var requestListeners = global.requestListeners, nameListeners = requestListeners[name];
                if (!nameListeners) {
                    nameListeners = new weakmap_CrossDomainSafeWeakMap();
                    requestListeners[name] = nameListeners;
                }
                var winListeners = nameListeners.get(win);
                if (!winListeners) {
                    winListeners = {};
                    nameListeners.set(win, winListeners);
                }
                var strDomain = domain.toString();
                winListeners[strDomain] = listener;
                var regexListeners = winListeners[__DOMAIN_REGEX__], regexListener = void 0;
                if (util_isRegex(domain)) {
                    if (!regexListeners) {
                        regexListeners = [];
                        winListeners[__DOMAIN_REGEX__] = regexListeners;
                    }
                    regexListener = {
                        regex: domain,
                        listener: listener
                    };
                    regexListeners.push(regexListener);
                }
                return {
                    cancel: function() {
                        if (winListeners) {
                            delete winListeners[strDomain];
                            win && 0 === Object.keys(winListeners).length && nameListeners.delete(win);
                            regexListener && regexListeners.splice(regexListeners.indexOf(regexListener, 1));
                        }
                    }
                };
            }
            function types__defineProperty(obj, key, value) {
                key in obj ? Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value;
                return obj;
            }
            function parseMessage(message) {
                var parsedMessage = void 0;
                try {
                    parsedMessage = jsonParse(message);
                } catch (err) {
                    return;
                }
                if (parsedMessage && "object" === (void 0 === parsedMessage ? "undefined" : receive__typeof(parsedMessage)) && null !== parsedMessage) {
                    parsedMessage = parsedMessage[constants_CONSTANTS.WINDOW_PROPS.POSTROBOT];
                    if (parsedMessage && "object" === (void 0 === parsedMessage ? "undefined" : receive__typeof(parsedMessage)) && null !== parsedMessage && parsedMessage.type && "string" == typeof parsedMessage.type && RECEIVE_MESSAGE_TYPES[parsedMessage.type]) return parsedMessage;
                }
            }
            function receiveMessage(event) {
                if (!window || window.closed) throw new Error("Message recieved in closed window");
                try {
                    if (!event.source) return;
                } catch (err) {
                    return;
                }
                var source = event.source, origin = event.origin, data = event.data, message = parseMessage(data);
                if (message) {
                    if (!message.sourceDomain || "string" != typeof message.sourceDomain) throw new Error("Expected message to have sourceDomain");
                    0 !== message.sourceDomain.indexOf(constants_CONSTANTS.MOCK_PROTOCOL) && 0 !== message.sourceDomain.indexOf(constants_CONSTANTS.FILE_PROTOCOL) || (origin = message.sourceDomain);
                    if (-1 === global.receivedMessages.indexOf(message.id)) {
                        global.receivedMessages.push(message.id);
                        var level = void 0;
                        level = -1 !== POST_MESSAGE_NAMES_LIST.indexOf(message.name) || message.type === constants_CONSTANTS.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info";
                        log.logLevel(level, [ "\n\n\t", "#receive", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", origin, "\n\n", message ]);
                        if (isWindowClosed(source)) log.debug("Source window is closed - can not send " + message.type + " " + message.name); else {
                            message.data && (message.data = deserializeMethods(source, origin, message.data));
                            RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
                        }
                    }
                }
            }
            function messageListener(event) {
                try {
                    event.source;
                } catch (err) {
                    return;
                }
                var messageEvent = {
                    source: event.source || event.sourceElement,
                    origin: event.origin || event.originalEvent && event.originalEvent.origin,
                    data: event.data
                };
                receiveMessage(messageEvent);
            }
            function listenForMessages() {
                addEventListener(window, "message", messageListener);
            }
            function cleanUpWindow(win) {
                var requestPromises = global.requestPromises.get(win);
                if (requestPromises) for (var _iterator = requestPromises, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }
                    var promise = _ref;
                    promise.reject(new Error("No response from window - cleaned up"));
                }
                global.popupWindowsByWin && global.popupWindowsByWin.delete(win);
                global.remoteWindows && global.remoteWindows.delete(win);
                global.requestPromises.delete(win);
                global.methods.delete(win);
                global.readyPromises.delete(win);
            }
            function request(options) {
                return promise_ZalgoPromise.try(function() {
                    if (!options.name) throw new Error("Expected options.name");
                    var name = options.name, win = options.window, domain = void 0;
                    if ("string" == typeof win) {
                        var el = document.getElementById(win);
                        if (!el) throw new Error("Expected options.window " + Object.prototype.toString.call(win) + " to be a valid element id");
                        if ("iframe" !== el.tagName.toLowerCase()) throw new Error("Expected options.window " + Object.prototype.toString.call(win) + " to be an iframe");
                        if (!el.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                        win = el.contentWindow;
                    } else if (win instanceof HTMLElement) {
                        if ("iframe" !== win.tagName.toLowerCase()) throw new Error("Expected options.window " + Object.prototype.toString.call(win) + " to be an iframe");
                        if (win && !win.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                        win && win.contentWindow && (win = win.contentWindow);
                    }
                    if (!win) throw new Error("Expected options.window to be a window object, iframe, or iframe element id.");
                    domain = options.domain || constants_CONSTANTS.WILDCARD;
                    var hash = options.name + "_" + uniqueID();
                    if (isWindowClosed(win)) throw new Error("Target window is closed");
                    var hasResult = !1, requestPromises = global.requestPromises.get(win);
                    if (!requestPromises) {
                        requestPromises = [];
                        global.requestPromises.set(win, requestPromises);
                    }
                    var requestPromise = promise_ZalgoPromise.try(function() {
                        if (isAncestor(window, win)) return promise_ZalgoPromise.resolve(onWindowReady(win));
                    }).then(function() {
                        return new promise_ZalgoPromise(function(resolve, reject) {
                            var responseListener = {
                                name: name,
                                window: win,
                                domain: domain,
                                respond: function(err, result) {
                                    if (!err) {
                                        hasResult = !0;
                                        requestPromises.splice(requestPromises.indexOf(requestPromise, 1));
                                    }
                                    err ? reject(err) : resolve(result);
                                }
                            };
                            addResponseListener(hash, responseListener);
                            sendMessage(win, {
                                type: constants_CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
                                hash: hash,
                                name: name,
                                data: options.data,
                                fireAndForget: options.fireAndForget
                            }, domain).catch(reject);
                            if (options.fireAndForget) return resolve();
                            var ackTimeout = CONFIG.ACK_TIMEOUT, resTimeout = options.timeout || CONFIG.RES_TIMEOUT, cycleTime = 100, cycle = function cycle() {
                                if (!hasResult) {
                                    if (isWindowClosed(win)) return reject(responseListener.ack ? new Error("Window closed for " + name + " before response") : new Error("Window closed for " + name + " before ack"));
                                    ackTimeout -= cycleTime;
                                    resTimeout -= cycleTime;
                                    if (responseListener.ack) {
                                        if (resTimeout === 1 / 0) return;
                                        cycleTime = Math.min(resTimeout, 2e3);
                                    } else {
                                        if (ackTimeout <= 0) return reject(new Error("No ack for postMessage " + name + " in " + CONFIG.ACK_TIMEOUT + "ms"));
                                        if (resTimeout <= 0) return reject(new Error("No response for postMessage " + name + " in " + (options.timeout || CONFIG.RES_TIMEOUT) + "ms"));
                                    }
                                    setTimeout(cycle, cycleTime);
                                }
                            };
                            setTimeout(cycle, cycleTime);
                        });
                    });
                    requestPromise.catch(function() {
                        deleteResponseListener(hash);
                    });
                    requestPromises.push(requestPromise);
                    return requestPromise;
                });
            }
            function _send(window, name, data, options) {
                options = options || {};
                options.window = window;
                options.name = name;
                options.data = data;
                return request(options);
            }
            function sendToParent(name, data, options) {
                var win = getAncestor();
                return win ? _send(win, name, data, options) : new promise_ZalgoPromise(function(resolve, reject) {
                    return reject(new Error("Window does not have a parent"));
                });
            }
            function client() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (!options.window) throw new Error("Expected options.window");
                return {
                    send: function(name, data) {
                        return _send(options.window, name, data, options);
                    }
                };
            }
            function listen(options) {
                if (!options.name) throw new Error("Expected options.name");
                if (!options.handler) throw new Error("Expected options.handler");
                var listenerOptions = {
                    handler: options.handler,
                    handleError: options.errorHandler || function(err) {
                        throw err;
                    },
                    window: options.window,
                    domain: options.domain || constants_CONSTANTS.WILDCARD,
                    name: options.name
                }, requestListener = addRequestListener({
                    name: listenerOptions.name,
                    win: listenerOptions.window,
                    domain: listenerOptions.domain
                }, listenerOptions);
                if (options.once) {
                    var _handler = listenerOptions.handler;
                    listenerOptions.handler = once(function() {
                        requestListener.cancel();
                        return _handler.apply(this, arguments);
                    });
                }
                if (listenerOptions.window && options.errorOnClose) var interval = safeInterval(function() {
                    if (isWindowClosed(listenerOptions.window)) {
                        interval.cancel();
                        listenerOptions.handleError(new Error("Post message target window is closed"));
                    }
                }, 50);
                return {
                    cancel: function() {
                        requestListener.cancel();
                    }
                };
            }
            function _on(name, options, handler) {
                if ("function" == typeof options) {
                    handler = options;
                    options = {};
                }
                options = options || {};
                options.name = name;
                options.handler = handler || options.handler;
                return listen(options);
            }
            function server_once(name) {
                var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, handler = arguments[2];
                if ("function" == typeof options) {
                    handler = options;
                    options = {};
                }
                options = options || {};
                handler = handler || options.handler;
                var errorHandler = options.errorHandler, promise = new promise_ZalgoPromise(function(resolve, reject) {
                    options = options || {};
                    options.name = name;
                    options.once = !0;
                    options.handler = function(event) {
                        resolve(event);
                        if (handler) return handler(event);
                    };
                    options.errorHandler = function(err) {
                        reject(err);
                        if (errorHandler) return errorHandler(err);
                    };
                }), onceListener = listen(options);
                promise.cancel = onceListener.cancel;
                return promise;
            }
            function server_listener() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return {
                    on: function(name, handler) {
                        return _on(name, options, handler);
                    }
                };
            }
            function disable() {
                delete window[constants_CONSTANTS.WINDOW_PROPS.POSTROBOT];
                window.removeEventListener("message", messageListener);
            }
            function init() {
                if (!global.initialized) {
                    listenForMessages();
                    initOnReady();
                    listenForMethods();
                }
                global.initialized = !0;
            }
            function serializeHeaders(headers) {
                var result = {};
                if (!headers) return result;
                for (var _iterator = Array.from(headers.keys()), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }
                    var key = _ref;
                    result[key.toLowerCase()] = headers.get(key);
                }
                return result;
            }
            function deserializeHeaders(headers) {
                return new Headers(headers || {});
            }
            function extractKeys(obj, predicate) {
                var result = {};
                if (!obj) return result;
                for (var _iterator = Object.keys(obj), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }
                    var key = _ref;
                    predicate(key) && (result[key] = obj[key]);
                }
                return result;
            }
            function extractKeysByArray(obj, keys) {
                return extractKeys(obj, function(key) {
                    return -1 !== keys.indexOf(key);
                });
            }
            function extractKeysByRegex(obj, regex) {
                return extractKeys(obj, function(key) {
                    return regex.test(key);
                });
            }
            function extractKeysByString(obj, str) {
                return extractKeys(obj, function(key) {
                    return key === str;
                });
            }
            function src_util_isRegex(item) {
                return "[object RegExp]" === Object.prototype.toString.call(item);
            }
            function serializeRequest(options) {
                var result = extractKeysByArray(options, STANDARD_REQUEST_OPTIONS);
                result.method && (result.method = result.method.toLowerCase());
                options && options.headers && (result.headers = serializeHeaders(options.headers));
                return result;
            }
            function deserializeResponse(response) {
                return response.text().then(function(text) {
                    return new window.Response(text, {
                        status: response.status,
                        statusText: response.statusText,
                        headers: deserializeHeaders(response.headers)
                    });
                });
            }
            function fetch_fetch(win, url) {
                var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return _send(win, FETCH_PROXY, {
                    url: url,
                    options: serializeRequest(options)
                }).then(function(_ref) {
                    return deserializeResponse(_ref.data);
                });
            }
            function getFrame(url) {
                var domain = getDomainFromUrl(url);
                if (!frame_frames[domain]) {
                    var frame = document.createElement("iframe");
                    frame.style.display = "none";
                    frame.setAttribute("src", url);
                    var container = document.body || document.head;
                    if (!container) throw new Error("Could not find suitable container for proxy iframe");
                    container.appendChild(frame);
                    frame_frames[domain] = frame;
                }
                return frame_frames[domain];
            }
            function destroyFrames() {
                for (var _iterator = Object.keys(frame_frames), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }
                    var domain = _ref, frame = frame_frames[domain];
                    frame.parentNode.removeChild(frame);
                    delete frame_frames[domain];
                }
            }
            function connect(_ref) {
                var url = _ref.url, win = getFrame(url).contentWindow;
                return {
                    fetch: function(fetchUrl, fetchOptions) {
                        return fetch_fetch(win, fetchUrl, fetchOptions);
                    }
                };
            }
            function validateMatcher(name, matcher) {
                if ("string" != typeof matcher && !(src_util_isRegex(matcher) || Array.isArray(matcher) && matcher.every(function(option) {
                    return "string" == typeof option;
                }))) throw new Error("Invalid matcher for " + name + ": " + Object.prototype.toString.call(matcher));
            }
            function extractMatches(obj, matcher) {
                if (matcher === WILDCARD) return obj;
                if (Array.isArray(matcher)) return extractKeysByArray(obj, matcher);
                if (src_util_isRegex(matcher)) return extractKeysByRegex(obj, matcher);
                if ("string" == typeof matcher) return extractKeysByString(obj, matcher);
                throw new Error("Invalid matcher");
            }
            function validateRules(rules) {
                for (var _iterator = rules, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }
                    for (var rule = _ref, _iterator2 = Object.keys(rule), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i2++];
                        } else {
                            _i2 = _iterator2.next();
                            if (_i2.done) break;
                            _ref2 = _i2.value;
                        }
                        var key = _ref2;
                        if (!DEFAULT_RULES.hasOwnProperty(key)) throw new Error("Unexpected rule: " + key);
                        validateMatcher(key, rule[key]);
                    }
                }
            }
            function stringifyValue(value) {
                return Array.isArray(value) ? 0 === value.length ? "[]" : "[ " + value.map(function(item) {
                    return "'" + item + "'";
                }).join(", ") + " ]" : "'" + value + "'";
            }
            function stringifyMatcher(matcher) {
                return "string" == typeof matcher ? "[ '" + matcher + "' ]" : Array.isArray(matcher) ? 0 === matcher.length ? "[]" : "[ " + matcher.map(function(item) {
                    return "'" + item + "'";
                }).join(", ") + " ]" : src_util_isRegex(matcher) ? "/" + matcher.source + "/" : matcher.toString();
            }
            function match(value, matcher) {
                return Array.isArray(value) ? value.every(function(item) {
                    return match(item, matcher);
                }) : "string" == typeof matcher ? matcher === WILDCARD || value === matcher : src_util_isRegex(matcher) ? matcher.test(value) : !!Array.isArray(matcher) && matcher.some(function(option) {
                    return option === value;
                });
            }
            function parseUrl(url) {
                var parsedUrl = new url_parse_default.a(url, window.mockDomain || window.location, !0);
                return {
                    domain: parsedUrl.protocol + "//" + parsedUrl.host,
                    path: parsedUrl.pathname,
                    query: parsedUrl.query
                };
            }
            function getMatchingRequestRule(origin, url, options, allow) {
                for (var _parseUrl = parseUrl(url), domain = _parseUrl.domain, path = _parseUrl.path, query = _parseUrl.query, failedRules = [], _iterator3 = allow, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                    var _ref3;
                    if (_isArray3) {
                        if (_i3 >= _iterator3.length) break;
                        _ref3 = _iterator3[_i3++];
                    } else {
                        _i3 = _iterator3.next();
                        if (_i3.done) break;
                        _ref3 = _i3.value;
                    }
                    for (var rule = _ref3, failedMatchers = [], items = [ {
                        name: "origin",
                        value: origin
                    }, {
                        name: "domain",
                        value: domain
                    }, {
                        name: "method",
                        value: options.method || "get"
                    }, {
                        name: "path",
                        value: path
                    }, {
                        name: "query",
                        value: Object.keys(query)
                    }, {
                        name: "headers",
                        value: Object.keys(options.headers || {})
                    }, {
                        name: "options",
                        value: Object.keys(options)
                    } ], _iterator4 = items, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                        var _ref6;
                        if (_isArray4) {
                            if (_i4 >= _iterator4.length) break;
                            _ref6 = _iterator4[_i4++];
                        } else {
                            _i4 = _iterator4.next();
                            if (_i4.done) break;
                            _ref6 = _i4.value;
                        }
                        var _ref7 = _ref6, _name = _ref7.name, _value = _ref7.value, matcher = rule.hasOwnProperty(_name) ? rule[_name] : DEFAULT_RULES[_name];
                        match(_value, matcher) || failedMatchers.push({
                            name: _name,
                            value: _value,
                            matcher: matcher
                        });
                    }
                    if (!failedMatchers.length) return rule;
                    failedRules.push(failedMatchers);
                }
                var errMessage = failedRules.map(function(failedMatchers) {
                    return failedMatchers.map(function(_ref4) {
                        var name = _ref4.name, value = _ref4.value, matcher = _ref4.matcher;
                        return "- " + name + " :: got " + stringifyValue(value) + " - expected " + stringifyMatcher(matcher);
                    }).join("\n");
                }).join("\n\n");
                throw new Error("Failed to find matching rule for request:\n\n" + errMessage + "\n");
            }
            function filterResponseHeaders(headers, rule) {
                return extractMatches(headers, rule.responseHeaders || DEFAULT_RULES.responseHeaders || []);
            }
            function deserializeRequest(options) {
                var result = extractKeysByArray(options, STANDARD_REQUEST_OPTIONS);
                options && options.headers && (result.headers = deserializeHeaders(options.headers));
                return result;
            }
            function serializeResponse(response) {
                return {
                    status: response.status,
                    statusText: response.statusText,
                    text: response.text.bind(response),
                    headers: serializeHeaders(response.headers)
                };
            }
            function serve() {
                var _ref = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref$allow = _ref.allow, allow = void 0 === _ref$allow ? [] : _ref$allow;
                0 === allow.length && (allow = [ DEFAULT_RULES ]);
                validateRules(allow);
                var listener = _on(FETCH_PROXY, {}, function(_ref2) {
                    var origin = _ref2.origin, _ref2$data = _ref2.data, url = _ref2$data.url, options = _ref2$data.options, rule = getMatchingRequestRule(origin, url, options, allow);
                    return window.fetch(url, deserializeRequest(options)).then(function(response) {
                        var serializedResponse = serializeResponse(response);
                        serializedResponse.headers = filterResponseHeaders(serializedResponse.headers, rule);
                        return serializedResponse;
                    });
                });
                listeners.push(listener);
                return {
                    cancel: listener.cancel
                };
            }
            function destroyListeners() {
                for (var _iterator = listeners, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref3;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref3 = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref3 = _i.value;
                    }
                    _ref3.cancel();
                }
            }
            function destroyAll() {
                destroyFrames();
                destroyListeners();
            }
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var interface_namespaceObject = {};
            __webpack_require__.d(interface_namespaceObject, "WeakMap", function() {
                return weakmap_CrossDomainSafeWeakMap;
            });
            var src_interface_namespaceObject = {};
            __webpack_require__.d(src_interface_namespaceObject, "cleanUpWindow", function() {
                return cleanUpWindow;
            });
            __webpack_require__.d(src_interface_namespaceObject, "init", function() {
                return init;
            });
            __webpack_require__.d(src_interface_namespaceObject, "Promise", function() {
                return promise_ZalgoPromise;
            });
            __webpack_require__.d(src_interface_namespaceObject, "parent", function() {
                return public_parent;
            });
            __webpack_require__.d(src_interface_namespaceObject, "bridge", function() {
                return bridge;
            });
            __webpack_require__.d(src_interface_namespaceObject, "send", function() {
                return _send;
            });
            __webpack_require__.d(src_interface_namespaceObject, "request", function() {
                return request;
            });
            __webpack_require__.d(src_interface_namespaceObject, "sendToParent", function() {
                return sendToParent;
            });
            __webpack_require__.d(src_interface_namespaceObject, "client", function() {
                return client;
            });
            __webpack_require__.d(src_interface_namespaceObject, "on", function() {
                return _on;
            });
            __webpack_require__.d(src_interface_namespaceObject, "listen", function() {
                return listen;
            });
            __webpack_require__.d(src_interface_namespaceObject, "once", function() {
                return server_once;
            });
            __webpack_require__.d(src_interface_namespaceObject, "listener", function() {
                return server_listener;
            });
            __webpack_require__.d(src_interface_namespaceObject, "CONFIG", function() {
                return CONFIG;
            });
            __webpack_require__.d(src_interface_namespaceObject, "CONSTANTS", function() {
                return constants_CONSTANTS;
            });
            __webpack_require__.d(src_interface_namespaceObject, "disable", function() {
                return disable;
            });
            var _ALLOWED_POST_MESSAGE, utils_toString = {}.toString, possiblyUnhandledPromiseHandlers = [], dispatchedErrors = [], _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1;
                        descriptor.configurable = !0;
                        "value" in descriptor && (descriptor.writable = !0);
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    protoProps && defineProperties(Constructor.prototype, protoProps);
                    staticProps && defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }(), promise_ZalgoPromise = function() {
                function ZalgoPromise(handler) {
                    var _this = this;
                    _classCallCheck(this, ZalgoPromise);
                    this.resolved = !1;
                    this.rejected = !1;
                    this.errorHandled = !1;
                    this.handlers = [];
                    if (handler) {
                        var _result = void 0, _error = void 0, resolved = !1, rejected = !1, isAsync = !1;
                        try {
                            handler(function(res) {
                                if (isAsync) _this.resolve(res); else {
                                    resolved = !0;
                                    _result = res;
                                }
                            }, function(err) {
                                if (isAsync) _this.reject(err); else {
                                    rejected = !0;
                                    _error = err;
                                }
                            });
                        } catch (err) {
                            this.reject(err);
                            return;
                        }
                        isAsync = !0;
                        resolved ? this.resolve(_result) : rejected && this.reject(_error);
                    }
                }
                _createClass(ZalgoPromise, [ {
                    key: "resolve",
                    value: function(result) {
                        if (this.resolved || this.rejected) return this;
                        if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
                        this.resolved = !0;
                        this.value = result;
                        this.dispatch();
                        return this;
                    }
                }, {
                    key: "reject",
                    value: function(error) {
                        var _this2 = this;
                        if (this.resolved || this.rejected) return this;
                        if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
                        if (!error) {
                            var _err = error && "function" == typeof error.toString ? error.toString() : Object.prototype.toString.call(error);
                            error = new Error("Expected reject to be called with Error, got " + _err);
                        }
                        this.rejected = !0;
                        this.error = error;
                        this.errorHandled || setTimeout(function() {
                            _this2.errorHandled || dispatchPossiblyUnhandledError(error);
                        }, 1);
                        this.dispatch();
                        return this;
                    }
                }, {
                    key: "asyncReject",
                    value: function(error) {
                        this.errorHandled = !0;
                        this.reject(error);
                    }
                }, {
                    key: "dispatch",
                    value: function() {
                        var _this3 = this, dispatching = this.dispatching, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                        if (!dispatching && (resolved || rejected)) {
                            this.dispatching = !0;
                            for (var i = 0; i < handlers.length; i++) {
                                (function(i) {
                                    var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise, result = void 0;
                                    if (resolved) try {
                                        result = onSuccess ? onSuccess(_this3.value) : _this3.value;
                                    } catch (err) {
                                        promise.reject(err);
                                        return "continue";
                                    } else if (rejected) {
                                        if (!onError) {
                                            promise.reject(_this3.error);
                                            return "continue";
                                        }
                                        try {
                                            result = onError(_this3.error);
                                        } catch (err) {
                                            promise.reject(err);
                                            return "continue";
                                        }
                                    }
                                    if (result instanceof ZalgoPromise && (result.resolved || result.rejected)) {
                                        result.resolved ? promise.resolve(result.value) : promise.reject(result.error);
                                        result.errorHandled = !0;
                                    } else utils_isPromise(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then(function(res) {
                                        promise.resolve(res);
                                    }, function(err) {
                                        promise.reject(err);
                                    }) : promise.resolve(result);
                                })(i);
                            }
                            handlers.length = 0;
                            this.dispatching = !1;
                        }
                    }
                }, {
                    key: "then",
                    value: function(onSuccess, onError) {
                        if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                        if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                        var promise = new ZalgoPromise();
                        this.handlers.push({
                            promise: promise,
                            onSuccess: onSuccess,
                            onError: onError
                        });
                        this.errorHandled = !0;
                        this.dispatch();
                        return promise;
                    }
                }, {
                    key: "catch",
                    value: function(onError) {
                        return this.then(void 0, onError);
                    }
                }, {
                    key: "finally",
                    value: function(handler) {
                        return this.then(function(result) {
                            return ZalgoPromise.try(handler).then(function() {
                                return result;
                            });
                        }, function(err) {
                            return ZalgoPromise.try(handler).then(function() {
                                throw err;
                            });
                        });
                    }
                }, {
                    key: "timeout",
                    value: function(time, err) {
                        var _this4 = this;
                        if (this.resolved || this.rejected) return this;
                        var timeout = setTimeout(function() {
                            _this4.resolved || _this4.rejected || _this4.reject(err || new Error("Promise timed out after " + time + "ms"));
                        }, time);
                        return this.then(function(result) {
                            clearTimeout(timeout);
                            return result;
                        });
                    }
                }, {
                    key: "toPromise",
                    value: function() {
                        if (!window.Promise) throw new Error("Could not find window.Promise");
                        return window.Promise.resolve(this);
                    }
                } ], [ {
                    key: "resolve",
                    value: function(value) {
                        return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise(function(resolve, reject) {
                            return value.then(resolve, reject);
                        }) : new ZalgoPromise().resolve(value);
                    }
                }, {
                    key: "reject",
                    value: function(error) {
                        return new ZalgoPromise().reject(error);
                    }
                }, {
                    key: "all",
                    value: function(promises) {
                        var promise = new ZalgoPromise(), count = promises.length, results = [];
                        if (!count) {
                            promise.resolve(results);
                            return promise;
                        }
                        for (var i = 0; i < promises.length; i++) !function(i) {
                            ZalgoPromise.resolve(promises[i]).then(function(result) {
                                results[i] = result;
                                count -= 1;
                                0 === count && promise.resolve(results);
                            }, function(err) {
                                promise.reject(err);
                            });
                        }(i);
                        return promise;
                    }
                }, {
                    key: "map",
                    value: function(promises, method) {
                        var promise = new ZalgoPromise(), count = promises.length, results = [];
                        if (!count) {
                            promise.resolve(results);
                            return promise;
                        }
                        for (var i = 0; i < promises.length; i++) !function(i) {
                            ZalgoPromise.try(function() {
                                return method(promises[i]);
                            }).then(function(result) {
                                results[i] = result;
                                count -= 1;
                                0 === count && promise.resolve(results);
                            }, function(err) {
                                promise.reject(err);
                            });
                        }(i);
                        return promise;
                    }
                }, {
                    key: "onPossiblyUnhandledException",
                    value: function(handler) {
                        return exceptions_onPossiblyUnhandledException(handler);
                    }
                }, {
                    key: "try",
                    value: function(method, context, args) {
                        var result = void 0;
                        try {
                            result = method.apply(context, args || []);
                        } catch (err) {
                            return ZalgoPromise.reject(err);
                        }
                        return ZalgoPromise.resolve(result);
                    }
                }, {
                    key: "delay",
                    value: function(_delay) {
                        return new ZalgoPromise(function(resolve) {
                            setTimeout(resolve, _delay);
                        });
                    }
                }, {
                    key: "hash",
                    value: function(obj) {
                        var results = {}, promises = [];
                        for (var key in obj) !function(key) {
                            obj.hasOwnProperty(key) && promises.push(ZalgoPromise.resolve(obj[key]).then(function(result) {
                                results[key] = result;
                            }));
                        }(key);
                        return ZalgoPromise.all(promises).then(function() {
                            return results;
                        });
                    }
                }, {
                    key: "isPromise",
                    value: function(value) {
                        return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
                    }
                } ]);
                return ZalgoPromise;
            }(), src_CONSTANTS = {
                MOCK_PROTOCOL: "mock:",
                FILE_PROTOCOL: "file:",
                WILDCARD: "*"
            }, iframeWindows = [], iframeFrames = [], weakmap__createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1;
                        descriptor.configurable = !0;
                        "value" in descriptor && (descriptor.writable = !0);
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    protoProps && defineProperties(Constructor.prototype, protoProps);
                    staticProps && defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }(), defineProperty = Object.defineProperty, counter = Date.now() % 1e9, weakmap_CrossDomainSafeWeakMap = function() {
                function CrossDomainSafeWeakMap() {
                    weakmap__classCallCheck(this, CrossDomainSafeWeakMap);
                    counter += 1;
                    this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__" + counter;
                    if (hasNativeWeakMap()) try {
                        this.weakmap = new window.WeakMap();
                    } catch (err) {}
                    this.keys = [];
                    this.values = [];
                }
                weakmap__createClass(CrossDomainSafeWeakMap, [ {
                    key: "_cleanupClosedWindows",
                    value: function() {
                        for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                            var value = keys[i];
                            if (isWindowClosed(value)) {
                                if (weakmap) try {
                                    weakmap.delete(value);
                                } catch (err) {}
                                keys.splice(i, 1);
                                this.values.splice(i, 1);
                                i -= 1;
                            }
                        }
                    }
                }, {
                    key: "isSafeToReadWrite",
                    value: function(key) {
                        if (isWindow(key)) return !1;
                        try {
                            key && key.self;
                            key && key[this.name];
                        } catch (err) {
                            return !1;
                        }
                        return !0;
                    }
                }, {
                    key: "set",
                    value: function(key, value) {
                        if (!key) throw new Error("WeakMap expected key");
                        var weakmap = this.weakmap;
                        if (weakmap) try {
                            weakmap.set(key, value);
                        } catch (err) {
                            delete this.weakmap;
                        }
                        if (this.isSafeToReadWrite(key)) {
                            var name = this.name, entry = key[name];
                            entry && entry[0] === key ? entry[1] = value : defineProperty(key, name, {
                                value: [ key, value ],
                                writable: !0
                            });
                        } else {
                            this._cleanupClosedWindows();
                            var keys = this.keys, values = this.values, index = keys.indexOf(key);
                            if (-1 === index) {
                                keys.push(key);
                                values.push(value);
                            } else values[index] = value;
                        }
                    }
                }, {
                    key: "get",
                    value: function(key) {
                        if (!key) throw new Error("WeakMap expected key");
                        var weakmap = this.weakmap;
                        if (weakmap) try {
                            if (weakmap.has(key)) return weakmap.get(key);
                        } catch (err) {
                            delete this.weakmap;
                        }
                        if (!this.isSafeToReadWrite(key)) {
                            this._cleanupClosedWindows();
                            var keys = this.keys, index = keys.indexOf(key);
                            if (-1 === index) return;
                            return this.values[index];
                        }
                        var entry = key[this.name];
                        if (entry && entry[0] === key) return entry[1];
                    }
                }, {
                    key: "delete",
                    value: function(key) {
                        if (!key) throw new Error("WeakMap expected key");
                        var weakmap = this.weakmap;
                        if (weakmap) try {
                            weakmap.delete(key);
                        } catch (err) {
                            delete this.weakmap;
                        }
                        if (this.isSafeToReadWrite(key)) {
                            var entry = key[this.name];
                            entry && entry[0] === key && (entry[0] = entry[1] = void 0);
                        } else {
                            this._cleanupClosedWindows();
                            var keys = this.keys, index = keys.indexOf(key);
                            if (-1 !== index) {
                                keys.splice(index, 1);
                                this.values.splice(index, 1);
                            }
                        }
                    }
                }, {
                    key: "has",
                    value: function(key) {
                        if (!key) throw new Error("WeakMap expected key");
                        var weakmap = this.weakmap;
                        if (weakmap) try {
                            return weakmap.has(key);
                        } catch (err) {
                            delete this.weakmap;
                        }
                        if (this.isSafeToReadWrite(key)) {
                            var entry = key[this.name];
                            return !(!entry || entry[0] !== key);
                        }
                        this._cleanupClosedWindows();
                        return -1 !== this.keys.indexOf(key);
                    }
                } ]);
                return CrossDomainSafeWeakMap;
            }(), constants_CONSTANTS = {
                POST_MESSAGE_TYPE: {
                    REQUEST: "postrobot_message_request",
                    RESPONSE: "postrobot_message_response",
                    ACK: "postrobot_message_ack"
                },
                POST_MESSAGE_ACK: {
                    SUCCESS: "success",
                    ERROR: "error"
                },
                POST_MESSAGE_NAMES: {
                    METHOD: "postrobot_method",
                    READY: "postrobot_ready",
                    OPEN_TUNNEL: "postrobot_open_tunnel"
                },
                WINDOW_TYPES: {
                    FULLPAGE: "fullpage",
                    POPUP: "popup",
                    IFRAME: "iframe"
                },
                WINDOW_PROPS: {
                    POSTROBOT: "__postRobot__"
                },
                SERIALIZATION_TYPES: {
                    METHOD: "postrobot_method",
                    ERROR: "postrobot_error",
                    PROMISE: "postrobot_promise",
                    ZALGO_PROMISE: "postrobot_zalgo_promise",
                    REGEX: "regex"
                },
                SEND_STRATEGIES: {
                    POST_MESSAGE: "postrobot_post_message",
                    BRIDGE: "postrobot_bridge",
                    GLOBAL: "postrobot_global"
                },
                MOCK_PROTOCOL: "mock:",
                FILE_PROTOCOL: "file:",
                BRIDGE_NAME_PREFIX: "__postrobot_bridge__",
                POSTROBOT_PROXY: "__postrobot_proxy__",
                WILDCARD: "*"
            }, POST_MESSAGE_NAMES_LIST = Object.keys(constants_CONSTANTS.POST_MESSAGE_NAMES).map(function(key) {
                return constants_CONSTANTS.POST_MESSAGE_NAMES[key];
            }), CONFIG = {
                ALLOW_POSTMESSAGE_POPUP: !0,
                LOG_LEVEL: "info",
                BRIDGE_TIMEOUT: 5e3,
                ACK_TIMEOUT: 1e3,
                RES_TIMEOUT: 1 / 0,
                LOG_TO_PAGE: !1,
                ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _defineProperty(_ALLOWED_POST_MESSAGE, constants_CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, !0), 
                _defineProperty(_ALLOWED_POST_MESSAGE, constants_CONSTANTS.SEND_STRATEGIES.BRIDGE, !0), 
                _defineProperty(_ALLOWED_POST_MESSAGE, constants_CONSTANTS.SEND_STRATEGIES.GLOBAL, !0), 
                _ALLOWED_POST_MESSAGE)
            };
            0 === window.location.href.indexOf(constants_CONSTANTS.FILE_PROTOCOL) && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, once = function(method) {
                if (!method) return method;
                var called = !1;
                return function() {
                    if (!called) {
                        called = !0;
                        return method.apply(this, arguments);
                    }
                };
            }, log__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, LOG_LEVELS = [ "debug", "info", "warn", "error" ];
            Function.prototype.bind && window.console && "object" === log__typeof(console.log) && [ "log", "info", "warn", "error" ].forEach(function(method) {
                console[method] = this.bind(console[method], console);
            }, Function.prototype.call);
            var log = {
                clearLogs: function() {
                    window.console && window.console.clear && window.console.clear();
                    if (CONFIG.LOG_TO_PAGE) {
                        var container = document.getElementById("postRobotLogs");
                        container && container.parentNode && container.parentNode.removeChild(container);
                    }
                },
                writeToPage: function(level, args) {
                    setTimeout(function() {
                        var container = document.getElementById("postRobotLogs");
                        if (!container) {
                            container = document.createElement("div");
                            container.id = "postRobotLogs";
                            container.style.cssText = "width: 800px; font-family: monospace; white-space: pre-wrap;";
                            document.body && document.body.appendChild(container);
                        }
                        var el = document.createElement("div"), date = new Date().toString().split(" ")[4], payload = Array.prototype.slice.call(args).map(function(item) {
                            if ("string" == typeof item) return item;
                            if (!item) return Object.prototype.toString.call(item);
                            var json = void 0;
                            try {
                                json = jsonStringify(item, null, 2);
                            } catch (e) {
                                json = "[object]";
                            }
                            return "\n\n" + json + "\n\n";
                        }).join(" "), msg = date + " " + level + " " + payload;
                        el.innerHTML = msg;
                        var color = {
                            log: "#ddd",
                            warn: "orange",
                            error: "red",
                            info: "blue",
                            debug: "#aaa"
                        }[level];
                        el.style.cssText = "margin-top: 10px; color: " + color + ";";
                        container.childNodes.length ? container.insertBefore(el, container.childNodes[0]) : container.appendChild(el);
                    });
                },
                logLevel: function(level, args) {
                    setTimeout(function() {
                        try {
                            var logLevel = window.LOG_LEVEL || CONFIG.LOG_LEVEL;
                            if (LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(logLevel)) return;
                            args = Array.prototype.slice.call(args);
                            args.unshift("" + window.location.host + window.location.pathname);
                            args.unshift("::");
                            args.unshift("" + getWindowType().toLowerCase());
                            args.unshift("[post-robot]");
                            CONFIG.LOG_TO_PAGE && log.writeToPage(level, args);
                            if (!window.console) return;
                            window.console[level] || (level = "log");
                            if (!window.console[level]) return;
                            window.console[level].apply(window.console, args);
                        } catch (err) {}
                    }, 1);
                },
                debug: function() {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    log.logLevel("debug", args);
                },
                info: function() {
                    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                    log.logLevel("info", args);
                },
                warn: function() {
                    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
                    log.logLevel("warn", args);
                },
                error: function() {
                    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
                    log.logLevel("error", args);
                }
            }, global = window[constants_CONSTANTS.WINDOW_PROPS.POSTROBOT] = window[constants_CONSTANTS.WINDOW_PROPS.POSTROBOT] || {};
            global.registerSelf = function() {};
            var serialize__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            global.methods = global.methods || new weakmap_CrossDomainSafeWeakMap();
            var listenForMethods = once(function() {
                _on(constants_CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                    window: constants_CONSTANTS.WILDCARD,
                    origin: constants_CONSTANTS.WILDCARD
                }, function(_ref) {
                    var source = _ref.source, origin = _ref.origin, data = _ref.data, methods = global.methods.get(source);
                    if (!methods) throw new Error("Could not find any methods this window has privileges to call");
                    var meth = methods[data.id];
                    if (!meth) throw new Error("Could not find method with id: " + data.id);
                    if (!matchDomain(meth.domain, origin)) throw new Error("Method domain " + meth.domain + " does not match origin " + origin);
                    log.debug("Call local method", data.name, data.args);
                    return promise_ZalgoPromise.try(function() {
                        return meth.method.apply({
                            source: source,
                            origin: origin,
                            data: data
                        }, data.args);
                    }).then(function(result) {
                        return {
                            result: result,
                            id: data.id,
                            name: data.name
                        };
                    });
                });
            });
            global.readyPromises = global.readyPromises || new weakmap_CrossDomainSafeWeakMap();
            var SEND_MESSAGE_STRATEGIES = {};
            SEND_MESSAGE_STRATEGIES[constants_CONSTANTS.SEND_STRATEGIES.POST_MESSAGE] = function(win, serializedMessage, domain) {
                var domains = void 0;
                domains = Array.isArray(domain) ? domain : domain ? [ domain ] : [ constants_CONSTANTS.WILDCARD ];
                domains = domains.map(function(dom) {
                    if (0 === dom.indexOf(constants_CONSTANTS.MOCK_PROTOCOL)) {
                        if (window.location.protocol === constants_CONSTANTS.FILE_PROTOCOL) return constants_CONSTANTS.WILDCARD;
                        if (!isActuallySameDomain(win)) throw new Error("Attempting to send messsage to mock domain " + dom + ", but window is actually cross-domain");
                        return getActualDomain(win);
                    }
                    return 0 === dom.indexOf(constants_CONSTANTS.FILE_PROTOCOL) ? constants_CONSTANTS.WILDCARD : dom;
                });
                domains.forEach(function(dom) {
                    return win.postMessage(serializedMessage, dom);
                });
            };
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            };
            global.responseListeners = global.responseListeners || {};
            global.requestListeners = global.requestListeners || {};
            global.WINDOW_WILDCARD = global.WINDOW_WILDCARD || new function() {}();
            var _RECEIVE_MESSAGE_TYPE, __DOMAIN_REGEX__ = "__domain_regex__", types__extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, types__defineProperty(_RECEIVE_MESSAGE_TYPE, constants_CONSTANTS.POST_MESSAGE_TYPE.ACK, function(source, origin, message) {
                var options = getResponseListener(message.hash);
                if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!matchDomain(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain.toString());
                options.ack = !0;
            }), types__defineProperty(_RECEIVE_MESSAGE_TYPE, constants_CONSTANTS.POST_MESSAGE_TYPE.REQUEST, function(source, origin, message) {
                function respond(data) {
                    return message.fireAndForget || isWindowClosed(source) ? promise_ZalgoPromise.resolve() : sendMessage(source, types__extends({
                        target: message.originalSource,
                        hash: message.hash,
                        name: message.name
                    }, data), origin);
                }
                var options = getRequestListener({
                    name: message.name,
                    win: source,
                    domain: origin
                });
                return promise_ZalgoPromise.all([ respond({
                    type: constants_CONSTANTS.POST_MESSAGE_TYPE.ACK
                }), promise_ZalgoPromise.try(function() {
                    if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!matchDomain(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain.toString());
                    var data = message.data;
                    return options.handler({
                        source: source,
                        origin: origin,
                        data: data
                    });
                }).then(function(data) {
                    return respond({
                        type: constants_CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                        ack: constants_CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
                        data: data
                    });
                }, function(err) {
                    var error = stringifyError(err).replace(/^Error: /, "");
                    return respond({
                        type: constants_CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                        ack: constants_CONSTANTS.POST_MESSAGE_ACK.ERROR,
                        error: error
                    });
                }) ]).then(util_noop).catch(function(err) {
                    if (options && options.handleError) return options.handleError(err);
                    log.error(stringifyError(err));
                });
            }), types__defineProperty(_RECEIVE_MESSAGE_TYPE, constants_CONSTANTS.POST_MESSAGE_TYPE.RESPONSE, function(source, origin, message) {
                var options = getResponseListener(message.hash);
                if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!matchDomain(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + options.domain);
                deleteResponseListener(message.hash);
                if (message.ack === constants_CONSTANTS.POST_MESSAGE_ACK.ERROR) return options.respond(new Error(message.error), null);
                if (message.ack === constants_CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
                    var data = message.data || message.response;
                    return options.respond(null, {
                        source: source,
                        origin: origin,
                        data: data
                    });
                }
            }), _RECEIVE_MESSAGE_TYPE), receive__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            global.receivedMessages = global.receivedMessages || [];
            global.requestPromises = global.requestPromises || new weakmap_CrossDomainSafeWeakMap();
            var public_parent = getAncestor(), bridge = void 0;
            init();
            var FETCH_PROXY = "fetch-robot-proxy", WILDCARD = "*", STANDARD_REQUEST_METHODS = [ "get", "head", "post", "put", "delete", "connect", "options", "trace", "patch" ], STANDARD_REQUEST_HEADERS = [ "accept", "accept-language", "content-language", "content-type" ], STANDARD_RESPONSE_HEADERS = [ "cache-control", "content-language", "content-type", "expires", "last-modified", "pragma" ], STANDARD_REQUEST_OPTIONS = [ "method", "body", "mode", "credentials", "cache", "redirect", "referrer", "integrity", "headers" ], frame_frames = {}, url_parse = __webpack_require__("./node_modules/url-parse/index.js"), url_parse_default = __webpack_require__.n(url_parse), DEFAULT_RULES = {
                origin: WILDCARD,
                domain: src_getDomain(),
                path: [],
                query: WILDCARD,
                method: STANDARD_REQUEST_METHODS,
                headers: STANDARD_REQUEST_HEADERS,
                options: STANDARD_REQUEST_OPTIONS,
                responseHeaders: STANDARD_RESPONSE_HEADERS
            }, listeners = [];
            __webpack_require__.d(__webpack_exports__, "connect", function() {
                return connect;
            });
            __webpack_require__.d(__webpack_exports__, "serve", function() {
                return serve;
            });
            __webpack_require__.d(__webpack_exports__, "destroyAll", function() {
                return destroyAll;
            });
            __webpack_require__.d(__webpack_exports__, "WILDCARD", function() {
                return WILDCARD;
            });
            __webpack_require__.d(__webpack_exports__, "STANDARD_REQUEST_HEADERS", function() {
                return STANDARD_REQUEST_HEADERS;
            });
            __webpack_require__.d(__webpack_exports__, "STANDARD_RESPONSE_HEADERS", function() {
                return STANDARD_RESPONSE_HEADERS;
            });
        }
    });
});
//# sourceMappingURL=fetch-robot.js.map
//# sourceMappingURL=fetch-robot.js.map