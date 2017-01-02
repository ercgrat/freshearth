function AccountSignupController() {

};

angular.module('FreshEarth').component('accountSignup', {
    templateUrl: 'modules/core/templates/signup/account.signup.html',
    controller: AccountSignupController,
    bindings: {
        signupForward: '&',
        signupCredentials: '=',
        signupValidators: '<'
    }
});
