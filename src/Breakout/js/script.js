var canvas = document.getElementById("canvas");
// var rowBox = document.getElementById("rowBox");
var c = canvas.getContext("2d");
var tx = window.innerWidth;
var ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty;
var boxWidth = 60;
var boxHeight = 30;
var mousex = 0;
var mousey = 0;
c.strokeWidth = 5;
var moveon = false;
var rowBox = 1;
var score = 0;
var countBox = 0;

document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseDownHandler(e) {
    moveon = true;
}

function mouseUpHandler(e) {
    moveon = false;
}

function mouseMoveHandler(e) {
    var rect = canvas.getBoundingClientRect();
    mousex = e.clientX - rect.left;
    mousey = e.clientY - rect.top;
    // if(moveon){
        // console.log(`mousex`);
        // console.log(mousex);
        // console.log(`mousey`);
        // console.log(mousey);
        if (mousex - 25 > 0) {
            if (mousex + 25 < canvas.width) {
                item[1].x = mousex - 25;
            } else {
                item[1].x = canvas.width - 50;
            }
        } else {
            item[1].x = 0;
        }
    // }
};

class Paddle {
    constructor() {
        this.type = "Paddle";
        this.color = "rgba(255,0,0)";
        this.width = 50;
        this.height = 5;
        this.x = (canvas.width * 0.5) - 25;
        this.y = canvas.height - 5;
    }
    update() {
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.height);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    detection(ball) {
        if(ball.x > this.x  && ball.x < this.x + this.width && ball.y > this.y && ball.y < this.y + this.height) {
            if(ball.x - 1 > this.x && ball.x - 1 < this.x + this.width){
                ball.reverseY();
            } else {
                ball.reverseX();
            }
        }
    }
}
class Box {
    constructor(positionX, positionY){
        this.type = "Box";
        this.color = "rgba(11,100,11)";
        this.width = boxWidth;
        this.height = boxHeight;
        this.x = positionX;
        this.y = positionY;
        this.status = 1;
    }
    update() {
        if(this.status == 1){
            c.beginPath();
            c.rect(this.x, this.y, this.width, this.height);
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
        }
    }
    detection(ball) {
        if(ball.x > this.x  && ball.x < this.x + this.width && ball.y > this.y && ball.y < this.y + this.height) {
            if(ball.x - 1 > this.x && ball.x - 1 < this.x + this.width){
                ball.reverseY();
            } else {
                ball.reverseX();
            }
            countBox--;
            score++;
            this.status = 0;
            console.log(`countBox=>${countBox}`);
            console.log(`score=>${score}`);
        }
    }
} 
class Ball {
    constructor() {
        this.type = "Ball";
        this.color = "rgba(255,255,255)";
        this.radius = 8;
        this.x = canvas.width * 0.5;
        this.y = canvas.height - 20;
        this.dy = 2;
        this.dx = 1;
    }
    update() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    reverseX() {
        this.dx = -this.dx;
    }
    reverseY() {
        this.dy = -this.dy;
    }
    animateMove(paddle) {
        this.y += this.dy;
        this.x += this.dx;
        if(this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius){
            this.reverseX();
        }
        if (this.y + this.dy < this.radius) {
            this.reverseY();
        } else if(this.y + this.dy > canvas.height - this.radius) {
            if(this.x > paddle.x && this.x < paddle.x + paddle.width) {
                this.reverseY();
                if(countBox == 0){
                    rowBox++;
                    GenBox(rowBox);
                }
            } else {
                this.dy = 0;
                this.dx = 0;
                console.log("GAME OVER");
                // document.location.reload();
                // clearInterval(interval); // Needed for Chrome to end game
            }
        }    
    }
}

function GenBox(n) {
    var colBox = Math.round(canvas.width / boxWidth) - 1;
    var marginBox = (canvas.width - (colBox * boxWidth)) / (colBox + 1); 
    countBox += colBox * n;
    item[0].dy = 2 + (n * .5);
    for(var i = 0; i < n; i++) {
        for(var i2 = 0; i2 < colBox; i2++) {
            item.push(new Box((i2 * boxWidth) + (i2 + 1) * marginBox,(i + 1) * 40));
        }
    }
}

var item = [];
item.push(new Ball)
item.push(new Paddle)
GenBox(rowBox)

function animate() {    
    if (tx != window.innerWidth || ty != window.innerHeight) {
        tx = window.innerWidth;
        ty = window.innerHeight;
        canvas.width = tx;
        canvas.height = ty;
    }
    requestAnimationFrame(animate);
    c.clearRect(0, 0, tx, ty);
    for (var i = 0; i < item.length; i++) {
        item[i].update();
        if(item[i].type == "Paddle") {
            item[i].detection(item[0]);
        }
        if(item[i].type == "Ball") {
            item[i].animateMove(item[1]);
        }
        if(item[i].type == "Box") {
            if(item[i].status == 1) {
                item[i].detection(item[0]);
            }
        }
    //forloop end
    }
//animation end
}

animate();

function startBall() {
    rowBox = 1;
    score = 0;
    item = [];
    item.push(new Ball);
    item.push(new Paddle);
    GenBox(rowBox);
}