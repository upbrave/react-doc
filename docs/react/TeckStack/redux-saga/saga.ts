import {
  put,
  takeEvery,
  delay,
  all,
  fork,
  call,
  cancelled,
  cancel,
  race,
  putResolve,
  take,
  select
} from 'redux-saga/effects';
import { createAsync } from './action';
const Api = {
  authorize: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('xxxxx');
      }, 2000);
    });
  },
  resolve: (dispatch:any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('1111');
        console.log(dispatch);
        console.log('resolve');
      }, 2000);
    });
  },
};
/*
* 可以接收参数
* */
export default function* saga(dispatch:any) {
  // console.log(dispatch);
  // 工具函数 delay 阻塞1s
  yield delay(1000);
  // put 类似于 dispatch
  yield put({ type: 'put' });
  // takeEvery 不阻塞程序
  yield takeEvery('takeEvery', function(arg){console.log('takeEvery',arg);});
  // select 获取state中的数据
  const state = yield select(state => console.log(state))
  console.log(state);
  // call 阻塞程序
  yield call(function *(){
    yield delay(1000)
  })

  console.log('阻塞了1s 后sdsdsd');
  yield all([
    // 任务取消
    cancelSaga(),
    // take的使用
    watchSaga(),
    // race
    raceSaga(),
    // 用来触发redux-thunk
    putResolve(Api.resolve as any)
  ])

}

function* cancelSaga() {
  while ( yield take('start') ) {
    // 启动后台任务
    console.log('start');
    const bgSyncTask = yield fork(function* watchIncrementAsync() {
      try {
        yield call(()=>Api.authorize())
      }catch (err){
        console.log(err);
      }finally {
        if (yield cancelled()) {
          console.log('cancel');
        }
      }
    })
    // 等待用户的停止操作
    yield take('stop')
    console.log('stop');
    // 用户点击了停止，取消后台任务
    // 这会导致被 fork 的 任务跳进它的 finally 区块
    yield cancel(bgSyncTask)
  }
}

function *raceSaga(){
  yield race([race1(), race2()])
}

function* race1() {
  yield delay(2000);
  console.log('race1');
}
function* race2() {
  yield delay(1000);
  console.log('race2');
}

function *watchSaga(){
  while (true){
    const action = yield take('request')
    console.log(action);
  }
}



