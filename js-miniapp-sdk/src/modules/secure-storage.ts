import { MiniAppError } from '../../../js-miniapp-bridge/src';
import { getBridge } from '../sdkbridge';
import { MiniAppEvents } from '../event-types/index';
import {
  MiniAppSecureStorageKeyValues,
  MiniAppSecureStorageSize,
  MiniAppSecureStorageEvents,
} from '../../../js-miniapp-bridge/src/types/secure-storage';
import { parseMiniAppError } from '../../../js-miniapp-bridge/src/types/error-types';

interface SecureStorageProvider {
  setItems(items: MiniAppSecureStorageKeyValues): Promise<undefined>;

  getItem(key: string): Promise<string>;

  removeItems(key: [string]): Promise<undefined>;

  clear(): Promise<undefined>;

  size(): Promise<MiniAppSecureStorageSize>;

  onReady(): Promise<string>;

  onLoadError(): Promise<string>;
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

  onReady(onReady: () => void) {
    if (getBridge().isSecureStorageReady) {
      onReady();
    } else {
      window.addEventListener(MiniAppSecureStorageEvents.onReady, () => {
        onReady();
      });
    }
  }

  onLoadError(onLoadError: (error: MiniAppError) => void) {
    if (getBridge().secureStorageLoadError) {
      onLoadError(getBridge().secureStorageLoadError);
    } else {
      window.addEventListener(
        MiniAppSecureStorageEvents.onLoadError,
        (e: CustomEvent) => {
          onLoadError(parseMiniAppError(e.detail.message));
        }
      );
    }
  }
}
