import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MiniApp from 'js-miniapp-sdk';

import Theme from './theme';
import Dashboard from './pages/Dashboard';
import Detail from './pages/Detail';

function App() {
  useEffect(() => {
    try {
      const platform = MiniApp.getPlatform();
      function notifyLoaded() {
        if (document.readyState === 'complete') {
          try {
            if (MiniApp.miniappUtils) {
              MiniApp.miniappUtils.miniAppFinishedLoading().catch(() => {});
            }
          } catch (e) {
            // miniappUtils not available outside a MiniApp host
          }
        }
      }
      if (platform === 'iOS') {
        notifyLoaded();
      } else {
        document.onreadystatechange = notifyLoaded;
      }
    } catch (e) {
      // Running outside a MiniApp host (e.g. browser dev mode) — ignore
    }
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/index.html" element={<Dashboard />} />
          <Route path="/miniapp/index.html" element={<Dashboard />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
