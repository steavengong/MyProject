angular.module("services.modal",[])
    /*模态框*/
    .factory("$modal",["$rootScope","$ionicModal","$config","$popover",function($rootScope,$ionicModal,$config,$popover){
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
                    $modal.openModal($config.modals.ruleBaby);
                    $popover.closePop($config.popover.rule)
                    break;
                case 2:
                    $modal.openModal($config.modals.enjoy);
                    break;
                case 3:
                    $modal.openModal($config.modals.prize);
                    break;
                case 4:
                    $modal.openModal($config.modals.ruleMam);
                    $popover.closePop($config.popover.rule)
                    break;
                case 5:
                    $modal.openModal($config.modals.qrCode);
                    break;
                case 6:
                    $modal.openModal($config.modals.edit);
                    break;
            }
        }

        $rootScope.closeModal = function(modalType) {
            switch (modalType) {
                case 1:
                    $modal.closeModal($config.modals.ruleBaby);
                    break;
                case 2:
                    $modal.closeModal($config.modals.enjoy);
                    break;
                case 3:
                    $modal.closeModal($config.modals.prize);
                    break;
                case 4:
                    $modal.closeModal($config.modals.ruleMam);
                    break;
                case 5:
                    $modal.closeModal($config.modals.qrCode);
                    break;
                case 6:
                    $modal.closeModal($config.modals.edit);
                    break;
            }
        }

        $modal.openModal = function(modal){
            $modal.init(modal);
        }

        $modal.closeModal = function(modal) {
            $rootScope[modal.name].remove();
        };


        return $modal;

    }])
