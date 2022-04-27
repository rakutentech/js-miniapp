import { MiniAppError } from '../../../js-miniapp-bridge/src';
import { getBridge } from '../utils';
import {
  MiniAppSecureStorageKeyValues,
  MiniAppSecureStorageSize,
} from '../../../js-miniapp-bridge/src/types/secure-storage';

interface SecureStorageProvider {
  setItems(items: MiniAppSecureStorageKeyValues): Promise<undefined>;

  getItem(key: string): Promise<string | MiniAppError>;

  removeItems(key: [string]): Promise<undefined | MiniAppError>;

  clear(): Promise<undefined | MiniAppError>;

  size(): Promise<MiniAppSecureStorageSize | MiniAppError>;
}

/** @internal */
export class SecureStorageService {
  setItems(
    items: MiniAppSecureStorageKeyValues
  ): Promise<undefined | MiniAppError> {
    return getBridge().setSecureStorage(items);
  }

  getItem(key: string): Promise<string | MiniAppError> {
    return getBridge().getSecureStorageItem(key);
  }

  removeItems(key: [string]): Promise<undefined | MiniAppError> {
    return getBridge().removeSecureStorageItems(key);
  }

  clear(): Promise<undefined | MiniAppError> {
    return getBridge().clearSecureStorage();
  }

  size(): Promise<MiniAppSecureStorageSize | MiniAppError> {
    return getBridge().getSecureStorageSize();
  }
}
