import React, { useEffect, useState } from 'react';
import ConsoleView from './pages/console-view';

import { makeStyles, ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';

import Home from './pages/home';
import store from './services/store';
import Theme from './theme';
import MiniApp from 'js-miniapp-sdk';

const useStyles = makeStyles((theme) => ({
  App: {
    width: '100%',
    textAlign: 'center',
  },
  toastStyle: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
    backgroundColor: '#444',
    color: 'white',
    borderRadius: '5px',
    zIndex: '9999',
    textAlign: 'center',
  },
}));

function App() {
  const classes = useStyles();
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    try {
      if (document.readyState === 'complete') {
        miniAppDidFinishLoad();
        console.log('Called Miniapp FinishedLoad()');
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  function miniAppDidFinishLoad() {
    MiniApp.miniappUtils
      .miniAppFinishedLoading()
      .then((response) => {
        console.log('miniAppFinishedLoading(): ', response);
        setToastVisible(true);
        const timer = setTimeout(() => setToastVisible(false), 5000);
        return () => clearTimeout(timer);
      })
      .catch((miniAppError) => {
        console.log('miniAppFinishedLoading - Error: ', miniAppError);
      });
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <div className={classes.App}>
          <Home />
          <ConsoleView />
          {toastVisible && (
            <div className={classes.toastStyle}>
              HostApp was notified successfully.
            </div>
          )}
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
