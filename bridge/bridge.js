let MiniAppBridge = {}
var queue = []

MiniAppBridge.exec = function(action, onSuccess, onError) {
    const callback = {}
    callback.onSuccess = onSuccess;
    callback.onError = onError;
    callback.id = Math.random();
    queue.unshift(callback)
    webkit.messageHandlers.MiniApp.postMessage(JSON.stringify({action: action, id: callback.id}));
}

MiniAppBridge.execCallback = function(messageId, value) {
    var queueObj = queue.find(callback => callback.id = messageId)
    queueObj.onSuccess(value);
    var index = queue.indexOf(queueObj)
    if(index != -1) {
        queueObj.splice(index, 1);
    }
}

window.MiniApp = {
  getUniqueId: () => {
      return new Promise((resolve, reject) => {
          return MiniAppBridge.exec(
              "getUniqueId",
              id => resolve(id),
              error => reject(error)
          );
      })
  }
}
