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

  //For LoadUsingHTMLString Interface
  const [loadHTMLStringCallbackUrl, setLoadHTMLStringCallbackUrl] = useState(
    `${window.location.protocol}//${window.location.host}/index.html`
  );
  const [baseUrl, setBaseUrl] = useState('');
  const [htmlString, setHtmlString] = useState(
    `PCFET0NUWVBFIGh0bWw+CjxodG1sPgo8aGVhZD4KICAgIDxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KICAgIDxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wIj4KICAgIDx0aXRsZT4zRFMgUmVkaXJlY3QgVGVzdDwvdGl0bGU+CiAgICA8c3R5bGU+CiAgICAgICAgYm9keSB7CiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjsKICAgICAgICAgICAgZGlzcGxheTogZmxleDsKICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7CiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAgICAgICAgICAgIG1pbi1oZWlnaHQ6IDEwMHZoOwogICAgICAgICAgICBtYXJnaW46IDA7CiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmNGY0ZjQ7CiAgICAgICAgICAgIGNvbG9yOiAjMzMzOwogICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICAgICAgfQogICAgICAgIC5jb250YWluZXIgewogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOwogICAgICAgICAgICBwYWRkaW5nOiA0MHB4OwogICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4OwogICAgICAgICAgICBib3gtc2hhZG93OiAwIDRweCA4cHggcmdiYSgwLDAsMCwwLjEpOwogICAgICAgICAgICBtYXgtd2lkdGg6IDUwMHB4OwogICAgICAgICAgICB3aWR0aDogOTAlOwogICAgICAgIH0KICAgICAgICBoMSB7CiAgICAgICAgICAgIGNvbG9yOiAjMDA1NmIzOwogICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4OwogICAgICAgIH0KICAgICAgICBwIHsKICAgICAgICAgICAgZm9udC1zaXplOiAxLjFlbTsKICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNjsKICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDsKICAgICAgICB9CiAgICAgICAgLmZlYXR1cmUtbm90ZSB7CiAgICAgICAgICAgIGZvbnQtc2l6ZTogMC45ZW07CiAgICAgICAgICAgIGNvbG9yOiAjNTU1OwogICAgICAgICAgICBtYXJnaW4tdG9wOiAyMHB4OwogICAgICAgICAgICBwYWRkaW5nOiAxMHB4OwogICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkOwogICAgICAgICAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkICMwMDdiZmY7CiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlOWY1ZmY7CiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDsKICAgICAgICB9CiAgICAgICAgYnV0dG9uIHsKICAgICAgICAgICAgcGFkZGluZzogMTVweCAzMHB4OwogICAgICAgICAgICBmb250LXNpemU6IDEuMmVtOwogICAgICAgICAgICBjb2xvcjogI2ZmZjsKICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDsKICAgICAgICAgICAgYm9yZGVyOiBub25lOwogICAgICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7CiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjsKICAgICAgICAgICAgbWFyZ2luLXRvcDogMTBweDsKICAgICAgICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2UsIHRyYW5zZm9ybSAwLjJzIGVhc2U7CiAgICAgICAgfQogICAgICAgIGJ1dHRvbjpob3ZlciB7CiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzMzMzM7CiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTsKICAgICAgICB9CiAgICAgICAgYnV0dG9uOmFjdGl2ZSB7CiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsKICAgICAgICB9CiAgICAgICAgLnVybC1kaXNwbGF5IHsKICAgICAgICAgICAgd29yZC1icmVhazogYnJlYWstYWxsOwogICAgICAgICAgICBmb250LXNpemU6IDAuOWVtOwogICAgICAgICAgICBjb2xvcjogIzg4ODsKICAgICAgICAgICAgbWFyZ2luLXRvcDogMjBweDsKICAgICAgICB9CiAgICA8L3N0eWxlPgo8L2hlYWQ+Cjxib2R5PgogICAgPGRpdiBjbGFzcz0iY29udGFpbmVyIj4KICAgICAgICA8aDE+SW5pdGlhdGUgM0RTIFByb2Nlc3M8L2gxPgogICAgICAgIDxwPkNsaWNrIHRoZSBidXR0b24gYmVsb3cgdG8gc2ltdWxhdGUgdGhlIGluaXRpYXRpb24gb2YgYSAzRCBTZWN1cmUgKDNEUykgYXV0aGVudGljYXRpb24gZmxvdy4gVGhpcyB3aWxsIHJlZGlyZWN0IHlvdSB0byB0aGUgc3BlY2lmaWVkIFVSTC48L3A+CgogICAgICAgIDxkaXYgY2xhc3M9ImZlYXR1cmUtbm90ZSI+CiAgICAgICAgICAgIDxzdHJvbmc+Tm90ZTo8L3N0cm9uZz4gVGhpcyBwYWdlIHNpbXVsYXRlcyBhIHN0ZXAgaW4gYSAzRFMgYXV0aGVudGljYXRpb24gZmxvdyB3aGVyZSBhIHJlZGlyZWN0IGlzIGluaXRpYXRlZC4KICAgICAgICA8L2Rpdj4KCiAgICAgICAgPGJ1dHRvbiB0eXBlPSJidXR0b24iIGlkPSJpbml0aWF0ZTNkc0J1dHRvbiI+UHJvY2VlZCB0byAzRFM8L2J1dHRvbj4KCiAgICAgICAgPHAgY2xhc3M9InVybC1kaXNwbGF5Ij5UYXJnZXQgVVJMOiA8YnI+PGNvZGU+aHR0cHM6Ly9tc2NoZW1lLmM5YWRjMDNjLWVjYjQtNDU0Mi05ZGU4LWU1YWQ5YjNmNTllYi9pbmRleC5odG1sPC9jb2RlPjwvcD4KICAgIDwvZGl2PgoKICAgIDxzY3JpcHQ+CiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luaXRpYXRlM2RzQnV0dG9uJykub25jbGljayA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdodHRwczovL21zY2hlbWUuYzlhZGMwM2MtZWNiNC00NTQyLTlkZTgtZTVhZDliM2Y1OWViL2luZGV4Lmh0bWw/c3VjY2Vzcz10cnVlJzsKICAgICAgICB9OwogICAgPC9zY3JpcHQ+CjwvYm9keT4KPC9odG1sPg==`
  );
  const [loadHTMLStringResponse, setLoadHTMLStringResponse] = useState('');
  const [loadHTMLStringError, setLoadHTMLStringError] = useState('');

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

  // Add new function for LoadUsingHTMLString
  function loadUsingHTMLString() {
    setLoadHTMLStringError('');
    setLoadHTMLStringResponse('');
    if (
      !htmlString ||
      !loadHTMLStringCallbackUrl ||
      htmlString === '' ||
      loadHTMLStringCallbackUrl === ''
    ) {
      return setLoadHTMLStringError(
        'HTML String and Callback Url cannot be empty'
      );
    }
    MiniApp.miniappUtils
      .loadUsingHTMLString(htmlString, loadHTMLStringCallbackUrl, baseUrl)
      .then((response) => {
        console.log('loadUsingHTMLString - SUCCESS: ', response);
        setLoadHTMLStringResponse(response);
      })
      .catch((miniAppError) => {
        setLoadHTMLStringError(
          miniAppError && miniAppError.message
            ? miniAppError.message
            : 'Failed to Load Using HTML String'
        );
        console.log('loadUsingHTMLString - Error: ', miniAppError);
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
      <GreyCard className={classes.card}>
        <CardContent className={classes.content}>
          Load Using HTML String
        </CardContent>
        <CardContent className={deeplinkClass.content}>
          <TextField
            className={classes.textfield}
            onChange={(e) => setHtmlString(e.currentTarget.value)}
            value={htmlString}
            label="HTML String (Base64 encoded)"
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
            onChange={(e) => setLoadHTMLStringCallbackUrl(e.currentTarget.value)}
            value={loadHTMLStringCallbackUrl}
            label="CallbackUrl"
            variant="outlined"
            color="primary"
            inputProps={{
              'data-testid': 'load-html-string-callback-url-field',
            }}
          />
        </CardContent>
        <CardContent className={deeplinkClass.content}>
          <TextField
            className={classes.textfield}
            onChange={(e) => setBaseUrl(e.currentTarget.value)}
            value={baseUrl}
            label="Base URL (optional)"
            variant="outlined"
            color="primary"
            inputProps={{
              'data-testid': 'base-url-field',
            }}
          />
        </CardContent>
        {loadHTMLStringError && (
          <CardContent
            className={deeplinkClass.content}
            style={{ color: 'red', fontSize: 14 }}
          >
            {loadHTMLStringError}
          </CardContent>
        )}
        {loadHTMLStringResponse && (
          <CardContent
            className={deeplinkClass.content}
            style={{ fontSize: 14 }}
          >
            {loadHTMLStringResponse}
          </CardContent>
        )}
        <CardActions className={deeplinkClass.actions}>
          <Button
            variant="contained"
            color="primary"
            onClick={loadUsingHTMLString}
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
