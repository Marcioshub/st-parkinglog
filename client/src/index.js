import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import configureStore from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { checkLoggedIn } from "./util/session";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4FAAE9",
    },
    secondary: {
      main: "#e94f5d",
    },
    background: {
      default: "#f8f8ff",
    },
  },
});

const renderApp = (preloadedState) => {
  const store = configureStore(preloadedState);

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
};
(async () => renderApp(await checkLoggedIn()))();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
