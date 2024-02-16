const express = require ('express')
const app = express('path')
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())
const {ObjectId} =require('mongodb')
const { connectToDb,getDb } = require('./dbConnection.cjs')
 connectToDb(function(error){
    if(error){
        console.log("can't establish")
    }else{
        const port = process.env.PORT || 8000
        app.listen(8000)
        db=getDb()
        console.log("listening")
    }
 })
 app.post('/add-datas',function(request,response){
    var email = request.body.email;
    var password = request.body.password;
    // const signUp = async (req,res)=>
    db.collection('signin').findOne({email}).then((result) => {
        console.log(result)
        if(result){
            response.status(200).json({
                'status':'user logged'
            })
          }  else{
            response.status(500).json({
                'status':'Invalid user'
            })
          }
    })
    
})
//signup
app.post('/add-data',function(request,response){
    var email = request.body.email;
    var password = request.body.password;
    db.collection('signin').findOne({email}).then((result) => {
        console.log(result)
        if(result){
            response.status(500).json({
                'status':'You already registered'
            })
        } else {
            db.collection('signin').insertOne(request.body).then(function(){
                response.status(201).json({
                    'status':'data added'

                    
                })
            }).catch(function(){
                response.status(500).json({
                    'status':'data is not added'
                })
            }) 
           
        } 
    })
})
 
app.get('/get-data',function(request,response) {
    const datas = [] 
    db.collection('signin')

    .find() 
    .forEach(entry => datas.push(entry)).then(function(){
        response.status(200).json(datas)
    }).catch(function(){ 
        response.status(500).json({
            "status" : "entry is not added"
        })
    })
 } )