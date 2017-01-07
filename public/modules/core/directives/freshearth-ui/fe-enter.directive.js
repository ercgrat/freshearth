/*
 *  Sets up an event listener for the enter key. Should only be applied to input elements.
 */

function feEnter() {
    function link(scope, element, attrs, ctrl) {
        /*
         * Trigger the onBlur call to disableEditing
         */
        element.bind("keypress", function(event) {
            if (event.which === 13) {
                element[0].blur();
                event.preventDefault();
                scope.callback();
            }
            return false;
        });
    }
    
    return {
        restrict: 'A',
        link: link,
        scope: {
            callback: "&feEnter"
        }
    };
}

angular
    .module('FreshEarth')
    .directive('feEnter', feEnter);
