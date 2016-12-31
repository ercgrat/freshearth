var Lodash = function($window) {
    return $window._;
}

angular
    .module('FreshEarth')
    .factory('_', Lodash);
