import { UniversalBridgeToHostInfo } from '../../../js-miniapp-bridge/src/types/universal-bridge';
import { getBridge } from '../sdkbridge';

/**
 * Interfaces to communicate with Host application
 */
export interface UniversalBridgeProvider {
  /**
   * Send JSON/String information to HostApp.
   */
  sendJsonToHostapp(info: string): Promise<string>;

  /**
   * Send UniversalBridgeToHostInfo to HostApp.
   */
  sendInfoToHostapp(info: UniversalBridgeToHostInfo): Promise<string>;
}

/** @internal */
export class UniversalBridge implements UniversalBridgeProvider {
  sendJsonToHostapp(info: string): Promise<string> {
    return getBridge().sendJsonToHostapp(info);
  }

  sendInfoToHostapp(info: UniversalBridgeToHostInfo): Promise<string> {
    return getBridge().sendInfoToHostapp(info);
  }
}
