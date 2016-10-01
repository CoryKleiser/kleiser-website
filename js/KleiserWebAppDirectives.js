'use strict';

(function(){
    var pageDirectives = angular.module(`pageDirectives`, []);

    pageDirectives.directive(`drawing`, function(){

     return {
          link: function(scope, element) {
               // : Select canvas element
               var canvas = element[0];

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
                   function (callback) {
                    return setTimeout(callback, 1);
                   };

               // : Draw


               //draw outside triangles
               function drawMainTriangle() {
                ctx.strokeStyle = 'black';
                ctx.fillStyle = '#acffff';
                //outside
                ctx.beginPath();
                ctx.moveTo(3.15, 315);
                ctx.lineTo(160.65, 63);
                ctx.lineTo(319.5, 315);
                ctx.closePath();
                ctx.stroke();
                //inside
                ctx.beginPath();
                ctx.moveTo(9.9, 311.85);
                ctx.lineTo(160.65, 72);
                ctx.lineTo(311.85, 311.85);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = '#ffd2aC';
               }


               //eye thing
               var eye = {
                'x': 160.65,
                'bottomLineY': 117.81,
                'topLineY': 252,
                'irisY': 177.66,
                'pupilY': 176.4,
               };

               //: eye functions
               function eyeOutline(radius) {
                var rad = radius;
                ctx.strokeStyle = 'black';
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(eye.x, eye.bottomLineY, rad, 0.785, 2.356);
                ctx.arc(eye.x, eye.topLineY, rad, 3.927, 5.4979);
                ctx.stroke();
                ctx.fill();
                for (var e = 1; e < 50; e++) {
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
               function drawEye(x, bottomLineY, topLineY, irisY, pupilY) {
                //outline
                var eyeOutlineRadius = 94.5;
                eyeOutline(eyeOutlineRadius);
                //pupil
                ctx.fillStyle = '#38a6a6';
                ctx.beginPath();
                ctx.arc(eye.x, eye.irisY, 28, 5.4979, 3.927);
                ctx.fill();
                ctx.fillStyle = 'black';
                ctx.beginPath();
                ctx.arc(eye.x, eye.pupilY, 17.5, 5.4979, 3.927);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(eye.x - 14, eye.x + 10.5);
                ctx.lineTo(eye.x + 14, eye.x + 10.5);
                ctx.lineTo(eye.x + 21, eye.x - 2.1);
                ctx.lineTo(eye.x - 21, eye.x - 2.1);
                ctx.fill();
                ctx.beginPath()
                ctx.arc(eye.x, eye.irisY, 15, 0, Math.PI * 2);
                ctx.fillStyle = 'fill';
                ctx.fill();
                ctx.beginPath()
                ctx.arc(eye.x, eye.irisY, 7, 0, Math.PI * 2);
                ctx.fillStyle = 'white';
                ctx.fill();
               }

               //fillBackgroundFUnction
               var fill = false;

               function fillTriangleFunction() {
                if (!fill) {
                 fill = true;

                 ctx.fillStyle = '#c7d8ff';
                 ctx.beginPath();
                 ctx.moveTo(9.45, 311.85);
                 ctx.lineTo(160.65, 69.3);
                 ctx.lineTo(311.85, 311.85);
                 ctx.closePath();
                 ctx.fill();
                 drawEye();
                }
                else {
                 fill = false;
                 drawMainTriangle();
                 switcher();
                }
               }


               //small inner triangles
               function fillTriangles() {
                function drawTriangles(max, x, y) {
                 for (x; x < max; x = x + 30.24) {
                  ctx.beginPath()
                  ctx.moveTo(x, y);
                  ctx.lineTo(x + 15.12, y - 24.255);
                  ctx.lineTo(x + 30.24, y);
                  ctx.fill();
                 }
                }

                var x = 10.08;
                var y = 311.22;
                for (var max = 296.73; max >= 144; max = max - 15.12) {
                 drawTriangles(max, x, y);
                 x = x + 15.12;
                 y = y - 24.255;
                }
               }

               function fillInvertedTriangles() {
                function drawInvertedTriangles(max, x, y) {
                 for (x; x < max; x = x + 30.24) {
                  ctx.beginPath()
                  ctx.moveTo(x, y);
                  ctx.lineTo(x + 15.12, y + 24.255);
                  ctx.lineTo(x + 30.24, y);
                  ctx.fill();
                 }
                }

                var x = 25.2;
                var y = 286.965;
                for (var max = 296.73; max >= 144; max = max - 15.12) {
                 drawInvertedTriangles(max, x, y);
                 x = x + 15.12;
                 y = y - 24.255;
                }
               }


               //toggle inner triangles function
               var tan = true;

               function switcher() {
                if (tan) {
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
                 if (fill) {
                  return;
                 }
                 switcher();
                }, 300);
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
                 eye[prop] = current + (distance * progress);
                 if (progress < 1) {
                  requestAnimationFrame(step);
                 }
                 ;
                 return step();

                };
               };


               //TODO: make eye move around triab
               var eyeAnimation = function () {
                // renderEye();
                fillTriangleFunction();
                animateEye(eye.x, 0, 100);
                animateEye(eye.y, 0, 100);
                animateEye(eye.topLineY, 0, 100);
                animateEye(eye.irisY, 0, 100);
                animateEye(eye.pupilY, 0, 100);

               };


               //Do IT!

                drawMainTriangle();
                fillTriangles();
                fillInvertedTriangles();
                document.getElementById('canvas').addEventListener('click', eyeAnimation);
                switcher();
            }
        }
    });
    
    pageDirectives.directive(`deleteContactEvent`, function () {
        return{
            restrict: 'C',
            link: function(scope, element, attrs) {
                element.bind('click', function ($event) {
                    element.parent().remove();
                });
            }
        }
    });
})();