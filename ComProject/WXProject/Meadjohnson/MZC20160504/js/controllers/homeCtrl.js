/**
 * Created by Administrator on 2016/5/6.
 */
angular.module("controllers.home",[])
    .controller("homeCtrl",["$scope","$state","$config","$wx","$location","$timeout","$alert","$httpServices","$ionicScrollDelegate","$modal","$ionicLoading",
        function($scope,$state,$config,$wx,$location,$timeout,$alert,$httpServices,$ionicScrollDelegate,$modal,$ionicLoading){
            var itemRankPageNo = 0;
            var itemRankFlag = true;
            var numberOfPerPage = 5;
            var itemSearchPageNo = 0;
            var itemSearchFlag = true;
            $scope.homeBoxItems = [];
            var cacheRankBoxItems = [];
            var cacheSearchBoxItems = [];
            var rankFlag = true;
            var searchName = "";

            $ionicLoading.show();

            $scope.showPage = function(){
                $state.go($config.controllers.rankingList.name);
            }

            $scope.searchFor = "";

            $scope.backToTop = function(hashId){
                if ($location.hash() !== hashId) {
                    $location.hash(hashId);
                }
                $ionicScrollDelegate.anchorScroll();
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

            function initList(){
                var action = $config.getRequestAction();
                var data = {
                    "cmd" : $config.cmds.searchName,
                    "parameters" : {
                        "ranking" : 0,
                        "numberOfPerPage":numberOfPerPage,
                        "pageNo":itemRankPageNo
                    }
                };
                $httpServices.getJsonFromPost(action,data)
                    .then(function(result){
                        if(result.response){
                            console.log(result.response);
                            var responseData = result.response.data;
                            if(responseData.rows.length>0){
                                itemRankPageNo++;
                                addRankItem(responseData.rows);
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                                itemRankFlag = true;
                            }
                            else{
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                                itemRankFlag = false;
                            }
                        }
                        else{
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            itemRankFlag = false;
                        }
                    })
            }

            $scope.search = function(searchBy){
                if(!$config.hook){
                    $config.hook = true;
                    $ionicLoading.show();
                    if(searchBy){
                        rankFlag = false;
                        itemSearchPageNo = 0;
                        cacheSearchBoxItems = [];
                        searchName = searchBy;
                        searchFor(searchName);
                    }
                    else{
                        $alert.show($config.messages.search.notNull)
                        $config.hook = false;
                        rankFlag = true;
                        $ionicLoading.hide();
                    }
                }
            }

            function searchFor(searchBy){
                var action = $config.getRequestAction();
                var data = {
                    "cmd" : $config.cmds.searchName,
                    "parameters" : {
                        "searchName" : searchBy,
                        "ranking" : 0,
                        "numberOfPerPage":numberOfPerPage,
                        "pageNo":itemSearchPageNo
                    }
                };

                $httpServices.getJsonFromPost(action,data)
                    .then(function(result){
                        if(result.response){
                            console.log(result.response);
                            var responseData = result.response.data;
                            if(responseData.rows.length>0){
                                itemSearchPageNo++;
                                addSearchItem(responseData.rows);
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                                itemSearchFlag = true;
                            }
                            else{
                                $alert.show($config.messages.search.noFound);
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                                itemSearchFlag = false;
                            }
                        }
                        else{
                            $alert.show($config.messages.search.noFound);
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            itemSearchFlag = false;
                        }
                    })
            }

            function addSearchItem(items) {
                for (var item in items) {
                    cacheSearchBoxItems.push(items[item]);
                }
                $scope.homeBoxItems = cacheSearchBoxItems
            }

            $scope.cleanSearch = function(){
                $scope.$$childTail.searchFor = "";
                rankFlag = true;
                $scope.homeBoxItems = cacheRankBoxItems;
            }

            $scope.noMore = function(){
                if(rankFlag){
                    return itemRankFlag;
                }
                else{
                    return itemSearchFlag;
                }
            }

            function addRankItem(items){
                for(var item in items){
                    cacheRankBoxItems.push(items[item]);
                }
                $scope.homeBoxItems = cacheRankBoxItems
            }

            $scope.loadMore = function() {
                if(rankFlag){
                    if(!$config.hook){
                        $config.hook = true;
                        initList();
                    }
                }
                else{
                    if(!$config.hook){
                        $config.hook = true;
                        searchFor(searchName);
                    }
                }
            };

        }])