import React from 'react';
import MiniApp from 'js-miniapp-sdk';

import {
  Button,
  TextField,
  CardContent,
  CardActions,
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

function PurchaseComponent() {
  const classes = useStyles();
  let inputValue = "";

  const handleInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();
    inputValue = e.currentTarget.value;
  };

  const purchaseItem = () => {
    MiniApp.purchaseService.purchaseItemWith(inputValue)
    .then((success) => {
      console.log("Success:", success);
    })
    .catch((error) => {
      console.error(error);
    });
  };

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

export default PurchaseComponent;
