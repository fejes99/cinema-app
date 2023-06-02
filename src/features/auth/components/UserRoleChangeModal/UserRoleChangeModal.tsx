import Button from 'common/components/UI/Button/Button';
import Dropdown from 'common/components/UI/Dropdown/Dropdown';
import { User } from 'features/auth/types/User';
import { UserUpdateDto } from 'features/auth/types/UserUpdateDto';
import React, { useEffect, useState } from 'react';

interface Props {
  user: User | undefined;
  show: boolean;
  roles: string[];
  onUpdate: (userUpdateDto: UserUpdateDto) => void;
  onClose: () => void;
}

const UserRoleChangeModal: React.FC<Props> = ({ user, show, roles, onUpdate, onClose }) => {
  console.log('🚀 ~ file: UserRoleChangeModal.tsx:16 ~ user:', user);
  const [userUpdate, setUserUpdate] = useState<UserUpdateDto>({
    role: user && user.role,
  });
  console.log('🚀 ~ file: UserRoleChangeModal.tsx:20 ~ userUpdate:', userUpdate);
  useEffect(() => {
    setUserUpdate({ role: user?.role });
  }, [user]);

  const handleChange = (value: string): void => setUserUpdate({ role: value });

  const handleSubmit = () => {
    onUpdate(userUpdate);
    onClose();
  };

  return (
    <div className={`modal-container ${show ? 'show' : ''}`} onClick={onClose}>
      <div className='modal' onClick={(event) => event.stopPropagation()}>
        <div className='modal__title'>Update {user?.username} role?</div>
        <div className='modal__row'>
          <Dropdown
            title='Role'
            value={userUpdate.role!}
            options={roles}
            onChange={(value) => handleChange(value)}
          />
        </div>
        <div className='modal__row'>
          <Button size='medium' type='secondary' onClick={onClose}>
            Cancel
          </Button>
          <Button size='medium' type='primary' onClick={handleSubmit}>
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserRoleChangeModal;
