---
nav:
  order: 1
  title: react
title: Context
order: 4
---

## 概述

- 很重要

## Provider Consumer

```tsx
import React, { createContext, useState } from 'react';

const { Provider } = React.createContext();
const Child = () => {
  const randomAlpha = String.fromCharCode(Math.floor(Math.random() * 25) + 65);
  return <div>修改context，child会触发更新渲染： {randomAlpha}</div>;
};
let value = { name: '12' };
export default () => {
  // const [value, setValue] = useState({ name: '12' })
  // const changeContext = ()=>{setValue({name:'14'})}
  const changeContext = () => {
    value = { name: '14' };
  };
  return (
    <div>
      <button onClick={changeContext}>修改context</button>
      <Provider value={value}>
        <Child></Child>
      </Provider>
    </div>
  );
};
```

### sfsfsdf
