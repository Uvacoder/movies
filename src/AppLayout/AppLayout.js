import React from 'react';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import { Menu,Layout,Input } from 'antd';
import './AppLayout.scss';
import Roots from '../Roots/Roots'
import SubMenu from 'antd/lib/menu/SubMenu';
import { UserOutlined,PlaySquareOutlined,DesktopOutlined,DashboardOutlined,CoffeeOutlined,ProfileOutlined,SmileOutlined } from '@ant-design/icons';
import Particles from 'particles.js';
// import Communication from '../Communication/Communication';

const { Header, Content } = Layout;
const { Search } = Input;

class AppLayout extends React.Component {

  componentDidMount() {
    //window.particlesJS.load('particles-left', './particles.json');
    //window.particlesJS.load('particles-right', './particles.json');
}

  renderSubMenu = (title,icon,menuItems) => {
    return (
      <SubMenu key={title} icon={icon} title={title}>
        {menuItems.map((item,idx) => <Menu.Item key={idx}>{item.title}</Menu.Item>)}
      </SubMenu>
    )
  }

  renderMoviesSubMenu = () => {
    const menuItems = [{
      title: 'Browse Movies'
    },{
      title: 'Upcomming'
    }]

    return this.renderSubMenu('Movies',<DesktopOutlined />,menuItems)
  }

  renderTVShowsSubMenu = () => {
    const menuItems = [{
      title: 'Browse TV Shows'
    }]

    return this.renderSubMenu('TV Shows',<CoffeeOutlined />,menuItems)
  }

  renderRankingsMenu = () => {
    const menuItems = [{
      title: 'Top Movies'
    },{
      title: 'Top TV Shows'
    },{
      title: 'Top People of Cinema'
    },{
      title: 'Trending Today'
    },{
      title: 'Trending Weekly'
    }]

    return this.renderSubMenu('Rankings',<DashboardOutlined />,menuItems)
  }

  
  renderNetflixMenu = () => {
    const menuItems = [{
      title: 'New Release'
    },{
      title: 'Expiring'
    },{
      title: 'Shows with weekly episodes'
    }]

    return this.renderSubMenu('Netflix',<UserOutlined />,menuItems)
  }

  renderHydeParkMenu = () => {
    const menuItems = [{
      title: 'Random Gif Generator'
    }]

    return this.renderSubMenu('Hyde Park',<SmileOutlined />,menuItems)
  }

  renderYouProfileMenu = () => {
    const menuItems = [{
      title: 'My Ratings'
    },{
      title: 'Favorites'
    },{
      title: 'Want to see'
    },{
      title: 'Account Settings'
    },{
      title: 'Log Out'
    }]

    return this.renderSubMenu('Your Profile',<ProfileOutlined />,menuItems)
  }


  renderHeader = () => {
    return (
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className='header-home'>
                  <Menu className ='nav-bar-menu' theme="dark" mode="horizontal" >  
                    <Menu.Item key="1" icon={<PlaySquareOutlined/>}></Menu.Item>
                  </Menu>
                </div>
                <Menu className ='nav-bar-menu' theme="dark" mode="horizontal" >
                  {this.renderMoviesSubMenu()}
                  {this.renderTVShowsSubMenu()}
                  {this.renderRankingsMenu()}
                  <Search
                    placeholder="Search movies, TV Shows or people"
                    onSearch={value => console.log(value)}
                    style={{ width: 300}}
                    enterButton
                  />
                    {this.renderNetflixMenu()}
                    {this.renderHydeParkMenu()}
                </Menu>
                <Menu className ='nav-bar-menu' theme="dark" mode="horizontal" >
                  {this.renderYouProfileMenu()}
                </Menu>
            </Header>
    )
  }

    renderContent = () => {
      return (
        <Content className="site-layout" style={{ marginTop: 64}}>
        <div className='site-layout__container'>
          <div id='particles-left' className='site-layout__container-margin-left'></div>  
          <div className="site-layout__container-main" style={{ padding: 24, minHeight: 380 }}>
              <Roots />
          </div>
          <div id='particles-right' className='site-layout__container-margin-right'></div>   
        </div> 
        </Content>
      )

    }
  
  render() {
    return (
      <div className='app-layout'>
        <Layout>
           {this.renderHeader()}
           {this.renderContent()}
        </Layout>
      </div>
     );
   };
}

export default AppLayout;