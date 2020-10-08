/** @internal */

/**
 * Screen orientation with lock action type.
 */
export enum ScreenAction {
  LOCK_PORTRAIT = 'rakuten.miniapp.screen.lock_portrait',
  LOCK_LANDSCAPE = 'rakuten.miniapp.screen.lock_landscape',
  LOCK_RELEASE = 'rakuten.miniapp.screen.lock_release',
}

export interface Screen {
  action: ScreenAction;
}
