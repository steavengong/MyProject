/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.starter",[])
    .controller("starterCtrl",["$scope","$state","$config","$wx",function($scope,$state,$config,$wx){

        $wx.redirect().then(function(result){
            var response = result.response;
            if(response.status){
                $config.personInfo.subscribe = response.subscribe;
                $config.personInfo.openId = response.openid;
                $config.personInfo.isJoin = response.isJoin;
                /*$wx.setWXSign().then(function(){
                    $state.go($config.controllers.home.name);
                })*/
                $state.go($config.controllers.home.name);
            }
            else{
                $wx.initCode();
            }
        },function(){
            $wx.initCode();
        })

    }])