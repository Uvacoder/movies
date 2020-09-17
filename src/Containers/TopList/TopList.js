import React from 'react';
import './TopList.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Divider } from 'antd'
import SearchedMovies from 'components/SearchedMovies/SearchedMovies'
import { routeToMovieDetails } from 'utils/Routing/Routing'
import { fetchTopList } from 'actions/TopListActions'
import { withRouter } from 'react-router-dom'

const MIN_NUM_OF_VOTES = 3000;

class TopList extends React.Component {

  componentDidMount() {
    this.props.fetchTopList(this.props.match.params.type);
    console.log(this.props.match.params.type)
  }

  renderResults = () => {
    return this.props.topRatedMovies.filter((item) => item.vote_count > MIN_NUM_OF_VOTES ).map((item) => {
      return (
        <SearchedMovies item={item} routing={() => this.props.routeToMovieDetails(item.id)}/> 
      );
    });
  };

  render() {
    return (
      <div className='top-list'>
        <Divider className='top-list__title' orientation='center'>
          <span>{this.props.match.params.type === 'top_rated' ? "TOP RATED" : 'TRENDING'} MOVIES</span>
        </Divider>
        <div className='top-list__content'>
          {this.renderResults()}
        </div> 
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    topRatedMovies: state.topRatedMovies.results,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  routeToMovieDetails,
  fetchTopList
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopList));