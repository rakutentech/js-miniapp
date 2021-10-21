/** @internal */
export interface PlatformLogger {
  log(...argumentsList): void;
}

/** @internal */
export function getLogger() {
  // tslint:disable:no-any
  return (window as any).MiniAppSDKLogger as MiniAppSDKLogger;
}

/** @internal */
export class MiniAppSDKLogger {
  logger: PlatformLogger;

  constructor(logger: PlatformLogger) {
    this.logger = logger;
  }

  log(emoji, type, argumentsList) {
    this.logger.log(emoji, type, argumentsList);
  }
}

const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;
const originalDebug = console.debug;

console.log = (...argumentsList) => {
  getLogger().log('📗', 'log', argumentsList);
  originalLog.apply(null, argumentsList);
};
console.warn = (...argumentsList) => {
  getLogger().log('📙', 'warning', argumentsList);
  originalWarn.apply(null, argumentsList);
};
console.error = (...argumentsList) => {
  getLogger().log('📕', 'error', argumentsList);
  originalError.apply(null, argumentsList);
};
console.debug = (...argumentsList) => {
  getLogger().log('📘', 'debug', argumentsList);
  originalDebug.apply(null, argumentsList);
};
