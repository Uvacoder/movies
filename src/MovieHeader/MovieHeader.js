import React from 'react';
import "./MovieHeader.scss"
import DoughnutChart from '../DoughnutChart/DoughnutChart'


const MovieHeader = (props) => {

    const {
        backDropPath,
        title,
        originalTitle,
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
                <div className='movie-header__wrapper-original-title'>
                    {originalTitle}
                </div>
                <div className='movie-header-votes'>
                    <div className='movie-header-votes-average'>
                        <DoughnutChart 
                        data={voteAverage} 
                        maxValue={10} percent={false} 
                        chartColor= {{voteAverage} > 7 ? 'lightgreen' : 'Aquamarine' }
                        />
                    </div>
                    <div className='movie-header-votes-popularity'>
                        <DoughnutChart 
                        data={Math.floor(popularity)} 
                        maxValue={100} percent={true} 
                        />
                    </div> 
                </div>
            </div>
        </div>
    );
};

MovieHeader.defaultProps = {
    backDropPath: '',
    title: '',
    originalTitle: '',
    voteAverage: 1,
    popularity: 1
}

export default MovieHeader

