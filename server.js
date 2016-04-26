var express = require('express'),
  http = require('http');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');
var path = require('path');
var cors = require('cors');
var _ = require("underscore");
var db = require('./db.js');
var bcrypt = require('bcrypt');
var middleware = require('./middleware.js')(db);

var PORT = process.env.PORT || 3000;

var file = './data/employees.json';
var responseJson = './data/response.json';
var userCredentialsJson = './data/user-data.json';
var articleDataJson = './data/article.json';


var app = express()
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json())
  .use(express.static(__dirname + '/public'))
  .use(cors())
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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
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
      req.body.id = userData.length;
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
app.get('/getAllArticles', function(req, res) {
  res.json(jsonfile.readFileSync(articleDataJson));
});

app.post('/employeeModifications', function(req, res) {
  jsonfile.writeFileSync(file, req.body);
  res.send("success");
});

app.get('/getTodos', middleware.requireAuthentication, function(req, res) {
  var id = req.user.get('id');
  if (id > 0) {
    db.todo.findAll({
      where: {
        userId: id
      }
    }).then(function(todo) {
      if (todo) {
        res.json(todo);
      }
      else {
        res.status(404).send();
      }
    }, function(e) {l
      res.status(500).send();
    });
  }
});


app.post('/createUser', function(req, res) {
  var body = _.pick(req.body, 'email', 'password', "name", "age");

  db.user.create(body).then(function(user) {
    res.json(user.toPublicJSON());
  }, function(e) {
    res.status(400).json(e);
  });
});

app.post('/userLogin', function(req, res) {
  var body = _.pick(req.body, 'email', 'password');
  var userInstance;
  var token ="";
  db.user.authenticate(body).then(function(user) {
    token = user.generateToken('authentication');
    userInstance = user;
    return db.todo.findAll({
      where: {
        userId: user.dataValues.id
      }
    })
  }).then(function(todo) {
    if (todo) {
      userInstance.dataValues.stickyNote = todo;
    }
    return db.token.create({
      token: token
    });
  }).then(function(tokenInstance) {
    res.header('Auth', tokenInstance.get('token')).json(userInstance.toPublicJSON());
  }).catch(function() {
    res.status(401).send();
  });
});

app.post('/updateUser', middleware.requireAuthentication, function(req, res) {
  var body = req.body;
  var id = req.user.dataValues.id;
  db.user.update({
    name: body.name,
    bgColor: body.bgColor,
    picture: body.picture,
    isActive: body.isActive,
    age: body.age
  }, {
    where: {
      id: id
    }
  }).then(function(affectedRows) {
    db.user.findOne({
      where: {
        id: id
      }
    }).then(function(user) {
      res.json(user.toPublicJSON());
    }, function(e) {
      res.status(500).send();
    });
  }).catch(function() {
    res.status(500).send();
  });
});

app.delete('/user/logout', middleware.requireAuthentication, function(req, res) {
  req.token.destroy().then(function() {
    res.status(204).send();
  }).catch(function() {
    res.status(500).send();
  });
});

app.post('/todos', middleware.requireAuthentication, function(req, res) {
  var body = req.body;
  var id = req.user.dataValues.id;
  db.todo.insertTodos(body, id).then(function() {
    res.json(body);
  }, function(e) {
    res.status(400).json(e);
  });
});

app.get('/*', function(req, res) {
  if (req.xhr) {
    return res.status(404).send(req.url + ' not found');
  }
  res.sendFile(path.resolve(__dirname + '/public/index.html'));
});
// {force: true}
db.sequelize.sync().then(function() {
  http.createServer(app).listen(PORT, function() {
    console.log("Server ready at " + PORT);
  });
});