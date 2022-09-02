// components/form_input/forminput.js
Component({
        /**
         * 组件的属性列表
         */
        properties: {
                title:{
                        type:String,
                        value:"输入框"
                },
                placeholder:{
                        type:String,
                        value:""
                },
                type:{
                        type:String,
                        value:"text"
                },
                disabled:{
                        type:Boolean,
                        value:false
                },
                maxlength:{
                        type:Number,
                        value:140
                },
                password:{
                        type:Boolean,
                        value:false
                },
                bindblur:{
                        type:String,
                        value:''
                },
                value:{
                        type:String,
                        value:""
                },
                isTop:{
                        type:Boolean,
                        value:true
                }
        },

        /**
         * 组件的初始数据
         */
        data: {
                
        },

        /**
         * 组件的方法列表
         */
        methods: {
                ongettext(e){
                        if(e.detail.value){
                                this.setData({
                                        value:e.detail.value
                                })
                        }
                        
                }
        }
})
