import { login } from "../apis/Api";

export const loginMiddleware = (data, errorCallback) => {
    return dispatch => {
      dispatch({
        type: "LOGIN_INIT"
      });

      login(data.email, data.password)
        .then(
          response => {
            if (response.token) {
              errorCallback('');
              dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {...response}
              })
            } else {
              errorCallback(response.data.message);
              dispatch({
                type: 'LOGIN_FAILURE',
                payload: {...response}
              })
            }
          },
          error => {
            dispatch({
              type: 'LOGIN_FAILURE',
              payload: {...error}
            })
          }
        );
    }
}