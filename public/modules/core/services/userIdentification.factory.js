/*
 *    User Identification Factory
 */
function userIdentification($q, $http, $state, cookieManager, _) {

    var identity = undefined;
    var business = undefined;
    var authenticated = false;
    var admin = false;

    return {
        isIdentityDefined: isIdentityDefined,
        isBusinessDefined: isBusinessDefined,
        isBusinessType: isBusinessType,
        isLoggedIn: isLoggedIn,
        isLoggedOut: isLoggedOut,
        isAdmin: isAdmin,
        isVerified: isVerified,
        isNotVerified: isNotVerified,
        //
        getIdentity: getIdentity,
        getBusiness: getBusiness,
        getBusinessType: getBusinessType,
        getBusinessName: getBusinessName,
        getToken: getToken,
        //
        setIdentity: setIdentity,
        setBusiness: setBusiness,
        setAdmin: setAdmin,
        //
        checkTokenExpired: checkTokenExpired,
        freshToken: freshToken,
        //
        signup: signup,
        login: login,
        cookieLogin: cookieLogin,
        logout: logout
    };

    /*
     *    User Identity Status
     */
    function isIdentityDefined() {
        return !_.isUndefined(identity);
    }

    /*
     *    User Business Status
     */
    function isBusinessDefined() {
        return !_.isUndefined(business);
    }

    /*
     *    User Logged In
     *
     */
    function isLoggedIn(noPromise) {
        if(noPromise) {
            return authenticated;
        } else {
            return authenticated ? $q.resolve(true) : $q.reject();
        }
    }
    function isLoggedOut() {
        return authenticated ? $q.reject() : $q.resolve(true);
    }
    
    /*
     *    User Admin Status
     */
    function isAdmin() {
        return admin;
    }

    /*
     *    User Verification Status
     */
    function isVerified() {
        return identity.verified ? $q.resolve(true) : $q.reject();
    }
    function isNotVerified() {
        return identity.verified ? $q.reject() : $q.resolve(true);
    }

    /*
     *    Get Identity of User
     */
    function getIdentity() {
        return isIdentityDefined() ? identity : undefined;
    }

    /*
     *    Get Business Identity
     */
    function getBusiness(noPromise) {
        if(noPromise) {
            return business;
        } else {
            return $q.resolve(isBusinessDefined()).then(function(response) {
                return response ? $q.resolve(business) : $q.reject(undefined);
            }).catch(function(error) {
                $q.reject(error);
            });
        }
    }

    /*
     *    Get Business Type
     */
    function getBusinessType() {
        return $q.resolve(isBusinessDefined()).then(function(response) {
            return response ? $q.resolve(business.businessType) : $q.reject(undefined);
        }).catch(function(error) {
            $q.reject(error);
        });
    }

    /*
     *    Get Business Type
     */
    function getBusinessName() {
        return $q.resolve(isBusinessDefined()).then(function(response) {
            return response ? $q.resolve(business.businessName) : $q.reject(undefined);
        }).catch(function(error) {
            $q.reject(error);
        });
    }

    /*
     *    Get Token
     */
    function getToken() {
        return cookieManager.getCookieObject('FreshEarth', 'token').then(function(response) {
            return response;
        }).catch(function(error) {
            console.err(error);
        });
    }

    /*
     *    Set Identity of User
     */
    function setIdentity(values) {
        return $q.resolve(_.pick(values, cookieManager.filter('identity'))).then(function(response) {
            // Logout fails when checking if Undefined
            // return !_.isEmpty(response) && _.every(response, function(val) {
            return _.every(response, function(val) {
                return !_.isUndefined(val);
            }) ? $q.resolve(response) : $q.reject('Missing Identity Values');
        }).then(function(response) {
            identity = response;
            identity.admin = response.admin === 1 ? true : false;
            identity.verified = response.verified === 1 ? true : false;
            return $q.resolve(identity);
        }).catch(function(error) {
            return $q.reject(error);
        });
    }

    /*
     *    Set Business of User
     */
    function setBusiness(values) {
        return $q.resolve(_.pick(values, cookieManager.filter('business'))).then(function(response) {
            return _.every(response, function(val) {
                return !_.isUndefined(val);
            }) ? $q.resolve(response) : $q.reject('Missing Business Values');
        }).then(function(response) {
            business = response;
            return $q.resolve(business);
        }).catch(function(error) {
            return $q.reject(error);
        });
    }

    /*
     *    Set User as Admin
     */
    function setAdmin(email, admin) {
        return $http.post(APIURL + '/auth/admin', {
            email: email,
            admin: admin
        }).then(function(response) {
            admin = response;
            return $q.resolve(email + ' is Admin: ' + response);
        }).catch(function(error) {
            return $q.reject(error);
        });
    }

    /*
     *    Signup User
     */
    function signup(values) {
        return $q.resolve(_.isUndefined(values)).then(function(response) {
            return response ? $q.reject('Undefined Values') : values;
        }).then(function(response) {
            var signup = ['firstName', 'lastName', 'email', 'password', 'repeatPassword', 'businessType', 'businessName', 'businessHeadline', 'businessAddress.street', 'businessAddress.city', 'businessAddress.state', 'businessAddress.zip', 'businessPhone'];
            return $q.resolve(_.remove(signup, function(value) {
                return _.isUndefined(_.get(response, value));
            })).then(function(missing) {
                return _.isEmpty(missing) ? response : $q.reject('Missing Values: ' + _.join(missing, ', '));
            }).catch(function(error) {
                return $q.reject(error);
            });
        }).then(function(response) {
            var route = response.businessType === 'producer' ? '/auth/signupAsFarm' : '/auth/signupAsConsumer';
            return $http.post(APIURL + route, {
                v: values
            });
        }).then(function(response) {
            if (response.statusText !== 'OK') {
                throw response.data;
            } else {
                return response.data;
            }
        }).catch(function(error) {
            return $q.reject(error);
        });
    }

    /*
     *    Login User
     */
    function login(email, password, remember) {
        return $http.post(APIURL + '/auth/login', {
            email: email,
            password: password
        }).then(function(response) {
            if (response.statusText !== 'OK') {
                throw response.data;
            } else {
                return response.data;
            }
        }).then(function(response) {
            return setIdentity(_.pick(response, cookieManager.filter('identity'))).then(function() {
                return setBusiness(_.pick(response, cookieManager.filter('business'))).then(function() {
                    return response;
                });
            });
        }).then(function(response) {
            if (remember) {
                return cookieManager.removeCookie('FreshEarth').then(function() {
                    return cookieManager.putCookieObject('FreshEarth', response);
                });
            } else {
                return cookieManager.removeCookie('FreshEarth').then(function() {
                    return cookieManager.putCookieObject('FreshEarth', _.pick(response, cookieManager.filter('tokenExp')));
                });
            }
        }).then(function(response) {
            authenticated = true;
            return $q.resolve('User Logged In');
        }).catch(function(error) {
            return $q.reject(error);
        });
    }

    /*
     *    Logout User
     */
    function logout() {
        return cookieManager.removeCookie('FreshEarth', true).then(function(response) {
            return setIdentity(undefined);
        }).then(function() {
            return setBusiness(undefined);
        }).then(function() {
            authenticated = false;
            return $q.resolve('User Logged Out');
        }).catch(function(error) {
            return $q.reject(error);
        });
    }

    /*
     *    Check Token Expiration
     */
    function checkTokenExpired(name) {
        return cookieManager.getCookieObject(name).then(function(cookie) {
            return _.now() >= cookie.expires ? $q.reject(name + ' Expired') : $q.resolve(cookie);
        }).catch(function(error) {
            return $q.reject(error);
        });
    }

    /*
     *    Refresh Auth Token
     */
    function freshToken() {
        return checkTokenExpired('FreshEarth').then(function(response) {
            return _.pick(response, cookieManager.filter('token'));
        }).then(function(response) {
            return $http.get(APIURL + '/auth/freshToken', {
                headers: {
                    Authorization: response.token
                }
            });
        }).then(function(response) {
            return cookieManager.removeCookie('FreshEarth').then(function() {
                return cookieManager.putCookieObject('FreshEarth', response.data);
            });
        }).then(function(response) {
            return $q.resolve('Refreshed Token');
        }).catch(function(error) {
            return $q.reject(error);
        });
    }

    /*
     *    Login using Cookie
     */
    function cookieLogin() {
        return checkTokenExpired('FreshEarth').then(function(response) {
            return setIdentity(_.pick(response, cookieManager.filter('identity'))).then(function() {
                return setBusiness(_.pick(response, cookieManager.filter('business'))).then(function() {
                    return response;
                });
            });
        }).then(function(response) {
            authenticated = true;
            return "User logged in.";
        }).catch(function(error) {
            console.error(error);
        });
    }
    
    function isBusinessType(typeArray) {
        return getBusinessType()
        .then(function(businessType) {
            if (!_.includes(typeArray, businessType)) {
                throw new Error("Only businesses of type (" + _.join(typeArray) + ") may access this page.");
            }
            return true;
        });
    }
}

angular
    .module('FreshEarth')
    .factory('userIdentification', userIdentification);

//
