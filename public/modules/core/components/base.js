/*
 *    Controller Setup
 */

function BaseController($rootScope) {
    var ctrl = this;

    $rootScope.$on('GETLoading', function(e, res) {
        ctrl.loading = res;
    });
    $rootScope.$on('TRANSITIONLoading', function(e, res) {
        ctrl.loading = res.status;
    });
    $rootScope.$on('POSTLoading', function(e, res) {
        ctrl.loading = res;
    });
}

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('base', {
    templateUrl: '/modules/core/templates/base.html',
    controller: BaseController
});
