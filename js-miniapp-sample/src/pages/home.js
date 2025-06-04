import React, { useState, useEffect } from 'react';

import {
  makeStyles,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@material-ui/core';
import LogoutIcon from '@mui/icons-material/Logout';
import clsx from 'clsx';
import MiniApp from 'js-miniapp-sdk';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { navItems } from './../routes';
import Dialogue from '../components/Dialogue';
import ToolBar from '../components/ToolBar';

const DRAWER_WIDTH = '250px';
const DRAWER_SHRINKED_WIDTH = '70px';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    width: '100%',
    height: 'calc(100% - 64px)',
  },
  mainContentMobile: {
    height: 'calc(100% - 56px)',
  },
  wrapperContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'initial',
    alignItems: 'center',
    overflow: 'auto',
  },
  drawerClosed: {
    width: '100% !important',
    marginLeft: '0 !important',
  },
  drawerOpen: {
    width: `calc(100% - ${DRAWER_WIDTH})`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerOpenShrink: {
    width: `calc(100% - ${DRAWER_SHRINKED_WIDTH})`,
    marginLeft: DRAWER_SHRINKED_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  logOutButton: {
    marginLeft: 'auto',
    marginRight: 0,
    color: theme.color.white,
  },
}));

const Home = (props: any) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [shrink, setShrink] = useState(false);
  const [showDrawer, setShowDrawer] = useState(!isMobile);
  const [showLogOutConfirmation, setShowLogOutConfirmation] = useState(false);
  const [logOutError, setLogOutError] = useState('');

  useEffect(() => {
    setShowDrawer(!isMobile);
  }, [isMobile]);
  const onShrinkToggle = (shrinkState) => {
    setShrink(shrinkState);
  };
  const onDrawerToggle = (show) => {
    setShowDrawer(show);
  };
  const openLogOutDialog = () => {
    setLogOutError('');
    setShowLogOutConfirmation(true);
  };
  const closeLogOutDialog = () => {
    setShowLogOutConfirmation(false);
  };
  const confirmLogOutDialog = async () => {
    try {
      MiniApp.user
        .forceLogout()
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          setLogOutError(error.message || error);
        });
    } catch (error) {
      setLogOutError(error.message || error);
    }
  };
  return (
    <Router>
      <ToolBar
        showDrawer={showDrawer}
        onDrawerToggle={onDrawerToggle}
        onShrinkToggle={onShrinkToggle}
        navItems={navItems}
        actions={
          <IconButton
            className={classes.logOutButton}
            onClick={openLogOutDialog}
          >
            <LogoutIcon />
          </IconButton>
        }
      ></ToolBar>
      <main
        data-testid="homepage-main-content"
        className={clsx(classes.mainContent, {
          [classes.mainContentMobile]: isMobile,
          [classes.drawerOpen]: !isMobile && showDrawer,
          [classes.drawerClosed]: !isMobile && !showDrawer,
          [classes.drawerOpenShrink]: !isMobile && shrink,
        })}
      >
        <Container className={classes.wrapperContainer}>
          <Routes>
            {navItems.map((it) => (
              <Route
                key={it.navLink}
                path={it.navLink}
                element={
                  it.element ??
                  (() => (
                    <div
                      data-testid="nav-routes"
                      style={{ fontSize: '32px', textAlign: 'center' }}
                    >
                      {it.label}
                    </div>
                  ))
                }
              ></Route>
            ))}
            <Route path="*" element={navItems[0].element}></Route>
          </Routes>
        </Container>
      </main>
      <Dialogue
        open={showLogOutConfirmation}
        onCloseHandler={closeLogOutDialog}
        onConfirmHandler={confirmLogOutDialog}
        contentText="Are you sure you want to logout?"
        errorText={logOutError}
      />
    </Router>
  );
};

export default Home;
