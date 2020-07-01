const express = require('express')
const app = express()
const mongoConnection = require('./database/connection')
// const f  = require('./database/dataModel')
const db = require('./webScrpar/pageScrapper')






//const pageScrapper = require('./webScrpar/pageScrapper')
  //const htmlData = pageScrapper.sData
const port = 8080

app.listen(port,console.log('connected'))