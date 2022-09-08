// pages/addBook.js
import cf from "../../utils/cf";
import common from "../../utils/common"

Page({

        /**
         * 页面的初始数据
         */
        data: {

        },
        page_navigaetBack(e){
                
                common.page_navigateBack(e)
        },

        /***
         * 获取书本信息
        */
        async getbookname(){
                let bookname=await this.selectComponent("#bookname").data.value;
                let bookdesc=await this.selectComponent("#bookdesc").data.value;

                if(!bookname){
                        wx.showToast({
                          title: '未填写书名',
                          icon:"error"
                        })
                        return 0;
                }
                let confirm;
                await wx.showModal({
                        title:"确认",
                        content:"确认创建",
                }).then(res=>{
                        if(res.confirm){
                                confirm=true;
                                // console.log(confirm)
                        }
                        else{
                                confirm=false;
                        }
                })
                if(confirm){
                        await cf("getBook",{book_name:bookname,desc:bookdesc},"withLoading").then(res=>{
                                cf("login").then(res=>{
                                        wx.setStorageSync('userinfo', res.data.userinfo)
                                        cf("getBooks").then(res=>{
                                                wx.setStorageSync('wordbook', res.data.data)
                                                wx.showToast({
                                                  title: '创建成功',
                                                  icon:"success"
                                                }).then(res=>{
                                                        wx.navigateBack({
                                                          delta: 1,
                                                        })
                                                })
                                        })
                                        wx.setStorageSync('isFresh', Date.now())
                                
                                })
                                
                                
                        })
                       
                }

        },

        /**
         * 生命周期函数--监听页面加载
         * 
         */
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