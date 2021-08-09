export default function (selector) {
  var range1 = document.createRange();
  var p1 = document.querySelector(selector);
  range1.selectNode(p1);
  var selection = window.getSelection();
  selection.empty();
  selection.addRange(range1);
  document.execCommand('copy');
  selection.empty();
  range1.detach();
  range1 = null;
}
