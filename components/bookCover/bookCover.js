

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
             isEdit:{
                     type:Boolean,
                     value:false
             }
             

        },

        /**
         * 组件的初始数据
         */
        data: {
                animationData:{}
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
                showup(){
                       let an= wx.createAnimation({
                          delay: 0,
                          duration:800
                        })
                        an.translateX(1).step();

                },
                MoveToEdit(e){
                        wx.vibrateShort({
                                type:"heavy",
                        })
                        this.setData({
                                isEdit:true
                        })
                        console.log(this.properties.book_id)
                        // const query = this.createSelectorQuery();
                        // let com=query.select("#",e.target.id) 
                },
                rename(e){
                        console.log(e)
                },
                /**取消选择 */
                cancel(e){
                        this.setData({
                                isEdit:false
                        })
                },
                
        }
})
