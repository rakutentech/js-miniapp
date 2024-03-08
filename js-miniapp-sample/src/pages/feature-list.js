import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core';
import MiniApp from 'js-miniapp-sdk';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Brightness1Icon from '@mui/icons-material/Brightness1';

const useStyles = makeStyles((theme) => ({
  content: {
    height: '25%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 18,
    color: theme.color.primary,
    fontWeight: 'bold',
  },
  card: {
    marginTop: '40px',
  },
  actions: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  button: {
    marginTop: '20px',
    width: '80%',
    maxWidth: 280,
  },
  textfield: {
    width: '80%',
    maxWidth: 300,
    '& input': {
      color: theme.color.primary,
      lineHeight: '1.5em',
      fontSize: '1.2em',
      background: 'white',
    },
  },
  scrollable: {
    overflowY: 'auto',
    width: '100%',
    paddingBottom: 20,
  },
}));

function FeatureListComponent() {
  const classes = useStyles();
  const [featureList, setFeatureList] = useState();
  useEffect(() => {
    try {
      getFeatureList();
    } catch (e) {
      console.log(e);
    }
  });

  function getFeatureList() {
    MiniApp.miniappUtils
      .getFeatureList()
      .then((response) => {
        setFeatureList(response);
        console.log('getFeatureList SUCCESS: ', response);
      })
      .catch((error) => {
        console.log('getFeatureList ERROR: ', error);
      });
  }

  return (
    <div className={classes.scrollable}>
      {featureList &&
        featureList.map((item) => (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Brightness1Icon />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
    </div>
  );
}

export default FeatureListComponent;
