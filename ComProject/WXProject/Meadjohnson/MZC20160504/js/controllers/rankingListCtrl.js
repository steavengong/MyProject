/**
 * Created by Administrator on 2016/5/6.
 */
angular.module("controllers.rankingList",[])
    .controller("rankingListCtrl",["$scope","$ionicScrollDelegate","$location","$ionicHistory",function($scope,$ionicScrollDelegate,$location,$ionicHistory){

        $scope.backToTop = function(hashId){
            if ($location.hash() !== hashId) {
                $location.hash(hashId);
            }
            $ionicScrollDelegate.anchorScroll();
        }

        $scope.back = function(){
            $ionicHistory.goBack();
        }

    }])