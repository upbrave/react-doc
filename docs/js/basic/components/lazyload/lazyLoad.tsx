import * as React from 'react';
import styled from 'styled-components';
const Item = styled.div`
  height: 50px;
  width: 400px;
  margin: 10px;
  border: 1px solid blue;
`

const imgs = Array.from(Array(10))

const {useEffect, useState} = React
export default () => {

  const [count, setCount] = useState(0)
  useEffect(()=>{
    let imgList = Array.from( document.querySelectorAll<any>(".get_bounding_rect"))
    let num = imgList.length
    let innerCount = count
    const lazyLoad = function() {
      let deleteIndexList = []
      imgList.forEach((img, index) => {
        let rect = img.getBoundingClientRect()
        // 减100是为了能看到加载的数字
        if (0 < rect.top && rect.top < window.innerHeight-100) {
          img.src = img.dataset.src
          // 加载成功后将图片添加到删除列表中
          deleteIndexList.push(index)
          innerCount ++
          setCount(innerCount)
          if (innerCount === num) {
            //当图片全部加载完毕解绑scroll事件
            document.removeEventListener('scroll', lazyLoad)
          }
        }
      })
      // 删除已经加载完毕的图片
      imgList = imgList.filter((_, index) => !deleteIndexList.includes(index))
    }
    document.addEventListener('scroll',lazyLoad)
    return ()=>{
      document.removeEventListener('scroll',lazyLoad)
    }
  },[])

  return (
    <div>
      {imgs.map((item,index)=><Item key={index} className="get_bounding_rect" >已加载{count}</Item>)}
    </div>
  )
}
