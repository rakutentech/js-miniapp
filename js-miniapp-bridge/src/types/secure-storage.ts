/**
 * Type used when requesting to set/get multiple key/value pairs using MiniApp.setItems
 */
/* tslint:disable:interface-over-type-literal */
export type MiniAppSecureStorageKeyValues = {
  [key: string]: string;
};

/* tslint:disable:interface-over-type-literal */
export type MiniAppSecureStorageSize = {
  used: number;
  max: number;
};

export enum MiniAppSecureStorageEvents {
  onReady = 'miniappsecurestorageready',
  onLoadError = 'miniappsecurestorageloaderror',
}
