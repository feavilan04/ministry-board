const datastore= require('./manager/nedb.js')
const cleaning_validator = require('./schema/cleaning.js')
const publisher_validator= require('./schema/publisher.js')

const dbs={
    publisher:{
        datastore: datastore.publisher,
        validator: publisher_validator
    },
    cleaning:{
        datastore: datastore.cleaning,
        validator: cleaning_validator
    },
}

module.exports = dbs