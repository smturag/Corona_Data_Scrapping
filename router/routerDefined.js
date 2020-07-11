const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
//const mongoose = require('mongoose')
const DataModel = require('../database/dataModel')
const sData = require('../webScrpar/pageScrapper')
const dataModel = require('../database/dataModel')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));



// find All Data 

    const getData = async function(req,res){
        try {
            const getAllData = await DataModel.find()
            res.send(JSON.stringify(getAllData))
        } catch (error) {
            console.log(err);
            
        }
    }

    //find country wise data 
    const getDataDateMatching = async function (req,res){
        try {
                
            let date = req.params.date
            let getCountryData = await DataModel.aggregate(
                [
                    
                    {
                       $match: {Date:date}
                    },
                    {
                        $project:{
                            _id:0
                        }
                    }
       
                ]
            )
               
            res.send(JSON.stringify(getCountryData))
        } catch (error) {
            console.log(error);
            
        }
    }
    
    //Get only fix object array
    const getDataDateAndCountryMatching = async function (req,res){
        try {
                
            let date = req.params.date
            let databaseCountryName = req.params.cn
           

            let getCountryData = await DataModel.aggregate(
                [
                    
                    {
                       $match: {Date:date}
                    },
                    {
                        $project:{
                        _id: 0,
                        TotalCases:{$arrayElemAt:["$CountryData.TotalCases", 
                            {$indexOfArray:["$CountryData.CountryName",databaseCountryName]}]},
                        NewCases:{$arrayElemAt:["$CountryData.NewCases", 
                            {$indexOfArray:["$CountryData.CountryName",databaseCountryName]}]},
                        TotalDeaths: {$arrayElemAt:["$CountryData.TotalDeaths", 
                            {$indexOfArray:["$CountryData.CountryName",databaseCountryName]}]},
                        NewDeaths: {$arrayElemAt:["$CountryData.NewDeaths", 
                            {$indexOfArray:["$CountryData.CountryName",databaseCountryName]}]},
                        TotalRecovered: {$arrayElemAt:["$CountryData.TotalRecovered", 
                            {$indexOfArray:["$CountryData.CountryName",databaseCountryName]}]},
                        ActiveCases: {$arrayElemAt:["$CountryData.ActiveCases", 
                            {$indexOfArray:["$CountryData.CountryName",databaseCountryName]}]},
                        Serious: {$arrayElemAt:["$CountryData.Serious", 
                            {$indexOfArray:["$CountryData.CountryName",databaseCountryName]}]},
                        Population: {$arrayElemAt:["$CountryData.Population", 
                            {$indexOfArray:["$CountryData.CountryName",databaseCountryName]}]},

                    }
                }                    
                ]
            )
               
            res.send(JSON.stringify(getCountryData))
        } catch (error) {
            console.log(error);
            
        }
    }
    
    router.get('/findAllData',getData).
    get('/getDataDateM/:date',getDataDateMatching).
    get('/getDataDACM/:date/:cn', getDataDateAndCountryMatching)
     


module.exports= router
