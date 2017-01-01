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
    
    ctrl.loginCredentials = {
        email: null,
        password: null,
        remember: true
    };

    ctrl.submit = function() {
        return userIdentification.login(ctrl.loginCredentials.email, ctrl.loginCredentials.password, ctrl.loginCredentials.remember).then(function(response) {
            $state.go('dashboard');
            return ctrl.toastNotification.generalInfoMessage('Login Successful');
        }).catch(function(error) {
            return ctrl.toastNotification.generalErrorMessage('Login Unsuccessful');
        });
    };
};

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('navigation', {
    templateUrl: 'modules/core/templates/navigation.html',
    controller: NavigationController,
    bindings: {
        userIdentification: '<',
        toastNotification: '<'
    }
});
