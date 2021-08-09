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

An intuitive Redux side effect manager. Easy to manage, easy to test, and executes efficiently.

- redux 中间件
- 切面编程
- 声明式
- 用于管理应用程序副作用

## 安装

```bash
npm install redux-saga
```

## 初始化例子

```tsx
// 例子中的结果可以在控制台查看
import React from 'react';
import ReduxSage from './redux-saga';

export default () => {
  return <ReduxSage></ReduxSage>;
};
```

## node_modules

版本不同，包结构有所不同，不过不影响使用

otms: `"redux-saga": "^0.16.2",`

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gtahmsljkfj30m60t2406.jpg" alt="image-20210809134758871" style="zoom:67%;" />

当前项目： `"redux-saga": "^0.16.2",`

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gtahnn6v6qj30ls0lc0uo.jpg" alt="image-20210809134850049" style="zoom:67%;" />

```
// redux-saga/package.json
"module": "./dist/redux-saga-core-npm-proxy.esm.js"
```

```
// redux-saga/dist/redux-saga-core-npm-proxy.esm.js
import createSagaMiddleware__default from '@redux-saga/core';
export * from '@redux-saga/core';

export default createSagaMiddleware__default;
```

```
// @redux-sage/core
"module": "./dist/redux-saga-core.esm.js",
```

回看打包配置

lerna

```
// 外层package.json
"build": "lerna run --parallel build",

```

core 包的配置

```js
// 单个包
"build": "rollup -c",
// rollup.config.js 多入口
const multiInput = {
  core: 'src/index.js',
  effects: 'src/effects.js',
}
{
    input: multiInput,
    output: {
      dir: 'dist',
      format: 'esm',
      entryFileNames: 'redux-saga-[name].[format].js',
    },
}

// redux-saga-effects.esm.js
// redux-saga-core.esm.js

```

同时还有其他几个包

## sagaMiddleware

```
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware();
```

从用法上可以看出这个方法返回一个 middleware,所以在代码中这个方法名叫 `sagaMiddlewareFactory`

```js
export default function sagaMiddlewareFactory({ context = {}, channel = stdChannel(), sagaMonitor, ...options } = {}) {
	// 几个参数先不要管
  let boundRunSaga
  function sagaMiddleware({ getState, dispatch }) {
    boundRunSaga = runSaga.bind(null, { // 在这里赋值
      ...options,
      context,
      channel,
      dispatch,
      getState,
      ...,
    })
    // next 是包装过的dispatch
    return next => action => {
      ...
      const result = next(action) // hit reducers
      channel.put(action)
      return result
    }
  }
	 sagaMiddleware.run = (...args) => {
   	...
    return boundRunSaga(...args) // 在这里调用
  }
	...
	return sagaMiddleware
}
```

这个 sagaMiddleware 就是返回的中间件，中间件一般都是这样返回`next => action => {}`

```
sagaMiddleware.run(saga, store.dispatch);
```

这个 run 就是在上面挂载上的 run 方法，实际上调用的是 boundRunSaga

boundRunSaga 是 runSaga bind 之后的返回值

## runSaga

```js
import { stdChannel } from './channel'
import { immediately } from './scheduler'

export function runSaga(
  { channel = stdChannel(), dispatch, getState, context = {}, sagaMonitor, effectMiddlewares, onError = logError },
  saga,
  ...args
) {

  const iterator = saga(...args)
	// 计数id
  const effectId = nextSagaId()

  let finalizeRunEffect
  if (false) {
    ...
  } else {
    finalizeRunEffect = identity
  }

  const env = {
    channel,
    dispatch: wrapSagaDispatch(dispatch),
    getState,
    ..,
    ..,
    finalizeRunEffect,
  }

  return immediately(() => {
    const task = proc(env, iterator, context, effectId, getMetaInfo(saga), /* isRoot */ true, undefined)

    if (sagaMonitor) {
      sagaMonitor.effectResolved(effectId, task)
    }

    return task
  })
}

```

// internal/scheduler.js

```js
export function immediately(task) {
  try {
    suspend();
    return task();
  } finally {
    flush();
  }
}
function suspend() {
  semaphore++;
}
```

// 计数 + 执行这个参数 task

```js
export const identity = (v) => v;
let noop = () => {};
export { noop };
// uid.js  nextSagaId nextEffectId 是同一个方法
export let current = 0;
export default () => ++current;
```

也就是说 runSaga 的返回值是如下函数的返回值

```js
() => {
    const task = proc(env, iterator, context, effectId, getMetaInfo(saga), /* isRoot */ true, undefined)
    return task
})
```

## proc

./internal/proc.js

最重要的方法, proc 是 process 进程的简写

在这个方法中有三个内部方法`next` `runEffect` `digestEffect`

```js
export default function proc(
  env,
  iterator,
  parentContext,
  parentEffectId,
  meta,
  isRoot,
  cont,
) {
  // env 在runSaga上挂载了 channel dispatch,getState,sagaMonitor,onError,finalizeRunEffect
  // finalizeRunEffect 的返回值还是runEffect  ，runEffect 用到的时候介绍
  const finalRunEffect = env.finalizeRunEffect(runEffect);
  next.cancel = noop; // 返回空对象的一个函数，在这里类似一个默认值
  // 主线程
  // meta 描述信息
  const mainTask = { meta, cancel: cancelMain, status: RUNNING };

  const task = newTask(
    env,
    mainTask,
    parentContext,
    parentEffectId,
    meta,
    isRoot,
    cont,
  );
  // 执行上下文
  const executingContext = {
    task,
    digestEffect,
  };
  // 设置mainTask的状态
  function cancelMain() {
    if (mainTask.status === RUNNING) {
      mainTask.status = CANCELLED;
      next(TASK_CANCEL);
    }
  }
  // 执行runSaga传入的是undefined
  if (cont) {
    cont.cancel = task.cancel;
  }

  next();

  // 到这里 可以看到task是newTask创建的一个task， task是什么？是一个对象，这个对象上挂载了一系列的属性和方法
  // id、meta、 content、取消方法，状态等，用到的时候回头看
  return task;

  function next(arg, isErr) {
    try {
      let result;
      // 是否是错误
      if (isErr) {
        result = iterator.throw(arg);
        // user handled the error, we can clear bookkept values
        sagaError.clear();
        // 是否取消
      } else if (shouldCancel(arg)) {
        mainTask.status = CANCELLED;
        next.cancel();
        result = is.func(iterator.return)
          ? iterator.return(TASK_CANCEL)
          : { done: true, value: TASK_CANCEL };
      } else if (shouldTerminate(arg)) {
        // 是否终止
        result = is.func(iterator.return) ? iterator.return() : { done: true };
      } else {
        // 上面的都还没到时机，直接到了这里
        // iterator 是什么？回到runSaga 发现这个iterator就是我们传入和 generator函数
        // 也就是这个saga1   import saga1 from './saga';
        // generator 执行之后返回一个遍历器对象，执行这个它上面的next方法可以一步步往下走
        // 第一次的时候arg为undefined
        result = iterator.next(arg);
      }
      // 遍历器对象以其done属性true/false判断是否遍历完
      if (!result.done) {
        // 这个value就是yield后面的数据，
        // parentEffectI 用到后再说
        // 这个时候程序要处理我们yield的指令，但是当前这个generator还未执行完，或者说这个进程在此处暂停了，什么时候重新往下走呢，这个next参数就是用来重启启动这个进程的引用； 有点递归调用的意思了
        digestEffect(result.value, parentEffectId, next);
      } else {
        // 看简单例子
        if (mainTask.status !== CANCELLED) {
          mainTask.status = DONE;
        }
        mainTask.cont(result.value);
      }
    } catch (error) {
      if (mainTask.status === CANCELLED) {
        throw error;
      }
      mainTask.status = ABORTED;

      mainTask.cont(error, true);
    }
  }

  function runEffect(
    effect,
    effectId,
    currCb /*在currCb中执行了proc的next方法*/,
  ) {
    // yield的值类型判断 对照着例子更直观
    // 在这里需要了解 put resolve delay call 等
    // 这些方法的调用最后都会执行一个叫makeEffect的方法，返回一个对象，其中有一个属性[IO]:true
    if (is.promise(effect)) {
      resolvePromise(effect, currCb);
    } else if (is.iterator(effect)) {
      // resolve iterator
      proc(
        env,
        effect,
        task.context,
        effectId,
        meta,
        /* isRoot */ false,
        currCb,
      );
    } else if (effect && effect[IO]) {
      // put 返回一个带IO的对象
      // runner是处理这些effect的地方， effectRunnerMap是一个runner的集合
      const effectRunner = effectRunnerMap[effect.type];

      effectRunner(env, effect.payload, currCb, executingContext);
    } else {
      // 首先我们返回的是{a:12},也就是effect是{a:12} 走到了这里，然后执行从digestEffect传入的回调
      currCb(effect);
    }
  }
  // 在个函数中把yield的返回值叫做effect，所以一定要注意这个单词，到处都是
  //
  function digestEffect(effect, parentEffectId, cb, label = '') {
    // 增加effectId
    const effectId = nextEffectId();

    let effectSettled;
    // 定义一个回调函数
    function currCb(res, isErr) {
      if (effectSettled) {
        // 只执行一次
        return;
      }

      effectSettled = true;
      cb.cancel = noop; // 又重置了
      // 到这里认为第一阶段执行完了，要回到主process，next下去 cb===next
      cb(res, isErr);
    }
    currCb.cancel = noop;
    // 这个cb就是从next方法， 这里修改了默认的cancel
    cb.cancel = () => {
      if (effectSettled) {
        return;
      }

      effectSettled = true;

      currCb.cancel(); // propagates cancel downward
      currCb.cancel = noop; // defensive measure

      env.sagaMonitor && env.sagaMonitor.effectCancelled(effectId);
    };
    // 从上面得知 finalRunEffect就是runEffect ，cb是作为回调被调用，调用时机还未到，先看runEffect
    finalRunEffect(effect, effectId, currCb);
  }
}
```

## generator 例子

```tsx
import * as React from 'react';
export default () => {
  const run = function () {
    var v = function* () {
      yield 12;
    };
    var res = v();
    console.log(res.next());
    console.log(res.next());
  };
  return <button onClick={run}>执行</button>;
};
```

## makeEffect

```js
const makeEffect = (type, payload) => ({
  [IO]: true,
  combinator: false,
  type,
  payload,
});
```

> run 方法可以多次执行，这样就可以实现异步加载和注册 action 监听

## take

- 控制事件流
- 参数 pattern 比如 "\*" 字符串等
- 内部调用 channel.take
- 可以接收数组参数，比如['LOGOUT', 'LOGIN_ERROR']， 匹配机制类似数组的 some
  - 但是两个 action 共享一个进程
- yield 返回的是 action({type:"xxxx"})本身

## cancel

- 取消一个 task
- 参数是 task
- 调用的是 iterator.return, 如果 generator 被 fianlly 包裹，程序会直接进入 finally

## select

- 获取 rudux state
- 可以传入 selector，配和 reselect 使用

## all

- 参数是 effect 数组
- 内部循环调用 digestEffect，这是同一个 digestEffect，也就是在同一个 proc

## fork

- 参数是一个 generator
- yield 返回值是一个 task
- 可以接收其他参数
- 后台启动一个任务(task)，不阻塞程序

## call

- 接收一个方法
- yield call(Api.fetchUser, action.payload.url)
- 方法返回值可以是 promise
- 方法(generator)返回值如果说是 iterator 会调用 proc，重新开始进程
- 未 resolve 的 promise 会阻塞程序

## put

- 接收一个 action 对象

```js
export function put(channel, action) {
  // 单参数处理
  if (is.undef(action)) {
    action = channel;
    channel = undefined;
  }
  return makeEffect(effectTypes.PUT, { channel, action });
}
```

```js
function runPutEffect(env, { channel, action, resolve }, cb) {
  asap(() => {
    let result;
    try {
      result = (channel ? channel.put : env.dispatch)(action);
    } catch (error) {
      cb(error, true);
      return;
    }
    if (resolve && is.promise(result)) {
      resolvePromise(result, cb);
    } else {
      cb(result);
    }
  });
}
export function asap(task) {
  // queue 维护一个队列
  queue.push(task);
  // 空闲的时候直接执行
  if (!semaphore) {
    suspend();
    flush(); // task()
  }
}
```

## putResolve

- 和 put 一样
- 区别：如果 dispatch 返回 promise，会阻塞程序往下运行直到 promise resolve 掉
- 主要用在 dispatch redux-thunk

## takeEvery

- 内部调用了 fork
- 内部使用状态机
- 通过 fork 方法一直创建 proc 和 take effect ，不阻塞程序

等等...

## 区分阻塞和非阻塞 effects

#### 阻塞 effects

- take
- call 当返回 promise，会阻塞
- ...

#### 非阻塞 effects

- fork
- put
- ...
