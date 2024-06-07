import React, { Fragment, useReducer, useState, useEffect } from 'react';

import {
  Button,
  CircularProgress,
  FormGroup,
  Typography,
  CardContent,
  FormControl,
  TextField,
} from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  CustomPermission,
  CustomPermissionResult,
  CustomPermissionName,
  CustomPermissionStatus,
  AccessTokenData,
  MiniAppError,
} from 'js-miniapp-sdk';
import { connect } from 'react-redux';

import GreyCard from '../components/GreyCard';
import { displayDate } from '../js_sdk';
import { requestCustomPermissions } from '../services/permissions/actions';
import { requestAccessToken } from '../services/user/actions';
import { sendAnalytics } from './helper';
import { MAAnalyticsActionType, MAAnalyticsEventType } from 'js-miniapp-sdk';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px',
    overflowY: 'scroll',
  },
  wrapper: {
    position: 'relative',
    marginTop: 20,
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
    marginTop: 20,
  },
  success: {
    color: green[500],
    marginTop: 20,
    textAlign: 'center',
    wordWrap: 'anywhere',
  },
  rootFormGroup: {
    alignItems: 'center',
  },
  red: {
    color: red[500],
  },
}));

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
  permissionDenied: false,
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'TOKEN_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: null,
        permissionDenied: false,
      };
    case 'TOKEN_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null,
        permissionDenied: false,
      };
    case 'TOKEN_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        error:
          (typeof action.error == 'string'
            ? action.error
            : action.error.message) || '',
      };
    case 'PERMISSION_FAILURE':
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: null,
        permissionDenied: true,
      };
    default:
      throw new Error();
  }
};

type AuthTokenProps = {
  permissions: CustomPermissionName[],
  accessToken: AccessTokenData,
  error: MiniAppError,
  getAccessToken: (audience: string, scopes: string[]) => Promise<string>,
  requestPermissions: (
    permissions: CustomPermission[]
  ) => Promise<CustomPermissionResult[]>,
};

function AuthToken(props: AuthTokenProps) {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  const classes = useStyles();
  const [scope, setScope] = useState({
    audience: 'rae',
    scopes: ['idinfo_read_openid', 'memberinfo_read_point'],
  });
  const buttonClassname = clsx({
    [classes.buttonFailure]: state.isError,
    [classes.buttonSuccess]: !state.isError,
  });
  const onAudienceChange = (event) => {
    setScope({ ...scope, audience: event.target.value });
  };
  const onScopesChange = (event) => {
    setScope({ ...scope, scopes: event.target.value.split(', ') });
  };

  useEffect(() => {
    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'Auth Token',
      'Screen',
      'Page',
      ''
    );
  });
  function requestAccessTokenPermission() {
    const permissionsList = [
      {
        name: CustomPermissionName.ACCESS_TOKEN,
        description:
          'We would like to get the Access token details to share with this Mini app',
      },
    ];
    props
      .requestPermissions(permissionsList)
      .then((permissions) => {
        if (permissions) {
          permissions
            .filter(
              (permission) =>
                permission.status === CustomPermissionStatus.ALLOWED
            )
            .map((permission) => permission.name);
          if (!hasPermission(CustomPermissionName.ACCESS_TOKEN, permissions)) {
            requestAccessToken();
          } else {
            dispatch({ type: 'PERMISSION_FAILURE', permissionDenied: true });
          }
        } else {
          dispatch({ type: 'PERMISSION_FAILURE', permissionDenied: true });
        }
      })
      .catch((error) => {
        dispatch({ type: 'PERMISSION_FAILURE', permissionDenied: true });
      });
  }

  function hasPermission(permission, permissionList: ?(string[])) {
    permissionList = permissionList || props.permissions || [];
    return permissionList.indexOf(permission) > -1;
  }

  function requestAccessToken() {
    props
      .getAccessToken(scope.audience, scope.scopes)
      .then((permissions) => {
        dispatch({ type: 'TOKEN_FETCH_SUCCESS' });
      })
      .catch((e) => {
        dispatch({ type: 'TOKEN_FETCH_FAILURE', error: e });
      });
  }

  function handleClick(e) {
    if (!state.isLoading) {
      e.preventDefault();
      dispatch({ type: 'TOKEN_FETCH_INIT' });
      requestAccessTokenPermission();
    }
  }

  function ButtonWrapper() {
    return (
      <div className={classes.wrapper}>
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={state.isLoading}
          data-testid="authButton"
        >
          Authentication
        </Button>
        {state.isLoading && (
          <CircularProgress size={20} className={classes.buttonProgress} />
        )}
      </div>
    );
  }

  return (
    <GreyCard height="auto" className={classes.card}>
      <CardContent>
        <FormGroup column="true" classes={{ root: classes.rootFormGroup }}>
          <Fragment>
            <FormControl className={classes.formControl}>
              <TextField
                id="audience"
                label="Audience"
                className={classes.fields}
                onChange={onAudienceChange}
                value={scope.audience}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="scopes"
                label="Scopes"
                className={classes.fields}
                onChange={onScopesChange}
                value={scope.scopes.join(', ')}
              />
            </FormControl>
          </Fragment>
          {ButtonWrapper()}
          {!state.isLoading &&
            state.isSuccess &&
            !state.isError &&
            !state.permissionDenied &&
            props.accessToken && (
              <div>
                <Typography variant="body1" className={classes.success}>
                  Token: {props.accessToken.token}
                </Typography>
                <Typography variant="body1" className={classes.success}>
                  Valid until: {displayDate(props.accessToken.validUntil)}
                </Typography>
              </div>
            )}
          {!state.isLoading && state.isError && !state.permissionDenied && (
            <Typography variant="body1" className={classes.red}>
              {state.error}
            </Typography>
          )}
          {!state.isLoading && state.permissionDenied && (
            <Typography variant="body1" className={classes.red}>
              ACCESS_TOKEN Permission is denied by the user
            </Typography>
          )}
        </FormGroup>
      </CardContent>
    </GreyCard>
  );
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    permissions: state.permissions,
    accessToken: state.user.accessToken,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAccessToken: (audience: string, scopes: string[]) =>
      dispatch(requestAccessToken(audience, scopes)),
    requestPermissions: (permissions) =>
      dispatch(requestCustomPermissions(permissions)),
  };
};

export { AuthToken };
export default connect(mapStateToProps, mapDispatchToProps)(AuthToken);
