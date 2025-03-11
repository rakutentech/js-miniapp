/**
 * Analytics Event type
 */
export enum MAAnalyticsEventType {
  appear = 'appear',
  click = 'click',
  error = 'error',
  custom = 'custom',
  pageView = 'pv',
}

/**
 * Action Type
 */
export enum MAAnalyticsActionType {
  open = 'open',
  close = 'close',
  add = 'add',
  delete = 'delete',
  change = 'change',
}

/**
 * Mini App Analytics info type
 */
export interface MAAnalyticsInfo {
  eventType: MAAnalyticsEventType;
  actionType: MAAnalyticsActionType;
  pageName: string;
  componentName: string;
  elementType: string;
  data: string;
  ssc?: string;
  genre?: string;
  customerId?: string;
  accountId?: string;
  applicationId?: string;
}
