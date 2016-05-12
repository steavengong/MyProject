/**
 * Created by Administrator on 2016/4/21.
 */

var config = {
  requestUrl:{
    test:"http://192.168.100.67:8080/",
    publish:"",
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


