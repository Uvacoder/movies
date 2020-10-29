import React from 'react';
import './SearchResults.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchSearched, fetchNextPageOfSearched } from 'actions/SearchActions'
import { Divider } from 'antd'
import SearchedMovies from 'components/SearchedMovies/SearchedMovies'
import { routeToMovieDetails } from 'utils/Routing/Routing'
import { clearSearched } from 'actions/SearchActions'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin } from 'antd';

const INFINITY_SCROLL_END_MESSAGE = "That's all movies with that phrase.";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1
    };
  };

  componentWillUnmount() {
    this.props.clearSearched()
  }

  fetchData = () => {
    this.setState({ currentPage: this.state.currentPage + 1})
    this.props.fetchNextPageOfSearched(this.props.phrase, this.state.currentPage)
  };

  getResults = () => {
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
  };

  calculateNumberOfResults = (pages) => {
    if (pages > 1) {
      return `(${((pages - 1) * 20)}+)`
    } else if (pages === 1) {
      return `(${this.props.searchResults.length})`
    } else {
      return null
    };
  };

  renderResults = () => {
    if (this.props.searchResults.length !== 0) {
      return (
        <InfiniteScroll
          dataLength={this.props.searchResults.length}
          next={this.fetchData}
          hasMore={this.state.currentPage < this.props.numberOfPages} 
          loader={
            <Spin 
              size="large"
              className='search-results__spin'
            />
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>{INFINITY_SCROLL_END_MESSAGE}</b>
            </p>
          }
        >
          {this.getResults()}
        </InfiniteScroll>
      );
    } else {
      return (
        <>
          <span className ='search-results__failed'>Unfortunately, we couldn't find any movie with that name</span>
          <span className ='search-results__failed'>Make sure you haven't made any typos</span>
        </>
      );
    };
  };

  render() {
    if (this.props.isLoading) {
      return null
    };

    return (
      <div className='search-results'>
        <Divider className='search-results__title' orientation='center'>
          <span>Results for:</span>
          <span>{this.props.phrase}</span>
          <span>{this.calculateNumberOfResults(this.props.numberOfPages)}</span>
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
    phrase: state.searchResults.phrase,
    numberOfPages: state.searchResults.numberOfPages,
    isLoading: state.global.isLoading
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSearched,
  routeToMovieDetails,
  clearSearched,
  fetchNextPageOfSearched
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);