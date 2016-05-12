/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("services.wx",[])
    .service("$wx",["$window","$config","$httpServices","$q",function($window,$config,$httpServices,$q){
        var $wx = {}

        $wx.shareObject = {
            shareTitle : "",
            shareDescription : "",
            shareImageUrl : "",
            shareLinkUrl : ""
        }

        $wx.personInfo = {
            openId:"",
            name:"",
        }

        $wx.redirect = function(){
            var deferred = $q.defer();
            var code = purl().param("code");
            if(code){
                this.getToken(code).then(function(result){
                    deferred.resolve(result);
                })
            }
            else{
                deferred.reject();
            }

            return deferred.promise;
        }

        $wx.initCode = function(){
            var redirect_uri = escape($config.getIndexUrl());
            var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                + $config.getAppId()+"&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
            $window.location = url;
        }

        $wx.getToken = function(code){
            var deferred = $q.defer();
            var action = $config.getRequestAction();
            var data = {
                "cmd":$config.cmds.isAttentions,
                "parameters":{
                    code : code
                }
            }
            $httpServices.getJsonFromPost(action,data).then(function(result){
                deferred.resolve(result);
            })

            return deferred.promise;
        }

        return $wx;
    }])
