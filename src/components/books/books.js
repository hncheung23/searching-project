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

const URL_PATH = "https://openlibrary.org/authors/{id}/works.json";

export default function Books({navigate}) {
  const p = useParams();
  const [results, setResults] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const path = URL_PATH.replace('{id}', p.authorsId)
    axios.get(path).then((response) => {
      setResults(response.data.entries);
    });
  }, []);
  const pushUrl = (data) => {
    navigate(`/authors/${p.searchingWords}/${p.authorsId}/books/${data.key.split('/works/')[1]}`);
  } 

  if (!p || !p.authorsId) return null;

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
              <ListItemText primary={x.title} secondary={`Created at: ${x.created.value.split('T')[0]}`} />
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
