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
        "$rootScope",
        function($scope,$ionicSlideBoxDelegate,$timeout,$httpServices,$stateParams,$console,$rootScope){

            var action = config.debug?config.requestAction.test:config.requestAction.publish;

            $scope.options = {
                loop:true,
                autoplay : 0,
                autoplayDisableOnInteraction:false,
                observer : true
            }
            $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
                $scope.slider1 = data.slider;
            });

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
                        console.log($scope)
                        $timeout(function(){
                            if($scope.slider1.slides.length == 1){
                                $scope.slider1.params.loop = false;
                                $scope.$$childHead.$$childHead.showPager = false;
                            }
                            else{
                                $scope.slider1.slideTo(1);
                                $scope.slider1.params.autoplay = 1000;
                                $scope.slider1.startAutoplay();
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
                    return DateFormat.format.prettyDate(time);
                }
            }
            $scope.loadMore = function() {
                getProductReplies();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

            var numberOfPage = 10;
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
                            "pageNo":pageNo,
                            "replyType":1
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