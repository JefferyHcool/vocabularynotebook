// 云函数入口文件
const cloud = require('wx-server-sdk')
const getUser=require("./func/getUser")
const getBooks=require("./func/getBooks")
const getWorkbook=require("./func/getWordbook")
const login=require('./func/login.js')
const jwt=require("jsonwebtoken")
const checkuser=require("./func/checkuser")
const uploadpic=require("./func/uploadpic")
const updateUser=require("./func/updateUser")
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
                        let res=await login.main(userid,args)
                        return  {mesg:200,data:res,id:userid}
                case 'getUser':
                        return await getUser();
                case 'getBook':
                        let getBook=await getWorkbook(args,db,{})
                        return await {mesg:200,data:getBook};
                case "getBooks":
                        let getBooks_data=await getBooks(userid,db)
                        return await {mesg:200,data:getBooks_data}
                case "checkuser":
                        let checkuser_data=await checkuser(userid,db)
                        return await{mesg:200,data:checkuser_data}
                case "uploadpic":
                        let upload_res=await uploadpic(event.args.filepath,event.args.content,userid)
                        return await{mesg:200,data:upload_res}
                case "updateUser":
                        let updateUser_data=await updateUser(args,db,userid)
                        return await{mesg:200,data:updateUser_data}
        }
       
}