import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoutes({
  isAuthenticated,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}
export default ProtectedRoutes;