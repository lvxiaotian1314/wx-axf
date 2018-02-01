// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:{},
    activeIndex:0,
    activeCategory:{},
    activeProduct:{},
    sortCategory:["综合排序","销量最高","价格最低","价格最高"],
    AllCategoryBol:false,
    SortCategoryBol:false,
    activeAllCategory:"全部分类",
    activeSortCategory:"综合排序",
    //最初始化未操作过的激活商品
    initActiveProduct:{},
    cidIndex: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app=getApp()
    this.setData({
      categories:app.globalData.categories,
      activeCategory: app.globalData.categories[0],
      initActiveProduct: JSON.parse(JSON.stringify(app.globalData.categories[0].products)),
      activeProduct: app.globalData.categories[0].products
    })
     console.info(this.data.initActiveProduct)
  },
  // 左侧选中当前主分类
  select:function(event){
    let index = event.currentTarget.dataset.index
    let categories=this.data.categories
    this.setData({
      activeIndex:index,
      activeCategory: categories[index],
      activeAllCategory: "全部分类",
      activeSortCategory: "综合排序",
      initActiveProduct: JSON.parse(JSON.stringify(categories[index].products)),
      activeProduct: categories[index].products,
      cidIndex: -1
    })
  },
  // 点击全部分类改变AllCategoryBol
  changeAllCategoryBol(){
    this.setData({
      AllCategoryBol: !this.data.AllCategoryBol,
      SortCategoryBol:false
    })
  },
  // 点击综合排序改变SortCategoryBol
  changeSortCategoryBol(){
    this.setData({
      SortCategoryBol:!this.data.SortCategoryBol,
      AllCategoryBol:false
    })
  },
  // 点击遮罩层隐藏分类显示内容
  changeBol(){
    this.setData({
      SortCategoryBol: false,
      AllCategoryBol: false
    })
  },
  // 改变全部分类中的选择
  changeActiveCategory(event){
    let name=event.currentTarget.dataset.name
    let sortName=this.data.activeSortCategory
    let index=event.currentTarget.dataset.index
    if(index===undefined){
        index=-1
    }
    // 分类排序
    this.setData({
      activeAllCategory: name,
      cidIndex: index
    })
    this.sort(index, sortName)
  },
  // 改变综合排序分类中的选择
  changeSortCategory(event){
    let name = event.currentTarget.dataset.name
    let activeProduct=this.data.activeProduct
    let index=this.data.cidIndex
    this.sort(index,name)
    this.setData({
      activeSortCategory: name
    })
  },
  // 分类、排序方法
  sort(index,sortName){
    let initActiveProduct=this.data.initActiveProduct
    let activeProduct=JSON.parse(JSON.stringify(initActiveProduct))
    let filterProduct
    // 分类
    if (index!=-1) {
      filterProduct = activeProduct.filter(function (item) {
        return item.cidsIndex === index
      })
    } else {
      filterProduct = activeProduct
    }
    let sortProduct = JSON.parse(JSON.stringify(filterProduct))
    // 排序
    if (sortName === "销量最高") {
      sortProduct.sort(function (a, b) {
        return b.sales - a.sales
      })
    }
    else if (sortName === "价格最低") {
      sortProduct.sort(function (a, b) {
        return a.price - b.price
      })
    } else if (sortName==="价格最高") {
      sortProduct.sort(function (a, b) {
        return b.price - a.price
      })
    }
    this.setData({
      activeProduct:sortProduct
    })

  }




})