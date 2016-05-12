/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.rule",[])
    .controller("ruleCtrl",["$scope","$state","$config","$wx","$modal",function($scope,$state,$config,$wx,$modal){

        $scope.showEnjoy = function(){
            $modal.closeModal($config.modals.rule);
            $modal.openModal($config.modals.enjoy);
        }

        $scope.goHome = function(){
            $modal.closeModal($config.modals.rule);
            $state.go($config.controllers.home.name);
        }

    }])