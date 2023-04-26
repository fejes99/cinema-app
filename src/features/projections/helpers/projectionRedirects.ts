import { useNavigate } from 'react-router';

export const useProjectionRedirect = () => {
  const navigate = useNavigate();

  const redirectToProjectionDetails = (projectionId: string) =>
    navigate(`/projections/${projectionId}`);

  const redirectToProjectionCreate = () => navigate('/projections/create');

  const redirectToProjectionUpdate = (projectionId: string) =>
    navigate(`/projections/${projectionId}/edit`);

  return { redirectToProjectionDetails, redirectToProjectionCreate, redirectToProjectionUpdate };
};
