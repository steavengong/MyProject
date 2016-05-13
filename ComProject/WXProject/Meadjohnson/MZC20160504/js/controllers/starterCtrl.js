/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.starter",[])
    .controller("starterCtrl",["$scope","$state","$config","$wx",function($scope,$state,$config,$wx){

        $scope.subscribe = 0;
        $wx.personInfo.openId = "osFl-s9U62wClHjqywSNyFIy-Inc";
        $state.go($config.controllers.home.name);

        /*$wx.redirect().then(function(result){
            var response = result.response;
            if(response.status == 1){
                $scope.subscribe = response.subscribe;
                $wx.personInfo.openId = response.openid;
                $state.go($config.controllers.home.name);
            }
            else{
                $wx.initCode();
            }
        },function(){
            $wx.initCode();
        })*/

    }])