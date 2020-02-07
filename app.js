
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
creepImage2.src = "https://s.tcdn.co/8b8/ab8/8b8ab835-6e72-4fee-8340-73dba6d204d8/1.png";
let playerImage = new Image();
playerImage.src = "https://cdn4.iconfinder.com/data/icons/faces-10/96/Smiley-512.png";


//function to create objects with images
function Thing( x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    // this.image = image;
    this.alive = true;
    this.hit = true;
    this.render = function() {
        ctx.fillStyle = this.color;
        ctx.clearRect(0, 0, this.width, this.height);
        // ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
        ctx.fillRect(this.x, this.y, this.width,this.height);
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

let player = new Thing( 75, 400, "white", 30, 30);
// Creating Creeps that will dance horizontally
let creeps = [
    creep1 = new Thing( 380, 70, "red", 30, 30),
    creep2 = new Thing( 50, 250, "red", 30, 30),
    creep3 = new Thing( 230, 350, "red", 30, 30),
    creep4 = new Thing( 360, 200, "red", 30, 30),
    creep5 = new Thing( 670, 150, "red", 30, 30),
    creep6 = new Thing( 700, 430, "red", 30, 30),
    creep7 = new Thing( 520, 300, "red", 30, 30)
] 
// Creating Creeps that will dance vertically
let vertCreeps = [
    vertCreep1 = new Thing( 850, 0, "red", 30, 30),
    vertCreep2 = new Thing( 530, 40, "red", 30, 30),
    vertCreep3 = new Thing( 360, 600, "red", 30, 30),
    vertCreep4 = new Thing( 750, 200, "red", 30, 30),
    vertCreep5 = new Thing( 200, 100, "red", 30, 30),
] 
//creating an array of wall
let walls = [
    //bar
    wall1 = new WallThing(950, 130, "black", 30, 250),
    wall2 = new WallThing(950, 350, "black", 50, 30),
    wall3 = new WallThing(950, 130, "black", 50, 30),
    //dots at bar
    wall3 = new WallThing(900, 170, "black", 30, 30),
    wall3 = new WallThing(900, 220, "black", 30, 30),
    wall3 = new WallThing(900, 270, "black", 30, 30),
    wall3 = new WallThing(900, 320, "black", 30, 30),
    //walls
    wall4 = new WallThing(620, 0, "black", 50, 350),
    wall5 = new WallThing(460, 100, "black", 50, 400),
    wall6 = new WallThing(300, 00, "black", 50, 360),
    wall7 = new WallThing(770, 150, "black", 50, 350),
    wall8 = new WallThing(150, 180, "black", 50, 350),
    wall9 = new WallThing(0, 0, "black", 300, 50)
] 


let finishLine = new WallThing(960, 400, "green", 30, 30);


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
let vertMoveCount = 0;
//if count is even move right or else move left if count is odd
function vertDancingCreeps() {
    if(moveCount % 10 === 0){
        vertCreeps.forEach(function(vertCreep) {
            vertCreep.y +=5;
        })
    } else if (moveCount % 10 === 5 ) {
        vertCreeps.forEach(function(vertCreep) {
            vertCreep.y -=5;
        })
    }
}

function movementHandler(e) {
    switch (e.keyCode) {
        case (87):
            //if player.y is negative then dont move up
            // if (!canMove(87)) { move up }
            if (!(player.y <= 0) && canMove(87))  {
                player.y -=5;
            }
            break;
        case (65):
            if (!(player.x <= 0) && canMove(65)) {
                // console.log("left?")
                player.x -=5;
            }
            break;
        case (83):
            if (!(player.y >= 475) && canMove(83)) {
                player.y +=5;
            }
            break;
        case (68):
            if (!(player.x >= 970) && canMove(68)) {
                // console.log("right?")
                player.x +=5;   
            }
    }
}

// Detect when player runs into walls
function canMove(keycode) {
    // Check if player can move, if so, return true
    let returnValue = true;
    switch (keycode) {
        case 87:
            // up
            for (let i = 0; i < walls.length; i++) {
                if (player.x < (walls[i].x + walls[i].width) && (player.x + player.width) > walls[i].x)
                {
                    if (player.y === (walls[i].y + walls[i].height)) {
                        returnValue = false;
                        return;
                    }
                }
            }
            break;
        case 65:
             //left
             for (let i = 0; i < walls.length; i++) {
                 if ((player.y + player.height) > walls[i].y && player.y < (walls[i].y + walls[i].height)) {
                    if (player.x === (walls[i].x + walls[i].width)) {
                        console.log('player in in y range left at wall', i)
                        returnValue = false;
                        return;
                    }
                }
            }
            break;
        case 83:
             //down
            for (let i = 0; i < walls.length; i++) {
                if (player.x < (walls[i].x + walls[i].width) && (player.x + player.width) > walls[i].x)
                {
                     if ((player.y + player.height) === walls[i].y) {
                            returnValue = false;
                            return;
                        }
                    }
                }
                break;
        case 68:
             //right
             for (let i = 0; i < walls.length; i++) {
                 if ((player.y + player.height) > walls[i].y && player.y < (walls[i].y + walls[i].height)) {
                    console.log(`Player right-side at: ${player.x + player.width}`)
                    console.log(`Wall left side at: ${walls[i].x}`)
                    if ((player.x + player.width) === walls[i].x) {
                        console.log('player hit wall right at wall ', i)
                        returnValue = false;
                        return;
                    }
                }
            }
            break;
    }
    return returnValue;
} 
                
document.addEventListener("keydown", movementHandler);


function win() {
    document.getElementById("popUpContainer").style.display = "initial";
    document.getElementById("popUpTitle").innerText = "Phew! You barely made it!";
    document.getElementById("intro").innerText = "Yaaayyyy you dogded the creeps and found your friend! Looks like you got lucky this time. Think you can do it again?";
    //add dancing tina
    nextLevelButton.style.display = "initial";
    startButton.style.display = "none";
    nextLevelButton.addEventListener("click", function() {
        document.getElementById("popUpContainer").style.display = "none";
        ctx.clearRect(0, 0, game.width, game.height);
       location.reload();
    })
}

function endGame() {
    document.getElementById("popUpContainer").style.display = "initial";
    document.getElementById("popUpTitle").innerText = "Oh no!";
    document.getElementById("intro").innerText = "Unfortunately you ran into a creep and they're not letting you leave their sight! Try Again?";
    startButton.innerText = "START OVER";
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
            }        
    })  
}  

function detectVertCreepHit() {
    vertCreeps.forEach(function(vertCreep) {
        if (player.x < vertCreep.x + vertCreep.width &&
            player.x + player.width > vertCreep.x &&
            player.y < vertCreep.y + vertCreep.height &&
            player.y + player.height > vertCreep.y){
                player.alive = false;
                endGame();
                clearInterval(runGame);
            }
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


function gameLoop() {  
    ctx.clearRect(0, 0, game.width, game.height);
    if(player.alive) {
        player.render();
    }
    creeps.forEach(function(creep) {
        creep.render();
        dancingCreeps();
    })
    vertCreeps.forEach(function(vertCreep) {
        vertCreep.render();
        vertDancingCreeps();
    })
    walls.forEach(function(wall){
        wall.render();
    })
    finishLine.render();
    detectCreepHit();
    detectVertCreepHit();
    checkWin();
    moveCount++;
}


let runGame = setInterval(gameLoop, 100);


//-----------------------------Adding Levels?!--------------------------//

// let runGame2 = setInterval(theGame, 100);



// function theGame() {
//     let level = 1;
//     let moveCount = 0;
//     let creepImage1 = new Image();
//     creepImage1.src = "https://vignette.wikia.nocookie.net/johnnybravo/images/b/bb/Johnnyb001.gif/revision/latest/scale-to-width-down/340?cb=20190421193227";
//     let creepImage2 = new Image();
//     creepImage2.src = "https://s.tcdn.co/8b8/ab8/8b8ab835-6e72-4fee-8340-73dba6d204d8/1.png";
//     let playerImage = new Image();
//     playerImage.src = "https://cdn4.iconfinder.com/data/icons/faces-10/96/Smiley-512.png";

//     //if count is even move right or else move left if count is odd
//     function dancingCreeps() {
//         if(moveCount % 10 === 0){
//             creeps.forEach(function(creep) {
//                 creep.x +=5;
//             })
//         } else if (moveCount % 10 === 5 ) {
//             creeps.forEach(function(creep) {
//                 creep.x -=5;
//             })
//         }
//     }
    
//     function movementHandler(e) {
//         switch (e.keyCode) {
//             case (87):
//                 //if player.y is negative then dont move up
//                 // if (!canMove(87)) { move up }
//                 if (!(player.y <= 0))  {
//                     player.y -=10;
//                 }
//                 break;
//             case (65):
//                 if (!(player.x <= 0)) {
//                     player.x -=10;
//                 }
//                 break;
//             case (83):
//                 if (!(player.y >= 475)) {
//                     player.y +=10;
//                 }
//                 break;
//             case (68):
//                 if (!(player.x >= 970)) {
//                     player.x +=10;   
//                 }
//         }
//     }
    
                    
//     document.addEventListener("keydown", movementHandler);


//     function gameLoop() {  
//         ctx.clearRect(0, 0, game.width, game.height);
//         if(player.alive) {
//             player.render();
//         }
//         creeps.forEach(function(creep){
//             // if(creep.alive){
//                 dancingCreeps();
//                 creep.render();
//             // } 
//             detectCreepHit();
//         })
//         walls.forEach(function(wall){
//             wall.render();
            
//         })
//         finishLine.render();
//         checkWin();
//         moveCount++;
//     }

//     function checkWin() {
//         if (player.x < finishLine.x + finishLine.width &&
//            player.x + player.width > finishLine.x &&
//            player.y < finishLine.y + finishLine.height &&
//            player.y + player.height > finishLine.y) {
               
//                win();
//                clearInterval(runGame);
//        }
//    }  

//    function detectCreepHit() {
//     creeps.forEach(function(creep) {
//         if (player.x < creep.x + creep.width &&
//             player.x + player.width > creep.x &&
//             player.y < creep.y + creep.height &&
//             player.y + player.height > creep.y) {
//                 player.alive = false;
//                 endGame();
//                 clearInterval(runGame);
               
//             }          //run end game function
//          })  
// }  

//     function endGame() {
//         document.getElementById("popUpContainer").style.display = "initial";
//         document.getElementById("popUpTitle").innerText = "Oh no!";
//         document.getElementById("intro").innerText = "Unfortunately you ran into a creep and they're not letting you leave their sight! Better luck next time.";
//         startButton.innerText = "START OVER";
//         startButton.addEventListener("click", function() {
//             location.reload();
//         })
//     }

//     function win() {
//         document.getElementById("popUpContainer").style.display = "initial";
//         document.getElementById("popUpTitle").innerText = "You Made It!";
//         document.getElementById("intro").innerText = "Yaaayyyy you dogded the creeps and found your friend! Now she wants to go to the next location.";
//         //add dancing tina
//         nextLevelButton.style.display = "initial";
//         startButton.style.display = "none";
//         nextLevelButton.addEventListener("click", function() {
//             document.getElementById("popUpContainer").style.display = "none";
//             ctx.clearRect(0, 0, game.width, game.height);
//             level++;
//         })
//     }



//     if (level = 1) {
//         let player = new Thing(playerImage, 700, 220, "white", 30, 30);
//         let creeps = [
//         creep1 = new Thing(creepImage1, 380, 70, "red", 30, 30),
//         creep2 = new Thing(creepImage1, 150, 350, "blue", 30, 30),
//         creep3 = new Thing(creepImage1, 250, 150, "green", 30, 30),
//         creep4 = new Thing(creepImage1, 360, 400, "gray", 30, 30),
//         creep5 = new Thing(creepImage1, 650, 150, "hotpink", 30, 30),
//         creep6 = new Thing(creepImage1, 700, 430, "orange", 30, 30),
//         creep7 = new Thing(creepImage1, 490, 300, "yellow", 30, 30)
//         ] 
//         let walls = [
//         wall1 = new WallThing(0, 200, "black", 180, 50),
//         wall2 = new WallThing(640, 350, "black", 50, 180),
//         wall3 = new WallThing(700, 250, "black", 180, 50),
//         wall4 = new WallThing(300, 200, "black",50, 300),
//         wall5 = new WallThing(500, 0, "black", 50, 250)
//         ] 
//         let finishLine = new WallThing(700, 0, "gray", 200, 100);
//         gameLoop();
//     } else if (level = 2) {
//         let player = new Thing(playerImage, 700, 220, "white", 30, 30);
//         let creeps = [
//         creep1 = new Thing(creepImage2, 380, 70, "red", 30, 30),
//         creep2 = new Thing(creepImage2, 150, 350, "blue", 30, 30),
//         creep3 = new Thing(creepImage2, 250, 150, "green", 30, 30),
//         creep4 = new Thing(creepImage2, 360, 400, "gray", 30, 30),
//         creep5 = new Thing(creepImage2, 650, 150, "hotpink", 30, 30),
//         creep6 = new Thing(creepImage2, 700, 430, "orange", 30, 30),
//         creep7 = new Thing(creepImage2, 490, 300, "yellow", 30, 30)
//         ] 
//         let walls = [
//         wall1 = new WallThing(0, 200, "black", 180, 50),
//         wall2 = new WallThing(640, 350, "black", 50, 180),
//         wall3 = new WallThing(700, 250, "black", 180, 50),
//         wall4 = new WallThing(300, 200, "black",50, 300),
//         wall5 = new WallThing(500, 0, "black", 50, 250)
//         ] 
//         let finishLine = new WallThing(700, 0, "gray", 200, 100);
//         gameLoop();
//     }
// }
// theGame();
// let runGame = setInterval(gameLoop, 100);