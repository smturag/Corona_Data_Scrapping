// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const dataSchema = new Schema({
//     "Date": Date,
//     "countryData":[
//         {
//             "CountryName": String,

//         }
//     ]

// })
const abc  = require('../webScrpar/pageScrapper')
async function f(){
    const c = {
        "user": await (await abc.sData()).Country
    }
    console.log(c.user);
}
module.exports.f = f
