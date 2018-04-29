//"use strict"
// Enemies our player must avoid
var xMove = 100;
var yMove = 80;

var imgWidth = 80;
var imgHight = 40;


var Enemy = function(enemyX, enemyY, enemySpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
   
    this.enemyX = enemyX;
    this.enemyY = enemyY;
    this.enemySpeed = enemySpeed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //enemies moves
    this.enemyX += this.enemySpeed * dt;

    //enemy back to game
    if(this.enemyX >= 510) {
        this.enemySpeed = Math.random() * 150 + 100;
        this.enemyX = -80;
    } else {
        this.enemyX += this.enemySpeed * dt;
    }

    //collision detector from developer.mozilla.org/2D_collision
if( player.playerX < this.enemyX + imgWidth && 
    player.playerX + imgWidth > this.enemyX &&
    player.playerY < this.enemyY + imgHight &&
    imgHight + player.playerY > this.enemyY) {

    player.playerX = 200;
    player.playerY = 390;

 
}
};




// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if(this.x > 505){
        this.x = -100;
    }
    ctx.drawImage(Resources.get(this.sprite), this.enemyX, this.enemyY);
};

//if enemy and player collide, reset player to its initial location
/*Enemy.prototype.handleCollisions = function(){
    if(this.x)
}*/



// Now write your own player class
var Player = function(playerX, playerY){
    this.sprite = 'images/char-boy.png';
    this.playerX = playerX;
    this.playerY = playerY;
    
};
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(){
    if ( this.playerY < 1 ) this.playerY = -7;
    if ( this.playerY > 451 ) this.playerY = 451;
    if ( this.playerX > 400 ) this.playerX = 400;
    if ( this.playerX < 0 ) this.playerX = 0;
};





//draw player 
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.playerX, this.playerY);
};

//collision decrease lives/ hide a heart
Player.prototype.loseLife = function (life) {
    player.lives--;
    player.x = 200;
    player.y = 400;
    life.style.display = 'none';
}


//moving player with keyboard
Player.prototype.handleInput = function(key){
    switch(key){
        case 'left':
            this.playerX -= xMove;
            break;

        case 'up':
            this.playerY -= yMove;
            break;

        case 'right':
            this.playerX += xMove;
            break;

        case 'down':
            this.playerY += yMove;
            break;        
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(-50 ,62);
var enemy2 = new Enemy(0, 145);
var enemy3 = new Enemy(-200, 145);
var enemy4 = new Enemy(-100, 228);

var allEnemies = [enemy1, enemy2, enemy3, enemy4];
var enemyPosition = 65;

for(var i = 1; i < 4; i++){
    allEnemies.push(new Enemy(10, enemyPosition, Math.random() * 100 * i));
    enemyPosition = enemyPosition + yMove;
}

// Place the player object in a variable called player
var player = new Player(202,404);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
