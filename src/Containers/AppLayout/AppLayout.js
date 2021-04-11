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
import {ReactComponent as Github} from '../../Images/github.svg';

const GITHUB_LINK = "https://github.com/patrykbura"

class AppLayout extends React.Component {
  renderLayoutContent = () => {
    if (this.props.location.pathname === '/contact') {
      return <Contact />
    } else if (this.props.location.pathname === '/settings') {
      return <UserSettings />
    } else {
      return <LayoutContent />
    };
  };

  renderGithubLink = () => {
    if (this.props.location.pathname === '/contact') {
      return null
    }

    return (
      <a href={ GITHUB_LINK }>
        <Github className="app-layout__github"/>
      </a>
    );
  };

  render() {
    return (
      <div className='app-layout'>
        <Layout>
          <LayoutHeader handleSearch={this.props.fetchSearched} />
          {this.renderLayoutContent()}
        </Layout>
        { this.renderGithubLink() }
      </div>
    );
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSearched,
}, dispatch)

export default connect(null, mapDispatchToProps)(withRouter(AppLayout));