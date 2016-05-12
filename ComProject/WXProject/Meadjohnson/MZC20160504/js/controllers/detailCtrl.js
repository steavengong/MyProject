/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.detail",[])
    .controller("detailCtrl",["$scope","$state","$config","$wx","$stateParams","$modal",function($scope,$state,$config,$wx,$stateParams,$modal){
        console.log($stateParams.openId)

        $scope.goHome = function(){
            $state.go($config.controllers.home.name);
        }

    }])