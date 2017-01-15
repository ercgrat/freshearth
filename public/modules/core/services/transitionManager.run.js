/*
 *    uiRouter Interceptor Functions
 */
function transitionManager($q, $transitions, $state, $timeout, _, toastNotification) {
    
    $state.defaultErrorHandler(function() {
        // Do nothing
    });

    $transitions.onBefore({}, function(transition, state) {
        // console.log('onBefore');
    });

    $transitions.onStart({}, function(transition, state) {
    });

    $transitions.onRetain({}, function(transition, state) {
        // console.log('onRetain');
    });

    $transitions.onEnter({}, function(transition, state) {
        // console.log('onEnter');
    });

    $transitions.onExit({}, function(transition, state) {
        // console.log('onExit');
    });

    $transitions.onError({}, function(transition, state) {
        var tokens = transition.getResolveTokens();
        if (_.includes(tokens, 'isLoggedIn') && transition.getResolveValue('isLoggedIn') == undefined) {
            $state.go('landing').then(function() {
                toastNotification.generalInfoMessage('Login required.');
            });
        } else if(_.includes(tokens, 'isVerified') && transition.getResolveValue('isVerified') == undefined) {
            $state.go('emailVerify', {
                token: ""
            });
        } else if(_.includes(tokens, 'isLoggedOut')) {
            $state.go('dashboard');
        } else if(_.includes(tokens, 'properTransition')) {
            $state.go('landing');
        } else {
            $state.go('404');
        }
    });

    /*
     *
     */

    $transitions.onFinish({}, function(transition, state) {
        // console.log('onFinish');
    });

    $transitions.onSuccess({}, function(transition, state) {
        // console.log('onSuccess');
    });
}

angular
    .module('FreshEarth')
    .run(transitionManager);
