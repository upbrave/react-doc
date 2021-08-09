import * as React from 'react';
import './cssArc.less';
const { useRef } = React;
export default () => {
  const box = useRef(null);
  const change = (e) => {
    const angle = e.target.value;
    console.log(angle);
    box.current.style.transform = `rotate(${Math.max(angle - 180, -177)}deg)`;
    box.current.style.transitionDuration = angle > 90 ? '1s' : '0.5s';
  };

  return (
    <>
      <div className="arc-wrapper-0jo">
        <p className="track-arc"></p>
        <div className="round-box" ref={box}>
          <p className="round"></p>
          <p className="dot-r-box">
            <span className="dot-r"></span>
          </p>
        </div>
        <p className="dot-l-box">
          <span className="dot-l"></span>
        </p>
      </div>
      <input type="range" max={180} defaultValue={0} onChange={change} />
    </>
  );
};
