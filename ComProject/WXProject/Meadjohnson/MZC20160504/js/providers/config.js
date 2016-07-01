/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("providers.config",[])
    .provider("$config",function(){
        var $config = {};

        $config.debug = true;

        $config.hook = false;

        $config.requestAction = "http://weixin.mengbp.com/wine-weixin-rest/cgi";
        $config.requestActionDebug = "http://weixin.mengbp.com/wine-weixin-rest/cgi";

        $config.requestEnjoyAction = "http://weixin.mengbp.com/wine-weixin-rest/mzc/weixin/attendMzc";
        $config.requestEnjoyActionDebug = "http://weixin.mengbp.com/wine-weixin-rest/mzc/weixin/attendMzc";

        $config.appId = "wx5bb398c959489ae4";
        $config.appIdDebug = "wx03fc01e909d9a654";

        $config.indexUrl = "http://www.mengbp.com/web/WXH5/Meadjohnson/MZC20160701/index.html";
        $config.indexUrlDebug = "http://www.mengbp.com/web/WXH5/Meadjohnson/MZC20160504/index.html";

        $config.cmds = {
            isAttentions:"mzc/weixin/isAttentions", //参数：code
            searchName:"mzc/weixin/searchName",    //参数：searchName（搜索）  ranking：0.首页  1.排行榜
            voteByBallot:"mzc/weixin/voteByBallot",  //参数：openId（当前登录的）   passiveOpenId（被投票的）
            findBabyDetail:"mzc/weixin/findBabyDetail",//参数：openId（当前登录的）
            setWXSign:"christ/weixin/setSign"
        }

        $config.shareObject = {
            shareTitle : "我家萌宝肿么辣么可爱o(〃'▽'〃)o",
            shareDescription : "参与家有萌宝初长成，宝照大集赞，晒出你家最可爱软萌的新生宝宝，丰富奖品收到手软！",
            shareImageUrl : "http://smart.image.alimmdn.com/H5/MZC/Resources/Image/share.jpg",
            shareLinkUrl : "http://www.mengbp.com/web/WXH5/Meadjohnson/MZC20160701/index.html",
            shareLinkUrlDebug : "http://www.mengbp.com/web/WXH5/Meadjohnson/MZC20160504/index.html",
            getShareUrl: function(){
                if($config.debug){
                    return $config.shareObject.shareLinkUrlDebug
                }
                return $config.shareObject.shareLinkUrl
            }
        }

        $config.personInfo = {
            subscribe:1,
            isJoin:0,
            openId:"",
            status:1,
            isDeadline:1
        }

        $config.messages = {
            search:{
                noFound:"没有找到您需要的",
                notNull:"搜索内容不能为空"
            },
            voteByBallot:{
                noAttentions:"请先关注",
                error:"无法给自己投票",
                success:"恭喜您，投票成功了哦！",
                outOfRank:"不在三十名以内不能投票"
            },
            activityStatus:{
                end:"活动已结束",
                noJoin:"第二期活动开始，无法再报名",
                hasJoin:"您已报名参加过了"
            },
            enjoy:{
                notNullName:"宝宝姓名不能为空",
                notNullDate:"宝宝生日不能为空",
                notNullPhone:"手机号不能为空",
                notRexPhone:"手机号格式不正确",
                notNullWX:"微信号不能为空",
                notNullFile:"参赛图片不能少",
                notRexFile:"图片格式错误",
                notNullRemark:"简介不能为空",
                success:"恭喜您，已成功参赛",
            },
            edit:{
                canEdit:"恭喜进入第二轮选拔,请更换图片",
                success:"恭喜您，已成功更新",
            },
            browser:{
                error:"请使用微信客户端访问链接",
            }

        }

        $config.controllers = {
            "home":{
                name:"home",
                url:"/home",
                templateUrl:"templates/home.html",
                ctrl:"homeCtrl"
            },
            rankingList:{
                name:"rankingList",
                url:"/rankingList",
                templateUrl:"templates/rankingList.html",
                ctrl:"rankingListCtrl",
                cache:false
            },
            detail:{
                name:"detail",
                url:"/detail/:openId",
                templateUrl:"templates/detail.html",
                ctrl:"detailCtrl",
                cache:false
            }
        }

        $config.modals = {
            "ruleBaby":{
                name:"ruleBaby",
                templateUrl:"templates/modal/ruleBaby.html"
            },
            "ruleMam":{
                name:"ruleMam",
                templateUrl:"templates/modal/ruleMam.html"
            },
            "enjoy":{
                name:"enjoy",
                templateUrl:"templates/modal/enjoy.html"
            },
            "prizeBaby":{
                name:"prize",
                templateUrl:"templates/modal/prizeBaby.html"
            },
            "prizeMum":{
                name:"prize",
                templateUrl:"templates/modal/prizeMum.html"
            },
            "qrCode":{
                name:"qrCode",
                templateUrl:"templates/modal/qrCode.html",
                animation:"none"
            },
            "edit":{
                name:"edit",
                templateUrl:"templates/modal/edit.html"
            }
        }

        $config.popover = {
            rule:{
                name:"rulePop",
                templateUrl:"templates/popover/popover.html"
            }
        }

        $config.numberOfPage = 30;

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

        $config.getRequestEnjoyAction = function(){
            if(this.debug){
                return  this.requestEnjoyActionDebug;
            }
            return this.requestEnjoyAction;
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