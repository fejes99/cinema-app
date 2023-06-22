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
  toast.error(error.detail);
  return {
    type: actionTypes.REGISTER_FAIL,
    error: error,
  };
};

export const register = (registerData: RegisterDto) => (dispatch: AppDispatch) => {
  dispatch(registerRequest());
  return axios
    .post(`/auth/register`, registerData)
    .then(() => dispatch(registerSuccess()))
    .catch((error) => {
      dispatch(registerFail(error.response.data));
      throw error;
    });
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

export const login = (loginData: LoginDto) => (dispatch: AppDispatch) => {
  dispatch(loginRequest());
  return axios
    .post(`/auth/login`, loginData)
    .then((response) => {
      const { userId, firstName, lastName, username, email, created, role, exp }: Jwt = parseJwt(
        response.data.token
      );
      const expirationDate: string = new Date(exp * 1000).toString();

      const userData = {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        created: created,
        role: role,
      };

      const userDataJson = JSON.stringify(userData);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('user', userDataJson);

      dispatch(loginSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loginFail(error.response.data));
      throw error;
    });
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

    const userDataJson = localStorage.getItem('user');
    const { userId, firstName, lastName, username, email, created, role } = JSON.parse(
      userDataJson!
    );

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
  toast.error(error.detail);
  return {
    type: actionTypes.UPDATE_USER_FAIL,
    error: error,
  };
};

const editUser = (userId: string, userUpdateDto: UserUpdateDto) => (dispatch: AppDispatch) => {
  dispatch(updateUserRequest());
  return axios
    .put(`/users/${userId}`, userUpdateDto)
    .then((response) => dispatch(updateUserSuccess(response.data)))
    .catch((error) => dispatch(updateUserFail(error.response.data)));
};

export const updateUser =
  (userId: string, userUpdateDto: UserUpdateDto) => async (dispatch: AppDispatch) => {
    await dispatch(editUser(userId, userUpdateDto));
    dispatch(fetchUsers());
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
  toast.error(error.detail);
  return {
    type: actionTypes.DELETE_USER_FAIL,
    error: error,
  };
};

const removeUser = (userId: string) => (dispatch: AppDispatch) => {
  dispatch(deleteUserRequest());
  return axios
    .delete(`/users/${userId}`)
    .then(() => dispatch(deleteUserSuccess()))
    .catch((error) => dispatch(deleteUserFail(error.response.data)));
};

export const deleteUser = (userId: string) => async (dispatch: AppDispatch) => {
  await dispatch(removeUser(userId));
  dispatch(fetchUsers());
};
