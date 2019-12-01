/**
 * Mongo Db conection via mongoose
 * 
 * @export mongoouse.promise
 * 
 */

const mongoose = require('mongoose');

mongoose.connect(/* 'mongodb://localhost:27017/test' */'mongodb+srv://node-chat:fefdi2ki@chat-mjstk.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); 

module.exports = mongoose

