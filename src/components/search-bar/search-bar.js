import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import _ from "lodash";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  marginBottom: {
    marginBottom: theme.spacing(1),
  },
}));

export default function InputWithIcon({ navigate }) {
  const classes = useStyles();
  const [word, setWord] = useState("");

  const onChange = _.debounce((event) => {
    setWord(event.target.value);
  }, 300);

  const pushUrl = () => {
    navigate(`/authors/${word}`);
  };

  return (
    <TextField
      className={classes.margin}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Button
              variant="contained"
              disabled={!word}
              className={classes.marginBottom}
              onClick={pushUrl}
            >
              Submit
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
}
