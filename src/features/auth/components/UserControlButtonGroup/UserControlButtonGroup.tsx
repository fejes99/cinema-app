import React from 'react';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
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
      <div className='icon'>
        <ModeEditOutlinedIcon fontSize='small' />
      </div>
    </Button>
    <Button size='large' type='secondary' onClick={onLogout}>
      Logout
      <div className='icon'>
        <LogoutIcon fontSize='small' />
      </div>
    </Button>
  </div>
);

export default UserControlButtonGroup;
