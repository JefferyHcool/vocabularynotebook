export default async function(api,args,withLoading){
        
        try {

                if (withLoading){
                        wx.showLoading({
                          title: '加载中',
                        })
                        }
                let res = await wx.cloud.callFunction({
                       name:"servers",
                       data:{
                               api,
                               args,

                       },
               });
               if (withLoading) {
                wx.hideLoading();
              };
        //        console.log(res);
               return res.result;
               
        
                
        } catch (e) {
                console.error(e);
                if (withLoading) {
                wx.hideLoading();
                }
                wx.showModal({
                title: "网络错误",
                content: e.message,
                });
                return false;
                
        }
}