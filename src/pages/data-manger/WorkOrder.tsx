import React,{useState,useEffect} from 'react'
import styles from './index.less'
import {Button,Row,Col,Input,Modal,Form} from 'antd'
import WAorkOrderTable from './WAorkOrderTable'
import ShopLogo from './ShopLogo'
import {connect} from 'umi'
export default connect(
  ({order}) => order 
)(function WorkOrder ({dispatch,lists}) {
  const [visible,setVisible] = useState(false)
  const [logo,setLogo] = useState('')
  const [shopId,setShopId] = useState('')
  const [d_title,setD_title] = useState('')
  const [price,setPrice] = useState('')
  const [oringinal,setOringinal] = useState('')
  const [sales,setSales] = useState('')
  const [comment,setComment] = useState('')
  const [num,setNum] = useState('')
  const [modifyFlag,setModifyFlag] = useState(false)
  const [modifyNum,setModifyNum] = useState('')
  const [activeId,setActiveId] = useState('')
  const [searchVal,setSearchVal] = useState('')


  const searchPrice = () => {
    dispatch({
      type: 'order/searchPrice',
      payload: searchVal
    })
  }

  const modifyFn = () => {
    dispatch({
      type: 'order/updateLists',
      payload: {
        shopId: activeId,
        num: modifyNum
      }
    })
    closeModify()
  }

  const  openModify = (shopId,num) => {
    setModifyNum(num)
    setModifyFlag(true)
    setActiveId(shopId)
  } 
  const closeModify = () => {
    setModifyFlag(false)
  }

  useEffect(() => {
    dispatch({
      type: 'order/getLists'
    })
  },[])

  const changeLogo = val => {
    setLogo(val)
  } 
  //点击弹出框的确定执行的方法
  const showModal = () => {
    setVisible(true)
  }
  const closeModal = () => {
    setVisible(false)
  }
  const handleOk = () => {
    dispatch({
      type: 'order/addLists',
      payload: {
        shopId,
        imgUrl: logo,
        d_title,
        sales,
        comment,
        num,
        oringinal,
        price
      }
    })
    closeModal()
  }
  const handleCancel = () => {
    closeModal()
  }

  const del = (shopId) => {
    dispatch({
      type: 'order/delLists',
      payload: shopId
    })
  }

  const getValues =  (val) => {
    console.log('val',val)
  }
  //点击弹出框的取消执行的方法
  return (
    <div className={styles.work_order}>
      {/* 工单列表 */}
      {/* 模糊查询模块 */}
      <div className={styles.search}>
        <Row justify="space-between">
          <Col span={4}>
            <div style={{
              display:'flex'
            }}>

            <Input placeholder="请输入价格查询" value={searchVal} onChange={e=>{setSearchVal(e.target.value)}}/>
            <Button type="primary" onClick={searchPrice}> 查询 </Button>
            </div>
          </Col>
          <Col span={4}>
            <div style={{
              display:'flex'
            }}>

            <Input placeholder="请输入价格查询"/>
            <Button type="primary"> 查询 </Button>
            </div>
          </Col>
          <Col span={4}>
            <div style={{
              display:'flex'
            }}>

            <Input placeholder="请输入价格查询"/>
            <Button type="primary"> 查询 </Button>
            </div>
          </Col>
          <Col span={4}>
            <div style={{
              display:'flex'
            }}>

            <Input placeholder="请输入价格查询"/>
            <Button type="primary"> 查询 </Button>
            </div>
          </Col>
        
        </Row>
      </div>
      {/* 新增数据列表模块 */}
      <div className={styles.add}>
        <Button type="primary" size="large" onClick={showModal} > + </Button>
      </div>
      {/* 数据列表展示模块 */}
      <div className={styles.table}>
        <WAorkOrderTable lists={lists} del = {del} openModify={openModify}/>
      </div>
      <Modal
          title="新增工单"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          onFinish={getValues}
        >
            <Form.Item label="商品ID" name="shopId">
              <Input placeholder="请输入商品ID" value={shopId} onChange={e=>{setShopId(e.target.value)}}/>
            </Form.Item>
            <Form.Item label="商品Logo">
              <ShopLogo changeLogo={changeLogo} />
            </Form.Item>
            <Form.Item label="商品主题">
              <Input placeholder="请输入工单主题" value={d_title} onChange={e=>{setD_title(e.target.value)}}/>
            </Form.Item>
            <Form.Item label="商品价格">
              <Input placeholder="请输入商品价格" value={price} onChange={e=>{setPrice(e.target.value)}}/>
            </Form.Item>
            <Form.Item label="商品原价">
              <Input placeholder="请输入商品原价" value={oringinal} onChange={e=>{setOringinal(e.target.value)}}/>
            </Form.Item>
            <Form.Item label="商品销量">
              <Input placeholder="请输入商品销量" value={sales} onChange={e=>{setSales(e.target.value)}}/>
            </Form.Item>
            <Form.Item label="商品评论">
              <Input placeholder="请输入商品评论" value={comment} onChange={e=>{setComment(e.target.value)}}/>
            </Form.Item>
            <Form.Item label="商品数量">
              <Input placeholder="请输入商品数量" value={num} onChange={e=>{setNum(e.target.value)}}/>
            </Form.Item>
        </Form>
      </Modal>


      <Modal
         title="修改数量num"
         visible={modifyFlag}
         onOk={modifyFn}
         onCancel={closeModify}
      >
        <Input value={modifyNum} onChange={e=> {setModifyNum(e.target.value)}} />
      </Modal>

    </div>
  )
}
)

