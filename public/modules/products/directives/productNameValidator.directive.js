/*
 * Product Name Validator Directive
 *
 * PRODUCTS Directive
 * Extends ng-messages to include extra validation
 *
 * @attributes
 *    lowercase: Supplies ngModel with a lowercase version of the string
 *
 * @function
 *    <md-input product-name-validator lowercase name="name"></md-input>
 *    <div ng-messages="form.name.$error">
 *        <div ng-message="validName">Invalid Name!</div>
 *    </div>
 */
function productNameValidator($filter) {

    function link(scope, element, attrs, ctrl) {

        var lowercase = attrs.storeAs || false;

        ctrl.$parsers.unshift(function(val) {
            // console.log('PARSE ' + val.trim());
            // cased = lowercase ? _.toLower(val).trim() : val.trim();
            return lowercase ? _.toLower(val).trim() : val.trim();
        });

        ctrl.$formatters.unshift(function(val) {
            // console.log('FORMAT ' + _.upperFirst(val));
            return _.upperFirst(val);
        });

        ctrl.$validators.validName = function(modelValue, viewValue) {
            // console.log('modelValue: ' + modelValue);
            // console.log('viewValue: ' + viewValue);
            return viewValue ? true : false;
        }
    }
    return {
        require: '^ngModel',
        link: link
    };
}

/*
 *    Filter to Capitalize First Letter of a String
 */
function capitalizeFirstFilter() {
    return function(value) {
        return _.upperFirst(value);
    }
}


angular
    .module('FreshEarth')
    .filter('capitalizeFirstFilter', capitalizeFirstFilter)
    .directive('productNameValidator', productNameValidator);
