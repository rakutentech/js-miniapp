import type { UUIDAction } from './actions';
import {
  SET_MESSAGING_UNIQUE_ID,
  SET_MAUID,
  MESSAGING_UNIQUE_ID_FETCH_ERROR,
  MAUID_FETCH_ERROR,
} from './types';

type UUIDState = {
  +messagingUniqueId: ?string,
  +mauid: ?string,
};

const defaultState: UUIDState = {
  messagingUniqueId: undefined,
  mauid: undefined,
  messagingUniqueIdError: undefined,
  mauidError: undefined,
};

const UUIDReducer = (
  state: UUIDState = defaultState,
  action: UUIDAction = {}
): UUIDState => {
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
  }
  return state;
};

export { UUIDReducer };
