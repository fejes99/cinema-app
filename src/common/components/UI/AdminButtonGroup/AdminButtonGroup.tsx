import React from 'react';
import Button from '../Button/Button';
import './AdminButtonGroup.scss';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

const AdminButtonGroup: React.FC<Props> = ({ onEdit, onDelete }) => (
  <div className='admin-button-group'>
    <Button size='large' type='primary' onClick={onEdit}>
      Edit
    </Button>
    <Button size='large' type='error' onClick={onDelete}>
      Delete
    </Button>
  </div>
);

export default AdminButtonGroup;
