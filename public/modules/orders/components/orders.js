/*
 *  Controller Setup
 */

function OrderController() {
    var ctrl = this;
}

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('orders', {
    templateUrl: 'modules/orders/templates/orders.html',
    controller: OrderController,
    bindings: {
        userIdentification: '<',
        toastNotification: '<'
    }
});

/*
 *    UI-Router Setup
 */

angular.module('FreshEarth').config(function($stateProvider) {
    $stateProvider.state('orders', {
        url: '/orders',
        parent: 'auth',
        component: 'orders',
        resolve: {
            userIdentification: 'userIdentification',
            toastNotification: 'toastNotification'
        }
    });
});
