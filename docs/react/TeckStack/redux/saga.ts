import { takeLatest, putResolve, call, put, all, Pattern, take, fork } from 'redux-saga/effects';
import { actions, getLoginUserInfo} from './slice';

const { updateLoading, setError } = actions;

/*
* 初始化页面获取数据
* */
function* initData(): Generator {
  try {
    yield put(updateLoading(true));
    yield all([
      putResolve<any>(getLoginUserInfo()),
    ]);
    // 当待初始化的数据均加载完毕后
  } catch (error) {
    yield put(setError(error));
  }
  yield put(updateLoading(false));
}

function* fetchSuccessSaga(action:any): Generator {
  const result = action?.payload;
  // 做一些处理
}

function* fetchFailSaga(action:any): Generator {
  const result = action?.payload;
  // 1.判断是否登录，如果未登录跳转到登录页
  // 2.如果已经登录，但是接口报错，前端提示错误
  yield put(actions.setError('error'))
  // 做一些处理
}

function* fetchPending(action:any): Generator{
  // 做一些处理
}
/*
* 监听全局saga，做一些通用处理
* */
function* globalSaga() {
  // 拦截请求
  // 可以将
  while (true) {
    const reg = new RegExp(`/fulfilled|/rejected|/pending`);
    const action  = yield take((data) => data.type.match(reg));
    if (action.type.indexOf('/rejected') > -1) {
      yield fork(fetchFailSaga, action);
    } else if(action.type.indexOf('/resolve') > -1) {
      yield fork(fetchSuccessSaga, action);
    }else{
      yield fork(fetchPending, action);
    }
  }
}

/*
* 处理页面loading，可以精细化处理
* */
export function* handleLoading(action) {
  // 开始loading
  yield put(actions.updatePageLoading(true));
  // 等待结果
  yield take([
    action.type.replace('/pending', '/fulfilled'),
    action.type.replace('/pending', '/rejected'),
  ]);
  // 结束loading
  yield put(actions.updatePageLoading(false));
}


export function* watcher(type: Pattern<any>, process: (action:any) => any): Generator {
  yield takeLatest(type, process);
}

export default function* saga(): Generator {
  yield all([
    call(() => watcher(actions.init, initData)),
    call(globalSaga),
    call(()=> watcher((action: any) => action.type.match( /loading.*pending/),handleLoading)),
  ]);
}
