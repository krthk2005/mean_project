var express = require('express'),
  http = require('http');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');
var path = require('path');

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

function merge_options(obj1, obj2) {
  var obj3 = {};
  for (var attrname in obj1) {
    obj3[attrname] = obj1[attrname];
  }
  for (var attrname in obj2) {
    obj3[attrname] = obj2[attrname];
  }
  return obj3;
}
app.get('/*', function(req, res) {
  // AJAX requests are aren't expected to be redirected to the AngularJS app
  if (req.xhr) {
    return res.status(404).send(req.url + ' not found');
  }

  // `sendfile` requires the safe, resolved path to your AngularJS app
  res.sendfile(path.resolve(__dirname + '/public/index.html'));
});


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
        res.send(merge_options(jsonfile.readFileSync(responseJson).success, userData[i]));
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

app.post('/createUserData', function(req, res) {
  if ((!req.body || req.body.length === 0) || req.body.password == undefined || req.body.email == undefined) {
    return res.send(jsonfile.readFileSync(responseJson).signupInvalidResponse);
  }
  var userData = jsonfile.readFileSync(userCredentialsJson);
  var validUser = false;

  if (req.body.email.length > 7) {
    for (var i = 0; i < userData.length; i++) {
      if (userData[i].email == req.body.email) {
        validUser = true;
      }

    }
    if (!validUser) {
      delete req.body['data'];
      delete req.body['response'];
      req.body.id= userData.length;
      userData.push(req.body);
      merge_options(jsonfile.readFileSync(responseJson).success, req.body)

      jsonfile.writeFileSync(userCredentialsJson, userData);
      return res.send(jsonfile.readFileSync(responseJson).success);
    }
    else {
      return res.send(jsonfile.readFileSync(responseJson).alreadyEmailExist);
    }
  }
  else {
    return res.send(jsonfile.readFileSync(responseJson).loginInvalidResponse);
  }
});

app.post('/validateUserProfile', function(req, res) {
  if ((!req.body || req.body.length === 0) || req.body.id == undefined || req.body.email == undefined) {
    return res.send(jsonfile.readFileSync(responseJson).loginInvalidResponse);
  }
  var userData = jsonfile.readFileSync(userCredentialsJson);
  var validUser = false;

  if (req.body.id > 0 && req.body.email.length > 7) {
    for (var i = 0; i < userData.length; i++) {
      if ((userData[i].id == req.body.id) && (userData[i].email == req.body.email)) {
        validUser = true;
        userData[i] = merge_options(userData[i], req.body);
        delete userData[i]['data'];
        delete userData[i]['response'];
        jsonfile.writeFileSync(userCredentialsJson, userData);
        res.send(userData[i]);
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