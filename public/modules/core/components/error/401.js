/*
 *  Controller Setup
 */

function Error401Controller($state) {
    var ctrl = this;
}

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('e401', {
    templateUrl: 'modules/core/templates/error/401.html',
    controller: Error401Controller,
    bindings: {
        userIdentification: '<'
    }
});

/*
 *    UI-Router Setup
 */

angular.module('FreshEarth').config(function($stateProvider) {
    $stateProvider.state('401', {
        url: '/401',
        parent: 'error',
        component: 'e401',
        resolve: {
            userIdentification: 'userIdentification'
        }
    });
});
