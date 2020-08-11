import React from 'react';
import './MovieDetails.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchMovieDetails } from '../../Actions/MovieActions'
import { Divider } from 'antd'
import Api from 'utils/Api';
import MovieHeader from '../../Components/MovieHeader/MovieHeader'
import MovieOverwiev from '../../Components/MovieOverview/MovieOverview'
import MovieCast from '../../Components/MovieCast/MovieCast'
import MovieTrailer from '../../Components/MovieTrailer/MovieTrailer'
import MovieImages from '../../Components/MovieImages/MovieImages'
import MovieSimilar from '../../Components/MovieSimilar/MovieSimilar'
import MovieReview from '../../Components/MovieReview/MovieReview'
import MovieSocial from '../../Components/MovieSocial/MovieSocial'

const TEMP_MOVIE_ID = 550; // TO DO MAKE DYNAMIC MOVIE CHANGE ON IMG CLICK
const BACKDROP_API_PATH = 'https://image.tmdb.org/t/p/original'
const POSTER_WIDTH = 500;
const THUMBNAIL_WIDTH_DIVIDER_VALUE = 5;
const THUMBNAIL_WIDTH_MAX_VALUE = 400;
const THUMBNAIL_HEIGHT = 250;

class MovieDetails extends React.Component {
  componentDidMount() {
    this.props.fetchMovieDetails(TEMP_MOVIE_ID);
  }

  filterDirector = () => {
    return this.props.details.credits?.crew?.filter((item) => item.job === "Director")?.[0]?.name
  }
  filterWriters = () => {
    return this.props.details.credits?.crew?.filter((item) => item.department === "Writing")?.map((item) => item.name).join(', ')
  }

  createImagesObject = (backdrop) => {
    return {
      src:`${BACKDROP_API_PATH}${backdrop.file_path}`,
      thumbnail: `${BACKDROP_API_PATH}${backdrop.file_path}`,
      thumbnailWidth: Math.min(backdrop.width/THUMBNAIL_WIDTH_DIVIDER_VALUE, THUMBNAIL_WIDTH_MAX_VALUE ),
      thumbnailHeight: THUMBNAIL_HEIGHT,
    }
  }

  getCurrencyNotation = (number) => {
    return number?.toLocaleString('en', { style: 'currency', currency: 'USD' })
  }  

  renderReviews = () => {
    if (this.props.reviews.length === 0) {
      return null 
    }

    return (
      <>
        <Divider className='movie-details-container__divider' orientation='left'>USER REVIEWS</Divider>
        <div className='movie-details-container__review'> 
          { this.props.reviews.slice(0,6).map(review => <MovieReview className='movie-details-container__review-item' review={review} />) }
        </div>
      </>
    );
  }

  renderPhotos = () => {
    if (this.props.details.images?.backdrops?.length === 0) {
      return null 
    }

    return (
      <>
        <Divider className='movie-details-container__divider' orientation='left'>PHOTOS ({this.props.details.images?.backdrops?.length})</Divider>
        <div className='movie-details-container__images'> 
            <MovieImages pictures={ this.props.details.images?.backdrops?.map((backdrop) => this.createImagesObject(backdrop)) } />
        </div>
      </>
    );
  }

  renderSimilar = () => {
    if (this.props.similarMovies.length === 0) {
      return null 
    }

    return (
      <>
        <Divider className='movie-details-container__divider' orientation='left'>MOVIES SIMILAR TO {this.props.details.title || this.props.details.original_title}</Divider>
        <div className='movie-details-container__similar'> 
          <MovieSimilar similarMovies={ this.props?.similarMovies } />
        </div>
      </>
    );
  }

  renderTrailer = () => {
    if (this.props.details.videos?.results.length === 0) {
      return null 
    }

    return (
      <>
        <Divider className='movie-details-container__divider' orientation='left'>{this.props.details.title || this.props.details.original_title}  TRAILERS</Divider>
        <div className='movie-details-container__trailer'>
            <MovieTrailer videoItems={ this.props.details?.videos?.results.slice(0, 3) } />
        </div>
      </>
    );
  }

  renderCast = () => {
    if (this.props.details.credits?.cast.length === 0) {
      return null 
    }

    return (
      <>
        <Divider className='movie-details-container__divider' orientation='left'>CAST</Divider>
        <div className='movie-details-container__cast'> 
            <MovieCast castItems={ this.props.details.credits?.cast }/>
        </div>
      </>
    );
  }
    
  render() {
    return (
      <div className='movie-details-container'>
        <div className='movie-details-container__header'> 
          <MovieHeader 
            backDropPath={this.props.details.backdrop_path ? `${BACKDROP_API_PATH}${this.props.details.backdrop_path}` : null} 
            title={this.props.details.title || this.props.details.original_title} 
            tagline={this.props.details.tagline ? this.props.details.tagline : this.props.details.original_title}
            voteAverage={this.props.details.vote_average}
            popularity={this.props.details.popularity}
          />
        </div>
        <div className='movie-details-container__overwiev'> 
          <MovieOverwiev
            poster={`${Api.imgPath(POSTER_WIDTH)}${this.props.details.poster_path}`}
            description={this.props.details.overview}
            realeaseDate={this.props.details.release_date}
            genres={this.props.details.genres?.map((item) => item.name).join(', ')}
            runtime={this.props.details.runtime}
            country={this.props.details.production_countries?.map((item) => item.name).join(', ')}
            director={this.filterDirector()}
            writers={this.filterWriters()}
            budget={this.getCurrencyNotation(this.props.details.budget)}
            revenue={this.getCurrencyNotation(this.props.details.revenue)}
            languages={this.props.details.spoken_languages?.map((item) => item.name).join(', ')}
            companies={this.props.details.production_companies?.slice(0, 5).map((item) => item.name).join(', ')}
          />
        </div>
        {this.renderCast()}
        {this.renderTrailer()}
        {this.renderPhotos()}
        {this.renderSimilar()}
        {this.renderReviews()}
        <Divider className='movie-details-container__divider' orientation='left'>SOCIAL</Divider>
        <div> 
          <MovieSocial 
            movieHomePage={this.props.details?.homepage} 
            facebookPage={this.props.externalIds.facebook_id && `https://www.facebook.com/${this.props.externalIds.facebook_id}`}
            InstagramPage={this.props.externalIds.instagram_id &&`https://www.instagram.com/${this.props.externalIds.instagram_id}`}
            TwitterPage={this.props.externalIds.twitter_id && `https://twitter.com/${this.props.externalIds.twitter_id}`}
            IMDBPage={this.props.externalIds.imdb_id && `https://www.imdb.com/title/${this.props.externalIds.imdb_id}`}
          />
        </div>
      </div> 
    );
  };
}

const mapStateToProps = (state) => {
  return {
    details: state.movieDetails.details,
    similarMovies: state.movieDetails.similarMovies,
    reviews: state.movieDetails.reviews,
    externalIds: state.movieDetails.externalIds
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMovieDetails,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);