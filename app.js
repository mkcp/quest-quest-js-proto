var express = require('express');

var app = express();

app.set('port', process.env.PORT || 4000);
app.use(express.static('public'));

app.get('/', express.static('public/index.html'));

app.listen(app.get('port'), function() {
  console.log('Phaser is now served on port ' + app.get('port'));
});
