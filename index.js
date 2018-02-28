
var express = require('express'),
  pug = require('pug'),
  bodyParser = require('body-parser'),
  expressSession = require('express-session'),
  path = require('path'),
  cookieParser = require('cookie-parser');
  route = require('./Routes/routes.js');

var app = express();
app.use(cookieParser('secret'));

var checkAuth = function(req, res, next) {
  if(req.session.user && req.session.user.isAuthenticated){
    next();
  }else{
    res.redirect('/');
  }
};

app.set('view engine', 'pug');
app.set('views', __dirname+'/views');
app.use(express.static(path.join(__dirname+'/public')));

app.use(expressSession({
  secret: 'Whatever54321',
  saveUninitialized: true,
  resave: true
}));

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/', function(req, res){
  res.render('public');
});

app.get('/register', function(req, res){
  res.render('register',
  {
    "title": "Register"
  });
});
app.post('/registerComplete', urlencodedParser, function(req, res){
  var user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    age: req.body.age,
    avatarString: req.cookies.avatarString
  }
  route.createUser(user);
  res.redirect('/');
});
app.post('/login', urlencodedParser, function(req, res){
  User.find({username: req.body.username}, function(err, document){
    if(document.password == req.body.password){
      req.session.user = {
        isAuthenticated: true,
        username: req.body.username
      };
      res.redirect('/');
    }
  });
});
app.get('/login', function(req, res){
  res.render('login',
  {
    "title": "Login"
  });
});
app.get('/private', checkAuth, function(req, res){
  res.render('private');
});
app.get('/profile', checkAuth, function(req, res){
  res.render('profile',
  {
    "title": "Profile"
  });
});

app.get('/logout', function(req, res){
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }else{
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
    username: String,
    date: String,
    contents: String
});

var User = mongoose.model('User_Collection', userSchema);
var Messages = mongoose.model('Message_Collection', messageSchema);


app.get('/peopleList', function (req, res) {
    User.find(function (err, user) {
        if (err) return console.error(err);
        res.render('index', {
            title: 'People List',
            user: user
        });
    });
});

app.get('/create', function (req, res) {
    res.render('create', {
        title: 'Add User'
    });
});

app.get('/createUser', function(user) {
    console.log('asd');
    var person = new User({
        username: user.username,
        password: user.password,
        email: user.email,
        age: user.age,
        avatarString: user.avatarString,
        role: "user"
    });
    console.log(person);
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
    res.redirect('/');

});

app.get('/delete', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return console.error(err);
        res.redirect('/');
    });
});

app.get('/details', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        res.render('details', {
            title: user.username + "'s Details",
            user: user
        });
    });
});


app.get('/board', function(req, res){
  res.render('board',
  {
    "title": "Messages"
  });
});

app.listen(3000);