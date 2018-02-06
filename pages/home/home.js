// pages/home/home.js
// let api=require('/utils/api.js')
let app = getApp()
let api = require("../../utils/api.js")
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

  // 跳转商品详情页
  goProductitem(event){
    // 商品id
    let id=event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/productItem/productItem?id=' + id
    })
  },
  // 添加商品
  addProduct(event){
    // 商品数量添加
    let id=event.target.dataset.productid
    let categories=this.data.categories
    for(let i=0;i<categories.length;i++){
      let products=categories[i].products
      for(let j=0;j<products.length;j++){
        if(products[j].id===id){
          products[j].num++
          break
        }
      }
    }
    this.setData({
      categories:categories
    })
    app.globalData.categories=categories
    console.log(this.data.categories)
    return
    console.log(app.globalData.userInfo)
    // 用户信息
    let user=app.globalData.userInfo 
    if(user===null){
      wx.navigateTo({
        url: '/userLogin/login'
      })
    }else{
      // 用户购物车初始没有商品直接添加
      if(!user.cart){
        user.cart=[]
        let newProduct=JSON.parse(JSON.stringify(product))
        newProduct.num=1
        user.cart.push(newProduct)
      }else{
        let carts=user.cart
        console.log(carts)
      }
    }
  }
})