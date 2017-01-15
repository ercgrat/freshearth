function ReviewSignupController() {
    var ctrl = this;
    
    ctrl.$onInit = function() {
        ctrl.signupRefresh();
    };
};

angular.module('FreshEarth').component('reviewSignup', {
    templateUrl: 'modules/signup/templates/review.signup.html',
    controller: ReviewSignupController,
    bindings: {
        signupBackward: '&',
        signupRefresh: '&',
        submit: '&',
        signupCredentials: '='
    }
});
