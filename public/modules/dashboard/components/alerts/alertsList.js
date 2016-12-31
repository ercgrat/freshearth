/*
 *  Controller Setup
 */

function AlertsListController() {
    var ctrl = this;

    ctrl.itemToolbarMenu = {
        minimized: false,
        priority: undefined,
        hidden: false
    };

    ctrl.alerts = [{
        priority: Math.floor(Math.random() * 3),
        type: 'order',
        data: {
            product: 'Strawberry',
            multiple: false,
            consumer: 'Todd\'s Sandwich Shop',
            timestamp: Date.now() - Math.random() * 1000,
            orderId: '000000023jh4'
        }
    }, {
        priority: Math.floor(Math.random() * 3),
        type: 'message',
        data: {
            from: 'Andrew\'s Grocery',
            timestamp: Date.now() - Math.random() * 1000,
            message: 'This is the message that I am going to truncate',
            messageId: '0000012e90d0'
        }
    }, {
        priority: Math.floor(Math.random() * 3),
        type: 'announcement',
        data: {
            timestamp: Date.now(),
            message: 'FreshEarth has partnered with The United Way!'
        }
    }];

}

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('alertsList', {
    templateUrl: 'modules/dashboard/templates/alerts/alertsList.html',
    controller: AlertsListController,
    bindings: {
        userIdentification: '<',
        toastNotification: '<'
    }
});
