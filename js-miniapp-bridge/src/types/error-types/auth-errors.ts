import { MiniAppError, MiniAppJson } from './mini-app-error';

enum MiniAppAuthErrorType {
  AudienceNotSupportedError = 'AudienceNotSupportedError',
  ScopesNotSupportedError = 'ScopesNotSupportedError',
  AuthorizationFailureError = 'AuthorizationFailureError',
}

export class AudienceNotSupportedError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, AudienceNotSupportedError.prototype);
    this.message = "The value passed for 'audience' is not supported.";
  }
}

export class ScopesNotSupportedError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, ScopesNotSupportedError.prototype);
    this.message = "The value passed for 'scopes' is not supported.";
  }
}

export class AuthorizationFailureError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, AuthorizationFailureError.prototype);
  }
}

export function parseAuthError(json: MiniAppJson) {
  const errorType: MiniAppAuthErrorType =
    MiniAppAuthErrorType[json.type as keyof typeof MiniAppAuthErrorType];
  switch (errorType) {
    case MiniAppAuthErrorType.AuthorizationFailureError:
      return new AuthorizationFailureError(json);
    case MiniAppAuthErrorType.AudienceNotSupportedError:
      return new AudienceNotSupportedError(json);
    case MiniAppAuthErrorType.ScopesNotSupportedError:
      return new ScopesNotSupportedError(json);
    default:
      return undefined;
  }
}
