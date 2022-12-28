import React, { Fragment, useState, useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { navLinks } from '../routes';
import Drawer from './Drawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // flexGrow: 1,
  },
}));

type ToolBarProps = {
  showDrawer: Boolean,
  actions: any,
  onShrinkToggle: Function,
  onDrawerToggle: Function,
  navItems: any,
};

const ToolBar = (props: ToolBarProps) => {
  const classes = useStyles();
  const [showDrawerState, setDrawer] = useState(props.showDrawer ?? false);

  const location = useLocation();
  const [title, setTitle] = useState('');
  useEffect(() => {
    const navLinkLabel: { navLink: string, label: string } = navLinks.find(
      (item) => item.navLink === location.pathname
    ) ?? { navLink: location.pathname, label: 'Sample MiniApp' };
    setTitle(navLinkLabel.label);
  }, [location.pathname]);
  useEffect(
    () => {
      setDrawer(props.showDrawer);
    }, // eslint-disable-next-line
    [props.showDrawer]
  );
  const [shrinkState, setShrink] = useState(false);
  const toggleDrawer = () => {
    const showFlag = !showDrawerState;
    props.onDrawerToggle(showFlag);
    setDrawer(showFlag);
  };
  const onDrawerShrink = () => {
    const shrinkFlag = !shrinkState;
    props.onShrinkToggle(shrinkFlag);
    setShrink(shrinkFlag);
  };

  const onOpenClose = (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    toggleDrawer();
  };
  return (
    <Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            data-testid="drawer-toggle-button"
          >
            {showDrawerState ? (
              <CloseIcon data-testid="close-icon" />
            ) : (
              <MenuIcon data-testid="menu-icon" />
            )}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <div className="actions">{props.actions}</div>
        </Toolbar>
      </AppBar>
      <Drawer
        show={showDrawerState}
        shrinked={shrinkState}
        onOpenClose={onOpenClose}
        onShrink={onDrawerShrink}
        navItems={props.navItems}
      ></Drawer>
    </Fragment>
  );
};

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

const mapStateToProps = (state, props) => {
  return { ...props };
};

export default connect(mapStateToProps)(withRouter(ToolBar));
