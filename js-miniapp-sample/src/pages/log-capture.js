const capturedLogs = [];

function captureLog(type, message) {
  capturedLogs.push({ type, message });
}

const originalLog = console.log;
console.log = function () {
  const message = Array.from(arguments).join(' ');
  captureLog('info', message);
  originalLog.apply(console, arguments);
};

const originalError = console.error;
console.error = function () {
  const message = Array.from(arguments).join(' ');
  captureLog('error', message);
  originalError.apply(console, arguments);
};

const originalWarn = console.warn;
console.warn = function () {
  const message = Array.from(arguments).join(' ');
  captureLog('warning', message);
  originalWarn.apply(console, arguments);
};

export { capturedLogs };
