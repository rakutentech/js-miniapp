/**
 * A module layer for webapps and mobile native interaction.
 */
interface MiniApp {
  /** @returns The Promise of provided id of mini app from injected side. */
  getUniqueId(): Promise<string>;
  /** @returns The Promise of permission result of mini app from injected side. */
  requestPermission(permissionType: string): Promise<string>;
}

/** @internal */
/* tslint:disable:no-any */
export class MiniAppImp implements MiniApp {
  getUniqueId(): Promise<string> {
    return (window as any).MiniAppBridge.getUniqueId();
  }

  requestPermission(permissionType: string): Promise<string> {
    return (window as any).MiniAppBridge.requestPermission(permissionType);
  }
}
