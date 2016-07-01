/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.starter",[])
    .controller("starterCtrl",["$scope","$state","$config","$wx","$alert","$console","$httpServices","$ionicPopup","$locals","$rootScope",
        function($scope,$state,$config,$wx,$alert,$console,$httpServices,$ionicPopup,$locals,$rootScope){

            $rootScope.resources = {
                url:"http://smart.image.alimmdn.com/H5/MZC/Resources/Image/",
                images :{
                    head:"head.jpg",
                    logo:"logo.png",
                    logoPtl:"logo-ptl.png",
                    mzbaby:"mzbaby.jpg",
                    mzmam:"mzmam.jpg",
                    qrCode:"qrCode.jpg",
                    prizeBaby:"prizeBaby.png",
                    prizeMum:"prizeMum.png",
                    thanks:"thanks.png"
                }
            }

            function start(){
                $wx.redirect().then(function(result){
                    var response = result.response;
                    if(response.status){
                        $console("starterCtrl=====");
                        $console(result);
                        $config.personInfo.subscribe = response.subscribe;
                        $config.personInfo.openId = response.openid;
                        $config.personInfo.isJoin = response.isJoin;//0
                        $config.personInfo.isDeadline = response.isDeadline || 3;//1
                        $wx.setWXSign().then(function(){
                            checkView();
                        },function(){
                            checkView();
                        })
                    }
                    else{
                        $wx.initCode();
                    }
                },function(){
                    $wx.initCode();
                })
            }

            if(isWeiXin()){
                //start();
                $state.go($config.controllers.home.name);
            }
            else{
                $alert.show($config.messages.browser.error);
            }

            function isWeiXin(){
                var ua = window.navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    return true;
                }else{
                    return false;
                }
            }

            function checkView(){
                if($config.personInfo.isDeadline==3){
                    $alert.show($config.messages.activityStatus.end);
                }
                else if($config.personInfo.isDeadline==2){
                    if($config.personInfo.isJoin){
                        var action = $config.getRequestAction();
                        var data = {
                            "cmd" : $config.cmds.findBabyDetail,
                            "parameters" : {
                                "openId" : $config.personInfo.openId
                            }
                        };
                        $httpServices.getJsonFromPost(action,data)
                            .then(function(result){
                                $console("startCtrl findBabyDetail =======");
                                $console(result);
                                $scope.detailObj = result.response;
                                if($scope.detailObj.rank <= $config.numberOfPage && $scope.detailObj.updateTime==null && $locals.get("cancelEdit",0)==0){
                                    $alert.confirm($config.messages.edit.canEdit).then(function(){
                                        $state.go($config.controllers.detail.name,{"openId":$config.personInfo.openId});
                                    },function(){
                                        $locals.set("cancelEdit",1);
                                    })
                                }
                            })
                    }
                }
                $state.go($config.controllers.home.name);
            }
        }])