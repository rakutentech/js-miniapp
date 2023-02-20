import React, { useReducer } from 'react';

import {
  Button,
  CardHeader,
  CircularProgress,
  FormGroup,
  Typography,
  CardContent,
  CardActions,
  TextField,
  Paper,
} from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { MiniAppError, PurchasedProductResponse } from 'js-miniapp-sdk';
import { connect } from 'react-redux';

import GreyCard from '../components/GreyCard';
import {
  getAllProductsAction,
  purchaseProductAction,
  consumeProductAction,
} from '../services/purchase/action';

const useStyles = makeStyles((theme) => ({
  scrollable: {
    overflowY: 'auto',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  card: {
    width: '100%',
    height: 'auto',
  },
  root: {
    background: theme.color.secondary,
    width: '85vw',
    maxWidth: 500,
  },
  wrapper: {
    position: 'relative',
    marginTop: 10,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonFailure: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  buttonProgress: {
    position: 'absolute',
    top: 'calc(50% - 10px)',
    left: 'calc(50% - 10px)',
  },
  error: {
    color: red[500],
    marginTop: 10,
  },
  success: {
    color: green[500],
    marginTop: 20,
  },
  rootUserGroup: {
    alignItems: 'center',
  },
  formInput: {
    width: '90%',
    marginTop: 10,
  },
  rootCardActions: {
    justifyContent: 'center',
  },
  caseSelector: {
    marginTop: 5,
  },
  button: {
    marginBottom: 15,
  },
  dataFormsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    width: '100%',
    paddingBottom: 10,
    marginBottom: 20,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  red: {
    color: red[500],
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
};

export const dataFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'PURCHASE_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
      };
    case 'PURCHASE_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        error: null,
      };
    case 'PURCHASE_FETCH_FAILURE':
      return {
        ...initialState,
        isLoading: false,
        isError: true,
        error:
          (typeof action.miniAppError == 'string'
            ? action.miniAppError
            : action.miniAppError.message) || '',
      };

    default:
      throw Error('Unknown action type');
  }
};

type PurchaseProductProps = {
  purchasedProduct: PurchasedProductResponse,
  purchaseProductWith: (itemId: string) => Promise<PurchasedProductResponse>,
  consumeProductWith: (itemId: string) => Promise<MiniAppResponseInfo>,
  purchaseError: MiniAppError,
};

function PurchaseComponent(props: PurchaseProductProps) {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  const classes = useStyles();

  let inputValue = '';

  const handleInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();
    inputValue = e.currentTarget.value;
  };

  const buttonClassname = clsx({
    [classes.buttonFailure]: state.isError,
    [classes.buttonSuccess]: !state.isError,
  });

  function handlePurchaseClick(e) {
    if (!state.isLoading) {
      dispatch({ type: 'PURCHASE_FETCH_INIT', miniAppError: null });
      BuyProduct();
    }
  }

  function BuyProduct() {
    props
      .purchaseProductWith(inputValue)
      .then(() =>
        dispatch({ type: 'PURCHASE_FETCH_SUCCESS', miniAppError: null })
      )
      .catch((miniAppError) => {
        console.log('Product Error: ', miniAppError);
        dispatch({ type: 'PURCHASE_FETCH_FAILURE', miniAppError });
      });
  }

  function handleConsumeClick(e) {
    if (!state.isLoading) {
      dispatch({ type: 'PURCHASE_FETCH_INIT', miniAppError: null });
      ConsumeProduct();
    }
  }

  function ConsumeProduct() {
    props
      .consumePurchaseWith(inputValue)
      .then(() =>
        dispatch({ type: 'PURCHASE_FETCH_SUCCESS', miniAppError: null })
      )
      .catch((miniAppError) => {
        console.log('Product Error: ', miniAppError);
        dispatch({ type: 'PURCHASE_FETCH_FAILURE', miniAppError });
      });
  }

  function PurchaseProduct() {
    return (
      <Paper className={classes.paper}>
        <CardHeader subheader="Purchase Product" />
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-name"
          error={state.isError}
          label={'Item ID'}
          onChange={handleInput}
        />
      </Paper>
    );
  }

  function TransactionDetails() {
    const dateInfo = new Date(props.purchasedProduct.product.transactionDate);
    return (
      <React.Fragment>
        <Typography variant="h6">
          Transaction - {props.purchasedProduct.status}
        </Typography>
        <Typography
          variant="body1"
          className={classes.success}
          align="left"
          style={{ paddingLeft: '10px' }}
        >
          Transaction Date: {dateInfo.toLocaleDateString()}
          <br />
          Transaction Time: {dateInfo.toLocaleTimeString()}
          <br />
          Transaction ID: {props.purchasedProduct.product.transactionId}
        </Typography>
      </React.Fragment>
    );
  }

  function ShowPurchasedProductDetails() {
    return (
      <React.Fragment>
        <CardHeader />
        {!state.isLoading && !state.isError && props.purchasedProduct && (
          <Paper className={classes.paper}>
            {TransactionDetails()}
            <br />
            <Typography variant="h6">Product Info</Typography>
            <Typography
              variant="body1"
              className={classes.success}
              align="left"
              style={{ paddingLeft: '10px' }}
            >
              ID: {props.purchasedProduct.product.productInfo.id} <br />
              Title: {props.purchasedProduct.product.productInfo.title} <br />
              Description:{' '}
              {props.purchasedProduct.product.productInfo.description} <br />
              <br />
            </Typography>
          </Paper>
        )}
      </React.Fragment>
    );
  }

  function PurchaseProductCardActionsForm() {
    return (
      <FormGroup column="true" className={classes.rootUserGroup}>
        <div>
          <div className={classes.wrapper}>
            <Button
              onClick={handlePurchaseClick}
              variant="contained"
              color="primary"
              classes={{ root: classes.button }}
              className={buttonClassname}
              disabled={state.isLoading}
              data-testid="buyProduct"
            >
              Purchase
            </Button>

            {state.isLoading && (
              <CircularProgress size={20} className={classes.buttonProgress} />
            )}
          </div>
          <div className={classes.wrapper}>
            <Button
              onClick={handleConsumeClick}
              variant="contained"
              color="primary"
              classes={{ root: classes.button }}
              className={buttonClassname}
              disabled={state.isLoading}
              data-testid="buyProduct"
            >
              Consume
            </Button>

            {state.isLoading && (
              <CircularProgress size={20} className={classes.buttonProgress} />
            )}
          </div>
        </div>
        {!state.isLoading && state.isError && (
          <Typography variant="body1" className={classes.red}>
            {state.error}
          </Typography>
        )}
      </FormGroup>
    );
  }

  return (
    <div className={classes.scrollable}>
      <GreyCard className={classes.card}>
        <CardContent>
          <div
            className={classes.dataFormsWrapper}
            data-testid="dataFormsWrapper"
          >
            {PurchaseProduct()}
            {ShowPurchasedProductDetails()}
          </div>
        </CardContent>
        <CardActions classes={{ root: classes.rootCardActions }}>
          {PurchaseProductCardActionsForm()}
        </CardActions>
      </GreyCard>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log('MapStateToProps: ', state);
  return {
    purchasedProduct: state.purchaseProduct,
    purchaseError: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => dispatch(getAllProductsAction()),
    purchaseProductWith: (itemId: string) =>
      dispatch(purchaseProductAction(itemId)),
    consumeProductWith: (itemId: string, transactionId: string) =>
      dispatch(consumeProductAction(itemId)),
  };
};

export { PurchaseComponent };
export default connect(mapStateToProps, mapDispatchToProps)(PurchaseComponent);
