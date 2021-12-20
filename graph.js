
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

 function sleep1() {
    var d = new Date();
    var n = d.getTime();
    var n1 = n
    while((n1-n)<50){
        var e= new Date();
        n1 = e.getTime();

    }
  }

 //xtransformation
function transX(x){
    return originX+(x/xUnitsPerPixel)
}
//ytransformation
function transY(y){
    return originY-(y/yUnitsPerPixel)
}


//Connection between canvases and variables
var canvas1 = document.getElementById("firstCanvas");
var ctx1 = canvas1.getContext("2d");
var canvas2 = document.getElementById("secondCanvas");
var ctx2 = canvas2.getContext("2d");


//setting graph's ranges
var xMin=-4.5;
var xMax=20.2;
var yMin=-12.2;
var yMax=4.2;

//for loop count
var dt=0.01;
var loopCount=Math.trunc((xMax-xMin)/dt);
var initialLoopValue=Math.trunc(xMin/dt)-1;

//setting scales and origin
xUnitsPerPixel=(xMax-xMin)/canvas1.width;
yUnitsPerPixel=(yMax-yMin)/canvas1.height;
var originX=(-xMin)/xUnitsPerPixel;
var originY=(yMax)/yUnitsPerPixel;



//Main script(dyanmics)
var x1=0;
var y1=0;


//sphere Draw
function sphereDynamics(a,b){
    ctx2.beginPath();
    ctx2.arc(transX(a),transY(b),4,0,Math.PI*2);
    ctx2.fillStyle="blue";
    ctx2.fill();
}

//guitar string draw
function guitarstring(a){
    ctx2.beginPath();
    ctx2.moveTo(transX(a),transY(yMin));
    ctx2.lineTo(transX(a),transY(yMax));
    ctx2.strokeStyle="white";
    ctx2.lineWidth=1.5;
    ctx2.stroke();
}

class sphere{
    constructor(x,y,dx){
    this.x=x;
    this.y=y;
    this.dx=dx;
    }
}
var particleData=[];
for(i=0;i<=35;i++){
    var particleDataY=[];
    for(j=0;j<=20;j++){
    sphere1= new sphere(0.6*i,-0.4*j);
    particleDataY.push(sphere1);
    }
    particleData.push(particleDataY);
}




var t=0;
var w=0.7;
var A=0.5;
async function motion(){
for(t=0;t<=100000;t++){
    await sleep(10);
    ctx2.clearRect(0,0,canvas2.width,canvas2.height);
    guitarstring(-0.6+A*Math.sin(w*t*0.1+0.6));
    for(i=0;i<=35;i++){
        for(j=0;j<=20;j++){
        x1=A*Math.sin(w*t*0.1-0.6*i);
        particleData[i][j].dx=x1;
        sphereDynamics(particleData[i][j].x+particleData[i][j].dx,particleData[i][j].y);
        }
    }


}

}

//image load
image= new Image();
image.src="guitar.jpg";
image.onload = function(){
    ctx1.drawImage(image, 0, 0);
  }

motion();

var canvas3 = document.getElementById("thirdCanvas");
var ctx3 = canvas3.getContext("2d");
function writeMessage(canvas3, message,pos_x,pos_y) {
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    ctx3.font = '14px arial';
    ctx3.fillStyle = 'black';
    ctx3.fillText('('+message+')', pos_x,pos_y);
    ctx3.beginPath();
    ctx3.arc(pos_x-4, pos_y-4, 3, 0, 2*Math.PI);
    ctx3.fillStyle = "red";
    ctx3.fill();
  }
  function getMousePos(canvas, evt) {
    var rect = canvas3.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
 //xtransformation from canvas frame
 function transX_from_canvas(x){
    return (x-4-originX)*xUnitsPerPixel
}
//ytransformation from canvas frame
function transY_from_canvas(y){
    return (originY-y+4)*yUnitsPerPixel
}

  canvas3.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas3, evt);
    var message = transX_from_canvas(mousePos.x).toFixed(2) + ',' + transY_from_canvas(mousePos.y).toFixed(2);
    writeMessage(canvas3, message,mousePos.x,mousePos.y);
  }, false);
