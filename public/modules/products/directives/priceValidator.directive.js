/*
 * Price Validator Directive
 *
 * PRODUCTS Directive
 * Extends ng-messages to include extra validation
 *
 * @function
 *    <md-input price-validator currency="$" decimals="2" name="price"></md-input>
 *    <div ng-messages="form.price.$error">
 *        <div ng-message="validAmount">Invalid Amount!</div>
 *    </div>
 */
function priceValidator($filter) {

    function link(scope, element, attrs, ctrl) {

        var currency = attrs.currency || '$';
        var decimals = parseInt(attrs.decimals) || 2;

        function filterFn(value, replace) {
            return replace ? $filter('currency')(value.replace(/[^0-9.]+/g, ''), currency, decimals) : $filter('currency')(value, currency, decimals);
        }

        ctrl.$parsers.unshift(function(val) {
            var value = val.replace(/[^0-9.]+/g, '');
            return parseFloat(value) ? parseFloat(value).toFixed(decimals) / 1 : null;
        });

        ctrl.$formatters.unshift(function(val) {
            if (!val) return;
            return filterFn(val, true);
        });

        ctrl.$validators.validAmount = function(modelValue, viewValue) {
            var cleaned = parseFloat(viewValue.replace(/[^0-9.]+/g, '')).toFixed(decimals);
            if (cleaned > 0) {
                element.val(filterFn(cleaned));
                return true;
            } else {
                element.val(filterFn(0));
                return false;
            };
        };

    }
    return {
        require: '^ngModel',
        link: link
    };
}


angular
    .module('FreshEarth')
    .directive('priceValidator', priceValidator);
