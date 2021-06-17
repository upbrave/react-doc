---
order: 3
title: 数据展示
---
### Timeline
```tsx
import React from 'react';
import {Timeline} from 'antd';
export default()=>{
  return (<Timeline>
  <Timeline.Item color="green">新版本迭代会</Timeline.Item>
  <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
  <Timeline.Item color="red">
    <p>联调接口</p>
    <p>功能验收</p>
  </Timeline.Item>

  <Timeline.Item color="#108ee9">
    <p>登录功能设计</p>
    <p>权限验证</p>
    <p>页面排版</p>
  </Timeline.Item>
</Timeline>)
}
```
### Card
```tsx
import React from 'react';
import {Card} from 'antd'
export default ()=>{
  return (
    <Card bordered={false}>
      <div className="pb-m">
        <h3>任务</h3>
        <small>10个已经完成，2个待完成，1个正在进行中</small>
      </div>
    </Card>
  )
}
```
