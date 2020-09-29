import React, { useReducer } from 'react';
import MiniApp from 'js-miniapp-sdk';

import {
  Button,
  CardContent,
  CardActions,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

import GreyCard from '../components/GreyCard';

const useStyles = makeStyles((theme) => ({
  content: {
    height: '50%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 18,
    color: theme.color.primary,
    fontWeight: 'bold',
  },
  actions: {
    justifyContent: 'center',
  },
}));

type State = {
  isLoading: ?boolean,
};

export const initialState = {
  isLoading: false,
};

export const dataFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'SHOW_SUCCESS':
      return {
        ...state,
        isLoading: false,
      };
    case 'SHOW_FAILURE':
      return {
        ...initialState,
        isLoading: false,
      };
    default:
      throw Error('Unknown action type');
  }
};

function Ads() {
  const [interstitialState, interstitialDispatch] = useReducer(dataFetchReducer, initialState);
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  const classes = useStyles();

  const displayInterstitialAd = () => {
    interstitialDispatch({ type: 'LOADING' })

    const adUnitId = "ca-app-pub-3940256099942544/1033173712"// public test adId from Google.
    MiniApp.loadInterstitialAd(adUnitId)
      .then((loadSuccess) => {
        console.log(loadSuccess);

        MiniApp.showInterstitialAd(adUnitId)
          .then((closedSuccess) => {
            interstitialDispatch({ type: 'SHOW_SUCCESS' })
            console.log(closedSuccess);
          })
          .catch((error) => {
            interstitialDispatch({ type: 'SHOW_FAILURE' })
            console.error(error);
          });
          
      })
      .catch((error) => {
        interstitialDispatch({ type: 'SHOW_FAILURE' })
        console.error(error);
      });
  };

  const displayRewardAd = () => {
    dispatch({ type: 'LOADING' })
  };

  return (
    <GreyCard className={classes.content}>
    {(interstitialState.isLoading || state.isLoading) && (
      <CircularProgress size={20} className={classes.buttonProgress} />
    )}
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          className={classes.button}
          onClick={displayInterstitialAd}
          disabled={interstitialState.isLoading}
          variant="contained"
        >
          Show Interstitial
        </Button>
      </CardActions>
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          className={classes.button}
          onClick={displayRewardAd}
          disabled={state.isLoading}
          variant="contained"
        >
          Show Reward
        </Button>
      </CardActions>
    </GreyCard>
  );
}

export default Ads;
