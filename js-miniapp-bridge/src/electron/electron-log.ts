/* tslint:disable:no-any */
import { MiniAppSDKLogger, PlatformLogger } from '../common-log';

class ElectronSDKLogger implements PlatformLogger {
  log(emoji, type, args) {
    (window as any).MiniAppElectron.log(
      `${emoji} console.${type}: ${Object.values(args)
        .map(v =>
          typeof v === 'undefined'
            ? 'undefined'
            : typeof v === 'object'
            ? JSON.stringify(v)
            : v.toString()
        )
        .map(v => v.substring(0, 3000)) // Limit msg to 3000 chars
        .join(', ')}`
    );
  }
}

const electronLogger = new ElectronSDKLogger();
(window as any).MiniAppSDKLogger = new MiniAppSDKLogger(electronLogger);
