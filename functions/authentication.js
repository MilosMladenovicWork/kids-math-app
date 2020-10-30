"use strict";

require('dotenv').config();

const mongoose = require('mongoose');

var co = require('co');

let conn = null;
const {
  MONGODB_STRING
} = process.env;

module.exports.handler = function (event, context, callback) {
  const data = event.queryStringParameters;
  context.callbackWaitsForEmptyEventLoop = false;
  run(data).then(res => {
    callback(null, res);
  }).catch(error => callback(error));
};

const goodCredentials = async (username, password, Model) => {
  let user = await Model.find({
    username: username,
    pass: password
  });
  return user.length > 0;
};

function run(data) {
  return co(function* () {
    if (conn == null) {
      conn = yield mongoose.createConnection(MONGODB_STRING, {
        bufferCommands: false,
        bufferMaxEntries: 0,
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
      conn.model('users', new mongoose.Schema({
        username: String,
        pass: String
      }));
    }

    const User = conn.model('users');
    let authenticated = yield goodCredentials(data.username, data.pass, User);
    let response;

    if (authenticated) {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          status: 'success',
          message: 'Uspešno ste prijavljeni!'
        })
      };
    } else {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          status: 'error',
          message: 'Korisničko ime ili šifra su netačni, pokušajte ponovo!'
        })
      };
    }

    return response;
  });
} //     mongoose.connect(MONGODB_STRING, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     })
//     .then(() => {
//         console.log('database connected')
//     }).catch(e => {
//         console.log(e)
//         let errorBody = JSON.stringify({
//             status: 'error',
//             message: 'Došlo je do problema na našim serverima, pokušajte kasnije!'
//         });
//         return callback(null, {
//             statusCode: 500,
//             body: errorBody
//         })
//     });
//     const db = mongoose.connection;
//     // db.on('error', function(error){
//     //   console.log(error)
//     //   let errorBody = JSON.stringify({
//     //     status: 'error',
//     //     message: 'Došlo je do problema na našim serverima, pokušajte kasnije!'
//     //   });
//     //   callback(null, {
//     //     statusCode: 500,
//     //     body: errorBody
//     //   })
//     // });
//     db.once('open', () => {
//       console.log('hey');
//       // const userSchema = new mongoose.Schema({
//       //   username: String,
//       //   pass: String
//       // });
//       // const User = new mongoose.model('User', userSchema);
//       let authenticated = checkCredentials(data.username, data.pass);
//       let authenticationSuccessBody = JSON.stringify({
//           status: 'success',
//           message: 'Uspešno ste prijavljeni!'
//         });
//         let authenticationErrorBody = JSON.stringify({
//             status: 'error',
//             message: 'Korisničko ime ili šifra su netačni, pokušajte ponovo!'
//         });
//         console.log(authenticationSuccessBody)
//       return callback(null, {
//         statusCode: 200,
//         body: authenticated ? authenticationSuccessBody : authenticationErrorBody
//       })
// });