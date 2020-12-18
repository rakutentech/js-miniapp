[js-miniapp-sdk](../README.md) › [UserInfoProvider](userinfoprovider.md)

# Interface: UserInfoProvider

Interfaces to retrieve User profile related information.

## Hierarchy

* **UserInfoProvider**

## Index

### Methods

* [getAccessToken](userinfoprovider.md#getaccesstoken)
* [getContacts](userinfoprovider.md#getcontacts)
* [getProfilePhoto](userinfoprovider.md#getprofilephoto)
* [getUserName](userinfoprovider.md#getusername)

## Methods

###  getAccessToken

▸ **getAccessToken**(): *Promise‹[AccessTokenData](../classes/accesstokendata.md)›*

Defined in js-miniapp-sdk/src/miniapp.ts:147

Fetches the access token from host app.

**Returns:** *Promise‹[AccessTokenData](../classes/accesstokendata.md)›*

Access token from native host app.

___

###  getContacts

▸ **getContacts**(): *Promise‹[Contact](contact.md)[]›*

Defined in js-miniapp-sdk/src/miniapp.ts:141

Fetches the contact list from host app.
You should request the [CustomPermissionName.CONTACT_LIST](../enums/custompermissionname.md#contact_list) permission before using this method.

**Returns:** *Promise‹[Contact](contact.md)[]›*

Contact list in the host app user profile.

___

###  getProfilePhoto

▸ **getProfilePhoto**(): *Promise‹string›*

Defined in js-miniapp-sdk/src/miniapp.ts:134

Fetches the profile photo URI from host app.
You should request the [CustomPermissionName.PROFILE_PHOTO](../enums/custompermissionname.md#profile_photo) permission before using this method.

**Returns:** *Promise‹string›*

Profile photo saved in the host app user profile.

___

###  getUserName

▸ **getUserName**(): *Promise‹string›*

Defined in js-miniapp-sdk/src/miniapp.ts:127

Fetches the username from host app.
You should request the [CustomPermissionName.USER_NAME](../enums/custompermissionname.md#user_name) permission before using this method.

**Returns:** *Promise‹string›*

Username saved in the host app user profile.
