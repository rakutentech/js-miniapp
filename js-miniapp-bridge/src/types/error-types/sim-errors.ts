import { MiniAppError, MiniAppJson } from './mini-app-error';

export enum SimCheckErrorType {
  DENIED = 'DENIED',
  FAILED_TO_CHECK = 'FAILED_TO_CHECK',
}

export class SimCheckError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, SimCheckError.prototype);
  }
}

export function parseSimError(json: MiniAppJson) {
  const errorType: SimCheckErrorType =
    SimCheckErrorType[json.type as keyof typeof SimCheckErrorType];
  switch (errorType) {
    case SimCheckErrorType.DENIED:
    case SimCheckErrorType.FAILED_TO_CHECK:
      return new SimCheckError(json);
    default:
      return undefined;
  }
}
