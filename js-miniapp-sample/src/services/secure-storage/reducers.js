import { combineReducers } from 'redux';

import type {
  SetItemsSuccessAction,
  GetItemSuccessAction,
  RemoveItemsSuccessAction,
  SizeSuccessAction,
  ClearSuccessAction,
} from './actions';
import {
  CLEAR_SECURE_STORAGE_SUCCESS,
  GET_SECURE_STORAGE_SUCCESS,
  GET_SIZE_SECURE_STORAGE_SUCCESS,
  REMOVE_ITEMS_STORAGE_SUCCESS,
  SET_SECURE_STORAGE_SUCCESS,
} from './types';

const defaultSetItems = null;
const setItemsReducer = (
  state: ?string = defaultSetItems,
  action: SetItemsSuccessAction
): ?string => {
  switch (action.type) {
    case SET_SECURE_STORAGE_SUCCESS:
      return action.type;
    default:
      return state;
  }
};

const defaultGetItems = null;
const getItemsReducer = (
  state: ?string = defaultGetItems,
  action: GetItemSuccessAction
): ?string => {
  switch (action.type) {
    case GET_SECURE_STORAGE_SUCCESS:
      return action.item;
    default:
      return state;
  }
};

const defaultRemoveItems = null;
const removeItemsReducer = (
  state: ?string = defaultRemoveItems,
  action: RemoveItemsSuccessAction
): ?string => {
  switch (action.type) {
    case REMOVE_ITEMS_STORAGE_SUCCESS:
      return action.type;
    default:
      return state;
  }
};

const defaultSizeItem = null;
const getSizeReducer = (
  state: ?string = defaultSizeItem,
  action: SizeSuccessAction
): ?string => {
  switch (action.type) {
    case GET_SIZE_SECURE_STORAGE_SUCCESS:
      return action.size;
    default:
      return state;
  }
};

const defaultClearItem = null;
const clearStorageReducer = (
  state: ?string = defaultClearItem,
  action: ClearSuccessAction
): ?string => {
  switch (action.type) {
    case CLEAR_SECURE_STORAGE_SUCCESS:
      return action.type;
    default:
      return state;
  }
};

export default combineReducers({
  setItems: setItemsReducer,
  getItem: getItemsReducer,
  removeItems: removeItemsReducer,
  size: getSizeReducer,
  clear: clearStorageReducer,
});
