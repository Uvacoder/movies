import React from 'react';
import './MovieDetails.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchMovieDetails } from '../Actions/MovieActions'
import { Divider } from 'antd'
import MovieHeader from '../MovieHeader/MovieHeader'
import MovieOverwiev from '../MovieOverwiev/MovieOverwiev'
import MovieCast from '../MovieCast/MovieCast'
import MovieTrailer from '../MovieTrailer/MovieTrailer'

const TEMP_MOVIE_ID = 299534;
const BACKDROP_API_PATH = 'https://image.tmdb.org/t/p/original'
const POSTER_PATH = 'https://image.tmdb.org/t/p/w500'

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.fetchMovieDetails(TEMP_MOVIE_ID);
  }

  filterDirector = () => {
    return this.props.details.credits?.crew?.filter((item) => item.job === "Director")?.[0]?.name
  }
  filterWriters = () => {
    return this.props.details.credits?.crew?.filter((item) => item.department === "Writing")?.map((item) => item.name).join(', ')
  }

  render() {
    
    
    return (
        <div className='movie-details-container'>
            <div className='movie-details-container__header'> 
                <MovieHeader 
                    backDropPath={`${BACKDROP_API_PATH}${this.props.details.backdrop_path}`} 
                    title={this.props.details.title || this.props.details.original_title} 
                    tagline={this.props.details.tagline ? this.props.details.tagline : this.props.details.original_title}
                    voteAverage={this.props.details.vote_average}
                    popularity={this.props.details.popularity}
                />
            </div>
            <div className='movie-details-container__overwiev'> 
                <MovieOverwiev
                    poster={`${POSTER_PATH}${this.props.details.poster_path}`}
                    description={this.props.details.overview}
                    realeaseDate={this.props.details.release_date}
                    genres={this.props.details.genres?.map((item) => item.name).join(', ')}
                    runtime={this.props.details.runtime}
                    country={this.props.details.production_countries?.map((item) => item.name).join(', ')}
                    director={this.filterDirector()}
                    writers={this.filterWriters()}
                    budget={`${this.props.details.budget} $`}
                    revenue={`${this.props.details.revenue} $`}
                    languages={this.props.details.spoken_languages?.map((item) => item.name).join(', ')}
                    companies={this.props.details.production_companies?.slice(0, 5).map((item) => item.name).join(', ')}
                />
            </div>
            <Divider className='movie-details-container__divider' orientation='left'>CAST</Divider>
            <div className='movie-details-container__cast'> 
                <MovieCast 
                    castItems={this.props.details.credits?.cast}
                />
            </div>
            <Divider className='movie-details-container__divider' orientation='left'>{this.props.details.title || this.props.details.original_title}  TRAILERS</Divider>
            <div className='movie-details-container__trailer'>
                <MovieTrailer 
                    videoItems={this.props.details?.videos?.results.slice(0, 3)}
                />
            </div>
            <Divider className='movie-details-container__divider' orientation='left'>PHOTOS</Divider>
            <div className='test2'> 
                <div>photo1</div>
                <div>photo2</div>
                <div>photo3</div>
                <div>photo4</div>
            </div>
            <Divider className='movie-details-container__divider' orientation='left'>SIMILAR MOVIES</Divider>
            <div className='test2'> 
                <div>MORE LIKE THIS1</div>
                <div>MORE LIKE THIS2</div>
                <div>MORE LIKE THIS3</div>
                <div>MORE LIKE THIS4</div>
            </div>
            <Divider className='movie-details-container__divider' orientation='left'>TMDB USER REVIEWS</Divider>
            <div className='test2'> 
                <div>USER REVIEW 1</div>
                <div>USER REVIEW2</div>
                <div>USER REVIEW3</div>
                <div>USER REVIEW4</div>
            </div>
            <Divider className='movie-details-container__divider' orientation='left'>SOCIAL</Divider>
            <div> 
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