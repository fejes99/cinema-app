import { useNavigate } from 'react-router';

export const useProjectionRedirect = () => {
  const navigate = useNavigate();

  const redirectToProjectionDetails = (projectionId: string) =>
    navigate(`/projections/${projectionId}`);

  return { redirectToProjectionDetails };
};
