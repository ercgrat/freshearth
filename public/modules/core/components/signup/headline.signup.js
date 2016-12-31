function HeadlineSignupController() {

};

angular.module('FreshEarth').component('headlineSignup', {
    templateUrl: 'modules/core/templates/signup/headline.signup.html',
    controller: HeadlineSignupController,
    bindings: {
        signupForward: '&',
        signupBackward: '&',
        signupCredentials: '=',
        signupValidators: '<'
    }
});
