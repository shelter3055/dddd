import React from 'react';
import styles from './index.less';
import { Link, connect } from 'umi';
import { Form, Input, Button, Checkbox, Upload, message } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  AntCloudOutlined,
  InboxOutlined,
} from '@ant-design/icons';
const { Dragger } = Upload;

let pic = ''

const props = {
  name: 'file',
  multiple: false,
  action: 'https://elm.cangdu.org/v1/addimg/shop',
  onChange(info) {
    console.log('info',info)
    pic = info.fileList[0].response ? 'https://elm.cangdu.org/img/' + info.fileList[0].response.image_path:''
  }
};
export default connect(state => state)(function Register({ dispatch }) {
  const onFinish = values => {
    console.log('Received values of form: ', values);
    dispatch({
      type: 'user/register',
      payload: {
        ...values,
        pic
      },
    });
  };
  return (
    <div className={styles.register}>
      <img src="https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg" />
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
          <Form.Item
            rules={[
              {
                required: true,
                message: '确认密码',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请再次输入密码"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: '请输入邮箱',
              },
            ]}
          >
            <Input
              prefix={<AntCloudOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="请输入邮箱"
            />
          </Form.Item>
          <Form.Item>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>
                <span className={styles.text}> Remember me </span>
              </Checkbox>
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
              注册
            </Button>
            <span className={styles.text}>Or</span>{' '}
            <Link to="/login">login now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
