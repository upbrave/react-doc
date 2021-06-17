import * as React from 'react'
import Larger from './larger'
import './index.less'
const { useEffect } = React
export default ()=>{
  const imgSrc = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2879816560,4060032418&fm=26&gp=0.jpg'
  useEffect(()=>{
    Larger('._box_larger')
  },[])
  return (
    <>
      <div id="box" className="_box_larger">
        <img src={imgSrc} width="300px;" />
      </div>

      <div id="_son_larger"></div>

      <div id="_div2_larger">
        <img src={imgSrc} id="_img_larger" />
      </div>

      <div id="box2" className="_box_larger">
        <img src={imgSrc} width="300px;" />
      </div>
    </>
  )
}
