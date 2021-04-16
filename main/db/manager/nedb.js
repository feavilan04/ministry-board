const nedb = require('nedb')
const path = require('path')

var datastores={}

datastores.publisher= new nedb({ 
    filename: path.join(__dirname, '..','..','..','data','publishers.db'), 
    autoload: true, 
    timestampData: true })
datastores.cleaning = new nedb({ 
    filename: path.join(__dirname, '..','..','..','data','cleaning.db'), 
    autoload: true, 
    timestampData: true})

module.exports=datastores