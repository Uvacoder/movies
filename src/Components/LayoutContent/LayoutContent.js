import React from 'react';
import './LayoutContent.scss';
import Roots from '../../Roots/Roots'
import { Layout } from 'antd';

const { Content } = Layout;

function LayoutContent () {
  return (
    <Content className="site-layout">
      <div className='site-layout__container'>
        <div className='site-layout__container-margin-left'/>
          <div className="site-layout__container-main">
            <Roots />
          </div>
        <div className='site-layout__container-margin-right'/>  
      </div> 
    </Content>
  );
};

export default LayoutContent