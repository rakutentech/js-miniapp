// @flow
import type { HomeAction } from "./actions";
import { SET_CURRENT_PAGE_TITLE } from "./types";

type HomePageState = {
  title: string,
};

const homeState: HomePageState = {
  title: "POC",
};

export default (
  state: HomePageState = homeState,
  action: HomeAction
): HomePageState => {
  if (action !== undefined) {
    if (action.type === SET_CURRENT_PAGE_TITLE) {
      state = { ...state, title: action.payload };
    }
  }
  return state;
};
