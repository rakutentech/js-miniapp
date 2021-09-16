import type { HostEnvironmentInfoAction } from './actions';
import { HOST_ENVIRONMENT_INFO_FETCH_ERROR, SET_HOST_ENVIRONMENT_INFO } from './types';

type HostEnvironmentInfoState = {
  +platform: ?string,
  +platformVersion: ?string,
  +hostVersion: ?string,
  +sdkVersion: ?string,
};

const defaultState: HostEnvironmentInfoState = {
  platform: undefined,
  platformVersion: undefined,
  hostVersion: undefined,
  sdkVersion: undefined,
  infoError: undefined,
};

const HostEnvironmentInfoReducer = (
  state: HostEnvironmentInfoState = defaultState,
  action: HostEnvironmentInfoAction = {}
): HostEnvironmentInfoState => {
  if (action.type === SET_HOST_ENVIRONMENT_INFO) {
    return {
      ...defaultState,
      platform: action.payload.platform,
      platformVersion: action.payload.platformVersion,
      hostVersion: action.payload.hostVersion,
      sdkVersion: action.payload.sdkVersion,
    };
  } else if (action.type === HOST_ENVIRONMENT_INFO_FETCH_ERROR) {
    return {
      ...defaultState,
      infoError: action.error,
    };
  }
  return state;
};

export { HostEnvironmentInfoReducer }