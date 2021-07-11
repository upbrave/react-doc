---
group:
title: 其他 order: 2 order: 1 title: animate
---

### animate.css

```tsx
import React, { useEffect, useState, useRef } from 'react';
import 'animate.css';
import { Row, Col, Card, Switch } from 'antd';

const animations = ['animate__heartBeat'];
export default () => {
  const [animateIndex, setIndex] = useState();
  const ele1 = useRef(null);
  useEffect(() => {
    // 添加fadeInRight动画
    ele1.current.classList.add('animate__fadeInRight');
    ele1.current.addEventListener('click', (ev) => {
      // 删除fadeInRight动画
      ele1.current.classList.remove('animate__fadeInRight');
      // 添加zoomOutLeft动画
      ele1.current.classList.add('animate__zoomOutLeft');
      ev.preventDefault();
    });
  }, []);
  return (
    <div>
      {animations.map((v, i) => (
        <Card
          style={{ width: 200 }}
          key={i}
          className={`animate__infinite animate__animated ${
            animateIndex === i ? v : ''
          }`}
          onMouseEnter={() => setIndex(i)}
          onMouseLeave={() => setIndex()}
        >
          <div style={{ wordBreak: 'break-all' }}>{v}</div>
        </Card>
      ))}
      <div>
        <div
          style={{ height: 60, textAlign: 'center' }}
          className="animate__animated animate__slower"
          ref={ele1}
        >
          点击飞走
        </div>
      </div>
    </div>
  );
};
```
