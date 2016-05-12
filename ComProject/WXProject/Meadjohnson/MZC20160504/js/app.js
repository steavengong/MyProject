// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','starter.providers','starter.services','starter.directives','starter.filters','ngFileUpload'])
    .config(['$stateProvider','$configProvider', function($stateProvider,$configProvider) {

        $stateProvider
            .state($configProvider.controllers.home.name,{
                url:$configProvider.controllers.home.url,
                templateUrl:$configProvider.controllers.home.templateUrl,
                controller:$configProvider.controllers.home.ctrl
            })

            .state($configProvider.controllers.rankingList.name,{
                url:$configProvider.controllers.rankingList.url,
                templateUrl:$configProvider.controllers.rankingList.templateUrl,
                controller:$configProvider.controllers.rankingList.ctrl,
                cache:$configProvider.controllers.rankingList.cache
            })

            .state($configProvider.controllers.detail.name,{
                url:$configProvider.controllers.detail.url,
                templateUrl:$configProvider.controllers.detail.templateUrl,
                controller:$configProvider.controllers.detail.ctrl,
                cache:$configProvider.controllers.detail.cache
            })


    }])

