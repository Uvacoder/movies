import React from 'react';
import { Layout } from 'antd';
import './AppLayout.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import LayoutHeader from 'components/LayoutHeader/LayoutHeader'
import LayoutContent from 'components/LayoutContent/LayoutContent'
import { fetchSearched } from 'actions/SearchActions'
import {withRouter} from 'react-router-dom';
import Contact from 'components/Contact/Contact'
import UserSettings from 'components/UserSettings/UserSettings'
import RegistrationWelcomePage from 'containers/RegistrationWelcomePage/RegistrationWelcomePage'

class AppLayout extends React.Component {
  renderLayoutContent = () => {
    if (this.props.location.pathname === '/contact') {
      return <Contact />
    } else if (this.props.location.pathname === '/settings') {
      return <UserSettings />
    } else if (this.props.location.pathname === '/register') {
      return <RegistrationWelcomePage />
    } else {
      console.log('here')
      return <LayoutContent />
    };
  };

  checkAndRenderLayout = () => {
    if (this.props.location.pathname === '/register') {
      return <RegistrationWelcomePage />
    }
    return (
      <Layout>
        <LayoutHeader handleSearch={this.props.fetchSearched} />
        {this.renderLayoutContent()}
      </Layout>
    )
  }

  render() {
    return (
      <div className='app-layout'>
        {this.checkAndRenderLayout()}
      </div>
    );
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSearched,
}, dispatch)

export default connect(null, mapDispatchToProps)(withRouter(AppLayout));