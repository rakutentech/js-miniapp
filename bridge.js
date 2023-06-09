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
exports.MiniAppBridge = exports.mabKeyboardEventQueue = exports.mabCustomEventQueue = exports.mabMessageQueue = void 0;
var secure_storage_1 = require("./types/secure-storage");
var token_data_1 = require("./types/token-data");
var error_types_1 = require("./types/error-types");
/** @internal */
var mabMessageQueue = [];
exports.mabMessageQueue = mabMessageQueue;
var mabCustomEventQueue = [];
exports.mabCustomEventQueue = mabCustomEventQueue;
var mabKeyboardEventQueue = [];
exports.mabKeyboardEventQueue = mabKeyboardEventQueue;
/** @internal */
var MiniAppBridge = /** @class */ (function () {
    function MiniAppBridge(executor) {
        var _this = this;
        this.isSecureStorageReady = false;
        this.secureStorageLoadError = null;
        this.executor = executor;
        this.platform = executor.getPlatform();
        if (window) {
            window.addEventListener(secure_storage_1.MiniAppSecureStorageEvents.onReady, function () { return (_this.isSecureStorageReady = true); });
            window.addEventListener(secure_storage_1.MiniAppSecureStorageEvents.onLoadError, function (e) {
                return (_this.secureStorageLoadError = (0, error_types_1.parseMiniAppError)(e.detail.message));
            });
        }
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
        var event = new CustomEvent(eventType, {
            detail: { message: value },
        });
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
     * Keyboard Events Callback method that will be called from native side
     * to this bridge. This method will send back the value to the
     * mini app that listen to this eventType.
     * @param  {[String]} eventType EventType which will be used to listen for the event
     * @param  {[String]} message Additional message sent from the native on invoking for the eventType
     * @param  {[String]} navigationBarHeight Additional message sent from the native on invoking for the navigationBarHeight
     * @param  {[String]} screenHeight Additional message sent from the native on invoking for the screenHeight
     * @param  {[String]} keyboardHeight Additional message sent from the native on invoking for the keyboardHeight
     */
    MiniAppBridge.prototype.execKeyboardEventsCallback = function (eventType, message, navigationBarHeight, screenHeight, keyboardHeight) {
        var event = new CustomEvent(eventType, {
            detail: {
                message: message,
                navigationBarHeight: navigationBarHeight,
                screenHeight: screenHeight,
                keyboardHeight: keyboardHeight,
            },
        });
        var queueObj = mabKeyboardEventQueue.filter(function (customEvent) { return customEvent === event; })[0];
        if (!queueObj) {
            if (eventType === event.type) {
                removeFromKeyboardEventQueue(event);
            }
            queueObj = event;
            mabKeyboardEventQueue.unshift(queueObj);
        }
        this.executor.execEvents(queueObj);
    };
    /**
     * Deprecated method for associating getUniqueId function to MiniAppBridge object.
     * Use `getMessagingUniqueId` or `getMauid` instead
     */
    MiniAppBridge.prototype.getUniqueId = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('getUniqueId', null, function (id) { return resolve(id); }, function (error) { return reject(error); });
        });
    };
    /**
     * Associating getMessagingUniqueId function to MiniAppBridge object.
     */
    MiniAppBridge.prototype.getMessagingUniqueId = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('getMessagingUniqueId', null, function (id) { return resolve(id); }, function (error) { return reject(error); });
        });
    };
    /**
     * Associating getMauid function to MiniAppBridge object.
     */
    MiniAppBridge.prototype.getMauid = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('getMauid', null, function (id) { return resolve(id); }, function (error) { return reject(error); });
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
            return _this.executor.exec('showAd', { adType: 0 /* AdTypes.INTERSTITIAL */, adUnitId: id }, function (closeSuccess) { return resolve(closeSuccess); }, function (error) { return reject(error); });
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
            return _this.executor.exec('loadAd', { adType: 0 /* AdTypes.INTERSTITIAL */, adUnitId: id }, function (loadSuccess) { return resolve(loadSuccess); }, function (error) { return reject(error); });
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
            return _this.executor.exec('loadAd', { adType: 1 /* AdTypes.REWARDED */, adUnitId: id }, function (loadSuccess) { return resolve(loadSuccess); }, function (error) { return reject(error); });
        });
    };
    /**
     * Associating showRewardedAd function to MiniAppBridge object.
     * @param {string} id ad unit id of the Rewarded ad
     */
    MiniAppBridge.prototype.showRewardedAd = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('showAd', { adType: 1 /* AdTypes.REWARDED */, adUnitId: id }, function (rewardResponse) { return resolve(JSON.parse(rewardResponse)); }, function (error) { return reject(error); });
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
            }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
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
            return _this.executor.exec('getPoints', null, function (points) { return resolve(JSON.parse(points)); }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
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
            return _this.executor.exec('downloadFile', { filename: filename, url: url, headers: headers }, function (id) {
                if (id !== 'null' && id !== null) {
                    resolve(id);
                }
                else {
                    resolve(null);
                }
            }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
        });
    };
    MiniAppBridge.prototype.setSecureStorage = function (items) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('setSecureStorageItems', { secureStorageItems: items }, function (success) { return resolve(undefined); }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
        });
    };
    MiniAppBridge.prototype.getSecureStorageItem = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('getSecureStorageItem', { secureStorageKey: key }, function (responseData) { return resolve(responseData); }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
        });
    };
    MiniAppBridge.prototype.removeSecureStorageItems = function (keys) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('removeSecureStorageItems', { secureStorageKeyList: keys }, function (success) { return resolve(undefined); }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
        });
    };
    MiniAppBridge.prototype.clearSecureStorage = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('clearSecureStorage', null, function (success) { return resolve(undefined); }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
        });
    };
    MiniAppBridge.prototype.getSecureStorageSize = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('getSecureStorageSize', null, function (responseData) {
                resolve(JSON.parse(responseData));
            }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
        });
    };
    /**
     * @param alertInfo Close confirmation alert info.
     * @see {setCloseAlert}
     */
    MiniAppBridge.prototype.setCloseAlert = function (alertInfo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('setCloseAlert', { closeAlertInfo: alertInfo }, function (success) { return resolve(success); }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
        });
    };
    /**
     * Associating sendJsonToHostapp function to MiniAppBridge object.
     * @param {info} JSON/String information that you would like to send to HostApp.
     * @see {sendJsonToHostapp}
     */
    MiniAppBridge.prototype.sendJsonToHostapp = function (info) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('sendJsonToHostapp', { jsonInfo: info }, function (success) { return resolve(success); }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
        });
    };
    /**
     * Associating closeMiniApp function to MiniAppBridge object.
     * @param {withConfirmation} boolean value which will be used by the host app to show/hide close confirmation alert
     * which should be set using `setCloseAlert` method in prior before calling this interface
     * @see {closeMiniApp}
     */
    MiniAppBridge.prototype.closeMiniApp = function (withConfirmation) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('closeMiniApp', { withConfirmationAlert: withConfirmation }, function (success) { return resolve(success); }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
        });
    };
    /**
     * This will retrieve the list of products details available for In-App Purchases associated with Mini App in the Platform.
     * @returns List of In-app purchase products
     * @see {getAllProducts}
     */
    MiniAppBridge.prototype.getAllProducts = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('getAllProducts', null, function (productsList) {
                resolve(JSON.parse(productsList));
            }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
        });
    };
    /**
     * This will request for the In-App Purchase of a product with product id associated with Mini App in the Platform.
     * @param id Product id of the product to be purchased.
     * @returns Purchased product details and the transaction details of the purchase.
     */
    MiniAppBridge.prototype.purchaseProductWith = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('purchaseProductWith', { productId: id }, function (purchasedProduct) {
                resolve(JSON.parse(purchasedProduct));
            }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
        });
    };
    /**
     * This will request to Consume the product that is purchased using consumePurchaseWith API
     * @param id Product id of the product that is purchased.
     * @returns
     */
    MiniAppBridge.prototype.consumePurchaseWith = function (id, transactionId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('consumeProductWith', { productId: id, productTransactionId: transactionId }, function (consumedInfo) {
                resolve(JSON.parse(consumedInfo));
            }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
        });
    };
    MiniAppBridge.prototype.getHostAppThemeColors = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('getHostAppThemeColors', null, function (response) {
                resolve(JSON.parse(response));
            }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
        });
    };
    MiniAppBridge.prototype.isDarkMode = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('isDarkMode', null, function (response) {
                if (response.toLowerCase() === 'true') {
                    resolve(Boolean(true));
                }
                else {
                    resolve(Boolean(false));
                }
            }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
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
function removeFromKeyboardEventQueue(queueObj) {
    var eventObjIndex = mabKeyboardEventQueue.indexOf(mabKeyboardEventQueue.filter(function (customEvent) { return customEvent.type === queueObj.type; })[0]);
    if (eventObjIndex !== -1) {
        mabKeyboardEventQueue.splice(eventObjIndex, 1);
    }
}
function trimBannerText(message, maxLength) {
    if (message === void 0) { message = null; }
    if (maxLength === void 0) { maxLength = 128; }
    return (message === null || message === void 0 ? void 0 : message.length) > maxLength
        ? (message === null || message === void 0 ? void 0 : message.substring(0, maxLength - 1)) + '…'
        : message;
}

},{"./types/error-types":6,"./types/secure-storage":10,"./types/token-data":11}],2:[function(require,module,exports){
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

},{"../common-bridge":1,"../types/platform":9}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAuthError = exports.AuthorizationFailureError = exports.ScopesNotSupportedError = exports.AudienceNotSupportedError = void 0;
var mini_app_error_1 = require("./mini-app-error");
var MiniAppAuthErrorType;
(function (MiniAppAuthErrorType) {
    MiniAppAuthErrorType["AudienceNotSupportedError"] = "AudienceNotSupportedError";
    MiniAppAuthErrorType["ScopesNotSupportedError"] = "ScopesNotSupportedError";
    MiniAppAuthErrorType["AuthorizationFailureError"] = "AuthorizationFailureError";
})(MiniAppAuthErrorType || (MiniAppAuthErrorType = {}));
var AudienceNotSupportedError = /** @class */ (function (_super) {
    __extends(AudienceNotSupportedError, _super);
    function AudienceNotSupportedError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, AudienceNotSupportedError.prototype);
        _this.message = "The value passed for 'audience' is not supported.";
        return _this;
    }
    return AudienceNotSupportedError;
}(mini_app_error_1.MiniAppError));
exports.AudienceNotSupportedError = AudienceNotSupportedError;
var ScopesNotSupportedError = /** @class */ (function (_super) {
    __extends(ScopesNotSupportedError, _super);
    function ScopesNotSupportedError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, ScopesNotSupportedError.prototype);
        _this.message = "The value passed for 'scopes' is not supported.";
        return _this;
    }
    return ScopesNotSupportedError;
}(mini_app_error_1.MiniAppError));
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
}(mini_app_error_1.MiniAppError));
exports.AuthorizationFailureError = AuthorizationFailureError;
function parseAuthError(json) {
    var errorType = MiniAppAuthErrorType[json.type];
    switch (errorType) {
        case MiniAppAuthErrorType.AuthorizationFailureError:
            return new AuthorizationFailureError(json);
        case MiniAppAuthErrorType.AudienceNotSupportedError:
            return new AudienceNotSupportedError(json);
        case MiniAppAuthErrorType.ScopesNotSupportedError:
            return new ScopesNotSupportedError(json);
        default:
            return undefined;
    }
}
exports.parseAuthError = parseAuthError;

},{"./mini-app-error":7}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDownloadError = exports.DownloadHttpError = exports.SaveFailureError = exports.InvalidUrlError = exports.DownloadFailedError = void 0;
var mini_app_error_1 = require("./mini-app-error");
var MiniAppDownloadErrorType;
(function (MiniAppDownloadErrorType) {
    MiniAppDownloadErrorType["DownloadFailedError"] = "DownloadFailedError";
    MiniAppDownloadErrorType["InvalidUrlError"] = "InvalidUrlError";
    MiniAppDownloadErrorType["SaveFailureError"] = "SaveFailureError";
    MiniAppDownloadErrorType["DownloadHttpError"] = "DownloadHttpError";
})(MiniAppDownloadErrorType || (MiniAppDownloadErrorType = {}));
/**
 * Error returned by `MiniApp.downloadFile` when failed to download or save the file.
 */
var DownloadFailedError = /** @class */ (function (_super) {
    __extends(DownloadFailedError, _super);
    function DownloadFailedError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, DownloadFailedError.prototype);
        _this.message = 'Failed to download the file.';
        return _this;
    }
    return DownloadFailedError;
}(mini_app_error_1.MiniAppError));
exports.DownloadFailedError = DownloadFailedError;
/**
 * Error returned by `MiniApp.downloadFile` when the provided URL is invalid.
 * Only `http:`, `https:` and `data:` URLs are supported.
 */
var InvalidUrlError = /** @class */ (function (_super) {
    __extends(InvalidUrlError, _super);
    function InvalidUrlError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, InvalidUrlError.prototype);
        _this.message = 'The provided URL is invalid.';
        return _this;
    }
    return InvalidUrlError;
}(mini_app_error_1.MiniAppError));
exports.InvalidUrlError = InvalidUrlError;
/**
 * Error returned by `MiniApp.downloadFile` when failed to save file to device.
 */
var SaveFailureError = /** @class */ (function (_super) {
    __extends(SaveFailureError, _super);
    function SaveFailureError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, SaveFailureError.prototype);
        _this.message = 'Failed to save the file to the device.';
        return _this;
    }
    return SaveFailureError;
}(mini_app_error_1.MiniAppError));
exports.SaveFailureError = SaveFailureError;
/**
 * Error returned by `MiniApp.downloadFile` when failed to download the file due to an HTTP error.
 * @param code HTTP error code returned by the server.
 */
var DownloadHttpError = /** @class */ (function (_super) {
    __extends(DownloadHttpError, _super);
    function DownloadHttpError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, DownloadHttpError.prototype);
        _this.code = errorInput.code;
        _this.message = errorInput.message;
        return _this;
    }
    return DownloadHttpError;
}(mini_app_error_1.MiniAppError));
exports.DownloadHttpError = DownloadHttpError;
function parseDownloadError(json) {
    var errorType = MiniAppDownloadErrorType[json.type];
    switch (errorType) {
        case MiniAppDownloadErrorType.DownloadFailedError:
            return new DownloadFailedError(json);
        case MiniAppDownloadErrorType.InvalidUrlError:
            return new InvalidUrlError(json);
        case MiniAppDownloadErrorType.SaveFailureError:
            return new SaveFailureError(json);
        case MiniAppDownloadErrorType.DownloadHttpError:
            return new DownloadHttpError(json);
        default:
            return undefined;
    }
}
exports.parseDownloadError = parseDownloadError;

},{"./mini-app-error":7}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInAppPurchaseError = exports.UserCancelledPurchaseError = exports.ProductPurchasedAlreadyError = exports.ProductNotFoundError = exports.ConsumeFailedError = exports.PurchaseFailedError = void 0;
var mini_app_error_1 = require("./mini-app-error");
var MiniAppInAppPurchaseErrorType;
(function (MiniAppInAppPurchaseErrorType) {
    MiniAppInAppPurchaseErrorType["PurchaseFailedError"] = "PurchaseFailedError";
    MiniAppInAppPurchaseErrorType["ConsumeFailedError"] = "ConsumeFailedError";
    MiniAppInAppPurchaseErrorType["ProductNotFoundError"] = "ProductNotFoundError";
    MiniAppInAppPurchaseErrorType["ProductPurchasedAlreadyError"] = "ProductPurchasedAlreadyError";
    MiniAppInAppPurchaseErrorType["UserCancelledPurchaseError"] = "UserCancelledPurchaseError";
})(MiniAppInAppPurchaseErrorType || (MiniAppInAppPurchaseErrorType = {}));
var PurchaseFailedError = /** @class */ (function (_super) {
    __extends(PurchaseFailedError, _super);
    function PurchaseFailedError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, PurchaseFailedError.prototype);
        _this.message = 'Product Purchase failed, please try again later';
        return _this;
    }
    return PurchaseFailedError;
}(mini_app_error_1.MiniAppError));
exports.PurchaseFailedError = PurchaseFailedError;
var ConsumeFailedError = /** @class */ (function (_super) {
    __extends(ConsumeFailedError, _super);
    function ConsumeFailedError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, ConsumeFailedError.prototype);
        _this.message =
            'Unable to consume the product, please make sure the product is purchased already';
        return _this;
    }
    return ConsumeFailedError;
}(mini_app_error_1.MiniAppError));
exports.ConsumeFailedError = ConsumeFailedError;
var ProductNotFoundError = /** @class */ (function (_super) {
    __extends(ProductNotFoundError, _super);
    function ProductNotFoundError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, ProductNotFoundError.prototype);
        _this.message =
            'Unable to find the ProductId. Please make sure that the productId is registered in Google Play';
        return _this;
    }
    return ProductNotFoundError;
}(mini_app_error_1.MiniAppError));
exports.ProductNotFoundError = ProductNotFoundError;
var ProductPurchasedAlreadyError = /** @class */ (function (_super) {
    __extends(ProductPurchasedAlreadyError, _super);
    function ProductPurchasedAlreadyError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, ProductPurchasedAlreadyError.prototype);
        _this.message = 'This Product is purchased already';
        return _this;
    }
    return ProductPurchasedAlreadyError;
}(mini_app_error_1.MiniAppError));
exports.ProductPurchasedAlreadyError = ProductPurchasedAlreadyError;
var UserCancelledPurchaseError = /** @class */ (function (_super) {
    __extends(UserCancelledPurchaseError, _super);
    function UserCancelledPurchaseError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, UserCancelledPurchaseError.prototype);
        _this.message = 'User cancelled the purchase';
        return _this;
    }
    return UserCancelledPurchaseError;
}(mini_app_error_1.MiniAppError));
exports.UserCancelledPurchaseError = UserCancelledPurchaseError;
function parseInAppPurchaseError(json) {
    var errorType = MiniAppInAppPurchaseErrorType[json.type];
    switch (errorType) {
        case MiniAppInAppPurchaseErrorType.PurchaseFailedError:
            return new PurchaseFailedError(json);
        case MiniAppInAppPurchaseErrorType.ConsumeFailedError:
            return new ConsumeFailedError(json);
        case MiniAppInAppPurchaseErrorType.ProductNotFoundError:
            return new ProductNotFoundError(json);
        case MiniAppInAppPurchaseErrorType.ProductPurchasedAlreadyError:
            return new ProductPurchasedAlreadyError(json);
        case MiniAppInAppPurchaseErrorType.UserCancelledPurchaseError:
            return new UserCancelledPurchaseError(json);
        default:
            return undefined;
    }
}
exports.parseInAppPurchaseError = parseInAppPurchaseError;

},{"./mini-app-error":7}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCancelledPurchaseError = exports.ProductPurchasedAlreadyError = exports.ProductNotFoundError = exports.ConsumeFailedError = exports.PurchaseFailedError = exports.SecureStorageIOError = exports.SecureStorageUnavailableError = exports.SecureStorageBusyError = exports.SecureStorageFullError = exports.ScopesNotSupportedError = exports.SaveFailureError = exports.parseMiniAppError = exports.MiniAppError = exports.InvalidUrlError = exports.DownloadHttpError = exports.DownloadFailedError = exports.AudienceNotSupportedError = exports.AuthorizationFailureError = void 0;
var auth_errors_1 = require("./auth-errors");
Object.defineProperty(exports, "AuthorizationFailureError", { enumerable: true, get: function () { return auth_errors_1.AuthorizationFailureError; } });
Object.defineProperty(exports, "AudienceNotSupportedError", { enumerable: true, get: function () { return auth_errors_1.AudienceNotSupportedError; } });
Object.defineProperty(exports, "ScopesNotSupportedError", { enumerable: true, get: function () { return auth_errors_1.ScopesNotSupportedError; } });
var download_file_errors_1 = require("./download-file-errors");
Object.defineProperty(exports, "DownloadFailedError", { enumerable: true, get: function () { return download_file_errors_1.DownloadFailedError; } });
Object.defineProperty(exports, "DownloadHttpError", { enumerable: true, get: function () { return download_file_errors_1.DownloadHttpError; } });
Object.defineProperty(exports, "InvalidUrlError", { enumerable: true, get: function () { return download_file_errors_1.InvalidUrlError; } });
Object.defineProperty(exports, "SaveFailureError", { enumerable: true, get: function () { return download_file_errors_1.SaveFailureError; } });
var secure_storage_errors_1 = require("./secure-storage-errors");
Object.defineProperty(exports, "SecureStorageFullError", { enumerable: true, get: function () { return secure_storage_errors_1.SecureStorageFullError; } });
Object.defineProperty(exports, "SecureStorageBusyError", { enumerable: true, get: function () { return secure_storage_errors_1.SecureStorageBusyError; } });
Object.defineProperty(exports, "SecureStorageUnavailableError", { enumerable: true, get: function () { return secure_storage_errors_1.SecureStorageUnavailableError; } });
Object.defineProperty(exports, "SecureStorageIOError", { enumerable: true, get: function () { return secure_storage_errors_1.SecureStorageIOError; } });
var in_app_purchase_errors_1 = require("./in-app-purchase-errors");
Object.defineProperty(exports, "PurchaseFailedError", { enumerable: true, get: function () { return in_app_purchase_errors_1.PurchaseFailedError; } });
Object.defineProperty(exports, "ConsumeFailedError", { enumerable: true, get: function () { return in_app_purchase_errors_1.ConsumeFailedError; } });
Object.defineProperty(exports, "ProductNotFoundError", { enumerable: true, get: function () { return in_app_purchase_errors_1.ProductNotFoundError; } });
Object.defineProperty(exports, "ProductPurchasedAlreadyError", { enumerable: true, get: function () { return in_app_purchase_errors_1.ProductPurchasedAlreadyError; } });
Object.defineProperty(exports, "UserCancelledPurchaseError", { enumerable: true, get: function () { return in_app_purchase_errors_1.UserCancelledPurchaseError; } });
var mini_app_error_1 = require("./mini-app-error");
Object.defineProperty(exports, "MiniAppError", { enumerable: true, get: function () { return mini_app_error_1.MiniAppError; } });
function parseMiniAppError(jsonString) {
    try {
        var json = JSON.parse(jsonString);
        return ((0, auth_errors_1.parseAuthError)(json) ||
            (0, download_file_errors_1.parseDownloadError)(json) ||
            (0, secure_storage_errors_1.parseStorageError)(json) ||
            (0, in_app_purchase_errors_1.parseInAppPurchaseError)(json) ||
            new mini_app_error_1.MiniAppError(json));
    }
    catch (e) {
        console.error(e);
        return new mini_app_error_1.MiniAppError({
            type: 'MiniAppError',
            message: 'Failed to parse the error: ' + jsonString,
        });
    }
}
exports.parseMiniAppError = parseMiniAppError;

},{"./auth-errors":3,"./download-file-errors":4,"./in-app-purchase-errors":5,"./mini-app-error":7,"./secure-storage-errors":8}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniAppError = void 0;
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
        _this.message = errorInput.message;
        return _this;
    }
    return MiniAppError;
}(Error));
exports.MiniAppError = MiniAppError;

},{}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStorageError = exports.SecureStorageIOError = exports.SecureStorageUnavailableError = exports.SecureStorageBusyError = exports.SecureStorageFullError = void 0;
var mini_app_error_1 = require("./mini-app-error");
var MiniAppStorageErrorType;
(function (MiniAppStorageErrorType) {
    MiniAppStorageErrorType["SecureStorageFullError"] = "SecureStorageFullError";
    MiniAppStorageErrorType["SecureStorageBusyError"] = "SecureStorageBusyError";
    MiniAppStorageErrorType["SecureStorageUnavailableError"] = "SecureStorageUnavailableError";
    MiniAppStorageErrorType["SecureStorageIOError"] = "SecureStorageIOError";
})(MiniAppStorageErrorType || (MiniAppStorageErrorType = {}));
var SecureStorageFullError = /** @class */ (function (_super) {
    __extends(SecureStorageFullError, _super);
    function SecureStorageFullError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, SecureStorageFullError.prototype);
        _this.message = 'Storage limit is exceeded or full already';
        return _this;
    }
    return SecureStorageFullError;
}(mini_app_error_1.MiniAppError));
exports.SecureStorageFullError = SecureStorageFullError;
var SecureStorageBusyError = /** @class */ (function (_super) {
    __extends(SecureStorageBusyError, _super);
    function SecureStorageBusyError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, SecureStorageBusyError.prototype);
        _this.message = 'Storage is busy, please try again';
        return _this;
    }
    return SecureStorageBusyError;
}(mini_app_error_1.MiniAppError));
exports.SecureStorageBusyError = SecureStorageBusyError;
var SecureStorageUnavailableError = /** @class */ (function (_super) {
    __extends(SecureStorageUnavailableError, _super);
    function SecureStorageUnavailableError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, SecureStorageUnavailableError.prototype);
        _this.message = 'Storage is not yet loaded or failed to load';
        return _this;
    }
    return SecureStorageUnavailableError;
}(mini_app_error_1.MiniAppError));
exports.SecureStorageUnavailableError = SecureStorageUnavailableError;
var SecureStorageIOError = /** @class */ (function (_super) {
    __extends(SecureStorageIOError, _super);
    function SecureStorageIOError(errorInput) {
        var _this = _super.call(this, errorInput) || this;
        _this.errorInput = errorInput;
        Object.setPrototypeOf(_this, SecureStorageIOError.prototype);
        _this.message = 'Unable to read/write changes in Storage.';
        return _this;
    }
    return SecureStorageIOError;
}(mini_app_error_1.MiniAppError));
exports.SecureStorageIOError = SecureStorageIOError;
function parseStorageError(json) {
    var errorType = MiniAppStorageErrorType[json.type];
    switch (errorType) {
        case MiniAppStorageErrorType.SecureStorageFullError:
            return new SecureStorageFullError(json);
        case MiniAppStorageErrorType.SecureStorageBusyError:
            return new SecureStorageBusyError(json);
        case MiniAppStorageErrorType.SecureStorageUnavailableError:
            return new SecureStorageUnavailableError(json);
        case MiniAppStorageErrorType.SecureStorageIOError:
            return new SecureStorageIOError(json);
        default:
            return undefined;
    }
}
exports.parseStorageError = parseStorageError;

},{"./mini-app-error":7}],9:[function(require,module,exports){
"use strict";
/** @internal */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Platform = void 0;
/** Device platform. */
var Platform;
(function (Platform) {
    Platform["ANDROID"] = "Android";
    Platform["IOS"] = "iOS";
})(Platform = exports.Platform || (exports.Platform = {}));

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniAppSecureStorageEvents = void 0;
var MiniAppSecureStorageEvents;
(function (MiniAppSecureStorageEvents) {
    MiniAppSecureStorageEvents["onReady"] = "miniappsecurestorageready";
    MiniAppSecureStorageEvents["onLoadError"] = "miniappsecurestorageloaderror";
})(MiniAppSecureStorageEvents = exports.MiniAppSecureStorageEvents || (exports.MiniAppSecureStorageEvents = {}));

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenScopes = exports.AccessTokenData = void 0;
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
