import MiniApp from 'js-miniapp-sdk';

import {
  SET_UNIQUE_ID,
  UNIQUE_ID_FETCH_ERROR,
  SET_MESSAGING_UNIQUE_ID,
  SET_MAUID,
  MESSAGING_UNIQUE_ID_FETCH_ERROR,
  MAUID_FETCH_ERROR,
} from './types';

type GetUUIDAction = { type: String, payload: ?string, error: ?string };

type UUIDAction = GetUUIDAction;

const setUniqueId = (): Function => {
  return (dispatch) => {
    MiniApp.getUniqueId()
      .then((uuidFromSDK) => {
        dispatch({
          type: SET_UNIQUE_ID,
          payload: uuidFromSDK,
        });
      })
      .catch((error) => {
        dispatch({
          type: UNIQUE_ID_FETCH_ERROR,
          error,
        });
      });
  };
};

const setMessagingUniqueId = (): Function => {
  return (dispatch) => {
    MiniApp.getMessagingUniqueId()
      .then((uuidFromSDK) => {
        dispatch({
          type: SET_MESSAGING_UNIQUE_ID,
          payload: uuidFromSDK,
        });
      })
      .catch((error) => {
        dispatch({
          type: MESSAGING_UNIQUE_ID_FETCH_ERROR,
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

export { setUniqueId, setMessagingUniqueId, setMauid };
export type { UUIDAction };
