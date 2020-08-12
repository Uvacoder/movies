import React from 'react';
import './SearchResults.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchSearched } from 'actions/SearchActions'
import { Divider } from 'antd'
import Api from 'utils/Api';

const SEARCHED_PHRASE = 'gladiator'

class SearchResults extends React.Component {
  componentDidMount() {
    this.props.fetchSearched(SEARCHED_PHRASE);
  }

  render() {
    return (
      <div className='search-results'>
        {this.props.searchResults?.[0]?.title}
        
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