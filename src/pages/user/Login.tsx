import React from 'react';
import styles from './index.less';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from 'umi'
import md5 from 'md5'
export default connect( 
  ({user}) => user
)(function Login({dispatch}) {
  const onFinish = values => {
    const {username,password,remember} = values
    dispatch({
      type: 'user/login',
      payload: {
        username,
        password: md5(password),
        remember
      }
    })
  };

  return (
    <div className={styles.login}>
      <div className={styles.content}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox> <span className={styles.text}> Remember me </span> </Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
             <span className={styles.text}> Or </span>  <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
})
