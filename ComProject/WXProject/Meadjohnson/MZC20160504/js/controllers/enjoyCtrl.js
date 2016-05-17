/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.enjoy",[])
    .controller("enjoyCtrl",["$scope","$state","$config","$wx","$modal","$timeout","Upload","$alert","$httpServices","$ionicLoading",
        function($scope,$state,$config,$wx,$modal,$timeout,Upload,$alert,$httpServices,$ionicLoading){

        $scope.showRule = function(){
            $modal.closeModal($config.modals.enjoy);
            $modal.openModal($config.modals.rule);
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

        $scope.getChangFile = function(file){
            if(file!=null){
                $scope.enjoyObj.fileCu = file;
            }
        }

        $scope.enjoyObj = {
            babyName:"Hello",
            dateInput:"2016/05/16",
            phoneNumber:"12345678911",
            wxNumber:"test123",
            fileCu:"",
            remark:"test123"
        }

        $scope.validate = function($file){
            if (!/image\/\w+/.test($file.type)){
                $alert.show("图片格式错误");
                return false;
            }
        }

        $scope.submitEnjoy = function(enjoyObj){
            console.log(enjoyObj);
            console.log($config.personInfo);

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
                    $alert.show("宝宝姓名不能为空");
                    $config.hook = false;
                    $ionicLoading.hide();
                    return;
                }

                if(enjoyObj.dateInput==""){
                    $alert.show("宝宝生日不能为空");
                    $config.hook = false;
                    $ionicLoading.hide();
                    return;
                }

                if(enjoyObj.phoneNumber==""){
                    $alert.show("手机号不能为空");
                    $config.hook = false;
                    $ionicLoading.hide();
                    return;
                }
                if(enjoyObj.wxNumber==""){
                    $alert.show("微信号不能为空");
                    $config.hook = false;
                    $ionicLoading.hide();
                    return;
                }
                if(enjoyObj.fileCu==""){
                    $alert.show("参赛图片不能少");
                    $config.hook = false;
                    $ionicLoading.hide();
                    return;
                }
                if(enjoyObj.remark==""){
                    $alert.show("简介不能为空");
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
                        console.log(result)
                        var response = result.data;
                        if(response.status==1){
                            $alert.show(response.msg);
                            $config.personInfo.isJoin = 1;
                        }
                        $modal.closeModal($config.modals.enjoy);
                    })
            }
        }

    }])