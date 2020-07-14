const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser')
const routerApi = require('./routerDefined')
const insertingData = require('./insertDataApi')
app.use(cors())

const port = 300
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/',function(req,res){
    res.send('Turag')
})


 app.use('/api',routerApi)
 app.use('/api',insertingData)


const exportPort =  app.listen(port,console.log(`Running on port: ${port}`))
module.exports= exportPort
