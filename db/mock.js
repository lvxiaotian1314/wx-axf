var Mock = require('mockjs')
var fs = require('fs')

var data = new Mock.mock({
  'bannar|3-5': [
    {
      'id|+1': 1,
      'bannar_img': '@image(320x140, @color)',
      'cids|4': [
        {
          'cid_id|+1': 1,
          'name': '@cword(3, 5)'
        }
      ],
      'products|30-50': [
        {
          // 子分类id
          'cidId|0-3': 10,
          'product_id|+1': 1,
          'product_img': '@image(168x168,@color)',
          'product_name': '@cword(2,8)',
          'price|1-99.1': 10,
          'unit|10-1000': 10
        }
      ]
    }
  ],
  'categories|10': [
    {
      //分类id
      'id|+1': 1,
      //分类名称
      'name': '@cword(3,4)',
      //分类名称颜色
      'nameColor': '@color',
      //分类的图片
      'category_img': '@image(320x76,@color)',
      //子分类
      'cids|3': [
        {
          'cid_id|+1': 1,
          'name': '@cword(2,6)',
          'price|1-100.1': 1,
          'unit|10-999': 1,
          'product_img': '@image(93x93,@color,@cword)'
        }
      ],
      //保存分类对应的数据
      'products': []

    }
  ],
  'products|100-200': [
    {
      //商品id
      'id|+1': 1,
      //商品对应的分类id
      'categoryID|1-10': 3,
      //商品的图片
      'imgs': {
        'min': '@image(80x80,@color)',
        "max": '@image(300x300,@color,@cname)'
      },
      //商品的名称
      'product_name': '@cword(3,6)',
      //商品的价格
      'price|1-100.1': 1,
      //商品的单位
      'unit|10-999': 3,
      //商品的品牌
      'brand': '@cword(2,6)',
      //保质期
      'expiration_date|1-3.1': 3,
      //商品的产地
      'production_place': '@cword(2,4)',
      // 该商品对应的子分类下标
      'cidsIndex|0-3': 10,
      //数量
      'num': 0
    }
  ],
  //用户信息表
  /*
    {
      id,
      phone,
      //当前选择的商品地址
      select_site
    }
  */
  'users': [],
  //购物车表
  /*{
    id,
    商品的id，
    商品的数量，
    商品的图片，
    商品的名称，
    商品的价格，
    是否选择，
    userId
  } */
  'carts': [],
  /*
    {
      id:地址在地址表中的id
      用户id：这个地址是哪个用户的
      联系人，
      性别，
      手机号码，
      城市，
      地区，
      详细地址，->百度地图
      坐标数据
    }
  */
  'sites': []
})

fs.writeFile('db.json', JSON.stringify(data, null, 2), function () {
  console.log('写入成功')
})