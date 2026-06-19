import React, { useEffect, useState } from 'react';

import {
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  AccessTokenData,
  CustomPermission,
  CustomPermissionName,
  CustomPermissionResult,
  MAAnalyticsActionType,
  MAAnalyticsEventType,
  MiniAppError,
} from 'js-miniapp-sdk';
import { connect } from 'react-redux';

import { displayDate } from '../js_sdk';
import { requestCustomPermissions } from '../services/permissions/actions';
import { requestAccessToken } from '../services/user/actions';
import { sendAnalytics } from './helper';

const AUDIENCE_SCOPES = {
  rae: ['your_service_scope_here', 'your_service_scope_here'],
  'api-c': ['your_service_scope_here'],
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    maxWidth: 480,
    margin: '0 auto',
  },
  field: {
    marginBottom: theme.spacing(3),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.25),
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginBottom: theme.spacing(3),
  },
  result: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
    wordBreak: 'break-all',
  },
  resultLabel: {
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
  },
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(1),
  },
}));

type AuthTokenProps = {
  permissions: CustomPermissionName[],
  accessToken: AccessTokenData,
  error: MiniAppError,
  getAccessToken: (
    audience: string,
    scopes: string[],
    serviceId?: string
  ) => Promise<string>,
  requestPermissions: (
    permissions: CustomPermission[]
  ) => Promise<CustomPermissionResult[]>,
};

function AuthToken(props: AuthTokenProps) {
  const classes = useStyles();

  const [audience, setAudience] = useState('rae');
  const [selectedScopes, setSelectedScopes] = useState([
    'your_service_scope_here',
    'your_service_scope_here',
  ]);
  const [serviceId, setServiceId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'Access Token',
      'Screen',
      'Page',
      ''
    );
  }, []);

  function onAudienceChange(e) {
    const newAudience = e.target.value;
    setAudience(newAudience);
    setSelectedScopes(AUDIENCE_SCOPES[newAudience] || []);
  }

  function onScopesChange(e) {
    setSelectedScopes(e.target.value);
  }

  function hasPermission(permission, permissionList) {
    const list = permissionList || props.permissions || [];
    return list.indexOf(permission) > -1;
  }

  function fetchToken() {
    props
      .getAccessToken(audience, selectedScopes, serviceId || undefined)
      .then(() => {
        setIsError(false);
        setStatusMessage('');
      })
      .catch((e) => {
        setIsError(true);
        setStatusMessage(
          typeof e === 'string' ? e : e.message || 'Failed to get access token'
        );
      })
      .finally(() => setIsLoading(false));
  }

  function handleClick(e) {
    e.preventDefault();
    if (isLoading || selectedScopes.length === 0) return;

    setIsLoading(true);
    setStatusMessage('');
    setIsError(false);

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
        if (
          permissions &&
          !hasPermission(CustomPermissionName.ACCESS_TOKEN, permissions)
        ) {
          fetchToken();
        } else {
          setIsLoading(false);
          setIsError(true);
          setStatusMessage('ACCESS_TOKEN permission was denied');
        }
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
        setStatusMessage('ACCESS_TOKEN permission was denied');
      });
  }

  const availableScopes = AUDIENCE_SCOPES[audience] || [];
  const token = props.accessToken;

  return (
    <div className={classes.container}>
      {/* Audience */}
      <FormControl variant="outlined" fullWidth className={classes.field}>
        <InputLabel id="audience-label">Audience</InputLabel>
        <Select
          labelId="audience-label"
          value={audience}
          onChange={onAudienceChange}
          label="Audience"
        >
          {Object.keys(AUDIENCE_SCOPES).map((aud) => (
            <MenuItem key={aud} value={aud}>
              {aud}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Scopes */}
      <FormControl variant="outlined" fullWidth className={classes.field}>
        <InputLabel id="scopes-label">Scopes</InputLabel>
        <Select
          labelId="scopes-label"
          multiple
          value={selectedScopes}
          onChange={onScopesChange}
          label="Scopes"
          input={<Input />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((scope) => (
                <Chip
                  key={scope}
                  label={scope}
                  size="small"
                  className={classes.chip}
                />
              ))}
            </div>
          )}
        >
          {availableScopes.map((scope) => (
            <MenuItem key={scope} value={scope}>
              <Checkbox
                checked={selectedScopes.includes(scope)}
                color="primary"
              />
              <ListItemText primary={scope} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider className={classes.divider} />

      {/* Service ID */}
      <TextField
        label="Service ID (optional)"
        variant="outlined"
        fullWidth
        className={classes.field}
        value={serviceId}
        onChange={(e) => setServiceId(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={classes.button}
        onClick={handleClick}
        disabled={isLoading || selectedScopes.length === 0}
        data-testid="authButton"
      >
        {isLoading ? (
          <CircularProgress size={22} color="inherit" />
        ) : (
          'Get Access Token'
        )}
      </Button>

      {!isLoading && !isError && token && (
        <div className={classes.result}>
          <Typography variant="body2" className={classes.resultLabel}>
            Token
          </Typography>
          <Typography variant="body2" gutterBottom>
            {token.token}
          </Typography>
          <Typography variant="body2" className={classes.resultLabel}>
            Valid Until
          </Typography>
          <Typography variant="body2">
            {displayDate(token.validUntil)}
          </Typography>
        </div>
      )}

      {!isLoading && isError && (
        <Typography variant="body2" className={classes.error}>
          {statusMessage}
        </Typography>
      )}
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  ...props,
  permissions: state.permissions,
  accessToken: state.user.accessToken,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  getAccessToken: (audience, scopes, serviceId) =>
    dispatch(requestAccessToken(audience, scopes, serviceId)),
  requestPermissions: (permissions) =>
    dispatch(requestCustomPermissions(permissions)),
});

export { AuthToken };
export default connect(mapStateToProps, mapDispatchToProps)(AuthToken);
