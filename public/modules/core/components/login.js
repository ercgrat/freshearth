/*
 *  Controller Setup
 */

function LoginController($state) {
    var ctrl = this;

    ctrl.loginCredentials = {
        email: null,
        password: null,
        remember: true
    };

    ctrl.submit = function() {
        return ctrl.userIdentification.login(ctrl.loginCredentials.email, ctrl.loginCredentials.password, ctrl.loginCredentials.remember).then(function(response) {
            $state.go('dashboard');
            return ctrl.toastNotification.generalInfoMessage('Login Successful');
        }).catch(function(error) {
            return ctrl.toastNotification.generalErrorMessage('Login Unsuccessful');
        });
    };
}

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('login', {
    templateUrl: 'modules/core/templates/login.html',
    controller: LoginController,
    bindings: {
        userIdentification: '<',
        toastNotification: '<'
    }
});

/*
 *    UI-Router Setup
 */

angular.module('FreshEarth').config(function($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        parent: 'main',
        component: 'login',
        resolve: {
            userIdentification: 'userIdentification',
            toastNotification: 'toastNotification'
        }
    })
});
