/**
 * Type used when requesting to set/get multiple key/value pairs using MiniApp.setItems
 */
/* tslint:disable:interface-over-type-literal */
export type MiniAppSecureStorageKeyValues = {
  [key: string]: string;
};

export interface SecureStorageResponseStatus {
  isSuccess: boolean;
  messsage?: string;
}

/* tslint:disable:interface-over-type-literal */
export type MiniAppSecureStorageSize = {
  used: number;
  max: number;
};
