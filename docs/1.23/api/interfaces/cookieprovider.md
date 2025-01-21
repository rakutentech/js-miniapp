**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / CookieProvider

# Interface: CookieProvider

Interfaces to retrieve Cookies from Host app

## Hierarchy

* **CookieProvider**

## Index

### Methods

* [getAllCookies](cookieprovider.md#getallcookies)
* [getCookies](cookieprovider.md#getcookies)

## Methods

### getAllCookies

▸ **getAllCookies**(): Promise\<[[CookieInfo](cookieinfo.md)]>

*Defined in [js-miniapp-sdk/src/modules/cookie-manager.ts:12](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-sdk/src/modules/cookie-manager.ts#L12)*

Fetches all cookies from host app.

**Returns:** Promise\<[[CookieInfo](cookieinfo.md)]>

List of Cookies with name and value details

___

### getCookies

▸ **getCookies**(`cookieNameList`: string[]): Promise\<[[CookieInfo](cookieinfo.md)]>

*Defined in [js-miniapp-sdk/src/modules/cookie-manager.ts:18](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-sdk/src/modules/cookie-manager.ts#L18)*

Fetches the cookies for the provided name list

#### Parameters:

Name | Type |
------ | ------ |
`cookieNameList` | string[] |

**Returns:** Promise\<[[CookieInfo](cookieinfo.md)]>

List of Cookies with name and value details
