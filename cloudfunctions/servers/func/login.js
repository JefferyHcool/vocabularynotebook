const cloud = require("wx-server-sdk");
const jwt=require("jsonwebtoken")
cloud.init()
const jwtSecret='hjwylthjwylthjwyltysys'
const db=cloud.database();
const getUser=require("./getUser")


module.exports.main =async function (userid,args){
       var userinfo=await getUser(args,db,userid)

       let token="Bearer"+jwt.sign({userid},jwtSecret)
       return await {token,userinfo}
}
