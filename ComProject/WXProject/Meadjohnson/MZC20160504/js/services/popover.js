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

        $rootScope.openPop = function($event){
            $popover.openPop($config.popover.rule,$event);
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
            $rootScope[popover.name].hide();
        };

        return $popover;
    }])