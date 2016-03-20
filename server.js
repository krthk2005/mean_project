var express = require('express'),
  http = require('http');
var bodyParser  = require('body-parser');
var jsonfile = require('jsonfile');

var file = './data/employees.json';


var app = express()
  .use(bodyParser.urlencoded())
  .use(express.static(__dirname + '/public'))
  .use('/node_modules',  express.static(__dirname + '/node_modules'))
  .use('/bower_components',  express.static(__dirname + '/bower_components'));;
 
app.get('/employees', function  (req, res) {
  res.json(jsonfile.readFileSync(file));
});

app.post('/employeeModifications', function  (req, res) {
   jsonfile.writeFileSync(file, req.body);
   res.send("success");
});

app.get('/*', function  (req, res) {
  res.json(404, {status: 'not found'});
});

http.createServer(app).listen(process.env.PORT , function () {
  console.log("Server ready at http://localhost:3000");
});