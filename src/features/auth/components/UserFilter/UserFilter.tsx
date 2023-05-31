import React from 'react';
import './UserFilter.scss';
import { UserFilterName, UserFilterValue, UserFilters } from 'features/auth/types/UserFilters.d';
import Search from 'common/components/UI/Search/Search';
import Dropdown from 'common/components/UI/Dropdown/Dropdown';
import Button from 'common/components/UI/Button/Button';

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
      <Button size='medium' type='secondary' onClick={resetFilters}>
        Reset Filters
      </Button>
    </div>
  );
};

export default UserFilter;
