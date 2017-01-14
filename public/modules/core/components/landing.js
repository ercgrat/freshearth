/*
 *    Component Setup
 */

angular.module('FreshEarth').component('landing', {
    templateUrl: 'modules/core/templates/landing.html'
});

/*
 *    UI-Router Setup
 */

angular.module('FreshEarth').config(function($stateProvider) {
    $stateProvider.state('landing', {
        url: '/',
        parent: 'main',
        component: 'landing',
        resolve: {
            isLoggedOut: [
                'userIdentification',
                function(userIdentification) {
                    return userIdentification.isLoggedOut();
                }
            ]
        }
    })
});
