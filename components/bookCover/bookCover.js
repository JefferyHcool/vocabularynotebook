

// components/bookCorver.js
Component({
        /**
         * 组件的属性列表
         */
        properties: {
                book_id:{
                        type:String,
                   value:""},
             bookname:{
                     type:String,
                     value:""
             },
             desc:{
                     type:String,
                     value:""
             },
             counts:{
                     type:Number,
                     value:0
             },
             cover:{
                     type:String,
                     value:""
             },
             

        },

        /**
         * 组件的初始数据
         */
        data: {
               
        },
        lifetimes:{
                ready:function(){
                        // this.Test()
                }
        },

        /**
         * 组件的方法列表
         */
        methods: {
                Test(){
                        console.log(this.properties.book_id)
                }
        }
})
