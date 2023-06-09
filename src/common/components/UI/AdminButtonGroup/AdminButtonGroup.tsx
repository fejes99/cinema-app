import React from 'react';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import './AdminButtonGroup.scss';
import Button from '../Button/Button';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

const AdminButtonGroup: React.FC<Props> = ({ onEdit, onDelete }) => (
  <div className='admin-button-group'>
    <Button size='large' type='primary' onClick={onEdit}>
      Edit
      <div className='icon'>
        <ModeEditOutlinedIcon fontSize='large' />
      </div>
    </Button>
    <Button size='large' type='secondary' onClick={onDelete}>
      Delete
      <div className='icon'>
        <DeleteOutlinedIcon fontSize='large' />
      </div>
    </Button>
  </div>
);

export default AdminButtonGroup;
