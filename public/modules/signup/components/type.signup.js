function TypeSignupController() {
    var ctrl = this;
    
    ctrl.$onInit = function() {
        ctrl.producer = {
            title: 'PRODUCER',
            detail: 'PRODUCER DETAILS'
        }
        ctrl.consumer = {
            title: 'CONSUMER',
            detail: 'CONSUMER DETAILS'
        }
        ctrl.producerType = function() {
            this.signupCredentials.businessType = 'producer';
        };
        ctrl.consumerType = function() {
            this.signupCredentials.businessType = 'consumer';
        };
        
        ctrl.signupRefresh();
    };
};

angular.module('FreshEarth').component('typeSignup', {
    templateUrl: 'modules/signup/templates/type.signup.html',
    controller: TypeSignupController,
    bindings: {
        signupForward: '&',
        signupBackward: '&',
        signupRefresh: '&',
        signupCredentials: '='
    }
});
