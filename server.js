var express = require('express');
var app = express();
var url = require('url');

// Domain models.
var Llama = function(name, type) {
  return {name: name || '',
  		  type: type || 'llama'};
};
var llamas = [
  new Llama('Becky', 'alpaca'), 
  new Llama('Doodle', 'llama'), 
  new Llama('Gazorp', 'guanaco'), 
  new Llama('Azorp', 'llama'),
  new Llama('Zandy', 'alpaca')
];

// Routes.
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
  var llamaFilter = url.parse(req.url, true).query.searchTerm;
  var results = [];
  if(llamaFilter.length > 0){
    results = llamas.filter(function(llama){
      return llama.name.indexOf(llamaFilter) >= 0 || llama.type.indexOf(llamaFilter) >= 0;
    });
  }
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(results));
});
// Static Paths.
app.use("/img", express.static(__dirname + '/img'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/css", express.static(__dirname + '/css'));

// Start server.
var server = app.listen(4000, function() {
    console.log('Listening on port %d', server.address().port);
});
