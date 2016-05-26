/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.starter",[])
    .controller("starterCtrl",["$scope","$state","$config","$wx","$alert","$console",function($scope,$state,$config,$wx,$alert,$console){

        $wx.redirect().then(function(result){
            var response = result.response;
            if(response.status){
                $console("starterCtrl=====");
                $console(result);
                $config.personInfo.subscribe = response.subscribe;
                $config.personInfo.openId = response.openid;
                $config.personInfo.isJoin = response.isJoin;//0
                $config.personInfo.isDeadline = response.isDeadline;//1
                $wx.setWXSign().then(function(){
                    if($config.personInfo.isDeadline==3){
                        $alert.show($config.messages.activityStatus.end);
                    }
                    $state.go($config.controllers.home.name);
                },function(){
                    if($config.personInfo.isDeadline==3){
                        $alert.show($config.messages.activityStatus.end);
                    }
                    $state.go($config.controllers.home.name);
                })
            }
            else{
                $wx.initCode();
            }
        },function(){
            $wx.initCode();
        })

        //$state.go($config.controllers.home.name);

    }])