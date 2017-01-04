/*
 *  Controller Setup
 */

function NavigationController($mdSidenav, $state, $location, userIdentification, toastNotification) {
    var ctrl = this;
    
    ctrl.$onInit = function() {
        ctrl.userIdentification = userIdentification;
    };
    
    ctrl.logout = function() {
        return userIdentification.logout().then(function(response) {
            $state.go('landing');
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
            ctrl.loginSelected = false;
            $state.go('dashboard');
            return toastNotification.generalInfoMessage('Login Successful');
        }).catch(function(error) {
            return toastNotification.generalErrorMessage('Login Unsuccessful');
        });
    };
    
    ctrl.isCurrentState = function(name) {
        return name == $state.current.name;
    };
    
    ctrl.aboutPage = function() {
        window.location = 'http://freshearth.io/';
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
