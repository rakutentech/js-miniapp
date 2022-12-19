(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniAppSDKLogger = exports.getLogger = void 0;
/** @internal */
function getLogger() {
    // tslint:disable:no-any
    if (typeof window !== 'undefined') {
        // when not running in webview or browser, window does not exist
        return window.MiniAppSDKLogger;
    }
    return undefined;
}
exports.getLogger = getLogger;
/** @internal */
var MiniAppSDKLogger = /** @class */ (function () {
    function MiniAppSDKLogger(logger) {
        this.logger = logger;
    }
    MiniAppSDKLogger.prototype.logOnConsole = function (type, argumentsList) {
        getConsoleForLogType(type).apply(null, argumentsList);
    };
    MiniAppSDKLogger.prototype.log = function (type, argumentsList) {
        this.lastLog = {
            icon: type.icon,
            messageType: type.type,
            message: argumentsList,
        };
        this.logger.log(type.icon, type.type, argumentsList);
        this.logOnConsole(type, argumentsList);
    };
    return MiniAppSDKLogger;
}());
exports.MiniAppSDKLogger = MiniAppSDKLogger;
var LogType = /** @class */ (function () {
    function LogType(type, icon) {
        this.type = type;
        this.icon = icon;
    }
    LogType.debug = new LogType('debug', '📘');
    LogType.log = new LogType('log', '📗');
    LogType.warn = new LogType('warning', '📙');
    LogType.error = new LogType('error', '📕');
    return LogType;
}());
function getConsoleForLogType(type) {
    switch (type) {
        case LogType.debug:
            return originalDebug;
        case LogType.warn:
            return originalWarn;
        case LogType.error:
            return originalError;
        default:
            return originalLog;
    }
}
var originalLog = console.log;
var originalWarn = console.warn;
var originalError = console.error;
var originalDebug = console.debug;
function logMessage(type, argumentsList) {
    var logger = getLogger();
    if (logger !== undefined) {
        logger.log(type, argumentsList);
    }
    else {
        getConsoleForLogType(type).apply(null, argumentsList);
    }
}
console.log = function () {
    var argumentsList = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        argumentsList[_i] = arguments[_i];
    }
    logMessage(LogType.log, argumentsList);
};
console.warn = function () {
    var argumentsList = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        argumentsList[_i] = arguments[_i];
    }
    logMessage(LogType.warn, argumentsList);
};
console.error = function () {
    var argumentsList = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        argumentsList[_i] = arguments[_i];
    }
    logMessage(LogType.error, argumentsList);
};
console.debug = function () {
    var argumentsList = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        argumentsList[_i] = arguments[_i];
    }
    logMessage(LogType.debug, argumentsList);
};

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-any */
var common_log_1 = require("../common-log");
var IOSSDKLogger = /** @class */ (function () {
    function IOSSDKLogger() {
    }
    IOSSDKLogger.prototype.log = function (emoji, type, args) {
        window.webkit.messageHandlers.MiniAppLogging.postMessage("".concat(emoji, " console.").concat(type, ": ").concat(Object.values(args)
            .map(function (v) {
            return typeof v === 'undefined'
                ? 'undefined'
                : typeof v === 'object'
                    ? JSON.stringify(v)
                    : v.toString();
        })
            .map(function (v) { return v.substring(0, 3000); }) // Limit msg to 3000 chars
            .join(', ')));
    };
    return IOSSDKLogger;
}());
var iOSLogger = new IOSSDKLogger();
window.MiniAppSDKLogger = new common_log_1.MiniAppSDKLogger(iOSLogger);

},{"../common-log":1}]},{},[2]);
