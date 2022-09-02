
wx.cloud.init()
function GenNonDuplicateID(){
        return Math.random().toString(36).substr(3)
      }
async function upload(filepath,bookid,content){
        try{
                let id=await GenNonDuplicateID()
                let cloudPath="useravatar/"+id+".jpeg"
                console.log(id,cloudPath)
                let res=await wx.cloud.uploadFile({
                        cloudPath:cloudPath,
                        filePath:content,
                       
                })
                console.log(res)
                return res.fileID
        }
        catch(e){
                console.log("error",e)
                wx.showToast({
                  title: '头像上传错误',
                  icon:'error'
                })
        }
        
}


module.exports={
        upload
}