/*
 *  Stylized header for the beginning of md-card elements.
 */

function feCardHeader() {
    console.log("registering directive?");
    return {
        restrict: 'E',
        transclude: true,
        require: 'ngModel',
        template: '<div><h3 ng-transclude></h3></div><md-divider></md-divider>'
    };
}

angular
    .module('FreshEarth')
    .directive('feCardHeader', feCardHeader);
