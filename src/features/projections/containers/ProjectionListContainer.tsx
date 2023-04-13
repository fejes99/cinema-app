import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, StoreState } from 'store/store';
import ProjectionList from '../components/ProjectionList/ProjectionList';
import ProjectionFilter from '../components/ProjectionFilter/ProjectionFilter';
import { fetchProjections } from '../state/projectionActions';
import { Projection } from '../types/Projection';

interface Props {
  projections: Projection[];
  loading: boolean;
  error: Error;
  onFetchProjections: () => void;
}

const ProjectionListContainer: React.FC<Props> = ({
  projections,
  loading,
  error,
  onFetchProjections,
}) => {
  useEffect(() => onFetchProjections(), [onFetchProjections]);
  return (
    <>
      <ProjectionFilter />
      <ProjectionList loading={loading} projections={projections} error={error} />
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  projections: state.projections.projections,
  loading: state.projections.loading,
  error: state.projections.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchProjections: () => dispatch(fetchProjections()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectionListContainer);
