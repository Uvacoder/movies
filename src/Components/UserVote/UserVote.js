import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import "./UserVote.scss"
import DoughnutChart from '../DoughnutChart/DoughnutChart'
import { Modal, Button } from 'antd';
import UserRate from 'components/UserRate/UserRate'
import UserComment from 'components/UserComment/UserComment'
import { saveUserRating, getUserRating } from 'actions/UserActions'
import { withRouter } from 'react-router-dom'


const USER_VOTE_MAX_VALUE = 10;
const USER_VOTE_DISPLAY_PERCENT = false;
const USER_VOTE_CHART_COLOR = 'lightgreen';
const USER_COMMENT_PLACEHOLDER = 'Leave a comment so you can remember what you liked or disliked about this film.';
const USER_RATE_TOOLTIPS = ['Misunderstanding','Very bad', 'Bad', 'Weak', 'Average', 'Decent', 'Good', 'Very Good', 'Fantastic', 'Masterpiece!' ];

class UserVote  extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      visible: false,
      rateValue: 0,
      commentValue: " ",
    };
  };

  componentDidMount() {
    debugger;
    // if (this.props.match.params.id) {
    //   this.props.getUserRating(this.props.match.params.id)
    // }
    this.props.getUserRating(this.props.match.params.id)
    // this.props.getUserRating(this.props.movieId)
  };
  
  changeModalVisibility = (visible) => {
    this.setState({
      visible,
    });
  };

  displayModal = () => { 
    return (
      localStorage.getItem('token') !== "null" ? () => this.changeModalVisibility(true) : null
    );
  };

  handleOk = () => {
    this.setState({ 
      loading: false, 
    });
    this.props.saveUserRating({
        "movieId": this.props.details.id,
        // "movieId": this.props.movieId,
        "rateValue": this.state.rateValue,
        "comment": this.state.commentValue
    });
    this.changeModalVisibility(false);
  };

  handleCancel = () => {
    this.changeModalVisibility(false)
  };

  updateRateValue = (value) => {
    this.setState({
      rateValue: value,
    });
  };

  updateCommentValue = (value) => {
    this.setState({
      commentValue: value,
    });
  };

  // getMovieRateValue = () => {
  //   // debugger;
  //   if (this.props.match.params.id) {
  //     return this.props.rating.filter( item => item.movieId === this.props.details.id)[0]?.rateValue
  //   } else {
  //     return this.props.rating.filter( item => item.movieId === this.props.movieId)[0].rateValue
  //   }
  // }

  // getMovieCommentValue = () => {
  //   // debugger;
  //   if (this.props.match.params.id) {
  //     return this.props.rating.filter( item => item.movieId === this.props.details.id)[0]?.comment
  //   } else {
  //     return this.props.rating.filter( item => item.movieId === this.props.movieId)[0].comment
  //   }
  // }

  renderModal = () => {
    const { visible, loading } = this.state;
    return (
      <Modal
        className='user-vote__modal'
        visible={visible}
        title="Your Vote"
        onCancel={this.handleCancel}
        footer={
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
            Save
          </Button>
        }
      >
        <div className='user-vote__modal-body'>
          <UserRate 
            updateRateValue={this.updateRateValue}
            tooltips={ USER_RATE_TOOLTIPS }
            userRateValue={this.props.rating.filter( item => item.movieId === this.props.details.id)[0]?.rateValue}
            // userRateValue={this.getMovieRateValue()}
            />
          <p className='user-vote__modal-body-comment'>Your comment:</p>
          <UserComment 
            placeholder={ USER_COMMENT_PLACEHOLDER }
            updateCommentValue={this.updateCommentValue}
            commentValue ={this.props.rating.filter( item => item.movieId === this.props.details.id)[0]?.comment}
            // commentValue ={this.getMovieCommentValue()}
          />
        </div>
      </Modal>
    );
  };

 
  render() {
    return (
      <>
        <div className='user-vote' onClick={this.displayModal()}>
          <span className='user-vote__title'>Your Vote:</span>
          <div className='user-vote__chart'>
            <DoughnutChart 
              data={ this.state.rateValue || this.props.rating.filter( item => item.movieId === this.props.details.id)[0]?.rateValue } 
              // data={ this.state.rateValue || this.getMovieRateValue() } 
              maxValue={ USER_VOTE_MAX_VALUE } 
              percent={ USER_VOTE_DISPLAY_PERCENT } 
              chartColor= { USER_VOTE_CHART_COLOR }
            />
          </div>
        </div>
        {this.renderModal()}
      </>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    details: state.movieDetails.details,
    rating: state.userRating.movies,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  saveUserRating,
  getUserRating
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserVote))
