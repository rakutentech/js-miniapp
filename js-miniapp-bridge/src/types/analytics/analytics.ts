/**
 * Analytics Event type
 */
export enum MAAnalyticsEventType {
  appear,
  click,
  error,
  custom,
}

/**
 * Action Type
 */
export enum MAAnalyticsActionType {
  open,
  close,
  add,
  delete,
  change,
}

/**
 * Mini App Analytics info type
 */
export interface MAAnalytics {
  eventType: MAAnalyticsEventType;
  actionType: MAAnalyticsActionType;
  pageName: string;
  componentName: string;
  elementType: string;
  data: string;
}
