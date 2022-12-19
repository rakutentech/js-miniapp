import React, { useState } from 'react';

import {
  Button,
  TextField,
  CardContent,
  CardActions,
  makeStyles,
} from '@material-ui/core';
import MiniApp from 'js-miniapp-sdk';

import GreyCard from '../components/GreyCard';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '80%',
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
  textfield: {
    width: 'auto',
    maxWidth: '100%',
    background: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    '& input': {
      color: theme.color.primary,
      lineHeight: '1.5em',
      fontSize: '1.2em',
    },
  },
  divstyles: {
    width: '90%',
    height: '50%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function InAppPurchase() {
  const classes = useStyles();
  const [productId, setProductId] = useState('');

  const listProducts = () => {
    MiniApp.purchases
      .prepareProductsList()
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const purchaseProduct = () => {
    MiniApp.purchases
      .purchaseProductWith(productId)
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={classes.divstyles}>
      <GreyCard>
        <CardContent className={classes.content}>
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-name"
            label={'PrductId'}
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </CardContent>

        <CardActions className={classes.actions}>
          <Button
            color="primary"
            className={classes.button}
            onClick={purchaseProduct}
            variant="contained"
          >
            Purchase Product
          </Button>
        </CardActions>
      </GreyCard>
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          className={classes.button}
          onClick={listProducts}
          variant="contained"
        >
          List Products
        </Button>
      </CardActions>
    </div>
  );
}

export default InAppPurchase;
