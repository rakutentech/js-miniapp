import React from 'react';

import { Typography, CardContent, CardMedia, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GreyCard from '../components/GreyCard';
const useStyles = makeStyles((theme) => ({
  grid: {
    position: 'relative',
    top: '25%',
  },
  typography: {
    marginTop: '1rem',
  },
}));

function GIFComponent() {
  const classes = useStyles();
  const images = [
    {
      label: 'Loop Count: Once',
      iconSrc: require('../assets/images/gif/road.gif'),
      altLabel: 'road',
    },
    {
      label: 'Loop Count: Infinite',
      iconSrc: require('../assets/images/gif/road_infinite.gif'),
      altLabel: 'infinite_road',
    },
    {
      label: 'Loop Count: Infinite (WebP)',
      // $FlowFixMe
      iconSrc: require('../assets/images/webp/road.webp'),
      altLabel: 'infinite_road_webp',
    },
  ];
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      className={classes.grid}
    >
      {images.map((it, i) => (
        <Grid item key={i}>
          <GreyCard height="auto">
            <Typography className={`app-typography ${classes.typography}`}>
              {it.label}
            </Typography>
            <CardContent>
              <CardMedia
                component="img"
                className={classes.gif}
                src={it.iconSrc}
                alt={it.altLabel}
              />
            </CardContent>
          </GreyCard>
        </Grid>
      ))}
    </Grid>
  );
}

export default GIFComponent;
