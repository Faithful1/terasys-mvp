import axios from "axios";
import jwt from "jsonwebtoken";

import setAuthorizationToken from "./components/setAuthorizationToken";

export const initialState = {
  isLoading: false,
  isAuthenticated: !!localStorage.getItem("jwtToken"),
  error: null,
  user: {}
};

export const START_LOGIN = "Login/START_LOGIN";
export const LOGIN_SUCCESS = "Login/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "Login/LOGIN_FAILURE";
export const RESET_ERROR = "Login/RESET_ERROR";
export const LOGIN_USER = "Login/LOGIN_USER";
export const SIGN_OUT_SUCCESS = "Login/SIGN_OUT_SUCCESS";
export const SET_CURRENT_USER = "Login/SET_CURRENT_USER";

export const startLogin = () => ({
  type: START_LOGIN
});

export const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  token: token
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE
});

export const resetError = () => ({
  type: RESET_ERROR
});

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export const loginUser = (login, password) => dispatch => {
  dispatch(startLogin());

  const authData = {
    email: login,
    pass: password,
    returnSecureToken: true,
    error: ""
  };

  const loginUrl = "https://www.terasyshub.io/api/v1/login";
  const headers = {
    "Content-Type": "application/json"
  };

  axios
    .post(loginUrl, authData, headers)
    .then(response => {
      const token = response.data;
      setTimeout(() => {
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
        dispatch(loginSuccess(token));
        dispatch(setCurrentUser(jwt.decode(token)));
      }, 2000);
    })
    .catch(error => {
      console.log(error.response.data);
      dispatch(loginFailure(error.response.data));
    });
};

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS
});

export const signOut = () => dispatch => {
  localStorage.removeItem("jwtToken");
  dispatch(signOutSuccess());
};

export default function LoginReducer(state = initialState, { type, payload }) {
  switch (type) {
    case START_LOGIN:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case RESET_ERROR:
      return {
        error: false
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
