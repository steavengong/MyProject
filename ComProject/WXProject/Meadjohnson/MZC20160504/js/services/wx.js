/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("services.wx",[])
    .service("$wx",["$window","$config","$httpServices","$q","$location",function($window,$config,$httpServices,$q,$location){
        var $wx = {}

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

        $wx.setWXSign = function(){
            var deferred = $q.defer();
            var action = $config.getRequestAction();
            var data = {
                "cmd" : $config.cmds.setWXSign,
                "parameters" : {
                    "url" : $location.absUrl().split("#")[0]
                }
            };
            $httpServices.getJsonFromPost(action,data)
                .then(function(result){
                    var response = result.response;
                    if(response){
                        wx.config({
                            //debug : $config.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId : $config.getAppId(), // 必填，公众号的唯一标识
                            timestamp : response.timestamp, // 必填，生成签名的时间戳
                            nonceStr : response.nonceStr, // 必填，生成签名的随机串
                            signature :response.signature,// 必填，签名，见附录1
                            jsApiList : [ "onMenuShareTimeline",
                                "onMenuShareAppMessage", "onMenuShareQQ",
                                "onMenuShareWeibo","showMenuItems","hideMenuItems"]
                            // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        wx.ready(function() {
                            //判断当前客户端版本是否支持指定JS接口
                            wx.checkJsApi({
                                jsApiList : [ "onMenuShareTimeline",
                                    "onMenuShareAppMessage",
                                    "onMenuShareQQ", "onMenuShareWeibo","showMenuItems","hideMenuItems"]
                            });
                            $wx.shareItems($config.shareObject.shareTitle,$config.shareObject.shareDescription,$config.shareObject.getShareUrl(),$config.shareObject.shareImageUrl);
                            deferred.resolve();

                        });

                        wx.error(function() {
                            deferred.reject();
                        });
                    }
                })

            return deferred.promise;
        }

        $wx.initCode = function(){
            var redirect_uri = escape($config.getIndexUrl());
            var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                + $config.getAppId()+"&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
            $window.location = url;
        }

        $wx.shareItems = function(title,desc,link,imgUrl){
            this.weChatMoments(desc,link,imgUrl);
            this.weChatFriend(title,desc,link,imgUrl);
            this.tencentQFriend(title,desc,link,imgUrl);
            this.tencentWeiBo(title,desc,link,imgUrl);
        }
        $wx.weChatMoments = function(desc,link,imgUrl){//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            wx.onMenuShareTimeline({
                title : desc, // 分享标题
                link : link, // 分享链接
                imgUrl : imgUrl, // 分享图标
                success: function () { /*用户确认分享后执行的回调函数*/ },
                cancel: function () { /*用户取消分享后执行的回调函数*/ }
            });
        }
        $wx.weChatFriend = function(title,desc,link,imgUrl) { //获取“分享给朋友”按钮点击状态及自定义分享内容接口
            wx.onMenuShareAppMessage({
                title : title, // 分享标题
                desc : desc, // 分享描述
                link : link, // 分享链接
                imgUrl : imgUrl, // 分享图标
                success: function () { /*用户确认分享后执行的回调函数*/ },
                cancel: function () { /*用户取消分享后执行的回调函数*/ }
            });
        }
        $wx.tencentQFriend = function(title,desc,link,imgUrl) { //获取“分享到QQ好友”按钮点击状态及自定义分享内容接口
            wx.onMenuShareQQ({
                title : title, // 分享标题
                desc : desc, // 分享描述
                link : link, // 分享链接
                imgUrl : imgUrl, // 分享图标
                success: function () { /*用户确认分享后执行的回调函数*/ },
                cancel: function () { /*用户取消分享后执行的回调函数*/ }
            });
        }
        $wx. tencentWeiBo = function(title,desc,link,imgUrl){ //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
            wx.onMenuShareWeibo({
                title : title, // 分享标题
                desc : desc, // 分享描述
                link : link, // 分享链接
                imgUrl : imgUrl, // 分享图标
                success: function () { /*用户确认分享后执行的回调函数*/ },
                cancel: function () { /*用户取消分享后执行的回调函数*/ }
            });
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
