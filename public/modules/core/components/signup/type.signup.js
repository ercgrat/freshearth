function TypeSignupController() {
    this.producer = {
        title: 'PRODUCER',
        detail: 'PRODUCER DETAILS'
    }
    this.consumer = {
        title: 'CONSUMER',
        detail: 'CONSUMER DETAILS'
    }
    this.producerType = function() {
        this.signupCredentials.businessType = 'producer';
    };
    this.consumerType = function() {
        this.signupCredentials.businessType = 'consumer';
    };
};

angular.module('FreshEarth').component('typeSignup', {
    templateUrl: 'modules/core/templates/signup/type.signup.html',
    controller: TypeSignupController,
    bindings: {
        signupForward: '&',
        signupBackward: '&',
        signupCredentials: '='
    }
});
