function NameSignupController() {
    var ctrl = this;
    
    ctrl.$onInit = function() {
        ctrl.signupRefresh();
    };
};

angular.module('FreshEarth').component('nameSignup', {
    templateUrl: 'modules/signup/templates/name.signup.html',
    controller: NameSignupController,
    bindings: {
        signupForward: '&',
        signupBackward: '&',
        signupRefresh: '&',
        signupCredentials: '=',
        signupValidators: '<',
        signupForm: '<'
    }
});
