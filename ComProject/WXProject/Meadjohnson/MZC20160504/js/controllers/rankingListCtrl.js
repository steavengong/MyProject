/**
 * Created by Administrator on 2016/5/6.
 */
angular.module("controllers.rankingList",[])
    .controller("rankingListCtrl",["$scope","$ionicScrollDelegate","$location","$ionicHistory","$httpServices","$config","$modal",function($scope,$ionicScrollDelegate,$location,$ionicHistory,$httpServices,$config,$modal){

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

        $scope.rankItems = [];
        var itemRankTotal = 0;
        var itemPerPage = 30;
        searchRanking();
        function searchRanking(){

            var action = $config.getRequestAction();
            var data = {
                "cmd" : $config.cmds.searchName,
                "parameters" : {
                    "ranking" : 1
                }
            };

            $httpServices.getJsonFromPost(action,data)
                .then(function(result){
                    if(result.response){
                        var responseData = result.response.data;
                        if(responseData.rows.length>0){
                            itemRankTotal = responseData.records;
                            addRankItem(responseData.rows);
                        }
                    }
                })
        }

        function addRankItem(items){
            for(var item in items){
                $scope.rankItems.push(items[item]);
            }
        }



    }])