import * as React from 'react';
import './preview.less';
const { useEffect } = React;
export default () => {
  useEffect(() => {
    let img = document.querySelector('#preview-img') as HTMLImageElement;
    // 获取dom元素
    let bg = document.querySelector('#preview-bg') as HTMLDivElement;

    // 通过canvas 仿造图片
    let createImg = (width, height, color) => {
      let data;
      let canvas = document.createElement('canvas');
      canvas.style.opacity = '0';
      canvas.style.position = 'absolute';
      canvas.style.left = '-2000px';

      document.body.appendChild(canvas);

      canvas.height = height;
      canvas.width = width;
      let ctx = canvas.getContext('2d');

      ctx.rect(0, 0, width, height);
      ctx.fillStyle = '#' + color;
      ctx.fill();

      data = canvas.toDataURL('image/png');

      document.body.removeChild(canvas);

      return data;
    };

    // 获取在 200-900之间的随机整数
    function getSize() {
      return Math.round(Math.random() * 700 + 200);
    }

    // 生成初始测试数据
    let listData = Array.from(Array(10)).map(() => {
      const width = getSize();
      const height = getSize();
      return {
        width,
        height,
        bgPic: createImg(width, height, color16()),
      };
    });

    // 生成随机 16进制颜色
    function color16() {
      return ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(
        -6,
      );
    }

    let listUl = document.querySelector('#preview-list');
    // 生成列表
    function createList() {
      let html = '';
      listData.forEach((item, index) => {
        html += `<li class="pic-item" data-index="${index}" > <img  src="${item.bgPic}" class="pic" alt="" /></li>  `;
      });
      listUl.innerHTML = html;
    }

    createList();

    let initTransform = '';

    // 点击li触发click事件
    // 此处为什么使用li 而不是img ？ 原因是img标签上有一个伪类before，这个before是覆盖在img上导致点击的时候点在了before上，  获取不到元素
    listUl.addEventListener(
      'click',
      function (e: any) {
        if (e.target.tagName.toLowerCase() === 'li') {
          // 记录动画起始状态的元素位置信息，left, top
          let index = e.target.dataset.index;
          // 临时记录位置信息
          const preRect = e.target.getBoundingClientRect();

          img.classList.add('show');
          bg.classList.add('show');

          img.src = listData[index].bgPic;
          img.style.transform = 'translate3d(0, 0, 0) scale(1)';

          const nextRect = img.getBoundingClientRect();
          // First与Last两个状态之间的缩放比例
          let scaleValue = preRect.width / nextRect.width;
          initTransform = `translate3d(${preRect.left - nextRect.left}px, ${
            preRect.top - nextRect.top
          }px, 0) scale(${scaleValue})`;
          img.style.transform = initTransform;

          img.style.opacity = '0';
          // 避免和上面的代码同一帧渲染
          requestAnimationFrame(function () {
            img.classList.add('active');
            img.style.transform = 'translate3d(0, 0, 0) scale(1)';
            img.style.opacity = '1';
            bg.style.opacity = '.38';
          });
        }
      },
      false,
    );

    let isBgClosing = false;
    let isImgClosing = false;
    img.addEventListener(
      'click',
      function () {
        this.style.transform = initTransform;
        this.style.opacity = '0';
        bg.style.opacity = '0';
        isImgClosing = true;
        isBgClosing = true;
      },
      false,
    );
    img.addEventListener('transitionend', function () {
      if (isImgClosing) {
        this.classList.remove('active', 'show');
        isImgClosing = false;
      }
    });
    bg.addEventListener(
      'click',
      function () {
        this.style.opacity = '0';
        img.style.transform = initTransform;
        img.style.opacity = '0';
        isBgClosing = true;
        isImgClosing = true;
      },
      false,
    );
    bg.addEventListener('transitionend', function () {
      if (isBgClosing) {
        this.classList.remove('show');
        isBgClosing = false;
      }
    });
  }, []);
  return (
    <div className="container">
      <ul className="pic-list" id="preview-list"></ul>
      <div className="preview-box" id="preview-bg"></div>
      <img src="" alt="" className="img" id="preview-img" />
    </div>
  );
};
