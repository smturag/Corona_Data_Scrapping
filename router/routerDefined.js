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
    const dataCountryName = async function (req,res){
        try {
            let t = new Date
            
            const getTime = new Date().toLocaleString()
            let databaseCountryName = req.params.cn
            console.log(databaseCountryName);
            let getIndex = await DataModel.aggregate([{$project:{
                _id:1,
                index:{$indexOfArray:["$CountryData.CountryName",databaseCountryName]}}
            }])
            console.log(getTime);


        } catch (error) {
            console.log(error);
            
        }
    }
    
    //Get only fix object array
    const getCountryName = async function(req,res){
        
        
        let getCountryData = await DataModel.aggregate([{$project:{"index":{$indexOfArray:["$CountryData.CountryName","Bangladesh"]}}}])
            res.send(JSON.stringify(getCountryData))
            //console.log(abc);
            console.log(getCountryData);

    }
    
    router.get('/findAllData',getData).
    get('/dataCountryname/:cn',dataCountryName).
    get('/getCountryName', getCountryName)
     


module.exports= router
