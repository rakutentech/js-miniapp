import React, { useReducer } from 'react';

import MiniApp from 'js-miniapp-sdk';

import {
  Button,
  CardContent,
  CardActions,
  makeStyles,
} from '@material-ui/core';
import GreyCard from '../components/GreyCard';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    height: 'auto',
    marginTop: '40px',
    display: 'grid',
  },
  content: {
    height: 'auto',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 18,
    color: theme.color.primary,
    fontWeight: 'bold',
    wordBreak: 'break-word',
  },
  actions: {
    justifyContent: 'center',
  },
  uuidNotFound: {
    width: 200,
  },
}));

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
};

type State = {
  isLoading: ?boolean,
  isError: ?boolean,
};

type Action = {
  type: string,
  miniAppError: MiniAppError,
  cookieInfo: CookieInfo[],
};

export const dataFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'COOKIE_FETCH_INIT':
      return {
        isLoading: true,
        isError: false,
        error: null,
      };
    case 'COOKIE_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        error: null,
        cookieInfo: action.cookieInfo,
      };
    case 'COOKIE_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: false,
        error: null,
        cookieInfo: null,
      };

    default:
      throw Error('Unknown action type');
  }
};

function CookieManagerComponent() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  function getAllCookies() {
    console.log('1')
    MiniApp.cookieManager
      .getAllCookies()
      .then((response) => {
        dispatch({
          type: 'COOKIE_FETCH_SUCCESS',
          miniAppError: null,
          cookieInfo: response,
        });
        console.log('getAllCookies SUCCESS: ', response);
      })
      .catch((error) => {
        console.log('getAllCookies ERROR: ', error);
      });
  }

  return (
    <GreyCard className={classes.card}>
      <CardContent className={classes.content}>
        {state.cookieInfo}
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          data-testid="get-cookies"
          variant="contained"
          color="primary"
          fullWidth
          onClick={getAllCookies}
        >
          Get All Cookies
        </Button>
      </CardActions>
    </GreyCard>
  );
}

export default CookieManagerComponent;
