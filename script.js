var canvas = document.getElementById('myCanvas');
let back = document.getElementById('back');
let stroke = document.getElementById('stroke');
let fpick = document.getElementById('font-size-picker');

var ctx = canvas.getContext('2d');
 /*rendering context required, canvas in it self is just a container which does not have graphical changing capabilities */

document.getElementById('cleary').addEventListener('click',()=>{

    clear(ctx,canvas,fpick);
})





back.addEventListener('input',()=>{
ctx.fillStyle = back.value;
ctx.fillRect(0,0,canvas.width,canvas.height);
});

let brushSize = 10;


fpick.addEventListener('change',(e)=>{

    brushSize = parseInt(e.target.value);
});

let drawing = false;
let lastX,lastY;



canvas.addEventListener("mousemove", (e) => {
    if (drawing) {
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.strokeStyle = stroke.value;
      ctx.lineWidth = brushSize;
      ctx.stroke();
      lastX = e.offsetX;
      lastY = e.offsetY;
    }
  });

  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
  });

  canvas.addEventListener("mouseup", () => {
    drawing = false;
  });

  function clear(ctx,canvas,fpick){

    ctx.clearRect(0,0,canvas.width,canvas.height);
    back.value = '#000000';
    stroke.value = '#000000';
    fpick.selectedIndex = 2;

  }

  const saves = document.getElementById('svy');

  saves.addEventListener('click', ()=>{

    localStorage.setItem('canvasContents',canvas.toDataURL());

    let link = document.createElement('a');
    link.download = 'my-canvas.png';

    link.href = canvas.toDataURL();

    link.click();


  })
  
  const retr = document.getElementById('ret');

  retr.addEventListener('click',()=>{

    let savedCanvas = localStorage.getItem('canvasContents');

    if(savedCanvas){
        let img = new Image();
        // img.src = savedCanvas;
        img.onload = function(){

            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(img,0,0);
        };
        img.src = savedCanvas;
    }
  });