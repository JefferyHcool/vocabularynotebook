// app.js
wx.cloud.init()


App({

  Checklogin(){
    var flag=wx.getStorageSync('userinfo')//查看用户是否有登录信息
    // 确认微信是否登录过
    if(!flag){
      wx.showModal({
        title:"提示",
        content:"你还未登录，是否登录",
        confirmText:'确认',
        confirmColor:'confirmColor',
        cancelColor: 'cancelColor',

        success:res=>{

          // console.log(res)
          if (res.confirm){
            wx.getUserProfile({
              desc: '登录解锁更多功能',
              success:res=>{

                // console.log(res)
                
                // wx.setStorageSync('userinfo', res)
                wx.setStorageSync('userinfo', res.userInfo)
                wx.navigateTo({
                  url: 'index',
                })

              },
              fail:err=>{
                console.log(err)
              }
            })

          }
         
        }
      })
      // 登录提示
    }




  },

  onLaunch: function () {
    this.Checklogin()

  
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'cloud1-3g5hazh22bd3c9df',
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
