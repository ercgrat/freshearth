/*
 * Email Validator Directive
 *
 * CORE Directive
 * Extends ng-messages to include extra email validations
 *
 * @attributes
 *    login
 *        Skips validation check to see if email already exists
 *
 * @function
 *    <md-input email-validator type="email" name="email" login></md-input>
 *    <div ng-messages="form.formInput.$error">
 *        <div ng-message="emailValid">This email address is invalid!</div>
 *        <div ng-message="emailAvailable">This email address is already registered!</div>
 *    </div>
 */
function validateEmail($http, $q, _) {

    function link(scope, element, attrs, ctrl) {

        ctrl.$asyncValidators.emailValid = function(modelValue, viewValue) {
            var value = modelValue || viewValue;
            return $http.post(APIURL + '/validation/auth/email', {
                v: value
            }).then(function(response) {
                return response.data ? $q.resolve('This Email Address is valid') : $q.reject('This Email Address is invalid!');
            }).catch(function(response) {
                return $q.reject('Unable to reach the Authorization API');
            });
        };

        if (!_.has(attrs, 'login')) {
            ctrl.$asyncValidators.emailAvailable = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                return $http.get(APIURL + '/validation/auth/existingEmail/' + value)
                .then(function(response) {
                    return response.data ? $q.resolve('This Email Address is not registered') : $q.reject('This Email Address is already registered with FreshEarth!');
                }).catch(function(response) {
                    return $q.reject('Unable to reach the Authorization API');
                });
            };
            
            if(_.has(attrs, 'contact')) {
                ctrl.$asyncValidators.contactAvailable = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    return $http.get(APIURL + '/validation/auth/existingContact/' + value)
                    .then(function(response) {
                        return response.data ? $q.resolve() : $q.reject('This email address is already in your contacts');
                    }).catch(function(response) {
                        return $q.reject('Unable to reach the Authorization API');
                    });
                };
            }
        }
    }

    return {
        require: 'ngModel',
        link: link
    };
}

angular
    .module('FreshEarth')
    .directive('emailValidator', validateEmail);
