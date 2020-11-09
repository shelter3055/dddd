import React from 'react'
import styles from './app.less'
import { Avatar,Menu, Dropdown,Button } from 'antd';
import {Link} from 'umi'
import {
  SearchOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  UserOutlined,
  GlobalOutlined
} from '@ant-design/icons'
import {getCookie} from '@/utils'
const avatar = getCookie('avatar')
const username = getCookie('username')

const menu = (
  <Menu>
    <Menu.Item>
      <Link  rel="noopener noreferrer" to="/user">
        个人中心
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link  rel="noopener noreferrer" to="/setting/set">
        个人设置
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Button type="primary"> 注销 </Button>
    </Menu.Item>
  </Menu>
);

export const layout = { 
  logout: () => {}, // do something 
  rightRender:(initInfo)=> { return <div className={styles.right_container}>
    <SearchOutlined />
    <QuestionCircleOutlined />
    <BellOutlined />
    <Dropdown overlay={menu} placement="bottomCenter">
      <div>
          <Avatar src={avatar} size={40} icon={<UserOutlined />} />
          <span> {username} </span>
      </div>
    </Dropdown>
    <GlobalOutlined />
  </div> },// return string || ReactNode; 
};