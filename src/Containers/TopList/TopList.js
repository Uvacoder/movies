import React from 'react';
// import './SearchResults.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Divider } from 'antd'
import SearchedMovies from 'components/SearchedMovies/SearchedMovies'
import { routeToMovieDetails } from 'utils/Routing/Routing'

class TopList extends React.Component {

  // componentDidMount() {
  //   this.props.fetchMovieDetails(this.props.match.params.id);
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.match.params.id !== prevProps.match.params.id) {
  //     this.props.fetchMovieDetails(this.props.match.params.id);
  //   }
  // }

  // renderResults = () => {
  //   return this.props.searchResults.map((item) => {
  //     return (
  //       <SearchedMovies item={item} routing={() => this.props.routeToMovieDetails(item.id)}/> 
  //     );
  //   });
  // };

  render() {
    return (
      <div className='top-list'>
        <Divider className='top-list__title' orientation='center'>
          <span>TOP RATED MOVIES</span>
        </Divider>
        <div className='top-list__content'>
          {/* {this.renderResults()} */}
        </div> 
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    // searchResults: state.searchResults.results,
    // phrase: state.searchResults.phrase
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  routeToMovieDetails
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TopList);