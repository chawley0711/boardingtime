var express = require('express'),
  pug = require('pug'),
  bodyParser = require('body-parser'),
  expressSession = require('express-session'),
  path = require('path'),
  cookieParser = require('cookie-parser');
route = require('./Routes/routes.js');

var app = express();
app.use(cookieParser('secret'));
var bcrypt = require('bcrypt-nodejs');
var myHash ='';

var checkAdmin = function (req, res, next) {
  if (req.session.user && req.session.user.role=='admin') {
    next();
  } else {
    res.redirect('/');
  }
};
var checkAuth = function (req, res, next) {
  if (req.session.user && req.session.user.isAuthenticated) {
    next();
  } else {
    res.redirect('/');
  }
};

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

app.use(expressSession({
  secret: 'Whatever54321',
  saveUninitialized: true,
  resave: true
}));

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

app.get('/', function (req, res) {
  //UNCOMMENT THIS CODE TO ADD AN ADMIN TO YOUR DATABASE ONCE.
  //ONCE YOU ADD IT, CHECK THE USER TABLE TO MAKE SURE IT'S THERE.
  //AFTER YOU DO THAT, COMMENT THIS CODE OUT AGAIN BEFORE YOU CHANGE PAGES
  //OTHERWISE YOU WILL END UP WITH MULTIPLE ADMINS
  // var hashedPW = bcrypt.hashSync('password');
  // var user = new User({
  //   username: 'admin',
  //   password: hashedPW,
  //   email: 'admin@admin.com',
  //   age: '8',
  //   avatarString: 'https://api.adorable.io/avatars/face/eyes4/nose8/mouth3/4B69AA',
  //   role: 'admin'
  // });
  // user.save(function (err, user) {
  //   if (err) return console.error(err);
  //   console.log(user.username + ' added');
  // });

  //LEAVE THIS
  
  res.render('public');
});
app.get('/admin', function (req, res) {
  User.find({}, function(err, users) {
    res.render('admin', {users: users});
 });
});
app.get('/register', function (req, res) {
  res.render('register', {
    "title": "Register"
  });
});
app.post('/registerComplete', urlencodedParser, function (req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    age: req.body.age,
    avatarString: req.cookies.avatarString
  });
  var hashedPW = bcrypt.hashSync(user.password);
  console.log(hashedPW);
  var person = new User({
    username: user.username,
    password: hashedPW,
    email: user.email,
    age: user.age,
    avatarString: user.avatarString,
    role: "user"
  });

  person.save(function (err, person) {
    if (err) return console.error(err);
    console.log(person.username + ' added');
  });
  res.redirect('/');
});
app.post('/login', urlencodedParser, function (req, res) {
  User.find({
    username: req.body.username
  }, function (err, document) {
    if(bcrypt.compareSync(req.body.pass, document[0].password)){
      req.session.user = {
        isAuthenticated: true,
        username: req.body.username,
        avatar: document[0].avatarString
      };
      req.cookies.isAuthenticated = 'true';
      res.redirect('/board');
    }
  });
});
app.get('/login', function (req, res) {
  res.render('login', {
    "title": "Login"
  });
});
app.get('/private', checkAuth, function (req, res) {
  res.render('private');
});
app.get('/profile', urlencodedParser, checkAuth, function(req, res){
  var user = new User();
  user = User.where('username', req.session.user.username);
  var user2 ={
    username: user.username,
    password: user.password,
    email: user.email,
    age: user.age,
    avatarString: user.avatarString
  }
  console.log(user2 + "user stuff");
  res.render('profile',
  {
    "title": "Profile",
    "username": user2.username,
    "password": user2.password,
    "email": user2.email,
    "age": user2.username,
    "avatarString": user2.avatarString
  });
});

app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

// app.post('/',urlencodedParser, function(req, res){
//   console.log(req.body.username);
//   if(req.body.username=='user' && req.body.pass=='password'){
//     req.session.user={
//       isAuthenticated: true,
//       username: req.body.username
//     };
//     res.redirect('/private');
//   }else{
//     res.redirect('/');
//   }

// });
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {
  //   var admin = mdb.admin();
  //   admin.addUser('admin', 'adminpassword', {
  //     roles: [{
  //       role : "userAdmin",
  //       db : mdb
  //     }]
  //   },
  //   function(err, result){
  //     if(err){
  //       return console.log("Could not add admin");
  //     }
  //     admin.authenticate('admin', 'adminpassword', function(err, result){
  //       if(err){
  //         return console.log("Could not authenticate admin");
  //       }
  //       console.log("Ok");
  //       mdb.close();
  //     })
  //   }
  // )
  // var admin = mdb.admin();
  // admin.addUser('admin', 'adminpassword', function(err, result){
  //     admin.authenticate('admin', 'adminpassword')
  // })
});

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  age: String,
  avatarString: String,
  role: String
});
var messageSchema = mongoose.Schema({
  avatar: String,
  username: String,
  date: String,
  contents: String
});

var User = mongoose.model('User_Collection', userSchema);
var Messages = mongoose.model('Message_Collection', messageSchema);



app.get('/create', function (req, res) {
  res.render('create', {
    title: 'Add User'
  });
});

app.get('/createUser', function (user) {
  console.log('asd');
  var person = new User({
    username: user.username,
    password: user.password,
    email: user.email,
    age: user.age,
    avatarString: user.avatarString,
    role: "user"
  });
  console.log(person.avatarString);
  person.save(function (err, person) {
    if (err) return console.error(err);
    console.log(person.username + ' added');
  });
});

app.get('/edit', function (req, res) {
  User.findByUsername(req.params.id, function (err, user) {
    if (err) return console.error(err);
    res.render('edit', {
      title: 'Edit Person',
      user: user
    });
  });
});

app.post('/editUser', function (req, res) {
  User.findById(req.params.id, function (err, user) {
      if (err) return console.error(err);
      user.username = req.body.username;
      user.password = req.body.password;
      user.age = req.body.age;
      user.email = req.body.email;
      user.avatarString = req.cookie.avatarString;
  });
});
app.get('/editUser', function (req, res) {
  Person.findById(req.params.id, function (err, user) {
    if (err) return console.error(err);
    user.username = req.body.username;
    user.password = req.body.password;
    user.age = req.body.age;
    user.email = req.body.email;
    user.avatarString = req.cookie.avatarString;

    User.save(function (err, person) {
      if (err) return console.error(err);
      console.log(req.body.name + ' updated');
    });
  });
  res.redirect('/profile');
});

app.get('/delete/:id', function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) return console.error(err);
    res.redirect('/admin');
  });
});

app.get('/posts/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return console.error(err);
    console.log(user.username);
    Messages.find({username: user.username}, function(err, document){
      res.render('posts', {
        "Messages": document
      });
    });
  });
});


app.get('/board', function (req, res) {
  Messages.find({}, function (err, msg) {
    res.render('board', {
      "title": "Messages",
      "Messages": msg
    });
  });


});
app.post('/board', urlencodedParser, function (req, res) {
  var date = new Date().toDateString();
  var msg = {
    img: req.session.user.avatar,
    user: req.session.user.username,
    currentdate: date,
    content: req.body.message
  }
  var post = new Messages({
    avatar: msg.img,
    username: msg.user,
    date: msg.currentdate,
    contents: msg.content
  });

  console.log(req.session.user.username);
  post.save(function (err, post) {
    if (err) return console.error(err);
    console.log(post.date + ' added');
  });
  res.redirect('/board')
});

app.listen(3000);
