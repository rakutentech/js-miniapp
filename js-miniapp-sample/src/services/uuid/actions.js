// @flow
// import MiniApp from "js-miniapp-sdk";

import { getUUIDFromMobileSdk } from './../../js_sdk';
import { SET_UUID /* , UUID_FETCH_ERROR */ } from './types';

type GetUUIDAction = { type: String, payload: string };

type UUIDAction = GetUUIDAction;

const setUUID = (): Function => {
  return dispatch => {
    const uuid = getUUIDFromMobileSdk();
    dispatch({
      type: SET_UUID,
      payload: uuid,
    });
    /* MiniApp.getUniqueId()
      .then((uuid) => {
        
      })
      .catch((_) => {
        dispatch({
          type: UUID_FETCH_ERROR,
        });
      }); */
  };
};

export { setUUID };
export type { UUIDAction };
