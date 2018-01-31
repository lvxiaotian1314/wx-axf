// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:{},
    activeIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app=getApp()
    this.setData({
      categories:app.globalData.categories
    })
    
  },
  select:function(event){
    this.setData({
      activeIndex:event.currentTarget.dataset.index
    })
  }
})