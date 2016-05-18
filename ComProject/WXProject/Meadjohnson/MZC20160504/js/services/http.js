angular.module("services.http",[])
    .factory("$httpServices",["$http","Upload","$q","$config","$ionicLoading",function($http,Upload,$q,$config,$ionicLoading){
        var $httpServices = {}
        $httpServices.getObjectFromGet = function(action){
            return $http.get(action).success(function(result){
                return result;
            })
        }

        $httpServices.getJsonFromPost = function(action,data){
            var deferred = $q.defer();
            $http.post(action,data)
                .success(function(result){
                    $config.hook = false;
                    deferred.resolve(result);
                    $ionicLoading.hide();
                })
                .error(function(error){
                    deferred.reject(error);
                    $config.hook = false;
                    $ionicLoading.hide();
                })
            return deferred.promise;
        }

        $httpServices.uploadWithFile = function(action,data){
            var deferred = $q.defer();
            Upload.upload({
                url:action,
                data:data
            }).then(function(result){
                deferred.resolve(result);
                $config.hook = false;
                $ionicLoading.hide();
            },function(error){
                deferred.reject(error);
                $config.hook = false;
                $ionicLoading.hide();
            })
            return deferred.promise;
        }




        return $httpServices;

    }])
