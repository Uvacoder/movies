import React from 'react';
import './RecentMovies.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Divider } from 'antd'
import UpcommingMovies from 'components/UpcommingMovies/UpcommingMovies'
import { routeToMovieDetails } from 'utils/Routing/Routing'
import { fetchRecentMovies } from 'actions/RecentMoviesActions'
import { withRouter } from 'react-router-dom'

const TOP_LIST_RECENT_MOVIES_TYPES = {
  'upcomming': 'UPCOMMING MOVIES',
  'now_playing': 'MOVIES PLAYING NOW IN THEATERS',
}

class TopList extends React.Component {
  componentDidMount() {
    this.props.fetchRecentMovies(this.props.match.params.type);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.type !== this.props.match.params.type) {
      this.props.fetchRecentMovies(this.props.match.params.type);
    };
  };
  
  renderResults = () => {
    return this.props.recentMovies.map((item) => {
      return (
        <div className='recent-movies__item'>
          <UpcommingMovies item={item} routeToMovieDetails={() => this.props.routeToMovieDetails(item.id)}/>
        </div>
      );
    });
  }

  render() {
    return (
      <div className='recent-movies'>
        <Divider className='recent-movies__title' orientation='center'>
          <span>
            {TOP_LIST_RECENT_MOVIES_TYPES[this.props.match.params.type]}
          </span>
        </Divider>
        <div className='recent-movies__container'>
          {this.renderResults()}
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    recentMovies: state.recentMovies.results,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  routeToMovieDetails,
  fetchRecentMovies 
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopList));