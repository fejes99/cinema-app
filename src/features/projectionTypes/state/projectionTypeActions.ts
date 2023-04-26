import { Error } from 'common/types/Error';
import { ProjectionType } from '../types/ProjectionType';
import * as actionTypes from './projectionTypeTypes';
import { AppDispatch } from 'store/store';
import axios from 'axios';

const fetchProjectionTypesRequest = () => ({
  type: actionTypes.FETCH_PROJECTIONTYPES_REQUEST,
});

const fetchProjectionTypesSuccess = (projectionTypes: ProjectionType[]) => ({
  type: actionTypes.FETCH_PROJECTIONTYPES_SUCCESS,
  projectionTypes: projectionTypes,
});

const fetchProjectionTypesFail = (error: Error) => ({
  type: actionTypes.FETCH_PROJECTIONTYPES_FAIL,
  error: error,
});

export const fetchProjectionTypes = () => (dispatch: AppDispatch) => {
  dispatch(fetchProjectionTypesRequest());
  axios
    .get('/projectionTypes')
    .then((response) => dispatch(fetchProjectionTypesSuccess(response.data)))
    .catch((error) => dispatch(fetchProjectionTypesFail(error)));
};
