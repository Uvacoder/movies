import React from 'react';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import { Menu,Layout,Input } from 'antd';
import './AppLayout.scss';
import Roots from '../Roots/Roots'
import SubMenu from 'antd/lib/menu/SubMenu';
import { UserOutlined,PlaySquareOutlined,DesktopOutlined,DashboardOutlined,CoffeeOutlined,ProfileOutlined } from '@ant-design/icons';
// import Communication from '../Communication/Communication';

const { Header, Content } = Layout;
const { Search } = Input;

class AppLayout extends React.Component {

  renderHeader = () => {
    return (
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className='header-home'>
                  <Menu className ='nav-bar-menu' theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>  
                          <Menu.Item key="1" icon={<PlaySquareOutlined/>}></Menu.Item>
                  </Menu>
                </div>
                <Menu className ='nav-bar-menu' theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <SubMenu key="sub1" icon={<DesktopOutlined />} title="Movies">
                      <Menu.Item key="1">1</Menu.Item>
                      <Menu.Item key="2">2</Menu.Item>
                      <Menu.Item key="3">3</Menu.Item>
                      <Menu.Item key="4">4</Menu.Item>
                    </SubMenu>
                    <SubMenu  key="sub2" icon={<CoffeeOutlined />} title="TV Shows">
                      <Menu.Item key="1">1</Menu.Item>
                      <Menu.Item key="2">2</Menu.Item>
                      <Menu.Item key="3">3</Menu.Item>
                      <Menu.Item key="4">4</Menu.Item>
                    </SubMenu>
                    <Search
                        placeholder="Search movies, TV Shows or people"
                        onSearch={value => console.log(value)}
                        style={{ width: 300}}
                        enterButton
                    />
                    <SubMenu  key="sub3" icon={<DashboardOutlined />} title="Rankings">
                      <Menu.Item key="1">1</Menu.Item>
                      <Menu.Item key="2">2</Menu.Item>
                      <Menu.Item key="3">3</Menu.Item>
                      <Menu.Item key="4">4</Menu.Item>
                    </SubMenu>
                    <SubMenu  key="sub4" icon={<UserOutlined />} title="People">
                      <Menu.Item key="1">1</Menu.Item>
                      <Menu.Item key="2">2</Menu.Item>
                      <Menu.Item key="3">3</Menu.Item>
                      <Menu.Item key="4">4</Menu.Item>
                    </SubMenu>
                </Menu>
                <Menu className ='nav-bar-menu' theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <SubMenu  key="sub5" icon={<ProfileOutlined />} title="Your Profile">
                      <Menu.Item key="1">1</Menu.Item>
                      <Menu.Item key="2">2</Menu.Item>
                      <Menu.Item key="3">3</Menu.Item>
                      <Menu.Item key="4">4</Menu.Item>
                    </SubMenu> 
                </Menu>
            </Header>
    )
  }

    renderContent = () => {
      return (
        <Content className="site-layout" style={{ marginTop: 64}}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <Roots />
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