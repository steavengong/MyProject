/**
 * Created by Administrator on 2016/5/6.
 */
angular.module("controllers.home",[])
    .controller("homeCtrl",["$scope","$state","$config","$wx","$location","$timeout","$alert","$httpServices","$ionicScrollDelegate","$modal",function($scope,$state,$config,$wx,$location,$timeout,$alert,$httpServices,$ionicScrollDelegate,$modal){


        $scope.showPage = function(){
            $state.go($config.controllers.rankingList.name);
        }

        var waterFullTimeOut = null;

        $scope.searchFor = "";
        $scope.search = function(searchBy){
            if(searchBy){
                searchFor(searchBy);
            }
            else{
                $alert.show("搜索内容不能为空")
            }
        }

        $scope.cleanSearch = function(){
            $scope.$$childTail.searchFor = "";
            $scope.homeBoxItems = cacheRankBoxItems;
            cacheSearchBoxItems = [];
            waterFullTimeOut = $timeout(function(){
                waterFull("home-list",".home-box");
                $scope.$on("$destroy",
                    function( event ) {
                        $timeout.cancel(waterFullTimeOut);
                    })
            },50)
        }



        $scope.backToTop = function(hashId){
            if ($location.hash() !== hashId) {
                $location.hash(hashId);
            }
            $ionicScrollDelegate.anchorScroll();
        }

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

        searchRanking();


        var itemRankTotal = 0;
        var itemPerPage = 30;
        var itemSearchTotal = 0;
        $scope.homeBoxItems = [];
        var scrollFlage = true;
        var cacheRankBoxItems = [];
        var cacheSearchBoxItems = [];

        function searchRanking(){

            var action = $config.getRequestAction();
            var data = {
                "cmd" : $config.cmds.searchName,
                "parameters" : {
                    "ranking" : 0
                }
            };

            $httpServices.getJsonFromPost(action,data)
                .then(function(result){
                    if(result.response){
                        var responseData = result.response.data;
                        if(responseData.rows.length>0){
                            itemRankTotal = responseData.records;
                            addRankItem(responseData.rows);
                        }
                    }
                })
        }

        function addRankItem(items){
            for(var item in items){
                cacheRankBoxItems.push(items[item]);
            }
            $scope.homeBoxItems = cacheRankBoxItems
            waterFullTimeOut = $timeout(function(){
                waterFull("home-list",".home-box");
                $scope.$on("$destroy",
                    function( event ) {
                        $timeout.cancel(waterFullTimeOut);
                    })
            },100)
        }

        function searchFor(searchBy){
            var action = $config.getRequestAction();
            var data = {
                "cmd" : $config.cmds.searchName,
                "parameters" : {
                    "searchName" : searchBy,
                    "ranking" : 0
                }
            };

            $httpServices.getJsonFromPost(action,data)
                .then(function(result){
                    if(result.response){
                        var responseData = result.response.data;
                        if(responseData.rows.length>0){
                            itemSearchTotal = responseData.records;
                            addSearchItem(responseData.rows);
                        }
                        else{
                            $alert.show("没有找到您需要的");
                        }

                    }
                    else{
                        $alert.show("没有找到您需要的");
                    }
                })

        }

        function addSearchItem(items){
            for(var item in items){
                cacheSearchBoxItems.push(items[item]);
            }
            $scope.homeBoxItems = cacheSearchBoxItems
            waterFullTimeOut = $timeout(function(){
                waterFull("home-list",".home-box");
                $scope.$on("$destroy",
                    function() {
                        $timeout.cancel(waterFullTimeOut);
                    })
            },100)
        }

        $scope.checkPhoto = function(photo){
            var base = "img/";
            switch (photo){
                case "1":
                    base = base + "add-new-photo.png";
                    break;
                case "2":
                    base = base + "bg-main.jpg";
                    break;
                case "3":
                    base = base + "ionic.png";
                    break;
                case "4":
                    base = base + "logo.png";
                    break;
            }
            return base;
        }



        $scope.findBabyDetail = function(openId){
            $state.go($config.controllers.detail.name,{"openId":openId});
        }

        $scope.voteByBallot = function($event,openId){
            $event.stopPropagation();
            if($config.personInfo.subscribe==0){
                $alert.show("请先关注")
            }
            else{
                voteByBallot(openId)
            }
        }

        function voteByBallot(openId){
            var action = $config.getRequestAction();
            var data = {
                "cmd" : $config.cmds.voteByBallot,
                "parameters" : {
                    "openId" : $config.personInfo.openId,
                    "passiveOpenId":openId
                }
            };

            $httpServices.getJsonFromPost(action,data)
                .then(function(result){
                    var response = result.response;
                    $alert.show(response.flag);
                })
        }

    }])