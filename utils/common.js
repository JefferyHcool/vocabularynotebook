async function page_navigateBack(e){

                // let pages=getCurrentPages()
                // let current=pages.length-1
                // let back_pages=pages[current-1].route
                // console.log(back_pages)
                wx.navigateBack({
                  delta: 1,
                })
          


}
async function upload(){
        
}

module.exports={

        page_navigateBack,
}