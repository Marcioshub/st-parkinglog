import React from "react";
import { Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./util/route";

// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import Error from "./pages/Error";

function App() {
  return (
    <Switch>
      <AuthRoute exact path="/" component={Login} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
      <ProtectedRoute exact path="/user/:id" component={User} />
      <Route component={Error} />
    </Switch>
  );
}

export default App;
