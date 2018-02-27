// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/data');
//
// var mdb = mongoose.connection;
// mdb.on('error', console.error.bind(console, 'connection error:'));
// mdb.once('open', function (callback) {
// });
//
// var Schema = mongoose.Schema;
//
//
// var userSchema = new Schema({
//     username: String,
//     password: String,
//     userLevel: String,
//     age: String,
//     email: String
// });
//
// var userModel = mongoose.model('userModel', userSchema);
//
// var admin = new userModel({
//     username: 'TestUser',
//     password: 'password',
//     userLevel: '100',
//     age: '100',
//     email: 'Admin@admin.com'
// });
// admin.save(function(err) {
//     if (err) return handleError(err);
// });