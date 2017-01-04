/*
 *    Controller Setup
 */

function BaseController($rootScope) {
    var ctrl = this;

    $rootScope.$on('GETLoading', function(e, res) {
        ctrl.GETLoading = res;
    });
    $rootScope.$on('TRANSITIONLoading', function(e, res) {
        ctrl.TRANSITIONLoading = res.status;
    });
}

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('base', {
    templateUrl: '/modules/core/templates/base.html',
    controller: BaseController
});
