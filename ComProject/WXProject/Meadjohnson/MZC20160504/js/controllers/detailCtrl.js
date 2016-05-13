/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.detail",[])
    .controller("detailCtrl",["$scope","$state","$config","$wx","$stateParams","$modal","$httpServices",function($scope,$state,$config,$wx,$stateParams,$modal,$httpServices){
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

    }])