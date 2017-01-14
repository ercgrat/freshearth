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
        console.log(transition.getResolveTokens());
        if (_.includes(transition.getResolveTokens(), 'isLoggedIn')) {
            console.log(transition.getResolveValue('isLoggedIn'));
            if (!transition.getResolveValue('isLoggedIn')) {
                $state.go('landing').then(function() {
                    toastNotification.generalInfoMessage('Login required.');
                });
            } else {
                $state.go('dashboard').then(function() {
                    toastNotification.generalErrorMessage("An error occurred.");
                });
            };
        } else if(_.includes(transition.getResolveTokens(), 'isLoggedOut')) {
            console.log("navigating to dashboard");
            $state.go('dashboard');
        } else if(_.includes(transition.getResolveTokens(), 'properTransition')) {
            $state.go('landing');
        } else {
            $state.go('404');
        }
        throw new Error("");
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
