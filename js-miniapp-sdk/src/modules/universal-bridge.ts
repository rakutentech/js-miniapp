import { getBridge } from '../utils';

/**
 * Interfaces to send and receive json string information to/from Host app.
 */
export interface UniversalBridgeProvider {
  /**
   * send json string information to HostApp.
   */
  sendJsonToHostapp(info: string): Promise<string>;
}

/** @internal */
export class UniversalBridge implements UniversalBridgeProvider {
  sendJsonToHostapp(info: string): Promise<string> {
    return getBridge().sendJsonToHostapp(info);
  }
}