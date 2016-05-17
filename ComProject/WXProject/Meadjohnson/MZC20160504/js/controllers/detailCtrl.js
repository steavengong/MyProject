/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.detail",[])
    .controller("detailCtrl",["$scope","$state","$config","$wx","$stateParams","$modal","$httpServices","$alert","$ionicLoading",
        function($scope,$state,$config,$wx,$stateParams,$modal,$httpServices,$alert,$ionicLoading){
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
                        console.log(result);
                        $scope.detailObj = result.response;
                    })
            }

            $scope.goHome = function(){
                $state.go($config.controllers.home.name);
            }

            $scope.checkOpenId = function(){
                if($stateParams.openId == $config.personInfo.openId){
                    return true;
                }
                return false;
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

                    if($config.personInfo.subscribe==0){
                        $alert.show($config.messages.voteByBallot.noAttentions);
                        $config.hook = false;
                        $ionicLoading.hide();
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
                        var response = result.response;
                        $alert.show(response.flag);
                        if(response.flag == "投票成功"){
                            $scope.detailObj.number ++;
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

        }])