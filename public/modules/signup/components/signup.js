/*
 *  Controller Setup
 */

function SignupController($scope, $state, $timeout) {
    var ctrl = this;

    ctrl.$onInit = function() {
        ctrl.signupLocation = 0;
    };

    ctrl.signupValidators = {
        firstName: {
            hint: 'Required'
        },
        lastName: {
            hint: 'Required'
        },
        email: {
            hint: 'Enter the Email Address you want to use to login to FreshEarth'
        },
        password: {
            hint: 'Your password should contain 8 characters consisting of at letters, numbers, and special characters'
        },
        repeatPassword: {
            hint: 'Passwords must be identical!'
        },
        businessName: {
            hint: 'This is the title you want your business to be listed as throughout FreshEarth',
            minlength: 5,
            maxlength: 30
        },
        businessHeadline: {
            hint: 'Use this to tell the FreshEarth community a little bit about your business or your values',
            minlength: 20,
            maxlength: 300
        },
        businessAddress: {
            street: {
                hint: 'US Postal Service Mailing Street Address'
            },
            city: {
                hint: 'US City'
            },
            state: {
                hint: 'US State'
            },
            zip: {
                hint: 'US Postal Code',
                minlength: 5,
                maxlength: 10
            }
        },
        businessPhone: {
            hint: '(###) ###-####'
        }
    };

    ctrl.signupCredentials = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        repeatPassword: undefined,
        businessType: undefined,
        businessName: undefined,
        businessHeadline: undefined,
        businessAddress: {
            street: undefined,
            city: undefined,
            state: undefined,
            zip: undefined
        },
        businessPhone: undefined
    };

    ctrl.forwardSignupLocation = function() {
        ctrl.signupLocation++;
    };

    ctrl.backwardSignupLocation = function() {
        ctrl.signupLocation--;
    };

    ctrl.submit = function() {
        console.log(ctrl.signupCredentials);
        return ctrl.userIdentification.signup(ctrl.signupCredentials).then(function(response) {
            $state.go('welcome', {
                email: ctrl.signupCredentials.email
            });
            return ctrl.toastNotification.generalInfoMessage('Signup Successful');
        }).catch(function(error) {
            return ctrl.toastNotification.generalErrorMessage(error);
        });
    };

    ctrl.signupRefresh = function() {
        switch (ctrl.signupLocation) {
            case 0:
                ctrl.formTitle = 'Account Information';
                break;
            case 1:
                ctrl.formTitle = 'Business Type';
                break;
            case 2:
                ctrl.formTitle = 'Business Name';
                break;
            case 3:
                ctrl.formTitle = 'Business Address';
                break;
            case 4:
                $scope.$broadcast('geocodeAddress');
                ctrl.formTitle = 'Business Phone';
                break;
            case 5:
                $scope.$broadcast('showMap');
                ctrl.formTitle = 'Review';
                break;
            default:
                ctrl.formTitle = 'Signup Form';
        }
        
        // Clear form errors
        ctrl.signupForm.$setPristine();
        ctrl.signupForm.$setUntouched();
        
        // Set focus to first input
        var firstInputContainer = ctrl.signupForm.$$element[0].querySelector('md-input-container');
        if(firstInputContainer != null) {
            angular.element(firstInputContainer).toggleClass("md-input-focused");
            var firstInput = ctrl.signupForm.$$element[0].querySelector("input");
            firstInput.focus();
            firstInput.select();
        }
    };
};

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('signup', {
    templateUrl: 'modules/signup/templates/signup.html',
    controller: SignupController,
    bindings: {
        userIdentification: '<',
        toastNotification: '<',
        googleMapManager: '<'
    }
});

/*
 *    UI-Router Setup
 */

angular.module('FreshEarth').config(function($stateProvider) {
    $stateProvider.state('signup', {
        url: '/signup',
        parent: 'main',
        component: 'signup',
        resolve: {
            userIdentification: 'userIdentification',
            toastNotification: 'toastNotification',
            googleMapManager: 'googleMapManager'
        }
    });
});
