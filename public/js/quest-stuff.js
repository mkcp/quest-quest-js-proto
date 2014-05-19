function testQuestText() {
  var Quest = function(title, text, rewards) {
    this.title = title;
    this.text = text;
    this.rewards = rewards;
  };

  Quest.prototype.render = function() {
    game.add.text(game.world.centerX - 300, game.world.centerY, this.title, this.titleStyle);
    game.add.text(game.world.centerX - 300, game.world.centerY + 32, this.text, this.bodyStyle);
  };

  var quest = new Quest('An Quest for You', 'Hey Adventurer, enjoy this quest we made for you!');

  quest.titleStyle = { font: '24px Arial', fill: '#ffffff', align: 'center' };
  quest.bodyStyle = { font: '16px Arial', fill: '#ffffff', align: 'center' };

  quest.render();
}
