const nedb = require('nedb')
const path = require('path')

var datastores={}

datastores.publisher= new nedb({ 
    filename: path.join('../../../', 'data', 'publishers.db'), 
    autoload: true, 
    timestampData: true })
datastores.cleaning = new nedb({ 
    filename: path.join('../../../', 'data', 'cleaning.db'), 
    autoload: true, 
    timestampData: true})

module.exports=datastores