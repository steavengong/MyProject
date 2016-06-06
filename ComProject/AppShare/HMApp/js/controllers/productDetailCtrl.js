/**
 * Created by Administrator on 2016/5/3.
 */
angular.module("productDetailCtrl",[])
    .controller(config.controllers.productDetail.controller,[
        "$scope",
        "$ionicSlideBoxDelegate",
        "$timeout",
        "$httpServices",
        "$stateParams",
        "$console",
        function($scope,$ionicSlideBoxDelegate,$timeout,$httpServices,$stateParams,$console){
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