import { Effect, ImmerReducer } from 'umi';
import { addReq, getReq, delReq, updateReq } from './../service/index';
import { message } from 'antd';
interface ListsType {
  readonly _id: string,
  shopId: string,
  d_title: string,
  price: string,
  num: string,
  sales:string,
  comment: string,
  imgUrl: string,
  __v: number
}

interface orderStateModalType {
  lists: ListsType[],
  originLists: ListsType[]
}
interface orderModalType {
  namespace: string,
  state: orderStateModalType,
  effects: {
    addLists: Effect,
    updateLists: Effect,
    getLists: Effect,
    delLists: Effect,
    searchPrice: Effect
  },
  reducers: {
    ADD_LISTS: ImmerReducer,
    UPDATE_LISTS: ImmerReducer,
    DEL_LISTS: ImmerReducer,
    GET_LISTS: ImmerReducer,
    SEARCH_PRICE: ImmerReducer
  }
}

const orderModal:orderModalType = {
  namespace: 'order',
  state: {
    lists: [],
    originLists: []
  },
  effects: {
    *addLists ({payload},{call,put}) {
      const {status,msg} = yield call(addReq,payload)
      // console.log('reuslt',result)
      if (status != 1) message.error(msg)
      message.success('添加成功')
      yield put({
        type: 'ADD_LISTS',
        payload
      })
    },
    *getLists ({payload},{call,put}) {
      const {status,msg,data} = yield call(getReq)
      // console.log('result',result)
      yield put({
        type: 'GET_LISTS',
        payload: data
      })
    },
    *delLists ({payload},{call,put}) {
      const {status,msg} = yield call(delReq,payload)
      if (status != 1) message.error(msg)
      message.success(msg)
      yield put({
        type: 'DEL_LISTS',
        payload
      })
      // console.log('reuslt',result)
    },
    *updateLists ({payload},{call,put}) {
      const {status,msg} = yield call(updateReq,payload)
      if (status != 1) message.error(msg)
      // 1 
      message.success(msg)
      yield put({
        type: 'UPDATE_LISTS',
        payload
      })
      
    },
    *searchPrice ({payload},{call,put}) {
      yield put({
        type: 'SEARCH_PRICE',
        payload
      })
    }
  },
  reducers: {
    SEARCH_PRICE (state,{payload}) {
      // 关键字  payload   state.lists
      if (!payload) {
        state.lists = state.originLists
        return state 
      }
      state.lists = state.originLists.filter(item => item.price == payload )
      return state 
    },
    ADD_LISTS (state,{payload}) {
      state.lists.push(payload)
      state.originLists = state.lists 
      return state 
    },
    UPDATE_LISTS (state,{payload:{shopId,num}}) {
      state.lists.forEach(item => {
        if (item.shopId == shopId) {
          item.num = num
        }
      })
      state.originLists = state.lists 

      return state
    },
    DEL_LISTS (state,{payload}) {
      state.lists = state.lists.filter(item => item.shopId != payload)
      state.originLists = state.lists 
      
      return state
    },
    GET_LISTS (state,{payload}) {
      state.lists = payload 
      state.originLists = state.lists 
      return state 
    },
  }

}
export default orderModal