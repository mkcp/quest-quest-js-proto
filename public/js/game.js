var game = new Phaser.Game(800, 600, 'phaser-game', Phaser.AUTO, {
  preload: preload,
  create: create,
  render: render,
  update: update,
});

function preload() {
  var sprite = new Phaser.Sprite();
  var map = new TileMap(game, null, 32, 32);

  var player = game.load(player);
}

function create() {
  var Quest = function(title, text) {
    this.title = title;
    this.text = text;
  };

  var quest = new Quest('Some Quest', 'Hey Adventurer, enjoy this quest we made for you!');
  var questText = 'Level up, bitch!';
  var style = { font: '16px Arial', fill: '#ffffff', align: 'center' };

  var t = game.add.text(game.world.centerX - 300,
                        game.world.centerY,
                        quest.text,
                        style);
}

function update() { }
