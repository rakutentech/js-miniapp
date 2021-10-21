/** @internal */
export interface PlatformLogger {
  log(...argumentsList): void;
}

/** @internal */
export function getLogger() {
  // tslint:disable:no-any
  if (typeof window !== 'undefined') {
    // when not running in webview or browser, window does not exist
    return (window as any).MiniAppSDKLogger as MiniAppSDKLogger;
  }
  return undefined;
}

/** @internal */
export class MiniAppSDKLogger {
  logger: PlatformLogger;
  lastLog;
  originalConsole = originalLog;

  constructor(logger: PlatformLogger) {
    this.logger = logger;
  }

  logOnConsole(type, argumentsList) {
    switch (type) {
      case 'debug':
        this.originalConsole = originalDebug;
        break;
      case 'warn':
        this.originalConsole = originalWarn;
        break;
      case 'error':
        this.originalConsole = originalError;
        break;
      default:
        this.originalConsole = originalLog;
        break;
    }
    this.originalConsole.apply(null, argumentsList);
  }

  log(emoji, type, argumentsList) {
    this.lastLog = { icon: emoji, messageType: type, message: argumentsList };
    this.logger.log(emoji, type, argumentsList);
    this.logOnConsole(type, argumentsList);
  }
}

const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;
const originalDebug = console.debug;

function logMessage(
  logStream,
  emoji: string,
  type: string,
  argumentsList: any[]
) {
  const logger = getLogger();
  if (logger !== undefined) {
    logger.log(emoji, type, argumentsList);
  } else {
    logStream.apply(null, argumentsList);
  }
}

console.log = (...argumentsList) => {
  logMessage(originalLog, '📗', 'log', argumentsList);
};
console.warn = (...argumentsList) => {
  logMessage(originalWarn, '📙', 'warning', argumentsList);
};
console.error = (...argumentsList) => {
  logMessage(originalError, '📕', 'error', argumentsList);
};
console.debug = (...argumentsList) => {
  logMessage(originalDebug, '📘', 'debug', argumentsList);
};
