export interface MiniAppJson {
  message?: string;
  type?: string;
}

/**
 * This class is a representation of an error sent from MiniApp mobile SDK
 */
export class MiniAppError extends Error {
  constructor(public errorInput: MiniAppJson) {
    super();
    Object.setPrototypeOf(this, MiniAppError.prototype);
    this.name = errorInput.type;
    this.message = errorInput.message;
  }
}
