
// const book=require("./getWordbook")
module.exports=async (args,db,openId)=>{
        var isExit
        try {
                let data={
                        name:args.name,
                        avatar:args.avatar,
                        phone:args.phone,
                        changeAt:new Date(),
                }
                let update_user=await db.collection("user").doc(openId).update({
                        data
                })
                let res=await db.collection("user").doc(openId).get()
                return res
               
                //添加用户
                
        } catch (error) {
                let data={
                        _id:openId,
                        name:args.name,
                        avatar:args.avatar,
                        phone:args.phone,
                        createAt:new Date(),
                        wordBook:[{
                                bookname:'默认单词本',
                                id:(Math.random() + new Date().getTime()).toString(32).slice(0,8),
                                count:0,
                                desc:'第一本单词本',
                                createAt:new Date(),
                        }],
                }
                await db.collection("user").add({data});
                await book({desc:data.wordBook[0].desc,book_name:data.wordBook[0].bookname,createAt:data.createAt,openid:data._id},db,data.wordBook[0].id);
                return data;
        }

        


}