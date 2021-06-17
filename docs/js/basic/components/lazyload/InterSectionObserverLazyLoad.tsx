import * as React from 'react';
import styled from 'styled-components';

const { useState, useEffect, useRef } = React;
const imgs = Array.from(Array(10));
const ItemWrapper = styled.div`
  height: 50px;
  width: 400px;
  margin: 10px;
  border: 1px solid darkseagreen;
`;
const Item = () => {
  const [isLoad, setLoad] = useState(false);
  const itemRef = useRef(null);
  useEffect(() => {
    // 观察根元素和被观察目标元素的交叉情况
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          // 异步处理，所以滚动的时候获取到的intersectionRatio并不准确
          console.log(entry.intersectionRatio);
          if (entry.isIntersecting || entry.intersectionRatio) {
            // isLoad参数用于判断数据是否加载的，如果未加载值设置为 true ，开始后加载模块数据
            if (!isLoad) {
              setLoad(true);
              // 停止观察目标元素
              observer.unobserve(itemRef.current);
            }
          }
        });
      }, {
        // 不设置偏移
        rootMargin: '0px 0px',
        // 默认是document
        root: null,
        // 数组中有几个值，会触发对应次数callback
        threshold: [0, 0.75],
      },
    );
    observer.observe(itemRef.current);

    return () => {
      // 停止观察目标元素
      observer.disconnect();
    };
  }, []);
  return (
    <ItemWrapper ref={itemRef}>
      {isLoad ? 'load' : 'skeleton'}
    </ItemWrapper>
  );
};
export default () => {
  return (
    <div>
      {imgs.map((item, index) => <Item key={index} />)}
    </div>
  );
}

