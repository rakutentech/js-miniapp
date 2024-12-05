**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / GalleryManager

# Class: GalleryManager

## Hierarchy

* **GalleryManager**

## Index

### Constructors

* [constructor](gallerymanager.md#constructor)

### Properties

* [executor](gallerymanager.md#executor)
* [platform](gallerymanager.md#platform)

### Methods

* [getImageFromGallery](gallerymanager.md#getimagefromgallery)

## Constructors

### constructor

\+ **new GalleryManager**(`executor`: PlatformExecutor): [GalleryManager](gallerymanager.md)

*Defined in [js-miniapp-bridge/src/modules/gallery-manager.ts:7](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-bridge/src/modules/gallery-manager.ts#L7)*

#### Parameters:

Name | Type |
------ | ------ |
`executor` | PlatformExecutor |

**Returns:** [GalleryManager](gallerymanager.md)

## Properties

### executor

•  **executor**: PlatformExecutor

*Defined in [js-miniapp-bridge/src/modules/gallery-manager.ts:6](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-bridge/src/modules/gallery-manager.ts#L6)*

___

### platform

•  **platform**: string

*Defined in [js-miniapp-bridge/src/modules/gallery-manager.ts:7](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-bridge/src/modules/gallery-manager.ts#L7)*

## Methods

### getImageFromGallery

▸ **getImageFromGallery**(): Promise\<[GalleryFileInfo](../interfaces/galleryfileinfo.md)>

*Defined in [js-miniapp-bridge/src/modules/gallery-manager.ts:19](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-bridge/src/modules/gallery-manager.ts#L19)*

This interface will launch the device gallery that helps the
user to choose a photo and the same will be returned back to the MiniApp

**`see`** {getImageFromGallery}

**Returns:** Promise\<[GalleryFileInfo](../interfaces/galleryfileinfo.md)>
