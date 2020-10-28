require('dotenv').config()
const mongoose = require('mongoose')

const {MONGODB_STRING} = process.env



module.exports.handler = async function(event, context) {
    
    try{
        const checkCredentials = (username, password) => {
            return (username == 'admin' && password == 'admin')
        }

        let authenticated;
    
        const data = event.queryStringParameters
    
        mongoose.connect(MONGODB_STRING, {useNewUrlParser: true, useUnifiedTopology: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            const userSchema = new mongoose.Schema({
                username: String,
                pass: String
            })
            
            authenticated = checkCredentials(data.username, data.pass, User)
        });
        
        
        authenticated = checkCredentials(data.username, data.pass)

        let authenticationSuccessBody = JSON.stringify({
            status:'success',
            message: 'Uspešno ste prijavljeni!'
        }) 

        let authenticationErrorBody = JSON.stringify({
            status:'error',
            message: 'Korisničko ime ili šifra su netačni, pokušajte ponovo!'
        }) 
        return {
          // return null to show no errors
          statusCode: 200, // http status code
          body: authenticated ? authenticationSuccessBody : authenticationErrorBody,
        }
    }catch(error){
        let errorBody = JSON.stringify({
            status:'error',
            message:'Došlo je do problema na našim serverima, pokušajte kasnije!'
          })          
          return {
          statusCode:500,
          body: errorBody
      }
    }
  }