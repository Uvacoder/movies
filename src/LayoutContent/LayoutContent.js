import React from 'react';
import './LayoutContent.scss';
import Roots from '../Roots/Roots'
import { Layout } from 'antd';

const { Content } = Layout;

function LayoutContent () {

  return (
    <Content className="site-layout" style={{ marginTop: 64}}>
      <div className='site-layout__container'>
        <div id='particles-left' className='site-layout__container-margin-left'></div> 
          <div className="site-layout__container-main" style={{ padding: 24 }}>
              <Roots />
          </div>
        <div id='particles-right' className='site-layout__container-margin-right'></div>   
      </div> 
    </Content>
  )
}

export default LayoutContent