import React from 'react';

import './Search.scss';

interface Props {
  onChange: (value: string) => void;
}

const Search: React.FC<Props> = ({ onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(value);
  };

  // TODO: Use Input component
  return <input className='search' type='text' placeholder='Search...' onChange={handleChange} />;
};

export default Search;
