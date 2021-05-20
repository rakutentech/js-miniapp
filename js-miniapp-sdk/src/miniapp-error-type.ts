/**
 * This class is a representation of an error sent from MiniApp mobile SDK
 */
export class MiniAppError extends Error {
  /**
   * the MiniAppErrorType defining this error.
   * If no type con be extracted from the input then the MiniAppError will be considered of type `Other`
   */
  type: MiniAppErrorType;

  /**
   * the raw input received from the SDK used to construct the MiniAppError
   */
  raw: string;

  /**
   * Takes the error input string sent from mobile SDK.
   * Should be formatted as follow: "error_key: error message"
   *
   * @param errorInput error input string sent from mobile SDK
   */
  constructor(public errorInput: string) {
    super();
    this.raw = errorInput;
    const messageArray = errorInput.split(': ');
    const error: MiniAppErrorType =
      MiniAppErrorType[messageArray[0] as keyof typeof MiniAppErrorType];
    let errorMessage: string | undefined;
    if (error) {
      errorMessage = errorTypesDescriptions.get(error);
      this.type = error;
    } else {
      this.type = MiniAppErrorType.Other;
    }
    if (errorMessage) {
      this.name = error;
      this.message = errorMessage;
    } else {
      this.name = error
        ? error
        : messageArray.length > 1
        ? messageArray[0]
        : MiniAppErrorType.Other;
      messageArray.splice(0, 1);
      this.message =
        messageArray.length > 0 ? messageArray.join(': ') : errorInput;
    }
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
