/*
 * Phone Validator Directive
 *
 * CORE Directive
 * Parses Phone Number input to remove any non-number characters
 *
 * @function
 *    <md-input phone-validator type="text" name="phone"></md-input>
 *    <div ng-messages="$ctrl.form.phone.$error">
 *       <div ng-message="numberValidator">Phone Number is invalid!</div>
 *    </div>
 */

// Function to Filter the Phone Number for display on the UI
function filterPhone() {

    return function(phone, region) {

        if (!phone) {
            return null;
        }

        var value = phone.trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return phone;
        }
        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if (number) {
            if (number.length > 3) {
                number = number.slice(0, 3) + '-' + number.slice(3, 7);
            } else {
                number = number;
            }
            return ("(" + city + ") " + number).trim();
        } else if (city) {
            return "(" + city;
        } else {
            return;
        }

    };
}

// Function to Validate Phone Number Input
function validatePhone($http, $q, $filter, $browser) {

    function link(scope, element, attrs, ctrl) {
        // Listener function to fire whenever changes are made to the phone-validator input
        var listener = function() {
            var value = element.val().replace(/[^0-9]/g, '').slice(0, 10);
            element.val($filter('phoneFilter')(value, false));
            // Check if phone number is valid length
            value.length == 10 ? ctrl.$setValidity('numberValidator', true) : ctrl.$setValidity('numberValidator', false);
        };
        // Trigger Listener function on input change
        element.bind('keydown', function(event) {
            var key = event.keyCode;
            if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                return;
            }
            $browser.defer(listener);
        });

        // Parses the $modelValue to clean it of the ()- chars
        ctrl.$parsers.push(function(value) {
            return value.replace(/[^0-9]/g, '').slice(0, 10);
        });
    };

    return {
        require: 'ngModel',
        link: link
    };
}

angular
    .module('FreshEarth')
    .filter('phoneFilter', filterPhone)
    .directive('phoneValidator', validatePhone);
