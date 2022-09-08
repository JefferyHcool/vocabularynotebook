// pages/index/index.js
import cf from "../../utils/cf"
import check from"../../app"
// const _cache =require("../../utils/cache_image")
// import { promises } from "dns"
Page({

        /**
         * 页面的初始数据
         */
        data: {

          isShow:false,
          wordBook:[],
          isLogin:false,
          ava:"",
          isEdit:false
        },

        NavigateToAddpage(e){
          wx.navigateTo({
            url: '../addBook/addBook',
          })
        },
        /**获取book信息 */
        getBookinfo(){
          
          let userid=wx.getStorageSync('userinfo')._id
          let time=wx.getStorageSync('getAt')
          let wordbook=wx.getStorageSync('wordbook')
          if(time&&wordbook.length!=0){
            // console.log(wordbook)
            // console.log("s")
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
              this.setData({
                        wordBook:res.data.data
                      })
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
        Checklogin(){
          var flag=wx.getStorageSync('userinfo')//查看用户是否有登录信息
          var token=wx.getStorageSync('token')
          var book=wx.getStorageSync('wordbook')
          // 确认微信是否登录过
          if(!flag || !token||!book){
            wx.showModal({
              title:"提示",
              content:"你还未登录，是否登录",
              confirmText:'确认',
              confirmColor:'confirmColor',
              cancelColor: 'cancelColor',
              success:res=>{
                // console.log(res)
                if (res.confirm){
                cf("checkuser").then(res=>{
                        if(!res.data){
                                wx.navigateTo({
                                        url: '../sign/sign',
                                      })
                        }
                        else{
                                cf("login",{},"withLoading").then(res=>{

                                        wx.setStorageSync('userinfo', res.data.userinfo)
                                        wx.setStorageSync('token', res.data.token)

                                        console.log(res)
              
                                        cf("getBooks",{},).then(res=>{
                                                console.log(res)
                                                wx.setStorageSync('wordbook', res.data.data)
                                                wx.showToast({
                                                  title: '登陆成功',
                                                  icon:"success",
                                                  duration:2000
                                                }).then(res=>{
                                                        wx.redirectTo({
                                                          url: 'index',
                                                        })
                                                })
                                        })
                                })
                        }
                })
                       
                //   wx.getUserProfile({
                //     desc: '登录解锁更多功能',
                //     success:res=>{
                //       // console.log(res.userInfo)
                //       wx.setStorageSync('userinfo', res.userInfo)
                      
                //       wx.showToast({
                //         title: '登录成功',
                //         icon:'success',
                //         duration:5000,
                //       }).then(()=>{
                //         let userInfo=wx.getStorageSync("userinfo")
                //         cf("login",{name:userInfo.nickName,avatar:userInfo.avatarUrl}).then(res=>{
                //           console.log(res)
                          
                //           wx.setStorageSync('token', res.data.token)
                //           wx.setStorageSync('userinfo', res.data.userinfo)
                //           // this.getBookinfo()
                          
                //           wx.redirectTo({
                //             url: 'index',
                //           })
                //          }).catch(err=>{
                //            console.log(err)
                //          })
                        
                //       })
                //     },
                //     fail:err=>{
                //       console.error(err)
                      
                //     }
                //   })
      
      
                 
                  
                }else if(res.cancel){
                  wx.showToast({
                    title: '登录失败',
                    icon:'error',
                    duration:2000,
                  })
                }
        
              }
            })
            // 登录提示
          }
      
      
      
      
        },
        /**回到顶部 */
        goTotop(){
          if (wx.pageScrollTo) {
 
            //   //wx.pageScrollTo(OBJECT)
            //   基础库 1.4.0 开始支持，低版本需做兼容处理
            //   将页面滚动到目标位置。
            //   OBJECT参数说明：
            //   参数名	类型	必填	说明
            //   scrollTop	Number	是	滚动到页面的目标位置（单位px）
            //   duration	Number	否	滚动动画的时长，默认300ms，单位 ms
                  wx.pageScrollTo({
                    scrollTop: 0
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '当前微信版本过低，暂无法使用该功能，请升级后重试。'
                  })
                }

        },
        /**
         * 重新获取数据刷新
         */
        async fresh(){
                let time=wx.getStorageSync('isFresh')
                if(time){
                        if(time!=Date.now()){
                                this.setData({
                                        isShow:true,
                                        wordBook:wordbook,
                                        ava:userinfo.avatar
                                })
                                wx.removeStorageSync('isFresh')
                              
                        }
                }
        },
        /**查看是否存在数据 */
        getInfo(){
          let userinfo= wx.getStorageSync('userinfo')
          let wordbook=wx.getStorageSync('wordbook')
        //   let ava_cache=wx.getStorageSync('ava_cache')
          if(userinfo){
            this.setData({
              isShow:true,
              wordBook:wordbook,
              ava:userinfo.avatar
            })
           
            
          }
          else if(!userinfo){
            this.setData({
              isShow:false
            })
          }
        //   _cache._cacheFromId(userinfo.avatar)
        },
        /**
         * 生命周期函数--监听页面加载
         */

        // setOpa(){
        //   this.setData({
        //     btnOpac:0.4
        //   })
        // },
        onLoad: function (options) {

          let login= this.Checklogin()

          


        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {

                this.getInfo()
        //   this.getBookinfo()
          
          
          
        },
        cancelEdit(e,c){
                console.log(e)
                let flag=this.data.isEdit;
                if(flag){
                        this.setData({
                                isEdit:false
                        })
                }
        },
        /**
         * 
         * @param {*} e 
         * 删除单词本或重命名 
         */
        async MoveTodel(e,c){
                
                // console.log('tap Weixin', JSON.stringify(e))
                wx.vibrateShort({
                        type:"heavy",
                })
                this.setData({
                        isEdit:true
                })
                const query = this.createSelectorQuery();
                let com=query.select("#",e.target.id)


                console.log(com)
                // console.log(com._selectorQuery._defaultComponent.data.isEdit)
                
                

        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: async function () {
                
                this.getInfo()
         
        },

        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function () {

        },

        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload: function () {

        },

        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: function () {

        },

        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom: function () {

        },

        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function () {

        }
})