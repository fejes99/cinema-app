import { Reducer } from 'redux';
import { AuthState } from './authState';
import * as actionTypes from './authTypes';

const initialState: AuthState = {
  users: [],
  selectedUser: null,
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
    default:
      return state;
  }
};

export default authReducer;
