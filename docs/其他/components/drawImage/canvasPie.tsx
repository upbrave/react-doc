import * as React from 'react';
const { useEffect } = React;
export default () => {
  useEffect(() => {
    draw({
      color: '#CD853F',
      percentage: 0.8,
      circleColor: 'red',
      radius: 18,
    });
  }, []);
  function draw(config) {
    let canvas = document.getElementById('canvas-pie') as HTMLCanvasElement; //获取canvas
    let ctx = canvas.getContext('2d'); //通过getContext获取画图的环境
    let start = -(Math.PI * 2) / 4; //起始弧度
    let x = 20,
      y = 20; //圆点坐标

    // 画个弧
    ctx.beginPath(); //初始化路径
    let radian = config.percentage * (Math.PI * 2); //计算弧度
    ctx.moveTo(x, y);
    ctx.arc(x, y, config.radius, start, start + radian, false); //根据比例和弧度画圆
    ctx.lineTo(x, y); //连接圆心画线
    ctx.closePath(); // 闭合弧度
    ctx.fillStyle = config.color; //设置圆弧颜色
    ctx.fill(); //填充样式

    // 再画个圆
    ctx.beginPath(); //初始化路径
    ctx.arc(x, y, config.radius, 0, Math.PI * 2, false); //根据比例和弧度画圆
    ctx.strokeStyle = config.circleColor; // 圆圈颜色
    ctx.stroke(); // 线段颜色
  }
  return <canvas id="canvas-pie" width="100" height="100"></canvas>;
};
