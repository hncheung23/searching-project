import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const URL_PATH = "https://covers.openlibrary.org/b/id/{id}-L.jpg";

export default function SimpleCard({ data }) {
  const classes = useStyles();

  const goToWebsite = () => {
    const url = "https://openlibrary.org/dev/docs/api/books";
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {`Last modified: ${data.last_modified.value.split("T")[0]}`}
        </Typography>
        <Typography variant="h5" component="h2">
          {data.title}
        </Typography>
        {data && data.covers && <CardMedia className={classes.media} image={URL_PATH.replace("{id}", data.covers[0])} title="Cover" />}
        <Typography className={classes.pos} color="textSecondary">
          {`Created at: ${data.created.value.split("T")[0]}`}
        </Typography>
        {data.description ? (
          <Typography variant="body2" component="p">
            {data.description.value || data.description}
          </Typography>
        ) : (
          <Typography variant="body2" component="p">
            Description not available...
          </Typography>
        )}
        {data.subjects ? (
          data.subjects.map((x) => (
            <Chip key={x} label={x} className={classes.chip} />
          ))
        ) : (
          <Typography variant="body2" component="p">
            Subjects not available...
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={goToWebsite}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
