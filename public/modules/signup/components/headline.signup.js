function HeadlineSignupController() {

};

angular.module('FreshEarth').component('headlineSignup', {
    templateUrl: 'modules/signup/templates/headline.signup.html',
    controller: HeadlineSignupController,
    bindings: {
        signupForward: '&',
        signupBackward: '&',
        signupCredentials: '=',
        signupValidators: '<'
    }
});
