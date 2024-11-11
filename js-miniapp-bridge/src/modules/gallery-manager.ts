import { PlatformExecutor } from '../common-bridge';
import { parseMiniAppError } from '../types/error-types';

export class GalleryManager {
  executor: PlatformExecutor;
  platform: string;

  constructor(executor: PlatformExecutor) {
    this.executor = executor;
    this.platform = executor.getPlatform();
  }

  /**
   * This interface will launch the device gallery that helps the
   * user to choose a photo and the same will be returned back to the MiniApp
   * @see {launchGallery}
   */
  launchGallery() {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'launchGallery',
        null,
        response => {
          resolve(response);
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }
}
