---
title: Hooks
order: 5
---

## hooks

Demo:

```tsx
import React from 'react';
```

### useState

初始值只会渲染一次

初始值是函数的情况

setState 参数是函数的时候 ，最新值

Capture value 特点

this.setState 如果是同一个值仍会导致 render，setState 如果是同一个值不会重复 render

###

```tsx | pure
import { useEffect, useState } from 'react';
import axios from 'axios';

export default () => {
  const [data, setData] = useState({ hits: [] });
  const [url, setUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log('effect');
    if (!url) {
      return;
    }
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  const doFetch = (url) => {
    setUrl(url);
  };

  return { data, isLoading, isError, doFetch };
};
```

ahooks
https://ahooks.js.org/zh-CN/hooks/async

<code src="./hooks/useEffect.tsx"></code>
