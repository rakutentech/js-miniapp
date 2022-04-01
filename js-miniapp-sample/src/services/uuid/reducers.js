import type { UUIDAction } from './actions';
import {
  SET_UNIQUE_ID,
  SET_CONTACT_ID,
  SET_MAUID,
  UNIQUE_ID_FETCH_ERROR,
  CONTACT_ID_FETCH_ERROR,
  MAUID_FETCH_ERROR,
} from './types';

type UUIDState = {
  +uniqueId: ?string,
  +contactId: ?string,
  +mauid: ?string,
};

const defaultState: UUIDState = {
  uniqueId: undefined,
  contactId: undefined,
  mauid: undefined,
  uniqueIdError: undefined,
  contactIdError: undefined,
  mauidError: undefined,
};

const UUIDReducer = (
  state: UUIDState = defaultState,
  action: UUIDAction = {}
): UUIDState => {
  console.log('reducer: ' + action);
  if (action.type === SET_UNIQUE_ID) {
    return {
      ...defaultState,
      uniqueId: action.payload,
    };
  } else if (action.type === SET_CONTACT_ID) {
    return {
      ...defaultState,
      contactId: action.payload,
    };
  } else if (action.type === SET_MAUID) {
    return {
      ...defaultState,
      mauid: action.payload,
    };
  } else if (action.type === UNIQUE_ID_FETCH_ERROR) {
    return {
      ...defaultState,
      uniqueIdError: action.error,
    };
  } else if (action.type === CONTACT_ID_FETCH_ERROR) {
    return {
      ...defaultState,
      contactIdError: action.error,
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
