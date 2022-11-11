import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "./types";
import AuthService from "services/auth.service";

export const register = (name, email, password) => (dispatch) => {
    return AuthService.register(name, email, password).then(
        response => {
            dispatch({
                type: REGISTER_SUCCESS
            });
            dispatch({
                type: SET_MESSAGE,
                payload: response.body.message
            });
            return Promise.resolve();
        },
        err => {
            dispatch({
                type: REGISTER_FAIL
            });
            dispatch({
                type: SET_MESSAGE,
                payload: err.message
            });
            return Promise.reject();
        }
    )
}

export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
        response => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {user: response.user}
            });
            
            return Promise.resolve();
        },
        err => {
            dispatch({
                type: LOGIN_FAIL
            });
            dispatch({
                type: SET_MESSAGE,
                payload: err.message
            });
            return Promise.reject();
        }
    )
}

export const logout = (refreshToken) => (dispatch) => {
    return AuthService.logout(refreshToken).then(
        response => {
            dispatch({
                type: LOGOUT
            });
        }
    )
}

export const refresh = (refreshToken) => (dispatch) => {
    return AuthService.refresh(refreshToken).then(
        response => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {user: response.user}
            });
            return Promise.resolve();
        }
    )
}