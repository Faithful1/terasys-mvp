import { combineReducers } from "redux";

import layout from "../components/Layout/LayoutState";
import login from "../pages/login/LoginState";
import auth from "../reducers/auth";

export default combineReducers({
  layout,
  login,
  auth
});
