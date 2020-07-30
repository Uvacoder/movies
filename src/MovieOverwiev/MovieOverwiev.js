import React from 'react';
import "./MovieOverwiev.scss"


const MovieOverwiev = (props) => {

    const {
        poster,
        description,
        genres,
        realeaseDate,
        runtime,
        country,
        director,
        writers,
        budget,
        revenue,
        languages,
        companies
    } = props;

    return (
        <div className='movie-overwiev'>
                <div className='movie-overwiev__poster'>
                    <img src={poster} />
                </div>
                <div className='movie-overwiev__description'>
                    <div className='movie-overwiev__description-title'>Overwiev:</div>
                    <div className='movie-overwiev__description-text'>{description}</div>    
                </div>
                <div className='movie-overwiev__release'>
                    <div className='movie-overwiev__release-title'>Release date:</div>
                    <div className='movie-overwiev__release-text'>{realeaseDate}</div>
                </div>
                <div className='movie-overwiev__genres'>
                    <div className='movie-overwiev__genres-title'>Genres:</div>
                    <div className='movie-overwiev__genres-text'>{genres}</div>
                </div>
                <div className='movie-overwiev__director'>
                        <div className='movie-overwiev__director-title'>Director:</div>
                        <div className='movie-overwiev__director-text'>{director}</div>
                </div>
                <div className='movie-overwiev__writers'>
                        <div className='movie-overwiev__writers-title'>Writers:</div>
                        <div className='movie-overwiev__writers-text'>{writers}</div>
                </div>
                <div className='movie-overwiev__extra'>
                    <div className='movie-overwiev__extra-runtime'>
                        <div className='movie-overwiev__extra-runtime-title'>Runtime:</div>
                        <div className='movie-overwiev__extra-runtime-text'>{runtime} min.</div>
                    </div>
                    <div className='movie-overwiev__extra-countries'>
                        <div className='movie-overwiev__extra-countries-title'>Production countries:</div>
                        <div className='movie-overwiev__extra-countries-text'>{country}</div>
                    </div>
                    <div className='movie-overwiev__extra-budget'>
                        <div className='movie-overwiev__extra-budget-title'>Budget:</div>
                        <div className='movie-overwiev__extra-budget-text'>{budget}</div>
                    </div>
                    <div className='movie-overwiev__extra-revenue'>
                        <div className='movie-overwiev__extra-revenue-title'>Revenue:</div>
                        <div className='movie-overwiev__extra-revenue-text'>{revenue}</div>
                    </div>
                    <div className='movie-overwiev__extra-spoken-languages'>
                        <div className='movie-overwiev__extra-spoken-languages-title'>Spoken languages:</div>
                        <div className='movie-overwiev__extra-spoken-languages-text'>{languages}</div>
                    </div>
                    <div className='movie-overwiev__extra-production-companies'>
                        <div className='movie-overwiev__extra-production-companies-title'>Production companies:</div>
                        <div className='movie-overwiev__extra-production-companies-text'>{companies}</div>
                    </div>
                </div>
        </div>
    );
};

MovieOverwiev.defaultProps = {
    poster:'poster_path',
    description:'description',
    genres:'genres',
    realeaseDate:'realease date',
    runtime:'runtime',
    country:'countries of production',
    director:'director',
    writers:'writers',
    budget: 'unknown',
    revenue: 'unknown',
    languages:'english',
    companies:'warner bros'
}

export default MovieOverwiev

