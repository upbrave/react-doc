---
order: 2
title: flex
---

### flex 子元素的宽度

flex 中元素的宽度规则：

> content —> width —> flex-basis (limted by max|min-width)

这其中最重要的是 flex-basis，flex-basis 受到到 max|min-width 的限制；

如果 flex-basis 未设置,就该 width 属性上场了;

如果 width 也未设置，元素自身的宽度起作用

### flex:1 等宽

首先 `flex:1` 是 `flex-basis:0%; flex-grow:1; flex-shrink:1`的缩写

flex-basis 是什么？

flex-basis 在分配多余空间之前，元素占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间；

如果所有元素的 flex-basis 是 0%，在原始占有空间比容器小的情况下，剩余空间就是整个容器，然后根据 flex-grow:1，元素将平分容器空间。

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import styles from './styles/flex.module.less';
export default () => (
  <>
    <div className={styles.box} style={{ display: 'flex' }}>
      <div className={styles.item} style={{ flex: 1 }}>
        1
      </div>
      <div className={styles.item} style={{ flex: 1 }}>
        2222
      </div>
    </div>
  </>
);
```

#### 出现不等宽

如果根据 flex-basis 分配的空间不足，将会挤占其他元素的多余空间，导致其他元素 shrink

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import styles from './styles/flex.module.less';
export default () => (
  <>
    <div className={styles.box} style={{ display: 'flex' }}>
      <div className={styles.item} style={{ flex: 1, whiteSpace: 'nowrap' }}>
        1---------------------------------------------0000
      </div>
      <div className={styles.item} style={{ flex: 1 }}>
        2222
      </div>
    </div>
  </>
);
```

#### 解决不等宽

- 文字不换行导致宽度太宽，可以设置 work-break 、white-space
- 如果元素的子元素太宽导致空间不足，可以给元素设置 width:0 属性来约束元素的宽度

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import styles from './styles/flex.module.less';
export default () => (
  <>
    <div className={styles.box} style={{ display: 'flex' }}>
      <div className={styles.item} style={{ flex: 1, width: 0 }}>
        <div style={{ width: 400, height: 1, background: 'red' }}></div>
      </div>
      <div className={styles.item} style={{ flex: 1 }}>
        2222
      </div>
    </div>
  </>
);
```

### flex-shrink 收缩计算

```
子项收缩宽度 = 子项收缩比例 * 溢出宽度
子项收缩比例 = (子项宽度 * 子项flex-shrink) / 所有(子项的宽度 * flex-shrink系数)之和
```

通过上面公式可以看出，溢出的越多，收缩的越多

### max/min-width

max-width 限制了 flex-grow 最大宽度

min-width 限制了 flex-shrink 的最小宽度

### margin 在 flex 中的应用

##### 按钮放到最右边

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import styles from './styles/flex.module.less';
export default () => (
  <>
    <div className={styles.box} style={{ display: 'flex' }}>
      <div className={styles.item} style={{ width: 100 }}>
        输入框input
      </div>
      <div className={styles.item} style={{ width: 100 }}>
        下拉框select
      </div>
      <div className={styles.item} style={{ marginLeft: 'auto', width: 50 }}>
        Button
      </div>
    </div>
  </>
);
```

##### 模拟 space-around

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import styles from './styles/flex.module.less';
export default () => (
  <>
    <div className={styles.box} style={{ display: 'flex' }}>
      <div className={styles.item} style={{ width: 100, margin: 'auto' }}>
        1
      </div>
      <div className={styles.item} style={{ width: 100, margin: 'auto' }}>
        2
      </div>
      <div className={styles.item} style={{ width: 100, margin: 'auto' }}>
        3
      </div>
    </div>
  </>
);
```

### flex 其他

- flex 内部元素之间的换行符不占空间
