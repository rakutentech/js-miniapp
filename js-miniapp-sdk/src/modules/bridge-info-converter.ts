import { HostEnvironmentInfo } from '../../../js-miniapp-bridge/src';
import { HostBuildType } from '../../../js-miniapp-bridge/src/types/platform';

export class BridgeInfoConverter {
  private static buildTypeMapping: Record<string, HostBuildType>;

  private static initialize() {
    const prodKeyList = ['PRD', 'PROD', 'PRODUCTION', 'RELEASE'];
    const preprodKeyList = ['PRE-PROD', 'PRE-PRODUCTION', 'PREPROD'];
    const stagingKeyList = ['STG', 'STAGING'];
    const qaKeyList = ['QA', 'TESTING'];
    const debugKeyList = ['DEBUG', 'DEV', 'DEVELOPMENT'];
    const customKeyList = ['CUSTOM'];
    BridgeInfoConverter.buildTypeMapping = {
      ...prodKeyList.reduce((acc, key) => {
        acc[key] = HostBuildType.PRODUCTION;
        return acc;
      }, {} as Record<string, HostBuildType>),
      ...preprodKeyList.reduce((acc, key) => {
        acc[key] = HostBuildType.PREPRODUCTION;
        return acc;
      }, {} as Record<string, HostBuildType>),
      ...stagingKeyList.reduce((acc, key) => {
        acc[key] = HostBuildType.STAGING;
        return acc;
      }, {} as Record<string, HostBuildType>),
      ...qaKeyList.reduce((acc, key) => {
        acc[key] = HostBuildType.QA;
        return acc;
      }, {} as Record<string, HostBuildType>),
      ...debugKeyList.reduce((acc, key) => {
        acc[key] = HostBuildType.DEBUG;
        return acc;
      }, {} as Record<string, HostBuildType>),
      ...customKeyList.reduce((acc, key) => {
        acc[key] = HostBuildType.CUSTOM;
        return acc;
      }, {} as Record<string, HostBuildType>),
    };
  }
  static mapStringToHostBuildType(value: string): HostBuildType | undefined {
    if (!BridgeInfoConverter.buildTypeMapping) {
      BridgeInfoConverter.initialize();
    }
    return BridgeInfoConverter.buildTypeMapping[value];
  }
  static convertJsonToPlatformInfo(
    json: HostEnvironmentInfo
  ): HostEnvironmentInfo {
    console.log('convertJsonToPlatformInfo: ', json);
    if (json && json !== undefined) {
      if (json.hostBuildType && json.hostBuildType !== undefined) {
        const convertedValue = BridgeInfoConverter.mapStringToHostBuildType(
          json.hostBuildType.toUpperCase()
        );
        if (convertedValue !== undefined) {
          json.hostBuildType = convertedValue;
          return json;
        } else {
          return json;
        }
      } else {
        return json;
      }
    }
    return json;
  }
}
