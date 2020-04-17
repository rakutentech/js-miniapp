// @flow
import { getUUIDFromMobileSdk } from "./../../js_sdk";
import { SET_UUID } from "./types";

type GetUUIDAction = { type: String, payload: string };

type UUIDAction = GetUUIDAction;

const setUUID = (): GetUUIDAction => {
  return {
    type: SET_UUID,
    payload: getUUIDFromMobileSdk(),
  };
};

export { setUUID };
export type { UUIDAction };
