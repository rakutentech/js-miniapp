/**
 * Enum for supported SDK event types
 */
export enum MiniAppEvents {
  EXTERNAL_WEBVIEW_CLOSE = 'miniappwebviewclosed',
  PAUSE = 'miniapppause',
  RESUME = 'miniappresume',
}

export enum MiniAppKeyboardEvents {
  KEYBOARDSHOWN = 'miniappkeyboardshown',
  KEYBOARDHIDDEN = 'miniappkeyboardhidden',
}
