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

        if (!_.has(attrs, 'login')) {
            ngModel.$asyncValidators.passwordValid = function(modelValue, viewValue) {
                var value = modelValue || viewValue;

                var deferred = $q.defer();
                $http.post(APIURL + '/validation/auth/password', {
                    v: value
                }).success(function(response) {
                    response == true ? deferred.resolve('The password is valid') : deferred.reject('The password is invalid');
                }).error(function(response) {
                    deferred.reject('Unable to reach the Authorization API');
                });
                return deferred.promise;
            }

            if (_.has(attrs, 'passwordPair')) {
                ngModel.$asyncValidators.passwordMatch = function() {
                    var value = {
                        password: form.password.$viewValue,
                        repeatPassword: form.repeatPassword.$viewValue
                    }
                    var deferred = $q.defer();

                    if (form.password.$dirty && form.repeatPassword.$dirty) {
                        $http.post(APIURL + '/validation/auth/repeatPassword', {
                            v: value
                        }).success(function(response) {
                            if (response) {
                                deferred.resolve('The passwords match');
                                form.repeatPassword.$setValidity('passwordMatch', true);
                                form.password.$setValidity('passwordMatch', true);
                            } else {
                                deferred.reject('The passwords do not match');
                            }
                        }).error(function(response) {
                            deferred.reject('Unable to reach the Authorization API');
                        });
                    } else {
                        deferred.resolve('Only one password field has been touched');
                    }
                    return deferred.promise;
                }
            }
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
