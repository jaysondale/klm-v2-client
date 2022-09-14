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
        }
    )
}

export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
        data => {
            console.log(data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {user: data}
            });
        }
    )
}