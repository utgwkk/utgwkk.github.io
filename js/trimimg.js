var ctx, canvas;
var sx, sy;
var oldex, oldey;
var image;

function drag (evt) {
  ctx.clearRect(sx, sy, oldex-sx, oldey-sy);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  oldex = evt.offsetX;
  oldey = evt.offsetY;
  ctx.strokeRect(sx, sy, oldex-sx, oldey-sy);
}

function dragStart (evt) {
  if (evt.button != 0) return false;
  sx = evt.offsetX;
  sy = evt.offsetY;
  oldex = sx;
  oldey = sy;
  ctx.strokeStyle = '#FF0000';
  canvas.addEventListener('mousemove', drag);
  canvas.addEventListener('mouseup', dragEnd);
}

function dragEnd (evt) {
  var ex = evt.offsetX;
  var ey = evt.offsetY;
  canvas.removeEventListener('mousemove', drag);
  if (sx == ex && sy == ey) return true;
  // canvas.removeEventListener('mousedown', dragStart);
  // canvas.removeEventListener('mouseup', dragEnd);
  var width, height;
  if (sx > ex) {
    width = sx - ex;
    sx = ex;
    if (sy > ey) {
      height = sy - ey;
      sy = ey;
    } else {
      height = ey - sy;
    }
  } else {
    width = ex - sx;
    if (sy > ey) {
      height = sy - ey;
      sy = ey;
    } else {
      height = ey - sy;
    }
  }
  // console.log(sx,sy,width,height);
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, sx, sy, width, height, 0, 0, width, height);
  document.getElementById('canvas_image').src = canvas.toDataURL();
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);
  // canvas.classList.remove('trimable');
  ctx.strokeStyle = '#FF0000';
  ctx.strokeRect(sx, sy, width, height);
}

window.addEventListener('DOMContentLoaded', function () {
  canvas = document.getElementById('image');
  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
    document.getElementById('fileUploader').addEventListener('change', function (evt) {
      var file = evt.target.files[0];
      if (!file.type.match('image.*')){
        return false
      }
      var reader = new FileReader();
      reader.addEventListener('load', function (evt) {
        image = new Image();
        image.src = evt.target.result;
        image.addEventListener('load', function () {
          canvas.classList.add('trimable');
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          canvas.addEventListener('mousedown', dragStart);
        });
      });
      reader.readAsDataURL(file);
    });
    // document.getElementById('openUrl').addEventListener('click', function (evt) {
    //   var xhr = new XMLHttpRequest();
    //   xhr.open("GET", document.getElementById('url').value, true);
    //   xhr.send(null);
    //   xhr.addEventListener('load', function (evt) {
    //     console.log(xhr);
    //   });
    // });
  }
});
