import { getBridge } from '../sdkbridge';

/**
 * Interfaces to communicate with the Host application for gallery-related operations.
 */
export interface GalleryBridgeProvider {
  /**
   * Requests an image from the host application's gallery.
   * @returns A promise that resolves to a Blob representing the image data.
   */
  getImage(): Promise<Blob>;
}

/** @internal */
/**
 * Implementation of the GalleryBridgeProvider interface to interact with the host application.
 */
export class GalleryBridge implements GalleryBridgeProvider {
  /**
   * Requests an image from the host application's gallery.
   * @returns A promise that resolves to a Blob representing the image data.
   */
  async getImage(): Promise<Blob> {
    const base64String = await getBridge().getImageFromGallery();
    const [mimeType, base64Data] = base64String.split(';base64,');
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }
}
