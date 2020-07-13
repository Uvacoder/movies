import React, { useEffect, useState } from 'react';
import "./HomePage.scss"
import Communication from '../Communication/Communication';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux'
import { fetchTrending } from '../Actions/actions'
import trending from '../Reducers/HomePageReducer';

const NO_OF_TRENDING_ITEMS = 4;
const NO_OF_UPCOMMING_ITEMS = 3;
const TRENDING_API = 'https://api.themoviedb.org/3/trending/all/day?api_key=87f688d5cb704339968f87fae03f38cd'
const UPCOMMING_API = 'https://api.themoviedb.org/3/movie/upcoming?api_key=87f688d5cb704339968f87fae03f38cd&language=EN&page=1&region=US'

function HomePage () {

    // const [trendingList,setTrendingList] = useState([]);
    const [upcommingList,setUpcommingList] = useState([]);
    const trendingList = useSelector(state => [state.trending]);
    const dispatch = useDispatch();

    // const fetchTrending = async() => {
    //     const result = await Communication.get(TRENDING_API);
    //     setTrendingList(result.results);
    // };

    const fetchUpcomming = async() => {
        const result = await Communication.get(UPCOMMING_API);
        setUpcommingList(result.results);
    };

    useEffect(() => {
        dispatch(fetchTrending());
        // fetchTrending()
        fetchUpcomming();
    },[]);

    

    const renderTrending = () => {
        // const availableMovies = trendingList.filter(movie => movie.title)
        const availableMovies = trendingList.filter(movie => movie.title)
        console.log(availableMovies)
        return availableMovies.slice(0,NO_OF_TRENDING_ITEMS).map((item) => {
            return <div className='home-page-container__trending-item'>{item?.title}</div>
        });
    };

    const renderUpcomming = () => {
        const availableMovies = upcommingList.filter(movie => movie.title || movie.orginal_title)
        console.log(availableMovies)
        return availableMovies.slice(0,NO_OF_UPCOMMING_ITEMS).map((item) => {
            return <div className='home-page-container__upcomming-item'>{ item?.title || item?.orginal_title }</div>
        });
    };

    return (
        <div className='home-page-container'>
            <div className='home-page-container__main'>
                <div className='home-page-container__main-title'> Welcome to Movie Lounge! </div>
                <div className='home-page-container__main-image'></div>
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
                {renderTrending()}
            </div>
            <div className='home-page-container__upcomming'>
                {renderUpcomming()}
            </div>
        </div>
    );
};

export default HomePage;