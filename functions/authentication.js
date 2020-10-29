"use strict";

require('dotenv').config();

const mongoose = require('mongoose');

const {
  MONGODB_STRING
} = process.env;
console.log(MONGODB_STRING);

module.exports.handler = function (event, context, callback) {
    const checkCredentials = (username, password) => {
      return username == 'admin' && password == 'admin';
    };

    let authenticated;
    const data = event.queryStringParameters;
    mongoose.connect(MONGODB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => console.log('connected database')).catch(e => {
      // let errorBody = JSON.stringify({
      //   status: 'error',
      //   message: 'Došlo je do problema na našim serverima, pokušajte kasnije!'
      // });
      // callback(null, {
      //   statusCode: 500,
      //   body: errorBody
      // })
      console.log(e)
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.log('hey');
      const userSchema = new mongoose.Schema({
        username: String,
        pass: String
      });
      const User = new mongoose.model('User', userSchema);
      authenticated = checkCredentials(data.username, data.pass, User);
    });
    authenticated = checkCredentials(data.username, data.pass);
    let authenticationSuccessBody = JSON.stringify({
      status: 'success',
      message: 'Uspešno ste prijavljeni!'
    });
    let authenticationErrorBody = JSON.stringify({
      status: 'error',
      message: 'Korisničko ime ili šifra su netačni, pokušajte ponovo!'
    });
    callback(null, {
      statusCode: 200,
      // http status code
      body: authenticated ? authenticationSuccessBody : authenticationErrorBody
    })
};