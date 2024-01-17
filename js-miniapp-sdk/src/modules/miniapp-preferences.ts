import { getBridge } from '../sdkbridge';

/**
 * Interfaces used to store, get and clear miniapp preferences
 */
export interface MiniAppPreferenceProvider {
  /**
   * Store any value for a given key
   */
  set(key: string, value: string): Promise<boolean>;

  /**
   * Get the value for a given key
   */
  get(key: string): Promise<string>;

  /**
   * Remove value for a given key
   */
  remove(key: string): Promise<boolean>;

  /**
   * Clear all key/values that is stored for the MiniApp
   */
  clearMiniAppPreferences(): Promise<boolean>;
}

/** @internal */
export class MiniAppPreference implements MiniAppPreferenceProvider {
  set(key: string, value: string): Promise<boolean> {
    return getBridge().set(key, value);
  }
  get(key: string): Promise<string> {
    return getBridge().get(key);
  }
  remove(key: string): Promise<boolean> {
    return getBridge().remove(key);
  }
  clearMiniAppPreferences(): Promise<boolean> {
    return getBridge().clearMiniAppPreferences();
  }
}
