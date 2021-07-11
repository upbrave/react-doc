---
nav:
title: 常见问题1 order: 1 title: sdfsf order: 1
---

### blur 和 click 哪个先执行

```tsx
import React, { useState } from 'react';

export default () => {
  const [seqStr, setSeq] = useState('');
  const clickHandler = () => {
    setSeq(seqStr + 'click执行了 ');
  };
  const blurHandler = () => {
    setSeq(seqStr + 'blur执行了 ');
  };
  return (
    <>
      <button onClick={clickHandler}>点击我</button>
      <input type="text" placeholder="blur 我" onBlur={blurHandler} />
      {seqStr}
    </>
  );
};
```
