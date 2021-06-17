---
group:
  title: 其他
  order: 2
order: 1
title: animate
---

### animate.css

```tsx
import React from 'react';
import 'animate.css'
import { Row, Col, Card, Switch } from 'antd';
const { useState } = React
const animations = ['animate__heartBeat']
export default ()=>{
  const [animateIndex,setIndex] = useState()
  console.log(animateIndex);
  return (
    <div >
      {animations.map((v, i) => (
        <Col className="gutter-row" md={6} key={i}>
          <div className="gutter-box">
            <Card
              className={` ${animateIndex === i ? v : ''} `}
              onMouseEnter={() => setIndex(i)}
              onMouseLeave={() => setIndex()}
            >
              <div className="pa-m text-center">
                <h3>{v}</h3>
              </div>
            </Card>
          </div>
        </Col>
      ))}
      
    </div>
  )
}
```
