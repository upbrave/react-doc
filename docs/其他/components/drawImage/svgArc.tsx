import * as React from 'react';

const { useEffect, useRef } = React;
export default () => {
  // svg绘制控逻辑
  const svgRadius = 200;
  const svgStartX = 10;
  const svgStartY = 255;
  const strokeWidth = '4';
  const outerStrokeColor = '#ad80fc';
  // 圆心坐标
  const x0 = svgRadius + svgStartX;
  const y0 = svgStartY;
  const outRef = useRef(null);
  const innerRef = useRef(null);
  useEffect(() => {
    const outerArc = outRef.current;
    outerArc.setAttribute('stroke', outerStrokeColor);
    outerArc.setAttribute('stroke-width', strokeWidth);
    outerArc.setAttribute(
      'd',
      `m${svgStartX} ${svgStartY} A${svgRadius} ${svgRadius} 0 0 1 ${
        svgStartX + 2 * svgRadius
      } ${svgStartY}`,
    );

    const innerArc = innerRef.current;
    innerArc.setAttribute('stroke-width', +strokeWidth * 2 + '');
  }, []);
  function runSvg(angle) {
    const innerArc = innerRef.current;
    const endX = x0 + svgRadius * Math.cos(angle);
    const endY = y0 + svgRadius * Math.sin(angle);
    innerArc.style.transition = 'none';
    innerArc.setAttribute('stroke', outerStrokeColor);
    innerArc.setAttribute(
      'd',
      `m${svgStartX} ${svgStartY} A${svgRadius} ${svgRadius} 0 0 1 ${endX} ${endY}`,
    );
    const pathLength = innerArc.getTotalLength();
    innerArc.style.strokeDasharray = pathLength;
    innerArc.style.strokeDashoffset = pathLength;
    innerArc.setAttribute('d', '');
    setTimeout(() => {
      innerArc.style.transition = `stroke-dashoffset ${
        angle > 1.5 * Math.PI ? '1' : '0.5'
      }s ease-in`;
      innerArc.setAttribute('stroke', '#05D380');
      innerArc.setAttribute(
        'd',
        `m${svgStartX} ${svgStartY} A${svgRadius} ${svgRadius} 0 0 1 ${endX} ${endY}`,
      );
      innerArc.style.strokeDashoffset = 0;
    }, 0);
  }

  const change = (e) => {
    const angle = e.target.value;
    runSvg(((+angle + 180) / 180) * Math.PI);
  };
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ width: 500, height: 300 }}
      >
        <path fill="none" strokeLinecap="round" ref={outRef} />
        <path fill="none" strokeLinecap="round" ref={innerRef} />
      </svg>
      <input type="range" max={180} defaultValue={0} onChange={change} />
    </>
  );
};
