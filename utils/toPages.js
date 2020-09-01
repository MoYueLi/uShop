/**
 * 延迟执行跳转页面
 * @param url 页面地址
 */
export const toPage = (url) => {
  let t = setTimeout(()=>{
    uni.reLaunch({url})
    clearTimeout(t)
  },1500)
}

/**
 * 跳转搜索页面
 * @param keywords 搜索关键字
 */
export const toSearchPage= (keywords)=>{
  if (!keywords){
    uni.showToast({
      title:'请输入搜索内容',
      icon:'none'
    })
    return
  }
  uni.navigateTo({url:'/pages/search/search?keywords='+keywords})
}
