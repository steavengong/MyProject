/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.detail",[])
    .controller("detailCtrl",["$scope","$state","$config","$wx","$stateParams","$modal","$httpServices","$alert","$ionicLoading","$rootScope","$console","$ionicScrollDelegate","$timeout",
        function($scope,$state,$config,$wx,$stateParams,$modal,$httpServices,$alert,$ionicLoading,$rootScope,$console,$ionicScrollDelegate,$timeout){
            $ionicLoading.show();

            findBabyDetail();

            function findBabyDetail(){
                var action = $config.getRequestAction();
                var data = {
                    "cmd" : $config.cmds.findBabyDetail,
                    "parameters" : {
                        "openId" : $stateParams.openId,
                    }
                };
                $httpServices.getJsonFromPost(action,data)
                    .then(function(result){
                        $console("detailCtrl findBabyDetail =======");
                        $console(result);
                        $scope.detailObj = result.response;
                        $rootScope.rank = $scope.detailObj.rank;
                    })
            }

            $scope.goHome = function(){
                $state.go($config.controllers.home.name);
            }

            $scope.voteByBallot = function($event){
                $event.stopPropagation();

                if(!$config.hook){
                    $config.hook = true;
                    $ionicLoading.show();
                    if($config.personInfo.isDeadline == 3){
                        $alert.show($config.messages.activityStatus.end);
                        $config.hook = false;
                        $ionicLoading.hide();
                        return ;
                    }
                    else if($config.personInfo.isDeadline == 2){
                        if($scope.detailObj!=undefined && $scope.detailObj!=null && $scope.detailObj.rank > $config.numberOfPage){
                            $alert.show($config.messages.voteByBallot.outOfRank);
                            $config.hook = false;
                            $ionicLoading.hide();
                            return ;
                        }
                    }

                    if($config.personInfo.subscribe==0){
                        $config.hook = false;
                        $ionicLoading.hide();
                        $modal.openModal($config.modals.qrCode);
                    }
                    else{
                        voteByBallot()
                    }
                }
            }

            function voteByBallot(){
                var action = $config.getRequestAction();
                var data = {
                    "cmd" : $config.cmds.voteByBallot,
                    "parameters" : {
                        "openId" : $config.personInfo.openId,
                        "passiveOpenId":$stateParams.openId
                    }
                };

                $httpServices.getJsonFromPost(action,data)
                    .then(function(result){
                        $console("detailCtrl voteByBallot =======");
                        $console(result);
                        var response = result.response;
                        if(response.flag == "投票成功"){
                            $scope.detailObj.number ++;
                            $alert.show($config.messages.voteByBallot.success);
                        }
                        else{
                            $alert.show(response.flag);
                        }
                    })
            }

            $scope.checkIsJoin = function(){
                if($config.personInfo.isDeadline==1){
                    if($config.personInfo.isJoin == 0){
                        return true;
                    }
                    else{
                        return false;
                    }
                }
                return false;
            }

            $rootScope.doRefresh = function(){
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.show();
                findBabyDetail();
                $timeout(function(){
                    $ionicScrollDelegate.resize();
                    $ionicScrollDelegate.scrollTop();
                })
            }

            $scope.checkEdit = function(){
                if($scope.detailObj!=undefined && $scope.detailObj!=null && $config.personInfo.isDeadline!=1 && $config.personInfo.openId==$stateParams.openId && $scope.detailObj.rank <= $config.numberOfPage && $scope.detailObj.updateTime==null){
                    return true;
                }
                return false;
            }
        }])