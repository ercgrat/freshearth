/*
 *  Big button styled for navigating to another page.
 */

function feNavButton() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            selected: '='
        },
        template: '<md-button class="fe-nav-button md-accent md-raised {{ selected ? \'md-hue-3\' : \'md-hue-2\' }}"><span ng-transclude></span></md-button>'
    };
}

angular
    .module('FreshEarth')
    .directive('feNavButton', feNavButton);
