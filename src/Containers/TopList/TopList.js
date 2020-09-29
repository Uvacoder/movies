import React from 'react';
import './TopList.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Divider } from 'antd'
import SearchedMovies from 'components/SearchedMovies/SearchedMovies'
import { routeToMovieDetails } from 'utils/Routing/Routing'
import { fetchTopList, fetchNextPageOfTopList } from 'actions/TopListActions'
import { withRouter } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin } from 'antd';

const MIN_NUM_OF_VOTES = 3000;
const NO_OF_PAGE_TO_VOID_MIN_NUM_OF_VOTES = 10;
const TOP_LIST_TYPES_NAMES = {
  'top_rated': 'ALL TIME TOP RATED',
  'trending_daily': 'TRENDING DAILY',
  'trending_weekly': 'TRENDING WEEKLY'
}

class TopList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        currentPage: 1
    };
  }
  componentDidMount() {
    this.props.fetchTopList(this.props.match.params.type);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.type !== this.props.match.params.type) {
      this.setState({ currentPage: 1 });
      this.props.fetchTopList(this.props.match.params.type);
    };
  };

  fetchData = () => {
    this.setState({ currentPage: this.state.currentPage + 1})
    this.props.fetchNextPageOfTopList(this.props.match.params.type, this.state.currentPage)
  };
  
  renderResults = () => {
    // if (isLoading) { // TO DO 
    //   return null; 
    // }
    let items = [];
    // let results = [];

    if (this.props.match.params.type === 'top_rated' && this.state.currentPage < NO_OF_PAGE_TO_VOID_MIN_NUM_OF_VOTES) {
      items = this.props.topListOfMovies.filter((item) => item.vote_count > MIN_NUM_OF_VOTES);
    } else {
      items = this.props.topListOfMovies;
    }

    const results = items.map((item,idx) => {
      return(
        <div className='top-list__content-item'>
          <span>{idx + 1}</span>
          <SearchedMovies item={item} routeToMovieDetails={() => this.props.routeToMovieDetails(item.id)}/>
        </div>
      );
    });

    return (
      <InfiniteScroll
        dataLength={results.length}
        next={this.fetchData}
        hasMore={this.state.currentPage < this.props.numberOfPages} 
        loader={
          <Spin 
            size="large"
            className='top-list__spin'
          />
        }
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen all the movies on this list!</b>
          </p>
        }
      >
        {results}
      </InfiniteScroll>
    );
  };

  render() {
    return (
      <div className='top-list'>
        <Divider className='top-list__title' orientation='center'>
          <span>
            {TOP_LIST_TYPES_NAMES[this.props.match.params.type]}
          </span>
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
    topListOfMovies: state.topListOfMovies.results,
    numberOfPages: state.topListOfMovies.numberOfPages
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  routeToMovieDetails,
  fetchTopList,
  fetchNextPageOfTopList,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopList));