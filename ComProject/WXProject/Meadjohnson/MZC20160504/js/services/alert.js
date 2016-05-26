/**
 * Created by Administrator on 2016/5/13.
 */
angular.module("services.alert",[])
    .service("$alert",["$ionicPopup","$q",function($ionicPopup,$q){
        var $alert = {}

        $alert.show = function(msg){
            var deferred = $q.defer();
            $ionicPopup.alert({
                cssClass:"mzc-popup-container",
                template:msg,
                okText:"确定",
                okType:"mzc-popup-button"
            }).then(function(){
                deferred.resolve();
            })
            return deferred.promise
        }

        $alert.confirm = function(msg){
            var deferred = $q.defer();
            $ionicPopup.confirm({
                cssClass:"mzc-popup-container",
                template:msg,
                cancelText: '取消',
                cancelType: 'mzc-popup-button',
                okText:"确定",
                okType:"mzc-popup-button"
            }).then(function(res){
                if(res){
                    deferred.resolve();
                }
                else{
                    deferred.reject()
                }
            })
            return deferred.promise
        }


        return $alert;

    }])