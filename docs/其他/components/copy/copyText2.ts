let oInput: any = null;
export default (result: any) => {
  if (!oInput) {
    oInput = document.createElement('input');
    document.body.appendChild(oInput);
    oInput.style.opacity = 0;
    oInput.style.position = 'absolute';
    oInput.style.left = '-2000px';
  }
  oInput.value = result;
  oInput.select();
  document.execCommand('Copy');
};
