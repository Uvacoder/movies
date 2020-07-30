import React from 'react';
import "./MovieHeader.scss"
import DoughnutChart from '../DoughnutChart/DoughnutChart'


const MovieHeader = (props) => {

    const {
        backDropPath,
        title,
        tagline,
        voteAverage,
        popularity
    } = props;

    return (
        <div className='movie-header'>
            <div className='movie-header_image-wrapper'>
                <img src={backDropPath}/>
            </div>
            <div className='movie-header__wrapper'>
                <div className='movie-header__wrapper-title'>
                    {title}
                </div>
                <div className='movie-header__wrapper-tagline'>
                    "{tagline}"
                </div>
                <div className='movie-header-votes'>
                    <div className='movie-header-votes-average'>
                        <div className='movie-header-votes-average-title'>VOTE AVERAGE:</div>
                        <DoughnutChart 
                        data={voteAverage} 
                        maxValue={10} percent={false} 
                        chartColor= {{voteAverage} > 7 ? 'lightgreen' : 'Aquamarine' }
                        background={"#a9ae9e40"}
                        />
                    </div>
                    <div className='movie-header-votes-popularity'>
                        <div className='movie-header-votes-popularity-title'>POPULARITY:</div>
                        <DoughnutChart 
                        data={Math.floor(popularity)} 
                        maxValue={100} percent={true} 
                        background={"#a9ae9e66"}
                        />
                    </div> 
                </div>
            </div>
        </div>
    );
};

MovieHeader.defaultProps = {
    backDropPath: 'path',
    title: 'movie title',
    tagline: 'tagline',
    voteAverage: 1,
    popularity: 1
}

export default MovieHeader

