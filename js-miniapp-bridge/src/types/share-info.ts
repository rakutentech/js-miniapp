/**
 * Represents the information to be shared.
 */
export interface ShareInfo {
  /** The content to be shared. */
  content: string;
  /** The URL to be shared (optional). */
  url?: string;
  /** A list of image data identifiers (optional). */
  imageData?: number[];
}

/**
 * Represents a file in the gallery.
 */
export interface GalleryFileInfo {
  /** The MIME type of the file (optional). */
  mimeType?: string;
  /** The name of the file (optional). */
  filename?: string;
  /** The binary data of the file. */
  data: number[];
}
