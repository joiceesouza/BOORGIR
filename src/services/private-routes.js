import { Route, Redirect } from "react-router";
import { isAuthenticated } from "./auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: "/", state: { from: props.location } }} />
    )
  )}
  />
);


export default PrivateRoute;