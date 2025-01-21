**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / UserProfileManager

# Class: UserProfileManager

Manages user profile related operations.

## Hierarchy

* **UserProfileManager**

## Index

### Constructors

* [constructor](userprofilemanager.md#constructor)

### Properties

* [executor](userprofilemanager.md#executor)
* [platform](userprofilemanager.md#platform)

### Methods

* [isLoggedIn](userprofilemanager.md#isloggedin)
* [triggerLoginUI](userprofilemanager.md#triggerloginui)

## Constructors

### constructor

\+ **new UserProfileManager**(`executor`: PlatformExecutor): [UserProfileManager](userprofilemanager.md)

*Defined in [js-miniapp-bridge/src/modules/userprofile-manager.ts:9](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-bridge/src/modules/userprofile-manager.ts#L9)*

Creates an instance of UserProfileManager.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`executor` | PlatformExecutor | The executor to run platform-specific code.  |

**Returns:** [UserProfileManager](userprofilemanager.md)

## Properties

### executor

•  **executor**: PlatformExecutor

*Defined in [js-miniapp-bridge/src/modules/userprofile-manager.ts:8](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-bridge/src/modules/userprofile-manager.ts#L8)*

___

### platform

•  **platform**: string

*Defined in [js-miniapp-bridge/src/modules/userprofile-manager.ts:9](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-bridge/src/modules/userprofile-manager.ts#L9)*

## Methods

### isLoggedIn

▸ **isLoggedIn**(): Promise\<boolean>

*Defined in [js-miniapp-bridge/src/modules/userprofile-manager.ts:25](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-bridge/src/modules/userprofile-manager.ts#L25)*

Checks if the user is logged in.

**`see`** {isLoggedIn}

**Returns:** Promise\<boolean>

A promise that resolves to a boolean indicating the login status.

___

### triggerLoginUI

▸ **triggerLoginUI**(): Promise\<boolean>

*Defined in [js-miniapp-bridge/src/modules/userprofile-manager.ts:43](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-bridge/src/modules/userprofile-manager.ts#L43)*

Triggers the login UI for the user.

**`see`** {triggerLoginUI}

**Returns:** Promise\<boolean>

A promise that resolves to a boolean indicating whether the login UI was successfully triggered.
