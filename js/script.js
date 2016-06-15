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
//Defines the Starting point of the ball
var x = 600;
var y = 500;

//Defines the balls movement in relation to x, y coordinates per 10 milliseconds
var dx = 2;
var dy = -4;

//$('#canvas')[0].getContext("2d");
var ctx;


var WIDTH;
var HEIGHT;

// Paddle
var paddlex;
var paddleh = 35;
var paddlew = 125;

// Paddle movements
var rightDown = false;
var leftDown = false;

// Mouse Controls
var canvasMinX = 0;
var canvasMaxX = 0;

//Interval
var intervalId = 0;

//Brick Stuff
var bricks;
var NROWS = 5;
var NCOLS = 5;
var BRICKWIDTH;
var BRICKHEIGHT = 15;
var PADDING = 8;

// // lives
// var lives = 3;
// // draws the lives onto the screen
// drawLives();
//
// function drawLives() {
//    ctx.font = "16px Arial";
//    ctx.fillStyle = "black";
//    ctx.fillText("Lives: "+lives, canvas.width-150, 150);
// }

// D
function init() {
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  paddlex = WIDTH / 2;
  BRICKWIDTH = (WIDTH/NCOLS) - 1;
  canvasMinX = $("#canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH;
  intervalId = setInterval(draw, 10);
}

// Ball
function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}


// // Trying to make a second ball
// function circle2(x,y,r) {
//   ctx.beginPath();
//   ctx.arc(x, y, r, 0, Math.PI*2, true);
//   ctx.closePath();
//   ctx.fill();
// }


// rectangle
function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  rect(0,0,WIDTH,HEIGHT);
}

function onKeyDown(evt) {
  if (evt.keyCode == 39) rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
}

function onKeyUp(evt) {
  if (evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);


// Mouse Sensitivity
function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = Math.max(evt.pageX - canvasMinX - (paddlew/2), 0);
    paddlex = Math.min(WIDTH - paddlew, paddlex);
  }
}

$(document).mousemove(onMouseMove);

function initbricks() {
    bricks = new Array(NROWS);
    for (i=0; i < NROWS; i++) {
        bricks[i] = new Array(NCOLS);
        for (j=0; j < NCOLS; j++) {
            bricks[i][j] = 1;
        }
    }
}

function drawbricks() {
  for (i=0; i < NROWS; i++) {
    ctx.fillStyle = rowcolors[i];
    for (j=0; j < NCOLS; j++) {
      if (bricks[i][j] == 1) {
        rect((j * (BRICKWIDTH + PADDING)) + PADDING,
             (i * (BRICKHEIGHT + PADDING)) + PADDING,
             BRICKWIDTH, BRICKHEIGHT);
      }
    }
  }
}

//END LIBRARY CODE


var ballr = 6;
var rowcolors = ["#0800FF", "#1912FF", "#2923D9", "#4742EB", "#645FFA", "#A3A0FA", "#D8D6FF"];
var paddlecolor = "#FF0381";
var ballcolor = "#FF0000";
var backcolor = "#00FF15";

function draw() {
  ctx.fillStyle = backcolor;
  clear();
  ctx.fillStyle = ballcolor;
  circle(x, y, ballr);

  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  ctx.fillStyle = paddlecolor;
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);

  drawbricks();

// collision detection
  rowheight = BRICKHEIGHT + PADDING;
  colwidth = BRICKWIDTH + PADDING;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
  //reverse the ball and mark the brick as broken
  if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
    dy = -dy;
    bricks[row][col] = 0;
  }

  if (x + dx + ballr > WIDTH || x + dx - ballr < 0)
    dx = -dx;

  if (y + dy - ballr < 0)
    dy = -dy;
  else if (y + dy + ballr > HEIGHT - paddleh) {
    if (x > paddlex && x < paddlex + paddlew) {
      //move the ball differently based on where it hit the paddle
      dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
      dy = -dy;
    }
    else if (y + dy + ballr > HEIGHT)
      clearInterval(intervalId);
  }

  var score = 0;
   //Draws score on screen
   drawScore();

   // Draw teh score on canvas
   function drawScore() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "black";
      ctx.fillText("Score: "+score, 8, 20);
   }

   // if score = 0 then alert and load lvl 2
   if(score == NROWS*NCOLS) {
      win.play();
      alert("lvl 2");
      document.location="lvl2.html";
   }

// How do I write a loop with the break break to up the score by 1 per brick break
   for (i = 0; i < NROWS + NCOLS.length; i ++);

  x += dx;
  y += dy;
}

init();
initbricks();
