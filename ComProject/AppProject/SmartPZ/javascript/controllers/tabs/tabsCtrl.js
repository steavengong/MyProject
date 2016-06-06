/**
 * Created by Administrator on 2016/6/6.
 */
angular.module('controllers.tabs',[])
    .controller('TabsCtrl',[
        '$scope',
        '$console',
        function($scope,$console){
            $scope.showMsg = function(msg){
                $console.show(msg);
            }
    }])