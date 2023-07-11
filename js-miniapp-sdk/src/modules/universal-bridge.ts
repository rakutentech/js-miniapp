import { UniversalBridgeInfo } from '../../../js-miniapp-bridge/src/types/universal-bridge';
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
   * Send UniversalBridgeInfo to HostApp.
   */
  sendInfoToHostapp(info: UniversalBridgeInfo): Promise<string>;
}

/** @internal */
export class UniversalBridge implements UniversalBridgeProvider {
  sendJsonToHostapp(info: string): Promise<string> {
    return getBridge().sendJsonToHostapp(info);
  }

  sendInfoToHostapp(info: UniversalBridgeInfo): Promise<string> {
    return getBridge().sendInfoToHostapp(info);
  }
}
