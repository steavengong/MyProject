/**
 * Created by Administrator on 2016/5/6.
 */
angular.module("controllers.home",[])
    .controller("homeCtrl",["$scope","$state","$config","$wx","$location","$ionicScrollDelegate","$timeout",function($scope,$state,$config,$wx,$location,$ionicScrollDelegate,$timeout){

        //console.log($wx.personInfo.openId)

        $scope.showPage = function(){
            $state.go($config.controllers.rankingList.name);
        }

        $scope.searchFor = "";
        $scope.search = function(searchBy){
            if(searchBy){
                console.log(searchBy);
            }
        }

        $scope.cleanSearch = function(){
            $scope.$$childTail.searchFor = "";
        }

        $scope.backToTop = function(hashId){
            if ($location.hash() !== hashId) {
                $location.hash(hashId);
            }
            $ionicScrollDelegate.anchorScroll();
        }

        $timeout(function(){
            waterFull("home-list",".home-box");
        },1000);


        function waterFull(id,selector){
            var element = document.getElementById(id);
            var $element = angular.element(element);
            var $selector = $element.children(selector);
            if($selector.length>0){
                var boxWidth = $selector[0].offsetWidth;
                var cols = Math.floor(element.offsetWidth / boxWidth);
                var hArr = [];
                for(var i = 0 ; i< $selector.length ; i++){
                    if(i<cols){
                        hArr.push($selector[i].offsetHeight);
                    }
                    else{
                        var minH = Math.min.apply(null,hArr);
                        var index = getMinIndex(hArr,minH);
                        $selector[i].style.position = "absolute";
                        $selector[i].style.top = minH+"px"
                        $selector[i].style.left = $selector[index].offsetLeft+"px"
                        hArr[index] += $selector[i].offsetHeight;
                    }
                }
            }
        }

        function getMinIndex(arr,val){
            for(var i in arr){
                if(arr[i] == val){
                    return i;
                }
            }
        }



        $scope.findBabyDetail = function(openId){
            console.log("findBabyDetail")
            $state.go($config.controllers.detail.name,{"openId":openId});
        }

        $scope.voteByBallot = function($event,openId){
            $event.stopPropagation();
            console.log("voteByBallot")
        }


    }])