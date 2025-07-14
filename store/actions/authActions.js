import api from '../../services/api';

// Action Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';

// Action Creators
export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token }
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const logout = () => ({
  type: LOGOUT
});

export const clearAuthError = () => ({
  type: CLEAR_AUTH_ERROR
});

// Thunk Actions
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await api.post('/auth/login', credentials);
    const { user, token } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    dispatch(loginSuccess(user, token));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(logout());
};