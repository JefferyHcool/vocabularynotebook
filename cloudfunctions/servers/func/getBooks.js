module.exports=async (userid,db)=>{
        
        let data= await db.collection("books").where({
                user:userid
        }).get()
        return data
        

}