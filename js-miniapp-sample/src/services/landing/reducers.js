import type {
  RequestHostInfoSuccessAction,
  OnStorageReadySuccessAction,
} from './actions';
import { HostEnvironmentInfo } from 'js-miniapp-sdk';
import {
  REQUEST_HOST_ENVIRONMENT_INFO_SUCCESS,
  ON_SECURE_STORAGE_READY_SUCCESS,
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
const onSecureStorageStatusReducer = (
  state: ?string = defaultStorageStatusItem,
  action: OnStorageReadySuccessAction
): ?string => {
  switch (action.type) {
    case ON_SECURE_STORAGE_READY_SUCCESS:
      return action.type;
    default:
      return state;
  }
};

export { HostEnvironmentInfoReducer, onSecureStorageStatusReducer };
