const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')

cloud.init()
module.exports=async (filepath,content,userid)=>{
        return await cloud.uploadFile({
                cloudPath:'useravatar/'+userid+".jpeg",
                fileContent:content,
        })
}