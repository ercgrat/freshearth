/*
 *   HTTP Interceptor Decorator Functions
 */
function httpInterceptorDecorator($delegate, $rootScope) {

    $rootScope.GETRequests = 0;
    $rootScope.POSTRequests = 0;
    $rootScope.OPTIONSRequests = 0;

    $rootScope.$watchGroup(['GETRequests', 'POSTRequests', 'OPTIONSRequests'], function(newValues, oldValues, scope) {
        scope.GETLoading = (newValues[0] > 0) ? scope.$broadcast('GETLoading', true) : scope.$broadcast('GETLoading', false);
        scope.POSTLoading = (newValues[1] > 0) ? scope.$broadcast('POSTLoading', true) : scope.$broadcast('POSTLoading', false);
        scope.OPTIONSLoading = (newValues[2] > 0) ? scope.$broadcast('OPTIONSLoading', true) : scope.$broadcast('OPTIONSLoading', false);
        // console.debug(scope.GETRequests + ' ' + scope.POSTRequests + ' ' + scope.OPTIONSRequests);
    })

    function updateHTTPMethodCount(type, method) {
        switch (type) {
            case "REQ":
                switch (method) {
                    case "GET":
                        $rootScope.GETRequests++;
                        break;
                    case "POST":
                        $rootScope.POSTRequests++;
                        break;
                    case "OPTIONS":
                        $rootScope.OPTIONSRequests++;
                        break;
                    default:
                        break;
                }
                break;
            case "RES":
                switch (method) {
                    case "GET":
                        $rootScope.GETRequests--;
                        break;
                    case "POST":
                        $rootScope.POSTRequests--;
                        break;
                    case "OPTIONS":
                        $rootScope.OPTIONSRequests--;
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    $delegate.request = function(e) {
        updateHTTPMethodCount("REQ", e.method);
        // console.debug(e);
        return e;
    }

    $delegate.requestError = function(e) {
        updateHTTPMethodCount("RES", e.config.method);
        console.log(e);
        return e;
    }

    $delegate.response = function(e) {
        updateHTTPMethodCount("RES", e.config.method);
        // console.debug(e);
        return e;
    }

    $delegate.responseError = function(e) {
        updateHTTPMethodCount("RES", e.config.method);
        console.log(e);
        throw e;
    }

    return $delegate;
}

/*
 *    HTTP Interceptor Functions
 */
function httpInterceptor($q) {

    return ({
        request: request,
        requestError: requestError,
        response: response,
        responseError: responseError
    });

    function request(config) {
        return config;
    }

    function requestError(request) {
        return $q.reject(request);
    }

    function response(response) {
        return response;
    }

    function responseError(response) {
        return $q.reject(response);
    }
}

/*
 *    uiRouter Interceptor Functions
 */
function uiRouterTransitions($transitions, $rootScope, $q) {

    $transitions.onBefore({}, function(transition, state) {
        $rootScope.$broadcast('TRANSITIONLoading', {
            status: transition.ignored() == transition.valid() ? false : true,
            name: 'onBefore'
        });
    });

    /*
     *
     */

    $transitions.onError({}, function(transition, state) {
        $rootScope.$broadcast('TRANSITIONLoading', {
            status: false,
            name: 'onError'
        });
    });

    /*
     *
     */

    $transitions.onSuccess({}, function(transition, state) {
        $rootScope.$broadcast('TRANSITIONLoading', {
            status: false,
            name: 'onSuccess'
        });
    });
}

/*
 *
 */
function configureHTTPInterceptor($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
}

angular
    .module('FreshEarth')
    .service('httpInterceptor', httpInterceptor)
    .decorator('httpInterceptor', httpInterceptorDecorator)
    .config(configureHTTPInterceptor)
    .run(uiRouterTransitions);
