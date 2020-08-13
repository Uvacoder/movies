import React from 'react';
import { Link } from "react-router-dom";
import SubMenu from 'antd/lib/menu/SubMenu';
import { 
  Menu,
  Layout,
  Input 
} from 'antd';
import { 
  UserOutlined,
  PlaySquareOutlined,
  DesktopOutlined,
  DashboardOutlined,
  CoffeeOutlined,
  ProfileOutlined,
  SmileOutlined 
} from '@ant-design/icons';
import './LayoutHeader.scss';
import { withRouter } from 'react-router-dom'

const SEARCH_BAR_WIDTH = '300px';
const { Header } = Layout;
const { Search } = Input;

function LayoutHeader (props) {
 const renderSubMenu = (title, icon, menuItems) => {
    return (
      <SubMenu key={ title } icon={ icon } title={ title }>
        {menuItems.map((item, idx) => 
        <Menu.Item key={ idx }>
          <Link to ={ item.url }>{ item.title }</Link>
        </Menu.Item>)}
      </SubMenu>
    );
  };
  
  const renderMoviesSubMenu = () => {
    const menuItems = [{
      title: 'Browse Movies',
      url:"/movie"
    },{
      title: 'Upcomming'
    }]
  
    return renderSubMenu('Movies',<DesktopOutlined />, menuItems)
  }
  
  const renderTVShowsSubMenu = () => {
    const menuItems = [{
      title: 'Browse TV Shows'
    }]
  
    return renderSubMenu('TV Shows',<CoffeeOutlined />, menuItems)
  }
  
  const renderRankingsMenu = () => {
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
  
    return renderSubMenu('Rankings',<DashboardOutlined />, menuItems)
  }
  
  
  const renderNetflixMenu = () => {
    const menuItems = [{
      title: 'New Release'
    },{
      title: 'Expiring'
    },{
      title: 'Shows with weekly episodes'
    }]
  
    return renderSubMenu('Netflix',<UserOutlined />, menuItems)
  }
  
  const renderHydeParkMenu = () => {
    const menuItems = [{
      title: 'Random Gif Generator',
      url:"/random-gif-generator"
    }]
  
    return renderSubMenu('Hyde Park',<SmileOutlined />, menuItems)
  }
  
  const renderYouProfileMenu = () => {
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
  
    return renderSubMenu('Your Profile',<ProfileOutlined />, menuItems)
  }
  
  return (
    <Header style={{ position: 'fixed', zIndex: 1001, width: '100%' }}>
      <div className='home-header'>
        <Menu className ='nav-bar-menu__title' theme="dark" mode="horizontal" >  
          <Menu.Item key="1" icon={<PlaySquareOutlined/>}>
            <Link to ="/home" > Movie Lounge</Link>
          </Menu.Item>
        </Menu>
      </div>
      <Menu className ='nav-bar-menu' theme="dark" mode="horizontal" >
        {renderMoviesSubMenu()}
        {renderTVShowsSubMenu()}
        {renderRankingsMenu()}
        <Search
          placeholder="Find your favorite movies"
          onSearch={value => props.history.push('/search-results')}
          style={{ width: SEARCH_BAR_WIDTH}}
          enterButton
        />
          {renderNetflixMenu()}
          {renderHydeParkMenu()}
      </Menu>
      <div className="your-profile">
        <Menu className ='nav-bar-menu' theme="dark" mode="horizontal" >
          {renderYouProfileMenu()}
        </Menu>
      </div>
    </Header>
  );
};

export default withRouter(LayoutHeader)