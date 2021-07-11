---
nav:
  title: css
  order: 1
group:
  title: 基础
  order: 1
order: 1
title: retina屏1px线条
---

### 正常情况下 mac 中的 1px 展示，比较粗

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import styled from 'styled-components';
const StyledDiv = styled.div`
  height: 1px;
  width: 300px;
  background-color: #000;
`;
export default () => {
  return <StyledDiv></StyledDiv>;
};
```

### 使用 transform 通过缩放将 1px 缩小一半

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import styled from 'styled-components';
const StyledDiv = styled.div`
  height: 1px;
  transform: scaleY(0.5);
  transform-origin: 50% 100%; /*必须*/
  width: 300px;
  background-color: #000;
`;
const StyledCircle = styled.div`
  width: 50px;
  height: 50px;
  margin: 10px;
  border-radius: 50px;
  position: relative;
  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    border: 1px solid red;
    border-radius: 100px;
    transform-origin: 0 0;
    transform: scale(0.5, 0.5);
  }
`;
export default () => {
  return (
    <>
      <StyledDiv></StyledDiv>
      <StyledCircle></StyledCircle>
    </>
  );
};
```

### border-image

> border-image:source slice repeat
> slice 最多填写四个值，代表如何切割图片用来表示 border;
>
> 对使用于 border-image 画 1px 的边框，第四个参数 repeat stretch round space 都是一样的
> border-image 关键是要有一个 2px 的图片

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import styled from 'styled-components';
import img2px from './assets/2px.png';
const StyledDiv = styled.div`
  border: 1px solid #ccc;
  border-image: url(${img2px}) 2 0 0 0 stretch;
  width: 300px;
  height: 10px;
`;
export default () => {
  return <StyledDiv></StyledDiv>;
};
```

### 使用 svg

利用 SVG 的描边等属性的 1px 还是物理像素的 1px，而不是高清屏的 1px

stroke 的颜色必须把#转义为%23

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import styled from 'styled-components';
const StyledDiv = styled.div`
  height: 1px;
  background: url("data:image/svg+xml;utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='1px'><line x1='0' y1='0' x2='100%' y2='0' stroke='%23000'></line></svg>");
  width: 300px;
`;
export default () => {
  return <StyledDiv></StyledDiv>;
};
```

### linear-gradient

> 比较虚 不完美

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import styled from 'styled-components';
const StyledDiv = styled.div`
  height: 1px;
  background: linear-gradient(0deg, #fff, #000);
`;
export default () => {
  return <StyledDiv></StyledDiv>;
};
```

### box-shadow

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import styled from 'styled-components';
const StyledDiv = styled.div`
  height: 1px;
  background: none;
  box-shadow: 0 0.5px 0 #000;
`;
export default () => {
  return <StyledDiv></StyledDiv>;
};
```

### 对比

```tsx
/**
 * desc:transfrom scale/svg的方法兼容性和效果都是最好的 ;
 */
import React from 'react';
import styled from 'styled-components';
import img from './assets/jianrong.png';
const StyledImg = styled.img`
  width: 400px;
`;
export default () => {
  return <StyledImg src={img} alt="" />;
};
```

sdd

### postcss-write-svg

<Alert type="warning">不支持圆角</Alert>

```tsx
import React from 'react';
import './styles/1px-svg.css';
export default () => {
  return (
    <>
      <div className="postcss-svg"></div>
      <div className="postcss-svg-top"></div>
    </>
  );
};
```

### 使用 border 画一条平行线

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import styled from 'styled-components';
const StyledDiv = styled.div`
  border: 0;
  border-top: 3px double #d0d0d5;
`;
export default () => {
  return <StyledDiv></StyledDiv>;
};
```
