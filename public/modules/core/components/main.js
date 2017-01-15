/*
 *  Controller Setup
 */

function MainController($scope) {
    var ctrl = this;

    $scope.$on('GETLoading', function(e, args) {
        $scope.GETLoading = args;
    });
    $scope.$on('TRANSITIONLoading', function(e, args) {
        $scope.TRANSITIONLoading = args.status;
    });
};

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('main', {
    template: '<ui-view></ui-view>',
    controller: MainController
});

/*
 *    UI-Router Setup
 */

angular.module('FreshEarth').config(function($stateProvider) {
    $stateProvider.state('main', {
        url: '',
        component: 'main',
        abstract: true,
        resolve: {
            cookieLogin: function($q, userIdentification) {
                return userIdentification.isLoggedIn()
                .catch(function() {
                    return userIdentification.cookieLogin();
                });
            },
            previousState: [
                "$state",
                function($state) {
                    return function($state) {
                        return {
                            name: $state.current.name,
                            params: $state.params,
                            path: $state.href($state.current.name, $state.params)
                        }
                    };
                }
            ]
        }
    });
});
