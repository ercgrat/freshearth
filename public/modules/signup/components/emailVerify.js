/*
 *  Controller Setup
 */

function EmailVerifyController($stateParams, api, userIdentification) {
    var ctrl = this;
    
    ctrl.$onInit = function() {
        if($stateParams.token.length == 0) {
            ctrl.login = true;
        } else {
            api.put('/auth/verify/' + $stateParams.token, null, false, {})
            .then(function() {
                ctrl.success = true;
                userIdentification.logout();
            })
            .catch(function(error) {
                ctrl.failure = true;
            });
        }
    };
    
    ctrl.resend = function() {
        api.get('/auth/verify/resend', null, true)
        .then(function() {
            ctrl.sent = true;
        });
    };
};

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('emailVerify', {
    templateUrl: 'modules/signup/templates/emailVerify.html',
    controller: EmailVerifyController,
    bindings: {
        userIdentification: '<',
        api: '<'
    }
});

/*
 *    UI-Router Setup
 */

angular.module('FreshEarth').config(function($stateProvider) {
    $stateProvider.state('emailVerify', {
        url: '/verify/:token',
        parent: 'main',
        component: 'emailVerify',
        resolve: {
            userIdentification: 'userIdentification',
            isLoggedIn: function(userIdentification) {
                return userIdentification.isLoggedIn();
            },
            isNotVerified: function(userIdentification) {
                return userIdentification.isNotVerified();
            },
            api: 'api'
        }
    });
});
