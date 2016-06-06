/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("wxDirective",[])
.directive("wxHead",function(){
    var $wxHead = {}
    $wxHead.templateUrl = "templates/wx/head.html";
    $wxHead.replace = true;
    $wxHead.controller = function($scope, $window, $element){
        $scope.checkWx = function(){
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                return true;
            }else{
                return false;
            }
        }

        $scope.onApp = function(){
            var appDownload="http://a.app.qq.com/o/simple.jsp?pkgname=com.cmbb.smartkids";
            $window.location = appDownload
        }
    }
    return $wxHead;
})
.directive("wxFoot",function(){
    var $wxFoot = {};
    $wxFoot.templateUrl = "templates/wx/foot.html";
    $wxFoot.replace = true;
    $wxFoot.controller = function($scope, $window, $element){
        $scope.checkWx = function(){
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                return true;
            }else{
                return false;
            }
        }
    }
    return $wxFoot;
})