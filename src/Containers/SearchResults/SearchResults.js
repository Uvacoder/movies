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

  renderResults = () => {
    let results = [];

    if (this.props.searchResults.length !== 0) {
      results = this.props.searchResults.map((item) => {
        return (
          <SearchedMovies item={item} routeToMovieDetails={() => this.props.routeToMovieDetails(item.id)}/> 
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

    return (
      <InfiniteScroll
        dataLength={results.length}
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
        {results}
      </InfiniteScroll>
    );
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
    phrase: state.searchResults.phrase,
    numberOfPages: state.searchResults.numberOfPages
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSearched,
  routeToMovieDetails,
  clearSearched,
  fetchNextPageOfSearched
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);