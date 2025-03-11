import { PlatformExecutor } from '../common-bridge';
import { parseMiniAppError } from '../types/error-types';
import { GalleryFileInfo } from '../types/share-info';

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
   * @see {getImageFromGallery}
   */
  getImageFromGallery() {
    return new Promise<GalleryFileInfo>((resolve, reject) => {
      return this.executor.exec(
        'getImageFromGallery',
        null,
        response => {
          resolve(JSON.parse(response) as GalleryFileInfo);
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }
}
