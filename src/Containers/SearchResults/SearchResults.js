import React from 'react';
import './SearchResults.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchSearched } from 'actions/SearchActions'
import { Divider } from 'antd'
import SearchedMovies from 'components/SearchedMovies/SearchedMovies'
import { routeToMovieDetails } from 'utils/Routing/Routing'
import { clearSearched } from 'actions/SearchActions'

class SearchResults extends React.Component {

  componentWillUnmount() {
    this.props.clearSearched()
  }

  renderResults = () => {
    if (this.props.searchResults.length !== 0) {
      return this.props.searchResults.map((item) => {
        return (
          <SearchedMovies 
          routeToMovieDetails={() => this.props.routeToMovieDetails(item.id)}
          poster={item.details.poster_path}
          title={item.details.title}
          release_date={item.details.release_date}
          runtime={item.details.runtime}
          genres={item.details.genres?.length !== 0 ? item.details.genres.map((item) => item.name).join(', ') : '–'}
          director={item.details.credits.crew.find((item) => item.job === "Director")?.name}
          vote_average={item.details.vote_average}
          popularity={item.details.popularity}
        /> 
        );
      });
    } else {
      return (
        <>
          <span className ='search-results__failed'>Unfortunately, we couldn't find any movie with that name</span>
          <span className ='search-results__failed'>Make sure you haven't made any typos</span>
        </>
      )
    };
  };

  render() {
    return (
      <div className='search-results'>
        <Divider className='search-results__title' orientation='center'>
          <span>Search results for:</span>
          <span>{this.props.phrase}</span>
        </Divider>
        <div className='search-results__content'>
          {this.renderResults()}
        </div> 
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults.results,
    phrase: state.searchResults.phrase
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSearched,
  routeToMovieDetails,
  clearSearched
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);