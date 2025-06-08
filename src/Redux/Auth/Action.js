import api, { API_BASE_URL } from "../../config/api";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGOUT,
} from "./ActionTypes";

export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await api.post(`${API_BASE_URL}/auth/signing`, userData);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    }
    return data;
  } catch (error) {
    let errorMessage = "Login failed";
    if (error.response) {
      errorMessage = error.response.data.message || errorMessage;
    }
    dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
    throw error;
  }
};

export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await api.post(`${API_BASE_URL}/auth/signup`, userData);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: REGISTER_SUCCESS, payload: data });
    }
    return data;
  } catch (error) {
    let errorMessage = "Registration failed";
    if (error.response) {
      errorMessage = error.response.data.message || errorMessage;
    }
    dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
    throw error;
  }
};

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await api.get(`${API_BASE_URL}/api/users/profile`);
    dispatch({ type: GET_USER_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Failed to fetch user", error);
    throw error;
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT });
};
