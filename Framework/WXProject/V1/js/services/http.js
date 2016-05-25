angular.module("services.http",[])
    .factory("$httpServices",["$http","$q",function($http,$q){
        var $httpServices = {}
        $httpServices.getObjectFromGet = function(action){
            return $http.get(action).success(function(result){
                return result;
            })
        }

        $httpServices.getJsonFromPost = function(action,data){
            var deferred = $q.defer();
            $http.jsonp(action,data)
                .success(function(result){
                    deferred.resolve(result);
                })
                .error(function(error){
                    deferred.reject(error);
                })

            return deferred.promise;

        }

        return $httpServices;

    }])
