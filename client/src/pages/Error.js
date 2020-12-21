import React from "react";
import { Link as L } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h1" gutterBottom>
          404 page
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {
            "The page your looking for doesnt exists, please click on the button below to redirect back home."
          }
        </Typography>

        <br />
        <Button color="primary" to="/" component={L}>
          Go Back Home
        </Button>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm" justify="center">
          <Typography variant="body1">ST Parking Lot</Typography>
        </Container>
      </footer>
    </div>
  );
}
