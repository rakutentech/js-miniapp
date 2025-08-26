/**
 * Enum for supported SDK event types
 */
export enum MiniAppEvents {
  EXTERNAL_WEBVIEW_CLOSE = 'miniappwebviewclosed',
  PAUSE = 'miniapppause',
  RESUME = 'miniappresume',
}

/**
 * Enum for supported keyboard event types
 */
export enum MiniAppKeyboardEvents {
  KEYBOARDSHOWN = 'miniappkeyboardshown',
  KEYBOARDHIDDEN = 'miniappkeyboardhidden',
}

/**
 * Enum for supported HostApp event types
 */
export enum HostAppEvents {
  RECEIVE_JSON_INFO = 'miniappreceivejsoninfo',
  DID_RECEIVE_QUERY_PARAMS = 'miniappdidreceivequeryparams',
}
