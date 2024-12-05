# Mini App JS SDK

The Mini App SDK for JavaScript can be used to access Android/iOS device and App specific features from a Mini App. It is intended to be used in conjunction with the [Android Mini App SDK](https://github.com/rakutentech/android-miniapp) and [iOS Mini App SDK](https://github.com/rakutentech/ios-miniapp).

[JS SDK Developer documentation](https://rakutentech.github.io/js-miniapp/docs/1.20/)

## Table of Contents
{:.no_toc}

* Table of contents
{:toc}


## Getting Started

<dl>
<dd>

This SDK can be used either as an NPM module or via the bundled script file.

### Usage as NPM module

The SDK package can be installed in your project from the NPM registry:

```
npm install js-miniapp-sdk
```

And then it can be used as an import in your project:

```javascript
import MiniApp from "js-miniapp-sdk";

MiniApp.getMessagingUniqueId()
    .then(id => {
    // ...
```

### Usage via bundled script

You can alternatively use the bundled script file to use the SDK. When using the bundled script file, a global `MiniApp` object will be available for using the SDK.

First, download the bundled script file from the [releases page](https://github.com/rakutentech/js-miniapp/releases). You can then include it as a normal `<script>` tag in your HTML:

```html
<script src="miniapp.bundle.js"></script>
```

Then you can acces the SDK methods via `window.MiniApp.default`.

```javascript
window.MiniApp.default.getMessagingUniqueId()
    .then(id => {
    // ...
```
</dd>


## Mini App Manifest

<dl>
<dd>

There is a manifest for each mini app. The manifest provides the info for Android/iOS SDK to handle the mini app so the mini app developer should understand the structure and data type of manifest.

The manifest contains:

- Required permissions
- Optional permissions
- Access token permissions
- Custom metadata

Here is the example of manifest. You can also see [it](https://github.com/rakutentech/js-miniapp/blob/master/js-miniapp-sample/public/manifest.json) in our sample app.

```javascript
{
  // The mini app should use "reqPermissions" for setting which permissions it requires.
  // These permissions will be requested by the host app before launching and downloading the mini app.
  // The user MUST accept these permissions before the mini app can be launched.
  "reqPermissions": [
    {
      "name": "rakuten.miniapp.user.USER_NAME",
      "reason": "Describe your reason here (optional)."
    },
    {
      "name": "rakuten.miniapp.user.PROFILE_PHOTO",
      "reason": "Describe your reason here (optional)."
    }
  ],
  // The mini app should use "optPermissions" for setting which permissions it will optionally use.
  // These permissions will be requested by the host app before launching and downloading the mini app.
  // The user can choose to either accept or deny these permissions before the mini app is launched.
  "optPermissions": [
    {
      "name": "rakuten.miniapp.user.CONTACT_LIST",
      "reason": "Describe your reason here (optional)."
    },
    {
      "name": "rakuten.miniapp.device.LOCATION",
      "reason": "Describe your reason here (optional)."
    }
  ],
  // For access tokens, can define which "audience" and "scopes" you would like permission to use
  "accessTokenPermissions": [
    {
      "audience": "rae",
      "scopes": ["idinfo_read_openid", "memberinfo_read_point"]
    },
    {
      "audience": "api-c",
      "scopes": ["your_service_scope_here"]
    }
  ],
  // The Host App can require additional keys that the mini app developer must set
  "customMetaData": {
    "exampleKey": "test"
  }
}
```
</dd>


## Mini App Features

- [Retrieve a unique ID](#retrieve-a-unique-id)
- [Get Phone Number](#get-phone-number)
- [Request Permissions](#request-permissions)
- [Show Ads](#show-ads)
- [Share info](#share-info)
- [Events](#mini-app-events)
- [Requesting User details](#requesting-user-details)
- [Set Screen orientation](#set-screen-orientation)
- [Send Message](#send-message)
- [Set Close alert info](#set-close-alert)
- [Universal Bridge](#universal-bridge)
- [Close Mini app](#close-miniapp)
- [In-App Purchases](#in-app-purchases)
- [Get Points](#get-points)
- [Check Platform - Android/iOS](#get-platform)
- [Host Environment Info](#get-host-info)
- [Download file](#download-file)
- [Secure storage](#secure-storage)
- [Host app theme colors](#host-theme-colors)
- [isDarkMode](#dark-mode)
- [Send Analytics](#send-analytics)
- [Get Cookies](#get-cookies)
- [MiniApp Storage](#miniapp-storage)
- [MiniApp Finished Loading](#miniapp-finished-loading)
- [Get Feature list](#get-feature-list)
- [Can open App Deeplink](#can-open-app-deeplink)
- [App supports deeplink](#is-app-deeplink-supported)
- [Launch Internal browser](#launch-internal-browser)
- [Launch External browser](#launch-external-browser)
- [Get Image from Gallery](#get-image-from-gallery)
- [Enable/Disable Navigation Gestures](#enable-disable-navigation-gestures)
- [Get User Login status](#is-loggedIn)

## User details

### Retrieve a unique ID

<dl>
<dl>

1. getUniqueId() - This method is deprecated from 2.0 and renamed to getMauid()

    **API:** [MiniAppFeatures.getUniqueId](api/interfaces/miniappfeatures.md#getuniqueid)

    You can retrieve a unique ID which was generated by the Android or iOS App to represent the user of the mini app:

    ```javascript
    import MiniApp from 'js-miniapp-sdk';

    MiniApp
      .getUniqueId()
      .then(id => {
        console.log(id);
      })
      .catch(error => {
        console.error(error);
      });
    ```
    
2. getMauid() - This method is replaced with the getUniqueId()

    **API:** [MiniAppFeatures.getmauid](api/interfaces/miniappfeatures.md#getmauid)

    You can retrieve a unique ID which was generated by the Android or iOS App to represent the user of the mini app:

    ```javascript
    import MiniApp from 'js-miniapp-sdk';

    MiniApp
      .getMauid()
      .then(id => {
        console.log(id);
      })
      .catch(error => {
        console.error(error);
      });
    ```

3. getMessagingUniqueId() - This method is used to retrieve a Unqiue ID that can be used for messages. 

    **API:** [MiniAppFeatures.getmessaginguniqueid](api/interfaces/miniappfeatures.md#getmessaginguniqueid)


    ```javascript
    import MiniApp from 'js-miniapp-sdk';

    MiniApp
      .getMauid()
      .then(id => {
        console.log(id);
      })
      .catch(error => {
        console.error(error);
      });
    ```

<div id='get-phone-number'/>
3. getPhoneNumber() - This method is used to retrieve phone number of the user. 

    **API:** [MiniAppFeatures.getphonenumber](api/interfaces/miniappfeatures.md#getphonenumber)

    ```javascript
    import MiniApp from 'js-miniapp-sdk';

    MiniApp.user
      .getPhoneNumber()
      .then(number => {
        console.log(number);
      })
      .catch(error => {
        console.error(error);
      });
    ```

</dd>

## Request Permissions

<dl>
<dl>

There must be permission requests from miniapp to access some mobile components and data. Users can revoke a permission at any time, so you must always request the permission every time before you use the associated API. Note that accepted permissions are cached, so if a User has already accepted a permission then they will not be shown the permission dialog again unless they manually revoke the permission.

There are two types of permissions:

- [**Custom permissions:**](#custom-permissions) Access User data or device features which the Host App controls. Displays Host App's custom permission dialog.
- [**Device permissions:**](#device-permissions) Access device features. Displays Android/iOS platform permission dialog.

Mini app developer can define which permissions are required and optional in mini app manifest. You do not need to request permission when declaring them as required type.

#### Custom Permissions

**API:** [MiniAppFeatures.requestCustomPermissions](api/interfaces/miniappfeatures.md#requestcustompermissions),
[CustomPermissionName](api/enums/custompermissionname.md),
[CustomPermissionStatus](api/enums/custompermissionstatus.md)

These permissions are related to accessing the User data or device features which the Host App controls, and the Host App will display a custom permission dialog. Multiple permissions can be requested at once. These permissions should be requested before you attempt to access the User's data or certain device features.

These permissions are requested using the [MiniAppFeatures.requestCustomPermissions](api/interfaces/miniappfeatures.md#requestcustompermissions) method.

| Permission Name                      | Description                                                     |
| ------------------------------------ | --------------------------------------------------------------- |
| `CustomPermissionName.USER_NAME`     | Grant access to the User's name.                                |
| `CustomPermissionName.PROFILE_PHOTO` | Grant access to the user's Profile Photo.                       |
| `CustomPermissionName.CONTACT_LIST`  | Grant access to the user's contact list.                        |
| `CustomPermissionName.ACCESS_TOKEN`  | Grant access to the a user's access token.                      |
| `CustomPermissionName.LOCATION`      | Grant access to the device's location (custom permission only). |
| `CustomPermissionName.SEND_MESSAGE`  | Allow miniapp to send message to specific contact via hostapp.  |
| `CustomPermissionName.POINTS`        | Allow miniapp to retrieve points.                               |
| `CustomPermissionName.FILE_DOWNLOAD` | Allow miniapp to download files.                                |

##### Usage example

```javascript
import MiniApp, {
  CustomPermissionResult,
  CustomPermissionName,
} from 'js-miniapp-sdk';

MiniApp
  .requestCustomPermissions([
    {
      name: CustomPermissionName.USER_NAME,
      description: 'This text will be shown to the user.',
    },
    {
      name: CustomPermissionName.PROFILE_PHOTO,
      description: 'This text will be shown to the user.',
    },
    {
      name: CustomPermissionName.CONTACT_LIST,
      description: 'This text will be shown to the user.',
    },
    {
      name: CustomPermissionName.ACCESS_TOKEN,
      description: 'This text will be shown to the user.',
    },
    {
      name: CustomPermissionName.LOCATION,
      description: 'This text will be shown to the user.',
    },
    {
      name: CustomPermissionName.SEND_MESSAGE,
      description: 'This text will be shown to the user.',
    },
    {
      name: CustomPermissionName.POINTS,
      description: 'This text will be shown to the user.',
    },
    {
      name: CustomPermissionName.FILE_DOWNLOAD,
      description: 'This text will be shown to the user.',
    },
  ])
  .then(result => {
    const allowed = result
      .filter(
        permission => permission.status === CustomPermissionResult.ALLOWED
      )
      .map(permission => permisssion.name);

    if (allowed.indexOf(CustomPermissionName.USER_NAME) > -1) {
      // Access and use the User Name data
    }
  })
  .catch(error => {
    console.error(error); // An error occured
  });
```

#### Device Permissions

**API:** [MiniAppFeatures.requestLocationPermission](api/interfaces/miniappfeatures.md#requestlocationpermission)

These permissions are for accessing device features, and they will display a platform-specific dialog which is controlled by the Android or iOS operating system. Device permissions can only be requested one at a time.

Each device permission is requested using a specific method for that permission. Device permissions also have an associated [Custom permissions](#custom-permissions), so you should first request the custom permission before requesting the device permission. However, if you did not request the custom permission first, then the method will automatically request the custom permission from the user.

| Permission Method                                                                          | Description                                                                       |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| [`requestLocationPermission`](api/interfaces/miniappfeatures.md#requestlocationpermission) | Grant access to the device location (both device permission & custom permission). |

##### Usage example

```javascript
// Location Permission
import MiniApp from 'js-miniapp-sdk';

MiniApp
  .requestLocationPermission('This description will be shown to the user.')
  .then(success => {
    console.log(success); // Allowed.
  })
  .catch(error => {
    console.error(error); // Permission is not granted due to many circumstances.
  });
```


</dd>

## Show Ads

<dl>
<dd>

**API:** [Ad.loadInterstitialAd](api/interfaces/ad.md#loadinterstitialad),
[Ad.loadRewardedAd](api/interfaces/ad.md#loadrewardedad),
[Ad.showInterstitialAd](api/interfaces/ad.md#showinterstitialad),
[Ad.showRewardedAd](api/interfaces/ad.md#showrewardedad),
[Reward](api/interfaces/reward.md)

Mini App SDK allows you to display ads upon requesting from a Mini App with an ad unit id.
This requires you to first load an Ad by passing an ID. You can then display an Ad in the Ad Unit by passing the same ID which was used for loading.

Note that typically you should load your Ads at some point earlier than you intend to use them, such as at App launch time. You can also pre-load multiple Ads by calling `MiniApp.loadInterstialAd` or `MiniApp.loadRewardedAd` multiple times.

Currently two ad types are supported,

1. Interstitial
2. Rewarded

```javascript
import MiniApp from 'js-miniapp-sdk';

const adUnitID = 'xxx-xxx-xxxxxxxxxxxxx';

MiniApp
  .loadInterstitialAd(adUnitID)
  .then(response => {
    MiniApp
      .showInterstitialAd(adUnitID)
      .then(response => console.log(response))
      .catch(error => console.error(response));
  })
  .catch(error => console.error(response));
```

```javascript
import MiniApp from 'js-miniapp-sdk';

const adUnitID = 'xxx-xxx-xxxxxxxxxxxxx';

MiniApp
  .loadRewardedAd(adUnitID)
  .then(response => {
    MiniApp
      .showRewardedAd(adUnitID)
      .then(response => console.log(response))
      .catch(error => console.error(response));
  })
  .catch(error => console.error(response));
```

</dd>

## Events

Mini app can listen to the following events that will be sent/triggered by the Hostapp/Native SDKs to Mini app.
<dl>
<dd>

### Mini App Events

**API:** [MiniAppEvents](api/enums/MiniAppEvents.md)

These `MiniAppEvents` events are more live Mini app life cycle events that will be broadcast when a event occurs

- EXTERNAL_WEBVIEW_CLOSE
- PAUSE
- RESUME

  <details><summary markdown="span" padding-right=""><b>Click here to see the Code snippet</b>
  </summary>

  ```javascript
  window.addEventListener(MiniAppEvents.EXTERNAL_WEBVIEW_CLOSE, function (e) {
    // To-do
  });
  ```

  </details>

### Keyboard events
**API:** [MiniAppKeyboardEvents](api/enums/MiniAppKeyboardEvents.md)

These `MiniAppKeyboardEvents` events will be triggered when a keyboard is shown or dismissed

- KEYBOARDSHOWN
- KEYBOARDHIDDEN

  <details><summary markdown="span" padding-right=""><b>Click here to see the Code snippet</b>
  </summary>

  ```javascript
  import MiniApp from 'js-miniapp-sdk';

  window.addEventListener(MiniAppKeyboardEvents.KEYBOARDSHOWN, function (e) {
    // To-do
  });
  ```

  </details>

### Host app events <small style="color:green;font-size: 12px">Available from v1.16.0</small>
**API:** [HostAppEvents](api/enums/HostAppEvents.md)

These `HostAppEvents` will be triggered when the host app wants to notify something to the Mini app

- RECEIVE_JSON_INFO

  <details><summary markdown="span" padding-right=""><b>Click here to see the Code snippet</b>
  </summary>

  ```javascript
  import MiniApp from 'js-miniapp-sdk';

  window.addEventListener(MiniAppKeyboardEvents.RECEIVE_JSON_INFO, function (e) {
    // To-do
  });
  ```

  </details>

</dd>


## Share Info

<dl>
<dd>

**API:** [MiniAppFeatures.shareInfo](api/interfaces/miniappfeatures.md#shareinfo),

[ShareInfoType](api/interfaces/shareinfotype.md)

It is possible for the mini app user to share data with another App by showing the native content sharing chooser.

The data format must match the [ShareInfoType](api/interfaces/shareinfotype.md).

NOTE: URL & Image support is added from v1.22.0

```javascript
import MiniApp from 'js-miniapp-sdk';

const info = {
  content: inputValue,
  url: url,
  imageBlob: blob,
};

MiniApp
  .shareInfo(info)
  .then(success => console.log(success))
  .catch(error => console.error(error));
```
</dd>


## Requesting User details

<dl>
<dd>

**API:** [UserInfoProvider](api/interfaces/userinfoprovider.md)

Please make sure that User have allowed respective custom permission before requesting the user detail.

#### User name

**API:** [UserInfoProvider.getUserName](api/interfaces/userinfoprovider.md#getusername),
[CustomPermissionName.USER_NAME](api/enums/custompermissionname.html#user_name)

Returns the Username text from the Host app.

```javascript
import MiniApp from 'js-miniapp-sdk';

MiniApp.user
  .getUserName()
  .then(userName => {
    console.log(userName);
  })
  .catch(error => {
    console.error(error);
  });
```

#### Profile Photo

**API:** [UserInfoProvider.getProfilePhoto](api/interfaces/userinfoprovider.md#getprofilephoto),
[CustomPermissionName.PROFILE_PHOTO](api/enums/custompermissionname.html#profile_photo)

Returns the Profile Photo URI from the Host app.

```javascript
import MiniApp from 'js-miniapp-sdk';

MiniApp.user
  .getProfilePhoto()
  .then(profilePhoto => {
    console.log(profilePhoto);
  })
  .catch(error => {
    console.error(error);
  });
```

#### Contact List

**API:** [UserInfoProvider.getContacts](api/interfaces/userinfoprovider.md#getcontacts),
[Contact](api/interfaces/contact.md),
[CustomPermissionName.CONTACT_LIST](api/enums/custompermissionname.html#contact_list)

Returns the [Contact](api/interfaces/contact.md) list from the Host app.

```javascript
import MiniApp from 'js-miniapp-sdk';

MiniApp.user
  .getContacts()
  .then(contacts => {
    console.log(contacts);
  })
  .catch(error => {
    console.error(error);
  });
```

#### Access Token

**API:** [UserInfoProvider.getAccessToken](api/interfaces/userinfoprovider.md#getaccesstoken),
[AccessTokenData](api/classes/accesstokendata.md),
[AccessTokenScopes](api/classes/accesstokenscopes.md),
[CustomPermissionName.ACCESS_TOKEN](api/enums/custompermissionname.html#access_token)

You can get an access token provided by the Host App.

There are 2 reasons your access token request can be rejected:

- The Host App will be able to deny your request if your mini app ID is not approved to access the token.
- Your request will also be denied by the MiniApp SDK if your audience and scopes do not match the ones defined in the [Mini App Manifest](#mini-app-manifest)

Returns the [AccessTokenData](api/interfaces/accesstokendata.md) list from the Host app.

**AccessTokenData** contains `token`,`validUntil` and `scopes` details.

```javascript
import MiniApp from 'js-miniapp-sdk';

MiniApp.user
  .getAccessToken('TOKEN_AUDIENCE', ['TOKEN_SCOPE1', 'TOKEN_SCOPE2'])
  .then(data => {
    const isValid = data.validUntil.getTime() >= Date.now();
    if (isValid) {
      const token = data.token;
      // Use token
    }
  })
  .catch(error => console.error(error));
```
</dd>


## Set screen orientation

<dl>
<dd>

**API:** [MiniAppFeatures.setScreenOrientation](api/interfaces/miniappfeatures.md#setscreenorientation),
[ScreenOrientation](api/enums/screenorientation.md)

It is possible to change and lock device screen orientation.
However, there is no guarantee that all hostapps and device OS allow the force screen change so MiniApp should not rely on this.

The support screen change cases are defined as [ScreenOrientation](api/enums/screenorientation.md).
After finish locking, the miniapp can release the lock and grant back the normal orientation controller to device. Please use `ScreenOrientation.LOCK_RELEASE`

```javascript
import MiniApp from 'js-miniapp-sdk';

MiniApp
  .setScreenOrientation(ScreenOrientation.LOCK_LANDSCAPE) // or LOCK_PORTRAIT, LOCK_RELEASE.
  .then(success => {
    console.log(success);
  })
  .catch(error => {
    console.error(error);
  });
```

</dd>


## Send message

<dl>
<dd>

**API:** [ChatServiceProvider](api/interfaces/chatserviceprovider.md)
[MessageToContact](api/interfaces/messagetocontact.md)

#### Send message to the single contact

```javascript
import MiniApp from 'js-miniapp-sdk';

MiniApp.chatService
  .sendMessageToContact(messageToContact)
  .then(contactId => {
    // contact id string.
    console.log(contactId);
  })
  .catch(error => {
    console.error(error);
  });
```

#### Send message by contact id

Please make sure that User have allowed message sending custom permission before sending message to specific contact.

```javascript
import MiniApp from 'js-miniapp-sdk';

MiniApp.chatService
  .sendMessageToContactId(id, messageToContact)
  .then(contactId => {
    console.log(contactId);
  })
  .catch(error => {
    console.error(error);
  });
```

#### Send message to multiple contacts

```javascript
import MiniApp from 'js-miniapp-sdk';

MiniApp.chatService
  .sendMessageToMultipleContacts(messageToContact)
  .then(contactIds => {
    // contact id string array.
    console.log(contactIds);
  })
  .catch(error => {
    console.error(error);
  });
```


</dd>

### Open device camera

<dl>
<dd>

Please make sure that `capture` attribute is available, it will open device camera from miniapp.

```html
<html>
  ...
  <div data-role="fieldcontain">
    <label for="name">Open file chooser to select file using camera</label>
    <input id="fileselect" type="file" accept="image/*" capture="environment" />
  </div>
  ...
</html>
```


</dd>

<div id='set-close-alert'/>

## Set Close alert <small style="color:green;font-size: 12px">Available from v1.15.0</small>

**API:** [MiniApp.miniappUtils.setCloseAlert](api/interfaces/miniapputilsprovider.html#setclosealert)

<dl>
<dd>
When a Mini app is closed, you can set the close confirmation popup which the host app can show before closing the miniapp. Host app can decide whether to show/hide the confirmation popup before closing the miniapp.


  ```javascript
  import MiniApp from 'js-miniapp-sdk';

  const alertInfo: CloseAlertInfo = {
    shouldDisplay: true,
    title: "Info",
    description: "Would you like to close the miniapp?",
  };
  MiniApp.miniappUtils
    .setCloseAlert(alertInfo)
    .then(() => {
    })
    .catch((error) => {
    });
  });
  ```

</dd>

<div id='universal-bridge'/>

## Universal Bridge <small style="color:green;font-size: 12px">Available from v1.16.0</small>

**API:** [MiniApp.universalBridge.sendJsonToHostapp](api/interfaces/universalbridgeprovider.html#sendjsontohostapp)

<dl>
<dd>

MiniApp users can send any JSON/String from MiniApp to HostApp as well as receive any JSON/String from HostApp to MiniApp.

### Send a JSON/String from MiniApp to HostApp

Please use the following example in the MiniApp:

```javascript
import MiniApp from 'js-miniapp-sdk';

const inputValue = '{"data":"This is a sample json information"}';
const info = { content: inputValue };
MiniApp.universalBridge
  .sendJsonToHostapp(info)
  .then(success => {
    console.log(success);
  })
  .catch(error => {
    console.error(error);
  });
```

### Send a UniversalBridgeInfo from MiniApp to HostApp <small style="color:green;font-size: 12px">Available from v1.18.0</small>

Please use the following example in the MiniApp:

```javascript
import MiniApp from 'js-miniapp-sdk';

const info: UniversalBridgeInfo = {
  key: "launch",
  value: "deeplinkurl",
  description: "Description of the info that is passed",
};

const info = { content: inputValue };

MiniApp.universalBridge
  .sendInfoToHostapp(info)
  .then(success => {
    console.log(success);
  })
  .catch(error => {
    console.error(error);
  });
```

#### Receive a JSON/String from HostApp to MiniApp

Please use the following example in the MiniApp:

```javascript
import HostAppEvents from 'js-miniapp-sdk';

window.addEventListener(HostAppEvents.RECEIVE_JSON_INFO, function(e) {
  let message = e.detail.message;
  console.log(message);
});
```


</dd>

<div id='close-miniapp'/>

## Close miniapp <small style="color:green;font-size: 12px">Available from v1.16.0</small>

<dl>
<dd>

When the miniapp want's to close, they can use this interface to close by itself. Calling this interface, it would let know the host app know that the miniapp wants to close. Host app can decide if it can proceed with the flow.

```javascript
import MiniApp from 'js-miniapp-sdk';

MiniApp.miniappUtils.closeMiniApp(true).catch((error) => {
});
```


</dd>

<div id='in-app-purchases'/>


## In-App Purchases

You can perform the in-app purchases for the products available for In-App Purchases associated with Google Play™.

### Get all products list
This will retrieve the list of products details available for In-App Purchase associated with Google Play™. 
This will return only the list of products associated with Mini app in the platform

```javascript
import MiniApp from 'js-miniapp-sdk';

MiniApp.purchases
      .getAllProducts()
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.error(error);
      });
```

### Purchase a product with product id
This will request for the In-app Purchase of a product with product id associated with Google Play™.
Returns the PurchasedProduct object with transaction details.
```javascript
import MiniApp from 'js-miniapp-sdk';

MiniApp.purchases
      .purchaseProductWith(productId)
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.error(error);
      });
```

### Consume a purchase
This will request to Consume the product that is purchased using the purchaseProductWith API
Returns the PurchasedProduct object with transaction details.
```javascript
import MiniApp from 'js-miniapp-sdk';

MiniApp.purchases
      .consumePurchaseWith(productId, transactionId)
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.error(error);
      });
```

<div id='get-point'/>

## Get Points

<dl>
<dd>

Host app can send any generic Point related information using this interface

### getPoints()
**API:** [MiniAppFeatures.getPoints](api/interfaces/miniappfeatures.md#getpoints)

MiniApp need to call [getPoints](api/interfaces/miniappfeatures.md#getpoints) interface to retrieve [Points](api/interfaces/points.html)

```javascript
import MiniApp from 'js-miniapp-sdk';

MiniApp.user
    .getPoints()
    .then((points) => {
      console.log(points);
    })
    .catch((error) => {
      console.error(error);
    });
```


</dd>

<div id='get-platform'/>

## Check Android/iOS device

<dl>
<dd>

**API:** [Platform.getPlatform](api/enums/platform.html#getplatform)

You can detect whether your mini app is running on an Android/iOS by using

```javascript
import MiniApp from 'js-miniapp-sdk';

const platform = MiniApp.getPlatform();
//platform value here can be `Android`, `iOS` or `Unknown`.
```

When it is not running by Android/iOS, the return value is `Unknown`.


</dd>

<div id='get-host-info'/>

## Get Host application info

<dl>
<dd>

**API:** [MiniAppFeatures.getHostEnvironmentInfo](api/interfaces/miniappfeatures.html#gethostenvironmentinfo)

Native host application can share the information such as Locale, Host app version, Host app Build type, SDK version, device token and push token using this interface. Miniapp can fetch these information using the following interface which will get [HostEnvironmentInfo](api/interfaces/hostenvironmentinfo.html) as a promise.

```javascript
import MiniApp from 'js-miniapp-sdk';

MiniApp
    .getHostEnvironmentInfo()
    .then((info) => {
      console.log(info);
    })
    .catch((error) => {
      console.error(error);
    });
```


</dd>

<div id='download-file'/>

## Download File

<dl>
<dd>

**API:** [MiniAppFeatures.downloadFile](api/interfaces/miniappfeatures.html#downloadfile)

Request to download a file and save to the user's device, by providing a valid fileName, URL and headers (if required). 

```javascript
import MiniApp from 'js-miniapp-sdk';

  MiniApp
    .downloadFile(fileName, url, { token: 'test' })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('FileDownload Error:', error);
    });
```



</dd>

<div id='secure-storage'/>

## Secure Storage

<dl>
<dd>


**API:** [SecureStorageProvider](api/interfaces/securestorageprovider.html)

1. [onReady](api/interfaces/securestorageprovider.html#onready)

    Register/Subscribe to onReady event. Host app will send the event to Miniapp when the storage is ready

    ```javascript
    import MiniApp from 'js-miniapp-sdk';

    MiniApp.secureStorageService.onReady(() => {
      // Event triggered when the storage is ready
    });
    ```

2. [onLoadError](api/interfaces/securestorageprovider.html#onloaderror)

    Register/Subscribe to onLoadError event. Host app will send the event to Miniapp when the storage is not loaded

    ```javascript
    import MiniApp from 'js-miniapp-sdk';

    MiniApp.secureStorageService.onLoadError((error) => {
      console.log(error)
      // Event triggered when the storage is not loaded
    });
    ```

3. [size](api/interfaces/securestorageprovider.html#size)

    Miniapp can retrieve the storage size i.e max size and used size for a Miniapp using the below interface.
    It returns MiniAppSecureStorageSize as a promise.

    ```javascript
    import MiniApp from 'js-miniapp-sdk';

    MiniApp.secureStorageService
      .size()
      .then((storageSize) => {
        console.log(storageSize);
      })
      .catch((error) => {
        console.log(error);
      });
    ```

4. [setItems](api/interfaces/securestorageprovider.html#setItems)

    If a Miniapp has available free space, you can store the values using the folowing interface. Please note the items which is set should of MiniAppSecureStorageKeyValues type

    ```javascript
    import MiniApp from 'js-miniapp-sdk';

    MiniApp.secureStorageService
      .setItems(items)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    ```

5. [getItem](api/interfaces/securestorageprovider.html#getItems)

    You can retrieve a value for a key using the below interface. As of now we are not supporting buld retrieval.

    ```javascript
    import MiniApp from 'js-miniapp-sdk';

    MiniApp.secureStorageService
      .getItem(key)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    ```
  
6. [removeItems](api/interfaces/securestorageprovider.html#removeItems)

    List of keys that you want be removed from the storage

    ```javascript
    import MiniApp from 'js-miniapp-sdk';

    MiniApp.secureStorageService
      .removeItems(keys)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    ```

7. [clear](api/interfaces/securestorageprovider.html#clear)

    The following interface will help you to clear all the data that is stored using the above interfaces.

    ```javascript
    import MiniApp from 'js-miniapp-sdk';

    MiniApp.secureStorageService
      .clear()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    ```

</dd>

<div id='host-theme-colors'/>

## Host app Theme colors <small style="color:green;font-size: 12px">Available from v1.18.0</small>

<dl>
<dd>

**API:** [MiniApp.miniappUtils.getHostAppThemeColors](api/interfaces/miniapputilsprovider.html#getHostAppThemeColors)

Host app uses different themes and if the Miniapp would like to have a similar theme as Host app, it can use the following interface to get the primary and secondary colors

Promise returns a HostThemeColor.

```javascript
import MiniApp from 'js-miniapp-sdk';

    MiniApp.miniappUtils
      .getHostAppThemeColors()
      .then((info) => {
        console.log(info);
      })
      .catch((error) => {
        console.error(error);
      });
```



</dd>

<div id='dark-mode'/>

## Dark Mode <small style="color:green;font-size: 12px">Available from v1.18.0</small>

<dl>
<dd>

**API:** [Platform.isDarkMode](api/interfaces/miniapputilsprovider.html#isDarkMode)

Using the following interface the Host app can let the Miniapp know if it is Dark mode or not.

```javascript
import MiniApp from 'js-miniapp-sdk';

MiniApp
  .isDarkMode()
  .then((boolean) => {
    console.log(boolean);
  })
  .catch((error) => {
    console.error(error);
  });
```

</dd>

<div id='send-analytics'/>

## Send Analytics to Host app <small style="color:green;font-size: 12px">Available from v1.18.0</small>

You can use the following interface to send analytics to Host app. Host app can use this data to record them to any server.

```javascript
import MiniApp from 'js-miniapp-sdk';

  const analyticsInfo: MAAnalyticsInfo = {
    eventType: MAAnalyticsEventType.appear,
    actionType: MAAnalyticsActionType.open,
    pageName: "Home",
    componentName: "Page",
    elementType: "Tab",
    data: "AnyData",
  };
  
  MiniApp.miniappUtils.sendAnalytics(analyticsInfo);
```

<div id='miniapp-finished-loading'/>

## MiniApp Finished Loading <small style="color:green;font-size: 12px">Available from v1.20.0</small>

<dl>
<dd>

**API:** [Platform.miniAppFinishedLoading](api/interfaces/miniapputilsprovider.html#miniAppFinishedLoading)

Using the following interface the Miniapp can notify the host app that it has finished loading.

```javascript
import MiniApp from 'js-miniapp-sdk';

MiniApp.miniappUtils
  .miniAppFinishedLoading()
  .then((response) => {
    console.log(response);
  })
  .catch((miniAppError) => {
    console.log('miniAppFinishedLoading - Error: ', miniAppError);
  });
```

</dd>

<div id='get-cookies'/>

## Get Cookies from host application <small style="color:green;font-size: 12px">Available from v1.19.0</small>

You can use the following interface to get all Cookies from Host app using the following interface

```javascript
import MiniApp from 'js-miniapp-sdk';
  
  MiniApp.cookieManager
    .getAllCookies()
    .then((response) => {
      // Response will be [CookieInfo]
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

```

You can also request the host app to provide specific cookies by sharing the list of keys as `string[]`

```javascript
import MiniApp from 'js-miniapp-sdk';
  
  MiniApp.cookieManager
    .getCookies(['user-token', `user-last-session`])
    .then((response) => {
      // Response will be [CookieInfo]
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

```

<div id='miniapp-storage'/>

## MiniApp storage using Key/Value <small style="color:green;font-size: 12px">Available from v1.20.0</small>

We already have a [Secure storage](#secure-storage) that uses database for storing any data from MiniApp. It is recommended for MiniApps that wants to store huge data.

If MiniApp wants to use any storage that is lightweight, then they can use the following interfaces.
Android uses Shared Preferences and iOS uses UserDefaults for the interfaces below,


<dl>
<dd>


**API:** [MiniappPreferenceProvider](api/interfaces/miniapppreferenceprovider.html)

1. [set](api/interfaces/miniapppreferenceprovider.html#set)

```javascript
import MiniApp from 'js-miniapp-sdk';
  
MiniApp.preferences
  .set(key, value)
  .then((response) => {
    // String response sent from Host app when the value set is successfull
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

```

2. [get](api/interfaces/miniapppreferenceprovider.html#get)

```javascript
import MiniApp from 'js-miniapp-sdk';
  
MiniApp.preferences
  .get(key)
  .then((response) => {
    // Value that is stored for a given key
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

```

3. [remove](api/interfaces/miniapppreferenceprovider.html#remove)

```javascript
import MiniApp from 'js-miniapp-sdk';
  
MiniApp.preferences
  .remove(key)
  .then((response) => {
    // String response sent from Host app when the remove is successfull
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

```

4. [clearMiniAppPreferences](api/interfaces/miniapppreferenceprovider.html#clearminiapppreferences)

```javascript
import MiniApp from 'js-miniapp-sdk';
  
MiniApp.preferences
  .clearMiniAppPreferences(key)
  .then((response) => {
    // String response sent from Host app when the clearing preferences is successfull
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

```


<div id='get-feature-list'/>

## Get feature list <small style="color:green;font-size: 12px">Available from v1.20.0</small>

This interface will help the MiniApps to get the list of features that is supported by the MiniApp native SDK also with the list of other features that is supported by the Host app

```javascript
import MiniApp from 'js-miniapp-sdk';
  
MiniApp.miniappUtils
  .getFeatureList()
  .then((response) => {
    // Array of strings/features that is supported
    // For eg., ["GET_USERNAME", "IS_DARK_MODE", "GET_ALL_COOKIES"]
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

```

<div id='can-open-app-deeplink'/>

## Can open App Deeplink <small style="color:green;font-size: 12px">Available from v1.20.3</small>

This interface will help the MiniApps to check if the URL scheme that they want to open is available in the device

```javascript
import MiniApp from 'js-miniapp-sdk';
  
MiniApp.miniappUtils
  .canOpenAppDeeplink(url)
  .then((response) => {
    // True if the device contains/supports the scheme
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

```

<div id='is-app-deeplink-supported'/>

## App supports deeplink <small style="color:green;font-size: 12px">Available from v1.20.3</small>

This interface will help the MiniApps to check if the application allows/whitelisted the URL that MiniApp wants to launch

```javascript
import MiniApp from 'js-miniapp-sdk';
  
MiniApp.miniappUtils
  .isAppDeeplinkSupported(url)
  .then((response) => {
    // True if the application allows to launch the deeplink
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

```

<div id='launch-internal-browser'/>

## Launch Internal browser <small style="color:green;font-size: 12px">Available from v1.22.0</small>

This interface will help the MiniApps to launch URL in internal browser

```javascript
import MiniApp from 'js-miniapp-sdk';
  
MiniApp.miniappUtils
  .launchInternalBrowser(url)
  .then((response) => {
    console.log(response);
  })
  .catch((miniAppError) => {
    console.log(miniAppError);
  });

```

<div id='launch-external-browser'/>

## Launch External browser <small style="color:green;font-size: 12px">Available from v1.22.0</small>

This interface will help the MiniApps to launch URL in External browser

```javascript
import MiniApp from 'js-miniapp-sdk';
  
MiniApp.miniappUtils
  .launchExternalBrowser("https:///www.rakuten.co.jp")
  .then((response) => {
    console.log(response);
  })
  .catch((miniAppError) => {
    console.log(miniAppError);
  });

```

<div id='get-image-from-gallery'/>

## Get Image from Gallery <small style="color:green;font-size: 12px">Available from v1.22.0</small>

This interface will help you to launch the gallery directly and user can select the image and the same image will be returned.

```javascript
import MiniApp from 'js-miniapp-sdk';
  
MiniApp.galleryManager
  .getImageFromGallery()
  .then((response) => {
    console.error('Success');
  })
  .catch((error) => {
    console.error('Error selecting image from gallery:', error);
  });

```

Please note that the response will be of GalleryFileResponse

```javascript
/**
 * Represents a file in the gallery.
 */
export interface GalleryFileResponse {
  /** The name of the file (optional). */
  filename?: string;
  /** The binary data of the file. */
  data: Blob;
}

```

<div id='is-loggedIn'/>

## Get User Login status <small style="color:green;font-size: 12px">Available from v1.22.0</small>

This interface will help the MiniApps to know if the User is logged in.

```javascript
import MiniApp from 'js-miniapp-sdk';
  
MiniApp.user
  .isLoggedIn()
  .then((response) => {
    console.log(response);
  })
  .catch((miniAppError) => {
    console.log(miniAppError);
  });

```


<div id='enable-disable-navigation-gestures'/>

## Enable/Disable Navigation Gestures <small style="color:green;font-size: 12px">Available from v1.22.0</small>

This interface will help the MiniApps to enable/disable the forward/back navigation gestures in iOS

```javascript
import MiniApp from 'js-miniapp-sdk';
  
MiniApp.webviewManager
  .allowBackForwardNavigationGestures(false)
  .then((response) => {
    console.log('Updated');
  })
  .catch((error) => {
    console.log('Error: ', error);
  });

```



## Advanced Usage

<dl>
<dd>

### Errors management

#### Access Token error

When an access token is requested, different `Error` subtypes can be thrown to the MiniApp:

Here is a complete example of you can manage Access Token errors:

```javascript
MiniApp.user.getAccessToken("TOKEN_AUDIENCE", ["TOKEN_SCOPE1","TOKEN_SCOPE2"])
  .then(data => {
      ...
  })
  .catch(error => {                            //Example of values :
      console.error(error.name);              // AudienceNotSupportedError
      console.error(error.message);          //  The value passed for 'audience' is not supported.

      if (error instanceof AuthorizationFailureError) {
          // handle error
      } else if (error instanceof AudienceNotSupportedError) {
          // handle error
      } else if (error instanceof ScopesNotSupportedError) {
          // handle error
      } else if (error instanceof MiniAppError) {
          // handle error
      } else {
          // unexepected error caused by SDK
      }
  })
```


### Usage when testing in the browser

Currently, the SDK does not support testing in the browser. You must test using the [Android Mini App Demo App](https://github.com/rakutentech/android-miniapp) or [iOS Mini App Demo App](https://github.com/rakutentech/ios-miniapp) on an actual Android or iOS device.

If you wish to be able to test in a browser, you can return a mock value instead of calling the SDK method.

<details><summary markdown="span"><b>Click to expand code example</b>
</summary>

```javascript
import MiniApp from 'js-miniapp-sdk';

const platform = MiniApp.getPlatform();

function getId() {
  if (platform != 'Unknown') {
    return MiniApp
      .getUniqueId()
      .then(id => {
        console.log(id);
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    return Promise.resolve('mock_unique_id_value');
  }
}
```

</details>

</dd>


## Troubleshooting & FAQs

<details><summary markdown="span"><b>Error: "Uncaught TypeError: Cannot read property 'getUniqueId' of undefined"</b>
</summary>

This is an error that you could see on Android devices when using any of the SDK functions.

Please ensure that you have defined a `<title>` tag within your HTML document's `<head>` before the Mini App SDK `<script>` tag. For example:

```html
<head>
  <title>My Mini App title</title>
  <script src="miniapp.bundle.js"></script>
  <head></head>
</head>
```

In the Android SDK, we will inject some necessary JavaScript from the native side, and we do this after receiving a callback that the mini app's `<title>` has been set. So if you do not set a `<title>`, then the JavaScript will be injected at an unpredictable time and you could see errors when trying to use SDK functions.

</details>

## Changelog

See the full [CHANGELOG](https://github.com/rakutentech/js-miniapp/blob/master/js-miniapp-sdk/CHANGELOG.md).
