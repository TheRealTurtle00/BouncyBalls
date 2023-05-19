// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let redMax = 128;
let greenMax = 256;
let blueMax = 256;
let redMin = 50;
let greenMin = 50;
let blueMin = 50;

let grav = .075;

let ballCount = 25;

let velXMax = 10;
let velYMax = 5;

let jankyBounce = false;
let testBouce = true;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size){
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 *Math.PI);
  ctx.fill();
}

// let testBall = new Ball(50, 100, 4, 4, 'blue', 10);
// testBall.draw();

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  if(this.velX<(-10)){
    this.velX = -10
  }
  if(this.velX>(10)){
    this.velX = 10
  }

  if(this.velY<(-10)){
    this.velY = -10
  }
  if(this.velY>(10)){
    this.velY = 10
  }

  this.x += this.velX;
  this.y += this.velY;
  this.velY += grav;
}

Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < ballList.length; j++) {
    if (!(this === ballList[j])) {
      const dx = this.x - ballList[j].x;
      const dy = this.y - ballList[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + ballList[j].size) {
        // If the balls bounce
        if(jankyBounce == true){
          if(((this.velX<0) && (ballList[j].velX<0)) || ((this.velX>0) && (ballList[j].velX>0))){
            // If they are moving in the same direction
            if(this.velX > ballList[j].velX){
              this.velX = -(this.velX)
              ballList[j].velX = this.velX
            } 
            else {
              ballList[j].velX = -(ballList[j].velX);
              this.velX = ballList[j].velX;
            }
            // The one that is moving faster bounces as normal, the slower one inherits the speed of the faster one
          } 
          else{
            // If they are moving in opposite directions
            this.velX =  -(this.velX);
            ballList[j].velX = -(ballList[j].velX);
            // Bounce as normal
          }
          
  
          if(((this.velY<0) && (ballList[j].velY<0)) || ((this.velY>0) && (ballList[j].velY>0))){
            // If they are moving in the same direction
            if(this.velY > ballList[j].velY){
              this.velY = -(this.velY)
              ballList[j].velY = this.velY
            } 
            else {
              ballList[j].velY = -(ballList[j].velY);
              this.velY = ballList[j].velY;
            }
            // The one that is moving faster bounces as normal, the slower one inherits the speed of the faster one
          } 
          else{
            // If they are moving in opposite directions
            this.velY =  -(this.velY);
            ballList[j].velY = -(ballList[j].velY);
            // Bounce as normal
          }
          } else 
        if(testBouce == true){
          ballList[j].velX = (ballList[j].velX - this.velX);
          this.velX = (ballList[j].velX - this.velX);
          ballList[j].velY = (ballList[j].velY - this.velY);
          this.velY = (ballList[j].velY - this.velY);
          } else {
            this.velX = -this.velX;
            ballList[j].velX = -ballList[j].velX;
            this.velY = -this.velY;
            ballList[j].velY = -ballList[j].velY;
          }
        }
      }
    }
  }
// }

let ballList = [];

while (ballList.length < ballCount){
  let size = random(10,20);
  let ball = new Ball(
    random (0 + size, width -size),
    random (0 + size, height - size),
    random(-(velXMax), velXMax),
    random(-(velYMax), velYMax),
    'rgb(' + random(redMin, redMax) + ',' + random(greenMin, greenMax) + ',' + random(blueMin, blueMax) +')',
    size
  );
  ballList.push(ball);
}

function loop(){
  ctx.fillStyle = `rgba(0, 0, 0, 0.25)`;
  ctx.fillRect(0 , 0, width, height);

  for(let i = 0; i < ballList.length; i++){
    ballList[i].draw();
    ballList[i].update();
    ballList[i].collisionDetect();
  }
  requestAnimationFrame(loop);
}

loop();