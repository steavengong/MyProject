/**
 * Created by Administrator on 2016/4/21.
 */

var config = {
  requestAction:{
    test:"http://erpuat.mengbp.com:8094/wine-market-rest/cgi/",
    publish:"http://market.smart-kids.com:81/wine-market-rest/cgi/"
  },
  imgResource:{
    test:"http://mbpz.image.alimmdn.com/MBPZShare/assets/",
    publish:"http://mbpz.image.alimmdn.com/MBPZShare/assets/"
  },
  hook:false,
  debug:false,
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


