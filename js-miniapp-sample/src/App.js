import React from "react";

import { makeStyles } from "@material-ui/core";
import { Provider } from "react-redux";

import Home from "./pages/home";
import store from "./services/store";

const useStyles = makeStyles((theme) => ({
  App: {
    width: "100%",
    textAlign: "center",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <div className={classes.App}>
        <Home />
      </div>
    </Provider>
  );
}

export default App;
