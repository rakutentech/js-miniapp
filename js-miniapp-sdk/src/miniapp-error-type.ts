interface MiniAppJson {
  message: string;
  type: string;
}

export function parseMiniAppError(jsonString: string): MiniAppJson {
  return JSON.parse(jsonString);
}

/**
 * This class is a representation of an error sent from MiniApp mobile SDK
 */
export class MiniAppError extends Error {
  /**
   * the raw input received from the SDK used to construct the MiniAppError
   */
  raw: string;
  customMessage: string;

  constructor(public errorInput: MiniAppJson) {
    super();
    this.raw = JSON.stringify(errorInput);
    this.name = errorInput.type;
    this.setMessage(errorInput.message);
  }

  setMessage(newMessage: string) {
    this.message = newMessage;
    this.customMessage = newMessage;
  }

  /**
   * Takes the error input string sent from mobile SDK.
   * Should be formatted as follow: "error_key: error message"
   *
   * @param errorInput error input string sent from mobile SDK
   */
  static fromCustomString(errorInput: string): MiniAppError {
    const error = new MiniAppError(parseMiniAppError('{}'));
    error.raw = errorInput;
    const messageArray = errorInput.split(': ');

    error.name =
      messageArray.length > 1 ? messageArray[0] : MiniAppErrorType.Other;
    messageArray.splice(0, 1);
    error.setMessage(
      messageArray.length > 0 ? messageArray.join(': ') : errorInput
    );
    return error;
  }
}

export class AudienceNotSupportedError extends MiniAppError {
  setMessage(newMessage: string) {
    super.setMessage(newMessage);
    this.message = errorTypesDescriptions.get(
      MiniAppErrorType.AudienceNotSupportedError
    );
  }
}

export class ScopesNotSupportedError extends MiniAppError {
  setMessage(newMessage: string) {
    super.setMessage(newMessage);
    this.message = errorTypesDescriptions.get(
      MiniAppErrorType.ScopesNotSupportedError
    );
  }
}

export class AuthorizationFailureError extends MiniAppError {
  setMessage(newMessage: string) {
    super.setMessage(newMessage);
    this.message = errorTypesDescriptions.get(
      MiniAppErrorType.AuthorizationFailureError
    );
  }
}

/**
 * Enum for supported SDK error types
 */
export enum MiniAppErrorType {
  AudienceNotSupportedError = 'AudienceNotSupportedError',
  ScopesNotSupportedError = 'ScopesNotSupportedError',
  AuthorizationFailureError = 'AuthorizationFailureError',
  Other = 'Other',
}

export const errorTypesDescriptions = new Map<MiniAppErrorType, string>([
  [
    MiniAppErrorType.AudienceNotSupportedError,
    "The value passed for 'audience' is not supported.",
  ],
  [
    MiniAppErrorType.ScopesNotSupportedError,
    "The value passed for 'scopes' is not supported.",
  ],
]);
