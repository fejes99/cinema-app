import axios from 'axios';
import * as actionTypes from './projectionTypes';
import { Projection } from '../types/Projection';
import { Error } from 'common/types/Error';
import { AppDispatch } from 'store/store';
import { ProjectionCreateDto } from '../types/ProjectionCreateDto';
import { ProjectionUpdateDto } from './../types/ProjectionUpdateDto.d';

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
    .then((response) => dispatch(fetchProjectionsSuccess(response.data)))
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

const createProjectionRequest = () => ({
  type: actionTypes.CREATE_PROJECTION_REQUEST,
});

const createProjectionSuccess = (newProjection: Projection) => ({
  type: actionTypes.CREATE_PROJECTION_SUCCESS,
  selectedProjection: newProjection,
});

const createProjectionFail = (error: Error) => ({
  type: actionTypes.CREATE_PROJECTION_FAIL,
  error: error,
});

const addProjection = (projectionCreateDto: ProjectionCreateDto) => (dispatch: AppDispatch) => {
  dispatch(createProjectionRequest());
  return axios
    .post('/projections', projectionCreateDto)
    .then((response) => dispatch(createProjectionSuccess(response.data)))
    .catch((error) => dispatch(createProjectionFail(error)));
};

export const createProjection =
  (projectionCreateDto: ProjectionCreateDto) => async (dispatch: AppDispatch) => {
    await dispatch(addProjection(projectionCreateDto));
    dispatch(fetchProjections());
  };

const updateProjectionRequest = () => ({
  type: actionTypes.UPDATE_PROJECTION_REQUEST,
});

const updateProjectionSuccess = (editedProjection: ProjectionUpdateDto) => ({
  type: actionTypes.UPDATE_PROJECTION_SUCCESS,
  selectedProjection: editedProjection,
});

const updateProjectionFail = (error: Error) => ({
  type: actionTypes.UPDATE_PROJECTION_FAIL,
  error: error,
});

const editProjection =
  (projectionId: string, projectionUpdateDto: ProjectionUpdateDto) => (dispatch: AppDispatch) => {
    dispatch(updateProjectionRequest());
    return axios
      .put(`/projections/${projectionId}`, projectionUpdateDto)
      .then((response) => dispatch(updateProjectionSuccess(response.data)))
      .catch((error) => dispatch(updateProjectionFail(error)));
  };

export const updateProjection =
  (projectionId: string, projectionUpdateDto: ProjectionUpdateDto) =>
  async (dispatch: AppDispatch) => {
    await dispatch(editProjection(projectionId, projectionUpdateDto));
    dispatch(fetchProjection(projectionId));
  };

const deleteProjectionRequest = () => ({
  type: actionTypes.DELETE_PROJECTION_REQUEST,
});

const deleteProjectionSuccess = () => ({
  type: actionTypes.DELETE_PROJECTION_SUCCESS,
});

const deleteProjectionFail = (error: Error) => ({
  type: actionTypes.DELETE_PROJECTION_FAIL,
  error: error,
});

const removeProjection = (projectionId: string) => (dispatch: AppDispatch) => {
  dispatch(deleteProjectionRequest());
  return axios
    .delete(`/projections/${projectionId}`)
    .then((response) => {
      dispatch(deleteProjectionSuccess());
      dispatch(fetchProjections());
    })
    .catch((error) => dispatch(deleteProjectionFail(error)));
};

export const deleteProjection = (projectionId: string) => async (dispatch: AppDispatch) => {
  await dispatch(removeProjection(projectionId));
  dispatch(fetchProjections());
};
