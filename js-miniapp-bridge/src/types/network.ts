/** @internal */

/** Network connectivity type reported to MiniApps. */
export enum NetworkType {
  WIFI_OR_ETHERNET = 'WIFI_OR_ETHERNET',
  CELLULAR = 'CELLULAR',
  SATELLITE = 'SATELLITE',
  NO_CONNECTION = 'NO_CONNECTION',
}

/** Network connectivity status reported to MiniApps. */
export interface NetworkStatus {
  networkType: NetworkType;
  isConnected: boolean;
}
