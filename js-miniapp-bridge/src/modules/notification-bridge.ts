import { PlatformExecutor } from '../common-bridge';
import {
  NotificationDetailedInfo,
  NotificationInfo,
  NotificationInfoType,
} from '../types/notification/notification-info';

export class NotificationBridge {
  executor: PlatformExecutor;
  platform: string;

  constructor(executor: PlatformExecutor) {
    this.executor = executor;
    this.platform = executor.getPlatform();
  }

  /**
   * This method is used to clear any notifications in the Host application
   * @param {notificationType} NotificationInfoType
   * @see {shouldClearNotifications}
   */
  shouldClearNotifications(notificationType: NotificationInfoType) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'shouldClearNotifications',
        { notificationType },
        result => resolve(result),
        error => reject(error)
      );
    });
  }

  /**
   * This method is used to to update badge number for a specific notification info
   * @param {notificationInfo} NotificationInfo
   * @see {shouldUpdateBadgeNumber}
   */
  shouldUpdateBadgeNumber(notificationInfo: NotificationInfo) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'shouldUpdateBadgeNumber',
        { notificationInfo },
        result => resolve(result),
        error => reject(error)
      );
    });
  }

  /**
   * This method is used to share the notification detailed information to Host app
   * @param {notificationDetailedInfo} NotificationDetailedInfo
   * @see {shouldUpdateNotificationInfo}
   */
  shouldUpdateNotificationInfo(
    notificationDetailedInfo: NotificationDetailedInfo
  ) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'shouldUpdateNotificationInfo',
        { notificationDetailedInfo },
        result => resolve(result),
        error => reject(error)
      );
    });
  }
}
