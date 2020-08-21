import React from 'react';
import "./UserVote.scss"
import DoughnutChart from '../DoughnutChart/DoughnutChart'
import { Modal, Button } from 'antd';
import UserRate from 'components/UserRate/UserRate'
import UserComment from 'components/UserComment/UserComment'

const USER_VOTE_MAX_VALUE = 10;
const USER_VOTE_DISPLAY_PERCENT = false;
const USER_VOTE_CHART_COLOR = 'lightgreen';

class UserVote  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      rateValue: 0,
    };
  };
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 1000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  updateRateValue = (value) => {
    this.setState({
      rateValue: value,
    })
  }
  
  renderModal = () => {
    const { visible, loading } = this.state;
    return (
      <Modal
        className='user-vote__modal'
        visible={visible}
        title="Your Vote"
        onCancel={this.handleCancel}
        footer={[
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
            Save
          </Button>,
        ]}
        >
        <div className='user-vote__modal-body'>
          <UserRate updateRateValue={this.updateRateValue}/>
          <p className='user-vote__modal-body-comment'>Your comment:</p>
          <UserComment />
        </div>
      </Modal>
    );
  };

 
  render() {
    return (
      <>
        <div className='user-vote' onClick={this.showModal}>
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


UserVote.defaultProps = {
  // userVote: 0,
}

export default UserVote

