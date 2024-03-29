const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const hitCanvas = document.createElement('canvas');
const hitCtx = hitCanvas.getContext('2d');

const colorsHash = {};

function getRandomColor() {
 const r = Math.round(Math.random() * 255);
 const g = Math.round(Math.random() * 255);
 const b = Math.round(Math.random() * 255);
 return `rgb(${r},${g},${b})`;
}



const circles = [{
  id: '1', x: 40, y: 40, radius: 10, color: 'rgb(255,0,0)'
}, {
  id: '2', x: 100, y: 70, radius: 10, color: 'rgb(0,255,0)'
}];

circles.forEach(circle => {
	while(true) {
     const colorKey = getRandomColor();
     if (!colorsHash[colorKey]) {
        circle.colorKey = colorKey;
        colorsHash[colorKey] = circle;
        return;
     }
  }
});

circles.forEach(circle => {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = circle.color;
  ctx.fill();
  
  hitCtx.beginPath();
  hitCtx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
  hitCtx.fillStyle = circle.colorKey;
  hitCtx.fill();
});

function hasSameColor(color, shape) {
  return shape.color === color;
}

canvas.addEventListener('click', (e) => {
  const mousePos = {
    x: e.clientX - canvas.offsetLeft,
    y: e.clientY - canvas.offsetTop
  };
  const pixel = hitCtx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
  const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
  const shape = colorsHash[color];
  if (shape) {
     alert('click on circle: ' + shape.id);
  }
 });

// function writeMessage(message) {
//     text.text(message);
//   }

//   var stage = new Konva.Stage({
//     container: 'container',
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   var layer = new Konva.Layer();

//   var text = new Konva.Text({
//     x: 10,
//     y: 10,
//     fontFamily: 'Calibri',
//     fontSize: 20,
//     text: '',
//     fill: 'black',
//   });

//   var circle = new Konva.Circle({
//     x: stage.width() / 2,
//     y: stage.height() / 2 + 10,
//     radius: 70,
//     fill: 'red',
//     stroke: 'black',
//     strokeWidth: 4,
//   });

//   /*
//    * mousedown and touchstart are desktop and
//    * mobile equivalents so they are often times
//    * used together
//    */
//   circle.on('mousedown touchstart', function () {
//     writeMessage('Mousedown or touchstart');
//   });
//   /*
//    * mouseup and touchend are desktop and
//    * mobile equivalents so they are often times
//    * used together
//    */
//   circle.on('mouseup touchend', function () {
//     writeMessage('Mouseup or touchend');
//   });

//   layer.add(circle);
//   layer.add(text);

//   // add the layer to the stage
//   stage.add(layer);