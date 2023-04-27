import { Projection } from '../types/Projection';
import { Error } from 'common/types/Error';

export const FETCH_PROJECTIONS_REQUEST = 'FETCH_PROJECTIONS_REQUEST';
export const FETCH_PROJECTIONS_SUCCESS = 'FETCH_PROJECTIONS_SUCCESS';
export const FETCH_PROJECTIONS_FAIL = 'FETCH_PROJECTIONS_FAIL';

export const FETCH_PROJECTION_REQUEST = 'FETCH_PROJECTION_REQUEST';
export const FETCH_PROJECTION_SUCCESS = 'FETCH_PROJECTION_SUCCESS';
export const FETCH_PROJECTION_FAIL = 'FETCH_PROJECTION_FAIL';

export const CREATE_PROJECTION_REQUEST = 'CREATE_PROJECTION_REQUEST';
export const CREATE_PROJECTION_SUCCESS = 'CREATE_PROJECTION_SUCCESS';
export const CREATE_PROJECTION_FAIL = 'CREATE_PROJECTION_FAIL';

export const UPDATE_PROJECTION_REQUEST = 'UPDATE_PROJECTION_REQUEST';
export const UPDATE_PROJECTION_SUCCESS = 'UPDATE_PROJECTION_SUCCESS';
export const UPDATE_PROJECTION_FAIL = 'UPDATE_PROJECTION_FAIL';

export const DELETE_PROJECTION_REQUEST = 'DELETE_PROJECTION_REQUEST';
export const DELETE_PROJECTION_SUCCESS = 'DELETE_PROJECTION_SUCCESS';
export const DELETE_PROJECTION_FAIL = 'DELETE_PROJECTION_FAIL';

interface FetchProjectionsRequestAction {
  type: typeof FETCH_PROJECTIONS_REQUEST;
}

interface FetchProjectionsSuccessAction {
  type: typeof FETCH_PROJECTIONS_SUCCESS;
  projections: Projection[];
}

interface FetchProjectionsFailAction {
  type: typeof FETCH_PROJECTIONS_FAIL;
  error: Error;
}

interface FetchProjectionRequestAction {
  type: typeof FETCH_PROJECTION_REQUEST;
}

interface FetchProjectionSuccessAction {
  type: typeof FETCH_PROJECTION_SUCCESS;
  selectedProjection: Projection;
}

interface FetchProjectionFailAction {
  type: typeof FETCH_PROJECTION_FAIL;
  error: Error;
}

interface CreateProjectionRequestAction {
  type: typeof CREATE_PROJECTION_REQUEST;
}

interface CreateProjectionSuccessAction {
  type: typeof CREATE_PROJECTION_SUCCESS;
  newProjection: Projection;
}

interface CreateProjectionFailAction {
  type: typeof CREATE_PROJECTION_FAIL;
  error: Error;
}

interface UpdateProjectionRequestAction {
  type: typeof UPDATE_PROJECTION_REQUEST;
}

interface UpdateProjectionSuccessAction {
  type: typeof UPDATE_PROJECTION_SUCCESS;
  updatedProjection: Projection;
}

interface UpdateProjectionFailAction {
  type: typeof UPDATE_PROJECTION_FAIL;
  error: Error;
}

interface DeleteProjectionRequestAction {
  type: typeof DELETE_PROJECTION_REQUEST;
}

interface DeleteProjectionSuccessAction {
  type: typeof DELETE_PROJECTION_SUCCESS;
}

interface DeleteProjectionFailAction {
  type: typeof DELETE_PROJECTION_FAIL;
  error: Error;
}

export type ProjectionActionTypes =
  | FetchProjectionsRequestAction
  | FetchProjectionsSuccessAction
  | FetchProjectionsFailAction
  | FetchProjectionRequestAction
  | FetchProjectionSuccessAction
  | FetchProjectionFailAction
  | CreateProjectionRequestAction
  | CreateProjectionSuccessAction
  | CreateProjectionFailAction
  | UpdateProjectionRequestAction
  | UpdateProjectionSuccessAction
  | UpdateProjectionFailAction
  | DeleteProjectionRequestAction
  | DeleteProjectionSuccessAction
  | DeleteProjectionFailAction;
