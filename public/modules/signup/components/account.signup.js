function AccountSignupController() {
    var ctrl = this;
    
    ctrl.$onInit = function() {
        ctrl.signupRefresh();
    };
};

angular.module('FreshEarth').component('accountSignup', {
    templateUrl: 'modules/signup/templates/account.signup.html',
    controller: AccountSignupController,
    bindings: {
        signupForward: '&',
        signupRefresh: '&',
        signupCredentials: '=',
        signupValidators: '<',
        signupForm: '<'
    }
});
