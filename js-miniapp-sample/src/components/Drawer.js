import React, { useEffect } from 'react';

import { Hidden, Tooltip, useTheme, useMediaQuery } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import semver from 'semver';

import { setPageTitle } from '../services/home/actions';
import { setHostEnvironmentInfo } from '../services/landing/actions';

const useStyles = makeStyles((theme) => ({
  drawer: {},
  drawerPaper: {
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      top: '64px !important',
    },
  },
  drawerPaperContent: {
    height: '100%',
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  drawerPaperContentTopList: {
    height: 'calc(100% - 70px)',
    overflowY: 'scroll',
    [theme.breakpoints.down('xs')]: {
      height: '100%',
    },
  },
  drawerPaperShrink: {
    width: '70px',
    overflowX: 'hidden',
  },
  shrinkedListItem: {
    paddingLeft: '24px',
  },
  NavListRoot: {
    paddingTop: 1,
  },
  tooltip: {
    backgroundColor: theme.color.primary,
  },
  tooltipArrow: {
    color: theme.color.primary,
  },
  navLink: {
    height: 56,
  },
  activeNavLink: {
    backgroundColor: theme.color.primary,
    color: 'white',
    '& .icon': {
      color: 'white',
    },
  },
}));

type ResponsiveDrawerProps = {
  shrinked: boolean,
  show: boolean,
  width: any,
  navItems: Array<any>,
  onShrink: Function,
  onOpenClose: Function,
  changeTitle: Function,
  sdkVersion: string,
  getHostInfo: Function,
};

const ResponsiveDrawer = (props: ResponsiveDrawerProps) => {
  useEffect(() => {
    try {
      props.getHostInfo();
    } catch (e) {
      console.log(e);
    }
  }, [props]);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  if (isMobile) {
    props = { ...props, shrinked: false };
  }
  const toggleShrink = () => {
    props.onShrink();
  };

  const isSupportedSdkVersion = (supportedAbove, supportedBelow) => {
    const sdkVersion = props.sdkVersion || '0.0.1';
    supportedAbove = supportedAbove || '0.0.1';
    supportedBelow = supportedBelow || '10000.0.0';

    return (
      semver.gte(sdkVersion, supportedAbove) &&
      semver.lte(sdkVersion, supportedBelow)
    );
  };

  return (
    <SwipeableDrawer
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
      anchor="left"
      variant={!isMobile ? 'persistent' : 'temporary'}
      open={props.show}
      onClose={(e) => props.onOpenClose(e)}
      onOpen={(e) => props.onOpenClose(e)}
    >
      <div
        className={clsx(classes.drawerPaperContent, {
          [classes.drawerPaperShrink]: props.shrinked,
        })}
        role="presentation"
      >
        <List
          className={clsx(classes.drawerPaperContentTopList)}
          classes={{ root: classes.NavListRoot }}
        >
          {props.show &&
            props.navItems.map(
              (it) =>
                isSupportedSdkVersion(
                  it.supportedAboveSdkVersion,
                  it.supportedBelowSdkVersion
                ) && (
                  <Tooltip
                    key={it.label}
                    arrow
                    title={props.shrinked ? it.label : ''}
                    placement="right"
                    enterDelay={100}
                    classes={{
                      tooltip: classes.tooltip,
                      arrow: classes.tooltipArrow,
                    }}
                  >
                    <ListItem
                      button
                      onClick={() => {
                        props.changeTitle(it.label);
                        if (isMobile) {
                          props.onOpenClose(undefined);
                        }
                      }}
                      component={NavLink}
                      to={it.navLink}
                      key={it.label}
                      activeclassname={classes.activeNavLink}
                      className={clsx(classes.navLink, {
                        [classes.shrinkedListItem]: props.shrinked,
                      })}
                    >
                      <ListItemIcon className="icon">{it.icon}</ListItemIcon>
                      <ListItemText
                        primary={props.shrinked ? '  ' : it.label}
                      />
                    </ListItem>
                  </Tooltip>
                )
            )}
        </List>
        <Hidden only={['xs']}>
          <List>
            <Divider />
            <Tooltip
              arrow
              title={props.shrinked ? 'Expand' : ''}
              placement="right"
              enterDelay={1000}
              classes={{
                tooltip: classes.tooltip,
                arrow: classes.tooltipArrow,
              }}
            >
              <ListItem
                button
                onClick={toggleShrink}
                className={clsx({
                  [classes.shrinkedListItem]: props.shrinked,
                })}
              >
                <ListItemIcon>
                  {props.shrinked ? <ArrowForwardIcon /> : <ArrowBackIcon />}
                </ListItemIcon>
                <ListItemText primary={props.shrinked ? 'Expand' : 'Shrink'} />
              </ListItem>
            </Tooltip>
          </List>
        </Hidden>
      </div>
    </SwipeableDrawer>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ...props,
    sdkVersion: state.info.sdkVersion,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTitle: (title) => dispatch(setPageTitle(title)),
    getHostInfo: () => dispatch(setHostEnvironmentInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer);
