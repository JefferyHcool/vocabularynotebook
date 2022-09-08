import cf from "../../utils/cf"
const upload=require("../../utils/upload")
// const _cache=require("../../utils/cache_image")
// pages/sign/sign.js
Page({

        /**
         * 页面的初始数据
         */
        data: {
                avatar:"../../images/temp_avatar.png",
                nickname:"",
                phonenumber:''
        },
       
        async onChooseAvatar(e){

                const { avatarUrl } = e.detail
                console.log(e)
                this.setData({
                        avatar:avatarUrl
                      })

                // await upload.upload({},"o7tUY5dHjFRkEu6CG5YV0FBKGf3A",{},avatarUrl).then(res=>{
                //         console.log(res)
                // })
       
                
                // await _cache._cache(avatarUrl)
              
                // let ava=wx.getStorageSync('ava_cache')
               

                
               
        },
        back(){
                wx.showModal({
                        title:"提醒",
                        content:"取消将不会保存任何数据",
                        success:res=>{
                                if(res.confirm){
                                        wx.navigateBack({
                                          delta: 1,
                                        })
                                }
                        }
                        
                })
        },
        logout(){
                wx.showModal({
                        title:"提醒",
                        content:"您确认退出小程序吗",
                        success:res=>{
                                wx.clearStorageSync()
                                wx.exitMiniProgram()
                        }
                })
        },
        async uploadProfile(){
                var isConfirm;
                await wx.showModal({
                        title:"信息确认",
                        content:"确认修改个人信息",
                }).then(res=>{
                        console.log(res)

                                if(res.cancel){
                                        isConfirm=false
                                }
                                if(res.confirm){
                                        isConfirm=true
                                        console.log("确认")
                                }

                }).catch(err=>{
                        console.log(err)
                })
                let nickname=await this.selectComponent("#nickname").data.value
                if(!nickname){
                        wx.showToast({
                          title: '昵称必填',
                          icon:'error'
                        })
                        return "error"
                }
                if(!isConfirm){
                        wx.showToast({
                                title: '已取消修改',
                                icon:'error'
                              })
                              return "error"
                }
                
                let avatar=await this.data.avatar
                let isChangeAva=avatar.indexOf(0)=="63"
                let phonenumber=await this.selectComponent("#phonenumber").data.value
                let filid=avatar.indexOf(0)=="63"||await upload.upload({},"",avatar)
                
                // console.log(filid)
                //首先查看是否存在用户
                var flag
                await cf("checkuser").then(res=>{
                        flag=res.data
                        console.log(flag)
                })
       
                if(!flag){
                        cf("login",{name:nickname,avatar:filid,phone:phonenumber},"withLoading").then(res=>{
                                // console.log(res)
                                wx.setStorageSync('userinfo', res.data.userinfo)
                                 //缓存头像
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
                        if(isChangeAva){
                                console.log("no change")
                                filid=avatar
                                let ava_cache=wx.getStorageSync('ava_cache')

                        }
                        
                        console.log("用户已注册")
                        cf("updateUser",{name:nickname,avatar:filid,phone:phonenumber},"withLoading")
                        .then(res=>{
                                console.log(res)
                                        wx.setStorageSync('userinfo', res.data.data)
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
                


        },
        getinfo(){

                this.selectComponent("#phonenumber").data.value
                let userinfo=wx.getStorageSync('userinfo')
                // let ava_cache=wx.getStorageSync('ava_cache')
                
                if(userinfo){
                        this.selectComponent("#phonenumber").data.value=
                        this.selectComponent("#nickname").data.value=userinfo.name
                        this.setData({
                                avatar:userinfo.avatar,
                                phonenumber:userinfo.phone,
                                nickname:userinfo.name
                        })
                }
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad(options) {
                this.getinfo()
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