import { HOST_ENVIRONMENT_INFO_FETCH_ERROR, SET_HOST_ENVIRONMENT_INFO } from './types';
import MiniApp from 'js-miniapp-sdk';

type GetHostEnvironmentInfoAction = { platform: ?string, platformVersion: ?string, hostVersion: ?string, sdkVersion: ?string, error: ?Error };
type HostEnvironmentInfoAction = GetHostEnvironmentInfoAction;

const setHostEnvironmentInfo = (): Function => {
  return (dispatch) => {
    MiniApp.getHostEnvironmentInfo()
      .then((info) => {
        dispatch({
          type: SET_HOST_ENVIRONMENT_INFO,
          payload: info,
        });
      })
      .catch((error) => {
        dispatch({
          type: HOST_ENVIRONMENT_INFO_FETCH_ERROR,
          error,
        });
      });
  };
};

export { setHostEnvironmentInfo };
export type { HostEnvironmentInfoAction };
