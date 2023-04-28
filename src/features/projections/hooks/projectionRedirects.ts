import { useNavigate } from 'react-router';

export const useProjectionRedirect = () => {
  const navigate = useNavigate();

  const redirectToProjectionList = () => navigate('/projections');

  const redirectToProjectionDetails = (projectionId: string) =>
    navigate(`/projections/${projectionId}`);

  const redirectToProjectionCreate = () => navigate('/projections/new');

  const redirectToProjectionUpdate = (projectionId: string) =>
    navigate(`/projections/${projectionId}/edit`);

  return {
    redirectToProjectionList,
    redirectToProjectionDetails,
    redirectToProjectionCreate,
    redirectToProjectionUpdate,
  };
};
