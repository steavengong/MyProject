/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.prize",[])
    .controller("prizeBabyCtrl",["$scope","$state","$config","$wx","$modal",function($scope,$state,$config,$wx,$modal){
        $scope.showEnjoy = function(){
            $modal.closeModal($config.modals.prizeBaby);
            $modal.openModal($config.modals.enjoy);
        }

        $scope.goHome = function(){
            $modal.closeModal($config.modals.prizeBaby);
            $state.go($config.controllers.home.name);
        }
    }])
    .controller("prizeMumCtrl",["$scope","$state","$config","$wx","$modal",function($scope,$state,$config,$wx,$modal){

        $scope.goHome = function(){
            $modal.closeModal($config.modals.prizeMum);
            $state.go($config.controllers.home.name);
        }
    }])