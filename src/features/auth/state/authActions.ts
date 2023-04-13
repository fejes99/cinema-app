import { Error } from 'common/types/Error';
import { User } from '../types/User';
import * as actionTypes from './authTypes';
import { AppDispatch } from 'store/store';
import axios from 'axios';

const fetchUsersRequest = () => ({
  type: actionTypes.FETCH_USERS_REQUEST,
});

const fetchUsersSuccess = (users: User[]) => ({
  type: actionTypes.FETCH_USERS_SUCCESS,
  users: users,
});

const fetchUsersFail = (error: Error) => ({
  type: actionTypes.FETCH_USERS_FAIL,
  error: error,
});

export const fetchUsers = () => (dispatch: AppDispatch) => {
  dispatch(fetchUsersRequest());
  axios
    .get('/users')
    .then((response) => dispatch(fetchUsersSuccess(response.data)))
    .catch((error) => dispatch(fetchUsersFail(error)));
};

const fetchUserRequest = () => ({
  type: actionTypes.FETCH_USER_REQUEST,
});

const fetchUserSuccess = (user: User) => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  selectedUser: user,
});

const fetchUserFail = (error: Error) => ({
  type: actionTypes.FETCH_USER_FAIL,
  error: error,
});

export const fetchUser = (id: string) => (dispatch: AppDispatch) => {
  dispatch(fetchUserRequest());
  axios
    .get(`/users/${id}`)
    .then((response) => dispatch(fetchUserSuccess(response.data)))
    .catch((error) => dispatch(fetchUserFail(error)));
};
