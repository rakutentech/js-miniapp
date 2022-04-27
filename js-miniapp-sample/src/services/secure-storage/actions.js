import MiniApp from 'js-miniapp-sdk';
import {
  SET_SECURE_STORAGE_SUCCESS,
  SET_SECURE_STORAGE_FAILURE,
  GET_SECURE_STORAGE_SUCCESS,
  GET_SECURE_STORAGE_FAILURE,
  REMOVE_ITEMS_STORAGE_SUCCESS,
  REMOVE_ITEMS_STORAGE_FAILURE,
  CLEAR_SECURE_STORAGE_SUCCESS,
  CLEAR_SECURE_STORAGE_FAILURE,
  GET_SIZE_SECURE_STORAGE_SUCCESS,
  GET_SIZE_SECURE_STORAGE_FAILURE,
} from './types';

type SetItemsSuccessAction = { type: String };
type GetItemSuccessAction = { type: String, item: string };
type RemoveItemsSuccessAction = { type: String };
type ClearSuccessAction = { type: String };
type SizeSuccessAction = { type: String, size: MiniAppSecureStorageSize };

const setItems = (items: string): Function => {
  return (dispatch) => {
    return MiniApp.secureStorageService
      .setItems(items)
      .then((responseData) => {
        console.log('Action setItems Success: ', responseData);
        dispatch({
          type: SET_SECURE_STORAGE_SUCCESS,
        });
        return Promise.resolve(responseData);
      })
      .catch((error) => {
        console.log('SetItems Error: ', error);
        dispatch({
          type: SET_SECURE_STORAGE_FAILURE,
          error,
        });
        throw error;
      });
  };
};

const getItem = (key: string): Function => {
  return (dispatch) => {
    return MiniApp.secureStorageService
      .getItem(key)
      .then((responseData) => {
        console.log('getItems SuccessAction: ', responseData);
        dispatch({
          type: GET_SECURE_STORAGE_SUCCESS,
          item: responseData,
        });
        return Promise.resolve(responseData);
      })
      .catch((error) => {
        console.log('getItems Error: ', error);
        dispatch({
          type: GET_SECURE_STORAGE_FAILURE,
          error,
        });
        throw error;
      });
  };
};

const removeItems = (keys: [string]): Function => {
  return (dispatch) => {
    return MiniApp.secureStorageService
      .removeItems(keys)
      .then((responseData) => {
        console.log('removeItems SuccessAction: ', responseData);
        dispatch({
          type: REMOVE_ITEMS_STORAGE_SUCCESS,
        });
        return Promise.resolve(responseData);
      })
      .catch((error) => {
        console.log('removeItems Error: ', error);
        dispatch({
          type: REMOVE_ITEMS_STORAGE_FAILURE,
          error,
        });
        throw error;
      });
  };
};

const clear = (): Function => {
  return (dispatch) => {
    return MiniApp.secureStorageService
      .clear()
      .then((responseData) => {
        console.log('clear SuccessAction: ', responseData);
        dispatch({
          type: CLEAR_SECURE_STORAGE_SUCCESS,
        });
        return Promise.resolve(responseData);
      })
      .catch((error) => {
        console.log('clear Error: ', error);
        dispatch({
          type: CLEAR_SECURE_STORAGE_FAILURE,
          error,
        });
        throw error;
      });
  };
};

const size = (): Function => {
  return (dispatch) => {
    return MiniApp.secureStorageService
      .size()
      .then((responseData) => {
        console.log('size SuccessAction: ', responseData);
        dispatch({
          type: GET_SIZE_SECURE_STORAGE_SUCCESS,
          size: responseData,
        });
        return Promise.resolve(responseData);
      })
      .catch((error) => {
        console.log('size Error: ', error);
        dispatch({
          type: GET_SIZE_SECURE_STORAGE_FAILURE,
          error,
        });
        throw error;
      });
  };
};

export { setItems, getItem, removeItems, clear, size };
export type {
  SetItemsSuccessAction,
  GetItemSuccessAction,
  RemoveItemsSuccessAction,
  ClearSuccessAction,
  SizeSuccessAction,
};
