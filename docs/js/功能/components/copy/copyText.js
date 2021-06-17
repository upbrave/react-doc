export default function (text) {
  var textarea = document.createElement("textarea"); //创建input对象
  document.body.appendChild(textarea); //添加元素
  textarea.value = text;
  textarea.focus();
  if (textarea.setSelectionRange) {
    textarea.setSelectionRange(0, textarea.value.length); //获取光标起始位置到结束位置
  } else {
    textarea.select();
  }
  try {
    var flag = document.execCommand("copy"); //执行复制
  } catch (eo) {
    var flag = false;
  }
  document.body.removeChild(textarea); //删除元素
  return flag;
}
