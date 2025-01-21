**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / GalleryBridgeProvider

# Interface: GalleryBridgeProvider

Interfaces to communicate with the Host application for gallery-related operations.

## Hierarchy

* **GalleryBridgeProvider**

## Implemented by

* [GalleryBridge](../classes/gallerybridge.md)

## Index

### Methods

* [getImageFromGallery](gallerybridgeprovider.md#getimagefromgallery)

## Methods

### getImageFromGallery

▸ **getImageFromGallery**(): Promise\<[GalleryFileResponse](galleryfileresponse.md)>

*Defined in [js-miniapp-sdk/src/modules/gallery-manager.ts:12](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-sdk/src/modules/gallery-manager.ts#L12)*

Requests an image from the host application's gallery.

**Returns:** Promise\<[GalleryFileResponse](galleryfileresponse.md)>

A promise that resolves to a GalleryFileInfo object representing the image data.
