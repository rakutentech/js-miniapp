var messageQueue = []
window.MiniAppBridge = {};
var uniqueId = Math.random();
var isPlatform = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }
};

/**
 * Method to call the native interface methods for respective platforms
 * such as iOS & Android
 * @param  {[String]} action Action command/interface name that native side need to execute
 * @param  {[Function]} onSuccess Success callback function
 * @param  {[Function]} onError Error callback function
 */
MiniAppBridge.exec = function(action, onSuccess, onError) {
    const callback = {}
    callback.onSuccess = onSuccess;
    callback.onError = onError;
    callback.id = ++uniqueId;
    messageQueue.unshift(callback)
    if(isPlatform.iOS()){
        webkit.messageHandlers.MiniAppiOS.postMessage(JSON.stringify({action: action, id: callback.id}));
    } else {
        window.MiniAppAndroid.getUniqueId(JSON.stringify({action: action, id: callback.id}))
    }
}

/**
 * Callback method that will be called from native side
 * to this bridge. This method will send back the value to the
 * mini apps that uses promises
 * such as iOS & Android
 * @param  {[String]} messageId Message ID which will be used to get callback object from messageQueue
 * @param  {[String]} value Response value sent from the native on invoking the action command
 */
MiniAppBridge.execCallback = function(messageId, value) {
    var queueObj = messageQueue.find(callback => callback.id = messageId)
    queueObj.onSuccess(value);
    var messageObjIndex = messageQueue.indexOf(queueObj)
    if(messageObjIndex != -1) {
        messageQueue.splice(messageObjIndex, 1);
    }
}


/**
 * Associating getUniqueId function to MiniAppBridge object
* @param  {[String]} messageId Message ID which will be used to get callback object from messageQueue
 * @param  {[String]} value Response value sent from the native on invoking the action command
 */
MiniAppBridge.getUniqueId = function(messageId, value) {
    return new Promise((resolve, reject) => {
        return MiniAppBridge.exec(
            "getUniqueId",
            id => resolve(id),
            error => reject(error)
        );
    })
}
