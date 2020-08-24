/**
 * Response from native sdk for ads
 * miniAppId is a GUID string
 * adUnitId is string eg ca-app-pub-7941117952683310/1302674583
 * startTime is ad's load start Time
 * endTime is the ad's unload time
 * provider is the active ad provider network selected
 */
export interface AdResponse {
  miniAppId?: string;
  adUnitId?: string;
  startTime?: Date;
  endTime?: Date;
  adProvider?: string;
}
