import * as React from 'react';
import './index.less';
const { useEffect } = React;
export default () => {
  useEffect(() => {
    let listUl = document.querySelector('#list');
    function createLi(index) {
      return `<li class="flip-item" data-index="${index}" >
                        <div class="flip-title">
                            <h3>Title - ${index}</h3>
                            <span  class="icon-btn" title="点击删除">Delete</span>
                        </div>
                        <div class="flip-content">
                            content
                        </div>
                 </li>`;
    }
    // 生成列表
    function createList() {
      // 创建一个长度为2的数组
      let listData = Array.from(Array(2));
      let html = '';
      listData.forEach((item, index) => {
        html += createLi(index);
      });
      listUl.innerHTML = html;
      console.log(html);
    }
    createList();

    const addBtn = document.querySelector('.flip-add');
    const input = document.querySelector('.flip-input') as HTMLInputElement;

    let zIndex = 1;
    addBtn.addEventListener('click', function () {
      let allList = document.querySelectorAll(`.flip-item`);
      let value = Number(input.value);
      if (value > allList.length) {
        value = allList.length;
      }
      update('add', +value);
    });

    listUl.addEventListener('click', function (e) {
      let ele = e.target as HTMLElement;
      if (ele.classList.contains('icon-btn')) {
        let index = ele.parentElement.parentElement.dataset.index;
        update('remove', +index);
      }
    });
    function update(type, index) {
      let transArrBefore = [];
      let transArrAfter = [];
      console.log(index);
      let listEle = document.querySelectorAll(
        `.flip-item:nth-child(n+${+index + 1})`,
      );
      listEle.forEach((item, i) => {
        let rectInfo = item.getBoundingClientRect();
        transArrBefore[i] = [rectInfo.left, rectInfo.top];
      });
      let startDataIndex = index + 1;
      let newCard = null;
      if (type === 'add') {
        // createContextualFragment 返回DocumentFragment
        let newNode = document
          .createRange()
          .createContextualFragment(createLi(index));
        listUl.insertBefore(newNode, listEle[0]);
        startDataIndex += 1;
        newCard = document.querySelector(`.flip-item:nth-child(${+index + 1})`);
        newCard.classList.add('flip-enter-begin');
        newCard.classList.add('active');
      } else if (type === 'remove') {
        let removeNode = document.querySelector(
          `.flip-item:nth-child(${+index + 1})`,
        );
        listUl.removeChild(removeNode);
        startDataIndex -= 1;
      }

      listEle.forEach((item: any, i) => {
        item.classList.remove('active');
        let rectInfo = item.getBoundingClientRect();
        transArrAfter[i] = [rectInfo.left, rectInfo.top];
        item.dataset.index = startDataIndex + i - 1;
        item.querySelector('h3').innerHTML = 'Title-' + item.dataset.index;
        item.style.transform = `translate(${
          transArrBefore[i][0] - transArrAfter[i][0]
        }px, ${transArrBefore[i][1] - transArrAfter[i][1]}px)`;
        // 保证每一排最后一个卡片的z-index比较大一些
        if (transArrBefore[i][1] > transArrAfter[i][1]) {
          item.style.zIndex = ++zIndex;
        }
      });

      requestAnimationFrame(function () {
        listEle.forEach((item: any, index) => {
          item.classList.add('active');
          item.style.transform = ``;
        });
        if (newCard) {
          newCard.classList.remove('flip-enter-begin');
        }
      });
    }
  }, []);

  return (
    <div className="flip-card-container">
      <ul className="flip-list" id="list"></ul>
      <div>
        <input className="flip-input" defaultValue={0} type="number" />
        <button className="flip-add">增加</button>
      </div>
    </div>
  );
};
