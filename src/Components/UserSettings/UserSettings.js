import React, { useState } from 'react';
import "./UserSettings.scss"
import { Button, Divider, Modal, notification} from 'antd';
import { withRouter } from 'react-router-dom'
import { deleteUserAccount } from 'actions/UserActions'
import { useDispatch } from 'react-redux'
import UserUtil from 'utils/UserUtil'

const ACCOUNT_DELETED_MESSAGE = "Account deleted.";
const ACCOUNT_DELETED_MESSAGE_POSITION = "topRight";
const ACCOUNT_DELETED_MESSAGE_DURATION = 3.2;

function UserSettings (props) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  };

  const hideModal = () => {
    setVisible(false)
  };

  const deleteAccount = () => {
    if (UserUtil.isUserLogged) {
      dispatch(deleteUserAccount());
      UserUtil.logOut();
      setVisible(false)
      notification.info({
        message: ACCOUNT_DELETED_MESSAGE,
        placement: ACCOUNT_DELETED_MESSAGE_POSITION,
        duration: ACCOUNT_DELETED_MESSAGE_DURATION,
      });
    };
    props.history.push('/')  
  };

  return (
    <>
      <div className="user-settings">
        <Divider className='user-settings__divider' orientation='center'>ACCOUNT SETTINGS</Divider>
        <div className="user-settings__header">
          <span>Hi <b>{localStorage.getItem("userName")}</b>, here you can manage your account.</span>
        </div>
        <div className="user-settings__items">
          <Button className={"user-settings__items-button"} onClick={showModal}>
            DELETE ACCOUNT
          </Button> 
        </div>
      </div>
      <Modal
        className="user-settings__modal"
        title="DELETE ACCOUNT"
        visible={visible}
        onOk={deleteAccount}
        onCancel={hideModal}
        okText="Delete account"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete account?</p>
      </Modal>
    </>
  );
};

export default withRouter(UserSettings);