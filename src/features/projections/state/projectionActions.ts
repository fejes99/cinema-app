import axios from 'axios';
import * as actionTypes from './projectionTypes';
import { Projection } from '../types/Projection';
import { Error } from 'common/types/Error';
import { AppDispatch } from 'store/store';

const fetchProjectionsRequest = () => ({
  type: actionTypes.FETCH_PROJECTIONS_REQUEST,
});

const fetchProjectionsSuccess = (projections: Projection[]) => ({
  type: actionTypes.FETCH_PROJECTIONS_SUCCESS,
  projections: projections,
});

const fetchProjectionsFail = (error: Error) => ({
  type: actionTypes.FETCH_PROJECTIONS_FAIL,
  error: error,
});

export const fetchProjections = () => (dispatch: AppDispatch) => {
  dispatch(fetchProjectionsRequest());
  axios
    .get('/projections')
    .then((response) => {
      console.log('🚀 ~ file: projectionActions.ts:26 ~ .then ~ response:', response);
      dispatch(fetchProjectionsSuccess(response.data));
    })
    .catch((error) => dispatch(fetchProjectionsFail(error)));
};

const fetchProjectionRequest = () => ({
  type: actionTypes.FETCH_PROJECTION_REQUEST,
});

const fetchProjectionSuccess = (projection: Projection) => ({
  type: actionTypes.FETCH_PROJECTION_SUCCESS,
  selectedProjection: projection,
});

const fetchProjectionFail = (error: Error) => ({
  type: actionTypes.FETCH_PROJECTION_FAIL,
  error: error,
});

export const fetchProjection = (id: string) => (dispatch: AppDispatch) => {
  dispatch(fetchProjectionRequest());
  axios
    .get(`/projections/${id}`)
    .then((response) => dispatch(fetchProjectionSuccess(response.data)))
    .catch((error) => dispatch(fetchProjectionFail(error)));
};
