const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataSchema = new Schema({     
    "Date": String,
    "CountryData":{
        "CountryName": [String],
        "TotalCases": [String],
        "NewCases": [String],
        "TotalDeaths": [String],
        "NewDeaths": [String],
        "TotalRecovered": [String],
        "ActiveCases": [String],
        "Serious": [String],
        "Population": [String],

    }
    
})

module.exports =  mongoose.model('DataModel', dataSchema)
