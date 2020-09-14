import React from 'react';
import "./UserVote.scss"
import DoughnutChart from '../DoughnutChart/DoughnutChart'
import { Modal, Button } from 'antd';
import UserRate from 'components/UserRate/UserRate'
import UserComment from 'components/UserComment/UserComment'

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
    };
  };
  
  changeModalVisibility = (visible) => {
    this.setState({
      visible,
    });
  };

  handleOk = () => {
    this.setState({ 
      loading: false, 
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
            />
          <p className='user-vote__modal-body-comment'>Your comment:</p>
          <UserComment 
            placeholder={ USER_COMMENT_PLACEHOLDER }
          />
        </div>
      </Modal>
    );
  };

 
  render() {
    return (
      <>
        <div className='user-vote' onClick={() => this.changeModalVisibility(true)}>
          <span className='user-vote__title'>Your Vote:</span>
          <div className='user-vote__chart'>
            <DoughnutChart 
              data={ this.state.rateValue } 
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

