import { CustomPermissionName, CustomPermissionStatus } from 'js-miniapp-sdk';

import type { PermissionsAction } from './actions';
import {
  REQUEST_PERMISSIONS_SUCCESS,
  REQUEST_PERMISSIONS_FAILURE,
} from './types';

type PermissionsState = {
  type: REQUEST_PERMISSIONS_FAILURE,
  permissions: CustomPermissionResult[],
  error: MiniAppError,
};

const defaultState: PermissionsState = {
  type: undefined,
  permissions: [],
  error: null,
};

const PermissionsReducer = (
  state: CustomPermissionName[] = defaultState,
  action: PermissionsAction
): CustomPermissionName[] => {
  switch (action.type) {
    case REQUEST_PERMISSIONS_SUCCESS:
      const denied = action.permissions
        .filter((it) => it.status === CustomPermissionStatus.DENIED)
        .map((it) => it.name);
      const allowed = action.permissions
        .filter((it) => it.status === CustomPermissionStatus.ALLOWED)
        .map((it) => it.name);
      const array = state.permissions
        .concat(allowed)
        .filter((permission) => denied.indexOf(permission) <= -1);

      return {
        type: REQUEST_PERMISSIONS_SUCCESS,
        permissions: array,
        error: action.error,
      };
    case REQUEST_PERMISSIONS_FAILURE:
      return {
        ...defaultState,
        error: action.error,
      };
    default:
      return state;
  }
};

export { PermissionsReducer };
