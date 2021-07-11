const asyncReduce = function (arr, callback, initValue, resCallback) {
  var index = 0;
  var last;
  if (arguments.length === 3) {
    if (typeof arguments[2] !== 'function') {
      throw Error('Callback类型必须是函数');
    }
    last = arr[0];
  }
  if (arguments.length === 4) {
    last = initValue === undefined ? arr[0] : initValue;
  }

  var next = function (val) {
    last = val;
    index++;
    if (index >= arr.length) {
      resCallback(last);
      return;
    }
    callback(last, arr[index], next);
  };
  // 递归
  callback(last, arr[index], next);
};

export default asyncReduce;
