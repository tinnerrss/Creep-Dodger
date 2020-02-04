// document.addEventListener("DOMContentLoaded", function(){
//     console.log("it's alive");
// });

document.addEventListener("click", function() {
    document.getElementById("introContainer").style.display = "none";
})

let game = document.getElementById("game");
let ctx = game.getContext("2d");

game.setAttribute("width", getComputedStyle(game)["width"]);
game.setAttribute("height", getComputedStyle(game)["height"]);


function Crawler(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.alive = true;
    this.render = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let player = new Crawler(Math.floor(Math.random()*game.width), Math.floor(Math.random()*game.height), "pink", 20, 20);

let creep0 = new Crawler(Math.floor(Math.random()*game.width), Math.floor(Math.random()*game.height), "black", 20, 60);
let creep1 = new Crawler(Math.floor(Math.random()*game.width), Math.floor(Math.random()*game.height), "black", 20, 60);
let creep2 = new Crawler(Math.floor(Math.random()*game.width), Math.floor(Math.random()*game.height), "black", 20, 60);
let creep3 = new Crawler(Math.floor(Math.random()*game.width), Math.floor(Math.random()*game.height), "black", 20, 60);
let creep4 = new Crawler(Math.floor(Math.random()*game.width), Math.floor(Math.random()*game.height), "black", 20, 60);
let creep5 = new Crawler(Math.floor(Math.random()*game.width), Math.floor(Math.random()*game.height), "black", 20, 60);
let creep6 = new Crawler(Math.floor(Math.random()*game.width), Math.floor(Math.random()*game.height), "black", 20, 60);
let creep7 = new Crawler(Math.floor(Math.random()*game.width), Math.floor(Math.random()*game.height), "black", 20, 60);
let creep8 = new Crawler(Math.floor(Math.random()*game.width), Math.floor(Math.random()*game.height), "black", 20, 60);
let creep9 = new Crawler(Math.floor(Math.random()*game.width), Math.floor(Math.random()*game.height), "black", 20, 60);

let dancingCreep = function() {
    setInterval(function() {

    })
}

function movementHandler(e) {
    
    switch (e.keyCode) {
        case (87):
            player.y -=10;
            break;
        case (65):
            player.x -=10;
            break;
        case (83):
            player.y +=10;
            break;
        case (68):
            player.x +=10;
    
    }
}
document.addEventListener("keydown", movementHandler);

function detectHit() {
    
    if (player.x < creep.x + creep.width &&
        player.x + player.width > creep.x &&
        player.y < creep.y + creep.height &&
        player.y + player.height > creep.y) {
            creep.alive = false;
            //run end game function
           
        }


}
function gameLoop() {
    // console.log("get smashin");
    //clear the canvas
    ctx.clearRect(0, 0, game.width, game.height);
    //display x,y coodinated of the hero in movementDisplay
    // movementDisplay.textContent = `X: ${hero.x} Y: ${hero.y}`;
    //render the hero
    player.render();
    //check if ogre is alive
    if (creep0.alive && creep1.alive && creep2.alive &&creep3.alive && creep4.alive && creep5.alive &&creep6.alive && creep7.alive && creep8.alive && creep9.alive) {
        }
        //render the ogre
        creep.render();
        //check for collision
        detectHit();
    }

}
let runGame = setInterval(gameLoop, 60);
// let gameInit = function()
// //play music
//start countdown
//creeps start dancing
//set message board 
