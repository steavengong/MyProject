/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.rule",[])
    .controller("ruleBabyCtrl",["$scope","$state","$config","$wx","$modal",function($scope,$state,$config,$wx,$modal){

        $scope.showEnjoy = function(){
            $modal.closeModal($config.modals.ruleBaby);
            $modal.openModal($config.modals.enjoy);
        }

        $scope.goHome = function(){
            $modal.closeModal($config.modals.ruleBaby);
            $state.go($config.controllers.home.name);
        }

    }])
    .controller("ruleMamCtrl",["$scope","$state","$config","$wx","$modal",function($scope,$state,$config,$wx,$modal){

        $scope.goHome = function(){
            $modal.closeModal($config.modals.ruleMam);
            $state.go($config.controllers.home.name);
        }
    }])