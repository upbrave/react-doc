import * as React from 'react';

const { useEffect } = React;
export default () => {
  useEffect(() => {
    let navigator: Record<string, any> = window.navigator;
    function getUserMedia(constraints, success, error) {
      if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices
          .getUserMedia({
            audio: { echoCancellation: false },
            video: { facingMode: 'user' }, //调用前置摄像头，后置摄像头使用video: { facingMode: { exact: "environment" } }
          })
          .then(success)
          .catch(error);
      } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error);
      } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
      } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
      }
    }
    let video = document.getElementById('video') as HTMLVideoElement;
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    let context = canvas.getContext('2d');

    function success(stream) {
      //兼容webkit核心浏览器
      let CompatibleURL = window.URL || window.webkitURL;
      //将视频流设置为video元素的源
      console.log(stream);

      //video.src = CompatibleURL.createObjectURL(stream);
      video.srcObject = stream;
      video.play();
    }

    function error(error) {
      console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
    }

    document.getElementById('capture').addEventListener('click', function () {
      const radio = video.videoWidth / video.videoHeight;
      if (480 / 320 > radio) {
        context.drawImage(video, 0, 0, 320 * radio, 320);
      } else {
        context.drawImage(video, 0, 0, 480, 480 / radio);
      }
    });

    if (
      navigator.mediaDevices.getUserMedia ||
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia
    ) {
      //调用用户媒体设备, 访问摄像头
      getUserMedia({ video: { width: 480, height: 320 } }, success, error);
    } else {
      alert('不支持访问用户媒体');
    }
  }, []);

  return (
    <>
      <div>H5调前置摄像头DEMO</div>
      <video
        id="video"
        width="480"
        height="320"
        muted
        controls
        autoPlay
      ></video>
      <div>
        <button id="capture">拍照</button>
      </div>
      <canvas id="canvas" width="480" height="320"></canvas>
    </>
  );
};
