const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataSchema = new Schema({
    "Date": Date,
   
    "countryData":[
        {
            "CountryName": Array,
            "TotalCases": Array,
            "NewCases": Array,
            "TotalDeaths": Array,
            "NewDeaths": Array,
            "TotalRecovered": Array,
            "ActiveCases": Array,
            "Serious": Array,
            "Population": Array,

        }
    ]

})

module.exports =  mongoose.model('DataModel', dataSchema)
