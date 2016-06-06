angular.module("services.http",[])
    .factory("$httpServices",["$http","$q",function($http,$q){
        var $httpServices = {}
        $httpServices.getJsonFromPost = function(action,data){
            var deferred = $q.defer();
            $http.post(action,data)
                .success(function(result){
                    config.hook = false;
                    deferred.resolve(result);
                })
                .error(function(error){
                    config.hook = false;
                    deferred.reject(error);
                })
            return deferred.promise;
        }
        return $httpServices;

    }])
