// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    
    // The X and Y distance between enemy and player
    var xDiff = Math.abs(this.x - player.x);
    var yDiff = Math.abs(this.y - player.y);

    // If X and Y difference are in certain range, it is 
    // considered a collision and player is reset.
    if(yDiff < 50 && xDiff < 60) {
        player.reset();
    }
    if(this.x > 5 * 101) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset the enemy to the left with a new speed
Enemy.prototype.reset = function() {
    this.x = -1 * 101;
    this.speed = randomSpeed() * 50;
    //console.log(this.speed);
};

/*Enemy.prototype.collisionCheck = function() {
    if(this.x === player.x) {
        return true;
    }
    return false;
};*/

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 2 * 101; // 2 Colomns in * Colomn Width
    this.y = 5 * 83 - 13; // 5 Rows down - 13 for fit
    this.sprite = 'images/char-boy.png'
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keycode) {
        //TODO: Make into One liners and Ternaries. Call a method to check for boundaries.
        switch(keycode) {
            case 'left':
                if(this.x > 100) {
                    this.x -= 101;
                }
                break;
            case 'right':
                if(this.x !== 4 * 101) {
                    this.x += 101;
                }
                break;
            case 'up':
                if(this.y > 85) {
                    this.y -= 83;
                } else {
                   this.reset(); 
                }
                
                break;
            case 'down':
                if(this.y !== 5 * 83 - 13) {
                    this.y += 83;
                }
                break;
        }
        this.render();  
};

Player.prototype.reset = function() {
    player.x = 2 * 101; // 2 Colomns in * Colomn Width
    player.y = 5 * 83 - 13; // 83 is Row height. Not sure why 4.5 rows though.
    player.render();
}

function randomSpeed() { 
    return Math.floor(Math.random() * (8 - 3)) + 3;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for(var i = 1; i <= 3; i++) {
    allEnemies.push(new Enemy(-60,(i * 83 - 20),randomSpeed() * 50));
}
var player = new Player();


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
