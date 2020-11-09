//权限验证
import React,{useState} from 'react'
import { history } from 'umi'
import useAuth from '@/hooks/useAuth'
import {Modal} from 'antd'
export default (props) => {
  const [visible,setVisible] = useState(true)
  const [confirmLoading,setConfirmLoading] = useState(false)
  const isLogin = useAuth();
  
  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
      history.push('/login')
    }, 2000);
  };
  const handleCancel = () => {
    setVisible(false)
  };
  if (isLogin === 'loading') return <div> 数据加载中 </div>
  if (isLogin.status == 1 && isLogin.root =='admin' ) {
    return <div>{ props.children }</div>;
  } else {
    return <Modal
      title="Title"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <p>您还没有权限进入当前页面，请去切换具有权限的账号</p>
    </Modal>
  }
}