/** @internal */

/** Device platform. */
export enum Platform {
  ANDROID = 'Android',
  IOS = 'iOS',
  ELECTRON = 'Electron',
}

/** Device Build Types. */
export enum HostBuildType {
  DEBUG = 'DEBUG',
  STAGING = 'STAGING',
  QA = 'QA',
  CUSTOM = 'CUSTOM',
  PREPRODUCTION = 'PRE-PRODUCTION',
  PRODUCTION = 'PRODUCTION',
}
