import axios from 'axios';
import { RegisterDto } from 'features/auth/types/RegisterDto';
import { LoginDto } from 'features/auth/types/LoginDto';
import { Error } from 'common/types/Error';
import { User } from '../types/User';
import * as actionTypes from './authTypes';
import { AppDispatch } from 'store/store';
import { UserUpdateDto } from '../types/UserUpdateDto';
import { LoginResponseDto } from '../types/LoginResponseDto';
import { parseJwt } from '../helpers/parseJwt';
import { Jwt } from '../types/Jwt';

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

const registerRequest = () => ({
  type: actionTypes.REGISTER_REQUEST,
});

const registerSuccess = () => ({
  type: actionTypes.REGISTER_SUCCESS,
});

const registerFail = (error: Error) => ({
  type: actionTypes.REGISTER_FAIL,
  error: error,
});

export const register = (registerData: RegisterDto) => (dispatch: AppDispatch) => {
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

export const login = (loginData: LoginDto) => (dispatch: AppDispatch) => {
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

export const authCheck = () => (dispatch: AppDispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = localStorage.getItem('expirationDate');
    if (new Date(expirationDate!) < new Date()) {
    } else {
      const userId = localStorage.getItem('userId');
      const firstName = localStorage.getItem('firstName');
      const lastName = localStorage.getItem('lastName');
      const username = localStorage.getItem('username');
      const email = localStorage.getItem('email');
      const created = localStorage.getItem('created');
      const role = localStorage.getItem('role');

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
    }
  }
};

const logoutAction = () => ({
  type: actionTypes.LOGOUT,
});

export const logout = () => (dispatch: AppDispatch) => {
  localStorage.clear();

  dispatch(logoutAction());
};

export const checkAuthTimeout = (expirationDate: string) => (dispatch: AppDispatch) => {
  const expirationTimestamp = new Date(expirationDate).getTime();
  const currentTimestamp = Date.now();

  if (expirationTimestamp < currentTimestamp) {
    dispatch(logout());
  }
};

const updateUserRequest = () => ({
  type: actionTypes.UPDATE_USER_REQUEST,
});

const updateUserSuccess = (user: User) => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  updatedUser: user,
});

const updateUserFail = (error: Error) => ({
  type: actionTypes.UPDATE_USER_FAIL,
  error: error,
});

export const updateUser =
  (userId: string, userUpdateDto: UserUpdateDto) => (dispatch: AppDispatch) => {
    dispatch(updateUserRequest());
    return axios
      .put(`/users/${userId}`, userUpdateDto)
      .then((response) => dispatch(updateUserSuccess(response.data)))
      .catch((error) => dispatch(updateUserFail(error)));
  };

const deleteUserRequest = () => ({
  type: actionTypes.DELETE_USER_REQUEST,
});

const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

const deleteUserFail = (error: Error) => ({
  type: actionTypes.DELETE_USER_FAIL,
  error: error,
});

export const deleteUser = (userId: string) => (dispatch: AppDispatch) => {
  dispatch(deleteUserRequest());
  axios
    .delete(`/users/${userId}`)
    .then(() => dispatch(deleteUserSuccess()))
    .catch((error) => dispatch(deleteUserFail(error)));
};
