import { Projection } from '../types/Projection';
import { Error } from 'common/types/Error';

export const FETCH_PROJECTIONS_REQUEST = 'FETCH_PROJECTIONS_REQUEST';
export const FETCH_PROJECTIONS_SUCCESS = 'FETCH_PROJECTIONS_SUCCESS';
export const FETCH_PROJECTIONS_FAIL = 'FETCH_PROJECTIONS_FAIL';

export const FETCH_PROJECTION_REQUEST = 'FETCH_PROJECTION_REQUEST';
export const FETCH_PROJECTION_SUCCESS = 'FETCH_PROJECTION_SUCCESS';
export const FETCH_PROJECTION_FAIL = 'FETCH_PROJECTION_FAIL';

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

export type ProjectionActionTypes =
  | FetchProjectionsRequestAction
  | FetchProjectionsSuccessAction
  | FetchProjectionsFailAction
  | FetchProjectionRequestAction
  | FetchProjectionSuccessAction
  | FetchProjectionFailAction;
