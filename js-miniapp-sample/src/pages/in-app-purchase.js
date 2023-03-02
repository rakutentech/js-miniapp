import React, { useReducer } from 'react';

import {
  Button,
  CircularProgress,
  FormGroup,
  Typography,
  CardContent,
  CardActions,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MiniApp, { MiniAppError } from 'js-miniapp-sdk';

import GreyCard from '../components/GreyCard';

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
  displayInlineBlock: {
    display: 'inline-block',
  },
  purchaseButtonContainer: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  purchaseButton: {
    margin: '15px',
  },
  listItemStyle: {
    overflowWrap: 'anywhere',
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
  productInfo: ProductInfo[],
  purchasedProductInfo: PurchasedProductInfo,
};

export const dataFetchReducer = (state: State, action: Action) => {
  console.log('dataFetchReducer: ', state);
  console.log('dataFetchReducer ACTION: ', action);
  console.log('dataFetchReducer Items: ', action.productInfo);
  switch (action.type) {
    case 'PURCHASE_FETCH_INIT':
      return {
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
        productInfo: action.productInfo,
      };
    case 'PURCHASE_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: false,
        error: null,
        productInfo: null,
      };
    case 'PURCHASE_PRODUCT_INIT':
      return {
        isLoading: true,
        isError: false,
        error: null,
      };
    case 'PURCHASE_PRODUCT_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        error: null,
        purchasedProductInfo: action.purchasedProductInfo,
      };
    case 'PURCHASE_PRODUCT_FAILURE':
      return {
        ...initialState,
        isLoading: false,
        isError: true,
        purchasedProductInfo: null,
        error:
          (typeof action.miniAppError == 'string'
            ? action.miniAppError
            : action.miniAppError.message) || '',
      };

    default:
      throw Error('Unknown action type');
  }
};

function PurchaseProductComponent() {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  const [productFetchState, productFetchDispatch] = useReducer(
    dataFetchReducer,
    initialState
  );
  const classes = useStyles();

  const buttonClassname = clsx({
    [classes.buttonFailure]: state.isError,
    [classes.buttonSuccess]: !state.isError,
  });

  function handleFetchClick(e) {
    if (!state.isLoading) {
      productFetchDispatch({ type: 'PURCHASE_FETCH_INIT', miniAppError: null });
      getAllProducts();
    }
  }

  function getAllProducts() {
    MiniApp.purchaseService
      .getAllProducts()
      .then((products) => {
        productFetchDispatch({
          type: 'PURCHASE_FETCH_SUCCESS',
          miniAppError: null,
          productInfo: products,
        });
      })
      .catch((miniAppError) => {
        console.log('Product Error: ', miniAppError);
        productFetchDispatch({ type: 'PURCHASE_FETCH_FAILURE', miniAppError });
      });
  }

  function handlePurchaseClick(e) {
    if (!state.isLoading) {
      dispatch({
        type: 'PURCHASE_PRODUCT_INIT',
        miniAppError: null,
      });
      BuyProduct(e.currentTarget.value);
    }
  }

  function BuyProduct(productId: string) {
    MiniApp.purchaseService
      .purchaseProductWith(productId)
      .then((purchasedProduct) => {
        console.log('SUCCESS - BuyProduct', purchasedProduct);
        dispatch({
          type: 'PURCHASE_PRODUCT_SUCCESS',
          miniAppError: null,
          purchasedProduct: purchasedProduct,
        });
      })
      .catch((miniAppError) => {
        console.log('Product Error: ', miniAppError);
        dispatch({
          type: 'PURCHASE_PRODUCT_FAILURE',
          miniAppError,
        });
      });
  }

  function handleConsumeClick(e) {
    if (!state.isLoading) {
      dispatch({ type: 'PURCHASE_PRODUCT_INIT', miniAppError: null });
      ConsumeProduct(e.currentTarget.value);
    }
  }

  function ConsumeProduct(productId: string) {
    MiniApp.purchaseService
      .consumePurchaseWith(productId)
      .then((purchasedProduct) => {
        console.log('SUCCESS - BuyProduct', purchasedProduct);
        dispatch({
          type: 'PURCHASE_PRODUCT_SUCCESS',
          miniAppError: null,
          productInfo: purchasedProduct,
        });
      })
      .catch((miniAppError) => {
        console.log('Product Error: ', miniAppError);
        dispatch({
          type: 'PURCHASE_PRODUCT_FAILURE',
          miniAppError,
        });
      });
  }

  function TransactionDetails() {
    console.log('TransactionDetails: ', state);

    const dateInfo = new Date(state.purchasedProductInfo.transactionDate);
    return (
      <React.Fragment>
        <Typography
          variant="body1"
          className={classes.success}
          align="left"
          style={{ overflowWrap: 'break-word' }}
        >
          Transaction ID: {state.purchasedProductInfo.transactionId}
          <br />
          Transaction Date: {dateInfo.toLocaleDateString()}
          <br />
          Transaction Time: {dateInfo.toLocaleTimeString()}
          <br />
        </Typography>
      </React.Fragment>
    );
  }

  function ShowProductDetails() {
    console.log('ShowProductDetails: ', productFetchState);
    return (
      <React.Fragment>
        {productFetchState.productInfo &&
          productFetchState.productInfo.map((productInfo) => (
            <ListItem
              divider
              className={classes.displayInlineBlock}
              key={productInfo.id}
            >
              <ListItemText
                className={classes.listItemStyle}
                primary={'Title: ' + productInfo.title}
                secondary={
                  <React.Fragment>
                    <Typography>
                      {productInfo.description &&
                        productInfo.description !== '' && (
                          <span>
                            {'Description: ' + productInfo.description}
                          </span>
                        )}
                    </Typography>
                    <Typography>
                      {productInfo.id && productInfo.id !== '' && (
                        <span>{'Product ID: ' + productInfo.id}</span>
                      )}
                    </Typography>
                    <Typography>
                      {productInfo.id && productInfo.id !== '' && (
                        <span>
                          {'Price : ' +
                            productInfo.price.price +
                            ' ' +
                            productInfo.price.currencyCode}
                        </span>
                      )}
                    </Typography>
                  </React.Fragment>
                }
              />
              <div className={classes.purchaseButtonContainer}>
                <div>
                  <Button
                    onClick={handlePurchaseClick}
                    variant="contained"
                    color="primary"
                    classes={{ root: classes.button }}
                    className={buttonClassname}
                    disabled={state.isLoading}
                    data-testid="buyProduct"
                    value={productInfo.id}
                  >
                    Buy
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={handleConsumeClick}
                    variant="contained"
                    color="primary"
                    classes={{ root: classes.button }}
                    className={buttonClassname}
                    disabled={state.isLoading}
                    data-testid="consumeProduct"
                    value={productInfo.id}
                  >
                    Consume
                  </Button>
                  {state.isLoading && (
                    <CircularProgress
                      size={20}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </div>
              {state.purchasedProductInfo &&
                state.purchasedProductInfo.product.id === productInfo.id && (
                  <div>{TransactionDetails()}</div>
                )}
            </ListItem>
          ))}
      </React.Fragment>
    );
  }

  function PurchaseProductCardActionsForm() {
    return (
      <FormGroup column="true" className={classes.rootUserGroup}>
        <div>
          <div className={classes.wrapper}>
            <Button
              onClick={handleFetchClick}
              variant="contained"
              color="primary"
              classes={{ root: classes.button }}
              className={buttonClassname}
              disabled={state.isLoading}
              data-testid="buyProduct"
            >
              Fetch Products
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
      <CardActions classes={{ root: classes.rootCardActions }}>
        {PurchaseProductCardActionsForm()}
      </CardActions>
      <GreyCard className={classes.card}>
        {!productFetchState.isLoading && productFetchState.productInfo && (
          <CardContent>{ShowProductDetails()}</CardContent>
        )}
      </GreyCard>
    </div>
  );
}

export { PurchaseProductComponent };
