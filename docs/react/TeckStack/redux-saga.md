---
nav:
    order: 1
group:
    title: 实践 pratise
    order: 3
order: 1
title: redux-saga
---

## 概述
- redux中间件
- 切面编程
- 声明式

## 初始化 run
> run方法可以多次执行，这样就可以实现异步加载和注册action监听

## take
* 控制事件流
* 参数 pattern 比如 "*" 字符串等
* 内部调用channel.take
* 可以接收数组参数，比如['LOGOUT', 'LOGIN_ERROR']， 匹配机制类似数组的some
    * 但是两个action共享一个进程
* yield返回的是action({type:"xxxx"})本身

## cancel
* 取消一个task
* 参数是task
* 调用的是iterator.return, 如果generator被fianlly 包裹，程序会直接进入finally

## select
* 获取rudux state
* 可以传入selector，配和reselect使用

## all
* 参数是effect数组
* 内部循环调用digestEffect，这是同一个digestEffect，也就是在同一个proc

## fork
* 参数是一个generator
* yield 返回值是一个task
* 可以接收其他参数
* 后台启动一个任务(task)，不阻塞程序

## call
* 接收一个方法
* yield call(Api.fetchUser, action.payload.url)
* 方法返回值可以是promise
* 方法(generator)返回值如果说是iterator会调用proc，重新开始进程
* 未resolve的promise会阻塞程序

## put
* 接收一个action对象

## putResolve
* 和put一样
* 区别：如果dispatch返回promise，会阻塞程序往下运行直到promise resolve掉
* 主要用在dispatch redux-thunk

## takeEvery
* 内部调用了fork
* 内部使用状态机
* 通过fork方法一直创建proc和take effect ，不阻塞程序

等等...
    

## 区分阻塞和非阻塞effects

#### 阻塞effects
* take
* call 当返回promise，会阻塞
* ...
#### 非阻塞effects
* fork
* put
* ...
```tsx
// 例子中的结果可以在控制台查看
import React from 'react';
import ReduxSage from './redux-saga'

export default ()=>{
  return (
    <ReduxSage></ReduxSage>
  )
}
```
