import { Error } from 'common/types/Error';
import { User } from '../types/User';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const LOGOUT = 'LOGOUT';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAIL = 'FETCH_USER_FAIL';

export const UPDATE_USER_ROLE_REQUEST = 'UPDATE_USER_ROLE_REQUEST';
export const UPDATE_USER_ROLE_SUCCESS = 'UPDATE_USER_ROLE_SUCCESS';
export const UPDATE_USER_ROLE_FAIL = 'UPDATE_USER_ROLE_FAIL';

export const UPDATE_PERSONAL_DATA_REQUEST = 'UPDATE_PERSONAL_DATA_REQUEST';
export const UPDATE_PERSONAL_DATA_SUCCESS = 'UPDATE_PERSONAL_DATA_SUCCESS';
export const UPDATE_PERSONAL_DATA_FAIL = 'UPDATE_PERSONAL_DATA_FAIL';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';

interface FetchUsersRequestAction {
  type: typeof FETCH_USERS_REQUEST;
}
interface FetchUsersSuccessAction {
  type: typeof FETCH_USERS_SUCCESS;
  users: User[];
}
interface FetchUsersFailAction {
  type: typeof FETCH_USERS_FAIL;
  error: Error;
}

interface FetchUserRequestAction {
  type: typeof FETCH_USER_REQUEST;
}
interface FetchUserSuccessAction {
  type: typeof FETCH_USER_SUCCESS;
  selectedUser: User;
}
interface FetchUserFailAction {
  type: typeof FETCH_USER_FAIL;
  error: Error;
}

interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST;
}
interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
}
interface RegisterFailAction {
  type: typeof REGISTER_FAIL;
  error: Error;
}

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  token: string;
  loggedUser: User;
}
interface LoginFailAction {
  type: typeof LOGIN_FAIL;
  error: Error;
}

interface Logout {
  type: typeof LOGOUT;
}

interface UpdateUserRoleRequestAction {
  type: typeof UPDATE_USER_ROLE_REQUEST;
}
interface UpdateUserRoleSuccessAction {
  type: typeof UPDATE_USER_ROLE_SUCCESS;
}
interface UpdateUserRoleFailAction {
  type: typeof UPDATE_USER_ROLE_FAIL;
  error: Error;
}

interface UpdatePersonalDataRequestAction {
  type: typeof UPDATE_PERSONAL_DATA_REQUEST;
}

interface UpdatePersonalDataSuccessAction {
  type: typeof UPDATE_PERSONAL_DATA_SUCCESS;
}

interface UpdatePersonalDataFailAction {
  type: typeof UPDATE_PERSONAL_DATA_FAIL;
  error: Error;
}

interface DeleteUserRequestAction {
  type: typeof DELETE_USER_REQUEST;
}

interface DeleteUserSuccessAction {
  type: typeof DELETE_USER_SUCCESS;
}

interface DeleteUserFailAction {
  type: typeof DELETE_USER_FAIL;
  error: Error;
}

export type AuthActionTypes =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailAction
  | Logout
  | FetchUsersRequestAction
  | FetchUsersSuccessAction
  | FetchUsersFailAction
  | FetchUserRequestAction
  | FetchUserSuccessAction
  | FetchUserFailAction
  | UpdateUserRoleRequestAction
  | UpdateUserRoleSuccessAction
  | UpdateUserRoleFailAction
  | UpdatePersonalDataRequestAction
  | UpdatePersonalDataSuccessAction
  | UpdatePersonalDataFailAction
  | DeleteUserRequestAction
  | DeleteUserSuccessAction
  | DeleteUserFailAction;
