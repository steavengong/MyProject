angular.module("services.http",[])
    .factory("$httpServices",["$http","Upload","$q",function($http,Upload,$q){
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
                    deferred.resolve(result);
                })
                .error(function(error){
                    deferred.reject(error);
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
            },function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        }

        return $httpServices;

    }])
