(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (Buffer){(function (){
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
        // This fix is added to decode the string from the host app.
        // Reason: Some characters are not escaped properly, so the data is encoded in the native application
        // and decoded here.
        var result = value;
        if (eventType === 'miniappreceivejsoninfo') {
            result = convertUnicodeCharacters(value);
        }
        var event = new CustomEvent(eventType, {
            detail: { message: result },
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
            return _this.executor.exec('getUserName', null, function (userName) { return resolve(convertUnicodeCharacters(userName)); }, function (error) { return reject(error); });
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
     * Associating sendInfoToHostapp function to MiniAppBridge object.
     * @param {info} UniversalBridgeInfo information that you would like to send to HostApp.
     * @see {sendInfoToHostapp}
     */
    MiniAppBridge.prototype.sendInfoToHostapp = function (info) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('sendInfoToHostapp', { universalBridgeInfo: info }, function (success) { return resolve(success); }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
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
                resolve(BooleanValue(response));
            }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
        });
    };
    MiniAppBridge.prototype.sendAnalytics = function (analytics) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('sendAnalytics', { analyticsInfo: analytics }, function (success) { return resolve(success); }, function (error) { return reject((0, error_types_1.parseMiniAppError)(error)); });
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
function BooleanValue(value) {
    if (typeof value === 'boolean') {
        return value;
    }
    else if (typeof value === 'string') {
        var lowerCaseValue = value.toLowerCase();
        if (lowerCaseValue === 'true' || lowerCaseValue === '1') {
            return true;
        }
        else if (lowerCaseValue === 'false' || lowerCaseValue === '0') {
            return false;
        }
    }
    return false;
}
var parseIntOctal = function (octalCode) {
    return Number.parseInt(octalCode, 8);
};
var decodeOctalEscape = function (input) {
    return input.replace(/\\(\d{3})/g, function (match, octalCode) {
        return String.fromCharCode(parseIntOctal(octalCode));
    });
};
function convertUnicodeCharacters(value) {
    //This will decode the message string that is sent from Native
    var decoded = Buffer.from(value, 'base64').toString('utf8');
    //Few characters like currency, etc., is not decoded properly,
    // We use folllowing method to decoded it.
    var octalString = decodeOctalEscape(decoded);
    var stringifyMessage = JSON.stringify(octalString);
    var replaced = stringifyMessage.replace(/\\\\/g, '\\');
    return JSON.parse(replaced);
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"./types/error-types":6,"./types/secure-storage":10,"./types/token-data":11,"buffer":13}],2:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],13:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":12,"buffer":13,"ieee754":14}],14:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}]},{},[2]);
