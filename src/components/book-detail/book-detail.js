import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../loading/loading";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../card/card";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const URL_PATH = "https://openlibrary.org/works/{id}.json";

export default function Books({ navigate }) {
  const p = useParams();
  const [results, setResults] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const path = URL_PATH.replace("{id}", p.bookId);
    axios.get(path).then((response) => {
      setResults(response.data);
    });
  }, []);

  if (!p || !p.bookId) return null;

  return results ? (
    results.key ? (
      <Card data={results} />
    ) : (
      <div>No detail are found.</div>
    )
  ) : (
    <Loading />
  );
}
