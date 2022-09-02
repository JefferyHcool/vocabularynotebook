// components/nav/nav.js
Component({
        /**
         * 组件的属性列表
         */
        properties: {
                isNormal:{
                        type:Boolean,
                   value:false},
                title:{
                        type:String,
                        value:''
                },
                ava:{
                        type:String,
                        value:'../../images/temp_avatar.png'
                }
        },

        /**
         * 组件的初始数据
         */
        data: {
                // ava:"",
                greetWord:["早上好","中午好","下午好","晚上好"],//打招呼数组
                index:0
        },

        /**
         * 组件的方法列表
         */
        lifetimes: {
                // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
                attached: function () {
                        
                 },
                ready:function(){
                        this.getUserAva(),
                        this.greetWord_check()
                },
                moved: function () { },
                detached: function () { },
              },
        methods: {
                touserinfo(){
                        wx.navigateTo({
                          url: '../sign/sign',
                        })
                },
                navigateback(){
                        // let pages=getCurrentPages()
                        // let current=pages.length-1
                        // let back_pages=pages[current-1].route
                        // console.log(back_pages)
                        wx.navigateBack({
                          delta: 1,
                        })
                  
                },
                // 查看头像文件是否存在
                getUserAva(){
                        let info=wx.getStorageSync('userinfo')
                        if(info){
                                this.setData({
                                        ava:info.avatar
                                })    
                        }
                        else{
                                this.setData({
                                        ava:"../../images/temp_avatar.png"
                                })
                        }
                },
                // 获取时间 判断问候语
                greetWord_check(){
                        let time=new Date()
                        console.log(time.getHours())
                        time=time.getHours()
                        if(time>=5&time<12){
                                this.setData({
                                        index:0
                                })
                        }
                        if(time>=12&time<13){
                                this.setData({
                                        index:1
                                })
                        }
                        if(time>=13&time<19){
                                this.setData({
                                        index:2
                                })
                        }
                        else{
                                this.setData({
                                        index:3
                                })
                        }

                }
        }
})
