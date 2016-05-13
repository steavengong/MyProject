/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("providers.config",[])
    .provider("$config",function(){
        var $config = {};

        $config.message = "Hello";

        $config.debug = true;

        $config.requestAction = "http://weixin.mengbp.com/wine-weixin-rest/cgi";

        $config.requestActionDebug = "http://erpuat.mengbp.com:8090/wine-weixin-rest/cgi";

        $config.appId = "wx5bb398c959489ae4";

        $config.appIdDebug = "wx03fc01e909d9a654";

        $config.indexUrl = "http://www.mengbp.com/Meadjohnson/MZC20160504/index.html";

        $config.indexUrlDebug = "http://192.168.100.67:8080/MZC/index.html";

        $config.cmds = {
            isAttentions:"mzc/weixin/isAttentions", //参数：code
            searchName:"mzc/weixin/searchName",    //参数：searchName（搜索）  ranking：0.首页  1.排行榜
            attendMzc:"mzc/weixin/attendMzc",
            voteByBallot:"mzc/weixin/voteByBallot",  //参数：openId（当前登录的）   passiveOpenId（被投票的）
            findBabyDetail:"mzc/weixin/findBabyDetail"//参数：openId（当前登录的）
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
            "rule":{
                name:"rule",
                templateUrl:"templates/modal/rule.html"
            },
            "enjoy":{
                name:"enjoy",
                templateUrl:"templates/modal/enjoy.html"
            },
            "prize":{
                name:"prize",
                templateUrl:"templates/modal/prize.html"
            }
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