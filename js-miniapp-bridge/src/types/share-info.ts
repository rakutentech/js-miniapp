/**
 * Shared info.
 * Represents the information to be shared.
 */
export interface ShareInfo {
  /** The content to be shared. */
  content: string;
  /** The URL to be shared (optional). */
  url?: string;
  /** A list of file identifiers (optional). */
  fileList?: number[][];
}

/**
 * Represents a file in the gallery.
 */
export interface GalleryFileInfo {
  /** The type of the file (optional). */
  mimeType?: string;
  /** The binary data of the file. */
  blob: Blob;
}
