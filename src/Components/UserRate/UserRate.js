import React, { useState } from 'react';
import "./UserRate.scss"
import { Rate } from 'antd';

const UserRate = (props) => {
  const {
    count,
    defaultValue,
    tooltips,
  } = props;
  const [rateValue, setRateValue] = useState(0)
  
  return (
    <Rate
      className='user-rate' 
      count={ count }
      tooltips={ tooltips }
      defaultValue={ defaultValue }
      value = { rateValue }
      onChange={ value => {
        props.updateRateValue(value)
        setRateValue(value)
      }}
    />
  )
};

UserRate.defaultProps = {
  count: 10,
  defaultValue: 0,
  tooltips: [],
}

export default UserRate