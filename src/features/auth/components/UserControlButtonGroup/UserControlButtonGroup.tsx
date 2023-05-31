import React from 'react';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Button from 'common/components/UI/Button/Button';
import './UserControlButtonGroup.scss';

interface Props {
  onEdit: () => void;
  onLogout: () => void;
}

const UserControlButtonGroup: React.FC<Props> = ({ onEdit, onLogout }) => (
  <div className='user-control-button-group'>
    <Button size='large' type='secondary' onClick={onEdit}>
      Edit Profile
      <ModeEditOutlinedIcon fontSize='small' />
    </Button>
    <Button size='large' type='secondary' onClick={onLogout}>
      Logout
      <DeleteOutlinedIcon fontSize='small' />
    </Button>
  </div>
);

export default UserControlButtonGroup;
