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
import { withResizeDetector } from 'react-resize-detector';
import ReactResizeDetector from 'react-resize-detector';

const { Header, Content } = Layout;
const { Search } = Input;

class AppLayout extends React.Component {
  constructor(props) {
    super(props);

    this.hasChangedTimer = null;
  }

  renderParticles() {
    // Due to library constraints accessing to load function from window object is necessary.
    window.particlesJS.load('particles-left', './particles.json');
    window.particlesJS.load('particles-right', './particles.json');
  }

  // componentDidUpdate(prevProps) {
  //   const heightHasChanged = this.props.height !== prevProps.height;
  //   // if () {
  //   //   console.log("height has changed")
  //   // }

  //   if (heightHasChanged) {
  //     console.log('heightHasChanged')
  //     clearTimeout(this.hasChangedTimer);
  //     // this.hasChangedTimer = setTimeout(() => this.renderParticles(), 500);
  //     this.hasChangedTimer = setTimeout(() => this.renderParticles(), 500);
  //   }

  //         // this.renderParticles();
      
  //     // function resizedw(){
  //     //     // Haven't resized in 100ms!
  //     // }
    
  //     // var doit;
  //     // window.onresize = function(){
  //     //   clearTimeout(doit);
  //     //   doit = setTimeout(resizedw, 100);
  //     // };
  // }

  onResize() {
    console.log('height has cahnged')



    //TODO rerender particles
    // clearTimeout(this.hasChangedTimer);
    // this.hasChangedTimer = setTimeout(() => {
    //   //tmp for each
    //   window.pJSDom[0].pJS.fn.particlesRefresh()
    //   window.pJSDom[1].pJS.fn.particlesRefresh()
    // }, 2000);
  }

  componentDidMount() {
    this.renderParticles(); //TODO use callback with not on mount
  }

  renderSubMenu = (title,icon,menuItems) => {
    return (
      <SubMenu key={title} icon={icon} title={title}>
        {menuItems.map((item,idx) => 
        <Menu.Item key={idx}>
          <Link to ={item.url}>{item.title}</Link>
        </Menu.Item>)}
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
      title: 'Random Gif Generator',
      url:"/random-gif-generator"
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
                    <Menu.Item key="1" icon={<PlaySquareOutlined/>}>
                      <Link to ="/home" />
                    </Menu.Item>
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
          <div className="site-layout__container-main" style={{ padding: 24 }}>
            <ReactResizeDetector skipOnMount handleHeight onResize={this.onResize.bind(this)} />
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