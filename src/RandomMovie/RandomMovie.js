import React, { useState,useEffect } from 'react';
import "./RandomMovie.scss"
import DoughnutChart from '../DoughnutChart/DoughnutChart'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRandom, cleanUpFetchRandom } from '../Actions/HomePageActions';
import YouTube from 'react-youtube';

//tmp
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

const NO_OF_FIRST_RANDOM_ITEM = 0;
const NO_OF_LAST_LAST_ITEM = 20; // No more than 20, <- maximum TMDB API table length.
const API_PATH = 'https://image.tmdb.org/t/p/w500'


// class RandomMovie extends React.Component {
//   constructor(props) {
//     super(props)

//     const randomInt = (min, max) => {
//       return min + Math.floor((max - min) * Math.random());
//     }

//     this.randomMovieId = randomInt(NO_OF_FIRST_RANDOM_ITEM, NO_OF_LAST_LAST_ITEM);
//     console.log('myRand', this.randomMovieId)
//   }

//   componentDidMount() {
//     this.props.fetchRandom(this.randomMovieId)
//   }

//   render() {
//     const randomMovieId = this.randomMovieId;
//     const randomMovie = this.props.randomMovie;

//     console.log('render!')

//     return (
//       <div className='random-movie-container'>
//         <img className='random-movie-container__image' src={`${API_PATH}${randomMovie[randomMovieId]?.poster_path}`}/>
//         <div className='random-movie-container__details'> 
//           <div className='random-movie-container__details-title'>
//               {randomMovie[randomMovieId]?.title}
//           </div>  
//           <div className='random-movie-container__details-overwiev'>
//               Overwiev: {randomMovie[randomMovieId]?.overview}
//           </div>
//           <div className='random-movie-container__details-date'>
//               Release Date: {randomMovie[randomMovieId]?.release_date}
//           </div>
//           <div className='random-movie-container__details-vote-wrapper'>
//             <div className='random-movie-container__details-vote-wrapper-popularity'>
//               <div  className='random-movie-container__details-vote-wrapper-popularity-name'>
//                   Popularity:
//               </div>
//               <DoughnutChart data={Math.floor(randomMovie[randomMovieId]?.popularity)}/>
//             </div>
//             <div className='random-movie-container__details-vote-wrapper-average'>
//               <div className='random-movie-container__details-vote-wrapper-average-name'>
//                   Vote average:
//               </div>
//               <DoughnutChart data={randomMovie[randomMovieId]?.vote_average} maxValue={10} percent={false}/>
//             </div>
//           </div>
//         </div>
//         <div className='random-movie-container__trailer'>
//           <YouTube videoId={ randomMovie[randomMovieId]?.videoKey[0].key }  />
//         </div>   
//       </div>
//     )
    
//   }
// }


// const mapStateToProps = (state) => {
//   return {
//     randomMovie: state.homePage.random.items
//   }
// }

// const mapDispatchToProps = dispatch => bindActionCreators({
//   fetchRandom,
// }, dispatch)

// export default connect(mapStateToProps, mapDispatchToProps)(RandomMovie);

const RandomMovie = () => {

    // const randomMovieId = randomInt(NO_OF_FIRST_RANDOM_ITEM, NO_OF_LAST_LAST_ITEM);
    const randomMovie = useSelector(state => state.homePage.random.items);
    const videoKey = useSelector(state => state.homePage.random.videoKey);
    const [randomMovieId] = useState(randomInt(NO_OF_FIRST_RANDOM_ITEM, NO_OF_LAST_LAST_ITEM)); //TODO it should not be in state
    const dispatch = useDispatch();

  console.log('myRandom', randomMovieId)

    useEffect(() => {
      dispatch(fetchRandom(randomMovieId));
  
      return () => {
        // dispatch(cleanUpFetchRandom()); // usless by kamil k.
        console.log('cleaned up')
      }
    },[]);
    // },[dispatch]);

    function randomInt(min, max) {
        return min + Math.floor((max - min) * Math.random());
      }
    
      console.log('render!')


      const currentMovie = randomMovie[randomMovieId];

      if (!currentMovie) {
        return null;
      }


    return (
        <div className='random-movie-container'>
          <img className='random-movie-container__image' src={`${API_PATH}${currentMovie.poster_path}`}/>
          <div className='random-movie-container__details'> 
            <div className='random-movie-container__details-title'>
                {currentMovie.title}
            </div>  
            <div className='random-movie-container__details-overwiev'>
                Overwiev: {currentMovie.overview}
            </div>
            <div className='random-movie-container__details-date'>
                Release Date: {currentMovie.release_date}
            </div>
            <div className='random-movie-container__details-vote-wrapper'>
              <div className='random-movie-container__details-vote-wrapper-popularity'>
                <div  className='random-movie-container__details-vote-wrapper-popularity-name'>
                    Popularity:
                </div>
                <DoughnutChart data={Math.floor(currentMovie.popularity)}/>
              </div>
              <div className='random-movie-container__details-vote-wrapper-average'>
                <div className='random-movie-container__details-vote-wrapper-average-name'>
                    Vote average:
                </div>
                <DoughnutChart data={currentMovie.vote_average} maxValue={10} percent={false}/>
              </div>
            </div>
          </div>
          <div className='random-movie-container__trailer'>
            <YouTube videoId={ currentMovie.videoKey[0].key }  />
          </div>   
        </div>
    )
};

export default RandomMovie
  