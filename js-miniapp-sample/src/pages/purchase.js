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
  Divider,
} from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { connect } from 'react-redux';

import GreyCard from '../components/GreyCard';
import { purchaseProduct } from '../services/purchase/actions';
import { PurchasedProduct } from 'js-miniapp-sdk';

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
};

type State = {
  isLoading: ?boolean,
  isError: ?boolean,
};

type Action = {
  type: string,
};

export const dataFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case 'FETCH_FAILURE':
      return {
        ...initialState,
        isLoading: false,
        isError: true,
      };

    default:
      throw Error('Unknown action type');
  }
};

type PurchaseProductProps = {
  purchasedProduct: PurchasedProduct,
  purchaseProductUsing: () => Promise<PurchasedProduct>,
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

  function purchaseProduct() {
    props
      .purchaseProductUsing(inputValue)
      .then(() => dispatch({ type: 'FETCH_SUCCESS' }))
      .catch((e) => {
        console.error(e);
        dispatch({ type: 'FETCH_FAILURE' });
      });
  }

  function handleClick(e) {
    if (!state.isLoading) {
      e.preventDefault();
      dispatch({ type: 'FETCH_INIT' });
      purchaseProduct();
    }
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

  function ShowPurchasedProductDetails() {
    return (
      <Paper className={classes.paper}>
        <CardHeader subheader="Purchased Details" />
        {!state.isLoading && !state.isError && props.purchasedProduct && (
          <React.Fragment>
            <Typography variant="body1" className={classes.success} alignLeft>
              Transaction Date: {props.purchasedProduct.transactionDate}
            </Typography>
            <Typography variant="body1" className={classes.success} alignLeft>
              Transaction ID: {props.purchasedProduct.transactionId}
            </Typography>
            <Divider />
            <Typography variant="h6">Product Info</Typography>
            <Typography alignLeft variant="body1" className={classes.success}>
              {' '}
              ID: {props.purchasedProduct.product.id}{' '}
            </Typography>
            <Typography alignLeft variant="body1" className={classes.success}>
              {' '}
              Title: {props.purchasedProduct.product.title}{' '}
            </Typography>
            <Typography alignLeft variant="body1" className={classes.success}>
              {' '}
              Description: {props.purchasedProduct.product.description}{' '}
            </Typography>
            <Typography alignLeft variant="body1" className={classes.success}>
              {' '}
              Price: {props.purchasedProduct.product.price.price}{' '}
            </Typography>
            <Typography alignLef tvariant="body1" className={classes.success}>
              {' '}
              CurrencyCode: {
                props.purchasedProduct.product.price.currencyCode
              }{' '}
            </Typography>
          </React.Fragment>
        )}
      </Paper>
    );
  }

  function PurchaseProductCardActionsForm() {
    return (
      <FormGroup column="true" className={classes.rootUserGroup}>
        <div className={classes.wrapper}>
          <Button
            onClick={handleClick}
            variant="contained"
            color="primary"
            classes={{ root: classes.button }}
            className={buttonClassname}
            disabled={state.isLoading}
            data-testid="buyProduct"
          >
            Buy
          </Button>
          {state.isLoading && (
            <CircularProgress size={20} className={classes.buttonProgress} />
          )}
        </div>
        {state.isError && (
          <Typography variant="body1" className={classes.error}>
            Error buying the Product. Trying with valid Product ID
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
  console.log('mapStateToProps: ', state);
  return {
    purchasedProduct: state.purchaseProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    purchaseProductUsing: (itemId: string) => dispatch(purchaseProduct(itemId)),
  };
};

export { PurchaseComponent };
export default connect(mapStateToProps, mapDispatchToProps)(PurchaseComponent);
