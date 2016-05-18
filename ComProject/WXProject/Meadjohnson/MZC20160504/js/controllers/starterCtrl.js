/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.starter",[])
    .controller("starterCtrl",["$scope","$state","$config","$wx","$alert",function($scope,$state,$config,$wx,$alert){

        /*$wx.redirect().then(function(result){
            var response = result.response;
            if(response.status){
                $config.personInfo.subscribe = response.subscribe;
                $config.personInfo.openId = response.openid;
                $config.personInfo.isJoin = response.isJoin;//0
                $config.personInfo.isDeadline = response.isDeadline;//1
                /!*$wx.setWXSign().then(function(){
                    $state.go($config.controllers.home.name);
                })*!/
                if($config.personInfo.isDeadline==3){
                    $alert.show($config.messages.activityStatus.end);
                }
                $state.go($config.controllers.home.name);
            }
            else{
                $wx.initCode();
            }
        },function(){
            $wx.initCode();
        })*/

        $state.go($config.controllers.home.name);

    }])