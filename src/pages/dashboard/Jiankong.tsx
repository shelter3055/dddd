import React,{useEffect} from 'react'
import {connect} from 'umi'
export default connect(
  ({chart}) => chart
)(function Jiankong ({dispatch}) {
  useEffect(() => {
    dispatch({
      type: 'chart/getG6Data'
    })
  },[])
  return (
    <div>
      监控
      <hr/>
      <div id="container"></div>
    </div>
  )
}
)