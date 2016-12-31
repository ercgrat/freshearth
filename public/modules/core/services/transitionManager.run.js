/*
 *    uiRouter Interceptor Functions
 */
function transitionManager($q, $transitions, $state, _, toastNotification) {


    $transitions.onBefore({}, function(transition, state) {
        // console.log('onBefore');
    });

    $transitions.onStart({}, function(transition, state) {
        // console.log('onStart');
    });

    /*
     *
     */

    $transitions.onRetain({}, function(transition, state) {
        // console.log('onRetain');
    });

    $transitions.onEnter({}, function(transition, state) {
        // console.log('onEnter');
    });

    $transitions.onExit({}, function(transition, state) {
        // console.log('onExit');
    });

    /*
     *
     */

    $transitions.onError({}, function(transition, state) {
        /*
         * Views That Require Authorization
         *
         *  Any View who's parent is AUTH will require the user to be logged in
         *  This will catch attempts made to access those View's before they happen
         *
         */
        return $q.resolve(transition).then(function() {
            if (_.includes(transition.getResolveTokens(), 'isLoggedIn')) {
                if (!transition.getResolveValue('isLoggedIn')) {
                    return $state.go('401').then(function() {
                        return toastNotification.generalInfoMessage('Please Login for Access!');
                    }).catch(function(error) {
                        return $q.reject(error);
                    });
                } else {
                    return $state.go('dashboard').then(function() {
                        return toastNotification.generalErrorMessage(transition.error().message);
                    });
                };
            } else {
                return $state.go('404');
            }
        }).catch(function(error) {
            return $q.reject(error);
        });
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
