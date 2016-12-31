function ReviewSignupController() {
};

angular.module('FreshEarth').component('reviewSignup', {
    templateUrl: 'modules/core/templates/signup/review.signup.html',
    controller: ReviewSignupController,
    bindings: {
        signupBackward: '&',
        submit: '&',
        signupCredentials: '='
    }
});
