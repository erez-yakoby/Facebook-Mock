export const ACTIONS = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
};

export const LoginStart = (userCredentials) => ({
  type: ACTIONS.LOGIN_START,
});

export const LoginSuccess = (user) => ({
  type: ACTIONS.LOGIN_SUCCESS,
  payload: user,
});

export const LoginFailure = (error) => ({
  type: ACTIONS.LOGIN_FAILURE,
  payload: error,
});
