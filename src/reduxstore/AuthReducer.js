function AuthReducer(state = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
}, action) {
  switch (action.type) {
    case 'LOGIN_INIT':
      state = {...state, isLoading: true}
      return state;

    case "LOGIN_SUCCESS":
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('token', action.payload.token);
      state = {...state, user: action.payload, messgae: 'You are logged in successfully', isLoading: false};
      return state;

    case "LOGIN_FAILURE":
      state = {...state};
      state.message = 'You are logged in successfully';
      state.isLoading = false;
      return state;

    case "LOGOUT":
      state = {...state};
      localStorage.clear();
      state.user = null;
      return state;

    default: return state;
  }
}

export default AuthReducer