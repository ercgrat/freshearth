/*
 * Business Name Validator Directive
 *
 * CORE Directive
 * Extends ng-messages to include extra validation
 *
 * @function
 *    <md-input business-name-validator type="text" name="businessName"></md-input>
 *    <div ng-messages="form.businessName.$error">
 *        <div ng-message="businessNameAvailable">This Business Name is already registered with FreshEarth!</div>
 *    </div>
 */
function businessNameValidator($http, $q) {

    function link(scope, element, attrs, ctrl) {

        // Parse Controllers
        var ngModel = ctrl[0];
        var form = ctrl[1];

        ngModel.$asyncValidators.businessNameAvailable = function(modelValue, viewValue) {
            var value = modelValue || viewValue;
            return $http.post(APIURL + '/validation/auth/businessName', {
                v: value
            }).then(function(response) {
                return response.data ? $q.resolve('The Business Name is valid') : $q.reject('The Business Name is invalid');
            }).catch(function(response) {
                return $q.reject('Unable to reach the Authorization API');
            });
        }
    }
    return {
        require: ['ngModel', '^form'],
        link: link
    };
}


angular
    .module('FreshEarth')
    .directive('businessNameValidator', businessNameValidator);
