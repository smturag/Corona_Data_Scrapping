const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routerApi = require('./routerDefined')
const insertingData = require('./insertDataApi')

const port = 300
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/',function(req,res){
    res.send('Turag')
})


 app.use('/api',routerApi)
 app.use('/inserting',insertingData)


const exportPort =  app.listen(port,console.log(`Running on port: ${port}`))
module.exports= exportPort
