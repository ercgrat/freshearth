'use strict';
/*
 * Password Validator Directive
 *
 * CORE Directive
 * Extends ng-messages to include extra password validations
 *
 * @http
 *    API Path: /api/validation/password
 *        Makes $http.get() request to API and passes password as v: value
 *            $http.get('API/path', {v: value}).success(...).error(...)
 *
 * @attributes
 *    login
 *        Skips validation check to see if password is valid
 *    ng-pattern=regExp
 *        Client-side REGEX checking of password validity
 *    password-pair
 *        TRUE if password and repeat-password need to match
 *
 * @function
 *    <md-input ng-model="$ctrl.model.password" ng-pattern="regExp"
 *        password-validator password-pair type="password" name="password"></md-input>
 *    <md-input ng-model="$ctrl.model.repeatPassword" ng-pattern="regExp"
 *        password-validator password-pair
 *        type="password" name="repeatPassword"></md-input>
 *
 *    <div ng-messages="form.formInput.$error">
 *        <div ng-message="passwordLoading">Checking password validity...</div>
 *        <div ng-message="passwordMatch">Checking that passwords match</div>
 *    </div>
 */

function validatePassword($http, $q, _) {

    function link(scope, element, attrs, ctrl) {

        // Parse Controllers
        var ngModel = ctrl[0];
        var form = ctrl[1];

        // Append element with REGEX ngPattern attribute
        scope.regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&+\-%^=])[A-Za-z\d@$!%*#?&+\-%^=]{8,}$/;

        ngModel.$validators.passwordValid = function(modelValue, viewValue) {
            var value = modelValue || viewValue;
            return scope.regExp.test(value);
        }

        if (_.has(attrs, 'passwordPair')) {
            scope.passwordPair = attrs.passwordPair;
            scope.$watch('passwordPair', function() {
                ngModel.$validate();
            });
            ngModel.$validators.passwordMatch = function() {
                if(form.password.$viewValue == form.repeatPassword.$viewValue) {
                    return true;
                } else {
                    return false;
                }
            };
        }
    }
    
    return {
        require: ['ngModel', '^form'],
        link: link
    };
}

/*
 *  Password Filter
 *
 *    @function
 *      password - a password string to be obscured
 *
 */
function filterPassword() {
    return function(password) {
        if (!password) {
            return '';
        }
        return password.replace(/./g, '*');
    };
}


angular
    .module('FreshEarth')
    .filter('passwordFilter', filterPassword)
    .directive('passwordValidator', validatePassword);
