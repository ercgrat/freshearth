/*
 *  Stylized header for the beginning of md-card elements.
 */

function feCardHeader() {
    return {
        restrict: 'E',
        transclude: true,
        template: '<div><h3 ng-transclude></h3></div><md-divider></md-divider>'
    };
}

angular
    .module('FreshEarth')
    .directive('feCardHeader', feCardHeader);
