var GameState = function(game) {
};

GameState.prototype.preload = function() {
  this.game.load.image('player', '/assets/img/proto-player.png');
  this.game.load.image('ground', '/assets/img/proto-ground.png');
  this.game.load.tilemap('map', '/assets/maps/proto-map.json');
}

GameState.prototype.create = function () {

  this.MAX_SPEED = 500;     // Pixels / second
  this.JUMP_SPEED = -250;   // Pixels / second (negative y is u p )
  this.ACCELERATION = 1200; // Pixels / second / second
  this.DRAG = 2400;         // Pixels / second / second
  this.GRAVITY = 2400;      // Pixels / second

  this.BACKGROUND_COLOR = 0x4488cc;

  this.input = new ActiveInput();
  this.player = new Player();

  this.game.stage.backgroundColor = this.BACKGROUND_COLOR;

  this.player = this.game.add.sprite(this.game.width / 2,
                                     this.game.height - this.game.height / 1.33,
                                     'player');

  this.game.physics.enable(this.player,
                           Phaser.Physics.ARCADE);

  this.player.body.collideWorldBounds = true;
  this.player.body.maxVelocity.setTo(this.MAX_SPEED,
                                     this.MAX_SPEED * 10); // x, y
  this.player.body.drag.setTo(this.DRAG,
                              0); // x, y

  this.game.physics.arcade.gravity.y = this.GRAVITY;



  // Generate group of ground sprites
  this.ground = this.game.add.group();

  for (var x = 0; x < this.game.width; x += 32) {
    var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
    this.game.physics.enable(groundBlock, this.Phaser.Physics.ARCADE);
    groundBlock.body.immovable = true;
    groundBlock.body.allowGravity = false;
    this.ground.add(groundBlock);
  }

  // Show FPS
  this.game.time.advancedTiming = true;
  this.fpsText = this.game.add.text(
    20, 20, '', { font: '16px Arial', fill: '#ffffff' }
  );
}

GameState.prototype.update = function() {
  if (this.game.time.fps !== 0) {
    this.fpsText.setText(this.game.time.fps + ' FPS');
  }

  this.game.physics.arcade.collide(this.player, this.ground);

  if (this.input.isLeft()) {
    this.player.body.acceleration.x = -this.ACCELERATION;
  } else if (this.input.isRight()) {
    this.player.body.acceleration.x = this.ACCELERATION;
  } else {
    this.player.body.acceleration.x = 0;
  }

  if (this.input.isUp() && this.player.body.touching.down) {
    this.player.body.velocity.y = this.JUMP_SPEED;
  }
}


