/*
 *    API Request Factory
 */
function api(_, $q, $http, userIdentification, toastNotification) {

    return {
        post: post,
        put: put,
        get: get,
        del: del
    }
    
    function getHeaders(headers, authNeeded) {
        headers = headers || {};
        if(authNeeded) {
            return userIdentification.getToken().then(function(response) {
                headers["Authorization"] = response.token;
                return headers;
            });
        } else {
            return $q.resolve(headers);
        }
    }
    
    function get(path, headers, authNeeded) {
        return getHeaders(headers, authNeeded).then(function(apiHeaders) {
            return $http.get(APIURL + path, {
                headers: apiHeaders
            });
        }).then(function(response) {
            return response.data;
        });
    }
    
    function post(path, headers, authNeeded, data) {
        return getHeaders(headers, authNeeded).then(function(apiHeaders) {
            data = data || {};
            return $http.post(APIURL + path, {
                v: data
            }, {
                headers: apiHeaders
            });
        }).then(function(response) {
            return response.data;
        });
    }
    
    function put(path, headers, authNeeded, data) {
        return getHeaders(headers, authNeeded).then(function(apiHeaders) {
            data = data || {};
            return $http.put(APIURL + path, {
                v: data
            }, {
                headers: apiHeaders
            });
        }).then(function(response) {
            return response.data;
        });
    }
    
    function del(path, headers, authNeeded) {
        return getHeaders(headers, authNeeded).then(function(apiHeaders) {
            return $http.delete(APIURL + path, {
                headers: apiHeaders
            });
        });
    }
    
}


angular
    .module('FreshEarth')
    .config(mdToastConfig)
    .factory('api', api);
