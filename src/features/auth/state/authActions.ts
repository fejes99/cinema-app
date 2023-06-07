import axios from 'axios';
import { toast } from 'react-toastify';

import { User } from '../types/User';
import { Error } from 'common/types/Error';
import { Jwt } from '../types/Jwt';

import { AppDispatch } from 'store/store';

import { LoginDto } from 'features/auth/types/LoginDto';
import { RegisterDto } from 'features/auth/types/RegisterDto';
import { UserUpdateDto } from '../types/UserUpdateDto';
import { LoginResponseDto } from '../types/LoginResponseDto';

import { parseJwt } from '../helpers/parseJwt';
import * as actionTypes from './authTypes';

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

export const fetchUsers =
  () =>
  (dispatch: AppDispatch): void => {
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

export const fetchUser =
  (id: string) =>
  (dispatch: AppDispatch): void => {
    dispatch(fetchUserRequest());
    axios
      .get(`/users/${id}`)
      .then((response) => dispatch(fetchUserSuccess(response.data)))
      .catch((error) => dispatch(fetchUserFail(error)));
  };

const registerRequest = () => ({
  type: actionTypes.REGISTER_REQUEST,
});

const registerSuccess = () => {
  toast.success('You have successfully registered');
  return {
    type: actionTypes.REGISTER_SUCCESS,
  };
};

const registerFail = (error: Error) => {
  toast.error('Something went wrong');
  console.log(error);
  return {
    type: actionTypes.REGISTER_FAIL,
    error: error,
  };
};

export const register =
  (registerData: RegisterDto) =>
  (dispatch: AppDispatch): void => {
    dispatch(registerRequest());
    axios
      .post(`/auth/register`, registerData)
      .then((response) => dispatch(registerSuccess()))
      .catch((error) => dispatch(registerFail(error)));
  };

const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

const loginSuccess = ({ token, user }: LoginResponseDto) => ({
  type: actionTypes.LOGIN_SUCCESS,
  token: token,
  loggedUser: user,
});

const loginFail = (error: Error) => ({
  type: actionTypes.LOGIN_FAIL,
  error: error,
});

export const login =
  (loginData: LoginDto) =>
  (dispatch: AppDispatch): void => {
    dispatch(loginRequest());
    axios
      .post(`/auth/login`, loginData)
      .then((response) => {
        const { userId, firstName, lastName, username, email, created, role, exp }: Jwt = parseJwt(
          response.data.token
        );
        const expirationDate: string = new Date(exp * 1000).toString();

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('created', created);
        localStorage.setItem('role', role);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(loginSuccess(response.data));
      })
      .catch((error) => dispatch(loginFail(error)));
  };

export const authCheck =
  () =>
  (dispatch: AppDispatch): void => {
    const token: string | null = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
      return;
    }

    const expirationDate: string | null = localStorage.getItem('expirationDate');

    if (new Date(expirationDate!) < new Date()) {
      logout();
      return;
    }

    const userId: string | null = localStorage.getItem('userId');
    const firstName: string | null = localStorage.getItem('firstName');
    const lastName: string | null = localStorage.getItem('lastName');
    const username: string | null = localStorage.getItem('username');
    const email: string | null = localStorage.getItem('email');
    const created: string | null = localStorage.getItem('created');
    const role: string | null = localStorage.getItem('role');

    const user: User = {
      id: userId!,
      firstName: firstName!,
      lastName: lastName!,
      username: username!,
      email: email!,
      created: created!,
      role: role!,
    };

    const loginResponse: LoginResponseDto = {
      token: token,
      user: user,
    };

    dispatch(loginSuccess(loginResponse));
    dispatch(checkAuthTimeout(expirationDate!));
  };

const logoutAction = () => ({
  type: actionTypes.LOGOUT,
});

export const logout =
  () =>
  (dispatch: AppDispatch): void => {
    localStorage.clear();

    dispatch(logoutAction());
  };

export const checkAuthTimeout =
  (expirationDate: string) =>
  (dispatch: AppDispatch): void => {
    const expirationTimestamp: number = new Date(expirationDate).getTime();
    const currentTimestamp: number = Date.now();

    if (expirationTimestamp < currentTimestamp) {
      dispatch(logout());
    }
  };

const updateUserRequest = () => ({
  type: actionTypes.UPDATE_USER_REQUEST,
});

const updateUserSuccess = (user: User) => {
  toast.success('Account updated');
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    updatedUser: user,
  };
};

const updateUserFail = (error: Error) => {
  toast.error('Something went wrong');
  return {
    type: actionTypes.UPDATE_USER_FAIL,
    error: error,
  };
};

export const updateUser =
  (userId: string, userUpdateDto: UserUpdateDto) =>
  (dispatch: AppDispatch): void => {
    dispatch(updateUserRequest());
    axios
      .put(`/users/${userId}`, userUpdateDto)
      .then((response) => dispatch(updateUserSuccess(response.data)))
      .catch((error) => dispatch(updateUserFail(error)));
  };

const deleteUserRequest = () => ({
  type: actionTypes.DELETE_USER_REQUEST,
});

const deleteUserSuccess = () => {
  toast.success('Account successfully deleted');
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
  };
};

const deleteUserFail = (error: Error) => {
  toast.error('Something went wrong');
  return {
    type: actionTypes.DELETE_USER_FAIL,
    error: error,
  };
};

export const deleteUser =
  (userId: string) =>
  (dispatch: AppDispatch): void => {
    dispatch(deleteUserRequest());
    axios
      .delete(`/users/${userId}`)
      .then(() => dispatch(deleteUserSuccess()))
      .catch((error) => dispatch(deleteUserFail(error)));
  };
