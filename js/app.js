
// Enemies our player must avoid
var xMove = 100;
var yMove = 80;

var imgWidth = 80;
var imgHight = 40;

//number of lives
var lives = 3;
var score = document.querySelector('#scoreNum').html = 0;


//indexof elements of the gemPositions array
var gemNumber = 0;

//var isCharSelected = true;
var play = document.getElementById('players');
var avatars = play.getElementsByClassName('imgPlayer');

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
        
        //handle lives
        if( lives == 3 ){
            player.loseLife( player.life1 );
        } else if ( lives == 2 ){
            player.loseLife( player.life2 );
        } else {
            player.loseLife( player.life3 );
     
            //game over
            //player.isGameOver = true;
            setTimeout( function(){
                player.endGame();
            }, 1000);
        }
        
    }
}; //fin de enemy.update


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if(this.x > 505){
        this.x = -100;
    }
    ctx.drawImage(Resources.get(this.sprite), this.enemyX, this.enemyY);
};


// Now write your own player class
var Player = function(playerX, playerY){
    this.sprite = 'images/char-pink-girl.png';
    this.playerX = playerX;
    this.playerY = playerY;

    //when user choose an avatar
    for (var avatar of avatars) {
    avatar.addEventListener('click', function(e) {
        this.classList.add('selected');
       
       // isCharSelected = true;

        if(e.target.id == 'boy') {
            player.sprite = 'images/char-boy.png';
        }else if (e.target.id === 'cat') {
            player.sprite = 'images/char-cat-girl.png';
        }else if(e.target.id === 'horn') {
            player.sprite = 'images/char-horn-girl.png';
        }else if (e.target.id === 'pink') {
            player.sprite = 'images/char-pink-girl.png';
        } else {
            player.sprite = 'images/char-princess-girl.png';
        }

    });
}
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
    lives--;
    player.x = 200;
    player.y = 400;
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

//heart class calculates how many lives are
var Heart = function(x, y) {
    this.sprite = 'images/Heart.png';
    this.x = x;
    this.y = y;
}

//clear a heart after decreased life
Heart.prototype.update = function (){
    if( lives == 3) {
        heart1.x = 310;
        heart2.x = 380;
        heart3.x = 448;
    } else if ( lives == 2 ) {
        heart3.x = -500;
    } else if ( lives == 1) {
        heart2.x = -500;
    } else if ( lives == 0 ) {
        heart1.x = -500;
    }
};

//render method to draw hearts
Heart.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 60, 100);
}

//gem class draw and manipulate gems
var Gem = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Gem Green.png';
};

//interact with gem
Gem.prototype.update = function() {
    gemWin();
};

//draw the gem
Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 60, 100);
     gemWin();
};

//earning gems
function gemWin() {
    //if player win the gem
    if( gem.x - player.x == 0 && (gem.y - player.y == 0 || gem.y - player.y == 40)){
        //remove gem outside canvas
        gem.x = -500;
        score += 1;
        //not exceed num of obj. to move gems shuffle gemPositions
        gemNumber += 1;
        if (gemNumber < 15){
            gem.x = gemPosition[gemNumber].x;
            gem.y = gemPosition[gemNumber].y;
        } else {
            gemNumber = 0;
        }
    }
}

//array of gemPositions and shuffle the array randomly
var gemPositions = [{
    x: 19,
    y: 271
}, {
    x: 120,
    y: 271
}



];


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

//instantiate heart obj.
var heart1 = new Heart(310, -15);
var heart2 = new Heart(380, -15);
var heart3 = new Heart(448, -15);

//array of hearts
var allHearts = [heart1, heart2, heart3];

//shuffle gems
shuffle(gemPositions);

//instantiate gem obj.
var gem = new Gem(gemPositions[gemNumber].x, gemPositions[gemNumber].y);

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


//shuffle function from stackoverflow
function shuffle(array){
    var currentIndex = array.length,
    temporaryValue, randomIndex;
    while (currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

Player.prototype.endGame = function(){
    document.getElementById('modal').style.display='block';
    //WHEN CLICK
    document.querySelector('#modal h2').addEventListener('click', function(){
        document.getElementById('modal').style.display='none';
       //Heart.update(); 
    });
}

Player.prototype.winGame = function() {
     document.getElementById('modalWin').style.display='block';
    //WHEN CLICK
    document.querySelector('#modalWin h2').addEventListener('click', function(){
        document.getElementById('modalWin').style.display='none';
       //Heart.update(); 
    });
}