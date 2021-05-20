export class MiniAppError extends Error {
  type: MiniAppErrorType;
  constructor(public name: string) {
    super();
    const error: MiniAppErrorType =
      MiniAppErrorType[name as keyof typeof MiniAppErrorType];
    let errorMessage: string;
    if (error) {
      errorMessage = errorTypesDescriptions[error];
      this.type = error;
    } else {
      this.type = MiniAppErrorType.Other;
    }
    if (errorMessage) {
      this.name = name;
      this.message = errorMessage;
    } else {
      this.name = error ? error : MiniAppErrorType.Other;
      this.message = name;
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
