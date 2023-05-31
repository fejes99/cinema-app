import { Reducer } from 'redux';
import { AuthState } from './authState';
import * as actionTypes from './authTypes';

const initialState: AuthState = {
  users: [],
  selectedUser: null,
  loggedUser: null,
  token: null,
  loading: false,
  error: null,
};

const authReducer: Reducer<AuthState, actionTypes.AuthActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_REQUEST:
      return { ...state, loading: true, users: [], error: null };
    case actionTypes.FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.users };
    case actionTypes.FETCH_USERS_FAIL:
      return { ...state, loading: false, error: action.error };

    case actionTypes.FETCH_USER_REQUEST:
      return { ...state, loading: true, selectedUser: null, error: null };
    case actionTypes.FETCH_USER_SUCCESS:
      return { ...state, loading: false, selectedUser: action.selectedUser };
    case actionTypes.FETCH_USER_FAIL:
      return { ...state, loading: false, error: action.error };

    case actionTypes.REGISTER_REQUEST:
      return { ...state, loading: true, loggedUser: null, error: null };
    case actionTypes.REGISTER_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.REGISTER_FAIL:
      return { ...state, loading: false, error: action.error };

    case actionTypes.LOGIN_REQUEST:
      return { ...state, loading: true, loggedUser: null, error: null };
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, loading: false, loggedUser: action.loggedUser, token: action.token };
    case actionTypes.LOGIN_FAIL:
      return { ...state, loading: false, error: action.error };

    case actionTypes.LOGOUT:
      return { ...state, loggedUser: null, token: null };

    case actionTypes.UPDATE_USER_REQUEST:
      return { ...state, loading: true, selectedUser: null, error: null };
    case actionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedUser: action.updatedUser,
        selectedUser: action.updatedUser,
        error: null,
      };
    case actionTypes.UPDATE_USER_FAIL:
      return { ...state, loading: false, error: action.error };

    case actionTypes.DELETE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes.DELETE_USER_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.DELETE_USER_FAIL:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default authReducer;
