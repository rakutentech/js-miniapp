import { GalleryFileInfo } from '../../../js-miniapp-bridge/src/types/share-info';
import { getBridge } from '../sdkbridge';

/**
 * Interfaces to communicate with the Host application for gallery-related operations.
 */
export interface GalleryBridgeProvider {
  /**
   * Requests an image from the host application's gallery.
   * @returns A promise that resolves to a FileType object representing the image data.
   */
  getImage(): Promise<GalleryFileInfo>;
}

/** @internal */
/**
 * Implementation of the GalleryBridgeProvider interface to interact with the host application.
 */
export class GalleryBridge implements GalleryBridgeProvider {
  /**
   * Requests an image from the host application's gallery.
   * @returns A promise that resolves to a FileType object representing the image data.
   */
  async getImage(): Promise<GalleryFileInfo> {
    const fileTypeObject = await getBridge().getImageFromGallery();
    return fileTypeObject;
  }
}
