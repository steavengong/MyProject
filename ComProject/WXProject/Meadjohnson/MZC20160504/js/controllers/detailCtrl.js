/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.detail",[])
    .controller("detailCtrl",["$scope","$state","$config","$wx","$stateParams","$modal","$httpServices","$alert",function($scope,$state,$config,$wx,$stateParams,$modal,$httpServices,$alert){
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
            if($config.personInfo.subscribe==0){
                $alert.show("请先关注")
            }
            else{
                voteByBallot()
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
                })
        }

        $scope.checkIsJoin = function(){
            if($config.personInfo.isJoin){
                return true;
            }
            return false;
        }

    }])