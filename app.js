var express = require('express');

var app = express();

app.set('port', process.env.PORT || 4000);
app.use(express.logger('dev'));
app.use(app.router);
app.use(express.static('public'));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', express.static('public/index.html'));

app.listen(app.get('port'), function() {
  console.log('QUEST QUEST is now available on port ' + app.get('port'));
});

// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.methodOverride());
