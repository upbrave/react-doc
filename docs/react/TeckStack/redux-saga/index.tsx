import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Button} from 'antd';
import thunk from 'redux-thunk';


import saga1 from './saga';
const reducer = (state = 0, action:any)=>{
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'INCREMENT_IF_ODD':
      return state % 2 !== 0 ? state + 1 : state;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware, thunk));
sagaMiddleware.run(saga1, store.dispatch);


export default ()=>{
  const clickHandler = ()=>{
    store.dispatch({type:'start'})
  }
  const endHandler = ()=>{
    store.dispatch({type:'stop'})
  }
  const triggerTakeEvery  = ()=>{
    store.dispatch({type:'takeEvery', payload: 'xxx'})
  }
  const triggerTake  = ()=>{
    store.dispatch({type:'request', payload: 'xxx'})
  }

  return (
    <div>
      <Button onClick={clickHandler}>开始</Button>
      <Button onClick={endHandler}>结束</Button>
      <Button onClick={triggerTakeEvery}>触发takeEvery</Button>
      <Button onClick={triggerTake}>触发take</Button>
    </div>
  )
}


