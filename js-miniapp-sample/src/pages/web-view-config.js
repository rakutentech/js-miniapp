// @flow
import React from 'react';

import {
  Card,
  CardContent,
  makeStyles,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import MiniApp from 'js-miniapp-sdk';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    width: '100%',
  },
  content: {
    height: '50%',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 18,
    color: theme.color.primary,
    fontWeight: 'bold',
  },
  toggleButton: {
    '&.Mui-selected': {
      backgroundColor: 'blue',
      color: 'white',
    },
  },
  iosSwitchBase: {
    '&.Mui-checked': {
      color: theme.palette.common.white,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  iosSwitchTrack: {
    borderRadius: 20 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      left: 12,
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.common.white
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
    },
    '&:after': {
      right: 12,
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.common.white
      )}" d="M19,13H5V11H19V13Z"/></svg>')`,
    },
  },
}));

const WebViewConfig = () => {
  const classes = useStyles();
  const [toggle, setToggle] = React.useState(true);

  const handleToggleChange = (event) => {
    const newToggleValue = event.target.checked;
    setToggle(newToggleValue);
    MiniApp.webviewManager
      .allowBackForwardNavigationGestures(newToggleValue)
      .then((response) => {
        console.log('allowBackForwardNavigationGestures Response: ', response);
      })
      .catch((error) => {
        console.log('allowBackForwardNavigationGestures Error: ', error);
      });
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <h2>Web View Configuration</h2>
        <FormControlLabel
          control={
            <Switch
              checked={toggle}
              onChange={handleToggleChange}
              classes={{
                switchBase: classes.iosSwitchBase,
                track: classes.iosSwitchTrack,
              }}
            />
          }
          label="Allow Back/Forward Navigation Gestures"
        />
      </CardContent>
    </Card>
  );
};

export default WebViewConfig;
