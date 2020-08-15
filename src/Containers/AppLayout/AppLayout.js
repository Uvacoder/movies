import React from 'react';
import { Layout } from 'antd';
import './AppLayout.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Particles from 'particles.js';
import LayoutHeader from 'components/LayoutHeader/LayoutHeader'
import LayoutContent from 'components/LayoutContent/LayoutContent'
import { fetchSearched } from 'actions/SearchActions'

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
           <LayoutHeader handleSearch={this.props.fetchSearched} />
           <LayoutContent />
        </Layout>
      </div>
    );
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSearched,
}, dispatch)

export default connect(null, mapDispatchToProps)(AppLayout);
