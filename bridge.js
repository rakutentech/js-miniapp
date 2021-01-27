(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_bridge_1 = require("../common-bridge");
var platform_1 = require("../types/platform");
/* tslint:disable:no-any */
var uniqueId = Math.random();
var AndroidExecutor = /** @class */ (function () {
    function AndroidExecutor() {
    }
    AndroidExecutor.prototype.exec = function (action, param, onSuccess, onError) {
        var callback = {};
        callback.onSuccess = onSuccess;
        callback.onError = onError;
        callback.id = String(++uniqueId);
        common_bridge_1.mabMessageQueue.unshift(callback);
        window.MiniAppAndroid.postMessage(JSON.stringify({ action: action, param: param, id: callback.id }));
    };
    AndroidExecutor.prototype.getPlatform = function () {
        return platform_1.Platform.ANDROID;
    };
    return AndroidExecutor;
}());
window.MiniAppBridge = new common_bridge_1.MiniAppBridge(new AndroidExecutor());

},{"../common-bridge":2,"../types/platform":3}],2:[function(require,module,exports){
"use strict";
/** @internal */
Object.defineProperty(exports, "__esModule", { value: true });
var token_data_1 = require("./types/token-data");
/** @internal */
var mabMessageQueue = [];
exports.mabMessageQueue = mabMessageQueue;
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
     * Get access token from native hostapp.
     */
    MiniAppBridge.prototype.getAccessToken = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('getAccessToken', null, function (tokenData) {
                var nativeTokenData = JSON.parse(tokenData);
                resolve(new token_data_1.AccessTokenData(nativeTokenData));
            }, function (error) { return reject(error); });
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
     * @returns Promise resolves with the Unique ID which was sent the message.
     * Can also resolve with empty (undefined) response in the case that the message was not sent to a contact, such as if the user cancelled sending the message.
     * Promise rejects in the case that there was an error.
     */
    MiniAppBridge.prototype.sendMessageToContact = function (message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.executor.exec('sendMessageToContact', { messageToContact: message }, function (messageId) { return resolve(messageId); }, function (error) { return reject(error); });
        });
    };
    return MiniAppBridge;
}());
exports.MiniAppBridge = MiniAppBridge;
/**
 * Method to remove the callback object from the message queue after successful/error communication
 * with the native application
 * @param  {[Object]} queueObj Queue Object that holds the references of callback information
 *
 * @internal
 */
function removeFromMessageQueue(queueObj) {
    var messageObjIndex = mabMessageQueue.indexOf(queueObj);
    if (messageObjIndex !== -1) {
        mabMessageQueue.splice(messageObjIndex, 1);
    }
}

},{"./types/token-data":4}],3:[function(require,module,exports){
"use strict";
/** @internal */
Object.defineProperty(exports, "__esModule", { value: true });
/** Device platform. */
var Platform;
(function (Platform) {
    Platform["ANDROID"] = "Android";
    Platform["IOS"] = "iOS";
})(Platform = exports.Platform || (exports.Platform = {}));

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Token data type. */
var AccessTokenData = /** @class */ (function () {
    function AccessTokenData(baseToken) {
        this.token = baseToken.token;
        this.validUntil = new Date(baseToken.validUntil);
    }
    return AccessTokenData;
}());
exports.AccessTokenData = AccessTokenData;

},{}]},{},[1]);
