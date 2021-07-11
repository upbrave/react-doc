---
order: 2
title: flip 动效
---

### 增删卡片

在某个位置添加卡片
通过 appendChild 添加新卡片，在绘制 render 树绘制完成，但是未渲染到屏幕之前，获取到 dom 的位置信息，进而计算出移动的距离；

<code src="./components/flip/index.tsx"></code>

### 图片放大效果

点击柱子放大图片
<code src="./components/flip/preview.tsx"></code>
