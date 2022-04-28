import { MiniAppError } from '../../../js-miniapp-bridge/src';
import { getBridge } from '../utils';
import {
  MiniAppSecureStorageKeyValues,
  MiniAppSecureStorageSize,
} from '../../../js-miniapp-bridge/src/types/secure-storage';

interface SecureStorageProvider {
  setItems(items: MiniAppSecureStorageKeyValues): Promise<undefined>;

  getItem(key: string): Promise<string>;

  removeItems(key: [string]): Promise<undefined>;

  clear(): Promise<undefined>;

  size(): Promise<MiniAppSecureStorageSize>;
}

/** @internal */
export class SecureStorageService {
  setItems(items: MiniAppSecureStorageKeyValues): Promise<undefined> {
    return getBridge().setSecureStorage(items);
  }

  getItem(key: string): Promise<string> {
    return getBridge().getSecureStorageItem(key);
  }

  removeItems(key: [string]): Promise<undefined> {
    return getBridge().removeSecureStorageItems(key);
  }

  clear(): Promise<undefined> {
    return getBridge().clearSecureStorage();
  }

  size(): Promise<MiniAppSecureStorageSize> {
    return getBridge().getSecureStorageSize();
  }
}
