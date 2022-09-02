import cf from "../../utils/cf"
const upload=require("../../utils/upload")
// pages/sign/sign.js
Page({

        /**
         * 页面的初始数据
         */
        data: {
                avatar:"../../images/temp_avatar.png"
        },
       
        async onChooseAvatar(e){
                const { avatarUrl } = e.detail
                console.log(e)

                await upload.upload({},"o7tUY5dHjFRkEu6CG5YV0FBKGf3A",{},avatarUrl).then(res=>{
                        console.log(res)
                })
                

               
                this.setData({
                  avatar:avatarUrl
                })
                
               
        },
        async uploadProfile(){
                let avatar=await this.data.avatar
                let nickname=await this.selectComponent("#nickname").data.value
                let phonenumber=await this.selectComponent("#phonenumber").data.value
                if(phonenumber==null){phonenumber=""}
                var flag
                let upload=await cf("uploadpic",{filepath:"avatar",content:avatar},"withLoading").then(res=>{
                        console.log(res)
                })
                //首先查看是否存在用户
                await cf("checkuser").then(res=>{
                        flag=res.data
                        console.log(flag)
                })
                
                if(flag){
                        cf("login",{name:nickname,avatar:avatar,phone:phonenumber},"withLoading").then(res=>{
                                console.log(res)
                                wx.setStorageSync('userinfo', res.data.userinfo)
                                wx.setStorageSync('token', res.data.token)
                                cf("getBooks",{},).then(res=>{
                                        console.log(res)
                                        wx.setStorageSync('wordbook', res.data.data)
                                        wx.showToast({
                                          title: '登陆成功',
                                          icon:"success",
                                          duration:2000
                                        }).then(res=>{
                                                wx.navigateBack({
                                                  delta: 1,
                                                })
                                        })
                                })
                        })
                }
                else{
                        console.log("用户已注册")
                }
                


        },
        getinfo(){
                let avatar=this.data.avatar
                let nickname=this.selectComponent("#nickname").data.value
                let phonenumber=this.selectComponent("#phonenumber").data.value
                return {nickname:nickname,phonenumber:phonenumber,avatar:avatar}
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad(options) {

        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady() {

        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow() {

        },

        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide() {

        },

        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload() {

        },

        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh() {

        },

        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom() {

        },

        /**
         * 用户点击右上角分享
         */
        onShareAppMessage() {

        }
})