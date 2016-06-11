//get a reference to the canvas
var ctx = $('#canvas')[0].getContext("2d");

//Circles
// ctx.fillStyle = "#00A308";
// ctx.beginPath();
// ctx.arc(220, 220, 50, 0, Math.PI*2, true);
// ctx.closePath();
// ctx.fill();

// ctx.fillStyle = "#FF1C0A";
// ctx.beginPath();
// ctx.arc(100, 100, 100, 0, Math.PI*2, true);
// ctx.closePath();
// ctx.fill();
//
// //ghost rectangle
// ctx.fillStyle = "rgba(255, 255, 0, .5)"
// ctx.beginPath();
// ctx.rect(15, 150, 120, 120);
// ctx.closePath();
// ctx.fill();


//BEGIN LIBRARY CODE
var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var ctx;
var WIDTH;
var HEIGHT;
var paddlex;
var paddleh = 10;
var paddlew = 75;
var intervalId = 0;


function init() {
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  return setInterval(draw, 10);
}

function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init() {
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width()
  HEIGHT = $("#canvas").height()
  paddlex = WIDTH / 2;
  intervalId = setInterval(draw, 10);
}

//END LIBRARY CODE


function init_paddle() {
  paddlex = WIDTH / 2;
  paddleh = 10;
  paddlew = 75;
}

rightDown = false;
leftDown = false;

//set rightDown or leftDown if the right or left keys are down
function onKeyDown(evt) {
  if (evt.keyCode == 39) rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
}

//and unset them when the right or left key is released
function onKeyUp(evt) {
  if (evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

//Make it bounce
//Make the paddle
function draw() {
  clear();
  circle(x, y, 10);

  //move the paddle if left or right is currently pressed
  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);

  if (x + dx > WIDTH || x + dx < 0)
    dx = -dx;

  if (y + dy < 0)
    dy = -dy;
  else if (y + dy > HEIGHT) {
    if (x > paddlex && x < paddlex + paddlew)
      dy = -dy;
    else
      clearInterval(intervalId);
  }

  x += dx;
  y += dy;
}

init();
