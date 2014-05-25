function Quest(title, body) {
  this.title = title;
  this.body = body;
};
function Player() {
  this.health = 5;
  this.mana   = 5;
  this.level  = 0;
  this.level = 1;
  this.sprite;

  this.currentQuest = function() {
    this.Journal[this.level];
  };

  this.levelUp = function () {
    this.level += 1;
  };


  this.Journal = [
    new Quest('Quest Quest', ''),
    new Quest('Safety First', 'The ground is fast approaching, you must land safely!'),
    new Quest('Left Alone', 'Explore your new surroundings, press !'),
    new Quest('Right of Way', 'Get a feel for your surroundings, press d or right arrow to move right!'),
    new Quest('Basically Michael Jordan', 'Press w or up arrow to jump.'),
    new Quest('Launch Over It!', 'Quick, vault over that fence to see what is going on over there!'),
    new Quest('A Path in Life', 'Wow, you are now so experienced that you can decide on an adventeturer class!'),
    new Quest('The Tools at Hand', 'There is a thing over there! Press down to use something in the world.'),
    new Quest('Using the Thing', 'Use the thing on those other things over there.'),
    new Quest('Vanquish Your Foe', 'Strike at the heart of the monster in front of you.'),
  ];
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
