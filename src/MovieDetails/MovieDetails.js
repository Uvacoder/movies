import React from 'react';
import './MovieDetails.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchMovieDetails } from '../Actions/MovieActions'
import MovieHeader from '../MovieHeader/MovieHeader'

const TEMP_MOVIE_ID = 583083; // To do => change to movie ID on clicked TITLE
const BACKDROP_API_PATH = 'https://image.tmdb.org/t/p/original'

class MovieDetails extends React.Component {
  componentDidMount() {
    this.props.fetchMovieDetails(TEMP_MOVIE_ID);
  }
  
  render() {
    const details = this.props.details;

    return (
        <div className='movie-details-container'>
            <div className='movie-details-container__header'> 
                <MovieHeader 
                    backDropPath={`${BACKDROP_API_PATH}${details.backdrop_path}`} 
                    title={details.original_title} 
                    originalTitle={details.original_title}
                    voteAverage={details.vote_average}
                    popularity={details.popularity}
                />
            </div>
            <div className='test2'> 
                <div>plakat</div>
                <div>overview</div>
                <div>genres</div>
                <div>realease date</div>
                <div>runtime</div>
                <div>country</div>
            </div>
            <div className='test2'> 
                <div>director</div>
                <div>writers</div>
            </div>
            <div className='test2'> 
                <div>CAST:</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
            </div>
            <div>TRAILER</div>
            <div className='test2'> 
                <div>photo1</div>
                <div>photo2</div>
                <div>photo3</div>
                <div>photo4</div>
            </div>
            <div className='test2'> 
                <div>MORE LIKE THIS1</div>
                <div>MORE LIKE THIS2</div>
                <div>MORE LIKE THIS3</div>
                <div>MORE LIKE THIS4</div>
            </div>
            <div className='test2'> 
                <div>USER REVIEW 1</div>
                <div>USER REVIEW2</div>
                <div>USER REVIEW3</div>
                <div>USER REVIEW4</div>
            </div>
            <div> 
                <div>budget</div>
                <div>revenue</div>
                <div>production companies</div>
                <div>diffrent title</div>
                <div>social media</div>
                <div>website</div>
            </div>
        </div> 
     );
   };
}

const mapStateToProps = (state) => {
    return {
        details: state.movieDetails.details
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchMovieDetails,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);