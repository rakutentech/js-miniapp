import { GalleryFileInfo } from '../../../js-miniapp-bridge/src/types/share-info';
import { getBridge } from '../sdkbridge';

/**
 * Interfaces to communicate with the Host application for gallery-related operations.
 */
export interface GalleryBridgeProvider {
  /**
   * Requests an image from the host application's gallery.
   * @returns A promise that resolves to a GalleryFileInfo object representing the image data.
   */
  getImageFromGallery(): Promise<GalleryFileResponse>;
}

/** @internal */
/**
 * Implementation of the GalleryBridgeProvider interface to interact with the host application.
 */
export class GalleryBridge implements GalleryBridgeProvider {
  async getImageFromGallery(): Promise<GalleryFileResponse> {
    const fileInfo = await getBridge().getImageFromGallery();
    const blob = new Blob([new Uint8Array(fileInfo.data)], {
      type: fileInfo.mimeType,
    });
    return {
      filename: fileInfo.filename,
      data: blob,
    };
  }
}

/**
 * Represents a file in the gallery.
 */
export interface GalleryFileResponse {
  /** The name of the file (optional). */
  filename?: string;
  /** The binary data of the file. */
  data: Blob;
}
