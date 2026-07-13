const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL=process.env.mongoURL;

mongoose.connect(mongoURL)
const db=mongoose.connection;

db.on('connected',()=>{
    console.log("connected to mondodb server ");
})
db.on('error',(err)=>{
    console.log("mongodb error",err);
})
db.on('disconnected',()=>{
    console.log("server disconnected");
})

module.exports=db;
