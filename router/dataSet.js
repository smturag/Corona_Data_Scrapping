
const mongoose = require('mongoose')
const DataModel = require('../database/dataModel')
const sData = require('../webScrpar/pageScrapper')

 
const postData = async function (req,res,next){
    let cSize = await (await sData.sData()).Country.length
    console.log(cSize);
    
        const dataInsert = new DataModel({
            "Date": await (await sData.sData()).dTime,
            
        
            
            "countryData":[
                {
                    "CountryName": await (await sData.sData()).Country,
                    "TotalCases":await (await sData.sData()).TotalCases,
                    "NewCases": await (await sData.sData()).NewCases,
                    "TotalDeaths": await (await sData.sData()).TotalDeaths,
                    "NewDeaths": await (await sData.sData()).NewDeaths,
                    "TotalRecovered": await (await sData.sData()).TotalRecovered,
                    "ActiveCases": await (await sData.sData()).ActiveCases,
                    "Serious": await (await sData.sData()).Serious,
                    "Population": await (await sData.sData()).Population
                       
                }
            ]
    
        })
        console.log('aaa');
        dataInsert.save(function(err){
            if(err) return console.log(err);
        })

    }
     


module.exports.abc= postData()
