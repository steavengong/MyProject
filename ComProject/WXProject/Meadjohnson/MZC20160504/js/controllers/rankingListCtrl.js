/**
 * Created by Administrator on 2016/5/6.
 */
angular.module("controllers.rankingList",[])
    .controller("rankingListCtrl",["$scope","$ionicScrollDelegate","$location","$ionicHistory","$httpServices","$config","$modal","$ionicLoading","$timeout",
        function($scope,$ionicScrollDelegate,$location,$ionicHistory,$httpServices,$config,$modal,$ionicLoading,$timeout){
            $ionicLoading.show();
            $scope.backToTop = function(hashId){
                if ($location.hash() !== hashId) {
                    $location.hash(hashId);
                }
                $ionicScrollDelegate.anchorScroll();
            }

            $scope.back = function(){
                $ionicHistory.goBack();
            }

            findBabyDetail();

            function findBabyDetail(){
                var action = $config.getRequestAction();
                var data = {
                    "cmd" : $config.cmds.findBabyDetail,
                    "parameters" : {
                        "openId" : $config.personInfo.openId,
                    }
                };
                $httpServices.getJsonFromPost(action,data)
                    .then(function(result){
                        $scope.detailObj = result.response;
                    })
            }

            $scope.checkIsJoin = function(){
                if($config.personInfo.isJoin==0){
                    return false;
                }
                return true;
            }

            $scope.rankItems = [];
            $scope.pageItems = [];
            var pageNo = 0;
            var numberOfPerPage = 30;
            var countTotal = 0;
            $scope.pageTotal = 0;
            var itemPerPage = 6;
            var pagePages = 0;
            var currentPagePages = 0;
            searchRanking();
            function searchRanking(){
                var action = $config.getRequestAction();
                var data = {
                    "cmd" : $config.cmds.searchName,
                    "parameters" : {
                        "ranking" : 1,
                        "numberOfPerPage":numberOfPerPage,
                        "pageNo":pageNo
                    }
                };

                $httpServices.getJsonFromPost(action,data)
                    .then(function(result){
                        console.log(result);
                        if(result.response){
                            var responseData = result.response.data;
                            pageNo = responseData.page;
                            countTotal = responseData.records;
                            $scope.rankItems = responseData.rows;
                            $scope.pageTotal = countTotal % numberOfPerPage == 0 ? countTotal / numberOfPerPage : (Math.floor(countTotal / numberOfPerPage)) + 1;
                            pagePages = $scope.pageTotal % itemPerPage == 0 ? $scope.pageTotal / itemPerPage : (Math.floor($scope.pageTotal / itemPerPage)) + 1;
                            checkPageGroup();
                        }
                    })
            }

            function checkPageGroup(){
                $scope.pageItems = [];
                for(var i = 0 ;i < itemPerPage ; i++){
                    $scope.pageItems.push( currentPagePages * itemPerPage + i + 1);
                }
            }

            $scope.prePage = function(){
                if(currentPagePages>0){
                    currentPagePages -- ;
                    checkPageGroup();
                }
            }

            $scope.nextPage = function(){
                if(currentPagePages<pagePages-1){
                    currentPagePages ++ ;
                    checkPageGroup();
                }
            }

            $scope.checkActive =  function(item){
                if(item == (pageNo)){
                    return true;
                }
                return false;
            }

            $scope.searchByItem = function(item){
                $ionicLoading.show();
                if(item == pageNo){
                    $ionicLoading.hide();
                    return ;
                }
                var action = $config.getRequestAction();
                var data = {
                    "cmd" : $config.cmds.searchName,
                    "parameters" : {
                        "ranking" : 1,
                        "numberOfPerPage":numberOfPerPage,
                        "pageNo":item-1
                    }
                };

                $httpServices.getJsonFromPost(action,data)
                    .then(function(result){
                        console.log(result);
                        if(result.response){
                            var responseData = result.response.data;
                            pageNo = responseData.page;
                            $scope.rankItems = responseData.rows;
                            $timeout(function(){
                                $ionicScrollDelegate.resize();
                                $ionicScrollDelegate.scrollTop();
                            })
                        }
                    })
            }

            $scope.getRank = function(index){
                return (pageNo-1) * numberOfPerPage + index + 1;
            }


            $scope.doRefresh = function(){
                $ionicLoading.show();
                $scope.rankItems = [];
                $scope.pageItems = [];
                pageNo = 0;
                countTotal = 0;
                $scope.pageTotal = 0;
                pagePages = 0;
                currentPagePages = 0;
                findBabyDetail();
                searchRanking();
                $scope.$broadcast('scroll.refreshComplete');
            }



        }])