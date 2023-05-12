import React from 'react';
import Button from '../../Button/Button';

interface Props {
  title: string;
  show: boolean;
  onDelete: () => void;
  onClose: () => void;
}

const DeleteModal: React.FC<Props> = ({ title, show, onDelete, onClose }) => {
  const handleSubmit = (): void => {
    onDelete();
    onClose();
  };
  return (
    <div className={`modal-container ${show ? 'show' : ''}`} onClick={onClose}>
      <div className='modal' onClick={(event) => event.stopPropagation()}>
        <div className='modal__title'>Delete {title}?</div>
        <div className='modal__row'>
          <Button size='medium' type='primary' onClick={onClose}>
            Cancel
          </Button>
          <Button size='medium' type='error' onClick={handleSubmit}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
