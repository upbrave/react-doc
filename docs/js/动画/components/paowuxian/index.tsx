import * as React from 'react'
import './index.less'
const {useState, useEffect, useRef} = React
export default ()=>{
  const ballRef = useRef(null)
  const targetRef = useRef(null)
  const [transform, updateTransform] = useState('translate3d(0px, 0px, 0)')
  useEffect(()=>{

  },[])


  const beginMove = ()=>{
    const targetX = targetRef.current.offsetLeft+20
    const targetY = targetRef.current.offsetTop+20
    const ballX = ballRef.current.offsetLeft+10 ;
    const ballY = ballRef.current.offsetTop+10

    let a = (targetY - ballY) / Math.pow( targetX- ballX, 2)
    const speed = 2
    const initX = 0
    const initY = 0
    let moveFn = (x, y) => {
      requestAnimationFrame(()=>{
        console.log(`translate3d(${x}px, ${y}px, 0)`);
        const transform = `translate3d(${x}px, ${y}px, 0)`
        updateTransform(transform)
        if(x+10 < targetX- ballX+10 ) {
          x += speed
          y = a * Math.pow(x-initX, 2) + initY
          moveFn(x, y)
        } else {
          console.log('done')
        }
      })
    }
    moveFn(initX, initY)
  }
  const reset = ()=>{
    updateTransform('translate3d(0px, 0px, 0)')
  }
  return (
    <div className="paowuxian-container">
      <div className="ball" ref={ballRef}  style={{transform}}></div>
      <div className="yuandian" ref={targetRef}></div>
      <button onClick={beginMove} >运动</button>
      <button onClick={reset}>重置</button>

    </div>
  )
}
