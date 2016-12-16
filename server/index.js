const http         = require('http'),
      fs           = require('fs'),
      path         = require('path'),
      contentTypes = require('./utils/content-types'),
      sysInfo      = require('./utils/sys-info'),
      env          = process.env;
let express = require('express');
let app     = express();
let server = http.Server(app);
let bodyParser = require('body-parser');
let jwt    = require('jsonwebtoken');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Set up socket io
let io = require('socket.io')(server);

// Set up mongoose
let mongoose = require('mongoose');
// Connect to mongo db

let connection_string = 'mongodb://localhost/error';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  console.log('in openshift');
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect(connection_string);
mongoose.connection.once('open', function() {
    console.log('db connected');
});

// Save secret for token signing
app.set('superSecret', 'lazy');

// Load db models
let User = require('./models/User');

// Initialise api routes
let apiRoutes = express.Router();

// Apllay middleware to intercept api request to verify token
apiRoutes.use(function(req, res, next) {
  if(req.url!=='/authenticate'){


    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({
          success: false,
          message: 'No token provided.'
      });

    }
  }else{
    next();
  }
});

// Load API routes
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// Route to return all users
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

// Route to setup initial user
apiRoutes.get('/setup', function(req, res) {

  // Create a sample user
  var nick = new User({
    name: 'vishnu',
    password: 'password',
    admin: true
  });

  // Save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

// route to authenticate a user
apiRoutes.post('/authenticate', function(req, res) {
  console.log(req.body)
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        let token = jwt.sign({name:user.name}, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});
// Apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);



// Chat logic
let clientList = [];
function sendHeartbeat(){
    setTimeout(sendHeartbeat, 8000);
    io.sockets.emit('ping', { beat : 1 });
}

function removeClient(client) {
  if(clientList.indexOf(client)!=-1){
      clientList.splice(clientList.indexOf(client),1);
  }
}

function broadCastChat(client,data){
    for(let i=0;i<clientList.length;++i){
        if(clientList[i]!==client){
            clientList[i].emit('chat',data);
        }
    }

}

io.on('connection', function(client){
    console.log('connected');

    clientList.push(client);

    client.on('chat', function(data){
        console.log('chat',data);
        broadCastChat(client,data);
    });

    client.on('disconnect', function(){
        console.log('disconnected');
        removeClient(client);
        console.log(clientList.length,' clients');
    });

    client.on('pong', function(data){
        console.log('Pong received from client');
    });
});

setTimeout(sendHeartbeat, 8000);

// Setting static route
app.use(express.static(path.join(__dirname, '../build/')));
// Server Listening
// server.listen(env.NODE_PORT || 3000);
server.listen(3000);
console.log('Running at Port  wtf',3000);

