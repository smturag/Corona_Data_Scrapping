const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const DataModel = require('../database/dataModel')
const sData = require('../webScrpar/pageScrapper')
const dataModel = require('../database/dataModel')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


 const postData = async function (req,res,next){
    let cSize = await (await sData.sData()).Country.length  
    console.log(cSize);
    var nowDate = new Date(); 
    var tdate = nowDate.getDate()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getFullYear();
    // let tdate = new Date().toLocaleString().replace('/','-' ).replace('/','-' ).
    
        
        const dataInsert = new DataModel({
            "Date": tdate,
            //"Date": await (await sData.sData()).dTime,
            "CountryData":{
            "CountryName": await (await sData.sData()).Country,
            "TotalCases":await (await sData.sData()).TotalCases,
            "NewCases": await (await sData.sData()).NewCases,
            "TotalDeaths": await (await sData.sData()).TotalDeaths,
            "NewDeaths": await (await sData.sData()).NewDeaths,
            "TotalRecovered": await (await sData.sData()).TotalRecovered,
            "ActiveCases": await (await sData.sData()).ActiveCases,
            "Serious": await (await sData.sData()).Serious,
            "Population": await (await sData.sData()).Population            
            
            }})

        console.log('aaa');
        dataInsert.save(function(err){
            if(err) return console.log(err);
        })
        res.send(JSON.stringify(dataInsert))
    }


    
    
    router.post('/dataPost',postData)
    
    module.exports = router