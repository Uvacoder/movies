import React from 'react';
import './SearchResults.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchSearched } from 'actions/SearchActions'
import { Divider } from 'antd'
import Api from 'utils/Api';
import SearchedMovies from 'components/SearchedMovies//SearchedMovies'

const SEARCHED_PHRASE = 'gladiator'
const POSTER_WIDTH = 500;

class SearchResults extends React.Component {
  componentDidMount() {
    this.props.fetchSearched(SEARCHED_PHRASE);
  }

  render() {
    return (
      <div className='search-results'>
        <SearchedMovies item={this.props.searchResults}/> 
      </div> 
    );
  };
};

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults.results
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSearched,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);