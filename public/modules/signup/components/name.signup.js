function NameSignupController() {
    var ctrl = this;
};

angular.module('FreshEarth').component('nameSignup', {
    templateUrl: 'modules/signup/templates/name.signup.html',
    controller: NameSignupController,
    bindings: {
        signupForward: '&',
        signupBackward: '&',
        signupCredentials: '=',
        signupValidators: '<'
    }
});
