function PhoneSignupController() {


};

angular.module('FreshEarth').component('phoneSignup', {
    templateUrl: 'modules/core/templates/signup/phone.signup.html',
    controller: PhoneSignupController,
    bindings: {
        signupForward: '&',
        signupBackward: '&',
        signupCredentials: '=',
        signupValidators: '<'
    }
});
