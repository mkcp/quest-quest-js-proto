var player;
var ground;

var GAME_HEIGHT = 800;
var GAME_WIDTH = 600;

var game = new Phaser.Game(GAME_HEIGHT,
                           GAME_WIDTH,
                           Phaser.AUTO,
                           'quest-game'
                          );

game.state.add('game', GameState, true);

function ActiveInput() {
  this.initKeyEvents = function () {
    game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
    ])
  };

  this.isLeft = function() {
    var isActive = false;

    isActive = game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
    isActive |= (game.input.activePointer.isDown &&
                 game.input.activePointer.x < game.width / 4);

    return isActive;
  };

  this.isRight = function() {
    var isActive = false;

    isActive = game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
    isActive |= (game.input.activePointer.isDown &&
                 game.input.activePointer.x > game.width / 2 + game.width / 4);

    return isActive;
  };

  this.isUp = function (duration) {
    var isActive = false;

    isActive = game.input.keyboard.justPressed(Phaser.Keyboard.UP, duration);
    isActive |= (game.input.activePointer.justPressed(duration + 1000/60) &&
                 game.input.activePointer.x > game.width / 4 &&
                 game.input.activePointer.x < game.width / 2 + game.width / 4);

    return isActive;
  };
}
