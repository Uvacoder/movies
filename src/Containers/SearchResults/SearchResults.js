import React from 'react';
import './SearchResults.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchSearched } from 'actions/SearchActions'
import { Divider } from 'antd'
import SearchedMovies from 'components/SearchedMovies/SearchedMovies'

const SEARCHED_PHRASE = 'mamma mia'

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchSearched(SEARCHED_PHRASE);
  }

  renderResults = () => {
    if (this.props.searchResults.length !== 0) {
      return this.props.searchResults?.map((item) => {
        return (
          <SearchedMovies item={item}/> 
        );
      });
    } else {
      return (
        <>
          <span className ='search-results__failed'>Unfortunately, we couldn't find any movie with that name</span>
          <span className ='search-results__failed'>Make sure you haven't made any typos</span>
        </>
      )
    }
    
  };

  render() {
    return (
      <div className='search-results'>
        <Divider className='search-results__title' orientation='center'>
          <span>Search results for:</span>
          <span>{SEARCHED_PHRASE}</span>
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
    searchResults: state.searchResults.results
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSearched,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);