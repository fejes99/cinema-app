import { useCallback, useMemo, useState } from 'react';

type modalStateType = {
  showDeleteModal: boolean;
};

type modalFunctionsType = {
  openDeleteModal: () => void;
  closeAllModals: () => void;
};

const useModal = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const closeAllModals = useCallback((): void => {
    setShowDeleteModal(false);
  }, []);

  const openDeleteModal = useCallback(() => {
    console.log('🚀 ~ file: useModal.ts:23 ~ openDeleteModal ~ openDeleteModal:', openDeleteModal);
    closeAllModals();
    setShowDeleteModal(true);
  }, [closeAllModals]);

  const modalState = useMemo((): modalStateType => ({ showDeleteModal }), [showDeleteModal]);

  const modalFunctions = useMemo(
    (): modalFunctionsType => ({ openDeleteModal, closeAllModals }),
    [closeAllModals, openDeleteModal]
  );

  return { ...modalState, ...modalFunctions };
};

export default useModal;
