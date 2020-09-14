import React, { useState } from 'react';
import "./UserComment.scss"
import { Input } from 'antd';

const { TextArea } = Input;

const UserComment = (props) => {
  const {
    placeholder,
    rows,
  } = props;
  const [inputValue, setInputValue] = useState('')

  return (
    <TextArea 
      rows={rows}
      placeholder={placeholder}
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
    />
  )
};

UserComment.defaultProps = {
  placeholder: '',
  rows: 4,
}

export default UserComment