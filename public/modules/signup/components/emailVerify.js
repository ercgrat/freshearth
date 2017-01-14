/*
 *  Controller Setup
 */

function EmailVerifyController() {
    var ctrl = this;
};

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('emailVerify', {
    templateUrl: 'modules/signup/templates/emailVerify.html',
    controller: EmailVerifyController,
    bindings: {
        userIdentification: '<',
        previousState: '<'
    }
});

/*
 *    UI-Router Setup
 */

angular.module('FreshEarth').config(function($stateProvider) {
    $stateProvider.state('emailVerify', {
        url: '/welcome',
        parent: 'main',
        params: {
            email: null
        },
        component: 'emailVerify',
        resolve: {
            userIdentification: 'userIdentification',
            properTransition: [
                '_',
                '$q',
                'previousState',
                function(_, previousState) {
                    console.log(previousState);
                    return (previousState.name == 'signup' && !_.isNil(previousState.params.email)) ? true : $q.reject();
                }
            ]
        }
    });
});
