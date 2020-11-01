import React, { useState,useEffect } from 'react';
import { Input } from 'antd';
import { withRouter } from 'react-router-dom'

const { TextArea } = Input;

const UserComment = (props) => {
  const {
    placeholder,
    rows,
  } = props;
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setInputValue('')
  },[props.match.params.id]);

  return (
    <TextArea 
      rows={rows}
      placeholder={placeholder}
      value={inputValue || props.commentValue}
      onChange={e => {
        setInputValue(e.target.value)
        props.updateCommentValue(e.target.value)
      }}
    />
  );
};

UserComment.defaultProps = {
  placeholder: 'Please enter comment',
  rows: 4,
};

export default withRouter(UserComment)