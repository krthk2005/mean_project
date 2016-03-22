var express = require('express'),
  http = require('http');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');

var file = './data/employees.json';
var responseJson = './data/response.json';
var userCredentialsJson = './data/user-data.json';


var app = express()
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json())
  .use(express.static(__dirname + '/public'))
  .use('/node_modules', express.static(__dirname + '/node_modules'))
  .use('/bower_components', express.static(__dirname + '/bower_components'));
  
function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

app.post('/checkUserData', function(req, res) {
  if ((!req.body || req.body.length === 0) || req.body.password == undefined || req.body.email == undefined) {
    return res.send(jsonfile.readFileSync(responseJson).loginInvalidResponse);
  }
  var userData = jsonfile.readFileSync(userCredentialsJson);
  var validUser = false;

  if (req.body.password.length > 4 && req.body.email.length > 7) {
    for (var i = 0; i < userData.length; i++) {
      if ((userData[i].password == req.body.password) && (userData[i].email == req.body.email)) {
        validUser = true;
        res.send(merge_options(jsonfile.readFileSync(responseJson).success,userData[i]));
      }
    }
    if (!validUser) {
      return res.send(jsonfile.readFileSync(responseJson).noUserFound);
    }
  }
  else {
    return res.send(jsonfile.readFileSync(responseJson).loginInvalidResponse);
  }
});

app.post('/validateUserProfile', function(req, res) {
  console.log(req.body);
});



app.get('/employees', function(req, res) {
  res.json(jsonfile.readFileSync(file));
});

app.post('/employeeModifications', function(req, res) {
  jsonfile.writeFileSync(file, req.body);
  res.send("success");
});

app.get('/*', function(req, res) {
  res.json(404, {
    status: 'not found'
  });
});

http.createServer(app).listen(process.env.PORT, function() {
  console.log("Server ready at http://localhost:3000");
});