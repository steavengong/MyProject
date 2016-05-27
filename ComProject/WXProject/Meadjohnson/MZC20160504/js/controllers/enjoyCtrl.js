/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.enjoy",[])
    .controller("enjoyCtrl",["$scope","$state","$config","$wx","$modal","$timeout","Upload","$alert","$httpServices","$ionicLoading","$console",
        function($scope,$state,$config,$wx,$modal,$timeout,Upload,$alert,$httpServices,$ionicLoading,$console){

            $scope.showRule = function(){
                $modal.closeModal($config.modals.enjoy);
                $modal.openModal($config.modals.ruleBaby);
            }

            $scope.goHome = function(){
                $modal.closeModal($config.modals.enjoy);
                $state.go($config.controllers.home.name);
            }

            $scope.changeDate = function(dateValue){
                $timeout(function(){
                    $scope.enjoyObj.dateInput = DateFormat.format.date(dateValue,"yyyy/MM/dd");
                })
            }

            $scope.hasFile = false;
            $scope.getChangFile = function(file){
                if(file!=null){
                    $scope.enjoyObj.fileCu = file;
                    $scope.hasFile = true;
                }
            }

            $scope.enjoyObj = {
                babyName:"",
                dateInput:DateFormat.format.date(new Date(),"yyyy/MM/dd"),
                phoneNumber:"",
                wxNumber:"",
                fileCu:"",
                remark:""
            }

            $scope.validate = function($file){
                if (!/image\/\w+/.test($file.type)){
                    $alert.show($config.messages.enjoy.notRexFile);
                    return false;
                }
            }


            $scope.submitEnjoy = function(enjoyObj){
                if(!$config.hook){
                    $config.hook = true;
                    $ionicLoading.show();
                    if($config.personInfo.isDeadline==3){
                        $alert.show($config.messages.activityStatus.end).then(function(){
                            $modal.closeModal($config.modals.enjoy);
                        })
                        $config.hook = false;
                        $ionicLoading.hide();
                        return;
                    }
                    if($config.personInfo.isDeadline==2){
                        $alert.show($config.messages.activityStatus.noJoin).then(function(){
                            $modal.closeModal($config.modals.enjoy);
                        })
                        $config.hook = false;
                        $ionicLoading.hide();
                        return;
                    }
                    else{
                        if($config.personInfo.isJoin==1){
                            $alert.show($config.messages.activityStatus.hasJoin).then(function(){
                                $modal.closeModal($config.modals.enjoy);
                            })
                            $config.hook = false;
                            $ionicLoading.hide();
                            return;
                        }
                    }

                    if(enjoyObj.babyName==""){
                        $alert.show($config.messages.enjoy.notNullName);
                        $config.hook = false;
                        $ionicLoading.hide();
                        return;
                    }

                    if(enjoyObj.dateInput==""){
                        $alert.show($config.messages.enjoy.notNullDate);
                        $config.hook = false;
                        $ionicLoading.hide();
                        return;
                    }

                    if(enjoyObj.phoneNumber==""){
                        $alert.show($config.messages.enjoy.notNullPhone);
                        $config.hook = false;
                        $ionicLoading.hide();
                        return;
                    }

                    if (!/^(13\d{9})|(147\d{8})|(15[02356789]\d{8})|(17[08]\d{8})|(18[012356789]\d{8})$/.test(enjoyObj.phoneNumber)){
                        $alert.show($config.messages.enjoy.notRexPhone);
                        $config.hook = false;
                        $ionicLoading.hide();
                        return false;
                    }

                    if(enjoyObj.wxNumber==""){
                        $alert.show($config.messages.enjoy.notNullWX);
                        $config.hook = false;
                        $ionicLoading.hide();
                        return;
                    }
                    if(enjoyObj.fileCu==""){
                        $alert.show($config.messages.enjoy.notNullFile);
                        $config.hook = false;
                        $ionicLoading.hide();
                        return;
                    }
                    if(enjoyObj.remark==""){
                        $alert.show($config.messages.enjoy.notNullRemark);
                        $config.hook = false;
                        $ionicLoading.hide();
                        return;
                    }

                    var action = $config.getRequestEnjoyAction();
                    var data = {
                        "openId" : $config.personInfo.openId,
                        "babyNick":enjoyObj.babyName,
                        "phoneNumber":enjoyObj.phoneNumber,
                        "wxNumber":enjoyObj.wxNumber,
                        "babyBrithday":enjoyObj.dateInput,
                        "remark":enjoyObj.remark,
                        "image":enjoyObj.fileCu
                    }

                    $httpServices.uploadWithFile(action,data)
                        .then(function(result){
                            $console("enjoyCtrl submitEnjoy ====");
                            $console(result);
                            var response = result.data;
                            if(response.status==1){
                                $alert.show($config.messages.enjoy.success);
                                $config.personInfo.isJoin = 1;
                            }
                            $modal.closeModal($config.modals.enjoy);
                        })
                }
            }

        }])