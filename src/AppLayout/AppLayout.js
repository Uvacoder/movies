import React from 'react';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import { Menu,Layout,Input } from 'antd';
import './AppLayout.css';
import Roots from '../Roots/Roots'
// import Communication from '../Communication/Communication';

const { Header, Content } = Layout;
const { Search } = Input;

class AppLayout extends React.Component {
  render() {
    return (
      <>
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Menu className ='nav-bar-menu' theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="/home">Movies</Link>
                    </Menu.Item>
                    <Menu.Item key="2">TV Shows</Menu.Item>
                    <Menu.Item key="3">Rankings</Menu.Item>
                    <Menu.Item key="4">People</Menu.Item>
                    <Search
                        placeholder="Search movies, TV Shows or people"
                        onSearch={value => console.log(value)}
                        style={{ width: 300}}
                        enterButton
                    />
                    <Menu.Item className='nav-bar-menu nav-bar-menu__your-profile-bttn' key="5">Your Profile</Menu.Item>
                </Menu>
            </Header>
            <Content className="site-layout" style={{ marginTop: 64}}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    <Roots />
                </div>
            </Content>
        </Layout>
      </>
     );
   };
}

export default AppLayout;