 
 const request = require('request-promise');
 const cheerio = require('cheerio');
 const htt = require('cheerio-html-to-text')
 var tabletojson = require('tabletojson').Tabletojson;
 const fs = require('fs');
 const cheerioTableparser = require('cheerio-tableparser');

 
 
//const cheerioTableparser = require('cheerio-tableparser');

async function sData(){
  

  try {
    const result = await request.get("https://www.worldometers.info/coronavirus/");
    const $ = await cheerio.load(result)
    let countryName = []

    // country array
    await $('.mt_a').each((i,e)=>{
      countryName.push($(e).text().trim())
    })
    
    //country uniqueness

    let uniqueValue = (v,i,s)=>{
      return s.indexOf(v)=== i
    }
    let uniqueCountryName=[]
   
   uniqueCountryName = await countryName.filter(uniqueValue)   
    
    let gatherData =[]
    await $('#main_table_countries_today ').each((i,e)=>{
      gatherData=($(e).text());
    })

    async function dataManufacture(gatherData,uniqueCountryName){
      let Country = []
      let TotalCases =[]
      let NewCases = []
      let TotalDeaths =[]
      let NewDeaths =[]
      let TotalRecovered =[]
      let NewRecovered = []
      let ActiveCases = []
      let Serious = []
      let Population =[]
      // const dTime = new Date().toLocaleString()
      let missingCountry=[]

      makeArrayData = await (gatherData.split('\n'))
  
      for(let i = 0; i<=makeArrayData.length; i++){
        for(let j = 0; j<=uniqueCountryName.length; j++){
          if(makeArrayData[i]=== uniqueCountryName[j]){            
            Country.push(uniqueCountryName[j])
            TotalCases.push(makeArrayData[i+1])
            NewCases.push(makeArrayData[i+2])
            TotalDeaths.push(makeArrayData[i+3])
            NewDeaths.push(makeArrayData[i+4])
            TotalRecovered.push(makeArrayData[i+5])
            NewRecovered.push(makeArrayData[i+6])
            ActiveCases.push(makeArrayData[i+7])
            Serious.push(makeArrayData[i+8])
            Population.push(makeArrayData[i+13])

          }        
        }        
      }   
            
      return{Country,TotalCases,NewCases,TotalDeaths,NewDeaths,TotalRecovered,ActiveCases,Serious,Population}

    }
    
    const getData = await dataManufacture(gatherData,uniqueCountryName)
    return getData
  } 
  catch (error) {
    console.log(error)    
  }
}

  

module.exports.sData = sData

