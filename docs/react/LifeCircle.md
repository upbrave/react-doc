---
title: 生命周期
order: 3
---

//父组件的强制更新 forceUpdate 不会经过自己的 shouldComponentUpdate 钩子 ，但是会经过子组件的 shouldComponentUpdate 钩子

```js
shouldComponentUpdate(){
    // forceupdate 直接跳过 当前组件的 shouldComponentUpdate
    console.log('parent show');
    return false
}

shouldComponentUpdate(){
  console.log('  Update1 shouldComponentUpdate');
  //父组件的强制更新 forceUpdate 不会经过自己的 shouldComponentUpdate钩子 ，但是会经过子组件的shouldComponentUpdate钩子
  return false
}
```
