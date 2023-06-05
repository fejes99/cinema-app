import React from 'react';
import Button from '../Button/Button';
import './AdminButtonGroup.scss';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

const AdminButtonGroup: React.FC<Props> = ({ onEdit, onDelete }) => (
  <div className='admin-button-group'>
    <Button size='large' type='primary' onClick={onEdit}>
      Edit
      <div className='icon'>
        <ModeEditOutlinedIcon fontSize='small' />
      </div>
    </Button>
    <Button size='large' type='secondary' onClick={onDelete}>
      Delete
      <div className='icon'>
        <DeleteOutlinedIcon fontSize='small' />
      </div>
    </Button>
  </div>
);

export default AdminButtonGroup;
