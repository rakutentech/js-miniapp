(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/** @internal */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var token_data_1 = require("./types/token-data");
var error_types_1 = require("./types/error-types");
/** @internal */
var mabMessageQueue = [];
exports.mabMessageQueue = mabMessageQueue;
var mabCustomEventQueue = [];
exports.mabCustomEventQueue = mabCustomEventQueue;
/** @internal */
var MiniAppBridge = /** @class */ (function () {
    function MiniAppBridge(executor) {
        this.executor = executor;
        this.platform = executor.getPlatform();
    }
    /**
     * Success Callback method that will be called from native side
     * to this bridge. This method will send back the value to the
     * mini apps that uses promises.
     * @param  {[String]} messageId Message ID which will be used to get callback object from messageQueue
     * @param  {[String]} value Response value sent from the native on invoking the action command
     */
    MiniAppBridge.prototype.execSuccessCallback = function (messageId, value) {
        var queueObj = mabMessageQueue.filter(function (callback) { return callback.id === messageId; })[0];
        if (value) {
            queueObj.onSuccess(value);
        }
        else {
            queueObj.onError('Unknown Error');
        }
        removeFromMessageQueue(queueObj);
    };
    /**
     * Error Callback method that will be called from native side
     * to this bridge. This method will send back the error message to the
     * mini apps that uses promises.
     * @param  {[String]} messageId Message ID which will be used to get callback object from messageQueue
     * @param  {[String]} errorMessage Error message sent from the native on invoking the action command
     */
    MiniAppBridge.prototype.execErrorCallback = function (messageId, errorMessage) {
        var queueObj = mabMessageQueue.filter(function (callback) { return callback.id === messageId; })[0];
        if (!errorMessage) {
            errorMessage = 'Unknown Error';
        }
        queueObj.onError(errorMessage);
        removeFromMessageQueue(queueObj);
    };
    /**
     * Event Callback method that will be called from native side
     * to this bridge. This method will send back the value to the
     * mini app that listen to this eventType.
     * @param  {[String]} eventType EventType which will be used to listen for the event
     * @param  {[String]} value Additional message sent from the native on invoking for the eventType
     */
    MiniAppBridge.prototype.execCustomEventsCallback = function (eventType, value) {
        var event = new CustomEvent(eventType, { detail: value });
        var queueObj = mabCustomEventQueue.filter(function (customEvent) { return customEvent === event; })[0];
        if (!queueObj) {
            if (eventType === event.type) {
                removeFromEventQueue(event);
            }
            queueObj = event;
            mabCustomEventQueue.unshift(queueObj);
        }
        this.executor.execEvents(queueObj);
    };
    /**
     * Associating getUniqueId function to MiniAppBridge object.
     */
    MiniAppBridge.prototype.getUniqueId = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('getUniqueId', null, function (id) { return resolve(id); }, function (error) { return reject(error); });
        });
    };
    /**
     * Associating requestPermission function to MiniAppBridge object.
     * @param {DevicePermission} permissionType Type of permission that is requested e.g. location
     */
    MiniAppBridge.prototype.requestPermission = function (permissionType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('requestPermission', { permission: permissionType }, function (success) { return resolve(success); }, function (error) { return reject(error); });
        });
    };
    /**
     * Associating showInterstitialAd function to MiniAppBridge object.
     * @param {string} id ad unit id of the intertitial ad
     */
    MiniAppBridge.prototype.showInterstitialAd = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('showAd', { adType: 0 /* INTERSTITIAL */, adUnitId: id }, function (closeSuccess) { return resolve(closeSuccess); }, function (error) { return reject(error); });
        });
    };
    /**
     * Associating loadInterstitialAd function to MiniAppBridge object.
     * This function preloads interstitial ad before they are requested for display.
     * Can be called multiple times to pre-load multiple ads.
     * @param {string} id ad unit id of the interstitial ad that needs to be loaded.
     */
    MiniAppBridge.prototype.loadInterstitialAd = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('loadAd', { adType: 0 /* INTERSTITIAL */, adUnitId: id }, function (loadSuccess) { return resolve(loadSuccess); }, function (error) { return reject(error); });
        });
    };
    /**
     * Associating loadRewardedAd function to MiniAppBridge object.
     * This function preloads Rewarded ad before they are requested for display.
     * Can be called multiple times to pre-load multiple ads.
     * @param {string} id ad unit id of the Rewarded ad that needs to be loaded.
     */
    MiniAppBridge.prototype.loadRewardedAd = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('loadAd', { adType: 1 /* REWARDED */, adUnitId: id }, function (loadSuccess) { return resolve(loadSuccess); }, function (error) { return reject(error); });
        });
    };
    /**
     * Associating showRewardedAd function to MiniAppBridge object.
     * @param {string} id ad unit id of the Rewarded ad
     */
    MiniAppBridge.prototype.showRewardedAd = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('showAd', { adType: 1 /* REWARDED */, adUnitId: id }, function (rewardResponse) { return resolve(JSON.parse(rewardResponse)); }, function (error) { return reject(error); });
        });
    };
    /**
     * Associating requestCustomPermissions function to MiniAppBridge object
     * @param [CustomPermissionType[] permissionTypes, Types of custom permissions that are requested
     * using an Array including the parameters eg. name, description.
     *
     * For eg., Miniapps can pass the array of valid custom permissions as following
     * [
     *  {"name":"rakuten.miniapp.user.USER_NAME", "description": "Reason to request for the custom permission"},
     *  {"name":"rakuten.miniapp.user.PROFILE_PHOTO", "description": "Reason to request for the custom permission"},
     *  {"name":"rakuten.miniapp.user.CONTACT_LIST", "description": "Reason to request for the custom permission"}
     * ]
     */
    MiniAppBridge.prototype.requestCustomPermissions = function (permissionTypes) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('requestCustomPermissions', { permissions: permissionTypes }, function (success) { return resolve(JSON.parse(success)); }, function (error) { return reject(error); });
        });
    };
    /**
     * Associating shareInfo function to MiniAppBridge object.
     * This function returns the shared info action state.
     * @param {info} The shared info object.
     */
    MiniAppBridge.prototype.shareInfo = function (info) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('shareInfo', { shareInfo: info }, function (success) { return resolve(success); }, function (error) { return reject(error); });
        });
    };
    /**
     * Associating getUserName function to MiniAppBridge object.
     * This function returns username from the user profile
     * (provided the rakuten.miniapp.user.USER_NAME custom permission is allowed by the user)
     * It returns error info if user had denied the custom permission
     */
    MiniAppBridge.prototype.getUserName = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('getUserName', null, function (userName) { return resolve(userName); }, function (error) { return reject(error); });
        });
    };
    /**
     * Associating getProfilePhoto function to MiniAppBridge object.
     * This function returns username from the user profile.
     * (provided the rakuten.miniapp.user.PROFILE_PHOTO is allowed by the user)
     * It returns error info if user had denied the custom permission
     */
    MiniAppBridge.prototype.getProfilePhoto = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('getProfilePhoto', null, function (profilePhoto) { return resolve(profilePhoto); }, function (error) { return reject(error); });
        });
    };
    /**
     * Associating getContacts function to MiniAppBridge object.
     * This function returns contact list from the user profile.
     * (provided the rakuten.miniapp.user.CONTACT_LIST is allowed by the user)
     * It returns error info if user had denied the custom permission
     */
    MiniAppBridge.prototype.getContacts = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('getContacts', null, function (contacts) { return resolve(JSON.parse(contacts)); }, function (error) { return reject(error); });
        });
    };
    /**
     * Associating getAccessToken function to MiniAppBridge object.
     * This function returns access token details from the host app.
     * (provided the rakuten.miniapp.user.ACCESS_TOKEN is allowed by the user)
     * It returns error info if user had denied the custom permission
     * @param {string} audience the audience the MiniApp requests for the token
     * @param {string[]} scopes the associated scopes with the requested audience
     */
    MiniAppBridge.prototype.getAccessToken = function (audience, scopes) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('getAccessToken', { audience: audience, scopes: scopes }, function (tokenData) {
                var nativeTokenData = JSON.parse(tokenData);
                resolve(new token_data_1.AccessTokenData(nativeTokenData));
            }, function (error) {
                try {
                    var miniAppError = error_types_1.parseMiniAppError(error);
                    var errorType = error_types_1.MiniAppErrorType[miniAppError.type];
                    switch (errorType) {
                        case error_types_1.MiniAppErrorType.AuthorizationFailureError:
                            return reject(new error_types_1.AuthorizationFailureError(miniAppError));
                        case error_types_1.MiniAppErrorType.AudienceNotSupportedError:
                            return reject(new error_types_1.AudienceNotSupportedError(miniAppError));
                        case error_types_1.MiniAppErrorType.ScopesNotSupportedError:
                            return reject(new error_types_1.ScopesNotSupportedError(miniAppError));
                        default:
                            return reject(new error_types_1.MiniAppError(miniAppError));
                    }
                }
                catch (e) {
                    console.error(e);
                    return reject(error);
                }
            });
        });
    };
    /**
     * This function does not return anything back on success.
     * @param {screenAction} The screen state that miniapp wants to set on device.
     */
    MiniAppBridge.prototype.setScreenOrientation = function (screenAction) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('setScreenOrientation', { action: screenAction }, function (success) { return resolve(success); }, function (error) { return reject(error); });
        });
    };
    /**
     * @param message The message to send to contact.
     * @returns Promise resolves with the contact id received a message.
     * Can also resolve with null response in the case that the message was not sent to a contact, such as if the user cancelled sending the message.
     * Promise rejects in the case that there was an error.
     * It returns error info if user had denied the custom permission for sending message.
     */
    MiniAppBridge.prototype.sendMessageToContact = function (message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('sendMessageToContact', {
                messageToContact: __assign(__assign({}, message), { bannerMessage: trimBannerText(message.bannerMessage) }),
            }, function (contactId) {
                if (contactId !== 'null' && contactId !== null) {
                    resolve(contactId);
                }
                else {
                    resolve(null);
                }
            }, function (error) { return reject(error); });
        });
    };
    /**
     * @param id The id of the contact receiving a message.
     * @param message The message to send to contact.
     * @returns Promise resolves with the contact id received a message.
     * @see {sendMessageToContact}
     */
    MiniAppBridge.prototype.sendMessageToContactId = function (id, message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('sendMessageToContactId', {
                contactId: id,
                messageToContact: __assign(__assign({}, message), { bannerMessage: trimBannerText(message.bannerMessage) }),
            }, function (contactId) {
                if (contactId !== 'null' && contactId !== null) {
                    resolve(contactId);
                }
                else {
                    resolve(null);
                }
            }, function (error) { return reject(error); });
        });
    };
    /**
     * @param message The message to send to contact.
     * @returns Promise resolves with an array of contact id which were sent the message.
     * Can also resolve with null array in the case that the message was not sent to any contacts, such as if the user cancelled sending the message.
     * Promise rejects in the case that there was an error.
     * It returns error info if user had denied the custom permission for sending message.
     */
    MiniAppBridge.prototype.sendMessageToMultipleContacts = function (message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('sendMessageToMultipleContacts', {
                messageToContact: __assign(__assign({}, message), { bannerMessage: trimBannerText(message.bannerMessage) }),
            }, function (contactIds) {
                if (contactIds !== 'null' && contactIds !== null) {
                    resolve(JSON.parse(contactIds));
                }
                else {
                    resolve(null);
                }
            }, function (error) { return reject(error); });
        });
    };
    /**
     * Associating get point balance function to MiniAppBridge object.
     * (provided rakuten.miniapp.user.POINTS is allowed by the user)
     */
    MiniAppBridge.prototype.getPoints = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('getPoints', null, function (points) { return resolve(JSON.parse(points)); }, function (error) {
                try {
                    var miniAppError = error_types_1.parseMiniAppError(error);
                    var errorType = error_types_1.MiniAppErrorType[miniAppError.type];
                    switch (errorType) {
                        default:
                            return reject(new error_types_1.MiniAppError(miniAppError));
                    }
                }
                catch (e) {
                    console.error(e);
                    return reject(error);
                }
            });
        });
    };
    MiniAppBridge.prototype.getHostEnvironmentInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('getHostEnvironmentInfo', null, function (info) {
                return resolve(__assign(__assign({}, JSON.parse(info)), { platform: _this.platform }));
            }, function (error) { return reject(error); });
        });
    };
    MiniAppBridge.prototype.downloadFile = function (filename, url, headers) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('downloadFile', { filename: filename, url: url, headers: headers }, function (id) { return resolve(id); }, function (error) { return reject(error); });
        });
    };
    /**
     * Associating purchaseItemWith function to MiniAppBridge object.
     * @param {string} id Item id that user wanted to purchase
     */
    MiniAppBridge.prototype.purchaseItemWith = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('purchaseItem', { itemId: id }, function (purchasedProduct) {
                return resolve(JSON.parse(purchasedProduct));
            }, function (error) { return reject(error); });
        });
    };
    return MiniAppBridge;
}());
exports.MiniAppBridge = MiniAppBridge;
/**
 * Method to remove the callback object from the message queue after successful/error communication
 * with the native application
 * @param  {[Object]} queueObj Queue Object that holds the references of callback information.
 * @internal
 */
function removeFromMessageQueue(queueObj) {
    var messageObjIndex = mabMessageQueue.indexOf(queueObj);
    if (messageObjIndex !== -1) {
        mabMessageQueue.splice(messageObjIndex, 1);
    }
}
function removeFromEventQueue(queueObj) {
    var eventObjIndex = mabCustomEventQueue.indexOf(mabCustomEventQueue.filter(function (customEvent) { return customEvent.type === queueObj.type; })[0]);
    if (eventObjIndex !== -1) {
        mabCustomEventQueue.splice(eventObjIndex, 1);
    }
}
function trimBannerText(message, maxLength) {
    if (message === void 0) { message = null; }
    if (maxLength === void 0) { maxLength = 128; }
    return (message === null || message === void 0 ? void 0 : message.length) > maxLength
        ? (message === null || message === void 0 ? void 0 : message.substring(0, maxLength - 1)) + '…'
        : message;
}

},{"./types/error-types":3,"./types/token-data":5}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_bridge_1 = require("../common-bridge");
var platform_1 = require("../types/platform");
/* tslint:disable:no-any */
var uniqueId = Math.random();
// tslint:disable-next-line: variable-name
var GeolocationPositionError = {
    PERMISSION_DENIED: 1,
    POSITION_UNAVAILABLE: 2,
    TIMEOUT: 3,
};
var IOSExecutor = /** @class */ (function () {
    function IOSExecutor() {
    }
    IOSExecutor.prototype.execEvents = function (event) {
        window.dispatchEvent(event);
    };
    IOSExecutor.prototype.exec = function (action, param, onSuccess, onError) {
        var callback = {};
        callback.onSuccess = onSuccess;
        callback.onError = onError;
        callback.id = String(++uniqueId);
        common_bridge_1.mabMessageQueue.unshift(callback);
        window.webkit.messageHandlers.MiniAppiOS.postMessage(JSON.stringify({ action: action, param: param, id: callback.id }));
    };
    IOSExecutor.prototype.getPlatform = function () {
        return platform_1.Platform.IOS;
    };
    return IOSExecutor;
}());
var iOSExecutor = new IOSExecutor();
window.MiniAppBridge = new common_bridge_1.MiniAppBridge(iOSExecutor);
navigator.geolocation.getCurrentPosition = function (success, error, options) {
    return iOSExecutor.exec('getCurrentPosition', { locationOptions: options }, function (value) {
        try {
            var parsedData = JSON.parse(value);
            success(parsedData);
        }
        catch (error) {
            error({
                code: GeolocationPositionError.POSITION_UNAVAILABLE,
                message: 'Failed to parse location object from MiniAppBridge: ' + error,
            });
        }
    }, function (error) { return console.error(error); });
};

},{"../common-bridge":1,"../types/platform":4}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enum for supported SDK error types
 */
var MiniAppErrorType;
(function (MiniAppErrorType) {
    MiniAppErrorType["AudienceNotSupportedError"] = "AudienceNotSupportedError";
    MiniAppErrorType["ScopesNotSupportedError"] = "ScopesNotSupportedError";
    MiniAppErrorType["AuthorizationFailureError"] = "AuthorizationFailureError";
})(MiniAppErrorType = exports.MiniAppErrorType || (exports.MiniAppErrorType = {}));
function parseMiniAppError(jsonString) {
    return JSON.parse(jsonString);
}
exports.parseMiniAppError = parseMiniAppError;
/**
 * This class is a representation of an error sent from MiniApp mobile SDK
 */
var MiniAppError = /** @class */ (function (_super) {
    __extends(MiniAppError, _super);
    function MiniAppError(errorInput) {
        var _this = _super.call(this) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, MiniAppError.prototype);
        _this.name = errorInput.type;
        _this.setMessage(errorInput.message);
        return _this;
    }
    MiniAppError.prototype.setMessage = function (newMessage) {
        if (newMessage !== undefined) {
            var enumKey = MiniAppErrorType[newMessage];
            if (enumKey !== undefined) {
                this.message = exports.errorTypesDescriptions.get(enumKey);
            }
        }
        if (!this.message || /^\s*$/.test(this.message)) {
            this.message = newMessage;
        }
    };
    return MiniAppError;
}(Error));
exports.MiniAppError = MiniAppError;
var AudienceNotSupportedError = /** @class */ (function (_super) {
    __extends(AudienceNotSupportedError, _super);
    function AudienceNotSupportedError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, AudienceNotSupportedError.prototype);
        _super.prototype.setMessage.call(_this, MiniAppErrorType.AudienceNotSupportedError);
        return _this;
    }
    return AudienceNotSupportedError;
}(MiniAppError));
exports.AudienceNotSupportedError = AudienceNotSupportedError;
var ScopesNotSupportedError = /** @class */ (function (_super) {
    __extends(ScopesNotSupportedError, _super);
    function ScopesNotSupportedError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, ScopesNotSupportedError.prototype);
        _super.prototype.setMessage.call(_this, MiniAppErrorType.ScopesNotSupportedError);
        return _this;
    }
    return ScopesNotSupportedError;
}(MiniAppError));
exports.ScopesNotSupportedError = ScopesNotSupportedError;
var AuthorizationFailureError = /** @class */ (function (_super) {
    __extends(AuthorizationFailureError, _super);
    function AuthorizationFailureError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, AuthorizationFailureError.prototype);
        return _this;
    }
    return AuthorizationFailureError;
}(MiniAppError));
exports.AuthorizationFailureError = AuthorizationFailureError;
exports.errorTypesDescriptions = new Map([
    [
        MiniAppErrorType.AudienceNotSupportedError,
        "The value passed for 'audience' is not supported.",
    ],
    [
        MiniAppErrorType.ScopesNotSupportedError,
        "The value passed for 'scopes' is not supported.",
    ],
]);

},{}],4:[function(require,module,exports){
"use strict";
/** @internal */
Object.defineProperty(exports, "__esModule", { value: true });
/** Device platform. */
var Platform;
(function (Platform) {
    Platform["ANDROID"] = "Android";
    Platform["IOS"] = "iOS";
})(Platform = exports.Platform || (exports.Platform = {}));

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Token data type. */
var AccessTokenData = /** @class */ (function () {
    function AccessTokenData(baseToken) {
        this.token = baseToken.token;
        this.validUntil = new Date(baseToken.validUntil);
        this.scopes = new AccessTokenScopes(baseToken.scopes);
    }
    return AccessTokenData;
}());
exports.AccessTokenData = AccessTokenData;
/** Token permission type. */
var AccessTokenScopes = /** @class */ (function () {
    function AccessTokenScopes(basePermission) {
        this.audience = basePermission.audience;
        this.scopes = basePermission.scopes;
    }
    return AccessTokenScopes;
}());
exports.AccessTokenScopes = AccessTokenScopes;

},{}]},{},[2]);
