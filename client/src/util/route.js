import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function Auth({ path, component: Component }) {
  const session = useSelector((state) => state.session);

  return (
    <Route
      path={path}
      render={(props) =>
        Boolean(session.userId) ? (
          <Redirect to={`/user/${session.userId}`} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

function Protected({ path, component: Component }) {
  const session = useSelector((state) => state.session);

  return (
    <Route
      path={path}
      render={(props) =>
        Boolean(session.userId) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export const AuthRoute = Auth;
export const ProtectedRoute = Protected;
