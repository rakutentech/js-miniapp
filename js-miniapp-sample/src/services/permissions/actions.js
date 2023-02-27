import MiniApp, {
  CustomPermission,
  CustomPermissionResult,
  MiniAppError,
} from 'js-miniapp-sdk';

import {
  REQUEST_PERMISSIONS_SUCCESS,
  REQUEST_PERMISSIONS_FAILURE,
} from './types';

type PermissionsAction = {
  type: String,
  permissions: CustomPermissionResult[],
  error: MiniAppError,
};

const requestCustomPermissions = (
  requestedPermssions: CustomPermission[]
): Function => {
  return (dispatch) => {
    return MiniApp.requestCustomPermissions(requestedPermssions)
      .then((permissions) => {
        dispatch({
          type: REQUEST_PERMISSIONS_SUCCESS,
          permissions,
        });

        return permissions;
      })
      .catch((e) => {
        dispatch({
          type: REQUEST_PERMISSIONS_FAILURE,
          error: e,
        });
      });
  };
};

export { requestCustomPermissions };
export type { PermissionsAction };
