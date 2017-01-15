/*
 *  Controller Setup
 */

function WelcomeController($stateParams) {
    var ctrl = this;
    
    ctrl.$onInit = function() {
        ctrl.email = $stateParams.email;
    };
};

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('welcome', {
    templateUrl: 'modules/signup/templates/welcome.html',
    controller: WelcomeController,
    bindings: {
        userIdentification: '<'
    }
});

/*
 *    UI-Router Setup
 */

angular.module('FreshEarth').config(function($stateProvider) {
    $stateProvider.state('welcome', {
        url: '/welcome',
        parent: 'main',
        params: {
            email: null
        },
        component: 'welcome',
        resolve: {
            userIdentification: 'userIdentification',
            properTransition: ['_', 'previousState', '$q', '$state', '$stateParams', function(_, previousState, $q, $state, $stateParams) {
                var stateInfo = previousState($state);
                return (stateInfo.name == 'signup' && !_.isNil($stateParams.email)) ? $q.resolve(true) : $q.reject();
            }]
        }
    });
});
