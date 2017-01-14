function AccountSignupController() {

};

angular.module('FreshEarth').component('accountSignup', {
    templateUrl: 'modules/signup/templates/account.signup.html',
    controller: AccountSignupController,
    bindings: {
        signupForward: '&',
        signupCredentials: '=',
        signupValidators: '<'
    }
});
