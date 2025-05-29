// @flow
import React, { useState, useEffect } from 'react';

import {
  Button,
  CardContent,
  CardActions,
  TextField,
  makeStyles,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core';

import GreyCard from '../components/GreyCard';
import { sendAnalytics } from './helper';
import MiniApp, {
  MAAnalyticsActionType,
  MAAnalyticsEventType,
} from 'js-miniapp-sdk';

const useStyles = makeStyles((theme) => ({
  scrollable: {
    overflowY: 'auto',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 80,
    height: '100vh', // Use height instead of minHeight for scrollable container
    boxSizing: 'border-box',
    // Remove display: flex and flexDirection: column to allow normal block flow and scrolling
  },
  card: {
    width: '100%',
    height: 'auto',
  },
  actions: {
    justifyContent: 'center',
    paddingBottom: 16,
  },
  content: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 18,
    color: theme.color.primary,
    fontWeight: 'bold',
    paddingBottom: 0,
  },
  textfield: {
    width: '100%',
  },
}));

const deepLinkStyle = makeStyles((theme) => ({
  content: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 18,
    color: theme.color.primary,
    fontWeight: 'bold',
    paddingBottom: 0,
    height: '50px',
  },
  card: {
    width: '100%',
    height: '100px',
  },
  actions: {
    justifyContent: 'center',
    paddingBottom: 16,
  },
}));

const UriSchemes = () => {
  const EXTERNAL_WEBVIEW_URL =
    'https://htmlpreview.github.io/?https://raw.githubusercontent.com/rakutentech/js-miniapp/master/js-miniapp-sample/external-webview/index.html';
  const classes = useStyles();
  const deeplinkClass = deepLinkStyle();
  const [params, setParams] = useState('?testSendParam=someValue&test2=test2');
  const [callbackUrl, setCallbackUrl] = useState(
    `${window.location.protocol}//${window.location.host}/index.html`
  );
  const [externalUrl, setExternalUrl] = useState('');
  const [externalBrowserUrl, setExternalBrowserUrl] = useState(
    'https://www.google.com'
  );
  const [internalBrowserUrl, setInternalBrowserUrl] = useState(
    'https://www.google.com'
  );
  // Add state for POST browser
  const [internalPostUrl, setInternalPostUrl] = useState(
    'https://www.google.com'
  );
  const [internalPostBody, setInternalPostBody] = useState(
    '{"isWebview": "true"}'
  );
  const [internalPostError, setInternalPostError] = useState('');
  // Add state for audience and scopes
  const [internalPostAudience, setInternalPostAudience] = useState('');
  const [internalPostScopes, setInternalPostScopes] = useState('');
  // Add state for httpMethod
  const [internalPostMethod, setInternalPostMethod] = useState('POST');

  function validateParams(params: string) {
    return params.startsWith('?') && params.indexOf('=') >= 0;
  }

  useEffect(() => {
    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'URI Schemes',
      'Screen',
      'Page',
      ''
    );
  });

  function onOpenExternalWebview() {
    if (params && !validateParams(params)) {
      window.alert(
        'Invalid params. Please input params in the format ?param1=value1&param2=value2'
      );
      return;
    }

    let url = new URL(EXTERNAL_WEBVIEW_URL + params);

    url.search = url.search
      .concat(url.search ? '&' : '?')
      .concat(`callbackUrl=${encodeURIComponent(callbackUrl)}`);

    onOpenUrl(url);
  }

  function onOpenUrl(url: URL) {
    window.location.href = url;
  }

  function openExternalBrowser(url: string) {
    MiniApp.miniappUtils
      .launchExternalBrowser(url)
      .then((response) => {
        console.log('openExternalBrowser - SUCCESS: ', response);
      })
      .catch((miniAppError) => {
        console.log('openExternalBrowser - Error: ', miniAppError);
      });
  }

  function openInternalBrowser(url: string) {
    MiniApp.miniappUtils
      .launchInternalBrowser(url)
      .then((response) => {
        console.log('openInternalBrowser - SUCCESS: ', response);
      })
      .catch((miniAppError) => {
        console.log('openInternalBrowser - Error: ', miniAppError);
      });
  }

  // Add new function for POST
  function openInternalBrowserPost(
    url: string,
    bodyStr: string,
    audience?: string,
    scopes?: string[]
  ) {
    let httpBody;
    setInternalPostError('');
    try {
      httpBody = JSON.parse(bodyStr);
    } catch (e) {
      setInternalPostError('Invalid JSON in body params');
      return;
    }
    MiniApp.miniappUtils
      .launchInternalBrowser({
        url,
        httpMethod: internalPostMethod,
        httpBody,
        audience,
        scopes,
      })
      .then((response) => {
        console.log('openInternalBrowser (POST) - SUCCESS: ', response);
      })
      .catch((miniAppError) => {
        setInternalPostError(
          miniAppError && miniAppError.message
            ? miniAppError.message
            : 'Failed to launch internal browser'
        );
        console.log('openInternalBrowser (POST) - Error: ', miniAppError);
      });
  }

  return (
    <div className={classes.scrollable}>
      <GreyCard className={classes.card}>
        <CardContent className={classes.content}>
          Launch URL in External Browser
        </CardContent>
        <CardContent className={deeplinkClass.content}>
          <TextField
            className={classes.textfield}
            onChange={(e) => setExternalBrowserUrl(e.currentTarget.value)}
            value={externalBrowserUrl}
            label="URL"
            variant="outlined"
            color="primary"
            inputProps={{
              'data-testid': 'external-input-field',
            }}
          />
        </CardContent>
        <CardActions className={deeplinkClass.actions}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              externalBrowserUrl && openExternalBrowser(externalBrowserUrl)
            }
          >
            Open
          </Button>
        </CardActions>
      </GreyCard>
      <br />
      <GreyCard className={classes.card}>
        <CardContent className={classes.content}>
          Launch URL in Internal Browser
        </CardContent>
        <CardContent className={deeplinkClass.content}>
          <TextField
            className={classes.textfield}
            onChange={(e) => setInternalBrowserUrl(e.currentTarget.value)}
            value={internalBrowserUrl}
            label="URL"
            variant="outlined"
            color="primary"
            inputProps={{
              'data-testid': 'internal-input-field',
            }}
          />
        </CardContent>
        <CardActions className={deeplinkClass.actions}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              internalBrowserUrl && openInternalBrowser(internalBrowserUrl)
            }
          >
            Open
          </Button>
        </CardActions>
      </GreyCard>
      <br />
      <GreyCard className={classes.card}>
        <CardContent className={classes.content}>URL or Deep Link</CardContent>
        <CardContent className={deeplinkClass.content}>
          <TextField
            className={classes.textfield}
            onChange={(e) => setExternalUrl(e.currentTarget.value)}
            value={externalUrl}
            label="Deep Link URL"
            variant="outlined"
            color="primary"
            inputProps={{
              'data-testid': 'deeplink-input-field',
            }}
          />
        </CardContent>
        <CardActions className={deeplinkClass.actions}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => externalUrl && onOpenUrl(externalUrl)}
          >
            Open
          </Button>
        </CardActions>
      </GreyCard>
      <br />
      <GreyCard className={classes.card}>
        <CardContent className={classes.content}>tel: scheme</CardContent>
        <CardActions className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            href="tel:+1-123-456-7890"
          >
            +1-123-456-7890
          </Button>
        </CardActions>

        <CardContent className={classes.content}>tel:// scheme</CardContent>
        <CardActions className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            href="tel://+1-123-456-7890"
          >
            +1-123-456-7890
          </Button>
        </CardActions>

        <CardContent className={classes.content}>mailto:</CardContent>
        <CardActions className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            href="mailto:mail@example.com?cc=ccmail@example.com, ccmail2@example.com, &bcc=bccmail@example.com&subject=Sample subject&body=Sample body."
          >
            Address / cc / bcc / subject / body
          </Button>
        </CardActions>

        <CardContent className={classes.content}>
          External Webview Params & Callback
        </CardContent>
        <CardContent className={classes.content}>
          <TextField
            className={classes.textfield}
            onChange={(e) => setParams(e.currentTarget.value)}
            value={params}
            label="Params to pass"
            variant="outlined"
            color="primary"
            inputProps={{
              'data-testid': 'input-field',
            }}
          />
        </CardContent>
        <CardContent className={classes.content}>
          <TextField
            className={classes.textfield}
            onChange={(e) => setCallbackUrl(e.currentTarget.value)}
            value={callbackUrl}
            label="Mini App Return URL"
            variant="outlined"
            color="primary"
            inputProps={{
              'data-testid': 'callback-input-field',
            }}
          />
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            onClick={onOpenExternalWebview}
          >
            Open
          </Button>
        </CardActions>
      </GreyCard>
      <br />
      <GreyCard className={classes.card}>
        <CardContent className={classes.content}>
          Launch URL in Internal Browsers (POST)
        </CardContent>
        <CardContent className={deeplinkClass.content}>
          {/* HttpMethod dropdown */}
          <FormControl variant="outlined" className={classes.textfield}>
            <InputLabel id="http-method-label">HTTP Method</InputLabel>
            <Select
              labelId="http-method-label"
              value={internalPostMethod}
              onChange={(e) => setInternalPostMethod(e.target.value)}
              label="HTTP Method"
              inputProps={{
                'data-testid': 'internal-post-method-field',
              }}
            >
              <MenuItem value="POST">POST</MenuItem>
              <MenuItem value="GET">GET</MenuItem>
              <MenuItem value="PUT">PUT</MenuItem>
              <MenuItem value="DELETE">DELETE</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
        <CardContent className={deeplinkClass.content}>
          <TextField
            className={classes.textfield}
            onChange={(e) => setInternalPostUrl(e.currentTarget.value)}
            value={internalPostUrl}
            label="URL"
            variant="outlined"
            color="primary"
            inputProps={{
              'data-testid': 'internal-post-url-field',
            }}
          />
        </CardContent>
        <CardContent className={deeplinkClass.content}>
          <TextField
            className={classes.textfield}
            onChange={(e) => setInternalPostBody(e.currentTarget.value)}
            value={internalPostBody}
            label="Body (JSON) (optional)"
            variant="outlined"
            color="primary"
            inputProps={{
              'data-testid': 'internal-post-body-field',
            }}
          />
        </CardContent>
        <CardContent className={deeplinkClass.content}>
          <TextField
            className={classes.textfield}
            onChange={(e) => setInternalPostAudience(e.currentTarget.value)}
            value={internalPostAudience}
            label="Audience (optional)"
            variant="outlined"
            color="primary"
            inputProps={{
              'data-testid': 'internal-post-audience-field',
            }}
          />
        </CardContent>
        <CardContent className={deeplinkClass.content}>
          <TextField
            className={classes.textfield}
            onChange={(e) => setInternalPostScopes(e.currentTarget.value)}
            value={internalPostScopes}
            label="Scopes (comma separated, optional)"
            variant="outlined"
            color="primary"
            inputProps={{
              'data-testid': 'internal-post-scopes-field',
            }}
          />
        </CardContent>
        {internalPostError && (
          <CardContent
            className={deeplinkClass.content}
            style={{ color: 'red', fontSize: 14 }}
          >
            {internalPostError}
          </CardContent>
        )}
        <CardActions className={deeplinkClass.actions}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              internalPostUrl &&
              internalPostBody &&
              openInternalBrowserPost(
                internalPostUrl,
                internalPostBody,
                internalPostAudience || undefined,
                internalPostScopes
                  ? internalPostScopes
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)
                  : undefined
              )
            }
          >
            Open
          </Button>
        </CardActions>
      </GreyCard>
      <br />
      <div style={{ flexGrow: 1 }} />
    </div>
  );
};

export default UriSchemes;
