import React, { useState, useEffect } from 'react';

import {
  Button,
  TextField,
  CardContent,
  CardActions,
  makeStyles,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import MiniApp, {
  MAAnalyticsActionType,
  MAAnalyticsEventType,
} from 'js-miniapp-sdk';
import { sendAnalytics } from './helper';
import GreyCard from '../components/GreyCard';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '40px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  content: {
    height: 'auto',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 18,
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  actions: {
    justifyContent: 'center',
    marginTop: '20px',
  },
  textfield: {
    width: '100%',
    maxWidth: 400,
    marginBottom: '20px',
    background: 'white',
    '& input': {
      color: theme.palette.primary.main,
      lineHeight: '1.5em',
      fontSize: '1.2em',
    },
  },
  button: {
    width: '100%',
    maxWidth: 200,
    padding: '10px 0',
    fontSize: '1em',
  },
  formControl: {
    width: '100%',
    maxWidth: 400,
    marginBottom: '20px',
  },
}));

function Share() {
  const classes = useStyles();
  const defaultInputValue = 'This is Sample text to share';
  const defaultImageUrl =
    'https://github.com/test-images/png/blob/main/202105/cs-black-000.png';
  const defaultBase64Image = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/ax5LkAAAAAASUVORK5CYII=`;
  const [inputValue, setInputValue] = useState(defaultInputValue);
  const [imageOption, setImageOption] = useState('none');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'Share',
      'Screen',
      'Page',
      ''
    );
  }, []);

  useEffect(() => {
    if (imageOption === 'url') {
      setImageUrl(defaultImageUrl);
    } else if (imageOption === 'base64') {
      setImageUrl(defaultBase64Image);
    }
  }, [imageOption, defaultBase64Image]);

  const handleInput = (e) => {
    e.preventDefault();
    setInputValue(e.currentTarget.value);
  };

  const handleImageInput = (e) => {
    e.preventDefault();
    setImageUrl(e.currentTarget.value);
  };

  const handleImageOptionChange = (e) => {
    setImageOption(e.target.value);
    setImageUrl(''); // Reset image URL when option changes
  };

  const shareContent = () => {
    let info = { content: inputValue };
    if (imageOption === 'url') {
      info.imageUrl = imageUrl || defaultImageUrl;
    } else if (imageOption === 'base64') {
      info.imageUrl = imageUrl || defaultBase64Image; // Assuming the base64 string is directly used
    }
    MiniApp.shareInfo(info)
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <GreyCard className={classes.card}>
      <CardContent className={classes.content}>
        <TextField
          type="text"
          className={classes.textfield}
          onChange={handleInput}
          placeholder="Enter content here"
          defaultValue={defaultInputValue}
          variant="outlined"
          color="primary"
          multiline
          rowsMax="5"
          inputProps={{
            'data-testid': 'input-field',
          }}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="image-option-label">Image Option</InputLabel>
          <Select
            labelId="image-option-label"
            value={imageOption}
            onChange={handleImageOptionChange}
            label="Image Option"
          >
            <MenuItem value="none">No image</MenuItem>
            <MenuItem value="url">Share image URL</MenuItem>
            <MenuItem value="base64">Convert base64 string to URL</MenuItem>
          </Select>
        </FormControl>
        {imageOption !== 'none' && (
          <TextField
            type="text"
            className={classes.textfield}
            onChange={handleImageInput}
            placeholder={
              imageOption === 'url'
                ? 'Enter image URL'
                : 'Enter base64 image string'
            }
            value={imageUrl}
            variant="outlined"
            color="primary"
            inputProps={{
              'data-testid': 'image-input-field',
            }}
          />
        )}
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          className={classes.button}
          onClick={shareContent}
          variant="contained"
        >
          Share
        </Button>
      </CardActions>
    </GreyCard>
  );
}

export default Share;
