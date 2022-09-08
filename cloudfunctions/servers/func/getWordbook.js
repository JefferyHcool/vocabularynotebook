module.exports=async (args,db,userid)=>{
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
                        _id:(Math.random() + new Date().getTime()).toString(32).slice(0,8),
                        cover:args.cover||color[parseInt(Math.random()*4)],
                        name:args.book_name||"默认单词本",
                        createAt:args.createAt||new Date(),
                        user:userid,
                        words:args.words||[],
                        desc:args.desc||" ",
                }
                let user=await db.collection("user").doc(userid).get();
                let wb=await user.data.wordBook;
                await wb.push({
                        bookname:data.name||"默认单词本",
                        id:data._id,
                        count:0,
                        desc:data.desc,
                        createAt:data.createAt
                })
                await db.collection("user").doc(userid).update({
                       data:{
                        wordBook:wb
                       }
                })
        
                await db.collection("books").add({data});
                return data
        }
        
}