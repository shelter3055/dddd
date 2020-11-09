import React,{useEffect} from 'react'
import {connect} from 'umi'
export default connect(
  ({chart}) => chart
)(function Analyze ({dispatch}) {
  useEffect(() => {
    dispatch({
      type: 'chart/getG2Data'
    })
  },[])
  return <div>
    分析一
    <div id="container"></div>
  </div>
})
