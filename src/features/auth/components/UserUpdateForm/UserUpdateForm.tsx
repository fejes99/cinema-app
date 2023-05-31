import React, { useState } from 'react';
import './UserUpdateForm.scss';
import { User } from 'features/auth/types/User';
import { UserUpdateDto } from 'features/auth/types/UserUpdateDto';
import Input from 'common/components/UI/Input/Input';
import Button from 'common/components/UI/Button/Button';

interface Props {
  user: User;
  update: (id: string, userUpdateDto: UserUpdateDto) => void;
}

const UserUpdateForm: React.FC<Props> = ({ user, update }) => {
  const [userUpdate, setUserUpdate] = useState<UserUpdateDto>({
    firstName: user.firstName,
    lastName: user.lastName,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setUserUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    update(user.id, userUpdate);
  };

  return (
    <div className='user-update'>
      <div className='user-update__title'>Update Profile</div>
      <form className='user-update__form' onSubmit={handleSubmit}>
        <div className='user-update__field'>
          <Input
            label='First Name'
            type='text'
            name='firstName'
            value={userUpdate.firstName!}
            onChange={handleChange}
          />
        </div>
        <div className='user-update__field'>
          <Input
            label='Last Name'
            type='text'
            name='lastName'
            value={userUpdate.lastName!}
            onChange={handleChange}
          />
        </div>
        <Button size='medium' type='success'>
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserUpdateForm;
