var game = new Phaser.Game(800, 600, 'quest-game', Phaser.AUTO, { preload: preload, create: create, update: update });

var player;
var ground;
var fpsText

var MAX_SPEED = 500; // Pixels/second
var ACCELERATION = 1500; // Pixels/second/second

var BACKGROUND_COLOR = 0x4488cc;

var input = new ActiveInput();

function preload() {
  game.load.image('player', '/assets/img/proto-player.png');
  game.load.image('ground', '/assets/img/proto-ground.png');
}

function create() {
  game.stage.backgroundColor = BACKGROUND_COLOR;

  player = game.add.sprite(game.width / 2, game.height - 64, 'player');

  game.physics.enable(player, Phaser.Physics.ARCADE);

  player.body.collideWorldBounds = true;
  player.body.maxVelocity.setTo(MAX_SPEED, MAX_SPEED); // x, y

  game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN,
  ]);


  // Generate group of ground sprites
  ground = game.add.group();

  for (var x = 0; x < game.width; x += 32) {
    var groundBlock = game.add.sprite(x, game.height - 32, 'ground');
    game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
    groundBlock.body.immovable = true;
    groundBlock.body.allowGravity = false;
    ground.add(groundBlock);
  }

  // Show FPS
  game.time.advancedTiming = true;
  fpsText = game.add.text(
    20, 20, '', { font: '16px Arial', fill: '#ffffff' }
  );
}

function update() {
  if (game.time.fps !== 0) {
    fpsText.setText(game.time.fps + ' FPS');
  }

  game.physics.arcade.collide(player, ground);


  if (input.isLeft()) {
    player.body.acceleration.x = -ACCELERATION;
  } else if (input.isRight()) {
    player.body.acceleration.x = ACCELERATION;
  } else {
    player.body.acceleration.x = 0;
    player.body.velocity.x = 0;
  }
}

function ActiveInput() {
  this.isLeft = function() {
    var isActive = false;

    isActive = game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
    isActive |= (game.input.activePointer.isDown &&
                 game.input.activePointer.x < game.width / 4);

    return isActive;
  },
  this.isRight = function() {
    var isActive = false;

    isActive = game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
    isActive |= (game.input.activePointer.isDown &&
                 game.input.activePointer.x > game.width / 2 + game.width / 4);

    return isActive;
  }
}
