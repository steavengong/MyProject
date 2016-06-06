// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','starter.services','starter.directives'])

    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

        $stateProvider
            .state(config.controllers.productDetail.name,{
                url: config.controllers.productDetail.url,
                templateUrl:config.controllers.productDetail.templateUrl,
                controller:config.controllers.productDetail.controller,
                cache:false
            })

            .state(config.controllers.shopDetail.name,{
                url: config.controllers.shopDetail.url,
                templateUrl:config.controllers.shopDetail.templateUrl,
                controller:config.controllers.shopDetail.controller,
                cache:false
            })

        $urlRouterProvider.otherwise("/productDetail/121")

    }])
