import { useNavigate } from 'react-router';

export const useProjectionRedirect = () => {
  const navigate = useNavigate();

  const redirectToProjectionList = (): void => navigate('/projections');

  const redirectToProjectionDetails = (projectionId: string): void =>
    navigate(`/projections/${projectionId}`);

  const redirectToProjectionCreate = (): void => navigate('/projections/new');

  const redirectToProjectionUpdate = (projectionId: string): void =>
    navigate(`/projections/${projectionId}/edit`);

  return {
    redirectToProjectionList,
    redirectToProjectionDetails,
    redirectToProjectionCreate,
    redirectToProjectionUpdate,
  };
};
