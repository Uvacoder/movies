import React from 'react';
import './MovieDetails.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchMovieDetails } from '../Actions/MovieActions'

const TEMP_MOVIE_ID = 550;

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchMovieDetails(TEMP_MOVIE_ID);
  }
  

  render() {
    return (
        <div>
            <div className='test'> 
                <div>Tło</div>
                <div>tytuł</div>
                <div>org.tytuł</div>
                <div>ocena</div>
                <div>popularnosc</div>
            </div>
            <div className='test'> 
                <div>plakat</div>
                <div>overview</div>
                <div>genres</div>
                <div>realease date</div>
                <div>runtime</div>
                <div>country</div>
            </div>
            <div className='test'> 
                <div>director</div>
                <div>writers</div>
            </div>
            <div className='test'> 
                <div>CAST:</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
            </div>
            <div>TRAILER</div>
            <div className='test'> 
                <div>photo1</div>
                <div>photo2</div>
                <div>photo3</div>
                <div>photo4</div>
            </div>
            <div className='test'> 
                <div>MORE LIKE THIS1</div>
                <div>MORE LIKE THIS2</div>
                <div>MORE LIKE THIS3</div>
                <div>MORE LIKE THIS4</div>
            </div>
            <div className='test'> 
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
        count: state.movieDetails.details
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchMovieDetails,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);