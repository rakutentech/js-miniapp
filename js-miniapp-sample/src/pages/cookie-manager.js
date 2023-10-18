import React, { useReducer, useState } from 'react';

import MiniApp from 'js-miniapp-sdk';

import {
  Button,
  CardContent,
  CardActions,
  makeStyles,
  Typography,
  ListItem,
  ListItemText,
  Container,
  TextField,
} from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import GreyCard from '../components/GreyCard';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    height: 'auto',
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
  scrollable: {
    overflowY: 'auto',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  root: {
    background: theme.color.secondary,
    height: '90%',
    width: '100%',
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
  listItemStyle: {
    overflowWrap: 'anywhere',
  },
  wrapperContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 0,
  },
  label: {
    display: 'block',
    fontSize: 12,
    width: '100%',
    color: theme.color.primary,
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
        cookieInfo: null,
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
  let [infoInputName, setInfoInputName] = useState();
  let [infoInputName1, setInfoInputName1] = useState();

  const clearInfoSendInput = () => {
    setInfoInputName('');
    setInfoInputName1('');
    dispatch({
      type: 'COOKIE_FETCH_INIT',
      miniAppError: null,
      inputError: null,
    });
  };

  function getAllCookies() {
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

  function getCookies() {
    MiniApp.cookieManager
      .getCookies([infoInputName, infoInputName1])
      .then((response) => {
        dispatch({
          type: 'COOKIE_FETCH_SUCCESS',
          miniAppError: null,
          cookieInfo: response,
        });
      })
      .catch((error) => {
        console.log('getCookies ERROR: ', error);
      });
  }

  function ShowCookieDetails() {
    return (
      <div>
        {state.cookieInfo &&
          state.cookieInfo.map((cookie) => (
            <ListItem
              divider
              className={classes.displayInlineBlock}
              key={cookie.id}
            >
              <ListItemText
                className={classes.listItemStyle}
                primary={'Name: ' + cookie.name}
                secondary={
                  <React.Fragment>
                    <Typography>
                      {cookie.value && cookie.value !== '' && (
                        <span>{'Value: ' + cookie.value}</span>
                      )}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
      </div>
    );
  }

  function GetAllCookiesTab() {
    return (
      <div className={classes.scrollable}>
        <GreyCard className={classes.card}>
          {!state.isLoading && state.cookieInfo && (
            <CardContent>{ShowCookieDetails()}</CardContent>
          )}
        </GreyCard>
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
      </div>
    );
  }

  function GetSpecificCookiesTab() {
    return (
      <div className={classes.scrollable}>
        <div>
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-name"
            label={'Name'}
            value={infoInputName}
            onChange={(e) => setInfoInputName(e.target.value)}
          />
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-name"
            label={'Name'}
            value={infoInputName1}
            onChange={(e) => setInfoInputName1(e.target.value)}
          />
        </div>
        <CardActions className={classes.actions}>
          <Button
            color="primary"
            className={classes.button}
            onClick={getCookies}
            variant="contained"
          >
            Get Cookies
          </Button>
          <Button
            className={classes.button}
            onClick={clearInfoSendInput}
            variant="contained"
          >
            Clear
          </Button>
        </CardActions>

        <GreyCard className={classes.card}>
          {!state.isLoading && state.cookieInfo && (
            <CardContent>{ShowCookieDetails()}</CardContent>
          )}
        </GreyCard>
      </div>
    );
  }

  const [tabValue, setTabValue] = React.useState('1');

  const handleTabChange = (event: Event, newValue: string) => {
    dispatch({
      type: 'COOKIE_FETCH_INIT',
      miniAppError: null,
      inputError: null,
    });
    setTabValue(newValue);
  };

  return (
    <Container className={classes.wrapperContainer}>
      <TabContext value={tabValue}>
        <TabList variant="scrollable" onChange={handleTabChange}>
          <Tab label="Get all" value="1" />
          <Tab label="Get specific" value="2" />
        </TabList>
        <TabPanel value="1">{GetAllCookiesTab()}</TabPanel>
        <TabPanel value="2">{GetSpecificCookiesTab()}</TabPanel>
      </TabContext>
    </Container>
  );
}

export default CookieManagerComponent;
