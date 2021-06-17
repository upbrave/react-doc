---
order: 1 
title: cssModule
---

```tsx
import React, { Component } from 'react';
import styles from './components/cssModule.module.less';
console.log(styles);
class Cssmodule extends Component {
  render() {
    return (
      <div className={styles.header}>
        <p>Hello CssModule</p>
      </div>
    );
  }
}

export default Cssmodule;
```
