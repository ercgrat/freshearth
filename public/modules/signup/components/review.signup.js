function ReviewSignupController() {
};

angular.module('FreshEarth').component('reviewSignup', {
    templateUrl: 'modules/signup/templates/review.signup.html',
    controller: ReviewSignupController,
    bindings: {
        signupBackward: '&',
        submit: '&',
        signupCredentials: '='
    }
});
