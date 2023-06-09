import React from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import './UserFilter.scss';

import { UserFilterName, UserFilterValue, UserFilters } from 'features/auth/types/UserFilters.d';
import Button from 'common/components/UI/Button/Button';
import Search from 'common/components/UI/Search/Search';
import Dropdown from 'common/components/UI/Dropdown/Dropdown';

interface Props {
  roles: string[];
  filters: UserFilters;
  onFiltersChange: (name: UserFilterName, value: UserFilterValue) => void;
  resetFilters: () => void;
}

const UserFilter: React.FC<Props> = ({
  roles,
  filters: { query, role },
  onFiltersChange,
  resetFilters,
}) => {
  return (
    <div className='user-filter'>
      <div className='user-filter__input'>
        <div className='user-filter__search'>
          <Search onChange={(value) => onFiltersChange(UserFilterName.Query, value)} />
        </div>
        <div className='user-filter__filter'>
          <Dropdown
            title='Role'
            value={role}
            options={roles}
            onChange={(value) => onFiltersChange(UserFilterName.Role, value)}
          />
        </div>
      </div>
      <Button size='medium' type='secondary' onClick={resetFilters}>
        Reset
        <div className='icon'>
          <RestartAltIcon fontSize='large' />
        </div>
      </Button>
    </div>
  );
};

export default UserFilter;
