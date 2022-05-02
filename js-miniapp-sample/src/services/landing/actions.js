import {
  REQUEST_HOST_ENVIRONMENT_INFO_SUCCESS,
  REQUEST_HOST_ENVIRONMENT_INFO_ERROR,
  ON_SECURE_STORAGE_READY_SUCCESS,
  ON_SECURE_STORAGE_READY_FAILURE,
} from './types';
import MiniApp from 'js-miniapp-sdk';
import { HostEnvironmentInfo } from 'js-miniapp-sdk';

type RequestHostInfoSuccessAction = { type: String, info: HostEnvironmentInfo };
type OnStorageReadySuccessAction = { type: string };

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
    return MiniApp.secureStorageService
      .onSecureStorageReady()
      .then(() => {
        console.log('onSecureStorageReady SuccessAction: ');
        dispatch({
          type: ON_SECURE_STORAGE_READY_SUCCESS,
        });
        return Promise.resolve('');
      })
      .catch((error) => {
        console.log('onSecureStorageReady Error: ', error);
        dispatch({
          type: ON_SECURE_STORAGE_READY_FAILURE,
          error,
        });
        throw error;
      });
  };
};

export { setHostEnvironmentInfo, onSecureStorageReady };
export type { RequestHostInfoSuccessAction, OnStorageReadySuccessAction };
