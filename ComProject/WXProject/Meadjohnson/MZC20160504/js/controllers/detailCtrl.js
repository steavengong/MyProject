/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.detail",[])
    .controller("detailCtrl",["$rootScope","$scope","$state","$config","$wx","$stateParams","$modal","$httpServices","$alert",
        function($rootScope,$scope,$state,$config,$wx,$stateParams,$modal,$httpServices,$alert){
        findBabyDetail();

        function findBabyDetail(){
            var action = $config.getRequestAction();
            var data = {
                "cmd" : $config.cmds.findBabyDetail,
                "parameters" : {
                    "openId" : $stateParams.openId,
                }
            };
            $httpServices.getJsonFromPost(action,data)
                .then(function(result){
                    console.log(result);
                    $scope.detailObj = result.response;
                })
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
                default:
                    base = photo;
                    break;
            }
            return base;
        }

        $scope.goHome = function(){
            $state.go($config.controllers.home.name);
        }

        $scope.checkOpenId = function(){
            if($stateParams.openId == $config.personInfo.openId){
                return true;
            }
            return false;
        }

        $scope.voteByBallot = function($event){
            $event.stopPropagation();

            if(!$config.hook){
                $config.hook = true;
                if($config.personInfo.isDeadline == 3){
                    $alert.show($config.messages.activityStatus.end);
                    $config.hook = false;
                    return ;
                }

                if($config.personInfo.subscribe==0){
                    $alert.show($config.messages.voteByBallot.noAttentions);
                    $config.hook = false;
                }
                else{
                    voteByBallot()
                }
            }
        }

        function voteByBallot(){
            var action = $config.getRequestAction();
            var data = {
                "cmd" : $config.cmds.voteByBallot,
                "parameters" : {
                    "openId" : $config.personInfo.openId,
                    "passiveOpenId":$stateParams.openId
                }
            };

            $httpServices.getJsonFromPost(action,data)
                .then(function(result){
                    var response = result.response;
                    $alert.show(response.flag);
                    if(response.flag == "投票成功"){
                        $scope.detailObj.number ++;
                        $rootScope.homeBoxItems[$stateParams.index].number ++;
                    }
                })
        }

        $scope.checkIsJoin = function(){
            if($config.personInfo.isDeadline==1){
                if($config.personInfo.isJoin == 0){
                    return true;
                }
                else{
                    return false;
                }
            }
            return false;
        }

    }])