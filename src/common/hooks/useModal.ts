import { useCallback, useMemo, useState } from 'react';

type modalStateType = {
  showUpdateModal: boolean;
  showDeleteModal: boolean;
};

type modalFunctionsType = {
  openUpdateModal: () => void;
  openDeleteModal: () => void;
  closeAllModals: () => void;
};

const useModal = () => {
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const closeAllModals = useCallback((): void => {
    setShowUpdateModal(false);
    setShowDeleteModal(false);
  }, []);

  const openUpdateModal = useCallback((): void => {
    closeAllModals();
    setShowUpdateModal(true);
  }, [closeAllModals]);

  const openDeleteModal = useCallback((): void => {
    closeAllModals();
    setShowDeleteModal(true);
  }, [closeAllModals]);

  const modalState = useMemo(
    (): modalStateType => ({ showUpdateModal, showDeleteModal }),
    [showUpdateModal, showDeleteModal]
  );

  const modalFunctions = useMemo(
    (): modalFunctionsType => ({ openUpdateModal, openDeleteModal, closeAllModals }),
    [closeAllModals, openDeleteModal, openUpdateModal]
  );

  return { ...modalState, ...modalFunctions };
};

export default useModal;
