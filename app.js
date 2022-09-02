// app.js

import cf from './utils/cf'
wx.cloud.init()
App({
  getBookinfo(){
          
    let userid=wx.getStorageSync('userinfo')._id
    let time=wx.getStorageSync('getAt')
    let wordbook=wx.getStorageSync('wordbook')
    if(time){
      console.log("s")
      let now=Date.now()
      if(now-time<360000){
        this.setData({
          wordBook:wordbook
        })
      }
     
    }
    else{
      console.log("ss")
      var bookinfo=[]
      cf("getBooks",{},"withLoading").then(res=>{
        
        wx.setStorageSync('wordbook', res.data.data)
        wx.setStorageSync('getAt', Date.now())
      })
      // books.forEach(e => {
      //     console.log(e.id)
      //     cf("getBook",{"book_id":e.id},"withLoading").then(res=>{
      //       bookinfo.push(res.data)
      //       this.setData({
      //         wordBook:bookinfo
      //       })
      //       wx.setStorageSync('wordbook', bookinfo)
      //       wx.setStorageSync('getAt', Date.now())
      //     })
      // });
  
    }
    
    
   
  },
  
  onLaunch: function () {
    // this.Checklogin()

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }

    this.globalData = {};
  },
  getSystemInfo: function () {
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        t.globalData.systemInfo = res;
      }
    });
  },

  
});
