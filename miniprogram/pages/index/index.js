// pages/index/index.js
const db = wx.cloud.database()
const _ = db.command
Page({

        /**
         * 页面的初始数据
         */
        data: {
          btnOpac:0.4,
          flag:false,
          isHidden:0,
          isFold:1,
          words:[
            {Word:'success',yinbiao:'',zh:'',bg_image:''},
            {Word:'great',yinbiao:'',zh:'',bg_image:''}
          ],//单词数据
          show:false,//菜单组件显示
          isShow:false
        },
        /**
         * 显示功能
         */
        isSign(openid){
          let id=openid
          console.log("re")
          db.collection('user').where({
            _openid:id,
          }).get({
            // openid:_.eq(id),
           
            success:res=>{
              console.log("res",res)
              if (res.data.length==0){
                db.collection('user').add({
                  data:{
                    openid:id,
                  }
                  
                })
              }
            },
            fail:err=>{
              console.log("err",err)
            }
          })
          
        },
        hidden(){
          let show=this.data.isShow
          console.log(this.data.isShow)
          this.setData({
            isShow:!show
          })
        },
        showFun(e){
          let btn=this.data.btnOpac
          let flag=this.data.flag
          let h=this.data.isHidden
          let fold=this.data.isFold
          this.setData({
            btnOpac:1,
            flag:!flag,
            isHidden:!h,
            isFold:!fold
          })
          // setTimeout(err=>{
          //   this.setData({
          //     flag:false,
          //     isFold:1
          //   })
          // },3000)
          setTimeout(err=>{
            this.setData({
              btnOpac:0.4,

            })
          },5000)
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
        /**显示功能菜单 */
        showMeun(){
          let show=this.data.isShow
          let shows=this.data.show
          this.setData({
            isShow:!show,
            show:true
          })

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

        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {
         let id= wx.getStorageSync('openid')
          if (!id){
            wx.cloud.callFunction({
              name: 'openid',
              complete: res => {
                console.log('callFunction test result: ', res.result.openid)
                this.isSign(res.result.openid)
                wx.setStorageSync('openid', res.result.openid)
              }
            })
          }
         
          // let id=wx.getStorageSync('userinfo')
          // 
        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {

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