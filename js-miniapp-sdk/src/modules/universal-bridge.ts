import { getBridge } from '../utils';

/**
 * Interface to send JSON/String to Host app
 */
export interface UniversalBridgeProvider {
  /**
   * Send JSON/String information to HostApp.
   */
  sendJsonToHostapp(info: string): Promise<string>;
}

/** @internal */
export class UniversalBridge implements UniversalBridgeProvider {
  sendJsonToHostapp(info: string): Promise<string> {
    return getBridge().sendJsonToHostapp(info);
  }
}
