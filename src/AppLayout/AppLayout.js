import React from 'react';
import { Layout } from 'antd';
import './AppLayout.scss';
import Particles from 'particles.js';
import LayoutHeader from '../LayoutHeader/LayoutHeader'
import LayoutContent from '../LayoutContent/LayoutContent'
class AppLayout extends React.Component {

// //TODO -> FIX PARTICLES JS LIBRARY
//   renderParticles() {
//     // Due to library constraints accessing to load function from window object is necessary.
//     //window.particlesJS.load('particles-left', './particles.json');
//     //window.particlesJS.load('particles-right', './particles.json');
//   }

//   componentDidMount() {
//     this.renderParticles(); //TODO use callback with not on mount
//   }
  
  render() {
    return (
      <div className='app-layout'>
        <Layout>
           <LayoutHeader />
           <LayoutContent />
        </Layout>
      </div>
    );
  };
}

export default AppLayout;