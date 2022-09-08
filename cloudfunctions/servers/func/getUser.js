
const book=require("./getWordbook")
module.exports=async (args,db,openId)=>{
        var isExit
        try {
                let user=await db.collection("user").doc(openId).get()
                return user.data
               
                //添加用户
                
        } catch (error) {
                let data={
                        _id:openId,
                        name:args.name,
                        avatar:args.avatar,
                        phone:args.phone,
                        createAt:new Date(),
                        wordBook:[],
                }
                await db.collection("user").add({data});
                await book({},db,openId);
                return data;
        }

        


}