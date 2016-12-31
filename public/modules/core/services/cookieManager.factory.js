/*
 *    Cookie Manager
 */
function cookieManager($q, $cookies, _) {

    var filters = {
        identity: ['id', 'admin', 'businessId', 'businessName', 'businessType', 'verified'],
        business: ['businessId', 'businessType', 'businessName'],
        tokenExp: ['token', 'expires'],
        token: ['token']
    }

    return {
        filter: filter,
        getCookie: getCookie,
        getCookieObject: getCookieObject,
        putCookie: putCookie,
        putCookieObject: putCookieObject,
        removeCookie: removeCookie
    };

    /*
     *     Cookie Filter
     *
     *    @args
     *      name: [Array of Keys for Cookie Object]
     *              or
     *            Pre-defined Filter Name
     *
     */
    function filter(name) {
        if (_.has(filters, name)) {
            return _.get(filters, name);
        } else {
            return name;
        }
    }

    /*
     *    Get Cookie
     *
     *    @args
     *      name: Name of Cookie
     *
    function getCookie(name) {
        var deferred = $q.defer();
        if (!_.isString(name)) {
            deferred.reject('Cookie not Specified');
        } else if (_.isUndefined($cookies.getObject(name))) {
            deferred.reject('Cookie Undefined');
        } else {
            deferred.resolve($cookies.getObject(name));
        }
        return deferred.promise;
    }
    */
    function getCookie(name) {
        if (!_.isString(name)) {
            return $q.reject('Cookie not Specified');
        } else if (_.isUndefined($cookies.get(name))) {
            return $q.reject('Undefined Cookie: ' + name);
        } else {
            return $q.resolve($cookies.get(name)).catch(function(error) {
                return $q.reject(error);
            });
        }
    }

    /*
     *    Get Filtered Cookie Object
     *
     *    @args
     *      name: Name of Cookie
     *      f: [Array of Keys for Cookie Object]
     *           or
     *         Pre-defined Filter Name
     *
     *      * Leave out f to return entire Cookie Object
     */
    function getCookieObject(name, f) {
        var filtered = filter(f);
        if (!_.isString(name) || _.isArrayLikeObject(name)) {
            return $q.reject('Cookie not Specified');
        } else if (_.isUndefined($cookies.getObject(name))) {
            return $q.reject('Undefined Cookie: ' + name);
        } else if (_.isUndefined(filtered)) {
            return $q.resolve($cookies.getObject(name));
        } else if (_.isEmpty(_.pick($cookies.getObject(name), filtered))) {
            return $q.reject('Filter Undefined for Cookie: ' + name)
        } else {
            return $q.resolve($cookies.getObject(name)).then(function(cookie) {
                return $q.resolve(_.pick(cookie, filtered));
            }).catch(function(error) {
                return $q.reject(error);
            });
        }
    }

    /*
     *    Put Cookie
     *
     *    @args
     *      name: Name of Cookie
     *      value: Value
     */
    function putCookie(name, value) {
        if (!_.isString(name)) {
            return $q.reject('Cookie not Specified');
        } else if (_.isUndefined(value)) {
            return $q.reject('Cookie Value Missing: ' + name);
        } else {
            return $q.resolve($cookies.put(name, value)).then(function() {
                return $q.resolve('Put Cookie: ' + name);
            }).catch(function(error) {
                return $q.reject(error);
            });
        }
    }

    /*
     *    Put Cookie Object
     *
     *    @args
     *      name: Name of Cookie
     *      values: [Array of Keys for Cookie Object]
     */
    function putCookieObject(name, values) {
        if (!_.isString(name) || _.isArrayLikeObject(name)) {
            return $q.reject('Cookie not Specified');
        } else if (_.isUndefined(values)) {
            return $q.reject('Cookie Values Missing: ' + name);
        } else {
            return $q.resolve($cookies.putObject(name, values)).then(function() {
                return $q.resolve('Put Cookie: ' + name);
            }).catch(function(error) {
                return $q.reject(error);
            });
        }
    }

    /*
     *    Remove Cookie
     *
     *    @args
     *      name: Name of Cookie
     *      critical: Boolean
     *        true: Reject Promise if not Removed
     *        false: Resolve Promise acknowledging Error
     */
    function removeCookie(name, critical) {
        return $q.resolve($cookies.get(name)).then(function(cookie) {
            if (_.isUndefined(cookie)) {
                return $q.reject('Undefined Cookie: ' + name);
            } else {
                $cookies.remove(name);
                return $q.resolve('Removed: ' + name);
            }
        }).catch(function(error) {
            return critical ? $q.reject(error) : $q.resolve(error);
        });
    }
}

/*
 *    Configure $CookiesProvider
 */
function configureCookiesProvider($cookiesProvider) {

}

angular
    .module('FreshEarth')
    .factory('cookieManager', cookieManager);
