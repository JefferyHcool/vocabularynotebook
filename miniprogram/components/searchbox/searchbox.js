// components/searchbox/searchbox.js
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
                "word":""
        },

        /**
         * 组件的方法列表
         */
        methods: {
                // 获取用户输入
                word:function(e){
                        let inputvalue=console.log("用户输入值:",e.detail.value)
                }
        }
})
