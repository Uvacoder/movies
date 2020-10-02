import React, { useState } from 'react';
import "./Registration.scss"
import {
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';

const REGISTRATION_NICKNAME_MIN_LENGHT = 3;
const REGISTRATION_NICKNAME_MAX_LENGHT = 30;
const REGISTRATION_PASSWORD_MIN_LENGHT = 6;

const Registration = (props) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    props.register({
      "username": values.nickname,
      "password": values.password
    })
    // console.log(values)
  };

  return (
    <div className="registration">
      <div className="registration__title">Create an Account</div>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="nickname"
          label={
            <span>
              Username
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input your user name!',
              whitespace: true,
            },
            {
              min: REGISTRATION_NICKNAME_MIN_LENGHT,
              message: 'Username to short.'
            },
            {
              max: REGISTRATION_NICKNAME_MAX_LENGHT,
              message: 'User name to long.'
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: REGISTRATION_PASSWORD_MIN_LENGHT,
              message: `Password must be at least ${ REGISTRATION_PASSWORD_MIN_LENGHT } characters long.`
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className='registration__footer'>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Registration;
