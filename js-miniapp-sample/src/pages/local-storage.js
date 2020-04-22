// @flow
import React, { useState } from "react";

import { Button, TextField, makeStyles } from "@material-ui/core";

import useLocalStorage from "../hooks/useLocalStorage";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "20px",
    width: "80%",
    maxWidth: 280,
  },
  textfield: {
    width: "80%",
    maxWidth: 300,
    "& input": {
      color: theme.color.primary,
      lineHeight: "1.5em",
      fontSize: "1em",
    },
  },
}));

function LocalStorage() {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [storedValue, setStoredValue] = useLocalStorage("input-value", "");

  const handleInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.currentTarget.value);
  };

  const handleLoad = () => {
    setInputValue(storedValue);
  };

  const handleSave = () => {
    setStoredValue(inputValue);
  };

  return (
    <>
      <TextField
        type="text"
        className={classes.textfield}
        value={inputValue}
        onChange={handleInput}
        variant="outlined"
        color="primary"
        inputProps={{
          "data-testid": "input-field",
        }}
      />
      <Button
        color="primary"
        className={classes.button}
        onClick={handleLoad}
        variant="contained"
      >
        Load text from Local Storage
      </Button>
      <Button
        color="primary"
        className={classes.button}
        onClick={handleSave}
        variant="contained"
      >
        Save text to Local Storage
      </Button>
    </>
  );
}

export default LocalStorage;
