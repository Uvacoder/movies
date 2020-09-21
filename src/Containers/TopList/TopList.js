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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.type !== this.props.match.params.type) {
      // this.props.clearTopList();
      this.props.fetchTopList(this.props.match.params.type);
    }
  }
  
  renderResults = () => {
    // if (isLoading) {
    //   return null; // TO DO 
    // }
    let items = [];

    if (this.props.match.params.type === 'top_rated') {
      items = this.props.topRatedMovies.filter((item) => item.vote_count > MIN_NUM_OF_VOTES);
    } else {
      items = this.props.topRatedMovies;
    }
    return items.map((item,idx) => {
      return (
        <div className='top-list__content-item'>
          <span>{idx + 1}</span>
          <SearchedMovies item={item} routing={() => this.props.routeToMovieDetails(item.id)}/>  {/* TO DO CHANGE ROUTING NAME TO ROUTE TO MOVIE DETAILS */}
        </div>
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
  fetchTopList,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopList));