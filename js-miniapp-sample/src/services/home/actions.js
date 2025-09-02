import { SET_CURRENT_PAGE_TITLE, SET_QUERY_PARAMS } from './types';

type SetPageAction = { type: string, payload: string };
type SetQueryParamAction = { type: string, payload: string };

const setPageTitle = (title: string): SetPageAction => {
  return {
    type: SET_CURRENT_PAGE_TITLE,
    payload: title,
  };
};

const setQueryParams = (params: string): SetQueryParamAction => {
  return {
    type: SET_QUERY_PARAMS,
    payload: params,
  };
};

export { setPageTitle, setQueryParams };
export type { SetPageAction, SetQueryParamAction };
