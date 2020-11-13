[js-miniapp-bridge - v1.1.0](../README.md) › [UserInfoProvider](userinfoprovider.md)

# Interface: UserInfoProvider

Interfaces to retrieve User profile related information.

## Hierarchy

* **UserInfoProvider**

## Index

### Methods

* [getAccessToken](userinfoprovider.md#getaccesstoken)
* [getProfilePhoto](userinfoprovider.md#getprofilephoto)
* [getUserName](userinfoprovider.md#getusername)

## Methods

###  getAccessToken

▸ **getAccessToken**(): *Promise‹[AccessTokenData](../classes/accesstokendata.md)›*

*Defined in [js-miniapp-sdk/src/miniapp.ts:111](https://github.com/rakutentech/js-miniapp/blob/1e2f55c/js-miniapp-sdk/src/miniapp.ts#L111)*

**Returns:** *Promise‹[AccessTokenData](../classes/accesstokendata.md)›*

Access token from native hostapp.

___

###  getProfilePhoto

▸ **getProfilePhoto**(): *Promise‹string›*

*Defined in [js-miniapp-sdk/src/miniapp.ts:106](https://github.com/rakutentech/js-miniapp/blob/1e2f55c/js-miniapp-sdk/src/miniapp.ts#L106)*

**Returns:** *Promise‹string›*

Profile photo saved in the host app user profile.

___

###  getUserName

▸ **getUserName**(): *Promise‹string›*

*Defined in [js-miniapp-sdk/src/miniapp.ts:101](https://github.com/rakutentech/js-miniapp/blob/1e2f55c/js-miniapp-sdk/src/miniapp.ts#L101)*

**Returns:** *Promise‹string›*

Username saved in the host app user profile.
