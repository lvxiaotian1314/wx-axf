// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeArray:[],
    timeIndex:[0,0],
    initTimeArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date=new Date()
    let hour=date.getHours()
    let minutes=date.getMinutes()
    let timeArray = [
      ["今天", "明天", "后天"], []
    ]
    // 今天订单时间小于九点，九点后配送
    if(hour<9){
      timeArray =[["今天","明天", "后天"], ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00", "22:00-23:00", "23:00-24:00"]]
    }
    else if(hour<23){
      timeArray=[["今天", "明天", "后天"], ["30分钟内送达"]]
      for (var i = hour+1; i < 24; i++) {
        let time =i+":00-"+(i+1)+":00"
        timeArray[1].push(time)
      }
    }
    // 23点-24点明天配送
    else{
      timeArray = [["明天", "后天"], ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00", "22:00-23:00", "23:00-24:00"]]
    }
    this.setData({
      timeArray:timeArray,
      // 初始保存
      initTimeArray:JSON.parse(JSON.stringify(timeArray))
    })
  },
  bindMultiPickerChange: function (e) {
    let array=e.detail.value
    this.setData({
      timeIndex:array
    })
  },
  bindMultiPickerColumnChange:function(e){
    // e.detail.column:改变的第几列(0,1),e.detail.value:改变的值（下标）
    let array=[e.detail.column,e.detail.value]
    let timeArray = this.data.timeArray
    // 今天在送货时间内(09：00-24：00)，第一列选择（明天、后天）
    if (timeArray[0].length===3&&e.detail.column === 0 && e.detail.value>0){
      timeArray[1] = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00", "22:00-23:00", "23:00-24:00"]
      this.setData({
        timeArray:timeArray
      })
    }
    // 第一列选择今天直接拿初始数据（三种情况：小于九点、大于九点小于23点、23点到24点）
    else if (e.detail.column === 0){
      let timeArray = JSON.parse(JSON.stringify(this.data.initTimeArray))
      this.setData({
        timeArray: timeArray
      })
    } 
    let timeIndex=this.data.timeIndex
    timeIndex[array[0]]=array[1]
    // 只改变第一列，第二列值从0开始
    if(array[0]===0){
      timeIndex[1]=0
    }
    this.setData({
      timeIndex:timeIndex
    })
  }
})