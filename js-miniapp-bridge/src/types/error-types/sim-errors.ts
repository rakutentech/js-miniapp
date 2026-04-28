import { MiniAppError, MiniAppJson } from './mini-app-error';

/**
 * Enum for supported SIM check error event types
 */
export enum SimCheckErrorType {
  DENIED = 'DENIED',
  FAILED_TO_CHECK = 'FAILED_TO_CHECK',
}

export interface SimCheckError extends MiniAppJson {
  code: SimCheckErrorType;
  message: string;
}

export class SimCheckError extends MiniAppError {
  code: SimCheckErrorType;

  constructor(errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, SimCheckError.prototype);
    this.code = SimCheckErrorType[errorInput.type];
    this.message = errorInput.message || `SIM error: ${this.code}`;
  }
}

export function parseSimError(json: MiniAppJson) {
  const errorType: SimCheckErrorType =
    SimCheckErrorType[json.type as keyof typeof SimCheckErrorType];
  switch (errorType) {
    case SimCheckErrorType.DENIED:
      return new SimCheckError(json);
    case SimCheckErrorType.FAILED_TO_CHECK:
      return new SimCheckError(json);
    default:
      return undefined;
  }
}
