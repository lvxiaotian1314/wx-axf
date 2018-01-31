// pages/home/home.js
// let api=require('/utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    categories:{},
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp()
    let api=require("../../utils/api.js")
    this.setData({
      categories:app.globalData.categories
    })
    wx.request({
      url: api.host+"/bannar",
      success:res=>{
        let imgUrls=[]
        for(let i=0;i<res.data.length;i++){
          imgUrls.push(res.data[i].bannar_img)
        }
        this.setData({
          imgUrls:imgUrls
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})