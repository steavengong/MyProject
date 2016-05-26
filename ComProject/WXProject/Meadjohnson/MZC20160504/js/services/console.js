/**
 * Created by Administrator on 2016/5/26.
 */
angular.module("services.console",[])
    .service("$console",["$config",function($config){
        var $console = function(msg){
            if($config.debug){
                console.log(msg);
            }
        }
        return $console;
    }])