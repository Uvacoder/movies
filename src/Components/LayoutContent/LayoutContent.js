import React from 'react';
import './LayoutContent.scss';
import Roots from '../../Roots/Roots'
import { Layout } from 'antd';
import { SkeletonTheme } from "react-loading-skeleton";

const { Content } = Layout;

function LayoutContent () {
  return (
    <Content className="site-layout">
      <div className='site-layout__container'>
        <div id='particles-left' className='site-layout__container-margin-left'/>
          <div className="site-layout__container-main">
            <SkeletonTheme color="#042d53" highlightColor="#444">
              <Roots />
            </SkeletonTheme>
          </div>
        <div id='particles-right' className='site-layout__container-margin-right'/>  
      </div> 
    </Content>
  );
};

export default LayoutContent