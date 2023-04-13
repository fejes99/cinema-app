import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, StoreState } from 'store/store';
import ProjectionList from '../components/ProjectionList/ProjectionList';
import ProjectionFilter from '../components/ProjectionFilter/ProjectionFilter';
import { fetchProjections } from '../state/projectionActions';
import { Projection } from '../types/Projection';
import Loader from 'common/components/UI/Loader/Loader';

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

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <ProjectionFilter />
      <ProjectionList projections={projections} />
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
