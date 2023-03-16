import { HostEnvironmentInfo } from 'js-miniapp-sdk';

import type {
  RequestHostInfoSuccessAction,
  OnStorageReadySuccessAction,
} from './actions';
import {
  REQUEST_HOST_ENVIRONMENT_INFO_SUCCESS,
  ON_SECURE_STORAGE_READY_SUCCESS,
  ON_SECURE_STORAGE_READY_FAILURE,
} from './types';

const defaultInfo = {};
const HostEnvironmentInfoReducer = (
  state: ?HostEnvironmentInfo = defaultInfo,
  action: RequestHostInfoSuccessAction
): ?HostEnvironmentInfo => {
  switch (action.type) {
    case REQUEST_HOST_ENVIRONMENT_INFO_SUCCESS:
      return action.info;
    default:
      return state;
  }
};

const defaultStorageStatusItem = null;
const SecureStorageStatusReducer = (
  state: ?string = defaultStorageStatusItem,
  action: OnStorageReadySuccessAction
) => {
  switch (action.type) {
    case ON_SECURE_STORAGE_READY_SUCCESS:
      return {
        isReady: true,
        error: null,
      };
    case ON_SECURE_STORAGE_READY_FAILURE:
      return {
        isReady: false,
        error: action.error,
        ...state,
      };
    default:
      return {
        isReady: false,
        error: null,
        ...state,
      };
  }
};

export { HostEnvironmentInfoReducer, SecureStorageStatusReducer };
