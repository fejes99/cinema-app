import { ProjectionType } from '../types/ProjectionType';

export const FETCH_PROJECTIONTYPES_REQUEST = 'FETCH_PROJECTIONTYPES_REQUEST';
export const FETCH_PROJECTIONTYPES_SUCCESS = 'FETCH_PROJECTIONTYPES_SUCCESS';
export const FETCH_PROJECTIONTYPES_FAIL = 'FETCH_PROJECTIONTYPES_FAIL';

interface FetchProjectionsRequestAction {
  type: typeof FETCH_PROJECTIONTYPES_REQUEST;
}

interface FetchProjectionsSuccessAction {
  type: typeof FETCH_PROJECTIONTYPES_SUCCESS;
  projectionTypes: ProjectionType[];
}

interface FetchProjectionsFailAction {
  type: typeof FETCH_PROJECTIONTYPES_FAIL;
  error: Error;
}

export type ProjectionTypeActionTypes =
  | FetchProjectionsRequestAction
  | FetchProjectionsSuccessAction
  | FetchProjectionsFailAction;
