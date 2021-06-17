function getStyle(obj, sName) {
  return (obj.currentStyle || getComputedStyle(obj, false))[sName];
}

// 构造函数
function Instance(box) {
  this.oContain = document.querySelectorAll(box);
  // 没什么用  只是为了显示
  this.oSon = document.getElementById('_son_larger');
  // 放大的容器
  this.oDiv2 = document.getElementById('_div2_larger');
  // 放大的容器的里面的图片
  this.oImg = document.getElementById('_img_larger');
  // 初始化事件
  this.init();
}

// 添加 事件
// 此处没有使用 事件代理
var addEvent = function (el, type, fn) {
  if (el.length) {
    for (var i = 0; i < el.length; i++) {
      addEvent(el[i], type, fn);
    }
  } else {
    el.addEventListener(type, fn, false);
  }
};

Instance.prototype.init = function () {
  var _self = this;
  // 页面滚动的距离  相对于顶部
  var scrollTop;
  addEvent(this.oContain, 'mouseover', function () {
    //  如果是从网络请求的图片，在这里请求 然后修改 div2 里面的img 的src
    scrollTop = document.documentElement.scrollTop;
    // 设定 div2 的left  与 top
    var left = this.offsetLeft + this.offsetWidth + 10;
    var top = this.offsetTop + (this.offsetHeight - parseInt(getStyle(_self.oDiv2, 'height'))) / 2;
    _self.oDiv2.style.left = left + 'px';
    _self.oDiv2.style.top = top + 'px';
    // 显示
    _self.oSon.style.display = 'block';
    _self.oDiv2.style.display = 'block';
  });
  addEvent(this.oContain, 'mouseout', function () {
    // 隐藏
    _self.oSon.style.display = 'none';
    _self.oDiv2.style.display = 'none';
  });
  addEvent(this.oContain, 'mousemove', function (ev) {
    var oEvent = ev || event;
    scrollTop = document.documentElement.scrollTop;
    // l 小图的left   t 小图的top
    var l = oEvent.clientX - _self.oSon.offsetWidth / 2;
    var t = oEvent.clientY + scrollTop - _self.oSon.offsetHeight / 2;

    // 如果l 小于容器的 offsetLeft  设定临界
    if (l < this.offsetLeft) {
      l = this.offsetLeft;
    }
    if (l > this.offsetLeft + this.offsetWidth - _self.oSon.offsetWidth) {
      l = this.offsetLeft + this.offsetWidth - _self.oSon.offsetWidth;
    }
    if (t < this.offsetTop) {
      t = this.offsetTop;
    }
    if (t > this.offsetTop + this.offsetHeight - _self.oSon.offsetHeight) {
      t = this.offsetTop + this.offsetHeight - _self.oSon.offsetHeight;
    }
    _self.oSon.style.left = l + 'px';
    _self.oSon.style.top = t + 'px';

    //  设定 放大图的位置
    var imgL = (l - this.offsetLeft) * (_self.oImg.offsetWidth - _self.oDiv2.offsetWidth) / (this.offsetWidth - _self.oSon.offsetWidth);
    var imgT = (t - this.offsetTop) * (_self.oImg.offsetHeight - _self.oDiv2.offsetHeight) / (this.offsetHeight - _self.oSon.offsetHeight);
    _self.oImg.style.left = -imgL + 'px';
    _self.oImg.style.top = -imgT + 'px';

  })
};
// 返回函数 ，该函数范围Instance 的实例
export default function (box) {
  return new Instance(box);
};
