/**
 * Created by Administrator on 2016/5/26.
 */
angular.module("services.locals",[])
    .service("$locals",["$window",function($window){
        var $locals = {};

        //存储单个属性
        $locals.set = function(key,value){
            $window.localStorage[key]=value;
        }

        //读取单个属性
        $locals.get = function(key,defaultValue){
            return  $window.localStorage[key] || defaultValue;
        }
        //存储对象，以JSON格式存储
        $locals.setObject = function(key,value){
            $window.localStorage[key]=JSON.stringify(value);
        }

        //读取对象
        $locals.getObject = function (key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }

        return $locals;
    }])