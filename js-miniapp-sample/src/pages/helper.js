import MiniApp, {
  MAAnalyticsInfo,
  MAAnalyticsEventType,
  MAAnalyticsActionType,
} from 'js-miniapp-sdk';

export function sendAnalytics(
  eventType: MAAnalyticsEventType,
  actionType: MAAnalyticsActionType,
  pageName: string,
  componentName: string,
  elementType: string,
  data: string
) {
  const analyticsInfo: MAAnalyticsInfo = {
    eventType: eventType,
    actionType: actionType,
    pageName: pageName,
    componentName: componentName,
    elementType: elementType,
    data: data,
  };
  return MiniApp.miniappUtils.sendAnalytics(analyticsInfo);
}
