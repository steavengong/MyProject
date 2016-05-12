/**
 * Created by Administrator on 2016/2/29.
 */

var smartApp = angular.module("bq-app",[]);

function control(app,controller,callback){
    app.controller(controller,callback);
}

uWX.setWXSign();


$("#type-picker").picker({
    toolbarTemplate: '<header class="bar bar-nav">\
     <button class="button button-link pull-right close-picker">确定</button>\
     <h1 class="title">选择场次</h1>\
     </header>',
    cols: [
        {
            textAlign: "center",
            values: ["宝宝场","孕妇场"]
        }
    ]
});

var actTimes = "";
var userName = "";
var userPhone = "";
var userBirthday = "";

$(document).on("change","#type-picker",function(){
    actTimes = $("#type-picker").val();
    if(actTimes==="宝宝场"){
        $(".type-picker").text("出生年月：");
    }
    else{
        $(".type-picker").text("预产期：");
    }
})

function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function isNull(str){
    if (str.length ==0)
    {
        return false;
    }

    return true;
}

function isPhone(str){
    var regPhone = /^(15\d{9}|13\d{9}|14\d{9}|17\d{9}|18\d{9})$/;
    if(!regPhone.test(str)){
        return false;
    }
    return true;
}

$(document).on("click",".btnSignUp2",function(){

    if(!actTimes){
        $.alert("请选择你需要参加的场次！");
        return;
    }

    userName = trim($(".userName").val());

    if(!isNull(userName)){
        $.alert("请输入您的姓名！");
        return;
    }

    userPhone = $(".userPhone").val();
    if(!isNull(userPhone)){
        $.alert("请输入您的手机号！");
        return;
    }

    if(!isPhone(userPhone)){
        $.alert("请输入正确的手机号！");
        return;
    }

    $.showPreloader("正在提交，请稍候...");
    var action = config.requestUrl;
    var data = {
        "cmd":encodeURIComponent(config.cmds.childcareSign),
        "parameters":{
            "city":encodeURIComponent(config.city),
            "actTimes":encodeURIComponent(actTimes),
            "userName":encodeURIComponent(userName),
            "userPhone":encodeURIComponent(userPhone),
            "userBirthday":encodeURIComponent(userBirthday)
        }
    }
    uAjax.ajax(action,data,function(result){
        $.hidePreloader();
        console.log(JSON.stringify(result));
        var response = parseInt(result.response,10);
        config.wxDesc = "我已成功报名贝亲2016超级育儿课堂天津站活动"
        uShare.shareItems(config.wxTitle,config.wxDesc,config.webUrl,config.wxImgUrl);
        if(response==1){
            $(".page-share").css({"display":"block"});
            $.router.load(config.page.pageResult);
            reset();

        }
        else if(response == 0){
            $.alert("该手机号已报过名！");
        }
    })
})

function reset(){
    userName = "";
    userPhone = "";
    $(".userName").val(userName);
    $(".userPhone").val(userPhone);
}

$(document).on("click",".page-share",function(){
    $(".page-share").css({"display":"none"});
})



control(smartApp,"home-controller",function($scope,$http){
    $scope.logo = config.umImgUrl + config.img.logo;
    $scope.activityLogo = config.umImgUrl + config.img.activityLogo;
    $scope.address = config.city;
    $scope.expert = config.umImgUrl + config.img.expert;
    $scope.gift1 = config.umImgUrl + config.img.gift1;
    $scope.gift2 = config.umImgUrl + config.img.gift2;
    $scope.code1 = config.umImgUrl + config.img.code1;
    $scope.code2 = config.umImgUrl + config.img.code2;
    $scope.btnSignUp1 = config.umImgUrl + config.img.btnSignUp1;
    $scope.btnRegister1 = config.umImgUrl + config.img.btnRegister1;
    $scope.regester = config.link.regester;
    $scope.pageRegister = config.page.pageRegister;
});

$("#myDatePicker").calendar({
    value:[new Date()],
    dateFormat:"yyyy年mm月dd日",
    onChange:function(p, values, displayValues){
        userBirthday = DateFormat.format.date(new Date().setTime(values),"yyyy-MM-dd");
    }
});


control(smartApp,"register-controller",function($scope,$http){
    $scope.logo = config.umImgUrl + config.img.logo;
    $scope.activityLogo = config.umImgUrl + config.img.activityLogo;
    $scope.address = config.city;
    $scope.btnSignUp2 = config.umImgUrl + config.img.btnSignUp2;
    $scope.todayDate = DateFormat.format.date(new Date(),"yyyy年MM月dd日");
    userBirthday = DateFormat.format.date(new Date(),"yyyy-MM-dd");
});




control(smartApp,"result-controller",function($scope,$http){
    $scope.logo = config.umImgUrl + config.img.logo;
    $scope.btnRegister2 = config.umImgUrl + config.img.btnRegister2;
    $scope.regester = config.link.regester;
    $scope.bgCongratulations = config.umImgUrl + config.img.bgCongratulations;
    $scope.bgShare = config.umImgUrl + config.img.bgShare;
});



$.init();


