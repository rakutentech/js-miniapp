import React, { useState, useRef } from 'react';

import { Button, CardContent, makeStyles, Typography } from '@material-ui/core';
import MiniApp from 'js-miniapp-sdk';

// Simulator: http://localhost:3000
// Device:    http://10.49.88.198:3000
const BASE_URL = 'https://10.49.88.198:3000';

const useStyles = makeStyles(() => ({
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    boxSizing: 'border-box',
  },
  button: {
    marginBottom: 10,
  },
  logArea: {
    flex: 1,
    marginTop: 16,
    backgroundColor: '#1e1e1e',
    borderRadius: 4,
    padding: 10,
    overflowY: 'auto',
    minHeight: 200,
  },
  logEntry: {
    color: '#d4d4d4',
    fontFamily: 'monospace',
    fontSize: 12,
    marginBottom: 4,
    wordBreak: 'break-word',
  },
  logEmpty: {
    color: '#666',
    fontFamily: 'monospace',
    fontSize: 12,
  },
  clearButton: {
    marginTop: 8,
  },
}));

function Landing() {
  const classes = useStyles();
  const [logs, setLogs] = useState([]);
  const logRef = useRef(null);

  function addLog(message) {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs((prev) => [...prev, `[${time}] ${message}`]);
    setTimeout(() => {
      if (logRef.current) {
        logRef.current.scrollTop = logRef.current.scrollHeight;
      }
    }, 50);
  }

  async function handleSetCookie() {
    addLog('→ GET /api/set-cookie');
    try {
      const response = await fetch(`${BASE_URL}/api/set-cookie`, {
        method: 'GET',
        credentials: 'include',
      });
      addLog(`Status: ${response.status}`);
      try {
        const data = await response.json();
        addLog(`Body: ${JSON.stringify(data)}`);
      } catch (_) {
        addLog(`Body: ${await response.text()}`);
      }
      addLog('Step 1 complete — check if cookies were stored');
    } catch (err) {
      addLog(`ERROR: ${err.message || String(err)}`);
    }
  }

  async function handleSetCookieNoCredentials() {
    addLog('→ GET /api/set-cookie?mode=no-credentials');
    addLog('Expected: FAIL — server omits Access-Control-Allow-Credentials');
    try {
      const response = await fetch(
        `${BASE_URL}/api/set-cookie?mode=no-credentials`,
        { method: 'GET', credentials: 'include' }
      );
      addLog(`Status: ${response.status}`);
      try {
        const data = await response.json();
        addLog(`Body: ${JSON.stringify(data)}`);
      } catch (_) {
        addLog(`Body: ${await response.text()}`);
      }
    } catch (err) {
      addLog(`ERROR: ${err.message || String(err)}`);
    }
  }

  async function handleSetCookieNoSameSite() {
    addLog('→ GET /api/set-cookie?mode=no-samesite');
    addLog('Expected: FAIL — cookie missing SameSite=None; Secure');
    try {
      const response = await fetch(
        `${BASE_URL}/api/set-cookie?mode=no-samesite`,
        { method: 'GET', credentials: 'include' }
      );
      addLog(`Status: ${response.status}`);
      try {
        const data = await response.json();
        addLog(`Body: ${JSON.stringify(data)}`);
      } catch (_) {
        addLog(`Body: ${await response.text()}`);
      }
    } catch (err) {
      addLog(`ERROR: ${err.message || String(err)}`);
    }
  }

  function handleReadCookieFromNative() {
    addLog('→ MiniApp.cookieManager.getCookies()');
    MiniApp.cookieManager
      .getCookies()
      .then((cookies) => {
        if (!cookies || cookies.length === 0) {
          addLog('Empty — no cookies returned from native');
        } else {
          cookies.forEach((c) => addLog(`${c.name} = ${c.value}`));
        }
      })
      .catch((err) => {
        addLog(`ERROR: ${err.message || String(err)}`);
      });
  }

  async function handleCheckCookieSent() {
    addLog('→ GET /api/check-cookie');
    try {
      const response = await fetch(`${BASE_URL}/api/check-cookie`, {
        method: 'GET',
        credentials: 'include',
      });
      try {
        const data = await response.json();
        addLog(`Body: ${JSON.stringify(data)}`);
        if (data.hasCookies) {
          addLog('SUCCESS — cookies were sent to server');
          addLog(`cookiesReceived: ${data.cookiesReceived}`);
        } else {
          addLog('FAILED — no cookies sent');
        }
      } catch (_) {
        addLog(`Body: ${await response.text()}`);
      }
    } catch (err) {
      addLog(`ERROR: ${err.message || String(err)}`);
    }
  }

  return (
    <CardContent className={classes.content}>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={classes.button}
        onClick={handleSetCookie}
      >
        Set Cookie
      </Button>
      <Button
        variant="contained"
        color="default"
        fullWidth
        className={classes.button}
        onClick={handleSetCookieNoCredentials}
      >
        Set Cookie (No Credentials)
      </Button>
      <Button
        variant="contained"
        color="default"
        fullWidth
        className={classes.button}
        onClick={handleSetCookieNoSameSite}
      >
        Set Cookie (No SameSite)
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={classes.button}
        onClick={handleReadCookieFromNative}
      >
        Read Cookie (Native)
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={classes.button}
        onClick={handleCheckCookieSent}
      >
        Check Cookie Sent
      </Button>

      <div className={classes.logArea} ref={logRef}>
        {logs.length === 0 ? (
          <Typography className={classes.logEmpty}>
            No logs yet. Tap a button to start.
          </Typography>
        ) : (
          logs.map((entry, index) => (
            <Typography key={index} className={classes.logEntry}>
              {entry}
            </Typography>
          ))
        )}
      </div>

      <Button
        variant="outlined"
        fullWidth
        className={classes.clearButton}
        onClick={() => setLogs([])}
      >
        Clear
      </Button>
    </CardContent>
  );
}

export default Landing;
