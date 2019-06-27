import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import jwt from "jsonwebtoken";

import reducers from "./reducers";

import setAuthorizationToken from "../pages/login/components/setAuthorizationToken";
import { setCurrentUser } from "../pages/login/LoginState";

const store = createStore(reducers, applyMiddleware(ReduxThunk));

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

export default store;
