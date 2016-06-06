/**
 * Created by Administrator on 2016/6/6.
 */
angular.module('starter', ['ionic','starter.controllers','starter.directives','starter.providers','starter.filters'])
    .config([
        '$stateProvider',
        '$configProvider',
        '$consoleProvider',
        function($stateProvider,$configProvider,$consoleProvider){
            $stateProvider
                .state($configProvider.controllers.tabs.name,{
                    url:$configProvider.controllers.tabs.url,
                    templateUrl:$configProvider.controllers.tabs.templateUrl,
                    abstract:$configProvider.controllers.tabs.abstract,
                    controller:$configProvider.controllers.tabs.controller
                })

                .state($configProvider.controllers.tabsHome.name,{
                    url:$configProvider.controllers.tabsHome.url,
                    views:{
                        'tabs-home':{
                            templateUrl:$configProvider.controllers.tabsHome.templateUrl,
                            controller:$configProvider.controllers.tabsHome.controller
                        }
                    }
                })

                .state($configProvider.controllers.tabsShop.name,{
                    url:$configProvider.controllers.tabsShop.url,
                    views:{
                        'tabs-shop':{
                            templateUrl:$configProvider.controllers.tabsShop.templateUrl,
                            controller:$configProvider.controllers.tabsShop.controller
                        }
                    }
                })

                .state($configProvider.controllers.tabsMessage.name,{
                    url:$configProvider.controllers.tabsMessage.url,
                    views:{
                        'tabs-message':{
                            templateUrl:$configProvider.controllers.tabsMessage.templateUrl,
                            controller:$configProvider.controllers.tabsMessage.controller
                        }
                    }
                })

                .state($configProvider.controllers.tabsPersonal.name,{
                    url:$configProvider.controllers.tabsPersonal.url,
                    views:{
                        'tabs-personal':{
                            templateUrl:$configProvider.controllers.tabsPersonal.templateUrl,
                            controller:$configProvider.controllers.tabsPersonal.controller
                        }
                    }
                })

        }])