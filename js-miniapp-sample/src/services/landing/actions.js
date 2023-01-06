import MiniApp, { HostEnvironmentInfo, MiniAppError } from 'js-miniapp-sdk';

import {
  REQUEST_HOST_ENVIRONMENT_INFO_SUCCESS,
  REQUEST_HOST_ENVIRONMENT_INFO_ERROR,
  ON_SECURE_STORAGE_READY_SUCCESS,
  ON_SECURE_STORAGE_READY_FAILURE,
} from './types';

type RequestHostInfoSuccessAction = { type: String, info: HostEnvironmentInfo };
type OnStorageReadySuccessAction = { type: string, error?: MiniAppError };

const setHostEnvironmentInfo = (): Function => {
  return (dispatch) => {
    MiniApp.getHostEnvironmentInfo()
      .then((info) => {
        dispatch({
          type: REQUEST_HOST_ENVIRONMENT_INFO_SUCCESS,
          info: info,
        });
      })
      .catch((error) => {
        dispatch({
          type: REQUEST_HOST_ENVIRONMENT_INFO_ERROR,
          error,
        });
      });
  };
};

const onSecureStorageReady = (): Function => {
  return (dispatch) => {
    return new Promise((resolve) => {
      MiniApp.secureStorageService.onReady(() => {
        dispatch({
          type: ON_SECURE_STORAGE_READY_SUCCESS,
        });
        return resolve();
      });

      MiniApp.secureStorageService.onLoadError((error) => {
        dispatch({
          type: ON_SECURE_STORAGE_READY_FAILURE,
          error: error,
        });
        return resolve(error);
      });
    });
  };
};

export { setHostEnvironmentInfo, onSecureStorageReady };
export type { RequestHostInfoSuccessAction, OnStorageReadySuccessAction };
