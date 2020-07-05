import React from 'react';
import "./HomePage.scss"

function HomePage () {
    return (
        <div className='home-page-container'>
            <div className='home-page-container__main'>
                <div className='home-page-container__main-title'> Welcome to Movie Lounge! </div>
                <div className='home-page-container__main-image' ></div>
                <div className='home-page-container__main-content'>   
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut nibh tempus, ultricies velit laoreet, porttitor sem. Aenean feugiat, 
                    mauris ut suscipit ultrices, mauris urna congue elit, suscipit tincidunt quam risus a felis. Sed purus nisl, ullamcorper eget arcu eu, 
                    vulputate condimentum mi. Cras mauris eros, pretium a ultrices non, auctor ac velit. Donec interdum erat nec lorem pretium rhoncus. 
                    Donec sit amet rhoncus nisi. Vivamus bibendum augue sit amet urna euismod ornare. Fusce placerat neque est, non ultrices ligula cursus nec. 
                    Aliquam pharetra iaculis augue, in euismod ex varius scelerisque. Proin cursus quam lacus, vitae vehicula sem dignissim at. Sed molestie lacus purus, 
                    feugiat pellentesque elit efficitur vitae. Quisque consectetur dapibus maximus. Phasellus hendrerit eros dapibus tincidunt porttitor.
                </div>
            </div>
            <div className='home-page-container__trending'>
                <div className='home-page-container__trending-item'>trending 1</div>
                <div className='home-page-container__trending-item'>trending 2</div>
                <div className='home-page-container__trending-item'>trending 3</div>
                <div className='home-page-container__trending-item'>trending 4</div>
            </div>
            <div className='home-page-container__upcomming'>
                <div className='home-page-container__upcomming-item'>upcomming 1</div>
                <div className='home-page-container__upcomming-item'>upcomming 2</div>
                <div className='home-page-container__upcomming-item'>upcomming 3</div>
            </div>
        </div>
    )
}

export default HomePage;