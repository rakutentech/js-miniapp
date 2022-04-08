import React from 'react';
import MiniApp from 'js-miniapp-sdk';

import {
  Button,
  TextField,
  CardContent,
  CardActions,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';

import GreyCard from '../components/GreyCard';
import { purchaseProduct } from '../services/purchase/actions';
import { PurchasedProduct } from 'js-miniapp-sdk';

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
  textfield: {
    width: '80%',
    maxWidth: 300,
    background: 'white',
    '& input': {
      color: theme.color.primary,
      lineHeight: '1.5em',
      fontSize: '1.2em',
    },
  },
}));

type PurchaseProductProps = {
  purchasedProduct: PurchasedProduct,
  purchaseProductUsing: Function,
};

function PurchaseComponent(props: PurchaseProductProps) {
  const classes = useStyles();
  let inputValue = '';

  const handleInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();
    inputValue = e.currentTarget.value;
  };

  const purchaseItem = () => {
    props
      .purchaseProductUsing(inputValue)
      .then((success) => {
        console.log('Success:', success);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </React.Fragment>
  );
  return (
    <GreyCard>
      <CardContent className={classes.content}>
        <TextField
          type="text"
          className={classes.textfield}
          onChange={handleInput}
          placeholder="Enter Item Id that you want to purchase"
          variant="outlined"
          color="primary"
          multiline="true"
          rowsMax="5"
          inputProps={{
            'data-testid': 'input-field',
          }}
        />
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          className={classes.button}
          onClick={purchaseItem}
          variant="contained"
        >
          Purchase Item
        </Button>
      </CardActions>
    </GreyCard>
  );
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps: ', state);
  return {
    purchasedProduct: state.purchaseProduct,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    purchaseProductUsing: (itemId: string) => dispatch(purchaseProduct(itemId)),
  };
};

export { PurchaseComponent };
export default connect(mapStateToProps, mapDispatchToProps)(PurchaseComponent);
