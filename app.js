let startButton = document.getElementById("startButton").addEventListener("click", function() {
    document.getElementById("introContainer").style.display = "none";
})

let game = document.getElementById("game");
let ctx = game.getContext("2d");

game.setAttribute("width", getComputedStyle(game)["width"]);
game.setAttribute("height", getComputedStyle(game)["height"]);


function Thing(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.alive = true;
    this.hit = true;
    this.render = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
// console.log(game.width)
// console.log(game.height)

let player = new Thing(50, 450, "white", 30, 30);

// Creating Creeps
let creeps = [
    creep1 = new Thing(380, 70, "red", 30, 30),
    creep2 = new Thing(150, 350, "blue", 30, 30),
    creep3 = new Thing(250, 150, "green", 30, 30),
    creep4 = new Thing(360, 400, "gray", 30, 30),
    creep5 = new Thing(650, 150, "hotpink", 30, 30),
    creep6 = new Thing(700, 430, "orange", 30, 30),
    creep7 = new Thing(490, 300, "yellow", 30, 30)
    // creep5 = new Thing(500, 0, "red", 30, 30),
    // creep5 = new Thing(500, 0, "red", 30, 30),
    // creep5 = new Thing(500, 0, "red", 30, 30),
    // creep5 = new Thing(500, 0, "red", 30, 30),
] 
// let creeps = [];
// for(let i = 0; i < 10; i++){
    
//     creeps[i] = new Thing(Math.floor(Math.random()*(game.width-20)), Math.floor(Math.random()*(game.height-20)), "red", 30, 30);
    // TODO: write creep dance function which makes them move circularly
// }
//creating an array of wall
let walls = [
    wall1 = new Thing(0, 200, "black", 180, 50),
    wall2 = new Thing(640, 350, "black", 50, 180),
    wall3 = new Thing(700, 250, "black", 180, 50),
    wall4 = new Thing(300, 200, "black",50, 300),
    wall5 = new Thing(500, 0, "black", 50, 250)
] 


let finishLine = new Thing(700, 0, "green", 200, 100);


let moveCount = 0;
//if count is even move right or else move left if count is odd
function dancingCreeps() {
    if(moveCount % 10 === 0){
        creeps.forEach(function(creep) {
            creep.x +=5;
        })
    } else if (moveCount % 10 === 5 ) {
        creeps.forEach(function(creep) {
            creep.x -=5;
        })
    }
}

function movementHandler(e) {
    switch (e.keyCode) {
        case (87):
            //if player.y is negative then dont move up
            // if (!checkWallCollision(87)) { move up }
            if (!(player.y <= 0) && checkWallCollision())  {
                player.y -=10;
            }
            break;
        case (65):
            if (!(player.x <= 0) && checkWallCollision()) {
                player.x -=10;
            }
            break;
        case (83):
            if (!(player.y >= 475) && checkWallCollision()) {
                player.y +=10;
            }
            break;
        case (68):
            if (!(player.x >= 970) && checkWallCollision()) {
                player.x +=10;   
            }
    }
}

document.addEventListener("keydown", movementHandler);
//Detect when play runs into creeps
function detectCreepHit() {
    creeps.forEach(function(creep) {
        if (player.x < creep.x + creep.width &&
            player.x + player.width > creep.x &&
            player.y < creep.y + creep.height &&
            player.y + player.height > creep.y) {
                player.alive = false;
            }
                //run end game function
         })  
}  
// Detect when player runs into walls
function checkWallCollision() {
    // switch statement checking direction
    var isItTrue = true
    walls.forEach(function (wall) {
        if (player.x < wall.x + wall.width &&
            player.x + player.width > wall.x &&
            player.y < wall.y + wall.height &&
            player.y + player.height > wall.y) {
                isItTrue = false;
             } 
        })
    return isItTrue
}

function gameLoop() {
    
    ctx.clearRect(0, 0, game.width, game.height);
  if(player.alive) {
      player.render();
  }
   
    creeps.forEach(function(creep){
        if(creep.alive){
            dancingCreeps();
            creep.render();
        } 
        detectCreepHit();
    })
    walls.forEach(function(wall){
        wall.render();
    })
    // wall1.render();
    // wall2.render();
    // wall3.render();
    // wall4.render();
    // wall5.render();
    checkWallCollision();
    finishLine.render();
    moveCount++;
}
let runGame = setInterval(gameLoop, 100);

