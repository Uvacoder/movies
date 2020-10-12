import React from 'react';
import { Link } from "react-router-dom";
import SubMenu from 'antd/lib/menu/SubMenu';
import { 
  Menu,
  Layout,
} from 'antd';
import { 
  PlaySquareOutlined,
  BarsOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  SmileOutlined,
  UserOutlined
} from '@ant-design/icons';
import './LayoutHeader.scss';
import { withRouter } from 'react-router-dom'
import SearchInput from '../SearchInput/SearchInput'

const SEARCH_BAR_WIDTH = '300px';
const NUMBER_OF_FIRST_API_PAGE = 1;
const { Header } = Layout;

function LayoutHeader (props) {
 const renderSubMenu = (title, icon, menuItems) => {
    return (
      <SubMenu key={ title } icon={ icon } title={ title }>
        {menuItems.map((item, idx) => 
        <Menu.Item key={ idx } onClick={item.onClick}>
          <Link to={ item.url }>{ item.title }</Link>
        </Menu.Item>)}
      </SubMenu>
    );
  };
  
  const renderTopListsMenu = () => {
    const menuItems = [{
      title: 'Top Rated',
      url:'/toplist/top_rated'
    },{
      title: 'Trending Today',
      url:'/toplist/trending_daily'
    },{
      title: 'Trending Weekly',
      url:'/toplist/trending_weekly'
    }]
  
    return renderSubMenu('Top Lists',<BarsOutlined />, menuItems)
  }
  
  const renderNewMoviesSubMenu = () => {
    const menuItems = [{
      title: 'Upcomming',
      url:'/new/upcomming'
    },{
      title: 'Now Playing',
      url:'/new/now_playing'
    }]
  
    return renderSubMenu('New',<ClockCircleOutlined />, menuItems)
  }
  
  const renderAboutMenu = () => {
    const menuItems = [{
      title: 'Informations',
      url:'/about'
    },{
      title: 'Contact',
      url:'/contact'
    }
  ]
  
    return renderSubMenu('About',<InfoCircleOutlined />, menuItems)
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
      title: 'My Ratings',
      url: '/user-ratings'
    },{
      title: 'Account Settings',
      url:"/settings",
    },{
      title: 'Log Out',
      url:"/",
      onClick: () => {
        localStorage.setItem('userName', "");
        localStorage.setItem('token', null);
      }
    }]

    const guestMenuItems = [{
      title: 'Log in or Register',
      url:"/",
    }]

    if (localStorage.getItem("token") === "null") {
      return renderSubMenu("Guest", <UserOutlined />, guestMenuItems)
    } else {
      const userName = localStorage.getItem("userName") !== "" ?  localStorage.getItem("userName") : "Guest";
      return renderSubMenu(userName, <UserOutlined />, menuItems)
    }
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
        {renderTopListsMenu()}
        {renderNewMoviesSubMenu()}
        <SearchInput
          onSearch={value => { 
            if (value) {
              props.handleSearch(value);
              props.history.push('/search-results');
          }}}
          placeholder='Find your favorite movies'
          enterButton={true}
          defaultValue=''
          searchBarWidth={SEARCH_BAR_WIDTH}
        />
          {renderHydeParkMenu()}
          {renderAboutMenu()}
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