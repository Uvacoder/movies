import React, { useState, useEffect } from 'react';
import "./UserRate.scss"
import { Rate } from 'antd';
import { withRouter } from 'react-router-dom'

const UserRate = (props) => {
  const {
    count,
    defaultValue,
    tooltips,
  } = props;
  const [rateValue, setRateValue] = useState(0)
  
  useEffect(() => {
    setRateValue(0)
  },[props.match.params.id]);

  return (
    <Rate
      className='user-rate' 
      count={ count }
      tooltips={ tooltips }
      defaultValue={ defaultValue }
      value = { rateValue || props.userRateValue }
      onChange={ value => {
        props.updateRateValue(value)
        setRateValue(value)
      }}
    />
  );
};

UserRate.defaultProps = {
  count: 10,
  defaultValue: 0,
  tooltips: [],
};

export default  withRouter(UserRate)