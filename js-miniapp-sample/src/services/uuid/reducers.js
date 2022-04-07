import type { UUIDAction } from './actions';
import {
  SET_MESSAGE_UNIQUE_ID,
  SET_MAUID,
  MESSAGE_UNIQUE_ID_FETCH_ERROR,
  MAUID_FETCH_ERROR,
} from './types';

type UUIDState = {
  +messageUniqueId: ?string,
  +mauid: ?string,
};

const defaultState: UUIDState = {
  messageUniqueId: undefined,
  mauid: undefined,
  messageUniqueIdError: undefined,
  mauidError: undefined,
};

const UUIDReducer = (
  state: UUIDState = defaultState,
  action: UUIDAction = {}
): UUIDState => {
  if (action.type === SET_MESSAGE_UNIQUE_ID) {
    return {
      ...defaultState,
      messageUniqueId: action.payload,
    };
  } else if (action.type === SET_MAUID) {
    return {
      ...defaultState,
      mauid: action.payload,
    };
  } else if (action.type === MESSAGE_UNIQUE_ID_FETCH_ERROR) {
    return {
      ...defaultState,
      uniqueIdError: action.error,
    };
  } else if (action.type === MAUID_FETCH_ERROR) {
    return {
      ...defaultState,
      mauidError: action.error,
    };
  }
  return state;
};

export { UUIDReducer };
