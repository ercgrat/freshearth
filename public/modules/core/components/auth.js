/*
 *    Component Setup
 */

angular.module('FreshEarth').component('auth', {
    template: '<ui-view></ui-view>'
});

/*
 *    UI-Router Setup
 */

angular.module('FreshEarth').config(function($stateProvider) {
    $stateProvider.state('auth', {
        url: '',
        component: 'auth',
        parent: 'main',
        abstract: true,
        resolve: {
            isLoggedIn: function(userIdentification) {
                return userIdentification.isLoggedIn();
            },
            isVerified: function(userIdentification) {
                return userIdentification.isVerified();
            }
        }
    });
});
