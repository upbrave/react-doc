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
  select,
} from 'redux-saga/effects';

/*
 * 可以接收参数
 * */
export default function* simple(dispatch: any) {
  // 工具函数 delay 阻塞1s
  yield { a: 12 };
  yield put({ type: 'xx', payload: 'aaaaa' });
  console.time();

  yield delay(1000);
  console.timeEnd();
}
const IO = 'sdfsdfs';
var a = {
  [IO]: true,
  combinator: false,
  type: 'xxx',
  payload: 'xxxx',
};
