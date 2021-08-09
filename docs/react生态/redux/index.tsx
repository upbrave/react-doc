import * as React from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { createSelector } from 'reselect';
import { Button } from 'antd';
import { storeCreator } from './store';
import { actions, getPageInfo } from './slice';
const store = storeCreator();
export default () => {
  return (
    <Provider store={store}>
      <Example />
    </Provider>
  );
};

const Example = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(
    createSelector(
      (state: any) => state.global,
      (state: any) => state.userInfo,
    ),
  );
  const loading = useSelector(
    createSelector(
      (state: any) => state.global,
      (state: any) => state.loading,
    ),
  );
  const pageLoading = useSelector(
    createSelector(
      (state: any) => state.global,
      (state: any) => state.pageLoading,
    ),
  );
  React.useEffect(() => {
    dispatch(actions.init());
  }, []);

  return (
    <div>
      App
      <div>用户名：{userInfo.name}</div>
      <div>年龄：{userInfo.age}</div>
      <div>初始化获取用户信息:{loading ? 'loading中' : '初始化完成loaded'}</div>
      <div>
        <Button loading={loading} onClick={() => dispatch(actions.init())}>
          再次获取用户信息
        </Button>
      </div>
      <div>页面数据:{pageLoading ? 'loading中' : '页面完成loaded'}</div>
      <div>
        <Button loading={pageLoading} onClick={() => dispatch(getPageInfo())}>
          获取页面数据
        </Button>
      </div>
    </div>
  );
};
