module.exports=async (openid,db)=>{
        try{
                let res=await db.collection("user").doc(openid).get()
                return res
        }
        catch(e){
                return false
        }
       

        
}