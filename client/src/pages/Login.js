import React from "react";
import { Link as L } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import { login } from "../actions/session";
import { useSelector } from "react-redux";
import MySnackbar from "../components/MySnackbar";

// logo
import stlogo from "../images/stlogo.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "95%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "85%",
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const errors = useSelector((state) => state.errors);

  // for snackbar
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    dispatch(login(user));
  }

  React.useEffect(() => {
    if (errors) {
      setOpen(true);
      setMessage(errors);
    }
  }, [errors]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={stlogo} className={classes.logo} />
        <br />
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link to="/register" component={L} variant="body2">
                {"Don't have an account? Click here"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

      <MySnackbar
        open={open}
        setOpen={setOpen}
        message={message}
        setMessage={setMessage}
      />
    </Container>
  );
}
