/**
 * Created by Administrator on 2016/5/3.
 */
angular.module("shopDetailCtrl",[])
    .controller(config.controllers.shopDetail.controller,[
        "$scope",
        "$ionicSlideBoxDelegate",
        "$timeout",
        "$httpServices",
        "$stateParams",
        "$console",
        function($scope,$ionicSlideBoxDelegate,$timeout,$httpServices,$stateParams,$console){

            /*var shopDetails = {
             product:{
             images:["img/test1.png","img/test2.png","img/test3.png"],
             title:"贝亲新生婴儿清洁护肤礼盒",
             isGF:true,
             targetGF:"官方推荐",
             readers:2180,
             description:"本人需要洗护全套，送宝宝的好礼物。（爽身粉140g、洗发精200ml、沐浴露200ml、润肤露200ml、润肤油200ml）",
             publishTime:"2016-05-04 07:12:00",
             address1:"上海",
             address2:"浦东新区"
             },
             userInfo:{
             userHeadImage:"img/test1.png",
             userName:"永远去飞扬"
             },
             official:{
             title:"贝亲洗护全套，送宝宝的好礼物。",
             image:"img/test1.png"
             },
             replyList:[
             {
             userHeadImage:"img/test1.png",
             userName:"永远去飞扬",
             replyContent:"看好低owl公开的哈罗德基冠军贾克拉拉",
             replyTime:"2016-05-01 00:00:00",
             image:"img/test1.png"
             },
             {
             userHeadImage:"img/test1.png",
             userName:"永远去飞扬",
             replyContent:"看好低owl公开的哈罗德基冠军贾克拉拉",
             replyTime:"2016-05-01 00:00:00",
             image:""
             }
             ]
             }

             var slideBox1 = $ionicSlideBoxDelegate.$getByHandle('slideBox1');
             $scope.showPager = false;
             $scope.showProductImage = function(index){
             slideBox1.slide(index);
             }
             $timeout(function(){
             if(slideBox1.slidesCount()>1){
             slideBox1.loop(true);
             $scope.showPager = true;

             }
             },100);

             $scope.resizeImage = function(id,imgUrl){
             if(imgUrl){
             var element = document.getElementById(id);
             var $element = angular.element(element);
             var imgWidth = element.offsetWidth || document.body.offsetWidth;
             $element.css({"width":imgWidth + "px","height":imgWidth+"px"});
             return {"background-image":"url("+imgUrl+")","-webkit-background-image":"url("+imgUrl+")"};
             }
             }


             $scope.product = shopDetails.product;
             $scope.userInfo = shopDetails.userInfo;
             $scope.official = shopDetails.official;
             $scope.replyList = shopDetails.replyList;
             $scope.parseTime = function(time){
             return $.format.prettyDate(time);
             }*/
            var action = config.debug?config.requestAction.test:config.requestAction.product;
            var slideBox1 = $ionicSlideBoxDelegate.$getByHandle('slideBox1');
            $scope.showProductImage = function(index){
                slideBox1.slide(index);
            }
            getProductDetail();
            function getProductDetail(){
                var data = {
                    "cmd": config.cmds.productDetail,
                    "parameters":{
                        "productId":$stateParams.detailId
                    }
                }
                $httpServices.getJsonFromPost(action,data)
                    .then(function(result){
                        $console(result);
                        $scope.product = result.response.data;
                        slideBox1.update();
                        $timeout(function(){
                            if(slideBox1.slidesCount() > 1){
                                slideBox1.loop(true);
                                $scope.showPager = true;
                            }
                        })
                    })
            }

            $scope.resizeImage = function(id,imgUrl){
                if(imgUrl){
                    var element = document.getElementById(id);
                    var $element = angular.element(element);
                    var imgWidth = element.offsetWidth || document.body.offsetWidth;
                    $element.css({"width":imgWidth + "px","height":imgWidth+"px"});
                    return {"background-image":"url("+imgUrl+")","-webkit-background-image":"url("+imgUrl+")"};
                }
            }
            $scope.parseTime = function(time){
                if(time){
                    return $.format.prettyDate(time);
                }
            }
            $scope.loadMore = function() {
                getProductReplies();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

            var numberOfPage = 1;
            var pageNo = 0;
            var itemFlag = true;
            $scope.replyList = [];

            function getProductReplies(){
                if(!config.hook){
                    config.hook = true;
                    var data = {
                        "cmd": config.cmds.productReplies,
                        "parameters":{
                            "productId":$stateParams.detailId,
                            "numberOfPerPage":numberOfPage,
                            "pageNo":pageNo
                        }
                    }

                    $httpServices.getJsonFromPost(action,data)

                        .then(function(result){
                            $console(result);
                            var replies = result.response.data.content;
                            var totalPage = result.response.data.totalPages;
                            if(totalPage==0 || totalPage-1 == pageNo){
                                itemFlag = false;
                            }
                            else{
                                pageNo++;
                            }
                            addItem(replies);
                        })

                }
            }

            $scope.noMore = function(){
                return itemFlag;
            }

            function addItem(replies){
                for(var reply in replies){
                    $scope.replyList.push(replies[reply]);
                }
            }
        }])