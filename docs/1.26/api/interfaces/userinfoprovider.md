**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / UserInfoProvider

# Interface: UserInfoProvider

Interfaces to retrieve User profile related information.

## Hierarchy

* **UserInfoProvider**

## Index

### Methods

* [forceLogout](userinfoprovider.md#forcelogout)
* [getAccessToken](userinfoprovider.md#getaccesstoken)
* [getContacts](userinfoprovider.md#getcontacts)
* [getExchangeToken](userinfoprovider.md#getexchangetoken)
* [getPhoneNumber](userinfoprovider.md#getphonenumber)
* [getPoints](userinfoprovider.md#getpoints)
* [getProfilePhoto](userinfoprovider.md#getprofilephoto)
* [getUserName](userinfoprovider.md#getusername)
* [isLoggedIn](userinfoprovider.md#isloggedin)
* [triggerLoginUI](userinfoprovider.md#triggerloginui)

## Methods

### forceLogout

▸ **forceLogout**(): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/user-info.ts:73](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/user-info.ts#L73)*

Send a signal to native application to force a logout

**Returns:** Promise\<boolean>

true if logout is successful

___

### getAccessToken

▸ **getAccessToken**(`audience`: string, `scopes`: string[]): Promise\<[AccessTokenData](../classes/accesstokendata.md) \| [MiniAppError](../classes/miniapperror.md)>

*Defined in [js-miniapp-sdk/src/modules/user-info.ts:41](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/user-info.ts#L41)*

Fetches the access token from host app.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`audience` | string | one of the audiences provided in MiniApp manifest |
`scopes` | string[] | scopes array associated to the audience |

**Returns:** Promise\<[AccessTokenData](../classes/accesstokendata.md) \| [MiniAppError](../classes/miniapperror.md)>

Access token from native host app.

___

### getContacts

▸ **getContacts**(): Promise\<[Contact](contact.md)[]>

*Defined in [js-miniapp-sdk/src/modules/user-info.ts:33](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/user-info.ts#L33)*

Fetches the contact list from host app.
You should request the [CustomPermissionName.CONTACT_LIST](../enums/custompermissionname.md#contact_list) permission before using this method.

**Returns:** Promise\<[Contact](contact.md)[]>

Contact list in the host app user profile.

___

### getExchangeToken

▸ **getExchangeToken**(`audience`: string, `scopes`: string[]): Promise\<[AccessTokenData](../classes/accesstokendata.md) \| [MiniAppError](../classes/miniapperror.md)>

*Defined in [js-miniapp-sdk/src/modules/user-info.ts:81](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/user-info.ts#L81)*

Fetches the exchange token from host app.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`audience` | string | one of the audiences provided in MiniApp manifest |
`scopes` | string[] | scopes array associated to the audience |

**Returns:** Promise\<[AccessTokenData](../classes/accesstokendata.md) \| [MiniAppError](../classes/miniapperror.md)>

Exchange token from native host app.

___

### getPhoneNumber

▸ **getPhoneNumber**(): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/user-info.ts:56](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/user-info.ts#L56)*

Fetches the Phone number of the user.

**Returns:** Promise\<string>

Phone number saved in the host app user profile.

___

### getPoints

▸ **getPoints**(): Promise\<[Points](points.md)>

*Defined in [js-miniapp-sdk/src/modules/user-info.ts:50](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/user-info.ts#L50)*

Fetches the points from host app.

**Returns:** Promise\<[Points](points.md)>

Points from native host app.

___

### getProfilePhoto

▸ **getProfilePhoto**(): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/user-info.ts:26](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/user-info.ts#L26)*

Fetches the profile photo URI from host app.
You should request the [CustomPermissionName.PROFILE_PHOTO](../enums/custompermissionname.md#profile_photo) permission before using this method.

**Returns:** Promise\<string>

Profile photo saved in the host app user profile.

___

### getUserName

▸ **getUserName**(): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/user-info.ts:19](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/user-info.ts#L19)*

Fetches the username from host app.
You should request the [CustomPermissionName.USER_NAME](../enums/custompermissionname.md#user_name) permission before using this method.

**Returns:** Promise\<string>

Username saved in the host app user profile.

___

### isLoggedIn

▸ **isLoggedIn**(): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/user-info.ts:61](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/user-info.ts#L61)*

Fetches the current login status of the user

**Returns:** Promise\<boolean>

___

### triggerLoginUI

▸ **triggerLoginUI**(): Promise\<boolean \| [MiniAppError](../classes/miniapperror.md)>

*Defined in [js-miniapp-sdk/src/modules/user-info.ts:67](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/user-info.ts#L67)*

Triggers the login UI in the host app.

**Returns:** Promise\<boolean \| [MiniAppError](../classes/miniapperror.md)>

A promise that resolves to true if the login was successful, false otherwise.
