//app.js
let api = require('../utils/api.js')
let app=getApp()
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgBol:true,
    phone:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp()
   
  },
  focus(){
    this.setData({
      bgBol:false
    })
    console.log(this.data.bgBol)
  },
  blur(){
    setTimeout(()=>{
      this.setData({
        bgBol: true
      })
    },1000)
  },
  // 文本框输入值
  inputValue(event){
    let phone = event.detail.value
    this.setData({
      phone:phone
    })
  },
  // 确定
  login(){
    let resPhone=/^1[3,4,5,7,8]\d{9}$/g
    // 没有输入号码
    if(!this.data.phone){
      wx.showModal({
        title: '提示',
        content: '请输入手机号码',
        showCancel:false
      })
      return
    }
    // 输入错误
    if(!resPhone.test(this.data.phone)){
      wx.showModal({
        title: '提示',
        content: '手机号码输入有误，请重新输入',
        showCancel: false
      })
      return
    }
    let user = {
      "phone": this.data.phone,
      "cart": []
    }
    wx.request({
      url: api.host+"/users",
      success:res=>{
        if(res.data.length>0){
          let tmpData=res.data
          let bol=true
          for(let i=0;i<tmpData.length;i++){
            if(tmpData[i].phone==this.data.phone){
              bol=false
              // 用户信息录入本地状态
              app.globalData.userInfo=tmpData[i]
            }
          }
          // 已注册
          if(!bol){
            // 用户信息录入本地状态
            wx.showModal({
              title: '提示',
              content: '登录成功',
              showCancel: false,
              success:res=>{
                if(res.confirm){
                  wx.switchTab({
                    url: "/pages/home/home"
                  })
                }
              }
            })
            
          }else{
            // 去注册
            this.register(user)
          }
        }else{
          // 数据库没用户数据去注册
          this.register(user)
        }
      }
    })
  },
  register(user){
    wx.request({
      url: api.host+"/users",
      method:"POST",
      header: {"Content-Type": "application/x-www-form-urlencoded"},
      data:user,
      success:res=>{
        if(res.data.id>0){
          app.globalData.userInfo=res.data
          console.log(app.globalData.userInfo)
          wx.showModal({
            title: '提示',
            content: '注册成功',
            showCancel: false,
            success: () => {
              wx.switchTab({
                url: '/pages/home/home'
              })
            }
          })
        }
      },
      fails:res=>{
        wx.showModal({
          title: '提示',
          content: res.data,
          showCancel: false
        })
      }
    })
  }



})