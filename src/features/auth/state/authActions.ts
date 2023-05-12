import axios from 'axios';
import { RegisterDto } from 'features/auth/types/RegisterDto';
import { LoginDto } from 'features/auth/types/LoginDto';
import { Error } from 'common/types/Error';
import { User } from '../types/User';
import * as actionTypes from './authTypes';
import { AppDispatch } from 'store/store';
import { UserRoleDto } from '../types/UserRoleDto';
import { UserUpdateDto } from '../types/UserUpdateDto';

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

const loginSuccess = (user: User) => ({
  type: actionTypes.LOGIN_SUCCESS,
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
    .then((response) => dispatch(loginSuccess(response.data)))
    .catch((error) => dispatch(loginFail(error)));
};

const logoutAction = () => ({
  type: actionTypes.LOGOUT,
});

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(logoutAction());
};

const updateUserRoleRequest = () => ({
  type: actionTypes.UPDATE_USER_ROLE_REQUEST,
});

const updateUserRoleSuccess = () => ({
  type: actionTypes.UPDATE_USER_ROLE_SUCCESS,
});

const updateUserRoleFail = (error: Error) => ({
  type: actionTypes.UPDATE_USER_ROLE_FAIL,
  error: error,
});

export const updateUserRole =
  (userId: string, editedUserRole: UserRoleDto) => (dispatch: AppDispatch) => {
    dispatch(updateUserRoleRequest());
    return axios
      .put(`/users/role/${userId}`, editedUserRole)
      .then((response) => dispatch(updateUserRoleSuccess()))
      .catch((error) => dispatch(updateUserRoleFail(error)));
  };

const updatePersonalDataRequest = () => ({
  type: actionTypes.UPDATE_PERSONAL_DATA_REQUEST,
});

const updatePersonalDataSuccess = () => ({
  type: actionTypes.UPDATE_PERSONAL_DATA_SUCCESS,
});

const updatePersonalDataFail = (error: Error) => ({
  type: actionTypes.UPDATE_PERSONAL_DATA_FAIL,
  error: error,
});

export const updatePersonalData =
  (userId: string, userUpdateDto: UserUpdateDto) => (dispatch: AppDispatch) => {
    dispatch(updatePersonalDataRequest());
    return axios
      .put(`/users/${userId}/edit`, userUpdateDto)
      .then((response) => dispatch(updatePersonalDataSuccess()))
      .catch((error) => dispatch(updatePersonalDataFail(error)));
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
  return axios
    .delete(`/users/${userId}`)
    .then((response) => dispatch(deleteUserSuccess()))
    .catch((error) => dispatch(deleteUserFail(error)));
};
