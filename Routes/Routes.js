// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/data');

// var mdb = mongoose.connection;
// mdb.on('error', console.error.bind(console, 'connection error:'));
// mdb.once('open', function (callback) {
//     // var admin = mdb.admin();
//     // admin.addUser('admin', 'adminpassword', function(err, result){
//     //     admin.authenticate('admin', 'adminpassword')
//     // })
// });

// var userSchema = mongoose.Schema({
//     username: String,
//     password: String,
//     email: String,
//     age: String,
//     avatarString: String,
//     role: String
// });
// var messageSchema = mongoose.Schema({
//     username: String,
//     date: String,
//     contents: String
// });

// var User = mongoose.model('User_Collection', userSchema);
// var Messages = mongoose.model('Message_Collection', messageSchema);


// exports.index = function (req, res) {
//     User.find(function (err, user) {
//         if (err) return console.error(err);
//         res.render('index', {
//             title: 'People List',
//             user: user
//         });
//     });
// };

// exports.create = function (req, res) {
//     res.render('create', {
//         title: 'Add User'
//     });
// };

// exports.createUser = function(user) {
//     console.log('asd');
//     var person = new User({
//         username: user.username,
//         password: user.password,
//         email: user.email,
//         age: user.age,
//         avatarString: user.avatarString,
//         role: "user"
//     });
//     console.log(person);
//     person.save(function (err, person) {
//         if (err) return console.error(err);
//         console.log(person.username + ' added');
//     });
// };

// exports.edit = function (req, res) {
//     User.findByUsername(req.params.id, function (err, user) {
//         if (err) return console.error(err);
//         res.render('edit', {
//             title: 'Edit Person',
//             user: user
//         });
//     });
// };

// exports.editUser = function (req, res) {
//     Person.findById(req.params.id, function (err, user) {
//         if (err) return console.error(err);
//         user.username = req.body.username;
//         user.password = req.body.password;
//         user.age = req.body.age;
//         user.email = req.body.email;
//         user.avatarString = req.cookie.avatarString;

//         User.save(function (err, person) {
//             if (err) return console.error(err);
//             console.log(req.body.name + ' updated');
//         });
//     });
//     res.redirect('/');

// };

// exports.delete = function (req, res) {
//     User.findByIdAndRemove(req.params.id, function (err, user) {
//         if (err) return console.error(err);
//         res.redirect('/');
//     });
// };

// exports.details = function (req, res) {
//     User.findById(req.params.id, function (err, user) {
//         if (err) return console.error(err);
//         res.render('details', {
//             title: user.username + "'s Details",
//             user: user
//         });
//     });
// };
