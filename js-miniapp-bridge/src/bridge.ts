/* tslint:disable:no-any */
let uniqueId = Math.random();

const isPlatform = {
  Android: () => {
    return navigator.userAgent.match(/Android/i);
  },
  iOS: () => {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
};

interface Callback {
  id: string;

  onSuccess: (value: string) => void;
  onError: (error: string) => void;
}

class MiniAppBridge {}

interface MiniAppBridge {
  messageQueue: Callback[];

  /**
   * Method to call the native interface methods for respective platforms
   * such as iOS & Android
   * @param  {[String]} action Action command/interface name that native side need to execute
   * @param  {Object} param Object that contains request parameter values like permissions.
   * For eg., {permission: 'location'}
   * @param  {[Function]} onSuccess Success callback function
   * @param  {[Function]} onError Error callback function
   */
  exec(
    action: string,
    param: any,
    onSuccess: (value: string) => void,
    onError: (error: string) => void
  ): void;

  /**
   * Success Callback method that will be called from native side
   * to this bridge. This method will send back the value to the
   * mini apps that uses promises
   * @param  {[String]} messageId Message ID which will be used to get callback object from messageQueue
   * @param  {[String]} value Response value sent from the native on invoking the action command
   */
  execSuccessCallback(messageId: string, value: string): void;

  /**
   * Error Callback method that will be called from native side
   * to this bridge. This method will send back the error message to the
   * mini apps that uses promises
   * @param  {[String]} messageId Message ID which will be used to get callback object from messageQueue
   * @param  {[String]} errorMessage Error message sent from the native on invoking the action command
   */
  execErrorCallback(messageId: string, errorMessage: string): void;

  /**
   * Associating getUniqueId function to MiniAppBridge object
   */
  getUniqueId(): void;

  /**
   * Associating requestPermission function to MiniAppBridge object
   * @param {String} permissionType Type of permission that is requested. For eg., location
   */
  requestPermission(permissionType: string): void;
}

MiniAppBridge.prototype.exec = (action, param, onSuccess, onError) => {
  const callback = {} as Callback;
  callback.onSuccess = onSuccess;
  callback.onError = onError;
  callback.id = String(++uniqueId);
  MiniAppBridge.prototype.messageQueue.unshift(callback);
  if (isPlatform.iOS()) {
    (window as any).webkit.messageHandlers.MiniAppiOS.postMessage(
      JSON.stringify({ action, param, id: callback.id })
    );
  } else {
    (window as any).MiniAppAndroid.postMessage(
      JSON.stringify({ action, param, id: callback.id })
    );
  }
};

MiniAppBridge.prototype.execSuccessCallback = (messageId, value) => {
  const queueObj = MiniAppBridge.prototype.messageQueue.filter(
    callback => callback.id === messageId
  )[0];
  if (value) {
    queueObj.onSuccess(value);
  } else {
    queueObj.onError('Unknown Error');
  }
  removeFromMessageQueue(queueObj);
};

MiniAppBridge.prototype.execErrorCallback = (messageId, errorMessage) => {
  const queueObj = MiniAppBridge.prototype.messageQueue.filter(
    callback => callback.id === messageId
  )[0];
  if (!errorMessage) {
    errorMessage = 'Unknown Error';
  }
  queueObj.onError(errorMessage);
  removeFromMessageQueue(queueObj);
};

/**
 * Method to remove the callback object from the message queue after successfull/error communication
 * with the native application
 * @param  {[Object]} queueObj Queue Object that holds the references of callback informations
 */
function removeFromMessageQueue(queueObj) {
  const messageObjIndex = MiniAppBridge.prototype.messageQueue.indexOf(
    queueObj
  );
  if (messageObjIndex !== -1) {
    MiniAppBridge.prototype.messageQueue.splice(messageObjIndex, 1);
  }
}

MiniAppBridge.prototype.getUniqueId = () => {
  return new Promise((resolve, reject) => {
    return MiniAppBridge.prototype.exec(
      'getUniqueId',
      null,
      id => resolve(id),
      error => reject(error)
    );
  });
};

/**
 * Associating requestPermission function to MiniAppBridge object
 * @param {String} permissionType Type of permission that is requested. For eg., location
 */
MiniAppBridge.prototype.requestPermission = permissionType => {
  return new Promise((resolve, reject) => {
    return MiniAppBridge.prototype.exec(
      'requestPermission',
      { permission: permissionType },
      success => resolve(success),
      error => reject(error)
    );
  });
};

/**
 * Below code will override the navigator.geolocation.getCurrentPosition method for only iOS
 */
if (isPlatform.iOS()) {
  navigator.geolocation.getCurrentPosition = (success, error, options) => {
    return MiniAppBridge.prototype.exec(
      'getCurrentPosition',
      { locationOptions: options },
      value => {
        const parsedData = JSON.parse(value);
        success(parsedData);
      },
      error => console.error(error)
    );
  };
}

(window as any).MiniAppBridge = MiniAppBridge;
