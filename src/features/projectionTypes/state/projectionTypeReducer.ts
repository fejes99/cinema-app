import { Reducer } from 'redux';
import * as actionTypes from './projectionTypeTypes';
import { ProjectionTypeState } from './projectionTypeState';

const initialState: ProjectionTypeState = {
  projectionTypes: [],
  loading: false,
  error: null,
};

const projectionTypeReducer: Reducer<ProjectionTypeState, actionTypes.ProjectionTypeActionTypes> = (
  state = initialState,
  action
): ProjectionTypeState => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTIONTYPES_REQUEST:
      return { ...state, loading: true, projectionTypes: [], error: null };
    case actionTypes.FETCH_PROJECTIONTYPES_SUCCESS:
      return { ...state, loading: false, projectionTypes: action.projectionTypes };
    case actionTypes.FETCH_PROJECTIONTYPES_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default projectionTypeReducer;
