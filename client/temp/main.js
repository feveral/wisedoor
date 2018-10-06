'use strict';

const constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  const video = document.querySelector('video');
  video.srcObject = stream;
}

navigator.mediaDevices
  .getUserMedia(constraints)
  .then(handleSuccess)
