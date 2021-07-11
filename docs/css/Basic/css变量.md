---
order: 2
title: css变量
---

### 通过 css 变量做动画效果

然后通过 setProperty 修改 css 变量的值

```tsx
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  position: relative;
  appearance: none;
  background: #bfd0d6;
  padding: 5px 10px;
  border: none;
  color: white;
  font-size: 1.2em;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  border-radius: 100px;
  width: 200px;
  &::before {
    --size: 0;
    content: ' ';
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--size);
    height: var(--size);
    background: radial-gradient(
      circle closest-side,
      rgba(111, 158, 212, 0.4),
      transparent
    );
    transform: translate(-50%, -50%);
    transition: width 0.2s ease, height 0.2s ease;
  }
  &:hover::before {
    --size: 200px;
  }
`;
export default () => {
  const mouseMove = (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    e.target.style.setProperty('--x', `${x}px`);
    e.target.style.setProperty('--y', `${y}px`);
  };
  return <StyledButton onMouseMove={mouseMove}>button</StyledButton>;
};
```
