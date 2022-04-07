import MiniApp from 'js-miniapp-sdk';

import {
  SET_MESSAGE_UNIQUE_ID,
  SET_MAUID,
  MESSAGE_UNIQUE_ID_FETCH_ERROR,
  MAUID_FETCH_ERROR,
} from './types';

type GetUUIDAction = { type: String, payload: ?string, error: ?string };

type UUIDAction = GetUUIDAction;

const setMessageUniqueId = (): Function => {
  return (dispatch) => {
    MiniApp.getMessageUniqueId()
      .then((uuidFromSDK) => {
        dispatch({
          type: SET_MESSAGE_UNIQUE_ID,
          payload: uuidFromSDK,
        });
      })
      .catch((error) => {
        dispatch({
          type: MESSAGE_UNIQUE_ID_FETCH_ERROR,
          error,
        });
      });
  };
};

const setMauid = (): Function => {
  return (dispatch) => {
    MiniApp.getMauid()
      .then((mauidFromSdk) => {
        dispatch({
          type: SET_MAUID,
          payload: mauidFromSdk,
        });
      })
      .catch((error) => {
        dispatch({
          type: MAUID_FETCH_ERROR,
          error,
        });
      });
  };
};

export { setMessageUniqueId, setMauid };
export type { UUIDAction };
