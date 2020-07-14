const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
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
            console.log('Find All data');
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
            console.log('find country wise data '); 
            res.send(JSON.stringify(getCountryData))
            
        } catch (error) {
            console.log(error);
            
        }
    }
    
    //Get Data by date and country Matching
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
                            {$indexOfArray:["$CountryData.CountryName",databaseCountryName]}]}

                    }
                }                    
                ]
                
            )
               console.log("getDataDateAndCountryMatching");
            res.send(JSON.stringify(getCountryData))
        } catch (error) {
            console.log(error);
            
        }
    }

    // Delete duplicate date entrys Data

    let CountCountry = async function(req,res){
        let countCountry = await DataModel.aggregate([
            {
                $match: {Date:req.params.date}

            },
            {
                $project:{
                    _id:1,
                    Date:1,
                    "TotalCountry":{$cond:{if:{$isArray:"$CountryData.CountryName"},
                    then:{$size:"$CountryData.CountryName"},else:"NA"}}
                }
            }
        ])
        console.log("CountCountry");
        res.send(JSON.stringify(countCountry))
    }
    
    //Delete Data 
    let deleteData = async function(req,res){
        try {
            let deleteData = await DataModel.deleteOne(
                {"_id": req.params._id}           
            )
            console.log("deleteData");
            res.send(JSON.stringify(deleteData))
            
        } catch (error) {
            console.log(error);
            
        }

    }
    
    router.get('/findAllData',getData).
    get('/getDataDateM/:date',getDataDateMatching).
    get('/getDataDACM/:date/:cn', getDataDateAndCountryMatching).
    get('/countCountry/:date',CountCountry).
    delete('/deleteData/:_id',deleteData)


module.exports = router
