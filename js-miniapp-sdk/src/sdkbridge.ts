import { MiniAppBridge } from '../../js-miniapp-bridge/src';
import { MockBridge } from './mock-bridge';
import { MockMiniAppData } from './mock/mock-miniapp';

export let mockMiniAppData: MockMiniAppData = { isMockEnabled: false };

export function setMockMiniAppData(mockData: MockMiniAppData) {
  mockMiniAppData = mockData;
}

/** @internal */
export function getBridge() {
  // tslint:disable:no-any
  const bridge = (window as any).MiniAppBridge as MiniAppBridge;
  if (
    mockMiniAppData &&
    mockMiniAppData.isMockEnabled &&
    bridge === undefined
  ) {
    const obj: MockBridge = new MockBridge();
    return obj;
  }
  return bridge;
}
