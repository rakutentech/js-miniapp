// @flow
import React, { useState } from "react";

import { Button, TextField, makeStyles } from "@material-ui/core";

import useLocalStorage from "../hooks/useLocalStorage";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "20px",
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
        value={inputValue}
        onChange={handleInput}
        variant="outlined"
        inputProps={{
          "data-testid": "input-field",
        }}
      />
      <Button
        className={classes.button}
        onClick={handleLoad}
        variant="contained"
      >
        Load text from Local Storage
      </Button>
      <Button
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
