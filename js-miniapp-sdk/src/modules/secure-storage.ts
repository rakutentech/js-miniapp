import { MiniAppError } from '../../../js-miniapp-bridge/src';
import { getBridge } from '../utils';
import {
  MiniAppSecureStorageKeyValues,
  SecureStorageResponseStatus,
  MiniAppSecureStorageSize,
} from '../../../js-miniapp-bridge/src/types/secure-storage';

interface SecureStorageProvider {
  setItems(
    items: MiniAppSecureStorageKeyValues
  ): Promise<SecureStorageResponseStatus>;

  getItem(key: string): Promise<string | MiniAppError>;

  removeItems(
    key: [string]
  ): Promise<SecureStorageResponseStatus | MiniAppError>;

  clear(): Promise<SecureStorageResponseStatus | MiniAppError>;

  size(): Promise<MiniAppSecureStorageSize | MiniAppError>;
}

/** @internal */
export class SecureStorageService {
  setItems(
    items: MiniAppSecureStorageKeyValues
  ): Promise<SecureStorageResponseStatus | MiniAppError> {
    return getBridge().setSecureStorage(items);
  }

  getItem(key: string): Promise<string | MiniAppError> {
    return getBridge().getSecureStorageItem(key);
  }

  removeItems(
    key: [string]
  ): Promise<SecureStorageResponseStatus | MiniAppError> {
    return getBridge().removeSecureStorageItems(key);
  }

  clear(): Promise<SecureStorageResponseStatus | MiniAppError> {
    return getBridge().clearSecureStorage();
  }

  size(): Promise<MiniAppSecureStorageSize | MiniAppError> {
    return getBridge().getSecureStorageSize();
  }
}
