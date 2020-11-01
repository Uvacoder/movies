import React from 'react';
import "./UpcommingMovies.scss"
import DoughnutChart from '../DoughnutChart/DoughnutChart'
import ImgPlaceholder from '../../Images/imgPlaceholder.svg'
import TMDBApi from 'utils/TMDBApi';

const IMG_SIZE = 185;
const UpcommingMovie = (props) => {
  const {
    item
  } = props;

  return (
    <div className='upcomming-container'>
      <img 
        className='upcomming-container__image routed-image' 
        src={ item.poster_path ? `${TMDBApi.getImgURL(IMG_SIZE)}${ item.poster_path }` : ImgPlaceholder} 
        onClick={props.routeToMovieDetails}
        alt=""
      />
      <div className='upcomming-container__details'>
        <div 
          className='upcomming-container__details-title routed-text'
          onClick={props.routeToMovieDetails}
        >
          { item.title || item.orginal_title }
        </div>
        <div className='upcomming-container__details-release'>
          <span>Release date:</span>
          <span>{item.release_date}</span>
        </div>
          <div className='upcomming-container__details-popularity'>
            <div className='upcomming-container__details-popularity-text'>
              Popularity:
            </div>
          <div className='upcomming-container__details-popularity-chart'>
            <DoughnutChart data={Math.floor(item.popularity)}/> 
          </div>
        </div>
      </div> 
    </div>   
  );
};

UpcommingMovie.defaultProps = {
  item:{}
};

export default UpcommingMovie