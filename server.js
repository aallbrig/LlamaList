var express = require('express');
var app = express();
app.get('/hello.txt', function(req, res){
    res.send('Hello World');
});
app.get('/', function(req, res){
  res.sendfile('index.html');
});
app.get('/home', function(req, res){
  res.sendfile('home.html');
});
app.get('/search', function(req, res){
  res.sendfile('search.html');
})
app.use(express.static(__dirname))

var server = app.listen(4000, function() {
    console.log('Listening on port %d', server.address().port);
});
