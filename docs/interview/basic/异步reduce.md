---
nav:
  title: 面试
  order: 1
group:
  title: 其他
  order: 1
order: 1
title: 异步reduce
---

```tsx
import React, { useState } from 'react';
import asyncReduce from 'utils/asyncReduce';

export default () => {
  const [result, caculate] = useState(0);
  const clickHandler = () => {
    var arr = [1, 2, 3, 4];
    const iterator = function (last, curr, next) {
      setTimeout(() => {
        let res = last + curr;
        caculate(res);
        next(res);
      }, 1000);
    };
    const callback = function (data) {
      caculate(data);
    };
    asyncReduce(arr, iterator, 0, callback);
  };
  return (
    <div>
      <button onClick={clickHandler}>开始计算</button>
      {result}{' '}
    </div>
  );
};
```
