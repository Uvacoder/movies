import React from 'react';
import './LayoutContent.scss';
import Roots from '../../Roots/Roots'
import { Layout } from 'antd';

const LAYOUT_CONTENT_MARGIN_TOP = 64;
const LAYOUT_CONTENT_PADDING = 24;
const { Content } = Layout;

function LayoutContent () {
  return (
    <Content className="site-layout" style={{ marginTop: LAYOUT_CONTENT_MARGIN_TOP}}>
      <div className='site-layout__container'>
        <div id='particles-left' className='site-layout__container-margin-left'/>
          <div className="site-layout__container-main" style={{ padding: LAYOUT_CONTENT_PADDING }}>
            <Roots />
          </div>
        <div id='particles-right' className='site-layout__container-margin-right'/>  
      </div> 
    </Content>
  );
};

export default LayoutContent