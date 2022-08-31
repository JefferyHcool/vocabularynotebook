// 云函数入口文件
const cloud = require('wx-server-sdk')
const getUser=require("./func/getUser")
const getBooks=require("./func/getBooks")
const getWorkbook=require("./func/getWordbook")
const login=require('./func/login.js')
const jwt=require("jsonwebtoken")
cloud.init()
const jwtSecret='hjwylthjwylthjwyltysys'
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
        console.log(event)
        var userid=await event.userInfo.openId
        var args=await event.args

        
       
        switch(event.api){
                case 'login':
                        var res=await login.main(userid,args)
                        return  {mesg:200,data:res,id:userid}
                case 'getUser':
                        return await getUser();
                case 'getBook':
                        var data=await getWorkbook(args,db,{})
                        return await {mesg:200,data:data};
                case "getBooks":
                        var data=await getBooks(userid,db)
                        return await {mesg:200,data:data}
        }
       
}