export enum NotificationInfoType {
  CALLS,
  MESSAGES,
  HOME,
  MAIL,
  PROFILE,
  SUPPORT,
  CUSTOM,
}

export enum NotificationInfoPriority {
  CRITICAL,
  MAJOR,
  MINOR,
  NORMAL,
  OFFERS,
  MAINTENANCE,
}

/**
 * Notification Info
 */
export interface NotificationInfo {
  badgeNumber?: number;
  notificationInfoType?: NotificationInfoType;
  notificationInfoPriority?: NotificationInfoPriority;
  clearAfterRead?: boolean;
}

/**
 * Notification DetailedInfo
 */
export interface NotificationDetailedInfo {
  title?: string;
  body?: string;
  icon?: string;
  url?: string;
  timestamp?: Date;
  additionalData?: string;
  badgeNumber?: number;
  notificationInfoType?: NotificationInfoType;
  notificationInfoPriority?: NotificationInfoPriority;
  clearAfterRead?: boolean;
}
