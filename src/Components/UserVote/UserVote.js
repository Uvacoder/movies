import React from 'react';
import "./UserVote.scss"
import DoughnutChart from '../DoughnutChart/DoughnutChart'
import { Modal, Button, notification } from 'antd';
import UserRate from 'components/UserRate/UserRate'
import UserComment from 'components/UserComment/UserComment'
import UserUtil from 'utils/UserUtil'

const USER_VOTE_MAX_VALUE = 10;
const USER_VOTE_DISPLAY_PERCENT = false;
const USER_VOTE_CHART_COLOR = 'lightgreen';
const USER_COMMENT_PLACEHOLDER = 'Leave a comment so you can remember what you liked or disliked about this film.';
const USER_RATE_TOOLTIPS = ['Misunderstanding','Very bad', 'Bad', 'Weak', 'Average', 'Decent', 'Good', 'Very Good', 'Fantastic', 'Masterpiece!' ];
const VOTE_NOT_PRESENT_MESSAGE = "Please leave a vote before submiting!";
const VOTE_NOT_PRESENT_MESSAGE_PLACEMENT = "topRight";
const VOTE_NOT_PRESENT_MESSAGE_DURATION = 3.2;

class UserVote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      visible: false,
      rateValue: null,
      commentValue: "",
    };
  };
  
  changeModalVisibility = (visible) => {
    this.setState({
      visible,
    });
  };

  displayModal = () => { 
    return (
      UserUtil.isUserLogged() ? () => this.changeModalVisibility(true) : null
    );
  };

  handleOk = () => {
    const votePresentInStore = this.props.currentMovieRating?.rateValue !== undefined
    const votePresentInState = this.state.rateValue !== null
    
    this.setState({ 
      loading: false, 
    });
    if (!votePresentInStore && !votePresentInState) {
      notification.info({
        message: VOTE_NOT_PRESENT_MESSAGE,
        placement: VOTE_NOT_PRESENT_MESSAGE_PLACEMENT,
        duration: VOTE_NOT_PRESENT_MESSAGE_DURATION,
      });
    } else {
      this.props.saveUserRating({
        movieId: this.props.currentMovieId,
        rateValue: this.state.rateValue || this.props.currentMovieRating?.rateValue,
        comment: this.state.commentValue || this.props.currentMovieRating?.comment
      });
      this.changeModalVisibility(false);
    }
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
            userRateValue={this.props.currentMovieRating?.rateValue}
            />
          <p className='user-vote__modal-body-comment'>Your comment:</p>
          <UserComment 
            placeholder={ USER_COMMENT_PLACEHOLDER }
            updateCommentValue={this.updateCommentValue}
            commentValue ={this.props.currentMovieRating?.comment}
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
              data={ this.state.rateValue || this.props.currentMovieRating?.rateValue }      
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

export default UserVote