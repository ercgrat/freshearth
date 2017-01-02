/*
 *  Controller Setup
 */

function Error404Controller($state) {
    var ctrl = this;
}

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('e404', {
    templateUrl: 'modules/core/templates/error/404.html',
    controller: Error404Controller
});

/*
 *    UI-Router Setup
 */

angular.module('FreshEarth').config(function($stateProvider) {
    $stateProvider.state('404', {
        url: '/404',
        parent: 'error',
        component: 'e404'
    });
});
