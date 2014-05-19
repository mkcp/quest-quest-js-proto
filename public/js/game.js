var game = new Phaser.Game(800, 600, 'quest-game', Phaser.AUTO, { preload: preload, create: create, update: update });

var player;
var ground;
var fpsText;

var MAX_SPEED = 500;     // Pixels / second
var JUMP_SPEED = -1000;  // Pixels / second (negative y is u p )
var ACCELERATION = 1200; // Pixels / second / second
var DRAG = 2400;         // Pixels / second / second
var GRAVITY = 2400;      // Pixels / second

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
  player.body.maxVelocity.setTo(MAX_SPEED, MAX_SPEED * 10); // x, y
  player.body.drag.setTo(DRAG, 0); // x, y

  game.physics.arcade.gravity.y = GRAVITY;

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

  game.add.image(0, 0, makeHeightMarkerBitmap());

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
  }

  var onTheGround = player.body.touching.down;
  if (onTheGround && input.isUp()) {
    player.body.velocity.y = JUMP_SPEED;
  }
}


function ActiveInput() {
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


function makeHeightMarkerBitmap() {
  var bitmap = game.add.bitmapData(game.width, game.height);

  for (y = game.height - 32; y >= 64; y -= 32) {
    bitmap.context.beginPath();
    bitmap.context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    bitmap.context.moveTo(0, y);
    bitmap.context.lineTo(game.width, y);
    bitmap.context.stroke();
  }

  return bitmap;
}
