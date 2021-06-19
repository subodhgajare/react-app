import { getUserByToken } from "../apis/Api";

export const authMiddleware = (token) => {
    return dispatch => {
      getUserByToken(token)
        .then();
    }
}