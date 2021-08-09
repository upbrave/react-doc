import * as React from 'react';
import './cssArc.less';
const { useRef, useEffect, useState } = React;
export default () => {
  const box = useRef(null);
  const ctxRef = useRef(null);
  const requestRef = useRef(null);
  const [currentAngle, setAngle] = useState(0);
  useEffect(() => {
    ctxRef.current = box.current.getContext('2d');
    draw(0, 0);
  }, []);
  const trackW = 6;
  const rx = 500;
  const ry = 500;
  const radius = 400;
  const innerLineW = 20;

  function draw(toAngle, currentAngle) {
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, box.current.width, box.current.height);
    // 先画一个半圆轨道
    ctx.beginPath();
    ctx.strokeStyle = '#ad80fc';
    ctx.lineWidth = trackW;
    ctx.arc(rx, ry, radius, Math.PI, 0, false);
    ctx.stroke();

    // 画进度
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#fe4d55';
    ctx.lineWidth = innerLineW;
    ctx.arc(
      rx,
      ry,
      radius,
      Math.PI,
      ((+currentAngle + 180) / 180) * Math.PI,
      false,
    );
    ctx.stroke();

    if (currentAngle === toAngle) {
      return;
    }

    if (Math.abs(currentAngle - toAngle) > 4) {
      const step = (toAngle > 90 ? 4 : 2) * (currentAngle < toAngle ? 1 : -1);
      currentAngle += step;
    } else {
      currentAngle = toAngle;
    }
    setAngle(currentAngle);
    requestRef.current = requestAnimationFrame(() => {
      draw(toAngle, currentAngle);
    });
  }

  const change = (e) => {
    const angle = e.target.value;
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    draw(+angle, +currentAngle);
  };

  return (
    <>
      <canvas
        width="1000"
        height="600"
        ref={box}
        style={{ width: 500, height: 300 }}
      ></canvas>
      <input type="range" max={180} defaultValue={0} onChange={change} />
    </>
  );
};
