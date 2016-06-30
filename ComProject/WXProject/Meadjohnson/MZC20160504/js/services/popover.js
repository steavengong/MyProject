/**
 * Created by Administrator on 2016/5/18.
 */
angular.module("services.popover",[])
    .factory("$popover",["$rootScope","$ionicPopover","$config",function($rootScope,$ionicPopover,$config){
        var $popover = {};

        $popover.init = function(popover,$event){
            $ionicPopover.fromTemplateUrl(popover.templateUrl,{
                scope:$rootScope,
            }).then(function(popoverObject){
                popoverObject.show($event);
                $rootScope[popover.name] = popoverObject;
            })
        }

        $rootScope.openPop = function($event,type){
            $popover.openPop($config.popover.rule,$event);
            $rootScope.type = type;
        }

        $popover.openPop = function(popover,$event){
            if($rootScope[popover.name]){
                if($rootScope[popover.name].isShown()){
                    $rootScope[popover.name].hide();
                }
                else{
                    $rootScope[popover.name].show();
                }
            }
            else{
                $popover.init(popover,$event);
            }
        }

        $rootScope.closePop = function() {
            $popover.closePop($config.popover.rule);
        }

        $popover.closePop = function(popover) {
            $rootScope[popover.name].hide().then(function(){
                $rootScope[popover.name].remove().then(function(){
                    $rootScope[popover.name]=null;
                });
            });
        };

        $rootScope.selectModal = function(modalType){
            if($rootScope.type == 0){
                if(modalType == 0){
                    $rootScope.openModal(1)
                }
                else{
                    $rootScope.openModal(4)
                }

            }
            else if($rootScope.type == 1){
                if(modalType == 0){
                    $rootScope.openModal(3)
                }
                else{
                    $rootScope.openModal(7)
                }
            }
        }

        return $popover;
    }])