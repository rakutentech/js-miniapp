import { MiniAppError, MiniAppJson } from './mini-app-error';

/**
 * Enum for supported InternalBrowser error event types
 */
export enum InternalBrowserErrorType {
  HTML_STRING_TOO_LARGE = 'HTML_STRING_TOO_LARGE',
  INVALID_CALLBACK_URL_SCHEME = 'INVALID_CALLBACK_URL_SCHEME',
  NETWORK_ERROR = 'NETWORK_ERROR',
  WEBVIEW_LOAD_FAILED = 'WEBVIEW_LOAD_FAILED',
  MINIAPP_BROWSER_ERROR = 'MINIAPP_BROWSER_ERROR', // Generic catch-all
}

export interface InternalBrowserError extends MiniAppJson {
  code: InternalBrowserErrorType;
  message: string;
}

export class InternalBrowserError extends MiniAppError {
  code: InternalBrowserErrorType;

  constructor(errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, InternalBrowserError.prototype);
    this.code = InternalBrowserErrorType[errorInput.type];
    this.message = errorInput.message || `Internal browser error: ${this.code}`;
  }
}

export function parseInternalBrowserError(json: MiniAppJson) {
  const errorType: InternalBrowserErrorType =
    InternalBrowserErrorType[
      json.type as keyof typeof InternalBrowserErrorType
    ];
  switch (errorType) {
    case InternalBrowserErrorType.HTML_STRING_TOO_LARGE:
      return new InternalBrowserError(json);
    case InternalBrowserErrorType.INVALID_CALLBACK_URL_SCHEME:
      return new InternalBrowserError(json);
    case InternalBrowserErrorType.MINIAPP_BROWSER_ERROR:
      return new InternalBrowserError(json);
    case InternalBrowserErrorType.NETWORK_ERROR:
      return new InternalBrowserError(json);
    case InternalBrowserErrorType.WEBVIEW_LOAD_FAILED:
      return new InternalBrowserError(json);
    default:
      return undefined;
  }
}
