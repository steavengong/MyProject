/**
 * Created by Administrator on 2016/4/21.
 */

var config = {
  requestAction:{
    test:"http://erpuat.mengbp.com:8094/wine-market-rest/cgi/",
    publish:"http://192.168.100.67:8080/",
  },
  hook:false,
  debug:true,
  cmds:{
    productDetail:"product/details",
    productReplies:"product/reply/list"
  },
  loading:{
    templateUrl:"templates/loading/loading.html",
  },
  controllers:{
    //商品详情
    productDetail:{
      templateUrl:"templates/product/product-detail.html",
      url:"/productDetail/:detailId",
      name:"productDetail",
      controller:"productDetailCtrl"
    },
    //求购详情
    shopDetail:{
      templateUrl:"templates/shop/shop-detail.html",
      url:"/shopDetail/:detailId",
      name:"shopDetail",
      controller:"shopDetailCtrl"
    }
  }
}


