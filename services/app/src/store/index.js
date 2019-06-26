import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import reducers from "./reducers";

import setAuthorizationToken from "../pages/login/components/setAuthorizationToken";

const store = createStore(reducers, applyMiddleware(ReduxThunk));

setAuthorizationToken(localStorage.token);

export default store;
