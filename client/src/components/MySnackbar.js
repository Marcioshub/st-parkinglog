import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { clearErrors } from "../actions/error";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SnackbarCall({ open, setOpen, message, setMessage }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const errors = useSelector((state) => state.errors);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setMessage("");

    // clear errors
    dispatch(clearErrors);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          severity="info"
          onClose={handleClose}
          style={{ backgroundColor: "#3b6978" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
