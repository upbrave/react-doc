---
order: 4
title: shadow dom
---

- 概念
  - shadow host
  - shadow root
- 创建 shadow-dom
  - attachShadow({ mode: 'open'/'closed' })
  - 添加诸如 style, script,link 标签
  - 添加其他 dom 元素
- 特点
  - 不同的 style 标签并不互相影响
  - 常规节点可以和 shadow 节点互相交换子元素
  - shadow dom 渲染的优先级高于常规 dom
    - 如果为 shadow host 添加一个 shadow root，shadow host 节点原本包含的普通 dom 子节点将不会被渲染
- <slot></slot>标签
  - 类似于 vue 中的 slot，默认的、具名的
  - 通过插槽的方式添加进 shadow dom 的元素，实际上还是位于正常 dom 中的
- 事件转发
  - 和正常元素一样

shadow-dom 中 script 标签不是隔离的，这点和 css 不一样

```tsx
import React from 'react';
const { useEffect } = React;
let seq = 0;
export default () => {
  function createShadowDOM() {
    var container = document.querySelector('#shadow-contaner');
    var div = document.createElement('div');
    div.innerHTML = `
      <div class="shadow-dom" onclick="console.log('接收到影子节点冒泡')">
        如果不支持shadow dom，这句话会显示出来
        <span slot="main1" class="slot-test">这是通过slot插入的内容</span>
        <span>shadom下，原本包含的子节点将不会被渲染</span>
      </div>`;
    container.appendChild(div);
    var root = div.querySelector('.shadow-dom').attachShadow({ mode: 'open' });
    var styleElement = document.createElement('style');
    styleElement.innerHTML = `.container{
      color: ${seq % 2 === 0 ? 'red' : 'blue'}};
    }`;
    root.appendChild(styleElement);
    root.appendChild(createDiv('container1'));
    seq += 1;
  }
  function createDiv() {
    var div = document.createElement('div');
    div.innerHTML = `<div class="container">
              <script>function ddd(){alert(1)}<\/script>
              <button onclick="ddd()">点击冒泡11</button>
              <button onclick="console.log('影子节点点击')">点击冒泡</button>
              <slot onclick="console.log('插槽按钮点击')" name='main1'>这里将备替代</slot>
          </div>`;
    return div;
  }
  return (
    <>
      <div id="shadow-contaner"></div>
      <button onClick={createShadowDOM}>添加shadom元素</button>
    </>
  );
};
```
