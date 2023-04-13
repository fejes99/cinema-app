import { Error } from 'common/types/Error';
import { User } from '../types/User';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAIL = 'FETCH_USER_FAIL';

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

export type AuthActionTypes =
  | FetchUsersRequestAction
  | FetchUsersSuccessAction
  | FetchUsersFailAction
  | FetchUserRequestAction
  | FetchUserSuccessAction
  | FetchUserFailAction;
