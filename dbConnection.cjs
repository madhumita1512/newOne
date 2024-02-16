const {MongoClient} = require('mongodb')
let dbConnection 
function connectToDb(callback) {
    dbConnection = MongoClient.connect("mongodb://localhost:27017") .then(function(client){
        dbConnection = client.db()
        callback()
    }).catch(function(error){
        callback(error)
    })
}
function getDb(){
    return dbConnection
}
module.exports={connectToDb,getDb}


