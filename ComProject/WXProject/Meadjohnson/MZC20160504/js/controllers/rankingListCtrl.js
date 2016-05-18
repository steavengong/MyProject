/**
 * Created by Administrator on 2016/5/6.
 */
angular.module("controllers.rankingList",[])
    .controller("rankingListCtrl",["$scope","$ionicScrollDelegate","$location","$ionicHistory","$httpServices","$config","$modal","$ionicLoading",
        function($scope,$ionicScrollDelegate,$location,$ionicHistory,$httpServices,$config,$modal,$ionicLoading){
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
            var pageNo = 0;
            var numberOfPerPage = 30;
            var rankFlag = true;
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
                        if(result.response){
                            var responseData = result.response.data;
                            if(responseData.rows.length>0){
                                pageNo++;
                                addRankItem(responseData.rows);
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                                rankFlag = true;
                            }
                            else{
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                                rankFlag = false;
                            }
                        }
                        else{
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            rankFlag = false;
                        }
                    })
            }

            function addRankItem(items){
                for(var item in items){
                    $scope.rankItems.push(items[item]);
                }
            }

            $scope.loadMore = function() {
                if(!$config.hook){
                    $config.hook = true;
                    searchRanking();
                }
            };

            $scope.noMore = function(){
                return rankFlag;
            }

        }])