import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../loading/loading";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  clickable: {
    pointerEvents: "auto",
  },
}));

const URL_PATH = "https://openlibrary.org/search/authors.json";

export default function Authors({navigate}) {
  const p = useParams();
  const [results, setResults] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const path = URL_PATH + `?q=${p.searchingWords}`;
    axios.get(path).then((response) => {
      setResults(response.data.docs);
    });
  }, []);

  const pushUrl = (data) => {
    navigate(`/authors/${p.searchingWords}/${data.key}/books`);
  } 

  if (!p || !p.searchingWords) return null;

  return results ? (
    results.length > 0 ? (
      <List className={classes.root}>
        {results.map((x) => (
          <Button key={x.key} onClick={() => pushUrl(x)}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={x.name} secondary={x.top_work} />
            </ListItem>
          </Button>
        ))}
      </List>
    ) : (
      <div>No authors are found.</div>
    )
  ) : (
    <Loading />
  );
}
