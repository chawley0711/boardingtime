var express = require('express'),
  pug = require('pug'),
  bodyParser = require('body-parser'),
  expressSession = require('express-session'),
  path = require('path');

var app = express();

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

app.post('/',urlencodedParser, function(req, res){
  console.log(req.body.username);
  if(req.body.username=='user' && req.body.pass=='password'){
    req.session.user={
      isAuthenticated: true,
      username: req.body.username
    };
    res.redirect('/private');
  }else{
    res.redirect('/');
  }
  
});

app.listen(3000);