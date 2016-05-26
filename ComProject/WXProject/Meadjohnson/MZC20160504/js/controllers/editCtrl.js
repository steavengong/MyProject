/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.edit",[])
    .controller("editCtrl",["$scope","$state","$config","$wx","$modal","Upload","$alert","$ionicLoading","$httpServices","$rootScope","$console",
        function($scope,$state,$config,$wx,$modal,Upload,$alert,$ionicLoading,$httpServices,$rootScope,$console){
        $scope.hasFile = false;
        $scope.getChangFile = function(file){
            if(file!=null){
                $scope.fileCu = file;
                $scope.hasFile = true;
            }
        }

        $scope.validate = function($file){
            if (!/image\/\w+/.test($file.type)){
                $alert.show($config.messages.enjoy.notRexFile);
                return false;
            }
        }

        $scope.submitEdit = function(fileCu){
            if(!$config.hook) {
                $config.hook = true;
                $ionicLoading.show();

                if(fileCu==undefined || fileCu==null || fileCu==""){
                    $alert.show($config.messages.enjoy.notNullFile);
                    $config.hook = false;
                    $ionicLoading.hide();
                    return;
                }

                var action = $config.getRequestEnjoyAction();
                var data = {
                    "openId" : $config.personInfo.openId,
                    "image":fileCu,
                    "rank" : $rootScope.rank
                }

                $httpServices.uploadWithFile(action,data)
                    .then(function(result){
                        $console("editCtrl submitEdit===");
                        $console(result)
                        var response = result.data;
                        $alert.show(response.msg).then(function(){
                            $rootScope.doRefresh();
                        });
                        $modal.closeModal($config.modals.edit);
                    })
            }
        }

    }])