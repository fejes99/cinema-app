import { Reducer } from 'redux';
import { ProjectionState } from './projectionState';
import * as actionTypes from './projectionTypes';

const initialState: ProjectionState = {
  projections: [],
  selectedProjection: null,
  loading: false,
  error: null,
};

const projectionReducer: Reducer<ProjectionState, actionTypes.ProjectionActionTypes> = (
  state = initialState,
  action
): ProjectionState => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTIONS_REQUEST:
      return { ...state, loading: true, projections: [], error: null };
    case actionTypes.FETCH_PROJECTIONS_SUCCESS:
      return { ...state, loading: false, projections: action.projections };
    case actionTypes.FETCH_PROJECTIONS_FAIL:
      return { ...state, loading: false, error: action.error };

    case actionTypes.FETCH_PROJECTION_REQUEST:
      return { ...state, loading: true, selectedProjection: null, error: null };
    case actionTypes.FETCH_PROJECTION_SUCCESS:
      return { ...state, loading: false, selectedProjection: action.selectedProjection };
    case actionTypes.FETCH_PROJECTION_FAIL:
      return { ...state, loading: false, error: action.error };

    case actionTypes.CREATE_PROJECTION_REQUEST:
      return { ...state, loading: true, selectedProjection: null, error: null };
    case actionTypes.CREATE_PROJECTION_SUCCESS:
      return { ...state, loading: false, selectedProjection: action.newProjection };
    case actionTypes.CREATE_PROJECTION_FAIL:
      return { ...state, loading: false, error: action.error };

    case actionTypes.UPDATE_PROJECTION_REQUEST:
      return { ...state, loading: true, selectedProjection: null, error: null };
    case actionTypes.UPDATE_PROJECTION_SUCCESS:
      return { ...state, loading: false, selectedProjection: action.updatedProjection };
    case actionTypes.UPDATE_PROJECTION_FAIL:
      return { ...state, loading: false, error: action.error };

    case actionTypes.DELETE_PROJECTION_REQUEST:
      return { ...state, loading: true, selectedProjection: null, error: null };
    case actionTypes.DELETE_PROJECTION_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.DELETE_PROJECTION_FAIL:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default projectionReducer;
