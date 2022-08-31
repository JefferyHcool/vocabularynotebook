module.exports=async (args,db,book_id)=>{
        var color=['linear-gradient(to right, rgb(168, 255, 120), rgb(120, 255, 214))',
        'linear-gradient(to right, rgb(47, 128, 237), rgb(86, 204, 242))',
        'linear-gradient(to right, rgb(252, 128, 250), rgb(244, 196, 243))',
        'linear-gradient(to right, rgb(252, 196, 243), rgb(251, 199, 212))']
        try{
                let book=await db.collection("books").doc(args.book_id).get()
                return book
                
                
                
                
                
        }
        catch{
                let data={
                        _id:book_id||(Math.random() + new Date().getTime()).toString(32).slice(0,8),
                        cover:args.cover||color[parseInt(Math.random()*4)],
                        name:args.book_name,
                        createAt:args.createAt||new Date(),
                        user:args.openid,
                        words:args.words||[],
                        desc:args.desc||" "
                }
        
                await db.collection("books").add({data});
                return data
        }
        
}