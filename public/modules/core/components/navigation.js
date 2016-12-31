/*
 *  Controller Setup
 */

function NavigationController($mdSidenav, $state, userIdentification, toastNotification) {
    var ctrl = this;

    ctrl.userIdentification = userIdentification;

    ctrl.logout = function() {
        return userIdentification.logout().then(function(response) {
            $state.go('login');
            return toastNotification.generalInfoMessage('Logout Successful');
        }).catch(function(error) {
            return toastNotification.generalErrorMessage('Logout Unsuccessful');
        });
    };

    ctrl.toggleSidenav = function() {
        $mdSidenav('left').toggle();
    }
};

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('navigation', {
    templateUrl: 'modules/core/templates/navigation.html',
    controller: NavigationController
});
