// : Select canvas element

var canvas = document.getElementById('canvas');

// : Set up canvas for use

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;
var ctx = canvas.getContext('2d');
//animate variable
var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback) {
        return setTimeout(callback, 1);
    };

// : Draw


//draw outside triangles
function drawMainTriangle() {
    ctx.strokeStyle = 'black';
    ctx.fillStyle = '#acffff';
        //outside
    ctx.beginPath();
    ctx.moveTo(4, 400);
    ctx.lineTo(204, 80);
    ctx.lineTo(404, 400);
    ctx.closePath();
    ctx.stroke();
        //inside
    ctx.beginPath();
    ctx.moveTo(12, 396);
    ctx.lineTo(204, 88);
    ctx.lineTo(396, 396);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ffd2aC';
}


//eye thing
var eye = {
    'x': 204,
    'bottomLineY': 149.6,
    'topLineY': 320,
    'irisY': 225.6,
    'pupilY': 224,
};

    //eye functions
function eyeOutline(radius){
    var rad = radius;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(eye.x, eye.bottomLineY, rad, 0.785, 2.356);
    ctx.arc(eye.x, eye.topLineY, rad, 3.927, 5.4979);
    ctx.stroke();
    ctx.fill();
    for (var e=1; e<50; e++) {
        for (var i = 1; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(eye.x, eye.bottomLineY, rad, 0.785, 2.356);
            ctx.arc(eye.x, eye.topLineY, rad, 3.927, 5.4979);
            ctx.stroke();
            rad++;
        }
        rad = radius;
    }
}


//DRAW EYE
function drawEye(x,bottomLineY,topLineY,irisY,pupilY) {
//outline
    var eyeOutlineRadius = 120;
    eyeOutline(eyeOutlineRadius);
        //pupil
    ctx.fillStyle = '#38a6a6';
    ctx.beginPath();
    ctx.arc(eye.x, eye.irisY, 32, 5.4979, 3.927);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(eye.x, eye.pupilY, 20, 5.4979, 3.927);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(eye.x-16,eye.x+12);
    ctx.lineTo(eye.x+16,eye.x+12);
    ctx.lineTo(eye.x+24,eye.x-2.4);
    ctx.lineTo(eye.x-24,eye.x-2.4);
    ctx.fill();
    ctx.beginPath()
    ctx.arc(eye.x, eye.irisY, 15, 0, Math.PI*2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.beginPath()
    ctx.arc(eye.x, eye.irisY, 7, 0, Math.PI*2);
    ctx.fillStyle = 'white';
    ctx.fill();
}

//redBackgroundFUnction
var red = false;
function redTriangleFunction(){
    if (!red){
        red = true;

        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(12, 396);
        ctx.lineTo(204, 88);
        ctx.lineTo(396, 396);
        ctx.closePath();
        ctx.fill();
        drawEye();
    }
    else {
        red = false;
        drawMainTriangle();
        switcher();
    }
}


//small inner triangles
function fillTriangles() {
    function drawTriangles(max, x, y) {
        for (x; x < max; x = x + 38.4) {
            ctx.beginPath()
            ctx.moveTo(x, y);
            ctx.lineTo(x + 19.2, y - 30.8);
            ctx.lineTo(x + 38.4, y);
            ctx.fill();
        }
    }
        var x = 12.8;
        var y = 395.2;
    for (var max = 376.8; max >= 204; max=max-19.2){
        drawTriangles(max,x,y);
        x=x+19.2;
        y=y-30.8;
    }
}
function fillInvertedTriangles() {
    function drawInvertedTriangles(max, x, y) {
        for (x; x < max; x = x + 38.4) {
            ctx.beginPath()
            ctx.moveTo(x, y);
            ctx.lineTo(x + 19.2, y + 30.8);
            ctx.lineTo(x + 38.4, y);
            ctx.fill();
        }
    }

    x = 32;
    y = 364.4;
    for (var max = 376.8; max >= 204; max = max - 19.2) {
        drawInvertedTriangles(max, x, y);
        x = x + 19.2;
        y = y - 30.8;
    }
}


//toggle inner triangles function
var tan = true;
function switcher() {
    if (tan){
        ctx.fillStyle = '#acffff';
        fillTriangles()
        ctx.fillStyle = '#ffd2aC';
        fillInvertedTriangles();
        tan = false;
    }
    else {
        ctx.fillStyle = '#ffd2aC';
        fillTriangles();
        ctx.fillStyle = '#acffff';
        fillInvertedTriangles();
        tan = true;
    }
    drawEye();
    setTimeout(function () {
        if(red){
            return;
        }
        switcher();
    }, 200);
}





//animation fail
    //will return, modify, and update
var renderEye = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawMainTriangle();
    drawEye();
    requestAnimationFrame(renderEye());
}
var animateEye = function (prop, val, duration) {
    var start = new Date().getTime();
    var end = start + duration;
    var current = eye[prop];
    var distance = val - current;
    var step = function () {
        var timestamp = new Date().getTime();
        var progress = Math.min((duration - (end - timestamp)) / duration, 1);
        eye[prop] = current + (distance*progress);
        if (progress < 1) {
            requestAnimationFrame(step);
        };
        return step();

    };
};


//TODO: make eye move around triab
var eyeAnimation = function(){
    // renderEye();
    redTriangleFunction();
    animateEye(eye.x, 0, 100);
    animateEye(eye.y, 0, 100);
    animateEye(eye.topLineY, 0, 100);
    animateEye(eye.irisY, 0, 100);
    animateEye(eye.pupilY, 0, 100);

};



//Do IT!
drawMainTriangle();
fillTriangles();
ctx.fillStyle = 'black';
fillInvertedTriangles();
document.getElementById('canvas').addEventListener('click', eyeAnimation);
switcher();

