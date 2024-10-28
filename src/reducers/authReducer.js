import axios from 'axios';

// Initial State
const userFromStorage = localStorage.getItem('user');
const tokenFromStorage = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!tokenFromStorage,
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage,
  error: null,
};
// Action Types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';
const LOGOUT = 'LOGOUT';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

// Reducer
function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
      
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}

// Async Action Creators
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
    const userData = response.data; // Assuming user data is in response.data

    localStorage.setItem('user', JSON.stringify(response.data.data.user));
    localStorage.setItem('token', response.data.data.token);

    dispatch({ type: LOGIN_SUCCESS, payload: userData });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.message || 'Login failed' });
  }
};

export const registerUser = (name, email, password,confirmed_password, user_type) => async (dispatch) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/register', { name, email, password, user_type, confirmed_password });
    const userData = response.data; // Assuming user data is in response.data
    dispatch({ type: REGISTER_SUCCESS, payload: userData });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.response?.data?.message || 'Registration failed' });
  }
};

export const updateProfile = (name, email, token) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/update-profile', {
      name,
      email,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Update user data in localStorage
    const updatedUser = { ...response.data.data };

    localStorage.setItem('user', JSON.stringify(updatedUser));

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: updatedUser,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: error.response?.data.message || 'Profile update failed.',
    });
  }
};

export const logout = () => {
  // Clear localStorage on logout
  localStorage.removeItem('user');
  localStorage.removeItem('token');

  return {
    type: 'LOGOUT',
  };
};

// Export reducer
export default authReducer;
