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
  data: string,
  ssc?: string,
  genre?: string,
  customerId?: string,
  accountId?: string,
  applicationId?: string
) {
  const analyticsInfo: MAAnalyticsInfo = {
    eventType: eventType,
    actionType: actionType,
    pageName: pageName,
    componentName: componentName,
    elementType: elementType,
    data: data,
    ssc: ssc,
    genre: genre,
    customerId: customerId,
    accountId: accountId,
    applicationId: applicationId,
  };
  try {
    console.log(
      'Event Type: ' +
        eventType +
        '\nAction Type: ' +
        actionType +
        '\nPage Name: ' +
        pageName +
        '\nComponent Name: ' +
        componentName +
        '\nElement Type: ' +
        elementType +
        '\nData: ' +
        data +
        '\nSSC: ' +
        ssc +
        '\nGenre: ' +
        genre +
        '\nCustomer ID: ' +
        customerId +
        '\nAccount ID: ' +
        accountId +
        '\nApplication ID: ' +
        applicationId
    );
    MiniApp.miniappUtils.sendAnalytics(analyticsInfo);
  } catch (error) {
    console.error('An error occurred while sending analytics:', error);
  }
}
