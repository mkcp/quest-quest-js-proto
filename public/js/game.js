var GAME_HEIGHT = 800;
var GAME_WIDTH = 600;
var game = new Phaser.Game(GAME_HEIGHT, GAME_WIDTH, 'quest-game', Phaser.AUTO, { preload: preload, create: create, update: update });

var player;
var ground;
var fpsText;

var MAX_SPEED = 500;     // Pixels / second
var JUMP_SPEED = -250;   // Pixels / second (negative y is u p )
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

  if (input.isUp() && player.body.touching.down) {
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

function questBits() {
  Quest.prototype.render = function() {
    game.add.text(game.world.centerX - 300, game.world.centerY, this.title, this.titleStyle);
    game.add.text(game.world.centerX - 300, game.world.centerY + 32, this.text, this.bodyStyle);
  };

  var quest = new Quest('An Quest for You', 'Hey Adventurer, enjoy this quest we made for you!');

  quest.titleStyle = { font: '24px Arial', fill: '#ffffff', align: 'center' };
  quest.bodyStyle = { font: '16px Arial', fill: '#ffffff', align: 'center' };

  quest.render();
}

var TitleState = function() {
};

TitleState.prototype.text = {
  title: 'QUEST QUEST',
  subTitle: 'quest quest quest quest quest quest quest quest'
};

var Journal = [
  { level: 0, quest: new Quest('Filler Quest', 'This is the blank filler quest!') },
  { level: 1, quest: new Quest('Safety First', 'The ground is fast approaching, you must land safely!') },
  { level: 2, quest: new Quest('Left Alone', 'Explore your new surroundings, press !') },
  { level: 3, quest: new Quest('Right of Way', 'Get a feel for your surroundings, press d or right arrow to move right!') },
  { level: 4, quest: new Quest('Basically Michael Jordan', 'Press w or up arrow to jump.') },
  { level: 5, quest: new Quest('Launch Over It!', 'Quick, vault over that fence to see what is going on over there!') },
  { level: 6, quest: new Quest('A Path in Life', 'Wow, you are now so experienced that you can decide on an adventeturer class!') },
  { level: 7, quest: new Quest('The Tools at Hand', 'There is a thing over there! Press down to use something in the world.') },
  { level: 8, quest: new Quest('Using the Thing', 'Use the thing on those other things over there.') },
  { level: 9, quest: new Quest('Vanquish Your Foe', 'Strike at the heart of the monster in front of you.') },
];

function Player() {
  this.sprite = sprite;

  this.levelUp = function() {
    completed.push(this.questLog.current);
    this.questLog.current = unstarted.shift();
  };

  this.questLog = {
    current: new Quest('Land safely', 'holy shit the ground is coming so fast, land safely!'),
    unstarted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    completed: [],
  };

  this.level = completedQuests.length;
}


function Quest(title, body) {
  this.title = title;
  this.body = body;
}
