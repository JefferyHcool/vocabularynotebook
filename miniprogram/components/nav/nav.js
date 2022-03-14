// components/nav/nav.js
Component({
        /**
         * 组件的属性列表
         */
        properties: {

        },

        /**
         * 组件的初始数据
         */
        data: {
                ava:"",
                greetWord:["早上好","中午好","下午好","晚上好"],//打招呼数组
                index:0
        },

        /**
         * 组件的方法列表
         */
        lifetimes: {
                // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
                attached: function () {
                        this.getUserAva(),
                        this.greetWord_check()
                 },
                moved: function () { },
                detached: function () { },
              },
        methods: {
                // 查看头像文件是否存在
                getUserAva(){
                        let info=wx.getStorageSync('userinfo')
                        if(info){
                                console.log("i")
                                this.setData({
                                        ava:info.avatarUrl
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
