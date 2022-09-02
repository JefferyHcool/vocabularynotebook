
wx.cloud.init()

async function upload(filepath,openid,bookid,content){
        let res=await wx.cloud.uploadFile({
                cloudPath:"useravatar/"+(openid||bookid)+".jpeg",
                filePath:content,
               
        })

        return res.fileID
        
}


module.exports={
        upload
}