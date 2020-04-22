// @flow
import { getUUIDFromMobileSdk } from "./../../js_sdk";
import { SET_UUID } from "./types";

type GetUUIDAction = { type: String, payload: string };

type UUIDAction = GetUUIDAction;

const setUUID = (): Function => {
  return (dispatch) => {
    const uuid = getUUIDFromMobileSdk();
    dispatch({
      type: SET_UUID,
      payload: uuid,
    });
  };
};

export { setUUID };
export type { UUIDAction };
