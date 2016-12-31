/*
 *    Toast Notifications Factory
 */
function toastNotification($mdToast, $q) {

    return {
        generalInfoMessage: generalInfoMessage,
        generalErrorMessage: generalErrorMessage
    }

    function generalInfoMessage(msg) {
        return $mdToast.show($mdToast.generalInfoMessage({
            locals: {
                msg: msg
            }
        })).then(function(response) {
            return _.isUndefined(response) ? $q.resolve('Toast Completed') : $q.resolve(response);
        }).catch(function(error) {
            return $q.reject(error);
        });
    }

    function generalErrorMessage(msg) {
        return $mdToast.show($mdToast.generalErrorMessage({
            locals: {
                msg: msg
            }
        })).then(function(response) {
            return _.isUndefined(response) ? $q.resolve('Toast Completed') : $q.resolve(response);
        }).catch(function(error) {
            return $q.reject(error);
        });
    }
}

/*
 *    mdToastProvider Preset Config
 */
function mdToastConfig($mdToastProvider) {

    $mdToastProvider.addPreset('generalErrorMessage', {
        options: function() {
            return {
                template: '<md-toast><div class="md-toast-content"><span>{{ locals.msg }}</span><md-button class="md-highlight" ng-click="closeToast($event)">REPORT</md-button></div></md-toast>',
                hideDelay: 2000,
                highlightAction: true,
                highlightClass: 'md-warn',
                position: 'bottom right',
                controller: PresetController
            }
        }
    })

    $mdToastProvider.addPreset('generalInfoMessage', {
        options: function() {
            return {
                template: '<md-toast><div class="md-toast-content"><span>{{ locals.msg }}</span></div></md-toast>',
                hideDelay: 2000,
                highlightAction: true,
                highlightClass: 'md-primary',
                position: 'bottom right',
                controller: PresetController
            }
        }
    })

    function PresetController($mdToast, $scope, locals) {
        $scope.locals = locals;
        $scope.closeToast = function(e) {
            return $mdToast.hide('User Closed Toast');
        }
    }
};

angular
    .module('FreshEarth')
    .config(mdToastConfig)
    .factory('toastNotification', toastNotification);
