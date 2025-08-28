import { SET_CURRENT_PAGE_TITLE, SET_QUERY_PARAMS } from './types';

type HomePageState = {
  title: string,
  queryParams: '',
};

const homeState: HomePageState = {
  title: 'Home',
  queryParams: '',
};
const homePage = (
  state: HomePageState = homeState,
  action: setPageTitle
): HomePageState => {
  if (action !== undefined && action.type === SET_CURRENT_PAGE_TITLE) {
    return { ...state, title: action.payload };
  }
  if (action !== undefined && action.type === SET_QUERY_PARAMS) {
    return { ...state, queryParams: action.payload };
  }
  return state;
};

export default homePage;
