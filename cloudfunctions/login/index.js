// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async () => {
        
        var userInfo
        ({
          desc: '获取用户信息以此来登录，解锁更多功能',
          success:res=>{
                  console.log(res)
          },
          fail:err=>{
                console.log(err)
          }
          

        })

        return {
                // event,
                // openid: wxContext.OPENID,
                // appid: wxContext.APPID,
                // unionid: wxContext.UNIONID,
                userinfo:userInfo
        }
}