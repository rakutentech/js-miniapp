import React, { useState, useEffect } from 'react';

import { CardContent, makeStyles } from '@material-ui/core';
import AppSettingsAltRoundedIcon from '@mui/icons-material/AppSettingsAltRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import PhoneIcon from '@mui/icons-material/Phone';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import HttpRoundedIcon from '@mui/icons-material/HttpRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TokenIcon from '@mui/icons-material/Token';
import MiniApp, {
  MAAnalyticsActionType,
  MAAnalyticsEventType,
} from 'js-miniapp-sdk';
import { connect } from 'react-redux';
import { sendAnalytics } from './helper';

import {
  setHostEnvironmentInfo,
  onSecureStorageReady,
} from '../services/landing/actions';

type LandingProps = {
  platform: ?string,
  platformVersion: ?string,
  hostVersion: ?string,
  sdkVersion: ?string,
  hostLocale: ?string,
  infoError: string,
  hostBuildType?: string,
  deviceToken?: string,
  pushToken?: string,
  getHostInfo: Function,
  onSecureStorageReady: Function,
  secureStorageStatus: string,
};

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px',
  },
  content: {
    height: '100%',
    width: '100%',
    justifyContent: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    fontSize: 18,
    color: theme.color.primary,
    fontWeight: 'bold',
    '& p': {
      lineHeight: 1.5,
    },
    overflowY: 'auto',
  },
  info: {
    fontSize: 16,
    lineBreak: 'anywhere',
    wordBreak: 'break-all',
    marginTop: 0,
  },
  button: {
    minHeight: 40,
    margin: 0,
  },
  paddingTop50: {
    marginTop: '50px',
  },
}));

const Landing = (props: LandingProps) => {
  const classes = useStyles();
  const [darkMode, setDarkMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('UNKNOWN');

  useEffect(() => {
    try {
      sendAnalytics(
        MAAnalyticsEventType.appear,
        MAAnalyticsActionType.open,
        'Home',
        'Screen',
        'Page',
        ''
      );
      props.getHostInfo();
      checkSecureStorageStorageReady(props);
      getDarkMode();
      getPhoneNumber();
      isLoggedIn();
    } catch (e) {
      console.log(e);
    }
  }, [props]);

  function getDarkMode() {
    MiniApp.miniappUtils
      .isDarkMode()
      .then((response) => {
        setDarkMode(response);
      })
      .catch((miniAppError) => {
        console.log('getDarkMode - Error: ', miniAppError);
      });
  }

  function getPhoneNumber() {
    MiniApp.user
      .getPhoneNumber()
      .then((response) => {
        setPhoneNumber(response);
      })
      .catch((miniAppError) => {
        console.log('getPhoneNumber - Error: ', miniAppError);
      });
  }

  function isLoggedIn() {
    MiniApp.user
      .isLoggedIn()
      .then((response) => {
        setLoggedIn(response);
      })
      .catch((miniAppError) => {
        console.log('isLoggedIn - Error: ', miniAppError);
      });
  }

  return (
    <CardContent className={classes.content}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AppSettingsAltRoundedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Host Version"
            secondary={props.hostVersion ?? '-'}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BuildCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Build Type:"
            secondary={String(props.hostBuildType) || '-'}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LanguageRoundedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Host Locale:"
            secondary={props.hostLocale ?? '-'}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <HelpRoundedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            style={{ wordBreak: 'break-word' }}
            primary="Query Parameters"
            secondary={window.location.search || 'None'}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LockOpenIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            style={{ wordBreak: 'break-word' }}
            primary="Login Status"
            secondary={String(loggedIn)}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <DevicesOtherIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Platform"
            secondary={props.platform ?? props.infoError ?? 'Unknown'}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <SystemUpdateIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Platform Version"
            secondary={props.platformVersion ?? '-'}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PhoneIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Phone #" secondary={String(phoneNumber)} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <SettingsApplicationsRoundedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="SDK Version"
            secondary={props.sdkVersion ?? '-'}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <HttpRoundedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="URL Fragment"
            secondary={window.location.hash || 'None'}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <StorageRoundedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Secure Storage Status"
            secondary={props.secureStorageStatus}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <DarkModeRoundedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Dark mode" secondary={String(darkMode)} />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <TokenIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Device Token:"
            secondary={props.deviceToken ?? '-'}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <TokenIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Push Token:"
            secondary={props.pushToken ?? '-'}
          />
        </ListItem>
      </List>
    </CardContent>
  );
};

function checkSecureStorageStorageReady(props: LandingProps) {
  props
    .onSecureStorageReady()
    .then((response) => {
      console.log('Page - checkSecureStorageStorageReady - Success', response);
    })
    .catch((miniAppError) => {
      console.log(
        'Page - checkSecureStorageStorageReady - Error: ',
        miniAppError
      );
    });
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    platform: state.info.platform,
    platformVersion: state.info.platformVersion,
    hostVersion: state.info.hostVersion,
    sdkVersion: state.info.sdkVersion,
    hostLocale: state.info.hostLocale,
    infoError: state.info.infoError,
    hostBuildType: state.info.hostBuildType,
    deviceToken: state.info.deviceToken,
    pushToken: state.info.pushToken,
    secureStorageStatus:
      (state.secureStorageStatus.isReady && 'Ready') ||
      state.secureStorageStatus.error ||
      'Not Ready',
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHostInfo: () => dispatch(setHostEnvironmentInfo()),
    onSecureStorageReady: () => dispatch(onSecureStorageReady()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
