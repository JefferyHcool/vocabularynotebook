

async function _cache(url){
        wx.downloadFile({
          url: url,
          success:res=>{
                  const fs=wx.getFileSystemManager()
                  fs.saveFile({
                          tempFilePath:res.tempFilePath,
                          success:res=>{
                                  console.log("成功")
                                  wx.setStorageSync("ava_cache", res.savedFilePath)
                          }
                  })
          }
        })
}

async function _cacheFromId(fileid){
         wx.cloud.downloadFile({
                fileID:fileid,
                success:res=>{
                        const fs=wx.getFileSystemManager()
                  fs.saveFile({
                          tempFilePath:res.tempFilePath,
                          success:res=>{
                                  console.log(res)
                                  wx.setStorageSync("ava_cache", res.savedFilePath)
                          },
                          fail:err=>{
                                  console.log(err)
                          }
                  })
                },
                fail:err=>{
                        console.log(err)
                }
        })
        return "finish"
}

module.exports={
        _cache,_cacheFromId
}