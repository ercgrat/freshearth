function PhoneSignupController() {
    var ctrl = this;
    
    ctrl.$onInit = function() {
        ctrl.signupRefresh();
    };
};

angular.module('FreshEarth').component('phoneSignup', {
    templateUrl: 'modules/signup/templates/phone.signup.html',
    controller: PhoneSignupController,
    bindings: {
        signupForward: '&',
        signupBackward: '&',
        signupRefresh: '&',
        signupCredentials: '=',
        signupValidators: '<'
    }
});
