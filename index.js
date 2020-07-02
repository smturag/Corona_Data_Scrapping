const express = require('express')
const app = express()
const mongoConnection = require('./database/connection')
const f = require('./router/dataSet')
const port = 8080
app.listen(port,console.log('connected'))