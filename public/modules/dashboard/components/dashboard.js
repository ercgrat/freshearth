/*
 *  Controller Setup
 */

function DashboardController($state) {
    var ctrl = this;

}

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('dashboard', {
    templateUrl: 'modules/dashboard/templates/dashboard.html',
    controller: DashboardController,
    bindings: {
        userIdentification: '<',
        toastNotification: '<'
    }
});

/*
 *    UI-Router Setup
 */

angular.module('FreshEarth').config(function($stateProvider) {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        parent: 'auth',
        component: 'dashboard',
        resolve: {
            userIdentification: 'userIdentification',
            toastNotification: 'toastNotification'
        }
    });
});
