/**
 * Created by Administrator on 2016/2/29.
 */
var config = {
    url:window.location.href,
    city:"天津",
    appId:"wx5bb398c959489ae4",
    debug : 0,
    img : {
        logo:"logo.png",
        activityLogo:"activity-logo.png",
        expert:"expert.png",
        gift1:"gift5.png",
        gift2:"gift6.png",
        code1:"code1.png",
        code2:"code2.png",
        btnSignUp1:"btnSignUp1.png",
        btnSignUp2:"btnSignUp2.png",
        btnRegister1:"btnRegister1.png",
        btnRegister2:"btnRegister2.png",
        bgCongratulations:"bg-congratulations.png",
        bgShare:"bg-share.png"
    },
    link : {
        regester:"http://m.mama.pigeon.cn/"
    },
    page : {
        pageHome:"#page-home",
        pageRegister:"#page-register",
        pageResult:"#page-result"
    },
    requestUrl:"http://weixin.mengbp.com/wine-weixin-rest/cgi",
    cmds:{
        setWXSign:"christ/weixin/setSign",
        childcareSign:"childcare/sign"
    },
    umImgUrl:"http://smart.image.alimmdn.com/H5/BQYEKT/img/",
    webUrl:"http://www.mengbp.com/web/WXH5/Pigeon/PigeonClass/index.html",
    wxTitle:"贝亲2016超级育儿课堂"+config.city+"站",
    wxDesc:"贝亲2016超级育儿课堂"+config.city+"站",
    wxImgUrl: "http://smart.image.alimmdn.com/H5/BQYEKT/img/share500.jpg"
}

var uAlert = {
    showDebug : function(msg) {
        if (config.debug) {
            if (config.debug == 1) {
                alert(msg);
            }
            else if (config.debug == 2) {
                console.log(msg);
            }
            else if (config.debug == 3) {
                alert(msg);
                console.log(msg);
            }
        }
    }
}

var uAjax = {
    ajax : function(action,data,callback){
        $.ajax({
            type : "GET",
            url:action,
            data:data,
            dataType : "jsonp",
            jsonp: "callback",
            success:callback||function(data){
                $.hidePreloader();
                uAlert.showDebug("success:"+JSON.stringify(data));
            },
            error:function(data){
                $.hidePreloader();
                $.alert("服务器正在维护！");
                uAlert.showDebug("error:"+action);
                uAlert.showDebug("error:"+JSON.stringify(data));
            }
        });
    }
}

var uWX = {
    setWXSign : function(){
        var wxDebug = false;
        if(config.debug){
            wxDebug = true;
        }

        var action = config.requestUrl;
        var data = {
            "cmd":encodeURIComponent(config.cmds.setWXSign),
            "parameters":{
                "url":config.url
            }
        }

        $.showPreloader("加载中...");
        uAjax.ajax(action,data,function(result){
            $.hidePreloader();
            var response = result.response;
            wx.config({
                debug : wxDebug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId : config.appId, // 必填，公众号的唯一标识
                timestamp : response.timestamp, // 必填，生成签名的时间戳
                nonceStr : response.nonceStr, // 必填，生成签名的随机串
                signature :response.signature,// 必填，签名，见附录1
                jsApiList : [ "onMenuShareTimeline",
                    "onMenuShareAppMessage", "onMenuShareQQ",
                    "onMenuShareWeibo"]
                // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function() {
                //判断当前客户端版本是否支持指定JS接口
                wx.checkJsApi({
                    jsApiList : [ "onMenuShareTimeline",
                        "onMenuShareAppMessage",
                        "onMenuShareQQ", "onMenuShareWeibo"]
                });

                uShare.shareItems(config.wxTitle,config.wxDesc,config.webUrl,config.wxImgUrl);
            });

            wx.error(function(res) {
                uAlert.showDebug(res.errMsg);
            });
        });

    }
}

var uShare = {
    shareItems : function(title,desc,link,imgUrl){
        this.weChatMoments(desc,link,imgUrl);
        this.weChatFriend(title,desc,link,imgUrl);
        this.tencentQFriend(title,desc,link,imgUrl);
        this.tencentWeiBo(title,desc,link,imgUrl);
    },
    weChatMoments : function(desc,link,imgUrl){//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
            title : desc, // 分享标题
            link : link, // 分享链接
            imgUrl : imgUrl, // 分享图标
            success: function () { /*用户确认分享后执行的回调函数*/ },
            cancel: function () { /*用户取消分享后执行的回调函数*/ }
        });
    },
    weChatFriend : function(title,desc,link,imgUrl) { //获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title : title, // 分享标题
            desc : desc, // 分享描述
            link : link, // 分享链接
            imgUrl : imgUrl, // 分享图标
            success: function () { /*用户确认分享后执行的回调函数*/ },
            cancel: function () { /*用户取消分享后执行的回调函数*/ }
        });
    },
    tencentQFriend : function(title,desc,link,imgUrl) { //获取“分享到QQ好友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareQQ({
            title : title, // 分享标题
            desc : desc, // 分享描述
            link : link, // 分享链接
            imgUrl : imgUrl, // 分享图标
            success: function () { /*用户确认分享后执行的回调函数*/ },
            cancel: function () { /*用户取消分享后执行的回调函数*/ }
        });
    },
    tencentWeiBo : function(title,desc,link,imgUrl){ //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
        wx.onMenuShareWeibo({
            title : title, // 分享标题
            desc : desc, // 分享描述
            link : link, // 分享链接
            imgUrl : imgUrl, // 分享图标
            success: function () { /*用户确认分享后执行的回调函数*/ },
            cancel: function () { /*用户取消分享后执行的回调函数*/ }
        });
    }
}