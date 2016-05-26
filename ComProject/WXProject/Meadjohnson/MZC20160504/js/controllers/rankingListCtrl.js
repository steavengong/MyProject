/**
 * Created by Administrator on 2016/5/6.
 */
angular.module("controllers.rankingList",[])
    .controller("rankingListCtrl",["$scope","$ionicScrollDelegate","$location","$ionicHistory","$httpServices","$config","$modal","$ionicLoading","$timeout","$state","$console",
        function($scope,$ionicScrollDelegate,$location,$ionicHistory,$httpServices,$config,$modal,$ionicLoading,$timeout,$state,$console){
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
                        $console("detailCtrl voteByBallot =======");
                        $console(result);
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
                        "numberOfPerPage":$config.numberOfPage,
                        "pageNo":pageNo
                    }
                };

                $httpServices.getJsonFromPost(action,data)
                    .then(function(result){
                        $console("detailCtrl searchRanking =======");
                        $console(result);
                        if(result.response){
                            var responseData = result.response.data;
                            pageNo = responseData.page;
                            countTotal = responseData.records;
                            $scope.rankItems = responseData.rows;
                            $scope.pageTotal = countTotal % $config.numberOfPage == 0 ? countTotal / $config.numberOfPage : (Math.floor(countTotal / $config.numberOfPage)) + 1;
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
                        "numberOfPerPage":$config.numberOfPage,
                        "pageNo":item-1
                    }
                };

                $httpServices.getJsonFromPost(action,data)
                    .then(function(result){
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
                return (pageNo-1) * $config.numberOfPage + index + 1;
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

            $scope.findBabyDetail = function(){
                $state.go($config.controllers.detail.name,{"openId":$config.personInfo.openId});
            }

            $scope.checkPagination = function(){
                if($config.personInfo.isDeadline==1){
                    if($scope.pageTotal > 1){
                        return true;
                    }
                }
                return false
            }


        }])