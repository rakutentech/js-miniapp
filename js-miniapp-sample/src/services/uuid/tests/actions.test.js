import { setUUID } from "../actions";
import { SET_UUID } from "../types";

describe("uuid actions", () => {
  test("should create a set_uuid action with unique uuid", () => {
    const setUUIDAction = setUUID();
    expect(setUUIDAction.type).toEqual(SET_UUID);
    expect(setUUIDAction.payload).toBeDefined();
    expect(setUUIDAction.payload.length).toEqual(36);
  });
});
