import { getBridge } from '../sdkbridge';

/**
 * Interfaces used to store, get and clear miniapp preferences
 */
export interface MiniAppPreferenceProvider {
  /**
   * Store any value for a given key
   */
  set(key: string, value: string): Promise<string>;

  /**
   * Get the value for a given key
   */
  get(key: string): Promise<string>;

  /**
   * Remove value for a given key
   */
  remove(key: string): Promise<string>;

  /**
   * Clear all key/values that is stored for the MiniApp
   */
  clearMiniAppPreferences(): Promise<string>;
}

/** @internal */
export class MiniAppPreference implements MiniAppPreferenceProvider {
  set(key: string, value: string): Promise<string> {
    return getBridge().set(key, value);
  }
  get(key: string): Promise<string> {
    return getBridge().get(key);
  }
  remove(key: string): Promise<string> {
    return getBridge().remove(key);
  }
  clearMiniAppPreferences(): Promise<string> {
    return getBridge().clearMiniAppPreferences();
  }
}
