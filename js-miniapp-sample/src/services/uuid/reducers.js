import type { UUIDAction } from './actions';
import {
  SET_UNIQUE_ID,
  UNIQUE_ID_FETCH_ERROR,
  SET_MESSAGING_UNIQUE_ID,
  SET_MAUID,
  MESSAGING_UNIQUE_ID_FETCH_ERROR,
  MAUID_FETCH_ERROR,
} from './types';

type UUIDState = {
  +uniqueId: ?string,
  +messagingUniqueId: ?string,
  +mauid: ?string,
};

const defaultState: UUIDState = {
  uniqueId: undefined,
  messagingUniqueId: undefined,
  mauid: undefined,
  uniqueIdError: undefined,
  messagingUniqueIdError: undefined,
  mauidError: undefined,
};

const UUIDReducer = (
  state: UUIDState = defaultState,
  action: UUIDAction = {}
): UUIDState => {
  if (action.type === SET_UNIQUE_ID) {
    return {
      ...defaultState,
      uniqueId: action.payload,
    };
  }
  if (action.type === SET_MESSAGING_UNIQUE_ID) {
    return {
      ...defaultState,
      messagingUniqueId: action.payload,
    };
  } else if (action.type === SET_MAUID) {
    return {
      ...defaultState,
      mauid: action.payload,
    };
  } else if (action.type === MESSAGING_UNIQUE_ID_FETCH_ERROR) {
    return {
      ...defaultState,
      messagingUniqueIdError: action.error,
    };
  } else if (action.type === MAUID_FETCH_ERROR) {
    return {
      ...defaultState,
      mauidError: action.error,
    };
  } else if (action.type === UNIQUE_ID_FETCH_ERROR) {
    return {
      ...defaultState,
      uniqueIdError: action.error,
    };
  }

  return state;
};

export { UUIDReducer };
