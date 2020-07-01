const mongoose = require('mongoose')


const uri = "mongodb+srv://CoronaDatabase:coronadatabase@cluster0-1ddou.mongodb.net/CoronaDatabase?retryWrites=true&w=majority";

const connectionDb = mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
  })

  module.exports.connectionDb = async function connectionDb(){
    let connectors= await connectionDb
 

      return connectors
}