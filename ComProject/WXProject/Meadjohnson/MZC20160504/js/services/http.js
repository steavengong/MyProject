angular.module("services.http",[])
    .factory("$httpServices",["$http","Upload","$q","$config",function($http,Upload,$q,$config){
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
                })
                .error(function(error){
                    deferred.reject(error);
                    $config.hook = false;
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
            },function(error){
                deferred.reject(error);
                $config.hook = false;
            })
            return deferred.promise;
        }




        return $httpServices;

    }])
