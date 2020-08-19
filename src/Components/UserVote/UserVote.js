import React, { useState } from 'react';
import "./UserVote.scss"
import DoughnutChart from '../DoughnutChart/DoughnutChart'
import { Rate, Modal, Button, Input } from 'antd';

const USER_VOTE_MAX_VALUE = 10;
const USER_VOTE_DISPLAY_PERCENT = false;
const USER_VOTE_CHART_COLOR = 'lightgreen';
const USER_VOTE_TOOLTIPS = ['Misunderstanding','Very bad', 'Bad', 'Weak', 'Average', 'Decent', 'Good', 'Very Good', 'Fantastic', 'Masterpiece!' ];
const { TextArea } = Input;

class UserVote  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
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
          <Rate
            className='user-vote__modal-body-rate' 
            count={ USER_VOTE_MAX_VALUE }
            tooltips={ USER_VOTE_TOOLTIPS }
            // value //TODO WHEN BACKEND WILL BE READY
            // onChange //TODO WHEN BACKEND WILL BE READY
          />
          <TextArea 
            rows={4}
          />
        </div>
      </Modal>
    )
  }

  render() {
    return (
      <>
        <div className='user-vote' onClick={this.showModal}>
          <span className='user-vote__title'>Your Vote:</span>
          <div className='user-vote__chart'>
            <DoughnutChart 
              data={ this.props.userVote } 
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
  userVote: 0,
}

export default UserVote

