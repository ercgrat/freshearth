/*
 *  Controller Setup
 */

function ErrorController() {
    var ctrl = this;
}

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('error', {
    templateUrl: 'modules/core/templates/error/error.html',
    controller: ErrorController
});

/*
 *    UI-Router Setup
 */
 
angular.module('FreshEarth').config(function($stateProvider) {
    $stateProvider.state('error', {
        abstract: true,
        parent: 'main',
        component: 'error'
    });
});
