/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.enjoy",[])
    .controller("enjoyCtrl",["$scope","$state","$config","$wx","$modal","$timeout","Upload",function($scope,$state,$config,$wx,$modal,$timeout,Upload){



        $scope.showRule = function(){
            $modal.closeModal($config.modals.enjoy);
            $modal.openModal($config.modals.rule);
        }

        $scope.goHome = function(){
            $modal.closeModal($config.modals.enjoy);
            $state.go($config.controllers.home.name);
        }

        $scope.changeDate = function(dateValue){
            $timeout(function(){
                $scope.dateInput = DateFormat.format.date(dateValue,"yyyy/MM/dd");
            })
        }

        $scope.getChangFile = function(file){
            if(file!=null){
                $scope.fileCu = file;
            }
        }

        $scope.submitEnjoy = function(){
            console.log($scope.fileCu)
        }





    }])