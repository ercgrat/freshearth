function PhoneSignupController() {


};

angular.module('FreshEarth').component('phoneSignup', {
    templateUrl: 'modules/signup/templates/phone.signup.html',
    controller: PhoneSignupController,
    bindings: {
        signupForward: '&',
        signupBackward: '&',
        signupCredentials: '=',
        signupValidators: '<'
    }
});
