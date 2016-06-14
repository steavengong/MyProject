/**
 * Created by Administrator on 2016/6/14.
 */
angular.module('starterCtrl',[])
.controller('starterCtrl',['$scope',function($scope){
    var imgURL  = config.debug?config.imgResource.test:config.imgResource.publish;
    $scope.defaultHead = imgURL + 'default-head.png';
    $scope.atttentions= imgURL + 'atttentions.jpg';
    $scope.logo= imgURL + 'logo.png';
}])