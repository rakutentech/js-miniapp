// @flow
import type { UUIDAction } from "./actions";
import { SET_UUID } from "./types";

type UUIDState = {
  +uuid: ?string,
};

const defaultState: UUIDState = {
  uuid: undefined,
};

const UUIDReducer = (
  state: UUIDState = defaultState,
  action: UUIDAction = {}
): UUIDState => {
  if (action !== undefined && action.type === SET_UUID) {
    return { ...defaultState, uuid: action.payload };
  }
  return state;
};

export { UUIDReducer };
