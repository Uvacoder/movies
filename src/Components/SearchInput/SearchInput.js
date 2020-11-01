import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchInput = (props) => {
  const {
    searchBarWidth
  } = props;

  const [inputValue, setInputValue] = useState('')

  return (
    <Search
      placeholder={props.placeholder}
      onSearch={(value) => {
        props.onSearch(value);
        setInputValue('')
      }}
      style={{ width: searchBarWidth}}
      enterButton={ props.enterButton }
      defaultValue={ props.defaultValue }
      value={ inputValue }
      onChange={ e => setInputValue(e.target.value) }
    />
  );
};

SearchInput.defaultProps = {
  searchBarWidth: 300
};

export default SearchInput