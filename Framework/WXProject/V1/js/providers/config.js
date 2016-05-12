/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("providers.config",[])
    .provider("$config",function(){
        var $config = {};

        $config.message = "Hello";

        $config.debug = true;

        $config.requestAction = "q";

        $config.requestActionDebug = "http://192.168.100.212:8081/wine-weixin-rest/cgi";

        $config.appId = "";

        $config.appIdDebug = "wx03fc01e909d9a654";
        //$config.appIdDebug = "wx97c23153d718bccf";

        $config.indexUrl = "";

        $config.indexUrlDebug = "http://192.168.100.67:8080/MZC/index.html";

        $config.cmds = {
        }

        $config.controllers = {
        }

        $config.getIndexUrl = function(){
            if(this.debug){
                return  this.indexUrlDebug;
            }
            return this.indexUrl;
        }

        $config.getRequestAction = function(){
            if(this.debug){
                return  this.requestActionDebug;
            }
            return this.requestAction;
        }

        $config.getAppId = function(){
            if(this.debug){
                return  this.appIdDebug;
            }
            return this.appId;
        }

        $config.$get = function(){
            return this;
        }

        return $config;

    })