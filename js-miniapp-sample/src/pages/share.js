import React from 'react';
import MiniApp from 'js-miniapp-sdk';

import {
  Button,
  CardContent,
  CardActions,
  makeStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';

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

type UUIDProps = {
  uuid: string,
  getSdkId: Function,
};

function Share() {
  const classes = useStyles();


}
const UuidFetcher = (props: UUIDProps) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.currentTarget.value);
  };

  const shareContent = () => {
    MiniApp.getUniqueId()
      .then((uuidFromSDK) => {
        dispatch({
          type: SET_UUID,
          payload: uuidFromSDK,
        });
      })
      .catch((_) => {
        dispatch({
          type: UUID_FETCH_ERROR,
        });
      });
  };

  return (
    <GreyCard>
    <CardContent className={classes.content}>
      <TextField
        type="text"
        className={classes.textfield}
        value={inputValue}
        label="Content"
        color="primary"
        inputProps={{
          'data-testid': 'input-field',
        }}
      />
    </CardContent>
    <CardActions className={classes.actions}>
      <Button
        color="primary"
        className={classes.button}
        onClick={shareContent}
        variant="contained"
      >
        Share
      </Button>
    </CardActions>
    </GreyCard>
  );
};
