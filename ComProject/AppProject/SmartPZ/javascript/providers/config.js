/**
 * Created by Administrator on 2016/6/6.
 */
angular.module('providers.config',[])
.provider('$config',[function(){
    var $config = {}

    $config.debug = true;

    $config.requestAction = '33';
    $config.requestActionDebug = '2';
    $config.getRequestAction = function(){
        if(this.debug){
            return this.requestActionDebug;
        }
        return this.requestAction;
    }

    $config.cmds = {

    }

    $config.messages = {

    }

    $config.controllers = {
        tabs : {
            templateUrl:"templates/tabs/tabs.html",
            url:"/tabs",
            name:"tabs",
            abstract:true,
            controller:"TabsCtrl"
        },
        tabsHome : {
            templateUrl:"templates/tabs/tabs-home.html",
            url:"/tabsHome",
            name:"tabs.tabsHome",
            controller:"HomeCtrl"
        },
        tabsShop : {
            templateUrl:"templates/tabs/tabs-shop.html",
            url:"/tabsShop",
            name:"tabs.tabsShop",
            controller:"ShopCtrl"
        },
        tabsMessage : {
            templateUrl:"templates/tabs/tabs-message.html",
            url:"/tabsMessage",
            name:"tabs.tabsMessage",
            controller:"MessageCtrl"
        },
        tabsPersonal : {
            templateUrl:"templates/tabs/tabs-personal.html",
            url:"/tabsPersonal",
            name:"tabs.tabsPersonal",
            controller:"PersonalCtrl"
        }

    }

    $config.$get = function(){
        return this;
    }

    return $config;
}])