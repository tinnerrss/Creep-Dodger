
let startButton = document.getElementById("startButton");startButton.addEventListener("click", function() {
    document.getElementById("popUpContainer").style.display = "none";
})
let nextLevelButton = document.getElementById("nextLevel");nextLevelButton.style.display = "none";

let game = document.getElementById("game");
let ctx = game.getContext("2d");

game.setAttribute("width", getComputedStyle(game)["width"]);
game.setAttribute("height", getComputedStyle(game)["height"]);

let creepImage1 = new Image();
creepImage1.src = "https://vignette.wikia.nocookie.net/johnnybravo/images/b/bb/Johnnyb001.gif/revision/latest/scale-to-width-down/340?cb=20190421193227";
let creepImage2 = new Image();
creepImage2.src = "https://media.giphy.com/media/l1J9ASb54AziiHSVi/giphy.gif";
let playerImage = new Image();
playerImage.src = "https://cdn4.iconfinder.com/data/icons/faces-10/96/Smiley-512.png";


let level = 1;



//function to create objects with images
function Thing(image, x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.image = image;
    this.alive = true;
    this.hit = true;
    this.render = function() {
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
    }
}

function WallThing(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.hit = true;
    this.render = function() {
        ctx.fillStyle = this.color;
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.fillRect(this.x, this.y, this.width,this.height);
    }
}
//function to create object that are colored rectangles
let player = new Thing(playerImage, 700, 220, "white", 30, 30);
// Creating Creeps
let creeps = [
    creep1 = new Thing(creepImage1, 380, 70, "red", 30, 30),
    creep2 = new Thing(creepImage1, 150, 350, "blue", 30, 30),
    creep3 = new Thing(creepImage1, 250, 150, "green", 30, 30),
    creep4 = new Thing(creepImage1, 360, 400, "gray", 30, 30),
    creep5 = new Thing(creepImage1, 650, 150, "hotpink", 30, 30),
    creep6 = new Thing(creepImage1, 700, 430, "orange", 30, 30),
    creep7 = new Thing(creepImage1, 490, 300, "yellow", 30, 30)
] 
//creating an array of wall
let walls = [
    wall1 = new WallThing(0, 200, "black", 180, 50),
    wall2 = new WallThing(640, 350, "black", 50, 180),
    wall3 = new WallThing(700, 250, "black", 180, 50),
    wall4 = new WallThing(300, 200, "black",50, 300),
    wall5 = new WallThing(500, 0, "black", 50, 250)
] 
let finishLine = new WallThing(700, 0, "gray", 200, 100);


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
            if (!(player.y <= 0))  {
                player.y -=10;
            }
            break;
        case (65):
            if (!(player.x <= 0)) {
                player.x -=10;
            }
            break;
        case (83):
            if (!(player.y >= 475)) {
                player.y +=10;
            }
            break;
        case (68):
            if (!(player.x >= 970)) {
                player.x +=10;   
            }
    }
}

                
document.addEventListener("keydown", movementHandler);

function gameInit() {
    console.log("gameinit working?")
    player.alive = true;
    player.render();
    creeps.forEach(function(creep) {
        creep.alive = true;
        creep.render();
    })
    walls.forEach(function(wall) {
        wall.render();
    })
    finishLine.render();
    gameLoop();
    setInterval(runGame);
}

function win() {
    document.getElementById("popUpContainer").style.display = "initial";
    document.getElementById("popUpTitle").innerText = "You Made It!";
    document.getElementById("intro").innerText = "Yaaayyyy you dogded the creeps and found your friend! Now she wants to go to the next location.";
    //add dancing tina
    nextLevelButton.style.display = "initial";
    startButton.style.display = "none";
    nextLevelButton.addEventListener("click", function() {
        ctx.clearRect(0, 0, game.width, game.height);
    })
}

function endGame() {
    document.getElementById("popUpContainer").style.display = "initial";
    document.getElementById("popUpTitle").innerText = "Oh no!";
    document.getElementById("intro").innerText = "Unfortunately you ran into a creep and they're not letting you leave their sight! Better luck next time.";
    startButton.innerText = "RESET";
    startButton.addEventListener("click", function() {
        location.reload();
    })
}
//Detect when play runs into creeps
function detectCreepHit() {
    creeps.forEach(function(creep) {
        if (player.x < creep.x + creep.width &&
            player.x + player.width > creep.x &&
            player.y < creep.y + creep.height &&
            player.y + player.height > creep.y) {
                player.alive = false;
                endGame();
                clearInterval(runGame);
               
            }          //run end game function
         })  
}  

function checkWin() {
     if (player.x < finishLine.x + finishLine.width &&
        player.x + player.width > finishLine.x &&
        player.y < finishLine.y + finishLine.height &&
        player.y + player.height > finishLine.y) {
            
            win();
            clearInterval(runGame);
    }
}  
// Detect when player runs into walls
// function checkWallCollision() {
//     walls.forEach(function (wall) {
//         switch (e.keycode) {
//             case (87):
//                 if (player.y < wall.y + wall.height &&
//                     player.y + player.height > wall.y) {
//                         return false;
//                     }
                
//                 break;
//             case (65):
//                 if (player.x < wall.x + wall.width &&
//                     player.x + player.width > wall.x) {
//                         return false;
//                     }

//                 break;
//             case (83):
//                 if (player.y < wall.y + wall.height &&
//                     player.y + player.height > wall.y) {
//                         return false;
//                     }

//                 break;
//             case (68):
//                 if (player.x < wall.x + wall.width &&
//                     player.x + player.width > wall.x) {
//                         return false;
//                     }

//         } 
//     })
// } 


function gameLoop() {  
    ctx.clearRect(0, 0, game.width, game.height);
    if(player.alive) {
        player.render();
    }
    creeps.forEach(function(creep){
        // if(creep.alive){
            dancingCreeps();
            creep.render();
        // } 
        detectCreepHit();
    })
    walls.forEach(function(wall){
        wall.render();
        
    })
    finishLine.render();
    checkWin();
    moveCount++;
}


let runGame = setInterval(gameLoop, 100);

