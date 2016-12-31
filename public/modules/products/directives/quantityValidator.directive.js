/*
 * Quantity Validator Directive
 *
 * PRODUCTS Directive
 * Extends ng-messages to include extra validation
 *
 * @function
 *    <md-input quantity-validator minValue="0" maxValue="10" name="quantity"></md-input>
 *    <div ng-messages="form.quantity.$error">
 *        <div ng-message="validQuantity">Invalid Quantity!</div>
 *    </div>
 */
function quantityValidator() {

    function link(scope, element, attrs, ctrl) {

        var decimals = parseInt(attrs.decimals) || 0;
        var minValue = parseInt(attrs.minValue) || 0;
        var maxValue = parseInt(attrs.maxValue) || undefined;

        function filterFn(value, replace) {
            // return replace ? $filter('currency')(value.replace(/[^0-9.]+/g, ''), currency, decimals) : $filter('currency')(value, currency, decimals);
        }

        ctrl.$parsers.unshift(function(val) {
            var value = val.replace(/[^0-9.]+/g, '');
            return parseFloat(value) ? parseFloat(value).toFixed(decimals) / 1 : null;
        });

        ctrl.$formatters.unshift(function(val) {
            if (!val) return;
            return val;
            // return filterFn(val, true);
        });

        ctrl.$validators.validQuantity = function(modelValue, viewValue) {
            var cleaned = parseFloat(viewValue.replace(/[^0-9.]+/g, '')).toFixed(decimals);
            if (cleaned > minValue && !maxValue) {
                element.val(cleaned);
                return true;
            } else if (cleaned > minValue && cleaned < maxValue) {
                element.val(cleaned);
                return true;
            } else {
                element.val(0);
                return false;
            };
        };

        ctrl.$validators.inRange = function(modelValue, viewValue) {
            var cleaned = parseFloat(viewValue.replace(/[^0-9.]+/g, '')).toFixed(decimals);
            return cleaned > minValue && cleaned < maxValue;
        }

    }
    return {
        require: '^ngModel',
        link: link
    };
}


angular
    .module('FreshEarth')
    .directive('quantityValidator', quantityValidator);
