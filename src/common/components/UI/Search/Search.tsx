import React from 'react';

import './Search.scss';

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

const Search: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <input
      className='search'
      type='text'
      placeholder='Search...'
      value={value}
      onChange={handleChange}
    />
  );
};

export default Search;
