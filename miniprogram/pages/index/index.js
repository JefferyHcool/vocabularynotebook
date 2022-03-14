// pages/index/index.js
Page({

        /**
         * 页面的初始数据
         */
        data: {
          btnOpac:0.4,
          flag:false,
          isHidden:0,
          isFold:1
        },
        /**
         * 显示功能
         */
        showFun(e){
          this.setData({
            btnOpac:1,
            flag:true,
            isHidden:1,
            isFold:0
          })
          setTimeout(err=>{
            this.setData({
              flag:false,
              isFold:1
            })
          },3000)
          setTimeout(err=>{
            this.setData({
              btnOpac:0.4,
              isHidden:0,

            })
          },4000)
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