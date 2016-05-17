/**
 * Created by Administrator on 2016/5/6.
 */
angular.module("controllers.home",[])
    .controller("homeCtrl",["$scope","$state","$config","$wx","$location","$timeout","$alert","$httpServices","$ionicScrollDelegate","$modal","$ionicLoading",
        function($scope,$state,$config,$wx,$location,$timeout,$alert,$httpServices,$ionicScrollDelegate,$modal,$ionicLoading){
            $ionicLoading.show();

            $scope.showPage = function(){
                $state.go($config.controllers.rankingList.name);
            }

            var waterFullTimeOut = null;

            $scope.searchFor = "";
            $scope.search = function(searchBy){
                if(!$config.hook){
                    $config.hook = true;
                    $ionicLoading.show();
                    if(searchBy){
                        searchFor(searchBy);
                    }
                    else{
                        $alert.show($config.messages.search.notNull)
                        $config.hook = false;
                        $ionicLoading.hide();
                    }
                }
            }

            $scope.cleanSearch = function(){
                $scope.$$childTail.searchFor= "";
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
                            console.log(result.response);
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
                            console.log(result.response);
                            var responseData = result.response.data;
                            if(responseData.rows.length>0){
                                cacheSearchBoxItems = [];
                                itemSearchTotal = responseData.records;
                                addSearchItem(responseData.rows);
                            }
                            else{
                                $alert.show($config.messages.search.noFound);
                            }

                        }
                        else{
                            $alert.show($config.messages.search.noFound);
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


            $scope.findBabyDetail = function(openId){
                $state.go($config.controllers.detail.name,{"openId":openId});
            }

            $scope.voteByBallot = function($event,openId,$index){
                $event.stopPropagation();

                if(!$config.hook){
                    $config.hook = true;
                    $ionicLoading.show();
                    if($config.personInfo.isDeadline == 3){
                        $alert.show($config.messages.activityStatus.end);
                        $config.hook = false;
                        $ionicLoading.hide();
                        return ;
                    }

                    if($config.personInfo.openId == openId){
                        $alert.show($config.messages.voteByBallot.error);
                        $config.hook = false;
                        $ionicLoading.hide();
                        return;
                    }

                    if($config.personInfo.subscribe==0){
                        $alert.show($config.messages.voteByBallot.noAttentions)
                        $config.hook = false;
                        $ionicLoading.hide();
                    }
                    else{
                        voteByBallot(openId,$index)
                    }
                }

            }

            function voteByBallot(openId,$index){
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
                        if(response.flag == "投票成功"){
                            $scope.homeBoxItems[$index].number ++;
                        }
                    })
            }

            var flag = true;
            $scope.hasMore = function() {
                return flag;
            }

            $scope.loadMore = function(){
                if(flag){
                    flag = false;
                    $timeout(function(){
                        flag = true;
                    },3000)
                }
            }


        }])