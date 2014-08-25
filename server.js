var express = require('express');
var app = express();
var llamas = [{}];
app.get('/hello.txt', function(req, res){
    res.send('Hello World');
});
app.get('/', function(req, res){
  res.sendfile('html/login.html');
});
app.get('/home', function(req, res){
  res.sendfile('html/home.html');
});
app.get('/search', function(req, res){
  res.sendfile('html/search.html');
});
app.get('/search/llamas', function(req, res){
  console.log('request');
  console.log(req);
  console.log('response:');
  console.log(res);
});

app.use(express.static(__dirname))
app.use("/img", express.static(__dirname + '/img'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/css", express.static(__dirname + '/css'));
var server = app.listen(4000, function() {
    console.log('Listening on port %d', server.address().port);
});
