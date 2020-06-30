import React from 'react';
import "./LoginForm.css"
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';

class LoginForm extends React.Component {
    constructor (props) {
        super(props);
    }

    onFinish = values => {
        console.log('Success:', values);
        this.props.history.push('/home')
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };

    validatePassword = (rule, value, callback) => {
        if (value !== "admin") {
          callback("Wrong password!");
        } else {
          callback();
        }
      };

    render() {
        return (
            <div className="login-container">
                <div className="login-welcome">Movie Lounge Login</div>
                <div className="login-form">
                    <Form
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        >
                        <Form.Item
                            label="Username"
                            name="username"
                            size="large"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            { 
                                validator: this.validatePassword,
                                validateTrigger: []
                            },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                        <div className="register">
                            <div  className="register__label" onClick={ this.props.goTo }>Not registered yet? Click here to register!</div>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
};

export default withRouter(LoginForm) ;