import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;
const SEARCH_BAR_WIDTH = '300px';

const SearchInput = (props) => {
  const [inputValue, setInputValue] = useState('')

  return (
    <Search
      placeholder={props.placeholder}
      onSearch={(value) => {
        props.onSearch(value);
        setInputValue('')
      }}
      style={{ width: SEARCH_BAR_WIDTH}}
      enterButton={ props.enterButton }
      defaultValue={ props.defaultValue }
      value={ inputValue }
      onChange={ e => setInputValue(e.target.value) }
    />
  );
};

export default SearchInput