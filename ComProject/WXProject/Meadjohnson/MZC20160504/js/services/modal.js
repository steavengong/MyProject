angular.module("services.modal",[])
    /*模态框*/
    .factory("$modal",["$rootScope","$ionicModal","$config",function($rootScope,$ionicModal,$config){
        var $modal = {};

        $modal.init = function(modal){
            $ionicModal.fromTemplateUrl(modal.templateUrl,{
                scope:$rootScope,
                animation:modal.animation||"slide-in-up"
            }).then(function(modalObject){
                modalObject.show();
                $rootScope[modal.name] = modalObject;
            })
        }

        $rootScope.openModal = function(modalType){
            switch(modalType){
                case 1:
                    $modal.openModal($config.modals.rule);
                    break;
                case 2:
                    $modal.openModal($config.modals.enjoy);
                    break;
                case 3:
                    $modal.openModal($config.modals.prize);
                    break;
            }
        }

        $rootScope.closeModal = function(modalType) {
            switch (modalType) {
                case 1:
                    $modal.closeModal($config.modals.rule);
                    break;
                case 2:
                    $modal.closeModal($config.modals.enjoy);
                    break;
                case 3:
                    $modal.closeModal($config.modals.prize);
                    break;
            }
        }

        $modal.openModal = function(modal){
            $modal.init(modal);
        }

        $modal.closeModal = function(modal) {
            $rootScope[modal.name].hide();
            $rootScope[modal.name] = null
        };


        return $modal;

    }])
