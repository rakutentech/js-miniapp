import React, { useEffect } from 'react';
import { CardContent, makeStyles } from '@material-ui/core';
import GreyCard from '../components/GreyCard';
import { setHostEnvironmentInfo } from '../services/landing/actions';
import { connect } from 'react-redux';

type LandingProps = {
  platform: ?string,
  platformVersion: ?string,
  hostVersion: ?string,
  sdkVersion: ?string,
  infoError: string,
  getHostInfo: Function,
};

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    height: '25%',
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    fontSize: 18,
    color: theme.color.primary,
    fontWeight: 'bold',
    '& p': {
      lineHeight: 1.5,
    },
  },
  info: {
    fontSize: 16,
    lineBreak: 'anywhere',
    wordBreak: 'break-all',
    marginTop: 0,
  },
  button: {
    minHeight: 40,
    margin: 0
  },
}));

const Landing = (props: LandingProps) => {
  const classes = useStyles();

  useEffect(()=>{
    try {
      props.getHostInfo()
    } catch(e) {
      console.log(e)
    }
  }, []);

  return (
    <GreyCard className={classes.card}>
      <CardContent className={classes.content}>
        <p>Demo Mini App JS SDK</p>
        <p className={classes.info}>
          Platform: {props.info.platform ?? props.infoError ?? 'Not Available'}<br/>
          Platform Version: {props.info.platformVersion ?? '-'}<br/>
          Host Version: {props.info.hostVersion ?? '-'}<br/>
          SDK Version: {props.info.sdkVersion ?? '-'}
        </p>
        <p className={classes.info}>
          Query Parameters: {window.location.search || 'None'}
        </p>
        <p className={classes.info}>
          URL Fragment: {window.location.hash || 'None'}
        </p>
      </CardContent>
    </GreyCard>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ...props,
    info: state.info,
    infoError: state.info.infoError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHostInfo: () => dispatch(setHostEnvironmentInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);