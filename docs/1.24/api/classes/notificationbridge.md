**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / NotificationBridge

# Class: NotificationBridge

## Hierarchy

* **NotificationBridge**

## Index

### Constructors

* [constructor](notificationbridge.md#constructor)

### Properties

* [executor](notificationbridge.md#executor)
* [platform](notificationbridge.md#platform)

### Methods

* [shouldClearNotifications](notificationbridge.md#shouldclearnotifications)
* [shouldUpdateBadgeNumber](notificationbridge.md#shouldupdatebadgenumber)
* [shouldUpdateNotificationInfo](notificationbridge.md#shouldupdatenotificationinfo)

## Constructors

### constructor

\+ **new NotificationBridge**(`executor`: PlatformExecutor): [NotificationBridge](notificationbridge.md)

*Defined in [js-miniapp-bridge/src/modules/notification-bridge.ts:10](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-bridge/src/modules/notification-bridge.ts#L10)*

#### Parameters:

Name | Type |
------ | ------ |
`executor` | PlatformExecutor |

**Returns:** [NotificationBridge](notificationbridge.md)

## Properties

### executor

•  **executor**: PlatformExecutor

*Defined in [js-miniapp-bridge/src/modules/notification-bridge.ts:9](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-bridge/src/modules/notification-bridge.ts#L9)*

___

### platform

•  **platform**: string

*Defined in [js-miniapp-bridge/src/modules/notification-bridge.ts:10](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-bridge/src/modules/notification-bridge.ts#L10)*

## Methods

### shouldClearNotifications

▸ **shouldClearNotifications**(`notificationType`: [NotificationInfoType](../enums/notificationinfotype.md)): Promise\<string>

*Defined in [js-miniapp-bridge/src/modules/notification-bridge.ts:22](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-bridge/src/modules/notification-bridge.ts#L22)*

This method is used to clear any notifications in the Host application

**`see`** {shouldClearNotifications}

#### Parameters:

Name | Type |
------ | ------ |
`notificationType` | [NotificationInfoType](../enums/notificationinfotype.md) |

**Returns:** Promise\<string>

___

### shouldUpdateBadgeNumber

▸ **shouldUpdateBadgeNumber**(`notificationInfo`: [NotificationInfo](../interfaces/notificationinfo.md)): Promise\<string>

*Defined in [js-miniapp-bridge/src/modules/notification-bridge.ts:38](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-bridge/src/modules/notification-bridge.ts#L38)*

This method is used to to update badge number for a specific notification info

**`see`** {shouldUpdateBadgeNumber}

#### Parameters:

Name | Type |
------ | ------ |
`notificationInfo` | [NotificationInfo](../interfaces/notificationinfo.md) |

**Returns:** Promise\<string>

___

### shouldUpdateNotificationInfo

▸ **shouldUpdateNotificationInfo**(`notificationDetailedInfo`: [NotificationDetailedInfo](../interfaces/notificationdetailedinfo.md)): Promise\<string>

*Defined in [js-miniapp-bridge/src/modules/notification-bridge.ts:54](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-bridge/src/modules/notification-bridge.ts#L54)*

This method is used to share the notification detailed information to Host app

**`see`** {shouldUpdateNotificationInfo}

#### Parameters:

Name | Type |
------ | ------ |
`notificationDetailedInfo` | [NotificationDetailedInfo](../interfaces/notificationdetailedinfo.md) |

**Returns:** Promise\<string>
