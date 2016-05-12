/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.starter",[])
    .controller("starterCtrl",["$scope","$state","$config","$wx","$modal",function($scope,$state,$config,$wx,$modal){

        $scope.subscribe = 1;
        $wx.personInfo.openId = "osFl-s9U62wClHjqywSNyFIy-Inc";
        $state.go($config.controllers.home.name);
        /*$modal.init($config.modals.rule);
        $modal.init($config.modals.enjoy);
        $modal.init($config.modals.prize);*/

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